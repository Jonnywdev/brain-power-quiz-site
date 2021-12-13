const startButton = document.getElementById('start-game-btn')
const nextButton = document.getElementById('next')
const welcomeScreen = document.getElementById('welcome-card')
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

let score = 0;

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
 * and makes next button visable
 */
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setBackClass(document.body, correct)
    Array.from(answerbuttons.children).forEach(button => {
        setBackClass(button, button.dataset.correct)
    })
    nextButton.classList.remove('hide')

}

/**
 * Hides next button
 * Takes out previous questions
 */
function resetButtons() {
    nextButton.classList.add('hide')
    bodyBackground.classList.remove('wrong')
    bodyBackground.classList.remove('correct')
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

function checkAnswer(answer)

/**
 * Changes the background color back to the original.
 *
 * --- is not working for bg at the moment, must fix!
 */
function clearBackClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

/**
 * Checks to see if the user got the answer correct
 */
 function answerIsCorrect() {
    document.getElementById(questionElement)
}

/**
 * Checks to see if the user got the answer wrong 
 */
 function answerIsWrong() {

}

/**
 * Adds 1 to the score if you get the answer right!
 */
function incrementScore() {
    let oldscore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldscore;
}

/**
 * Adds 1 to the wrong answer box if you dont get the
 * answer correct.
 */
function incrementWrongAnswer() {
    let oldscore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldscore;
}

/**
 * Adds 1 to the question count,
 * as you go through the questions.
 */
function incrementQuestionCount() {

}

const generalKnowledgeQuestions = [
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
