import React, { useContext } from 'react'
import Alert from 'react-bootstrap/Alert';

import SignIn from '../components/SignIn'
import {AuthContext} from '../App'

const SignInPage = ({setToken}) => {
    const { signedIn } = useContext(AuthContext);

      if(!signedIn){
            return(
                <div>
                    <SignIn />
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
  