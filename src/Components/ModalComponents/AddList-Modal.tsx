import React, { useRef, useState } from 'react'
import { ListType } from '../../redux/reducers/main/mainReducer'

type AddListType = {
  disabledButtonStyle: any
  userId: string
  closeModal: () => void
  addListToProfileThunk: (listId:string, userId:string, success:any) => void
  createNewList: (data:ListType, success:any) => void 
}

const AddList:React.FC<AddListType> = ({closeModal, addListToProfileThunk, disabledButtonStyle, createNewList, userId}) => {
  const [isLoading, setIsLoading] = useState(false)
  const categoryNameRef = useRef<HTMLInputElement>(null)
  const categoryIdRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')

  const addListToProfile = () => {
    if (categoryIdRef?.current) {
      setIsLoading(true)
      addListToProfileThunk(
        categoryIdRef.current.value, 
        userId,
        (data:{error: string}) => {
          setIsLoading(false)
          if (data.error) {
            setError(data.error)
          } else {
            closeModal()
          }
        }
      )
    } else {
      setError('Something went wrong')
    }
  }

  return (
    <div className="main">
      <div className="error">
        <span>{error}</span>
      </div>
      <div className="item">
        <span>Name</span>
        <input ref={categoryNameRef} type="text" />
      </div>
      <button disabled={isLoading} style={isLoading ? disabledButtonStyle : {} } onClick={ () => createNewList({authorId: userId, name: categoryNameRef?.current ? categoryNameRef.current.value : '', items: []}, () => closeModal())} >Create</button>
      <div className="item">
        <span>Enter list ID</span>
        <input ref={categoryIdRef} type="text" />
      </div>
      <button disabled={isLoading} style={isLoading ? disabledButtonStyle : {} } onClick={ () => addListToProfile() } >Add</button>
    </div>
  )
}

export default AddList