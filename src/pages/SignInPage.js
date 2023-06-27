import React, { useState } from 'react'
import localforage from 'localforage'
import Alert from 'react-bootstrap/Alert';

import SignIn from '../components/SignIn'

const SignInPage = ({setToken}) => {
    const [signedIn,setSignedIn] = useState(false)

    localforage.getItem('token').then(function(value) {
        console.log("token: " + value);
        if(value){
            setToken(value)
            setSignedIn(true)
        } else {
          setSignedIn(false)
        }
      }).catch(function(err) {
        console.log("Error: " + err);
        setSignedIn(false)
      })

      if(!signedIn){
            return(
                <div>
                    <SignIn setToken={setToken} />
                </div>
            )
      } else {
        return(
          <div>
            <Alert variant="primary">You are signed in.</Alert>
          </div>
        )
     }


  };
  
  export default SignInPage;
  