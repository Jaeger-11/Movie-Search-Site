import './App.css';
import Navbar from './Components/Navigation/Navbar';
import Hero from './Components/Herobox/Hero';
import SearchResult from './Components/Search/SearchResult';
import SelectedMovie from './Components/Movie/SelectedMovie';
import Favourites from './Components/Favourites/Favourites';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './Components/Context';
import User from './Components/Herobox/user';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
