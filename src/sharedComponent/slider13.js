import React from "react";
import { isMobile } from "@/util/common";

import Slider from "react-slick";

function AutoPlay() {
  var settings = {
    dots: false,
    infinite: false,
    speed: 4000,
    cssEase: "linear",
    autoplaySpeed: 1000,
    infinite: true,
    autoplay: true,
    arrows:false,

    slidesToShow: 4,
    slidesToScroll: 1,
   //  autoplay: isMobile(),
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          // dots: true,
          dots: false,
          autoplay: false,
    autoplay: isMobile(),


        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          autoplay: true,
          dots: false,


        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          dots: false,


        }
      }
    ]
  };
  return (
    <div className="slider-container">

        <div className='statWrapper absolute  w-[100%]  h-[auto] px-2'>
        <div className=' wrapper w-full md:w-[1550px]'>
         
      <Slider {...settings}>
        <div className=" md:h-[100%] outline-none px-2">
        <img src="https://xtendedspace.s3.ap-south-1.amazonaws.com/sliderimg1.webp" className='firstSec m-2 w-[176px] md:w-[auto] h-[75px] md:h-[auto]   ' alt="slider1"/>
        <img src="https://xtendedspace.s3.ap-south-1.amazonaws.com/sliderimg20.webp" alt="slider1" className='m-2 w-[176px] md:w-[auto] h-[55px] md:h-[auto] '/>
          
        </div>
        <div className=" md:h-[100%] outline-none px-2 ">
          {/* <div className="flex justify-center m-2"> */}
        {/* <img src="/images/home/stat/4k1.png" className='firstSec  w-[116px] md:w-[auto] h-[75px] md:h-[auto] ' alt="slider1"/> */}
        <img src="https://xtendedspace.s3.ap-south-1.amazonaws.com/sliderimg3.webp" alt="slider1" className='firstSec m-2  w-[176px] md:w-[auto]  h-[75px] md:h-[auto] '/>


          {/* </div> */}
        {/* <img src="/images/home/stat/56k1.png" alt="slider1" className='firstSec m-2 w-[176] md:w-[auto] h-[75px] md:h-[auto] '/> */}

        
        <img src="https://xtendedspace.s3.ap-south-1.amazonaws.com/sliderimg5.webp" alt="slider1" className='m-2 w-[176px] md:w-[auto] h-[55px] md:h-[auto] '/>
          
        </div>
        <div className=" md:h-[100%] outline-none px-2">
        <img src="https://xtendedspace.s3.ap-south-1.amazonaws.com/sliderimg6.webp" alt="slider1" className='fimg5 m-2 w-[196px] md:w-[auto] h-[141px] md:h-[auto]  '/>
          
        </div>
        <div className=" md:h-[100%] outline-none px-2">
        <img src="https://xtendedspace.s3.ap-south-1.amazonaws.com/sliderimg2.webp" alt="slider1" className='m-2 w-[176px] md:w-[auto] h-[55px] md:h-[auto] '/>
        <img src="https://xtendedspace.s3.ap-south-1.amazonaws.com/sliderimg19.webp" alt="slider1" className='firstSec m-2 w-[176px] md:w-[auto] h-[75px] md:h-[auto] '/>
          
        </div>
      
      </Slider>
      </div>
        </div>
    
    </div>
  );
}

export default AutoPlay;
