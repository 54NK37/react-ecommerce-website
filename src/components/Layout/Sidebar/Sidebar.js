import React from 'react'
import classes from './Sidebar.css'
import { NavLink } from 'react-router-dom'
const sidebar = (props) => {
    return (

        <div className={classes.Sidebar}>
            <ul>
                {/* sort based on categories */}
                <h3>Category</h3>
                <li ><NavLink className={classes.Nav} to='/products' exact activeClassName={classes.active}>All</NavLink></li>
                <li ><NavLink className={classes.Nav} to='/products/Vegetables' exact activeClassName={classes.active}>Vegetables</NavLink></li>
                <li ><NavLink className={classes.Nav} to='/products/Fruits' exact activeClassName={classes.active}>Fruits</NavLink></li>
                <li ><NavLink className={classes.Nav} to='/products/Breakfast' exact activeClassName={classes.active}>Breakfast</NavLink></li>
                <li ><NavLink className={classes.Nav} to='/products/Snacks' exact activeClassName={classes.active}>Snacks</NavLink></li>
                <li ><NavLink className={classes.Nav} to='/products/Dairy' exact activeClassName={classes.active}>Dairy</NavLink></li>
            </ul>

        </div>
    );
}

export default sidebar