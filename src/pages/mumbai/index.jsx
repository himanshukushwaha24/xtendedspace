import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeaderMenu from "@/components/header/header";
import Footer from "../../components/footer";
import { FaLongArrowAltRight } from "react-icons/fa";
import Styles from "@/styles/mumbai_page.module.css";
import young_worker from "../../../public/images/assets-multiple-cities/young-worker.png";
import Boxes from "../../../public/images/assets-multiple-cities/packers&movers/Household_Relocation.png";
import rack from "../../../public/images/assets-multiple-cities/packers&movers/Office_Shifting.png";
import Link from "next/link";
import CallIcon from "../../../public/images/assets-multiple-cities/call-icon.svg";
import CallIconWhite from "../../../public/images/assets-multiple-cities/callIconWhite.svg";
import emailIcon from "../../../public/images/assets-multiple-cities/emailIcon.svg";
import door from "../../../public/images/assets-multiple-cities/doors.png";
import book from "../../../public/images/assets-multiple-cities/book.png";
import deliveryman from "../../../public/images/assets-multiple-cities/deliveryman.png";
import workers from "../../../public/images/assets-multiple-cities/workers.png";
import helpers from "../../../public/images/assets-multiple-cities/helpers.png";
import SimpleSlider from "@/sharedComponent/landingcomponent/simple_slider";
import User from "@/components/multicities/User";
import Faq from "@/sharedComponent/landingcomponent/faq";
import Faqs from "@/sharedComponent/landingcomponent/faqs";
import Form from "./form";
import Contact from "../../components/multicities/contact";
import Head from "next/head";
import Service from "@/sharedComponent/landingcomponent/service";
import StorageComponent from "@/sharedComponent/landingcomponent/storagecomponent";
import { SaveMultipleStorageInMumbai } from "@/service/storageService";

