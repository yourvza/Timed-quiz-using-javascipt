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


//input name for highscore list
var gameOver= function () {
    cleanup();
    score = timeLeft;
    let scoreDisplay = document.createElement('h1');
    let inputLabel = document.createElement('label');
    inputLabel.className = 'initialInput';
    inputLabel.htmlFor = 'intialinput';
    inputLabel.textContent = 'enter initials';

    let initialInput = document.createElement('input');
    initialInput.id = 'initialInput';
    initialInput.className = 'initialInput';

    let buttonSub =  document.createElement('button');
    buttonSub.className = 'button buttonSub';
    buttonSub.textContent = 'submit';
    timerEl.remove();
    rorH1.remove();

    scoreDisplay.textContent = 'your score is' + score;

    questionContent.appendChild(scoreDisplay);
    questionContent.appendChild(inputLabel);
    questionContent.appendChild(initialInput);
    questionContent.appendChild(buttonSub);
};

//timer start and end if no score
var timerStart = function () {
    var clock = setInterval(function() {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + 'seconds left';
            timeLeft--;
        } else if (timeLeft < 1 && score > 0) {
            timerEl.textContent = timeLeft + 'seconds left';
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + 'seconds left';
            timeLeft--;
        } else {
            timerEl.textContent = '';
            clearInterval(clock);
            gameOver();
        }
    }, 100);
    
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

//adding questions and anwers to the page
var quizE1adder = function () {
    if (questionCounter < 6) {

        let questionNumber = document.createElement("h1");
        questionNumber.className = 'questionNum'
        questionNumber.textContent = 'question' + (questionCounter + 1) + 'out of 6';
        
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
        buttonD.className = 'button buttonC';
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

//starts the quiz
var startQuiz = function() {
    const deleteStart = document.getElementById('start');
    deleteStart.remove();
    quizE1adder();
};

//movinging on to next question if right or wrong
var rightAnswer = function () {
    cleanup();
    questionCounter++;
    quizE1adder();
    rorH1.textContent = 'right';
};

var wrongAnswer = function () {
    cleanup();
    questionCounter++;
    quizE1adder();
    rorH1.textContent = 'wrong';
    timeLeft = timeLeft - 10;
};

//adding data storage to track the score of different users and displays on screen
 var highScore = function() {
   let inputEl = document.querySelector('#initialInput');
   let inputLabel = document.querySelector('.inputLabel');
   let buttonSub = document.querySelector('.buttonSub');
   let name = inputEl.value;
   let nameScore = (name + '  ' + score);
    
   inputEl.remove();
   inputLabel.remove();
   buttonSub.remove();
   scoreArray.push(nameScore);
   localStorage.setItem('score',JSON.stringify(scoreArray));

   let score1 = document.createElement('h2');
   let score2 = document.createElement('h2');
   let score3 = document.createElement('h2');
   let score4 = document.createElement('h2');
   let score5 = document.createElement('h2');
   let score6 = document.createElement('h2');

   score1.className = 'list';
   score2.className = 'list';
   score3.className = 'list';
   score4.className = 'list';
   score5.className = 'list';
   score6.className = 'list';

   score1.textContent = scoreArray[0];
   score2.textContent = scoreArray[1];
   score3.textContent = scoreArray[2];
   score4.textContent = scoreArray[3];
   score5.textContent = scoreArray[4];
   score6.textContent = scoreArray[5];

   questionContent.appendChild(score1);
   questionContent.appendChild(score2);
   questionContent.appendChild(score3);
   questionContent.appendChild(score4);
   questionContent.appendChild(score5);
   questionContent.appendChild(score6);

   let clearButt = document.createElement('button');
   clearButt.className = 'button buttonClear';
   clearButt.textContent = 'clear score';
   questionContent.appendChild(clearButt);
};

//making the buttoons interactive for all possible outcomes
var taskButtonHandler = function(event) {
    var targetEl = event.target;
    if (targetEl.classList.contains('buttonStart')) {
        startQuiz();
        timerStart();
    //accounting right answer
    } else if ((questionCounter === 0 && targetEl.classList.contains('buttonA')) ||
    (questionCounter === 0 && targetEl.classList.contains('buttonC')) ||
    (questionCounter === 0 && targetEl.classList.contains('buttonC')) ||
    (questionCounter === 0 && targetEl.classList.contains('buttonB')) ||
    (questionCounter === 0 && targetEl.classList.contains('buttonD')) ||
    (questionCounter === 0 && targetEl.classList.contains('buttonA'))) {rightAnswer();
    //accounting for end of the quiz
    } else if (questionCounter >= 6 &&
        ((targetEl.classList.contains('buttonA') ||
        targetEl.classList.contains('buttonB') ||
        targetEl.classList.contains('buttonC') ||
        targetEl.classList.contains('buttonD')))) {
        gameOver();
    //accounting for wrong answer 
    } else if (targetEl.classList.contains('buttonSub')) {
        highScore();
    } else if (targetEl.classList.contains('buttonClear')) {
        localStorage.clear();
    } else if (targetEl.classList.contains('button')) {
        wrongAnswer();
    }


};

main.addEventListener('click', taskButtonHandler);
