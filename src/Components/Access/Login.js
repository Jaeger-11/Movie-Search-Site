import { useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../Firebase/Config';

const LogIn = () => {
    
    const [user, setUser] = useState();

    const handleInput = (event) => {
        let newInput  = { [event.target.name] : event.target.value };
        setUser({...user, ...newInput});
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, user.email, user.password)
          .then((userCredential) => {
          // Signed in 
        //   const user = userCredential.user;
          
          alert("Signed In")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
          });
    } 

    return(
        <div>
            SIGN IN  
            <form>
                <input type="email" placeholder="Email" name="email" onChange={handleInput} required/>
                <input type="password" placeholder="Password" name="password" onChange={handleInput} required/>
                <button onClick={handleSignIn} >SIGN IN</button>
            </form>
        </div>
    )
}

export default LogIn;