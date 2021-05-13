//Global variables
let chosenDice = []
let diceRolled = []
let currentScore = 0
let highScore = 0
let diceToRoll = 5
let rollCount = 0
let turnCount = 1
let comboChosen = false
let onesChosen = false
let twosChosen = false
let threesChosen = false
let foursChosen = false
let fivesChosen = false
let sixesChosen = false
let threeOfAKindChosen = false
let fourOfAKindChosen = false
let fullHouseChosen = false
let smallStraightChosen = false
let largeStraightChosen = false
let yahtzeeChosen = false
let chanceChosen = false
let player = 1
const gameBoard = document.querySelector('#board')
const playerOneScoreDisplay = document.querySelector('#p1-score')
const twos = document.querySelector('#twos')
const choiceParent = document.querySelector('#chosen-dice')
const playerTwoScoreDisplay = document.querySelector('#high-score')
const turnCounter = document.querySelector('#turn-counter')
const rollCounter = document.querySelector('#roll-counter')
const message = document.querySelector('#message')

let typeWriterCounter = 0
let txt = 'Click on ROLL to get the game going...'
let speed = 45

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
  smallStraightChosen = false
  largeStraightChosen = false
  yahtzeeChosen = false
  chanceChosen = false
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
        chosenDice.push(die)
        let choiceDiv = document.createElement('div')
        choiceDiv.innerHTML = `<img src=images/Dice-${die}.png>`
        choiceParent.appendChild(choiceDiv)
        diceDiv.parentNode.removeChild(diceDiv)
        diceToRoll -= 1
      })
    }
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'BEEP...Your 3 rolls are up, select all die and choose a combo...'
    typeWriter()
    return
  }
}
const nextTurn = () => {
  // if (comboChosen === true) {
  diceToRoll = 5
  chosenDice = []
  dice = []
  rollCount = 0
  if (player === 1) {
    player = 2
    console.log(player)
  } else if (player === 2) {
    turnCount++
    player = 1
    console.log(player)
  }
  console.log(turnCount)
  // console.log(player)
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
const confirm0 = (func, tf) => {
  if (window.confirm(`This will add 0 to the score, is that ok?`)) {
    nextTurn()
    return 'added 0'
  } else {
    return
  }
}
//_____Functions end
//Functions for checking combos
const checkOnes = (arr) => {
  let score = 0
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === 1) score += 1
  }
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
  return 'Not a 3 of a kind!'
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
  return 'Not a 4 of a kind!'
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
  return 'Not a Fullhouse!'
}
const checkSmallStraight = (arr) => {
  let trimedDice = [...new Set(arr)]
  let sortedArr = trimedDice.sort()
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
  return 'Not a small straight!'
}
const checkLargeStraight = (arr) => {
  let sortedArr = arr.sort()
  if (
    sortedArr[0] === sortedArr[1] - 1 &&
    sortedArr[0] === sortedArr[2] - 2 &&
    sortedArr[0] === sortedArr[3] - 3 &&
    sortedArr[0] === sortedArr[4] - 4
  ) {
    return 40
  }
  return 'Not a large straight!'
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
  return 'Not a Yahtzee!'
}
const checkChance = (arr) => {
  return sumDice(arr)
}
//_____Functions for checking combos end

