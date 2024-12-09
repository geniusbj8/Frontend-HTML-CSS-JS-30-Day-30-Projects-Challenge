// Quiz Data
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correct: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correct: 3
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
    correct: 0
  },
  {
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correct: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Load the question and options
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  document.getElementById("question-text").innerText = currentQuestion.question;

  const options = document.querySelectorAll(".options-container input[type='radio']");
  options.forEach((input, index) => {
    input.nextElementSibling.innerText = currentQuestion.options[index];
    input.checked = false;
    input.disabled = false;
  });

  document.getElementById("next-btn").style.display = "none";
}

// Handle the option selection
function selectAnswer() {
  const options = document.querySelectorAll(".options-container input[type='radio']");
  let selectedAnswer;
  options.forEach((input, index) => {
    if (input.checked) {
      selectedAnswer = index;
    }
  });

  if (selectedAnswer !== undefined) {
    userAnswers[currentQuestionIndex] = selectedAnswer;
    // Update score if the answer is correct
    if (selectedAnswer === quizData[currentQuestionIndex].correct) {
      score++;
    }
    document.getElementById("next-btn").style.display = "inline-block";
  }
}

// Go to next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Show the final result
function showResult() {
  document.getElementById("quiz").style.display = "none";
  const resultContainer = document.getElementById("result");
  resultContainer.style.display = "block";
  document.getElementById("score").innerText = score;

  const questionsSummary = document.createElement("div");
  quizData.forEach((question, index) => {
    const answerElement = document.createElement("div");
    const userAnswer = userAnswers[index] !== undefined ? question.options[userAnswers[index]] : "Not Answered";
    const correctAnswer = question.options[question.correct];

    const answerText = document.createElement("p");
    answerText.innerHTML = ` 
      <strong>Q${index + 1}: </strong>${question.question} <br>
      You answered: <span style="color:${userAnswers[index] === question.correct ? 'green' : 'red'}">${userAnswer}</span><br>
      Correct answer: <span style="color:green">${correctAnswer}</span>
    `;
    answerElement.appendChild(answerText);
    questionsSummary.appendChild(answerElement);
  });

  resultContainer.appendChild(questionsSummary);
}

// Restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").style.display = "none";
  loadQuestion();
}

// Initialize the quiz
loadQuestion();

// Event listeners for options
const options = document.querySelectorAll(".options-container input[type='radio']");
options.forEach(option => {
  option.addEventListener("change", selectAnswer);
});
