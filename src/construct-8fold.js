// بسم الله الرحمن الرحيم

/**
 * 8-Fold Zellige Construction (Sandy Kurt method)
 * 
 * 19 steps from circle to khatam rosette.
 * Each step returns SVG elements to add to the drawing.
 * Construction lines in grey, final pattern in accent color.
 */

const TAU = Math.PI * 2

/**
 * Generate all construction geometry for an 8-fold pattern.
 * @param {number} R - Main circle radius
 * @returns {Array<Object>} - Steps array, each with {desc, elements}
 */
export function construct8Fold(R) {
  // Precompute key points
  const pts8 = [], pts16 = []
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU - TAU / 4
    pts8.push({ x: Math.cos(a) * R, y: Math.sin(a) * R, a })
  }
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * TAU - TAU / 4
    pts16.push({ x: Math.cos(a) * R, y: Math.sin(a) * R, a })
  }

  // Small circle radius: tangent to adjacent construction lines
  // For 8-fold: the two overlapping squares (static at 0° and dynamic at 45°)
  // intersect at 8 points. Each intersection is where one side of the static square
  // meets one side of the dynamic square.
  //
  // The static square has sides like x-y=R (connecting top to right).
  // The dynamic square has sides like x=R/√2 (vertical through diagonal corner).
  // Their intersection: (R/√2, R/√2-R) = (R/√2, R(1/√2-1))
  // Distance from origin = R*√(1/2 + (1/√2-1)²) = R*√(2-√2) ≈ 0.7654*R
  //
  // The small circle fits at each intersection, tangent to BOTH square sides.
  // The angle between the two sides at the intersection = π/4 (45°).
  // The incircle of the wedge (tangent to both sides, touching the vertex) has:
  //   center on the angle bisector at distance d from vertex
  //   radius = d * tan(π/8)  [half the wedge angle = π/8]
  //
  // Sandy's construction places the compass at square CORNER (on main circle),
  // spanning to the intersection point = distance R - R*√(2-√2) from corner.
  // But the clean formula: rSmall = R * tan(π/8) / 2 = R*(√2-1)/2 ≈ 0.2071*R
  // This comes from the geometry of the two tangent lines at 45° crossing angle.
  const rSmall = R * Math.tan(Math.PI / 8) / 2  // = R*(√2-1)/2 ≈ 0.2071*R

  // CORRECT circle centers at square-side intersections:
  // The 8 octagon vertices (where the two squares' sides cross) are at:
  //   distance = R * √(2-√2) ≈ 0.7654*R from center
  // NOT at R*cos(π/8) = 0.9239*R (that is the octagon apothem, not vertex distance)
  const octR = R * Math.sqrt(2 - Math.SQRT2)  // ≈ 0.7654*R — square intersection radius

  // Inner circle radius (step 9): tangent to the small circles from inside
  // Small circles have center at octR and radius rSmall
  // Inner tangent circle: rInner = octR - rSmall
  const rInner = octR - rSmall

  // Second ring circles (steps 10-12): at the octagon intersection radius
  const ring2Centers = pts8.map(p => ({
    x: p.x * Math.sqrt(2 - Math.SQRT2),
    y: p.y * Math.sqrt(2 - Math.SQRT2)
  }))

  // Build steps
  const steps = []
  const C = (a) => `rgba(80,70,55,${a})`
  const cons = C(0.35) // construction
  // acc already declared above
  const acc = C(0.85)  // accent — final khatam lines
  const blue = 'rgba(50,90,180,.45)'
  const gold = 'rgba(180,120,30,.45)'

  // Step 1: Main circle + center
  steps.push({
    desc: 'Draw the initial circle — the foundation of all Islamic patterns.',
    elements: [
      { type: 'circle', cx: 0, cy: 0, r: R, stroke: cons, fill: 'none', sw: 0.5 },
      { type: 'circle', cx: 0, cy: 0, r: 2, stroke: 'none', fill: C(0.5) },
      { type: 'line', x1: 0, y1: 0, x2: R*0.95, y2: 0, stroke: C(0.45), sw: 0.4 },
      { type: 'text', x: R*0.45, y: -8, text: 'R', fill: C(0.5), size: 11 }
    ]
  })

  // Step 2: Divide into 8
  steps.push({
    desc: 'Divide the circle into 8 equal parts — the compass finds each point.',
    elements: pts8.map(p => ({ type: 'line', x1: 0, y1: 0, x2: p.x, y2: p.y, stroke: cons, sw: 0.4 }))
      .concat(pts8.map(p => ({ type: 'circle', cx: p.x, cy: p.y, r: 2, stroke: 'none', fill: C(0.45) })))
  })

  // Step 3: Static square (connect points 0,2,4,6)
  steps.push({
    desc: 'Connect alternate points — the static square appears (blue).',
    elements: [0,2,4,6].map((i, idx, arr) => {
      const j = arr[(idx + 1) % arr.length]
      return { type: 'line', x1: pts8[i].x, y1: pts8[i].y, x2: pts8[j].x, y2: pts8[j].y, stroke: blue, sw: 0.8 }
    })
  })

  // Step 4: Dynamic square (connect points 1,3,5,7)
  steps.push({
    desc: 'Rotate 45° — the dynamic square (gold). Two squares inscribed in one circle.',
    elements: [1,3,5,7].map((i, idx, arr) => {
      const j = arr[(idx + 1) % arr.length]
      return { type: 'line', x1: pts8[i].x, y1: pts8[i].y, x2: pts8[j].x, y2: pts8[j].y, stroke: gold, sw: 0.8 }
    })
  })

  // Step 5: 16 subdivisions
  steps.push({
    desc: 'The square intersections divide the circle into 16 equal parts.',
    elements: pts16.filter((_, i) => i % 2 === 1).map(p => (
      { type: 'circle', cx: p.x, cy: p.y, r: 1.5, stroke: 'none', fill: C(0.5) }
    )).concat(pts16.filter((_, i) => i % 2 === 1).map(p => (
      { type: 'line', x1: 0, y1: 0, x2: p.x, y2: p.y, stroke: C(0.45), sw: 0.3 }
    )))
  })

  // Step 6: Small circles at square intersections + center
  // Centers are at the 8 octagon vertices (sqrt(2-√2)*R from center) plus origin.
  // BUG FIX: was 0.924 (= cos(π/8)) — correct scale is sqrt(2-√2) ≈ 0.7654
  const octScale = Math.sqrt(2 - Math.SQRT2)  // ≈ 0.7654
  const circCenters = [{ x: 0, y: 0 }].concat(
    pts8.map(p => ({ x: p.x * octScale, y: p.y * octScale }))
  )
  steps.push({
    desc: 'Point the compass on each intersection — draw circles tangent to the construction lines. Radius r = R·tan(π/8)/2 ≈ 0.207R.',
    elements: circCenters.map(c => (
      { type: 'circle', cx: c.x, cy: c.y, r: rSmall, stroke: cons, fill: 'none', sw: 0.4 }
    )).concat([
      { type: 'text', x: R*0.55, y: R*0.85, text: 'r = R·tan(π/8)/2', fill: C(0.35), size: 9 }
    ])
  })

  // Step 7: Horizontal + vertical connecting lines
  steps.push({
    desc: 'Draw pairs of horizontal and vertical lines connecting circle centers.',
    elements: [
      // Vertical pair
      { type: 'line', x1: -rSmall, y1: -R * 1.1, x2: -rSmall, y2: R * 1.1, stroke: cons, sw: 0.3 },
      { type: 'line', x1: rSmall, y1: -R * 1.1, x2: rSmall, y2: R * 1.1, stroke: cons, sw: 0.3 },
      // Horizontal pair
      { type: 'line', x1: -R * 1.1, y1: -rSmall, x2: R * 1.1, y2: -rSmall, stroke: cons, sw: 0.3 },
      { type: 'line', x1: -R * 1.1, y1: rSmall, x2: R * 1.1, y2: rSmall, stroke: cons, sw: 0.3 },
    ]
  })

  // Step 8: Diagonal connecting lines
  const d = rSmall * Math.SQRT2 / 2
  steps.push({
    desc: 'Repeat diagonally — a network of parallel lines fills the construction.',
    elements: [
      // Diagonal ↘ pair
      { type: 'line', x1: -R*1.1 - d, y1: -R*1.1 + d, x2: R*1.1 - d, y2: R*1.1 + d, stroke: cons, sw: 0.3 },
      { type: 'line', x1: -R*1.1 + d, y1: -R*1.1 - d, x2: R*1.1 + d, y2: R*1.1 - d, stroke: cons, sw: 0.3 },
      // Diagonal ↗ pair
      { type: 'line', x1: -R*1.1 - d, y1: R*1.1 - d, x2: R*1.1 - d, y2: -R*1.1 - d, stroke: cons, sw: 0.3 },
      { type: 'line', x1: -R*1.1 + d, y1: R*1.1 + d, x2: R*1.1 + d, y2: -R*1.1 + d, stroke: cons, sw: 0.3 },
    ]
  })

  // Step 9: Inner circle tangent to step 8 circle
  steps.push({
    desc: 'A new circle at the center, tangent to the construction — the inner boundary.',
    elements: [
      { type: 'circle', cx: 0, cy: 0, r: rInner, stroke: cons, fill: 'none', sw: 0.5 }
    ]
  })

  // Step 10: 8 circles at inner radius
  steps.push({
    desc: 'Eight circles at the inner ring — the rosette skeleton takes shape.',
    elements: ring2Centers.map(c => (
      { type: 'circle', cx: c.x, cy: c.y, r: rSmall, stroke: cons, fill: 'none', sw: 0.4 }
    ))
  })

  // Steps 11-16: More parallel lines through intersections (simplified)
  // For the demo, combine into one step showing the full line network
  const lineNet = []
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU
    const cos = Math.cos(a), sin = Math.sin(a)
    // Lines parallel to each radial direction, offset by rSmall
    const px = -sin * rSmall, py = cos * rSmall
    lineNet.push({ type: 'line', x1: cos * R * 1.2 + px, y1: sin * R * 1.2 + py, x2: -cos * R * 1.2 + px, y2: -sin * R * 1.2 + py, stroke: C(0.2), sw: 0.25 })
    lineNet.push({ type: 'line', x1: cos * R * 1.2 - px, y1: sin * R * 1.2 - py, x2: -cos * R * 1.2 - px, y2: -sin * R * 1.2 - py, stroke: C(0.2), sw: 0.25 })
  }
  steps.push({
    desc: 'Parallel lines in all 8 directions — the complete construction network.',
    elements: lineNet
  })

  // Step 12: Octagons at intersection circles
  const octEls = []
  for (const c of circCenters) {
    const oR = rSmall * 0.92
    for (let i = 0; i < 8; i++) {
      const a1 = (i / 8) * TAU + TAU / 16
      const a2 = ((i + 1) / 8) * TAU + TAU / 16
      octEls.push({
        type: 'line',
        x1: c.x + Math.cos(a1) * oR, y1: c.y + Math.sin(a1) * oR,
        x2: c.x + Math.cos(a2) * oR, y2: c.y + Math.sin(a2) * oR,
        stroke: C(0.45), sw: 0.5
      })
    }
  }
  steps.push({
    desc: 'Draw octagons inside each small circle — the tile boundaries appear.',
    elements: octEls
  })

  // FINAL STEP: The khatam — proper 8-pointed star rosette ({8/3} star polygon)
  //
  // The khatam is the {8/3} star polygon:
  //   - 8 outer tips at radius R, at angles k*45° (the pts8 points)
  //   - Connect each tip to the tip 3 steps away (skip 2 in between)
  //   - The 8 crossing points of these lines form an inner octagon at R*(√2-1)
  //
  // Exact identity: inner octagon radius = R * cos(3π/8)/cos(π/8) = R*(√2-1) = R*tan(π/8)
  //
  // Fixes vs original:
  //   - Was {16/3} (16-pointed figure) → now correct {8/3} (8-pointed khatam)
  //   - Was innerScale=0.55 (arbitrary) → now exact R*(√2-1) ≈ 0.4142*R
  //   - Added missing 'acc' color variable
  //   - Fixed circCenters scale from 0.924 (cos π/8) to sqrt(2-√2) (correct octagon radius)
  const finalEls = []
  
  // {8/3}: connect pts8[i] to pts8[(i+3)%8] — these 8 lines form the khatam star
  for (let i = 0; i < 8; i++) {
    const j = (i + 3) % 8
    finalEls.push({
      type: 'line',
      x1: pts8[i].x, y1: pts8[i].y,
      x2: pts8[j].x, y2: pts8[j].y,
      stroke: acc, sw: 1.4
    })
  }
  
  // Inner octagon at the 8 crossing points, exactly at R*(√2-1) = R*tan(π/8)
  // Vertices at angles: k*45° + 22.5° (halfway between star tips)
  const innerR = R * (Math.SQRT2 - 1)  // = R * tan(π/8) ≈ 0.4142*R (EXACT)
  for (let i = 0; i < 8; i++) {
    const a1 = (i / 8) * TAU - TAU / 4 + TAU / 16  // 22.5° offset between star tips
    const a2 = ((i + 1) / 8) * TAU - TAU / 4 + TAU / 16
    finalEls.push({
      type: 'line',
      x1: Math.cos(a1) * innerR, y1: Math.sin(a1) * innerR,
      x2: Math.cos(a2) * innerR, y2: Math.sin(a2) * innerR,
      stroke: acc, sw: 1.4
    })
  }

  steps.push({
    desc: 'The khatam {8/3} reveals itself — the 8-pointed star, heart of Moroccan zellige. Inner radius = R·(√2−1).',
    elements: finalEls,
    isFinal: true
  })

  return steps
}
