import React, { useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

import {AuthContext} from '../App'

import Alert from 'react-bootstrap/Alert';
import './SignIn.css';

const SignIn = () => {
    const { signedIn, setSignedIn, signInToken, setSignInToken, signedInUsername, setSignedInUsername, signedInUserID, setSignedInUserID} = useContext(AuthContext);
    const [username, setUserName] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()
    
    const handleSubmit = async e => {
        e.preventDefault();
        
        let api_url= "https://suprainv-api.caprover.suprahub.us/api/v1/signin"
        const response = await axios.post(api_url,
            {
                username: username,
                password: password
            }
          ).then(response => {
            setSignedIn(true);
            setSignedInUsername(response.data.username)
            setSignInToken(response.data.token);
            setSignedInUserID(response.data.id)
            console.log(response.data);
        }).catch(error => {
          console.error("Error: " + error)
      })
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