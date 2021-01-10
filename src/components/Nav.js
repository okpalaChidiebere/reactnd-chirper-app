/*
Rendering two nav links, 
-one that takes us to Dashboard
- one that takes us to New Tweet Component
*/

import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/new' activeClassName='active'>
            New Tweet
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}