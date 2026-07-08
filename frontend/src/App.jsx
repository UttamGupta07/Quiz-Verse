 import React from 'react'
 import { BrowserRouter, Routes, Route } from 'react-router-dom'
  import Home from './pages/Home.jsx'
  import Navbar from './components/Navbar.jsx'
import Userlayout from './layout/Userlayout.jsx'
 
 const App = () => {
   return (
     <BrowserRouter>
       <Routes>
         <Route element={<Userlayout/>}>
              <Route path="/" element={<Home />} />



         </Route>

         
       </Routes>
     </BrowserRouter>
   )
 }
 
 export default App