import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";
import citiesData from '@/components/storagespaceData';
import Image from "next/image";
import { contact_us } from "@/service/homePageService";
import { useRouter } from "next/router";

const SimpleSlider = dynamic(() => import("@/sharedComponent/slider2"));
const SimpleSlider1 = dynamic(() => import("@/sharedComponent/slider3"));
const SimpleSlider3 = dynamic(() => import("@/sharedComponent/slider5"));
const SimpleSlider4 = dynamic(() => import("@/sharedComponent/slider6"));
const Searchlocation = dynamic(() => import("../searchlocation"));

const HeaderMenu = dynamic(() => import("@/components/header/header"));
const Footer = dynamic(() => import("../../components/footer"));


const AWS_IMAGE_URL =
  "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/";

export default function Home() {
  const cities = Object.values(citiesData); 
  const [formData, setFormData] = useState({
    subject: "Emtpy",
    source: "Emtpy",
    city: "Emtpy",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [multipleError, setMultipleError] = useState();
  function trimNumber(s) {
    while (s.substr(0, 1) == "0" && s.length > 1) {
      s = s.substr(1, 9999);
    }
    return s;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      setFormData({ ...formData, [name]: trimNumber(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError();
    setMultipleError();
    
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const response = await contact_us(formData);
    if (response.success) {
      setShowSuccessMessage(true);
      document.getElementById("myform").reset();
    } else {
      // setError(response.error);

      if (
        response?.error?.title === "One or more validation errors occurred."
      ) {
        setMultipleError(response?.error?.errors);
        setError(response.error);
      }
      setIsSubmitting(false);
    }
  };

  const router = useRouter();

  useEffect(()=>{
    const back = router?.query?.back;
    if(back === "false"){
      router.replace(router.asPath, undefined, { shallow: true });

      // Push new state to prevent back navigation
      window.history.pushState(null, null, window.location.href);
    }
   // const razorpay_order_id = router.query.razorpayOrderId;
  },[])

  // console.log("multipleError", multipleError);


  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="/images/logo/XtendedSpace.webp"
          type="image/x-icon"
        />
        <title>
          Xtended Space Secure Storage & Packers Movers Services India
        </title>
        <meta
          name="description"
          content="Xtended Space offers safe storage solutions and reliable packers and movers services across India for a hassle-free experience."
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="Secure storage, Packers and movers, Relocation services, Storage solutions, Moving services, Affordable storage, Household storage, Business storage, B2B storage, Storage India, Movers India, Safe storage, Professional packers, Reliable movers, Nationwide relocation"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.xtendedspace.com" />
        <meta
          property="og:title"
          content="Affordable Storage & Packing Moving Services India"
        />
        <meta
          property="og:description"
          content="Get budget-friendly storage and professional moving services with Xtended Space, ensuring secure and smooth relocations in India."
        />
        <meta
          property="og:image"
          content="/images/xtended-space-storage-and-relocation-service.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="Secure Storage & Relocation Services India"
        />
        <meta property="og:url" content="https://www.xtendedspace.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Reliable Storage & Movers Services India"
        />
        <meta
          name="twitter:description"
          content="Choose Xtended Space for top-notch storage solutions and packers and movers services, making your storage and relocation easy and stress-free."
        />
        <meta
          name="twitter:image"
          content="/images/xtended-space-storage-and-relocation-service.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Xtended Space Storage & Packers Movers India"
        />
      </Head>

      <div className="max-w-[1550px] mx-[auto] w-[100%] ">
        <HeaderMenu />
        {/* <section className="homebanner h-[50vh] md:h-[70vh] relative">
          <div className="text-box w-[90%] md:w-[848px] grid place-items-center">
            
            <h1 className="text-[24px] md:text-[48px] font-bold capitalize">
              Store your belongings with us.
            </h1>
            <p className="text-[14px] md:text-[20px] text-white w-[85%] md:w-[80%] mx-auto py-2 ">
              Discover nearby locations that provide secure, budget-savvy, and
              seamless storage facilities.
            </p>

            <Link
              href="/easy-storage"
              className="hero-btn cursor-pointer w-[140px] md:w-[314px] h-[40px] md:h-[52px] rounded-lg text-[16px] md:text-[19px] flex justify-center items-center text-white decoration-none  bg-[#007bff] capitalize  "
            >
              Book Now
            </Link>
          </div>
        </section> */}
        <div class="enrolban text-white p-[10px] md:p-[50px]  lg:p-[50px] flex flex-col justify-center lg:items-start items-center lg:pl-[100px]">
          <h1 class="text-[20px] lg:text-[30px] font-[popins] mb-[-5px]  font-normal">
            India's Most Trusted
          </h1>
          <div className="max-w-[300px] md:max-w-full mb-4">
            <h2 class="text-[30px] lg:text-[60px] font-extrabold my-2 border-b-4 pb-2">
              Packers & Movers
            </h2>
            <h3 class="text-[30px] lg:text-[60px]  font-extrabold">
              Storage Providers
            </h3>
          </div>

<div className="lg:hidden ">
    <Image priority width={500} height={100} sizes='100vw' src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/pack-and-move.webp" alt="" />
</div>
<div className="flex justify-center items-center lg:items-start flex-col">
<Link
              href="/pack-move-store"
              className="hero-btn animation-btn cursor-pointer w-[140px] md:w-[314px] h-[40px] md:h-[52px] rounded-lg text-[16px] md:text-[19px] flex justify-center items-center text-white decoration-none  bg-[#007bff] capitalize  "
            >
              Book Now
            </Link>
            <p className="text-[16px] lg:text-[26px] font-bold text-white py-4">
            Get 30% OFF Upto ₹ 5000

            </p>
</div>
            </div>

        <section class="course  mt-[0px] md:mt-[0px] bg-white py-8">
          <div class="course1 ">
            <h2 className="text-[18px] font-inter md:text-[34px] font-semibold text-[#1b1c57] capitalize">
              Get Unutilised Storage Space at a Reasonable Price.
            </h2>
            <p className="font-inter px-2 text-[12px] md:text-[18px] text-[#1b1c57] py-3 m-[auto]">
              Secure a convenient storage space at a price that
              fits your budget.
            </p>
          </div>
          <div class="crow md:mt-[100px] gap-2">
            <div class="course-col shadow md:mt-[-50px]">
              <Image
                src={AWS_IMAGE_URL + "Verified+Host-.webp"}
                alt="host"
                width={100}
                height={100}
              />
              <h3 className="capitalize text-[#1b1c57] font-semibold mb-[20px]  my-[10px] md:my-[20px] text-[18px] md:text-[28px]">
                Verified Host
              </h3>
            </div>
            <div class="course-col shadow">
              <Image
                src={AWS_IMAGE_URL + "SecuredandInsured.webp"}
                alt="insured"
                width={100}
                height={100}
              />
              <h3 className="capitalize text-[#1b1c57] font-semibold mb-[20px]  my-[10px] md:my-[20px] text-[18px] md:text-[28px]">
                Secured & Insured
              </h3>
            </div>
            <div class="course-col shadow md:mt-[-50px]">
              <Image
                src={AWS_IMAGE_URL + "StressFreeMoveIn.webp"}
                alt="stressfree"
                width={100}
                height={100}
              />
              <h3 className="capitalize text-[#1b1c57] font-semibold mb-[20px]  my-[10px] md:my-[20px] text-[18px] md:text-[28px]">
                Stress-free move-in
              </h3>
            </div>

            <div class="course-col shadow">
              <Image
                src={AWS_IMAGE_URL + "NearBy.webp"}
                alt="nearby"
                width={100}
                height={100}
              />
              <h3 className="capitalize text-[#1b1c57] font-semibold mb-[20px]  my-[10px] md:my-[20px] text-[18px] md:text-[28px]">
                Near-by Flexible & Affordable
              </h3>
            </div>
          </div>
        </section>

        <section id="" className=" h-[auto] py-[20px] bg-sky-50 ">
          <div className="p-[20px] ">
            <h2 className="capitalize text-[18px] md:text-[34px]  font-semibold text-center text-[#1B1C57] ">
              We Store Memories & Emotions
            </h2>

            <p className="text-[12px]  md:text-[18px] text-[#1b1c57]  py-3 m-[auto] px-2 text-center">
              The protection & security of your valuables are of utmost
              importance to us.
            </p>
            <div class=" flex items-center justify-evenly md:mt-10 flex-wrap">
              <div class="m-3 flex items-center justify-between py-[5px] max-w-[450px] max-h-[85px]  text-left">
                <Image
                  className="w-[100px]"
                  src={AWS_IMAGE_URL + "Householditems1.webp"}
                  alt="slider1"
                  width={100}
                  height={100}
                />
                <div className="ml-3">
                  <h2 className="capitalize text-[16px] md:text-[24px] font-semibold text-[#1B1C57] text-left">
                    Household Items
                  </h2>
                  <p className=" text-gray-700 md:pt-4 text-[12px] md:text-[18px]">
                    A safe & secure home for all your household goods. From your
                    double bed to the smallest of household items.
                  </p>
                </div>
              </div>
              <div class=" m-3 flex items-center justify-between py-[5px] max-w-[450px] max-h-[85px] text-left">
                <Image
                  className="w-[100px]"
                  src={AWS_IMAGE_URL + "BusinessInventory.webp"}
                  alt="slider1"
                  width={100}
                  height={100}
                />
                <div className="ml-3">
                  <h2 className="text-[16px] md:text-[24px] font-semibold text-[#1B1C57] text-left">
                    Business Inventories
                  </h2>
                  <p className="text-gray-700 md:pt-4 text-[12px] md:text-[18px]">
                    Your business expansion made easy. A dedicated & customized
                    strorage solutions for your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="container3 ">
          <div class="">
            <h2 className=" text-[18px] md:text-[34px]  font-semibold text-center text-[#1B1C57]">
              Affordable Vs Easy Storage
            </h2>
            <p className="text-[12px] md:text-[18px] m-[auto] px-2  text-[#1b1c57] py-3 text-center">
              Nearby & pocket friendly world-class storage facilities as per
              your needs.
            </p>
          </div>
          <div class="con2">
            <video
              width="320"
              height="240"
              poster="./images/vedio/fallback.jpg"
              controls
            >
              <source src="./images/vedio/xtendedspace.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
        <div className=" text-center bg-gray-100 py-8">
          <h2 className="capitalize text-[18px] md:text-[34px]  font-semibold text-center text-[#1B1C57]">
            Storage Types
          </h2>

          <div className=" ">
            <div className="buttons flex justify-center md:gap-10 ">
              <Link href="easy-storage" rel="noopener noreferrer">
                <button className="text-white cursor-pointer text-[14px] md:text-[32px] font-semibold bg-lime-500 p-[auto] h-[40px] md:h-[100px] block w-[160px] md:w-[500px] rounded-xl google-play">
                  Easy Storage
                </button>
              </Link>
              <Link href="/affordable-storage" rel="noopener noreferrer">
                <button className="text-white cursor-pointer text-[14px] md:text-[32px] font-semibold bg-blue-600 p-[auto] h-[40px] md:h-[100px] block w-[160px] md:w-[500px] rounded-xl app-store">
                  Affordable Storage
                </button>
              </Link>
            </div>
          </div>
        </div>
        <section class="container3 ">
          <div class="con1">
            <h2 className=" text-[18px] md:text-[34px]  font-semibold text-center text-[#1B1C57]">
              Affordable Vs Easy Storage
            </h2>
            <p className="text-[12px] md:text-[18px] text-[#1b1c57] px-2 py-3 m-[auto] text-center">
              We provide storage packages for your needs at pocket-friendly
              prices.
            </p>
          </div>
          <SimpleSlider1 />
        </section>
        <div className="patner text-center bg-gray-100 py-8">
          <h2 className=" text-[18px] md:text-[34px]  font-semibold text-center text-[#1B1C57]">
            Serving Corporate Giants
          </h2>
          <SimpleSlider />
        </div>
        <div className="Blogs">
          <div className="self-center my-[50px] text-3xl font-semibold text-center capitalize text-blue-950 max:max-w-full">
            <h2 className=" text-[18px] md:text-[34px]  font-semibold text-center text-[#1B1C57]">
              Our Customers' Reviews
            </h2>
          </div>
          <SimpleSlider4 />
        </div>

        <section id="listapp" class="third1 ">
          <div class="home-text  w-[45vmax]">
            <h2 className=" text-[17px] md:text-[48px]  font-[800] text-black md:my-2 capitalize">
              Earn Passive Income with Xtended Space.
            </h2>
            <p className="text-[7px] md:text-[18px] text-[#1b1c57] md:my-4">
              Enjoy an extra way of earning at Xtended Space simply by listing
              your unused space for rent. Whether you have a vacant garage,
              basement or office space, conveniently earn thousands
              of rupees monthly.
            </p>
            <div className="mt-2 md:mt-8">
              <h4 className="text-[7px] md:text-[19px]   font-semibold text-[#1B1C57]"></h4>
              <div className="buttons flex mt-0 md:mt-[20px] bg-blue-500 w-[100px] md:w-[200px] h-[30px] md:h-[50px] item-center justify-center rounded-md text-white text-[12px] md:text-[20px]">
                <Link href="/list-storage" className="m-auto">
                  List Your Space
                </Link>
              </div>
            </div>
          </div>
          <div class="about-img w-[38vw] md:w-[40vw]">
            <Image
              id="mobile1"
              className="hidden md:block"
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/passiveincomep2.webp"
              alt="image"
              width={300}
              height={300}
            />
            <Image
              id="mobile2"
              className="block md:hidden h-5"
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/passiveincomep2.webp"
              alt="image"
              width={300}
              height={300}
            />
          </div>
        </section>

        <div className="patner text-center pt-[40px] md:py-[40px]">
          <h2 className=" text-[18px] md:text-[34px] md-4  md:mb-5   font-semibold text-[#1B1C57] capitalize">
            Featured in
          </h2>
          <SimpleSlider3 />
        </div>
        <section id="third" class="third px-8 bg-sky-50 py-8 mt-0">
          <div class="home-text">
            <div className="ht1 ">
              <h2 className=" text-[18px] md:text-[32px] font-bold text-[#1b1c57] capitalize">
                Get in touch with us
              </h2>
              <p className=" text-[12px] text-[#1b1c57] py-3 md:text-[18px] ">
                Xtended Space smoothens your storage needs with just a click
                away by providing you pickup to secure storage and convenient
                redelivery.
              </p>
            </div>
            <div className=" w-full  md:flex-col my-2 flex-wrap hidden md:block">
              <div className="contact-item mt-4 gap-2 mr-2  flex items-center">
                <Image
                  className="w-[28px] md:w-[46px]"
                  src={AWS_IMAGE_URL + "email.svg"}
                  alt="email"
                  width={28}
                  height={28}
                />
                <p className="text-[12px] md:text-[14px] text-[#1b1c57] font-semibold">
                  Email: <br /> info@xtendedspace.com
                </p>
              </div>
              <div className="contact-item mt-4 gap-2 mr-2 flex items-center">
                <Image
                  className="w-[28px] md:w-[46px]"
                  src={AWS_IMAGE_URL + "phone-1.svg"}
                  alt="phone"
                  width={28}
                  height={28}
                />
                <p className="text-[12px] md:text-[14px] text-[#1b1c57] font-semibold">
                  Call Us: <br />
                  +(91) 900 900 0798
                </p>
              </div>
              <div className="contact-item mt-4 gap-2 mr-2 flex items-center">
                <Image
                  className="w-[28px] md:w-[46px]"
                  src={AWS_IMAGE_URL + "clock.svg"}
                  alt="clock"
                  width={28}
                  height={28}
                />
                <p className="text-[12px] md:text-[14px] text-[#1b1c57] font-semibold">
                  Time: <br />
                  Mon - Sun
                </p>
              </div>
            </div>
          </div>
          <div class="about-img mx-[auto]">
            <div className="container">
              <form id="myform" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Name<span class="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter"
                      name="name"
                      required
                      onChange={handleChange}
                    />
                    {multipleError && multipleError.Name && (
                      <p className="text-sm text-red-500">
                        {multipleError.Name[0]}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      Email<span class="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter"
                      name="email"
                      required
                      onChange={handleChange}
                    />
                    {multipleError && multipleError.Email && (
                      <p className="text-base text-red-500">
                        {multipleError.Email[0]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone<span class="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter"
                      name="phoneNumber"
                      required
                      onChange={handleChange}
                    />
                    {multipleError && multipleError.PhoneNumber && (
                      <p className="text-sm text-red-500">
                        {multipleError?.PhoneNumber[0]}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">
                      City<span class="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      placeholder="Enter"
                      name="city"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                      id="message"
                      rows="3"
                      placeholder="Your Message"
                      name="message"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="form-row">
                  <button type="submit"
                    disabled={isSubmitting}
                  >Submit</button>
                </div>
                <div>
                  {showSuccessMessage && (
                    <p className="success-message text-green-500 font-semibold py-2 px-2">
                      Thank you for contacting us! Our Team will contact you
                      soon!
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className=" w-full flex-row md:flex-col flex my-2 flex-wrap  md:hidden">
            <div className="contact-item mt-4 gap-2 mr-2  flex items-center">
              {/* <FaEnvelope /> */}
              <Image
                className="w-[28px] md:w-[46px]"
                src={AWS_IMAGE_URL + "email.svg"}
                alt="email"
                width={28}
                height={28}
              />
              <p className="text-[12px] md:text-[14px] text-[#1b1c57] font-semibold">
                Email: <br /> info@XtendedSpace.com
              </p>
            </div>
            <div className="contact-item mt-4 gap-2 mr-2 flex items-center">
              {/* <FaPhoneAlt /> */}
              <Image
                className="w-[28px] md:w-[46px]"
                src={AWS_IMAGE_URL + "phone-1.svg"}
                alt="phone"
                width={28}
                height={28}
              />
              <p className="text-[12px] md:text-[14px] text-[#1b1c57] font-semibold">
                Call Us: <br />
                +(91) 900 900 0798
              </p>
            </div>
            <div className="contact-item mt-4 gap-2 mr-2 flex items-center">
              <Image
                className="w-[28px] md:w-[46px]"
                src={AWS_IMAGE_URL + "clock.svg"}
                alt="clock"
                width={28}
                height={28}
              />
              <p className="text-[12px] md:text-[14px] text-[#1b1c57] font-semibold">
                Time: <br />
                Mon - Sun
              </p>
            </div>
          </div>
        </section>
<div className="">
  <Searchlocation cities={cities}/>
</div>
        <Footer />
      </div>
    </>
  );
}
