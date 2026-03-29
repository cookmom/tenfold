# Islamic Geometric Pattern Construction Specifications
Source: Sandy Kurt tutorial PDFs + research
Extracted by tenfold researcher, 2026-03-29

All coordinates use origin O = (0, 0). R = radius of main circle.
"Static square" = square with sides parallel to axes (vertices at cardinal points).
"Dynamic square" = square rotated 45° (vertices on diagonals).

---

## 6-Fold Pattern (Flower of Life Base)
Source: sandy-kurt/6fold_pattern.pdf (7 pages)
Fold symmetry: 6

### Steps:
1. Draw circle C1 at origin O, radius R. This is the "main circle."
2. Divide C1 into 6 equal parts: place points at 0°, 60°, 120°, 180°, 240°, 300° on the perimeter.
   - P1=(R,0), P2=(R/2, R·√3/2), P3=(-R/2, R·√3/2), P4=(-R,0), P5=(-R/2,-R·√3/2), P6=(R/2,-R·√3/2)
3. Draw 6 circles of radius R, each centered at P1–P6. This creates the **Flower of Life**.
4. Add more circles: point compass on the intersections BETWEEN the 6 perimeter circles (where they cross each other). These intersections are at distance R from C1 center, at angles 30°, 90°, 150°, 210°, 270°, 330° and at distance R·√3 from O.
5. Draw horizontal and diagonal lines using the intersection points of all circles.
6. Draw vertical lines using the same intersection points.
7. Draw other diagonal lines (in the remaining directions) through the same intersection points.
8. Draw lines in the opposite diagonal direction.

### Key Construction Line (Step 7–8 detail):
The pattern-forming line connects specific intersections. Specifically: find two intersections on adjacent circles that are NOT the center-to-center line but offset inward. Connect these with a line — only the non-dashed (central) segment is used for the final pattern.

### Pattern Unit:
- The final pattern unit consists of 6-armed star shapes formed at the center
- Repeat the unit in all 6 surrounding circles

### Key Intersections:
- Where Circle C1 meets each of the 6 perimeter circles: 12 points total (2 per circle)
- Where adjacent perimeter circles meet each other: 6 additional intersection pairs
- The hexagonal grid of intersections forms at spacing = R

### Final Pattern:
Connect: the intersections between adjacent circles, tracing the pattern lines through only the inner (non-dashed) section of each constructed line. The result is a 6-pointed star (Star of David) pattern that tiles infinitely.

### Tiling:
Copy unit 6 times around the central circle to extend infinitely.

---

## 4-Fold Pattern Tutorial
Source: sandy-kurt/4fold_pattern.pdf (15 pages)
Fold symmetry: 4 (square symmetry)

### Steps:
1. Draw circle C1 at origin O, radius R. Divide into 8 equal parts:
   - Points at 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°
   - Cardinal points: N=(0,R), E=(R,0), S=(0,-R), W=(-R,0)
   - Diagonal points: NE=(R/√2, R/√2), NW=(-R/√2, R/√2), SW=(-R/√2,-R/√2), SE=(R/√2,-R/√2)

2. Draw a **static square** OUTSIDE circle C1:
   - Vertices at (±R·√2/2 extended to square corners)... more precisely: the outer square has side = 2R, vertices at (±R, ±R)
   - Actually: the static square has sides tangent to C1 at N, E, S, W, with vertices at (R, R), (-R, R), (-R, -R), (R, -R) i.e. side length = 2R, apothem = R

3. Draw a **static square** inside C1 (vertices at cardinal points N, E, S, W):
   - Square with vertices at (0,R), (R,0), (0,-R), (-R,0), side = R·√2

4. Draw a **dynamic square** inside C1 (vertices at diagonal points NE, NW, SW, SE):
   - Square with vertices at (R/√2, R/√2), (-R/√2, R/√2) etc., side = R·√2

5. Extend the static inner square lines to reach the outer square.

6. Find intersections between static and dynamic inner squares. Label these as:
   - R, S, T, U, V, W, Z, A1 (the 8 intersections where the two squares cross, inside C1)
   - These are at: (R/2, R/2 - approximation), computed as intersection of line from (0,R) to (R,0) with line from (R/√2, R/√2) to (-R/√2, R/√2) etc.
   - Exact: For static square edge from (0,R) to (R,0): y = R - x. For dynamic square edge from (R/√2,0) to (0,R/√2)... Actually static+dynamic intersection = R·(cos45°·cos45°) adjusted.
   - Key: these 8 intersections divide each edge of the inner squares.

7. Point compass on one of these intersections (e.g., point R). Open compass until point B1 (a specific intersection with the outer construction). Draw a **small circle** tangent to both the vertical and diagonal lines passing through R.
   - The radius of this small circle r_s = distance from R to its tangent point on the nearest axis line.
   - If R is at position (x_R, y_R), then r_s = min(x_R, y_R) (distance to nearest axis)

