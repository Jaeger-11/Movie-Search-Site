import { useGlobalContext } from "../Context";
import logout from '../../Images/logout.png';
import { auth } from "../../Firebase/Config";
import { signOut } from "firebase/auth";

const User = () => {
    const {setDisplayUser} = useGlobalContext();

    const handleClick = (event) => {
        if(event.target.classList.contains('user-container')){
            setDisplayUser(false);
        }
    }

    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
        });
        setDisplayUser(false)
    }

    return(
        <div className="user-container" onClick={handleClick}>
            <section className="user">
                <p style={{textDecoration: 'none', color:'black', display:'flex',gap:'5px', alignItems:'center'}}  onClick={logOut} >
                     <img src={logout} alt='logout' /> Log Out 
                </p>
            </section>
        </div>
    )
}

export default User;