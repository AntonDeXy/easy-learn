import React from 'react'
import { PlusSt } from './Styled'

const Plus = ({type, setModal, setCurrentPage, isOwner}) => {
  return (
    <PlusSt>
      <div>
        {
          type === 'words' && (
            <svg onClick={() => setCurrentPage('lists')} width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0703 19.8641L11.0297 20.9047C10.5891 21.3453 9.87656 21.3453 9.44063 20.9047L0.328119 11.7969C-0.112506 11.3563 -0.112506 10.6438 0.328119 10.2078L9.44063 1.09533C9.88125 0.654706 10.5938 0.654706 11.0297 1.09533L12.0703 2.13596C12.5156 2.58127 12.5063 3.30783 12.0516 3.74377L6.40312 9.12502H19.875C20.4984 9.12502 21 9.62658 21 10.25V11.75C21 12.3735 20.4984 12.875 19.875 12.875H6.40312L12.0516 18.2563C12.5109 18.6922 12.5203 19.4188 12.0703 19.8641Z" fill="#878E9F"/>
            </svg>
          )
        }
      </div>
      {
        (type === 'lists' || isOwner) && (
          <svg onClick={() => setModal({isActive: true, type})} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="25" fill="#878E9F"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M25.5 18.8334C25.5 18.3732 25.1269 18.0001 24.6667 18.0001C24.2064 18.0001 23.8333 18.3732 23.8333 18.8334V23.8335H18.8333C18.3731 23.8335 18 24.2066 18 24.6668C18 25.127 18.3731 25.5001 18.8333 25.5001H23.8333V30.5001C23.8333 30.9603 24.2064 31.3334 24.6667 31.3334C25.1269 31.3334 25.5 30.9603 25.5 30.5001V25.5001H30.5C30.9602 25.5001 31.3333 25.127 31.3333 24.6668C31.3333 24.2066 30.9602 23.8335 30.5 23.8335H25.5V18.8334Z" fill="white"/>
          </svg>
        )
      }
      <div>
      </div>
    </PlusSt>
  )
}

export default Plus