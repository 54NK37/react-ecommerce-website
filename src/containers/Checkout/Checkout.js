import React, { Component } from 'react'
import { connect } from 'react-redux'

class Checkout extends Component {

    cancelHandler = () => {
        this.props.history.goBack()
    }
    render() {
        let totalPrice = 0
        let cart = []

        if (this.props.purchasing === true) {
            let keys = Object.keys(this.props.cart)
            cart = keys.map((element, index) => {
                if (element.endsWith("Price")) {
                    return null
                }
                let quantity = this.props.cart[element]
                let price = this.props.cart[keys[index + 1]]
                totalPrice += quantity * price
                return <div key={keys[index + 1]}>
                    <p>{element}</p>
                    <p>{quantity}</p>
                    <p>{price}</p>
                    <p>{quantity * price}</p>
                </div>
            })
        }
        else {
            cart = this.props.dbCart.map((element, index) => {
                let quantity = element.quantity
                let price = element.price
                totalPrice += quantity * price
                console.log(element)
                return <div key={element._id}>
                        <p>{element.product}</p>
                    <p>{quantity}</p>
                    <p>{price}</p>
                    <p>{quantity * price}</p>
                        </div>
            })
        }

        return (
            <div>
                <h3>Summary</h3>
                {cart}
                <form>
                    <div>
                        <label >Delivery Address</label>
                        <input id="hno" placeholder={"House No"} />
                        <input id="city" placeholder={"City"} required />
                        <input id="pin" placeholder={"Pin"} required />
                    </div>
                    <button onClick={this.cancelHandler}>Cancel</button>
                    <button>Placeorder</button>
                </form>
                <p>TotalPrice : {totalPrice}</p>
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

export default connect(mapStateToProps)(Checkout)