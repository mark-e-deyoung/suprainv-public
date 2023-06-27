import React, { useState } from 'react'
import localforage from 'localforage'

import Alert from 'react-bootstrap/Alert';

import ItemTable from '../components/ItemTable'

const EditPage = () => {
    const [signInToken, setSignInToken] = useState()
    const [signedIn,setSignedIn] = useState(false)

    localforage.getItem('token').then(function(value) {
        setSignInToken(value)
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

    
    if(!signedIn){
        return (
                <div>
                  <Alert variant="primary">Sign in to edit Items.</Alert>
                  <ItemTable />
                </div>
              )
    } else {
        return(
                <div>
                  <ItemTable />
                </div>
              ) 
    }

  };
  
  export default EditPage;
  