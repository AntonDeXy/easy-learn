import React, { useState } from 'react'
import Header from './Components/Header'
import { MainSt } from './Components/Styled/Styled'
import Footer from './Components/Footer'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ListsContainer from './Components/Lists'
import Words from './Components/Words'
import Modal from './Components/Modal'
import Menu from './Components/Menu'
import "antd/dist/antd.css"
import Notes from './Components/Notes'
import Profile from "./Components/Profile"
import PrivateRoute from './Components/PrivateRoute'
import { useEffect } from 'react'
import AddListUrl from './Components/AddListUrl'
import Spiner from './Components/Spiner'
import { connect } from 'react-redux'
import { setModal } from './redux/reducers/modal/modalReducer'
import { getListsThunk } from './redux/reducers/lists/listsReducer'
import { getNotesThunk } from './redux/reducers/notes/notesReducer'
import HelpPage from './Components/Help'
import LoginForUse from './Components/LoginForUse'
import AdminPanel from './Components/AdminPanel/AdminPanel'
import { ThemeProvider } from 'styled-components'
import { LightTheme, DarkTheme } from './Components/Styled/Themes'
import AuthPanel from './Components/Auth/AuthPanel'
import { getNewToken } from './redux/reducers/users/usersReducer'

const App = ({modal, getNotes, currentList, setModal, getNewToken, currentPage, user, setUserThunk, getLists, ...props}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [menuStyle, setMenuStyle] = useState({animationName: 'menuAnimIn'})
  const [currentThemeName, setCurrentThemeName] = useState('light')
  const [currentTheme, setCurrentTheme] = useState(LightTheme)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const refreshToken = localStorage.getItem('refresh-token')
    if (refreshToken) {
      setLoading(true)
      getNewToken(refreshToken, () => setLoading(false))
    }
  }, [getNewToken])

  const menuToggle = () => {
    if (menuIsOpen) {
      setMenuStyle({animationName: 'menuAnimOut'})
      setTimeout(() => {
        setMenuIsOpen(!menuIsOpen)
      }, 450)
    } else {
      setMenuStyle({animationName: 'menuAnimIn'})
      setMenuIsOpen(!menuIsOpen)
    }
  }

  useEffect(() => {
    let tempCurrentTheme = {}
    switch (currentThemeName) {
      case 'light': {
        tempCurrentTheme = LightTheme
        break
      }
      case 'dark': {
        tempCurrentTheme = DarkTheme 
        break
      }
      default: tempCurrentTheme = LightTheme
    }
    setCurrentTheme(tempCurrentTheme)
  }, [currentThemeName])

  useEffect(() => {
    if (user._id) {
      getLists(user._id)
      getNotes(user._id)
      setCurrentThemeName(user.theme ? user.theme : 'light')
    }
  }, [getLists, getNotes, user])


  if (loading) {
    document.title = 'Loading...'
    return (
      <Router>
        <Header />
        <MainSt>
          <Spiner />
        </MainSt>
        <Footer />
      </Router>
    )
  }

  return (
    <ThemeProvider theme={currentTheme} >
      <Router >
        <div className="App">
          <Header isMenuOpened={menuIsOpen} user={user} currentPage={currentPage} currentListName={currentList ? currentList?.name : ''} togglerMenu={() => menuToggle()} />
          {modal.isActive && (
            <Modal
              setModal={setModal}
            />
          )}
          {
            menuIsOpen && <Menu closeMenu={menuToggle} menuStyle={menuStyle} />
          }
          <MainSt>
            <Switch>

              <Route exact path='/' >
                <LoginForUse />
              </Route>

              <PrivateRoute
                path='/lists/add/:listId'
                render={(props) =>  <AddListUrl {...props} user={user} />}
              />

              <PrivateRoute path="/profile" component={Profile} />

              <PrivateRoute path="/lists">
                <ListsContainer />
              </PrivateRoute>

              <PrivateRoute path="/words">
                {currentList
                ? (
                    <Words
                      // isLoading={loading}
                      user={user}
                      setModal={data => setModal(data)}
                    />
                  )
                  : <Redirect to='lists' /> 
                }
              </PrivateRoute>
              
              <Route exact path='/help'>
                <HelpPage />
              </Route>

              <PrivateRoute exact path='/notes'>
                <Notes />
              </PrivateRoute>

              <PrivateRoute exact path='/admin-panel'>
                {/* {
                  user?._id && user?.role === 'admin' */}
                  <AdminPanel user={user} />
                  {/* : <Redirect to='/' /> */}
                {/* } */}
              </PrivateRoute>

              <Route exact path={'/login' || '/register'}>
                <AuthPanel />
              </Route>
            </Switch>
          </MainSt>
          <Footer currentPage={currentPage} setModal={(data) => setModal(data)} />
        </div>
      </Router>
    </ThemeProvider>
  )
}

const mapStateToProps = state => ({
  listsState: state.listsReducer,
  modal: state.modalReducer,
  currentPage: state.mainReducer.currentPage,
  currentList: state.mainReducer.currentList,
  user: state.userReducer
})

const mapDispatchToProps = dispatch => ({
  getNotes: (userId) => dispatch(getNotesThunk(userId)),
  getLists: (userId) => dispatch(getListsThunk(userId)),
  getNewToken: (refreshToken, success) => dispatch(getNewToken(refreshToken, success)),
  setModal: (data) => dispatch(setModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
