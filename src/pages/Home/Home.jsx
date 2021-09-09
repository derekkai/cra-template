import { NavLink } from 'react-router-dom'
import React from 'react'

const Home = () => {
  return (
    <div>
      This is home page<NavLink to="/login">TEST</NavLink>
    </div>
  )
}

export default Home