export default function Index() {
  const FAQData = [
    {
      key: "0",
      question: "What is Xtended Space?",
      answer: "Xtended Space is a storage solution that provides...",
    },
    {
      key: "1",
      question: "Why should I use Xtended Space?",
      answer: "Xtended Space offers secure and affordable storage options...",
    },
    {
      key: "2",
      question: "What makes Xtended Space unique in the competitive industry?",
      answer: "We offer flexible storage options with advanced security...",
    },
    {
      key: "3",
      question: "What are the operational hours of Xtended Space?",
      answer: "Our facilities are open 24/7 for your convenience...",
    },
    {
      key: "4",
      question: "What states are you currently operating in?",
      answer: "We are currently operating in California, Texas, and Florida...",
    },
  ];
  const storageDetails = {
    title: "Multiple Storage In",
    location: "MUMBAI",
    contactNumber: "9876543211",
    description:
      "Xtended Space stores your belongings in secure, reliable storage units in Mumbai, simplifying your business process and reducing your mental burden by providing you with storage at affordable prices.",
  };

  const data = {
    heading1: "Xtended Space: Premier Packers and Movers Services Across India",
    services: [
      {
        title:
          "Comprehensive Packers and Movers Services in Multiple Locations",
        description:
          "At Xtended Space, we offer top-notch packers and movers services across multiple locations in India, including Chandigarh, Zirakpur, Ambala (HR), Ludhiana (PB), Vapi (Gujarat), Haridwar (UK), Roorkee (UK), Rudrapur (UK), Kanpur (UP), Lucknow (UP), Jhansi (UP), Meerut (UP), Gwalior (MP), Bengaluru (Karnataka), and Dehradun. Whether you need to relocate your home or office, our skilled professionals handle everything from packing to transporting your belongings safely.",
      },
      {
        title: "Reliable and Affordable Relocation Solutions",
        description:
          "We understand that every move is unique. Our packers and movers services are designed to ensure a smooth and stress-free relocation. Our team is experienced in handling household goods and business inventory with care. We use high-quality packaging materials and advanced equipment to ensure your items are protected during transit.",
      },
      {
        title: "Professional Home Shifting Services",
        description:
          "Xtended Space provides reliable home shifting services across India, ensuring your belongings are safely transported to your new location. Our team of professionals takes care of everything, from packing to unpacking, giving you peace of mind.",
      },
      {
        title: "Best Household Shifting Services Near Me",
        description:
          "Our household shifting services near me are known for their efficiency and professionalism. We provide comprehensive relocation services, making sure your move is seamless and hassle-free. Trust Xtended Space for your next move within India.",
      },
      {
        title: "Affordable Packers and Movers Near Me",
        description:
          "Looking for packers and movers near me? Xtended Space offers affordable and secure moving services. Our experienced team handles your belongings with utmost care, ensuring they reach your new location safely.",
      },
      {
        title: "Expert Moving Packers Near Me",
        description:
          "Searching for moving packers near me? Xtended Space is your go-to solution for reliable and efficient moving services. We offer local packers and movers services near you, ensuring a smooth and hassle-free move.",
      },
      {
        title: "Specialized Household Relocation Services",
        description:
          "Our household relocation services are experts in handling household relocations. We provide specialized services to ensure your household items are packed, transported, and unpacked safely and efficiently.",
      },
      {
        title: "Trusted Relocation Services Across India",
        description:
          "Xtended Space offers trusted relocation services across India, providing top-quality services for all your relocation needs. Whether you are moving within a city or to another state, we ensure a hassle-free experience.",
      },

      // Add more services as needed
    ],
    // tableData: [
    //   { type: "3BHK Shifting", packingPrices: "₹8000 - 12000", laborCosts: "₹5000 - 6000" },
    //   { type: "Few Goods Shifting", packingPrices: "₹3500 - 5000", laborCosts: "₹2000 - 3000" },
    //   { type: "Car Shifting", packingPrices: "₹3000 - 6000", laborCosts: "₹1000 - 3000" },
    //   { type: "Bike Shifting", packingPrices: "₹2000 - 10000", laborCosts: "₹1000 - 2000" }
    // ]
  };

  const testimonials = [
    {
      title: "I Earned extra pocket money",
      content:
        "Xtended Space made my home renovation stress-free! Their storage solutions are super secure and easy to access. I highly recommend you take the service.",
      name: "Tanay Pandya",
      position: "Manager Director",
      image: "/images/HomeIcon/Tanay Pandya.webp",
      rating: "4.6",
    },
    {
      title: "Smooth office storage",
      content:
        "I stored my office equipment with Xtended Space. The storage process was smooth. The team is professional with advanced technology.",
      name: "Tanay Pandya",
      position: "Manager Director",
      image: "/images/HomeIcon/Tanay Pandya.webp",
      rating: "4.6",
    },
  ];
  // FAQData.js

  const services = [
    {
      id: 1,
      imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/book.webp", // Update with your actual image path
      title: "Instant Booking",
      description: "Book instantly without hassle.",
    },
    {
      id: 2,
      imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/doors.webp",
      title: "Door to Door Logistics",
      description: "We handle logistics from door to door.",
    },
    {
      id: 3,
      imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/workers.webp",
      title: "Safe Packing and Moving",
      description: "We provide safe packing and moving services.",
    },
    {
      id: 4,
      imageSrc: "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/deliveryman.webp",
      title: "Time-bound delivery",
      description: "On-time delivery services.",
    },
  ];

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 795
  );
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%]">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Question 1 here",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: " Answer 1 here",
                  },
                },
                {
                  "@type": "Question",
                  name: "Question 2 here",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Answer 2 here",
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <HeaderMenu />

      {/* <section> */}
      <div className={Styles.backgroundDiv}>
        <div className="text-center  mb-[100px] lg:mb-[50px]">
          <p className=" text-white font-extrabold text-[26px] md:text-[48px]">
            30% OFF
          </p>
          <p className="text-white text-[14px] md:text-[18px] lg:px-[20%]">
            Everything you need about fionding the best, safenad affordable
            storage spaces near you.
          </p>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-evenly min-h-[200px] lg:min-h-[450px] w-full bg-white rounded-2xl lg:rounded-[42px] absolute bottom-[50px] ">
        <Form apiFunction={SaveMultipleStorageInMumbai} />

        <StorageComponent storageDetails={storageDetails} />
      </div>
      {/* </section> */}
      <section>
        <div className="h-auto w-full py-[25px] md:py-[50px] bg-[#F7F9FC] text-center font-bold text-[#1B1C57] ">
          <h2 className="text-[18px] md:text-[32px] text-[#1B1C57]">
            Simplifying Your Storage Journey
          </h2>
          <h3 className="text-[#1B1C57] font-[400] py-2">How it works?</h3>
          <Service services={services} />
        </div>
      </section>

      <section>
        <div className="h-auto py-[25px] md:py-[50px] flex flex-col items-center justify-items-center lg:px-10">
          <h2 className="uppercase text-[20px] md:text-[34px] font-bold text-[#1B1C57]  ">
            Storage types
          </h2>
          <User
            title="Storage Space in Mumbai   "
            content="Xtended Space offers storage services in Mumbai for household items and business inventories because of an increasing need for more storage space. Our warehouse has a security system that safely stores your belongings."
            image="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/Household_Relocation.webp"
            buttonText="More info"
            buttonLink="/b2b-logistics"
            reverse={true} // Image first
            isSecond={false}
          />
          <User
            title="Movers and Packers in Mumbai"
            content="Xtended Space supports transportation services to individuals and businesses. We store inventory and relocate it to our destination. Our operational team professionally pack your goods to ensure their safe arrival at their destination. We use thick packing materials such as cartons, bubble wrap, and packing tape to protect your valuables during relocation. "
            image="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/Office_Shifting.webp"
            buttonText="Learn More"
            buttonLink="/storage-solutions"
            reverse={false} // Image second
            isSecond={true} // White background for second section
          />
          <User
            title="Movers and Packers in Mumbai"
            content="Xtended Space supports transportation services to individuals and businesses. We store inventory and relocate it to our destination. Our operational team professionally pack your goods to ensure their safe arrival at their destination. We use thick packing materials such as cartons, bubble wrap, and packing tape to protect your valuables during relocation. "
            image="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/Household_Relocation.webp"
            buttonText="Learn More"
            buttonLink="/storage-solutions"
            reverse={true} // Image second
            isSecond={false} // White background for second section
          />
          <User
            title="Movers and Packers in Mumbai"
            content="Xtended Space supports transportation services to individuals and businesses. We store inventory and relocate it to our destination. Our operational team professionally pack your goods to ensure their safe arrival at their destination. We use thick packing materials such as cartons, bubble wrap, and packing tape to protect your valuables during relocation. "
            image="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/Office_Shifting.webp"
            buttonText="Learn More"
            buttonLink="/storage-solutions"
            reverse={false} // Image second
            isSecond={true} // White background for second section
          />
        </div>
      </section>

      <section className="text-center py-[25px]  md:py-[50px] md:pr-[50px] bg-gray-100">
        <h2 className=" text-[18px] md:text-[32px]   mb-4   font-semibold text-[#1B1C57] capitalize">
          What Our User Say About Us
        </h2>
        <SimpleSlider testimonials={testimonials} />
      </section>

      <div className="md:px-[100px]">
        <Faqs FAQData={FAQData} />
      </div>
      <section className="grid place-items-center my-12 ">
        <Faq data={data} />

        <div className="flex flex-col items-start justify-center flex-wrap w-[90%] mt-6">
          <h4 className="text-[#1B1C57] text-[16px] md:text-[20px] font-bold mb-3">
            Packers and Movers Charges in Delhi
          </h4>
          <table className="w-full text-[#1B1C57]">
            <thead>
              <tr className="border-b-2 border-zinc-100 h-[60px]">
                <th className="text-[14px] md:text-[18px]">Shifting Type</th>
                <th className="text-[14px] md:text-[18px]">Packing Prices</th>
                <th className="text-[14px] md:text-[18px]">Labor Costs</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b-2 border-zinc-100 h-[60px]">
                <td className="text-[12px] md:text-[16px]">3BHK Shifting</td>
                <td className="text-[12px] md:text-[16px]">₹8000 - 12000</td>
                <td className="text-[12px] md:text-[16px]">₹5000 - 6000</td>
              </tr>

              <tr className="border-b-2 border-zinc-100 h-[60px]">
                <td className="text-[12px] md:text-[16px]">
                  Few Goods Shifting
                </td>
                <td className="text-[12px] md:text-[16px]">₹3500 - 5000</td>
                <td className="text-[12px] md:text-[16px]">₹2000 - 3000</td>
              </tr>

              <tr className="border-b-2 border-zinc-100 h-[60px]">
                <td className="text-[12px] md:text-[16px]">Car Shifting</td>
                <td className="text-[12px] md:text-[16px]">₹3000 - 6000</td>
                <td className="text-[12px] md:text-[16px]">₹1000 - 3000</td>
              </tr>

              <tr className="border-b-2 border-zinc-100 h-[60px]">
                <td className="text-[12px] md:text-[16px]">Bike Shifting</td>
                <td className="text-[12px] md:text-[16px]">₹2000 - 10000</td>
                <td className="text-[12px] md:text-[16px]">₹1000 - 2000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <Contact />

      <div className="bg-blue-500 px-2">
        <Footer />

<div class="bg-blue-500 p-6 border-t-2 md:m-[auto] max-w-7xl ">
<div class="grid grid-cols-2 lg:grid-cols-6 gap-4">
<div class="text-start">
  <ul>
    <li><Link href="#" class="text-white text-[16px] font-bold">Mumbai</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Easy Storage</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Household</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Warehouse</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Cold Storage</Link></li>
  </ul>
</div>
<div class="text-start">
  <ul>
    <li><Link href="#" class="text-white text-[16px] font-bold">Mumbai</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Easy Storage</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Household</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Warehouse</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Cold Storage</Link></li>
  </ul>
</div>
<div class="text-start">
  <ul>
    <li><Link href="#" class="text-white text-[16px] font-bold">Mumbai</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Easy Storage</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Household</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Warehouse</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Cold Storage</Link></li>
  </ul>
</div>
<div class="text-start">
  <ul>
    <li><Link href="#" class="text-white text-[16px] font-bold">Mumbai</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Easy Storage</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Household</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Warehouse</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Cold Storage</Link></li>
  </ul>
</div>
<div class="text-start">
  <ul>
    <li><Link href="#" class="text-white text-[16px] font-bold">Mumbai</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Easy Storage</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Household</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Warehouse</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Cold Storage</Link></li>
  </ul>
</div>
<div class="text-start">
  <ul>
    <li><Link href="#" class="text-white text-[16px] font-bold">Mumbai</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Easy Storage</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Household</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Warehouse</Link></li>
    <li><Link href="#" class="text-white text-[14px]">Cold Storage</Link></li>
  </ul>
</div>
</div>
</div>
   </div>
    </div>
  );
}
