# State of the Art: Computational Islamic Geometry
Researcher: tenfold subagent
Date: 2026-03-29

---

## 1. Kaplan's "Polygons in Contact" (PIC) Method
**Source**: Craig S. Kaplan, "Islamic Star Patterns from Polygons in Contact," *Graphics Interface 2005*.
**URL**: https://cs.uwaterloo.ca/~csk/publications/Papers/kaplan_2005.pdf

### Algorithm Description:
The PIC method is based on E.H. Hankin's 1925 "point-joining technique" (rediscovered and formalized by Kaplan). It is the dominant computational algorithm for generating Islamic star patterns.

**Core Concept**: Start with a tiling of the plane (any polygon mesh). For each edge in the tiling, place a pair of pattern lines that cross the midpoint of that edge at a specified **contact angle θ**. The pattern is the union of all these line segments.

**Algorithm Steps**:
1. **Input**: A planar tiling T (e.g., regular hexagonal, square, or arbitrary polygon mesh) + a contact angle θ.
2. **For each edge E in T**: 
   - Find midpoint O of E.
   - Draw two rays from O, one on each side of E, each making angle θ with the edge E.
   - Extend each ray until it either hits another tile edge or a preset maximum length.
3. **Result**: The union of all ray segments forms the star pattern.
4. The contact angle θ determines the "style":
   - θ = 90°: straight lines (no star, just grid)
   - θ ≈ 45°: medium stars for 8-fold patterns
   - θ ≈ 36°: pointed stars for 5/10-fold patterns
   - θ ≈ 30°: very pointed for 6/12-fold patterns
   - θ ≈ 51.4°: for 7/14-fold patterns (acute family)
   - For n-fold star in an n-gon tile: θ = 180°(1/2 - 1/n) = 90° - 180°/n

**Contact Position O**: lies at the midpoint of tile edge EF. The two contact edges OU and OV form identical contact angle θ with OE (the edge direction). This is symmetric about the edge midpoint.

**Inference Algorithm**: When a tile shape is irregular, Kaplan uses an "inference" algorithm to fill in pattern lines for tiles where the standard crossing-midpoint rule doesn't cleanly connect. This handles the gaps at odd polygon intersections.

**Rosette Transform**: Kaplan's paper also introduces a "rosette transform" that converts star centers into rosette (petal) forms, by reflecting star arms about the edge bisectors.

**Islamic Parquet Deformations**: The PIC method naturally supports parquet deformations (Hofstadter/Huff), where θ varies continuously across the design — this creates smooth transitions from one star pattern to another.

**Key Formal Result**: Every Islamic star pattern with n-fold symmetry at a particular tile type can be parameterized by:
- The base tiling
- The contact angle θ ∈ (0°, 90°)
- Optional rosette transform

**Available Implementation**:
- GitHub: https://github.com/azer89/Star_Patterns (C++, Kaplan's algorithm)
- Kaplan's own software: Taprats (Java, open source)
- Grasshopper plugins for Rhino use the same algorithm

---

## 2. The 7/14-Fold System (Frontier)
**Source**: Jay Bonner & Marc Pelletier, "A 7-Fold System for Creating Islamic Geometric Patterns: Part 1: Historical Antecedents," *Bridges 2012*, pp. 141–148.
**URL**: https://archive.bridgesmathart.org/2012/bridges2012-141.pdf

### Why 7-fold is special:
- 7 does **not divide 360° evenly** (360/7 ≈ 51.43°)
- There is **no exact compass-and-straightedge construction** of the regular heptagon (proven impossibility — the heptagon is not constructible with compass and straightedge, unlike the hexagon, octagon, 12-gon, etc.)
- Despite this, historical Islamic artists created stunning 7-fold patterns using **approximate constructions** and the **polygonal technique**

### Historical Evidence:
- Earliest known: **Ghaznavid minaret of Mas'ud III in Ghazna, Afghanistan** (1099–1115 CE)
  - Two 7-fold examples predate the next earliest by ~100 years
  - Used 6 edge-to-edge heptagons as the sub-grid
- **Seljuk Anatolia** (3 examples, 1200–1238 CE):
  - Great Mosque of Dunaysir (1200–04): 14-s5 acute design
  - Great Mosque of Malatya (1237–38): 14-s4 2-point design
  - Egridir Han (1229–36): 14-s2 obtuse design
- Each used the same **hexagonal arrangement of 6 heptagons** as the underlying sub-grid

### The 7/14 System Construction:
**Sub-grid elements**: derived from arranging regular heptagons in various configurations.

