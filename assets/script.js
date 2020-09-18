// Here I'm declaring most of the variables
var startButton = document.getElementById("startBtn");
var startHeading = document.getElementById("startHeading");
var startInfo = document.getElementById("intro");
var questionDiv = document.getElementById("questionDiv");
var answerDiv = document.getElementById("answerDiv");

var timerDiv = document.getElementById("seconds");
var timeLeft = 60;

var score = 0;

var mixQuestions;
var currentQuesIndex;
var wrongAlert = document.getElementById("wrong");
var correctAlert = document.getElementById("correct");


// When start button is clicked, the startQuiz function is called
startButton.addEventListener('click', startQuiz);

//  This function starts the quiz
function startQuiz() {
    console.log("started");
    startButton.classList.add("hide");
    startHeading.classList.add("hide");
    startInfo.classList.add("hide");
    questionDiv.classList.remove("hide");
    answerDiv.classList.remove("hide");
    mixQuestions = questions.sort(() => Math.random() - .5);
    currentQuesIndex = 0;
    nextQuestion();
    startTimer();
}

// This function will go to the next question
function nextQuestion() {
    clearCard();
    askQuestion(mixQuestions[currentQuesIndex]);
}

// displays the question and asigns the answers to the buttons
function askQuestion(question) {
    questionDiv.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("button");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
            
        }
        button.addEventListener('click', pickAnswer);
        answerDiv.appendChild(button)
    })
}

function clearCard() {
    clearStatusClass(document.body);
    while (answerDiv.firstChild) {
        answerDiv.removeChild(answerDiv.firstChild);
    }

}

// this function will determine if the answer is right or wrong
function pickAnswer(e) {
    var answerChoice = e.target;
    var correct = answerChoice.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerDiv.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (mixQuestions.length > currentQuesIndex + 1) {
        nextQuestion();
    } 
}

function setStatusClass(element, correct) {
    clearStatusClass (element);
    if (correct === true) {
        correctAlert.classList.remove("hide");
        score++;
    } 
    else {
        wrongAlert.classList.remove("hide");
    }
}

// This removes the wrong or correct notification
function clearStatusClass(element) {
    correctAlert.classList.add("hide");
    wrongAlert.classList.add("hide");
}
// This is the array of questions and answers
var questions = [
    {
      question: "How do you declare a variable for an empty array named pets?",
      answers: [
            { text: 'var "pets" = [];', correct: false },
            { text: 'var pets = [];', correct: true },
            { text: 'var pets = ();', correct: false },
            { text: 'var pets() = 0;', correct: false }
       ]
    },
    {
        question: "A variable name can only contain letters, numbers, underscores, and __________.",
        answers: [
              { text: 'question marks', correct: false },
              { text: 'dollar signs', correct: true },
              { text: 'parenthesis', correct: false },
              { text: 'exclamation points', correct: false }
         ]
      },{
        question: "What keyword removes the last element of an array?",
        answers: [
              { text: 'push', correct: false },
              { text: 'shift', correct: false },
              { text: 'unshift', correct: false },
              { text: 'pop', correct: true }
         ]
      },{
        question: "If you wanted to execute a block of code numerous times you would use a(n) __________.",
        answers: [
              { text: 'for loop', correct: true },
              { text: 'break', correct: false },
              { text: 'Boolean', correct: false },
              { text: 'array', correct: false }
         ]
      },{
        question: "In the terminal, what command is used to save your changes to the local repository?",
        answers: [
              { text: 'git push', correct: false },
              { text: 'git pull', correct: false },
              { text: 'git commit', correct: true },
              { text: 'git clone', correct: false }
         ]
      },
]
// This is the function to start the timer
function startTimer() {
    var timerInterval = setInterval(function() {
          timeLeft--;
          timerDiv.textContent = "Timer: " + timeLeft;
      
          if(timeLeft === 0) {
            clearInterval(timerInterval);
            endQuiz();
          }
      
        }, 1000);
      
}

// This function will take you to the initials input and the highscore page
function endQuiz() {
    window.open ('highscores.html','_self',false);
    submitBtn.classList.remove("hide");
    nameEl.classList.remove("hide");

}

// For the initials form

var submitBtn = document.querySelector("#submit-btn");
var initialsList = document.querySelector("#initials-list");
var nameEl = document.querySelector("#name");
var modalEl = document.querySelector("#modal-container");
var modalNameEl = document.querySelector("#modal-name");
var closeEl = document.querySelector(".close");

var people = [{ name: "" }];
var currentId = 0;

function addPersonToList(event) {
  event.preventDefault();
  var name = nameEl.value;
  var li = document.createElement("li");
  li.id = people.length;
  li.innerHTML = name;
  people.push({ name: name });
  initialsList.append(li);
}

function close() {
  modalEl.style.display = "none";
}

function handleClick(event) {
  if (event.target.matches("button")) {
    event.preventDefault();
    modalEl.style.display = "block";
    currentId = parseInt(event.target.parentElement.id);
    var name = people[currentId].name;
    modalNameEl.textContent = name;
    
  }
}

submitBtn.addEventListener("click", addPersonToList);
initialsList.addEventListener("click", handleClick);
document.addEventListener("click", function(event) {
  if (event.target === modalEl) {
    close();
  }
});