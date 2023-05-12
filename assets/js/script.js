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
        {text: "Garry Templeton", correct: false},
        {text: "Marty Marion", correct: false,},
        {text: "Edgar Renteria", correct: false},            
        {text: "Ozzie Smith", correct: true},
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
    question: "Widely revered by the legends who came before him, this catcher holds the Cardinals record for the most games behind the plate. He is a Silver Slugger and a nine time Gold Glove Winner",
    answers: [
        {text: "Ted Simmons", correct: false},
        {text: "Yadier Molina", correct: true},
        {text: "Tim McCarver", correct: false},
        {text: "Mike Matheny", correct: false},
     ]  
    },
{
    question: "This left-field legend totaled 3,023 hits, 1,610 runs, and 938 steals. He was elected to the Hall of Fame in his first year of elibibility.",
    answers: [
        {text: "Joe Medwick", correct: false},
        {text: "Lou Brock", correct: true},
        {text: "Matt Holliday", correct: false},
        {text: "Vince Coleman", correct: false},
     ]  
    },
{
    question: "He was part of two world series winning teams, was a 3-time All-Star and won 7 consecutive Gold Gloves. This center fielder was just great on the field, but off as well. His refusal to be traded essentially led to free-agency.",
    answers: [
        {text: "Jim Edmonds", correct: false},
        {text: "Willie McGee", correct: false},
        {text: "Ray Lankford", correct: false},
        {text: "Curt Flood", correct: true},
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
    question: "A 10-time All-Star and four-time World Series winner. This legend retired with a .300 batting average, 2,383 hits, 1,304 RBI",
    answers: [
        {text: "Harry Brecheen", correct: false},
        {text: "Enos Slaughter", correct: true},
        {text: "Johnny Mize", correct: false},
        {text: "Bob Caruthers", correct: false},
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
const initialsButton = document.getElementById("submit")
const userInitials = document.getElementById("initials");
const displayHighScores = document.getElementById("high-scores-display");


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

function showHighScores() {
    let initialsBank = initials.value.toUpperCase().trim()
    let scoreBank = score;
    let userScoreBank = JSON.parse(window.localStorage.getItem('highscores')) || [];
    let scoreUpdate = {
        userInitials: initialsBank,
        score: scoreBank
    }
    userScoreBank.push((scoreUpdate))
    localStorage.setItem("highscores", JSON.stringify(userScoreBank));
    document.getElementById("end-container").classList.add("hidden");
    document.getElementById("high-scores-box").classList.remove("hidden");

}

initialsButton.addEventListener("click", showHighScores);

let getHighScores = JSON.parse(localStorage.getItem("highscores"));
if (getHighScores != null) {
    for (let i = 0; i < getHighScores.length; i++) {
        const element = getHighScores[i];
        let li = document.createElement("li")
        li.textContent = '${element.initials} - scored ${element.score} points'
        displayHighScores.appendChild(li)
    }
}
