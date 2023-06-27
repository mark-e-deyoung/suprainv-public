import React, { useState} from 'react'
import localforage from 'localforage'
import axios from "axios";

import Alert from 'react-bootstrap/Alert';

import {useParams} from 'react-router-dom'


const EditItemPage = () => {

    const { params } = useParams();
    const [signInToken, setSignInToken] = useState()
    const [signedIn,setSignedIn] = useState(false)
    const [item,setItem]=useState()

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

      console.log("POOOOOOP " + params.item_id)

        let api_url="https://suprainv-api.caprover.suprahub.us/api/v1/item/"+params.item_id
        console.log("api_url: " +api_url)
        const data = axios.get(api_url)
        console.log("data:" + data)

    if(!signedIn){
        return (
            <div>
              <Alert variant="primary">You Must be signed in to edit Items.</Alert>
            </div>
          )
    } else {
        return(
            <div>
                POOOOOOOO {data}
            </div>
        )

    }


}

export default EditItemPage;