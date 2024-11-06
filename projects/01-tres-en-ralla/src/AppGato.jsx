/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react"

const TURNS = {
    X: "X",
    O: "O"
}

const Square = ({children, index, isSelected}) => {
    
    return (
        <div className="square">
            {children}
        </div>
    )
}

export const AppGato = () => {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.X)


    const updateBoard = () =>{
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)
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
                            index={index}>
                                {board[index]}
                            </Square>
                        )
                    })
                }
            </section>
            <section className="turn">
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>
        </main>
    )
}