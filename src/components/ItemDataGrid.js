import React from 'react';
import axios from 'axios';
import 'react-data-grid/lib/styles.css';

import DataGrid from 'react-data-grid';

// using a class component 
// to simplify query synchronization.

export default class ItemList extends React.Component {

  state = {
    rows: [],
    columns: [
      { key: 'item_id', name: 'ID' },
      { key: 'item_name', name: 'Name' },
      { key: 'item_description', name: 'Description' },
      { key: 'quantity', name: 'Quantity' }
    ]
  }

  componentDidMount() {
    let api_url = `https://suprainv-api.caprover.suprahub.us/api/v1/items`
    axios.get(api_url)
      .then(res => {
        const rows = res.data;
        this.setState({ rows });
      })
  }

  render() {
    return (
      <DataGrid columns={this.state.columns} rows={this.state.rows} />
    )
  }
}