import React from 'react'
import { FooterSt } from './Styled'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeCurrentPageType, pageType } from '../redux/reducers/main/mainReducer'

type FooterType = {
  currentPage: pageType
  setCurrentPage: (page:pageType) => void
  setModal: (data: {isActive: boolean, type: string, errorMessage?: string}) => void
  listWordsCount: number
}

const Footer:React.FC<FooterType> = ({currentPage, setCurrentPage, setModal, listWordsCount}) => {
  const StartTest = () => {
    if (currentPage === 'words') {
      if (listWordsCount < 5) {
        setModal({isActive: true, type: 'error', errorMessage: 'Words count must be greater or equal 5'})
      } else {
        setModal({isActive: true, type: 'chooseTestType'})
      }
    } else {
      setModal({isActive: true, type: 'error', errorMessage: 'Choose list for start test'})
    }
  }

  return (
    <FooterSt>
      <div className="wrapper">
        <Link to='/' onClick={() => setCurrentPage('lists')}>
          <svg className={currentPage === 'lists' ? 'activeTab' : ''} width="24" height="20" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
            <path fill='currentColor' d="M3.75 15.25H0.75C0.551088 15.25 0.360322 15.329 0.21967 15.4697C0.0790176 15.6103 0 15.8011 0 16L0 19C0 19.1989 0.0790176 19.3897 0.21967 19.5303C0.360322 19.671 0.551088 19.75 0.75 19.75H3.75C3.94891 19.75 4.13968 19.671 4.28033 19.5303C4.42098 19.3897 4.5 19.1989 4.5 19V16C4.5 15.8011 4.42098 15.6103 4.28033 15.4697C4.13968 15.329 3.94891 15.25 3.75 15.25ZM3.75 0.25H0.75C0.551088 0.25 0.360322 0.329018 0.21967 0.46967C0.0790176 0.610322 0 0.801088 0 1L0 4C0 4.19891 0.0790176 4.38968 0.21967 4.53033C0.360322 4.67098 0.551088 4.75 0.75 4.75H3.75C3.94891 4.75 4.13968 4.67098 4.28033 4.53033C4.42098 4.38968 4.5 4.19891 4.5 4V1C4.5 0.801088 4.42098 0.610322 4.28033 0.46967C4.13968 0.329018 3.94891 0.25 3.75 0.25ZM3.75 7.75H0.75C0.551088 7.75 0.360322 7.82902 0.21967 7.96967C0.0790176 8.11032 0 8.30109 0 8.5L0 11.5C0 11.6989 0.0790176 11.8897 0.21967 12.0303C0.360322 12.171 0.551088 12.25 0.75 12.25H3.75C3.94891 12.25 4.13968 12.171 4.28033 12.0303C4.42098 11.8897 4.5 11.6989 4.5 11.5V8.5C4.5 8.30109 4.42098 8.11032 4.28033 7.96967C4.13968 7.82902 3.94891 7.75 3.75 7.75ZM23.25 16H8.25C8.05109 16 7.86032 16.079 7.71967 16.2197C7.57902 16.3603 7.5 16.5511 7.5 16.75V18.25C7.5 18.4489 7.57902 18.6397 7.71967 18.7803C7.86032 18.921 8.05109 19 8.25 19H23.25C23.4489 19 23.6397 18.921 23.7803 18.7803C23.921 18.6397 24 18.4489 24 18.25V16.75C24 16.5511 23.921 16.3603 23.7803 16.2197C23.6397 16.079 23.4489 16 23.25 16ZM23.25 1H8.25C8.05109 1 7.86032 1.07902 7.71967 1.21967C7.57902 1.36032 7.5 1.55109 7.5 1.75V3.25C7.5 3.44891 7.57902 3.63968 7.71967 3.78033C7.86032 3.92098 8.05109 4 8.25 4H23.25C23.4489 4 23.6397 3.92098 23.7803 3.78033C23.921 3.63968 24 3.44891 24 3.25V1.75C24 1.55109 23.921 1.36032 23.7803 1.21967C23.6397 1.07902 23.4489 1 23.25 1ZM23.25 8.5H8.25C8.05109 8.5 7.86032 8.57902 7.71967 8.71967C7.57902 8.86032 7.5 9.05109 7.5 9.25V10.75C7.5 10.9489 7.57902 11.1397 7.71967 11.2803C7.86032 11.421 8.05109 11.5 8.25 11.5H23.25C23.4489 11.5 23.6397 11.421 23.7803 11.2803C23.921 11.1397 24 10.9489 24 10.75V9.25C24 9.05109 23.921 8.86032 23.7803 8.71967C23.6397 8.57902 23.4489 8.5 23.25 8.5Z"/>
          </svg>
        </Link>
        <Link to='/notes' >
          <svg className={currentPage === 'notes' ? 'activeTab' : ''} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill='currentColor' d="M16.7143 15.4286H24V1.28571C24 0.573214 23.4268 0 22.7143 0H1.28571C0.573214 0 0 0.573214 0 1.28571V22.7143C0 23.4268 0.573214 24 1.28571 24H15.4286V16.7143C15.4286 16.0071 16.0071 15.4286 16.7143 15.4286ZM23.625 18.375L18.375 23.625C18.1339 23.8661 17.8071 24 17.4643 24H17.1429V17.1429H24V17.4696C24 17.8071 23.8661 18.1339 23.625 18.375Z" />
          </svg>
        </Link>
        <Link to='/help' >
          <svg className={currentPage === 'help' ? 'activeTab' : ''} width="17" height="24" viewBox="0 0 17 24" xmlns="http://www.w3.org/2000/svg">
            <path fill='currentColor' d="M8.46975 0C4.72824 0 2.30485 1.53295 0.402239 4.26684C0.0570983 4.76278 0.163504 5.44275 0.644958 5.80781L2.66705 7.34105C3.15329 7.70972 3.84511 7.62352 4.22579 7.14661C5.39996 5.67562 6.27094 4.82869 8.10502 4.82869C9.54708 4.82869 11.3308 5.75677 11.3308 7.15514C11.3308 8.21227 10.4581 8.75517 9.03422 9.55345C7.37377 10.4844 5.17646 11.643 5.17646 14.5412V15C5.17646 15.6213 5.68013 16.125 6.30146 16.125H9.69854C10.3199 16.125 10.8235 15.6213 10.8235 15V14.7294C10.8235 12.7203 16.6955 12.6367 16.6955 7.2C16.6955 3.10575 12.4486 0 8.46975 0ZM8.00002 17.5059C6.20958 17.5059 4.75294 18.9625 4.75294 20.753C4.75294 22.5434 6.20958 24 8.00002 24C9.79046 24 11.2471 22.5434 11.2471 20.7529C11.2471 18.9625 9.79046 17.5059 8.00002 17.5059Z"/>
          </svg>
        </Link>
        <svg className={currentPage === 'words' ? 'activeTab' : ''} onClick={() => StartTest()} width="21" height="24" viewBox="0 0 21 24" xmlns="http://www.w3.org/2000/svg">
          <path fill='currentColor' d="M19.8938 10.0641L3.39375 0.309368C2.05313 -0.48282 0 0.285931 0 2.24531V21.75C0 23.5078 1.90781 24.5672 3.39375 23.6859L19.8938 13.9359C21.3656 13.0688 21.3703 10.9312 19.8938 10.0641Z"/>
        </svg>
      </div>
    </FooterSt>
  )
}

const mapStateToProps = (state:any, ownProps:any) => ({
  listWordsCount: state.mainReducer?.currentList?.items ? state.mainReducer?.currentList?.items.length : 0,
  ...ownProps
})

const mapDispatchToProps = (dispatch:any) => ({
  setCurrentPage: (page:pageType) => dispatch(changeCurrentPageType(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)