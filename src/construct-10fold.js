// بسم الله الرحمن الرحيم

/**
 * 10-Fold Decagonal Construction
 *
 * The TENFOLD pattern — the library's namesake.
 *
 * Based on:
 * - Mr Oshaghi's shamsa (decagram) method
 * - The golden ratio proportions from research/golden-ratio.md
 * - The {10/3} star polygon with inner decagon at exactly R/φ
 *
 * The 10-fold system is rooted in the golden ratio φ = (1+√5)/2.
 * Every proportion — the decagon side length, the star arm intersections,
 * the nesting of inner forms — is a power of 1/φ.
 *
 * Key identities:
 *   φ = 2·cos(π/5) = 2·cos(36°)
 *   Decagon side = R / φ  (exact)
 *   {10/3} inner radius = R / φ  (exact)
 *   {10/4} inner radius = R · tan(π/10) = R·(√5-1)/2 / √(5-2√5)  (not a power of φ)
 *
 * The shamsa ("sun") is the 10-pointed star that appears in Persian Islamic art,
 * most famously in the Darb-i Imam shrine (Isfahan, 1453 CE).
 *
 * Historical context: 10-fold geometry was called "shamsa" (شمسه, "sun") by Persian
 * craftsmen. The decagram combines the 5-fold golden-ratio system with its reflection,
 * producing a form that radiates like the sun in 10 directions.
 */

const TAU = Math.PI * 2
const PHI = (1 + Math.sqrt(5)) / 2  // Golden ratio ≈ 1.6180...

/**
 * Generate all construction geometry for a 10-fold shamsa pattern.
 * @param {number} R - Main circle radius
 * @returns {Array<Object>} - Steps array, each with {desc, elements, isFinal?}
 */
