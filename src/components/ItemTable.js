import React from 'react';
import axios from 'axios';

import {Button, Table} from 'react-bootstrap'
import {withRouter} from '../withRouter';

// using a class component 
// to simplify query synchronization.

 class ItemTable extends React.Component {
  constructor(){
    super()
    
    //binding for withRouter
    this.renderTable=this.renderTable.bind(this)
    
    this.state = {
      items: []
    }
  }
  
  componentDidMount() {
    axios.get(`https://suprainv-api.caprover.suprahub.us/api/v1/items`)
      .then(res => {
        const items = res.data;
        this.setState({ items });
      })
  }

  renderTable = () => {
    return this.state.items.map( item => {
      return ( 
        // using item.item_id for tr key because they are unique in this system
        <tr key={item.item_id}>
        <td>
          <Button onClick={()=>this.props.navigate("/edit/" + item.item_id)}><i className="bi bi-pencil-square"></i></Button>
        </td>
        <td>{item.item_id}</td>
        <td>{item.item_name}</td>
        <td>{item.item_description.substring(0, 99)} {item.item_description.length >= 99 && '...'}</td>
        <td>{item.quantity}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <h1 id="title">Items</h1>
        <Table id="items" striped bordered hover>
          <thead>
            <tr>
              <th>Action</th>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTable()}
          </tbody>
        </Table>

      </div>
    )
  }
}

export default withRouter(ItemTable)