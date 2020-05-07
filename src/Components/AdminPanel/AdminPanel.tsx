import React from 'react'
import { AdminPanelSt } from '../Styled'
import { Tabs } from 'antd'
import {
  removeHelpItem,
  HelpStateType,
  HelpItemType,
  addNewItem } from '../../redux/reducers/help/helpReducer'
import { connect } from 'react-redux'
import HelpTab from './HelpTab/HelpTab'

const { TabPane } = Tabs

type AdminPanelType = {
  helpState: HelpStateType
  createHelpItem: (newItem: HelpItemType) => void
  removeHelpItem: (itemId : string) => void
}

const AdminPanel:React.FC<AdminPanelType> = ({
  helpState,
  createHelpItem,
  removeHelpItem
}) => {
  return (
    <AdminPanelSt>
      <div className="wrapper">
        <Tabs>
          <TabPane tab="Help page" key="1">
            <HelpTab createHelpItem={createHelpItem} helpState={helpState} removeHelpItem={removeHelpItem} />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of tab 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of tab 3
          </TabPane>
        </Tabs>
      </div>
    </AdminPanelSt>
  )
}

const mapStateToProps = (state: any) => ({
  helpState: state.helpReducer
})

const mapDispatchToProps = (dispatch: any) => ({
  createHelpItem: (newItem:HelpItemType) => dispatch(addNewItem(newItem)),
  removeHelpItem: (itemId:string) => dispatch(removeHelpItem(itemId))
})

export default connect(mapStateToProps, mapDispatchToProps) (AdminPanel)