import React, { useState } from 'react'
import localforage from 'localforage'
import Alert from 'react-bootstrap/Alert';

import SignUp from '../components/SignUp'

const SignUpPage = ({setToken}) => {
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
                    <SignUp />
                </div>
            )
      } else {
        return(
          <div>
            <Alert variant="primary">Please sign out before signing up.</Alert>
          </div>
        )
     }


  };
  
  export default SignUpPage;
  