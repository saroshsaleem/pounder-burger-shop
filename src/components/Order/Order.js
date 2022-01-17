import React,{useEffect,useState} from 'react';
import classes from './Order.css';

const Order = props => {
    const ingredients=[];
    const burger=[];
    const [items,setItems]=useState(JSON.parse(localStorage.getItem('itemName')));
    const [finalPrice,setFinalPrice]=useState(JSON.parse(localStorage.getItem('totalPrice')));
    const [finalQuantity,setFinalQuantity]=useState(JSON.parse(localStorage.getItem('totalQuantity')));

    for (let burgerName in props.burger){
        burger.push({
            name:burgerName,
            price:props.burger[burgerName]
        })
    }
    const deleteHandler=()=>{
        console.log(items[props.index]);
        console.log(burger[0].price);
       setFinalPrice(finalPrice-burger[0].price);
       setFinalQuantity(finalQuantity-1);
       setItems(items.splice(props.index,1));
      // burger.splice(props.index,1);
       console.log(items);
       localStorage.setItem("itemName",JSON.stringify(items));
      //console.log(item[props.index]);
    //   localStorage.setItem('itemName',JSON.stringify(items));
    }
    useEffect(()=>{
        localStorage.setItem("totalQuantity",finalQuantity);
        localStorage.setItem("totalPrice",finalPrice);
    },[items,finalPrice,finalQuantity]);

    for (let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    let ingredientOutput= null
        let add=0;
       Object.values(props.ingredients)
        .map(i=>{
            return add+=i
        })
        if(add !==0){
          ingredientOutput=  ingredients.map(ig=>{
            return <span
                style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '10px 8px',
                border: '1px solid #ccc',
                padding: '5px 5px'
                }}
                key={ig.name}
            > {ig.name} ({ig.amount}) </span>;
            })
        }

    const burgerOutput= burger.map(bur=>{
        return(
            <div key={bur.name} style={{display:"flex", flexDirection:"column",alignItems:'start', JustifyContent:"space-around"}}>
            <h2>{bur.name}</h2>
            <strong>Price: AUD ${bur.price}</strong>
            </div>
        );
    })
    return (
       <div className={classes.Order}>
            {burgerOutput}
            {ingredientOutput}
            <button onClick={deleteHandler}>Delete</button>
        </div>
    )
}

export default Order
