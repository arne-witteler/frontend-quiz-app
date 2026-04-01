const menuScreen = document.getElementById('menu-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const themeButtons = document.querySelectorAll('#menu-screen .quiz__button');
const submitBtn = document.getElementById('submit-answer');
const optionsContainer = document.getElementById('options-container');
const errorContainer = document.querySelector('.quiz__error-container');
const restartBtn = document.getElementById('restart-btn');

let quizData = [];
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let isAnswerSubmitted = false;
let currentIcon = '';

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
  questionScreen.classList.remove('hidden');

  currentQuestionIndex = 0;
  score = 0;
  showQuestion();

  currentIcon = iconSrc;
}

function showQuestion() {
  selectedAnswer = null;
  isAnswerSubmitted = false;
  submitBtn.innerText = 'Submit Answer';
  submitBtn.classList.remove('active');
  if (errorContainer) errorContainer.style.visibility = 'hidden';
  
  const questionData = currentQuiz.questions[currentQuestionIndex];
  
  const progressFill = document.getElementById('progress-fill');

  const progressPercent = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

  progressFill.style.width = `${progressPercent}%`;

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

  btn.setAttribute('tabindex', '0');

  btn.addEventListener('click', () => {
    document.querySelectorAll('#options-container .quiz__button')
      .forEach(b => b.classList.remove('selected'));

    btn.classList.add('selected');
    selectedAnswer = option;
    submitBtn.classList.add('active');

    if (errorContainer) errorContainer.style.visibility = 'hidden';
  });

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });

  optionsContainer.appendChild(btn);
});
}

submitBtn.addEventListener('click', () => {
  if (!selectedAnswer) {
    errorContainer.style.visibility = 'visible';
    return;
  }

  const correctAnswer = currentQuiz.questions[currentQuestionIndex].answer;

  if (!isAnswerSubmitted) {
    const buttons = document.querySelectorAll('#options-container .quiz__button');

    if (selectedAnswer === correctAnswer) {
      score++;
    }

    buttons.forEach(btn => {
      const optionText = btn.querySelector('.quiz__button-text').innerText;
      
      const icon = document.createElement('img');
      icon.classList.add('result-icon');

      if (optionText === selectedAnswer) {
        if (selectedAnswer === correctAnswer) {
          btn.classList.remove('selected');
          btn.classList.add('correct');
          icon.src = './assets/images/icon-correct.svg';
        } else {
          btn.classList.remove('selected');
          btn.classList.add('incorrect');
          icon.src = './assets/images/icon-error.svg';
        }
      }

      if (optionText === correctAnswer && selectedAnswer !== correctAnswer) {
        icon.src = './assets/images/icon-correct.svg';
      }

      if (icon.src) {
        btn.appendChild(icon);
      }

      btn.disabled = true;
    });

    submitBtn.innerText = 'Next Question';
    isAnswerSubmitted = true;
    return;
  }

  isAnswerSubmitted = false;
  currentQuestionIndex++;

  if (currentQuestionIndex < currentQuiz.questions.length) {
    showQuestion();
    submitBtn.innerText = 'Submit Answer';
  } else {
    showResult();
  }
});

function showResult() {

  console.log(currentQuiz);
  console.log(currentIcon);
  questionScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  document.getElementById('result-score').innerText = score;
  document.getElementById('result-total').innerText = currentQuiz.questions.length;

  document.getElementById('result-title').innerText = currentQuiz.title;
  document.getElementById('result-icon').src = currentIcon;
}

restartBtn.addEventListener('click', () => {
  resultScreen.classList.add('hidden');
  menuScreen.classList.remove('hidden');

  score = 0;
  currentQuestionIndex = 0;
});

const themeSwitch = document.getElementById('theme-switch');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function updateIcons(isDark) {
  if (!sunIcon || !moonIcon) return;

  sunIcon.src = isDark
    ? './assets/images/icon-sun-light.svg'
    : './assets/images/icon-sun-dark.svg';

  moonIcon.src = isDark
    ? './assets/images/icon-moon-light.svg'
    : './assets/images/icon-moon-dark.svg';
}

const isDark = localStorage.getItem('theme') === 'dark';
document.body.classList.toggle('dark-mode', isDark);
themeSwitch.checked = isDark;
updateIcons(isDark);

themeSwitch.addEventListener('change', () => {
  const isDark = themeSwitch.checked;

  document.body.classList.toggle('dark-mode', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateIcons(isDark);
});