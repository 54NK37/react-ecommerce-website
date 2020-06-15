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
                const buttons = <p><button className={classes.Button} onClick={() => this.props.add(this.props.product, this.props.price)}>+</button>
                        <button className={classes.Button}  onClick={() => this.props.remove(this.props.product, this.props.price)}>-</button></p>
                console.log("ren")

                let img = null
                switch (this.props.product) {
                        case ('Onion'):
                                img = <img src='https://media.istockphoto.com/photos/fresh-fruits-and-vegetables-picture-id589415708?k=6&m=589415708&s=612x612&w=0&h=yk6a8hZI3HnGuPgCkJqWjqzmfbGqy9bucx1ZUXkXwA8=' alt='vegetables' />
                                break;
                        case ('Cucumber'):
                                img = <img src='https://media.istockphoto.com/photos/fresh-fruits-and-vegetables-picture-id589415708?k=6&m=589415708&s=612x612&w=0&h=yk6a8hZI3HnGuPgCkJqWjqzmfbGqy9bucx1ZUXkXwA8=' alt='vegetables' />
                                break;

                        case ('Apple'):
                                img = <img src='https://img1.mashed.com/img/uploads/2017/06/fruit-main.jpg' alt='vegetables' />
                                break;
                        case ('Banana'):
                                img = <img src='https://img1.mashed.com/img/uploads/2017/06/fruit-main.jpg' alt='vegetables' />
                                break;

                        case ('Oats'):
                                img = <img src='https://m.hindustantimes.com/rf/image_size_630x354/HT/p2/2019/08/28/Pictures/_4e7c59d6-c9a5-11e9-80e5-a7e5951f3eba.jpg' alt='vegetables' />
                                break;
                        case ('Bread'):
                                img = <img src='https://m.hindustantimes.com/rf/image_size_630x354/HT/p2/2019/08/28/Pictures/_4e7c59d6-c9a5-11e9-80e5-a7e5951f3eba.jpg' alt='vegetables' />
                                break;

                        default:
                }


                return (< div className={classes.CartItem} >
                        <div className={classes.Img}>
                                {img}
                                <p><strong>{this.props.product}</strong></p>
                        </div>

                        <div>
                                {this.props.purchasing ? null : <p>Quantity : {this.props.quantity}</p>}
                                {this.props.cart[this.props.product] > 0 ? <p>Quantity : {this.props.cart[this.props.product]}</p> : null}
                                {this.props.purchasing ? buttons : null}

                        </div>

                        <div>

                                <p>Per Quantity Price : {this.props.price} /-</p>
                                <p><strong>Price : {this.props.quantity * this.props.price}/-</strong></p>
                        </div>

                </div>

                );





        }

}

const mapStateToProps = state => {
        return {
                cart: state.cart,
                purchasing: state.purchasing
        }
}
export default connect(mapStateToProps)(CartItem)