**Primary element**: The **elongated hexagon** produced by 6 edge-to-edge heptagons:
- 4 interior angles of 2/7 × 360° = 2×360°/7 ≈ 102.86°
- 2 interior angles of 3/7 × 360° = 3×360°/7 ≈ 154.29°

**Pattern contact angles** for the tetradecagon (14-gon):
- The 14-gon allows 6 natural pattern angles
- Nomenclature: 14-sN where N = number of edge intervals between connected midpoints
  - 14-s1: most obtuse (crosses near midpoint, low angle)
  - 14-s2: obtuse (25.71°)
  - 14-s3: median
  - 14-s4: 2-point
  - 14-s5: acute (51.43°) — most common historical
  - 14-s6: most acute (very spiky 14-pointed stars)

**Construction Algorithm**:
1. Arrange regular heptagons in the desired tessellation (elongated hexagon = 6 heptagons)
2. For each edge of the heptagonal sub-grid, draw two lines crossing the midpoint at angle = (s × 360°/14) × some factor
3. Connect these to form the star pattern
4. The underlying sub-grid is discarded — only the star pattern remains

**Quasicrystalline extensions** (Part 2):
- The 7/14 System can produce quasiperiodic (aperiodic) patterns
- These have 7-fold rotational symmetry but no translational periodicity
- Analogous to Penrose tilings (5-fold) but with 7-fold symmetry
- Self-similar patterns with recursive structure at multiple scales

### Azizi Naserabad & Ghanbaran (2023) — 7-fold generalization:
**Source**: "Presenting a Method to Generate Existing and Novel Girihs (Islamic Geometric Patterns) for All Systems and Families Based on 7-Fold Patterns," *Computer-Aided Design*, 2023.
**URL**: https://www.sciencedirect.com/science/article/abs/pii/S0010448522001518

- Presents a **notation system** for the 7-fold system
- Generative parameters to construct girihs (patterns) in 4 families: acute, middle, obtuse, two-point
- Works for all Bonner's polygonal systems, unified through the 7-fold lens
- Key contribution: bridges the gap between historical examples and systematic generation

---

## 3. Azizi Naserabad & Ghanbaran (2025) — Hybrid Girihs
**Source**: "Computational approach in presenting a parametric method to construct hybrid girihs (hybrid Islamic geometric patterns)," *SAGE Journals*, 2025.
**URL**: https://journals.sagepub.com/doi/10.1177/14780771241279347

### Method:
- Extends the 7-fold system to generate **hybrid girihs** — patterns that mix elements from different symmetry families (e.g., combining 5-fold and 7-fold elements)
- Parametric method allows systematic variation of the generating parameters
- Produces both historical patterns and novel designs

---

## 4. Barrios & Alani (2015) — Parametric Metamorphosis
**Source**: "Parametric Analysis in Islamic Geometric Designs," *CAAD Futures 2015*.
**URL**: In `/tmp/islamic-patterns/references/cumincad-cf2015-304.pdf`

### Method:
**Fundamental Unit → Cell → Pattern hierarchy**:
1. Decompose any IGP into its **fundamental unit** (minimum non-symmetric motif)
2. Parameterize the free points within the fundamental unit's bounding triangle
3. Three point types: Anchored (A, fixed), Constrained (C, move along a line toward center), Free (F, move anywhere in region)
4. Vary parameters to produce **metamorphosis** between patterns

**Rules for parametric variation**:
- Fixed topology: no point overlap, no line overlap, points stay in fundamental region
- Variable topology: at least one point overlap allowed (creates topological change)

**Color as parameter**: Adding color as a variable attribute changes the symmetry group of the cell and thus the pattern.

**Morphing**: Continuous interpolation between two extreme designs, finding all intermediate designs. Key-shapes (significant instances) can be extracted and frozen.

**Key finding**: Of 16 selected key-shapes from a 6-point star morphing procedure, 7 correspond to **existing historical IGPs**. The other 9 are new patterns not previously documented.

---

## 5. Lu & Steinhardt (2007) — Quasicrystals in Medieval Islamic Architecture
**Source**: "Decagonal and Quasi-Crystalline Tilings in Medieval Islamic Architecture," *Science* 315, Feb 2007.

### Finding:
- The **Darb-i Imam shrine** (Isfahan, 1453 CE) uses a tiling that is **quasiperiodic** — no translational symmetry, but long-range order with 10-fold symmetry
- This is a **Penrose-like tiling** discovered 500 years before Penrose (1974)
- Used **5 girih tile types** (decagon, pentagon, rhombus, hexagon, bowtie)
- Pattern lines cross each tile edge at 54° (= 3×180°/10)
- Achieved via **self-similar subdivision** — large tiles can be subdivided into smaller same-shape tiles

