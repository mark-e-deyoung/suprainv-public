import React, { useContext} from 'react'
import Alert from 'react-bootstrap/Alert';

import {AuthContext} from '../App'

const SignOut = () => {
  const { signedIn, setSignedIn, signInToken, setSignInToken, signedInUsername, setSignedInUsername,signedInUserID,setSignedInUserID} = useContext(AuthContext);
  
  if(signedIn){
    setSignInToken('')
    setSignedIn(false)
    setSignedInUsername('')
    setSignedInUserID('')

    return (
        <div>
          <Alert variant="primary">You have signed out.</Alert>
        </div>
      )
  } else {
      return(
          <div>
            <Alert variant="primary">You are not signed in.</Alert>
          </div>
      )
  }

}

export default SignOut
