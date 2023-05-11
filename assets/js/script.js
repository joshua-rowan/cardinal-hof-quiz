//the questions
const questions=[
    {
    question: "What is the question?",
    answers: [
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: true},
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: false},
     ]  
    },
{
     question: "What is the q",
     answers: [
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: true},
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: false},
    ]  
    },
{
    question: "What is the question?",
    answers: [
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: true},
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: false},
     ]  
    },
{
    question: "What is the question?",
    answers: [
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: true},
        {text: "This is the answer", correct: false},            
        {text: "This is the answer", correct: false},
     ] 
    },
{
    question: "What is the question?",
    answers: [
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: true},
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: false},
     ]  
    },
{
    question: "What is the question?",
    answers: [
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: true},
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: false},
     ]  
    },
{
    question: "What is the question?",
    answers: [
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: true},
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: false},
     ]  
    },
{
    question: "What is the question?",
    answers: [
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: true},
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: false},
     ]  
    },
{
    question: "What is the question?",
    answers: [
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: true},
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: false},
     ]  
    },
    {
    question: "What is the question?",
    answers: [
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: true},
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: false},
     ]  
    },
];

//The Buttons
const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-button");
const highScoresButton = document.getElementById("high-scores")

var timerEl = document.querySelector(".timer-display")
let currentQuestionIndex = 0;
let score = 0;
var timer;
var timerCount;

//need the timer to be in here

//Need to write function for Play Button to start game

//Function to start quiz

function startQuiz(){
    timerCount = 60;
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    startTimer();
}

function showQuestion(){
    resetState();
    if (timerCount === 0) {
        return;
    }
    let currentQuestion = questions[currentQuestionIndex];
    let questionText = questions[currentQuestionIndex].question;
    //with Hiram's help I learned that below needed to be currentQuestionIndex, not currentQuestion. 
    //And that questionText worked best for the question text display
    //that the "/" before assets in my html js link was messing up the functionality
    let questionNum = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNum + ". " + questionText;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

startButton.addEventListener("click", startQuiz);

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function setScores() {
    highScoresButton.textContent = scoreStore;
    localStorage.setItem("highScores", scoreStore);
}

function showScore(){
    resetState();
    questionEl.innerHTML = 'You scored ${score} out of ${questions.length}';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})