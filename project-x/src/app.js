import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Maps from './components/Maps'
import 'bulma'

const App = () => (
  <BrowserRouter>
    <Switch>
      
      <Route exact path="/" component={Home} />
      <Route exact path="/maps" component={Maps} />

    </Switch>
  </BrowserRouter>

)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)