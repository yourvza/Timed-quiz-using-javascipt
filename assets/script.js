//Make variables with info from html
var main = document.querySelector('#main');
var questionContent = document.querySelector('#questionContent');
var rorH1 = document.querySelector('#rightOrWorng');
var timerEl = document.getElementById('timer')
//variables needed to calculate scores and time
var timeLeft = 80;
var score = 0;
let questionCounter = 0
var scoreArrRaw = localStorage.getItem('score')
var scoreArray = JSON.parse(scoreArrRaw)
scoreArray = scoreArray || [];
var gameOverCalled = false;
 
//Questions that will be in the quiz
const questionsObj = {
    question: [
         'Javascript is an _______ language?',
         'Which of the following keywords is used to define a variable in Javascript',
         'Which of the following methods is used to access HTML elements using Javascript?',
         'Upon encountering empty statements, what does the Javascript Interpreter do?',
         'Which of the following methods can be used to display data in some form using Javascript?',
         'How can a datatype be declared to be a constant type?'],
 //make multiple arrays to represent the choices of A,B,C,D
 answerA: ['Object-Oriented', 'var', 'getElementbyId', 'Throws an error', 'document.write', 'const'],
 answerB: ['Object-Based', 'let', 'getElementsByClassName', 'Ignores the statements', 'console.log', 'var'],
 answerC: ['Procedural', 'Both A and B', 'Both A and B', 'Gives a warning', 'window.alert', 'let'],
 answerD: ['None of the above', 'None of the above', 'None of the above', 'None of the above', 'All of the above', 'constant'],
};


//timer start and end if no score
var timerStart = function () {
    var clock = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft + ' seconds left';
            timeLeft--;
        } else {
            timerEl.textContent = '';
            clearInterval(clock);
            if (score > 0) {
                gameOver();
            }
        }
    }, 1000);
};

//starts the quiz
var startQuiz = function() {
    const deleteStart = document.getElementById('start');
    deleteStart.remove();
    quizE1adder();
};

//adding questions and anwers to the page
var quizE1adder = function () {
    if (questionCounter < 6) {

        let questionNumber = document.createElement("h1");
        questionNumber.className = 'questionNum'
        questionNumber.textContent = 'question ' + (questionCounter + 1) + ' out of 6';
        
        let questionE1 = document.createElement('h1');
        questionE1.className = 'questionText';
        questionE1.textContent = questionsObj.question[questionCounter];

        let buttonA = document.createElement('button');
        buttonA.className = 'button buttonA';
        buttonA.textContent = 'A. ' + questionsObj.answerA[questionCounter];

        let buttonB = document.createElement('button');
        buttonB.className = 'button buttonB';
        buttonB.textContent = 'B. ' + questionsObj.answerB[questionCounter];

        let buttonC = document.createElement('button');
        buttonC.className = 'button buttonC';
        buttonC.textContent = 'C. ' + questionsObj.answerC[questionCounter];

        let buttonD = document.createElement('button');
        buttonD.className = 'button buttonD';
        buttonD.textContent = 'D. ' + questionsObj.answerD[questionCounter];

        questionContent.appendChild(questionNumber);
        questionContent.appendChild(questionE1);
        questionContent.appendChild(buttonA);
        questionContent.appendChild(buttonB);
        questionContent.appendChild(buttonC);
        questionContent.appendChild(buttonD);
        
        if (questionCounter === 5) {
            questionCounter++;
        };

    };

};

