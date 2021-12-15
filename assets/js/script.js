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

const lastQuestion = questions.length -1;
let runningQuestion = 0;

/**
 * Show the question
 */
function showQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>";
    
}

function () {

}

function () {

}

function () {

}

function () {

}

function () {

}

function () {

}

function () {

}

function () {

}

function setNextQuestion() {

}

function showQuestion() {

}

function selectAnswer() {

}

/**
 * Create all of the Questions 
 */
let questions = [
    {
        question : 'Which African Country does Mafia Island belong to?',
        choiceA : 'Togo', 
        choiceB : 'Kenya',
        choiceC : 'Tanzania',
        choiceD : 'Sudan',
        correct : 'C'
    },

    {
        question : 'A hippophobe is afraid of which animals?',
        choiceA : 'Horses', 
        choiceB : 'Cows', 
        choiceC : 'Bats', 
        choiceD : 'hippopotamuses',
        correct : 'A'
    },

    {
        question : 'Who is Erik Weisz better known as?',
        choiceA : 'Eminem', 
        choiceB : 'Kit Harrington', 
        choiceC : 'Harry Houdini',
        choiceD : 'Drake',
        correct : 'C'
    },

    {
        question : 'What is the longest that an animal has ever lived? (That we know of)',
        choiceA : '17 years', 
        choiceB : '49 years', 
        choiceC : '86 years', 
        choiceD : '142 years',
        correct : 'C'
    },

    {
        question : 'How many rings are on the Olympic flag',
        choiceA : 'None',
        choiceB : '5', 
        choiceC : '7',
        choiceD : '4',
        correct : 'B'
    },

    {
        question : 'What is a tarsier?',
        choiceA : 'A primate', 
        choiceB : 'A lizard', 
        choiceC : 'A bird', 
        choiceD : 'A fish',
        correct : 'A'
    },

    {
        question : 'How did Spider-man get his powers?',
        choiceA : 'Military experiment gone awry',
        choiceB : 'Born with them',
        choiceC : 'Woke up with them after a strange dream', 
        choiceD : 'Bitten by a radioactive spider',
        correct : 'D'
    },

    {
        question : 'In darts whats the most points you can score with a single throw?',
        choiceA : '60', 
        choiceB : '100', 
        choiceC : '50', 
        choiceD : '20',
        correct : 'A'
    },

    {
        question : 'Which of these animals does NOT appear in the Chinese zodiac?',
        choiceA : 'Rabbit', 
        choiceB : 'Dragon', 
        choiceC : 'Dog',
        choiceD : 'Bear',
        correct : 'D'
    },

    {
        question : 'In the nursery rhyme, how many blackbirds were baked in a pie?', 
        choiceA : "11",
        choiceB : '67',
        choiceC : '24',
        choiceD : '38',
        correct : 'C'
        
    }
];

