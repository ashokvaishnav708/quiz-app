const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById("loader");
const game = document.getElementById("game");

game.classList.add("hidden");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [];

fetch("questions.json").then(res => res.json().then(loadedQuestions => {
  questions = loadedQuestions;
  startGame();
}));

// Constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;


startGame = () => {
    loader.classList.add("hidden");
    game.classList.remove("hidden");
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
};

getNewQuestions = () => {
    if (availableQuestions.length === 0 || questionCounter >=MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);
        // goto the end page
      // return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion[`choice${number}`];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};


choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = 'incorrect';
        if (selectedAnswer === `${currentQuestion.answer}`) {
            classToApply = 'correct';
            increamentScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        }, 1000);
    })
});

increamentScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();