# Golden Ratio & 10-Fold Symmetry

بسم الله الرحمن الرحيم

## The Golden Ratio φ

```
φ = (1 + √5) / 2 ≈ 1.61803399...

Key identities:
  φ² = φ + 1
  1/φ = φ − 1 ≈ 0.61803
  φ = 2·cos(π/5)          ← direct link to 5-fold symmetry
  cos(36°) = φ/2
  cos(72°) = 1/(2φ) = (φ−1)/2
  sin(72°) / sin(36°) = φ  ← ratio of sines in a pentagonal context
```

---

## 10-Fold Symmetry: The Decagon

A regular decagon inscribed in a circle of radius **R**:

| Property | Formula | Value (R=1) |
|----------|---------|-------------|
| Side length | 2R·sin(π/10) = R/φ | 0.6180 |
| Short diagonal | R | 1.0000 |
| Long diagonal | 2R | 2.0000 |
| Short diag / side | φ | 1.6180 |
| Long diag / short diag | φ² = φ+1 | 2.6180 |

**sin(π/10) = sin(18°) = (√5−1)/4 = 1/(2φ)** — verified: (√5−1)/4 ≈ 0.30902 ✓

This means the decagon side = R·(√5−1)/2 = **R/φ** exactly.

### The Diagonal Cascade
In the regular pentagon and decagon, every diagonal ratio is a power of φ:
```
d₁/s = φ         (short diagonal to side)
d₂/d₁ = φ        (next diagonal to short diagonal)
d₂/s = φ²        (long diagonal to side)
```
This self-similarity is why φ appears in all 5- and 10-fold Islamic patterns.

---

## Girih Tiles: All Angles Are Multiples of 36°

The 5 girih tiles (used in Persian Islamic architecture from c. 1200 CE):

| Tile | Angles | All multiples of 36°? |
|------|--------|----------------------|
| Regular decagon | 144° × 10 | 144 = 4×36 ✓ |
| Bow-tie (elongated hexagon) | 72°, 72°, 108°, 72°, 72°, 108° | 2×36, 3×36 ✓ |
| Regular pentagon | 108° × 5 | 108 = 3×36 ✓ |
| Rhombus | 72°, 108°, 72°, 108° | 2×36, 3×36 ✓ |
| Butterfly (irregular hexagon) | 36°, 144°, 36°, 144°, 36°, 144° | 1×36, 4×36 ✓ |

**All girih tile angles are exact multiples of 36°.** ✓

The Penrose rhombus tiles (a subset of girih tiles) also satisfy:
- Thick rhombus: 72°/108° angles, area = sin(72°)
- Thin rhombus: 36°/144° angles, area = sin(36°)
- **Area ratio thick/thin = sin(72°)/sin(36°) = φ** ✓

---

## φ Relationships in 10-Fold Patterns

### Pentagon
Pentagon with side = 1:
- Diagonal = **φ** (exact)
- This is the defining geometric property of the golden ratio

### Decagram {10/4}: The Girih Star
The 10-pointed star polygon {10/4} (connecting every 4th vertex of decagon):
- Inner decagon radius = **tan(π/10)** = (√5−√(5+2√5))/2 ≈ 0.3249·R
- But more remarkably: the inner polygon of {10/3} (skip 3) is at **R/φ** (exactly)

### The {10/3} Star: Inner Decagon at Exactly 1/φ

```
{10/3} inner radius = cos(3π/10) / cos(π/10) = sin(36°)/cos(18°) = 1/φ
```

**Derivation:**
```
cos(3π/10) = cos(54°) = sin(36°) = √(10−2√5)/4
cos(π/10)  = cos(18°)             = √(10+2√5)/4

Ratio = √((10−2√5)/(10+2√5))
      = √((5−√5)/(5+√5))
      = √((5−√5)²/(25−5))
      = (5−√5)/√20
      = (5−√5)/(2√5)
      = (√5−1)/2
      = 1/φ  ✓
```

