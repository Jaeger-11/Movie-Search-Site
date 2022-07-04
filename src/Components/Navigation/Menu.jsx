import { Link } from "react-router-dom";
import { FaHeart, FaUser } from "react-icons/fa";
import { useGlobalContext } from "../Context";

const Menu = ({setIsMenuOpen}) => {
    const { loggedUser } = useGlobalContext();

    return (
        <div className="menu-container" >
            <ul className="menu">
                <li className="menu-link"><p style={{textDecoration: 'none', color:'black', display:'flex',gap:'5px', alignItems:'center'}} ><FaUser />  {loggedUser} </p></li>
                <Link to='about' className="menu-link" onClick={() => setIsMenuOpen(false)} ><li>About</li></Link>
                <Link to='favourites' className="menu-link" onClick={() => setIsMenuOpen(false)}><li style={{textDecoration: 'none', color:'black', display:'flex',gap:'5px', alignItems:'center'}} > <FaHeart style={{color: '#f61c7a'}} /> Favourites</li></Link>
                {  !loggedUser ? <>
                    <Link to='login' className="menu-link" onClick={() => setIsMenuOpen(false)}><li>Log In</li></Link>
                    <Link to='create' className="menu-link" onClick={() => setIsMenuOpen(false)}><li> Create Account</li></Link>
                </> : <li className="menu-link"> Log Out </li> }
            </ul>
        </div>
    )
}

export default Menu;