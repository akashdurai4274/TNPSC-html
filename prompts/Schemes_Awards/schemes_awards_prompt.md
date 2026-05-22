# Prompt — Government Schemes & International Awards Artifact

Use this prompt to generate a **complete TNPSC Group 1 master-reference page** covering **50 Central Government Schemes**, **50 State Government Schemes**, and **20 International Awards**. The artifact must be fully self-contained, exam-ready, and match the Arivoam design system exactly.

---

## How to Use This Prompt

1. Paste this entire prompt into Claude (or your AI tool)
2. The AI will generate a rich, structured HTML artifact with all three sections
3. Save the output as `Notes_GovtSchemes_IntlAwards_TNPSC_Group1.html` in the project root or a relevant folder

---

## Instructions for the AI

Create a **single self-contained HTML file** titled **"Government Schemes & International Awards — TNPSC Group 1 Master Reference"**.

The artifact must have THREE major sections:

1. **Central Government Schemes** — 50 schemes, fully detailed
2. **State Government Schemes** — 50 Tamil Nadu / other key state schemes
3. **International Awards** — 20 major international awards/prizes

---

## Design System (copy verbatim into `<style>`)

```css
:root {
  --bg:       #0d0f14;
  --bg2:      #12151c;
  --bg3:      #181c26;
  --bg4:      #1e2230;
  --gold:     #f5c842;
  --gold-dim: #c9a22a;
  --gold-glow:rgba(245,200,66,0.12);
  --text:     #e8e4d8;
  --text-dim: #9a9585;
  --text-muted:#5a5650;
  --red:      #e84040;
  --red-bg:   rgba(232,64,64,0.12);
  --green:    #3ecf6e;
  --green-bg: rgba(62,207,110,0.10);
  --blue:     #4a9fff;
  --blue-bg:  rgba(74,159,255,0.10);
  --purple:   #b06cff;
  --purple-bg:rgba(176,108,255,0.10);
  --orange:   #ff8c42;
  --orange-bg:rgba(255,140,66,0.10);
  --teal:     #2dd4bf;
  --teal-bg:  rgba(45,212,191,0.10);
  --border:   rgba(245,200,66,0.18);
  --border-dim:rgba(255,255,255,0.06);
  --radius:   10px;
  --radius-lg:16px;
}
```

## Fonts (Google Fonts import)

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
```

- **Headings / section titles / table headers** — `'Syne', sans-serif` weight 700–800
- **Labels / badges / codes / years / numbers** — `'IBM Plex Mono', monospace`
- **Body text / descriptions / notes** — `'Lora', serif`

---

## Required Page Structure

### 1. Fixed Back Link (top-left corner)
```html
<a href="index.html" class="back-link">← Hub</a>
```
Style: `IBM Plex Mono` 11px, gold color, `background:rgba(13,15,20,0.92)`, `border:1px solid rgba(245,200,66,0.3)`, `backdrop-filter:blur(4px)`, `position:fixed; top:8px; left:12px; z-index:999; border-radius:4px; padding:4px 10px; text-decoration:none;`

### 2. Animated Grid Background (fixed, full-page)
```css
body::before {
  content:'';
  position:fixed; inset:0; z-index:0;
  background-image:
    linear-gradient(rgba(245,200,66,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245,200,66,0.04) 1px, transparent 1px);
  background-size:60px 60px;
  animation:gridShift 20s linear infinite;
  pointer-events:none;
}
@keyframes gridShift { 0%{background-position:0 0} 100%{background-position:0 60px} }
```

### 3. Hero Section
Dark gradient background with gold bottom border (2px), padding 56px 32px 40px:
- Small badge chip: `IBM Plex Mono` 11px uppercase gold — `TNPSC GROUP 1 · GENERAL STUDIES`
- `<h1>` in Syne 800, `clamp(28px,4vw,52px)`, white with key word in gold — e.g. `Government <span>Schemes</span> & Awards`
- Subtitle in Lora italic, muted: "50 Central · 50 State · 20 International Awards — Complete Master Reference for Group 1"
- Meta pills row in IBM Plex Mono 11px: "120 Entries", "3 Sections", "TNPSC GR 1", "PYQ Heavy" — pill-shaped colored borders

### 4. Sticky Section Tabs (below hero)
Three tabs that scroll to each section:
```css
.section-tabs {
  position:sticky; top:0; z-index:100;
  background:rgba(13,15,20,0.97); backdrop-filter:blur(12px);
  border-bottom:1px solid var(--border-dim);
  display:flex; gap:0;
}
.tab-btn {
  font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:600;
  letter-spacing:1px; text-transform:uppercase;
  padding:14px 24px; border:none; background:transparent;
  color:var(--text-muted); cursor:pointer; transition:all 0.2s;
  border-bottom:2px solid transparent; flex:1; text-align:center;
}
.tab-btn:hover { color:var(--text); background:rgba(255,255,255,0.03); }
.tab-btn.active { color:var(--gold); border-bottom-color:var(--gold); background:var(--gold-glow); }
```
Tab labels: "🏛 Central Schemes (50)", "🏢 State Schemes (50)", "🏆 International Awards (20)"

### 5. Section Headers
```css
.section-title {
  font-family:'Syne',sans-serif; font-size:11px; font-weight:700;
  letter-spacing:3px; text-transform:uppercase; color:var(--gold);
  display:flex; align-items:center; gap:12px; margin:48px 0 24px;
}
.section-title::after {
  content:''; flex:1; height:1px;
  background:linear-gradient(to right, var(--border), transparent);
}
```

### 6. Search / Filter Bar (one per section)
```css
.filter-bar {
  display:flex; gap:10px; align-items:center; flex-wrap:wrap;
  margin-bottom:20px; padding:12px 16px;
  background:var(--bg2); border:1px solid var(--border-dim); border-radius:var(--radius);
}
.filter-input {
  flex:1; min-width:200px;
  background:var(--bg3); border:1px solid var(--border-dim); border-radius:6px;
  color:var(--text); font-family:'IBM Plex Mono',monospace; font-size:12px;
  padding:8px 12px; outline:none;
}
.filter-input:focus { border-color:rgba(245,200,66,0.4); }
.filter-chip {
  font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:600;
  padding:5px 12px; border-radius:20px; border:1px solid var(--border-dim);
  background:var(--bg3); color:var(--text-muted); cursor:pointer; transition:all 0.15s;
}
.filter-chip.active, .filter-chip:hover {
  border-color:var(--gold); color:var(--gold); background:var(--gold-glow);
}
```

---

## SECTION A — Central Government Schemes (50)

Organise these 50 schemes into **thematic sub-groups** with a sub-group header above each group. Use the following grouping:

**Sub-groups:**
1. Agriculture & Farmer Welfare (5–6 schemes)
2. Rural Development & Employment (5–6 schemes)
3. Health & Nutrition (5–6 schemes)
4. Education & Skill Development (5–6 schemes)
5. Housing & Urban Development (4–5 schemes)
6. Financial Inclusion & Social Security (5–6 schemes)
7. Women & Child Development (4–5 schemes)
8. Infrastructure & Digital India (4–5 schemes)
9. Environment & Clean Energy (3–4 schemes)
10. Defence & Internal Security (2–3 schemes)

### Scheme Table Format

Use this table structure for **each sub-group**:

```html
<table class="scheme-table">
  <thead>
    <tr>
      <th>#</th>
      <th>Scheme Name</th>
      <th>Year</th>
      <th>Ministry</th>
      <th>Key Objective / Beneficiaries</th>
      <th>TNPSC Angle</th>
    </tr>
  </thead>
  <tbody>
    <!-- rows -->
  </tbody>
