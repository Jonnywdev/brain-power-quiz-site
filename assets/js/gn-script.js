const startButton = document.getElementById('start-game-btn')
const nextButton = document.getElementById('next')
const welcomeScreen = document.getElementById('welcome-card')
const questionWrapper = document.getElementById('quiz-wrapper')
const questionElement = document.getElementById('question')
const answerbuttons = document.getElementById('answer-buttons')

let shuffleQuestions, currentQuestionLibrary 

startButton.addEventListener('click', startGame)

/**
 * Starts the game once 
 * start game button has been clicked
 */
function startGame() {
    console.log('started')
    welcomeScreen.classList.add('hide')
    shuffleQuestions = generalKnowledgeQuestions.sort(() => Math.random() - .5)
    currentQuestionLibrary = 0
    questionWrapper.classList.remove('hide')
    setNextQuestion()

}

/**
 * Sets the next question. 
 * from the list of questions below.
 */
function setNextQuestion() {
    resetButtons()
    showQuestion(shuffleQuestions[currentQuestionLibrary])
}

/**
 * Shows the question on the card.
 */
function showQuestion(question) {
    questionElement.innerText =question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('answer--btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerbuttons.appendChild(button)
    })
}

/**
 * Selects answers for the question to display on screen
 */
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setBackClass(document.body, correct)
    Array.from(answerbuttons.children).forEach(buttons => {
        setBackClass(buttons, buttons.dataset.correct)
    })
}

/**
 * Resets the answer buttons,
 * back to their original color.
 */
function resetButtons() {
    nextButton.classList.add('hide')
    while (answerbuttons.firstChild) {
        answerbuttons.removeChild(answerbuttons.firstChild)
    }
}

/**
 * Sets the background to either
 * red or green, depending on 
 * whether you have selected the correct or 
 * incorrect answer.
 */
function setBackClass(element, correct) {
    clearBackClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }

}

/**
 * Changes the background color back to the original.
 */
function clearBackClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
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
            { text: '238 meters', correct: false},
            { text: '321 meters', correct: false},
            { text: '269 meters', correct: true},
            { text: '199 meters', correct: false}
        ]
    }
]
