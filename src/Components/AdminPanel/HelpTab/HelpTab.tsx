import React, { useState, useEffect } from 'react'
import { HelpStateType, HelpItemType } from '../../../redux/reducers/help/helpPageReducer'
import HelpTabItem from "./HelpTabItem"
import TextEditor from '../TextEditor'

type HelpTabType = {
  userId: string,
  helpState: HelpStateType
  removePageItem: (itemId: string) => void
  createNewHelpPageItem: (newItem: HelpItemType, success: any) => void
  updateHelpPageItem: (itemId: string, newItem: HelpItemType, success:any) => void
}

const HelpTab: React.FC<HelpTabType> = ({ 
  userId,
  helpState, 
  removePageItem,
  updateHelpPageItem,
  createNewHelpPageItem 
}) => {
  const [newArticleContent, setNewArticleContent] = useState<string>('')
  const [newArticleTitle, setNewArticleTitle] = useState<string>('')
  const [isLoading, setLoading] = useState(false)
  const [articleForEdit, setArticleForEdit] = useState<HelpItemType | undefined >(undefined)

  useEffect(() => {
    if(articleForEdit) {
      setNewArticleContent(articleForEdit.content)
      setNewArticleTitle(articleForEdit.title)
    } else {
      setNewArticleContent('')
      setNewArticleTitle('')
    }
  }, [articleForEdit])

  const updateArticle = () => {
    setLoading(true)
    let newItem = {
      ...articleForEdit,
      title: newArticleTitle, 
      content: newArticleContent,
      authorId: articleForEdit?.authorId ? articleForEdit.authorId : 'admin'
    }
    if (articleForEdit?._id) {
      updateHelpPageItem(
        articleForEdit?._id,
        newItem,
        () => {
          setNewArticleContent('')
          setNewArticleTitle('')
          setLoading(false)
        }
      )
    }
  }

  const addArticle = () => {
    setLoading(true)
    createNewHelpPageItem(
      {
        authorId: userId,
        content: newArticleContent,
        title: newArticleTitle
      },
      () => {
        setNewArticleContent('')
        setNewArticleTitle('')
        setLoading(false)
      }
    )
  }
  
  return (
    <div className='helpItemsWrapper'>
      {helpState.items.map(item => {
        return <HelpTabItem
          setArticleForEdit={() => setArticleForEdit(item)}
          key={item._id}
          item={item} 
          remove={() => item._id && removePageItem(item._id)} />
      })}
      <h2>Create new:</h2>
      <TextEditor
        submitEdit={() => updateArticle()}
        cancelEditMode={() => setArticleForEdit(undefined)}
        articleForEdit={articleForEdit}
        isLoading={isLoading}
        addArticle={addArticle}
        title={newArticleTitle} titleSetter={setNewArticleTitle}
        value={newArticleContent} contentSetter={setNewArticleContent} />
    </div>
  )
}

export default HelpTab