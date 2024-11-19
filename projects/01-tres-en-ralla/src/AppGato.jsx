import { useState } from "react"
import { resetGameLogic, updateBoardLogic } from "./logic/gameLogic"
import { TURNS} from "./constants"
import { WinnerModal } from "./components/WinnerModal"
import { BoardComponent } from "./components/Board"
import { TurnMarker } from "./components/TurnMarker"

export const AppGato = () => {

    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')

        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    })
    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ?? TURNS.X
    })
    const [winner, setWinner] = useState(null)

    const resetGame = () => resetGameLogic(setBoard, setTurn, setWinner)

   const updateBoard = index => updateBoardLogic(index, board, winner, turn, setBoard, setTurn, setWinner)

    return (
        <main className="board">
            <h1><strong>GATO / TRES EN RAYA</strong></h1>
            <button onClick={resetGame}>Reiniciar el Juego</button>
            <BoardComponent board={board} updateBoard={updateBoard}/>
            <TurnMarker turn={turn}/>
            <WinnerModal winner={winner} resetGame={resetGame}
            />
        </main>
    )
}