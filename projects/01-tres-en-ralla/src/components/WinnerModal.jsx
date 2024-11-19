/* eslint-disable react/prop-types */
import { Square } from "./Square"

export const WinnerModal = ({winner, resetGame}) => {

    if (winner === null) return null 

    const winnerText = winner === false ? 'ESTO FUE EMPATE' : 'EL GANADOR ES:'

    return (
    <section className="winner">
        <div className="text">
            <h2>{winnerText}</h2>
            <button onClick={resetGame}>Reiniciar el Juego</button>
            <header className="win">
                {winner && <Square>{winner}</Square>}
            </header>
        </div>
    </section>
)
}