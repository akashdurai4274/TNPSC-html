# Prompt — Single Leader Notes Artifact (from YouTube Transcript)

Use this prompt to generate a **complete TNPSC master-notes page for ONE specific leader or social reformer**, sourced entirely from a YouTube lecture transcript. Every single point, date, quote, and detail from the lecture must be captured — nothing skipped.

---

## How to Use This Prompt

1. Paste this entire prompt into Claude (or your AI tool)
2. Append the YouTube transcript at the end under `## TRANSCRIPT`
3. The AI will extract **every fact, date, name, quote, organisation, book, event** from the transcript and build a structured HTML artifact around that single leader

---

## Instructions for the AI

You are given a YouTube lecture transcript about **one specific leader or social reformer**. Your job is to:

1. **Extract every single point** from the transcript — no fact, date, quote, anecdote, organisation, book title, law, movement, or connection mentioned by the lecturer should be omitted
2. **Organise** all extracted information into logical sections (Early Life → Education → Contributions → Works → Legacy etc.)
3. **Build a single self-contained HTML file** using the exact design system below
4. **Do not hallucinate** — only include what is explicitly stated in the transcript. If the lecturer emphasises something repeatedly, mark it as a PYQ-heavy callout
5. Every number, year, place name, and proper noun from the transcript must appear in the artifact

---

## Design System (copy verbatim into `<style>`)

```css
:root {
  --bg: #0d0f14;
  --bg2: #12151c;
  --bg3: #181c26;
  --bg4: #1e2230;
  --gold: #f5c842;
  --gold-dim: #c9a22a;
  --gold-glow: rgba(245,200,66,0.12);
  --text: #e8e4d8;
  --text-dim: #9a9585;
  --text-muted: #5a5650;
  --red: #e84040;
  --red-bg: rgba(232,64,64,0.12);
  --green: #3ecf6e;
  --green-bg: rgba(62,207,110,0.10);
  --blue: #4a9fff;
  --blue-bg: rgba(74,159,255,0.10);
  --purple: #b06cff;
  --purple-bg: rgba(176,108,255,0.10);
  --orange: #ff8c42;
  --orange-bg: rgba(255,140,66,0.10);
  --border: rgba(245,200,66,0.18);
  --border-dim: rgba(255,255,255,0.06);
  --radius: 10px;
  --radius-lg: 16px;
}
```