### The 5 Girih Tiles:
1. **Regular decagon** (10-sided): interior angle 144°
2. **Regular pentagon** (5-sided): interior angle 108°
3. **Elongated hexagon** ("bow-tie": hexagon with two 72° angles): 
4. **Rhombus**: angles 72° and 108°
5. **Irregular pentagon** (bowtie): one pair of 72° angles

### Significance:
- All angles are multiples of 36° (the 10-fold quantum = 360°/10)
- The quasicrystalline tiling has local 10-fold symmetry everywhere but no global translational repeat
- Connection to Penrose tiles: the girih rhombus and hexagon are exactly the Penrose "thick" and "thin" rhombi

---

## 6. Abdullahi & Embi (2013) — Historical Evolution Survey
**Source**: "Evolution of Islamic Geometric Patterns," *Frontiers of Architectural Research* 2(3), 2013.
**URL**: In `/tmp/islamic-patterns/references/evolution-igp-2013.pdf`

### Key Timeline (from 100-building survey):
| Period | Patterns introduced | Key buildings |
|--------|---------------------|---------------|
| Umayyad (660–750) | None — only vegetal/floral | Dome of Rock, Great Mosque of Damascus |
| Abbasid (750–1258) | 6-fold, 8-fold (late 9th c.) | Ibn-Tulun Mosque (876–879 CE) — first geometric patterns |
| Fatimid (909–1171) | 6-fold, simple 8-fold | Al-Azhar (970), Al-Aqmar (1125) |
| Seljuk (1037–1194) | 5-fold, 8-fold, 10-fold; 7-, 9-fold (!!) | Friday Mosque Isfahan (1086 heptagon!), Barsian (1098) |
| Mamluk (1250–1517) | 12-fold, 16-fold, complex 10-fold | Qalawun Complex (1283), Alhambra (1338) |
| Ottoman (1290–1923) | 6, 10, 12-fold (fewer complex) | Suleymaniye (1551), Rustam Pasha (1560) |
| Safavid (1501–1722) | 8-fold, 10-fold dominant | Hakim Mosque Isfahan (1656) |
| Mughal (1526–1737) | 6, 8, 10, 12-fold; 14-fold (!!) | Fatehpur-Sikri (1596), Tomb of Akbar (1612), Etimad-ud-Daulah (1628) |

### Scientific Progress:
- Early 9th century: circle + tangential circles → simplest tilings
- Late 9th century: circle grids introduced (Ibn-Tulun)
- 12th century: 10-fold quasiperiodic discovered (5/10 System)
- 13th century: unique 7-, 9-, 11-, 13-point patterns (non-constructible polygons!)
- Modern era: computational methods, parametric design

---

## 7. NPJ Heritage Science Review (2023) — Comprehensive State of the Art
**Source**: "Application-based principles of islamic geometric patterns; state-of-the-art, and future trends in computer science/technologies: a review," *npj Heritage Science*, Feb 2023.
**URL**: https://www.nature.com/articles/s40494-022-00852-w

### Computer Science Approaches Identified:

**Generation methods**:
- **Symmetry groups (17 plane groups)**: Abas & Salman (1992), Djibril & Rachid (2008)
- **Shape grammars**: Refalian et al. (2022)
- **CAD tools + Grasshopper**: Riether & Baerlecken (2012) using PIC method in Grasshopper
- **Formal grammar**: rule-based generation
- **Graph theory**: pattern topology analysis
- **Machine learning / AI**: Lahcen et al. (2024) — AI-driven IGP generation

**Self-similar / quasiperiodic**:
- Method for unit cells (periodic) + mirror reflections (quasiperiodic)
- Khamjane et al.: new self-similar IGPs inspired by traditional + recent discoveries

**Key contemporary tools**:
- **Zouaq Pattern Generator** (web-based, Hasba method)
- **Taprats** (Craig Kaplan, Java, open source)
- **Islamic Geometry Explorer** (various, web)

---

## 8. Richard Henry & Art of Islamic Pattern — "Secret of Sevens"
**Source**: artofislamicpattern.com/online-classes/online-series-archive-richard-henry/on-line-series-the-secret-of-sevens/

### Key points:
- "The number 7 is **extremely rare within the natural world**"
- "It **cannot be constructed with compass and straight edge with perfect mathematical accuracy**"
- Richard Henry has developed a course specifically on 7-fold patterns
- Historical heptagonal iwan (vaulted arch entrance) details documented
- The "secret" involves using an **approximate construction** that yields visually perfect 7-fold patterns

