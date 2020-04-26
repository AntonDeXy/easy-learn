import React from 'react'

const ShareModal = ({categoryId}) => {
  return(
    <div className="main">
      <div className="item">
        <span>Share this ID</span>
        <input type="text" contentEditable={false} value={categoryId} />
      </div>
      <span>or</span>
      <div className="item">
        <span>Share this url</span>
        <input type="text" contentEditable={false} value={`http://localhost:3000/lists/add/${categoryId}`} />
      </div>
    </div>
  )
}

export default ShareModal