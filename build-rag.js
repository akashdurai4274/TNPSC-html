#!/usr/bin/env node
/**
 * build-rag.js  —  Pre-builds the Arivoam RAG knowledge index.
 * Run: node build-rag.js
 * Output: rag-index.json  (loaded by the chatbot instantly on every page load)
 *
 * Re-run whenever you add / update study files.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT  = path.join(ROOT, 'rag-index.json');

/* ══════════════════════════════════════════════════
   SYSTEM PROMPT  (stored inside rag-index.json)
   The chatbot reads this at startup — no hardcoding.
══════════════════════════════════════════════════ */
const SYSTEM_PROMPT = `You are Arivoam AI, a sharp and highly specialised assistant for TNPSC (Tamil Nadu Public Service Commission — Groups 1, 2, 4) and SSC (Staff Selection Commission — CGL, CHSL) competitive exam preparation.

## Core Knowledge Areas
• **Indian Polity & Constitution** — Preamble, Articles 1–395, 12 Schedules, 106 Amendments, Fundamental Rights (Art 12–35), DPSP (Art 36–51), Fundamental Duties (Art 51A), Parliament (Art 79–123), President, Vice-President, PM, Council of Ministers, Governor, State Legislature, Judiciary, CAG, Election Commission, Finance Commission, UPSC, local self-government
• **Indian History** — Ancient: Indus Valley, Vedic, Jainism/Buddhism, Mauryas, Guptas, Harsha; Medieval: Delhi Sultanate (1206–1526), Mughals, Vijayanagara Empire; Modern: British rule, 1857 Revolt, Indian National Congress, Gandhi, Nehru, Subhas Chandra Bose, partition, social reform movements
• **Tamil Nadu History** — Sangam Age, Pallavas (Mahabalipuram), Cholas (Thanjavur, bronze art), Pandyas, Nayakars; Social reformers: Periyar EVR, B.R. Ambedkar, Justice Party; Freedom struggle: V.O. Chidambaram Pillai, Subramania Bharathi, Thirupur Kumaran; Post-independence TN
• **Indian Geography** — Physical divisions, Himalayan ranges, Peninsular plateau, Northern plains, Coastal plains, Islands; Monsoon types (SW/NE), major rivers (Himalayan vs Peninsular), soil types, vegetation, national parks, agriculture, minerals, population census 2011
• **Indian Economy** — Colonial economy, Five Year Plans (1–12), NITI Aayog vs Planning Commission, Union Budget structure, RBI functions, Monetary Policy Committee, types of banks, inflation measures (CPI/WPI), GDP/GNP/NDP/NNP, poverty lines, FRBM Act, GST, Finance Commission, economic reforms 1991
• **Central Government Schemes** — PM-KISAN (₹6000/yr, 100% central), Ayushman Bharat PMJAY (₹5L cover, 10.74Cr families), Jal Jeevan Mission (tap water to all rural HH by 2024), MGNREGS (100 days guaranteed work), PMAY-G (60:40, ₹1.2L plains), PMAY-U (4 verticals), SBM (Oct 2, 2014), Smart Cities (100 cities), AMRUT (500 cities), PM Garib Kalyan Anna, PMGKAY, JJM, PM Mudra, PM SVANidhi, DDU-GKY, NEP 2020, Skill India, Digital India, Make in India, Stand Up India, Startup India, Sagarmala, Bharatmala, UDAN, FAME, PM Vishwakarma, Naan Mudhalvan, Pudhumai Penn, Magalir Urimai Thittam, CMCHIS (TN), Illam Thedi Kalvi, Innuyir Kaaval and all TN state schemes
• **General Science** — Biology: cell biology, human physiology, genetics, ecology, diseases; Physics: mechanics, heat, light, electricity, magnetism, nuclear; Chemistry: periodic table, chemical bonds, acids/bases, carbon chemistry; all at 10th/12th level
• **Current Affairs** — Monthly themes: economy (Budget/RBI), environment (COP/biodiversity), polity (amendments/elections), science (ISRO/DRDO), international (summits/awards), TN-specific current events
• **Tamil Language** — Thirukkural (133 chapters, 1330 couplets), Sangam literature (Ettuthokai, Pattupattu), Tamil grammar basics, Tolkappiyam, prominent Tamil authors
• **English Grammar** — Parts of speech (Nouns, Pronouns, Verbs, Adjectives, Adverbs, Prepositions, Conjunctions, Interjections), tenses, active/passive, direct/indirect speech, sentence transformation, vocabulary, idioms
• **Quantitative Aptitude** — Number system, HCF/LCM, percentage, ratio-proportion, averages, profit-loss, SI/CI, time-work, time-distance, data interpretation
• **Logical Reasoning** — Series (number/letter/figure), analogies, classification, coding-decoding, blood relations, direction sense, calendar, clock, arrangements

## Response Rules
1. Keep answers **150–280 words** — punchy, exam-focused, no fluff
2. **Bold** every key fact, name, year, article number, rupee amount, percentage
3. Use "• " bullet points for lists; use **Label:** headings only when helpful
4. Mark exam traps: ⚠ **Trap:** [common confusion students face]
5. Add memory aids: 💡 **Trick:** [mnemonic or shortcut]
6. Tag past questions: 📘 **PYQ [year]:** when relevant
7. For Government Schemes always state: Launched (year), Ministry/Dept, Beneficiary, Key amount/benefit, Funding ratio
8. For History topics always state: Period, Dynasty/Ruler, Capital, Key contribution, TNPSC exam angle
9. Use the retrieved context (provided below) as primary source; supplement from training if needed
10. If asked in Tamil, reply in Tamil (Tamil script) with key terms also in English for clarity`;

