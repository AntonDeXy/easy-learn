import React, { useRef } from 'react'
import { LoginPanelSt } from '../Styled/Styled'
import { Button } from 'antd';
import { InputWithLabel, AdditionalPanelLinks } from './AuthPanel'

type ResetPassPanelType = {
  msg: string
  clearMsg: () => void
  reqPassReset: (email: string) => void
}

const ResetPassPanel:React.FC<ResetPassPanelType> = ({reqPassReset, msg, clearMsg}) => {
  const emailRef = useRef<HTMLInputElement>(null)

  return (
    <LoginPanelSt>
      <div className="header">
        <h2>Reset password</h2>
      </div>
      <div className="body">
        {msg && <span className='msg'>{msg}</span>}
        <InputWithLabel label={'email'} ref={emailRef} />
        <Button onClick={() => reqPassReset(emailRef.current?.value || '')} >
          Reset
        </Button>
        <AdditionalPanelLinks onClick={clearMsg} links={
          [
            {
              href: '/register',
              label: 'Register'
            },
            {
              href: '/login',
              label: 'Login'
            },
          ]
        } />
      </div>
    </LoginPanelSt>
  )
}

export default ResetPassPanel