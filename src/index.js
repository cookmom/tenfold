// بسم الله الرحمن الرحيم

/**
 * Islamic Geometric Pattern Library
 * 
 * A zero-dependency generator for Islamic geometric patterns.
 * Outputs pure SVG paths from mathematical construction.
 * 
 * Two tools. Infinite patterns.
 */

export { circleIntersections, circleGrid } from './circle-grid.js'
export { emergentPattern } from './emergent.js'
export { clipToBoundary } from './clip.js'
export { toSVG } from './svg.js'
export { picPattern, picNgon, picHex, picSquare, tilingNgon, tilingHex, tilingSqare, tilingDecagonal, naturalContactAngle, degToRad } from './pic.js'
export { construct10Fold, shamsaPath, decagonalTiling } from './construct-10fold.js'
export { construct7Fold, heptagonPoints, tetradecagonPoints, heptagramSegments, bonner14Angles } from './construct-7fold.js'
export { morphPattern, morphPatternResolved, metamorphSegments, naturalTheta, thetaToFold, morphStarInNgon, WAYPOINTS } from './metamorphosis.js'
