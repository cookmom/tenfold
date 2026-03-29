// بسم الله الرحمن الرحيم

/**
 * SVG Output
 * Convert line segments to clean, resolution-independent SVG.
 */

export function toSVG(lines, options = {}) {
  const {
    width = 800, height = 800, padding = 20,
    stroke = '#c0392b', strokeWidth = 1,
    background = 'none'
  } = options

  const paths = lines.map(([x1, y1, x2, y2]) =>
    `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"/>`
  ).join('\n    ')

  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- بسم الله الرحمن الرحيم -->
<svg xmlns="http://www.w3.org/2000/svg" 
     viewBox="${-padding} ${-padding} ${width + padding * 2} ${height + padding * 2}"
     width="${width + padding * 2}" height="${height + padding * 2}">
  ${background !== 'none' ? `<rect x="${-padding}" y="${-padding}" width="100%" height="100%" fill="${background}"/>` : ''}
  <g stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round">
    ${paths}
  </g>
</svg>`
}
