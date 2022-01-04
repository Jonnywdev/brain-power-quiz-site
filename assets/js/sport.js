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

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQestions = []

let questions = [
    {
        question: 'What is the diameter of a basketball hoop in inches?',
        choice1: '18 Inches', 
        choice2: '16 Inches',
        choice3: '20 Inches',
        choice4: '22 Inches',
        answer: 1
    },
    {
        question: 'What do you call it when a bowler makes three strikes in a row?',
        choice1: '3 Of A Kind', 
        choice2: 'Rabit', 
        choice3: 'Eagle', 
        choice4: 'Turkey',
        answer: 4
    },
    {
        question: 'What is the national sport of Canada?',
        choice1: 'Ice Hockey', 
        choice2: 'Lacrosse', 
        choice3: 'Soccer',
        choice4: 'Tenis',
        answer: 2
    },
    {
        question: 'How many dimples does an average golf ball have?',
        choice1: '318', 
        choice2: '372', 
        choice3: '336', 
        choice4: '361',
        answer: 3
    },
    {
        question: 'What country has competed the most times in the Summer Olympics yet has not won a gold medal?',
        choice1: 'The Philippines',
        choice2: 'Georgia', 
        choice3: 'Finland',
        choice4: 'Canada',
        answer: 1
    },
    {
        question: 'In the 1971 Olympics, Nadia Comaneci was the first gymnast to score a perfect score. What country was she representing?',
        choice1: 'Germany', 
        choice2: 'Romania', 
        choice3: 'Russia', 
        choice4: 'China',
        answer: 2
    },
    {
        question: 'How many medals did China win at the Beijing Olympics?',
        choice1: '100',
        choice2: '90',
        choice3: '85', 
        choice4: '110',
        answer: 1
    },
    {
        question: 'What does NBA stand for?',
        choice1: 'National Basketball Alliance', 
        choice2: 'National Basketball Alikeness', 
        choice3: 'National Basketball Association', 
        choice4: 'National Basketball Antagonism',
        answer: 3
    },
    {
        question: 'What color are the goalposts in American football?',
        choice1: 'White', 
        choice2: 'Yellow', 
        choice3: 'Grey',
        choice4: 'Orange',
        answer: 2
    },
    {
        question: 'What sport is a lot like softball?', 
        choice1: 'Dogeball',
        choice2: 'Cricket',
        choice3: 'Squash',
        choice4: 'Baseball',
        answer: 4
        
    }
]

let nickname = []

const SCORE_POINTS = 1
const MAX_QUESTIONS = 10

startButton.addEventListener('click', startGame)

myForm.addEventListener('submit', addNickname)
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

    let scorePForEndText = (scorePercentage >= 80) ? `Wow ${window.localStorage.getItem(nickname)} you smashed it! Congratulations.`:
                  (scorePercentage >= 60) ? `Well done, ${window.localStorage.getItem(nickname)} you scored over 60%!`:
                  (scorePercentage >= 40) ? `Ahh you could've done better ${window.localStorage.getItem(nickname)}!`:
                  (scorePercentage >= 20) ? `Is that the best you can do ${window.localStorage.getItem(nickname)}? Atleast its not 0`:
                  `What was that? ${window.localStorage.getItem(nickname)}!`;

    endText.innerHTML = `${scorePForEndText}`

}

function refreshPage(){
    window.location.reload();
} 

beginGame()

