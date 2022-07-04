import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {useState} from 'react';
import { addDoc, collection } from "firebase/firestore";
import { auth, projectFirestore } from "../../Firebase/Config";
import google from '../../Images/google.png'
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";
import './access.css';

const SignUp = () => {
    let navigate = useNavigate();
    const {setLoggedUser} = useGlobalContext();

    const [newUser, setNewUser] = useState({});
    const userRef = collection(projectFirestore, "users")

    const handleInput = (event) => {
        let newInput  = { [event.target.name] : event.target.value };
        setNewUser({...newUser, ...newInput});
    }
    const handleEmail = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
        .then((userCredential) => {
            const User = userCredential.user;
            addDoc(userRef, {
                username : newUser.name,
                email: newUser.email,
                userID : User.uid
            })
            updateProfile(auth.currentUser, {
                displayName: newUser.name
            }).then(() => {
                // Profile updated!
            }).catch((error) => {
                console.log(error)
            });
            setLoggedUser(User.displayName)        
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
            navigate('/');
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

    return (
        <div className="sign-container">

            <div className="sign">
                <header>
                    <h2>Create an Account</h2>
                    <h5></h5>
                    <p>Have an account?  <Link to='/login' style={{textDecoration: 'none'}} ><span>Login In</span></Link> </p>
                </header>
                <section>
                    <p className="google" > <img src={google} alt="google" onClick={handleGoogleSubmit} />  Continue with google</p>
                    <div className="or"> <p></p> OR  <p></p></div>
                    <form onSubmit={handleEmail}>
                        <p>
                            <label htmlFor="name">Username</label> <br />
                            <input type="text" name="name" id="name" required onChange={handleInput}/>
                        </p>
                        <p>
                            <label htmlFor="email">Email Address</label> <br />
                            <input type="email" name="email" id="email" required onChange={handleInput}/>
                        </p>
                        <p>
                            <label htmlFor="password">Set Password</label> <br />
                            <input type="password" name="password" id="password" required onChange={handleInput} />
                        </p>
                        <button>Create Account</button>
                       
                    </form>
                </section>
            </div>
            
        </div>
        
    )
}

export default SignUp;