import React,{useState,useEffect} from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import classes from './subMenu.css';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

const SubMenu = props => {

const [subMenu,setSubMenu]=useState([]);
let {name}=useParams();
useEffect(()=>{ 
    let menu={}; 
    return(
        axios.get(`https://pounders-burger-default-rtdb.firebaseio.com/Menu/${name}.json`)
        .then(res=>{
            Object.entries(res.data).map(([key,value])=>(
               menu[key]=value
        ))
            setSubMenu(menu);
        })
    );
},[name]);


const updatePurchaseState =( ingredients )=> {
    const sum = Object.keys( ingredients )
        .map( igKey => {
            return ingredients[igKey];
        } )
        .reduce( ( sum, el ) => {
            return sum + el;
        }, 0 );
        return sum > 0 
}

const disabledInfo = {
    ...props.ings
};
for ( let key in disabledInfo ) {
    disabledInfo[key] = disabledInfo[key] <= 0
}

let formElementArray=[];
for(let key in subMenu){
    formElementArray.push({
        id: key,
        Menu: subMenu[key]
    });

}
let foodMain=(
    <div className={classes.dp}>
    {formElementArray.map(element=>{
        return(
    <div key={element.id}className={classes.p}>
       <img src={process.env.PUBLIC_URL + `/Menu/${element.id}.jpg`} alt="Menu Items"/> 
       <h2 key={element.id}className={classes.para2}>{element.id}</h2> 
       <div className={classes.para1}>
       <strong>{element.Menu.description}</strong>
       <h2>Price: ${element.Menu.price} AUD</h2>
       </div>
       <div className={classes.orderBtn}> 
       <button 
       onClick={()=>props.quantityManage(element.id,element.Menu.price)}>
        Add To Order
        </button>
       </div>
       {name==="Gourmet Burger"?
       <div className={classes.custBtn}>
           <button onClick={()=>props.isPurchasing(element.id,element.Menu.price)}>
               Customise Burger
            </button>
        </div>
        :null}
    </div>);
    })}  
 {
   <Modal show={props.purchasing} modalClosed={props.purchaseCancelHandler}>
        <BuildControls
        ingredientAdded={(ctrl)=>props.onAddingIngredients(ctrl)}
        ingredientRemoved={(ctrl)=>props.onDeletingIngredients(ctrl)}
        disabled={disabledInfo}
        purchasable={updatePurchaseState(props.ings)}
        ordered={props.purchaseHandler}
        price={props.totalPrice} />
    </Modal>
   }
    </div>
);

 
    return (
        <div>
            {foodMain}
        </div>
    )
}

export default SubMenu;
