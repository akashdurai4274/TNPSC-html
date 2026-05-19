# Prompt — SSC Full Mock Simulation Artifact

Use this prompt to generate an **SSC full-length mock test simulator** that exactly matches the Arivoam SSC simulation design system (different from the TNPSC dark theme — this uses a warm parchment-gold scheme).

---

## Instructions for the AI

Create a single self-contained HTML file for an SSC mock simulation for **[EXAM — e.g., "SSC Selection Post Phase 14"]**.

### Design System — SSC Simulation Theme (warm dark / parchment gold)

```css
:root {
  --bg-main: #0f0d08;
  --bg-panel: #1e1a0e;
  --bg-darker: #14120b;
  --bg-active: #2d2615;
  --accent-gold: #c9a84c;
  --accent-glow: #d4a843;
  --accent-parchment: #e8c96d;
  --accent-bronze: #8a6a1a;
  --text-white: #f5edd6;
  --text-cream: #c4b896;
  --gold-border-alpha: rgba(201,168,76,0.25);
}
```

### Fonts (Google Fonts import) — SSC uses different fonts from TNPSC

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap" rel="stylesheet">
```

- **Headings / section titles** — `'Playfair Display', serif`
- **Body text / question text** — `'Source Serif 4', Georgia, serif`
- **Mono labels / timers / counts** — `monospace` (system)

### Core UI Components

1. **Body background**: `var(--bg-main)` (#0f0d08), very dark warm tone
   ```css
   body { background-color:var(--bg-main); color:var(--text-white);
     font-family:'Source Serif 4',Georgia,serif; }
   ```

2. **Gold buttons** (primary actions):
   ```css
   .btn-gold {
     background-color: var(--accent-gold); color: var(--bg-main);
     font-weight: bold; border:none; border-radius:3px; cursor:pointer;
     text-transform:uppercase; letter-spacing:0.5px;
     transition: all 0.2s ease-in-out;
   }
   .btn-gold:hover {
     background-color: var(--accent-glow);
     box-shadow: 0 0 15px rgba(212,168,67,0.6);
     transform: translateY(-1px);
   }
   ```

3. **Shimmer loading effect** (for panels):
   ```css
   .shimmer-bg {
     background: linear-gradient(90deg,#1e1a0e 25%,#2d2615 50%,#1e1a0e 75%);
     background-size: 200% 100%;
     animation: shimmerAnim 3s infinite linear;
     border: 1px solid var(--accent-gold);
   }
   @keyframes shimmerAnim {
     0%{background-position:200% 0} 100%{background-position:-200% 0}
   }
   ```

4. **Scrollbar**:
   ```css
   ::-webkit-scrollbar { width:6px; height:6px; }
   ::-webkit-scrollbar-track { background:var(--bg-main); }
   ::-webkit-scrollbar-thumb { background:var(--accent-gold); border-radius:3px; }
   ```

### Required Page Structure

#### A. Exam Entry Screen (shown first, before test starts)

- Centered card on dark bg
- Exam title in Playfair Display 700, gold
- Exam details grid: Duration / Total Questions / Sections / Marking Scheme
- `[START EXAM]` button — `.btn-gold`, large (padding 14px 40px)
- Instructions list in Source Serif 4, cream text

#### B. Exam Interface (shown after clicking START)

**Top bar (sticky)**:
- Left: Exam title (Playfair Display 14px gold)
- Center: Countdown timer — `HH:MM:SS` in large monospace, turns red when < 5 min
- Right: Section name + Q number counter `"Q 12 / 100"`

**Side panel (left, collapsible on mobile)**:
- Question palette — numbered buttons (1–N)
- Color coding:
  - Not visited: `var(--bg-panel)`, gold border
  - Visited unanswered: `#3a2e10` (warm amber tint)
  - Answered: `var(--accent-gold)`, dark text
  - Marked for review: `#6b21a8` (purple)
- Section tabs above palette: click to jump to section

**Main question area**:
```css
.question-panel {
  background: var(--bg-panel); border:1px solid var(--gold-border-alpha);
  border-radius: 6px; padding: 28px;
}
.question-text {
  font-family: 'Source Serif 4', serif; font-size: 17px;
  line-height: 1.7; color: var(--text-white); margin-bottom: 24px;
}
.option-label {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 12px 16px; border-radius: 4px; cursor: pointer;
  border: 1px solid var(--gold-border-alpha); margin-bottom: 10px;
  transition: all 0.15s; font-family: 'Source Serif 4', serif;
  font-size: 15px; color: var(--text-cream);
}
.option-label:hover { background: var(--bg-active); border-color: var(--accent-gold); }
.option-label input[type=radio] { display:none; }
.option-label.selected { background:rgba(201,168,76,0.12); border-color:var(--accent-gold); color:var(--text-white); }
```

**Bottom action bar**:
- `[← Previous]` `[Mark & Next]` `[Save & Next →]` `[Clear Response]`
- All styled as `.btn-gold` or ghost variants

#### C. Results Screen (shown after time up or SUBMIT)

- Score card: Correct / Incorrect / Not Attempted in large Playfair Display
- Section-wise breakdown table
- Top stat: `X.XX / Y` in large gold number, "(XX.X%)"  
- Accuracy ring (CSS only, no canvas needed — use `conic-gradient`)
- `[Review Answers]` button to show all questions with correct answers highlighted

### Marking Scheme Logic (JavaScript)

```js
const MARKING = { correct: 2, wrong: -0.5, skipped: 0 };

function calculateScore(responses, answerKey) {
  let score = 0, correct = 0, wrong = 0, skipped = 0;
  answerKey.forEach((ans, i) => {
    if (responses[i] === undefined || responses[i] === null) { skipped++; }
    else if (responses[i] === ans) { score += MARKING.correct; correct++; }
    else { score += MARKING.wrong; wrong++; }
  });
  return { score, correct, wrong, skipped };
}
```

### Timer Logic (JavaScript)

```js
let totalSeconds = 60 * 60; // 60 minutes
const timerEl = document.getElementById('timer');
const interval = setInterval(() => {
  totalSeconds--;
  if (totalSeconds <= 0) { clearInterval(interval); submitExam(); return; }
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  timerEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  if (totalSeconds < 300) timerEl.style.color = '#ef4444';
}, 1000);
```

### Content Guidelines

- Embed all questions as a JS array:
  ```js
  const questions = [
    { id:1, section:'General Intelligence', text:'...', options:['A','B','C','D'], answer:2, explanation:'...' },
    ...
  ];
  ```
- Each section defined in:
  ```js
  const sections = [
    { id:'gi', label:'General Intelligence & Reasoning', from:1, to:25 },
    { id:'qa', label:'Quantitative Aptitude', from:26, to:50 },
    { id:'eng', label:'English Language', from:51, to:75 },
    { id:'gk', label:'General Awareness', from:76, to:100 },
  ];
  ```
- Marking scheme displayed prominently before exam: `+2 Correct | −0.5 Wrong | 0 Skipped`
- All state stored in a JS object (no localStorage required for standalone)
- Mobile responsive: side panel collapses, question palette becomes bottom drawer

### File Naming Convention

```
Simulation/SSC/SSC_[ExamName]_[Phase/Year]_Simulation.html
e.g., Simulation/SSC/SSC_SelectionPost_Phase14_Simulation.html
```

---

## Example Prompt to Use

> "Create an SSC Selection Post Phase 14 (2024) full mock simulation HTML page following the Arivoam SSC simulation design system. Use the warm dark parchment-gold theme (bg #0f0d08, gold #c9a84c, Playfair Display + Source Serif 4 fonts). Include 100 questions across 4 sections: General Intelligence & Reasoning (25Q), Quantitative Aptitude (25Q), English Language (25Q), General Awareness (25Q). Implement: countdown timer (60 min), question palette with color-coded status, section tabs, mark-for-review functionality, negative marking (−0.5), and a results screen with section-wise score breakdown. All self-contained in one HTML file."
