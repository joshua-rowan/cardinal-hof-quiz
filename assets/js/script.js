//the questions
const questions=[
    {
    question: "This Cardinal Legend won 7 out 9 World Series games with an ERA of 1.92.",
    answers: [
        {text: "Dizzy Dean", correct: false},
        {text: "Bob Gibson", correct: true},
        {text: "Chris Carpenter", correct: false},
        {text: "Steve Carlton", correct: false},
     ]  
    },
{
     question: "This 1st baseman is a three-time NL MVP and finished his career 5th on the all-time home run list",
     answers: [
        {text: "Mark McGwire", correct: false},
        {text: "Jim Bottomley", correct: false},
        {text: "Paul Goldschmidt", correct: false},
        {text: "Albert Pujols", correct: true},
    ]  
    },
{
    question: "This 2nd baseman won seven National League batting titles and batted for .400 three times.",
    answers: [
        {text: "Red Schoendienst", correct: false},
        {text: "Tommy Herr", correct: false},
        {text: "Frankie Frisch", correct: false},
        {text: "Rogers Hornsby", correct: true},
     ]  
    },
{
    question: "This shortstop is an 11-time Gold Glove winner and 14-time All-Star. He set records for the most assists and most double plays.",
    answers: [
        {text: "Garry Templeton", correct: true},
        {text: "Marty Marion", correct: false,},
        {text: "Edgar Renteria", correct: false},            
        {text: "Ozzie Smith", correct: false},
     ] 
    },
{
    question: "Born in Liberty, MO and known as 'The Captain' this 3rd baseman was a 5-time Gold-Glove Winner and MVP",
    answers: [
        {text: "Scott Rolen", correct: false},
        {text: "Nolen Arenado", correct: false},
        {text: "Ken Boyer", correct: true},
        {text: "Whitey Kurowski", correct: false},
     ]  
    },
{
    question: "c?",
    answers: [
        {text: "Ted Simmons", correct: false},
        {text: "Yadier Molina", correct: true},
        {text: "Tim McCarver", correct: false},
        {text: "Mike Matheny", correct: false},
     ]  
    },
{
    question: "This legend totaled 3,023 hits, 1,610 runs, and 938 steals. He was elected to the Hall of Fame in his first year of elibibility.",
    answers: [
        {text: "Joe Medwick", correct: false},
        {text: "Lou Brock", correct: true},
        {text: "Matt Holliday", correct: false},
        {text: "Vince Coleman", correct: false},
     ]  
    },
{
    question: "cf?",
    answers: [
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: true},
        {text: "This is the answer", correct: false},
        {text: "This is the answer", correct: false},
     ]  
    },
{
    question: "He won his first of  MVPs starting in right field. He retired with 55 major league records, and never struck out more than 46 times in a season.",
    answers: [
        {text: "Stan Musial", correct: true},
        {text: "Curt Flood", correct: false},
        {text: "Bob Caruthers", correct: false},
        {text: "Bobby Bonds", correct: false},
     ]  
    },
    {
    question: "ctchr?",
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
const userInitials = document.getElementById("submit")

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

function endQuiz() {
    resetState();
    clearInterval(timer)
    quizEl.classList.add("hidden")
    endEl.classList.remove("hidden")
    thankYouEl.textContent = "Thank you for playing! You scored " + score + " out of 10."
}

function setScores() {
    highScoresButton.textContent = score;
    localStorage.setItem("highScores", score);
}

userInitials.addEventListener("click", (e) =>{
    e.preventDefault();
    setScores()
})

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
