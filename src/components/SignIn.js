import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import localforage from 'localforage';

import Alert from 'react-bootstrap/Alert';
import './SignIn.css';

async function signinUser(user, pass) {
        axios.post("https://suprainv-api.caprover.suprahub.us/api/v1/signin",
         {
            username: user,
            password: pass
         }
      )
      .then(response => {
        // See: https://axios-http.com/docs/res_schema
        //restructure response.data
        // data format is defined in backend.
        const { message, user_id, user_name,token } = response.data
        console.log("Response status: " + response.status)
        console.log("user_id: " + user_id)
        console.log("username: "+ user_name)
        console.log("token: " + token)
        console.log("message: " + message)
        localforage.setItem('token', token).then(function () {
          return localforage.getItem('token');
            }).then(function (value) {
                console.log("Token (localforage read back):" + value)
            }).catch(function (err) {
                console.log("Error: " + err)
            });
          return token
        }).catch(error => {
          console.log("Error: " + error)
      })
}

const SignIn = ({setToken}) => {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()
    const [signedIn,setSignedIn] = useState(false)
    const navigate = useNavigate()
    
    localforage.getItem('token').then(function(value) {
        console.log("token: " + value);
        if(value){
            setToken(value)
            setSignedIn(true)
        } else{
          setSignedIn(false)
        }
      }).catch(function(err) {
        console.log("Error: " + err);
        setSignedIn(false)
      })

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await signinUser(username, password);
        console.log("handleSubmit - token (should be valid?): " + token)
        // redirect to /
        navigate("/", {replace: true})
    }

    if(signedIn){
      return (
          <div>
            <Alert variant="primary">You are signed in.</Alert>
          </div>
        )
    } else {
      return(
        <div className="signin-wrapper">
          <h1>Please Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Username</p>
              <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
              <button type="submit">Sign In</button>
            </div>
          </form>
          <div style={{marginTop:75}}>
            <Alert variant="light">Sign up for an account if you do not have one.</Alert>
          </div>
        </div>
      )
    }

}

export default SignIn