import React from 'react'
import classes from './Header.css'
import { NavLink } from 'react-router-dom'
const header = (props) => {

    return (
        <div className={classes.Header}>
            <header >

                        <div className={classes.Title}>
                        <img src={require('../../../assets/images/cart.jpg')} alt='cart' /><h3>Bigcart</h3>
                </div><nav className={classes.Nav} >
                    <ul className={classes.Ul}>
                        {localStorage.getItem('token') !== null ? <div>
                            <li className={classes.Li}><NavLink to='/products' >Products</NavLink></li>
                            <li className={classes.Li}><NavLink to='/cart'>Cart</NavLink></li>
                            <li className={classes.Li}><NavLink to='/orders'>Orders</NavLink></li>
                            <li className={classes.Li}><NavLink to='/profile'>Profile</NavLink></li>
                            <li className={classes.Li}><NavLink to='/logout'>Logout</NavLink></li></div> : null}

                        {localStorage.getItem('token') === null ? <div>
                            <li className={classes.Li}><NavLink to='/products' >Products</NavLink></li>
                            <li className={classes.Li}><NavLink to='/cart'>Cart</NavLink></li>
                            <li className={classes.Li}><NavLink to='/login'>Login</NavLink></li>
                            <li className={classes.Li}><NavLink to='/signup'>Signup</NavLink></li></div> : null}



                    </ul>

                    {/* <button >Sort By</button>
                <ul >
                    <li>Price : Low to High</li>
                    <li>Price : High to Low</li>
                </ul> */}
                </nav>
            </header>
        </div>
    );
}


export default header