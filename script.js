//Global variables
const resetVariable = () => {
  chosenDice = []
  diceRolled = []
  currentScore = 0
  diceToRoll = 5
  rollCount = 0
  turnCount = 1
  comboChosen = false
  onesChosen = false
  twosChosen = false
  threesChosen = false
  foursChosen = false
  fivesChosen = false
  sixesChosen = false
  threeOfAKindChosen = false
  fourOfAKindChosen = false
  fullHouseChosen = false
  smallStaightChosen = false
  largeStraightChosen = false
  yahtzeeChosen = false
  chanceChosen = false
  gameOver = false
}
resetVariable()
highScore = 0
console.log(turnCount)

const gameBoard = document.querySelector('#board')
const playerOneScoreDisplay = document.querySelector('#score')
const twos = document.querySelector('#twos')
const choiceParent = document.querySelector('#chosen-dice')
const playerTwoScoreDisplay = document.querySelector('#high-score')
const turnCounter = document.querySelector('#turn-counter')
const rollCounter = document.querySelector('#roll-counter')
const message = document.querySelector('#message')

let typeWriterCounter = 0
let txt = 'Click on ROLL to get the game going...'
let speed = 45

let diceSound = document.createElement('audio')
diceSound.src = 'sounds/roll-dice.mp3'
let scoreSound = document.createElement('audio')
scoreSound.src = 'sounds/score.wav'
let score0Sound = document.createElement('audio')
score0Sound.src = 'sounds/0score.wav'
let need5Sound = document.createElement('audio')
need5Sound.src = 'sounds/need-5.wav'
let winSound = document.createElement('audio')
winSound.src = 'sounds/win.mp3'
let dicePopSound = document.createElement('audio')
dicePopSound.src = 'sounds/dice-pop.mp3'

//_____Global variable end
//Funtions (non combo checking)

function typeWriter() {
  if (typeWriterCounter < txt.length) {
    message.innerHTML += txt.charAt(typeWriterCounter)
    typeWriterCounter++
    setTimeout(typeWriter, speed)
  }
}

