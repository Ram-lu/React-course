import { TURNS, WINNER_COMBOS } from '../constants'

export const checkWinner = (boardToCheck, WINNER_COMBOS) =>
  WINNER_COMBOS.reduce(
    (winner, [a, b, c]) => winner || (boardToCheck[a] &&
           boardToCheck[a] === boardToCheck[b] &&
           boardToCheck[a] === boardToCheck[c]
      ? boardToCheck[a]
      : null),
    null)

export const checkEndGame = boardToCheck => boardToCheck.includes(null) ? true : null

export const updateBoardLogic = (index, board, winner, turn, setBoard, setTurn, setWinner) => {
  if (board[index] || winner) return

  const newBoard = [...board]
  newBoard[index] = turn
  setBoard(newBoard)

  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
  setTurn(newTurn)

  window.localStorage.setItem('board', JSON.stringify(newBoard))
  window.localStorage.setItem('turn', newTurn)

  const newWinner = checkWinner(newBoard, WINNER_COMBOS)
  newWinner ? setWinner(newWinner) : checkEndGame(newBoard) ?? setWinner(false)
}

export const resetGameLogic = (setBoard, setTurn, setWinner) => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)

  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}
