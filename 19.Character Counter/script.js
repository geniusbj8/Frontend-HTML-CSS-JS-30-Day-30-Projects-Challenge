// Get references to elements
const textArea = document.getElementById('textArea');
const charCount = document.getElementById('charCount');

// Event listener to update character count as user types
textArea.addEventListener('input', () => {
  const currentLength = textArea.value.length;
  charCount.textContent = currentLength;
});
