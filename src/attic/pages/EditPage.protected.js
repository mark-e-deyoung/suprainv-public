import React, { useState } from 'react'
import PropTypes from 'prop-types';

import ItemTable from '../components/ItemTable'

export default function EditPage({ isSignedIn }) {

    if(isSignedIn){
      return <ItemTable />
    }else{
      return <p>You must be signed in to edit</p>
    }
      
  };
  
  EditPage.propTypes = {
    isSignedIn: PropTypes.bool.isRequired
  }
  