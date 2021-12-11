import React from "react"
import classes from './footer.css';
var copyYear= new Date().getFullYear();
const footer=(props)=>{
    return( 
        <div className={classes.footer}>
        <a href="/">Privacy</a>
        <a href="/">Terms</a>
        <a href="/">Contact Us</a>
         <p><span>&copy;</span> Pounders Australia. All Rights Reserved. {copyYear}</p>   
        </div>
    );
}
export default footer;