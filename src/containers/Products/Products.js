import React, { Component } from 'react'
import Product from './Product/Product'
import Sidebar from '../../components/Layout/Sidebar/Sidebar'

import classes from './Products.css'
import axios from '../../axios'
import {connect} from 'react-redux'
import * as cartActions from '../../store/actions/cart'

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            path: '/products'
        }
    }

    loadData() {
        axios.get(this.props.location.pathname)
            .then(res => {
                console.log(res.data)
                this.setState({ products: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        console.log("cdm")
        this.props.onChangeRedirect()
        this.setState({ path: this.props.location.pathname })
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("cdu")
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setState({ path: this.props.location.pathname })
            this.loadData()
        }
    }

    render() {
        let product = this.state.products.map((element, index) => {
            return <Product name={element.name}
                price={element.price}
                key={element._id}
                availableStatus={element.availableStatus}
                add ={this.props.onAddProduct}
                remove ={this.props.onRemoveProduct}
            />
        })

        return (
            <div className={classes.Main}>
                <div className={classes.Sidebar}><Sidebar /></div>
                <div className={classes.Products}>
                    {product.length !== 0 ? product : <p>Currently these products are Unavailable </p>}
                </div >
            </div>



        );


    }
}

const mapStateToProps = state=>{
return {
}
}

const mapDispatchToProps = dispatch=>{
    return {
        onAddProduct : (productName,price)=>dispatch(cartActions.addProduct(productName,price)),
        onRemoveProduct : (productName,price)=>dispatch(cartActions.removeProduct(productName,price)),
        onChangeRedirect : ()=>dispatch(cartActions.changeRedirect())

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Products)
