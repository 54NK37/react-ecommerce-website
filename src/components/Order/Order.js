import React from 'react'
import classes from './Order.css'
import { withRouter } from 'react-router-dom'

const order = (props) => {

    console.log(props.cart)
    const finalCart = props.cart.map((element, index) => {
        return <tr key={props.cart[index]._id}>
            <td>{props.cart[index].product}</td>
            <td>{props.cart[index].quantity}</td>
            <td>{props.cart[index].price}</td>
            <td>{props.cart[index].quantity * props.cart[index].price}</td>
        </tr>
    })

    let status = null
    switch (props.status) {
        case ('Delivered'):
            status = <span style={{ 'color': 'green', 'fontWeight': 'bold' }}>Delivered</span>
            break;

        case ('Dispatched'):
            status = <span style={{ 'color': 'darkorange', 'fontWeight': 'bold' }}>Dispatched</span>
            break;

        case ('Processing'):
            status = <span style={{ 'color': 'red', 'fontWeight': 'bold' }}>Processing</span>
            break;

        default:
    }
    return (
        <div className={classes.Order}>

            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>

                    {finalCart}
                </tbody>

            </table>
            <p className={classes.Total}>Total Price : {props.totalPrice}</p>
            <p><strong>Order Date :</strong>{props.orderDate}</p>
            <p><strong>Status : </strong> {status}</p>
            {(props.status === "Delivered") ? <p><strong>Delivery Date : </strong> {props.deliveryDate}</p> : null}
            {props.deliveryAddress ? <p><strong>Delivery Address : </strong> {props.deliveryAddress.houseNo + " " + props.deliveryAddress.city + " " + props.deliveryAddress.pin}</p> : null}

        </div>
    );
}

export default withRouter(order)