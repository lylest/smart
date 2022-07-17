import React from 'react'
import './css/main.css'
import {BrowserRouter as Router} from 'react-router-dom'
import MainNavigation from './navigation/MainNavigation'

function App() {
  return (
      <Router>
        <MainNavigation />
      </Router>
  )
}

export default App