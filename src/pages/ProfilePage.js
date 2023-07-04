import React, { useContext } from 'react'

import {AuthContext} from '../App'

const ProfilePage = () => {
  const { signedIn, signInToken, signedInUsername} = useContext(AuthContext);
      if(signedIn){
            return(
                <div>
                    <div>You are signed in as {signedInUsername}</div>
                    <div>Your JSON web token is: {signInToken}</div>
                </div>
            )
      }
  
  };
  
  export default ProfilePage;
  