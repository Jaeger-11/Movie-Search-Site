import './favourites.css'
import { useGlobalContext } from '../Context';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Fave from './fave';

const Favourites = () => {
    const {favourites} = useGlobalContext();

    if(favourites.length < 1){

        return(
            <div>
                <p>No Favourites Yet</p>
            </div>
        )
    }

    return(
        <div className='fave-movies'>
            {favourites.length > 0 ? favourites.map((item) => {
                return <Fave item={item} />
            }) : 'NO FAVOURITE'}
        </div>
    )
} 

export default Favourites;