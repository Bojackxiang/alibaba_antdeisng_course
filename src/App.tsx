import React from 'react'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'

export const App = () => {
  return (
    <Menu mode="vertical" >    
      <MenuItem index={1}>first item</MenuItem>
      <MenuItem index={2}>second item</MenuItem>
    </Menu>
  )
}
