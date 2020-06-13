import React from 'react'
import classes from './Order.css'
import { withRouter } from 'react-router-dom'

const order = (props) => {

    console.log(props.cart)
    const finalCart = props.cart.map((element,index) => {
        return < div className={classes.CartItem} key={props.cart[index]._id} >
            <div>
                <p>{props.cart[index].product}</p>
                 <p>Quantity :{ props.cart[index].quantity}</p> 
                <p>{props.cart[index].price}</p>
                <p>{props.cart[index].quantity* props.cart[index].price}</p>
            </div>
        </div>
    })
    return (
        <div className={classes.Order}>
            {finalCart}
            <p>Total Price : {props.totalPrice}</p>
            <p>Order Date : {props.orderDate}</p>
            <p>Status : {props.status}</p>
            {(props.status === "Delivered") ? <p>Delivery Date : {props.deliveryDate}</p> : null
            }

        </div>
    );
}

export default withRouter(order)