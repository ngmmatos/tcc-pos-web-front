
import React from 'react'
import { useState } from 'react'
import Slider from "react-slick"
import { Layout } from '../Layout';
import Rh1 from '../../resources/RH1.jpg'
import Rh2 from '../../resources/RH2.jpg'
import Rh3 from '../../resources/RH3.jpg'
import Rh4 from '../../resources/RH4.jpg'
import Rh5 from '../../resources/RH5.jpg'
import {FaArrowRight, FaArrowLeft} from "react-icons/fa"
import './styles.scss';

let slides = [Rh1, Rh2, Rh3, Rh4, Rh5];

const Carrosel = ({ setToggleModal }) => {

    const NextArrow = ({ onClick }) => {
        return (
          <div className="arrow next" onClick={onClick}>
            <FaArrowRight />
          </div>
        );
      };

    const PrevArrow = ({ onClick }) => {
        return (
        <div className="arrow prev" onClick={onClick}>
            <FaArrowLeft />
        </div>
        );
    };

    const [imageIndex, setImageIndex] = useState(0);

    const settings = {
        infinite: true,
        lazyLoad: true,
        speed: 300,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setImageIndex(next)
    }

    return(
        <div className="Carrosel" >
            <Slider {...settings}>
                {slides.map((img, idx) => (
                    <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                        <img src={img} alt={img} />
                    </div>
                ))}
            </Slider>        
        </div>     

    );
}

export default Carrosel;