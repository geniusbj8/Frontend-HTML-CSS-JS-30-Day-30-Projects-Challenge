// Select elements
const textInput = document.getElementById('textInput');
const virtualKeyboard = document.getElementById('virtualKeyboard');

// Keys layout
const keysLayout = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
  ['Space', 'Clear']
];

let isCapsOn = false;

// Function to create the keyboard
function createKeyboard() {
  keysLayout.forEach((row) => {
    row.forEach((key) => {
      const keyElement = document.createElement('div');
      keyElement.classList.add('key');
      keyElement.textContent = key;

      // Add special classes for specific keys
      if (key === 'Space') {
        keyElement.classList.add('space');
      } else if (key === 'Backspace' || key === 'Clear' || key === 'Caps') {
        keyElement.classList.add('special');
      }

      // Event listener for key press
      keyElement.addEventListener('click', () => handleKeyPress(key, keyElement));
      virtualKeyboard.appendChild(keyElement);
    });
  });
}

// Function to handle key press
function handleKeyPress(key, keyElement) {
  if (key === 'Space') {
    textInput.value += ' ';
  } else if (key === 'Backspace') {
    textInput.value = textInput.value.slice(0, -1);
  } else if (key === 'Clear') {
    textInput.value = '';
  } else if (key === 'Caps') {
    isCapsOn = !isCapsOn;
    keyElement.classList.toggle('caps-on', isCapsOn);
  } else {
    textInput.value += isCapsOn ? key.toUpperCase() : key.toLowerCase();
  }
}

// Display keyboard on input focus
textInput.addEventListener('focus', () => {
  virtualKeyboard.style.display = 'grid';
});

// Hide keyboard on blur
textInput.addEventListener('blur', () => {
  setTimeout(() => {
    virtualKeyboard.style.display = 'none';
  }, 100); // Delay to allow key clicks to register
});

// Create the keyboard on page load
createKeyboard();
