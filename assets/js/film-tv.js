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
        question: 'Which of these is NOT a real job title that appears in movie credits?',
        choice1: 'Gaffer', 
        choice2: 'Splicer',
        choice3: 'Best Boy',
        choice4: 'Key Grip',
        answer: 2
    },
    {
        question: 'What was the first movie in the Marvel Cinematic Universe?',
        choice1: 'The Avengers', 
        choice2: 'Spider-man', 
        choice3: 'Iron Man', 
        choice4: 'Captain Marvel',
        answer: 3
    },
    {
        question: 'In which year did Coronation Street first air?',
        choice1: '1955', 
        choice2: '1960', 
        choice3: '1970',
        choice4: '1965',
        answer: 2
    },
    {
        question: `Which of these actors DIDN'T appear in "Pulp Fiction"?`,
        choice1: 'Uma Thurman', 
        choice2: 'Bruce Willis', 
        choice3: 'John Turturro', 
        choice4: 'Samuel L. Jackson',
        answer: 3
    },
    {
        question: "Who played Basil Fawlty's wife Sybil in Fawlty Towers?",
        choice1: 'Prunella Scales',
        choice2: 'Imelda Staunton', 
        choice3: 'Penelope Keith',
        choice4: 'Joanna Lumley',
        answer: 1
    },
    {
        question: 'Captain George Mainwaring is one of the main characters in which long-running British sitcom?',
        choice1: 'Keeping Up Appearences', 
        choice2: 'Dads Army', 
        choice3: 'As Time Goes By', 
        choice4: "'Allo 'Allo!",
        answer: 2
    },
    {
        question: 'Which of the following is filmmaker Michael Bay known for?',
        choice1: 'Explosions',
        choice2: 'Sweeping Western Landscapes',
        choice3: 'Aliens', 
        choice4: 'Robots',
        answer: 1
    },
    {
        question: "On which classic game show might you hear 'Can I have a 'P' please, Bob",
        choice1: 'Countdown', 
        choice2: 'Catchphrase', 
        choice3: 'Bullseye', 
        choice4: 'Blockbusters',
        answer: 4
    },
    {
        question: 'Where is the Temple of Doom in "Indiana Jones and the Temple of Doom"?',
        choice1: 'India', 
        choice2: 'Brazil', 
        choice3: 'China',
        choice4: 'Dominican Republic',
        answer: 1
    },
    {
        question: 'In which town is The Office set?', 
        choice1: 'Milton Keynes',
        choice2: 'Reading',
        choice3: 'Hull',
        choice4: 'Slough',
        answer: 4
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