import React from 'react'
import { changeCurrentPageType } from '../redux/reducers/main/mainReducer'
import { connect } from 'react-redux';
import { useEffect } from 'react';

type HelpPageType = {
  changeCurrentPageToHelp: () => void
}

const HelpPage:React.FC<HelpPageType> = ({changeCurrentPageToHelp}) => {
  
  useEffect(() => {
    changeCurrentPageToHelp()
  }, [changeCurrentPageToHelp])

  return (
    <div>
      Help page
    </div>
  )
}
const mapStateToProp = (state:any) => ({
})
const mapDispatchToProp = (dispatch:any) => ({
  changeCurrentPageToHelp: () => dispatch(changeCurrentPageType('help'))
})

export default connect(mapStateToProp, mapDispatchToProp) (HelpPage)