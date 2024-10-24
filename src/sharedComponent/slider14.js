import React, { Component } from "react";
import Slider from "react-slick";

const baseUrl = `/images/slider/`;

// /slider/slider-pagi-detail-1.jpg
function CustomPaging({data:{propertyImages}}) {
  const limitedImages = propertyImages.slice(0, 4);
  const settings = {
    customPaging: function(i) {
      return (
       <div className="w-[100%] h-[50px] md:h-[100px] m-0 p-0 ">
         <a className=" w-[100%] h-[50px] md:h-[100px]">
          <img className=" w-[auto] h-[50px] md:h-[100px] m-[auto]" src={limitedImages[i]} alt={`thumbnail-${i}`}  />
        </a>
       </div>
      );
    },
    // public/images/slider/slider-pagi-1.jpg
    dots: true,
    // dots: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    arrows:false,

    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return ( 
    <div className="slider-container"> 
      <div className="slider-container"> 
      <style>
        {`
          .slick-dots ul {
            padding: 0;
            width:100%;
            background-color:gray;
            height:auto;
        
            
            
          }
          .slick-dots li {
            width: 25%;
            margin-right: 0px;
            margin-left: 0;
            
          }
               .slide-img img {
            width: 100%;
            height: 300px;
             background-color:#ece9e942;
        
            object-fit: contain;
            object-position: center;
          }
        `}
      </style>
      <Slider {...settings}>
        {
          limitedImages?.map((item, index)=>{
            return(
              <>
               <div key={index} className="slide-img w-full h-[450px] bg-[#f9f9f9d5] ">
          
          <img className="w-full h-full " src={item} alt={`slide-${index}`} />
        </div>
              </>
            )
          })
        }
    
      
      </Slider>
    </div>
    </div>
  );
}

export default CustomPaging;
