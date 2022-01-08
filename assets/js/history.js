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
/**
 * All questions
 * Choices and Answers
 */
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

/**
 * if a key is pressed then the get started button is disabled and you can click it to start the game
 */
submitChosenNickname.addEventListener('click', showAccepted) 
submitChosenNickname.addEventListener('click', () => {
    startButton.disabled = !submitChosenNickname.click

    alert(`You need to submit your nickname before you can continue`);
    throw`You need to submit your nickname before you can continue. Aborting!`;
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
    welcomeScreen.classList.add('hide')
    questionWrapper.classList.remove('hide')
}

/**
 * Begins the game, sets the question counter and score to 0 and 
 * calls the getNewQuestion function which starts the quiz
 */
beginGame = () => {
    questionCounter = 0
    score = 0
    availableQestions = [...questions]
    getNewQuestion()
}
/**
 * Gets new question and sets it
 */
getNewQuestion = () => {
    /**
    * If the length of availableQestions is strictly equal to 0 
    * or if the amount of questions is greater than the max amount of questions then,
    * end the quiz. Save the score in local storage.
    */
    if(availableQestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        questionWrapper.classList.add('hide')
        endCard.classList.remove('hide')
    }
    /**
    * If not then add 1 to the question counter 
    */
    questionCounter++ 
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    /**
    * Randomises the questions (So they dont come up in the same order everytime)
    * And adds the question to the question input in html 
    */
    const questionsIndex = Math.floor(Math.random() * availableQestions.length)
    currentQuestion = availableQestions[questionsIndex]
    question.innerText = currentQuestion.question
    /**
    * Reads the choices and inserts them in the answers input in html 
    */
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    /**
    * Removes any questions that have been used
    */
    availableQestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}
/**
 * Selecting answers
 */
choices.forEach(choice => {
    /**
    * listens for an answer to be clicked
    */
    choice.addEventListener('click', e => {
        /**
        * If the quiz is not accepting answers
        */
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        /**
        * If answer is right then add one to the score
        */
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        /**
        *Removes 'correct' or 'incorrect' class  
        */
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)

    })
})

/**
 * Adds to the score
 */
incrementScore = num => {
    score +=num
    /**
    * Adds the score to the html input
    */
    scoreText.innerText = score
    /**
    * Adds the sentence to the total score area
    */
    totalScore.innerText = `You scored ${score} out of ${MAX_QUESTIONS}`
    /**
    * Works out the percentage out've the amount of questions 
    */
    const scorePercentage = Math.round(100 * score/MAX_QUESTIONS)
    /**
     * End sentence that is different, depending on how many correct answers you get. 
     * It also gets your nickname back as an object from the local storage.
     */
    let scorePForEndText = (scorePercentage >= 100) ? `Top marks? That was incredible ${JSON.parse(window.localStorage.getItem(nickname))}!`:
                  (scorePercentage >= 90) ? `Wow ${JSON.parse(window.localStorage.getItem(nickname))} you smashed it! Congratulations.`:
                  (scorePercentage >= 80) ? `Oh no, ${JSON.parse(window.localStorage.getItem(nickname))} that was so closed!`:
                  (scorePercentage >= 70) ? `70% ey ${JSON.parse(window.localStorage.getItem(nickname))} not bad!`:
                  (scorePercentage >= 60) ? `Well done, ${JSON.parse(window.localStorage.getItem(nickname))} you scored 60%!`:
                  (scorePercentage >= 50) ? `Ah you're average ${JSON.parse(window.localStorage.getItem(nickname))}, you scored 50%, try again?`:
                  (scorePercentage >= 40) ? `You aren't there yet ${JSON.parse(window.localStorage.getItem(nickname))}!`:
                  (scorePercentage >= 30) ? `Ahh you could've done better ${JSON.parse(window.localStorage.getItem(nickname))}!`:
                  (scorePercentage >= 20) ? `2 out've 10? Is that all ${JSON.parse(window.localStorage.getItem(nickname))}?`:
                  (scorePercentage >= 10) ? `Is that the best you can do ${JSON.parse(window.localStorage.getItem(nickname))}? Atleast its not 0`:
                `What was that? ${JSON.parse(window.localStorage.getItem(nickname))}!`;

    endText.innerHTML = `${scorePForEndText}`

}

/**
 * Refreshes the page when restart button is clicked
 */
function refreshPage(){
    window.location.reload();
} 

beginGame()