</table>
```

```css
.scheme-table {
  width:100%; border-collapse:collapse; font-size:13px; margin:12px 0 32px;
}
.scheme-table thead {
  position:sticky; top:52px; z-index:10;
}
.scheme-table th {
  background:var(--bg4); font-family:'IBM Plex Mono',monospace;
  font-size:10px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase;
  color:var(--gold-dim); padding:10px 12px; text-align:left;
  border-bottom:2px solid var(--border);
}
.scheme-table td {
  padding:10px 12px; border-bottom:1px solid var(--border-dim);
  vertical-align:top; line-height:1.6;
}
.scheme-table tr:last-child td { border-bottom:none; }
.scheme-table tr:hover td { background:rgba(245,200,66,0.03); }
.scheme-table td:nth-child(1) {
  font-family:'IBM Plex Mono',monospace; font-size:11px;
  color:var(--text-muted); width:36px;
}
.scheme-table td:nth-child(2) {
  font-family:'Syne',sans-serif; font-weight:700; font-size:13px;
  color:var(--gold); min-width:180px;
}
.scheme-table td:nth-child(3) {
  font-family:'IBM Plex Mono',monospace; font-size:11px;
  color:var(--text-dim); white-space:nowrap; width:60px;
}
.scheme-table td:nth-child(4) {
  font-family:'IBM Plex Mono',monospace; font-size:11px;
  color:var(--blue); min-width:140px;
}
.scheme-table td:nth-child(5) {
  font-family:'Lora',serif; font-size:13px; color:var(--text);
}
.scheme-table td:nth-child(6) {
  font-family:'IBM Plex Mono',monospace; font-size:11px;
  color:var(--orange);
}
```

### Sub-group Header Style
```css
.sub-group-header {
  display:flex; align-items:center; gap:12px;
  margin:32px 0 10px; padding:10px 16px;
  background:var(--bg3); border-left:3px solid var(--gold);
  border-radius:0 var(--radius) var(--radius) 0;
}
.sub-group-icon { font-size:18px; }
.sub-group-label {
  font-family:'Syne',sans-serif; font-size:14px; font-weight:800; color:#fff;
}
.sub-group-count {
  margin-left:auto; font-family:'IBM Plex Mono',monospace; font-size:10px;
  color:var(--text-muted); background:var(--bg4); padding:3px 8px; border-radius:8px;
}
```

### Central Schemes to Include (minimum, expand with details)

**Agriculture & Farmer Welfare:**
- PM-KISAN (Pradhan Mantri Kisan Samman Nidhi) — 2019
- PM Fasal Bima Yojana (PMFBY) — 2016
- Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) — 2015
- Kisan Credit Card (KCC) scheme
- Soil Health Card Scheme — 2015
- eNAM (National Agriculture Market) — 2016

**Rural Development & Employment:**
- MGNREGS (Mahatma Gandhi NREGS) — 2005
- PM Gram Sadak Yojana (PMGSY) — 2000
- Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY) — 2014
- PMAY-Gramin (Pradhan Mantri Awas Yojana — Rural) — 2016
- National Rural Livelihood Mission (NRLM / DAY-NRLM) — 2011
- Shyama Prasad Mukherji Rurban Mission — 2016

**Health & Nutrition:**
- Ayushman Bharat – PM Jan Arogya Yojana (AB-PMJAY) — 2018
- National Health Mission (NHM) — 2013
- Janani Suraksha Yojana (JSY) — 2005
- Poshan Abhiyaan (National Nutrition Mission) — 2018
- Mission Indradhanush — 2014
- PM Swasthya Suraksha Yojana (PMSSY) — 2006

**Education & Skill Development:**
- Samagra Shiksha Abhiyan — 2018
- PM POSHAN (Mid-Day Meal Scheme) — 1995 (renamed 2021)
- Pradhan Mantri Kaushal Vikas Yojana (PMKVY) — 2015
- Atal Tinkering Labs (ATL) / Atal Innovation Mission — 2016
- National Apprenticeship Training Scheme (NATS)
- PM VIDYA / DIKSHA / eVidya — 2020

**Housing & Urban Development:**
- PMAY-Urban (PM Awas Yojana — Urban) — 2015
- Smart Cities Mission — 2015
- AMRUT (Atal Mission for Rejuvenation & Urban Transformation) — 2015
- Swachh Bharat Mission (SBM) — 2014
- HRIDAY (Heritage City Development & Augmentation Yojana) — 2015

**Financial Inclusion & Social Security:**
- Jan Dhan Yojana (PMJDY) — 2014
- PM Jeevan Jyoti Bima Yojana (PMJJBY) — 2015
- PM Suraksha Bima Yojana (PMSBY) — 2015
- Atal Pension Yojana (APY) — 2015
- Mudra Yojana (PMMY) — 2015
- Stand Up India — 2016

**Women & Child Development:**
- Beti Bachao Beti Padhao (BBBP) — 2015
- Sukanya Samriddhi Yojana — 2015
- One Stop Centre (Sakhi) — 2015
- Mission Shakti — 2021
- Ujjwala Yojana (PMUY) — 2016

**Infrastructure & Digital India:**
- Digital India — 2015
- BharatNet — 2011 (relaunched 2015)
- PM Gati Shakti — 2021
- National Logistics Policy — 2022
- Startup India — 2016

**Environment & Clean Energy:**
- National Solar Mission (JNNSM) — 2010
- PM Ujjwala Yojana (clean cooking — listed in Women section too)
- FAME India Scheme (EV promotion) — 2015
- National Action Plan on Climate Change (NAPCC)

**Defence & Security:**
- Agnipath Scheme — 2022
- Make in India (Defence) — 2014

---

## SECTION B — State Government Schemes (50)

Organise these 50 Tamil Nadu state schemes into **thematic sub-groups**:

1. Agriculture & Farmers (5 schemes)
2. Women & Self-Help Groups (6 schemes)
3. Education & Youth (6 schemes)
4. Health & Insurance (5 schemes)
5. Housing & Urban (4 schemes)
6. Social Welfare & Welfare Schemes (8 schemes)
7. Employment & Skill (5 schemes)
8. Infrastructure & Transport (4 schemes)
9. Food & PDS (3 schemes)
10. Environment & Energy (4 schemes)

### Same table structure as Section A with columns:
`# | Scheme Name | Year | Dept / Ministry | Key Benefit / Target Group | Exam Note`

