import React, { useState } from "react";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoInstagram } from "react-icons/bi";
import { LiaTwitter } from "react-icons/lia";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { BsShare } from "react-icons/bs";
import BreadCrumb from "@/sharedComponent/BreadCrumb";

const Items = () => {
  const [activeButtons, setActiveButtons] = useState({});

  const handleClick = (click) => {
    setActiveButtons((prevActiveButtons) => ({
      ...prevActiveButtons,
      [click]: true,
    }));
  };
  const handleBlur = (click) => {
    setActiveButtons((prevActiveButtons) => ({
      ...prevActiveButtons,
      [click]: false,
    }));
  };

  return (
    <>
      <HeaderMenu />
      <section className="other_items w-full h-[20vh]md:h-screen bg-[url('/images/blog/herobanner.png')] bg-cover bg-center bg-no-repeat">
      <div className="p-4 text-white">
      <BreadCrumb 
          currentElement={{ title: "Blogs", path: "blogs" }}
          detailPage="How to properly pack your furniture and other items"
        />
      </div>

        <div className=" text-left text-white pt-[150px] md:pt-[260px] pl-[45px] md:pl-[100px]">
          <span className="text-[12px] md:text-[20px] text-white text-left">
            Storage
          </span>
          <div>
            <h1 className="text-[20px] md:text-[40px] text-white font-semibold leading-[30px] md:leading-[48px]">
              <span className="custom_mobile block md:hidden">
                How to properly pack your <br /> furniture and other items
              </span>
              <span className="hidden md:block">
                How to properly pack your furniture and <br /> other items
              </span>
            </h1>
          </div>

          <div className="flex w-full md:w-[20vw] justify-start md:justify-center items-center gap-4 py-3 md:pr-6 ">
            <Image
              src="/images/author/author-2.jpg"
              width={50}
              height={20}
              alt="profile"
              className="rounded-full "
            />

            <div className="text-center flex gap-4">
              <h2 className="text-white">Anjilina</h2>
              <p className="text-white">22Nov ,23</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content_sec w-full">
        <div className="main_content_sec flex flex-col md:flex-row w-full md:py-8">
          <div className=" w-full md:w-[20%] flex justify-center">
            <ul className="flex flex-row md:block lg:flex-col  px-2 gap-4 pt-[20px] md:pt-0 ">
              <li className="font-normal text-[12px] md:text-[24px] text-[#374151] ">
                Introduction{" "}
              </li>
              <li className="font-normal text-[12px] md:text-[24px] text-[#374151]">
                How to{" "}
              </li>
              <li className="font-normal text-[12px] md:text-[24px] text-[#374151]">
                Steps{" "}
              </li>
              <li className="font-normal text-[12px] md:text-[24px] text-[#374151]">
                Data use{" "}
              </li>
              <li className="font-normal text-[12px] md:text-[24px] text-[#374151]">
                Guidelines{" "}
              </li>
            </ul>
          </div>
          <div className="flex flex-col md:block lg:flex-col gap-2 px-3  w-full md:w-[60%] py-2">
            <p className="font-normal text-[12px] md:text-[20px] leading-8 text-[#374151] text-start p-3">
              Finding the appropriate storage services has become a daunting
              task these days. Whether you are searching for storage to
              declutter your home or temporarily shift, a systematic storage
              plan is required. In this article, you will learn the correct
              procedure for storage. It is significant to know tips for
              organizing things.
            </p>

            <div className="flex justify-center items-center">
              <Image
                src="/images/newblogs/An Effective Storage Plan.webp"
                width={200}
                height={100}
                alt="blog1"
                className="w-full md:w-[50vw] h-auto rounded-lg"
              />
            </div>

            <div className="flex flex-col justify-start md:justify-center  md:items-start  py-2 d:py-10">
              <p className="font-semibold text-[#374151] text-[24px] md:text-[36px] py-4 ml-0 md:ml-2">
                An Effective Storage Plan
              </p>
              <p className="font-normal text-[12px] md:text-[20px] leading-5 md:leading-8 text-[#374151] px-2">
                Before putting yourself into the task of making a storage plan.
              </p>

              {/* <p className="font-normal text-[12px] md:text-[20px] leading-5 md:leading-8 text-[#374151] px-2">
                {" "}
                1. Always check your storage requirements and make a storage
                plan about how much area you need. 2. Frequently and
                non-frequently used items should be separated. Store the
                non-frequently used items in a storage unit. 3. Check your
                storage expenditure carefully for logistics, safety, and
                security services.
              </p> */}
               <ul className="font-normal text-[12px] md:text-[20px] leading-5 md:leading-8 text-[#374151] px-2">
                <li>
                  1. Always check your storage requirements and make a storage
                  plan about how much area you need.
                </li>
                <li>
                  2. Frequently and non-frequently used items should be
                  separated. Store the non-frequently used items in a storage
                  unit.
                </li>
                <li>
                  3. Check your storage expenditure carefully for logistics,
                  safety, and security services.{" "}
                </li>
              </ul> 

              <p className=" font-bold text-[12px] md:text-[20px] leading-5 md:leading-8 text-[#374151] px-2  py-2">
                Pack the items 
              </p>

              <p className="font-normal text-[12px] md:text-[20px] leading-5 md:leading-8 text-[#374151] px-2  py-2">
                Professional packing is mandatory for safety.
              </p>
              {/* <p className="font-normal text-[12px] md:text-[20px] leading-5 md:leading-8 text-[#374151] px-2">
                1. Use durable cartons: go with durable cartons and protect your
                items. 2. Cover delicate goods: bubble wrap and old clothes are
                suitable for wrapping objects. 3. Labelling process: labeling
                the boxes for easy identification is significant.
              </p> */}
               <ul className="font-normal text-[12px] md:text-[20px] leading-5 md:leading-8 text-[#374151] px-2  py-2">
                <li>
                  1. Use durable cartons: go with durable cartons and protect
                  your items.{" "}
                </li>
                <li>
                  2. Cover delicate goods: bubble wrap and old clothes are
                  suitable for wrapping objects.{" "}
                </li>
                <li>
                  3. Labelling process: labeling the boxes for easy
                  identification is significant.{" "}
                </li>
              </ul> 
            </div>

            <div className="flex flex-col justify-start md:justify-center justify-startmd:items-center">
              <p className="font-semibold text-[#374151] text-[24px] md:text-[36px] py-3 md:py-4 ml-3 md:ml-2 ">
                Bulky items need to be in small boxes
              </p>
              <p className="font-normal text-[12px] md:text-[20px] leading-5 md:leading-8 text-[#374151] px-3 md:px-0">
                Follow the tip to avoid accidents. Follow the tip.
              
              </p>

               <p className="font-normal text-[12px] md:text-[20px] leading-5 md:leading-8 text-[#374151] px-3 md:px-0 py-6">
                1. Store heavy items like books and kitchenware in small
                cartons.
              </p> 
            </div>

            {/* <div className="flex justify-center items-center">
              <Image
                src="/images/blog/b2.png"
                width={200}
                height={100}
                alt="blog1"
                className="w-full md:w-[50vw] h-auto"
              />
            </div> */}
            <div className="flex flex-col justify-start md:justify-center  md:items-start ">
              <p className="font-semibold text-[#374151] text-[24px] md:text-[34px] text-center py-4 ml-0 md:ml-2">
                Cleaning your mattress before storing it 
              </p>
              <p className="font-normal text-[12px] md:text-[20px] leading-5 md:leading-8 text-[#374151] px-3 md:px-0">
                Follow the process for cleaning the mattress.
               
              </p>

               <ul className="font-normal text-[12px] md:text-[20px] leading-5 md:leading-8 text-[#374151] px-3 md:px-0 py-6">
                <li>1. Remove dust and dirt by vacuuming a mattress.</li>
                <li>
                  2. To clean the stains of upholstery, use a gentle detergent.{" "}
                </li>
              </ul>
            </div>

            <div className="flex justify-center items-center">
              <Image
                src="/images/newblogs/List of things needed that can store.webp"
                width={200}
                height={100}
                alt="blog1"
                className="w-full md:w-[50vw] h-auto rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-start md:justify-center items-center md:items-start  py-10">
              <p className="font-semibold text-[#374151] text-[24px] md:text-[34px] text-center py-4 ml-0 md:ml-2">
                List of things needed that can store
              
              </p>
              {/* <p className="font-normal text-[12px] md:text-[20px] leading-5 md:leading-8 text-[#374151] px-3 md:px-0">
              1. Store festival decorations, clothes, and kitchenware items
                in the storage space.{" "}
                2. Store wooden items like chairs and couches.
                3. Safeguard electronic gadgets from dust and damage.
              </p> */}

              <ul className="font-normal text-[12px] md:text-[20px] leading-5 md:leading-8 text-[#374151] px-3 md:px-0">
                <li>
                  1. Store festival decorations, clothes, and kitchenware items
                  in the storage space.{" "}
                </li>
                <li>2. Store wooden items like chairs and couches.</li>
                <li>3. Safeguard electronic gadgets from dust and damage.</li>
              </ul>
            </div>
            {/* <div className="flex justify-center items-center">
              <Image
                src="/images/blog/b2.png"
                width={200}
                height={100}
                alt="blog1"
                className="w-full md:w-[50vw] h-auto"
              />
            </div> */}
            <div className="flex flex-col justify-start md:justify-center items-center md:items-start">
              <p className="font-semibold text-[#374151] text-[24px] md:text-[34px] text-center ml-0 md:ml-2">
                Conclusion
              </p>

              <p className="font-normal text-[12px] md:text-[20px] leading-8 text-[#374151] text-start p-3">
                Xtended Space can be your prime choice. It offers a variety of
                storage solutions, from household storage units to warehouse
                facilities. We have the perfect answer to your storage needs.
                What sets it apart is the spacious storage facility and its
                helpful attitude toward its customers. Xtended Space in Delhi,
                NCR, and Mumbai is more than a storage provider. It is your
                reliable storage partner that simplifies your storage obstacles.
              </p>

              <p className="font-normal text-[12px] md:text-[20px] leading-8 text-[#374151] text-start p-3">
                A storage solution is pivotal for making a hassle-free and
                systematic living place in India. With proper planning, packing
                style, using small boxes for heavy items, cleaning your
                mattress, disassembling furniture, and stacking it properly,
                you'll be well on your way to mastering the art of storage.
                Remember, you can store almost anything with the right strategy.
                With these simple tips, you'll find your storage needs with ease
                and convenience.
              </p>
            </div>

            <div className="flex w-full  justify-start md:justify-center items-center gap-4 py-2 md:pr-6 px-3 ">
              <Image
                src="/images/author/author-2.jpg"
                width={50}
                height={20}
                alt="profile"
                className="rounded-full "
              />

              <div className="text-center w-full  flex  justify-between items-center gap-4">
                <p className="text-black">Anjilina</p>
                <p className="text-black">22Nov ,23</p>
              </div>
            </div>
          </div>

          <div className=" w-full md:w-[25%]   p-4  hidden md:inline ">
            <div className="flex flex-col gap-8 bg-[#F7F7FD] rounded-xl pb-4">
              <p className="text-center font-normal text-[18px] text-[#1B1C57] pt-3">
                others blogs
              </p>
              <div className=" flex justify-center items-center">
                <div className="other-items flex flex-col justify-center items-center">
                   <p className="absolute text-white text-center ">Storage</p>
                </div>
                 

              </div>
              <div className=" flex justify-center items-center">
               
                 <div className="other-items1 flex flex-col justify-center items-center">
                 <p className="text-white absolute text-center ">Packing</p>
                </div>
                
              </div>
              <div className=" flex justify-center items-center">
              <div className="other-items2 flex flex-col justify-center items-center">
              <p className="text-white text-center">Logistics</p>
              </div>
               
                <h3 className="text-white text-center absolute">Logistics</h3>
              </div>
            </div>

            <div className="tag_sec w-full h-auto  bg-white pt-4 ">
              <p className="font-normal text-[18px] text-[#1B1C57] px-3">
                Tags
              </p>

              <div className="simple_tag w-full md:w-[20vw]  h-[280px] px-3 mt-3">
                <div className="flex flex-row flex-wrap gap-4">
                  <div className="flex flex-row gap-2">
                    <button
                      className={`px-4 py-2 rounded-full ${
                        activeButtons["Storage"]
                          ? "bg-[#338CFF] text-white"
                          : "bg-gray-50"
                      } text-gray-700 font-normal`}
                      onClick={() => handleClick("Storage")}
                      onBlur={() => handleBlur("Storage")}
                    >
                      Storage
                    </button>

                    <button
                      className={`px-4 py-2 rounded-full ${
                        activeButtons["Packing"]
                          ? "bg-[#338CFF] text-white"
                          : "bg-gray-50"
                      } text-gray-700 font-normal`}
                      onClick={() => handleClick("Packing")}
                      onBlur={() => handleBlur("Packing")}
                    >
                      Packing
                    </button>
                  </div>

                  <div className="flex flex-row gap-2">
                    <button
                      className={`px-4 py-2 rounded-full ${
                        activeButtons["Logistics"]
                          ? "bg-[#338CFF] text-white"
                          : "bg-gray-50"
                      } text-gray-700 font-normal`}
                      onClick={() => handleClick("Logistics")}
                      onBlur={() => handleBlur("Logistics")}
                    >
                      Logistics
                    </button>
                    <button
                      className={`px-4 py-2 rounded-full ${
                        activeButtons["P2P"]
                          ? "bg-[#338CFF] text-white"
                          : "bg-gray-50"
                      } text-gray-700 font-normal`}
                      onClick={() => handleClick("P2P")}
                      onBlur={() => handleBlur("P2P")}
                    >
                      P2P
                    </button>
                  </div>
                  <div className="flex flex-row gap-2">
                    <button
                      className={`px-4 py-2 rounded-full ${
                        activeButtons["B2B"]
                          ? "bg-[#338CFF] text-white"
                          : "bg-gray-50"
                      } text-gray-700 font-normal`}
                      onClick={() => handleClick("B2B")}
                      onBlur={() => handleBlur("B2B")}
                    >
                      B2B
                    </button>
                    <button
                      className={`px-4 py-2 rounded-full ${
                        activeButtons["Packing2"]
                          ? "bg-[#338CFF] text-white"
                          : "bg-gray-50"
                      } text-gray-700 font-normal`}
                      onClick={() => handleClick("Packing2")}
                      onBlur={() => handleBlur("Packing2")}
                    >
                      Packing2
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="touch_sec">
              <p className="font-normal text-[18px] text-[#1B1C57]  text-start mb-2 ">
                Stay in touch
              </p>
              <div className=" w-full md:w-[80%] px-2">
                <div className="flex  w-full justify-between items-center  h-10">
                  <button>
                    <FaWhatsapp size={26} />
                  </button>
                  <button>
                    <BiLogoInstagram size={26} />
                  </button>
                  <button>
                    <LiaTwitter size={26} />
                  </button>
                  <button>
                    <BiLogoFacebookCircle size={26} />
                  </button>
                </div>

                <div className="flex justify-start items-between  h-12  gap-8">
                  <button>
                    <RiLinkedinBoxFill size={26} />
                  </button>
                  <button>
                    <FaXTwitter size={26} />
                  </button>
                  <button>
                    <BsShare size={26} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="related_blog w-full h-auto bg-[#F7F9FC] py-6">
        <h1 className="text-[24px] font-medium leading-8 text-[#1B1C57] text-center py-8">
          Explore Related Blogs
        </h1>
        <div className="w-full  flex-col md:col">
          <div className=" flex flex-col md:flex-row justify-center items-center gap-3">
            <div className="flex flex-col md:flex-row justify-evenly items-center bg-white shadow-lg md:w-[370px] h-[195px] rounded-xl ">
              <Image
                src="/images/blog/c1.png"
                width={360}
                height={300}
                alt="blog1"
                className=""
              />
            </div>
            <div className="flex flex-col md:flex-row justify-evenly items-center bg-white shadow-lg md:w-[370px] h-[195px] rounded-xl">
              <Image
                src="/images/blog/c2.png"
                width={360}
                height={300}
                alt="blog1"
                className=""
              />
            </div>
            <div className="flex flex-col md:flex-row justify-evenly items-center bg-white shadow-lg md:w-[370px] h-[195px] rounded-xl">
              <Image
                src="/images/blog/c1.png"
                width={360}
                height={300}
                alt="blog1"
                className=""
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button className=" border font-normal py-2 px-4 w-[250px] rounded text-[13px] md:text-[18px] text-[#1B1C57]">
              View More
            </button>
          </div>
        </div>
      </section>

      {/* <section className="container  mx-auto px-4 py-8">
        <p className="text-[20px] md:text-[30px] font-semibold text-[#1B1C57]">
          Household Items Storage Tips
        </p>
        <p className="text-[12px] md:text-[16px] font-normal text-[#374151] max-w-[800px] py-3">
          Finding brokerage-free storage space to rent is a painful and
          stressful experience these days. But not when India's first P2P
          storage platform Xtended Space is at your rescue.{" "}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-[30px]">
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/b1.webp"
              width={400}
              height={400}
            />
            <div>
              <p className="text-[16px] md:text-[20px] font-semibold mb-2 text-[#1B1C57] p-3 md:p-1">
                Post Title 1
              </p>
              <p className="text-gray-500 mb-4 text-[12px] md:text-[16px] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                John Doe
              </span>
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                April 27, 2024
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/b1.webp"
              width={400}
              height={400}
            />
            <div>
              <p className="text-[16px] md:text-[20px] font-semibold mb-2 text-[#1B1C57] p-3 md:p-1">
                Post Title 2
              </p>
              <p className="text-gray-500 mb-4 text-[12px] md:text-[16px] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                Jane Smith
              </span>
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                April 26, 2024
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/b1.webp"
              width={400}
              height={400}
            />
            <div>
              <p className="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] p-3 md:p-1">
                Post Title 3
              </p>
              <p className="text-gray-500 mb-4 text-[12px] md:text-[16px] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                Michael Johnson
              </span>
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                April 25, 2024
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className=" border font-normal py-2 px-4 w-[250px] rounded text-[13px] md:text-[18px] text-[#1B1C57]">
            View More
          </button>
        </div>
      </section> */}
      <Footer />
    </>
  );
};

export default Items;
