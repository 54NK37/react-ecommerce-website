import React, { Component } from 'react'
import axios from '../../axios'
import { connect } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import classes from './Logout.css'
import authenticate from '../../HOC/Auth'
import { PropTypes } from 'prop-types'

class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: []
        }
    }

    componentDidMount() {
        if (this.props.purchasing) {
            let cart = []
            let keys = Object.keys(this.props.sharedCart)
            keys.forEach((element, index) => {
                if (element.endsWith("Price")) {
                    return
                }
                let quantity = this.props.sharedCart[element]
                let price = this.props.sharedCart[keys[index + 1]]
                cart.push({
                    product: element,
                    quantity: quantity,
                    price: price
                })
            })

            // store current unordered cart in state
            this.setState({ cart: cart })
        }
    }

    yesHandler = () => {
        let token = localStorage.getItem('token')
        // store current unordered cart from state to cart in DB,which will be used as previous unorderd cart
        //destroy all tokens from db,ie logout from all devices
        axios.post('/users/logoutAll', this.state.cart, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log('Logged out from all device');
            console.log(res.data)
            localStorage.removeItem('token')
            this.props.onResetCart()
            this.props.history.push('/products')


        })
            .catch(err => {
                console.log(err)
            })
    }

    noHandler = () => {
        let token = localStorage.getItem('token')
        // store current unordered cart from state to cart in DB,which will be used as previous unorderd cart
        //destroy specific tokens from db,ie logout from this device
        axios.post('/users/logout', this.state.cart, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log('Logged out from this device');
            console.log(res.data)
            localStorage.removeItem('token')
            this.props.onResetCart()
            this.props.history.push('/products')

        })
            .catch(err => {
                console.log(err)
            });
    }

    cancelHandler = () => {
        this.props.history.push('/products')
    }
    render() {
        return (
            <div className={classes.Logout}>
                <h3>Logging you out from this device</h3>
                <p>Do you also want to logout from all devices ?</p>
                <button style={{ 'backgroundColor': 'seagreen' }} onClick={this.yesHandler}>Yes</button>
                <button style={{ 'backgroundColor': 'tomato' }} onClick={this.noHandler}>No</button>
                <button style={{ 'backgroundColor': 'yellowgreen' }} onClick={this.cancelHandler}>Cancel Logout</button>
            </div>
        )
    }



}
const mapStateToProps = (state) => {
    return {
        sharedCart: state.cart,
        purchasing: state.purchasing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetCart: () => dispatch(cartActions.resetCart())
    }
}

Logout.propTypes = {
    purchasing: PropTypes.bool
}

// make "/orders" route protected with authenticate HOC
export default connect(mapStateToProps, mapDispatchToProps)(authenticate (Logout))