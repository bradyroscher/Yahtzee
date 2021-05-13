const singlePlayer = document.querySelector('#singleplayer')
const twoPlayer = document.querySelector('#twoplayer')
const rules = document.querySelector('#rules')

singlePlayer.addEventListener('click', () => {
  location.href = 'singleplayer.html'
})
rules.addEventListener('click', () => {
  location.href = 'rules.html'
})
twoPlayer.addEventListener('click', () => {
  location.href = 'twoplayer.html'
})
