import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {AddListUrlStyled} from './Styled'
import { connect } from 'react-redux'
import { listCheckerThunk, addListWithoutCheckThunk } from '../redux/reducers/users/usersReducer'
import { ListType, ItemType } from '../redux/reducers/main/mainReducer'

type AddListUrlProps = {
  listCheckerThunk: (listId:string, userId:string, success:any) => void
  addListWithoutCheckThunk: (list:ListType, userId:string, success:any) => void
  userId: string
  listIdFromUrl: string
}

const AddListUrl:React.FC<AddListUrlProps> = ({listCheckerThunk, addListWithoutCheckThunk, userId, listIdFromUrl}) => { 
  const [isConfirmed, setIsConformed] = useState(false)
  const [listId] = useState(listIdFromUrl)
  const [isListVisible, setIsListVisible] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [listForAdd, setListForAdd] = useState<ListType | undefined>(undefined)

  useEffect(() => {
    setError(undefined)
    listCheckerThunk(
      listId, 
      userId,  
      (data: {error: string | undefined, data: ListType}) => {
        if (data.error) {
          setError(data.error)
        } else {
          setListForAdd(data.data)
        }
      })
  }, [listCheckerThunk, listId, userId])

  const addList = () => {
    setError(undefined)
    listForAdd &&
    addListWithoutCheckThunk(
      listForAdd,
      userId,
      (data: {error: string | undefined}) => {
        if (data.error) {
          setError(data.error)
        } else {
          setIsConformed(true)
        }
      }
    )
  }

  return (
    <AddListUrlStyled>
      {
        isConfirmed && <Redirect to='/'/>
      }
      <div className="header">
        <span>
          Do you want add this list to yours?
        </span>
        <Link to='/' >
          <svg
            width="17"
            height="18"
            viewBox="0 0 17 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8775 9L16.5683 4.30922C17.1439 3.73359 17.1439 2.80031 16.5683 2.22422L15.5258 1.18172C14.9502 0.606094 14.0169 0.606094 13.4408 1.18172L8.75 5.8725L4.05922 1.18172C3.48359 0.606094 2.55031 0.606094 1.97422 1.18172L0.931719 2.22422C0.356094 2.79984 0.356094 3.73312 0.931719 4.30922L5.6225 9L0.931719 13.6908C0.356094 14.2664 0.356094 15.1997 0.931719 15.7758L1.97422 16.8183C2.54984 17.3939 3.48359 17.3939 4.05922 16.8183L8.75 12.1275L13.4408 16.8183C14.0164 17.3939 14.9502 17.3939 15.5258 16.8183L16.5683 15.7758C17.1439 15.2002 17.1439 14.2669 16.5683 13.6908L11.8775 9Z"
              fill="#FF0000"
            />
          </svg>
        </Link>
      </div>
      <div className="main">
        {
          error ? (
            <div className="error">
              {error}
            </div>
          ) : (
            <>
              <div>
                <h2>
                  List name
                </h2>
              </div>
              <div className='list-content'>
                <span>
                  List content:
                </span>
                <svg onClick={() => {if (listForAdd) {setIsListVisible(!isListVisible)}}} className={`isListVisible ${isListVisible && 'active'}`} version="1.1" id="Layer_1" focusable="false" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 286.1 168.2">
                  <path d="M262.1,168.2h-238c-21.4,0-32.1-25.9-17-41l119-119c9.4-9.4,24.6-9.4,33.9,0l119,119C294.2,142.3,283.5,168.2,262.1,168.2z"/>
                </svg>
              </div>
              <div className="content">
                {
                  isListVisible && listForAdd && listForAdd.items.map(item => {
                  return <ListItem item={item} />
                  })
                }
              </div>
              <button onClick={() => addList()} >
                Add
              </button>
            </>
          )
        }
      </div>
    </AddListUrlStyled>
  )
}

type ListItemType = {
  item: ItemType
}

const ListItem: React.FC<ListItemType> = ({item}) => {
  return (
    <div className="list-item">
      <div className="word">
        <span>
          {item.word}
        </span>
      </div>
      <div className="translate">
        <span>
          {item.translate}
        </span>
      </div>
    </div>
  )
}


const mapStateToProps = (state:any, ownProps:any) => {
  return ({
    modal: state.modalReducer,
    userId: state.userReducer.userId,
    listIdFromUrl: ownProps.match.params.listId
  })
}


const mapDispatchToProps = (dispatch:any) => ({
  listCheckerThunk: (listId:string, userId:string, success:any) => dispatch(listCheckerThunk(listId, userId, success)),
  addListWithoutCheckThunk: (list:ListType, userId:string, success:any) => dispatch(addListWithoutCheckThunk(list, userId, success))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddListUrl)