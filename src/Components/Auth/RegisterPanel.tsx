import React, { useRef } from 'react'
import { LoginPanelSt } from '../Styled/Styled'
import { Button } from 'antd';
import { InputWithLabel, AdditionalPanelLinks } from './AuthPanel'

type RegisterPanelType = {
  msg: string
  clearMsg: () => void
  register: (username: string, password: string) => void
}

const RegisterPanel:React.FC<RegisterPanelType> = ({register, msg, clearMsg}) => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <LoginPanelSt>
      <div className="header">
        <h2>Register</h2>
      </div>
      <div className="body">
        {msg && <span className='msg'>{msg}</span>}
        <InputWithLabel label={'username'} ref={usernameRef} />
        <InputWithLabel label={'password'} ref={passwordRef} fieldType='password' />
        <Button onClick={() => register(usernameRef.current?.value || '', passwordRef.current?.value || '')} >
          Register
        </Button>
        <AdditionalPanelLinks onClick={clearMsg} links={
          [
            {
              href: '/reset-password',
              label: 'Reset password'
            },
            {
              href: '/login',
              label: 'Login'
            }
          ]
        } />
      </div>
    </LoginPanelSt>
  )
}

export default RegisterPanel