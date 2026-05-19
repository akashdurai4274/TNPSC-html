# Prompt — TNPSC Full Mock Simulation Artifact

Use this prompt to generate a **TNPSC full-length mock exam simulator** that matches the Arivoam TNPSC dark design system (same core palette as the notes/tests but with an exam-interface layout).

---

## Instructions for the AI

Create a single self-contained HTML file for a TNPSC mock simulation for **[EXAM — e.g., "TNPSC Group 2A — Full Mock Test 1"]**.

### Design System — TNPSC Simulation Theme (same as notes/tests palette)

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

### Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

- **Headings / section titles** — `'Syne', sans-serif` weight 800
- **Labels / timer / Q-counter / badges** — `'IBM Plex Mono', monospace`
- **Question text / explanations** — `'Lora', serif`

### Required Page Structure

#### A. Exam Entry / Instructions Screen

- Dark card on animated grid background (same grid as tests: 60px×60px gold lines)
- Gold badge: "TNPSC GROUP [N] — MOCK TEST" in IBM Plex Mono uppercase
- Exam title in Syne 800, white + gold `<span>`
- Details table: Duration | Total Questions | Sections | Marking (+1 / −0.33)
- Instructions list in Lora, muted color
- `[BEGIN EXAM]` button: gold bg, dark text, Syne 700, `border-radius:6px`, hover glow

#### B. Exam Interface

**Top bar (sticky, `background:rgba(13,15,20,0.97); backdrop-filter:blur(12px)`)**:
- Left: TNPSC logo text in Syne 700 gold
- Center: Timer in IBM Plex Mono 24px — `HH:MM:SS`, red when < 10 min
- Right: `Q 34 / 200` in IBM Plex Mono 13px

**Left sidebar** (question palette, sticky):
- Section tabs in IBM Plex Mono 11px:
  ```css
  .sec-tab { background:var(--surface); border:1px solid var(--border);
    font-family:var(--font-mono); font-size:11px; color:var(--text-dim);
    padding:6px 12px; border-radius:4px; cursor:pointer; }
  .sec-tab.active { background:var(--gold); color:#0d0f14; border-color:var(--gold); }
  ```
- Question palette buttons (30×30px grid):
  ```css
  .q-btn { width:34px; height:34px; border-radius:4px; cursor:pointer;
    font-family:var(--font-mono); font-size:11px; font-weight:600;
    border:1px solid var(--border); background:var(--surface);
    color:var(--text-dim); transition:all 0.15s; }
  .q-btn.answered  { background:var(--green); color:#0d0f14; border-color:var(--green); }
  .q-btn.skipped   { background:var(--surface2); border-color:var(--border2); }
  .q-btn.marked    { background:var(--purple); color:#fff; border-color:var(--purple); }
  .q-btn.current   { border:2px solid var(--gold); color:var(--gold); }
  ```

**Main question panel**:
```css
.q-panel {
  background: var(--surface); border:1px solid var(--border);
  border-radius:10px; padding:28px 32px;
}
.q-number-badge {
  display:inline-block; background:var(--gold); color:#0d0f14;
  font-family:var(--font-mono); font-size:11px; font-weight:700;
  padding:3px 10px; border-radius:4px; margin-bottom:16px;
}
.q-text {
  font-family:var(--font-head); font-size:16px; font-weight:600;
  color:var(--text); line-height:1.6; margin-bottom:24px;
}
.option {
  display:flex; align-items:flex-start; gap:12px;
  padding:12px 16px; border-radius:6px; cursor:pointer; margin-bottom:10px;
  border:1px solid var(--border); font-family:var(--font-body);
  font-size:14.5px; color:var(--text-dim); transition:all 0.15s;
}
.option:hover { background:var(--surface2); border-color:var(--border2); color:var(--text); }
.option.selected { background:rgba(245,200,66,0.08); border-color:var(--gold); color:var(--text); }
.option.correct  { background:rgba(78,203,122,0.12); border-color:var(--green); color:var(--green); }
.option.wrong    { background:rgba(232,85,85,0.12);  border-color:var(--red);   color:var(--red); }
.option-key {
  font-family:var(--font-mono); font-size:12px; font-weight:700;
  color:var(--gold); min-width:20px;
}
```

