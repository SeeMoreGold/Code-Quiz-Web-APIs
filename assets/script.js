var startButton = document.getElementById("startBtn");
var startHeading = document.getElementById("startHeading");
var startInfo = document.getElementById("intro");
var questionDiv = document.getElementById("questionDiv");
var answerDiv = document.getElementById("answerDiv");


var mixQuestions;
var currentQuesIndex;

startButton.addEventListener('click', startQuiz);

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

function nextQuestion() {
    clearCard();
    askQuestion(mixQuestions[currentQuesIndex])
}

function askQuestion(question) {
    questionDiv.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("button");
        if (answer.correct) {
            button.dataset.correct = answer.correct
        
        }
        button.addEventListener('click', pickAnswer);
        answerDiv.appendChild(button)
    })
}

function clearCard() {
    while (answerDiv.firstChild) {
        answerDiv.removeChild(answerDiv.firstChild);
    }

}

function pickAnswer(e) {

}

var questions = [
    {question: "How do you declare a variable for an empty array named pets?",
     answers: [
            {text: 'var "pets" = [];', correct: false },
            {text: 'var pets = [];', correct: false},
            {text: 'var pets = ();', correct: true},
            {text: 'var pets() = 0;', correct: false}
       ]
    }
]
function startTimer() {

}