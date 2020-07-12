import React, { forwardRef, useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import LoginPanel from './LoginPanel'
import { PanelItemSt, AdditionalPanelLinksSt } from '../Styled/Styled'
import { Link } from 'react-router-dom'
import RegisterPanel from './RegisterPanel'
import ResetPassPanel from './ResetPassPanel'
import { connect } from 'react-redux';
import { loginThunk, requestPasswordResetThunk, registerThunk } from '../../redux/reducers/users/usersReducer'
import { changeCurrentPageType } from '../../redux/reducers/main/mainReducer'

type AuthPanel = {
  username: string
  changeCurrentPageToAuth: () => void
  login: (username: string, password: string, success: any) => void
  register: (username: string, password: string, success: any) => void
  reqPassReset: (email: string, success: any) => void
}

const AuthPanel:React.FC<AuthPanel> = ({login, register, changeCurrentPageToAuth, reqPassReset, username}) => {
  const [msg, setMsg] = useState<string>('')
  
  useEffect(() => {
    changeCurrentPageToAuth()
  }, [changeCurrentPageToAuth])

  if(username) {
    return <Redirect to='/lists' />
  }

  return (
    <Switch>
      
      <Route exact path='/register'>
        <RegisterPanel
          msg={msg}
          clearMsg={() => setMsg('')}
          register={(username, password) => register(username, password, (msg: string) => setMsg(msg))} />
      </Route>
      <Route exact path='/login'>
        <LoginPanel
          msg={msg}
          clearMsg={() => setMsg('')}
          login={(username, password) => {
            setMsg('')
            login(username, password, (msg: string) => setMsg(msg))
          }} />
      </Route>
      <Route exact path='/reset-password'>
        <ResetPassPanel
          msg={msg}
          clearMsg={() => setMsg('')}
          reqPassReset={(email) => reqPassReset(email, (msg: string) => setMsg(msg))} />
      </Route>
    </Switch>
  )
}

type InputWithLabelType = {
  label: string
  fieldType?: string
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelType>(({fieldType, label}, ref) => {
  return (
    <PanelItemSt>
      <span>{label}</span>
      <input ref={ref} type={fieldType ? fieldType : 'text'} />
    </PanelItemSt>
  )
})

type AdditionalPanelLink = {
  links: {
    label: string
    href: string
  }[],
  onClick: () => void,
}

export const AdditionalPanelLinks:React.FC<AdditionalPanelLink> = ({links, onClick}) => {
  return (
    <AdditionalPanelLinksSt>
      {
        links.map(link => (
          <Link onClick={onClick} to={link.href} >
            {link.label}
          </Link>
        ))
      }
    </AdditionalPanelLinksSt>
  )
}

const mapStateToProps = (state: any) => ({
  username: state.userReducer.username
})

const mapDispatchToProps = (dispatch: any) => ({
  changeCurrentPageToAuth: () => dispatch(changeCurrentPageType('auth')),
  login: (username: string, password: string, success: any) => dispatch(loginThunk(username, password, success)),
  register: (username: string, password: string, success: any) => dispatch(registerThunk(username, password, success)),
  reqPassReset: (email: string, success: any) => dispatch(requestPasswordResetThunk(email, success))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthPanel)