import './App.css'
import React from 'react'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
  {
    isFollowing: false,
    name: 'Vicente',
    userName: 'vicente015'
  },
  {
    isFollowing: true,
    name: 'Abel',
    userName: 'SkrrBoy'
  },
  {
    isFollowing: true,
    name: 'Tami',
    userName: 'tamipramos'
  },
  {
    ifFollowing: false,
    name: 'Sergio',
    userName: 'seyronh'
  }
]

export function App () {
  return (
    <section className='tw-follows'>
      {
        // javascript :3
        users.map(({ isFollowing, name, userName }) => (
          <TwitterFollowCard
            key={userName}
            // en la key usar una id de la base de datos, un valor único que identifiquen estos datos
            // id db > username > index
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        ))
      }
    </section>
  )
}
