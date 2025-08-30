// Quiz Data
const quizData = [
  {question:"Who is the king of the Greek gods?", options:["Hades","Zeus","Poseidon","Apollo"], answer:1},
  {question:"Who is the goddess of wisdom and warfare?", options:["Hera","Athena","Aphrodite","Artemis"], answer:1},
  {question:"Which hero completed the 12 Labors?", options:["Perseus","Hercules","Theseus","Odysseus"], answer:1},
  {question:"Who is the god of the sea?", options:["Hades","Apollo","Poseidon","Ares"], answer:2},
  {question:"Which monster has snakes for hair and can turn people to stone?", options:["Chimera","Medusa","Minotaur","Hydra"], answer:1},
  {question:"What is the name of the winged horse in Greek mythology?", options:["Cerberus","Pegasus","Chimera","Griffin"], answer:1},
  {question:"Who is the goddess of love and beauty?", options:["Athena","Hera","Aphrodite","Demeter"], answer:2},
  {question:"Which Titan was forced to hold up the sky?", options:["Cronus","Atlas","Prometheus","Oceanus"], answer:1},
  {question:"Who guided souls to the Underworld?", options:["Hermes","Hades","Apollo","Hephaestus"], answer:0},
  {question:"Which hero killed the Minotaur?", options:["Perseus","Hercules","Theseus","Jason"], answer:2},
  {question:"Which Greek god is associated with the sun?", options:["Apollo","Helios","Ares","Dionysus"], answer:0},
  {question:"What is the Greek underworld called?", options:["Olympus","Tartarus","Elysium","Hades"], answer:1},
  {question:"Who tricked the Trojans into bringing the wooden horse into the city?", options:["Odysseus","Achilles","Hector","Paris"], answer:0},
  {question:"Which goddess was cursed to turn everything she touched into gold?", options:["Midas (trick question – it’s a man!)","Athena","Hera","Persephone"], answer:0},
  {question:"Who is the god of wine and revelry?", options:["Dionysus","Hermes","Ares","Apollo"], answer:0}
];

// DOM Elements
const startContainer = document.getElementById('start-container');
const startButton = document.getElementById('start-button');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const scoreText = document.getElementById('score');
const reviewContainer = document.getElementById('review-container');
const restartButton = document.getElementById('restart-button');

// State
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];
let userAnswers = [];

// Event Listeners
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

// Functions
function startQuiz() {
  startContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');

  // Shuffle questions and take 10
  shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5).slice(0,10);
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  loadQuestion();
}

function loadQuestion() {
  nextButton.classList.add('hidden');
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // Shuffle options
  const shuffledOptions = [...currentQuestion.options].sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(currentQuestion.options[currentQuestion.answer]);

  questionContainer.textContent = currentQuestion.question;
  optionsContainer.innerHTML = '';

  shuffledOptions.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => selectOption(index, correctIndex));
    optionsContainer.appendChild(button);
  });
}

function selectOption(selectedIndex, correctIndex) {
  const buttons = optionsContainer.querySelectorAll('button');

  buttons.forEach((button, index) => {
    button.disabled = true;
    if(index === correctIndex) button.classList.add('correct');
    if(index === selectedIndex && index !== correctIndex) button.classList.add('incorrect');
  });

  if(selectedIndex === correctIndex) score++;
  userAnswers.push(selectedIndex);
  nextButton.classList.remove('hidden');
}

function nextQuestion() {
  currentQuestionIndex++;
  if(currentQuestionIndex < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showScoreAndReview();
  }
}

function showScoreAndReview() {
  quizContainer.classList.add('hidden');
  scoreContainer.classList.remove('hidden');
  scoreText.textContent = `You scored ${score} out of ${shuffledQuestions.length}`;
  
  reviewContainer.innerHTML = '';
  shuffledQuestions.forEach((q, index) => {
    const div = document.createElement('div');
    div.classList.add('review-question');
    const userIndex = userAnswers[index];
    div.innerHTML = `<strong>Q${index+1}:</strong> ${q.question}<br>
      Your answer: <span class="${userIndex === q.answer ? 'correct selected' : 'incorrect selected'}">${q.options[userIndex] || 'No answer'}</span><br>
      Correct answer: <span class="correct">${q.options[q.answer]}</span>`;
    reviewContainer.appendChild(div);
  });
}

function restartQuiz() {
  scoreContainer.classList.add('hidden');
  startContainer.classList.remove('hidden');
}
