import React, { useState } from 'react'
import { AdminPanelSt } from './Styled'
import { Tabs, Button } from 'antd'
import { removeHelpItem, HelpStateType, HelpItemType } from '../redux/reducers/help/helpReducer'
import { connect } from 'react-redux'
import CKEditor from '@ckeditor/ckeditor5-react'
import JoditEditor from "jodit-react"
import { baseURL } from '../API/Api'

const { TabPane } = Tabs

type AdminPanelType = {
  helpState: HelpStateType
  removeHelpItem: (itemId : string) => void
}

const AdminPanel:React.FC<AdminPanelType> = ({helpState, removeHelpItem}) => {
  return (
    <AdminPanelSt>
      <div className="wrapper">
        <Tabs>
          <TabPane tab="Help page" key="1">
            <HelpTab helpState={helpState} removeHelpItem={removeHelpItem} />
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

type HelpTabType = {
  helpState: HelpStateType
  removeHelpItem: (itemId : string) => void
}

const HelpTab:React.FC<HelpTabType> = ({helpState, removeHelpItem}) => {
  console.log(CKEditor)

  const [newArticleContent, setNewArticleContent] = useState<string>('')
  return (
    <div className='helpItemsWrapper' >
      {
        helpState.items.map(item => {
          return <HelpTabItem item={item} remove={(itemId) => removeHelpItem(itemId)} />
        })
      }
      <JoditEditor  
        value={newArticleContent}
        onBlur={newValue => setNewArticleContent(newValue)}
        config={{readOnly: false}} />
      <Button /*loading */>Add</Button>
    </div>
  )
}

type HelpTabItemType = {
  item: HelpItemType
  remove: (itemId : string) => void
}

const HelpTabItem:React.FC<HelpTabItemType> = ({remove, item}) => {
  return (
    <div className="helpItem">
      <div className="name">
        <span>
          {item.title}
        </span>
      </div>
      <div className='icons' >
        <svg
          onClick={() => item._id && remove(item._id)}
          width="17"
          height="20"
          viewBox="0 0 17 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.2 17.6C1.2 18.0774 1.38964 18.5352 1.72721 18.8728C2.06477 19.2104 2.52261 19.4 3 19.4H13.8C14.2774 19.4 14.7352 19.2104 15.0728 18.8728C15.4104 18.5352 15.6 18.0774 15.6 17.6V5.00002H1.2V17.6ZM11.4 8.00001C11.4 7.84089 11.4632 7.68827 11.5757 7.57575C11.6883 7.46323 11.8409 7.40002 12 7.40002C12.1591 7.40002 12.3117 7.46323 12.4243 7.57575C12.5368 7.68827 12.6 7.84089 12.6 8.00001V16.4C12.6 16.5591 12.5368 16.7118 12.4243 16.8243C12.3117 16.9368 12.1591 17 12 17C11.8409 17 11.6883 16.9368 11.5757 16.8243C11.4632 16.7118 11.4 16.5591 11.4 16.4V8.00001ZM7.8 8.00001C7.8 7.84089 7.86321 7.68827 7.97573 7.57575C8.08825 7.46323 8.24087 7.40002 8.4 7.40002C8.55913 7.40002 8.71174 7.46323 8.82426 7.57575C8.93678 7.68827 9 7.84089 9 8.00001V16.4C9 16.5591 8.93678 16.7118 8.82426 16.8243C8.71174 16.9368 8.55913 17 8.4 17C8.24087 17 8.08825 16.9368 7.97573 16.8243C7.86321 16.7118 7.8 16.5591 7.8 16.4V8.00001ZM4.2 8.00001C4.2 7.84089 4.26321 7.68827 4.37573 7.57575C4.48826 7.46323 4.64087 7.40002 4.8 7.40002C4.95913 7.40002 5.11174 7.46323 5.22426 7.57575C5.33678 7.68827 5.4 7.84089 5.4 8.00001V16.4C5.4 16.5591 5.33678 16.7118 5.22426 16.8243C5.11174 16.9368 4.95913 17 4.8 17C4.64087 17 4.48826 16.9368 4.37573 16.8243C4.26321 16.7118 4.2 16.5591 4.2 16.4V8.00001ZM16.2 1.40002H11.7L11.3475 0.698769C11.2728 0.548849 11.1578 0.42274 11.0154 0.334628C10.8729 0.246517 10.7087 0.199899 10.5412 0.200019H6.255C6.08789 0.199376 5.92398 0.245821 5.78205 0.33403C5.64012 0.42224 5.52591 0.548647 5.4525 0.698769L5.1 1.40002H0.6C0.44087 1.40002 0.288258 1.46323 0.175736 1.57575C0.0632141 1.68828 0 1.84089 0 2.00002L0 3.20002C0 3.35915 0.0632141 3.51176 0.175736 3.62428C0.288258 3.7368 0.44087 3.80002 0.6 3.80002H16.2C16.3591 3.80002 16.5117 3.7368 16.6243 3.62428C16.7368 3.51176 16.8 3.35915 16.8 3.20002V2.00002C16.8 1.84089 16.7368 1.68828 16.6243 1.57575C16.5117 1.46323 16.3591 1.40002 16.2 1.40002Z"
            fill="#5B659A"
          />
        </svg>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  helpState: state.helpReducer
})

const mapDispatchToProps = (dispatch: any) => ({
  removeHelpItem: (itemId:string) => dispatch(removeHelpItem(itemId))
})

export default connect(mapStateToProps, mapDispatchToProps) (AdminPanel)