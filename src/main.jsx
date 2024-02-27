import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './assets/components/App.jsx'
import './index.css'
import Home from './assets/pages/Home.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Home />
  </React.StrictMode>,
)
