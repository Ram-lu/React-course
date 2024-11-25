import React, { useState, useEffect } from 'react'
import '../styles/PokeView.css'

export const PokeInfo = () => {
  const [pokemon, setPokemon] = useState('pikachu')
  const [pokeData, setPokeData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    pokemon
      ? fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
        .then(response => response.ok
          ? response.json()
          : Promise.reject(`Error: No se encontró el Pokémon "${pokemon}"`)
        )
        .then(data => (setPokeData(data), setError(null)))
        .catch(err => (setPokeData(null), setError(err)))
      : (setError(null), setPokeData(null))
  }, [pokemon])

  const handleImputChange = event => {
    setPokemon(event.target.value.toLowerCase())
  }

  return (
    <div className='pokemon-info-container'>
      <h1>Pokémon Info</h1>
      <div className='pokemon-info-search'>
        <input
          type='text'
          placeholder='Buscar Pokemon'
          onChange={handleImputChange}
          value={pokemon}
        />
      </div>
      {error
        ? <div>{error}</div>
        : !pokeData
            ? <div>Loading ...</div>
            : (
              <div className='pokemon-info'>
                <h1>{pokeData.name}</h1>
                <img src={pokeData.sprites.front_default} alt={pokeData.name} />
                <p><strong>Altura: </strong> {`${(pokeData.height * 0.1)} Mts`}</p> <p><strong>Peso: </strong>{`${pokeData.weight * 0.1} Kg`}</p>
                <p><strong>Tipo: </strong>{pokeData.types.map(type => (<span key={type.type.name} className={`type type-${type.type.name}`}> {type.type.name} </span>))}</p>
              </div>
              )}
    </div>
  )
}
