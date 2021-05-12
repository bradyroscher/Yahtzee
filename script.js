//Global variables
let chosenDice = []
let diceRolled = []
let currentScore = 0
let highScore = 0
let diceToRoll = 5
let timesRolled = 0
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
const gameBoard = document.querySelector('#board')
const scoreDisplay = document.querySelector('#score')
const twos = document.querySelector('#twos')
const choiceParent = document.querySelector('#chosen-dice')

//_____Global variable end
//Funtions (non combo checking)
const sumDice = (arr) => {
  let sum = 0
  for (i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}
const rollDice = () => {
  if (timesRolled < 3) {
    diceRolled = []
    gameBoard.innerHTML = ''
    timesRolled++
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
        console.log(chosenDice)
        diceDiv.parentNode.removeChild(diceDiv)
        diceToRoll -= 1
      })
    }
  } else {
    alert("You've already rolled thrice, time to chose a combo!")
  }
}
const nextTurn = () => {
  // if (comboChosen === true) {
  diceToRoll = 5
  chosenDice = []
  dice = []
  timesRolled = 0
  gameBoard.innerHTML = ''
  choiceParent.innerHTML = ''
  // }
  // alert('No combo has been chosen.')
}
const confirm0 = (func, tf) => {
  if (confirm(`This will add 0 to the score, is that ok?`)) {
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
    sortedArr[0] === sortedArr[1] &&
    sortedArr[2] === sortedArr[3] &&
    sortedArr[2] === sortedArr[4]
  ) {
    return 25
  } else if (
    sortedArr[0] === sortedArr[1] &&
    sortedArr[0] === sortedArr[2] &&
    sortedArr[3] === sortedArr[4]
  ) {
    return 25
  }
  return 'Not a Fullhouse!'
}
const checkSmallStraight = (arr) => {
  let trimedDice = [...new Set(arr)]
  let sortedArr = trimedDice.sort()
  console.log(sortedArr)
  if (
    sortedArr[0] === sortedArr[1] - 1 &&
    sortedArr[0] === sortedArr[2] - 2 &&
    sortedArr[0] === sortedArr[3] - 3
  ) {
    return 30
  }
  return 'Not a small straight!'
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
    alert("Make sure you've chosen 5 dice!")
    return
  }
  if (onesChosen === false) {
    if (checkOnes(chosenDice) !== 0) {
      currentScore += checkOnes(chosenDice)
      scoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      console.log(score)
      onesChosen = true
      document.querySelector('#ones').style.color = 'orange'
    } else {
      if (confirm0(checkOnes(chosenDice)) === 'added 0') {
        onesChosen = true
      } else {
        return
      }
    }
  } else {
    alert('Combo already chose, choose another!')
  }
})
document.querySelector('#twos').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    alert("Make sure you've chosen 5 dice!")
    return
  }
  if (twosChosen === false) {
    if (checkTwos(chosenDice) !== 0) {
      currentScore += checkTwos(chosenDice)
      scoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      console.log(score)
      twosChosen = true
      document.querySelector('#twos').style.color = 'orange'
    } else {
      if (confirm0(checkTwos(chosenDice) === 'added 0')) {
        twosChosen = true
      } else {
        return
      }
    }
  } else {
    alert('Combo already chose, choose another!')
  }
})
document.querySelector('#threes').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    alert("Make sure you've chosen 5 dice!")
    return
  }
  if (threesChosen === false) {
    if (checkThrees(chosenDice) !== 0) {
      currentScore += checkThrees(chosenDice)
      scoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      console.log(score)
      threesChosen = true
      document.querySelector('#threes').style.color = 'orange'
    } else {
      if (confirm0(checkThrees(chosenDice) === 'added 0')) {
        threesChosen = true
      } else {
        return
      }
    }
  } else {
    alert('Combo already chose, choose another!')
  }
})
document.querySelector('#fours').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    alert("Make sure you've chosen 5 dice!")
    return
  }
  if (foursChosen === false) {
    if (checkFours(chosenDice) !== 0) {
      currentScore += checkFours(chosenDice)
      scoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      console.log(score)
      foursChosen = true
      document.querySelector('#fours').style.color = 'orange'
    } else {
      if (confirm0(checkFours(chosenDice) === 'added 0')) {
        foursChosen = true
      } else {
        return
      }
    }
  } else {
    alert('Combo already chose, choose another!')
  }
})
document.querySelector('#fives').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    alert("Make sure you've chosen 5 dice!")
    return
  }
  if (fivesChosen === false) {
    if (checkFives(chosenDice) !== 0) {
      currentScore += checkFives(chosenDice)
      scoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      fivesChosen = true
      document.querySelector('#fives').style.color = 'orange'
    } else {
      if (confirm0(checkFives(chosenDice) === 'added 0')) {
        fivesChosen = true
      } else {
        return
      }
    }
  } else {
    alert('Combo already chose, choose another!')
  }
})