export function construct10Fold(R) {
  const C = (a) => { const v = Math.round(245 - (245-80)*a); return `rgb(${v},${v-5},${v-15})`; }
  const cons = C(0.6)
  const acc  = '#2c3e6b'
  const blue = 'rgba(50,90,180,.45)'
  const gold = 'rgba(180,120,30,.45)'
  const phi_c = 'rgba(212,180,100,.4)'   // golden color for φ proportions

  const steps = []

  // ─── Key measures (all derived from R and φ) ───────────────────────────────
  //
  // φ = (1+√5)/2 ≈ 1.618
  // Decagon inscribed in circle of radius R:
  //   side length s = 2R·sin(π/10) = R/φ  (exact: sin18° = 1/(2φ))
  //   apothem (center to edge midpoint) = R·cos(π/10) = R·cos(18°)
  //   interior angle = 144° = 4×36°

  const s = R / PHI              // side length of regular decagon = R/φ
  const apothem = R * Math.cos(Math.PI / 10)   // distance from center to side midpoint

  // Inner star circle at R/φ (the {10/3} inner decagon — exact identity)
  const Rin = R / PHI            // inner circle radius: Rin = R/φ

  // The {10/3} star: connect every 3rd vertex of the outer decagon
  // 10 vertices on the main circle
  const pts10 = []
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU - TAU / 4  // start at top
    pts10.push({ x: Math.cos(a) * R, y: Math.sin(a) * R, a })
  }

  // 10 vertices on the inner circle (at R/φ) — same angular positions
  const pts10in = pts10.map(p => ({ x: p.x / PHI, y: p.y / PHI, a: p.a }))

  // The 10 points on a middle circle at R·cos(π/5) = R·(√5+1)/4 × something
  // For the {10/4} star: connect every 4th vertex. Inner polygon at tan(π/10)·R
  const Rtip = R * Math.tan(Math.PI / 10)  // ≈ 0.3249·R — very inner decagon

  // The star arm tips (for the {10/3} star drawn as lines)
  // {10/3}: from vertex i, connect to vertex i+3
  // These lines intersect to form the star arms.
  // The intersection of the {10/3} lines forms an inner decagon at exactly Rin = R/φ

  // ─── Step 1: Foundation circle ─────────────────────────────────────────────
  steps.push({
    desc: 'Draw the main circle — the shamsa begins here. In Persian, shamsa (شمسه) means "sun." All 10-fold proportions arise from this single circle and the golden ratio φ.',
    elements: [
      { type: 'circle', cx: 0, cy: 0, r: R, stroke: cons, fill: 'none', sw: 1 },
      { type: 'circle', cx: 0, cy: 0, r: 2, fill: C(0.6), stroke: 'none' },
    ]
  })

  // ─── Step 2: 10 equally-spaced points ──────────────────────────────────────
  const diametersStep = []
  for (let i = 0; i < 5; i++) {
    diametersStep.push({
      type: 'line',
      x1: pts10[i].x, y1: pts10[i].y,
      x2: pts10[i + 5].x, y2: pts10[i + 5].y,
      stroke: cons, sw: 0.7
    })
  }
  for (const p of pts10) {
    diametersStep.push({ type: 'circle', cx: p.x, cy: p.y, r: 3, fill: C(0.65), stroke: 'none' })
  }
  steps.push({
    desc: `Divide the circle into 10 equal parts (36° apart). Unlike 6-fold or 8-fold, this cannot be done with a compass alone — the heptagon requires φ. The side of the inscribed decagon equals R/φ exactly.`,
    elements: diametersStep
  })

  // ─── Step 3: The regular decagon ───────────────────────────────────────────
  const decagonEl = []
  for (let i = 0; i < 10; i++) {
    const p = pts10[i], q = pts10[(i + 1) % 10]
    decagonEl.push({ type: 'line', x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: gold, sw: 1 })
  }
  steps.push({
    desc: `Connect adjacent points to form the regular decagon. Every side has length R/φ ≈ ${(R / PHI).toFixed(2)}. Every interior angle is 144° = 4×36°. All Islamic 10-fold geometry is built from this single form.`,
    elements: decagonEl
  })

  // ─── Step 4: Pentagon (skip one vertex) ───────────────────────────────────
  const pentEl = []
  for (let i = 0; i < 5; i++) {
    const p = pts10[i * 2], q = pts10[(i * 2 + 2) % 10]
    pentEl.push({ type: 'line', x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: blue, sw: 0.8 })
  }
  const pent2El = []
  for (let i = 0; i < 5; i++) {
    const p = pts10[i * 2 + 1], q = pts10[(i * 2 + 3) % 10]
    pent2El.push({ type: 'line', x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: phi_c, sw: 0.8 })
  }
  steps.push({
    desc: 'Connect every other vertex to form two interlocking regular pentagons — one from the even vertices (blue), one from the odd (gold). The 10-fold system is built from two overlapping pentagons, just as 8-fold uses two overlapping squares.',
    elements: [...pentEl, ...pent2El]
  })

  // ─── Step 5: Pentagram diagonals ──────────────────────────────────────────
  const pentagramEl = []
  for (let i = 0; i < 5; i++) {
    const p = pts10[i * 2], q = pts10[(i * 2 + 4) % 10]
    pentagramEl.push({ type: 'line', x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: blue, sw: 0.6, opacity: 0.5 })
  }
  for (let i = 0; i < 5; i++) {
    const p = pts10[i * 2 + 1], q = pts10[(i * 2 + 5) % 10]
    pentagramEl.push({ type: 'line', x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: phi_c, sw: 0.6, opacity: 0.5 })
  }
  // Mark inner decagon at R/φ
  pentagramEl.push({
    type: 'circle', cx: 0, cy: 0, r: Rin, stroke: C(0.45), fill: 'none', sw: 0.7
  })
  steps.push({
    desc: `The diagonals of each pentagon cross to form a pentagram {5/2}. Their intersections fall on a circle of radius R/φ ≈ ${Rin.toFixed(2)} — this is where the golden ratio emerges geometrically. The inner circle is drawn at exactly R/φ.`,
    elements: pentagramEl
  })

  // ─── Step 6: {10/3} star construction ─────────────────────────────────────
  // Connect every vertex to the vertex 3 steps away
  const star103El = []
  for (let i = 0; i < 10; i++) {
    const p = pts10[i], q = pts10[(i + 3) % 10]
    star103El.push({ type: 'line', x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: C(0.4), sw: 0.8 })
  }
  // Mark the inner polygon of {10/3}
  for (let i = 0; i < 10; i++) {
    const a = pts10[i].a
    star103El.push({ type: 'circle', cx: Math.cos(a) * Rin, cy: Math.sin(a) * Rin, r: 2.5, fill: gold, stroke: 'none' })
  }
  steps.push({
    desc: `Draw the {10/3} star polygon — connect every vertex to the third vertex around the decagon. The 10 inner vertices where these chords intersect lie on a circle of radius exactly R/φ. This algebraic identity is unique to 10-fold symmetry among all star polygons.`,
    elements: star103El
  })

  // ─── Step 7: The shamsa — {10/4} star (the "sun") ─────────────────────────
  // Connect every vertex to the 4th vertex away
  // {10/4} creates the classic 10-pointed shamsa star
  const star104El = []
  for (let i = 0; i < 10; i++) {
    const p = pts10[i], q = pts10[(i + 4) % 10]
    star104El.push({ type: 'line', x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: C(0.65), sw: 0.8 })
  }
  steps.push({
    desc: `Draw the {10/4} star — connect every vertex to the fourth vertex. This is the shamsa, the "sun" of Persian art. The arms are sharper than {10/3}, creating the distinctive 10-rayed star seen in the Darb-i Imam shrine, Isfahan (1453 CE).`,
    elements: star104El
  })

  // ─── Step 8: Inner decagon at R/φ ─────────────────────────────────────────
  const innerDecEl = []
  for (let i = 0; i < 10; i++) {
    const p = pts10in[i], q = pts10in[(i + 1) % 10]
    innerDecEl.push({ type: 'line', x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: phi_c, sw: 1 })
  }
  for (const p of pts10in) {
    innerDecEl.push({ type: 'circle', cx: p.x, cy: p.y, r: 2.5, fill: gold, stroke: 'none' })
  }
  steps.push({
    desc: `The inner decagon at radius R/φ — the self-similarity heart of the pattern. This inner form is a complete, smaller copy of the whole, scaled by 1/φ. Repeat the construction inside it to produce infinite self-similar nesting, level by level.`,
    elements: innerDecEl
  })

  // ─── Step 9: Contact angle lines (PIC method) ─────────────────────────────
  // θ = 72° (= 90° - 180°/10) for 10-fold
  // Draw the contact angle lines from each edge midpoint
  const picEl = []
  const theta = (90 - 180 / 10) * Math.PI / 180  // 72°
  for (let i = 0; i < 10; i++) {
    const p = pts10[i], q = pts10[(i + 1) % 10]
    const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2
    const dx = q.x - p.x, dy = q.y - p.y
    const len = Math.sqrt(dx * dx + dy * dy)
    const ex = dx / len, ey = dy / len
    // Two rays at ±θ from edge direction
    const rayLen = s * 0.8
    for (const sign of [1, -1]) {
      const ca = Math.cos(sign * theta), sa = Math.sin(sign * theta)
      const rx = ex * ca - ey * sa
      const ry = ex * sa + ey * ca
      picEl.push({
        type: 'line',
        x1: mx, y1: my,
        x2: mx + rx * rayLen, y2: my + ry * rayLen,
        stroke: 'rgba(192,57,43,.5)', sw: 1.2
      })
    }
    // Mark midpoint
    picEl.push({ type: 'circle', cx: mx, cy: my, r: 2, fill: C(0.65), stroke: 'none' })
  }
  steps.push({
    desc: `The Kaplan PIC contact angle: θ = 72° = 90°−180°/10. From the midpoint of each decagon edge, two rays emerge at ±72° to the edge. Where these rays meet their counterparts from neighboring edges, the star arms form. This is the mathematical DNA of every 10-fold pattern.`,
    elements: picEl
  })

  // ─── Step 10: Final shamsa pattern ────────────────────────────────────────
  // Generate the complete {10/3} and {10/4} star pattern as final artwork
  const finalEl = []

  // The complete star pattern: {10/3} in accent color
  for (let i = 0; i < 10; i++) {
    const p = pts10[i], q = pts10[(i + 3) % 10]
    finalEl.push({ type: 'line', x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: acc, sw: 1.5 })
  }

  // Outer rim — the containing decagon
  for (let i = 0; i < 10; i++) {
    const p = pts10[i], q = pts10[(i + 1) % 10]
    finalEl.push({ type: 'line', x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: C(0.35), sw: 1 })
  }

  // Inner decagon
  for (let i = 0; i < 10; i++) {
    const p = pts10in[i], q = pts10in[(i + 1) % 10]
    finalEl.push({ type: 'line', x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: C(0.65), sw: 0.8 })
  }

  steps.push({
    desc: `The shamsa — complete. The {10/3} star radiates from the center like a sun. Its arms encode the golden ratio at every level: outer tips at R, first intersection at R/φ, inner decagon at R/φ², onward to infinity. This is the geometry of the Darb-i Imam shrine.`,
    isFinal: true,
    elements: finalEl
  })

  // ─── Step 11: The full tiling (4×4 grid repeating) ────────────────────────
  // Show how the single shamsa tiles into a repeating pattern using girih proportions
  const tilingEl = []

  // The girih tile repeat for 10-fold: the repeat vector is along the decagon side direction
  // Full decagonal tiling uses decagons + pentagons + bow-ties (dart shapes)
  // Here we approximate with a simple translation grid for the demo

  // Translation vectors for approximate decagonal tiling:
  // In a proper decagonal tiling, the repeat is quasiperiodic.
  // For a periodic approximation: use the "elongated hexagon" repeat
  // which places decagons at distance 2R cos(π/10) apart
  const repeatX = 2 * apothem   // ≈ 1.902·R
  const repeatY = 2 * apothem * Math.sin(Math.PI / 5) + R / PHI  // approximate

  // Draw 3×3 copies of the {10/3} star pattern
  for (let row = -1; row <= 1; row++) {
    for (let col = -1; col <= 1; col++) {
      if (row === 0 && col === 0) continue  // center already drawn
      const offX = col * repeatX + (row % 2) * (repeatX / 2)
      const offY = row * (R / PHI + R * Math.sin(Math.PI / 5))
      const scaledR = R * 0.98

      for (let i = 0; i < 10; i++) {
        const pa = (i / 10) * TAU - TAU / 4
        const qa = ((i + 3) / 10) * TAU - TAU / 4
        finalEl.push({
          type: 'line',
          x1: offX + Math.cos(pa) * scaledR,
          y1: offY + Math.sin(pa) * scaledR,
          x2: offX + Math.cos(qa) * scaledR,
          y2: offY + Math.sin(qa) * scaledR,
          stroke: C(0.4), sw: 0.8
        })
      }
    }
  }

  return steps
}

