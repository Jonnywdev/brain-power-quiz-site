const startButton = document.getElementById('start-game-btn')
const welcomeScreen = document.getElementById('welcome-card')
const questionWrapper = document.getElementById('quiz-wrapper')

const shuffleQuestions, currentQuestionLibrary

startButton.addEventListener('click', startGame)

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
function showQuestion() {

}

/**
 * Sets the correct answer on the screen.
 * changes the colors, the correct button will change
 * to green, the incorrect answers will turn to red.
 */
function selectAnswer() {

}

/**
 * Resets the answer buttons,
 * back to their original color.
 */
function resetButtons() {

}

/**
 * Sets the background to either
 * red or green, depending on 
 * whether you have selected the correct or 
 * incorrect answer.
 */
function setBackClass() {

}

/**
 * Changes the background color back to the original.
 */
function clearBackClass() {

}

/**
 * Adds 1 to the score if you get the answer right!
 */
function incrementScore() {

}

/**
 * Adds 1 to the wrong answer box if you dont get the 
 * answer correct.
 */
function incrementWrongAnswer() {

}

/**
 * Adds 1 to the question count,
 * as you go through the questions.
 */
function incrementQuestionCount() {

}

const generalKnowledgeQuestions = [
    {
        question : 'What was the length of the titanic?',
        answers: [
            { text: '238', correct: false},
            { text: '321', correct: false},
            { text: '269', correct: true},
            { text: '199', correct: false}
        ]
    }
]
