import React, { useRef } from 'react'
import { LoginPanelSt } from '../Styled/Styled'
import { Button } from 'antd';
import { InputWithLabel, AdditionalPanelLinks } from './AuthPanel'

type LoginPanelType = {
  msg: string
  clearMsg: () => void
  login: (username: string, password: string) => void
}

const LoginPanel:React.FC<LoginPanelType> = ({login, msg, clearMsg}) => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <LoginPanelSt>
      <div className="header">
        <h2>Login</h2>
      </div>
      <div className="body">
        {msg && <span className='msg'>{msg}</span>}
        <InputWithLabel label={'username'} ref={usernameRef} />
        <InputWithLabel label={'password'} ref={passwordRef} fieldType='password'/>
        <Button onClick={() => {
          console.log(usernameRef)
          login(
            usernameRef.current?.value ? usernameRef.current.value : '', 
            passwordRef.current?.value ? passwordRef.current.value :''
          )
          }}>
          Login
        </Button>
        <AdditionalPanelLinks onClick={clearMsg} links={
          [
            {
              href: '/reset-password',
              label: 'Reset password'
            },
            {
              href: '/register',
              label: 'Register'
            },
          ]
        } />
      </div>
    </LoginPanelSt>
  )
}

export default LoginPanel