//deletes the question and answer buttons
var cleanup = function() {
    let questionNumber = document.querySelector('.questionNum');
    let questionE1 = document.querySelector('.questionText');
    let buttonA = document.querySelector('.buttonA');
    let buttonB = document.querySelector('.buttonB');
    let buttonC = document.querySelector('.buttonC');
    let buttonD = document.querySelector('.buttonD');

    //REMOVING QUESTIONS AFTER INTERACTION
    if (buttonC.classList.contains('button')) {
        questionNumber.remove();
        questionE1.remove();
        buttonA.remove();
        buttonB.remove();
        buttonC.remove();
        buttonD.remove();
    };
};
//making the buttons interactive for all possible outcomes
var taskButtonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.classList.contains('buttonStart')) {
        startQuiz();
        timerStart();
    } else if (questionCounter === 0 && (targetEl.classList.contains('buttonA') ||
     targetEl.classList.contains('buttonB') ||
     targetEl.classList.contains('buttonC') ||
     targetEl.classList.contains('buttonD'))) {
        rightAnswer();
    } else if (questionCounter >= 6 && targetEl.classList.contains('buttonSub')) {
        // Ensure gameOver is called only once
        if (!gameOverCalled) {
            gameOver();
            gameOverCalled = true;
        }
    } else if (targetEl.classList.contains('buttonClear')) {
        localStorage.clear();
    } else if (targetEl.classList.contains('button')) {
        wrongAnswer();
    }
};


//make event listener for button interaction
main.addEventListener('click', taskButtonHandler);


//movinging on to next question if right or wrong
function thisQuestion(isCorrect) {
    cleanup();
    questionCounter++;
    quizE1adder();
    rorH1.textContent = isCorrect ? 'right' : 'wrong';

    if (!isCorrect) {
        timeLeft = Math.max(0, timeLeft - 10);
    }

    console.log(isCorrect ? 'right' : 'wrong');
}

var rightAnswer = function () {
    thisQuestion(true);
};

var wrongAnswer = function () {
    thisQuestion(false);
};
//input name for highscore list
var gameOver = function () {
    cleanup();
    score = timeLeft;
    let scoreDisplay = createScoreDisplay(score);
    let inputLabel = createInputLabel();
    let initialInput = createInitialInput();
    let submitButton = createSubmitButton();
    // Remove unnecessary elements
    timerEl.remove();
    rorH1.remove();

    questionContent.appendChild(scoreDisplay);
    questionContent.appendChild(inputLabel);
    questionContent.appendChild(initialInput);
    questionContent.appendChild(submitButton);
};

//create score display
function createScoreDisplay(score) {
    let scoreDisplay = document.createElement('h1');
    scoreDisplay.textContent = 'Your score is ' + score;
    return scoreDisplay;
}

//create input label element
function createInputLabel() {
    let inputLabel = document.createElement('label');
    inputLabel.className = 'inputLabel';
    inputLabel.htmlFor = 'initialInput';
    inputLabel.textContent = 'Enter initials';
    return inputLabel;
}

//create initial input
function createInitialInput() {
    let initialInput = document.createElement('input');
    initialInput.id = 'initialInput';
    initialInput.className = 'initialInput';
    return initialInput;
}

//create submit button element
function createSubmitButton() {
    let submitButton = document.createElement('button');
    submitButton.className = 'button buttonSub';
    submitButton.textContent = 'Submit';
    return submitButton;
}

//adding data storage to track the score of different users and displays on screen
function highScore() {
    let inputEl = document.querySelector('#initialInput');
    let inputLabel = document.querySelector('.inputLabel');
    let buttonSub = document.querySelector('.buttonSub');
    let name = inputEl.value;
    let nameScore = name + '  ' + score;

    removeElements([inputEl, inputLabel, buttonSub]);

    scoreArray.push(nameScore);
    localStorage.setItem('score', JSON.stringify(scoreArray));

    for (let i = 0; i < 6; i++) {
        let scoreElement = document.createElement('h2');
        scoreElement.className = 'list';
        scoreElement.textContent = scoreArray[i] || ''; 
        questionContent.appendChild(scoreElement);
    }

    let clearButton = document.createElement('button');
    clearButton.className = 'button buttonClear';
    clearButton.textContent = 'clear score';
    questionContent.appendChild(clearButton);
};

