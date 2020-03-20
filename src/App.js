import React, { useState } from 'react'
import Header from './Components/Header'
import { MainSt } from './Components/Styled'
import Footer from './Components/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Lists from './Components/Lists'
import Words from './Components/Words'
import Modal from './Components/Modal'
import Menu from './Components/Menu'
import "antd/dist/antd.css"
import Notes from './Components/Notes';

const App = () => {
  const [modal, setModal] = useState({ isActive: false })
  const [currentPage, setCurrentPage] = useState('lists')
  const [currentListId, setCurrentListId] = useState(undefined)
  const [currentList, setCurrentList] = useState(undefined)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <Router>
      <div className="App">
        <Header togglerMenu={() => setMenuIsOpen(!menuIsOpen)} />
        {modal.isActive && (
          <Modal modal={modal} setModal={data => setModal(data)} />
        )}
        {
          menuIsOpen && <Menu />
        }
        <MainSt>
          <Switch>
            <Route exact path="/">
              {currentPage === 'lists' && (
                <Lists
                  setCurrentListId={(data) => setCurrentListId(data)}
                  setModal={data => setModal(data)}
                  setCurrentPage={data => setCurrentPage(data)}
                />
              )}
              {currentPage === 'words' && (
                <Words
                  currentList={currentList}
                  setModal={data => setModal(data)}
                  setCurrentPage={data => setCurrentPage(data)}
                />
              )}
            </Route>
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
