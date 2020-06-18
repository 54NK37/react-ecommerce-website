import React from 'react'
import classes from './Product.css'

const  product =(props)=> {
                let buttons =null;
                let addSubButtons =  <p className={classes.AddToCart}><button className={classes.Button} onClick={() => props.add(props.name, props.price)}>+</button> <span> </span> 
                <button className={classes.Button} onClick={() => props.remove(props.name, props.price)}>-</button></p>
                let addCartButton =<button  className={classes.AddButton} onClick={() => props.add(props.name, props.price)} disabled={props.availableStatus === 'true' ? false : true}>ADD TO CART</button>
                buttons = props.cart[props.name] > 0 ? addSubButtons : addCartButton
                
                return (
                        < div className={classes.Product} >
                                <img src={props.url} alt={props.name} />
                                <p><strong>{props.name}</strong></p>
                                <p>{props.price}/-</p>
                                {props.availableStatus === 'true' ? <p className={classes.Available}>Available</p> : <p className={classes.Unvailable}>Unvailable</p>}

                                {buttons}
                                {props.cart[props.name] > 0 ? <p>Quantity : {props.cart[props.name]}</p> : null}
                        </div>
                )
        }



export default product