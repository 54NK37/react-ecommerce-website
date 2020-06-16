import React, { Component } from 'react'
import Order from './Order/Order'
import axios from '../../axios'
import {withRouter} from 'react-router-dom'
import classes from './Orders.css'
class Orders extends Component {
    constructor(props) {
    super(props)
        this.state =
        {
            orders:null
        
        }

    }

    
    componentDidMount() {
        
        console.log("cwm")

            let token = localStorage.getItem('token')
            axios.get('/users/me/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data)
                this.setState({orders : res.data.reverse()})
            })
                .catch(err => {
                    console.log(err)
                })
        
        
    }

 

    render()
    {
        let orders=null
        if(this.state.orders!==null){
         
            orders = this.state.orders.map((element,index)=>{
                return <Order cart={element.cart}
                               totalPrice ={element.totalPrice}
                                orderDate = {element.orderDate}
                                status = {element.status}
                                deliveryDate = {element.deliveryDate}
                                deliveryAddress = {element.deliveryAddress}
                                orderCount = {index}
                                key={element._id}/>
        })
    
        if(this.state.orders.length === 0)
        {
            orders=<p>You have not ordered anything yet !</p>
        }

    }
       
        

        return (
                <div classname={classes.Orders}>
                    <h4>My Orders</h4>
                    {orders}
                </div>
        );
    }
}

export default withRouter(Orders)