import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Userlayout from './layout/Userlayout.jsx'
import Categories from './pages/Categories.jsx'
import SubCategories from './pages/Subcategories.jsx'
import Login from "./pages/Login.jsx";
import Signup from './pages/Signup.jsx'
import Quiz from './pages/Quiz.jsx'
import Result from './pages/quizPages/Result.jsx'
import Review from './pages/quizPages/Review.jsx'
import Dashboard from './pages/userPages/Dashboard.jsx'
import Users from './pages/adminPages/Users.jsx'
import UserDetails from './pages/adminPages/UserDetails.jsx'
import QuizAttempts from './pages/adminPages/QuizAttempts.jsx'
import AttemptDetails from './pages/adminPages/AttemptDetails.jsx'
import NotFound from './pages/NotFound.jsx'
import Adminlayout from './layout/Adminlayout.jsx'
import AdminDashboard from './pages/adminPages/AdminDashboard.jsx'
import { Toaster } from "react-hot-toast";
import UserProfile from './pages/userPages/UserProfile.jsx'
import Questions from './pages/adminPages/Questions.jsx'
import EditQuestion from './pages/adminPages/EditQuestion.jsx'
import About from './pages/About.jsx'
const App = () => {
  return (

    <BrowserRouter>
        <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
          },
        }}
      />
      <Routes>
        <Route element={<Userlayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<SubCategories />} />
           <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          
          <Route path="/review/:id" element={<Review />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route
            path="/result/:id"
            element={<Result />}
            
          />
        

        </Route>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
       




            <Route element={<Adminlayout />}>
        <Route  path="/admin" element={<AdminDashboard />} />
        <Route  path="/admin/users" element={<Users />} />
        <Route path="/admin/users/:id" element={<UserDetails />} />
        <Route path="/admin/attempts/" element={<QuizAttempts />} />
        <Route path="/admin/attempts/:id" element={<AttemptDetails />} />
        <Route path="/admin/questions" element={<Questions />} />
        <Route
    path="/admin/questions/edit/:id"
    element={<EditQuestion />}
/>


         
      </Route>
              <Route path="*" element={<NotFound />} />

        


      </Routes>
    </BrowserRouter>
  )
}

export default App