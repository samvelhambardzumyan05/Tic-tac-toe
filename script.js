const classX = 'x'
const classO = 'circle'
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const elem = document.querySelectorAll('[tup]')
const board = document.getElementById('board')
const winMes = document.getElementById('end')
const restartButton = document.getElementById('restartButton')
const winText = document.querySelector('[data-winning-message-text]')

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  OTurn = false
  elem.forEach(i => {
    i.classList.remove(classX)
    i.classList.remove(classO)
    i.addEventListener('click', Click)
  })

  winMes.classList.remove('show')
}

function Click(e) {
  const cell = e.target

  const XorO = OTurn ? classO : classX

  placeMark(cell, XorO)
  if (checkWin(XorO)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()

  }
}

function isDraw() {
  return [...elem].every(cell => {
    return cell.classList.contains(classX) || cell.classList.contains(classO)
  })
}

function placeMark(cell, XorO) {
  cell.classList.add(XorO)
}

function swapTurns() {
  OTurn = !OTurn
}
function endGame(draw) {
  if (draw) {
    winText.innerText = 'Draw!'
  } else {
    winText.innerText = `${OTurn ? "O's" : "X's"} Wins!`
  }
  winMes.classList.add('show')
}

function checkWin(XorO) {
  return wins.some(combination => {
    return combination.every(index => {
      return elem[index].classList.contains(XorO)
    })
  })
}