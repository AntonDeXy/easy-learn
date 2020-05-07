import React from 'react'
import { changeCurrentPageType } from '../redux/reducers/main/mainReducer'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import Head from './Head'
import { Collapse } from 'antd'
import { HelpPageSt } from './Styled'
import { HelpStateType, getHelpPageItemsThunk } from '../redux/reducers/help/helpPageReducer'
import ReactHtmlParser from 'react-html-parser'
import Spiner from './Spiner'

const { Panel } = Collapse

type HelpPageType = {
  helpState: HelpStateType
  getHelpPageItems: () => void
  changeCurrentPageToHelp: () => void
}

const HelpPage: React.FC<HelpPageType> = ({ changeCurrentPageToHelp, getHelpPageItems, helpState }) => {

  useEffect(() => {
    changeCurrentPageToHelp()
    getHelpPageItems()
  }, [changeCurrentPageToHelp, getHelpPageItems])

  return (
    <>
      <Head title={'Help'} />
      <HelpPageSt>
        {
          helpState.isLoading 
          ? <Spiner />
          : (
            <div className="wrapper">
              <Collapse expandIconPosition='right' accordion={true} >
                {helpState.items.map(item => {
                  return (
                    <Panel header={item.title} key={item?._id ? item._id : 'id'} >
                      {ReactHtmlParser(item.content)}
                    </Panel>
                  )
                })}
              </Collapse>
            </div>
          )
        }
      </HelpPageSt>
    </>
  )
}
const mapStateToProp = (state: any) => ({
  helpState: state.helpReducer
})
const mapDispatchToProp = (dispatch: any) => ({
  getHelpPageItems: () => dispatch(getHelpPageItemsThunk()),
  changeCurrentPageToHelp: () => dispatch(changeCurrentPageType('help'))
})

export default connect(mapStateToProp, mapDispatchToProp)(HelpPage)