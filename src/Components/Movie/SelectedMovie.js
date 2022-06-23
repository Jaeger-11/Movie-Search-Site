import { useGlobalContext } from "../Context";
import axios from "axios";
import { useState, useEffect } from "react";
import './selected.css';
import { Link } from "react-router-dom";

const SelectedMovie = () => {
    const {id, favourites,addToFavourites } = useGlobalContext();
    const [data, setData] = useState('');
    const [err, setErr] = useState('');
    const url = `https://omdbapi.com/?i=${id}&apikey=eb178fd2`
    useEffect(() => {
        axios.get(url)
        .then((response) => setData(response.data))
        .catch((error) => setErr(error.message))
    }, [url])
    // console.log(data)
    console.log(favourites)

    if(err){
        return (
            <p>{err}</p>
        )
    }

    if(data){
        const {Actors, Director, Genre, Plot, Poster,  imdbID, imdbRating, Runtime, Title, Type,  Year } = data; 

        return (
            <div>
                <div className="movie-container">
                    <section className="movie-poster">
                        <img src={Poster} alt={Title}/>
                    </section>
                    <section className="movie-info" >
                        <div >
                        <p onClick={() => addToFavourites(imdbID)} >Add to Favourites</p>
                            <article className="movie-sub">
                                <h4>{Title}</h4>
                                <p>imdbRating{imdbRating}</p>
                            </article>
                            <article className="movie-info-sub">
                                <p>Genre: <b>{Genre}</b></p>
                                <p>Director: {Director}</p>
                                <p>Cast:{Actors} </p>
                                <p>{Plot}</p>
                            </article>
                            <div className="movie-sub">
                                <p>{Year}</p>
                                <p>{Type}</p>
                                <p>{Runtime}</p>
                            </div>
                        </div>
                    </section>
                </div>
                <p> <Link to='/' >Back Home</Link> </p>
            </div>
            
        )
    }

    return(
        <div>Loading...</div>
    )
    
}

export default SelectedMovie;