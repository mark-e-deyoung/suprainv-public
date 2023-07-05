import React, { useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

import {AuthContext} from '../App'

const ItemAdd = () => {
    const {signedIn, signInToken,signedInUserID} = useContext(AuthContext);
    const [item_name, setItemName] = useState('')
    const [item_description, setItemDescription] = useState('')
    const [quantity, setQuantity] = useState(0)
    const navigate = useNavigate()
    
    const handleSubmit = async e => {
      e.preventDefault();
      console.log('signInToken: ' + signInToken)
      console.log('signedIn: ' + signedIn)
      console.log('signedInUserID: '+ signedInUserID) 
      let api_url= "https://suprainv-api.caprover.suprahub.us/api/v1/new_item"
      const response = await axios.post(api_url,
          {
              //user_id: signedInUserID,
              item_name: item_name,
              item_description: item_description,
              quantity: quantity
          },
          {
              headers: {
              Authorization: `Bearer ${signInToken}`,
              },
          }
        ).then(response => {
          console.log(response.data);
      }).catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
    })
      navigate("/", {replace: true})
    }

    if(signedIn){
      return(
        <div className="signup-wrapper">
          <h1>Please add new Item.</h1>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Name</p>
              <input type="text" onChange={e => setItemName(e.target.value)}/>
            </label>
            <label>
              <p>Description</p>
              <input type="text" onChange={e => setItemDescription(e.target.value)} />
            </label>
            <label>
              <p>Quantity </p>
              <input type="number" onChange={e => setQuantity(e.target.value)} />
            </label>         
            <div>
              <button type="submit">Add Item</button>
            </div>
          </form>
        </div>
      )

    } else {
      return(
        <div>
          <Alert variant="primary">Please sign in to add a new Item.</Alert>
        </div>
      )
    }

    }

export default ItemAdd