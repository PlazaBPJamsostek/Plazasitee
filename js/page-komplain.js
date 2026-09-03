/* Public Komplain (Complaint) page — submit + track */
(function () {
  const S = window.PlazaSupabase;
  const configured = S && S.isConfigured;
  if (!configured) {
    const warn = document.getElementById('configWarning');
    if (warn) warn.style.display = 'block';
    const btn = document.getElementById('submitComplaintBtn');
    if (btn) btn.disabled = true;
    const trackBtn = document.getElementById('trackBtn');
    if (trackBtn) trackBtn.disabled = true;
  }

  /* ---- tabs ---- */
  document.querySelectorAll('.komplain-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.komplain-tab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.komplain-panel').forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.getAttribute('data-tab') === 'submit' ? 'panelSubmit' : 'panelTrack').classList.add('active');
    });
  });

  /* ---- photo upload (max 3) ---- */
  const MAX_PHOTOS = 3;
  let selectedFiles = [];
  const photoGrid = document.getElementById('photoGrid');
  const photoAddBtn = document.getElementById('photoAddBtn');
  const photoInput = document.getElementById('photoInput');

  function renderPhotoGrid() {
    photoGrid.querySelectorAll('.photo-upload-item').forEach((el) => el.remove());
    selectedFiles.forEach((file, idx) => {
      const reader = new FileReader();
      const item = document.createElement('div');
      item.className = 'photo-upload-item';
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.textContent = '\u00d7';
      removeBtn.addEventListener('click', () => { selectedFiles.splice(idx, 1); renderPhotoGrid(); });
      const img = document.createElement('img');
      reader.onload = (ev) => { img.src = ev.target.result; };
      reader.readAsDataURL(file);
      item.appendChild(img);
      item.appendChild(removeBtn);
      photoGrid.insertBefore(item, photoAddBtn);
    });
    photoAddBtn.style.display = selectedFiles.length >= MAX_PHOTOS ? 'none' : 'flex';
  }
  photoAddBtn.addEventListener('click', () => photoInput.click());
  photoInput.addEventListener('change', (e) => {
    const room = MAX_PHOTOS - selectedFiles.length;
    selectedFiles = selectedFiles.concat(Array.from(e.target.files).slice(0, room));
    renderPhotoGrid();
    photoInput.value = '';
  });

  /* ---- generate complaint number ---- */
  function generateComplaintNumber() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const rand = Math.floor(100 + Math.random() * 900);
    return `CMP-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${rand}`;
  }

  /* ---- submit ---- */
  const form = document.getElementById('complaintForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!configured) return;
    const btn = document.getElementById('submitComplaintBtn');
    btn.disabled = true;
    btn.textContent = window.t ? window.t('komplain.form.sending') : 'Mengirim...';

    const complaintNumber = generateComplaintNumber();
    const payload = {
      complaint_number: complaintNumber,
      name: document.getElementById('cf-name').value.trim(),
      phone: document.getElementById('cf-phone').value.trim(),
      email: document.getElementById('cf-email').value.trim(),
      category: document.getElementById('cf-category').value,
      subject: document.getElementById('cf-subject').value.trim(),
      description: document.getElementById('cf-desc').value.trim(),
    };
    const created = await S.insert('complaints', payload);
    if (!created) {
      btn.disabled = false;
      btn.textContent = window.t ? window.t('komplain.form.submit') : 'Kirim Komplain';
      adminToastFallback('Gagal mengirim komplain. Silakan coba lagi atau hubungi kami langsung.');
      return;
    }
    // upload photos (best-effort; complaint is already saved even if a photo fails)
    for (const file of selectedFiles) {
      const url = await S.uploadImage(file, 'complaints');
      if (url) await S.insert('complaint_photos', { complaint_id: created.id, photo_url: url });
    }

    document.getElementById('submitFormWrap').style.display = 'none';
    document.getElementById('submitSuccess').style.display = 'block';
    document.getElementById('successComplaintNumber').textContent = complaintNumber;
  });

  function adminToastFallback(msg) {
    alert(msg);
  }

  /* ---- track ---- */
  document.getElementById('trackBtn').addEventListener('click', async () => {
    if (!configured) return;
    const number = document.getElementById('trackInput').value.trim();
    const resultEl = document.getElementById('trackResult');
    if (!number) return;
    resultEl.classList.add('show');
    resultEl.innerHTML = '<p class="muted">Mencari...</p>';
    const results = await S.list('complaints', { eq: { complaint_number: number } });
    const c = results && results[0];
    if (!c) {
      resultEl.innerHTML = `<p>${window.t ? window.t('komplain.track.notfound') : 'Nomor komplain tidak ditemukan.'}</p>`;
      return;
    }
    const responses = await S.list('complaint_responses', { eq: { complaint_id: c.id }, order: { column: 'created_at' } });
    resultEl.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <strong style="font-family:var(--display);">${c.complaint_number}</strong>
        <span class="badge badge-${c.status === 'resolved' || c.status === 'closed' ? 'green' : 'gold'}">${c.status.replace('_', ' ')}</span>
      </div>
      <p style="font-size:13.5px;color:var(--ink-600);margin-bottom:6px;"><strong>${escapeHtmlLite(c.subject)}</strong></p>
      <p style="font-size:13px;color:var(--ink-600);line-height:1.6;margin-bottom:16px;">${escapeHtmlLite(c.description)}</p>
      ${
        responses.length
          ? '<hr class="divider" style="margin:16px 0;"><p style="font-size:12.5px;font-weight:700;margin-bottom:10px;">Tanggapan:</p>' +
            responses.map((r) => `<div style="background:var(--sage-100);border-radius:10px;padding:10px 14px;margin-bottom:8px;font-size:12.5px;">${escapeHtmlLite(r.response_text)}</div>`).join('')
          : '<p class="muted" style="font-size:12.5px;">Belum ada tanggapan dari tim kami.</p>'
      }`;
  });

  function escapeHtmlLite(s) {
    return String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
})();