## Fonts (Google Fonts import)

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
```

- **Headings / section titles** — `'Syne', sans-serif` weight 800
- **Labels / badges / dates / data keys** — `'IBM Plex Mono', monospace`
- **Body text / descriptions / quotes** — `'Lora', serif`

---

## Required Page Structure

### 1. Fixed Back Link (top-left corner)
```html
<a href="../index.html" class="back-link">← Hub</a>
```
Style: `IBM Plex Mono` 11px, gold color, `background:rgba(13,15,20,0.92)`, `border:1px solid rgba(245,200,66,0.3)`, `backdrop-filter:blur(4px)`, `position:fixed; top:8px; left:12px; z-index:999; border-radius:4px; padding:4px 10px`

### 2. Animated Grid Background (fixed, full-page)
```css
body::before {
  content: '';
  position: fixed; inset: 0; z-index: 0;
  background-image:
    linear-gradient(rgba(245,200,66,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245,200,66,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridShift 20s linear infinite;
  pointer-events: none;
}
@keyframes gridShift { 0%{background-position:0 0} 100%{background-position:0 60px} }
```

### 3. Hero Section
Dark gradient background, `border-bottom: 2px solid var(--gold)`, padding 48px 32px 36px:
- Small badge chip: `IBM Plex Mono` 11px uppercase, gold bg on dark — e.g. `TNPSC GROUP 1 · LEADERS`
- `<h1>` in Syne 800, `clamp(28px,4vw,52px)`, color `var(--gold)` — the leader's full name
- Leader's birth name / alternate names in Lora italic, muted
- Meta row: Born year · Died year · Movement · TNPSC relevance — `IBM Plex Mono` pills

### 4. Quick Facts Panel (immediately below hero)
A single card with all key biographical data in a grid — pulled directly from the transcript:
```css
.quick-facts {
  background:var(--bg2); border:1px solid var(--border);
  border-radius:var(--radius-lg); padding:24px 28px;
  display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px;
  margin:32px 0;
}
.fact-item { }
.fact-lbl {
  font-family:'IBM Plex Mono',monospace; font-size:10px;
  letter-spacing:1.5px; text-transform:uppercase; color:var(--text-muted); margin-bottom:4px;
}
.fact-val { font-family:'Lora',serif; font-size:14px; color:var(--text); }
.fact-val.gold { color:var(--gold); font-weight:600; }
```
Fields (use only what is in the transcript): Full Name · Born · Died · Birthplace · Religion/Caste · Father · Mother · Spouse · Education · Known For · Organisations Founded · Awards/Honours · Pen Name / Other Names

### 5. Sticky TOC Navigation (jump-links to sections)
```css
.sticky-nav {
  position:sticky; top:0; z-index:100;
  background:rgba(13,15,20,0.97); backdrop-filter:blur(12px);
  border-bottom:1px solid var(--border-dim);
}
.toc-scroll {
  max-width:1200px; margin:0 auto; padding:10px 24px;
  display:flex; flex-wrap:wrap; gap:6px; overflow-x:auto;
}
.toc-link {
  font-family:'IBM Plex Mono',monospace; font-size:10px;
  color:var(--text-muted); text-decoration:none; white-space:nowrap;
  padding:3px 8px; border-radius:3px; border:1px solid transparent;
  transition:all 0.15s;
}
.toc-link:hover { color:var(--gold); border-color:rgba(245,200,66,0.3); }
```
Generate one TOC link per section (e.g., Early Life · Education · Political Career · Key Works · Organisations · Timeline · Quotes · PYQ Focus)

### 6. Section Headers
```css
.section-title {
  font-family:'Syne',sans-serif; font-size:11px; font-weight:700;
  letter-spacing:3px; text-transform:uppercase; color:var(--gold);
  display:flex; align-items:center; gap:12px; margin:48px 0 20px;
}
.section-title::after {
  content:''; flex:1; height:1px;
  background:linear-gradient(to right, var(--border), transparent);
}
```

### 7. Content Sections (generate all that are supported by the transcript)

**A. Early Life & Background**
- Prose in Lora 15px, line-height 1.8
- Inline highlights: years in IBM Plex Mono gold, place names in `<strong>`

**B. Education**
- Data table: Institution | Year | Subject/Degree | Notes
- Table styles: `.data-table` (see below)

**C. Political / Social Career (narrative + timeline)**
- Chronological prose with embedded timeline strip for key milestones

**D. Key Works, Books & Writings**
- Data table: Title | Year | Language | Significance
- Each title in IBM Plex Mono gold, significance in Lora

**E. Organisations Founded / Associated With**
- Data table: Organisation | Year Founded | Purpose | Still Active?

**F. Important Quotes**
- Blockquote style:
  ```css
  .quote-block {
    border-left:3px solid var(--gold); padding:14px 20px;
    background:var(--gold-glow); border-radius:0 var(--radius) var(--radius) 0;
    margin:16px 0;
    font-family:'Lora',serif; font-style:italic; font-size:15px;
    color:var(--text); line-height:1.8;
  }
  .quote-block cite {
    display:block; margin-top:8px;
    font-family:'IBM Plex Mono',monospace; font-size:11px;
    color:var(--gold-dim); font-style:normal;
  }
  ```

**G. Complete Chronological Timeline**
- Every date/event mentioned in the transcript as a timeline strip:
  ```css
  .timeline { list-style:none; padding:0; }
  .timeline li {
    display:flex; gap:14px; padding:8px 0;
    border-bottom:1px solid var(--border-dim); font-size:13.5px;
  }
  .tl-year {
    font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:600;
    color:var(--gold); min-width:44px; padding-top:2px;
  }
  .tl-event { font-family:'Lora',serif; flex:1; }
  ```

**H. Connections & Influence** (if mentioned in transcript)
- People influenced by / who influenced the leader
- Inline grid of name chips: `IBM Plex Mono` 12px, `border:1px solid var(--border)`, `border-radius:4px`

**I. TNPSC PYQ Focus Section**
- List all points the lecturer explicitly emphasises as exam-important
- Wrap each in a `.callout.pyq` box (blue)
- Add `.callout.trap` (gold) for common misconceptions mentioned

### 8. Data Tables
```css
.data-table {
  width:100%; border-collapse:collapse; font-size:13px; margin:12px 0;
}
.data-table th {
  background:var(--bg4); font-family:'IBM Plex Mono',monospace;
  font-size:10px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase;
  color:var(--gold-dim); padding:10px 12px; text-align:left;
  border-bottom:2px solid var(--border);
}
.data-table td {
  padding:9px 12px; border-bottom:1px solid var(--border-dim); vertical-align:top;
}
.data-table tr:last-child td { border-bottom:none; }
.data-table tr:hover td { background:rgba(245,200,66,0.04); }
.data-table td:first-child {
  font-weight:500; color:var(--gold);
  font-family:'IBM Plex Mono',monospace; font-size:12px;
}
```

### 9. Callout Boxes
```css
.callout {
  display:flex; gap:14px; padding:14px 18px;
  border-radius:var(--radius); border-left:3px solid; margin:16px 0;
}
.callout-icon {
  font-size:13px; padding:3px 8px; border-radius:4px;
  font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:700;
  letter-spacing:1px; text-transform:uppercase; flex-shrink:0; height:fit-content;
}
.callout.critical { background:var(--red-bg); border-color:var(--red); }
.callout.critical .callout-icon { background:var(--red); color:#fff; }
.callout.trap { background:var(--gold-glow); border-color:var(--gold); }
.callout.trap .callout-icon { background:var(--gold); color:#0d0f14; }
.callout.tip { background:var(--green-bg); border-color:var(--green); }
.callout.tip .callout-icon { background:var(--green); color:#0d0f14; }
.callout.pyq { background:var(--blue-bg); border-color:var(--blue); }
.callout.pyq .callout-icon { background:var(--blue); color:#fff; }
.callout.gem { background:var(--purple-bg); border-color:var(--purple); }
.callout.gem .callout-icon { background:var(--purple); color:#fff; }
.callout-text { font-family:'Lora',serif; font-size:14px; flex:1; line-height:1.7; }
```

Use callouts for:
- `critical` — absolutely must-know facts the lecturer stressed multiple times
- `trap` — common mistakes / confusion points the lecturer warned about
- `tip` — memory tricks / mnemonics the lecturer gave
- `pyq` — "this was asked in [year]" or "this always comes in exam" statements
- `gem` — rare/surprising fact mentioned that students usually miss

### 10. Footer
```css
footer {
  background:var(--bg2); border-top:1px solid var(--border-dim);
  padding:28px 32px; text-align:center;
  font-family:'IBM Plex Mono',monospace; font-size:11px;
  color:var(--text-muted); letter-spacing:1px; margin-top:80px;
}
footer span { color:var(--gold); }
```
Content: `Source: YouTube Lecture Transcript · <span>Arivoam TNPSC</span> · [Leader Name] Master Notes`

---

## Content Extraction Rules (Critical)

When processing the transcript:

1. **Every year/date** mentioned → goes into the Timeline section AND inline in the relevant prose section
2. **Every proper noun** (person, place, organisation, book, law, movement) → highlighted in the relevant section
3. **Repeated emphasis** by the lecturer → wrapped in a `callout.critical` or `callout.pyq`
4. **"This is important" / "remember this" / "this came in exam"** → always a `callout.pyq`
5. **Corrections** ("not X, it is Y") → wrapped in a `callout.trap`
6. **Mnemonics or memory tricks** the lecturer gives → `callout.tip`
7. **Numbers** (age, count of books, members, years of imprisonment etc.) → always in IBM Plex Mono gold
8. **Quotes attributed to the leader** → `quote-block`
9. **Nothing is too small** — even passing mentions (e.g., "he met Gandhi in 1920") must appear

---

## File Naming Convention

```
Leaders/Notes_[LeaderName]_TNPSC_Group1.html
e.g., Leaders/Notes_Periyar_TNPSC_Group1.html
     Leaders/Notes_BhagathSingh_TNPSC_Group1.html
     Leaders/Notes_BalGangadharTilak_TNPSC_Group1.html
```

---

## Example Prompt to Use

Paste the following, then append the transcript:

> "Using the Arivoam leaders notes design system below, create a complete single-leader HTML notes page for **[LEADER NAME]** from this YouTube lecture transcript. Extract EVERY single fact, date, quote, organisation, book, event, and point the lecturer mentions — do not omit anything. Organise into sections: Quick Facts Panel, Early Life, Education, Career/Movement, Key Works & Books, Organisations, Timeline, Quotes, and a TNPSC PYQ Focus section. Use callout boxes for anything the lecturer emphasised. All dates in IBM Plex Mono gold. One self-contained HTML file."
>
> ## TRANSCRIPT
> [paste the full YouTube transcript here]
