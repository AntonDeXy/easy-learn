import React from 'react'
import { HeaderSt } from './Styled/Styled'
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { pageType } from '../redux/reducers/main/mainReducer'
import { UserStateType } from '../redux/reducers/users/usersReducer'
import { useTranslation } from 'react-i18next';

type HeaderType = {
  currentPage: pageType
  currentListName: string
  user: UserStateType
  isMenuOpened: boolean
  togglerMenu: () => void
}

const Header:React.FC<HeaderType> = ({isMenuOpened, togglerMenu, user, currentListName, currentPage}) => {
  const [currentPageLabel, setCurrentPageLabel] = useState<string>('')
  
  const { t } = useTranslation() 

  useEffect(() => {
    switch(currentPage) {
      case 'lists': {
        return setCurrentPageLabel(t("headerTitles.lists"))
      }
      case 'words': {
        return setCurrentPageLabel(currentListName)
      }
      case 'notes': {
        return setCurrentPageLabel(t("headerTitles.notes"))
      }
      case 'help': {
        return setCurrentPageLabel(t("headerTitles.help"))
      }
      case 'profile': {
        return setCurrentPageLabel(t("headerTitles.profile"))
      }
      case 'auth': {
        return setCurrentPageLabel('')
      }
      default: {
        return setCurrentPageLabel('')
      }
    }
  }, [currentListName, currentPage, t])

  return (
    <HeaderSt>
      <div className="wrapper">
        <svg onClick={() => togglerMenu && togglerMenu()} className={`menu ${isMenuOpened && 'menu-active'}`} width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#F3A184" d="M0.75 6.1875H20.25C20.6642 6.1875 21 5.85173 21 5.4375V3.5625C21 3.14827 20.6642 2.8125 20.25 2.8125H0.75C0.335766 2.8125 0 3.14827 0 3.5625V5.4375C0 5.85173 0.335766 6.1875 0.75 6.1875ZM0.75 13.6875H20.25C20.6642 13.6875 21 13.3517 21 12.9375V11.0625C21 10.6483 20.6642 10.3125 20.25 10.3125H0.75C0.335766 10.3125 0 10.6483 0 11.0625V12.9375C0 13.3517 0.335766 13.6875 0.75 13.6875ZM0.75 21.1875H20.25C20.6642 21.1875 21 20.8517 21 20.4375V18.5625C21 18.1483 20.6642 17.8125 20.25 17.8125H0.75C0.335766 17.8125 0 18.1483 0 18.5625V20.4375C0 20.8517 0.335766 21.1875 0.75 21.1875Z"/>
        </svg>
        <span>{currentPageLabel}</span>
        {!user?._id && (
          <div className='logIn'>
            <Link to='/login' >
              <svg width="24" height="24" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-in-alt" className="svg-inline--fa fa-sign-in-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"></path></svg>
            </Link>
          </div>
        )}

        {user?._id && <div className='userImg'>
          <Link to='/profile'>
            <svg width="24" height="24" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
            {/* <img src={user ? user.pictureUrl : DefUserIcon} alt=""/> */}
          </Link>
        </div>}
      </div>
    </HeaderSt>
  )
}

export default Header