 import React from 'react'
 import { BrowserRouter, Routes, Route } from 'react-router-dom'
  import Home from './pages/Home.jsx'
  import Navbar from './components/Navbar.jsx'
import Userlayout from './layout/Userlayout.jsx'
import Categories from './pages/Categories.jsx'
import SubCategories from './pages/Subcategories.jsx'
 
 const App = () => {
   return (
     <BrowserRouter>
       <Routes>
         <Route element={<Userlayout/>}>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories/>}/>
              <Route path="/categories/:category" element={<SubCategories />} />



         </Route>

         
       </Routes>
     </BrowserRouter>
   )
 }
 
 export default App