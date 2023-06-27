import React from 'react';
import axios from 'axios';


// using a class component 
// to simplify query synchronization.
// query -> output

export default class ItemList extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {

    // get all items
    axios.get(`https://suprainv-api.caprover.suprahub.us/api/v1/items`)
      .then(res => {
        const items = res.data;
        this.setState({ items });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.items
            .map(item=>
              <li key={item.item_id}>{item.item_name} {item.item_description} {item.quantity} </li>
            )
        }
      </ul>
    )
  }
}