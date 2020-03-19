import React, { useState } from 'react'
import Header from './Components/Header'
import { MainSt } from './Components/Styled'
import Footer from './Components/Footer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Lists from './Components/Lists'
import Words from './Components/Words'
import Modal from './Components/Modal'

const App = () => {
  const [modal, setModal] = useState({isActive: false})
  
  return (
    <Router>
      <div className="App">
        <Header />
        <Modal />
        <MainSt>
          <Switch>
            <Route exact path='/'>
              <Words />
              {/* <Lists /> */}
            </Route>
          </Switch>
        </MainSt>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
