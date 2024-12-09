// Select elements
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
let slideInterval;

// Show a slide by index
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
}

// Move to the next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Move to the previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Start automatic slideshow
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 4000); // Change every 4 seconds
}

// Stop automatic slideshow
function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
    stopAutoSlide(); // Pause auto-slide on manual interaction
    startAutoSlide();
  });
});

// Add event listeners for navigation buttons
nextBtn.addEventListener('click', () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});

// Pause auto-slide on hover
document.querySelector('.slider-container').addEventListener('mouseover', stopAutoSlide);
document.querySelector('.slider-container').addEventListener('mouseout', startAutoSlide);

// Initialize
showSlide(currentSlide);
startAutoSlide();
