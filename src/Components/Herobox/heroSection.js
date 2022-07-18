import axios from "axios";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { useState, useEffect, useMemo } from "react";
import Tilt  from 'react-parallax-tilt'

const HeroSection = ({movie, w, h}) => {
    const { movieInfo } = useGlobalContext();
    const url = `https://omdbapi.com/?i=${movie}&apikey=eb178fd2`;
    const [ info, setInfo ] = useState({});

    useEffect(() => {
        axios.get(url)
        .then((response) => setInfo(response.data))
    }, [])

    
    
        const {Title,  Year, Poster, imdbID} = info;
    return (
        <section key={imdbID} className='section'>
            <p><Link to="/selected" >
            <Tilt> <img src={Poster} className="section-image" width={w ? w : '250px'} height={h ? h : '350px'} alt={Title} onClick={() => movieInfo(imdbID)}/> </Tilt>
            </Link></p> 
            <div >
                <h3>{Title} </h3>
                <p>{Year}</p>
            </div>
        </section>
    )}

    // return (
    //     <div className="loading-container">
    //         <ThreeDots width={100} height={100} />
    //     </div>
    // )


export default HeroSection;