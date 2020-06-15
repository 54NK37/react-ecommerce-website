import React, { Component } from 'react'
import CartItem from './CartItem/CartItem'
import classes from './Cart.css'
import axios from '../../axios'
import { connect } from 'react-redux'
import * as cartActions from '../../store/actions/cart'

class Cart extends Component {
    constructor(props) {
        super(props)


        this.state = {
            cart: []
        }



    }

    updateCart = () => {
        const cartt = []
        const keys = Object.keys(this.props.sharedCart)
        keys.forEach((key, index) => {
            if (!key.endsWith('Price')) {
                cartt.push({
                    product: key,
                    price: this.props.sharedCart[keys[index + 1]],
                    quantity: this.props.sharedCart[key],
                    _id: keys[index + 1]
                })
            }
        })

        this.setState({ cart: cartt })

    }

    fetchPreviosCart = () => {

        let token = localStorage.getItem('token')
        axios.get('/users/me/cart', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            this.setState({ cart: res.data })
            this.props.onUpdateDbCart(this.state.cart)
        })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        console.log("cdm")

        if (Object.keys(this.props.sharedCart).length === 0 && this.props.purchasing === false && localStorage.getItem('token') !== null) {
            this.fetchPreviosCart()
            this.props.onUpdateDbCart(this.state.cart)
        }


        if (this.props.purchasing) {
            this.setState({ sharedCart: this.props.sharedCart })
            this.updateCart()
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.sharedCart !== this.props.sharedCart && prevProps.purchasing !==this.props.purchasing ) {
            console.log("cdu")
            this.setState({ sharedCart: this.props.sharedCart })
            this.updateCart()
            if (!this.props.purchasing && localStorage.getItem('token') !== null) {

                this.fetchPreviosCart()
                this.props.onUpdateDbCart(this.state.cart)

            }
            console.log(this.state.cart)
        }

    }


    checkoutHandler = () => {
        this.props.history.push(this.props.redirect)
    }

    render() {

        console.log("render")
        console.log(this.state.cart)
        let cartItem = null
        let totalPrice = 0
        let quantity = 0
        if (this.state.cart !== [])
            cartItem = this.state.cart.map((element) => {
                if (this.props.purchasing) {
                    quantity = this.props.sharedCart[element.product]
                    if (quantity === undefined) {
                        return null;
                    }
                }
                else {
                    quantity = element.quantity
                }

                let price = element.price
                totalPrice += (quantity * price)

                return <CartItem product={element.product}
                    quantity={quantity}
                    price={price}
                    key={element._id}
                    add={this.props.onAddProduct}
                    remove={this.props.onRemoveProduct}
                />


            })
        return (


            <div className={classes.Cart}>

                <div >
                    {(this.props.purchasing) ? <h3>My Current Cart</h3> : <h3>My Previous Unordered Cart</h3>}
                </div>

                {cartItem}
                <p>Total Price : {totalPrice}</p>
                <button className={classes.Submit} onClick={() => this.checkoutHandler()}>Checkout</button>
            </div >


        );
    }

}

const mapStateToProps = state => {
    return {
        sharedCart: state.cart,
        purchasing: state.purchasing,
        redirect: state.redirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddProduct: (productName, price) => dispatch(cartActions.addProduct(productName, price)),
        onRemoveProduct: (productName, price) => dispatch(cartActions.removeProduct(productName, price)),
        onUpdateDbCart: (dbCart) => dispatch(cartActions.updateDbCart(dbCart))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
