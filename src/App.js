import React, { useState,useEffect } from 'react'
import localforage from 'localforage'
import {BrowserRouter, Navigate, Routes, Route } from "react-router-dom"

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navigation from "./pages/Navigation"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import SignOut from "./components/SignOut"
import EditItemPage from "./pages/EditItemPage.class"
import ItemAdd from "./components/ItemAdd"
import NoPage from "./pages/NoPage"


function signOutUser () {
  localforage.removeItem('token').then(function() {
    console.log('signOutUser() - localforage removed token.');
  }).catch(function(err) {
    console.log("Error: " + err);
  });
}

function App() {
    const [signInToken, setSignInToken] = useState()
    const [firstRun,setFirstRun] = useState(true)
    const [signedIn,setSignedIn] = useState(false)
   
    // clear out any cached token
    // on first run
      if(firstRun){
        console.log("firstRun")
        signOutUser()
      } else {
        localforage.getItem('token').then(function(value) {
          setSignInToken(value)
          console.log("token: " + value);
          if(value){
            setSignInToken(value)
            setSignedIn(true)
          } else {
            setSignedIn(false)
          }
        }).catch(function(err) {
          console.log("Error: " + err);
          setSignedIn(false)
        })
        setFirstRun(false)
      }

      useEffect(() => {
        console.log('in useEffect');
        console.log('signInToken:' + signInToken)
      });

  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigation />}>
              <Route index element={<HomePage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="signin" element={<SignInPage />} />
              <Route path="signout" element={<SignOut setToken={setSignInToken} />} />
              <Route path="edit/:item_id" element={<EditItemPage token={signInToken}/>} />
              <Route path="new" element={<ItemAdd />} />
              <Route path="*" element={<NoPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </div>

  ) 
}

export default App;
