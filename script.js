const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreText = document.getElementById("score");
const resultTitle = document.getElementById("result-title");
const resultImg = document.getElementById("result-img");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
  { question: "Who is the king of the Greek gods?", answers: [
      { text: "Zeus", correct: true },
      { text: "Apollo", correct: false },
      { text: "Hades", correct: false },
      { text: "Hermes", correct: false }
  ]},
  { question: "Who is the goddess of wisdom?", answers: [
      { text: "Athena", correct: true },
      { text: "Aphrodite", correct: false },
      { text: "Hera", correct: false },
      { text: "Demeter", correct: false }
  ]},
  // add the rest of your 15 questions here...
];

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.textContent = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(correct) {
  if (correct) score++;
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setNextQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  let title = "";
  let img = "";

  if (score >= 9) {
    title = "Greek God";
    img = "greek_god.gif";
  } else if (score >= 7) {
    title = "Demigod";
    img = "demigod.gif";
  } else if (score >= 5) {
    title = "Mythic";
    img = "mythic.gif";
  } else {
    title = "Mere Mortal";
    img = "mere_mortal.gif";
  }

  resultTitle.textContent = title;
  resultImg.src = img;
  scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}
