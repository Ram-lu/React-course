import React from 'react'

export const TwCardTercero = () => {
  return (
    <article className='tw-twitterCard'>
      <header className='tw-twitterCard-header'>
        <img
          className='tw-twitterCard-avatar'
          src='https://unavatar.io/x/elonmusk'
          alt='Avatar de cuenta de usuario'
        />
        <div className='tw-twitterCard-info'>
          <strong className='tw-twitterCard-name'>Elon Musk</strong>
          <span className='tw-twitterCard-userName'>@elonmusk</span>
        </div>
      </header>
      <aside>
        <button className='tw-twitterCard-follow'>Seguir</button>
      </aside>
    </article>
  )
}
