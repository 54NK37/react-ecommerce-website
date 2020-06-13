import React, { Component } from 'react'
import classes from './CartItem.css'
import { connect } from 'react-redux'

class CartItem extends Component {

        componentDidUpdate(prevProps, prevState) {
                console.log("cdu")
                if (prevProps.cart !== this.props.cart) {
                        this.setState({})

                }
        }


        render() {
                const buttons = <p><button onClick={() => this.props.add(this.props.product, this.props.price)}>+</button>
                <button onClick={() => this.props.remove(this.props.product, this.props.price)}>-</button></p>
                console.log("ren")
                return ( < div className={classes.CartItem} >
                        <div>
                                <p>{this.props.product}</p>
                                {this.props.purchasing ? null : <p>Quantity : {this.props.quantity}</p>}
                                {this.props.cart[this.props.product] > 0 ? <p>Quantity : {this.props.cart[this.props.product]}</p> : null}
                                <p>{this.props.price}</p>
                                {this.props.purchasing ? buttons : null}
                                <p>{this.props.quantity * this.props.price}</p>
                        </div>
                        </div>
                
                );





        }

}

const mapStateToProps = state => {
        return {
                cart: state.cart,
                purchasing : state.purchasing
        }
}
export default connect(mapStateToProps)(CartItem)