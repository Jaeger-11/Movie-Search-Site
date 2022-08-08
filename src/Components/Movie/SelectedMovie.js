import { useGlobalContext } from "../Context";
import axios from "axios";
import { useState, useEffect } from "react";
import './selected.css';
import { Link } from "react-router-dom";
import FavModal from "../Modal/FavModal";
import Modal from "../Modal/Modal";
// import {  } from "react-icons/fa"
import { MdError } from "react-icons/md";
import { ThreeDots } from 'react-loader-spinner'

const SelectedMovie = () => {
    const {id, addToFavourites,removeFromFavourites, favModal, handleFavModal, user, setModal, modal, favourites} = useGlobalContext();
    const [data, setData] = useState('');
    const [err, setErr] = useState('');
    const [existingID, setExistingID] = useState(false)
    const url = `https://omdbapi.com/?i=${id}&apikey=eb178fd2`

    useEffect(() => {
        axios.get(url)
        .then((response) => setData(response.data))
        .catch((error) => setErr(error.message))
    }, [url])

    useEffect(() => {
        if(favourites.includes(id)){
            setExistingID(true)
        }
    },[id])

    const handleFavourite = (imdbID) => {
        if (user){
            addToFavourites(imdbID);
            handleFavModal();
        } else {
            setModal(true)
        }
    }

    const removeFavourite = (imdbID) => {
        if (user){
            removeFromFavourites(imdbID);
            handleFavModal();
        } else {
            setModal(true)
        }
    }

    if(err){
        return (
            <p>{err}</p>
        )
    } else if (data){
        const {Actors, Director, Genre, Plot, Poster,  imdbID, imdbRating, Runtime, Title, Type,  Year } = data; 
        
        return (
            <div className="movie">
                <div className="movie-container">
                    <section className="movie-poster">
                        <img src={Poster} alt={Title}/>
                    </section>
                    <section className="movie-info" >
                        <div className="movie-div">
                            { existingID ?
                                <button onClick={() => removeFavourite(imdbID)} className='addToFave'> Remove from Favourites </button> :
                                <button onClick={() => handleFavourite(imdbID)} className='addToFave'> Add to Favourites </button>
                            }
                            <article className="movie-info-sub">
                                <article className="movie-sub">
                                    <h4>{Title}</h4>
                                    <p>imdbRating{imdbRating}</p>
                                </article>
                                <p>Genre: <b>{Genre}</b></p>
                                <p>Director: {Director}</p>
                                <p>Cast: {Actors} </p>
                                <p>{Plot}</p>
                                <div className="movie-sub">
                                    <p>{Year}</p>
                                    <p>{Type}</p>
                                    <p>{Runtime}</p>
                                </div>
                            </article>
                        </div>
                    </section>
                </div>
                {modal && 
                <Modal
                title='Ooops'
                text='Sign in to add favourites'
                to='/login'
                button='Sign In'
                icon={<MdError className="icon"/>}
                />}
                {favModal && <FavModal text={ existingID ? 'Removed from Watchlist' : 'Added to Watchlist' } />}
                <p> <Link to='/' >Back Home</Link> </p>
            </div>
            
        )
    } else {
    return(
        <div className="loading-container">
            <ThreeDots color="#12cbaa" height={100} width={100} />
        </div>
    ) }
    
}

export default SelectedMovie;