**Bottom action bar**:
- `[← Prev]` `[Mark for Review]` `[Clear]` `[Save & Next →]`
- Button styles:
  ```css
  .btn-primary { background:var(--gold); color:#0d0f14; font-family:var(--font-mono);
    font-size:12px; font-weight:700; padding:9px 20px; border:none;
    border-radius:6px; cursor:pointer; text-transform:uppercase; letter-spacing:1px; }
  .btn-ghost { background:transparent; color:var(--text-dim); font-family:var(--font-mono);
    font-size:12px; padding:9px 18px; border:1px solid var(--border);
    border-radius:6px; cursor:pointer; }
  .btn-ghost:hover { border-color:var(--gold); color:var(--gold); }
  ```

#### C. Results / Score Screen

- Score in large Syne 800 — `XX / 200` with gold accent
- Summary cards (horizontal row):
  - Correct: green, `var(--green)` border
  - Wrong: red
  - Skipped: muted
  - Score: gold
- Section-wise accuracy table
- `[Review Answers]` toggle — shows all questions with correct answers in green, wrong in red

### Marking Scheme Logic (JavaScript)

```js
const MARKING = { correct: 1, wrong: -1/3, skipped: 0 };
// TNPSC: +1 for correct, -1/3 for wrong (some exams no negative — adjust as needed)
```

### Timer Logic (JavaScript)

```js
// TNPSC Group 1: 3 hours (10800s); Group 2/2A: 3 hours; Group 4: 2.5 hours (9000s)
let totalSeconds = 3 * 60 * 60;
const timerEl = document.getElementById('timer');
const tick = setInterval(() => {
  if (--totalSeconds <= 0) { clearInterval(tick); submitExam(); return; }
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  timerEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  timerEl.style.color = totalSeconds < 600 ? '#e85555' : '';
}, 1000);
```

### Content Guidelines — TNPSC Paper Structure

**Group 1 (Prelim) — 200 Questions / 300 marks / 3 hours**:
```js
const sections = [
  { id:'tamil', label:'Tamil Language & Literature', from:1, to:30 },
  { id:'gs-history', label:'General Studies — History', from:31, to:60 },
  { id:'gs-geo', label:'General Studies — Geography', from:61, to:80 },
  { id:'gs-polity', label:'General Studies — Polity', from:81, to:110 },
  { id:'gs-economy', label:'General Studies — Economy', from:111, to:130 },
  { id:'gs-science', label:'General Studies — Science', from:131, to:160 },
  { id:'aptitude', label:'Aptitude & Mental Ability', from:161, to:200 },
];
```

**Group 4 — 100 Questions / 100 marks / 2.5 hours**:
- Tamil (30Q), GS (50Q), Aptitude (20Q)

- Questions embedded as JS array with `{ id, section, text, options, answer, explanation, difficulty, pyq }`
- Use `difficulty:'easy'|'medium'|'hard'` and `pyq: true|false` flags
- Tamil questions must include the Tamil Unicode text
- All self-contained, no external API

### File Naming Convention

```
Simulation/TNPSC/TNPSC_[Group]_[MockNumber]_Simulation.html
e.g., Simulation/TNPSC/TNPSC_Group2A_Mock1_Simulation.html
```

---

## Example Prompt to Use

> "Create a TNPSC Group 2A full mock simulation HTML page following the Arivoam TNPSC dark design system (Syne/IBM Plex Mono/Lora, gold #f5c842, bg #0d0f14). Include 100 questions across Tamil Language (25Q), General Studies (55Q), and Aptitude (20Q). Implement a 2.5-hour countdown timer, question palette with answered/skipped/marked states, section navigation tabs, and a results screen showing score/accuracy/section breakdown. Marking: +1 correct, 0 negative. All questions with A–D options and explanations in one self-contained HTML file."
