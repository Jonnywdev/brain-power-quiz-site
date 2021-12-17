const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next')
const welcomeScreen = document.getElementById('welcome--card')
const questionWrapper = document.getElementById('quiz-wrapper')
const questionElement = document.getElementById('question')
const answerbuttons = document.getElementById('answer-buttons')
const bodyBackground = document.getElementById('bg-body')

let shuffleQuestions, currentQuestionLibrary

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionLibrary++
    setNextQuestion()
})

var questions = new Array();
var choices = new Array();
var answers = new Array();
var response = new Array();

questions[0] = '';
choices[0] = new Array();
choices[0][0] = '';
choices[0][1] = '';
choices[0][2] = '';
choices[0][3] = '';
answers[0] = choices[0][2];

/**
 * List of questions
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

/**
 * Starts the game once
 * start game button has been clicked
 */
function startGame() {
    console.log('started')
    welcomeScreen.classList.add('hide')
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionLibrary = 0
    questionWrapper.classList.remove('hide')
    setNextQuestion()

}

/**
 * Sets the next question.
 * from the list of questions below.
 */
function setNextQuestion() {
    showQuestion(shuffleQuestions[currentQuestionLibrary])
}

/**
 * Shows the question on the card.
 */
function showQuestion(question) {
    questionElement.innerText =question.question
     questions.choiceA.forEach(() => {
         const button = document.createElement('button')
         button.innerText = answer.text
         button.classList.add('answer--btn')
     })
         
    //     button.addEventListener('click', selectAnswer)
    //     answerbuttons.appendChild(button)
    // })
}

