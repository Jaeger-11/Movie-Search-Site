import {useEffect} from 'react'
import './hero.css';
import axios from 'axios';
import Heroslide from './Heroslide';
import { useGlobalContext } from '../Context';
import { Link } from 'react-router-dom';
import netflix from '../../Images/netflix.png';
import hbo from '../../Images/hbo.png';
import primevideo from '../../Images/primevideo.png';
import hulu from '../../Images/Hulu.png';
import disney from '../../Images/disney.png';
import HeroSection from './heroSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import HeroSwiper from './HeroSwiper';


const Hero = () => {
    const {searchWord, showMovies, userIn} = useGlobalContext();

    const newMovies = ['tt5108870', 'tt11245972', 'tt4998632', 'tt12412888', 'tt11138512', 'tt1877830', 'tt2180339', 'tt2463208', 'tt15033192']
    const popular = ['tt8097030', 'tt13403046', 'tt6708668', 'tt13320622', 'tt1160419', 'tt9411972', 'tt14114802', 'tt6710474', 'tt8009428', 'tt1745960']
    const series = ["tt1190634","tt4574334","tt1312171","tt2442560","tt7335184","tt7767422","tt2741602","tt5180504","tt6468322","tt10919420"]
    const anime = ["tt0409591","tt2560140","tt9335498","tt0988824","tt0877057","tt3741634","tt0421357","tt0434665",]

    const url2 = `https://omdbapi.com/?s=${searchWord}&page=1&apikey=eb178fd2`;
    useEffect(() => {
        axios.get(url2).then((response) => showMovies(response.data))
    }, [url2, searchWord])


    return(
        <div className='hero'>
            <main className="hero-main">
                <div className="hero-grid">
                    <section className='hero-text-section'>
                        <header className='header'>
                            <h1>Welcome To DMB</h1>
                            <h2>A Destination for Movies</h2>
                            <p>
                            "Are you watching closely?",
                            You know what your problem is, it's that you haven't seen enough movies - all of life's riddles are answered in the movies.
                            <br /> Search for amazing movies to chill with!, Go see it and see for yourself why you should have watched it. 
                            </p>
                            <Link to='/search' className='hero-search'><button className='hero-btn'> Search</button></Link>
                            <p className='hero-links'>
                                <a href="#topRated" className='link'>Top Rated</a> 
                                <a href="http://" target="_blank" rel="noopener noreferrer" className='link'>New</a>   
                                <a href="http://" target="_blank" rel="noopener noreferrer" className='link'>Popular</a>
                            </p>
                        </header>
                    </section>
                    <section className='hero-carousel'>
                        <Heroslide/>
                    </section>
                </div>
                <div className="hero-ul">
                    <img src={hulu} alt="" className='hero-logo'/>
                    <img src={hbo} alt="" className='hero-logo'/>
                    <img src={netflix} alt="" className='hero-logo'/>
                    <img src={disney} alt="" className='hero-logo'/>
                    <img src={primevideo} alt="" className='hero-logo'/>
                </div>
            </main>
            <HeroSwiper list={newMovies} title='Top Rated Movies 2022' />
            <HeroSwiper list={popular} title='Popular Movies 2022' />
            <HeroSwiper list={series} title='Series 2022' />
            <HeroSwiper list={anime} title='Top Anime To Watch' />
            <footer>

            </footer>
        </div>
    )
}

export default Hero