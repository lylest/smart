import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'
import Charts from '../pages/Charts'
import NotFound from '../pages/NotFound'

function Authnavigation({screenName}) {
  
  return (
    <Routes>
        <Route path="*"  element={<NotFound />} />
        <Route path="/"  element={<Home />} />
        <Route path="/Home"  element={<Home />} />
        <Route path="/Charts"  element={<Charts />} />
    </Routes>   

  )
}

export default Authnavigation