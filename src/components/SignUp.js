import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import localforage from 'localforage';

import Alert from 'react-bootstrap/Alert';


async function signupUser(user,first,last,pass) {
        axios.post("https://suprainv-api.caprover.suprahub.us/api/v1/signup",
         {
            username: user,
            first_name: first,
            last_name: last, 
            password: pass
         }
      )
      .then(response => {
        // See: https://axios-http.com/docs/res_schema
        //restructure response.data
        // data format is defined in backend.
        const { message, user_id, user_name,token } = response.data
        console.log("Response status: " + response.status)
        console.log("message: " + message)
      })
}

const SignUp = () => {
    const [username, setUserName] = useState()
    const [first_name, setFirstName] = useState()
    const [last_name, setLastName] = useState()
    const [password, setPassword] = useState()
    const [signedIn,setSignedIn] = useState(false)
    const navigate = useNavigate()
    
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await signupUser(username,first_name,last_name, password);
        console.log("handleSubmit - token (should be valid?): " + token)
        // redirect to /
        navigate("/", {replace: true})
    }

      return(
        <div className="signup-wrapper">
          <h1>Please Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Username</p>
              <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
              <p>First Name</p>
              <input type="text" onChange={e => setFirstName(e.target.value)} />
            </label>
            <label>
              <p>Last Name </p>
              <input type="text" onChange={e => setLastName(e.target.value)} />
            </label>
            <label>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>           
            <div>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      )
    }

export default SignUp