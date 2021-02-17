import React, { useEffect } from 'react'
import { MenuSt } from './Styled/Styled'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeCurrentPageType, pageType } from '../redux/reducers/main/mainReducer'
import { changeThemeThunk, logoutThunk, changeLanguageThunk } from '../redux/reducers/users/usersReducer'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './language-switcher'

type MenuType = {
  menuStyle: any
  currentTheme: string
  userId: string
  refreshToken: string
  language: string
  closeMenu: () => void
  changeTheme: (userId: string, theme: string) => void
  changeCurrentPage: (page:pageType) => void
  logout: (refreshToken: string) => void
}

const Menu:React.FC<MenuType> = ({menuStyle, language, closeMenu, refreshToken, changeCurrentPage, changeTheme, currentTheme, userId, logout}) => {
  const { t, i18n } = useTranslation() 

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language)
    }
  }, [i18n, language, userId])

  return (
    <MenuSt style={menuStyle} >
      <div className="wrapper">
        <Link to='/lists' onClick={() => {
          changeCurrentPage('lists')
          closeMenu()
        }}>
          {t("headerTitles.lists")}
        </Link>
        <Link onClick={closeMenu} to='/notes'>
          {t("headerTitles.notes")}
        </Link>
        <Link onClick={closeMenu} to='/help'>
          {t("headerTitles.help")}
        </Link>
        <Link to='/' onClick={() => {
          logout(refreshToken)
          closeMenu()
        }}>
          {t("headerTitles.logOut")}
        </Link>
        <LanguageSwitcher />
        <div className="theme-switcher">
          {
            currentTheme === 'light' 
            ? (
              <button onClick={() => {
                changeTheme(userId, 'dark')
                closeMenu()
              }}>
                {t("headerTitles.darkTheme")}
              </button>
            ) : (
              <button onClick={() => {
                changeTheme(userId, 'light')
                closeMenu()
              }}>
              {t("headerTitles.lightTheme")}
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
  userId: state.userReducer._id,
  refreshToken: state.userReducer.refreshToken,
  language: state.userReducer.language
})

const mapDispatchToProps = (dispatch:any) => ({
  logout: (refreshToken: string) => dispatch(logoutThunk(refreshToken)),
  changeCurrentPage: (page:pageType) => dispatch(changeCurrentPageType(page)),
  changeTheme: (userId: string, theme: string) => dispatch(changeThemeThunk(userId, theme)),
  changeLanguage: (userId: string, language: string, success: any) => dispatch(changeLanguageThunk(userId, language, success))
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)