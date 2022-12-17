import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import AddStudent from './components/dbPages/AddStudent';
import AddTeacher from './components/dbPages/AddTeacher';
import StudentDB from './components/dbPages/StudentDB';
import TeacherDB from './components/dbPages/TeacherDB';
import EditStudent from './components/dbPages/EditStudent';
import EditTeacher from './components/dbPages/EditTeacher';
import Front from './components/Front'
import useAuth from './states/useAuth';
import useRefresh from './hooks/useRefresh';

const App = () => {
  const auth = useAuth((state) => state.auth)
  useRefresh()

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={auth ? <Navigate to="/home" /> : <Front />} />
          <Route path='/home' element={auth ? <Home /> : <Navigate to="/login" />} />
          <Route path='/login' element={auth ? <Navigate to="/home" /> : <LoginPage />} />
          <Route path='/register' element={auth ? <Navigate to="/home" /> : <SignUpPage />} />
          <Route path='/students' element={auth ? <StudentDB /> : < Navigate to="/login" />} />
          <Route path='/teachers' element={auth ? <TeacherDB /> : < Navigate to="/login" />} />
          <Route path='/add_teacher' element={auth ? <AddTeacher /> : < Navigate to="/login" />} />
          <Route path='/add_student' element={auth ? <AddStudent /> : < Navigate to="/login" />} />
          <Route path='/student/edit/:id' element={auth ? <EditStudent /> : < Navigate to="/login" />} />
          <Route path='/teacher/edit/:id' element={auth ? <EditTeacher /> : < Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;