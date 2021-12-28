const startButton = document.getElementById('start-btn')
const welcomeScreen = document.getElementById('welcome--card')
const questionWrapper = document.getElementById('quiz-wrapper')
const choices = Array.from(document.getElementsByClassName('choice-text'))
const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('score')
const progressBarFull = document.getElementById('progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQestions = []

let questions = [
    {
        question: 'Which African Country does Mafia Island belong to?',
        choice1: 'Togo', 
        choice2: 'Kenya',
        choice3: 'Tanzania',
        choice4: 'Sudan',
        answer: 3
    },
    {
        question: 'A hippophobe is afraid of which animals?',
        choice1: 'Horses', 
        choice2: 'Cows', 
        choice3: 'Bats', 
        choice4: 'hippopotamuses',
        answer: 1
    },
    {
        question: 'Who is Erik Weisz better known as?',
        choice1: 'Eminem', 
        choice2: 'Kit Harrington', 
        choice3: 'Harry Houdini',
        choice4: 'Drake',
        answer: 3
    },
    {
        question: 'What is the longest that an animal has ever lived? (That we know of)',
        choice1: '17 years', 
        choice2: '49 years', 
        choice3: '86 years', 
        choice4: '142 years',
        answer: 3
    },
    {
        question: 'How many rings are on the Olympic flag',
        choice1: 'None',
        choice2: '5', 
        choice3: '7',
        choice4: '4',
        answer: 2
    },

    {
        question: 'What is a tarsier?',
        choice1: 'A primate', 
        choice2: 'A lizard', 
        choice3: 'A bird', 
        choice4: 'A fish',
        answer: 1
    },

    {
        question: 'How did Spider-man get his powers?',
        choice1: 'Military experiment gone awry',
        choice2: 'Born with them',
        choice3: 'Woke up with them after a strange dream', 
        choice4: 'Bitten by a radioactive spider',
        answer: 4
    },

    {
        question: 'In darts whats the most points you can score with a single throw?',
        choice1: '60', 
        choice2: '100', 
        choice3: '50', 
        choice4: '20',
        answer: 1
    },

    {
        question: 'Which of these animals does NOT appear in the Chinese zodiac?',
        choice1: 'Rabbit', 
        choice2: 'Dragon', 
        choice3: 'Dog',
        choice4: 'Bear',
        answer: 4
    },

    {
        question: 'In the nursery rhyme, how many blackbirds were baked in a pie?', 
        choice1: "11",
        choice2: '67',
        choice3: '24',
        choice4: '38',
        answer: 3
        
    }
]

startButton.addEventListener('click', startGame)

/**
 * Starts the game once
 * start game button has been clicked
 */
function startGame() {
    console.log('started')
    welcomeScreen.classList.add('hide')
    questionWrapper.classList.remove('hide')
}