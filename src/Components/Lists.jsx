import React from 'react'
import { ListsWrapper, ListItemSt } from './Styled'
import Plus from './Plus'
import { useState, useRef } from 'react'
import AutosizeInput from 'react-input-autosize'
import Spiner from './Spiner'
import { connect } from 'react-redux'
import { removeAddedListThunk } from '../redux/reducers/users/usersReducer'
import {
  removeListThunk,
  updateListThunk,
} from '../redux/reducers/lists/listsReducer'
import { changeCurrentPageType, setCurrentList } from '../redux/reducers/main/mainReducer'
import { setModal } from '../redux/reducers/modal/modalReducer'

const ListsContainer = (props) => {
  return (
    <ListsWrapper>
      <Plus openModal={() => props.setModal({isActive: true, type: 'lists'})} type="lists" />
      {props.loading ? (
        <Spiner />
      ) : (
        <div className="lists">
          {props.listsState.lists.map((list) => {
            return (
              <List
                changeCurrentPageType={() => props.changeCurrentPageToWords()}
                key={list._id}
                isOwner={props.user.userId === list.authorId ? true : false}
                list={list}
                userId={props.user.userId}
                setCurrentList={props.setCurrentList}
                openShareModal={() => props.setModal({isActive: true, type: 'share', listId: list._id})}
                updateListThunk={props.updateListThunk}
                removeListThunk={props.removeListThunk}
                removeAddedListThunk={props.removeAddedListThunk}
              />
            )
          })}
        </div>
      )}
    </ListsWrapper>
  )
}

