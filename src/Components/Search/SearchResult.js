import { useGlobalContext } from "../Context";
import { useEffect } from "react";
import axios from "axios";
import './search.css';
import { Link } from "react-router-dom";
import imageNA from '../../Images/imagesna.png';
import { FaHeart, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {IoMdShareAlt} from 'react-icons/io';

const SearchResult = () => {
    const { searchResponse, pages, changePage, currentPage, url, showMovies, movieInfo } = useGlobalContext();
    const {Search, Response, Error, totalResults} = searchResponse

    const defaultRows = [1,2,3,4,5]
    var rows = [];
    for (var i = 1; i <= pages; i++) {
        rows.push(i);
    }

    const nextPage = () => {
        let x = currentPage + 1;
        console.log(pages, x)
        if ( x > pages){
            changePage(1);
        } else changePage(x)
    }

    const previousPage = () => {
        let x = currentPage - 1;
        console.log(pages, x)
        if ( currentPage === 1){
            changePage(pages);
        } else changePage(x)
    }

    const runSearch = () => {
        console.log(url.length)
        if (url.length > 47){
            axios.get(url).then((response) => showMovies(response.data))
        }
    }

    useEffect(() => {
        axios.get(url).then((response) => showMovies(response.data))
    }, [url])


    if (searchResponse){
        return (
            <div className="search-container">
                { Response === 'True' && 
                <div>
                    <div className="search-result">
                        <p> <span>{totalResults}</span> Total Results</p>
                        <p> Page <span>{currentPage}</span></p>
                    </div>
                    <section className="search-movies">
                        {Search.map((movie) => {
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
                                    {/* <p className="fave" onClick={() => movieInfo(imdbID)} > <IoMdShareAlt style={{fontSize:'1.2rem', padding:'5px'}} /> </p> */}
                                </section>
                            )
                        })}
                    </section>
                </div>
                }
                
                {Response === 'True' && 
                <section className="search-pagination">
                    <p className='search-page' onClick={previousPage} ><FaArrowLeft/></p>
                    { pages < 6 ? 
                        rows.map((number) => {
                            return <p onClick={() => changePage(number)} className='search-page'>{number}</p>
                        })
                    : <>
                        {defaultRows.map((number) => {
                            return <p onClick={() => changePage(number)} className='search-page'>{number}</p>
                        })}
                        <p className='search-page'>...</p>
                        <p onClick={() => changePage(pages)} className='search-page'>{pages}</p>
                    </> 
                    }
                    <p className='search-page' onClick={nextPage}><FaArrowRight/></p>
                </section>
                }

                {Response === 'False' && <div>
                    <p>Oops error occured</p>
                    <p>{Error}</p>
                </div>}
                
            </div>
        )
    }

     
    
    return (
        <p>Error Occured</p>
    )
}

export default SearchResult;