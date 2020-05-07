
import React from 'react'
import { Button, Input } from 'antd'
import JoditEditor from 'jodit-react'

type TextEditor = {
  value: string
  title: string
  addArticle: () => void
  titleSetter: (value:string) => void
  contentSetter: (value: string) => void
}

const TextEditor:React.FC<TextEditor> = ({value, title, contentSetter, titleSetter, addArticle}) => {
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
      <Button onClick={addArticle} /*loading */>Add</Button>
    </>
  )
}

export default TextEditor