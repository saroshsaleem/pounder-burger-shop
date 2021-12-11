import React,{useState} from 'react';
import axios from 'axios';
import classes from './contactus.css';
import Spinner from '../../components/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

const Contactus = props => {
    const[query,setQuery]= useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value:'',
            validation:{
                required: true,
            },
            valid: false,
            touched:false
        },
        number: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Contact Number'
            },
            value:'',
            validation:{
                required: true,
                minLength: 10,
                maxLength:11
            },
            valid: false,
            touched:false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value:'',
            validation:{
                required: true,
            },
            valid: false,
            touched:false
        },

        complainType: {
            elementType: 'textarea',
            elementConfig: {
                type: 'text',
                placeholder:'type your query here'
            },
            value:'',
            validation:{},
            valid: true
        }
        });
        const [formValid,setFormValid]= useState(false);
        const [loading,setLoading]=useState(false);

const orderHandler = ( event ) => {
    event.preventDefault();
    const time=new Date();
     axios.post( 'https://pounders-burger-default-rtdb.firebaseio.com/query.json', {Query:query,Time:time} )
         .then( response => {
             setLoading(false);
             props.history.replace('./');
         } )
         .catch( error => {
             setLoading(false);
        } );
}

const orderValidity=(value,rules)=>{
    let valid=true;
    if(!rules){
        return true;
    }
    if(rules.required){
        valid=value.trim()!=='' && valid;
    }
    if(rules.minLength){
        valid=value.length>=rules.minLength && valid;
    }
    if(rules.maxLength){
        valid=value.length<=rules.maxLength && valid;
    }
    return valid;
}

const inputValueHandler=(event, identifierValue)=>{
    const updateForm={...query};
    const updateformValue={...updateForm[identifierValue]};
    updateformValue.value=event.target.value;
    updateformValue.valid=orderValidity(updateformValue.value,updateformValue.validation);
    updateformValue.touched=true;
    updateForm[identifierValue]= updateformValue;
    let formValid=true;
    for(let indentifier in updateForm){
        formValid= updateForm[indentifier].valid && formValid
    }
    setQuery(updateForm);
    setFormValid(formValid);
}

    let formElementArray=[];
    for(let key in query){
        formElementArray.push({
            id: key,
            config: query[key]
        });

    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementArray.map(formElementarr=>(
                <Input 
                key={formElementarr.id}
                elementType={formElementarr.config.elementType}
                elementConfig={formElementarr.config.elementConfig}
                value={formElementarr.config.value}
                invalid={!formElementarr.config.valid}
                shouldValidate={formElementarr.config.validation}
                touched={formElementarr.config.touched}
                changed={(event)=>inputValueHandler(event,formElementarr.id)}/>
            )
            )}
             <Button btnType="Success" disabled={!formValid}>Submit Query</Button>
        </form>
    );
    if ( loading ) {
        form = <Spinner />;
    }
    return (
             <div>
            <div className={classes.ContactUs}>
            <h4>Enter your Contact Data</h4>
            {form}
            </div>
        </div>

    )
}

export default Contactus;
