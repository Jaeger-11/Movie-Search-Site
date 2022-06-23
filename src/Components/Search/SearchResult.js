import { useGlobalContext } from "../Context";
import { useEffect } from "react";
import axios from "axios";
import './search.css';
import { Link } from "react-router-dom";
import imageNA from '../../Images/imagesna.png';
import { FaHeart } from 'react-icons/fa';
import {IoMdShareAlt} from 'react-icons/io';

const SearchResult = () => {
    const { searchResponse, pages, changePage, url, showMovies, movieInfo } = useGlobalContext();
    console.log(searchResponse, pages)
    const {Search, Response, Error, totalResults} = searchResponse

    var rows = [];
    for (var i = 1; i <= pages; i++) {
        rows.push(i);
    }

    useEffect(() => {
        axios.get(url).then((response) => showMovies(response.data))
    }, [url])


    if (searchResponse){
        return (
            <div className="search-container">
                <section className="search-movies">
                    {Response === 'False' ? 
                        <div>
                            <p>Oops error occured</p>
                            <p>{Error}</p>
                        </div>  : 
                        Search.map((movie) => {
                            const {Title,  Year, Poster, imdbID} = movie;
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
                        })
                    }
                </section>
                <section className="search-pagination">
                    {rows.map((number) => {
                        return <p onClick={() => changePage(number)} className='search-page'>{number}</p>
                    })}
                </section>
            </div>
        )
    }
    
    return (
        <p>Error Occured</p>
    )
}

export default SearchResult;