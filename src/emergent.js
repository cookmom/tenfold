// بسم الله الرحمن الرحيم

/**
 * Emergent Pattern Generator
 * 
 * Islamic star patterns emerge from overlapping circle grids.
 * 
 * Algorithm:
 * 1. For each pair of adjacent circles, compute intersection points
 * 2. For each circle, collect all intersection points on its perimeter
 * 3. Sort points by angle around the circle center
 * 4. Connect adjacent points → these lines ARE the pattern
 * 
 * No shape definitions. No tile templates.
 * The pattern is a consequence of pure circle geometry.
 */

import { circleIntersections } from './circle-grid.js'

export function emergentPattern(centers, radius, options = {}) {
  // maxDist controls which circle pairs can share intersection points.
  // Default radius * 2.32 is calibrated for radius ≈ spacing/2 (touching circles).
  //
  // For overlapping circles the correct maxDist must exceed the grid spacing
  // but stay below the second-nearest neighbor distance:
  //   hex grid: adjacent = spacing, second-nearest = spacing*√3
  //   square grid: adjacent = spacing, second-nearest = spacing*√2
  //
  // The factor 2.32 = 2*1.16 works only when radius ≈ spacing/2, i.e. 2.32*r ≈ 1.16*spacing.
  // For larger radii the caller should pass maxDist explicitly as a fraction of spacing,
  // e.g. emergentPattern(centers, r, { maxDist: spacing * 1.3 }) for hex grids.
  //
  // Warning: for hex grids with radius > spacing*0.577, maxDist=radius*2.32 may exceed
  // the second-nearest neighbor distance (spacing*√3) causing unintended connections.
  const { maxDist = radius * 2.32, clip } = options

  const pts = new Map()
  const key = (x, y) => `${Math.round(x * 8)},${Math.round(y * 8)}`

  for (let i = 0; i < centers.length; i++) {
    for (let j = i + 1; j < centers.length; j++) {
      const dx = centers[j][0] - centers[i][0]
      const dy = centers[j][1] - centers[i][1]
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < maxDist && dist > 0.1) {
        for (const pt of circleIntersections(
          centers[i][0], centers[i][1], radius,
          centers[j][0], centers[j][1], radius
        )) {
          const k = key(pt[0], pt[1])
          if (!pts.has(k)) pts.set(k, pt)
        }
      }
    }
  }

  const lines = []
  for (const [cx, cy] of centers) {
    const onCircle = []
    pts.forEach(pt => {
      const dx = pt[0] - cx, dy = pt[1] - cy
      if (Math.abs(Math.sqrt(dx * dx + dy * dy) - radius) < 1.5) {
        onCircle.push({ x: pt[0], y: pt[1], angle: Math.atan2(dy, dx) })
      }
    })
    onCircle.sort((a, b) => a.angle - b.angle)

    for (let k = 0; k < onCircle.length; k++) {
      const next = (k + 1) % onCircle.length
      const p1 = onCircle[k], p2 = onCircle[next]
      if (clip && (!clip(p1.x, p1.y) || !clip(p2.x, p2.y))) continue
      lines.push([p1.x, p1.y, p2.x, p2.y])
    }
  }

  return lines
}
