import React from 'react'
import { useTranslation } from 'react-i18next';

type ShareModalType = {
  categoryId: string
}

const ShareModal:React.FC<ShareModalType> = ({categoryId}) => {
  const { t } = useTranslation() 

  return(
    <div className="main">
      <div className="item">
        <span>{t('modal.shareThisId')}</span>
        <input 
          type="text" 
          contentEditable={false} 
          readOnly value={categoryId} />
      </div>
      <span>{t('modal.or')}</span>
      <div className="item">
        <span>{t('modal.shareThisUrl')}</span>
        <input 
          type="text"
          contentEditable={false}
          value={`${window.location.origin}/lists/add/${categoryId}`} />
      </div>
    </div>
  )
}

export default ShareModal