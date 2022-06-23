import './navigation.css';
import { FaHeart, FaUser, FaSearch } from 'react-icons/fa'
import { useGlobalContext } from '../Context';
import { Link } from 'react-router-dom';
import User from '../Herobox/user';

const Navbar = () => {
    const  {searching, displayUser, userIn} = useGlobalContext();

    const handleClick = (e) => {
        e.preventDefault();
        searching(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <nav className='navbar'>
            <div className='nav-sub'>
                <p className='nav-logo'><Link to='/' style={{textDecoration: 'none', color:'black'}} >DMB</Link></p>
                <p className='nav-about'>About</p>
            </div>
    
            <form className='nav-search' onSubmit={handleSubmit} >
               <Link to='/search'><input type="text" name="" id="" placeholder='Search' onChange={handleClick}/></Link>  
            </form>

            <div className='nav-icons'>
                <Link to='/favourites' style={{textDecoration: 'none', color:'black'}}><FaHeart/></Link>  
                <p onClick={displayUser}><FaUser /></p>
                
            </div>
            
        </nav>
    )
}

export default Navbar;