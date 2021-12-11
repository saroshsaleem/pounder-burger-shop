import React from "react";
import {Link} from 'react-router-dom';
import classes from './navigationTop.css';
import Logo from '../../assets/pounderLogo.png';

const NavigationTop=props=>{
    return(
        <header className={classes.navigationTop}>
          <Link to="/">
          <img src={Logo} alt="Pounder Logo"/>
          </Link>
          {props.totalquantity>0?
          <Link to="/mycart" {...props}
           style={{textDecoration:"none", color:"black"}}>
          <img src="https://img.icons8.com/ios-glyphs/50/000000/shopping-cart.png" alt="my Cart"/>
          <strong>{props.totalquantity}| AUD ${props.totalprice.toFixed(2)}</strong>
          </Link>:
          <div>
          <img src="https://img.icons8.com/ios-glyphs/50/000000/shopping-cart.png" alt="my Cart"/>
          <strong>{props.totalquantity}| AUD ${props.totalprice.toFixed(2)}</strong>
          </div>
          }

          <Link to="/auth" 
          style={{textDecoration:"none", color:"black"}}>
          <img src="https://img.icons8.com/ios-glyphs/50/000000/login-rounded-right.png" alt="SigIn"/>
          <strong>Sign In</strong>
          </Link>
        </header>
    );
}
export default React.memo(NavigationTop);