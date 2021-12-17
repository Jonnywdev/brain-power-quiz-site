// select all elements that are needed 
const welcomeScreen = document.getElementById('welcome-card');
const start = document.getElementById('start-game-btn');
const quizCard = document.getElementById('quiz-wrapper');
const questionCounter = document.getElementById('question-count');
const question = document.getElementById('question');
const choiceA = document.getElementById('A');
const choiceB = document.getElementById('B');
const choiceC = document.getElementById('C');
const choiceD = document.getElementById('D');
const score = document.getElementById('score-area');
const progress = document.getElementById('progress');

let shuffleQuestions, currentQuestionLibrary

start.addEventListener('click', startGame)

/**
 * Starts the game once the start game button has been clicked
*/
function startGame() {
    console.log('Started')
    welcomeScreen.classList.add('hide')
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionLibrary = 0
    quizCard.classList.remove('hide')

}

// const lastQuestion = questions.length -1;
// let runningQuestion = 0;

/**
 * Show the question
 */
function showQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

/**
 * Show the progress 
 */
function showProgress() {
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        ProgressEvent.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

/**
 * Create all of the Questions 
 */


const questions = [
    {
        question : 'Which African Country does Mafia Island belong to?',
        answers: [
            { text: 'Togo', correct: false},
            { text: 'Kenya', correct: false},
            { text: 'Tanzania', correct: true},
            { text: 'Sudan', correct: false}
        ]
    },

    {
        question : 'A hippophobe is afraid of which animals?',
        answers: [
            { text: 'Horses', correct: true},
            { text: 'Cows', correct: false},
            { text: 'Bats', correct: false},
            { text: 'hippopotamuses', correct: false}
        ]
    },

    {
        question : 'Who is Erik Weisz better known as?',
        answers: [
            { text: 'Eminem', correct: false},
            { text: 'Kit Harrington', correct: false},
            { text: 'Harry Houdini', correct: true},
            { text: 'Drake', correct: false}
        ]
    },

    {
        question : 'What is the longest that an animal has ever lived? (That we know of)',
        answers: [
            { text: '17 years', correct: false},
            { text: '49 years', correct: false},
            { text: '86 years', correct: true},
            { text: '142 years', correct: false}
        ]
    },

    {
        question : 'How many rings are on the Olympic flag',
        answers: [
            { text: 'None', correct: false},
            { text: '5', correct: true},
            { text: '7', correct: false},
            { text: '4', correct: false}
        ]
    },

    {
        question : 'What is a tarsier?',
        answers: [
            { text: 'A primate', correct: true},
            { text: 'A lizard', correct: false},
            { text: 'A bird', correct: false},
            { text: 'A fish', correct: false}
        ]
    },

    {
        question : 'How did Spider-man get his powers?',
        answers: [
            { text: 'Military experiment gone awry', correct: false},
            { text: 'Born with them', correct: false},
            { text: 'Woke up with them after a strange dream', correct: false},
            { text: 'Bitten by a radioactive spider', correct: true}
        ]
    },

    {
        question : 'In darts whats the most points you can score with a single throw?',
        answers: [
            { text: '60', correct: true},
            { text: '100', correct: false},
            { text: '50', correct: false},
            { text: '20', correct: false}
        ]
    },

    {
        question : 'Which of these animals does NOT appear in the Chinese zodiac?',
        answers: [
            { text: 'Rabbit', correct: false},
            { text: 'Dragon', correct: false},
            { text: 'Dog', correct: false},
            { text: 'Bear', correct: true}
        ]
    },

    {
        question : 'In the nursery rhyme, how many blackbirds were baked in a pie?',
        answers: [
            { text: '11', correct: false},
            { text: '67', correct: false},
            { text: '24', correct: true},
            { text: '38', correct: false}
        ]
    }
]


