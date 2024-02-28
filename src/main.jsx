import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './assets/pages/Home.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/home' exact Component={Home} />
    </Routes>
  </Router>,
)
