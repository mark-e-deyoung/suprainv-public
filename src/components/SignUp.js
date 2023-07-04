import React, { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

import {AuthContext} from '../App'

const SignUp = () => {
    const { signedIn } = useContext(AuthContext);
    const [username, setUserName] = useState()
    const [first_name, setFirstName] = useState()
    const [last_name, setLastName] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()
  
    async function signupUser(user,first,last,pass) {
        let api_url= "https://suprainv-api.caprover.suprahub.us/api/v1/signup"
        const response = axios.post(api_url,
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
        console.log("Response status: " + response.status)
        console.log("Response data.message: " + response.data.message)
      })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        const response = await signupUser(username,first_name,last_name, password);
        console.log("Response: "+ response)
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