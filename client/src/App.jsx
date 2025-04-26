import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

import { Header } from './components/Header'
import{Home_page} from './components/Home_page'
import { Login_page } from './components/Login_page'
import { Profile_page } from './components/Profile_page'
import { Admin_page } from './components/admin_page'
import { Edit_profile } from './components/Edit_Profile'
import { Create_quiz } from './components/Create_Quiz'
import { Quiz_page } from './components/Quiz_page'
import { Edit_quiz } from './components/Edit_quiz'

function App() {

  const [allQuizzes, setAllQuizzes] = useState([])
  const [user, setUser] = useState({})
  const [userQuizzes, setUserQuizzes] = useState([])

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home_page allQuizzes={allQuizzes} setAllQuizzes={setAllQuizzes}/>}/>
      <Route path="/login" element={<Login_page/>}/>
      <Route path="/profile/:id" element={<Profile_page user={user} setUser={setUser} setAllQuizzes={setAllQuizzes} allQuizzes={allQuizzes} setUserQuizzes={setUserQuizzes} userQuizzes={userQuizzes}/>}/>
      <Route path="/profile/:id/edit" element={<Edit_profile user={user} setUser={setUser} setAllQuizzes={setAllQuizzes} allQuizzes={allQuizzes} setUserQuizzes={setUserQuizzes} userQuizzes={userQuizzes}/>}/>
      <Route path="/admin" element={<Admin_page allQuizzes={allQuizzes} setAllQuizzes={setAllQuizzes}/>}/>
      <Route path="/quiz/new" element={<Create_quiz/>}/>
      <Route path="/quiz/:id/edit" element={<Edit_quiz allQuizzes={allQuizzes}/>}/>
      <Route path="/quiz/:id" element={<Quiz_page allQuizzes={allQuizzes} setAllQuizzes={setAllQuizzes} user={user} setUser={setUser}/>}/>
    </Routes>
    </>
  )
}

export default App
