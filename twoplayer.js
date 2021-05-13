//Global variables
let chosenDice = []
let diceRolled = []
let playerOneScore = 0
let playerTwoScore = 0
let diceToRoll = 5
let rollCount = 0
let turnCount = 1
let comboChosenP1 = false
let onesChosenP1 = false
let twosChosenP1 = false
let threesChosenP1 = false
let foursChosenP1 = false
let fivesChosenP1 = false
let sixesChosenP1 = false
let threeOfAKindChosenP1 = false
let fourOfAKindChosenP1 = false
let fullHouseChosenP1 = false
let smallStraightChosenP1 = false
let largeStraightChosenP1 = false
let yahtzeeChosenP1 = false
let chanceChosenP1 = false
let onesChosenP2 = false
let twosChosenP2 = false
let threesChosenP2 = false
let foursChosenP2 = false
let fivesChosenP2 = false
let sixesChosenP2 = false
let threeOfAKindChosenP2 = false
let fourOfAKindChosenP2 = false
let fullHouseChosenP2 = false
let smallStraightChosenP2 = false
let largeStraightChosenP2 = false
let yahtzeeChosenP2 = false
let chanceChosenP2 = false
let player = 1
const gameBoard = document.querySelector('#board')
const playerOneScoreDisplay = document.querySelector('#p1-score')
const playerTwoScoreDisplay = document.querySelector('#p2-score')
const twos = document.querySelector('#twos')
const choiceParent = document.querySelector('#chosen-dice')
const turnCounter = document.querySelector('#turn-counter')
const rollCounter = document.querySelector('#roll-counter')
const message = document.querySelector('#message')

