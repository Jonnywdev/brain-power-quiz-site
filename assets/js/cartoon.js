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
        question: 'What does the character Popeye famously eat to boost his strength?',
        choice1: 'Carrot', 
        choice2: 'Pie',
        choice3: 'Spinach',
        choice4: 'Onion',
        answer: 3
    },
    {
        question: 'Cartoon character Spongebob Squarepants lives in a what under the sea?',
        choice1: 'House', 
        choice2: 'Pumpkin', 
        choice3: 'Pineapple', 
        choice4: 'Shed',
        answer: 3
    },
    {
        question: "The phrase 'Hakuna matata', made popular by a song in The Lion King means 'no worries' in which language?",
        choice1: 'Taiwan', 
        choice2: 'Swahili', 
        choice3: 'Brazil',
        choice4: 'Kenya',
        answer: 2
    },
    {
        question: 'In which series will you find the cartoon characters Blossom, Bubbles and Buttercup?',
        choice1: 'The Powerpuff Girls', 
        choice2: 'Spongebob', 
        choice3: 'Looney Tunes', 
        choice4: 'Peppa Pig ',
        answer: 1
    },
    {
        question: 'Which of these is not a Looney Tunes character:',
        choice1: 'Elmer Fudd',
        choice2: 'Tasmanian Devil', 
        choice3: 'Puddy Tat',
        choice4: 'Porky Pig',
        answer: 3
    },
    {
        question: 'In long running cartoon The Simpsons, what is the name of Ned Flanders first wife?',
        choice1: 'Edna Krabappel', 
        choice2: 'Maude Flanders', 
        choice3: 'Selma Bouvier', 
        choice4: 'Betsy Bidwell',
        answer: 1
    },
    {
        question: 'The Cartoon Network channel was launched in the USA in which year?',
        choice1: '1990',
        choice2: '1993',
        choice3: '1991', 
        choice4: '1992',
        answer: 4
    },
    {
        question: 'In what year was the animated Disney movie Aladdin released?',
        choice1: '1992', 
        choice2: '1990', 
        choice3: '1989', 
        choice4: '1994',
        answer: 1
    },
    {
        question: 'In the 1996 film The Hunchback of Notre Dame, what is the real name of the protagonist?',
        choice1: 'Denis Mild', 
        choice2: 'Henry Oscar', 
        choice3: 'Stan Simenly',
        choice4: 'Victor Hugo',
        answer: 4
    },
    {
        question: 'In the cartoon series Family Guy, what color trousers does Peter Griffin typically wear?', 
        choice1: 'Green',
        choice2: 'Brown',
        choice3: 'Blue',
        choice4: 'Black',
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