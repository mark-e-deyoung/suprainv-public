import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import localforage from 'localforage';
import PropTypes from 'prop-types';

async function updateItem(item_id, item_name, item_description, quantity) {
        // requires JWT to authenticate
        let api_url=  "https://suprainv-api.caprover.suprahub.us/api/v1/item"+ item_id
        axios.put(api_url,
         {
            item_name: item_name,
            item_description: item_description,
            quantitity: quantity
         }
      ).then(response => {
          console.log("Response: " + response)
      }).catch(function (err) {
          console.error("Error: " + err)
      })
      
}

export default function ItemEdit({item_id, item_name, item_description, item_quantity}) {
  console.log("item_id: " + item_id)
  console.log("item_name: "+ item_name)
    const [_id, setItemId] = useState(item_id)
    const [_name, setItemName] = useState(item_name)
    const [_description, setItemDescription] = useState(item_description)
    const [_quantity, setItemQuantity] = useState(item_quantity)
    const navigate = useNavigate()

  console.log("before set _id: " + _id)   
  console.log("before set _name: " + _name)
    setItemId(item_id)
    setItemName(item_name)
    setItemDescription(item_description)
    setItemQuantity(item_quantity)

  console.log("after set _id: " + _id)

    const handleSubmit = async e => {
        e.preventDefault()
        await updateItem(_id, _name, _description, _quantity)
        console.log("updateItem complete")
        //navigate("/edit/"+_id)
        navigate("/edit")
    }

  return(


    <div>
      <h1>Edit Item:</h1>
      <p>item_id: {_id}</p>
      <p>item_name: {_name}</p>
      <p>item_description: {_description}</p>
      <p>quantity: {_quantity}</p>
    </div>
  )
}

