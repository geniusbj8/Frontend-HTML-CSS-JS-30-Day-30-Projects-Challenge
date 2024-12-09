document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission to handle validation first

  let valid = true;

  // Clear previous error messages
  clearErrorMessages();

  // Get form values
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const age = document.getElementById('age').value;

  // Username validation
  if (!username || username.length < 3) {
    displayError('usernameError', 'Username must be at least 3 characters.');
    valid = false;
  }

  // Email validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email || !emailPattern.test(email)) {
    displayError('emailError', 'Please enter a valid email address.');
    valid = false;
  }

  // Password validation
  if (!password || password.length < 6) {
    displayError('passwordError', 'Password must be at least 6 characters.');
    valid = false;
  }

  // Confirm Password validation
  if (password !== confirmPassword) {
    displayError('confirmPasswordError', 'Passwords do not match.');
    valid = false;
  }

  // Age validation
  if (!age || age < 18 || age > 100) {
    displayError('ageError', 'Age must be between 18 and 100.');
    valid = false;
  }

  // If valid, submit the form (this is just for demo purposes)
  if (valid) {
    alert('Form submitted successfully!');
    // Here you can handle actual form submission logic, e.g., send data to a server.
  }
});

// Function to display error messages
function displayError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

// Function to clear error messages
function clearErrorMessages() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(message => {
    message.style.display = 'none';
  });
}
