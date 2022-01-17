import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Payments from "./Payments";

const PUBLIC_KEY = "pk_live_51K7fzbFkrYVozdtL8R6yueDIsVSzDgT4bMGVgPf3FwgA7cFUQUYr7HIoC6BOZ7J9DnrRfzAiAvU5IVWogzKVKZcG00vpBkyh5b";
const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function Payment() {
	return (
		<>
<Elements stripe={stripeTestPromise}>
			<Payments />
		   </Elements>
		</>
		
	)
}
// import React,{useState} from 'react';
// import axios from 'axios';
// import classes from './Payments.css';
// import Spinner from '../../components/Spinner/Spinner';
// import Input from '../../components/UI/Input/Input';
// import Button from '../../components/UI/Button/Button';

// const Payment = props => {
//     const[query,setQuery]= useState({
//         name: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'text',
//                 placeholder: 'Your Name'
//             },
//             value:'',
//             validation:{
//                 required: true,
//             },
//             valid: false,
//             touched:false
//         },
//         number: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'text',
//                 placeholder: 'Your Contact Number'
//             },
//             value:'',
//             validation:{
//                 required: true,
//                 minLength: 10,
//                 maxLength:11
//             },
//             valid: false,
//             touched:false
//         },
// 		cardNumber: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'text',
//                 placeholder: 'Your Card Number'
//             },
//             value:'',
//             validation:{
//                 required: true,
//                 minLength: 16,
//                 maxLength:16
//             },
//             valid: false,
//             touched:false
//         },
// 		CvvCode: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'text',
//                 placeholder: 'Your CVV code'
//             },
//             value:'',
//             validation:{
//                 required: true,
//                 minLength: 3,
//                 maxLength:3
//             },
//             valid: false,
//             touched:false
//         },
// 		expireDate: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'text',
//                 placeholder: 'MM/YY'
//             },
//             value:'',
//             validation:{
//                 required: true,
//                 minLength: 5,
//                 maxLength:5
//             },
//             valid: false,
//             touched:false
//         },
		
//         });
// 		const [success, setSuccess ] = useState(false)
//         const [formValid,setFormValid]= useState(false);
//         const [loading,setLoading]=useState(false);

// const orderHandler = ( event ) => {
//     event.preventDefault();
//     const time=new Date();
// 	axios.post("https://pounders-burger-default-rtdb.firebaseio.com/adminData.json", {
// 		id:localStorage.getItem('userID'),
// 		amount: JSON.parse(localStorage.getItem("totalPrice"))*100,
// 		shoppingType: localStorage.getItem("shoppingType"),
// 		email: localStorage.getItem("email"),
// 		phone: query.number.value,
// 		name: query.name.value,
// 		cardNumber: query.cardNumber.value,
// 		CvvCode: query.CvvCode.value,
// 		expireDate: query.expireDate.value,
// 		orders: JSON.parse(localStorage.getItem('itemName')),
// 		itemQuantity: JSON.parse(localStorage.getItem('totalQuantity')),
// 		time: time
// 	})
//          .then( response => {
//              setLoading(false);
// 			 console.log("Successful payment")
// 			 setSuccess(true)
// 			 localStorage.removeItem('itemName');
// 			 localStorage.removeItem('totalQuantity');
// 			 localStorage.removeItem('totalPrice');
// 			 localStorage.removeItem('shoppingType');
// 			 localStorage.removeItem('email');
// 			 localStorage.removeItem('userID');
// 			 setTimeout(()=>{
// 				props.history.replace('./');
// 			 },2000)
//          } )
//          .catch( error => {
//              setLoading(false);
// 			 console.log("Error", error)
//         } );
// }

// const orderValidity=(value,rules)=>{
//     let valid=true;
//     if(!rules){
//         return true;
//     }
//     if(rules.required){
//         valid=value.trim()!=='' && valid;
//     }
//     if(rules.minLength){
//         valid=value.length>=rules.minLength && valid;
//     }
//     if(rules.maxLength){
//         valid=value.length<=rules.maxLength && valid;
//     }
//     return valid;
// }

// const inputValueHandler=(event, identifierValue)=>{
//     const updateForm={...query};
//     const updateformValue={...updateForm[identifierValue]};
//     updateformValue.value=event.target.value;
//     updateformValue.valid=orderValidity(updateformValue.value,updateformValue.validation);
//     updateformValue.touched=true;
//     updateForm[identifierValue]= updateformValue;
//     let formValid=true;
//     for(let indentifier in updateForm){
//         formValid= updateForm[indentifier].valid && formValid
//     }
//     setQuery(updateForm);
//     setFormValid(formValid);
// }

//     let formElementArray=[];
//     for(let key in query){
//         formElementArray.push({
//             id: key,
//             config: query[key]
//         });

//     }
//     let form = (
//         <form onSubmit={orderHandler}>
//             {formElementArray.map(formElementarr=>(
//                 <Input 
//                 key={formElementarr.id}
//                 elementType={formElementarr.config.elementType}
//                 elementConfig={formElementarr.config.elementConfig}
//                 value={formElementarr.config.value}
//                 invalid={!formElementarr.config.valid}
//                 shouldValidate={formElementarr.config.validation}
//                 touched={formElementarr.config.touched}
//                 changed={(event)=>inputValueHandler(event,formElementarr.id)}/>
//             )
//             )}
//              <Button btnType="Success" disabled={!formValid}>Pay <strong>${localStorage.getItem('totalPrice')}</strong></Button>
//         </form>
//     );
//     if ( loading ) {
//         form = <Spinner />;
//     }
//     return (
//              <div>
// 			  {!success ? 
//             <div className={classes.ContactUs}>
//             <h4>Payment Online</h4>
//             {form}
//             </div>:
// 			 <div>
// 			 <h2>Thanks for shopping!!</h2>
// 		     </div> 
// 			}
//         </div>

//     )
// }

// export default Payment;
