import React, { useState } from 'react'

import Alert from 'react-bootstrap/Alert';

import ItemTable from '../components/ItemTable'

import {AuthContext} from '../App'

const EditPage = () => {
    const { signedIn } = useContext(AuthContext);
    
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
  