import React from 'react'
import Navbar from './Navbar'
import Landing from './Landing'
import Store from './Store'

export default function Homepage() {
  return (
    <div>
        <Navbar title='GroomKit'/>
        <Landing/>
        <Store/>
    </div>
  )
}
