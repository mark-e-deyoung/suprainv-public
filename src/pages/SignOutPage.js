import React, { useContext } from 'react'
import localforage from 'localforage'
import Alert from 'react-bootstrap/Alert';

import SignOut from '../components/SignOut'

import {AuthContext} from '../App'

const SignOutPage = () => {
  const { signedIn } = useContext(AuthContext);
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