### Tamil Nadu State Schemes to Include

**Agriculture:**
- CM's Farmer Protection Scheme (Uzhavar Padhukappu Thittam)
- Free Electricity to Farmers (up to 3 HP)
- Tamil Nadu Farmers' Crop Insurance Scheme
- Drought Relief Assistance to Farmers
- Precision Farming Development Centre

**Women & SHG:**
- Kalaignar Magalir Urimai Thogai (Women's Rights Fund) — ₹1000/month
- Moovalur Ramamirtham Ammaiyar Scheme (Girl student incentive)
- Pudhumai Penn Scheme — ₹1000/month for college-going girls
- Amma Two-Wheeler Scheme (subsidised scooter)
- Tamil Nadu Corporation for Development of Women (TNCDW) schemes
- Sumangali Thittam (Marriages Assistance to BC/MBC girls)

**Education:**
- Chief Minister's Breakfast Scheme — 2023
- Free Laptop Scheme for students
- Naan Mudhalvan Skill Training Programme
- Illam Thedi Kalvi (Learning from Home)
- CM's Model Schools initiative
- Higher Education fee reimbursement

**Health & Insurance:**
- Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS) — Kalaignar Kapitu Thittam
- Mahalir Thittam (maternal health)
- Dr. Muthulakshmi Maternity Benefit Scheme
- Tamil Nadu Universal Health Coverage
- Makkalai Thedi Maruthuvam (Doorstep healthcare)

**Housing & Urban:**
- Tamil Nadu Housing Board Schemes
- Chief Minister's Solar Powered Green House Scheme
- TNSCB (Slum Clearance Board) Housing
- Smart Cities Projects in Tamil Nadu

**Social Welfare:**
- Old Age Pension Scheme (Tamil Nadu)
- Disability Pension
- Widow Pension
- Transgenders Welfare Scheme
- Kalaignar Memorial Dravidam Scheme
- Destitute Prevention Scheme
- Amma Canteen (subsidised food)
- CM's Relief Fund assistance

