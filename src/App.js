import React, { useState } from 'react'
import Header from './Components/Header'
import { MainSt } from './Components/Styled'
import Footer from './Components/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ListsContainer from './Components/Lists'
import Words from './Components/Words'
import Modal from './Components/Modal'
import Menu from './Components/Menu'
import "antd/dist/antd.css"
import Notes from './Components/Notes'
import { useAuth0 } from "./react-auth0-spa"
import Profile from "./Components/Profile"
import history from "./utils/history"
import PrivateRoute from './Components/PrivateRoute'
import ExternalApi from "./views/ExternalApi"
import { useEffect } from 'react'
import AddListUrl from './Components/AddListUrl'
import Spiner from './Components/Spiner'
import { connect } from 'react-redux'
import { setModal } from './redux/reducers/modal/modalReducer'
import { setUserThunk } from './redux/reducers/users/usersReducer'
import { getListsThunk } from './redux/reducers/lists/listsReducer'
import { getNotesThunk } from './redux/reducers/notes/notesReducer'

const App = ({modal, getNotes, setModal, currentPage, user, setUserThunk, getLists, ...props}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const { loading, userAuth0 } = useAuth0()
  const [menuStyle, setMenuStyle] = useState({animationName: 'menuAnimIn'})

  const menuToggle = () => {
    if (menuIsOpen) {
      setMenuStyle({animationName: 'menuAnimOut'})
      setTimeout(() => {
        setMenuIsOpen(!menuIsOpen)
      }, 500)
    } else {
      setMenuStyle({animationName: 'menuAnimIn'})
      setMenuIsOpen(!menuIsOpen)
    }
  }

  useEffect(() => {
    if (user.userId) {
      getLists(user.userId)
      getNotes(user.userId)
    }
  }, [getLists, getNotes, user])

  useEffect(() => {
    if (!loading && userAuth0) {
      setUserThunk(userAuth0.sub)
    }
  }, [loading, setUserThunk, userAuth0])


  if (loading) {
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
    <Router history={history}>
      <div className="App">
        <Header togglerMenu={() => menuToggle()} />
        {modal.isActive && (
          <Modal
            setModal={setModal}
          />
        )}
        {
          menuIsOpen && <Menu menuStyle={menuStyle} />
        }
        <MainSt>
          <Switch>

            <PrivateRoute
              path='/lists/add/:listId'
              render={(props) =>  <AddListUrl {...props} user={user} />}
            />
            <PrivateRoute path="/profile" component={Profile} />

            <PrivateRoute path="/external-api" component={ExternalApi} />

            <PrivateRoute exact path="/">
              {currentPage === 'lists' && (
                <ListsContainer />
              )}
              {currentPage === 'words' && (
                <Words
                  isLoading={loading}
                  user={user}
                  setModal={data => setModal(data)}
                />
              )}
            </PrivateRoute>

            <Route exact path='/help'>
              <div>
                Help Page
              </div>
            </Route>

            <Route exact path='/notes'>
              <Notes />
            </Route>
          </Switch>
        </MainSt>
        <Footer currentPage={currentPage} setModal={(data) => setModal(data)} />
      </div>
    </Router>
  )
}

const mapStateToProps = state => ({
  listsState: state.listsReducer,
  modal: state.modalReducer,
  currentPage: state.mainReducer.currentPage,
  user: state.userReducer
})

const mapDispatchToProps = dispatch => ({
  getNotes: (userId) => dispatch(getNotesThunk(userId)),
  getLists: (userId) => dispatch(getListsThunk(userId)),
  setUserThunk: (data) => dispatch(setUserThunk(data)),
  setModal: (data) => dispatch(setModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
