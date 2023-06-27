import React from 'react'
import axios from "axios";
import { redirect } from "react-router-dom";

import withParams from '../withParams'
import withRouter from '../withRouter'

import Alert from 'react-bootstrap/Alert'
import ItemEdit from "../components/ItemEdit"


async function updateItem(item) {
    // requires JWT to authenticate
    let api_url= "https://suprainv-api.caprover.suprahub.us/api/v1/item"+ item['item_id']
    axios.put(api_url,
     {
        item_name: item['item_name'],
        item_description: item['item_description'],
        quantity: item['quantity']
     }
  ).then(response => {
      console.log("Response: " + response)
  }).catch(function (err) {
      console.log("Error: " + err)
  })
  
}

const handleSubmit = async e => {
    console.log("item_id: " + e.state.item['item_id'])
    console.log("item_name: " + e.state.item['item_name'])
    console.log("item_description: " + e.state.item['item_description'])
    console.log("quantity: " + e.state.item['quantity'])

    e.preventDefault()
    await updateItem(e.state.item)
    console.log("updateItem complete")
    //this.props.navigate("/edit/"+e.state.item['item_id'])
    redirect("edit/"+e.state.item['item_id'])
    //navigate("/edit")
}

// using a class component 
// to simplify query synchronization.

class EditItemPage extends React.Component {
    constructor(props){
        super(props)

        //binding for withRouter
        this.handleSubmit=handleSubmit.bind(this)
        
        this.state = {
            signInToken:'',
            signedIn: false,
            item_id:0,
            item_name:'',
            item_description:'',
            item_quantity:0
          }
      }

  
      componentDidMount() {
        console.log("componenetDidMount()")
        console.log("this.props.token :" + this.props.token)
        console.log("this.state.signInToken: " + this.state.signInToken)
        console.log("this.state.signedIn: " + this.state.signedIn)



        //cache token
        if(this.props.token){
            this.setState({signInToken: this.props.token})
            this.setState({signedIn: true})
            } else {         
                this.setState({signedIn: false})
            }

        console.log("componenetDidMount()")
        console.log("this.props.token :" + this.props.token)
        console.log("this.state.signInToken: " + this.state.signInToken)
        console.log("this.state.signedIn: " + this.state.signedIn)
        
        //get item
        console.log("withParams hack:" + this.props.match.params.item_id)
        let api_url="https://suprainv-api.caprover.suprahub.us/api/v1/item/"+this.props.match.params.item_id
        console.log("GET /item/:id - api_url: " +api_url)
        axios.get(api_url)
          .then(res => {
            const item = res.data;
            console.log("item.quantity: " + item.quantity)
            this.setState({ item_id: item.item_id });
            this.setState({ item_name: item.item_name });
            this.setState({ item_description: item.item_description });
            this.setState({ item_quantity: item.quantity });
          })
      }
      
render(){



    if(this.signedIn){
        return( <div>
                    <form onSubmit={handleSubmit}>
                    <label>
                    <p>Name</p>
                    <input type="text" 
                        defaultValue={this.state.item_name} 
                        onChange={e => this.setState({item_name:e.target.value})}
                    />
                    </label>
                    <label>
                    <p>Description</p>
                    <input type="text"
                        defaultValue={this.state.item_description}
                        onChange={e => this.setState({item_description:e.target.value})}
                    />
                    </label>
                    <label>
                    <p>Quantity</p>

                    <input type="number" 
                        //defaultValue={Number(this.state.item_quantity)} 
                        defaultValue={100}
                        onChange={e => this.setState({item_quantity:e.target.value})}
                     />
                    </label>
                    <div>
                    <button type="submit">Submit</button>
                    </div>
                </form>
            </div>)
            } else {
                // not signed in
                return(
                    <div>
                        <div>

                        </div>
                        <div>
                            <Alert variant="primary">Sign in to edit Items.</Alert>
                        </div>                        
                        <div>
                            <p>item_id: {this.state.item_id}</p>
                            <p>item_name: {this.state.item_name}</p>
                            <p>item_description: {this.state.item_description}</p>
                            <p>quantity: {this.state.item_quantity}</p>
                       </div>
                    </div>
                )
        
            }
        }
 }


 export default withRouter(withParams(EditItemPage));