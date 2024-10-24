import Image from "next/image";
import React from "react";
import Slider from "react-slick";

function AutoPlay() {
  const settings = {
    // dots: true,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    arrows: false,

    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // Breakpoint for desktop devices
        settings: {
          slidesToShow: 5, // Adjust as needed for desktop
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Breakpoint for tablets
        settings: {
          slidesToShow: 3, // Adjust as needed for tablets
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480, // Breakpoint for mobile devices
        settings: {
          slidesToShow: 2, // Adjust as needed for mobile devices
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Live+Mint.webp"
            alt="livemint"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/VcCircle.webp"
            alt="vcCircle"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Fever+104.webp"
            alt="fever104"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/HT+MEDIA.webp"
            alt="htmedia"
            width={150}
            height={150}
          />
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlay;
