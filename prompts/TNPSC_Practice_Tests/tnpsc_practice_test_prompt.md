# Prompt — TNPSC Practice Test Artifact

Use this prompt to generate a **TNPSC full practice test page** (100–200 MCQ questions) that exactly matches the Arivoam project design system.

---

## Instructions for the AI

Create a single self-contained HTML file for a TNPSC practice test on **[TOPIC — e.g., "Indus Valley Civilisation — Test III"]**.

### Design System (copy verbatim into `<style>`)

```css
:root {
  --bg: #0d0f14;
  --surface: #12151e;
  --surface2: #181c28;
  --border: #21263a;
  --border2: #2d3450;
  --gold: #f5c842;
  --gold-dim: #c9a52e;
  --red: #e85555;
  --green: #4ecb7a;
  --blue: #5b9cf6;
  --purple: #a78bfa;
  --cyan: #22d3ee;
  --orange: #fb923c;
  --text: #e8eaf0;
  --text-dim: #8892aa;
  --font-head: 'Syne', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
  --font-body: 'Lora', serif;
}
```

### Fonts (Google Fonts import)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

- **Headings / question text** — `'Syne', sans-serif` weight 600–800
- **Labels / Q-numbers / badges / meta** — `'IBM Plex Mono', monospace`
- **Body text / answer explanations** — `'Lora', serif`

### Required Page Structure

1. **Animated grid background** (fixed, full-page):
   ```css
   body::before {
     content: ''; position:fixed; inset:0; z-index:0;
     background-image:
       linear-gradient(rgba(245,200,66,0.04) 1px, transparent 1px),
       linear-gradient(90deg, rgba(245,200,66,0.04) 1px, transparent 1px);
     background-size: 60px 60px;
     animation: gridShift 20s linear infinite;
     pointer-events: none;
   }
   @keyframes gridShift { 0%{background-position:0 0} 100%{background-position:0 60px} }
   ```

2. **Hero section** (centered text, bottom border `1px solid var(--border)`):
   - Gold badge chip: `background:rgba(245,200,66,0.1); border:1px solid rgba(245,200,66,0.3)`, IBM Plex Mono 11px uppercase
   - `<h1>` in Syne 800, `clamp(32px,5vw,58px)`, white, `<span>` in gold for topic word
   - Italic sub-line: Lora italic 18px, muted color
   - Stats row: question count, difficulty, section count — IBM Plex Mono pills

3. **Sticky section navigation** (jump links to each test section):
   - `position:sticky; top:0; background:rgba(13,15,20,0.96); backdrop-filter:blur(10px)`
   - Section tabs: IBM Plex Mono 11px, active = gold underline
   - Progress bar (thin, gold): shows % of questions revealed/answered

4. **Section headers** inside the test:
   ```html
   <div class="section-head" id="s1">
     <span class="s-num">01</span>
     SECTION TITLE
   </div>
   ```
   ```css
   .section-head { font-family:'Syne',sans-serif; font-size:13px; font-weight:700;
     letter-spacing:3px; text-transform:uppercase; color:var(--gold);
     border-bottom:1px solid var(--border); padding-bottom:10px; margin:40px 0 22px;
     display:flex; align-items:center; gap:10px; }
   .s-num { font-family:'IBM Plex Mono',monospace; background:var(--gold);
     color:#000; font-size:10px; padding:2px 7px; border-radius:2px; }
   ```

5. **Question cards** — one per MCQ:
   ```css
   .q-card {
     background: var(--surface); border:1px solid var(--border);
     border-radius:8px; margin-bottom:20px; overflow:hidden;
     transition:box-shadow 0.2s;
   }
   .q-card:hover { box-shadow:0 0 0 1px rgba(245,200,66,0.2); }
   ```
   - **Card header** (`.q-header`): Q-number badge (gold bg, black text, IBM Plex Mono 11px) + question text (Syne 600 14px white) + difficulty/type badges
   - **Options** (`.q-options`): 4 options (A–D) as `<label>` with radio inputs hidden, Lora 14px
   - **Answer reveal toggle** button: IBM Plex Mono 11px gold, chevron icon, full-width, border-top `rgba(255,255,255,0.05)`
   - **Answer body** (`.q-body`) — collapsible with CSS transition:
     - Correct answer highlighted in green
     - Explanation in Lora italic muted
     - "Why others are wrong" in smaller Lora text
     - PYQ note / Difficulty badge

6. **Difficulty badges**:
   ```css
   .badge-easy   { background:rgba(78,203,122,0.15); color:var(--green); }
   .badge-medium { background:rgba(245,200,66,0.15); color:var(--gold); }
   .badge-hard   { background:rgba(232,85,85,0.15);  color:var(--red); }
   .badge-pyq    { background:rgba(91,156,246,0.15); color:var(--blue); }
   .badge-trap   { background:rgba(251,146,60,0.15); color:var(--orange); }
   .badge-gem    { background:rgba(167,139,250,0.15);color:var(--purple); }
   ```
   All badges: `font-family:'IBM Plex Mono',monospace; font-size:10px; padding:2px 8px; border-radius:3px; font-weight:600`

7. **Filter bar** (sticky, above questions):
   - Buttons for: All / Easy / Medium / Hard / PYQ / GEM / Trap
   - Each `.fb` button: IBM Plex Mono 11px, transparent bg, colored border matching badge color
   - Active / hover: `background:rgba(255,255,255,0.07)`

8. **Score summary panel** (optional, fixed bottom or end of page):
   - Shows X/Total correct in large Syne font
   - Progress ring or bar in gold
   - "Review Mistakes" filter button

9. **Back link** (fixed, top-left):
   ```html
   <a href="../../index.html" class="back-link-hub">← Hub</a>
   ```

10. **Footer**: IBM Plex Mono 11px, centered, muted, brand name in gold

### Answer Toggle JavaScript

```js
document.querySelectorAll('.q-toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    btn.nextElementSibling.classList.toggle('open', !expanded);
  });
});

// Filter
document.querySelectorAll('.fb').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fb').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.q-card').forEach(card => {
      card.classList.toggle('hidden', f !== 'all' && !card.dataset.tags.includes(f));
    });
  });
});
```

### Content Guidelines

- **150 questions** minimum; group into 8–10 sections of 15–20 questions each
- Question text in Syne 600, options A–D in Lora 14px
- Each question has `data-tags="easy pyq"` etc. for filtering
- Mark PYQ years: `[PYQ 2019]` in IBM Plex Mono 10px blue badge
- Answer explanation: 2–3 lines in Lora italic, key term in gold
- Section names match syllabus subtopics
- All static data embedded in HTML — no external API calls

### File Naming Convention

```
Test/[Subject]/[Topic]/[Topic]_[RomanNumeral].html
e.g., Test/History/Indus Valley Civilisation/Indus_Valley_III.html
```

---

## Example Prompt to Use

> "Create a TNPSC practice test HTML page on 'Stone Age & Prehistoric India' with 150 MCQ questions. Follow the Arivoam design system exactly (dark theme, Syne/IBM Plex Mono/Lora fonts, gold accent #f5c842, animated grid background). Structure the questions into 8 sections: Palaeolithic Age, Mesolithic Age, Neolithic Age, Chalcolithic Age, Important Sites, Excavations, Comparison with IVC, and PYQ Specials. Each question should have A–D options, collapsible answer with explanation, and appropriate difficulty/PYQ badges. Add a sticky filter bar and section navigation. All in one self-contained HTML file."
