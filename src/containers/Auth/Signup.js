import React,{useRef, useState} from 'react';
import classes from './Signup.css';
import { useAuth } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import Payment from '../../components/PaymentSystem/Payment';
const Signup = () => {
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfrimRef=useRef();
    const nameRef=useRef();
    const phoneRef=useRef();
    const {signup, errorAuth}=useAuth();
    const [error,setError]=useState("");
    const [loading,setLoading]=useState();
    const [loadPay,setLoadPay]=useState(false);
    function handleSubmit(e){
        e.preventDefault();
        if(passwordRef.current.value.length<6){
            return setError("Password too short");
        }
        if(passwordRef.current.value!==passwordConfrimRef.current.value){
            return setError("Password do not match")
        }
        try{
            setLoading(true)
            setError("")
          signup(emailRef.current.value,passwordRef.current.value);
            if(errorAuth){
             //history.push("/payment");
             setLoadPay(false)
              setError("User with this email already exists");  
            }
            else{
                setLoadPay(true);
            }
        }catch{
            setLoadPay(false);
            setError("Failed to create an account")
        }
         setLoading(false);
    }
    return (
        <>
        {loadPay?<Payment/>:
        <>
        <form className={classes.formPage} onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div style={{color:"salmon", padding:"10px 10px"}}>{error}</div>
        <div className={classes.inputTag}>
        <span>Email</span>
        <input type="email" required ref={emailRef}/>
        </div>

        <div className={classes.inputTag}>
        <span>Name</span>
        <input type="text" required ref={nameRef}/>
        </div>

        <div className={classes.inputTag}>
        <span>Phone Number</span>
        <input type="tel" required ref={phoneRef}/>
        </div>

        <div className={classes.inputTag}>
        <span>Password</span>
        <input type="password" required  ref={passwordRef}/>
        </div>

        <div className={classes.inputTag}>
        <span>Confirm Password</span>
        <input type="password" required ref={passwordConfrimRef} />
        </div>
        <button  disabled={loading}>Sign Up</button>
    </form>
      <div className={classes.link}>
        Already have an account? <Link style={{textDecoration:"none", color:"black", fontWeight:"bold" }}to="/login">Log In</Link>
      </div>
      </>
        }
        
        </>
    )
}

export default Signup;