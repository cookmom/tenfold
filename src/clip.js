// بسم الله الرحمن الرحيم

/**
 * Boundary Clipping
 * Clip line segments to arbitrary boundaries via binary search.
 */

export function clipToBoundary(x1, y1, x2, y2, inside) {
  const in1 = inside(x1, y1), in2 = inside(x2, y2)
  if (in1 && in2) return [x1, y1, x2, y2]
  if (!in1 && !in2) return null
  let ax = in1 ? x1 : x2, ay = in1 ? y1 : y2
  let bx = in1 ? x2 : x1, by = in1 ? y2 : y1
  for (let i = 0; i < 14; i++) {
    const mx = (ax + bx) / 2, my = (ay + by) / 2
    if (inside(mx, my)) { ax = mx; ay = my } else { bx = mx; by = my }
  }
  return in1 ? [x1, y1, ax, ay] : [ax, ay, x2, y2]
}
