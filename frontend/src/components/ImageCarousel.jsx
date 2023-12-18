// ImageCarousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = ({ images }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: 'ease',
    arrows: false,
  };

  return (
    <Slider style={{borderRadius:"20px",minHeight:"400px",}} {...settings}>
      {images.map((image, index) => (
        <div  style={{borderRadius:"20px",backgroundColor:"red"}} key={index}>
          <img  style={{borderRadius:"20px"}} src={image} alt={`Slide ${index + 1}`} className="w-full border border-green-600 h-[100%]" />
        </div>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
