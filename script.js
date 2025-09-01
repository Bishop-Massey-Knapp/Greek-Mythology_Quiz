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
const scoreContainer = document.getElementById('score-container');
const resultTitle = document.getElementById('result-title');
const resultImage = document.getElementById('result-image');
const restartButton = document.getElementById('restart-button');

// State
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

// Event Listeners
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

// Functions
function startQuiz() {
  startContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');

  shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5).slice(0,10);
  currentQuestionIndex = 0;
  score = 0;

  loadQuestion();
}

function loadQuestion() {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;
  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => handleAnswer(button, index, currentQuestion.answer));
    optionsContainer.appendChild(button);
  });
}

function handleAnswer(button, selectedIndex, correctIndex) {
  const buttons = optionsContainer.querySelectorAll('button');
  buttons.forEach(btn => btn.disabled = true);

  if(selectedIndex === correctIndex) {
    button.classList.add('correct');
    score++;
  } else {
    button.classList.add('incorrect');
    buttons[correctIndex].classList.add('correct');
  }

  // Move to next question after 1 second
  setTimeout(() => {
    currentQuestionIndex++;
    if(currentQuestionIndex < shuffledQuestions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizContainer.classList.add('hidden');
  scoreContainer.classList.remove('hidden');

  let title = '';
  let img = '';
  if(score >= 9) { title = "Greek God"; img = "Assets/greek-god.gif"; }
  else if(score >= 7) { title = "Demigod"; img = "Assets/demigod.gif"; }
  else if(score >= 5) { title = "Mythic"; img = "Assets/mythic.gif"; }
  else { title = "Mere Mortal"; img = "Assets/mere-mortal.gif"; }

  resultTitle.textContent = `You are a ${title}`;
  resultImage.src = img;
  document.getElementById('result-score').textContent = `Score: ${score} / ${shuffledQuestions.length}`;
}


function restartQuiz() {
  scoreContainer.classList.add('hidden');
  startContainer.classList.remove('hidden');
}
