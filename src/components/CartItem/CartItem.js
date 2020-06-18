import React from 'react'
import classes from './CartItem.css'

const  cartItem =(props)=> {

                const buttons = <p><button className={classes.Button} onClick={() => props.add(props.product, props.price)}>+</button>
                        <button className={classes.Button}  onClick={() => props.remove(props.product, props.price)}>-</button></p>
                console.log("ren")

                        return (< div className={classes.CartItem} >
                                <div className={classes.Img}>
                                <img src={props.url} alt={props.name} />

                                        <p><strong>{props.product}</strong></p>
                                </div>
        
                                <div>
                                        {props.purchasing ? null : <p>Quantity : {props.quantity}</p>}
                                        {props.cart[props.product] > 0 ? <p>Quantity : {props.cart[props.product]}</p> : null}
                                        {props.purchasing ? buttons : null}
        
                                </div>
        
                                <div>
        
                                        <p>Per Quantity Price : {props.price} /-</p>
                                        <p><strong>Price : {props.quantity * props.price}/-</strong></p>
                                </div>
        
                        </div>
        
                        );

               
        

}
export default cartItem