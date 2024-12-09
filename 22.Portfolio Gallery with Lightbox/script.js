// Open lightbox function
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', function() {
    const fullImageSrc = item.getAttribute('data-full');
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = fullImageSrc;
    document.getElementById('lightbox').style.display = 'flex';
  });
});

// Close lightbox function
function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}
