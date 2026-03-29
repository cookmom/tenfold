# tenfold — Interactive Guide Structure
## First Draft Outline

Based on Richard Henry's "Pattern, Cognition and Contemplation" lecture,
expanded beyond Iran to cover all regions and periods.

---

### 1. THE CIRCLE
**Opening**: "All Islamic geometric patterns begin with the circle."
- The circle as symbol of unity (tawhid) — One God, one center
- The Ka'ba as cube (earthly square) circumscribed by tawaf (heavenly circle)
- Every pattern starts from this single point expanding outward
- **Interactive demo**: A single circle. Tap to divide. Watch what emerges.

### 2. ORIENTATION
**The qibla principle**: all mosques converge on one point
- Isfahan's Shah Mosque: city grid (cardinal) vs prayer hall (qibla offset)
- "The transition from the outward to the inward world" — Burckhardt
- Geometry as contemplative tool: "the numinous quality of Islamic patterns"
- Connection to AGOT: the compass, the cube, the qibla beam
- **Interactive demo**: Place a point (Mecca). All patterns orient toward it.

### 3. THE THREE PROPORTIONAL SYSTEMS
**Regional DNA of Islamic patterns**:

#### √2 — The Moroccan System
- √2 and (1+√2) = the silver ratio
- 8, 16, 32-fold rosettes
- Alhambra (Granada), Qarawiyyn (Fez), Ben Youssef (Marrakech)
- The khatam (octagram) as master tile
- **Interactive demo**: √2 grid → 8-fold pattern, slider to 16, 32

#### √3 — The Syrian/Egyptian System  
- Hexagonal grid, equilateral triangle base
- 6, 12-fold patterns
- Umayyad Mosque (Damascus), Ibn Tulun (Cairo)
- Flower of Life as foundation
- **Interactive demo**: Hex grid → 6-fold, slider to 12

#### φ — The Persian System
- Golden section (1+√5)/2 ≈ 1.618
- 5, 10-fold symmetry — the decagram/shamsa
- Isfahan (Friday Mosque, Shah Mosque), Yazd, Darb-i Imam
- Mr Oshaghi's method: circle → decagram → break down → extend → emerge
- Connection to Penrose tilings and quasicrystals (Lu & Steinhardt)
- **Interactive demo**: φ grid → 5-fold, slider to 10. Show self-similarity.

### 4. SELF-SIMILARITY
**Why these proportions feel harmonious**:
- "The smaller to the larger is as the larger to the whole" — the golden rule
- Same elements recurring at different scales (fractal property)
- DNA spiral, bone growth, shell accretion — biological self-similarity
- The Darb-i Imam shrine: two levels of self-similar tiling (2007 discovery)
- **Interactive demo**: Zoom into a pattern. Same shapes at every scale.

### 5. THE CONSTRUCTION
**From circle to pattern — the craftsman's method**:

#### The Compass and Straightedge
- "For centuries, the only tools" — Abdullahi & Embi
- Dividing the circle: 4, 5, 6, 8, 10, 12 parts
- Static and dynamic polygons (Sandy Kurt's method)
- The fundamental unit → cell → infinite pattern (Barrios & Alani)

#### Mr Oshaghi's Workshop
- Gereh-chini: geometric woodwork, Isfahan
- Dividers on sun-dried paper
- Shamsa (little sun) as seed shape
- "The design emerges at the intersections"
- Father to son transmission — living tradition

#### The Craftsman's Jigsaw
- Moareq: individually cut glazed tiles assembled face-down
- Zillij in Morocco: same technique, children apprenticed for years
- The twin-beaked hammer: unchanged since Roman era
- 30 zellige shapes from one construction (Sandy Kurt)

- **Interactive demo**: Step through a construction. Each compass move visualized.

### 6. THE SEVEN-FOLD MYSTERY
**The frontier — patterns that shouldn't tile**:
- 7 doesn't divide 360° evenly
- Mr Oshaghi's secret 7-fold designs
- Heptagonal patterns in rare historical examples
- The mathematical challenge: aperiodic vs periodic tiling
- **Interactive demo**: Attempt 7-fold. See where it breaks. See where it works.

### 7. THE STRAPWORK (GIRIH)
**What you actually see**:
- Tiles are hidden; strapwork lines are visible
- Lines cross each edge at 54° (3π/10)
- 5 girih tile types: decagon, pentagon, rhombus, hexagon, bowtie
- All angles = n × 36° (the tenfold quantum)
- The Darb-i Imam quasicrystal (500 years before Penrose)
- **Interactive demo**: Toggle between tiles and strapwork. See the pattern transform.

### 8. THE THREE DISCIPLINES
**Geometry + Islimi + Calligraphy**:
- Geometry: foundation (lower walls, floors)
- Islimi/Arabesque: biomorphic spiral (middle zone)
- Calligraphy: the Word (upper walls, domes)
- Three-fold hierarchy in architecture
- The Alhambra as masterclass: all three interwoven
- How tenfold extends to all three (geometry now, islimi + calligraphy future)

### 9. CONTEMPORARY PRACTICE
**Living tradition, new tools**:
- Sandy Kurt, Samira Mian, Eric Broug — hand-drawn tradition alive
- Zahra Ammar — 3D paper sculptures from geometric concepts
- Craig Kaplan — computational Islamic geometry
- Parametric analysis (Barrios & Alani) — metamorphosis between patterns
- Zouaq Pattern Generator — web-based Hasba method
- **tenfold** — open-source, importable, zero dependencies

### 10. THE LIBRARY
**Using tenfold in your projects**:
- `npm install tenfold`
- API reference with live examples
- Circle grid → emergent pattern → SVG output
- Clipping to arbitrary boundaries
- Proportional systems: φ, √2, √3
- Export: SVG, Canvas, print, CNC, laser cut

---

## Design Principles (for the guide itself)
- Dark background (#0d0d12), light text — like AGOT
- Same font system: Inter, weight 300, .08em spacing
- Each section has prose + interactive SVG demo + code snippet
- Sliders/controls below each demo (like heerich.js)
- Prose quality: research-paper citations + accessible language
- Bismillah at the top
- Mobile-first, responsive
