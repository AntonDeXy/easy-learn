import React, { useEffect, useState } from 'react'
import { MainSt } from './Styled/Styled'
import { Redirect } from 'react-router-dom'
import { UserStateType } from '../redux/reducers/users/usersReducer'
import { connect } from 'react-redux'
import { changeCurrentPageType } from '../redux/reducers/main/mainReducer'
import { useTranslation } from 'react-i18next';

type LoginForUse = {
  user: UserStateType
  changeCurrentPage: () => void
}

const LoginForUse: React.FC<LoginForUse> = ({ user, changeCurrentPage }) => {
  const [isUserAuthenticated, setUserAuthenticated] = useState<boolean>(false)
  
  const { t } = useTranslation()
  
  useEffect(() => {
    if (user._id) {
      setUserAuthenticated(true)
    }
  }, [user._id])

  if (isUserAuthenticated) {
    changeCurrentPage()
    return <Redirect to='/lists' />
  }

  return (
    <MainSt>
      <div className='pleaseLogin'>
        {t('loginToUseApp')}
      </div>
    </MainSt>
  )
}

const mapStateToProps = (state:any) => ({
  user: state.userReducer
})

const mapDispatchToProps = (dispatch:any) => ({
  changeCurrentPage: () => dispatch(changeCurrentPageType('lists'))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForUse)