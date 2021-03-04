import React from 'react'
import { ListType } from '../../redux/reducers/main/mainReducer'
import { setModal, SetModalType } from '../../redux/reducers/modal/modalReducer'
import { removeAddedListThunk, UserStateType } from '../../redux/reducers/users/usersReducer'
import Plus from '../Plus'
import List from './list/list'
import { ListsWrapper } from './styles/styled-lists'
import { duplicateList, removeListThunk, updateListThunk } from '../../redux/reducers/lists/listsReducer'
import { connect } from 'react-redux'

type ListsContainerType = {
  user: UserStateType
  listsState: { lists: Array<ListType> }
  duplicateList: (data: { userId: string, listForDuplicate: string }, success: any) => void
  setModal: (data: SetModalType) => void
  updateListThunk: (listId: string, newData: ListType, success: any) => void
  removeAddedListThunk: (userId: string, listId: string, success: any) => void
  removeListThunk: (listId: string, success: any) => void
}

const ListsContainer: React.FC<ListsContainerType> = ({
  setModal, duplicateList,
  listsState, removeListThunk,
  user, updateListThunk,
  removeAddedListThunk
}) => {
  return (
    <>
      <ListsWrapper>
        <Plus openModal={() => setModal({ isActive: true, type: 'lists' })} type="lists" />
        <div className="lists">
          {listsState.lists.map(list => {
            return (
              <List
                duplicateList={duplicateList}
                key={list._id}
                isOwner={user._id === list.authorId ? true : false}
                list={list}
                userId={user._id}
                openShareModal={() => setModal({ isActive: true, type: 'share', listId: list._id })}
                updateListThunk={updateListThunk}
                removeListThunk={removeListThunk}
                removeAddedListThunk={removeAddedListThunk}
              />
            )
          })}
        </div>
      </ListsWrapper>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  listsState: { ...state.listsReducer, lists: [...state.listsReducer.lists, ...state.userReducer.addedLists] },
  currentList: state.listsReducer.currentList,
  user: state.userReducer
})

const mapDispatchToProps = (dispatch: any) => ({
  duplicateList: (data: { userId: string, listForDuplicate: string }, success: any) => dispatch(duplicateList(data, success)),
  setModal: (data: SetModalType) => dispatch(setModal(data)),
  updateListThunk: (listId: string, newData: ListType, success: any) => dispatch(updateListThunk(listId, newData, success)),
  removeListThunk: (listId: string, success: any) => dispatch(removeListThunk(listId, success)),
  removeAddedListThunk: (userId: string, listId: string, success: any) => dispatch(removeAddedListThunk(userId, listId, success)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer)