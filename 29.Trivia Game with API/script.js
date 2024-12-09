let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const nextButton = document.getElementById('next-question');
const feedback = document.getElementById('feedback');
const continueButton = document.getElementById('continue');
const restartButton = document.getElementById('restart');

// Fetch trivia questions from the API
fetch('https://the-trivia-api.com/v2/questions')
  .then(response => response.json())
  .then(data => {
    questions = data;
    displayQuestion();
  })
  .catch(error => {
    console.error('Error fetching trivia questions:', error);
    feedback.textContent = "Sorry, we couldn't load the trivia questions. Please try again later.";
    feedback.classList.add('wrong');
  });

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  // Accessing the question text correctly: currentQuestion.question.text
  questionText.textContent = currentQuestion.question.text;  // This should be a string

  // Shuffle the options and display them
  const options = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer];
  options.sort(() => Math.random() - 0.5);  // Shuffle the options

  answerOptions.innerHTML = '';  // Clear previous options
  options.forEach(option => {
    const optionButton = document.createElement('button');
    optionButton.textContent = option;
    optionButton.classList.add('option');
    optionButton.onclick = () => handleAnswer(option, currentQuestion.correctAnswer);
    answerOptions.appendChild(optionButton);
  });

  nextButton.disabled = true;  // Disable next button until user selects an answer
}

function handleAnswer(selectedAnswer, correctAnswer) {
  // Show feedback and color the options
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    if (option.textContent === correctAnswer) {
      option.classList.add('correct');
    }
    if (option.textContent === selectedAnswer) {
      option.classList.add('selected');
    }
    option.disabled = true;  // Disable all options after selection
  });

  if (selectedAnswer === correctAnswer) {
    score++;
    feedback.textContent = 'Correct!';
    feedback.classList.remove('wrong');
    feedback.classList.add('correct');
  } else {
    feedback.textContent = `Wrong! The correct answer was: ${correctAnswer}`;
    feedback.classList.remove('correct');
    feedback.classList.add('wrong');
  }

  nextButton.disabled = false;  // Enable the next button
  continueButton.classList.remove('hidden');  // Show continue button
}

function nextQuestion() {
  // Clear feedback and prepare for the next question
  feedback.textContent = '';
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    feedback.textContent = `Game Over! Your score is ${score}/${questions.length}.`;
    feedback.classList.remove('correct');
    feedback.classList.remove('wrong');
    nextButton.disabled = true;
    continueButton.classList.remove('hidden');  // Show the continue button
    restartButton.classList.remove('hidden');  // Show restart button
  }
}

function continueGame() {
  // Hide the continue button and load the next set of questions
  continueButton.classList.add('hidden');
  restartButton.classList.add('hidden');
  currentQuestionIndex = 0;  // Reset the index for the next set of questions
  score = 0;  // Reset the score
  displayQuestion();
}

function restartGame() {
  // Reset game state and load the first question
  continueButton.classList.add('hidden');
  restartButton.classList.add('hidden');
  currentQuestionIndex = 0;
  score = 0;
  feedback.textContent = '';
  displayQuestion();
}
