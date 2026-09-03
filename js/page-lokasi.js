/* Lokasi (Location) page */
(function () {
  const D = window.PlazaData;
  if (!D) return;
  const lang = () => (window.PlazaI18n ? window.PlazaI18n.current : 'id');

  const transitList = document.getElementById('transitList');
  const nearbyTags = document.getElementById('nearbyTags');
  const landmarkGrid = document.getElementById('landmarkGrid');
  const fullAddress = document.getElementById('fullAddress');

  function render() {
    if (transitList) {
      transitList.innerHTML = D.nearby.transit
        .map(
          (tr) => `
        <li><span class="ti-dist">${tr.dist}</span><div><strong style="display:block;">${lang() === 'en' ? tr.name_en : tr.name_id}</strong><span class="muted" style="font-size:12px;">${lang() === 'en' ? tr.note_en : tr.note_id}</span></div></li>`
        )
        .join('');
    }
    if (nearbyTags) {
      const cats = lang() === 'en' ? D.nearby.categories_en : D.nearby.categories_id;
      nearbyTags.innerHTML = cats.map((c) => `<span>${c}</span>`).join('');
    }
    if (landmarkGrid) {
      landmarkGrid.innerHTML = D.nearby.landmarks.map((l) => `<div>${l}</div>`).join('');
    }
    if (fullAddress) {
      fullAddress.textContent = lang() === 'en' ? D.building.address_en : D.building.address_id;
    }
  }
  render();
  document.addEventListener('plaza:langchange', render);
})();
