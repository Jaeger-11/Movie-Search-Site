import './App.css';
import Navbar from './Components/Navigation/Navbar';
import Hero from './Components/Herobox/Hero';
import SearchResult from './Components/Search/SearchResult';
import SelectedMovie from './Components/Movie/SelectedMovie';
import Favourites from './Components/Favourites/Favourites';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './Components/Context';
import About from './Components/About/About';
import LogIn from './Components/Access/Login';
import SignUp from './Components/Access/SignUp';

function App() {
  const {isSearching, userIn} = useGlobalContext();
  return (
    
    <BrowserRouter>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Hero/>} />
        <Route path='search' element={<SearchResult/>}/>
        <Route path='selected' element={<SelectedMovie/>} />
        <Route path='favourites' element={<Favourites/>} />
        <Route path='about' element={<About/>} />
        <Route path='login' element={<LogIn/>} />
        <Route path='create' element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
