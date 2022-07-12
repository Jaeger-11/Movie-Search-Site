import axios from "axios";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { useState, useEffect, useMemo } from "react";

const HeroSection = ({movie, w, h}) => {
    const { movieInfo } = useGlobalContext();
    const url = `https://omdbapi.com/?i=${movie}&apikey=eb178fd2`;
    const [ info, setInfo ] = useState({});

    useEffect(() => {
        axios.get(url)
        .then((response) => setInfo(response.data))
    }, [url])

    const {Title,  Year, Poster, imdbID} = info;
    return (
        <section key={imdbID} className='section'>
            <p><Link to="/selected" >
            <img src={Poster} className="section-image" width={w ? w : '250px'} height={h ? h : '350px'} alt={Title} onClick={() => movieInfo(imdbID)}/>
            </Link></p> 
            <div >
                <h3>{Title} </h3>
                <p>{Year}</p>
            </div>
        </section>
    )
}

export default HeroSection;