typeWriter()
const sumDice = (arr) => {
  let sum = 0
  for (i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}

const newGame = () => {
  if (currentScore > highScore) {
    highScore = currentScore
    playerTwoScoreDisplay.innerHTML = `High Score: ${highScore}`
  }
  resetVariable()
  document.querySelector('#ones').style.textDecoration = ''
  document.querySelector('#twos').style.textDecoration = 'none'
  document.querySelector('#threes').style.textDecoration = 'none'
  document.querySelector('#fours').style.textDecoration = 'none'
  document.querySelector('#fives').style.textDecoration = 'none'
  document.querySelector('#sixes').style.textDecoration = 'none'
  document.querySelector('#three-of-kind').style.textDecoration = 'none'
  document.querySelector('#four-of-kind').style.textDecoration = 'none'
  document.querySelector('#fullhouse').style.textDecoration = 'none'
  document.querySelector('#small-straight').style.textDecoration = 'none'
  document.querySelector('#large-straight').style.textDecoration = 'none'
  document.querySelector('#yahtzee').style.textDecoration = 'none'
  document.querySelector('#chance').style.textDecoration = 'none'

  document.querySelector('#ones').style.backgroundColor = 'black'
  document.querySelector('#twos').style.backgroundColor = 'black'
  document.querySelector('#threes').style.backgroundColor = 'black'
  document.querySelector('#fours').style.backgroundColor = 'black'
  document.querySelector('#fives').style.backgroundColor = 'black'
  document.querySelector('#sixes').style.backgroundColor = 'black'
  document.querySelector('#three-of-kind').style.backgroundColor = 'black'
  document.querySelector('#four-of-kind').style.backgroundColor = 'black'
  document.querySelector('#fullhouse').style.backgroundColor = 'black'
  document.querySelector('#small-straight').style.backgroundColor = 'black'
  document.querySelector('#large-straight').style.backgroundColor = 'black'
  document.querySelector('#yahtzee').style.backgroundColor = 'black'
  document.querySelector('#chance').style.backgroundColor = 'black'
  playerOneScoreDisplay.innerHTML = 'Current Score: 0'
  gameBoard.innerHTML = ''
  choiceParent.innerHTML = ''
  turnCounter.innerHTML = 'Turn: 1'
  rollCounter.innerHTML = 'Roll Count: 0'
}

const rollDice = () => {
  if (rollCount < 2) {
    message.innerHTML = ''
    txt = 'Clicking on a die keeps it, roll again if you need to...BEEP'
    typeWriterCounter = 0
    typeWriter()
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'BEEP...Your 3 rolls are up, select all die and choose a combo...'
    typeWriter()
  }
  if (rollCount < 3) {
    diceRolled = []
    gameBoard.innerHTML = ''
    rollCount++
    rollCounter.innerHTML = `Roll Count: ${rollCount}`
    for (i = 0; i < diceToRoll; i++) {
      let die = Math.ceil(Math.random() * 6)
      diceRolled.push(die)
      let diceDiv = document.createElement('div')
      diceDiv.setAttribute('class', `die`)
      diceDiv.innerHTML = `<img src=images/Dice-${die}.png>`
      gameBoard.appendChild(diceDiv)
      diceDiv.addEventListener('click', () => {
        dicePopSound.pause()
        dicePopSound.play()
        chosenDice.push(die)
        let choiceDiv = document.createElement('div')
        choiceDiv.innerHTML = `<img src=images/Dice-${die}.png>`
        choiceParent.appendChild(choiceDiv)
        console.log(chosenDice)
        diceDiv.parentNode.removeChild(diceDiv)
        diceToRoll -= 1
      })
    }
  } else {
    need5Sound.pause()
    need5Sound.play()
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'BEEP...Your 3 rolls are up, select all die and choose a combo...'
    typeWriter()
    return
  }
}

const addScore = (func) => {
  let initialScore = 0
  initialScore = currentScore
  currentScore += func(chosenDice)
  playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
  if (currentScore !== initialScore) {
    scoreSound.play()
  } else if (currentScore === initialScore) {
    score0Sound.play()
  }
  nextTurn()
}

const nextTurn = () => {
  // if (comboChosen === true) {
  if (turnCount === 13) {
    winSound.play()
    if (currentScore > highScore) {
      message.innerHTML = ''
      typeWriterCounter = 0
      txt = 'NEW HIGH SCORE....BEEEeeEEEeP'
      typeWriter()
    } else if (currentScore < highScore) {
      message.innerHTML = ''
      typeWriterCounter = 0
      txt = 'Nice score! but you can do better...BEEP'
      typeWriter()
    }
    gameOver = true
    return
  }
  diceToRoll = 5
  chosenDice = []
  dice = []
  rollCount = 0
  turnCount++
  gameBoard.innerHTML = ''
  choiceParent.innerHTML = ''
  rollCounter.innerHTML = 'Roll Count: 0'
  turnCounter.innerHTML = `Turn: ${turnCount}`
  message.innerHTML = ''
  typeWriterCounter = 0
  txt = 'BEEP...TIME TO ROLL...BEEP'
  typeWriter()
  // }
}

const checkFor5Die = () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    need5Sound.play()
    return false
  }
  return true
}

const comboChosenMessage = () => {
  need5Sound.play()
  message.innerHTML = ''
  typeWriterCounter = 0
  txt = 'You have already used this combo, choose another!'
  typeWriter()
  return
}

