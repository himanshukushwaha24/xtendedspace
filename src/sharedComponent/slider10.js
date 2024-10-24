import React, { useEffect, useState } from "react";
import Slider from "react-slick";
const baseUrl = "/images/slider/"
const defaultImages = [
  `${baseUrl}blog-img1.webp`,
  `${baseUrl}blog-img2.webp`,
  `${baseUrl}blog-img3.webp`,
  `${baseUrl}blog-img4.webp`
];

function CustomPaging({ imageData }) {
  const [sliderImage, setSliderImage] = useState([]);
  
  useEffect(() => {
    if (imageData && imageData["stage3.PropertyImages"]) {
      setSliderImage(imageData["stage3.PropertyImages"]);
    }
  }, [imageData]);

  const settings = {
    customPaging: function(i) {
      const imageSrc = sliderImage[i] || defaultImages[i];
      return (
        <a className="w-full h-80px">
          <img className="rounded mx-auto h-[80px] w-auto" src={typeof imageSrc === 'string' ? imageSrc : URL.createObjectURL(imageSrc)} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const imagesToDisplay = sliderImage.length ? sliderImage : defaultImages;

  return (
    <div className="slider-container">
      <style>
        {`
          .slick-dots ul {
            padding: 0;
          }
          .slick-dots li {
            width: 24%;
            margin-right: 3px;
            margin-left: 0;
            border-radius: 10px;
          }
        `}
      </style>
      <Slider {...settings}>
        {imagesToDisplay.map((item, index) => (
          <div key={index}>
            <img
              className="w-auto h-[250px] bg-gray rounded mx-auto"
              src={typeof item === 'string' ? item : URL?.createObjectURL(item)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomPaging;
