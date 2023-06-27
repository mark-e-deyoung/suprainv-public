import React, { useState } from 'react'
import localforage from 'localforage'

import { Outlet } from "react-router-dom";

import {Button, Navbar, Nav} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Navigation = () => {

  return (
      <div>
        <div>
        <Navbar bg="light" expand="lg" fixed="top"> 
            <LinkContainer to="/">
              <Navbar.Brand>SupraInv</Navbar.Brand>
            </LinkContainer>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={{ margin: 10 }}>
                <LinkContainer to="/signup">
                    <Button variant="primary">Sign Up</Button>
                  </LinkContainer>
                  <LinkContainer to="/signin">
                    <Button variant="primary">Sign In</Button>
                  </LinkContainer>
                  <LinkContainer to="/signout">
                    <Button variant="primary">Sign Out</Button>
                  </LinkContainer>
     
                </Nav>
            </Navbar.Collapse>      
          </Navbar>
          </div>

          <div style={{marginTop:75}}>
            <Outlet />      
          </div>
          
          <div>
            <Navbar bg="light" expand="lg" fixed="bottom">           
              <LinkContainer to="/">
                <Navbar.Brand>SupraInv</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/new">
                    <Button variant="primary">Add Item</Button>
                  </LinkContainer>   
            </Navbar>
          </div>
      </div>
  )
};

export default Navigation;
