import { TURNS } from "../constants"
import { Square } from "./Square"

// eslint-disable-next-line react/prop-types
export const TurnMarker = ({turn}) => {
   return (
   <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
   )
}