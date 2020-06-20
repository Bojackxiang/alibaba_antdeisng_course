import React from 'react'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'

export const App = () => {
  return (
    <Menu>    
      <MenuItem>first item</MenuItem>
      <MenuItem>second item</MenuItem>
      <SubMenu className="submenu-testing" title="my sub menu">
        <MenuItem>fourth</MenuItem>
        <MenuItem>fifth</MenuItem>
      </SubMenu>
    </Menu>
  )
}