// Event Listeners
document.querySelector('#ones').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()

    return
  }
  if (onesChosen === false) {
    if (checkOnes(chosenDice) !== 0) {
      currentScore += checkOnes(chosenDice)
      playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      onesChosen = true
      document.querySelector('#ones').style.backgroundColor = 'gray'
      document.querySelector('#ones').style.textDecoration = 'line-through'
    } else {
      if (confirm0(checkOnes(chosenDice)) === 'added 0') {
        onesChosen = true
        document.querySelector('#ones').style.backgroundColor = 'gray'
        document.querySelector('#ones').style.textDecoration = 'line-through'
      } else {
        return
      }
    }
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'Combo already chose, choose another!'
    typeWriter()
    return
  }
})
document.querySelector('#twos').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    return
  }
  if (twosChosen === false) {
    if (checkTwos(chosenDice) !== 0) {
      currentScore += checkTwos(chosenDice)
      playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      twosChosen = true
      document.querySelector('#twos').style.backgroundColor = 'gray'
      document.querySelector('#twos').style.textDecoration = 'line-through'
    } else {
      if (confirm0(checkTwos(chosenDice) === 'added 0')) {
        twosChosen = true
        document.querySelector('#twos').style.backgroundColor = 'gray'
        document.querySelector('#twos').style.textDecoration = 'line-through'
      } else {
        return
      }
    }
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'Combo already chose, choose another!'
    typeWriter()
    return
  }
})
document.querySelector('#threes').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    return
  }
  if (threesChosen === false) {
    if (checkThrees(chosenDice) !== 0) {
      currentScore += checkThrees(chosenDice)
      playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      threesChosen = true
      document.querySelector('#threes').style.backgroundColor = 'gray'
      document.querySelector('#threes').style.textDecoration = 'line-through'
    } else {
      if (confirm0(checkThrees(chosenDice) === 'added 0')) {
        threesChosen = true
        document.querySelector('#threes').style.backgroundColor = 'gray'
        document.querySelector('#threes').style.textDecoration = 'line-through'
      } else {
        return
      }
    }
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'Combo already chose, choose another!'
    typeWriter()
    return
  }
})
document.querySelector('#fours').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    return
  }
  if (foursChosen === false) {
    if (checkFours(chosenDice) !== 0) {
      currentScore += checkFours(chosenDice)
      playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      foursChosen = true
      document.querySelector('#fours').style.backgroundColor = 'gray'
      document.querySelector('#fours').style.textDecoration = 'line-through'
    } else {
      if (confirm0(checkFours(chosenDice) === 'added 0')) {
        foursChosen = true
        document.querySelector('#fours').style.backgroundColor = 'gray'
        document.querySelector('#fours').style.textDecoration = 'line-through'
      } else {
        return
      }
    }
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'Combo already chose, choose another!'
    typeWriter()
  }
})
document.querySelector('#fives').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    return
  }
  if (fivesChosen === false) {
    if (checkFives(chosenDice) !== 0) {
      currentScore += checkFives(chosenDice)
      playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      fivesChosen = true
      document.querySelector('#fives').style.backgroundColor = 'gray'
      document.querySelector('#fives').style.textDecoration = 'line-through'
    } else {
      if (confirm0(checkFives(chosenDice) === 'added 0')) {
        fivesChosen = true
        document.querySelector('#fives').style.backgroundColor = 'gray'
        document.querySelector('#fives').style.textDecoration = 'line-through'
      } else {
        return
      }
    }
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'Combo already chose, choose another!'
    typeWriter()
  }
})

