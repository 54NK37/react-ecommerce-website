import React, { Component } from 'react'
import CartItem from '../../components/CartItem/CartItem'
import classes from './Cart.css'
import axios from '../../axios'
import { connect } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import { PropTypes } from 'prop-types'

class Cart extends Component {
    constructor(props) {
        super(props)


        this.state = {
            cart: [],
            products: []
        }



    }

    updateCart = () => {
        const cartt = []
        const keys = Object.keys(this.props.sharedCart)

        // modified cart as required in CartItem
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
        // load previous unordered cart from db,if current cart is empty and user is logged in
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
        // load all products from db
        axios.get('/products')
            .then(res => {
                console.log(res.data)
                this.setState({ products: res.data })
            })
            .catch(err => {
                console.log(err)
            })

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
        // if cart from store is changed ,update component
        if (prevProps.sharedCart !== this.props.sharedCart && prevProps.purchasing !== this.props.purchasing) {
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
        // goto redirect page as stored in store
        // "/login" if user is not logged in and want to checkout
        //"/checkout" if user logged in and want to checkout
        this.props.history.push(this.props.redirect)
    }

    render() {

        console.log("render")
        console.log(this.state.cart)
        let cartItem = null
        let totalPrice = 0
        let quantity = 0
        let url = null

        if (this.state.cart !== [])
            cartItem = this.state.cart.map((element) => {

                switch (element.product) {
                    case ('Onion'):
                        url = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_2LEFtLLZk2dw_OZTqH0DbBA5Hl7aMNKBdSNt8K8nQQLPb5DT&usqp=CAU"
                        break;
                    case ('Cucumber'):
                        url = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhyec_lAmSgLWFJKDJ6htweBjB65o4-t3qL5KOPfGK_TVYHd7z&usqp=CAU"
                        break;

                    case ('Apple'):
                        url = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQIe58vMWmpiby-bzJpKJNd4-cYCo9qrpaXgzEJqqkRQjPTBA9q&usqp=CAU"

                        break;
                    case ('Banana'):
                        url = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-aAHYx1HkmyPo7cxIkZXphtZU09r8ZReE5ZAeZy2uLc48iWWU&usqp=CAU"
                        break;

                    case ('Oats'):
                        url = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT6jd9Ed9SdGrtWXW1ilZoI-NUg_sViMG9k9BQKNWk3oLNma5cb&usqp=CAU"
                        break;
                    case ('Bread'):
                        url = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRPDIbEnS9HL4rps2Gs9JWg6niBl4Ei97mtxfil6U9fbMHPeRh-&usqp=CAU"
                        break;

                    default:
                }

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
                    cart={this.props.sharedCart}
                    purchasing={this.props.purchasing}
                    url={url}
                />


            })
        return (


            <div className={classes.Cart}>

                <div >
                    {/* load current ongoing cart OR previous unordered cart from db */}
                    {(this.props.purchasing) ? <h3>My Current Cart</h3> : <h3>My Previous Unordered Cart</h3>}
                </div>

                {cartItem}
                <p className={classes.Total}>Total Price : {totalPrice}</p>
                <button className={classes.Submit} onClick={() => this.checkoutHandler()} disabled={totalPrice === 0 ? true : false}>Checkout</button>
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

Cart.propTypes = {
    purchasing: PropTypes.bool,
    redirect: PropTypes.string
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
