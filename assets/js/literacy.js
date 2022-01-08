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
        question: 'The Invisible Man , a classic science fiction novel, was written by what author?',
        choice1: 'Robert Louis Stevenson', 
        choice2: 'Jules Vern',
        choice3: 'Oscar Wilde',
        choice4: 'H. G. Wells',
        answer: 4
    },
    {
        question: 'According to the book "Lost Horizon", where was the fictional city  of Shangri-La located?',
        choice1: 'An island in the South Pacific', 
        choice2: 'The mountains of Tibet', 
        choice3: 'The jungles of Africa', 
        choice4: 'The jungles of Brazil',
        answer: 2
    },
    {
        question: 'Who was the author of "Rip Van Winkle"?',
        choice1: 'James Fennimore Cooper', 
        choice2: 'Washington Irving', 
        choice3: 'Robert Louis Stevenson',
        choice4: 'Nathaniel Hawthorne',
        answer: 2
    },
    {
        question: "In a Mark twain novel, a mechanic from what New England state went back in time and visited King Arthur's court?",
        choice1: 'Connecticut', 
        choice2: 'Massachusetts', 
        choice3: 'Rhode Island', 
        choice4: 'New Hampshire',
        answer: 1
    },
    {
        question: 'Who are the men in the nursery rhyme that begins, "Rub-a-dub-db / Three men in a tub."',
        choice1: "Solomon Grundy's children",
        choice2: 'The butcher, the baker, the candlestick maker', 
        choice3: 'The three musketeers',
        choice4: 'Three men of Gotham',
        answer: 2
    },
    {
        question: `In Charles Dickens's novel "A Tale of Two Cities", what are names of the two cities?`,
        choice1: 'Boston and New York', 
        choice2: 'Rome and Venice', 
        choice3: 'Brussels and Moscow', 
        choice4: 'London and Paris',
        answer: 4
    },
    {
        question: 'What subject are the series of books, Birnbaum, Fielding, Fodor, and Frommer written about?',
        choice1: 'Cooking',
        choice2: 'Computers',
        choice3: 'Travel', 
        choice4: 'Nature',
        answer: 3
    },
    {
        question: 'In Alice in Wonderland, which character is most often seen weeping?',
        choice1: 'Bill the Lizard', 
        choice2: 'The Dormouse', 
        choice3: 'The Gryphon', 
        choice4: 'The Mock Turtle',
        answer: 4
    },
    {
        question: 'Which of the following authors was not also a doctor?',
        choice1: 'Anton Chekhov', 
        choice2: 'Somerset Maugham', 
        choice3: 'Voltaire',
        choice4: 'William Carlos Williams',
        answer: 3
    },
    {
        question: "From Gulliver's Travels, in what year was Lemuel Gulliver ship wrecked on Lilliput?", 
        choice1: '1599',
        choice2: '1699',
        choice3: '1799',
        choice4: '1899',
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