const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

map.on('click', function (e) {
  const { lat, lng } = e.latlng;

  const popupDiv = document.createElement('div');
  popupDiv.className = 'upload-popup';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  const uploadBtn = document.createElement('button');
  uploadBtn.textContent = 'Upload';

  popupDiv.appendChild(fileInput);
  popupDiv.appendChild(uploadBtn);

  const popup = L.popup()
    .setLatLng([lat, lng])
    .setContent(popupDiv)
    .openOn(map);

  uploadBtn.onclick = () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement('img');
      img.src = event.target.result;

      // Keep original size but limit very large images
      img.style.maxWidth = '300px';
      img.style.height = 'auto';

      // Add a marker that opens the full-size image in a popup
      L.marker([lat, lng]).addTo(map)
        .bindPopup(img)
        .openPopup();

      map.closePopup();
    };
    reader.readAsDataURL(file);
  };
});
