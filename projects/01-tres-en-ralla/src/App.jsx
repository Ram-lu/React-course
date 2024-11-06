import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'X',
  O: 'O'
}


const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]


const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {

    // Versión CleanCode Optimizada mediante un reduce
		WINNER_COMBOS.reduce(
			(winner, [a,b,c]) => winner ? winner : boardToCheck[a] &&	boardToCheck[a] === boardToCheck[b]	&& boardToCheck[a] === boardToCheck[c] ? boardToCheck[a] : null, null
	  )	


// Versión con iteración de arreglos mediante Map
// return WINNER_COMBOS
//  .map(([a,b,c])=> boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c] ? boardToCheck[a] : null)
//   .find(result => result !== null) || null

// Versión con Estructuras típicas, menor eficiente y menor legibilidad.
    // for (const combo of WINNER_COMBOS){
    //   const [a,b,c] = combo
    //   if (
    //     boardToCheck[a] && 
    //     boardToCheck[a] === boardToCheck[b] && 
    //     boardToCheck[a] === boardToCheck[c]
    //   ) {
    //     return boardToCheck[a]
    //   }
    // }
    // return null
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.O ? TURNS.X : TURNS.O
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    newWinner ? setWinner(newWinner) : newWinner
  }

  return (
    <main className='board'>
      <h1>Tres en Raya</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index = {index}
                updateBoard={updateBoard}
              >
                {board[index]}
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
    </main>
  )
}

export default App
