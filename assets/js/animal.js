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
        question: 'In which country can you find the smallest jellyfish?',
        choice1: 'South Africa', 
        choice2: 'China',
        choice3: 'Australia',
        choice4: 'Iceland',
        answer: 3
    },
    {
        question: 'What animals are Holstein Friesians?',
        choice1: 'Cats', 
        choice2: 'Cows', 
        choice3: 'Horses', 
        choice4: 'Dogs',
        answer: 2
    },
    {
        question: 'Which animal was recognized as the symbol of Canada in 1975?',
        choice1: 'Beaver', 
        choice2: 'Moose', 
        choice3: 'Reindeer',
        choice4: 'Canadian Horse',
        answer: 1
    },
    {
        question: 'What is the only venomous snake found in Britain?',
        choice1: 'Adder', 
        choice2: 'coral snake', 
        choice3: 'king cobra', 
        choice4: 'tiger snake',
        answer: 1
    },
    {
        question: 'What is a group of owls called?',
        choice1: 'An army',
        choice2: 'A bewilderment', 
        choice3: 'A crew',
        choice4: 'A parliament',
        answer: 4
    },
    {
        question: 'Which of these animals uses echolocation to navigate?',
        choice1: 'Mice', 
        choice2: 'Dolphins', 
        choice3: 'Pigs', 
        choice4: 'Naked mole rats',
        answer: 2
    },
    {
        question: 'What can a Jesus Christ lizard do?',
        choice1: 'They appear to come back from the dead',
        choice2: 'They can cause hallucinations if you lick it',
        choice3: 'They can fly', 
        choice4: 'They can walk on water',
        answer: 4
    },
    {
        question: 'Which of the following is NOT a type of antelope?',
        choice1: 'Impala', 
        choice2: 'Gazelle', 
        choice3: 'Marten', 
        choice4: 'Springbok',
        answer: 3
    },
    {
        question: 'How many rhinoceroses still exist in the wild?',
        choice1: 'About 550,00', 
        choice2: 'About 4,000', 
        choice3: 'About 25,000',
        choice4: 'More than a million',
        answer: 3
    },
    {
        question: 'What type of animal would you find in an apiary?', 
        choice1: 'Apes',
        choice2: 'Bees',
        choice3: 'Birds',
        choice4: 'Rabbits',
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