### Approximate Heptagon Construction (compass & straightedge):
The most common approximation used historically:
1. Draw circle C1 radius R
2. Bisect the radius to find the point R/2 along horizontal
3. Draw arc from R/2 to the 60° point on the circle — this gives an approximation of the heptagon side length
4. Step this chord around the circle 7 times — error ≈ 0.07° per step, cumulative ~0.5° total
5. This is close enough to be visually indistinguishable in tile work

---

## 9. Breaking Complexity: Kaleidoscopic Tools (2025)
**Source**: "Breaking Complexity: Kaleidoscopic Tools for Islamic Geometric Pattern Design," *Nexus Network Journal*, March 2025.
**URL**: https://link.springer.com/article/10.1007/s00004-025-00814-2

Uses kaleidoscopic symmetry operations (reflections, rotations) as design tools. AI algorithms (Lahcen et al. 2024) are now being applied to IGP generation.

---

## 10. Kaplan's Broader Computational Geometry Work
**Related papers**:
- "Islamic Star Patterns in Absolute Geometry" (2004, ACM ToG) — extends to hyperbolic geometry
- "Taprats" software: applies PIC method to generate patterns from any polygon tiling
- "Parquet Deformations": the PIC method with smoothly varying contact angle creates continuous morphing between star patterns

### The Hankin-Kaplan Method (detailed algorithmic summary):

```
ALGORITHM PIC_STAR_PATTERN(tiling T, angle θ):
  pattern = []
  for each edge E = (P1, P2) in tiling T:
    midpoint O = (P1 + P2) / 2
    edge_dir = normalize(P2 - P1)
    # two perpendicular contact rays, rotated by θ from edge direction
    ray1_dir = rotate(edge_dir, +θ)   # "left" ray
    ray2_dir = rotate(edge_dir, -θ)   # "right" ray  
    # extend rays until they hit another edge midpoint or tile edge
    seg1 = ray_march(O, ray1_dir, max_dist=|E|/2)
    seg2 = ray_march(O, ray2_dir, max_dist=|E|/2)
    pattern.append(seg1)
    pattern.append(seg2)
  return pattern

ROSETTE_TRANSFORM(star_arms, polygon_center, n_fold):
  for each arm A in star_arms meeting at polygon_center:
    reflect A about its adjacent tile edge bisector
  return reflected_arms
```

**Contact angle θ** for n-fold stars in regular n-gon:
- `θ = 90° - 180°/n` (for the "connecting midpoints of adjacent edges" construction)
- For n=6: θ = 60°
- For n=8: θ = 67.5°
- For n=10: θ = 72°
- For n=12: θ = 75°
- For n=14 (7-fold): θ = 90° - 180°/14 ≈ 77.14° (for the acute 14-s5 family, actual angle ≈ 51.4°)

**Pattern families** (from Bonner's classification):
- **Acute**: crossing angle θ > 60° relative to edge → sharp star points
- **Median** (also "2-point"): θ ≈ 45-60° → medium star points  
- **Obtuse**: θ < 45° → blunt star points, more like hexagonal/octagonal shapes

---

## Summary: What tenfold Needs to Know

### For implementation:
1. **Core algorithm**: Kaplan PIC — every Islamic pattern reduces to: tiling + contact angle θ → star lines
2. **Circle-grid method** (Sandy Kurt / traditional): compass+straightedge constructions that produce the same results via geometric intersection
3. **The two approaches are equivalent**: the circle-grid intersection points ARE the same points that PIC generates mathematically
4. **Fold systems** and their natural contact angles:
   - 4-fold (square): θ = 45°
   - 6-fold: θ = 60°
   - 8-fold: θ = 67.5°
   - 10-fold: θ = 72°
   - 12-fold: θ = 75°
   - 14-fold (7-based): θ ≈ 77° (acute family: 51.4°)

### Frontier areas (2020-2026):
1. **7-fold patterns**: systematic generation now possible (Bonner+Pelletier 2012, Azizi Naserabad 2023)
2. **Hybrid patterns**: mixing fold families (Azizi Naserabad 2025)
3. **AI-generated IGPs**: Lahcen et al. (2024) — machine learning applied
4. **3D / architectural applications**: parametric Grasshopper workflows for building facades
5. **Quasiperiodic patterns**: extensions of Penrose-like tilings in 7, 8, 12-fold symmetry

### The Golden Rule for tenfold:
Every pattern in the library should be specifiable as:
- A base polygon tiling (regular, semi-regular, or custom)
- A contact angle θ (or equivalently, a "contact fraction" s/n for n-fold systems)
- An optional rosette transform
- A tiling lattice (translation vectors for infinite repeat)

This covers essentially ALL known Islamic geometric patterns.
