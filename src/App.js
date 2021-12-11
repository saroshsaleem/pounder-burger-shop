import React,{useState,useReducer,useEffect} from 'react';
import './App.css';
import HomePage from './containers/HomePage/homepage';
import AboutUs from './containers/AboutUs/aboutus';
import ContactUs from './containers/ContactUs/contactus';
import SubMenu from './containers/SubMenu/SubMenu';
import PicSlider from './components/Navigation/PicSlider/picSlider';
import Navigation from './components/Navigation/Navigation';
import NavigationTop from './components/NavigationTop/navigationTop';
import Footer from './components/Footer/footer'; 
import axios from 'axios';
import MyCart from './containers/MyCart/myCart';
import {
  Switch,
  Redirect,
  Route,
  } from 'react-router-dom';

  const INGREDIENT_PRICES = {
    avacado: 0.5,
    bacon: 0.5,
    beef: 2.5,
    cheese: 0.4,
    chicken: 0.5,
    lettuce: 0.5,
    mayo: 0.5,
    spicyMayo: 0.5,
    tomato: 0.5,
    tomatoRelish: 0.5
};
const App=()=>{
  const [price,setPrice]=useState(0);
  let [menu,setMenu]=useState();
  let [purchasing,setPurchasing]=useState(false);
  let [totalquantity, setTotalQuantity]=useState(JSON.parse(localStorage.getItem("totalQuantity")));
  const [itemname,setItemName]=useState(JSON.parse(localStorage.getItem("itemName")));
  const [totalprice,setTotalPrice]=useState(JSON.parse(localStorage.getItem("totalPrice")));
  const [ingredients,setIngredients]=useState([]);
  const initialState={
    ingredients:{},
    totalPrice: 0,
    error:false,
    building: false
};
  const ingredientReducer=(state,action)=>{
    switch(action.type){
        case 'ADD':
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice: INGREDIENT_PRICES[action.ingredientName]+state.totalPrice,
                building: true
            };
        
        case 'REMOVE':
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice: state.totalPrice-INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
        case 'SET':
            return{
                ...state,
                ingredients:action.ingredients,
                error: false,
                totalPrice: 0,
                building: false
            }
          default:
            return state;

    }
  }

  const [state,dispatch]=useReducer(ingredientReducer,initialState);

  const addIngredients=(name)=>{
   dispatch({type:'ADD', ingredientName:name});
}

 const removeIngredients=(name)=>{
    dispatch({type:'REMOVE', ingredientName:name});
}
const ingredientSet=()=>{
    axios.get('https://pounders-burger-default-rtdb.firebaseio.com/Ingredients.json')
    .then(res=>{
      dispatch({type:'SET',ingredients:res.data})
    })
    .catch(err=>{
      console.log(err);
    })
}

useEffect(()=>{
  localStorage.setItem("totalPrice",totalprice);
  localStorage.setItem("itemName",JSON.stringify(itemname));
  localStorage.setItem("totalQuantity",totalquantity);
  ingredientSet();
},[totalprice,itemname,totalquantity]);

  const quantityManage=(menuName,totprice)=>{
    const ing=state.ingredients;
    setItemName(itemname.concat({[menuName]:totprice,ing}));
    setTotalQuantity(totalquantity+=1);
    setTotalPrice(totalprice+totprice+state.totalPrice);
}
const isPurchasing= (id,pri)=>{
   setMenu(id);
   setPrice(pri);
   setPurchasing(true);
}

const purchaseHandler=()=>{
  console.log(purchasing);
  setPurchasing(false);
  setIngredients(ingredients.concat({[menu]:state.ingredients}));
  setTotalPrice(totalprice+price+state.totalPrice);

  const ing=state.ingredients;
  setItemName(itemname.concat({[menu]:price+state.totalPrice,ing}));
  setTotalQuantity(totalquantity+=1)
}

const purchaseCancelHandler=()=>{
  setPurchasing(false);
}

console.log(itemname);
console.log(ingredients);
  return (
  <div className="App">
  <NavigationTop itemname={itemname} totalquantity={totalquantity} totalprice={totalprice}/>
  <Navigation/>
  <PicSlider/>
  <Switch>
  <Route  path="/" exact component={HomePage}/>
  <Route path="/submenu/:name"><SubMenu 
  quantityManage={quantityManage} 
  onAddingIngredients={addIngredients}
  onDeletingIngredients={removeIngredients}
  isPurchasing={isPurchasing}
  purchaseCancelHandler={purchaseCancelHandler}
  purchaseHandler={purchaseHandler}
  purchasing={purchasing}
  ings={state.ingredients}
  totalPrice={state.totalPrice}
  /></Route>
  <Route path="/mycart" component={MyCart} />
  <Route  path="/about" component={AboutUs}/>
  <Route  Path="/contact" component={ContactUs}/>

  <Redirect to="/" />     
  </Switch>
  <Footer/>
  </div>
  );
}

export default App;
