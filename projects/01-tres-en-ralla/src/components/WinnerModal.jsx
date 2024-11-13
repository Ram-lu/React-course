/* eslint-disable react/prop-types */
import { Square } from "./Square"

export const WinnerModal = ({winner, resetGame}) => {

    if (winner !== null) 
        return (
        <section className="winner">
            <div className="text">
                <h2>
                    {
                        winner === false 
                        ? 'ESTO FUE EMPATE'
                        : 'EL GANADOR ES:'
                    }
                </h2>
                <button onClick={resetGame}>Reiniciar el Juego</button>
                <header className="win">
                    {winner && <Square>{winner}</Square>}
                </header>
            </div>
        </section>
    )
}