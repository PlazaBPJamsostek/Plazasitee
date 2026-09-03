/* Admin — Complaint management */
(async function () {
  await window.AdminAuth.ready;
  const S = window.PlazaSupabase;
  if (!S || !S.isConfigured) return;

  let complaints = [];
  let currentComplaintId = null;
  const body = document.getElementById('complaintsBody');
  const statusFilter = document.getElementById('statusFilter');

  async function loadComplaints() {
    complaints = await S.list('complaints', { order: { column: 'created_at', ascending: false } });
    render();
  }

  function render() {
    const filter = statusFilter.value;
    const filtered = filter === 'all' ? complaints : complaints.filter((c) => c.status === filter);
    body.innerHTML = filtered.length
      ? filtered
          .map(
            (c) => `
      <tr>
        <td><strong>${escapeHtml(c.complaint_number)}</strong></td>
        <td>${escapeHtml(c.name)}</td>
        <td>${escapeHtml(c.subject)}</td>
        <td>${escapeHtml(c.category)}</td>
        <td><span class="status-badge status-${c.status}">${c.status.replace('_', ' ')}</span></td>
        <td>${fmtDate(c.created_at)}</td>
        <td><button class="btn btn-outline btn-sm" data-view="${c.id}">Detail</button></td>
      </tr>`
          )
          .join('')
      : `<tr class="admin-empty-row"><td colspan="7">Belum ada komplain pada status ini.</td></tr>`;
    body.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => openDetail(b.getAttribute('data-view'))));
  }
  statusFilter.addEventListener('change', render);

  const modal = document.getElementById('complaintDetailModal');
  async function openDetail(id) {
    currentComplaintId = id;
    const c = complaints.find((x) => x.id === id);
    if (!c) return;
    document.getElementById('cdSubject').textContent = c.subject;
    document.getElementById('cdMeta').textContent = `${c.complaint_number} \u2022 ${escapeHtml(c.name)} \u2022 ${c.phone || c.email || '-'} \u2022 ${fmtDate(c.created_at)}`;
    document.getElementById('cdDescription').textContent = c.description;
    document.getElementById('cdStatusSelect').value = c.status;
    document.getElementById('cdAssignee').value = c.assigned_to || '';
    document.getElementById('cdPhotos').innerHTML = '';
    document.getElementById('cdResponses').innerHTML = '<p class="muted" style="font-size:12.5px;">Memuat...</p>';
    modal.classList.add('open');

    const photos = await S.list('complaint_photos', { eq: { complaint_id: id } });
    document.getElementById('cdPhotos').innerHTML = photos.map((p) => `<img src="${p.photo_url}" alt="Foto komplain" onclick="window.open('${p.photo_url}','_blank')">`).join('') || '<p class="muted" style="font-size:12px;">Tidak ada foto terlampir.</p>';

    const responses = await S.list('complaint_responses', { eq: { complaint_id: id }, order: { column: 'created_at' } });
    document.getElementById('cdResponses').innerHTML = responses.length
      ? responses
          .map(
            (r) => `<div class="chat-bubble"><div class="cb-meta">${escapeHtml(r.responded_by || 'Admin')} \u2022 ${fmtDate(r.created_at)}</div>${escapeHtml(r.response_text)}</div>`
          )
          .join('')
      : '<p class="muted" style="font-size:12.5px;">Belum ada respons.</p>';
  }

  document.getElementById('cdSaveBtn').addEventListener('click', async () => {
    const patch = {
      status: document.getElementById('cdStatusSelect').value,
      assigned_to: document.getElementById('cdAssignee').value.trim(),
      updated_at: new Date().toISOString(),
    };
    const result = await S.update('complaints', currentComplaintId, patch);
    if (result) { adminToast('Status komplain diperbarui.'); loadComplaints(); }
    else adminToast('Gagal memperbarui.', true);
  });

  document.getElementById('cdSendResponseBtn').addEventListener('click', async () => {
    const text = document.getElementById('cdNewResponse').value.trim();
    if (!text) return;
    const session = await S.getSession();
    const profile = session ? await S.getProfile(session.user.id) : null;
    const result = await S.insert('complaint_responses', {
      complaint_id: currentComplaintId,
      response_text: text,
      responded_by: (profile && profile.full_name) || 'Admin',
    });
    if (result) {
      document.getElementById('cdNewResponse').value = '';
      adminToast('Respons terkirim.');
      openDetail(currentComplaintId);
    } else {
      adminToast('Gagal mengirim respons.', true);
    }
  });

  document.querySelectorAll('.modal').forEach((m) => {
    m.querySelectorAll('.modal-close, .modal-backdrop, [data-close-modal]').forEach((el) => el.addEventListener('click', () => m.classList.remove('open')));
  });

  loadComplaints();
  setInterval(loadComplaints, 30000);
})();
