# Prompt — Live QA Revision Artifact

Use this prompt to generate a **TNPSC/SSC Live QA Revision page** — a rapid-fire Q&A study sheet with expandable answers, difficulty filters, and PYQ tagging. Matches the Arivoam QA revision design system exactly.

---

## Instructions for the AI

Create a single self-contained HTML file for a Live QA Revision session on **[TOPIC — e.g., "Indus Valley Civilization — Live Revision II"]**.

### Design System (copy verbatim into `<style>`)

```css
:root {
  --bg: #0d0f14;
  --bg2: #13161e;
  --bg3: #1a1e28;
  --gold: #f5c842;
  --gold2: #e8b830;
  --red: #e84040;
  --green: #3ecf6e;
  --blue: #4a9eff;
  --purple: #b47fff;
  --gray: #6b7280;
  --text: #e8e8e8;
  --text2: #b0b4be;
  --border: rgba(245,200,66,0.15);
}
```

### Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

- **Headings / question text** — `'Syne', sans-serif` weight 600–800
- **Labels / badges / Q-numbers / meta** — `'IBM Plex Mono', monospace`
- **Body text / answers / explanations** — `'Lora', serif`

### Required Page Structure

1. **Hero section** (dark gradient, 2px gold bottom border, 48px padding):
   ```css
   .hero {
     background: linear-gradient(135deg,#0d0f14 0%,#12151f 40%,#0f1520 100%);
     border-bottom: 2px solid var(--gold); padding: 48px 32px 36px;
     position: relative; overflow: hidden;
   }
   .hero::before {
     content:''; position:absolute; top:-60px; right:-60px;
     width:320px; height:320px;
     background:radial-gradient(circle,rgba(245,200,66,0.07) 0%,transparent 70%);
     pointer-events:none;
   }
   ```
   - `.hero-label`: IBM Plex Mono 11px, letter-spacing 3px, uppercase, gold, opacity 0.85
   - `<h1>` in Syne 800, `clamp(22px,4vw,36px)`, white, key word in `<span>` gold
   - Meta pills row: question count, section count, exam tag — IBM Plex Mono 11px, pill-shaped colored borders

2. **Sticky filter bar** (`position:sticky; top:0; background:var(--bg2); border-bottom:1px solid var(--border)`):
   ```css
   .fb { font-family:'IBM Plex Mono',monospace; font-size:11px; padding:5px 14px;
     border-radius:4px; border:1px solid transparent; cursor:pointer; transition:all 0.18s; }
   .fb-all   { color:var(--text2); border-color:var(--gray); }
   .fb-easy  { color:var(--green); border-color:rgba(62,207,110,0.35); }
   .fb-med   { color:var(--gold);  border-color:rgba(245,200,66,0.35); }
   .fb-hard  { color:var(--red);   border-color:rgba(232,64,64,0.35); }
   .fb-gem   { color:var(--purple);border-color:rgba(180,127,255,0.35); }
   .fb-pyq   { color:var(--blue);  border-color:rgba(74,158,255,0.35); }
   .fb:hover,.fb.active { background:rgba(255,255,255,0.07); }
   ```
   Filter buttons: All / Easy / Medium / Hard / PYQ / GEM / Trap

3. **TOC bar** (below filter bar):
   ```css
   .toc-wrap { background:var(--bg2); border-bottom:1px solid var(--border); padding:20px 32px; }
   .toc-title { font-family:'Syne',sans-serif; font-size:12px; font-weight:700;
     letter-spacing:2px; text-transform:uppercase; color:var(--gold); margin-bottom:12px; }
   .toc-link { font-family:'IBM Plex Mono',monospace; font-size:11px; color:var(--text2);
     text-decoration:none; padding:4px 10px; border:1px solid var(--border);
     border-radius:3px; transition:all 0.15s; }
   .toc-link:hover { color:var(--gold); border-color:rgba(245,200,66,0.4); }
   ```