playerOneScoreDisplay.style.color = 'blue'
playerTwoScoreDisplay.style.color = 'white'

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
  if (playerOneScore > highScore) {
    highScore = playerOneScore
    playerTwoScoreDisplay.innerHTML = `High Score: ${highScore}`
  }
  chosenDice = []
  diceRolled = []
  playerOneScore = 0
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
  playerOneScoreDisplay.innerHTML = 'Player 1: 0'
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
    playerOneScoreDisplay.style.color = 'white'
    playerTwoScoreDisplay.style.color = 'red'
  } else if (player === 2) {
    playerOneScoreDisplay.style.color = 'blue'
    playerTwoScoreDisplay.style.color = 'white'
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
const addScore = (func) => {
  if (player === 1) {
    playerOneScore += func(chosenDice)
    playerOneScoreDisplay.innerHTML = `Player 1: ${playerOneScore}`
  } else if (player === 2) {
    playerTwoScore += func(chosenDice)
    playerTwoScoreDisplay.innerHTML = `Player 2: ${playerTwoScore}`
  }
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
  if (chosenDice.length < 5) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = "Make sure you've chosen 5 dice!"
    typeWriter()
    return
  }
  if (
    (player === 1 && onesChosenP1 === true) ||
    (player === 2 && onesChosenP2 === true)
  ) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'You have already used this combo, choose another!'
    typeWriter()
    return
  }
  addScore(checkOnes)
  if (player === 1) {
    document.querySelector('#onesp1').style.color = 'white'
    onesChosenP1 = true
    nextTurn()
  } else if (player === 2) {
    document.querySelector('#onesp2').style.color = 'white'
    onesChosenP2 = true
    nextTurn()
  }
  if (onesChosenP1 === true && onesChosenP2 === true) {
    document.querySelector('#ones').style.backgroundColor = 'gray'
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
  if (
    (player === 1 && twosChosenP1 === true) ||
    (player === 2 && twosChosenP2 === true)
  ) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'You have already used this combo, choose another!'
    typeWriter()
    return
  }
  addScore(checkTwos)
  if (player === 1) {
    document.querySelector('#twosp1').style.color = 'white'
    twosChosenP1 = true
    nextTurn()
  } else if (player === 2) {
    document.querySelector('#twosp2').style.color = 'white'
    twosChosenP2 = true
    nextTurn()
  }
  if (twosChosenP1 === true && twosChosenP2 === true) {
    document.querySelector('#twos').style.backgroundColor = 'gray'
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
  if (
    (player === 1 && threesChosenP1 === true) ||
    (player === 2 && threesChosenP2 === true)
  ) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'You have already used this combo, choose another!'
    typeWriter()
    return
  }
  addScore(checkThrees)
  if (player === 1) {
    document.querySelector('#threesp1').style.color = 'white'
    threesChosenP1 = true
    nextTurn()
  } else if (player === 2) {
    document.querySelector('#threesp2').style.color = 'white'
    threesChosenP2 = true
    nextTurn()
  }
  if (threesChosenP1 === true && threesChosenP2 === true) {
    document.querySelector('#threes').style.backgroundColor = 'gray'
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
  if (
    (player === 1 && foursChosenP1 === true) ||
    (player === 2 && foursChosenP2 === true)
  ) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'You have already used this combo, choose another!'
    typeWriter()
    return
  }
  addScore(checkFours)
  if (player === 1) {
    document.querySelector('#foursp1').style.color = 'white'
    foursChosenP1 = true
    nextTurn()
  } else if (player === 2) {
    document.querySelector('#foursp2').style.color = 'white'
    foursChosenP2 = true
    nextTurn()
  }
  if (foursChosenP1 === true && foursChosenP2 === true) {
    document.querySelector('#fours').style.backgroundColor = 'gray'
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
  if (
    (player === 1 && fivesChosenP1 === true) ||
    (player === 2 && fivesChosenP2 === true)
  ) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'You have already used this combo, choose another!'
    typeWriter()
    return
  }
  addScore(checkFives)
  if (player === 1) {
    document.querySelector('#fivesp1').style.color = 'white'
    fivesChosenP1 = true
    nextTurn()
  } else if (player === 2) {
    document.querySelector('#fivesp2').style.color = 'white'
    fivesChosenP2 = true
    nextTurn()
  }
  if (fivesChosenP1 === true && fivesChosenP2 === true) {
    document.querySelector('#fives').style.backgroundColor = 'gray'
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
  if (
    (player === 1 && sixesChosenP1 === true) ||
    (player === 2 && sixesChosenP2 === true)
  ) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'You have already used this combo, choose another!'
    typeWriter()
    return
  }
  addScore(checkSixes)
  if (player === 1) {
    document.querySelector('#sixesp1').style.color = 'white'
    onesChosenP1 = true
    nextTurn()
  } else if (player === 2) {
    document.querySelector('#sixesp2').style.color = 'white'
    onesChosenP2 = true
    nextTurn()
  }
  if (sixesChosenP1 === true && sixesChosenP2 === true) {
    document.querySelector('#sixes').style.backgroundColor = 'gray'
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
  if (
    (player === 1 && threeOfAKindChosenP1 === true) ||
    (player === 2 && threeOfAKindChosenP2 === true)
  ) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'You have already used this combo, choose another!'
    typeWriter()
    return
  }
  addScore(check3OfAKind)
  if (player === 1) {
    document.querySelector('#three-of-kindp1').style.color = 'white'
    threeOfAKindChosenP1 = true
    nextTurn()
  } else if (player === 2) {
    document.querySelector('#three-of-kindp2').style.color = 'white'
    threeOfAKindChosenP2 = true
    nextTurn()
  }
  if (threeOfAKindChosenP1 === true && threeOfAKindChosenP2 === true) {
    document.querySelector('#three-of-kind').style.backgroundColor = 'gray'
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
  if (
    (player === 1 && fourOfAKindChosenP1 === true) ||
    (player === 2 && fourOfAKindChosenP2 === true)
  ) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'You have already used this combo, choose another!'
    typeWriter()
    return
  }
  addScore(check4OfAKind)
  if (player === 1) {
    document.querySelector('#four-of-kindp1').style.color = 'white'
    fourOfAKindChosenP1 = true
    nextTurn()
  } else if (player === 2) {
    document.querySelector('#four-of-kindp2').style.color = 'white'
    fourOfAKindChosenP2 = true
    nextTurn()
  }
  if (fourOfAKindChosenP1 === true && fourOfAKindChosenP2 === true) {
    document.querySelector('#four-of-kind').style.backgroundColor = 'gray'
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
  if (
    (player === 1 && fullHouseChosenP1 === true) ||
    (player === 2 && fullHouseChosenP2 === true)
  ) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'You have already used this combo, choose another!'
    typeWriter()
    return
  }
  addScore(checkFullHouse)
  if (player === 1) {
    document.querySelector('#fullhousep1').style.color = 'white'
    fullHouseChosenP1 = true
    nextTurn()
  } else if (player === 2) {
    document.querySelector('#fullhousep2').style.color = 'white'
    fullHouseChosenP2 = true
    nextTurn()
  }
  if (fullHouseChosenP1 === true && fullHouseChosenP2 === true) {
    document.querySelector('#fullhouse').style.backgroundColor = 'gray'
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
  if (
    (player === 1 && smallStraightChosenP1 === true) ||
    (player === 2 && smallStraightChosenP2 === true)
  ) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'You have already used this combo, choose another!'
    typeWriter()
    return
  }
  addScore(checkSmallStraight)
  if (player === 1) {
    document.querySelector('#small-straightp1').style.color = 'white'
    smallStraightChosenP1 = true
    nextTurn()
  } else if (player === 2) {
    document.querySelector('#small-straightp2').style.color = 'white'
    smallStraightChosenP2 = true
    nextTurn()
  }
  if (smallStraightChosenP1 === true && smallStraightChosenP2 === true) {
    document.querySelector('#small-straight').style.backgroundColor = 'gray'
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
  if (
    (player === 1 && largeStraightChosenP1 === true) ||
    (player === 2 && largeStraightChosenP2 === true)
  ) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'You have already used this combo, choose another!'
    typeWriter()
    return
  }
  addScore(checkLargeStraight)
  if (player === 1) {
    document.querySelector('#large-straightp1').style.color = 'white'
    largeStraightChosenP1 = true
    nextTurn()
  } else if (player === 2) {
    document.querySelector('#large-straightp2').style.color = 'white'
    largeStraightChosenP2 = true
    nextTurn()
  }
  if (largeStraightChosenP1 === true && largeStraightChosenP2 === true) {
    document.querySelector('#large-straight').style.backgroundColor = 'gray'
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
  if (
    (player === 1 && yahtzeeChosenP1 === true) ||
    (player === 2 && yahtzeeChosenP2 === true)
  ) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'You have already used this combo, choose another!'
    typeWriter()
    return
  }
  addScore(checkYahtzee)
  if (player === 1) {
    document.querySelector('#yahtzeep1').style.color = 'white'
    yahtzeeChosenP1 = true
    nextTurn()
  } else if (player === 2) {
    document.querySelector('#yahtzeep2').style.color = 'white'
    yahtzeeChosenP2 = true
    nextTurn()
  }
  if (yahtzeeChosenP1 === true && yahtzeeChosenP2 === true) {
    document.querySelector('#yahtzee').style.backgroundColor = 'gray'
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
  if (
    (player === 1 && chanceChosenP1 === true) ||
    (player === 2 && chanceChosenP2 === true)
  ) {
    message.innerHTML = ''
    typeWriterCounter = 0
    txt = 'You have already used this combo, choose another!'
    typeWriter()
    return
  }
  addScore(checkChance)
  if (player === 1) {
    document.querySelector('#chancep1').style.color = 'white'
    chanceChosenP1 = true
    nextTurn()
  } else if (player === 2) {
    document.querySelector('#chancep2').style.color = 'white'
    chanceChosenP2 = true
    nextTurn()
  }
  if (chanceChosenP1 === true && chanceChosenP2 === true) {
    document.querySelector('#chance').style.backgroundColor = 'gray'
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
