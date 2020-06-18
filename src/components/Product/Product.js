import React from 'react'
import classes from './Product.css'

const  product =(props)=> {


                let img = null
                switch (props.category) {
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
                                <p><strong>{props.name}</strong></p>
                                <p>{props.price}/-</p>
                                {props.availableStatus ? <p className={classes.Available}>Available</p> : <p className={classes.Unvailable}>Unvailable</p>}

                                <p className={classes.AddToCart}><button className={classes.Button} onClick={() => props.add(props.name, props.price)}>+</button> <span> ADD TO CART </span> 
                                        <button className={classes.Button} onClick={() => props.remove(props.name, props.price)}>-</button></p>
                                {props.cart[props.name] > 0 ? <p>Quantity : {props.cart[props.name]}</p> : null}
                        </div>
                )
        }



export default product