import React from 'react'
import { MenuSt } from './Styled'
import { Link } from 'react-router-dom'
import { useAuth0 } from '../react-auth0-spa'

type MenuType = {
  menuStyle: any
}

const Menu:React.FC<MenuType> = ({menuStyle}) => {
  const { logout } = useAuth0()
  
  return (
    <MenuSt style={menuStyle} >
      <div className="wrapper">
        <Link to='/help' >
          Menu
        </Link>
        <Link to='/' onClick={() => logout()}>Log out</Link>
      </div>
    </MenuSt>
  )
}

export default Menu