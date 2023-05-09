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
const playButton = document.getElementById("play-button");
const highScoresButton = document.getElementById("high-scores")

let currentQuestionIndex = 0;
let score = 0;

//Need to write function for Play Button to start game

//Function to start quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
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

startQuiz();