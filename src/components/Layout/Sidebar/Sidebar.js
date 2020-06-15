import React from 'react'
import classes from './Sidebar.css'
import {NavLink} from 'react-router-dom'
const sidebar = (props)=>{
return(

    <div className={classes.Sidebar}>
        <ul>
            <h3>Category</h3>
            <li ><NavLink className={classes.Nav} to='/products'>All</NavLink></li>
            <li ><NavLink className={classes.Nav} to='/products/Vegetables'>Vegetables</NavLink></li>
            <li ><NavLink className={classes.Nav} to='/products/Fruits'>Fruits</NavLink></li>
            <li ><NavLink className={classes.Nav} to='/products/Breakfast'>Breakfast</NavLink></li>
            <li ><NavLink className={classes.Nav} to='/products/Snacks'>Snacks</NavLink></li>
            <li ><NavLink className={classes.Nav} to='/products/Dairy'>Dairy</NavLink></li>
        </ul>

    </div>
);
}

export default sidebar