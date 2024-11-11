/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react"

const TURNS = {
    X: "X",
    O: "O"
}

const WINNER_COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]

const Square = ({children, index, isSelected, updateBoard}) => {
    
    const className = `square ${isSelected ? 'is-selected' : ''}`
    const handleClick = () => updateBoard(index)
    
    return (
        <div className={className} onClick={handleClick}>
            {children}
        </div>
    )
}

export const AppGato = () => {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.X)
    const [winner, setWinner] = useState(null)

    const checkWinner = boardToCheck => 
         WINNER_COMBOS.reduce(
            (winner, [a,b,c]) => winner ? winner : 
                boardToCheck[a] && 
                boardToCheck[a] === boardToCheck[b] && 
                boardToCheck[a] === boardToCheck[c] ? boardToCheck[a] : null,
                null)
    


    const updateBoard = index =>{
        if (board[index] || winner) return

        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)

        const newWinner = checkWinner(newBoard)
        newWinner ? setWinner(newWinner) : newWinner
    }

    return (
        <main className="board">
            <h1><strong>GATO / TRES EN RAYA</strong></h1>
            <section className="game">
                {
                    board.map((_,index) => {
                        return (
                            <Square 
                            key={index}
                            index={index}
                            updateBoard={updateBoard}>
                                {board[index]}
                            </Square>
                        )
                    })
                }
            </section>
            <section className="turn">|
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>
        </main>
    )
}