import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ReactModal from 'react-modal'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactModal.setAppElement("#root");


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>  
)
