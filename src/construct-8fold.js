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
  // For 8-fold: the small circle at an intersection fits between
  // a radial line and the next one (22.5° apart).
  // r_small = R * sin(π/8) * some factor based on tangency
  // From Sandy's construction: compass at square corner, tangent to 
  // both the vertical/horizontal AND diagonal lines.
  // The distance from a square corner to the nearest line:
  // At a corner of the static square (top), the nearest diagonal line 
  // passes at distance = R * sin(π/4) * sin(π/8)
  // Simplified: r_small ≈ R * (1 - cos(π/8)) * 1.08
  // Actually from the geometry: the small circle at intersection has
  // radius = R * tan(π/8) / 2 ≈ R * 0.2071
  const rSmall = R * Math.tan(Math.PI / 8) / 2

  // Inner circle radius (step 9): tangent to the small circle at step 8
  // The small circle at step 8 is at the intersection of two construction lines
  // Its center is approximately at R * cos(π/8) from center
  // Inner circle: R_inner = R * cos(π/8) - rSmall
  const rInner = R * Math.cos(Math.PI / 8) - rSmall

  // Second ring circles (steps 10-12): at R * cos(π/8), radius rSmall
  const ring2Centers = pts8.map(p => ({
    x: p.x * Math.cos(Math.PI / 8),
    y: p.y * Math.cos(Math.PI / 8)
  }))

  // Build steps
  const steps = []
  const C = (a) => `rgba(232,228,220,${a})`
  const cons = C(0.12) // construction
  const acc = '#c0392b'
  const blue = 'rgba(120,160,255,.35)'
  const gold = 'rgba(255,180,80,.35)'

  // Step 1: Main circle + center
  steps.push({
    desc: 'Draw the initial circle — the foundation of all Islamic patterns.',
    elements: [
      { type: 'circle', cx: 0, cy: 0, r: R, stroke: cons, fill: 'none', sw: 0.5 },
      { type: 'circle', cx: 0, cy: 0, r: 2, stroke: 'none', fill: C(0.4) }
    ]
  })

  // Step 2: Divide into 8
  steps.push({
    desc: 'Divide the circle into 8 equal parts — the compass finds each point.',
    elements: pts8.map(p => ({ type: 'line', x1: 0, y1: 0, x2: p.x, y2: p.y, stroke: cons, sw: 0.4 }))
      .concat(pts8.map(p => ({ type: 'circle', cx: p.x, cy: p.y, r: 2, stroke: 'none', fill: C(0.3) })))
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
      { type: 'circle', cx: p.x, cy: p.y, r: 1.5, stroke: 'none', fill: C(0.25) }
    )).concat(pts16.filter((_, i) => i % 2 === 1).map(p => (
      { type: 'line', x1: 0, y1: 0, x2: p.x, y2: p.y, stroke: C(0.06), sw: 0.3 }
    )))
  })

  // Step 6: Small circles at square intersections + center
  const circCenters = [{ x: 0, y: 0 }].concat(
    pts8.map(p => ({ x: p.x * 0.924, y: p.y * 0.924 }))
  )
  steps.push({
    desc: 'Point the compass on each intersection — draw circles tangent to the construction lines.',
    elements: circCenters.map(c => (
      { type: 'circle', cx: c.x, cy: c.y, r: rSmall, stroke: cons, fill: 'none', sw: 0.4 }
    ))
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
    lineNet.push({ type: 'line', x1: cos * R * 1.2 + px, y1: sin * R * 1.2 + py, x2: -cos * R * 1.2 + px, y2: -sin * R * 1.2 + py, stroke: C(0.08), sw: 0.25 })
    lineNet.push({ type: 'line', x1: cos * R * 1.2 - px, y1: sin * R * 1.2 - py, x2: -cos * R * 1.2 - px, y2: -sin * R * 1.2 - py, stroke: C(0.08), sw: 0.25 })
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
        stroke: C(0.15), sw: 0.5
      })
    }
  }
  steps.push({
    desc: 'Draw octagons inside each small circle — the tile boundaries appear.',
    elements: octEls
  })

  // FINAL STEP: The pattern — khatam star + rosette
  // Fade construction, highlight final design
  const finalEls = []
  
  // 8-pointed star (two overlapping squares at the khatam scale)
  // The star points land on the main circle's 16-subdivision points
  // Connect every-other-16th-point to skip one and make the star
  for (let i = 0; i < 16; i++) {
    const j = (i + 2) % 16
    finalEls.push({
      type: 'line',
      x1: pts16[i].x * 0.85, y1: pts16[i].y * 0.85,
      x2: pts16[j].x * 0.85, y2: pts16[j].y * 0.85,
      stroke: acc, sw: 1.5
    })
  }
  
  // Inner octagon
  for (let i = 0; i < 8; i++) {
    const a1 = (i / 8) * TAU + TAU / 16 - TAU / 4
    const a2 = ((i + 1) / 8) * TAU + TAU / 16 - TAU / 4
    finalEls.push({
      type: 'line',
      x1: Math.cos(a1) * rInner, y1: Math.sin(a1) * rInner,
      x2: Math.cos(a2) * rInner, y2: Math.sin(a2) * rInner,
      stroke: acc, sw: 1.5
    })
  }

  // Outer octagon (on main circle)
  for (let i = 0; i < 8; i++) {
    const a1 = ((i + 0.5) / 8) * TAU - TAU / 4
    const a2 = ((i + 1.5) / 8) * TAU - TAU / 4
    finalEls.push({
      type: 'line',
      x1: Math.cos(a1) * R, y1: Math.sin(a1) * R,
      x2: Math.cos(a2) * R, y2: Math.sin(a2) * R,
      stroke: acc, sw: 1.0
    })
  }

  // Connecting kite shapes between inner and outer octagons
  for (let i = 0; i < 8; i++) {
    const outerA = ((i + 0.5) / 8) * TAU - TAU / 4
    const innerA1 = (i / 8) * TAU + TAU / 16 - TAU / 4
    const innerA2 = ((i + 1) / 8) * TAU + TAU / 16 - TAU / 4
    finalEls.push({
      type: 'line',
      x1: Math.cos(outerA) * R, y1: Math.sin(outerA) * R,
      x2: Math.cos(innerA1) * rInner, y2: Math.sin(innerA1) * rInner,
      stroke: acc, sw: 1.2
    })
    finalEls.push({
      type: 'line',
      x1: Math.cos(outerA) * R, y1: Math.sin(outerA) * R,
      x2: Math.cos(innerA2) * rInner, y2: Math.sin(innerA2) * rInner,
      stroke: acc, sw: 1.2
    })
  }

  steps.push({
    desc: 'The pattern reveals itself. Construction fades — only the khatam star remains.',
    elements: finalEls,
    isFinal: true
  })

  return steps
}
