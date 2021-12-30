const startButton = document.getElementById('start-btn')
const welcomeScreen = document.getElementById('welcome--card')
const questionWrapper = document.getElementById('quiz-wrapper')
const choices = Array.from(document.getElementsByClassName('choice'))
const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('score')
const progressBarFull = document.getElementById('progressBarFull')
const question = document.getElementById('question')
const endCard = document.getElementById('end')
const totalScore = document.getElementById('total-score')
const endText = document.getElementById('end-sentence')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQestions = []

let questions = [
    {
        question: '',
        choice1: '', 
        choice2: '',
        choice3: '',
        choice4: '',
        answer: 
    },
    {
        question: '',
        choice1: '', 
        choice2: '', 
        choice3: '', 
        choice4: '',
        answer: 
    },
    {
        question: '',
        choice1: '', 
        choice2: '', 
        choice3: '',
        choice4: '',
        answer: 
    },
    {
        question: '',
        choice1: '', 
        choice2: '', 
        choice3: '', 
        choice4: '',
        answer: 
    },
    {
        question: '',
        choice1: '',
        choice2: '', 
        choice3: '',
        choice4: '',
        answer: 
    },
    {
        question: '',
        choice1: '', 
        choice2: '', 
        choice3: '', 
        choice4: '',
        answer: 
    },
    {
        question: '',
        choice1: '',
        choice2: '',
        choice3: '', 
        choice4: '',
        answer: 
    },
    {
        question: '',
        choice1: '', 
        choice2: '', 
        choice3: '', 
        choice4: '',
        answer: 
    },
    {
        question: '',
        choice1: '', 
        choice2: '', 
        choice3: '',
        choice4: '',
        answer: 
    },
    {
        question: '', 
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: 
        
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 10

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

beginGame = () => {
    questionCounter = 0
    score = 0
    availableQestions = [...questions]
    console.log('beginGame')
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        questionWrapper.classList.add('hide')
        endCard.classList.remove('hide')
    }

    questionCounter++ 
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQestions.length)
    currentQuestion = availableQestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)

    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score

    totalScore.innerText = `You scored ${score} out of ${MAX_QUESTIONS}`

    const scorePercentage = Math.round(100 * score/MAX_QUESTIONS)

    let scorePForEndText = (scorePercentage >= 80) ? "Wow you smashed it! Congratulations.":
                  (scorePercentage >= 60) ? "Well done,you scored over 60%!":
                  (scorePercentage >= 40) ? "Ahh you could've done better!":
                  (scorePercentage >= 20) ? "Is that the best yo can do? Atleast its not 0":
                  "What was that?";

    endText.innerHTML = `${scorePForEndText}`

}

beginGame()