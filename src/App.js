import React, { useState, useCallback } from 'react'
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
import { useEffect } from 'react';
import AddListUrl from './Components/AddListUrl'
import Spiner from './Components/Spiner';
import { connect } from 'react-redux'
import { setModal } from './redux/reducers/modal/modalReducer';
import { setUserThunk } from './redux/reducers/users/usersReducer';
import { getListsThunk } from './redux/reducers/lists/listsReducer'

const App = ({modal, setModal, currentPage, user, setUserThunk, getLists, ...props}) => {
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
    if (user.userId) getLists(user.userId)
  }, [getLists, user])

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
            // setGeneralLoadingTrue={() => setGeneralLoading(true)}
            // currentListId={currentListId}
            // user={user}
            // getCategories={() => getCategories()}
          />
        )}
        {
          menuIsOpen && <Menu menuStyle={menuStyle} />
        }
        <MainSt>
          <Switch>
            <PrivateRoute
              path='/lists/add/:listId'
              render={(props) =>  <AddListUrl {...props} /*getCategories={getCategories}*/ user={user} />}
            />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/external-api" component={ExternalApi} />
            <PrivateRoute exact path="/">
              {currentPage === 'lists' && (
                <ListsContainer />
              )}
              {currentPage === 'words' && (
                <Words
                  // generalLoading={generalLoading}
                  // currentListAuthorId={currentListAuthorId}
                  user={user}
                  // getCategories={() => getCategories()}
                  // categoriesWords={categoriesWords}
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
              <Notes setModal={data => setModal(data)} />
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
  getLists: (userId) => dispatch(getListsThunk(userId)),
  setUserThunk: (data) => dispatch(setUserThunk(data)),
  setModal: (data) => dispatch(setModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
