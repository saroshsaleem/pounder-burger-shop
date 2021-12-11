import React,{useState} from "react";
import classes from './picSlider.css';
import { SliderData } from "./sliderData";

const PicSlider=props=>{
    const [currentSlides,setCurrentSlides]=useState(0);
    const length=SliderData.length;
    if(!Array.isArray(SliderData)||SliderData.length<=0){
        return null;
    }
    const nextSlide=()=>{
    setCurrentSlides(currentSlides===length-1 ? 0: currentSlides+1);    
    }

    const prevSlide=()=>{
        setCurrentSlides(currentSlides===0 ? length-1: currentSlides-1);
    }
    return(
        <div className={classes.picContainer}>
        <button className={classes.previous} onClick={prevSlide}><img src="https://img.icons8.com/material-sharp/24/000000/long-arrow-left.png" alt="button-left"/></button>
        <button className={classes.next} onClick={nextSlide}><img src= "https://img.icons8.com/ios-glyphs/30/000000/long-arrow-right.png"alt="button-right"/></button>
        
            {SliderData.map((slide,index)=>{
              return(
                <div  className={index===currentSlides?classes.slides.active:classes.slides}key={index}>
                    {index===currentSlides && (<img  src={slide.image} className={classes.image} style={{width:"100%",verticalAllign:"middle"}} alt="pounder shop" />)} 
                </div>
              );  
            })}
       
      
        </div>
    );
}

export default PicSlider;