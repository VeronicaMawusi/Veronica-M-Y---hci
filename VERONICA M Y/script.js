const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const score = document.getElementById("final-score");
const yourScore = document.getElementById("your-score");
const ctx = document.getElementById("myChart").getContext("2d");
const nameField = document.querySelector('#name');
const idField = document.querySelector('#idNum');
const inputDiv = document.getElementById("input-div");
const quizStart = document.getElementById("h5");



let shuffledQuestions, currentQuestionIndex;
let timeLeft = 1200; // or any other starting value
let timerInterval,
  finalMarks,
  marks = 0,
  totalMarks = 10;



  

// startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", function() {
  

  if (nameField.value.trim() === '' || idField.value.trim() === '') {
    score.textContent='Enter Your name and id to start the quiz.'
    return;
  }

  startQuiz()
 
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let timerStarted = false;

function startTimer(duration, display) {
  if (!timerStarted) {
    let timer = duration,
      minutes,
      seconds;
    let countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(countdown);
        display.textContent = "Time's up!";
        startButton.disabled = true;
        yourScore.textContent = "Your final score is";
        totalMarks = marks
        finalMarks= finalMarks- totalMarks
// Create a new pie chart
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Actual Marks", "Total Score"],
    datasets: [
      {
        label: "Marks",
        data: [finalMarks, totalMarks],
        backgroundColor: ["#77BC05", "#108F87"],
      },
    ],
  },
});

      }
    }, 1000);

    timerStarted = true;
  }
}


function startQuiz() {

nameField.style.display = 'none';
idField.style.display = 'none';
quizStart.textContent= `Your name:${nameField.value}  \t\t    Your id:${idField.value}`

  startButton.textContent = "Next";
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  startTimer(timeLeft, timerElement);

  
}



function setNextQuestion() {
  resetState();
  if (shuffledQuestions.length === 0) {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    yourScore.textContent = "Your final score is " + marks;
    clearInterval(timerInterval);
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  shuffledQuestions.splice(currentQuestionIndex, 1);
}


function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}



function selectAnswer(e) {
  const selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  if (correct) {
    marks = marks + 1;
    score.textContent = marks;
    finalMarks = totalMarks - marks;
    console.log(finalMarks);
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What does BBC stand for?",
    answers: [
      { text: "British Broadcasting Corporation", correct: true },
      { text: "Botswana Broadcasting Company", correct: false },
      { text: "Bahamas Broadcasting Company", correct: false },
      { text: "British Broadcasting Company", correct: false },
    ],
  },
  {
    question: 'who is the author of the "beautyful ones are not yet born"?',
    answers: [
      { text: "Chinua Achebe", correct: false },
      { text: "Ayi Kwei Armah", correct: true },
      { text: "Ama Ata Aidoo", correct: false },
      { text: "Kofi Awoonor", correct: false },
    ],
  },
  {
    question: 'How many human players are there on each side in a polo match"?',
    answers: [
      { text: " 4 players", correct: true },
      { text: "6 player", correct: false },
      { text: "2 players", correct: false },
      { text: "5 players", correct: false },
    ],
  },
  {
    question: 'From what grain is the Japanese spirit Sake made"?',
    answers: [
      { text: "Yeast", correct: false },
      { text: "Millet", correct: false },
      { text: "Rice", correct: true },
      { text: "Maize", correct: false },
    ],
  },
  {
    question: 'What is the most common surname in the United States"?',
    answers: [
      { text: "Rodriguez", correct: false },
      { text: "Johnson", correct: false },
      { text: "Brown", correct: false },
      { text: " Smith", correct: true },
    ],
  },
  {
    question: "What country has won the most World Cups?",
    answers: [
      { text: "England", correct: false },
      { text: "France", correct: false },
      { text: "Brazil", correct: true },
      { text: "Germany", correct: false },
    ],
  },
  {
    question: "What is the highest mountain in Ghana?",
    answers: [
      { text: "Mount Afadjato", correct: true },
      { text: "Kwahu Plateau", correct: false },
      { text: "Akwapim-Togo Range", correct: false },
      { text: "Mount Adaklu", correct: false },
    ],
  },
  {
    question: "Which is the only body part that is fully grown from birth?",
    answers: [
      { text: "Nose", correct: false },
      { text: "Eyes", correct: true },
      { text: "Mouth", correct: false },
      { text: "Ears", correct: false },
    ],
  },
  {
    question: "who made the world-famous Monalisa painting?",
    answers: [
      { text: "Leonardo da Vinci", correct: true },
      { text: "Pearl Earring", correct: false },
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
    ],
  },
  {
    question: "What are the two longest rivers in the United States?",
    answers: [
      { text: " Mackenzie Rive and Peace River", correct: false },
      { text: "Snake River and Colorado River", correct: false },
      { text: "river Volta and River Pra", correct: false },
      { text: "Mississippi River and the Missouri River", correct: true },
    ],
  },
];
