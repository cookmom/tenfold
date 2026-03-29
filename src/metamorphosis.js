// بسم الله الرحمن الرحيم

/**
 * Pattern Metamorphosis
 *
 * Inspired by Barrios & Alani's work on smooth morphing between Islamic patterns,
 * and Kaplan's "Islamic Parquet Deformations."
 *
 * The key insight: ALL n-fold Islamic star patterns can be parameterized by a
 * single contact angle θ. When θ varies continuously, the pattern morphs
 * continuously between fold families.
 *
 * Natural contact angles (θ = 90° − 180°/n):
 *   n=3:  θ = 30°   (trefoil)
 *   n=4:  θ = 45°   (4-fold square)
 *   n=5:  θ = 54°   (5-fold pentagon)
 *   n=6:  θ = 60°   (6-fold hexagon)
 *   n=7:  θ ≈ 64.3° (7-fold heptagon)
 *   n=8:  θ = 67.5° (8-fold octagon)
 *   n=9:  θ ≈ 70°   (9-fold)
 *   n=10: θ = 72°   (10-fold decagon)
 *   n=11: θ ≈ 73.6° (11-fold)
 *   n=12: θ = 75°   (12-fold)
 *
 * The pattern morphs as θ varies. A single hexagonal tiling with continuously
 * varying θ produces the "parquet deformation" effect from Hofstadter/Huff.
 *
 * @module metamorphosis
 */

const TAU = Math.PI * 2

/**
 * Natural contact angle for n-fold symmetry.
 * θ = 90° − 180°/n  (in degrees)
 *
 * @param {number} n
 * @returns {number} degrees
 */
export function naturalTheta(n) {
  return 90 - 180 / n
}

/**
 * Closest fold count n for a given contact angle θ (in degrees).
 * Inverts: n = 180 / (90 - θ)
 *
 * @param {number} thetaDeg
 * @returns {number}
 */
export function thetaToFold(thetaDeg) {
  if (thetaDeg >= 90 || thetaDeg <= 0) return Infinity
  return 180 / (90 - thetaDeg)
}

/**
 * Named waypoints for the metamorphosis slider.
 * Maps fold count n to its natural contact angle.
 */
export const WAYPOINTS = [
  { n: 3,  label: '3-fold',  theta: naturalTheta(3)  },
  { n: 4,  label: '4-fold',  theta: naturalTheta(4)  },
  { n: 5,  label: '5-fold',  theta: naturalTheta(5)  },
  { n: 6,  label: '6-fold',  theta: naturalTheta(6)  },
  { n: 7,  label: '7-fold',  theta: naturalTheta(7)  },
  { n: 8,  label: '8-fold',  theta: naturalTheta(8)  },
  { n: 9,  label: '9-fold',  theta: naturalTheta(9)  },
  { n: 10, label: '10-fold', theta: naturalTheta(10) },
  { n: 11, label: '11-fold', theta: naturalTheta(11) },
  { n: 12, label: '12-fold', theta: naturalTheta(12) },
]

/**
 * Generate star pattern segments on a hexagonal grid
 * for any contact angle θ.
 *
 * Uses the PIC algorithm on the hex tiling.
 * As θ changes, the star arms morph continuously.
 *
 * @param {number} thetaDeg - contact angle in degrees [1, 89]
 * @param {number} W        - viewport width
 * @param {number} H        - viewport height
 * @param {number} size     - hex cell circumradius
 * @returns {Array<[number,number,number,number]>} segments [x1,y1,x2,y2]
 */
export function morphPattern(thetaDeg, W, H, size = 50) {
  const theta = thetaDeg * Math.PI / 180
  const segments = []

  // Build hex grid
  const w3 = Math.sqrt(3) * size  // hex horizontal spacing
  const h3 = 1.5 * size           // hex vertical spacing

  const margin = size * 2
  const cols = Math.ceil((W + margin * 2) / w3) + 1
  const rows = Math.ceil((H + margin * 2) / h3) + 1

  // Generate hex centers
  const centers = []
  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const cx = col * w3 + (row % 2) * (w3 / 2) - margin
      const cy = row * h3 - margin
      centers.push({ cx, cy })
    }
  }

  // For each hex center, compute its 6 vertices
  // Then for each edge, compute the 2 contact rays at angle θ
  for (const { cx, cy } of centers) {
    const verts = []
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU - TAU / 12  // flat-top orientation
      verts.push({ x: cx + Math.cos(a) * size, y: cy + Math.sin(a) * size })
    }

    for (let i = 0; i < 6; i++) {
      const p = verts[i], q = verts[(i + 1) % 6]
      const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2

      const dx = q.x - p.x, dy = q.y - p.y
      const len = Math.sqrt(dx * dx + dy * dy)
      const ex = dx / len, ey = dy / len

      const rayLen = size * 0.6

      for (const sign of [1, -1]) {
        const ca = Math.cos(sign * theta), sa = Math.sin(sign * theta)
        const rx = ex * ca - ey * sa
        const ry = ex * sa + ey * ca
        segments.push([mx, my, mx + rx * rayLen, my + ry * rayLen])
      }
    }
  }

  return segments
}

/**
 * Generate the RESOLVED version — rays march until they hit a neighboring
 * ray, forming connected star arms. More accurate but slower.
 *
 * @param {number} thetaDeg
 * @param {number} W
 * @param {number} H
 * @param {number} size
 * @returns {Array<[number,number,number,number]>} resolved segments
 */
export function morphPatternResolved(thetaDeg, W, H, size = 50) {
  const theta = thetaDeg * Math.PI / 180
  const edgeMidpoints = []

  const w3 = Math.sqrt(3) * size
  const h3 = 1.5 * size
  const margin = size * 3
  const cols = Math.ceil((W + margin * 2) / w3) + 2
  const rows = Math.ceil((H + margin * 2) / h3) + 2

  // Collect all edge midpoints and their directions
  const seen = new Set()
  for (let row = -2; row < rows; row++) {
    for (let col = -2; col < cols; col++) {
      const cx = col * w3 + (row % 2) * (w3 / 2) - margin
      const cy = row * h3 - margin
      const verts = []
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * TAU - TAU / 12
        verts.push({ x: cx + Math.cos(a) * size, y: cy + Math.sin(a) * size })
      }
      for (let i = 0; i < 6; i++) {
        const p = verts[i], q = verts[(i + 1) % 6]
        // Canonical edge key to avoid duplicates
        const ax = Math.round(p.x * 10), ay = Math.round(p.y * 10)
        const bx = Math.round(q.x * 10), by = Math.round(q.y * 10)
        const key = ax < bx || (ax === bx && ay < by)
          ? `${ax},${ay}|${bx},${by}` : `${bx},${by}|${ax},${ay}`
        if (seen.has(key)) continue
        seen.add(key)

        const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2
        const dx = q.x - p.x, dy = q.y - p.y
        const len = Math.sqrt(dx * dx + dy * dy)
        edgeMidpoints.push({ mx, my, ex: dx / len, ey: dy / len })
      }
    }
  }

  // For each edge midpoint, shoot 2 rays and snap to closest neighbor midpoint
  const snapDist = size * 0.25
  const maxLen = size * 1.5
  const segments = []

  for (const { mx, my, ex, ey } of edgeMidpoints) {
    // Only emit segments that are within viewport
    if (mx < -margin || mx > W + margin || my < -margin || my > H + margin) continue

    for (const sign of [1, -1]) {
      const ca = Math.cos(sign * theta), sa = Math.sin(sign * theta)
      const rx = ex * ca - ey * sa, ry = ex * sa + ey * ca

      // Find closest edge midpoint that this ray can reach
      let bestT = maxLen
      for (const other of edgeMidpoints) {
        if (Math.abs(other.mx - mx) < 1e-3 && Math.abs(other.my - my) < 1e-3) continue
        // Project other midpoint onto ray
        const pmx = other.mx - mx, pmy = other.my - my
        const t = pmx * rx + pmy * ry
        if (t < 1e-6 || t > maxLen) continue
        const perp = Math.abs(pmx * ry - pmy * rx)
        if (perp < snapDist && t < bestT) bestT = t
      }

      segments.push([mx, my, mx + rx * bestT, my + ry * bestT])
    }
  }

  return segments
}

/**
 * Interpolate between two fold counts smoothly.
 * Returns segments for a blended/transitional pattern.
 *
 * This is the "metamorphosis" effect: patterns flow between fold families
 * as the contact angle changes.
 *
 * @param {number} nFrom - starting fold count
 * @param {number} nTo   - ending fold count
 * @param {number} t     - blend parameter [0, 1]  (0 = nFrom, 1 = nTo)
 * @param {number} W
 * @param {number} H
 * @param {number} size
 * @returns {{ segments, thetaDeg, effectiveFold }}
 */
export function metamorphSegments(nFrom, nTo, t, W, H, size = 50) {
  const thetaFrom = naturalTheta(nFrom)
  const thetaTo   = naturalTheta(nTo)
  // Ease in-out interpolation for smoother morphing
  const smoothT = t * t * (3 - 2 * t)
  const thetaDeg = thetaFrom + (thetaTo - thetaFrom) * smoothT
  const effectiveFold = thetaToFold(thetaDeg)
  const segments = morphPattern(thetaDeg, W, H, size)
  return { segments, thetaDeg, effectiveFold }
}

/**
 * Easing function: smooth step (ease in-out cubic)
 */
export function smoothStep(t) {
  t = Math.max(0, Math.min(1, t))
  return t * t * (3 - 2 * t)
}

/**
 * Get SVG path data for a morphed star in a single polygon.
 * Useful for isolated demos without a full tiling.
 *
 * @param {number} n - number of sides of the polygon
 * @param {number} R - circumradius
 * @param {number} thetaDeg - contact angle
 * @returns {string} SVG path data for star lines from edge midpoints
 */
export function morphStarInNgon(n, R, thetaDeg) {
  const theta = thetaDeg * Math.PI / 180
  const verts = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU - Math.PI / 2
    verts.push({ x: Math.cos(a) * R, y: Math.sin(a) * R })
  }

  const rayLen = R * 0.85
  let d = ''
  for (let i = 0; i < n; i++) {
    const p = verts[i], q = verts[(i + 1) % n]
    const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2
    const dx = q.x - p.x, dy = q.y - p.y
    const len = Math.sqrt(dx * dx + dy * dy)
    const ex = dx / len, ey = dy / len

    for (const sign of [1, -1]) {
      const ca = Math.cos(sign * theta), sa = Math.sin(sign * theta)
      const rx = ex * ca - ey * sa, ry = ex * sa + ey * ca
      d += `M ${mx.toFixed(2)},${my.toFixed(2)} L ${(mx + rx * rayLen).toFixed(2)},${(my + ry * rayLen).toFixed(2)} `
    }
  }
  return d.trim()
}
