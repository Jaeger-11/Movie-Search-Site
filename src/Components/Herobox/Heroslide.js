import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper';
import './hero.css';
import uncharted from  '../../Images/uncharted.jpg';
import blackAdam from  '../../Images/black_adam.jpg';
import prey from '../../Images/prey.jpg';
import tgm from '../../Images/top_gun_maverick.jpg';
import strange from '../../Images/doctor_strange_in_the_multiverse_of_madness.jpg'; 

import 'swiper/css';
import 'swiper/css/pagination';

const  Heroslide  = () => {

    return(
        <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
        slidesPerView={"auto"}
        // navigation
        pagination={{clickable: true}}
        autoplay={{ delay:5000, disableOnInteraction: false }}
        coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        }}
        className="hero-swiper"
        >
            <SwiperSlide> <img src={uncharted} className="hero-image"/> </SwiperSlide>
            <SwiperSlide ><img src={blackAdam} className="hero-image"/></SwiperSlide>
            <SwiperSlide><img src={prey} className="hero-image"/></SwiperSlide>
            <SwiperSlide><img src={strange} className="hero-image"/></SwiperSlide>
            <SwiperSlide><img src={tgm} className="hero-image"/></SwiperSlide>
        </Swiper>
    )
}

export default Heroslide;