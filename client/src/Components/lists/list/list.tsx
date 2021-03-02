
import { ListType } from '../../../redux/reducers/main/mainReducer'
import React, { useState } from 'react'
import { ListItemSt } from '../styles/styled-lists'
import ListNameWrapper from './list-name-wrapper/list-name-wrapper'
import ListActions from '../../lists/list/list-functions/list-functions'

type ListCompType = {
  list: ListType
  isOwner: boolean
  userId: string
  duplicateList: (data: { userId: string, listForDuplicate: string }, success: any) => void
  openShareModal: () => void
  updateListThunk: (listId: string, newData: ListType, success: any) => void
  removeListThunk: (listId: string, success: any) => void
  removeAddedListThunk: (userId: string, listId: string, success: any) => void
}

const List: React.FC<ListCompType> = ({
  list,
  isOwner,
  userId,
  openShareModal,
  duplicateList,
  updateListThunk,
  removeListThunk,
  removeAddedListThunk
}) => {
  const [editMode, setEditMode] = useState(false)
  const [newName, setNewName] = useState(list.name)
  const [isLoading, setIsLoading] = useState(false)
  const [isRemovingInprocess, setRemovingInprocess] = useState(false)

  const addListToOwns = () => {
    setRemovingInprocess(true)
    duplicateList(
      {
        userId,
        listForDuplicate: list?._id ? list._id : ''
      },
      () => {
        setRemovingInprocess(false)
      }
    )
  }

  const removeList = () => {
    if (list?._id && !isRemovingInprocess) {
      setRemovingInprocess(true)
      isOwner
        ? removeListThunk(list._id, () => setRemovingInprocess(false))
        : removeAddedListThunk(userId, list._id, () => setRemovingInprocess(false))
    }
  }

  const toggleEditMode = () => {
    if (editMode && list._id) {
      if (list.name !== newName) {
        setIsLoading(true)
        let newData = { ...list }
        newData.name = newName
        updateListThunk(list._id, newData, () => {
          setEditMode(!editMode)
          setIsLoading(false)
        })
      } else {
        setEditMode(!editMode)
      }
    } else {
      setEditMode(!editMode)
    }
  }

  return (
    <ListItemSt>
      <ListNameWrapper
        isLoading={isLoading} editMode={editMode}
        newName={newName} setNewName={setNewName} list={list}
      />
      <ListActions
        isOwner={isOwner} isRemovingInprocess={isRemovingInprocess}
        openShareModal={openShareModal} addListToOwns={addListToOwns}
        toggleEditMode={toggleEditMode} removeList={removeList}
      />
    </ListItemSt >
  )
}

export default List