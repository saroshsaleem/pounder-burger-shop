import React,{useState,useEffect} from 'react'
import Grid from '../../components/GridComponents/grid';
import axios from 'axios';

const Homepage = () => {
    let [menuData,setMenuData]=useState([]);

    useEffect(()=>{
        return(
        axios.get("https://pounders-burger-default-rtdb.firebaseio.com/Menu.json")
    .then(res=>{
       setMenuData(Object.keys(res.data));
    })
    .catch(err=>{
        console.log(err);
    }));
    },[]);
    return (
        <div>
      <Grid menuData={menuData}/>
        </div>
    )
}

export default Homepage;
