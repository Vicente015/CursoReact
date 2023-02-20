import React, { useState } from 'react'

export function TwitterFollowCard ({ children: name, initialIsFollowing, userName }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  const text = isFollowing ? 'Siguiendo' : 'Seguir'
  const buttonClassName = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'
  const handleClick = () => setIsFollowing(!isFollowing)

  return (
    <article className='tw-followCard'>
      <header className='tw-followCard-header'>
        <img
          className='tw-followCard-avatar'
          src={`https://unavatar.io/${userName}`}
          alt={`El avatar de ${name}`}
        />
        <div className='tw-followCard-info'>
          <strong>{name}</strong>
          <span>@{userName}</span>
        </div>
      </header>

      <aside>
        <button className={buttonClassName} onClick={() => handleClick()}>
          <span className='tw-followCard-follow'>{text}</span>
          <span className='tw-followCard-unfollow'>Dejar de seguir</span>
        </button>
      </aside>
    </article>
  )
}
