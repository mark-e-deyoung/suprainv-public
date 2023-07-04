

import React, { useState,useEffect,createContext } from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navigation from "./pages/Navigation"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import SignOut from "./components/SignOut"
import EditItemPage from "./pages/EditItemPage"
import ItemAdd from "./components/ItemAdd"
import NoPage from "./pages/NoPage"
import ProfilePage from './pages/ProfilePage';


// Create the authentication context
const AuthContext = createContext();

function App() {
    const [signedInUsername, setSignedInUsername] = useState('')
    const [signInToken, setSignInToken] = useState('')
    const [signedIn,setSignedIn] = useState(false)
    const [signedInUserID,setSignedInUserID] = useState('')

      useEffect(() => {
        console.log('in useEffect');
        console.log('signInToken: ' + signInToken)
        console.log('signedIn: ' + signedIn)
        console.log('signedInUsername: '+ signedInUsername)
        console.log('signedInUserID: '+ signedInUserID)
      });

  return (
    <AuthContext.Provider value={
        { signedIn, setSignedIn,
          signInToken, setSignInToken,
          signedInUsername, setSignedInUsername,
          signedInUserID, setSignedInUserID}
        }>
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigation />}>
              <Route index element={<HomePage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="signin" element={<SignInPage />} />
              <Route path="signout" element={<SignOut />} />
              <Route path="edit/:item_id" element={<EditItemPage />} />
              <Route path="new" element={<ItemAdd />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="*" element={<NoPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
    </AuthContext.Provider>
  ) 
}

export default App;
export {AuthContext}