4. **Difficulty legend bar**:
   ```html
   <div class="legend">
     <span class="legend-item"><span class="dot dot-green"></span> Easy</span>
     <span class="legend-item"><span class="dot dot-gold"></span> Medium</span>
     <span class="legend-item"><span class="dot dot-red"></span> Hard</span>
     <span class="legend-item"><span class="dot dot-blue"></span> PYQ</span>
     <span class="legend-item"><span class="dot dot-purple"></span> GEM</span>
   </div>
   ```

5. **Section headers**:
   ```css
   .section-head {
     font-family:'Syne',sans-serif; font-size:13px; font-weight:700;
     letter-spacing:3px; text-transform:uppercase; color:var(--gold);
     border-bottom:1px solid var(--border); padding-bottom:10px; margin:40px 0 22px;
     display:flex; align-items:center; gap:10px;
   }
   .s-num { font-family:'IBM Plex Mono',monospace; background:var(--gold);
     color:#000; font-size:10px; padding:2px 7px; border-radius:2px; }
   ```

6. **Question cards** — the core component:
   ```css
   .q-card { background:var(--bg2); border:1px solid var(--border);
     border-radius:8px; margin-bottom:20px; overflow:hidden; }
   .q-card:hover { box-shadow:0 0 0 1px rgba(245,200,66,0.2); }
   .q-card.gem-card { border-color:rgba(180,127,255,0.3); }
   .q-card.pyq-card { border-color:rgba(74,158,255,0.3); }
   ```

   **Card header** (`.q-header`):
   ```css
   .q-header { display:flex; align-items:flex-start; gap:14px;
     padding:16px 20px; background:rgba(255,255,255,0.02);
     border-bottom:1px solid rgba(255,255,255,0.06); }
   .q-num { font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:600;
     background:var(--gold); color:#000; padding:3px 9px; border-radius:3px;
     flex-shrink:0; margin-top:2px; }
   .q-text { font-family:'Syne',sans-serif; font-size:14px; font-weight:600;
     color:#fff; flex:1; }
   ```

   **Difficulty/type badges** (`.q-badges`):
   ```css
   .badge { font-family:'IBM Plex Mono',monospace; font-size:10px; padding:2px 8px;
     border-radius:3px; font-weight:600; }
   .badge-easy   { background:rgba(62,207,110,0.15); color:var(--green); }
   .badge-med    { background:rgba(245,200,66,0.15);  color:var(--gold); }
   .badge-hard   { background:rgba(232,64,64,0.15);   color:var(--red); }
   .badge-fact   { background:rgba(107,114,128,0.15); color:var(--text2); }
   .badge-con    { background:rgba(245,200,66,0.1);   color:var(--gold2); }
   .badge-trap   { background:rgba(232,64,64,0.1);    color:var(--red); }
   .badge-app    { background:rgba(62,207,110,0.1);   color:var(--green); }
   .badge-tnpsc  { background:rgba(74,158,255,0.12);  color:var(--blue); }
   .badge-gem    { background:rgba(180,127,255,0.15); color:var(--purple); }
   .badge-pyq    { background:rgba(74,158,255,0.15);  color:var(--blue); }
   ```

   **Answer toggle button**:
   ```css
   .q-toggle-btn { display:flex; align-items:center; gap:8px; background:none;
     border:none; cursor:pointer; font-family:'IBM Plex Mono',monospace;
     font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:var(--gold);
     padding:10px 20px; width:100%; text-align:left;
     border-top:1px solid rgba(255,255,255,0.05); }
   .q-toggle-btn:hover { background:rgba(245,200,66,0.05); }
   .q-toggle-icon { display:inline-flex; align-items:center; justify-content:center;
     width:18px; height:18px; border-radius:50%;
     border:1px solid rgba(245,200,66,0.4); font-size:12px;
     transition:transform 0.25s ease, background 0.2s; }
   .q-toggle-btn[aria-expanded="true"] .q-toggle-icon {
     transform:rotate(180deg); background:rgba(245,200,66,0.15); }
   ```

   **Answer body** (collapsible):
   ```css
   .q-body { padding:0 20px; max-height:0; overflow:hidden; opacity:0;
     transition:max-height 0.35s cubic-bezier(0.4,0,0.2,1), padding 0.25s, opacity 0.25s; }
   .q-body.open { max-height:2400px; padding:18px 20px 20px; opacity:1; }
   ```
   Content inside body:
   - Answer line: Lora bold, green `var(--green)` for correct answer
   - Explanation: Lora italic 14px, muted
   - Flash-fact table: key term (gold mono) → value (green) for 1-liner data points
   - "Why tricky" / Tamil translation note in smaller Lora

