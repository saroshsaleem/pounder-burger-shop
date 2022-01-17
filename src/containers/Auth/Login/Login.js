import React,{useRef, useState} from 'react';
import classes from './Login.css';
import { useAuth} from '../../../Context/AuthContext';
import { Link} from 'react-router-dom';
import Payment from '../../../components/PaymentSystem/Payment';
const Login = () => {
    const emailRef=useRef();
    const passwordRef=useRef();
    const {login,errorAuth}=useAuth();
    const [error,setError]=useState("");
    const [loading,setLoading]=useState();
    const [loadPay,setLoadPay]=useState(false);
     async function handleSubmit(e){
        e.preventDefault();
        try{
            setError("");
            setLoading(true);
            await login(emailRef.current.value,passwordRef.current.value);
            if(errorAuth){
              setError("Crediential Wrong or user not found");
              setLoadPay(false);
            }
            else{
              setError("");
              setLoadPay(true);
              //history.push('/payment');
            }
        }catch{
            setError("Failed to Login")
            setLoadPay(false);
        }
         setLoading(false);
    }

    return (
        <>
        {loadPay?<Payment/>:
        <>
         <form className={classes.formPage} onSubmit={handleSubmit}>
         <h2>Log In</h2>
         <div style={{color:"salmon", padding:"10px 10px"}}>{error}</div>
         <div className={classes.inputTag}>
         <span>Email</span>
         <input type="email" required ref={emailRef}/>
         </div>

         <div className={classes.inputTag}>
         <span>Password</span>
         <input type="password" required  ref={passwordRef}/>
         </div>
         <button  disabled={loading}>Log In</button>
         <Link to="/forgot-password">Forgot Password?</Link>
     </form>
       <div className={classes.link}>
         Need an account? <Link style={{textDecoration:"none", color:"black", fontWeight:"bold" }}to="/signup">Sign Up</Link>
       </div>
       </>
        }
       
        </>
    )
}

export default Login;
