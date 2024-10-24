import Image from "next/image";
import React from "react";
import Slider from "react-slick";

function AutoPlay() {
  const settings = {
    // dots: true,
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
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
          slidesToShow: 3, // Adjust as needed for mobile devices
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
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Bector+food.webp"
            alt="slider1"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/aircity.webp"
            alt="slider1"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Prince%C2%A0pipe.webp"
            alt="slider1"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/ambit+transmission+products.webp"
            alt="slider1"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/patanjali.webp"
            alt="slider1"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/RSVL.webp"
            alt="slider1"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Servocon.webp"
            alt="slider1"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/rasna.webp"
            alt="slider1"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/godrej.webp"
            alt="slider1"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/NPL.webp"
            alt="slider1"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/philips-signify.webp"
            alt="slider1"
            width={150}
            height={150}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/United+Biscuit.webp"
            alt="slider1"
            className="mt-4"
            width={80}
            height={80}
          />
        </div>
        <div>
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/USHA+.webp"
            alt="slider1"
            width={150}
            height={150}
          />
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlay;