8. Using the SAME radius r_s, draw small circles centered on ALL 8 intersection points S, T, U, V, W, Z, A1.
   - Also draw a small circle at center A (origin O) with the same radius.
   - Draw QUARTER circles at the 4 corners J, K, M, L of the outer square.

9. Connect centers of all small circles to divide each small circle into 8 equal parts:
   - Connect horizontally, vertically, and diagonally between adjacent circle centers.

10. Draw a static square inside each small circle:
    - Sides parallel to axes, inscribed in the small circle.
    
11. Draw a dynamic square inside each small circle:
    - Rotated 45° relative to static, inscribed in small circle.
    - Extend lines of both squares WITHIN the main circle C1 boundary.

12. Connect the points where the two squares (static + dynamic) meet inside each small circle, then extend.

13. Complete the dynamic square lines: connect intersection points between small circles and diagonal direction lines.

14. Complete the static square lines: connect intersection points vertically.

15. Do same diagonally. All small circles now contain static + dynamic squares, including the central one and corner quarter-circles.

### Key Intersections:
- 8 intersections of inner static × dynamic squares: R, S, T, U, V, W, Z, A1
- Centers of 9 small circles (8 + center)
- 4 corner quarter-circle points: J, K, M, L

### Final Pattern:
Highlight the 8-fold flower pattern that emerges. The pattern features 4-fold starbursts connected by interlacing bands. The central circle and 8 surrounding circles create an interlocked octagram-like pattern.

### Tiling:
The unit tiles by simple translation (4-fold = square tiling).

---

## 4-Fold Pattern from Al-Hakim Mosque, Isfahan
Source: sandy-kurt/al-hakim_mosque_isfahan.pdf (15 pages)
Location: Al-Hakim Mosque, Isfahan, Iran
Fold symmetry: 4

### Steps:
1. Draw circle C1 at origin O, radius R.
2. Divide C1 into 8 equal parts (see above for points).
3. Draw a **static square** OUTSIDE circle C1 (tangent to circle, vertices at (±R·√2, 0)... actually at corners (R,R), (-R,R) etc).
4. Draw a **dynamic square** inside circle C1:
   - Vertices at NE, NW, SW, SE = (R/√2, R/√2), (-R/√2, R/√2), (-R/√2,-R/√2), (R/√2,-R/√2)

