// بسم الله الرحمن الرحيم

/**
 * 6-Fold Construction — Friday Mosque, Isfahan (Sandy Kurt method)
 *
 * Begins with the Flower of Life: a central circle surrounded by 6 petals,
 * each drawn without changing the compass setting.
 * Lines through intersections create the hexagonal grid.
 * The pattern emerges from connecting specific crossing points.
 */

const TAU = Math.PI * 2

export function construct6Fold(R) {
  const C = (a) => { const v = Math.round(245 - (245-80)*a); return `rgb(${v},${v-5},${v-15})`; }
  const cons  = C(0.12)
  const acc   = '#2c3e6b'
  const blue  = 'rgba(50,90,180,.45)'
  const gold  = 'rgba(180,120,30,.45)'

  // Petal centers: 6 circles at distance R, 60° intervals (radius = R)
  const petalCenters = []
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU
    petalCenters.push({ x: Math.cos(a) * R, y: Math.sin(a) * R })
  }

  // Outer-ring intersection points between adjacent petals (distance R√3)
  const outerPts = []
  for (let i = 0; i < 6; i++) {
    const c1 = petalCenters[i]
    const c2 = petalCenters[(i + 1) % 6]
    outerPts.push({ x: c1.x + c2.x, y: c1.y + c2.y })
  }

  // Key inner-ring intersections (C0 ∩ Ci give ±60° arcs) = petal centers themselves
  // Also the midpoints between origin and each petal center lie at R/2
  const innerPts = petalCenters.map(p => ({ x: p.x * 0.5, y: p.y * 0.5 }))

  const steps = []
  const EXT = R * 2.2  // extend construction lines beyond visible area

  // ─── Step 1: Seed circle ─────────────────────────────────────────────
  steps.push({
    desc: 'Place the compass at the center. Draw the first circle — the seed from which all will bloom.',
    elements: [
      { type: 'circle', cx: 0, cy: 0, r: R, stroke: cons, fill: 'none', sw: 0.5 },
      { type: 'circle', cx: 0, cy: 0, r: 2, stroke: 'none', fill: C(0.65) }
    ]
  })

  // ─── Step 2: Flower of Life — 6 petals ───────────────────────────────
  steps.push({
    desc: 'Without adjusting the compass, walk its point around the circle — 6 petals bloom. This is the Flower of Life.',
    elements: petalCenters.map(p => ({
      type: 'circle', cx: p.x, cy: p.y, r: R, stroke: cons, fill: 'none', sw: 0.5
    }))
  })

  // ─── Step 3: Outer ring circles (at outer intersection points) ────────
  steps.push({
    desc: 'Point the compass on each intersection between the circles — extend the Flower outward.',
    elements: outerPts.map(p => ({
      type: 'circle', cx: p.x, cy: p.y, r: R, stroke: C(0.07), fill: 'none', sw: 0.4
    }))
  })

  // ─── Step 4: Horizontal + 60° diagonal lines ─────────────────────────
  const hLines = []
  const h = R * Math.sqrt(3) / 2  // row spacing in hexagonal grid = R sin(60°)
  // Horizontal family
  for (const y of [0, h, -h, h * 2, -h * 2]) {
    hLines.push({ type: 'line', x1: -EXT, y1: y, x2: EXT, y2: y, stroke: C(0.1), sw: 0.3 })
  }
  // 60° diagonal family (direction cos60, sin60 = 0.5, √3/2)
  const d60x = 0.5, d60y = Math.sqrt(3) / 2
  for (const off of [0, R, -R, 2 * R, -2 * R]) {
    // offset perpendicular to 60° line
    const nx = -d60y, ny = d60x
    const px = nx * off, py = ny * off
    hLines.push({
      type: 'line',
      x1: px - d60x * EXT, y1: py - d60y * EXT,
      x2: px + d60x * EXT, y2: py + d60y * EXT,
      stroke: C(0.1), sw: 0.3
    })
  }
  steps.push({
    desc: 'Draw horizontal and 60° diagonal lines through every intersection — the hexagonal grid takes shape.',
    elements: hLines
  })

  // ─── Step 5: Vertical lines ───────────────────────────────────────────
  const vLines = []
  for (const x of [0, R * 0.5, -R * 0.5, R, -R, R * 1.5, -R * 1.5]) {
    vLines.push({ type: 'line', x1: x, y1: -EXT, x2: x, y2: EXT, stroke: C(0.1), sw: 0.3 })
  }
  steps.push({
    desc: 'Draw vertical lines through the same points — every circle intersection is now a crossing.',
    elements: vLines
  })

  // ─── Step 6: Other diagonal family (120°) ─────────────────────────────
  const d120x = -0.5, d120y = Math.sqrt(3) / 2
  const diagLines = []
  for (const off of [0, R, -R, 2 * R, -2 * R]) {
    const nx = d120y, ny = -d120x
    const px = nx * off, py = ny * off
    diagLines.push({
      type: 'line',
      x1: px - d120x * EXT, y1: py - d120y * EXT,
      x2: px + d120x * EXT, y2: py + d120y * EXT,
      stroke: C(0.1), sw: 0.3
    })
  }
  steps.push({
    desc: 'The remaining 120° diagonals complete the network — a perfect hexagonal grid woven from circles.',
    elements: diagLines
  })

  // ─── Step 7: Identify pattern lines (inner hexagon unit) ─────────────
  // The pattern line in 6-fold: connect each inner intersection point to those
  // 2 steps away (skip-1 of 6), creating the 6-pointed star (hexagram).
  // The "non-dashed" portion = the chord from one hexagon vertex through two intersections.
  const unitLines = []
  // Inner hexagon (connecting innerPts: midpoints between center and petal centers)
  // These lie at R/2, and connecting skip-1 forms the 6-pointed star
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU + TAU / 12
    const b = ((i + 2) / 6) * TAU + TAU / 12
    unitLines.push({
      type: 'line',
      x1: Math.cos(a) * R / 2, y1: Math.sin(a) * R / 2,
      x2: Math.cos(b) * R / 2, y2: Math.sin(b) * R / 2,
      stroke: blue, sw: 1.0
    })
  }
  // Also the radial line from the inner hex vertex to the petal boundary
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU
    unitLines.push({
      type: 'line',
      x1: Math.cos(a) * R * 0.5, y1: Math.sin(a) * R * 0.5,
      x2: Math.cos(a) * R * 0.94, y2: Math.sin(a) * R * 0.94,
      stroke: blue, sw: 0.7
    })
  }
  steps.push({
    desc: 'THIS is the line that creates the pattern — connecting intersections at precise intervals. Only this chord carries the design.',
    elements: unitLines
  })

  // ─── Step 8: Repeat pattern line for all 6 surrounding cells ─────────
  const repeatLines = []
  for (const pc of petalCenters) {
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU + TAU / 12
      const b = ((i + 2) / 6) * TAU + TAU / 12
      repeatLines.push({
        type: 'line',
        x1: pc.x + Math.cos(a) * R / 2, y1: pc.y + Math.sin(a) * R / 2,
        x2: pc.x + Math.cos(b) * R / 2, y2: pc.y + Math.sin(b) * R / 2,
        stroke: C(0.18), sw: 0.8
      })
    }
  }
  steps.push({
    desc: 'Repeat the same connecting line in each surrounding circle — the Isfahan lattice unfolds.',
    elements: repeatLines
  })

  // ─── Step 9: Final reveal — 6-fold Islamic pattern ────────────────────
  // The complete pattern: central hexagram + hexagonal interlace
  const finalEls = []

  // Central 6-pointed star (hexagram) using skip-2 on 12-point circle
  const pts12 = []
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * TAU - TAU / 4
    pts12.push({ x: Math.cos(a) * R * 0.5, y: Math.sin(a) * R * 0.5 })
  }
  // Two overlapping triangles (hexagram)
  for (let tri = 0; tri < 2; tri++) {
    for (let i = 0; i < 6; i++) {
      const j = (i + 1) % 6
      finalEls.push({
        type: 'line',
        x1: pts12[i * 2 + tri].x, y1: pts12[i * 2 + tri].y,
        x2: pts12[((i + 2) * 2 + tri) % 12].x, y2: pts12[((i + 2) * 2 + tri) % 12].y,
        stroke: acc, sw: 1.6
      })
    }
  }

  // 6 surrounding hexagrams (one per petal center, smaller)
  for (const pc of petalCenters) {
    const rS = R * 0.44
    const starPts = []
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU
      starPts.push({ x: pc.x + Math.cos(a) * rS, y: pc.y + Math.sin(a) * rS })
    }
    for (let tri = 0; tri < 2; tri++) {
      for (let i = 0; i < 6; i++) {
        finalEls.push({
          type: 'line',
          x1: starPts[i * 2 + tri].x, y1: starPts[i * 2 + tri].y,
          x2: starPts[((i + 2) * 2 + tri) % 12].x, y2: starPts[((i + 2) * 2 + tri) % 12].y,
          stroke: acc, sw: 1.0
        })
      }
    }
  }

  // Connecting lines between central star and surrounding stars
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU
    const innerTip = { x: Math.cos(a) * R * 0.5, y: Math.sin(a) * R * 0.5 }
    const pc = petalCenters[i]
    const rS = R * 0.44
    const outerTipA = (i / 6) * TAU + TAU / 2 + TAU / 12
    const outerTipB = (i / 6) * TAU + TAU / 2 - TAU / 12
    finalEls.push({
      type: 'line',
      x1: innerTip.x, y1: innerTip.y,
      x2: pc.x + Math.cos(outerTipA) * rS, y2: pc.y + Math.sin(outerTipA) * rS,
      stroke: acc, sw: 0.9
    })
    finalEls.push({
      type: 'line',
      x1: innerTip.x, y1: innerTip.y,
      x2: pc.x + Math.cos(outerTipB) * rS, y2: pc.y + Math.sin(outerTipB) * rS,
      stroke: acc, sw: 0.9
    })
  }

  steps.push({
    desc: 'The 6-fold pattern reveals itself — a constellation of hexagrams and hexagons, as it adorns the Friday Mosque of Isfahan.',
    elements: finalEls,
    isFinal: true
  })

  return steps
}
