import React, { useState } from 'react'
import localforage from 'localforage'
import Alert from 'react-bootstrap/Alert';

import SignOut from '../components/SignOut'

const SignOutPage = (props) => {
    const [signedIn,setSignedIn] = useState(false)

    localforage.getItem('token').then(function(value) {
        console.log("token: " + value);
        if(value){
            setSignedIn(true)
        } else {
          setSignedIn(false)
        }
      }).catch(function(err) {
        console.log("Error: " + err);
        setSignedIn(false)
      })

      if(signedIn){
            return(
                <div>
                    <SignOut />
                </div>
            )
      } else {
        return(
          <div>
            <Alert variant="primary">You are already signed out.</Alert>
          </div>
        )
     }


  };
  
  export default SignOutPage;