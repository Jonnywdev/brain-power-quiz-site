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
        question: 'Which of the following vegetables is not one of the ingredients of V-8 juice?',
        choice1: 'Beetroot', 
        choice2: 'Carrot',
        choice3: 'Spinach',
        choice4: 'Cabbage',
        answer: 4
    },
    {
        question: 'What is the main ingredient in vichyssoise?',
        choice1: 'Lima Beans', 
        choice2: 'Clams', 
        choice3: 'Tomatoes', 
        choice4: 'Potatoes',
        answer: 4
    },
    {
        question: 'What country produces the most potatoes?',
        choice1: 'China', 
        choice2: 'United States', 
        choice3: 'Ireland',
        choice4: 'Russia',
        answer: 1
    },
    {
        question: 'What soft-drink company introduced the brand Slice?',
        choice1: 'Dr. Pepper', 
        choice2: 'Coca Cola', 
        choice3: 'Seven Up', 
        choice4: 'Pepsico',
        answer: 2
    },
    {
        question: 'According to a 1980s Beverage Media poll of four hundred bartenders, what is the average male customers favorite drink?',
        choice1: 'Beer',
        choice2: 'Bourbon', 
        choice3: 'Scotch',
        choice4: 'Vodka',
        answer: 1
    },
    {
        question: "Simplesse is NutraSweet's fat substitute.  What is it made of?",
        choice1: 'A blend of proteins from egg white and milk', 
        choice2: 'Fat molecules altered to be too large to digest', 
        choice3: 'Folecules that are the mirror-image of normal fat molecules', 
        choice4: 'A blend of cow and pig fat',
        answer: 1
    },
    {
        question: 'Which grade of olive oil is considered the best?',
        choice1: 'Extra Virgin',
        choice2: 'Pure Virgin',
        choice3: 'Superfine Virgin', 
        choice4: 'Virgin',
        answer: 1
    },
    {
        question: 'What vegetable has varieties known as Bell Tower, Orobelle, and Jupiter?',
        choice1: 'Onion', 
        choice2: 'Pepper', 
        choice3: 'Rum', 
        choice4: 'Swede',
        answer: 2
    },
    {
        question: 'In the drink called a zombie, what is the main alcoholic ingredient?',
        choice1: 'Beer', 
        choice2: 'Brandy', 
        choice3: 'Rum',
        choice4: 'Whiskey',
        answer: 3
    },
    {
        question: 'Of the following dishes, which are not typically made with some kind of seafood?', 
        choice1: 'Bouillabaisse',
        choice2: 'Osso buco',
        choice3: 'Fritto misto',
        choice4: 'Tempura',
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