import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import cartStrore from './Redux/createSttore.js'
import { Provider } from 'react-redux'



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <Provider store={cartStrore}>
      <App  />
    </Provider>
   </BrowserRouter>
  </StrictMode>,
)
