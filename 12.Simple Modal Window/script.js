// Select Elements
const openModalBtn = document.querySelector('.open-modal-btn');
const closeModalBtn = document.querySelector('.close-modal-btn');
const modalOverlay = document.getElementById('modal-overlay');

// Open Modal Function
openModalBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'flex';
});

// Close Modal Function
closeModalBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});

// Close Modal by Clicking Outside the Modal
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = 'none';
  }
});
