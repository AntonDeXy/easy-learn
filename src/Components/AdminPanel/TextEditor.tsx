
import React from 'react'
import { Button, Input } from 'antd'
import JoditEditor from 'jodit-react'
import { HelpItemType } from '../../redux/reducers/help/helpPageReducer'

type TextEditor = {
  value: string
  title: string
  isLoading: boolean
  articleForEdit?: HelpItemType
  submitEdit?: () => void
  cancelEditMode?: () => void
  addArticle: () => void
  titleSetter: (value:string) => void
  contentSetter: (value: string) => void
}

const TextEditor:React.FC<TextEditor> = ({value, submitEdit, isLoading, title, contentSetter, titleSetter, cancelEditMode, articleForEdit, addArticle}) => {
  return (
    <>
      <Input
        value={title}
        onChange={el => titleSetter(el.currentTarget.value)}
        placeholder='Enter title'/>
      <JoditEditor
        value={value}
        onBlur={newValue => contentSetter(newValue)}
        config={{ readOnly: false }} />
      <Button loading={isLoading} onClick={articleForEdit ? submitEdit : addArticle}>{articleForEdit ? 'Edit' : 'Add'}</Button>
      {
        articleForEdit && <Button onClick={cancelEditMode} >Cancel</Button>
      }
    </>
  )
}

export default TextEditor