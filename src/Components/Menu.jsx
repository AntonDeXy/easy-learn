import React from 'react'
import { MenuSt } from './Styled'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <MenuSt>
      <div className="wrapper">
        <Link to='/help' >
          Menu
        </Link>
      </div>
    </MenuSt>
  )
}

export default Menu