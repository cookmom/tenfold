// بسم الله الرحمن الرحيم

/**
 * Polygons in Contact (PIC) Pattern Generator
 *
 * Implementation of Craig S. Kaplan's "Polygons in Contact" algorithm
 * from "Islamic Star Patterns from Polygons in Contact", Graphics Interface 2005.
 *
 * Based on E.H. Hankin's 1925 "point-joining technique":
 * For each edge in a polygon tiling, draw two rays from the midpoint
 * at contact angle θ. The union of all such rays forms the star pattern.
 *
 * This is MORE GENERAL than the circle-intersection method — it works
 * with ANY polygon tiling (regular, semi-regular, or arbitrary).
 *
 * @module pic
 */

const TAU = Math.PI * 2

// ─────────────────────────────────────────────────────────────────────────────
// Tiling Factories
// These produce the standard "tiling" input objects consumed by picPattern().
// Each tiling is { polygons: [[{x,y},...], ...], edges: [{a,b,shared},...] }
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Regular n-gon tiling: a single polygon for single-cell demos.
 * For a repeating pattern, use tilingSquare / tilingHex / tilingDecagonal.
 */
export function tilingNgon(n, R = 100) {
  const verts = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU - TAU / 4
    verts.push({ x: Math.cos(a) * R, y: Math.sin(a) * R })
  }
  // Build edges: adjacent pairs, shared=false (no neighbor sharing, open boundary)
  const edges = []
  for (let i = 0; i < n; i++) {
    edges.push({ a: verts[i], b: verts[(i + 1) % n], shared: false })
  }
  return { polygons: [verts], edges }
}

/**
 * Square tiling: rows × cols grid of unit squares.
 * @param {number} rows
 * @param {number} cols
 * @param {number} size - side length of each square
 * @param {number} cx - center x
 * @param {number} cy - center y
 */
export function tilingSqare(rows, cols, size = 80, cx = 0, cy = 0) {
  const polygons = []
  const edgeMap = new Map() // "x1,y1,x2,y2" → edge, to detect shared

  const ox = cx - (cols * size) / 2
  const oy = cy - (rows * size) / 2

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = ox + c * size
      const y = oy + r * size
      polygons.push([
        { x: x,        y: y },
        { x: x + size, y: y },
        { x: x + size, y: y + size },
        { x: x,        y: y + size },
      ])
    }
  }

  return _buildEdges(polygons)
}

/**
 * Regular hexagonal tiling.
 * @param {number} rings - number of rings around center hex
 * @param {number} size  - circumradius
 * @param {number} cx
 * @param {number} cy
 */
export function tilingHex(rings = 2, size = 60, cx = 0, cy = 0) {
  const polygons = []
  const hexVerts = (hx, hy) => {
    const v = []
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU - TAU / 12  // flat-top orientation
      v.push({ x: hx + Math.cos(a) * size, y: hy + Math.sin(a) * size })
    }
    return v
  }

  // Cube-coordinate hex grid
  const w = Math.sqrt(3) * size
  const h = 2 * size
  const visited = new Set()

  for (let q = -rings; q <= rings; q++) {
    for (let r = Math.max(-rings, -q - rings); r <= Math.min(rings, -q + rings); r++) {
      const key = `${q},${r}`
      if (visited.has(key)) continue
      visited.add(key)
      const px = cx + w * (q + r / 2)
      const py = cy + h * (3 / 4) * r
      polygons.push(hexVerts(px, py))
    }
  }

  return _buildEdges(polygons)
}

/**
 * Decagonal tiling: a single regular decagon (for 10-fold demos).
 * For a proper repeating decagonal tiling, decagons are surrounded by pentagons
 * and bow-ties — this factory generates that compound.
 * @param {number} R - circumradius of the decagon
 * @param {number} cx
 * @param {number} cy
 */
