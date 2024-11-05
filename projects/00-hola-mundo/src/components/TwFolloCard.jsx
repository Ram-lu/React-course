import React, { useState } from "react"

// eslint-disable-next-line react/prop-types
export const TwFollowCard = ({userName, name}) => {

    //Definir el state que se comprende como un arreglo de 2 partes

    const [isfollowing, setIsFollowing] = useState(false)

    const handleClick = () => setIsFollowing(!isfollowing)

    const text = isfollowing ? 'Siguiendo' : 'Seguir'

    const buttonClassName = isfollowing ? 'tw-followCard-follow is-following' : 'tw-followCard-follow'

    console.log('el estado es ', isfollowing)

    return (
     <article className="tw-followCard">
        <header className="tw-followCard-header">
           <img 
           className="tw-followCard-avatar"
           src={`https://unavatar.io/x/${userName}`} 
           alt="avatar de usuario" /> 
           <div className="tw-followCard-info">
            <strong className="tw-followCard-name">
                {name}
            </strong>
            <span className="tw-followCard-userName">
                @{userName}
            </span>
           </div>
        </header>
        <aside>
            <button 
            onClick={handleClick}
            className= {buttonClassName}>
                {text}
            </button>
        </aside>
    </article>
)}