5. Point compass on the intersection between C1 and the dynamic square (call this **point N**):
   - N is one of the 4 diagonal-direction points: (R/√2, R/√2)
   - Draw a small circle tangent to the vertical line AND the horizontal line through N.
   - The small circle center = N = (R/√2, R/√2)
   - Radius r_s = R/√2 - 0... no: tangent to vertical AND diagonal means tangent to x-axis and to the 45° line through origin.
   - Distance from (R/√2, R/√2) to x-axis = R/√2
   - Distance from (R/√2, R/√2) to the line y=x: 0 (it's ON y=x!)
   - Actually: "tangent to the vertical and diagonal line" means the circle touches the vertical axis (x=0) and the diagonal line (y=x). Small circle center at (R/√2, R/√2), tangent to x=0 means radius = R/√2. Check tangent to y=x: dist = |R/√2 - R/√2|/√2 = 0. So the circle passes through origin! That would be a large circle. Re-read: "tangent to the vertical AND diagonal line" — more likely: tangent to the axis line PASSING THROUGH the adjacent 45° division, meaning the nearest radial lines. Radius = distance from N to nearest radial line = (R/√2) · sin(22.5°) = R · sin(22.5°)/√2... 
   - **Practical computation**: r_s such that circle at N=(R/√2, R/√2) is tangent to: the vertical line passing through the adjacent 0° point (x=R? no, the vertical radial from center) meaning the line y=0 direction... 
   - **Sandy Kurt's method**: the small circle center is N=(R/√2, R/√2) and is tangent to the TWO adjacent radial lines (0° and 90° lines, i.e., x-axis and y-axis). Since N is equidistant from both axes: r_s = R/√2 ≈ 0.707R.
   - But that's a large circle. More likely she means tangent to the LINE CONNECTING adjacent 8-division points = the sides of the static inner square. Static square side = line from (0,R) to (R,0), equation: x+y=R. Distance from N=(R/√2, R/√2) to this line = |R/√2 + R/√2 - R|/√2 = |R√2 - R|/√2 = R(√2-1)/√2 = R(1 - 1/√2) ≈ 0.293R. So **r_s = R(1 - 1/√2) ≈ 0.293R**.

6. Using the same radius r_s, draw small circles at the other 3 dynamic-square/circle intersections O, P, Q (at 135°, 225°, 315°), and also at center A (origin).

7. Connect centers of small circles to divide each small circle into 8 equal parts:
   - Draw lines connecting adjacent circle centers (horizontal, vertical, diagonal connections).

8. Draw DYNAMIC squares inside each small circle:
   - Connect intersection points where the small circles meet the vertical+horizontal direction lines.
   - This draws the sides of the dynamic square for each small circle.

9. Complete the dynamic square on the other side.

10. Draw dynamic squares vertically (connecting vertical-direction intersection points).
    - Use dashed lines to indicate which intersection points are being connected.
    - Note: only the portion within C1 is needed for the final pattern.

11. Draw the same horizontal connections.

12. Draw a **static square** in the central small circle at origin. Extend its lines outward.

13. Connect intersections between static + dynamic squares inside each small circle.

14. Complete by connecting in the opposite direction.

### Key Intersections:
- Dynamic square/circle intersections: N, O, P, Q at ±45° points of C1
- Center A = origin
- 4 small circles + 1 central = 5 circles total
- Where small circles meet the radial direction lines = 8 points per small circle

### Final Pattern:
A 4-fold pattern with 8-pointed stars. The central rosette connects to 4 surrounding rosettes. A characteristic of Isfahan's Al-Hakim Mosque. Highlighting reveals interlocking octagram forms.

---

## 4-Fold Pattern from Agra Fort, India
Source: sandy-kurt/agra_fort_india.pdf (9 pages)
Location: Agra Fort (Red Fort), India (Mughal architecture)
Fold symmetry: 4

### Steps:
1. Draw circle C1 at O, radius R.
2. Divide C1 into **16 equal parts**: points at every 22.5°.
   - Points A1–A16 at: 0°, 22.5°, 45°, 67.5°, 90°, 112.5°, 135°, 157.5°, 180°, 202.5°, 225°, 247.5°, 270°, 292.5°, 315°, 337.5°

3. Draw an **octagon** inside circle C1:
   - Connect every other 16-division point (i.e., 8 points at 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°).
   - Label the octagon vertices B, C, D, E, F, G, H, I.
   - Label intermediate points: L (between B and C on C1), M (between C and D), L', M' for symmetry pairs.
   - L is at 22.5°: L = (R·cos22.5°, R·sin22.5°) ≈ (0.924R, 0.383R)
   - M is at 67.5°: M = (R·cos67.5°, R·sin67.5°) ≈ (0.383R, 0.924R)

4. Find point N = intersection between the octagon edge (e.g., edge B–C) and the diagonal radial line (45° line).
   - N lies on the octagon edge at the midpoint of B–C AND on the 45° diagonal.
   - N = midpoint of line from B=(R,0) to C=(R·cos45°, R·sin45°) = (R/√2, R/√2) ... wait that IS the octagon vertex.
   - Correction: N = intersection of diagonal (y=x) with the octagon edge from B=(R,0) to L=(R·cos22.5°, R·sin22.5°). 
   - Actually: N is the intersection between the OCTAGON EDGE and the diagonal line. For octagon edge from (R,0) to (R/√2, R/√2): parametric form x=R+(R/√2-R)t, y=(R/√2)t. Set y=x: (R/√2)t = R - (R - R/√2)t → ... solve for N.
   - Then **draw a circle centered at N, radius = |NC| where C is the next octagon vertex** — this determines additional points O, Q, S.

5. Point compass on N (intersection of octagon with diagonal), open to radius |NC| (to next vertex), draw circle:
   - This circle passes through C, L, K (nearby labeled points).
   - Mark point O where this circle intersects a construction line.
   - Do the same on other diagonal intersections to find Q and S.
   - Note: "I'm using the dashed line because we don't need the circle. We just need to find point O."

6. Connect points O, Q, S (the 3 equivalent points) as shown to create the first pattern lines.

7. Find point U = intersection between octagon and the HORIZONTAL line (0° radial).
   - U = B = (R, 0) approximately, or the intersection of octagon edge with horizontal.
   - Open compass to point T (adjacent reference point), then use same radius from V to find W.

8. Using the radius from step 4 (|NC|), point compass on W and draw a circle, finding points Z and A1.

9. Connect Z and A1 with a line.

### Key Points (summary):
- B = (R, 0) — octagon vertex at 0°
- C = (R/√2, R/√2) — octagon vertex at 45°
- L = (R·cos22.5°, R·sin22.5°) ≈ (0.924R, 0.383R) — circle point between B and C
- M = (R·cos67.5°, R·sin67.5°) ≈ (0.383R, 0.924R) — circle point between C and D
- N = octagon∩diagonal = interior point computed as above
- O, Q, S = derived from radius |NC|

### Final Pattern:
Highlight the 4-fold pattern. Rotate and reflect to tile the composition. Features a distinctive Mughal-style interlaced star pattern with elongated connecting elements.

---

## 4-Fold Pattern from the Tomb of Itimud Ad-Daula
Source: sandy-kurt/tomb_of_itimud_ad-daula.pdf (10 pages)
Location: Agra, India (Mughal)
Fold symmetry: 4

### Steps:
1. Draw circle C1 at origin O, radius R. Divide into 8 equal parts (same as above).

2. Draw a **dynamic square** inside C1:
   - Vertices at ±45° points: NE=(R/√2, R/√2), NW=(-R/√2, R/√2), SW=(-R/√2,-R/√2), SE=(R/√2,-R/√2)

3. Draw a **static square** inside the dynamic square:
   - The static square vertices touch the midpoints of the dynamic square sides.
   - Dynamic square side midpoint: e.g., midpoint of NE–NW = (0, R/√2). So static square vertices are at (0, R/√2), (R/√2, 0), (0, -R/√2), (-R/√2, 0) — these ARE the cardinal points of C1! Wait — the static square inscribed in the dynamic square would have vertices at the midpoints of the dynamic square's sides.
   - Dynamic square has vertices at R/√2 ≈ 0.707R from center. Its sides have length R. Midpoints of sides = at distance R/2 from center on the axes... more precisely: midpoint of edge NE-NW = (0, R/√2), midpoint of NW-SW = (-R/√2, 0), etc.
   - So static inner square (inside dynamic): vertices at (0, R/√2), (-R/√2, 0), (0, -R/√2), (R/√2, 0) — i.e. at distance R/√2 from origin on axes. Side length = R.

4. Draw a circle **tangent to the small static square** at point J:
   - J = a vertex of the static inner square, e.g., J = (0, R/√2).
   - "Tangent to the small static square" at J means the circle is inscribed in the small square at that corner — or: the circle is centered at J and tangent to the sides of the small static square.
   - The small static square has vertices at distance R/√2 from origin. Its sides run from (0, R/√2) to (R/√2, 0), equation: x/R + y/R = 1/√2... i.e. x + y = R/√2·√2 = R... wait: from (0, R/√2) to (R/√2, 0): x + y = R/√2. Distance from J=(0, R/√2) to this line = 0 (it's ON the line!). 
   - More precisely: the circle is tangent to the two SIDES of the static square that meet at J. The half-angle of the square corner = 45°. So circle tangent to both sides at corner J: its center lies on the bisector of the corner (the 45° line from J toward center), at distance r_s from each side. The side of the static inner square runs in the 45° direction, so the bisector at J runs toward the center O.
   - Let r_s = radius of this small circle. The circle is centered at J - r_s·(direction toward O) = J + r_s·(J/|J|) moved inward... Hmm. Actually for a circle tangent to both edges at a convex corner, the center is r_s/sin(45°) = r_s·√2 along the bisector from the corner.
   - Since the problem says "tangent to the small static square" — most likely the circle is inscribed at the center of the square, and this square has apothem r_s. The small static square has side R, so its inradius = R/2. **r_s = R/2 · ... **
   - Sandy Kurt's tutorial says: "Draw a circle tangent to the small static square (POINT J). Using the same radius draw circles on points B, C, D, E". Points B, C, D, E are the other small square vertices. So the circle is centered somewhere and tangent to the small square AT point J. This means: circle centered at J with radius = distance from J to the small static square's nearest other feature... 
   - **Simplest interpretation**: circle centered at J, tangent to the OPPOSITE side of the static square = has radius equal to the distance from J to the nearest parallel side of the static square. Since the static square has side length R/√2 and J is a corner, the distance from J to the opposite side = R/√2. So **r_s = R/√2 / 2 = R/(2√2) ≈ 0.354R**? No, that's quarter.
   - **Most likely**: the small circles are centered at the 4 CORNERS of the outer dynamic square (B,C,D,E = NE, NW, SW, SE) and at origin J, with radius such that they are tangent to the static inner square's sides. Distance from NE=(R/√2, R/√2) to the nearest side of the static inner square (which goes from (0,R/√2) to (R/√2,0), equation x+y=R/√2·√2... let me recalc: the static square inscribed in the dynamic square: its vertices are at the midpoints of the dynamic square's edges. Dynamic square has vertex at R/√2: edge from (R/√2, R/√2) to (-R/√2, R/√2) has midpoint (0, R/√2). So static inner square has vertices at (0, R/√2), (-R/√2, 0), (0, -R/√2), (R/√2, 0). The SIDE from (0, R/√2) to (R/√2, 0): equation: x + y = R/√2. Distance from NE=(R/√2, R/√2) to this line: |R/√2 + R/√2 - R/√2|/√2 = |R/√2|/√2 = R/2. So **r_s = R/2 ≈ 0.5R**.

5. Using same radius r_s = R/2, draw small circles at B=(R/√2, R/√2), C=(-R/√2, R/√2), D=(-R/√2,-R/√2), E=(R/√2,-R/√2). Also circle at J = (0, R/√2) and origin.

6. Draw direction lines connecting circles horizontally, vertically, diagonally to divide each small circle into 8 equal parts.

7. Draw sides of **static square** inside each small circle:
   - Connect points R2, P, O, S2 (where direction lines meet small circles).
   - These points are where the horizontal/vertical/diagonal lines pierce the small circle circumference.

8. Draw sides of **dynamic square** by connecting B1, J, M, C1 etc.

9. Finish the static square connections.

### Final Pattern:
8-fold interlaced pattern with kite and arrowhead shapes. Classic Mughal tile pattern with strong 4-fold symmetry and 8-pointed star centers.

---

## 8-Fold Zellige Pattern (Tutorial 1)
Source: sandy-kurt/8fold_zellige_pattern.pdf (4 pages)
Location: Moroccan zellige tile tradition
Fold symmetry: 8

### Steps:
1. Draw circle C1, radius R. Draw horizontal, vertical, and BOTH diagonals (4 lines through origin).
   - 8 points on circle at: 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°.

2. Draw **dynamic square** inside C1: vertices at 45°, 135°, 225°, 315° points.
   - D_NE=(R/√2, R/√2), D_NW=(-R/√2, R/√2), D_SW=(-R/√2,-R/√2), D_SE=(R/√2,-R/√2)
   
   Draw **static square** inside C1: vertices at 0°, 90°, 180°, 270° points.
   - S_E=(R,0), S_N=(0,R), S_W=(-R,0), S_S=(0,-R)

3. Draw lines passing through the intersections of the 2 squares to divide C1 into **16 equal parts**:
   - The intersections of static+dynamic squares are at ±22.5°, ±67.5°, ±112.5°, ±157.5° (8 more points).
   - These 8 points + original 8 = 16 equal divisions at 22.5° spacing.

4. Connect every other point = draw octagon (same as Agra Fort step). **Extend the octagon lines BEYOND the circle.**

5. Point compass on one CORNER of the octagon. Open compass until the next radial line:
   - Octagon corner at 0° = B = (R, 0). Radial line at 22.5° from origin.
   - The circle is tangent to this 22.5° radial line, centered at B.
   - Distance from B=(R,0) to the 22.5° line (equation: y = x·tan22.5°, or x·sin22.5° - y·cos22.5° = 0):
   - dist = |R·sin22.5° - 0·cos22.5°| = R·sin22.5° ≈ 0.383R
   - **r_s = R·sin22.5° ≈ 0.383R**
   - Draw small circles at ALL 8 octagon corners AND at center.
   - (9 small circles total: 8 on octagon corners + 1 at origin)

6. Connect centers of ALL small circles horizontally, vertically, and diagonally to divide each into 8 equal parts.

7. Draw **dynamic square** and **static square** inside each small circle.
   - Extend these squares' lines inside the main circle.

8. Connect the points where the two squares meet inside each small circle.
   - Extend these lines inside the main circle.

9. Do same horizontally and diagonally. Construction complete.

### Key Measurements:
- R = main circle radius
- r_s = R·sin(22.5°) = R·(√(2-√2)/2) ≈ 0.3827R
- Octagon vertex = R from center
- Octagon side length = 2R·sin(22.5°) = 2r_s ≈ 0.765R

### Final Pattern:
8-pointed star (octagram) at center, surrounded by 8 smaller octagrams. Classic North African zellige tile pattern. The strapwork lines form the traditional Moroccan 8-fold interlace.

---

## 8-Fold Zellige Pattern (Tutorial 2 — Extended)
Source: sandy-kurt/8fold_zellige_pattern_2.pdf (4 pages)
Same as Tutorial 1 BUT with step 10:

10. Draw an octagon AROUND the central small circle by connecting specific intersection points:
    - Connect the points where the static+dynamic squares meet the central small circle's perimeter.
    - Extend these lines slightly beyond.
    - This creates an octagonal frame around the central rosette.

### Additional Final Step:
The outer octagon frame distinguishes this variant as a zellige panel with an octagonal medallion.

---

## 8-Fold Zellige (Complex — with Rosettes)
Source: sandy-kurt/8fold_zellige.pdf (11 pages + close-up)
Fold symmetry: 8 with rosettes

### Steps:
1. Divide circle C1 into 8 equal parts.
2. Draw static and dynamic squares inside C1.
3. Use intersections of the 2 squares to divide into **16 equal parts**.
4. Point compass on one static+dynamic intersection, draw a small circle tangent to the vertical and diagonal line:
   - Intersection of static×dynamic squares: at 22.5° from horizontal = (R·cos22.5°, R·sin22.5°)... no.
   - The intersection of the two inner squares occurs where static square edge meets dynamic square edge.
   - Static square edge: from (R,0) to (0,R), equation x+y=R. Dynamic square edge: from (R/√2, R/√2) to (-R/√2, R/√2), equation y=R/√2... these don't intersect inside C1 usefully.
   - More likely: intersection of static square edge (x+y=R) with diagonal line (y=x): solve x+x=R → x=R/2. So intersection = (R/2, R/2). This is NOT on the circle.
   - This (R/2, R/2) is **inside** the circle at distance R/√2 ≈ 0.707R from center.
   - Circle centered at (R/2, R/2) tangent to vertical line x=0: radius = R/2.
   - Circle centered at (R/2, R/2) tangent to diagonal y=x: distance = |R/2 - R/2|/√2 = 0. ON the line.
   - Tangent to "vertical AND diagonal line" = tangent to x-axis (y=0) AND to 45° diagonal (y=x)?
   - Distance from (R/2, R/2) to y=0: R/2. Distance from (R/2, R/2) to y=x: 0. Both can't be radius.
   - **Re-interpretation**: "vertical line" = the vertical LINE passing through the nearest 90°-axis point, AND "diagonal line" = the diagonal radial from origin. The intersection point is in the 45° sector between x-axis and y-axis. "Tangent to the vertical and diagonal line" = tangent to the vertical axis line (x=0) AND the 45° diagonal line (y=x). From (R/2, R/2): dist to x=0 is R/2, dist to y=x is 0. These differ. 
   - **Working interpretation for 8fold_zellige**: the 16-division intersections on the CIRCLE (at 22.5° spacing) are used. The intersection in the square (not on circle) may be the 8-point intersections BETWEEN the squares' lines inside the circle. The small circle center is at the intersection of one static square edge with one dynamic square edge, and is tangent to both those LINES (as opposed to the axes). This gives r_s = distance from intersection to the tangent line... which is 0 since the point is ON the lines. 
   - **Final working answer**: Sandy Kurt's "tangent to the vertical and diagonal line" means the small circle sits in the WEDGE between a vertical radial and a 45° radial line, snugly tangent to both. Center is on the bisector of this wedge (22.5° from each). The circle fits between the two adjacent radials in the 45° sector. If center is at distance d from origin along the 22.5° bisector, then tangency to each radial line: d·sin(22.5°) = r_s. So r_s = d·sin(22.5°). The center must also be at the intersection of static+dynamic squares: so d = R/√2 (intersection at R/2, R/2 is at distance R/√2). Then **r_s = (R/√2)·sin(22.5°) ≈ 0.707R × 0.383 ≈ 0.271R**.

5. Using the SAME radius, draw small circles on all other intersections and the center.
6. Draw vertical pair and horizontal pair of lines connecting circle centers.
7. Draw diagonal pairs of lines connecting circle centers.
8. Point compass on intersection of 2 lines, draw circle tangent to the vertical and diagonal line (same construction, different scale).
9. Point compass at center O, draw circle tangent to the circle from step 8.
10. Using same radius as step 9, draw 8 circles at the 8 static+dynamic square intersections (16-division points on C1).
11. Point compass on intersection, draw another circle tangent to the circles from step 5.
12. Using same radius, draw 7 more circles.
13. Draw 4 pairs of lines connecting circle centers.
14. Draw 4 pairs of parallel lines through intersections of circles (from step 10) and lines (from step 13).
15. Do same horizontally.
16. Do same diagonally.
17. Draw **octagons** inside circles from steps 5 and 12.
18. Pattern complete. Highlight.
19. **Close-up (central rosette)**: Draw 4 pairs of parallel lines connecting intersections of the circle from step 9 with the 16-division radial lines. These form the central 8-petaled rosette.

### Key Measurements:
- Main construction: same as 8-fold pattern
- Additional concentric layers of circles create the rosette layering
- The rosette is 8-petaled, formed by lines at 22.5° intervals crossing at the circle boundary

### Final Pattern:
Dense 8-fold zellige with central rosette, intermediate octagonal medallions, and outer 8-fold star grid. This is the full complex zellige construction used in traditional Moroccan tilework.

---

## 12-Fold Moorish Pattern
Source: sandy-kurt/12_fold_moorish_pattern-min.pdf (4 pages)
Location: Moorish / North African tradition
Fold symmetry: 12

### Steps:
1. Draw circle C1 at origin O, radius R. Draw the horizontal diameter (A to B, where A=(-R,0), B=(R,0)).

2. Point compass on A=(-R,0), open to B=(R,0), draw a **semi-circle** (above horizontal axis).
   - This semicircle has center A, radius 2R, so it extends from (-R,0) upward passing through (R, 0).
   - Point compass on B=(R,0), open to A=(-R,0), draw another **semi-circle**.
   - These two semicircles intersect above and below the horizontal line.
   - Intersection above: solve circle (x+R)²+y²=4R² and circle (x-R)²+y²=4R²:
     - Subtract: (x+R)²-(x-R)² = 0 → 4Rx = 0 → x = 0
     - y² = 4R² - R² = 3R² → y = R√3
   - So intersection above = (0, R√3). Call this point C = (0, R√3).
   - Intersection below = (0, -R√3). Call this D.

3. Draw vertical line through C and D (the y-axis). This passes through the intersections of the two semicircles. The vertical line also divides C1 symmetrically.

4. Draw a **lozenge (rhombus)** by connecting A and B to the intersections C and D:
   - Lozenge vertices: A=(-R,0), B=(R,0), C=(0,R√3), D=(0,-R√3).
   - Sides: A-C, C-B, B-D, D-A.

5. Find where the lozenge meets circle C1:
   - Lozenge side A-C goes from (-R,0) to (0,R√3). Parametric: x=-R+Rt, y=R√3·t.
   - Circle x²+y²=R²: (-R+Rt)²+(R√3·t)²=R² → R²(1-t)²+3R²t²=R² → 1-2t+t²+3t²=1 → 4t²-2t=0 → t(4t-2)=0 → t=0 (point A) or t=1/2.
   - At t=1/2: x=-R/2, y=R√3/2. So G=(-R/2, R√3/2).
   - Similarly H=(R/2, R√3/2) (on side C-B at t=1/2).
   
6. Connect G and H with a line. This line GH is horizontal at y=R√3/2.
   - Find where GH meets the VERTICAL line (y-axis): x=0, y=R√3/2. Call this point M = (0, R√3/2).
   - Draw a circle centered at M passing through G and H:
     - Radius = distance from M to G = R/2.
     - **Circle C2**: center M=(0,R√3/2), radius r₂=R/2.

7. C2 meets the vertical line at K = (0, R√3/2 + R/2) and (0, R√3/2 - R/2).
   - Upper intersection K = (0, R√3/2 + R/2) = (0, R(√3+1)/2) ≈ (0, 1.366R).
   - Point the compass on origin O=(0,0), open to K=(0, R(√3+1)/2), draw circle C3:
     - **Circle C3**: center O=(0,0), radius r₃ = R(√3+1)/2 ≈ 1.366R.
   - Using same radius r₃, draw 5 more circles (total 6) centered on the 6 perimeter points of C1 at 60° intervals:
     - Centers: (R,0), (R/2,R√3/2), (-R/2,R√3/2), (-R,0), (-R/2,-R√3/2), (R/2,-R√3/2).

8. Draw 2 lines connecting the **centers** of specific circles (the arrangement creates 12-fold geometry):
   - Connect center-to-center along the 6 circles in two directions.
   - Where those 2 lines meet the vertical axis, draw a **smaller circle** tangent to the adjacent circles.

9. Draw 3 lines connecting the intersection points (as shown in tutorial diagram).

10. Draw the **petals of the rosettes**:
    - For each of the 12 positions, draw the petal shape using intersections.

11. Connect remaining points to complete the pattern.
    - Point D2: found as intersection of the horizontal line of the top circle with that circle.
    - Point E2: found by placing compass on C1 and swinging radius to find E2.
    - "Point compass on C1, open it to D1, swing to find D2. Do same from D1 to find E2."

12. Highlight the final pattern.

13. **Tile**: Copy pattern 6 times (6-fold repeat unit) to create the full 12-fold pattern.

### Key Points:
- A = (-R, 0), B = (R, 0) — horizontal diameter endpoints
- C = (0, R√3) ≈ (0, 1.732R) — above, from semicircle intersection
- D = (0, -R√3) — below
- G = (-R/2, R√3/2) ≈ (-0.5R, 0.866R) — lozenge meets C1 on left
- H = (R/2, R√3/2) ≈ (0.5R, 0.866R) — lozenge meets C1 on right
- M = (0, R√3/2) ≈ (0, 0.866R) — midpoint of GH on y-axis
- K = (0, R(√3+1)/2) ≈ (0, 1.366R) — C2 top intersection with y-axis
- r₂ = R/2
- r₃ = R(√3+1)/2 ≈ 1.366R (the key 6-circle radius)

### Final Pattern:
12-pointed star rosette. The base unit is repeated 6 times to form the complete pattern. Characteristic of Moorish (North African / Andalusian) architecture.

---

## 12-Fold Pattern from Suleymaniye Mosque, Turkey
Source: sandy-kurt/suleymaniye_mosque.pdf (4 pages)
Location: Süleymaniye Mosque, Istanbul, Turkey (Ottoman)
Fold symmetry: 12

### Steps:
1. Draw circle C1 at origin O, radius R. Divide into **6 equal parts**:
   - Points at 0°, 60°, 120°, 180°, 240°, 300°.
   - P1=(R,0), P2=(R/2, R√3/2), P3=(-R/2, R√3/2), P4=(-R,0), P5=(-R/2,-R√3/2), P6=(R/2,-R√3/2).

2. Add 3 more lines to divide into **12 equal parts**:
   - Add lines at 30°, 90°, 150°, 210°, 270°, 330° — wait, 6 + 6 new radials = 12.
   - New points: Q1=(R·cos30°, R·sin30°)=(R√3/2, R/2), Q2=(0,R), etc.
   - This gives 12 points at 30° spacing.

3. Draw a regular **hexagon** inside the circle C1:
   - Vertices at the 6 original 60° points: P1–P6.
   - Hexagon side = R (same as radius).

4. Draw **3 pairs of parallel lines** from the hexagon:
   - Line pairs connecting opposite hexagon vertices through the center.
   - These 3 diameters divide the interior further.

5. Point compass on one of the 6 hexagon corners (e.g., P1=(R,0)):
   - Open until the OUTER boundary of circle C1 (**the big circle drawn at step 1**).
   - Radius here = distance from P1 to C1... P1 IS on C1. So "open until the big circle" means the compass is opened to the DIAMETER = 2R?
   - More likely: "open until the big circle" means to a specific intersection point ON C1 that the circle from P1 would reach. At P1=(R,0), opening to P2=(R/2, R√3/2): radius = |P1-P2| = √((R/2)²+(R√3/2)²) = √(R²/4+3R²/4) = R. So the 6 new circles all have radius R.
   - Drawing 6 circles of radius R centered at each P1–P6: this is the **Flower of Life** again!

6. Using the **same radius** (R), draw 6 circles centered at P1–P6.
   - These circles overlap with C1 and with each other, creating the 12-fold construction grid.

7. **Highlight the final pattern**:
   - The intersections of the Flower of Life circles, combined with the hexagon and the 12-division lines, define a 12-fold star pattern characteristic of Ottoman architecture.
   - The pattern features 12-pointed stars with triangular interstitial spaces.

### Key Measurements:
- Hexagon side = R
- Circle radius for Flower of Life circles = R (same as main circle)
- All distances derived from R

### Final Pattern:
12-fold star pattern with 6-fold underlying structure. The Suleymaniye pattern has a slightly different aesthetic from the Moorish 12-fold — more angular and Ottoman in character.

---

## 2×8-Fold Pattern (Double 8-Fold)
Source: sandy-kurt/2x8fold_pattern.pdf (17 pages)
Fold symmetry: 8 (with doubled/nested 8-fold structure)

### Steps:
1. **Start with an 8-fold division** of the main circle C1:
   - 8 points at 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°.

2. Draw **8 lines** connecting the 8 perimeter points in specific pairs:
   - Connect each point to its ±2 neighbors (skip-1 connections): creates a star pattern.
   - Specifically: connect each point to the point 2 steps away (forming an 8-pointed star / octagram shape).

3. Find the intersections of the lines from step 2 with the **horizontal line** (y=0):
   - Point compass on these intersections (on the horizontal line).
   - Draw **two circles**, each tangent to the intersection of the diagonals AND the main circle.
   - These circles are in the left and right sectors.

4. Draw **4 pairs of lines** (8 lines total) as described in the diagram, finding red-circled intersection points.

5. Draw **4 more lines**, finding additional red-circled intersection points.

6. Point compass on the new intersection. Draw a **circle tangent to the adjacent line**.
   - Using the same radius, draw the circle at all 4 equivalent intersections.

7. **Complete the division** of the small circles by drawing the subdivision lines.

8. Draw **2 squares in each small circle**:
   - First: draw the first side of the first square.

9. Draw the same on the other side.

10. Draw another side.

11. Complete the square (last side).

12. Each small circle now has 2 squares. Draw **parallel lines joining the intersections** of the 2 squares:
    - Vertically, horizontally, and diagonally.

13. Draw **8 pairs of perpendicular lines** (first set):
    - Same as the lines drawn at step 1 (8-fold radials), but for the secondary subdivision.

14. Draw other side lines.

15. Draw another set.

16. Draw last set. Construction complete.

17. Highlight the final pattern.

### Final Pattern:
A complex nested double-8-fold pattern. The larger 8-fold geometry contains within each segment a complete smaller 8-fold pattern. This creates a rich, multi-scale Islamic geometric design.

---

## Zellige Shapes Study
Source: sandy-kurt/zellige_study.pdf (34 pages)
Type: Reference/analysis document (diagrams only — no extractable text)

### Key Information (from title page):
"All the following shapes come from the same main construction. Same colour = equal length."

This document is a visual atlas of the ~30 zellige tile shapes that emerge from the 8-fold zellige construction. Each page shows one shape with its geometric proportions. The shapes are color-coded to indicate equal-length edges.

### The Zellige Family of Shapes (from the 8-fold construction):
The 8-fold construction at r_s = R·sin(22.5°) produces exactly 30 distinct zellige tile shapes (confirmed by Sandy Kurt's commentary). Key shapes include:
- Regular octagon (at center)
- Regular square (multiple sizes)
- Kite / arrow shapes
- Elongated hexagons
- Rhombus shapes
- Irregular pentagons
- "Lozenge" (45° rhombus)
- 6-pointed star fragments

All edge lengths in the zellige set are integer multiples of a base unit derived from R·sin(22.5°).

---

## Notes on the "Static" vs "Dynamic" Square Terminology
Used throughout Sandy Kurt's tutorials:
- **Static square**: sides are horizontal and vertical (aligned with the Cartesian axes). Vertices at N, E, S, W positions on the circle.
- **Dynamic square**: rotated 45° relative to the static square. Vertices at NE, NW, SW, SE positions on the circle. Also called "tilted" or "rotated" square.
Both inscribed in the same circle have the same side length = R√2 (for circle radius R).

When both are drawn together, they create an 8-pointed star outline (two overlapping squares = Star of David analog for 8-fold geometry).
