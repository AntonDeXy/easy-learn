import React from 'react'
import { MenuSt } from './Styled'
import { Link } from 'react-router-dom'
import { useAuth0 } from '../react-auth0-spa'
import { connect } from 'react-redux';
import { changeCurrentPageType, pageType } from '../redux/reducers/main/mainReducer';

type MenuType = {
  menuStyle: any
  changeCurrentPage: (page:pageType) => void
}

const Menu:React.FC<MenuType> = ({menuStyle, changeCurrentPage}) => {
  const { logout } = useAuth0()
  
  return (
    <MenuSt style={menuStyle} >
      <div className="wrapper">
        <Link to='/lists' onClick={() => changeCurrentPage('lists')}>
          Lists
        </Link>
        <Link to='/notes'>
          Notes
        </Link>
        <Link to='/help'>
          Help

        </Link>
        <Link to='/' onClick={() => logout()}>Log out</Link>
      </div>
    </MenuSt>
  )
}


const mapStateToProps = (state:any) => ({

})

const mapDispatchToProps = (dispatch:any) => ({
  changeCurrentPage: (page:pageType) => dispatch(changeCurrentPageType(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)