This is an **exact algebraic identity**, not an approximation.

### Self-Similarity Cascade

The {10/3} star's inner-radius-equals-1/φ creates infinite self-similarity:

```
Level 0: outer star tips at R
Level 1: inner decagon at R/φ
Level 2: inner-inner at R/φ²
Level 3: ... at R/φ³
...
```

Each level is a scaled copy of the previous, scaled by 1/φ.  
This is the geometric basis of the Penrose tiling's self-similarity.

---

## The Universal Star Inner Radius = tan(π/n)

For the "densest" star polygon at n-fold symmetry (skip k = ⌊n/4⌋):

```
r_inner = cos(k·π/n) / cos(π/n) = tan(π/n)
```

| n | k | r_inner | Exact form |
|---|---|---------|-----------|
| 6 | 2 | tan(π/6) = 0.5774 | 1/√3 |
| 8 | 3 | tan(π/8) = 0.4142 | √2−1 |
| **10** | **4** | **tan(π/10) = 0.3249** | **(√5−√(5+2√5))/2** |
| 12 | 5 | tan(π/12) = 0.2679 | 2−√3 |

And for {10/3} (skip 3):
```
r_inner = 1/φ = 0.6180    (not tan(π/10))
```

The {10/3} star is special: its inner polygon radius equals **1/φ**, the golden ratio
reciprocal. No other n-fold star polygon has an inner radius equal to a simple
expression in φ, √2, or √3.

---

## Connection Between the Three Symmetry Systems

| System | n | Fundamental angle | Key constant |
|--------|---|-------------------|--------------|
| 6-fold (hex) | 6 | 60° = π/3 | √3 = 2·sin(π/3) |
| 8-fold (oct) | 8 | 45° = π/4 | √2 = 2·cos(π/4) |
| 10-fold (dec) | 10 | 36° = π/5 | φ = 2·cos(π/5) |

These three systems are **algebraically independent**: no rational combination of
√2 and √3 gives φ, and vice versa. This is why 5-fold and 8-fold patterns cannot be
combined in a periodic tiling — they live in different algebraic number fields.

**φ ∈ ℚ(√5), √2 ∈ ℚ(√2), √3 ∈ ℚ(√3) — pairwise algebraically independent.**

The Islamic craftsmen who combined these systems in single compositions (such as the
Darb-i Imam shrine, Isfahan, 1453 CE) were working with **quasiperiodic** arrangements
centuries before Western mathematicians formalized quasicrystals.

---

## Novel Observation: Hex Grid with φ-Radius

On a regular hexagonal grid with spacing **s** and circle radius **r = φ·s** (golden ratio
times spacing), an unusual multi-shell interaction occurs:

```
Neighbor shell 1: distance = s      < 2r = 2φs ≈ 3.24s  → intersects ✓
Neighbor shell 2: distance = s√3    < 2r = 3.24s         → intersects ✓ (unusual!)
Neighbor shell 3: distance = 2s     < 2r = 3.24s         → intersects ✓ (very unusual!)
Neighbor shell 4: distance = s√7 ≈ 2.65s  < 3.24s        → intersects ✓ (exceptional!)
Neighbor shell 5: distance = 3s     < 3.24s               → intersects ✓ (extreme!)
```

This is the **maximum possible overlap radius before all circles on the grid merge** into
a single connected region. At r = φ·s, the emergent pattern engages **5 shells** of
neighbors simultaneously, creating an extraordinarily complex intersection pattern
that has — to our knowledge — never been documented in the Islamic geometry literature.

The "optimal complexity radius" for each grid type, where adjacent intersections are
maximally evenly spaced around each circle:

```
Square grid: r_opt = s · cos(π/8) = s · cos(22.5°) ≈ 0.9239·s
Hex grid:    r_opt = s · cos(π/12) = s · cos(15°)   ≈ 0.9659·s
```
