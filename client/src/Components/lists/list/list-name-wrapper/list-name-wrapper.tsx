import React, { ChangeEvent } from 'react'
import AutosizeInput from 'react-input-autosize'
import { ListType } from '../../../../redux/reducers/main/mainReducer'
import Spiner from '../../../Spiner'
import { Link } from 'react-router-dom'

type ListStatesType = {
  isLoading: boolean 
  editMode: boolean
}

type ListNameWrapperPropsType = ListEditModePropsType & DefaultListStatePropsType & ListStatesType

const ListNameWrapper:React.FC<ListNameWrapperPropsType> = ({
  isLoading, editMode, newName, list, setNewName
}) => {
  if (isLoading) {
    return <ListIsLoading />
  }
  if (editMode) {
    return <ListEditMode newName={newName} setNewName={setNewName} />
  }
  return <DefaultListState list={list}  />
}

const ListIsLoading: React.FC = () => (
  <div className="name">
    <Spiner />
  </div>
)

type ListEditModePropsType = {
  newName: string
  setNewName: (value: string) => void
}

const ListEditMode: React.FC<ListEditModePropsType> = ({ newName, setNewName }) => {
  return (
    <div className="name">
      <AutosizeInput
        autoFocus
        value={newName}
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setNewName(e.target.value)
        }}
      />
    </div>
  )
}

type DefaultListStatePropsType = {
  list: ListType
}

const DefaultListState: React.FC<DefaultListStatePropsType> = ({ list }) => {
  return (
    <Link to={`/list/${list._id}`}>
      <div className="name">
        <span>{list.name}</span>
      </div>
    </Link>
  )
}

export default ListNameWrapper