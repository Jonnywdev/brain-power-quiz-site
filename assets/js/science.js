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
const myForm = document.getElementById('nicknames-form')
const submitChosenNickname = document.getElementById('submit')
const chosenNicknameAccepted = document.getElementById('accepted')
const nicknameInput = document.getElementById('input-for-nickname')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQestions = []

let questions = [
    {
        question: 'What is a shaddock?',
        choice1: 'A fish, the offspring of a male shad and a female haddock', 
        choice2: 'A crystal, such as quartz, that sticks out from a mineral vein',
        choice3: 'A plant that is a member of the nightshade family',
        choice4: 'A grapefruit',
        answer: 4
    },
    {
        question: 'Which one of the following instruments is used to measure humidity?',
        choice1: 'Anemometer', 
        choice2: 'Ammeter', 
        choice3: 'Hygrometer', 
        choice4: 'Barometer',
        answer: 3
    },
    {
        question: 'Which two planets are most similar in size diameter wise?',
        choice1: 'Mars and Mercury', 
        choice2: 'Venus and Earth', 
        choice3: 'Uranus and Neptune',
        choice4: 'Jupiter and Saturn',
        answer: 2
    },
    {
        question: 'If a hertz is equal to one cylce per second, how manyh cycles per second does a megahertz  equal?',
        choice1: '1/1,000', 
        choice2: '1,000', 
        choice3: '1,000,000', 
        choice4: '1,000,000,000',
        answer: 3
    },
    {
        question: 'What principle explains why cold food warms up and hot food cools off when stored at room temperature?',
        choice1: 'Entropy',
        choice2: 'Chemical equilibrium', 
        choice3: 'Momentum',
        choice4: 'Relativity',
        answer: 1
    },
    {
        question: 'Which color is not considered to be one of the primary colors of light?',
        choice1: 'Red', 
        choice2: 'Yellow', 
        choice3: 'Green', 
        choice4: 'Blue',
        answer: 2
    },
    {
        question: 'What causes the disease toxoplasmosis?',
        choice1: 'A bacterium',
        choice2: 'A protozoan',
        choice3: 'A virus', 
        choice4: 'A prion',
        answer: 2
    },
    {
        question: 'What is the slowest wind speed a hurricane can have according to the Saffir-Simpson scale?',
        choice1: '50 mph', 
        choice2: '74 mph', 
        choice3: '96 mph', 
        choice4: '110 mph',
        answer: 2
    },
    {
        question: 'Which of the following heavenly bodies have never had a spacecraft landed on it?',
        choice1: 'Venus', 
        choice2: 'Mars', 
        choice3: 'The Moon',
        choice4: 'Jupiter',
        answer: 4
    },
    {
        question: 'Meat should be kept frozen at what temperature in degrees Fahrenheit?', 
        choice1: '0 degrees or below',
        choice2: 'Between 10 and 20 degrees',
        choice3: 'Between 20 and 30 degrees',
        choice4: 'Just below 32 degrees',
        answer: 1
    }
]

let nickname = []

const SCORE_POINTS = 1
const MAX_QUESTIONS = 10

startButton.addEventListener('click', startGame)

myForm.addEventListener('submit', addNickname)

/**
 * if a key is pressed then the submit button is disabled and you can click it
 */
nicknameInput.addEventListener('keyup', () => {
    submitChosenNickname.disabled = !nicknameInput.value
})


submitChosenNickname.addEventListener('click', showAccepted) 
submitChosenNickname.addEventListener('click', () => {
    startButton.disabled = !submitChosenNickname.click
}) 
    


/**
 * Changes the Submit button
 * to the Accepted button once clicked
 */
function showAccepted() {
    submitChosenNickname.classList.add('hide')
    chosenNicknameAccepted.classList.remove('hide')
}

/**
 * Adds the users nickname to local storage 
 */
function addNickname(e) {
    e.preventDefault()

    const userNicknameInput = document.getElementById('input-for-nickname').value
    localStorage.setItem(nickname, JSON.stringify(userNicknameInput))
}

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

    let scorePForEndText = (scorePercentage >= 100) ? `Top marks? That was incredible ${JSON.parse(window.localStorage.getItem(nickname))}!`:
                  (scorePercentage >= 90) ? `Wow ${JSON.parse(window.localStorage.getItem(nickname))} you smashed it! Congratulations.`:
                  (scorePercentage >= 80) ? `Oh no, ${JSON.parse(window.localStorage.getItem(nickname))} that was so closed!`:
                  (scorePercentage >= 70) ? `70% ey ${JSON.parse(window.localStorage.getItem(nickname))} not bad!`:
                  (scorePercentage >= 60) ? `Well done, ${JSON.parse(window.localStorage.getItem(nickname))} you scored 60%!`:
                  (scorePercentage >= 50) ? `Ah you're average ${JSON.parse(window.localStorage.getItem(nickname))}, you scored 50%, try again?`:
                  (scorePercentage >= 40) ? `Not too bad ${JSON.parse(window.localStorage.getItem(nickname))}!`:
                  (scorePercentage >= 30) ? `Ahh you could've done better ${JSON.parse(window.localStorage.getItem(nickname))}!`:
                  (scorePercentage >= 20) ? `2 out've 10? Is that all ${JSON.parse(window.localStorage.getItem(nickname))}?`:
                  (scorePercentage >= 10) ? `Is that the best you can do ${JSON.parse(window.localStorage.getItem(nickname))}? Atleast its not 0`:
                `What was that? ${JSON.parse(window.localStorage.getItem(nickname))}!`;

    endText.innerHTML = `${scorePForEndText}`

}

function refreshPage(){
    window.location.reload();
} 

beginGame()