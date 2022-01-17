import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios"
import React, { useState, useEffect} from 'react';
import classes from './Payments.css';
import { useHistory } from "react-router-dom";


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "black",
			fontWeight: 900,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "20px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "black" },
			"::placeholder": { color: "black" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

const Payments=()=> {
    const history=useHistory();
    const [phone,setPhone]=useState("");
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("https://pounders-burger-default-rtdb.firebaseio.com/adminData.json", {
                id:localStorage.getItem('userID'),
                amount: JSON.parse(localStorage.getItem("totalPrice")),
                phone: phone,
                shoppingType: localStorage.getItem("shoppingType"),
                email: localStorage.getItem("email"),
                paymentType:id,
                orders: JSON.parse(localStorage.getItem('itemName')),
                itemQuantity: JSON.parse(localStorage.getItem('totalQuantity')),
                address: localStorage.getItem("userAddress"),
                time: new Date()
                
            });

            if(response.data) {
                console.log("Successful payment")
                setSuccess(true)
                localStorage.setItem("itemName",JSON.stringify([]));
                localStorage.setItem("totalQuantity",0);
                localStorage.setItem("totalPrice",0);
                localStorage.removeItem('shoppingType');
                localStorage.removeItem('email');
                localStorage.removeItem('userID');

                setTimeout(()=>{
                    history.push('./')
                },2000)

            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}
    return (
        <div className={classes.ContactUs}>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormColumn">
                    <CardElement options={CARD_OPTIONS}/>
                    <strong>Phone Number: </strong>
                    <input type='text' required value={phone}  onChange={(e)=>setPhone(e.target.value)}/>
                </div>
            </fieldset>
            <button className={classes.pick}>Pay <strong>${localStorage.getItem("totalPrice")} </strong></button>
        </form>
        :
       <div>
           <h2>Thanks for shopping!!</h2>
       </div> 
        }
            
        </div>
    )
}
export default Payments;