
import './App.css'
import "./assets/bootstrap.min (1).css"
import { Routes, Route } from 'react-router-dom'
import Header from './componet/Header'
import Footer from './componet/Footer'
import Home from './pages/Home'
import View from './pages/View'
import Dashbord from './pages/Dashbord'
import Whishlist from './pages/Whishlist'
import Pnf from './pages/Pnf'


function App() {


  return (
    <>
     
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/dashbord/:id/view' element={<View/>}></Route>
        <Route path='/dashbord' element={<Dashbord/>}></Route>
        <Route path='/whishlist' element={<Whishlist/>}></Route>
        <Route path='*' element={<Pnf />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
