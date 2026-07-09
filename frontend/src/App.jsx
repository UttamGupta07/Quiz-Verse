 import React from 'react'
 import { BrowserRouter, Routes, Route } from 'react-router-dom'
  import Home from './pages/Home.jsx'
  import Navbar from './components/Navbar.jsx'
import Userlayout from './layout/Userlayout.jsx'
import Categories from './pages/Categories.jsx'
import SubCategories from './pages/Subcategories.jsx'
import Login from "./pages/Login.jsx";
import Signup from './pages/Signup.jsx'
 
 const App = () => {
   return (
     <BrowserRouter>
       <Routes>
         <Route element={<Userlayout/>}>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories/>}/>
              <Route path="/categories/:category" element={<SubCategories />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />



         </Route>

         
       </Routes>
     </BrowserRouter>
   )
 }
 
 export default App