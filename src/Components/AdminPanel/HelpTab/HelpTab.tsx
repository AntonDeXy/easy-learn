import React, { useState } from 'react'
import { HelpStateType, HelpItemType } from '../../../redux/reducers/help/helpReducer'
import HelpTabItem from "./HelpTabItem"
import TextEditor from '../TextEditor'

type HelpTabType = {
  helpState: HelpStateType
  createHelpItem: (newItem: HelpItemType) => void
  removeHelpItem: (itemId: string) => void
}

const HelpTab: React.FC<HelpTabType> = ({ helpState, createHelpItem, removeHelpItem }) => {
  const [newArticleContent, setNewArticleContent] = useState<string>('')
  const [newArticleTitle, setNewArticleTitle] = useState<string>('')
  
  const addArticle = () => {
    createHelpItem({title: newArticleTitle, content: newArticleContent})
    //success
    // () => {
    //   setNewArticleContent('')
    //   setNewArticleTitle('')
    // }
  }
  
  return (
    <div className='helpItemsWrapper'>
      {helpState.items.map(item => {
        return <HelpTabItem key={item._id} item={item} remove={(itemId) => removeHelpItem(itemId)} />
      })}
      <h2>Create new:</h2>
      <TextEditor
        addArticle={addArticle}
        title={newArticleTitle} titleSetter={setNewArticleTitle}
        value={newArticleContent} contentSetter={setNewArticleContent} />
  </div>)
}

export default HelpTab