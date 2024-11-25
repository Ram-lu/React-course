/* eslint-disable react/prop-types */
import { Square } from './Square'

export const BoardComponent = ({ board, updateBoard }) => {
  return (
    <section className='game'>
      {
                    board.map((element, index) => {
                      return (
                        <Square
                          key={index}
                          index={index}
                          updateBoard={updateBoard}
                        >
                          {element}
                        </Square>
                      )
                    })
                }
    </section>
  )
}
