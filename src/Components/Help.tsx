import React from 'react'
import { changeCurrentPageType } from '../redux/reducers/main/mainReducer'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import Head from './Head'
import { Collapse } from 'antd'
import { HelpPageSt } from './Styled'
import { HelpStateType } from '../redux/reducers/help/helpReducer'

const { Panel } = Collapse

type HelpPageType = {
  helpState: HelpStateType
  changeCurrentPageToHelp: () => void
}

const HelpPage: React.FC<HelpPageType> = ({ changeCurrentPageToHelp, helpState }) => {

  useEffect(() => {
    changeCurrentPageToHelp()
  }, [changeCurrentPageToHelp])

  return (
    <>
      <Head title={'Help'} />
      <HelpPageSt>
        <div className="wrapper">
          <Collapse expandIconPosition='right' accordion={true} >
            {helpState.items.map(item => {
              return (
                <Panel header={item.title} key={item?._id ? item._id : 'id'} >
                  <p>{item.content}</p>
                </Panel>
              )
            })}
          </Collapse>
        </div>
      </HelpPageSt>
    </>
  )
}
const mapStateToProp = (state: any) => ({
  helpState: state.helpReducer
})
const mapDispatchToProp = (dispatch: any) => ({
  changeCurrentPageToHelp: () => dispatch(changeCurrentPageType('help'))
})

export default connect(mapStateToProp, mapDispatchToProp)(HelpPage)