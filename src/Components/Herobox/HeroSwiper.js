import HeroSection from './heroSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './hero.css';


const HeroSwiper = ({list, title}) => {
    
    return(
        <article>
            <h2 id="topRated">{title}</h2>
            <p></p>
            <Swiper
            breakpoints={{
                500:{
                    width: 500,
                    slidesPerView: 1.5,
                },
                768:{
                    width: 768,
                    slidesPerView: 2.5,
                },
                1000:{
                    width: 1000,
                    slidesPerView: 3,
                }
            }}
            modules={[Pagination, Navigation]}
            slidesPerView='1.3'
            style={{padding:'1rem'}}
            pagination={{clickable: true}}
            navigation= {true}
            autoplay={{ delay:5000, disableOnInteraction: false }}
            >
                {list.map((item) => {
                    return  <SwiperSlide style={{paddingBottom:'1rem'}} ><HeroSection movie={item}/></SwiperSlide>  
                })}
            </Swiper>
        </article>
    )
}

export default HeroSwiper;