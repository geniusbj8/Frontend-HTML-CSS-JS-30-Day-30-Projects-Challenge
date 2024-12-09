// Toggle the sidebar and hamburger menu animation
const hamburgerMenu = document.getElementById('hamburgerMenu');
const sidebar = document.getElementById('sidebar');

// Function to toggle the menu
hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('open');
  if (sidebar.style.left === '0px') {
    sidebar.style.left = '-250px';
  } else {
    sidebar.style.left = '0px';
  }
});