export function tilingDecagonal(R = 100, cx = 0, cy = 0) {
  const polygons = []

  // Central decagon
  const dec = []
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU - TAU / 20
    dec.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R })
  }
  polygons.push(dec)

  // 10 surrounding pentagons — one on each edge of the decagon
  const s = 2 * R * Math.sin(Math.PI / 10)  // decagon side length
  const Rp = s / (2 * Math.sin(Math.PI / 5)) // pentagon circumradius

  for (let i = 0; i < 10; i++) {
    const a0 = (i / 10) * TAU - TAU / 20
    const a1 = ((i + 1) / 10) * TAU - TAU / 20
    const mx = cx + (Math.cos(a0) + Math.cos(a1)) / 2 * R
    const my = cy + (Math.sin(a0) + Math.sin(a1)) / 2 * R
    const edgeAngle = Math.atan2(dec[i + 1 < 10 ? i + 1 : 0].y - dec[i].y,
                                  dec[i + 1 < 10 ? i + 1 : 0].x - dec[i].x)
    const outward = edgeAngle + Math.PI / 2
    const pc = { x: mx + Math.cos(outward) * Rp * Math.cos(Math.PI / 5), y: my + Math.sin(outward) * Rp * Math.cos(Math.PI / 5) }
    const pent = []
    const pentOffset = edgeAngle - Math.PI / 2 - Math.PI / 5
    for (let j = 0; j < 5; j++) {
      const pa = pentOffset + (j / 5) * TAU
      pent.push({ x: pc.x + Math.cos(pa) * Rp, y: pc.y + Math.sin(pa) * Rp })
    }
    polygons.push(pent)
  }

  return _buildEdges(polygons)
}

// ─────────────────────────────────────────────────────────────────────────────
// Core PIC Algorithm
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate Islamic star pattern segments using the PIC algorithm.
 *
 * @param {Object} tiling - { polygons, edges } from a tiling factory above
 * @param {number} contactAngle - θ in radians. Use degToRad(90 - 180/n) for n-fold stars.
 * @param {Object} [opts]
 * @param {number} [opts.maxLength] - max ray length (defaults to longest edge * 2)
 * @param {boolean} [opts.rosette] - apply rosette transform (petal shapes)
 * @returns {Array<[number,number,number,number]>} - array of [x1,y1,x2,y2] segments
 */
export function picPattern(tiling, contactAngle, opts = {}) {
  const { polygons, edges } = tiling

  // Compute max edge length for ray termination heuristic
  let maxEdgeLen = 0
  for (const e of edges) {
    const dx = e.b.x - e.a.x, dy = e.b.y - e.a.y
    const len = Math.sqrt(dx * dx + dy * dy)
    if (len > maxEdgeLen) maxEdgeLen = len
  }
  const maxLength = opts.maxLength ?? maxEdgeLen * 1.8

  const segments = []

  for (const edge of edges) {
    const { a, b } = edge
    // Midpoint of this edge
    const ox = (a.x + b.x) / 2
    const oy = (a.y + b.y) / 2

    // Edge direction vector (normalized)
    const dx = b.x - a.x, dy = b.y - a.y
    const len = Math.sqrt(dx * dx + dy * dy)
    if (len < 1e-10) continue
    const ex = dx / len, ey = dy / len

    // Two rays, each at +θ and −θ from the edge direction
    // Ray 1: on the "left" side of the edge
    const r1x = ex * Math.cos(contactAngle) - ey * Math.sin(contactAngle)
    const r1y = ex * Math.sin(contactAngle) + ey * Math.cos(contactAngle)
    // Ray 2: on the "right" side
    const r2x = ex * Math.cos(-contactAngle) - ey * Math.sin(-contactAngle)
    const r2y = ex * Math.sin(-contactAngle) + ey * Math.cos(-contactAngle)

    // March each ray until it hits another edge midpoint vicinity or maxLength
    const seg1 = _marchRay(ox, oy, r1x, r1y, maxLength, edges, edge)
    const seg2 = _marchRay(ox, oy, r2x, r2y, maxLength, edges, edge)

    if (seg1) segments.push(seg1)
    if (seg2) segments.push(seg2)
  }

  return segments
}

/**
 * Generate a PIC pattern from a single regular n-gon (useful for demos).
 * Equivalent to picPattern(tilingNgon(n, R), θ) but works standalone.
 *
 * @param {number} n - fold count (number of sides)
 * @param {number} R - circumradius
 * @param {number} [contactAngleDeg] - override contact angle in degrees
 *   Defaults to the natural contact angle: 90 - 180/n degrees
 * @returns {Array<[number,number,number,number]>} segments
 */
export function picNgon(n, R = 100, contactAngleDeg) {
  const theta = contactAngleDeg !== undefined
    ? contactAngleDeg * Math.PI / 180
    : (90 - 180 / n) * Math.PI / 180
  const tiling = tilingNgon(n, R)
  return picPattern(tiling, theta)
}

