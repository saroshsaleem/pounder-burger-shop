import React,{useRef, useState} from 'react';
import classes from './ForgotPassword.css';
import { useAuth} from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';
const ForgotPassword = () => {
    const emailRef=useRef();
    const {resetPassword,errorAuth}=useAuth();
    const [error,setError]=useState("");
    const [loading,setLoading]=useState();
    const [message,setMessage]=useState("");

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            if(errorAuth){
                setError("No register email")
            }
            else{
                setError("");
                setMessage("Check your Email for further instructions");
            }
        }catch{
            setError("Failed to Reset Password")
        }
         setLoading(false);
    }
    return (
        <>
        <form className={classes.formPage} onSubmit={handleSubmit}>
            <h2>Password Reset</h2>
            <div style={{color:"salmon", padding:"10px 10px"}}>{error}</div>
            <div style={{color:"lightGreen", padding:"10px 10px"}}>{message}</div>
            <div className={classes.inputTag}>
            <span>Email</span>
            <input type="email" required ref={emailRef}/>
            </div>
            <button  disabled={loading}>Reset Password</button>
            <Link to="/login">Login</Link>
        </form>
          <div className={classes.link}>
            Need an account? <Link style={{textDecoration:"none", color:"black", fontWeight:"bold" }}to="/signup">Sign Up</Link>
          </div>
        </>
    )
}

export default ForgotPassword;
