import React from 'react'
import classes from './aboutus.css';
const Aboutus = () => {
    return (
        <div style={{display:"block", color:"black"}}>
            <div className={classes.para}>
            <h1 >About Us</h1>
            <strong style={{marginLeft:"20%"}} >
            KFC landed in Australia in 1968 with our first restaurant in Guildford,<br/> 
            Sydney NSW. That was a time when long hair,<br/> flower crowns and lava lamps were still totally groovy, <br/>
            dude. Today we serve over 2 million customers a week across 650+ restaurants.<br/> And even after all these years, 
            the original secret remains under lock and key in our headquarters in Kentucky,<br/> USA. And no, we'll never tell. Nice try</strong>
            </div>
        </div>
    )
}

export default Aboutus
