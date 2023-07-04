import React, { useContext } from 'react'
import Alert from 'react-bootstrap/Alert';

import SignUp from '../components/SignUp'

import {AuthContext} from '../App'

const SignUpPage = () => {
  const { signedIn } = useContext(AuthContext);
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
  