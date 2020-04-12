import React, { useState, useCallback } from 'react'
import Header from './Components/Header'
import { MainSt } from './Components/Styled'
import Footer from './Components/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Lists from './Components/Lists'
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
import { get, checkIfUserCreated, createNewUser } from './static/functions';
import { useEffect } from 'react';
import AddListUrl from './Components/AddListUrl'
import Spiner from './Components/Spiner';

const App = () => {
  const [modal, setModal] = useState({ isActive: false })
  const [currentPage, setCurrentPage] = useState('lists')
  const [currentListId, setCurrentListId] = useState(undefined)
  const [currentListAuthorId, setCurrentListAuthorId] = useState(undefined)
  const [categoriesWords, setCategoriesWords] = useState([])
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const { loading, user } = useAuth0()
  const [userFromDb, setUserFromDb] = useState({})
  const [generalLoading, setGeneralLoading] = useState(true)
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

  const getCategories = useCallback(() => {
    setGeneralLoading(true)
    get('categories',userFromDb.userId, categoriesList => {
      checkIfUserCreated(userFromDb.userId, user => {
        setCategories([...categoriesList, ...user.addedCategories])
        setGeneralLoading(false)
      })
    })
  }, [userFromDb.userId])

  useEffect(() => {
    if (userFromDb.userId) getCategories()
  }, [getCategories, userFromDb.userId])

  useEffect(() => {
    if (!loading && user) {
      checkIfUserCreated(user.sub, (res) => {
        if (res) setUserFromDb(res)
        else createNewUser(user.sub, (res) => {
          setUserFromDb(res)
        })
      })
    }
  }, [loading, user])

  useEffect(() => {
    const temporaryWords = categories.find(e => e._id === currentListId)
    if (!temporaryWords) {
      setCategoriesWords([])
    } else {
      setCategoriesWords(temporaryWords.items)
    }
  }, [categories, currentListId])

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
          <Modal setGeneralLoadingTrue={() => setGeneralLoading(true)} currentListId={currentListId} user={user} getCategories={() => getCategories()} modal={modal} setModal={data => setModal(data)} />
        )}
        {
          menuIsOpen && <Menu menuStyle={menuStyle} />
        }
        <MainSt>
          <Switch>
            <PrivateRoute
              path='/lists/add/:listId'
              render={(props) =>  <AddListUrl {...props} getCategories={getCategories} user={user} />}
            />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/external-api" component={ExternalApi} />
            <PrivateRoute exact path="/">
              {currentPage === 'lists' && (
                <Lists
                  generalLoading={generalLoading}
                  setCurrentListAuthorId={setCurrentListAuthorId}
                  user={user}
                  categories={categories}
                  getCategories={() => getCategories()}
                  setCurrentListId={(data) => setCurrentListId(data)}
                  setModal={data => setModal(data)}
                  setCurrentPage={data => setCurrentPage(data)}
                />
              )}
              {currentPage === 'words' && (
                <Words
                  generalLoading={generalLoading}
                  currentListAuthorId={currentListAuthorId}
                  user={user}
                  getCategories={() => getCategories()}
                  categoriesWords={categoriesWords}
                  setModal={data => setModal(data)}
                  setCurrentPage={data => setCurrentPage(data)}
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
        <Footer setCurrentPage={data => setCurrentPage(data)} currentPage={currentPage} setModal={(data) => setModal(data)} />
      </div>
    </Router>
  )
}

export default App
