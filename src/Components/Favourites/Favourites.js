import './favourites.css'
import { useGlobalContext } from '../Context';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Fave from './fave';

const Favourites = () => {
    const {favourites, user} = useGlobalContext();
    let navigate = useNavigate();

    if (!user){
        return(
            <div className='fave-div'>
                <section>
                <h3>Sign in to add/see favourites</h3>
                <button onClick={() => navigate('/login')} >Sign In</button>
                </section>
            </div>
        )
    }

    if(favourites.length < 1){
        return(
            <div className='fave-div'>
                <p>No Favourites Yet</p>
            </div>
        )
    }

    return(
        <div className='fave-movies'>
            {favourites.length > 0 ? favourites.map((item) => {
                return <Fave item={item} key={item.imdbID}/>
            }) : 'NO FAVOURITE'}
        </div>
    )
} 

export default Favourites;