const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: ' The resistance of a wire is 5 ohm at 50°C and 6 ohm at 100°C. The resistance of the wire at 0°C will be',
    answers: [
      { text: '3 ohm', correct: false },
      { text: '4 ohm', correct: true }
    ]
  },
  {
    question: 'A piece of copper and another of germanium are cooled from room temperature to 77 K, the resistance of',
    answers: [
      { text: 'both of them increases', correct: false },
      { text: 'both of them decreases', correct: false },
      { text: 'Copper increases and Germanium decreases', correct: true },
      { text: 'Copper decreases and Germanium increases', correct: false }
    ]
  },
  {
    question: 'Alternating current cannot be measured by D.C ammeter because',
    answers: [
      { text: ' A.C cannot pass through D.C ammeter', correct: false },
      { text: 'A.C changes direction', correct: false },
      { text: 'The average value of current for the complete cycle is zero', correct: true },
      { text: 'D.C. ammeter will get damaged', correct: false }
    ]
  },
  {
    question: 'If a wire is stretched to make it 0.1% longer, its resistance will',
    answers: [
      { text: 'increase by 0.2%', correct: true },
      { text: 'decrease by 0.2%', correct: false }
    ]
  }
]
