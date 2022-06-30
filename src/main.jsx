import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from "react-router-dom"

import { HeroesApp } from './HeroesApp'

//  estas cosas se deben importar en el punto mas alto para que las use toda la aplicacion y no de errores en los tests
import './styles.css'
import 'animate.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeroesApp />
    </BrowserRouter>
  </React.StrictMode>
)
