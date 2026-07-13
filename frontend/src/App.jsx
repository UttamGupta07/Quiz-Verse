 import React from 'react'
 import { BrowserRouter, Routes, Route } from 'react-router-dom'
  import Home from './pages/Home.jsx'
  import Navbar from './components/Navbar.jsx'
import Userlayout from './layout/Userlayout.jsx'
import Categories from './pages/Categories.jsx'
import SubCategories from './pages/Subcategories.jsx'
import Login from "./pages/Login.jsx";
import Signup from './pages/Signup.jsx'
import { Toaster } from "sonner";
import Quiz from './pages/Quiz.jsx'
import Result from './pages/Result.jsx'
import Review from './pages/Review.jsx'
import Dashboard from './pages/Dashboard.jsx'

 
 const App = () => {
   return (
    
     <BrowserRouter>
       <Toaster richColors position="top-center" />
       <Routes>
         <Route element={<Userlayout/>}>

              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories/>}/>
              <Route path="/categories/:category" element={<SubCategories />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/review/:id" element={<Review />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
path="/result/:id"
element={<Result/>}
/>
             
             



         </Route>
          <Route path="/quiz" element={<Quiz />} />
           <Route path="/result" element={<Result />} />
           

         
       </Routes>
     </BrowserRouter>
   )
 }
 
 export default App