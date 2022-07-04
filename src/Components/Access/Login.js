import { useState } from 'react';
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { auth } from '../../Firebase/Config';
import './access.css';
import { Link, useNavigate } from 'react-router-dom';
import google from '../../Images/google.png'

const LogIn = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState();

    const handleInput = (event) => {
        let newInput  = { [event.target.name] : event.target.value };
        setUser({...user, ...newInput});
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, user.email, user.password)
          .then((userCredential) => {
          navigate('/')
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
          });
    } 

    const gprovider = new GoogleAuthProvider();

    const handleGoogleSubmit = (e) => {
        e.preventDefault();
        signInWithPopup(auth, gprovider)
        .then((userCredential) => {
        navigate('/')
        })
        .catch((error) => {
            alert(error.message);
        });
    };

    return(
        <div className="sign-container">

            <div className="sign">
                <header>
                    <h2>Let's pick up where we left off yeah?</h2>
                    <h5>Welcome Back !!</h5>
                    <p>Don't have an account?  <Link to='/create' style={{textDecoration: 'none'}} ><span>Sign Up</span></Link> </p>
                </header>
                <section>
                    <p className="google" onClick={handleGoogleSubmit} > <img src={google} alt="google" />  Continue with google</p>
                    <div className="or"> <span></span> OR  <span></span></div>
                    <form onSubmit={handleSignIn} >
                        <p>
                            <label htmlFor="email">Email Address</label> <br />
                            <input type="email" name="email" id="email" required onChange={handleInput}/>
                        </p>
                        <p>
                            <label htmlFor="password">Set Password</label> <br />
                            <input type="password" name="password" id="password" required onChange={handleInput} />
                        </p>
                        <button>Log In</button>
                        <p className='forgot'>Forgot Password</p>
                    </form>
                </section>
            </div>
            
        </div>
    )
}

export default LogIn;