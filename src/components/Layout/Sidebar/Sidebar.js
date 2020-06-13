import React from 'react'
// import classes from './Sidebar.css'
import {NavLink} from 'react-router-dom'
const sidebar = (props)=>{
return(

        <ul>
            <h4>Category</h4>
            <li><NavLink to='/products'>All</NavLink></li>
            <li><NavLink to='/products/Vegetables'>Vegetables</NavLink></li>
            <li><NavLink to='/products/Fruits'>Fruits</NavLink></li>
            <li><NavLink to='/products/Breakfast'>Breakfast</NavLink></li>
            <li><NavLink to='/products/Snacks'>Snacks</NavLink></li>
            <li><NavLink to='/products/Dairy'>Dairy</NavLink></li>
        </ul>
);
}

export default sidebar