document.querySelector('#sixes').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    alert("Make sure you've chosen 5 dice!")
    return
  }
  if (sixesChosen === false) {
    if (checkSixes(chosenDice) !== 0) {
      currentScore += checkSixes(chosenDice)
      scoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      console.log(score)
      sixesChosen = true
      document.querySelector('#sixes').style.color = 'orange'
    } else {
      if (confirm0(checkFives(chosenDice) === 'added 0')) {
        sixesChosen = true
        document.querySelector('#sixes').style.color = 'orange'
      } else {
        return
      }
    }
  } else {
    alert('Combo already chose, choose another!')
  }
})
document.querySelector('#three-of-kind').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    alert("Make sure you've chosen 5 dice!")
    return
  }
  if (threeOfAKindChosen === false) {
    if (Number.isInteger(check3OfAKind(chosenDice))) {
      currentScore += check3OfAKind(chosenDice)
      scoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      console.log(score)
      threeOfAKindChosen = true
      document.querySelector('#three-of-kind').style.color = 'orange'
    } else {
      if (confirm0(check3OfAKind(chosenDice)) === 'added 0') {
        threeOfAKindChosen = true
        document.querySelector('#three-of-kind').style.color = 'orange'
      } else {
        return
      }
    }
  } else {
    alert('Combo already chose, choose another!')
  }
})
document.querySelector('#four-of-kind').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    alert("Make sure you've chosen 5 dice!")
    return
  }
  if (fourOfAKindChosen === false) {
    if (Number.isInteger(check4OfAKind(chosenDice))) {
      currentScore += check4OfAKind(chosenDice)
      scoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      fourOfAKindChosen = true
      document.querySelector('#four-of-kind').style.color = 'orange'
      console.log(score)
    } else {
      if (confirm0(check4OfAKind(chosenDice)) === 'added 0') {
        fourOfAKindChosen = true
        document.querySelector('#four-of-kind').style.color = 'orange'
      } else {
        return
      }
    }
  } else {
    alert('Combo already chose, choose another!')
  }
})
document.querySelector('#fullhouse').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    alert("Make sure you've chosen 5 dice!")
    return
  }
  if (fullHouseChosen === false) {
    if (Number.isInteger(checkFullHouse(chosenDice))) {
      currentScore += checkFullHouse(chosenDice)
      scoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      fullHouseChosen = true
      document.querySelector('#fullhouse').style.color = 'orange'
      console.log(score)
    } else {
      if (confirm0(checkFullHouse(chosenDice)) === 'added 0') {
        fullHouseChosen = true
        document.querySelector('#fullhouse').style.color = 'orange'
      } else {
        return
      }
    }
  } else {
    alert('Combo already chose, choose another!')
  }
})
document.querySelector('#small-straight').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    alert("Make sure you've chosen 5 dice!")
    return
  }
  if (smallStraightChosen === false) {
    if (Number.isInteger(checkSmallStraight(chosenDice))) {
      currentScore += checkSmallStraight(chosenDice)
      scoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      smallStraightChosen = true
      document.querySelector('#small-straight').style.color = 'orange'
      console.log(score)
    } else {
      if (confirm0(checkSmallStraight(chosenDice)) === 'added 0') {
        smallStraightChosen = true
        document.querySelector('#small-straight').style.color = 'orange'
      } else {
        return
      }
    }
  } else {
    alert('Combo already chose, choose another!')
  }
})
document.querySelector('#large-straight').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    alert("Make sure you've chosen 5 dice!")
    return
  }
  if (largeStraightChosen === false) {
    if (Number.isInteger(checkLargeStraight(chosenDice))) {
      currentScore += checkLargeStraight(chosenDice)
      scoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      largeStraightChosen = true
      document.querySelector('#large-straight').style.color = 'orange'
      console.log(score)
    } else {
      if (confirm0(checkLargeStraight(chosenDice)) === 'added 0') {
        largeStraightChosen = true
        document.querySelector('#large-straight').style.color = 'orange'
      } else {
        return
      }
    }
  } else {
    alert('Combo already chose, choose another!')
  }
})
document.querySelector('#yahtzee').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    alert("Make sure you've chosen 5 dice!")
    return
  }
  if (yahtzeeChosen === false) {
    if (Number.isInteger(checkYahtzee(chosenDice))) {
      currentScore += checkYahtzee(chosenDice)
      scoreDisplay.innerHTML = `Current Score: ${currentScore}`
      nextTurn()
      yahtzeeChosen = true
      document.querySelector('#yahtzee').style.color = 'orange'
      console.log(score)
    } else {
      if (confirm0(checkYahtzee(chosenDice)) === 'added 0') {
        yahtzeeChosen = true
        document.querySelector('#yahtzee').style.color = 'orange'
      } else {
        return
      }
    }
  } else {
    alert('Combo already chose, choose another!')
  }
})
document.querySelector('#chance').addEventListener('click', () => {
  if (chosenDice.length < 5) {
    alert("Make sure you've chosen 5 dice!")
    return
  }
  if (chanceChosen === false) {
    currentScore += checkChance(chosenDice)
    scoreDisplay.innerHTML = `Current Score: ${currentScore}`
    nextTurn()
    chanceChosen = true
    document.querySelector('#chance').style.color = 'orange'
    console.log(score)
  } else {
    alert('Combo already chose, choose another!')
  }
})
document.querySelector('#roll').addEventListener('click', () => {
  rollDice()
})
// document.querySelector('#next').addEventListener('click', ())
// Event Listeners end
