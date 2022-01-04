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
        question: 'Which of these countries did the Soviet Union NEVER invade?',
        choice1: 'Afghanistan', 
        choice2: 'Sweden',
        choice3: 'Finland',
        choice4: 'Poland',
        answer: 2
    },
    {
        question: 'Where did Zoroastrianism originate?',
        choice1: 'Egypt', 
        choice2: 'India', 
        choice3: 'Persia', 
        choice4: 'South America',
        answer: 3
    },
    {
        question: 'Which of these writers was NOT English?',
        choice1: 'Jane Austen', 
        choice2: 'Agatha Christie', 
        choice3: 'Charles Dickens',
        choice4: 'Oscar Wilde',
        answer: 4
    },
    {
        question: 'What does a dendrochronologist use to establish dates?',
        choice1: 'Tree Rings', 
        choice2: 'Solar Eclipses', 
        choice3: 'Ice Cores', 
        choice4: 'Carbon Isotopes',
        answer: 1
    },
    {
        question: 'Why did whalers hunt sperm whales?',
        choice1: 'For Oil To Make Candles',
        choice2: 'For Sport', 
        choice3: 'For Meat',
        choice4: 'For Skin To Make Leather',
        answer: 1
    },
    {
        question: 'How many wives did Henry VIII have?',
        choice1: '5', 
        choice2: '7', 
        choice3: '6', 
        choice4: '8',
        answer: 3
    },
    {
        question: 'When was the last time Moscow was ever captured by a foreign power?',
        choice1: 'By Napoleon in 1812',
        choice2: 'By hittler in 1942',
        choice3: 'Never', 
        choice4: 'By Ogedei Khan in 1238',
        answer: 1
    },
    {
        question: 'Which of the following was NOT originally invented in China?',
        choice1: 'Silk', 
        choice2: 'Gunpowder', 
        choice3: 'Paper Money', 
        choice4: 'Concrete',
        answer: 4
    },
    {
        question: 'When did Columbus "discovers" America?',
        choice1: '1499', 
        choice2: '1481', 
        choice3: '1492',
        choice4: '1489',
        answer: 3
    },
    {
        question: 'When did the Wright Brothers fly the first airplane?', 
        choice1: '1914',
        choice2: '1903',
        choice3: '1921',
        choice4: '1910',
        answer: 2
        
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

    let scorePForEndText = (scorePercentage >= 80) ? `Wow ${JSON.parse(window.localStorage.getItem(nickname))} you smashed it! Congratulations.`:
                  (scorePercentage >= 60) ? `Well done, ${JSON.parse(window.localStorage.getItem(nickname))} you scored over 60%!`:
                  (scorePercentage >= 40) ? `Ahh you could've done better ${JSON.parse(window.localStorage.getItem(nickname))}!`:
                  (scorePercentage >= 20) ? `Is that the best you can do ${JSON.parse(window.localStorage.getItem(nickname))}? Atleast its not 0`:
                  `What was that? ${JSON.parse(window.localStorage.getItem(nickname))}!`;

    endText.innerHTML = `${scorePForEndText}`

}

function refreshPage(){
    window.location.reload();
} 

beginGame()



