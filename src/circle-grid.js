// بسم الله الرحمن الرحيم

/**
 * Circle Grid Generator
 * 
 * The foundation of Islamic geometric patterns: overlapping circles
 * on a regular grid. The pattern emerges at intersection points.
 */

export function circleIntersections(x1, y1, r1, x2, y2, r2) {
  const dx = x2 - x1, dy = y2 - y1
  const d = Math.sqrt(dx * dx + dy * dy)
  if (d > r1 + r2 || d < Math.abs(r1 - r2) || d < 1e-10) return []
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
  const hSq = r1 * r1 - a * a
  if (hSq < 0) return []
  const h = Math.sqrt(hSq)
  const mx = x1 + a * dx / d, my = y1 + a * dy / d
  return [
    [mx - dy * h / d, my + dx * h / d],
    [mx + dy * h / d, my - dx * h / d]
  ]
}

export function circleGrid({ x, y, w, h, size, type = 'hex' }) {
  const centers = []
  const margin = size * 1.5
  if (type === 'hex') {
    const rowH = size * Math.sqrt(3) / 2
    let row = 0
    for (let cy = y - margin; cy <= y + h + margin; cy += rowH) {
      const offset = (row % 2) * size / 2
      for (let cx = x - margin; cx <= x + w + margin; cx += size) {
        centers.push([cx + offset, cy])
      }
      row++
    }
  } else {
    for (let cy = y - margin; cy <= y + h + margin; cy += size) {
      for (let cx = x - margin; cx <= x + w + margin; cx += size) {
        centers.push([cx, cy])
      }
    }
  }
  return centers
}