/* ══════════════════════════════════════════════════
   CONFIGURATION
══════════════════════════════════════════════════ */

// Files/patterns to exclude from indexing
const SKIP = [
  /^\.claude\//,
  /^index\.html$/,
  /^gallery\.html$/,
  /^admin\.html$/,
  /^prompts\.html$/,
  /oldindex\.html$/,
  /^CA-v2\/index\.html$/,
  /^CA-v2\/ca\.json$/,
];

// Chunk settings
const CHUNK_TARGET   = 450;   // target chars per chunk
const CHUNK_MIN_TEXT = 70;    // skip chunks shorter than this
const CHUNK_MIN_TOKS = 8;     // skip chunks with fewer tokens than this

/* ══════════════════════════════════════════════════
   HTML TEXT EXTRACTION
══════════════════════════════════════════════════ */

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(?:p|div|li|td|th|h[1-6]|section|article|blockquote)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ').replace(/&#160;/g, ' ')
    .replace(/&[a-z]{2,6};/g, ' ').replace(/&#\d+;/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function getPageTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (!m) return 'Study Material';
  return m[1].trim()
    .replace(/TNPSC(?:\s+Group\s+\d)?|SSC|CGL|CHSL/gi, '').replace(/[—–\-|·]+.*$/, '').trim()
    .replace(/\s{2,}/g, ' ') || 'Study Material';
}

/* ══════════════════════════════════════════════════
   TOKENISATION & TF
══════════════════════════════════════════════════ */

const STOP = new Set(
  ('a an the is are was were be been being have has had do does did will would could should may might must ' +
   'can of in on at to for with by from up about into through during before after above below between out ' +
   'off over under again further then once here there when where why how all both each few more most other ' +
   'some such no nor not only same so than too very s t just don and or but if as also its it this that ' +
   'which these those their they them we our your its are answer option select correct above following').split(' ')
);

function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !STOP.has(t) && !/^\d{1,2}$/.test(t));
}

function computeTF(tokens) {
  const freq = {};
  tokens.forEach(t => { freq[t] = (freq[t] || 0) + 1; });
  const len = tokens.length || 1;
  const tf = {};
  for (const [t, f] of Object.entries(freq)) {
    const v = f / len;
    if (v >= 0.002) tf[t] = +v.toFixed(4);   // drop near-zero weights
  }
  return tf;
}

/* ══════════════════════════════════════════════════
   SECTION-AWARE CHUNKING  (v2 — handles bilingual
   newspaper HTML, div/section-id based splitting,
   and proper text extraction)
══════════════════════════════════════════════════ */

function preprocess(html) {
  return html
    /* ① Remove Tamil-language spans (bilingual newspaper content) */
    .replace(/<span[^>]*class="[^"]*lang-ta[^"]*"[^>]*>[\s\S]*?<\/span>/gi, ' ')
    .replace(/<span[^>]*lang="ta"[^>]*>[\s\S]*?<\/span>/gi, ' ')
    /* ② Remove boilerplate regions */
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, ' ')
    /* ③ Remove scripts, styles, comments */
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
}

/* Derive a human-readable label from a section/div id */
function idToLabel(id) {
  return id.replace(/[-_]/g, ' ')
    .replace(/\b([a-z])/g, c => c.toUpperCase())
    .slice(0, 80);
}

