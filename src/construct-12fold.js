// بسم الله الرحمن الرحيم

/**
 * 12-Fold Moorish Construction (Sandy Kurt method)
 *
 * Steps from Sandy's tutorial:
 * 1. Circle + horizontal line
 * 2. Semi-circles from A and B create the vertical axis
 * 3. Draw the vertical line
 * 4. Lozenge (rhombus) connecting A, B to the intersections
 * 5. Where lozenge meets circle: points G, H → small inner circle
 * 6. Small inner circle meets vertical at K → radius for 6 outer circles
 * 7. Lines between circle centers, small tangent circles at intersections
 * 8. Connecting the 12-fold points
 * 9. Rosette petals
 * 10. Highlight final pattern
 */

const TAU = Math.PI * 2

export function construct12Fold(R) {
  const C = (a) => { const v = Math.round(245 - (245-80)*a); return `rgb(${v},${v-5},${v-15})`; }
  const cons = C(0.6)
  const acc  = '#2c3e6b'
  const blue = 'rgba(50,90,180,.45)'
  const gold = 'rgba(180,120,30,.45)'

  const steps = []

  // Key construction values (all derived from R):
  // A = (-R, 0), B = (R, 0)  — horizontal diameter ends
  // Semi-circles from A to B: each has radius = 2R (diameter AB), center at (0,0)? 
  // Actually: semi-circle from A with radius AB = 2R, from B with radius 2R
  // Their intersections: solve |P - A|² = 4R² and |P - B|² = 4R²
  //   P = (0, ±R√3)  — the "fish" intersections
  // Vertical line through (0,0) and (0,±R√3) → the y-axis
  // Lozenge: connect A and B to (0, R√3) and (0, -R√3)
  // Where lozenge meets the main circle: 
  //   Line A=(−R,0) to (0,R√3) has slope R√3/R = √3 → angle 60°
  //   Meets the circle at angle 60° → G = (R cos120°, R sin120°) = (-R/2, R√3/2)
  //   And H = (R cos60°, R sin60°) = (R/2, R√3/2) [symmetrically for the other side]
  //   Actually the lozenge lines from A to C_top=(0,R√3) and from B to C_top also meet the circle
  //   Line from A(-R,0) direction (1, √3): parametric = (-R + t, t√3)
  //   On circle: (-R+t)² + 3t² = R² → R²-2Rt+t²+3t² = R² → 4t²-2Rt = 0 → t(4t-2R)=0 → t=R/2
  //   So G = (-R + R/2, R/2·√3) = (-R/2, R√3/2)  [at 120°]
  //   Similarly H = (R/2, R√3/2) [at 60°]
  // G-H midpoint = (0, R√3/2) — center of small inner circle
  // GH distance = R, so inner circle radius = R/2
  // Inner circle meets y-axis at K = (0, R√3/2 + R/2) = (0, R(√3+1)/2) ... but this exceeds R if R big enough
  // Actually K is the bottom of that circle: (0, R√3/2 - R/2) = (0, R(√3-1)/2)
  // Main outer circle from step 6: radius = |K| = R(√3-1)/2 from center ... wait
  // Step 6: "The circle drawn at step 5 meets the vertical line on point K. 
  //   Point the compass on the CENTRE, open it to K and draw a circle."
  // So K = (0, R√3/2 + R/2) is the TOP of the inner circle = (0, R(√3+1)/2) ≈ (0, 1.366R)
  // But that's outside our main circle. And inner circle center = (0, R√3/2) = (0, 0.866R)
  // inner radius = R/2, so K_top = (0, R√3/2 + R/2) and K_bottom = (0, R√3/2 - R/2)
  // "meets the vertical line on point K" — it should be the intersection closer to center
  // K = (0, R(√3-1)/2) ≈ (0, 0.366R) — this is the inner circle's bottom intersection with y-axis
  // Radius for step-6 circles: r6 = R(√3-1)/2 ≈ 0.366R
  // These 6 circles are drawn from the center with this radius, creating a hexagonal ring
  // Actually step 6 says draw 6 more circles at that radius around a center hexagon arrangement
  // Let me reread: "Point the compass on the centre, open it to K and draw a circle.
  //   Use the same radius and draw other 5 circles as shown"
  // So 6 circles total: 1 from center + 5 others? Or 6 arranged hexagonally?
  // Most likely: 6 circles whose centers form a hexagon, each tangent to the inner circle.
  // The center of those circles: at distance r6 from the origin, 60° apart.
  // Let's use r6 as both the circle radius AND the distance from center to each sub-circle center.

  const A = { x: -R, y: 0 }
  const B  = { x: R, y: 0 }
  const Ctop = { x: 0, y: R * Math.sqrt(3) }
  const Cbot = { x: 0, y: -R * Math.sqrt(3) }
  const G = { x: -R / 2, y: R * Math.sqrt(3) / 2 }
  const H = { x:  R / 2, y: R * Math.sqrt(3) / 2 }
  const Gmirr = { x: -R / 2, y: -R * Math.sqrt(3) / 2 }
  const Hmirr = { x:  R / 2, y: -R * Math.sqrt(3) / 2 }

  // Inner circle from step 5: center at midpoint of GH
  const innerCenter = { x: 0, y: R * Math.sqrt(3) / 2 }
  const innerR = R / 2

  // K: where inner circle meets vertical axis (lower intersection)
  const K = { x: 0, y: R * (Math.sqrt(3) - 1) / 2 }
  const rK = Math.sqrt(K.x ** 2 + K.y ** 2)  // radius from center to K = R(√3-1)/2

  // Six sub-circle centers (hexagonally arranged, radius rK from origin)
  const hexCenters = []
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU + TAU / 4  // start at top
    hexCenters.push({ x: Math.cos(a) * rK, y: Math.sin(a) * rK })
  }

  // ─── Step 1: Circle + horizontal line ────────────────────────────────
  steps.push({
    desc: 'Begin with a circle. Lay the horizontal diameter — the first axis of symmetry.',
    elements: [
      { type: 'circle', cx: 0, cy: 0, r: R, stroke: cons, fill: 'none', sw: 0.5 },
      { type: 'line', x1: -R * 1.2, y1: 0, x2: R * 1.2, y2: 0, stroke: cons, sw: 0.5 },
      { type: 'circle', cx: A.x, cy: A.y, r: 2.5, stroke: 'none', fill: C(0.65) },
      { type: 'circle', cx: B.x, cy: B.y, r: 2.5, stroke: 'none', fill: C(0.65) },
      { type: 'circle', cx: 0,   cy: 0,   r: 2,   stroke: 'none', fill: C(0.35) }
    ]
  })

  // ─── Step 2: Two semi-circles from A and B ────────────────────────────
  // Each semi-circle has radius = 2R (distance A to B), drawn as arcs
  // We draw full circles for simplicity, faded
  steps.push({
    desc: 'Point the compass on A, open to B — draw a semi-circle above. Then reverse: B to A. Two arcs meet at the golden intersection.',
    elements: [
      { type: 'circle', cx: A.x, cy: A.y, r: R * 2, stroke: C(0.35), fill: 'none', sw: 1.0 },
      { type: 'circle', cx: B.x, cy: B.y, r: R * 2, stroke: C(0.35), fill: 'none', sw: 1.0 },
      { type: 'circle', cx: Ctop.x, cy: Ctop.y, r: 2.5, stroke: 'none', fill: C(0.35) },
      { type: 'circle', cx: Cbot.x, cy: Cbot.y, r: 2.5, stroke: 'none', fill: C(0.35) }
    ]
  })

  // ─── Step 3: Vertical line ────────────────────────────────────────────
  steps.push({
    desc: 'Draw the vertical line through the two arc intersections — the perpendicular bisector, the second axis.',
    elements: [
      { type: 'line', x1: 0, y1: -R * 1.5, x2: 0, y2: R * 1.5, stroke: cons, sw: 0.5 }
    ]
  })

  // ─── Step 4: Lozenge ─────────────────────────────────────────────────
  const lozengeEls = [A, B].flatMap(p => [
    { type: 'line', x1: p.x, y1: p.y, x2: Ctop.x, y2: Ctop.y, stroke: blue, sw: 0.8 },
    { type: 'line', x1: p.x, y1: p.y, x2: Cbot.x, y2: Cbot.y, stroke: blue, sw: 0.8 }
  ])
  steps.push({
    desc: 'Connect A and B to both arc intersections — a lozenge emerges, its diagonals 2:√3.',
    elements: lozengeEls
  })

  // ─── Step 5: Points G, H + inner circle ──────────────────────────────
  steps.push({
    desc: 'Where the lozenge crosses the main circle: mark G and H. A new small circle through G and H defines the 12-fold scale.',
    elements: [
      { type: 'circle', cx: G.x, cy: G.y, r: 3, stroke: 'none', fill: C(0.65) },
      { type: 'circle', cx: H.x, cy: H.y, r: 3, stroke: 'none', fill: C(0.65) },
      { type: 'circle', cx: Gmirr.x, cy: Gmirr.y, r: 3, stroke: 'none', fill: C(0.35) },
      { type: 'circle', cx: Hmirr.x, cy: Hmirr.y, r: 3, stroke: 'none', fill: C(0.35) },
      { type: 'line',   x1: G.x, y1: G.y, x2: H.x, y2: H.y, stroke: C(0.4), sw: 0.5 },
      { type: 'circle', cx: innerCenter.x, cy: innerCenter.y, r: innerR, stroke: cons, fill: 'none', sw: 0.5 },
      { type: 'circle', cx: -innerCenter.x, cy: innerCenter.y, r: innerR, stroke: C(0.6), fill: 'none', sw: 1.0 },
      { type: 'circle', cx: innerCenter.x, cy: -innerCenter.y, r: innerR, stroke: C(0.6), fill: 'none', sw: 1.0 },
      { type: 'circle', cx: -innerCenter.x, cy: -innerCenter.y, r: innerR, stroke: C(0.6), fill: 'none', sw: 1.0 }
    ]
  })

  // ─── Step 6: K point + 6 hexagonal circles ────────────────────────────
  const hexCircles = hexCenters.map(c => ({
    type: 'circle', cx: c.x, cy: c.y, r: rK, stroke: cons, fill: 'none', sw: 1.125
  }))
  hexCircles.push({ type: 'circle', cx: K.x, cy: K.y, r: 3, stroke: 'none', fill: C(0.6) })
  hexCircles.push({ type: 'circle', cx: 0, cy: 0, r: rK, stroke: C(0.4), fill: 'none', sw: 1.0 })
  steps.push({
    desc: 'The inner circle meets the vertical axis at K. Compass to center, open to K — draw 6 circles arranged as a hexagon. The 12-fold grid is forming.',
    elements: hexCircles
  })

  // ─── Step 7: Lines between circle centers + small tangent circles ─────
  const centerLines = []
  for (let i = 0; i < 6; i++) {
    const c1 = hexCenters[i]
    const c2 = hexCenters[(i + 2) % 6]
    centerLines.push({ type: 'line', x1: c1.x, y1: c1.y, x2: c2.x, y2: c2.y, stroke: gold, sw: 0.7 })
  }
  // Small tangent circles at intersections along vertical axis
  const tangentR = rK * (2 - Math.sqrt(3))
  const tangentCenters = [
    { x: 0, y: rK * (Math.sqrt(3) - 1) },
    { x: 0, y: -rK * (Math.sqrt(3) - 1) }
  ]
  for (const tc of tangentCenters) {
    centerLines.push({ type: 'circle', cx: tc.x, cy: tc.y, r: tangentR, stroke: cons, fill: 'none', sw: 1.0 })
  }
  steps.push({
    desc: 'Connect circle centers — where two lines cross the vertical axis, draw small circles tangent to both. The 12-fold structure clarifies.',
    elements: centerLines
  })

  // ─── Step 8: 12 connecting arcs of the rosette ───────────────────────
  // The 12-fold points lie on the main circle at 30° intervals
  const pts12 = []
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * TAU - TAU / 4
    pts12.push({ x: Math.cos(a) * R, y: Math.sin(a) * R })
  }
  const connectLines = []
  // Connect each point to the one 4 steps ahead (creating a 12-pointed star)
  for (let i = 0; i < 12; i++) {
    const j = (i + 4) % 12
    connectLines.push({
      type: 'line', x1: pts12[i].x, y1: pts12[i].y,
      x2: pts12[j].x, y2: pts12[j].y,
      stroke: C(0.45), sw: 0.7
    })
  }
  // Mark the 12 points
  for (const p of pts12) {
    connectLines.push({ type: 'circle', cx: p.x, cy: p.y, r: 2, stroke: 'none', fill: C(0.35) })
  }
  steps.push({
    desc: 'Draw lines connecting the 12 equal divisions — the star chord pattern emerges from the circle\'s edge.',
    elements: connectLines
  })

  // ─── Step 9: Rosette petals ───────────────────────────────────────────
  // 12 petals: each is a lens formed between two of the hexagonal circles
  const petalEls = []
  // Central 12-pointed rosette — using arcs approximated as chords between adjacent pts
  const innerR12 = R * 0.55
  for (let i = 0; i < 12; i++) {
    const a1 = (i / 12) * TAU - TAU / 4
    const a2 = ((i + 1) / 12) * TAU - TAU / 4
    const aMid = (a1 + a2) / 2
    // Each petal is a diamond: outer tip at R*0.85, inner at innerR12, sides at 30° intervals
    const tipOut = { x: Math.cos(aMid) * R * 0.82, y: Math.sin(aMid) * R * 0.82 }
    const tipIn  = { x: Math.cos(aMid) * innerR12 * 0.6, y: Math.sin(aMid) * innerR12 * 0.6 }
    const sideL  = { x: Math.cos(a1) * innerR12, y: Math.sin(a1) * innerR12 }
    const sideR  = { x: Math.cos(a2) * innerR12, y: Math.sin(a2) * innerR12 }
    petalEls.push({ type: 'line', x1: tipOut.x, y1: tipOut.y, x2: sideL.x, y2: sideL.y, stroke: C(0.55), sw: 0.7 })
    petalEls.push({ type: 'line', x1: tipOut.x, y1: tipOut.y, x2: sideR.x, y2: sideR.y, stroke: C(0.55), sw: 0.7 })
    petalEls.push({ type: 'line', x1: tipIn.x,  y1: tipIn.y,  x2: sideL.x, y2: sideL.y, stroke: C(0.55), sw: 0.7 })
    petalEls.push({ type: 'line', x1: tipIn.x,  y1: tipIn.y,  x2: sideR.x, y2: sideR.y, stroke: C(0.55), sw: 0.7 })
  }
  steps.push({
    desc: 'Draw the rosette petals — each petal a curved diamond between the grid intersections, opening like a flower.',
    elements: petalEls
  })

  // ─── Step 10: Final 12-fold Moorish pattern ───────────────────────────
  const finalEls = []

  // 12-pointed star: connect every 5th point on 12-circle
  for (let i = 0; i < 12; i++) {
    const j = (i + 5) % 12
    finalEls.push({
      type: 'line',
      x1: pts12[i].x * 0.88, y1: pts12[i].y * 0.88,
      x2: pts12[j].x * 0.88, y2: pts12[j].y * 0.88,
      stroke: acc, sw: 1.4
    })
  }

  // Inner 12-gon (connecting adjacent)
  const innerR12f = R * 0.42
  for (let i = 0; i < 12; i++) {
    const a1 = (i / 12) * TAU - TAU / 4
    const a2 = ((i + 1) / 12) * TAU - TAU / 4
    finalEls.push({
      type: 'line',
      x1: Math.cos(a1) * innerR12f, y1: Math.sin(a1) * innerR12f,
      x2: Math.cos(a2) * innerR12f, y2: Math.sin(a2) * innerR12f,
      stroke: acc, sw: 1.2
    })
  }

  // Star spokes connecting outer star to inner 12-gon
  for (let i = 0; i < 12; i++) {
    const aOuter = (i / 12) * TAU - TAU / 4
    const aInner1 = ((i + 0.5) / 12) * TAU - TAU / 4
    const aInner2 = ((i - 0.5) / 12) * TAU - TAU / 4
    finalEls.push({
      type: 'line',
      x1: pts12[i].x * 0.88, y1: pts12[i].y * 0.88,
      x2: Math.cos(aInner1) * innerR12f, y2: Math.sin(aInner1) * innerR12f,
      stroke: acc, sw: 0.8
    })
    finalEls.push({
      type: 'line',
      x1: pts12[i].x * 0.88, y1: pts12[i].y * 0.88,
      x2: Math.cos(aInner2) * innerR12f, y2: Math.sin(aInner2) * innerR12f,
      stroke: acc, sw: 0.8
    })
  }

  steps.push({
    desc: 'The 12-fold Moorish pattern crowns the construction — a star of 12 rays, as seen in the great mosques of Andalusia and North Africa.',
    elements: finalEls,
    isFinal: true
  })

  return steps
}
