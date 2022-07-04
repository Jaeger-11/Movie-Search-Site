import './navigation.css';
import { FaHeart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../Context';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import User from './user';
import Menu from './Menu';
import arrowDown from '../../Images/arrowdown.png';

const Navbar = () => {
    const  {searching, displayUser, loggedUser, loggedEmail, setDisplayUser} = useGlobalContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        searching(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <nav className='navbar'>
            <p className='nav-logo' onClick={() => setIsMenuOpen(false)} ><Link to='/' style={{textDecoration: 'none', color:'black'}} >DMB</Link></p>
            
            <div className='nav-sub'>
                <Link to='/about' style={{textDecoration: 'none'}} ><p className='nav-about'>About</p></Link>
                <Link 
                to='/favourites' 
                style={{textDecoration: 'none', color:'black', display:'flex',gap:'5px', alignItems:'center'}}>
                    <FaHeart style={{color: '#f61c7a'}} /> Favourites
                </Link>
            </div>
    
            <form className='nav-search' onSubmit={handleSubmit} >
               <Link to='/search'><input type="text" name="" id="" placeholder='Search' onChange={handleClick}/></Link>  
            </form>

            { loggedEmail ? 
            <div className='nav-icons'>
                <p onClick={() => setDisplayUser(!displayUser)} style={{textDecoration: 'none', color:'black', display:'flex',gap:'5px', alignItems:'center'}} >
                    <FaUser />  {loggedUser ? loggedUser : loggedEmail} <img src={arrowDown} alt="arrow" /> 
                </p>
            </div> : 
                <div className='nav-icons'>
                <Link to='login'><button className='navbtn1'>Log In</button></Link>
                <Link to='create'><button className='navbtn2'>Create Account</button></Link>
                </div>
            }

            <div className='nav-bars' onClick={() => setIsMenuOpen(!isMenuOpen)} > { isMenuOpen ? <FaTimes/> : <FaBars/> } </div>
            { isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} /> }
            { displayUser && <User/> }
        </nav>
    )
}

export default Navbar;