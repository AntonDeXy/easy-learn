import React from 'react'
import { DuplicateButton, EditButton, RemoveButton, ShareButton } from '../buttons/buttons'

type ListActionsPropsType = {
  isOwner: boolean
  addListToOwns: () => void
  isRemovingInprocess: boolean
  openShareModal: () => void
  toggleEditMode: () => void
  removeList: () => void
}

const ListActions: React.FC<ListActionsPropsType> = ({
  isOwner, isRemovingInprocess,
  openShareModal, addListToOwns,
  toggleEditMode, removeList
}) => {
  return (
    <div className="functions">
      {
        !isOwner && (
          <DuplicateButton
            onClick={addListToOwns}
            isLoading={isRemovingInprocess}
          />
        )
      }
      <ShareButton onClick={openShareModal} />
      {
        isOwner && (
          <EditButton onClick={toggleEditMode} />
        )
      }
      <RemoveButton onClick={removeList} isLoading={isRemovingInprocess} />
    </div>
  )
}

export default ListActions