import Link from "next/link";
import { useState } from "react";

import SimpleSlider4 from "@/sharedComponent/slider6";

import { DatePicker } from "antd";
import moment from "moment";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import Hubspotpm from "@/pages/services/packers-and-movers/hubspotpm";

import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import { useEffect, useRef } from "react";
import FormModal from "@/sharedComponent/modal/formModal";
import { SaveB2BStorageTypeData } from "@/service/storageService";
import Myform from "../../../util/contactform";
import Image from "next/image";
import citiesData from '@/components/citiesData';
import dynamic from "next/dynamic";
const Searchlocation = dynamic(() => import("../../searchlocation"));

const ModalBody = ({ setModalShow }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img
          src="/images/offerlanding/tickmark.png"
          alt="Tick Mark"
          className="w-24 h-24 mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
        <p className="text-lg text-center mb-6">
          We will connect with you soon.
        </p>
        <div
          onClick={() => {
            window.location.reload();
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Back
        </div>
      </div>
    </>
  );
};
export default function Home() {
  const [data, setData] = useState({
    ServiceType: "Relocation",
    PickupDate: "",
    Message: "n/a",
    PickupLocation: "n/a",
  });
  const cities = Object.values(citiesData); 
  const [error, setError] = useState();
  const [multipleError, setMultipleError] = useState();
  const pickupLocationRef = useRef(null);
  const [modalShow, setModalShow] = useState(false);
  const [hubspotFormSubmit, setHubspotFormSubmit] = useState(false);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAbIvotWe6gIR8IPuYe_8jY8mK0eLiKr04&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          const autocomplete = new window.google.maps.places.Autocomplete(
            pickupLocationRef.current
          );
          autocomplete.setFields(["formatted_address"]);
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            setData((prevData) => ({
              ...prevData,
              PickupLocation: place.formatted_address,
            }));
          });
        };
        document.head.appendChild(script);
      }
    };
    loadGoogleMapsScript();
  }, []);

  const onChange = (e, dateString) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
      setMultipleError("");
    } else {
      const formattedDate = dateString;
      setData({ ...data, PickupDate: formattedDate });
      setMultipleError("");
     
    }
  };

  const searchParams = useSearchParams();
  const utm_source = searchParams.get("utm_source");
  const utm_medium = searchParams.get("utm_medium");
  const utm_campaign = searchParams.get("utm_campaign");
  const utm_content = searchParams.get("utm_content");
  const utm_term = searchParams.get("utm_term");
  const gclid = searchParams.get("gclid");
  const referrer = searchParams.get("referrer");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, data[item]);
   
    });
    if (utm_source) {
      formData.append("UTM_Source", utm_source);
      formData.append("UTM_Medium", utm_medium);
      formData.append("UTM_Campaign", utm_campaign);
      formData.append("UTM_Content", utm_content);
      formData.append("UTM_Term", utm_term);
      formData.append("Gclid", gclid);
      formData.append("Referrer", referrer);
    }
    const response = await SaveB2BStorageTypeData(formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // console.log("response===", response);
    if (response.success) {
      setHubspotFormSubmit(true);

      // alert("Form data submitted successfully!");
      setModalShow(true);
      setData({ ...data, ServiceType: "Relocation" });
      document.getElementById("myform").reset();
      // document.getElementById("myform2").reset();
    } else {
      if (
        response?.error?.title === "One or more validation errors occurred."
      ) {
        setMultipleError(response?.error?.errors);
      }
      //  document.getElementById("myform").reset();
      setError(response?.error?.text || "");
    }
    // console.log("response", error);
  };

  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%] ">
      <Hubspotpm
        portalId="45810273"
        formId="6fd0285f-b72f-42fb-9b6e-957dda2294fa"
        hubspotFormSubmit={hubspotFormSubmit}
        data={data}
      />
      <Head>
        <link
          rel="shortcut icon"
          href="/images/logo/XtendedSpace.webp"
          type="image/x-icon"
        />
        <title>Reliable Packers and Movers Services</title>
        <meta
          name="description"
          content="Professional packers and movers services. Safe shifting of household items and goods. Xtended Space ensures a smooth move. Contact us now!"
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content=", packers and movers near me, moving packers near me, packers & movers near me, home shifting services, household shifting services, packers and movers in new mumbai, household shifting services near me, packers and movers services, shifting service, shifting household items, shifting of household goods, shifting household goods, local packers & movers, local movers packers, relocation services, shifting services near me"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/services/packers-and-movers/"
        />
        <meta property="og:title" content="Affordable Local Packers & Movers" />
        <meta
          property="og:description"
          content="Trusted local packers & movers near me. Comprehensive shifting services for household goods. Choose Xtended Space for hassle-free relocation."
        />
        <meta
          property="og:image"
          content="/images/offerlanding/relocation/packers-and-movers.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Affordable Packers & Movers" />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/services/packers-and-movers/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Professional Moving Packers Near you"
        />
        <meta
          name="twitter:description"
          content="Efficient moving packers near me. Quality packers & movers for household shifting services. Book Xtended Space for secure relocation."
        />
        <meta
          name="twitter:image"
          content="/images/offerlanding/relocation/packers-and-movers.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Professional Moving Packers Near you"
        />
      </Head>

      <HeaderMenu />
      <div
        className="min-h-screen md:h-[auto] bg-zinc-50 p-4 md:p-4  flex flex-col justify-center items-center rounded-lg bg-cover  bg-right-bottom "
        style={{
          backgroundImage:
            "url(/images/offerlanding/relocation/HeroBanner.jpg)",
        }}
      >
        <div class="flex flex-col md:flex-row items-start justify-evenly  md:p-4 ">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h1 class=" text-black font-extrabold   mb-4 text-[24px] md:text-[48px]">
              Tailored Relocation Solutions at
              <span class="text-blue-500">Xtended</span>{" "}
              <span class="text-[#8DC63F]">Space</span>
            </h1>
            <p class="text-black text-[17px] md:text-[18px] font-bold mb-6 md:py-4">
              {" "}
              A reliable choice for you that makes your relocation service
              hassle-free.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start">
                <Image
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/daily+delivery+.webp"
                  alt=""
                  class="mr-2"
                  width={30}
                  height={30}
                />
                <span class="text-black text-[13px] md:text-[16px] ">
                  Daily delivery of{" "}
                  <span className="font-bold">10+ relocation</span> services
                  with safety and security.
                </span>
              </li>
              <li class="flex items-start">
                <Image
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/door%20to%20door%203.webp"
                  alt="doortodoor"
                  class="mr-2"
                  width={24}
                  height={24}
                />
                <span class="text-black text-[13px] md:text-[16px] ">
                  {" "}
                  Comprehensive{" "}
                  <span className="font-bold">
                    door-to-door relocation
                  </span>{" "}
                  services.
                </span>
              </li>
              <li class="flex items-start">
                <Image
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/affordable%20price%204.webp"
                  alt="affordable"
                  class="mr-2"
                  width={24}
                  height={24}
                />
                <span class="text-black text-[13px] md:text-[16px] ">
                  Affordable pricing for top-notch{" "}
                  <span className="font-bold">packers and movers</span>{" "}
                  services.
                </span>
              </li>
              <li class="flex items-start">
                <Image
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/delhi%20NCR5.webp"
                  alt="delhincr"
                  class="mr-2"
                  width={24}
                  height={24}
                />
                <span class="text-black text-[13px] md:text-[16px] ">
                  Serving{" "}
                  <span className="font-bold">Delhi NCR and Mumbai</span> with
                  pan India reach.
                </span>
              </li>
            </ul>
          </div>
          <div class="md:w-1/3 bg-white  p-6 rounded-lg shadow-lg">
            <h2 class="text-xl font-bold text-zinc-900  mb-4 text-center">
              {" "}
              Enquire now
            </h2>
            {/* <p class="text-zinc-700  mb-4">Get Video Lectures, QBank & Mock Tests for Free</p> */}
            <form className="space-y-4" id="myform" onSubmit={handleSubmit}>
              <input
                type="text"
                name="Name"
                placeholder="Your Name*"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                aria-label="Your first name"
                onChange={onChange}
              />
              {multipleError && multipleError.Name && (
                <p className="text-sm text-red-500">{multipleError.Name[0]}</p>
              )}
              <input
                type="email"
                name="Email"
                placeholder="Your email address*"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                aria-label="Your email address"
                onChange={onChange}
              />{" "}
              {multipleError && multipleError.Email && (
                <p className="text-base text-red-500">
                  {multipleError.Email[0]}
                </p>
              )}
              <input
                type="text"
                name="Phone"
                placeholder="Your contact no*"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                aria-label="Your contact number"
                maxLength={10}
                onChange={onChange}
              />
              {multipleError && multipleError.Phone && (
                <p className="text-sm text-red-500">{multipleError.Phone[0]}</p>
              )}
              <DatePicker
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Pickup Date*"
                format="DD/MM/YYYY"
                name="PickupDate"
                onChange={(date, dateString) => onChange(null, dateString)}
                // onChange={onChange}
                disabledDate={(current) =>
                  current && current < moment().endOf("day")
                }
              />
              {multipleError && multipleError.PickupDate && (
                <p className="text-sm text-red-500">
                  {multipleError.PickupDate[0]}
                </p>
              )}
              <input
                type="text"
                name="PickupLocation"
                placeholder="Pickup Location*"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                aria-label="Pickup location"
                onChange={onChange}
                ref={pickupLocationRef}
              />
              {multipleError && multipleError.PickupLocation && (
                <p className="text-sm text-red-500">
                  {multipleError.PickupLocation[0]}
                </p>
              )}
              <div className="flex space-x-4"></div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Book now
              </button>
            </form>
          </div>
        </div>
      </div>
      {/*  */}

      {/*  */}
      <section id="third6" class="third6 my-4">
        <div class="ht1 w-full md:w-1/2 gap-2">
          <h2 className="my-2 text-[22px] md:text-[34px]  font-bold text-[#1B1C57]">
            Best Movers and Packers
          </h2>

          <p className="py-2 text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
            Explore smooth packing and moving services with Xtended Space.
            Assurance of your comfortable nationwide relocation journey is
            confirmed here.
          </p>
          <p className="py-2 text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
            Our triple-layer premier packaging and door-to-door logistics
            service make you stress-free. If you want space downsizing or
            relocation assistance, we are for you.
          </p>
          <p className="py-2 text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
            We believe in providing a smooth transition to our secure warehouse
            facility during your move. We make your moving and packing service
            damage-free and smooth.
          </p>
          <div></div>
        </div>
        <div class="third6-img">
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Best%20Movers%20and%20Packers%20A.webp"
            alt="bestmovers"
            width={500}
            height={500}
          />
        </div>
      </section>
      <section class="course bg-blue-50 ">
        <div class="course1 w-full lg:px-[10%]">
          <h2 className="text-[22px] font-inter md:text-[34px] font-bold text-[#1b1c57] capitalize">
            Reasons to choose us
          </h2>
        </div>
        <div class="crow md:mt-[150px]">
          <div class="course-col shadow pb-4 px-2">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Budget-Friendly%20Pricing.webp"
              alt="budget"
              width={200}
              height={200}
            />
            <h3 className="capitalize text-[#1b1c57] font-semibold   mt-[10px] md:mt-[20px] text-[18px] md:text-[28px]">
              Budget-Friendly Pricing
            </h3>
            <p className=" text-gray-700 md:pt-2 text-[14px] md:text-[18px] px-2">
              Get affordable movers and packers services at Xtended Space.
            </p>
          </div>
          <div class="course-col shadow pb-4 px-2 md:mt-[-50px]">
            <img
              src="/images/offerlanding/relocation/Nationwide Moving.png"
              alt=""
            />
            <h3 className="capitalize text-[#1b1c57] font-semibold   mt-[10px] md:mt-[20px] text-[18px] md:text-[28px]">
              Nationwide Moving
            </h3>
            <p className=" text-gray-700 md:pt-2 text-[14px] md:text-[18px] px-2">
              Xtended Space provides a nationwide transition solution.
            </p>
          </div>

          <div class="course-col shadow pb-4 px-2">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Door%20to%20Door%20Logistics22.webp"
              alt="doortodoor"
              width={200}
              height={200}
            />
            <h3 className="capitalize text-[#1b1c57] font-semibold   mt-[10px] md:mt-[20px] text-[18px] md:text-[28px]">
              Door to Door Logistics
            </h3>
            <p className=" text-gray-700 md:pt-2 text-[14px] md:text-[18px] px-2">
              Enjoy the seamless process from your place to the destination.
            </p>
          </div>
        </div>
      </section>

      <div class="w-full lg:px-[10%] pt-6">
        <h2 className="capitalize text-[22px] md:text-[34px]  font-bold text-center text-[#1B1C57]">
          Moving and Packing Services
        </h2>
        <p className="font-inter px-2  text-[17px] md:text-[18px] text-[#1b1c57] py-3 m-[auto] text-center">
          We assure you a smooth pack and move to your new destination. Our
          committed team ensures your items are moved with care and makes your
          move stress-free.
        </p>
      </div>
      {/* </section> */}
      <section id="easystorage w-[100vw]" class="easystorage  py-2">
        <div class=" ht1 w-[80vw] md:w-[45vw]">
          <h2 className="py-2 mb-0 md:mb-[32px] text-[18px] md:text-[30px] capitalize  font-bold text-[#1B1C57]">
            Relocation of Household items
          </h2>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
            Our expert packers and movers make your room shifting service
            efficient by packing and moving your belongings and ensuring they
            reach your new place.
          </p>
        </div>
        <div id="dncr" class="ht1 w-[80vw] md:w-[45vw] h-[auto]">
          <img
            className="w-[90%] m-[auto]"
            src="/images/offerlanding/relocation/Relocation of Household items A.webp"
            alt=""
          />
        </div>
      </section>
      <section id="easystorage2" className="easystorage  py-2 ">
        <div class="ht1 w-[80vw] md:w-[45vw] h-[auto]">
          {/* <!-- <div class="colordiv"></div> --> */}
          <img
            className="w-[90%] m-[auto]"
            src="/images/offerlanding/relocation/Office Relocation Services A.webp"
            alt=""
          />
        </div>

        <div class=" ht1 w-[80vw] md:w-[45vw]">
          <h2 className="py-2 mb-0 md:mb-[32px] text-[18px] md:text-[30px] capitalize  font-bold text-[#1B1C57] ">
            Office Relocation Services
          </h2>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
            Are you looking for office relocation? Xtended Space's moving
            service is the ultimate solution. It reduces your transition stress
            by efficiently packing and moving, and timely setup at the new
            location.
          </p>
        </div>
      </section>
      <section id="easystorage" class="easystorage  py-2 mb-4">
        <div class=" ht1 w-[80vw] md:w-[45vw]">
          <h2 className="py-2 mb-0 md:mb-[32px] text-[18px] md:text-[30px] capitalize  font-bold text-[#1B1C57]">
            Door to Door Logistics
          </h2>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
            Xtended Space makes your door-to-door logistics service convenient
            and carefree nationally. Our operational team ensures your smooth
            move by providing effective transportation services.
          </p>
        </div>
        <div class="ht1 w-[80vw] md:w-[45vw] h-[auto]">
          <Image
            className="w-[90%] m-[auto]"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Door%20To%20Door%20Logistics%20A.webp"
            alt="doortodoor"
            width={200}
            height={200}
          />
        </div>
      </section>
      <section class="process bg-blue-50 py-4">
        <div class="process-info w-full lg:px-[10%]">
          <h2 className="text-[22px] font-inter md:text-[34px] font-bold text-[#1b1c57] capitalize">
            How it Works?
          </h2>
          <p className="font-inter px-2 text-[17px] md:text-[18px] text-[#1b1c57] py-3 m-[auto]">
            Xtended Space is the ultimate relocation service platform in Mumbai.
            It ensures the safe relocation of your belongings.
          </p>
        </div>
        <div class="row w-[100%] p-[5%] flex justify-between flex-wrap gap-5px ">
          <div class="process-col flex flex-col justify-center items-center">
            <img
              src="/images/offerlanding/relocation/Quick Booking.png"
              alt="easy booking"
            />
            <h2>01</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Quick Booking
            </h3>
            {/* <p class="html_article">Seamlessly book your move with our user-friendly process.</p> */}
          </div>
          <div class="process-col flex flex-col justify-center items-center">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Doorstep%20Pickup.webp"
              alt="doorstep pickup"
              width={200}
              height={200}
            />
            <h2>02</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Doorstep Pickup
            </h3>
            {/* <p class="html_article">We pick up your belongings right from your doorstep for maximum convenience.</p> */}
          </div>
          <div class="process-col flex flex-col justify-center items-center">
            <img
              src="/images/offerlanding/relocation/Secure Packing & Moving.png"
              alt="Secure Packing and Moving"
            />
            <h2>03</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Secure Packing & Moving
            </h3>
            {/* <p class="html_article">Our professional team ensures your items are packed securely and moved safely.</p> */}
          </div>
          <div class="process-col flex flex-col justify-center items-center">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Timely+Delivery.webp"
              alt="timelydelivery"
              width={200}
              height={200}
            />
            <h2>04</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Timely Delivery
            </h3>
          </div>
        </div>
        <div class="con2">
          <video
            width="320"
            height="240"
            poster="/images/vedio/fallback.jpg"
            controls
          >
            <source
              src="/images/vedio/29 MAY 2024 XTENDED SPACE WEBSITE LOW RES_1.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <div className="Blogs">
        <div className="self-center my-[50px] text-3xl font-semibold text-center capitalize text-blue-950 max:max-w-full">
          <h2 className=" text-[22px] md:text-[34px]  font-bold text-center text-[#1B1C57]">
            Our Customers' Reviews
          </h2>
        </div>
        <SimpleSlider4 />
      </div>
      <Myform />
      <div className="">
  <Searchlocation cities={cities}/>
</div>
      <Footer />
      <FormModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        ModalBody={ModalBody}
        className="addressAdd"
        size={"mm"}
        title=""
      />
    </div>
  );
}
