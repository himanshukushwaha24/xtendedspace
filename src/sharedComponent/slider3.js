import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";

function Responsive() {
  var settings = {
    // dots: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const AWS_IMAGE_URL =
    "https://xtendedspace.s3.ap-south-1.amazonaws.com/home/";

  return (
    <div id="s3slide" className="slider-container">
      <Slider {...settings}>
        <div>
          <div className="samename px-[30px] h-[516px]  max-w-[292px] md:max-w-[400px] rounded-xl">
            <Image
              src={`${AWS_IMAGE_URL}xs-Relocation-home.webp`}
              alt="relocation"
              width={517}
              height={494}
            />
            <h2 className="my-3 text-[14px] md:text-[20px]  font-semibold text-[#1B1C57]">
              Relocation Module
            </h2>
            <p className="my-3 h-[100px] text-gray-700 text-[12px] md:text-[14px]">
              Explore smooth packing and moving services with Xtended Space.
              Assurance of your comfortable nationwide relocation journey is
              confirmed here.
            </p>
            <Link href="services/packers-and-movers">
              <button className="my-3  rounded-md py-[10px] px-4 text-[#1B1C57] font-bold">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div className="samename px-[30px] h-[516px]  max-w-[292px] md:max-w-[400px] rounded-xl">
            <div className="sname">
              <Image
                src={`${AWS_IMAGE_URL}xs-B2B-Storage-home.webp`}
                alt="storage"
                width={517}
                height={494}
              />
            </div>
            <h2 className="my-3  text-[14px] md:text-[20px]  font-semibold text-[#1B1C57]">
              B2B Storage
            </h2>
            <p className="my-3 h-[100px] text-gray-700 text-[12px] md:text-[14px]">
              Your ultimate solution for B2B warehouse storage requirements. It
              saves your business inventory safely at budget-friendly prices and
              makes you stress-free.
            </p>
            <Link href="services/business-storage">
              <button className="my-3   rounded-md py-[10px] px-4 text-[#1B1C57] font-bold">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div className="samename px-[30px] h-[516px]  max-w-[292px] md:max-w-[400px] rounded-xl">
            <div className="sname">
              <Image
                src={`${AWS_IMAGE_URL}xs-B2B-Logistic-home.webp`}
                alt="logistic"
                width={517}
                height={494}
              />
            </div>
            <h2 className="my-3 text-[14px] md:text-[20px]  font-semibold text-[#1B1C57]">
              B2B Logistics
            </h2>
            <p className="my-3 h-[100px] text-gray-700 text-[12px] md:text-[14px]">
              Our doorstep transportation services make your business operations
              smooth nationwide. Experience the logistics convenience of Xtended
              Space.
            </p>
            <Link href="services/b2b-logistics">
              <button className="my-3   rounded-md py-[10px] px-4 text-[#1B1C57] font-bold">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Responsive;
