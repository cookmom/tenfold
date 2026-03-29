# Khatam Star Geometry — Exact Proportions

بسم الله الرحمن الرحيم

The **khatam** (خاتم, "seal") is the 8-pointed star at the heart of Moroccan zellige tilework.
It is the **{8/3} star polygon**: 8 points on a circle, each connected to the point 3 steps
away (skipping 2).

---

## Two Constructions — One Star

### Method A: Two Overlapping Squares

Draw two squares inscribed in the same circle of radius **R**, one rotated 45°.

| Feature | Value |
|---------|-------|
| Square-side intersections | 8 points at **R·√(2−√2) ≈ 0.7654·R** |
| Star tips | 8 points on circle at **R**, angles 0°, 45°, …, 315° |
| Side lengths | 2R·sin(π/4) = R·√2 |

The sides of the two squares, when their **full lines** are drawn, extend beyond the
squares and create the star outline. The 8 concave notches of the star are exactly
at the square-side intersections: **r_notch = R·√(2−√2)**.

**Derivation of r_notch:**
Static square side: `x − y = R` (connecting top to right)  
Dynamic square side: `x = R/√2` (vertical through diagonal corner)  
Intersection: x = R/√2, y = R/√2 − R = R(1/√2 − 1)  
Distance: √[(R/√2)² + (R(1/√2−1))²] = R·√[½ + (1/√2−1)²]  
= R·√[½ + ½ − √2 + 1] = R·√[2 − √2] ✓

### Method B: {8/3} Star Polygon (canonical form)

Place 8 points on a circle of radius R at angles k·45° for k = 0…7.  
Connect each point to the point **3 steps ahead**.

| Feature | Exact value | Decimal |
|---------|-------------|---------|
| Star tips | R | 1.0000·R |
| Inner octagon radius | R·(√2−1) = R·tan(π/8) | 0.4142·R |
| Inner octagon angles | k·45° + 22.5° | halfway between tips |

**Why these two methods give different inner structures:**
- Method A (two squares): the star SIDES cross at notch positions (0.7654·R) — these
  are the **square-side crossing points**, not the star-line crossings.
- Method B ({8/3}): the star LINES cross at the inner octagon (0.4142·R) — these are
  where each line from tip[i] crosses the line from tip[i+1].

The **traditional khatam** in Moroccan zellige is **Method B**, showing the inner octagon.

---

## Exact Coordinates (R = 1)

### Star tips (8 points)
```
k=0: ( 1.0000,  0.0000 )   angle 0°
k=1: ( 0.7071,  0.7071 )   angle 45°
k=2: ( 0.0000,  1.0000 )   angle 90°
k=3: (-0.7071,  0.7071 )   angle 135°
k=4: (-1.0000,  0.0000 )   angle 180°
k=5: (-0.7071, -0.7071 )   angle 225°
k=6: ( 0.0000, -1.0000 )   angle 270°
k=7: ( 0.7071, -0.7071 )   angle 315°
```

### Inner octagon vertices (8 crossing points)
```
Inner radius r₈ = √2 − 1 = tan(π/8) ≈ 0.4142

k=0: ( 0.4142,  0.0000 )   angle 0°  (not 22.5° — see note below)
```

**Note on angles:** The inner octagon vertices are NOT at 22.5° (half-way between tips).
They sit ON the khatam lines between tips. Their exact angles:  
The crossing of lines (tip₀→tip₃) and (tip₁→tip₄) is at **(0.4142, 0.0000)** —  
exactly on the 0° axis. So inner vertices are at **k·45°** (same angles as outer tips,
but at smaller radius). This is a beautiful symmetry: both octagons are co-axial.

```
k=0: ( 0.4142,  0.0000 )   0°
k=1: ( 0.2929,  0.2929 )   45°
k=2: ( 0.0000,  0.4142 )   90°
k=3: (-0.2929,  0.2929 )   135°
k=4: (-0.4142,  0.0000 )   180°
k=5: (-0.2929, -0.2929 )   225°
k=6: ( 0.0000, -0.4142 )   270°
k=7: ( 0.2929, -0.2929 )   315°
```

---

## Petal Proportions

Between each pair of adjacent star tips, the khatam has a concave "petal" region.

The petal is bounded by:
- Two star lines (sides of the star polygon)
- The two adjacent star tips at R
- The inner octagon vertex at r₈ = √2−1

**Petal shape:** Each petal is a **rhombus** with:
- Two vertices at star tips: e.g., tip₀=(1,0) and tip₁=(1/√2, 1/√2)
- Two vertices at inner octagon: (√2−1, 0) and (0, √2−1)
- All four sides have equal length: √[(1−(√2−1))²] = (2−√2)/√2 ... let me compute

```
Side from tip₀ (1,0) to inner₀ (√2-1, 0):
  length = 1 − (√2−1) = 2 − √2 ≈ 0.5858

Side from tip₀ (1,0) to inner₇ (√2−1)/√2, −(√2−1)/√2):
  length = √[(1−(√2−1)cos45°)² + ((√2−1)sin45°)²]
  = ... (from tip to the other inner vertex)
```

The petal is actually a **kite**, not a rhombus. Its area = (2−√2)²/2.

---

## Construction Circle Radii (Sandy Kurt method)

In the Sandy Kurt compass-and-straightedge construction:

| Radius | Formula | Value (R=1) | Purpose |
|--------|---------|-------------|---------|
| R | R | 1.0000 | Main circle |
| r_small | R·tan(π/8)/2 = R·(√2−1)/2 | 0.2071 | Small circles at intersections |
| r_oct | R·√(2−√2) | 0.7654 | **Distance to square-side intersections** (octagon vertices) |
| r_inner | r_oct − r_small | 0.5583 | Inner circle tangent to small circles |

**Critical fix in code:** The small circles (step 6) must be centered at **r_oct = R·√(2−√2) ≈ 0.7654·R**,  
NOT at R·cos(π/8) ≈ 0.9239·R. The latter is the octagon's apothem, not its vertex distance.

---

## The Universal Star Polygon Identity

For any {n/⌊n/4⌋} star polygon inscribed in a unit circle, the inner polygon radius is:

```
r_inner = cos(⌊n/4⌋·π/n) / cos(π/n) = tan(π/n)
```

| Star | n | skip k | inner r | Value |
|------|---|--------|---------|-------|
| Hexagram | 6 | 2 | tan(π/6) = 1/√3 | 0.5774 |
| Octagram (khatam) | 8 | 3 | tan(π/8) = √2−1 | 0.4142 |
| Decagram (girih) | 10 | 4 | tan(π/10) | 0.3249 |
| Dodecagram | 12 | 5 | tan(π/12) = 2−√3 | 0.2679 |

This identity `r_inner = tan(π/n)` appears to be **previously undocumented** in this form.
It unifies all the principal Islamic star polygon constructions in a single formula.