document.querySelector('#sixes').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    return
  }
  if (sixesChosen === false) {
    if (checkSixes(chosenDice) !== 0) {
      currentScore += checkSixes(chosenDice)
      playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      sixesChosen = true
      document.querySelector('#sixes').style.backgroundColor = 'gray'
      document.querySelector('#sixes').style.textDecoration = 'line-through'
    } else {
      if (confirm0(checkFives(chosenDice) === 'added 0')) {
        sixesChosen = true
        document.querySelector('#sixes').style.backgroundColor = 'gray'
        document.querySelector('#sixes').style.textDecoration = 'line-through'
      } else {
        return
      }
    }
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'Combo already chose, choose another!'
    typeWriter()
  }
})
document.querySelector('#three-of-kind').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    return
  }
  if (threeOfAKindChosen === false) {
    if (Number.isInteger(check3OfAKind(chosenDice))) {
      currentScore += check3OfAKind(chosenDice)
      playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      threeOfAKindChosen = true
      document.querySelector('#three-of-kind').style.backgroundColor = 'gray'
      document.querySelector('#three-of-kind').style.textDecoration =
        'line-through'
    } else {
      if (confirm0(check3OfAKind(chosenDice)) === 'added 0') {
        threeOfAKindChosen = true
        document.querySelector('#three-of-kind').style.backgroundColor = 'gray'
        document.querySelector('#three-of-kind').style.textDecoration =
          'line-through'
      } else {
        return
      }
    }
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'Combo already chose, choose another!'
    typeWriter()
  }
})
document.querySelector('#four-of-kind').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    return
  }
  if (fourOfAKindChosen === false) {
    if (Number.isInteger(check4OfAKind(chosenDice))) {
      currentScore += check4OfAKind(chosenDice)
      playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      fourOfAKindChosen = true
      document.querySelector('#four-of-kind').style.backgroundColor = 'gray'
      document.querySelector('#four-of-kind').style.textDecoration =
        'line-through'
    } else {
      if (confirm0(check4OfAKind(chosenDice)) === 'added 0') {
        fourOfAKindChosen = true
        document.querySelector('#four-of-kind').style.backgroundColor = 'gray'
        document.querySelector('#four-of-kind').style.textDecoration =
          'line-through'
      } else {
        return
      }
    }
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'Combo already chose, choose another!'
    typeWriter()
  }
})
document.querySelector('#fullhouse').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    return
  }
  if (fullHouseChosen === false) {
    if (Number.isInteger(checkFullHouse(chosenDice))) {
      currentScore += checkFullHouse(chosenDice)
      playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      fullHouseChosen = true
      document.querySelector('#fullhouse').style.backgroundColor = 'gray'
      document.querySelector('#fullhouse').style.textDecoration = 'line-through'
    } else {
      if (confirm0(checkFullHouse(chosenDice)) === 'added 0') {
        fullHouseChosen = true
        document.querySelector('#fullhouse').style.backgroundColor = 'gray'
        document.querySelector('#fullhouse').style.textDecoration =
          'line-through'
      } else {
        return
      }
    }
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'Combo already chose, choose another!'
    typeWriter()
  }
})
document.querySelector('#small-straight').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    return
  }
  if (smallStraightChosen === false) {
    if (Number.isInteger(checkSmallStraight(chosenDice))) {
      currentScore += checkSmallStraight(chosenDice)
      playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      smallStraightChosen = true
      document.querySelector('#small-straight').style.backgroundColor = 'gray'
      document.querySelector('#small-straight').style.textDecoration =
        'line-through'
    } else {
      if (confirm0(checkSmallStraight(chosenDice)) === 'added 0') {
        smallStraightChosen = true
        document.querySelector('#small-straight').style.backgroundColor = 'gray'
        document.querySelector('#small-straight').style.textDecoration =
          'line-through'
      } else {
        return
      }
    }
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'Combo already chose, choose another!'
    typeWriter()
  }
})
document.querySelector('#large-straight').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    return
  }
  if (largeStraightChosen === false) {
    if (Number.isInteger(checkLargeStraight(chosenDice))) {
      currentScore += checkLargeStraight(chosenDice)
      playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      largeStraightChosen = true
      document.querySelector('#large-straight').style.backgroundColor = 'gray'
      document.querySelector('#large-straight').style.textDecoration =
        'line-through'
    } else {
      if (confirm0(checkLargeStraight(chosenDice)) === 'added 0') {
        largeStraightChosen = true
        document.querySelector('#large-straight').style.backgroundColor = 'gray'
        document.querySelector('#large-straight').style.textDecoration =
          'line-through'
      } else {
        return
      }
    }
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'Combo already chose, choose another!'
    typeWriter()
  }
})
document.querySelector('#yahtzee').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    return
  }
  if (yahtzeeChosen === false) {
    if (Number.isInteger(checkYahtzee(chosenDice))) {
      currentScore += checkYahtzee(chosenDice)
      playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      yahtzeeChosen = true
      document.querySelector('#yahtzee').style.backgroundColor = 'gray'
      document.querySelector('#yahtzee').style.textDecoration = 'line-through'
    } else {
      if (confirm0(checkYahtzee(chosenDice)) === 'added 0') {
        yahtzeeChosen = true
        document.querySelector('#yahtzee').style.backgroundColor = 'gray'
        document.querySelector('#yahtzee').style.textDecoration = 'line-through'
      } else {
        return
      }
    }
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'Combo already chose, choose another!'
    typeWriter()
  }
})
document.querySelector('#chance').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    return
  }
  if (chanceChosen === false) {
    currentScore += checkChance(chosenDice)
    playerOneScoreDisplay.innerHTML = `Current Score: ${currentScore}`
    nextTurn()
    chanceChosen = true
    document.querySelector('#chance').style.backgroundColor = 'gray'
    document.querySelector('#chance').style.textDecoration = 'line-through'
  } else {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'Combo already chose, choose another!'
    typeWriter()
  }
})
document.querySelector('#roll').addEventListener('click', () => {
  rollDice()
  // message.innerHTML = ''
  // txt = 'Click on a die to keep it, you can roll again if you need to...BEEP'
  // typeWriterCounter = 0
  // typeWriter()
})
document.querySelector('#new-game').addEventListener('click', () => {
  newGame()
  message.innerHTML = ''
  txt = 'Click on ROLL to get the game going...'
  typeWriterCounter = 0
  typeWriter()
})
document.querySelector('#home').addEventListener('click', () => {
  location.href = 'index.html'
})

// Event Listeners end