function chunkFile(html, src, pageTitle) {
  const cleaned = preprocess(html);
  const parts   = [];
  let curSection = pageTitle;
  let last       = 0;

  /*
   * Split on BOTH:
   *  A) Headings  <h1>…</h1>  through <h4>
   *  B) Named sections  <section id="…">  <article id="…">  <div id="…">
   *     (newspaper files use <section id="national">, <section id="economy"> etc.)
   */
  const splitRe = new RegExp(
    '<(h[1-4])[^>]*>([\\s\\S]*?)<\\/h[1-4]>' +
    '|<(?:section|article|div)[^>]+id="([a-z][\\w-]{1,40})"[^>]*>',
    'gi'
  );

  let m;
  while ((m = splitRe.exec(cleaned)) !== null) {
    if (m.index > last) {
      parts.push({ section: curSection, raw: cleaned.slice(last, m.index) });
    }
    if (m[1]) {
      /* Heading match */
      curSection = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 120);
    } else {
      /* Section/article/div with id */
      curSection = idToLabel(m[3]) + ' — ' + pageTitle;
    }
    last = splitRe.lastIndex;
  }
  if (last < cleaned.length) {
    parts.push({ section: curSection, raw: cleaned.slice(last) });
  }

  /* ── Per-part → chunks ── */
  const chunks = [];

  function pushChunk(section, t) {
    t = t.trim();
    if (t.length < CHUNK_MIN_TEXT) return;
    const toks = tokenize(t);
    if (toks.length < CHUNK_MIN_TOKS) return;
    chunks.push({ src, title: pageTitle, section, text: t.slice(0, 550), tc: toks.length, tf: computeTF(toks) });
  }

  for (const { section, raw } of parts) {
    const text = stripHtml(raw).replace(/\n/g, ' ').replace(/\s{2,}/g, ' ').trim();
    if (text.length < CHUNK_MIN_TEXT) continue;

    /* Split on sentence boundaries, accumulate to CHUNK_TARGET chars */
    const sentences = text.match(/[^.!?\n]{15,}[.!?]?/g) || [text];
    let buf = '';
    for (const s of sentences) {
      buf += (buf ? ' ' : '') + s.trim();
      if (buf.length >= CHUNK_TARGET) { pushChunk(section, buf); buf = ''; }
    }
    if (buf) pushChunk(section, buf);
  }

  return chunks;
}

/* ══════════════════════════════════════════════════
   FILE DISCOVERY
══════════════════════════════════════════════════ */

function walk(dir, result = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch (e) { return result; }

  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(full, result);
    } else if (e.name.endsWith('.html')) {
      const rel = full.replace(ROOT + path.sep, '').replace(/\\/g, '/');
      if (!SKIP.some(p => p.test(rel))) result.push({ full, rel });
    }
  }
  return result;
}

/* ══════════════════════════════════════════════════
   IDF COMPUTATION
══════════════════════════════════════════════════ */

function computeIDF(chunks) {
  const N = chunks.length || 1;
  const df = {};
  for (const c of chunks) {
    for (const t of Object.keys(c.tf)) {
      df[t] = (df[t] || 0) + 1;
    }
  }
  const idf = {};
  for (const [t, d] of Object.entries(df)) {
    // prune hapax legomena when corpus is large (reduces file size)
    if (d === 1 && N > 30) continue;
    idf[t] = +Math.log((N - d + 0.5) / (d + 0.5) + 1).toFixed(4);
  }
  return idf;
}

/* ══════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════ */

(function main() {
  const startMs = Date.now();
  const files = walk(ROOT);
  console.log(`\nArivoam RAG Builder  —  ${files.length} HTML files found\n`);

  // Also add CA files referenced in ca.json
  let caFiles = [];
  try {
    const caJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'CA-v2', 'ca.json'), 'utf8'));
    caFiles = caJson.map(e => ({
      full: path.join(ROOT, 'CA-v2', e.file),
      rel : 'CA-v2/' + e.file
    })).filter(f => fs.existsSync(f.full) && !files.some(x => x.rel === f.rel));
    if (caFiles.length) console.log(`  + ${caFiles.length} CA files from ca.json`);
  } catch (e) { /* ca.json absent — skip */ }

  const allFiles = [...files, ...caFiles];
  let allChunks = [];
  let errors = 0;

  for (let i = 0; i < allFiles.length; i++) {
    const { full, rel } = allFiles[i];
    try {
      const html  = fs.readFileSync(full, 'utf8');
      const title = getPageTitle(html);
      const c     = chunkFile(html, rel, title);
      allChunks.push(...c);
      process.stdout.write(`\r  [${i+1}/${allFiles.length}] ${String(allChunks.length).padStart(5)} chunks  ${rel.slice(0,55).padEnd(55)}`);
    } catch (e) {
      errors++;
      if (process.env.VERBOSE) console.warn(`\n  ⚠ Skipped ${rel}: ${e.message}`);
    }
  }

  console.log('\n');

  // Assign sequential IDs
  allChunks.forEach((c, i) => { c.id = i; });

  const idf = computeIDF(allChunks);

  const index = {
    version    : 3,
    built      : new Date().toISOString().slice(0, 10),
    fileCount  : allFiles.length - errors,
    chunkCount : allChunks.length,
    systemPrompt: SYSTEM_PROMPT,
    chunks     : allChunks,
    idf
  };

  const json     = JSON.stringify(index);
  const sizeMB   = (Buffer.byteLength(json, 'utf8') / 1024 / 1024).toFixed(2);
  const elapsed  = ((Date.now() - startMs) / 1000).toFixed(1);

  fs.writeFileSync(OUT, json, 'utf8');

  console.log(`✅  Done in ${elapsed}s`);
  console.log(`   Files   : ${index.fileCount}  (${errors} skipped)`);
  console.log(`   Chunks  : ${index.chunkCount}`);
  console.log(`   IDF keys: ${Object.keys(idf).length}`);
  console.log(`   Size    : ${sizeMB} MB`);
  console.log(`   Output  : ${OUT}\n`);
  console.log('Run this script again whenever you add new study files.');
})();
