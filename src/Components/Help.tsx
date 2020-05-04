import React from 'react'
import { changeCurrentPageType } from '../redux/reducers/main/mainReducer'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import Head from './Head';

type HelpPageType = {
  changeCurrentPageToHelp: () => void
}

const HelpPage: React.FC<HelpPageType> = ({ changeCurrentPageToHelp }) => {

  useEffect(() => {
    changeCurrentPageToHelp()
  }, [changeCurrentPageToHelp])

  return (
    <>
      <Head title={'Help'} />
      <div>
        Help page
    </div>
    </>
  )
}
const mapStateToProp = (state: any) => ({
})
const mapDispatchToProp = (dispatch: any) => ({
  changeCurrentPageToHelp: () => dispatch(changeCurrentPageType('help'))
})

export default connect(mapStateToProp, mapDispatchToProp)(HelpPage)