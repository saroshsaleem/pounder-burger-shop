import React from 'react';
import classes from './grid.css';
import { Link } from 'react-router-dom';
const Grid = (props) => {
    return (
        <div className={classes.dp}>
           { props.menuData.map((slide,index)=>{
                return(
            <Link key={index} className={classes.p} to={`/submenu/${slide}`}>
               <img src={process.env.PUBLIC_URL + `/Menu/${slide}.jpg`} alt="Menu Items"/> 
               <h2 key={index}className={classes.para2}>{slide}</h2>  
            </Link>);
            })}    
        </div>
    );
}

export default Grid;
