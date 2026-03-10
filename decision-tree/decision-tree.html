/* decision-tree.js — Decision Tree Builder
 * Architecture : IIFE, no globals, event delegation
 * Security     : all state is private; nothing callable from console
 */
(function () {
  'use strict';

  /* ── Data ─────────────────────────────────────────────── */
  let nodes = {
    q1: { id: 'q1', type: 'question', text: 'What is your main fitness goal?',
      answers: [
        { id: 'a1', text: 'Lose weight',           nextId: 'q2' },
        { id: 'a2', text: 'Build muscle',           nextId: 'q3' },
        { id: 'a3', text: 'Improve overall health', nextId: 'q4' }
      ]
    },
    q2: { id: 'q2', type: 'question', text: 'How much weight do you want to lose?',
      answers: [
        { id: 'a4', text: 'Under 5 kg',     nextId: 'r1' },
        { id: 'a5', text: '5 to 15 kg',     nextId: 'r2' },
        { id: 'a6', text: 'More than 15 kg', nextId: 'r3' }
      ]
    },
    q3: { id: 'q3', type: 'question', text: 'What is your current fitness level?',
      answers: [
        { id: 'a7', text: 'Beginner',     nextId: 'r4' },
        { id: 'a8', text: 'Intermediate', nextId: 'r5' },
        { id: 'a9', text: 'Advanced',     nextId: 'r6' }
      ]
    },
    q4: { id: 'q4', type: 'question', text: 'Which area concerns you most?',
      answers: [
        { id: 'a10', text: 'Cardio and stamina',    nextId: 'r7' },
        { id: 'a11', text: 'Flexibility and mobility', nextId: 'r8' },
        { id: 'a12', text: 'Mental wellness',        nextId: 'r9' }
      ]
    },
    r1: { id: 'r1', type: 'result', text: 'Light cardio 3x/week plus a balanced diet. Start with 30-minute walks daily.', answers: [] },
    r2: { id: 'r2', type: 'result', text: 'HIIT training 4x/week with a calorie deficit. Track your meals with an app.', answers: [] },
    r3: { id: 'r3', type: 'result', text: 'Join a supervised programme. Combine strength training with cardio 5x/week.', answers: [] },
    r4: { id: 'r4', type: 'result', text: 'Start with full-body workouts 3x/week. Focus on form over weight.', answers: [] },
    r5: { id: 'r5', type: 'result', text: 'Split routines 4x/week. Progressive overload is your best friend.', answers: [] },
    r6: { id: 'r6', type: 'result', text: 'Periodise your training. Consider working with a coach for advanced gains.', answers: [] },
    r7: { id: 'r7', type: 'result', text: 'Zone 2 cardio plus interval sprints. Aim for 150 minutes per week.', answers: [] },
    r8: { id: 'r8', type: 'result', text: 'Daily yoga or stretching routine. Focus on hip flexors and thoracic mobility.', answers: [] },
    r9: { id: 'r9', type: 'result', text: 'Combine mindful movement with meditation. Exercise is proven to reduce anxiety.', answers: [] }
  };

  let startNodeId    = 'q1';
  let selectedNodeId = null;
  let pendingDeleteId = null;
  let editingAnswers  = [];
  let idCounter       = 100;

  /* ── Utils ─────────────────────────────────────────────── */
  const el = (id) => document.getElementById(id);

  function genId(prefix) {
    return prefix + (++idCounter);
  }

  function toast(msg, ms = 2200) {
    const t = el('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), ms);
  }

  function letter(i) {
    return String.fromCharCode(65 + i);
  }

  function escHtml(raw) {
    return String(raw)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Tabs ──────────────────────────────────────────────── */
  function switchTab(name) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === name);
      b.setAttribute('aria-selected', b.dataset.tab === name ? 'true' : 'false');
    });
    el('tab-' + name).classList.add('active');
    if (name === 'preview') renderPreview();
  }

  /* ── Node list ─────────────────────────────────────────── */
  function renderNodeList() {
    const list = el('nodeList');
    el('node-count').textContent  = Object.keys(nodes).length;
    el('start-label').textContent = startNodeId || '—';

    if (!Object.keys(nodes).length) {
      list.innerHTML = '<p class="empty-state">No nodes yet. Add a question to begin.</p>';
      return;
    }

    const sorted = Object.values(nodes).sort((a, b) => {
      if (a.type !== b.type) return a.type === 'question' ? -1 : 1;
      return a.id.localeCompare(b.id);
    });

    list.innerHTML = sorted.map(node => {
      const isStart    = node.id === startNodeId;
      const isSelected = node.id === selectedNodeId;

      return (
        '<article class="node-card' + (isSelected ? ' selected' : '') + '" role="listitem" data-id="' + node.id + '">' +
          '<header class="node-card-header">' +
            '<span class="node-badge ' + (node.type === 'question' ? 'badge-q' : 'badge-r') + '">' +
              (node.type === 'question' ? 'Q' : 'R') +
            '</span>' +
            (isStart ? '<span class="start-tag">Start</span>' : '') +
            '<span class="node-text-preview">' + escHtml(node.text || '(untitled)') + '</span>' +
            '<span class="node-actions">' +
              '<button class="action-btn" data-action="edit" data-id="' + node.id + '">Edit</button>' +
              '<button class="action-btn btn-danger-text" data-action="delete" data-id="' + node.id + '">Delete</button>' +
            '</span>' +
          '</header>' +
        '</article>'
      );
    }).join('');
  }

  /* ── Form ──────────────────────────────────────────────── */
  function selectNode(id) {
    selectedNodeId = id;
    renderNodeList();
    renderForm(nodes[id]);
  }

  function buildNodeOptions(excludeId) {
    return Object.values(nodes)
      .filter(n => n.id !== excludeId)
      .map(n =>
        '<option value="' + n.id + '">' +
          n.id + ': ' + escHtml((n.text || '').slice(0, 30)) +
        '</option>'
      )
      .join('');
  }

  function renderForm(node) {
    editingAnswers = JSON.parse(JSON.stringify(node.answers || []));
    const isQ = node.type === 'question';

    el('formArea').innerHTML =
      '<div class="form-card">' +
        '<h2>' + (isQ ? 'Question' : 'Result') + ' &mdash; <code>' + escHtml(node.id) + '</code></h2>' +

        '<div class="form-group">' +
          '<label>Type</label>' +
          '<div class="type-toggle" role="group">' +
            '<button class="type-opt' + (isQ  ? ' active-q' : '') + '" data-action="change-type" data-type="question">Question</button>' +
            '<button class="type-opt' + (!isQ ? ' active-r' : '') + '" data-action="change-type" data-type="result">Result</button>' +
          '</div>' +
        '</div>' +

        '<div class="form-group">' +
          '<label for="nodeText">' + (isQ ? 'Question text' : 'Result message') + '</label>' +
          '<textarea id="nodeText" rows="3" placeholder="Enter text...">' + escHtml(node.text || '') + '</textarea>' +
        '</div>' +

        (isQ
          ? '<div class="form-group">' +
              '<label>Answers</label>' +
              '<div id="answersEditor" class="answers-editor"></div>' +
              '<button class="add-answer-btn" data-action="add-answer">+ Add answer</button>' +
            '</div>'
          : '') +

        '<div class="form-group">' +
          '<label for="nodeIdInput">Node ID</label>' +
          '<input type="text" id="nodeIdInput" value="' + escHtml(node.id) + '" placeholder="e.g. q1">' +
        '</div>' +

        '<div class="form-group">' +
          '<label class="checkbox-label">' +
            '<input type="checkbox" id="isStart"' + (startNodeId === node.id ? ' checked' : '') + '>' +
            'Mark as start node' +
          '</label>' +
        '</div>' +

        '<div class="form-actions">' +
          '<button class="btn btn-primary" data-action="save">Save</button>' +
          '<button class="btn btn-danger btn-sm" data-action="delete" data-id="' + escHtml(node.id) + '">Delete</button>' +
        '</div>' +
      '</div>';

    if (isQ) renderAnswerRows();
  }

  function renderAnswerRows() {
    const editor = el('answersEditor');
    if (!editor) return;
    const opts = buildNodeOptions(selectedNodeId);

    editor.innerHTML = editingAnswers.map((ans, i) => {
      // Inject selected attr into the right option
      const optStr = opts.replace(
        'value="' + ans.nextId + '"',
        'value="' + ans.nextId + '" selected'
      );
      return (
        '<div class="answer-row">' +
          '<input type="text" placeholder="Answer text" value="' + escHtml(ans.text || '') + '" data-field="text" data-idx="' + i + '">' +
          '<select data-idx="' + i + '">' +
            '<option value="">None</option>' +
            optStr +
          '</select>' +
          '<button class="remove-answer" data-action="remove-answer" data-idx="' + i + '">Remove</button>' +
        '</div>'
      );
    }).join('');
  }

  /* ── Form mutations ────────────────────────────────────── */
  function addAnswer() {
    editingAnswers.push({ id: genId('a'), text: '', nextId: '' });
    renderAnswerRows();
    const fa = el('formArea');
    setTimeout(() => fa.scrollTo({ top: fa.scrollHeight, behavior: 'smooth' }), 50);
  }

  function removeAnswer(i) {
    editingAnswers.splice(i, 1);
    renderAnswerRows();
  }

  function changeType(type) {
    nodes[selectedNodeId].type = type;
    renderForm(nodes[selectedNodeId]);
  }

  function saveNode() {
    const node    = nodes[selectedNodeId];
    const newText = el('nodeText').value.trim();
    const newId   = el('nodeIdInput').value.trim().replace(/\s+/g, '');
    const isStart = el('isStart').checked;

    if (!newText) { toast('Node text cannot be empty.'); return; }
    if (!newId)   { toast('Node ID cannot be empty.'); return; }

    node.text    = newText;
    node.answers = node.type === 'question' ? editingAnswers.slice() : [];

    if (newId !== selectedNodeId) {
      if (nodes[newId]) { toast('ID "' + newId + '" already exists.'); return; }
      for (const n of Object.values(nodes)) {
        for (const a of n.answers) {
          if (a.nextId === selectedNodeId) a.nextId = newId;
        }
      }
      if (startNodeId === selectedNodeId) startNodeId = newId;
      node.id        = newId;
      nodes[newId]   = node;
      delete nodes[selectedNodeId];
      selectedNodeId = newId;
    }

    if (isStart) startNodeId = selectedNodeId;

    renderNodeList();
    renderForm(nodes[selectedNodeId]);
    toast('Saved.');
  }

  function clearForm() {
    selectedNodeId = null;
    el('formArea').innerHTML = '<p class="empty-state">Select a node to edit, or add a new one.</p>';
    renderNodeList();
  }

  /* ── New node ──────────────────────────────────────────── */
  function newNode(type) {
    const id = genId(type === 'question' ? 'q' : 'r');
    nodes[id] = { id, type, text: '', answers: [] };
    if (!startNodeId) startNodeId = id;
    renderNodeList();
    selectNode(id);
    setTimeout(() => { const t = el('nodeText'); if (t) t.focus(); }, 80);
    toast('New ' + type + ' created.');
  }

  /* ── Delete ────────────────────────────────────────────── */
  function askDelete(id) {
    pendingDeleteId = id;
    el('delete-msg').textContent =
      'Delete node "' + id + '"? Any answers pointing to it will be automatically unlinked.';
    el('delete-modal').showModal();
  }

  function closeModal() {
    el('delete-modal').close();
  }

  function confirmDelete() {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;

    // Clear every answer reference that pointed at the deleted node
    let cleared = 0;
    for (const n of Object.values(nodes)) {
      for (const a of n.answers) {
        if (a.nextId === id) {
          a.nextId = '';
          cleared++;
        }
      }
    }

    // Also clear any in-progress editingAnswers so the open form stays consistent
    for (const a of editingAnswers) {
      if (a.nextId === id) {
        a.nextId = '';
      }
    }

    delete nodes[id];

    if (startNodeId === id) startNodeId = Object.keys(nodes)[0] || null;

    if (selectedNodeId === id) {
      clearForm();
    } else {
      renderNodeList();
      // Re-render the open form so its dropdowns no longer list the deleted node
      if (selectedNodeId && nodes[selectedNodeId]) {
        renderForm(nodes[selectedNodeId]);
      }
    }

    closeModal();

    const suffix = cleared
      ? ' ' + cleared + ' link' + (cleared !== 1 ? 's' : '') + ' cleared.'
      : '';
    toast('Node deleted.' + suffix);
  }

  function setStart(id) {
    startNodeId = id;
    renderNodeList();
    if (selectedNodeId) renderForm(nodes[selectedNodeId]);
    toast('Start node set to: ' + id);
  }

  /* ── Preview ───────────────────────────────────────────── */
  let previewHistory = [];
  let previewCurrent = null;

  function renderPreview() {
    previewHistory = [];
    previewCurrent = startNodeId;
    renderPreviewStep();
  }

  function renderPreviewStep() {
    const panel = el('previewPanel');
    if (!previewCurrent || !nodes[previewCurrent]) {
      panel.innerHTML =
        '<div class="preview-card">' +
          '<p class="empty-state">No start node set. Go to the Editor tab and mark a node as start.</p>' +
        '</div>';
      return;
    }

    const node     = nodes[previewCurrent];
    const total    = Object.keys(nodes).length;
    const progress = Math.min((previewHistory.length / Math.max(total / 2, 1)) * 100, 90);

    const breadcrumbHtml = previewHistory.length
      ? '<nav class="breadcrumb" aria-label="Progress">' +
          previewHistory.map((h, i) =>
            '<span class="crumb">' + escHtml((nodes[h.nodeId]?.text || h.nodeId).slice(0, 18)) + '</span>' +
            (i < previewHistory.length - 1 ? '<span class="crumb-sep" aria-hidden="true">&rsaquo;</span>' : '')
          ).join('') +
        '</nav>'
      : '';

    const progressBar =
      '<div class="progress-bar" role="progressbar" aria-valuenow="' + Math.round(progress) + '" aria-valuemin="0" aria-valuemax="100">' +
        '<div class="progress-fill" style="width:' + progress + '%"></div>' +
      '</div>';

    const backBtn = previewHistory.length
      ? '<button class="preview-back-btn" data-action="preview-back">Back</button>'
      : '';

    if (node.type === 'question') {
      const answersHtml = node.answers.length
        ? node.answers.map((a, i) =>
            '<button class="preview-answer-btn" data-ans-id="' + escHtml(a.id) + '" data-next-id="' + escHtml(a.nextId) + '">' +
              '<span class="answer-letter">' + letter(i) + '</span>' +
              '<span>' + escHtml(a.text || '(empty)') + '</span>' +
            '</button>'
          ).join('')
        : '<p class="empty-state">No answers configured for this node.</p>';

      panel.innerHTML =
        '<div class="preview-card">' +
          breadcrumbHtml +
          '<p class="preview-label">Question ' + (previewHistory.length + 1) + '</p>' +
          progressBar +
          '<p class="preview-question">' + escHtml(node.text || '(no text)') + '</p>' +
          '<div class="preview-answers">' + answersHtml + '</div>' +
          backBtn +
        '</div>';
    } else {
      panel.innerHTML =
        '<div class="preview-card">' +
          breadcrumbHtml +
          progressBar +
          '<div class="preview-result">' +
            '<p class="result-text">' + escHtml(node.text || '(no result text)') + '</p>' +
            '<button class="preview-restart-btn" data-action="preview-restart">Start over</button>' +
            backBtn +
          '</div>' +
        '</div>';
    }
  }

  function previewAnswer(ansId, nextId) {
    previewHistory.push({ nodeId: previewCurrent, ansId });
    previewCurrent = nextId;
    renderPreviewStep();
  }

  function previewBack() {
    const prev = previewHistory.pop();
    previewCurrent = prev ? prev.nodeId : startNodeId;
    renderPreviewStep();
  }

  /* ── Event wiring ──────────────────────────────────────── */
  function initEvents() {
    /* Tab bar */
    document.querySelector('.tabs').addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (btn) switchTab(btn.dataset.tab);
    });

    /* Add node */
    el('add-question').addEventListener('click', () => newNode('question'));
    el('add-result').addEventListener('click',   () => newNode('result'));

    /* Modal */
    el('confirm-delete').addEventListener('click', confirmDelete);
    el('cancel-delete').addEventListener('click',  closeModal);
    /* Reset pending ID when dialog closes (incl. native Esc key) */
    el('delete-modal').addEventListener('close', () => { pendingDeleteId = null; });

    /* Node list — delegated */
    el('nodeList').addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const id = btn.dataset.id;
      if (btn.dataset.action === 'edit')      selectNode(id);
      if (btn.dataset.action === 'set-start') setStart(id);
      if (btn.dataset.action === 'delete')    askDelete(id);
    });

    /* Form area — delegated clicks */
    el('formArea').addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      switch (btn.dataset.action) {
        case 'save':          saveNode();                     break;
        case 'delete':        askDelete(btn.dataset.id);      break;
        case 'close-form':    clearForm();                    break;
        case 'add-answer':    addAnswer();                    break;
        case 'remove-answer': removeAnswer(+btn.dataset.idx); break;
        case 'change-type':   changeType(btn.dataset.type);   break;
      }
    });

    /* Form area — live answer text edits */
    el('formArea').addEventListener('input', e => {
      const inp = e.target.closest('input[data-field][data-idx]');
      if (inp) editingAnswers[+inp.dataset.idx][inp.dataset.field] = inp.value;
    });

    /* Form area — live answer next-node selection */
    el('formArea').addEventListener('change', e => {
      const sel = e.target.closest('select[data-idx]');
      if (sel) editingAnswers[+sel.dataset.idx].nextId = sel.value;
    });

    /* Preview panel — delegated */
    el('previewPanel').addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (btn) {
        if (btn.dataset.action === 'preview-restart') renderPreview();
        if (btn.dataset.action === 'preview-back')    previewBack();
        return;
      }
      const ans = e.target.closest('.preview-answer-btn');
      if (ans) previewAnswer(ans.dataset.ansId, ans.dataset.nextId);
    });
  }

  /* ── Bootstrap ─────────────────────────────────────────── */
  function init() {
    initEvents();
    renderNodeList();
    el('formArea').innerHTML =
      '<p class="empty-state">Select a node from the sidebar, or add a new one.</p>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
