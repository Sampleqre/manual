// ─── State ───────────────────────────────────────────────────────────────────
let activeProgram = null;

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildSidebarTree();
  buildProgramGrid();
});

// ─── Sidebar Tree ─────────────────────────────────────────────────────────────
function buildSidebarTree() {
  const container = document.getElementById('program-list');
  programs.forEach(p => {
    const item = document.createElement('div');
    item.className = 'tree-item';
    item.dataset.id = p.id;
    item.innerHTML = `
      <span class="py-icon">🐍</span>
      <span>${p.shortName}</span>
      <span class="prog-num">${String(p.id).padStart(2,'0')}</span>
    `;
    item.addEventListener('click', () => openProgram(p.id));
    container.appendChild(item);
  });
}

// ─── Program Grid ─────────────────────────────────────────────────────────────
function buildProgramGrid() {
  const grid = document.getElementById('program-grid');
  programs.forEach(p => {
    const card = document.createElement('div');
    card.className = 'program-card';
    card.innerHTML = `
      <span class="card-num">${String(p.id).padStart(2,'0')}</span>
      <span class="card-title">${p.title}</span>
      <span class="card-tag"># ${p.tag}</span>
    `;
    card.addEventListener('click', () => openProgram(p.id));
    grid.appendChild(card);
  });
}

// ─── Open Program ─────────────────────────────────────────────────────────────
function openProgram(id) {
  const p = programs.find(x => x.id === id);
  if (!p) return;
  activeProgram = p;

  // Hide welcome, show code viewer
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('code-viewer').classList.remove('hidden');
  document.getElementById('welcome-tab').classList.remove('active');

  // Update tab
  const activeTab = document.getElementById('active-tab');
  activeTab.classList.remove('hidden');
  activeTab.classList.add('active-tab-highlight');
  document.getElementById('active-tab-name').textContent = p.shortName;

  // Breadcrumb
  document.getElementById('bc-filename').textContent = p.shortName;
  document.getElementById('out-filename').textContent = p.shortName;

  // Render code with syntax highlighting
  const highlighted = highlight(p.code);
  document.getElementById('code-content').innerHTML = highlighted;

  // Line numbers
  const lines = p.code.split('\n');
  const lineNums = document.getElementById('line-numbers');
  lineNums.innerHTML = lines.map((_, i) => `<span>${i + 1}</span>`).join('');

  // Update status bar
  document.getElementById('sb-line').textContent = `Ln 1, Col 1`;

  // Sidebar active state
  document.querySelectorAll('.tree-item').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.id) === id);
  });

  // Hide output panel when switching
  const outputPanel = document.getElementById('output-panel');
  outputPanel.style.display = 'none';

  // Update info panel
  updateInfoPanel(p);

  // Update structure panel
  updateStructurePanel(p);
}

// ─── Syntax Highlighter ──────────────────────────────────────────────────────
function highlight(code) {
  let result = escapeHtml(code);

  // Comments first (before anything else)
  result = result.replace(/(#[^\n]*)/g, '<span class="cm">$1</span>');

  // Strings (single and double quoted) — avoid inside comments
  result = result.replace(/(?<!<span[^>]*>)('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, (m) => {
    // Don't re-highlight if already inside a span
    return `<span class="str">${m}</span>`;
  });

  // Keywords
  const keywords = ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'in', 'not',
    'and', 'or', 'return', 'import', 'from', 'as', 'True', 'False', 'None',
    'break', 'continue', 'pass', 'lambda', 'with', 'try', 'except', 'finally',
    'raise', 'yield', 'global', 'nonlocal', 'del', 'assert', 'is'];
  keywords.forEach(kw => {
    const re = new RegExp(`\\b(${kw})\\b(?![^<]*>)`, 'g');
    result = result.replace(re, '<span class="kw">$1</span>');
  });

  // Builtins
  const builtins = ['print', 'len', 'range', 'set', 'list', 'dict', 'tuple', 'str',
    'int', 'float', 'bool', 'type', 'input', 'open', 'zip', 'map', 'filter',
    'enumerate', 'sorted', 'reversed', 'max', 'min', 'sum', 'abs', 'round',
    'append', 'pop', 'add'];
  builtins.forEach(b => {
    const re = new RegExp(`\\b(${b})\\b(?![^<]*>)`, 'g');
    result = result.replace(re, '<span class="bi">$1</span>');
  });

  // Numbers
  result = result.replace(/\b(\d+\.?\d*)\b(?![^<]*>)/g, '<span class="num">$1</span>');

  // Decorators
  result = result.replace(/(@\w+)(?![^<]*>)/g, '<span class="dec">$1</span>');

  return result;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ─── Copy Code ────────────────────────────────────────────────────────────────
function copyCode() {
  if (!activeProgram) return;
  navigator.clipboard.writeText(activeProgram.code).then(() => {
    const btn = document.getElementById('btn-copy');
    btn.classList.add('copied');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
    showToast();
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
    }, 2000);
  });
}

// ─── Show Output ─────────────────────────────────────────────────────────────
document.getElementById('btn-run').addEventListener('click', () => {
  if (!activeProgram) return;
  const panel = document.getElementById('output-panel');
  panel.style.display = 'flex';
  document.getElementById('output-content').textContent = activeProgram.output;
});

function toggleOutput() {
  const panel = document.getElementById('output-panel');
  panel.style.display = 'none';
}

// ─── Close Tab ───────────────────────────────────────────────────────────────
function closeTab() {
  activeProgram = null;
  document.getElementById('welcome-screen').classList.remove('hidden');
  document.getElementById('code-viewer').classList.add('hidden');
  document.getElementById('active-tab').classList.add('hidden');
  document.getElementById('welcome-tab').classList.remove('active');

  // Reset sidebar
  document.querySelectorAll('.tree-item').forEach(el => el.classList.remove('active'));

  // Reset info
  document.getElementById('info-body').innerHTML = `<p class="info-hint">Click any program to view its code and documentation.</p>`;
  document.getElementById('structure-info').innerHTML = `<span class="hint">Select a program to view its structure</span>`;
}

// ─── Info Panel ──────────────────────────────────────────────────────────────
function updateInfoPanel(p) {
  const badgeClass = p.category === 'ml' ? 'badge-ml' : p.category === 'ai' ? 'badge-ai' : 'badge-algo';
  const body = document.getElementById('info-body');
  body.innerHTML = `
    <div class="info-title">${p.title}</div>
    <span class="info-badge ${badgeClass}">${p.tag}</span>
    <div class="info-divider"></div>
    <div class="info-desc">${p.desc}</div>
    <div class="info-divider"></div>
    <div class="info-label">File</div>
    <div class="info-val">${p.shortName}</div>
    <div class="info-label">Lines</div>
    <div class="info-val">${p.lines}</div>
    <div class="info-label">Program</div>
    <div class="info-val">#${String(p.id).padStart(2,'0')}</div>
  `;
}

// ─── Structure Panel ─────────────────────────────────────────────────────────
function updateStructurePanel(p) {
  const container = document.getElementById('structure-info');
  container.innerHTML = p.functions.map(fn =>
    `<div class="struct-item">${fn}</div>`
  ).join('');
}

// ─── Toast ───────────────────────────────────────────────────────────────────
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}
