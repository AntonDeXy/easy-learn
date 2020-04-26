import React, { useRef, useState } from 'react'

const AddList = ({closeModal, addListToProfileThunk, isLoading, disabledButtonStyle, createNewList, userId}) => {
  const categoryNameRef = useRef()
  const categoryIdRef = useRef(null)
  const [error, setError] = useState(undefined)

  const addListToProfile = () => {
    addListToProfileThunk(
      categoryIdRef.current.value, 
      userId,
      (data) => {
        if (data.error) {
          setError(data.error)
        } else {
          closeModal()
        }
      }
    )
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
      <button disabled={isLoading} style={isLoading ? disabledButtonStyle : {} } onClick={ () => createNewList({authorId: userId, name: categoryNameRef.current.value}, () => closeModal())} >Create</button>
      <div className="item">
        <span>Enter list ID</span>
        <input ref={categoryIdRef} type="text" />
      </div>
      <button disabled={isLoading} style={isLoading ? disabledButtonStyle : {} } onClick={ () => addListToProfile() } >Add</button>
    </div>
  )
}

export default AddList