**Employment & Skill:**
- Naan Mudhalvan (Skill + Employment linkage)
- Tamil Nadu Skill Development Corporation (TNSDC) programmes
- Tamil Nadu Industrial Training Institutes (ITIs)
- Employment Exchange upgradation
- Chief Minister's Self-Employment Scheme

**Infrastructure & Transport:**
- CMDA Metro Rail extension support
- Free Bus Travel for Women (TNSTC)
- Tamil Nadu Road Development Company (TNRDC) projects
- Chief Minister's Pothole-Free Roads initiative

**Food & PDS:**
- Tamil Nadu PDS (Ration Card system — free rice 5 kg)
- Amma Unavagam (subsidised meals)
- Anganwadi Supplementary Nutrition Programme

**Environment & Energy:**
- Cauvery Delta Region special agricultural zone
- Solar Panels on Government Buildings
- Tamil Nadu Green Energy Corporation
- Coastal Area Development schemes

---

## SECTION C — International Awards (20)

For this section, use a **card-grid layout** (NOT a table) — 4 cards per row on desktop, 2 on tablet, 1 on mobile.

### Award Card Style
```css
.awards-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));
  gap:16px; margin-top:20px;
}
.award-card {
  background:var(--bg2); border:1px solid var(--border-dim);
  border-radius:var(--radius-lg); overflow:hidden;
  transition:all 0.2s; cursor:default;
}
.award-card:hover {
  border-color:var(--border); transform:translateY(-2px);
  box-shadow:0 8px 32px rgba(0,0,0,0.4);
}
.award-card-top {
  padding:20px 20px 0;
  display:flex; align-items:flex-start; gap:14px;
}
.award-number {
  font-family:'IBM Plex Mono',monospace; font-size:11px; font-weight:700;
  color:var(--text-muted); width:24px; padding-top:2px; flex-shrink:0;
}
.award-icon { font-size:28px; flex-shrink:0; }
.award-name {
  font-family:'Syne',sans-serif; font-size:15px; font-weight:800; color:#fff;
  line-height:1.25; margin-bottom:4px;
}
.award-org {
  font-family:'IBM Plex Mono',monospace; font-size:10px; color:var(--gold);
  letter-spacing:0.5px;
}
.award-body {
  padding:14px 20px 16px;
}
.award-desc {
  font-family:'Lora',serif; font-size:13px; color:var(--text-dim);
  line-height:1.65; margin-bottom:12px;
}
.award-meta-row {
  display:flex; gap:8px; flex-wrap:wrap;
}
.award-pill {
  font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:600;
  padding:3px 9px; border-radius:12px; border:1px solid;
}
.pill-field  { color:#a78bfa; border-color:rgba(167,139,250,0.3); background:rgba(167,139,250,0.08); }
.pill-since  { color:var(--text-dim); border-color:var(--border-dim); background:var(--bg3); }
.pill-notable{ color:var(--green); border-color:rgba(62,207,110,0.3); background:var(--green-bg); }
.award-tnpsc {
  margin-top:12px; padding:8px 12px;
  background:var(--blue-bg); border-left:2px solid var(--blue);
  border-radius:0 6px 6px 0;
  font-family:'IBM Plex Mono',monospace; font-size:10px; color:var(--blue);
  line-height:1.5;
}
```

### International Awards to Include (all 20 with full details)

1. **Nobel Prize** — Alfred Nobel Foundation, Stockholm/Oslo. Since 1901. Six categories: Physics, Chemistry, Medicine, Literature, Peace, Economics. Indian Nobel laureates: Rabindranath Tagore (1913 Literature), C.V. Raman (1930 Physics), Mother Teresa (1979 Peace), Amartya Sen (1998 Economics), Abhijit Banerjee (2019 Economics). TNPSC angle: year + category of Indian winners.

2. **Booker Prize** — Booker Prize Foundation, UK. Since 1969. Best novel in English. Indian winners: Arundhati Roy (1997 — God of Small Things), Kiran Desai (2006), Aravind Adiga (2008). TNPSC angle: Indian winners + their books.

