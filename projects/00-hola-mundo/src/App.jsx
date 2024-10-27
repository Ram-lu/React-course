/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react"
import "./App.css"
import { TwitterFollowCard } from "./components/TwitterFollowCard"


export const App = () => {

    const [name, setName] = useState('warhammer')

    return (
        <section className="App">
        <TwitterFollowCard
            usserName={name}
            name={"warhammer Oficial"}
        />
        <TwitterFollowCard
            usserName={"macabeso"}
            name={"Macabeso Oficial"}
        />
        <TwitterFollowCard
            usserName={"ageofsigmar"}
            name={"Age of Sigmar Oficial"}
        />
        <TwitterFollowCard
            usserName={"ageofsquidmar"}
            name={"Squidmar Paint Miniatures"}
        />

        <button onClick={() => setName(name == 'warhammer' ? 'RedQueenGames' : 'warhammer')}>
            Cambiar Nombre
        </button>
        </section>
    )
}



