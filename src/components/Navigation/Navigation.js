import React from 'react';
import classes from './Navigation.css';
import {NavLink} from 'react-router-dom';

const Navigation=props=>{
    return(
        <div className={classes.Navigation}>
                <NavLink className={classes.Nav} activeClassName={classes.active}to="/">Home</NavLink>
                <NavLink className={classes.Nav} activeClassName={classes.active}to="/about">About Us</NavLink>
                <NavLink className={classes.Nav} activeClassName={classes.active}to="/contact">Contact Us</NavLink>

        </div>
    );
}

export default Navigation;