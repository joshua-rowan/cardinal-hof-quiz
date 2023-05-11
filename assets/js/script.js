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
    question: "3?",
    answers: [
        {text: "1st Base", correct: false},
        {text: "2nd", correct: true},
        {text: "4th", correct: false},
        {text: "3rd", correct: false},
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
const quizEl = document.getElementById("question-container");
const endEl = document.getElementById("end-container");
const thankYouEl = document.getElementById("thank-you");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-button");
const replayButton = document.getElementById("play-again")
const highScoresButton = document.getElementById("high-scores")

const timerEl = document.querySelector(".timer-display")
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timerCount;
let highscore = localStorage.getItem("highscore");

if(highscore !==null){
    if (score > highscore) {
        localStorage.setItem("highscore", score);
    }
}
else{
    localStorage.setItem("highscore", score);
}

//Need to write function for Play Button to start game
startButton.addEventListener("click", startQuiz);

function endQuiz() {
    resetState();
    clearInterval(timer)
    quizEl.classList.add("hidden")
    endEl.classList.remove("hidden")
    thankYouEl.textContent = "Thank you for playing! You scored " + score + " out of 10."
    setScores()
}
//Function to start quiz

function startQuiz(){
    document.getElementById("home").classList.add("hidden")
    document.getElementById("question-container").classList.remove("hidden")
    timerCount = 60;
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    startTimer();
}

function showQuestion(){
    resetState();
    if (timerCount <= 0) {
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

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function timerPenalty(){
    timerCount -= 5
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        timerPenalty();
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
    highScoresButton.textContent = score;
    localStorage.setItem("highScores", score);
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        endQuiz();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

replayButton.addEventListener("click", startQuiz);