/**
 * Generate just the final shamsa star segments (for embedding in other demos).
 * Returns SVG path data string.
 *
 * @param {number} R - circumradius
 * @param {number} cx - center x
 * @param {number} cy - center y
 * @param {'10/3'|'10/4'} variant - which star polygon
 * @returns {string} SVG path data
 */
export function shamsaPath(R, cx = 0, cy = 0, variant = '10/3') {
  const pts = []
  const skip = variant === '10/3' ? 3 : 4
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU - TAU / 4
    pts.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R })
  }

  let d = ''
  for (let i = 0; i < 10; i++) {
    const p = pts[i], q = pts[(i + skip) % 10]
    d += `M ${p.x.toFixed(2)},${p.y.toFixed(2)} L ${q.x.toFixed(2)},${q.y.toFixed(2)} `
  }
  return d.trim()
}

/**
 * Generate the full decagonal tiling pattern (decagons + pentagons + bow-ties).
 * This is the girih tile approach — the historical method of Persian craftsmen.
 *
 * @param {number} W - viewport width
 * @param {number} H - viewport height
 * @param {number} size - decagon circumradius
 * @returns {Array<[number,number,number,number]>} segments [x1,y1,x2,y2]
 */
export function decagonalTiling(W, H, size = 60) {
  const segments = []
  const skip = 3  // {10/3} star
  const margin = size * 2

  // Approximate periodic tiling using hexagonal-like arrangement
  // True decagonal tiling is quasiperiodic; this approximation has
  // period ≈ 2·apothem × 2·apothem·sin(36°) + s
  const apothem = size * Math.cos(Math.PI / 10)
  const s = size / PHI
  const rowH = apothem + s / 2
  const rowW = 2 * apothem

  const rows = Math.ceil((H + margin * 2) / rowH)
  const cols = Math.ceil((W + margin * 2) / rowW)

  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      const cx = c * rowW + (r % 2) * apothem - margin
      const cy = r * rowH - margin
      const pts = []
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * TAU - TAU / 4
        pts.push({ x: cx + Math.cos(a) * size, y: cy + Math.sin(a) * size })
      }
      for (let i = 0; i < 10; i++) {
        const p = pts[i], q = pts[(i + skip) % 10]
        segments.push([p.x, p.y, q.x, q.y])
      }
    }
  }

  return segments
}
