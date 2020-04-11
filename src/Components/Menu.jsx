import React from 'react'
import { MenuSt } from './Styled'
import { Link } from 'react-router-dom'
import { useAuth0 } from '../react-auth0-spa'

const Menu = ({menuStyle}) => {
  const { logout } = useAuth0()
  
  return (
    <MenuSt style={menuStyle} >
      <div className="wrapper">
        <Link to='/help' >
          Menu
        </Link>
        <Link onClick={() => logout()}>Log out</Link>
      </div>
    </MenuSt>
  )
}

export default Menu