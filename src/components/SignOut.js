import React, { useState} from 'react'
import localforage from 'localforage';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

function signOutUser () {
  localforage.removeItem('token').then(function() {
    console.log('signOutUser localforage removed token.');
  }).catch(function(err) {
    console.log(err);
  });
}

const SignOut = ({setToken}) => {
  const [signedIn,setSignedIn] = useState(false)

  localforage.getItem('token').then(function(value) {
      console.log("token: " + value);
      if(value){
          setSignedIn(true)
      } else{
        setSignedIn(false)
      }
    }).catch(function(err) {
      console.log("Error: " + err);
      setSignedIn(false)
    })
 
  if(signedIn){
    signOutUser();
    setToken(undefined)
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

SignOut.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default SignOut
