/* eslint-disable react/prop-types */
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { checkWinner, checkEndGame } from './logic/gameLogic'
import { TURNS, WINNER_COMBOS } from './constants'
import { Square } from './components/Square'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
           
  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.O ? TURNS.X : TURNS.O
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard, WINNER_COMBOS)
    newWinner ? (setWinner(newWinner), confetti()) : checkEndGame(newBoard) ?? setWinner(false)
  }

  return (
    <main className='board'>
      <h1>Tres en Raya</h1>
      <button onClick={resetGame}>Reiniciar el Juego</button>
      <section className='game'>
        {
          board.map((element, index) => {
            return (
              <Square
                key={index}
                index = {index}
                updateBoard={updateBoard}
              >
                {element}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
          </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
          </Square>
      </section>

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                    ? 'Empate'
                    : 'Gano: '
                }
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Jugar de Nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
