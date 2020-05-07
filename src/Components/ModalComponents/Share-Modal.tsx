import React from 'react'

type ShareModalType = {
  categoryId: string
}

const ShareModal:React.FC<ShareModalType> = ({categoryId}) => {
  return(
    <div className="main">
      <div className="item">
        <span>Share this ID</span>
        <input type="text" contentEditable={false} readOnly value={categoryId} />
      </div>
      <span>or</span>
      <div className="item">
        <span>Share this url</span>
        <input type="text" contentEditable={false} value={`https://dexy.site/lists/add/${categoryId}`} />
      </div>
    </div>
  )
}

export default ShareModal