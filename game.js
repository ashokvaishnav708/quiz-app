const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
  {
    question: "Which data structure uses FIFO (First In, First Out) ordering?",
    choice1: "Stack",
    choice2: "Queue",
    choice3: "Binary Tree",
    choice4: "Hash Map",
    answer: 2
  },
  {
    question: "What does 'CSS' stand for?",
    choice1: "Computer Style Sheets",
    choice2: "Creative Style System",
    choice3: "Cascading Style Sheets",
    choice4: "Colorful Style Sheets",
    answer: 3
  },
  {
    question: "Which HTTP method is typically used to update an existing resource?",
    choice1: "GET",
    choice2: "PUT",
    choice3: "DELETE",
    choice4: "TRACE",
    answer: 2
  },
  {
    question: "What is the time complexity of binary search on a sorted array?",
    choice1: "O(n)",
    choice2: "O(n log n)",
    choice3: "O(log n)",
    choice4: "O(1)",
    answer: 3
  },
  {
    question: "Which of these is NOT a JavaScript primitive type?",
    choice1: "string",
    choice2: "boolean",
    choice3: "array",
    choice4: "number",
    answer: 3
  },
  {
    question: "In Git, which command is used to combine multiple commits into one?",
    choice1: "git squash",
    choice2: "git merge",
    choice3: "git rebase -i",
    choice4: "git combine",
    answer: 3
  },
  {
    question: "What does SQL's 'JOIN' clause primarily do?",
    choice1: "Deletes duplicate rows",
    choice2: "Combines rows from two or more tables",
    choice3: "Sorts table data",
    choice4: "Creates a new table",
    answer: 2
  },
  {
    question: "Which design pattern restricts a class to a single instance?",
    choice1: "Factory",
    choice2: "Observer",
    choice3: "Singleton",
    choice4: "Adapter",
    answer: 3
  },
  {
    question: "What does 'REST' stand for in RESTful APIs?",
    choice1: "Representational State Transfer",
    choice2: "Remote State Transaction",
    choice3: "Reliable Endpoint Sync Transfer",
    choice4: "Resource State Templating",
    answer: 1
  },
  {
    question: "Which of the following is a NoSQL database?",
    choice1: "PostgreSQL",
    choice2: "MySQL",
    choice3: "MongoDB",
    choice4: "SQLite",
    answer: 3
  }
];

// Constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestions();
};

getNewQuestions = () => {
    if (availableQuestions.length === 0 || questionCounter >=MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);
        // goto the end page
      return window.location.assign("end.html");
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