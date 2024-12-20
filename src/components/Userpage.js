import React from 'react'
import Landing from './Landing'
import Store from './Store'
import Usernav from './Usernav'

export default function Userpage() {
  return (
    <div>
        <Usernav title="GroomKit"/>
        <Landing/>
        <Store/>
    </div>
  )
}