const List = ({
  changeCurrentPageType,
  setCurrentList,
  list,
  openShareModal,
  isOwner,
  userId,
  updateListThunk,
  removeListThunk,
  removeAddedListThunk
}) => {
  const [editMode, setEditMode] = useState(false)
  const [newName, setNewName] = useState(list.name)
  const titleRef = useRef()
  const [isLoading, setIsLoading] = useState(false)

  const Click = () => {
    if (!editMode) {
      setCurrentList(list)
      changeCurrentPageType()
    }
  }

  const removeList = () => {
    isOwner
    ? removeListThunk(list._id)
    : removeAddedListThunk(userId, list._id)
  }

  const toggleEditMode = () => {
    if (editMode) {
      if (list.name !== titleRef.current.props.value) {
        setIsLoading(true)
        let newData = { ...list }
        newData.name = titleRef.current.props.value
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
      <div onClick={() => Click()} className="name">
        {editMode ? (
          isLoading ? (
            <Spiner />
          ) : (
            <AutosizeInput
              autoFocus
              ref={titleRef}
              value={newName}
              type="text"
              onChange={(e) => {
                setNewName(e.target.value)
              }}
            />
          )
        ) : (
          <span>{list.name}</span>
        )}
      </div>
      <div className="functions">
        {/* share */}
        <svg
          onClick={() => openShareModal()}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.75 12.5C12.8669 12.5 12.0552 12.8054 11.4145 13.3162L7.41109 10.8141C7.52965 10.2778 7.52965 9.72213 7.41109 9.18586L11.4145 6.68375C12.0552 7.19457 12.8669 7.5 13.75 7.5C15.8211 7.5 17.5 5.82105 17.5 3.75C17.5 1.67895 15.8211 0 13.75 0C11.6789 0 10 1.67895 10 3.75C10 4.02961 10.0309 4.30195 10.0889 4.5641L6.08555 7.06621C5.4448 6.55543 4.63312 6.25 3.75 6.25C1.67895 6.25 0 7.92895 0 10C0 12.0711 1.67895 13.75 3.75 13.75C4.63312 13.75 5.4448 13.4446 6.08555 12.9338L10.0889 15.4359C10.0297 15.7032 9.99992 15.9762 10 16.25C10 18.3211 11.6789 20 13.75 20C15.8211 20 17.5 18.3211 17.5 16.25C17.5 14.1789 15.8211 12.5 13.75 12.5Z"
            fill="#5B659A"
          />
        </svg>
        {/* edit */}
        {isOwner && (
          <svg
            onClick={() => toggleEditMode()}
            width="23"
            height="20"
            viewBox="0 0 23 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2266 3.25079L19.75 6.77423C19.8984 6.92267 19.8984 7.16486 19.75 7.31329L11.2188 15.8445L7.59375 16.2469C7.10938 16.3016 6.69922 15.8914 6.75391 15.407L7.15625 11.782L15.6875 3.25079C15.8359 3.10236 16.0781 3.10236 16.2266 3.25079ZM22.5547 2.35626L20.6484 0.450012C20.0547 -0.143738 19.0898 -0.143738 18.4922 0.450012L17.1094 1.83282C16.9609 1.98126 16.9609 2.22345 17.1094 2.37189L20.6328 5.89532C20.7812 6.04376 21.0234 6.04376 21.1719 5.89532L22.5547 4.51251C23.1484 3.91486 23.1484 2.95001 22.5547 2.35626ZM15.5 13.5242V17.5008H3V5.00079H11.9766C12.1016 5.00079 12.2188 4.95001 12.3086 4.86407L13.8711 3.30157C14.168 3.0047 13.957 2.50079 13.5391 2.50079H2.375C1.33984 2.50079 0.5 3.34064 0.5 4.37579V18.1258C0.5 19.1609 1.33984 20.0008 2.375 20.0008H16.125C17.1602 20.0008 18 19.1609 18 18.1258V11.9617C18 11.5438 17.4961 11.3367 17.1992 11.6297L15.6367 13.1922C15.5508 13.282 15.5 13.3992 15.5 13.5242Z"
              fill="#5B659A"
            />
          </svg>
        )}
        {/* remove */}
        <svg
          onClick={() => removeList()}
          width="17"
          height="20"
          viewBox="0 0 17 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.2 17.6C1.2 18.0774 1.38964 18.5352 1.72721 18.8728C2.06477 19.2104 2.52261 19.4 3 19.4H13.8C14.2774 19.4 14.7352 19.2104 15.0728 18.8728C15.4104 18.5352 15.6 18.0774 15.6 17.6V5.00002H1.2V17.6ZM11.4 8.00001C11.4 7.84089 11.4632 7.68827 11.5757 7.57575C11.6883 7.46323 11.8409 7.40002 12 7.40002C12.1591 7.40002 12.3117 7.46323 12.4243 7.57575C12.5368 7.68827 12.6 7.84089 12.6 8.00001V16.4C12.6 16.5591 12.5368 16.7118 12.4243 16.8243C12.3117 16.9368 12.1591 17 12 17C11.8409 17 11.6883 16.9368 11.5757 16.8243C11.4632 16.7118 11.4 16.5591 11.4 16.4V8.00001ZM7.8 8.00001C7.8 7.84089 7.86321 7.68827 7.97573 7.57575C8.08825 7.46323 8.24087 7.40002 8.4 7.40002C8.55913 7.40002 8.71174 7.46323 8.82426 7.57575C8.93678 7.68827 9 7.84089 9 8.00001V16.4C9 16.5591 8.93678 16.7118 8.82426 16.8243C8.71174 16.9368 8.55913 17 8.4 17C8.24087 17 8.08825 16.9368 7.97573 16.8243C7.86321 16.7118 7.8 16.5591 7.8 16.4V8.00001ZM4.2 8.00001C4.2 7.84089 4.26321 7.68827 4.37573 7.57575C4.48826 7.46323 4.64087 7.40002 4.8 7.40002C4.95913 7.40002 5.11174 7.46323 5.22426 7.57575C5.33678 7.68827 5.4 7.84089 5.4 8.00001V16.4C5.4 16.5591 5.33678 16.7118 5.22426 16.8243C5.11174 16.9368 4.95913 17 4.8 17C4.64087 17 4.48826 16.9368 4.37573 16.8243C4.26321 16.7118 4.2 16.5591 4.2 16.4V8.00001ZM16.2 1.40002H11.7L11.3475 0.698769C11.2728 0.548849 11.1578 0.42274 11.0154 0.334628C10.8729 0.246517 10.7087 0.199899 10.5412 0.200019H6.255C6.08789 0.199376 5.92398 0.245821 5.78205 0.33403C5.64012 0.42224 5.52591 0.548647 5.4525 0.698769L5.1 1.40002H0.6C0.44087 1.40002 0.288258 1.46323 0.175736 1.57575C0.0632141 1.68828 0 1.84089 0 2.00002L0 3.20002C0 3.35915 0.0632141 3.51176 0.175736 3.62428C0.288258 3.7368 0.44087 3.80002 0.6 3.80002H16.2C16.3591 3.80002 16.5117 3.7368 16.6243 3.62428C16.7368 3.51176 16.8 3.35915 16.8 3.20002V2.00002C16.8 1.84089 16.7368 1.68828 16.6243 1.57575C16.5117 1.46323 16.3591 1.40002 16.2 1.40002Z"
            fill="#5B659A"
          />
        </svg>
      </div>
    </ListItemSt>
  )
}

const mapStateToProps = (state) => ({
  listsState: {...state.listsReducer, lists: [...state.listsReducer.lists, ...state.userReducer.addedLists]},
  currentList: state.listsReducer.currentList,
  errorMessage: state.listsReducer.errorMessage,
  user: state.userReducer
})

const mapDispatchToProps = (dispatch) => ({
  // getLists: dispatch((userId) => getListsThunk(userId)),
  setCurrentList: (list) => dispatch(setCurrentList(list)),
  changeCurrentPageToWords: () => dispatch(changeCurrentPageType('words')),
  setModal: (data) => dispatch(setModal(data)),
  updateListThunk: (listId, newData, success) => dispatch(updateListThunk(listId, newData, success)),
  removeListThunk: (data) => dispatch(removeListThunk(data)),
  removeAddedListThunk: (userId, listId) => dispatch(removeAddedListThunk(userId, listId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer)