import axios from "axios";
import { useEffect, useState } from "react";
import imageNA from '../../Images/imagesna.png';
import { FaHeart } from 'react-icons/fa';
import {IoMdShareAlt} from 'react-icons/io';
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import './favourites.css'

const Fave  = ({item}) => {
    const { movieInfo } = useGlobalContext();
    const url = `https://omdbapi.com/?i=${item}&apikey=eb178fd2`;
    const [ info, setInfo ] = useState({});

    useEffect(() => {
        axios.get(url)
        .then((response) => setInfo(response.data))
    }, [])

    const {Title,  Year, Poster, imdbID} = info;
    return (
        <section className="movie-box" key={imdbID}>
            <p className="poster-link"><Link to="/selected" >
                <img src={Poster === 'N/A' ? imageNA : Poster } 
                className='poster' alt={Title} onClick={() => movieInfo(imdbID)}/>
            
            </Link></p> 
            <article className='search-article'>
                <div className='search-info'>
                <h4>{Title}</h4>
                <p>{Year}</p>
                </div>
            </article>
            <p className="fave"> <IoMdShareAlt style={{fontSize:'1.2rem', padding:'5px'}} /> </p>
        </section>
    )
}

export default Fave;