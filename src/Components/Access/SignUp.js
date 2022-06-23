import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {useState} from 'react';
import { addDoc, collection } from "firebase/firestore";
import { auth, projectFirestore } from "../../Firebase/Config";

const SignUp = () => {

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
                username : newUser.username,
                email: newUser.email,
                userID : User.uid
            })
        // Signed in
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
        });
    }

    updateProfile(auth.currentUser, {
        displayName: newUser.username
    }).then(() => {
        // Profile updated!
    }).catch((error) => {
        // An error occurred
        // ...
        console.log(error)
    });

    return (
        <div>
            <form style={{padding:'2rem'}}>
                <input type="text" placeholder="Username" name="username" onChange={handleInput} required/>
                <input type="email" placeholder="Email" name="email" onChange={handleInput} required/>
                <input type="password" placeholder="Password" name="password" onChange={handleInput} required/>
                <button onClick={handleEmail} >SIGN UP</button>
            </form>
        </div>
        // <p>hhh</p>
    )
}

export default SignUp;