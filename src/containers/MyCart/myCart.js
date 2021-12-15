import React,{ useState, useEffect} from 'react';
import Order from '../../components/Order/Order';
import {withRouter} from 'react-router-dom';
import Geocode from "react-geocode";


import classes from './MyCart.css';
const google = window.google;
const MyCart = props => {
    const [latitude,setLatitude]=useState(false);
    const [userAddress,setUserAddress]=useState("");
    const [location,setLocation]=useState({
        loaded: false,
        coordinates:{lat:"",lng:""}
    });

    const onSuccess=(location)=>{
        console.log(location);
        setLocation({
            loaded:true,
            coordinates:{
                lat: location.coords.latitude,
                lng: location.coords.longitude
            },
            lat:true
        })
    };
    const onError=error=>{
        setLocation({
            loaded:true,
            error,
            lat:false

        });
    };
    useEffect(()=>{
        if(!("geoLocation" in navigator)){
            onError({
                code:0,
                message: "GeoLocation not supported"
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    },[])
    const [isDelivery,setIsDelivery]=useState(false);
    const [checkout,setCheckout]=useState(false);
    let orders=props.itemname.map((order,index)=>(
        <Order
            key={index}
            index={index}
            ingredients={order.ing}
            burger={order.burger}
        />
    ))
    const routingHandler=()=>{
        props.history.goBack();
    }

    const pickupHandler=()=>{
        setCheckout(true);
        setIsDelivery(false);
        setLatitude(false);
    }

    const deliverHandler=()=>{
        setCheckout(false);
        if(location.lat){
            setLatitude(false);
            let gps1=new google.maps.LatLng(-37.87954,145.16259);
        let gps2=new google.maps.LatLng(location.coordinates.lat,location.coordinates.lng)
        let distanceMetre= google.maps.geometry.spherical.computeDistanceBetween(gps1,gps2)/1000;
        console.log(distanceMetre);
         if(parseInt(distanceMetre)<=5 && parseInt(distanceMetre)>0){
             Geocode.setApiKey("PUT_YOUR_API_KEY");
             Geocode.setLanguage("en");
             Geocode.setRegion("au");
             Geocode.setLocationType("ROOFTOP");
             Geocode.enableDebug();
             Geocode.fromLatLng(location.coordinates.lat, location.coordinates.lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                setUserAddress(address);
                localStorage.setItem("userAddress",userAddress)
            },
        (error) => {
            console.error(error);
            }
            );
            setCheckout(true);  
        }
        else{
            setIsDelivery(true);
         }
        }
        else{
            setLatitude(true);
        }
        
    }
    return (
        <div>
            <div className={classes.MyCart}>
            <button onClick={routingHandler}><img src="https://img.icons8.com/ios/50/000000/back--v1.png" alt="Go Backward"/></button>
            <h1>Your Orders</h1>
            </div>
            {orders}
            <div className={classes.choose}>
            <button onClick={pickupHandler} className={classes.pick}>Pick Up</button>
            <button onClick={deliverHandler} className={classes.pick}>Delivery</button>
            </div>
            {isDelivery?
            <h2 style={{color:"red", marginLeft:"250px"}}>You can Only Pickup Order, as your location is far from Pounder and we can't deliver You. Sorry!!</h2>
            :null}
            {latitude?<h2 style={{color:"red", marginLeft:"350px"}}>Your denied you location to be access, so you can only pickup</h2>
            :null}
            {checkout?
             <div>
            <button  className={classes.check}>Continue Checkout</button>
            </div>
            :null
            }
           
        </div>
    )
}

export default withRouter(MyCart);

