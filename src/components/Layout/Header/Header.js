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
                        {/* show these routes if logged in */}
                        {localStorage.getItem('token') !== null ? <div>
                            <li className={classes.Li}><NavLink to='/products'  activeClassName={classes.active} >Products</NavLink></li>
                            <li className={classes.Li}><NavLink to='/cart' exact activeClassName={classes.active}>Cart</NavLink></li>
                            <li className={classes.Li}><NavLink to='/orders' exact activeClassName={classes.active}>Orders</NavLink></li>
                            <li className={classes.Li}><NavLink to='/profile' exact activeClassName={classes.active}>Profile</NavLink></li>
                            <li className={classes.Li}><NavLink to='/logout' exact activeClassName={classes.active}>Logout</NavLink></li></div> : null}

                        {/* show these routes if not logged in */}
                        {localStorage.getItem('token') === null ? <div>
                            <li className={classes.Li}><NavLink to='/products'  activeClassName={classes.active} >Products</NavLink></li>
                            <li className={classes.Li}><NavLink to='/cart' exact activeClassName={classes.active}>Cart</NavLink></li>
                            <li className={classes.Li}><NavLink to='/login' exact activeClassName={classes.active}>Login</NavLink></li>
                            <li className={classes.Li}><NavLink to='/signup' exact activeClassName={classes.active}>Signup</NavLink></li></div> : null}



                    </ul>
                </nav>
            </header>
        </div>
    );
}



export default header