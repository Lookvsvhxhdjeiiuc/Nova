export function renderGallery(images) {
  return images.map((image) => `
    <div class="gallery-grid__item">
      <img src="./${image.image}" alt="${image.alt}" loading="lazy">
    </div>
  `).join('');
}
