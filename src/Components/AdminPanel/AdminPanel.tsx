import React, { useEffect } from 'react'
import { AdminPanelSt } from '../Styled'
import { Tabs } from 'antd'
import {
  HelpStateType,
  HelpItemType,
  updateHelpPageItemThunk,
  createNewHelpPageItemThunk,
  removePageItemThunk,
  getHelpPageItemsThunk} from '../../redux/reducers/help/helpPageReducer'
import { connect } from 'react-redux'
import HelpTab from './HelpTab/HelpTab'

const { TabPane } = Tabs

type AdminPanelType = {
  userId: string,
  helpState: HelpStateType
  getHelpPageItems: () => void
  removePageItem: (itemId: string) => void
  createNewHelpPageItem: (newItem: HelpItemType, success: any) => void
  updateHelpPageItem: (itemId: string, newItem: HelpItemType, success: any) => void
}

const AdminPanel:React.FC<AdminPanelType> = ({
  userId,
  helpState,
  getHelpPageItems,
  removePageItem,
  createNewHelpPageItem,
  updateHelpPageItem
}) => {
  useEffect(() => {
    getHelpPageItems()
  }, [getHelpPageItems])

  return (
    <AdminPanelSt>
      <div className="wrapper">
        <Tabs>
          <TabPane tab="Help page" key="1">
            <HelpTab
              userId={userId}
              removePageItem={removePageItem}
              updateHelpPageItem={updateHelpPageItem}
              createNewHelpPageItem={createNewHelpPageItem} 
              helpState={helpState} />
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
  helpState: state.helpReducer,
  userId: state.userReducer.userId
})

const mapDispatchToProps = (dispatch: any) => ({
  getHelpPageItems: () => dispatch(getHelpPageItemsThunk()),
  removePageItem: (itemId: string) => dispatch(removePageItemThunk(itemId)),
  createNewHelpPageItem: (newItem: HelpItemType, success: any) => dispatch(createNewHelpPageItemThunk(newItem, success)),
  updateHelpPageItem: (itemId: string, newItem: HelpItemType, success: any) => dispatch(updateHelpPageItemThunk(itemId, newItem, success))
})

export default connect(mapStateToProps, mapDispatchToProps) (AdminPanel)