3. **Pulitzer Prize** — Columbia University, USA. Since 1917. Journalism, Arts, Letters. TNPSC angle: oldest US journalism award, any Indian-American winners.

4. **Man Booker International Prize** — for fiction translated into English. Distinguished from Booker Prize.

5. **Templeton Prize** — John Templeton Foundation. Spiritual progress. Since 1972. Dalai Lama won in 2012.

6. **Abel Prize** — Norwegian Academy of Science. Mathematics. Since 2003. Often called the "Nobel of Mathematics." TNPSC note: no Nobel for Maths, Abel Prize is equivalent.

7. **Fields Medal** — International Mathematical Union. Since 1936. Given every 4 years (ICM). Under-40 mathematicians. Maryam Mirzakhani — first woman (2014).

8. **Turing Award** — ACM, USA. Since 1966. "Nobel Prize of Computing." TNPSC angle: computing's highest honour.

9. **Pritzker Architecture Prize** — Hyatt Foundation, USA. Since 1979. Highest honour in architecture. Balkrishna Doshi — first Indian to win (2018). TNPSC angle: Indian winner.

10. **Oscar (Academy Awards)** — Academy of Motion Picture Arts and Sciences. Since 1929. Indian wins: Bhanu Athaiya (Costume Design, 1982 Gandhi), A.R. Rahman (Best Score + Best Song, 2009 Slumdog Millionaire). TNPSC angle: AR Rahman Tamil Nadu connection.

11. **Grammy Award** — Recording Academy, USA. Since 1959. Music. AR Rahman has Grammy nominations; Ravi Shankar won multiple. TNPSC note: India's sitar maestro.

12. **Palme d'Or** — Cannes Film Festival. Since 1955. Highest prize in world cinema. Satyajit Ray received Honorary Palme d'Or (1985). TNPSC angle: Indian cinema recognition.

13. **Golden Lion** — Venice Film Festival. Since 1949. One of world's oldest film festivals.

14. **Ramon Magsaysay Award** — Ramon Magsaysay Award Foundation, Philippines. Since 1958. Often called "Nobel Prize of Asia." Indian recipients include: Baba Amte, Ela Bhatt, T.N. Seshan, Arvind Kejriwal (2006), etc. TNPSC angle: Many Indian recipients.

15. **Sakharov Prize** — European Parliament. Since 1988. Freedom of Thought. Named after Andrei Sakharov.

16. **Right Livelihood Award** — "Alternative Nobel Prize". Sweden. Since 1980. Vandana Shiva (India) won in 1993.

17. **Goldman Environmental Prize** — USA. Since 1990. Grassroots environmental activists. Described as the "Green Nobel."

18. **Pulitzer Prize for International Reporting** — separate highlight from Pulitzer. TNPSC note: Reuters, AP, etc.

19. **Commonwealth Writers' Prize** — Commonwealth Foundation. Literature in English from Commonwealth nations. Many Indian authors have won.

20. **UNESCO Confucius Prize** — UNESCO. Literacy. Given every 2 years. India has received recognition for literacy campaigns.

---

## Additional Interactive Features

### Callout Boxes (use throughout)
```css
.callout {
  display:flex; gap:14px; padding:14px 18px;
  border-radius:var(--radius); border-left:3px solid; margin:16px 0;
}
.callout-icon {
  padding:3px 8px; border-radius:4px;
  font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:700;
  letter-spacing:1px; text-transform:uppercase; flex-shrink:0; height:fit-content;
}
.callout-text { font-family:'Lora',serif; font-size:14px; flex:1; line-height:1.7; }
.callout.critical { background:var(--red-bg);    border-color:var(--red);    }
.callout.critical .callout-icon { background:var(--red);    color:#fff; }
.callout.pyq     { background:var(--blue-bg);   border-color:var(--blue);   }
.callout.pyq     .callout-icon { background:var(--blue);   color:#fff; }
.callout.tip     { background:var(--green-bg);  border-color:var(--green);  }
.callout.tip     .callout-icon { background:var(--green);  color:#0d0f14; }
.callout.trap    { background:var(--gold-glow); border-color:var(--gold);   }
.callout.trap    .callout-icon { background:var(--gold);   color:#0d0f14; }
.callout.gem     { background:var(--purple-bg); border-color:var(--purple); }
.callout.gem     .callout-icon { background:var(--purple); color:#fff; }
```

