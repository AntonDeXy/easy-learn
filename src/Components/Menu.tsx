import React from 'react'
import { MenuSt } from './Styled/Styled'
import { Link } from 'react-router-dom'
import { useAuth0 } from '../react-auth0-spa'
import { connect } from 'react-redux'
import { changeCurrentPageType, pageType } from '../redux/reducers/main/mainReducer'
import { changeThemeThunk } from '../redux/reducers/users/usersReducer'

type MenuType = {
  menuStyle: any
  currentTheme: string
  userId: string
  closeMenu: () => void
  changeTheme: (userId: string, theme: string) => void
  changeCurrentPage: (page:pageType) => void
}

const Menu:React.FC<MenuType> = ({menuStyle, closeMenu, changeCurrentPage, changeTheme, currentTheme, userId}) => {
  const { logout } = useAuth0()
  
  return (
    <MenuSt style={menuStyle} >
      <div className="wrapper">
        <Link to='/lists' onClick={() => {
          changeCurrentPage('lists')
          closeMenu()
        }}>
          Lists
        </Link>
        <Link onClick={closeMenu} to='/notes'>
          Notes
        </Link>
        <Link onClick={closeMenu} to='/help'>
          Help
        </Link>
        <Link to='/' onClick={() => {
          logout()
          closeMenu()
        }}>Log out</Link>
        <div className="theme-switcher">
          {
            currentTheme === 'light' 
            ? (
              <button onClick={() => {
                changeTheme(userId, 'dark')
                closeMenu()
              }}>
                Dark Theme
              </button>
            ) : (
              <button onClick={() => {
                changeTheme(userId, 'light')
                closeMenu()
              }}>
                Light Theme
              </button>
            )
          }
        </div>
      </div>
    </MenuSt>
  )
}


const mapStateToProps = (state:any) => ({
  currentTheme: state.userReducer.theme,
  userId: state.userReducer.userId
})

const mapDispatchToProps = (dispatch:any) => ({
  changeCurrentPage: (page:pageType) => dispatch(changeCurrentPageType(page)),
  changeTheme: (userId: string, theme: string) => dispatch(changeThemeThunk(userId, theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)