import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios'
import * as cartActions from '../../store/actions/cart'
import classes from './Checkout.css'
class Checkout extends Component {
    // constructor(props)
    // {
    //     super(props)
    //     this.state = {
    //         order : null
    //     }
    // }

    cancelHandler = () => {
        this.props.history.goBack()
    }

    cartt = []
    tp = 0
    add = ''

    //   shouldComponentUpdate(nextProps, nextState) {
    //       if(this.props !== nextProps)
    //         return true
    //   }
    //   componentDidMount() {

    //   }


    placeOrderHadler = (event) => {
        event.preventDefault()
        let token = localStorage.getItem('token')
        let orders = {
            deliveryAddress: {}
        }
        orders.deliveryAddress.houseNo = document.getElementById('hno').value
        orders.deliveryAddress.city = document.getElementById('city').value
        orders.deliveryAddress.pin = parseInt(document.getElementById('pin').value)
        orders.cart = this.cartt
        orders.totalPrice = this.tp
        orders.purchasing = this.props.purchasing
        // this.setState({order : orders})
        console.log(orders)

        axios.post('/users/me/placeorder', orders, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log("Order placed successfully")
            console.log(res.data)
        })
            .catch(err => {
                console.log(err)
            })

        alert("Order placed successfully")
        this.props.onResetCart()
        this.props.history.push('/products')



    }
    render() {

        let totalPrice = 0
        let cart = null

        if (this.props.purchasing === true) {
            let keys = Object.keys(this.props.cart)
            cart = keys.map((element, index) => {
                if (element.endsWith("Price")) {
                    return null
                }
                let quantity = this.props.cart[element]
                let price = this.props.cart[keys[index + 1]]
                totalPrice += quantity * price

                this.cartt.push({
                    product: element,
                    quantity: quantity,
                    price: price
                })

                console.log(this.cartt)
                this.tp = totalPrice
                return <tr key={keys[index + 1]}>
                    <td>{element}</td>
                    <td>{price}</td>
                    <td>{quantity}</td>
                    <td>{quantity * price}</td>
                </tr>
            })
        }
        else {
            cart = this.props.dbCart.map((element, index) => {
                let quantity = element.quantity
                let price = element.price
                totalPrice += quantity * price
                this.cartt.push({
                    product: element.product,
                    quantity: quantity,
                    price: price
                })

                this.tp = totalPrice

                return <tr key={element._id}>
                    <td>{element.product}</td>
                    <td>{price}</td>
                    <td>{quantity}</td>
                    <td>{quantity * price}</td>
                </tr>
            })
        }

        return (
            <div className={classes.Checkout}>
                <h3>Summary</h3>
                <table>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>

                    {cart}
                </table>
                <form>
                    <div className={classes.Address}>
                        <label >Delivery Address</label>
                        <input id="hno" placeholder={"House No"} />
                        <input id="city" placeholder={"City"} required />
                        <input id="pin" placeholder={"Pin"} required />
                    </div>
                    <button className={classes.Button} style={{ 'backgroundColor': 'red' }} onClick={this.cancelHandler}>Cancel</button>
                    <button className={classes.Button} style={{ 'backgroundColor': 'green' }} type='submit' onClick={(event) => this.placeOrderHadler(event)}>Placeorder</button>
                </form>
                <p  className={classes.Total}>TotalPrice : {totalPrice}</p>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        cart: state.cart,
        dbCart: state.dbCart,
        purchasing: state.purchasing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetCart: () => dispatch(cartActions.resetCart())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)