Sprinkle callouts throughout:
- `critical` — schemes/awards that appeared multiple times in TNPSC PYQs
- `trap` — common mix-ups (e.g., Atal Pension vs APL/BPL, PMJDY vs PMJJBY)
- `tip` — mnemonics (e.g., "Jan Dhan, Jeevan Jyoti, Suraksha, Atal — 4 J's of 2015")
- `pyq` — "This scheme was asked in TNPSC Group 1 [year]"
- `gem` — surprise facts (e.g., "Balkrishna Doshi — first Indian Pritzker winner from Ahmedabad, connected to Le Corbusier")

### Stats Summary Cards (top of each section)
Before each section's filter bar, add a quick-stats row:
```css
.stats-row {
  display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr));
  gap:12px; margin:20px 0;
}
.stat-chip {
  background:var(--bg2); border:1px solid var(--border-dim);
  border-radius:var(--radius); padding:14px 16px; text-align:center;
}
.stat-val {
  font-family:'IBM Plex Mono',monospace; font-size:24px; font-weight:700;
  color:var(--gold); display:block; margin-bottom:4px;
}
.stat-lbl {
  font-family:'Lora',serif; font-size:12px; color:var(--text-muted);
}
```

### JavaScript — Tab Switching & Search Filter
Include JavaScript that:
1. Handles tab button clicks (adds/removes `.active` class, smooth-scrolls to section anchor)
2. Filters table rows by search input (case-insensitive match on scheme name + ministry + objective columns)
3. Hides `.sub-group-header` rows if all sibling rows are hidden
4. `filter-chip` buttons for category filtering

```javascript
// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = document.querySelector(btn.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Search filter per table
function setupSearch(inputId, tableId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll('#' + tableId + ' tbody tr').forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  });
}
```

### Footer
```html
<footer>
  <span>TNPSC Group 1</span> · Government Schemes & International Awards · Master Reference ·
  <span>Arivoam</span> · 2026
</footer>
```
```css
footer {
  background:var(--bg2); border-top:1px solid var(--border-dim);
  padding:28px 32px; text-align:center;
  font-family:'IBM Plex Mono',monospace; font-size:11px;
  color:var(--text-muted); letter-spacing:1px; margin-top:80px;
}
footer span { color:var(--gold); }
```

---

## Content Quality Rules

1. **Every scheme** must have: full official name + short name in brackets, launch year, nodal ministry, primary beneficiary group, and one TNPSC exam angle (what was asked or what's tricky)
2. **Every state scheme** must note the Tamil Nadu context even if it overlaps with central schemes
3. **Every award** must include: full name, awarding body, country, founding year, field, notable Indian recipient (if any), TNPSC exam note
4. **Callout boxes** must appear at least 2–3 per section for PYQ-heavy items
5. **Numbers** (years, amounts, counts) must always appear in `IBM Plex Mono` gold
6. **Ministry names** must be current (as of 2024–2025 — e.g., Ministry of Cooperation, Ministry of Ports)
7. All tables must be scrollable on mobile (`overflow-x:auto` wrapper)
8. Sticky table headers must remain visible during vertical scroll within each section

---

## File Naming Convention

```
Notes_GovtSchemes_IntlAwards_TNPSC_Group1.html
```

Save in the project root or a relevant subfolder.

---

## Example Prompt to Use

> "Using the Arivoam schemes-and-awards design system below, create a complete single-page HTML master reference for **Government Schemes & International Awards** for TNPSC Group 1 preparation. Include all 50 Central Government schemes, 50 State (Tamil Nadu) schemes, and 20 International Awards exactly as specified. Use thematic sub-groups, sticky headers, search/filter bars per section, callout boxes for PYQ-heavy and trap items, and the full award card grid. All numbers and years in IBM Plex Mono gold. One fully self-contained HTML file."
