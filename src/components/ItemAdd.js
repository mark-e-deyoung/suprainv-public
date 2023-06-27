import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

async function addItem(name, desc, quant) {
        console.log("requires JWT authentication token")
        axios.post("https://suprainv-api.caprover.suprahub.us/api/v1/item",
         {
            item_name: name,
            item_desctiption: desc,
            quantity: quant
         }
      )
      .then(response => {
        // See: https://axios-http.com/docs/res_schema
        //restructure response.data
        // data format is defined in backend.
        const { message, user_id, user_name,token } = response.data
        console.log("Response status: " + response.status)
        console.log("message: " + message)
      })
}

const ItemAdd = () => {
    const [item_name, setItemName] = useState()
    const [item_description, setItemDescription] = useState()
    const [quantity, setQuantity] = useState()
    const navigate = useNavigate()
    
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await addItem(item_name,item_description,quantity);
        console.log("handleSubmit - token (should be valid?): " + token)
        // redirect to /
        navigate("/", {replace: true})
    }

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
    }

export default ItemAdd