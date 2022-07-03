import React, { useEffect, useState } from 'react'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';

// import the bootstrap styles from node_modules folder
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import {auth} from './firebase/firebase';
import'./App.css'

//import page components
import TasksPage from './components/tasks/TasksPage'
import RegisterPage from './components/auth/RegisterPage'
import LoginPage from './components/auth/LoginPage'
import ProfilePage from './components/profile/ProfilePage';
import Navbar from './components/common/Navbar'
import RequireAuth from './components/common/RequireAuth';
import Spinner from './components/common/Spinner';

export default function App() {

  const [user, setUser] = useState(null);
  const [isUserSet, setIsUserSet] = useState(false);

  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsUserSet(true);
    });

    return () => {unsub();}
  }, []);

  return (
    <BrowserRouter>
    {/* anything inside BrowserRouter but outside Routes will be displayed on ALL pages */}
      <Navbar user = {user} />
      {
        isUserSet ?
        <Routes>
        <Route path ="/" element={
          <RequireAuth user={user}>
            <TasksPage user={user} /> 
          </RequireAuth>
        } />

        <Route path ="/profile" element={
          <RequireAuth user={user}>
            <ProfilePage user={user}/> 
          </RequireAuth>
        } />
        <Route path ="/register" element={<RegisterPage />} />
        <Route path ="/login" element={<LoginPage />} /> 
      </Routes>
      :
      <div className="text-center m-4"> 
        <Spinner></Spinner>
      </div>
      }
      
    </BrowserRouter>
    )
}
