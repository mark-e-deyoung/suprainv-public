import React, { useState } from 'react'
import localforage from 'localforage'
import ItemTable from '../components/ItemTable'

const EditPage = () => {
    const [signInToken, setSignInToken] = useState()
    const [signedIn,setSignedIn] = useState(false)

    localforage.getItem('token').then(function(value) {
        setSignInToken(value)
        console.log("token: " + value);
        if(value){
            setSignedIn(true)
        }
      }).catch(function(err) {
        console.log("Error: " + err);
        setSignedIn(false)
      })

    
    if(!signedIn){
        return <div>You Must be Logged in to edit Items.</div>
    } else {
        return <ItemTable />
    }

  };
  
  export default EditPage;
  