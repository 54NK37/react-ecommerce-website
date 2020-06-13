import React, { Component } from 'react'
import classes from './Product.css'
import {connect} from 'react-redux'

class Product extends Component{

        render() {
                return (
                        < div className={classes.Product} >
                        {/* {console.log(this.props.quantiy)} */}
                        <p>{this.props.name}</p>
                        <p>{this.props.price}/-</p>
                        {this.props.availableStatus ?<p>Available</p> : <p>Unvailable</p>}
                        <p><button onClick={()=>this.props.add(this.props.name,this.props.price)}>+</button> 
                         <button onClick={()=>this.props.remove(this.props.name,this.props.price)}>-</button></p>
                         {this.props.cart[this.props.name]>0 ? <p>Quantity : {this.props.cart[this.props.name] }</p>: null}
                         </div>
                )
        }

}

const mapStateToProps = state=>{
        return {
            cart : state.cart
        }
        }
export default connect(mapStateToProps)(Product)