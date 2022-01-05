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
        question: "Name the person who replaced Ozzy Osbourne as Black Sabbath's lead singer?",
        choice1: 'Ronnie James Dio', 
        choice2: 'Judas Priest',
        choice3: 'Dokken',
        choice4: 'Whitesnake',
        answer: 1
    },
    {
        question: 'To consider a band as a Big Band what is the minimum number of musicians to be needed?',
        choice1: '11', 
        choice2: '21', 
        choice3: '12', 
        choice4: '10',
        answer: 4
    },
    {
        question: 'Bjork was lead singer of what Icelandic band before pursuing a solo career?',
        choice1: 'Kukl', 
        choice2: 'The Sugarcubes', 
        choice3: 'Cocteau Twins',
        choice4: 'The Elgar sisters',
        answer: 2
    },
    {
        question: 'In an Orchestra, which is the largest brass section instrument?',
        choice1: 'Trumpet', 
        choice2: 'Tenor', 
        choice3: 'French horns', 
        choice4: 'Tuba',
        answer: 4
    },
    {
        question: 'Name the singer who released the album Alf?',
        choice1: 'Alison Moyet',
        choice2: 'Aretha Louise Franklin', 
        choice3: 'Michael Joseph Jackson',
        choice4: 'Christopher Maurice',
        answer: 1
    },
    {
        question: 'Name the singer who released the album, Here, My Dear?',
        choice1: 'Frankie Gaye', 
        choice2: 'Marvin Gaye', 
        choice3: 'Bruno Mars', 
        choice4: 'Elton John',
        answer: 2
    },
    {
        question: 'Puff the Magic Dragon lives in which place?',
        choice1: 'Neverland',
        choice2: 'Asgard',
        choice3: 'Hanalei', 
        choice4: 'Bristol',
        answer: 3
    },
    {
        question: "A tribute to David Bowie's ex-wife was given with a song by The Rolling stones, name the song?",
        choice1: 'Wild Horses', 
        choice2: 'Gimme Shelter', 
        choice3: 'Angie', 
        choice4: 'Satisfaction',
        answer: 3
    },
    {
        question: 'Name the blues great who was born Ellas Otha Bates?',
        choice1: 'Bo Diddley', 
        choice2: 'Chuck Berry', 
        choice3: 'Muddy Waters',
        choice4: 'Little Richard',
        answer: 1
    },
    {
        question: 'Name the band having its name after a scientist from the movie Barbarella?', 
        choice1: 'Nile Rodgers',
        choice2: 'Tears for fears',
        choice3: 'A Ha',
        choice4: 'Duran Duran',
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