//_____Functions end
//Functions for checking combos
const checkOnes = (arr) => {
  let score = 0
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === 1) score += 1
  }
  console.log(score)
  return score
}
const checkTwos = (arr) => {
  let score = 0
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === 2) score += 2
  }
  return score
}
const checkThrees = (arr) => {
  let score = 0
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === 3) score += 3
  }
  return score
}
const checkFours = (arr) => {
  let score = 0
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === 4) score += 4
  }
  return score
}
const checkFives = (arr) => {
  let score = 0
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === 5) score += 5
  }
  return score
}
const checkSixes = (arr) => {
  let score = 0
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === 6) score += 6
  }
  return score
}
const check3OfAKind = (arr) => {
  let sortedArr = arr.sort()
  for (i = 0; i < sortedArr.length; i++) {
    if (
      sortedArr[i] === sortedArr[i + 1] &&
      sortedArr[i] === sortedArr[i + 2]
    ) {
      return sumDice(arr)
    }
  }
  return 0
}
const check4OfAKind = (arr) => {
  let sortedArr = arr.sort()
  for (i = 0; i < sortedArr.length; i++) {
    if (
      sortedArr[i] === sortedArr[i + 1] &&
      sortedArr[i] === sortedArr[i + 2] &&
      sortedArr[i] === sortedArr[i + 3]
    ) {
      return sumDice(arr)
    }
  }
  return 0
}
const checkFullHouse = (arr) => {
  let sortedArr = arr.sort()
  if (
    (sortedArr[0] === sortedArr[1] &&
      sortedArr[2] === sortedArr[3] &&
      sortedArr[2] === sortedArr[4]) ||
    (sortedArr[0] === sortedArr[1] &&
      sortedArr[0] === sortedArr[2] &&
      sortedArr[3] === sortedArr[4])
  ) {
    return 25
  }
  return 0
}
const checkSmallStraight = (arr) => {
  let trimedDice = [...new Set(arr)]
  let sortedArr = trimedDice.sort()
  console.log(sortedArr)
  if (
    (sortedArr[0] === sortedArr[1] - 1 &&
      sortedArr[0] === sortedArr[2] - 2 &&
      sortedArr[0] === sortedArr[3] - 3) ||
    (sortedArr[1] === sortedArr[2] - 1 &&
      sortedArr[1] === sortedArr[3] - 2 &&
      sortedArr[1] === sortedArr[4] - 3)
  ) {
    return 30
  }
  return 0
}
const checkLargeStraight = (arr) => {
  let sortedArr = arr.sort()
  console.log(sortedArr)
  if (
    sortedArr[0] === sortedArr[1] - 1 &&
    sortedArr[0] === sortedArr[2] - 2 &&
    sortedArr[0] === sortedArr[3] - 3 &&
    sortedArr[0] === sortedArr[4] - 4
  ) {
    return 40
  }
  return 0
}
const checkYahtzee = (arr) => {
  if (
    arr[0] === arr[1] &&
    arr[0] === arr[2] &&
    arr[0] === arr[3] &&
    arr[0] === arr[4]
  ) {
    return 50
  }
  return 0
}
const checkChance = (arr) => {
  return sumDice(arr)
}
//_____Functions for checking combos end

// Event Listeners
document.querySelector('#ones').addEventListener('click', () => {
  if (checkFor5Die() === true) {
    if (onesChosen === false) {
      addScore(checkOnes)
      onesChosen = true
      document.querySelector('#ones').style.backgroundColor = 'gray'
      document.querySelector('#ones').style.textDecoration = 'line-through'
    } else {
      comboChosenMessage()
    }
  }
  return
})

document.querySelector('#twos').addEventListener('click', () => {
  if (checkFor5Die() === true) {
    if (twosChosen === false) {
      addScore(checkTwos)
      twosChosen = true
      document.querySelector('#twos').style.backgroundColor = 'gray'
      document.querySelector('#twos').style.textDecoration = 'line-through'
    } else {
      comboChosenMessage()
    }
  }
  return
})

document.querySelector('#threes').addEventListener('click', () => {
  if (checkFor5Die() === true) {
    if (threesChosen === false) {
      addScore(checkThrees)
      threesChosen = true
      document.querySelector('#threes').style.backgroundColor = 'gray'
      document.querySelector('#threes').style.textDecoration = 'line-through'
    } else {
      comboChosenMessage()
    }
  }
  return
})

document.querySelector('#fours').addEventListener('click', () => {
  if (checkFor5Die() === true) {
    if (foursChosen === false) {
      addScore(checkFours)
      foursChosen = true
      document.querySelector('#fours').style.backgroundColor = 'gray'
      document.querySelector('#fours').style.textDecoration = 'line-through'
    } else {
      comboChosenMessage()
    }
  }
  return
})

document.querySelector('#fives').addEventListener('click', () => {
  if (checkFor5Die() === true) {
    if (fivesChosen === false) {
      addScore(checkFives)
      fivesChosen = true
      document.querySelector('#fives').style.backgroundColor = 'gray'
      document.querySelector('#fives').style.textDecoration = 'line-through'
    } else {
      comboChosenMessage()
    }
  }
  return
})

