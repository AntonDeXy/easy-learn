import React, { useEffect } from 'react'
import { MainSt } from './Styled'
import { Redirect } from 'react-router-dom'
import { UserStateType } from '../redux/reducers/users/usersReducer'
import { connect } from 'react-redux'
import { changeCurrentPageType } from '../redux/reducers/main/mainReducer'

type LoginForUse = {
  user: UserStateType
  changeCurrentPage: () => void
}

const LoginForUse: React.FC<LoginForUse> = ({ user, changeCurrentPage }) => {
  // useEffect(() => {
    if (user._id) {
      changeCurrentPage()
      return <Redirect to='/lists' />
    // redirect()
      // window.location.href = '/lists'
    }
  // }, [user._id, user])

  // const redirect = () => (<Redirect to='/lists' />)

  return (
    <MainSt>
      <div className='pleaseLogin'>
        Please login or register for using this app
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