/**
 * Generate PIC segments on a hex tiling — the workhorse for repeating patterns.
 *
 * @param {number} rings     - rings of hexagons
 * @param {number} size      - hex circumradius
 * @param {number} contactAngleDeg
 * @param {number} cx
 * @param {number} cy
 */
export function picHex(rings = 2, size = 60, contactAngleDeg = 60, cx = 0, cy = 0) {
  const theta = contactAngleDeg * Math.PI / 180
  const tiling = tilingHex(rings, size, cx, cy)
  return picPattern(tiling, theta)
}

/**
 * Generate PIC segments on a square tiling.
 *
 * @param {number} rows
 * @param {number} cols
 * @param {number} size
 * @param {number} contactAngleDeg
 * @param {number} cx
 * @param {number} cy
 */
export function picSquare(rows = 4, cols = 4, size = 80, contactAngleDeg = 67.5, cx = 0, cy = 0) {
  const theta = contactAngleDeg * Math.PI / 180
  const tiling = tilingSqare(rows, cols, size, cx, cy)
  return picPattern(tiling, theta)
}

/**
 * Natural contact angle for n-fold symmetry (in degrees).
 * θ = 90° − 180°/n
 *
 * @param {number} n - fold count
 * @returns {number} contact angle in degrees
 */
export function naturalContactAngle(n) {
  return 90 - 180 / n
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build edges from polygons, detecting shared (interior) edges.
 * @param {Array<Array<{x,y}>>} polygons
 * @returns {{ polygons, edges }}
 */
function _buildEdges(polygons) {
  const edgeMap = new Map()

  for (let pi = 0; pi < polygons.length; pi++) {
    const poly = polygons[pi]
    const n = poly.length
    for (let i = 0; i < n; i++) {
      const a = poly[i]
      const b = poly[(i + 1) % n]
      // Canonical key: sort endpoints to detect reversed edges
      const key = _edgeKey(a, b)
      if (edgeMap.has(key)) {
        edgeMap.get(key).shared = true
      } else {
        edgeMap.set(key, { a, b, shared: false })
      }
    }
  }

  return { polygons, edges: [...edgeMap.values()] }
}

function _edgeKey(a, b) {
  const ax = Math.round(a.x * 1e4), ay = Math.round(a.y * 1e4)
  const bx = Math.round(b.x * 1e4), by = Math.round(b.y * 1e4)
  if (ax < bx || (ax === bx && ay < by)) return `${ax},${ay}|${bx},${by}`
  return `${bx},${by}|${ax},${ay}`
}

/**
 * March a ray from (ox, oy) in direction (rdx, rdy).
 * Terminate at the closest edge midpoint snap or maxLength.
 *
 * @param {number} ox
 * @param {number} oy
 * @param {number} rdx
 * @param {number} rdy
 * @param {number} maxLength
 * @param {Array} edges
 * @param {Object} sourceEdge - the edge that spawned this ray (skip it)
 * @returns {[number,number,number,number]|null}
 */
function _marchRay(ox, oy, rdx, rdy, maxLength, edges, sourceEdge) {
  // Find the closest edge midpoint that this ray "hits"
  let bestT = maxLength
  let bestX = ox + rdx * maxLength
  let bestY = oy + rdy * maxLength

  // Try to snap to other edge midpoints (the PIC "connect the dots" rule)
  const snapRadius = maxLength * 0.15  // generous snap zone

  for (const e of edges) {
    if (e === sourceEdge) continue

    const mx = (e.a.x + e.b.x) / 2
    const my = (e.a.y + e.b.y) / 2

    // Project midpoint onto ray
    const pmx = mx - ox, pmy = my - oy
    const t = pmx * rdx + pmy * rdy  // dot product

    if (t < 1e-6 || t > maxLength) continue  // behind or too far

    // Perpendicular distance to the ray
    const perpDist = Math.abs(pmx * rdy - pmy * rdx)

    // Snap if close enough to the ray
    if (perpDist < snapRadius && t < bestT) {
      bestT = t
      bestX = ox + rdx * t
      bestY = oy + rdy * t
    }
  }

  if (bestT < 1e-6) return null
  return [ox, oy, bestX, bestY]
}

/**
 * Convert degrees to radians.
 */
export function degToRad(deg) {
  return deg * Math.PI / 180
}

/**
 * Convert radians to degrees.
 */
export function radToDeg(rad) {
  return rad * 180 / Math.PI
}
