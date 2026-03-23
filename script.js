const menuScreen = document.getElementById('menu-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const themeButtons = document.querySelectorAll('#menu-screen .quiz__button');
const submitBtn = document.getElementById('submit-answer');
const optionsContainer = document.getElementById('options-container');
const errorContainer = document.querySelector('.quiz__error-container');

let quizData = [];
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    quizData = data.quizzes;
    initMenu();
  })
  .catch(error => console.error("Fehler beim Laden der JSON:", error));

function initMenu() {
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const themeName = button.querySelector('.quiz__button-text').innerText.trim();
      currentQuiz = quizData.find(quiz => quiz.title === themeName);
      
      if (currentQuiz) {
        startQuiz(button);
      }
    });
  });
}

function startQuiz(selectedButton) {
  const activeTheme = document.getElementById('active-theme');
  const activeTitle = document.getElementById('active-theme-title');
  const activeIcon = document.getElementById('active-theme-icon');
  const activeIconWrapper = document.getElementById('active-theme-icon-wrapper');

  const iconSrc = selectedButton.querySelector('.quiz__button-icon').src;
  const iconBgClass = selectedButton.querySelector('.quiz__button-icon-wrapper').classList[1];

  activeTitle.innerText = currentQuiz.title;
  activeIcon.src = iconSrc;
  activeIconWrapper.className = `quiz__button-icon-wrapper ${iconBgClass}`;
  activeTheme.style.visibility = 'visible';

  menuScreen.classList.add('hidden');
  questionScreen.style.display = 'flex';

  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  selectedAnswer = null;
  submitBtn.classList.remove('active');
  if (errorContainer) errorContainer.style.visibility = 'hidden';
  
  const questionData = currentQuiz.questions[currentQuestionIndex];
  
  if (!questionData) {
    console.error("Keine Daten für Index", currentQuestionIndex);
    return;
  }

  document.getElementById('question-text').innerText = questionData.question;
  document.getElementById('current-question-num').innerText = currentQuestionIndex + 1;

  optionsContainer.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  questionData.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'quiz__button';
    btn.innerHTML = `
      <div class="quiz__button-icon-wrapper">
        <span>${letters[index]}</span>
      </div>
      <p class="quiz__button-text"></p>
    `;
    
    btn.querySelector('.quiz__button-text').innerText = option;
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('#options-container .quiz__button').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAnswer = option;
      submitBtn.classList.add('active');
      if (errorContainer) errorContainer.style.visibility = 'hidden';
    });
    
    optionsContainer.appendChild(btn);
  });
}

submitBtn.addEventListener('click', () => {
  if (!selectedAnswer) {
    if (errorContainer) errorContainer.style.visibility = 'visible';
    return;
  }

  const correctAnswer = currentQuiz.questions[currentQuestionIndex].answer;
  if (selectedAnswer === correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < currentQuiz.questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});
