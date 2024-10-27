/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react"

export const TwitterFollowCard = ({usserName, name}) => {
    const [isFollowing, setIsFollowing] = useState(false)

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing ? 'tw-followCard-follow is-following' : 'tw-followCard-follow'

   const handleClick = () => setIsFollowing(!isFollowing)

    

    //Definicion de un State: el state se puede comprender como un arreglo que cuenta con dos posiciones
    //const state = useState(false)
    //const isFollowing = state[0] la primera posicion cuenta con el valor del estado
    //const setIsFollowing = state[1] la segunda posicion es la funcion que actualizara este estado

  return (
        <article className="tw-followCard">
            <header className="tw-followCard-header">
                <img 
                className="tw-followCard-avatar" 
                src={`https://unavatar.io/x/${usserName}`}
                alt="Avatar de warhammer" />
            
                <div className="tw-followCard-info">
                    <strong>
                        {name}
                    </strong>
                    
                    <span className="tw-followCard-account">
                        @{usserName}
                    </span>
                </div>
            </header>

            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className="tw-followCard-text">{text}</span>
                    <span className="tw-followCard-stopFollow">Dejar de Seguir</span>
                </button>
            </aside>
        </article>
    )
}