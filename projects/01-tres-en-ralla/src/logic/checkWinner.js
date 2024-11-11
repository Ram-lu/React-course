
export const checkWinner = (boardToCheck, WINNER_COMBOS) => 
    WINNER_COMBOS.reduce(
       (winner, [a,b,c]) => winner ? winner : 
           boardToCheck[a] && 
           boardToCheck[a] === boardToCheck[b] && 
           boardToCheck[a] === boardToCheck[c] ? boardToCheck[a] : null,
           null)