7. **Flash-fact tables** (inside answer bodies):
   ```css
   .flash-table th { font-family:'IBM Plex Mono',monospace; font-size:10px;
     letter-spacing:2px; text-transform:uppercase; color:var(--gold);
     padding:10px 14px; border-bottom:2px solid var(--gold); background:var(--bg2); }
   .flash-table td:first-child { color:var(--text2); }
   .flash-table td:last-child { color:var(--green); font-weight:600; }
   ```

8. **Master cheat-sheet table** (end of each section):
   ```css
   .cheat-table th { background:var(--gold); color:#000; font-family:'IBM Plex Mono',monospace;
     font-size:10px; letter-spacing:2px; text-transform:uppercase; padding:10px 14px; }
   .cheat-table td:first-child { color:var(--gold); font-weight:600;
     font-family:'IBM Plex Mono',monospace; font-size:12px; }
   ```

9. **Back link** (fixed, top-left):
   ```html
   <a href="../index.html" class="back-link-hub">← Hub</a>
   ```

10. **Footer**: IBM Plex Mono 11px centered muted, brand in gold

### JavaScript (filter + accordion)

```js
// Accordion
document.querySelectorAll('.q-toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !open);
    btn.nextElementSibling.classList.toggle('open', !open);
  });
});

// Expand / collapse all
document.getElementById('expandAll')?.addEventListener('click', () => {
  document.querySelectorAll('.q-toggle-btn').forEach(btn => {
    btn.setAttribute('aria-expanded', 'true');
    btn.nextElementSibling.classList.add('open');
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

- **60–100 questions** per revision page, grouped into 5–8 sections
- Each question has `data-tags="easy fact tnpsc"` (combine multiple tags)
- Question text: concise (1–2 lines), exam-style phrasing
- Answer: direct (1 sentence), followed by 2–3 line explanation
- Include flash-fact tables for data-heavy subtopics (dates, measurements, founders, etc.)
- Mark PYQ years explicitly: `<span class="badge badge-pyq">PYQ 2022</span>`
- GEM questions = rare high-value facts that repeatedly appear in exams
- Trap questions = common misconceptions
- Add a Master Cheat Table at the end of each section summarizing key data points

### File Naming Convention

```
QA_[Subject]_[Topic]_LiveRevision[-II/-III].html
e.g., QA_History_IndusValleyCivilization_LiveRevision-II.html
```

---

## Example Prompt to Use

> "Create a TNPSC Live QA Revision page on 'Vedic Age & Epic Age' with 80 questions following the Arivoam QA revision design system. Use the dark theme (bg #0d0f14, gold #f5c842, Syne/IBM Plex Mono/Lora). Structure into 6 sections: Early Vedic Period, Rig Veda, Later Vedic Period, Upanishads & Philosophy, Epics (Ramayana/Mahabharata), and PYQ Specials. Each question should have: collapsible answer, explanation, difficulty badge (Easy/Medium/Hard/GEM/PYQ/Trap). Include flash-fact tables for Vedic literature, a cheat table for key authors and dates. Add filter bar, TOC, sticky nav, and all JavaScript for filter + accordion in one self-contained HTML file."