document.querySelector('#sixes').addEventListener('click', () => {
  if (checkFor5Die() === true) {
    if (sixesChosen === false) {
      addScore(checkSixes)
      sixesChosen = true
      document.querySelector('#sixes').style.backgroundColor = 'gray'
      document.querySelector('#sixes').style.textDecoration = 'line-through'
    } else {
      comboChosenMessage()
    }
  }
  return
})

document.querySelector('#three-of-kind').addEventListener('click', () => {
  if (checkFor5Die() === true) {
    if (threeOfAKindChosen === false) {
      addScore(check3OfAKind)
      threeOfAKindChosen = true
      document.querySelector('#three-of-kind').style.backgroundColor = 'gray'
      document.querySelector('#three-of-kind').style.textDecoration =
        'line-through'
    } else {
      comboChosenMessage()
    }
  }
  return
})

document.querySelector('#four-of-kind').addEventListener('click', () => {
  if (checkFor5Die() === true) {
    if (fourOfAKindChosen === false) {
      addScore(check4OfAKind)
      fourOfAKindChosen = true
      document.querySelector('#four-of-kind').style.backgroundColor = 'gray'
      document.querySelector('#four-of-kind').style.textDecoration =
        'line-through'
    } else {
      comboChosenMessage()
    }
  }
  return
})

document.querySelector('#fullhouse').addEventListener('click', () => {
  if (checkFor5Die() === true) {
    if (fullHouseChosen === false) {
      addScore(checkFullHouse)
      fullHouseChosen = true
      document.querySelector('#fullhouse').style.backgroundColor = 'gray'
      document.querySelector('#fullhouse').style.textDecoration = 'line-through'
    } else {
      comboChosenMessage()
    }
  }
  return
})

document.querySelector('#small-straight').addEventListener('click', () => {
  if (checkFor5Die() === true) {
    if (smallStaightChosen === false) {
      addScore(checkSmallStraight)
      smallStaightChosen = true
      document.querySelector('#small-straight').style.backgroundColor = 'gray'
      document.querySelector('#small-straight').style.textDecoration =
        'line-through'
      console.log(smallStaightChosen)
    } else {
      comboChosenMessage()
    }
  }
  return
})

document.querySelector('#large-straight').addEventListener('click', () => {
  if (checkFor5Die() === true) {
    if (largeStraightChosen === false) {
      addScore(checkLargeStraight)
      largeStraightChosen = true
      document.querySelector('#large-straight').style.backgroundColor = 'gray'
      document.querySelector('#large-straight').style.textDecoration =
        'line-through'
    } else {
      comboChosenMessage()
    }
  }
  return
})

document.querySelector('#yahtzee').addEventListener('click', () => {
  if (checkFor5Die() === true) {
    if (yahtzeeChosen === false) {
      addScore(checkYahtzee)
      yahtzeeChosen = true
      document.querySelector('#yahtzee').style.backgroundColor = 'gray'
      document.querySelector('#yahtzee').style.textDecoration = 'line-through'
    } else {
      comboChosenMessage()
    }
  }
  return
})

document.querySelector('#chance').addEventListener('click', () => {
  if (checkFor5Die() === true) {
    if (chanceChosen === false) {
      addScore(checkChance)
      chanceChosen = true
      document.querySelector('#chance').style.backgroundColor = 'gray'
      document.querySelector('#chance').style.textDecoration = 'line-through'
    } else {
      comboChosenMessage()
    }
  }
  return
})

document.querySelector('#roll').addEventListener('click', () => {
  if (gameOver === true) {
    need5Sound.play()
    return
  }
  if (turnCount === 14) {
    return
  }
  if (diceToRoll > 0 && rollCount < 3) {
    diceSound.pause()
    diceSound.play()
  }
  rollDice()
})
document.querySelector('#new-game').addEventListener('click', () => {
  newGame()
  console.log('clicked')
  message.innerHTML = ''
  txt = 'Click on ROLL to get the game going...'
  typeWriterCounter = 0
  typeWriter()
})
document.querySelector('#home').addEventListener('click', () => {
  location.href = 'index.html'
})
// Event Listeners end
