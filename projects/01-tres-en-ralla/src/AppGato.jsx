/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react"
import { resetGameLogic, updateBoardLogic } from "./logic/gameLogic"
import { TURNS} from "./constants"
import { Square } from "./components/Square"
import { WinnerModal } from "./components/WinnerModal"
import { BoardComponent } from "./components/Board"

export const AppGato = () => {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.X)
    const [winner, setWinner] = useState(null)

    const resetGame = () => resetGameLogic(setBoard, setTurn, setWinner)

   const updateBoard = index => updateBoardLogic(index, board, winner, turn, setBoard, setTurn, setWinner)

    return (
        <main className="board">
            <h1><strong>GATO / TRES EN RAYA</strong></h1>
            <button onClick={resetGame}>Reiniciar el Juego</button>
            <BoardComponent board={board} updateBoard={updateBoard}/>
            <section className="turn">
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>
            <WinnerModal winner={winner} resetGame={resetGame}
            />
        </main>
    )
}