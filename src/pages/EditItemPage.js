import React, { useState,useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom';

import axios from "axios";
import Alert from 'react-bootstrap/Alert';

import {AuthContext} from '../App'

const EditItemPage = () => {
    const params = useParams()
    const { signedIn,signInToken,signedInUserID} = useContext(AuthContext);
    const [item_id, set_item_id] = useState(0)
    const [item_name, set_item_name] = useState('')
    const [item_description,set_item_description]=useState('')
    const [item_quantity,set_item_quantity]=useState(0)

    const loadItem = async(item) => {
        
        let api_url= "https://suprainv-api.caprover.suprahub.us/api/v1/item/"+ item
        console.log("GET /item/:id - api_url: " + api_url)
        axios.get(api_url)
          .then(res => {
            set_item_id(res.data.item_id)
            set_item_name(res.data.item_name)
            set_item_description(res.data.item_description)
            set_item_quantity(res.data.quantity)
          })
    }

    useEffect(() => {
        loadItem(params.item_id)
     }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            let api_url= "https://suprainv-api.caprover.suprahub.us/api/v1/item/"+ params.item_id
            console.log("api_url: " + api_url)
            console.log('signInToken: ' + signInToken)
            console.log('signedIn: ' + signedIn)
            console.log('signedInUserID: '+ signedInUserID)
            const response = await axios.put(
                 api_url,
                {   
                   // user_id: signedInUserID,
                    item_name: item_name,
                    item_description: item_description,
                    quantity: item_quantity,
                },
                { headers: {Authorization: `Bearer ${signInToken}` }                
            });
            console.log("Response data: " + response.data);
        } catch (error) {
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
        }
     }
     
    if(!signedIn){
        return (
                <div>
                    <div>
                        <Alert variant="primary">Please sign in to edit Items.</Alert>
                    </div>
                    <p>item_id: {item_id}</p>
                    <p>item_name: {item_name}</p>
                    <p>item_description: {item_description}</p>
                    <p>item_quantity: {item_quantity}</p>
                </div>
              )
    } else {
        return(
                <div>
                <form onSubmit={handleSubmit}>
                <label>
                <p>Name</p>
                <input type="text" 
                    defaultValue={item_name} 
                    onChange={e => set_item_name({item_name:e.target.value})}
                />
                </label>
                <label>
                <p>Description</p>
                <input type="text"
                    defaultValue={item_description}
                    onChange={e => set_item_description({item_description:e.target.value})}
                />
                </label>
                <label>
                <p>Quantity</p>

                <input type="number" 
                    defaultValue={item_quantity}
                    onChange={e => set_item_quantity({item_quantity:e.target.value})}
                />
                </label>
                <div>
                <button type="submit">Submit</button>
                </div>
            </form>
        </div>
        ) 
    }

  };
  
  export default EditItemPage;
  