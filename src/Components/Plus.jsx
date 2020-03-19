import React from 'react'
import { PlusSt } from './Styled'

const Plus = () => {
  return (
    <PlusSt>
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="50" height="50" rx="25" fill="#878E9F"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5 18.8334C25.5 18.3732 25.1269 18.0001 24.6667 18.0001C24.2064 18.0001 23.8333 18.3732 23.8333 18.8334V23.8335H18.8333C18.3731 23.8335 18 24.2066 18 24.6668C18 25.127 18.3731 25.5001 18.8333 25.5001H23.8333V30.5001C23.8333 30.9603 24.2064 31.3334 24.6667 31.3334C25.1269 31.3334 25.5 30.9603 25.5 30.5001V25.5001H30.5C30.9602 25.5001 31.3333 25.127 31.3333 24.6668C31.3333 24.2066 30.9602 23.8335 30.5 23.8335H25.5V18.8334Z" fill="white"/>
      </svg>
    </PlusSt>
  )
}

export default Plus