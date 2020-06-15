import React, { Component } from 'react'
import classes from './Product.css'
import { connect } from 'react-redux'

class Product extends Component {


        render() {
                let img = null
                switch (this.props.category) {
                        case ('Vegetables'):
                                img = <img src='https://media.istockphoto.com/photos/fresh-fruits-and-vegetables-picture-id589415708?k=6&m=589415708&s=612x612&w=0&h=yk6a8hZI3HnGuPgCkJqWjqzmfbGqy9bucx1ZUXkXwA8=' alt='vegetables' />
                                break;

                        case ('Fruits'):
                                img = <img src='https://img1.mashed.com/img/uploads/2017/06/fruit-main.jpg' alt='vegetables' />
                                break;

                        case ('Breakfast'):
                                img = <img src='https://m.hindustantimes.com/rf/image_size_630x354/HT/p2/2019/08/28/Pictures/_4e7c59d6-c9a5-11e9-80e5-a7e5951f3eba.jpg' alt='vegetables' />
                                break;


                        default:
                }
                return (
                        < div className={classes.Product} >
                                {img}
                                <p><strong>{this.props.name}</strong></p>
                                <p>{this.props.price}/-</p>
                                {this.props.availableStatus ? <p className={classes.Available}>Available</p> : <p className={classes.Unvailable}>Unvailable</p>}

                                <p className={classes.AddToCart}><button className={classes.Button} onClick={() => this.props.add(this.props.name, this.props.price)}>+</button> <span> ADD TO CART </span> 
                                        <button className={classes.Button} onClick={() => this.props.remove(this.props.name, this.props.price)}>-</button></p>
                                {this.props.cart[this.props.name] > 0 ? <p>Quantity : {this.props.cart[this.props.name]}</p> : null}
                        </div>
                )
        }

}

const mapStateToProps = state => {
        return {
                cart: state.cart
        }
}
export default connect(mapStateToProps)(Product)