import { Link } from "react-router-dom";
import { FaHeart, FaUser, FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../Context";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Config";

const Menu = ({setIsMenuOpen}) => {
    const { loggedUser} = useGlobalContext();
    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
        });
        setIsMenuOpen(false)
    }

    return (
        <div className="menu-container" >
            <ul className="menu">
                <li className="menu-times"> <span onClick={() => setIsMenuOpen(false)}><FaTimes /> </span> </li>
                <li className="menu-link"><p style={{textDecoration: 'none', color:'black', display:'flex',gap:'5px', alignItems:'center'}} ><FaUser />  {loggedUser} </p></li>
                <Link to='about' className="menu-link" onClick={() => setIsMenuOpen(false)} ><li>About</li></Link>
                <Link to='favourites' className="menu-link" onClick={() => setIsMenuOpen(false)}><li style={{textDecoration: 'none', color:'black', display:'flex',gap:'5px', alignItems:'center'}} > <FaHeart style={{color: '#f61c7a'}} /> Favourites</li></Link>
                {  !loggedUser ? <>
                    <Link to='login' className="menu-link" onClick={() => setIsMenuOpen(false)}><li>Log In</li></Link>
                    <Link to='create' className="menu-link" onClick={() => setIsMenuOpen(false)}><li> Create Account</li></Link>
                </> : <li className="menu-link" onClick={logOut} > Log Out </li> }
            </ul>
        </div>
    )
}

export default Menu;