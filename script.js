// Variables to track game state
let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 10;
let timerInterval;
let showUncroppedTimeout;

// Quiz questions 
const quizQuestions = [
    {
        image: 'ArianaGrandeCropped.png', 
        uncroppedImage: 'ArianaGrande.jpg', 
        correctAnswer: 'Ariana Grande',
        choices: ['Selena Gomez', 'Lady Gaga', 'Ariana Grande', 'JLo']
    },
    {
        image: 'MichelleObamaCropped.png', 
        uncroppedImage: 'MichelleObama.jpg', 
        correctAnswer: 'Michelle Obama',
        choices: ['Rihanna', 'Oprah', 'Kamala Harris', 'Michelle Obama']
    },
    {
        image: 'TheoJamesCropped.png', 
        uncroppedImage: 'TheoJames.jpg', 
        correctAnswer: 'Theo James',
        choices: ['Bradley Cooper', 'Tom Cruise', 'Theo James', 'Ryan Renolds']
    },
    {
        image: 'TimotheeCropped.png', 
        uncroppedImage: 'Timothee.jpg', 
        correctAnswer: 'Timothee Chalamet',
        choices: ['Timothee Chalamet', 'Troye Sivan', 'Tom Holland', 'Ross Lynch']
    },
    {
        image: 'JenniferLawrenceCropped.png', 
        uncroppedImage: 'JenniferLawrence.jpg', 
        correctAnswer: 'Jennifer Lawrence',
        choices: ['Courtney Cox', 'Adele', 'Blake Lively', 'Jennifer Lawrence']
    }
];


const questionContainer = document.getElementById('question-container');
const celebrityImage = document.getElementById('celebrity-image');
const choices = [document.getElementById('choice1'), document.getElementById('choice2'), document.getElementById('choice3'), document.getElementById('choice4')];
const timerDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-btn');
const scoreContainer = document.getElementById('score-container');

// Start the quiz
startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    score = 0;
    currentQuestionIndex = 0;
    scoreDisplay.innerText = score;
    scoreContainer.classList.remove('hide');
    nextQuestion();
}

function nextQuestion() {
    resetTimer();
    showQuestion(quizQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    // Set the cropped image and populate the choices
    celebrityImage.src = question.image;
    question.choices.forEach((choice, index) => {
        choices[index].innerText = choice;
        choices[index].disabled = false; // Enable buttons
        choices[index].onclick = selectAnswer; 
    });
}

function selectAnswer(e) {
    // Stop the timer when an answer is selected
    clearInterval(timerInterval);

    const selectedChoice = e.target.innerText;
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    // Disable all buttons
    disableAnswerButtons();

    // Check if selected choice is correct
    if (selectedChoice === correctAnswer) {
        score++;
        scoreDisplay.innerText = score;
    }

    // Show uncropped image before next question
    showUncroppedImage(quizQuestions[currentQuestionIndex]);
}

function showUncroppedImage(question) {
    // Stop the timer
    clearInterval(timerInterval);

    // Display uncropped image
    celebrityImage.src = question.uncroppedImage;
    disableAnswerButtons();

    // Show the next question after 3 seconds
    showUncroppedTimeout = setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            nextQuestion();
        } else {
            endQuiz();
        }
    }, 3000); // Delay of 3 seconds
}

function disableAnswerButtons() {
    choices.forEach(choice => {
        choice.disabled = true; // Disable buttons
    });
}

function resetTimer() {
    timeRemaining = 10;
    timerDisplay.innerText = timeRemaining;
    clearInterval(timerInterval);
    timerInterval = setInterval(countdown, 1000);
}

function countdown() {
    timeRemaining--;
    timerDisplay.innerText = timeRemaining;
    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        disableAnswerButtons();
        // Show uncropped image after time runs out
        showUncroppedImage(quizQuestions[currentQuestionIndex]);
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    clearTimeout(showUncroppedTimeout);
    alert(`Quiz Over! Your final score is ${score} / ${quizQuestions.length}.`);
    startButton.classList.remove('hide');
    questionContainer.classList.add('hide');
    scoreContainer.classList.add('hide');
}
