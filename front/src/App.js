import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Front/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<SignUpPage/>} />
          <Route path='/students' element={<StudentDB/>} />
          <Route path='/teachers' element={<TeacherDB/>} />
          <Route path='/add_teacher' element={<AddTeacher/>} />
          <Route path='/add_student' element={<AddStudent/>} />
          <Route path='/student/edit/:id' element={<EditStudent/>} />
          <Route path='/teacher/edit/:id' element={<EditTeacher/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;