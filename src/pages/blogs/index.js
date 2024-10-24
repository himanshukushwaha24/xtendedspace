import React from "react";
import Header from "../header";
import Footer from "@/components/footer";
import HeaderMenu from "@/components/header/header";
import Image from "next/image";
import { useRouter } from "next/router";

const BlogBanner = () => {

  const router = useRouter()
  const navigatetoHousehold = ()=>{
    router.push('blogs/household-items')
  }
  return (
    <>
    
      <HeaderMenu />
      <section className="blogbanner w-full h-[25vh] md:h-[60vh] flex justify-center items-center bg-[#F7F9FC]">
        <div className="blogcontent w-[800px] flex flex-col justify-evenly h-[150px] md:h-[300px] text-center">
          <h1 className="text-[16px] md:text-[40px] text-[#1B1C57] font-semibold md:font-bold px-16 md:px-0">
            Insights, Tips, and Tales from Our Storage Experts
          </h1>
          <div className="flex justify-between px-8">
            <select
              className="p-[20px] h-[40px] md:h-[50px] md:w-[200px] rounded-md py-[10px]"
              name="country"
              id="country"
            >
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="russia">Russia</option>
              <option value="china">China</option>
                     
            </select>
            <select
              className="p-[20px] h-[40px] md:h-[50px] md:w-[200px]  rounded-md py-[10px]"
              name="country"
              id="country"
            >
              <option value="india">India</option>
              <option value="usa">USA</option>  
              <option value="russia">Russia</option>
              <option value="china">China</option>
                     
            </select>
            <select
              className="p-[20px] h-[40px]  md:h-[50px] md:w-[200px]  rounded-md py-[10px]"
              name="country"
              id="country"
            >
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="russia">Russia</option>
              <option value="china">China</option>
                     
            </select>
          </div>
        </div>
      </section>

      <section className="simplyfy_storage w-full h-auto py-6 hidden md:block">
        <div
          className="wraper section flex  md:flex-row 
         w-full md:w-[90vw] h-[22rem] md:h-[28rem]"
        >
          <div className="flex justify-center items-center w-full md:w-[65vw]">
            <div className="wraper_section_left w-full md:w-[70vw] h-auto  justify-center items-center px-6 md:px-14">
              <h1 className="font-extrabold  flex justify-center items-center leading-[26px] md:leading-[60px] text-[16px] md:text-[44px] text-[#18191F]">
                Simplify Your Storage Experience With Easy Storage
              </h1>
              <div>
                <p
                  className="py-3 text-[18px] text-[#18191F] leading-[20px] md:leading-[32px]
                "
                >
                  Everything you need about finding the best, safe and <br />
                  afforadable storage space near you.
                </p>
              </div>

              <button className="Storage_button flex justify-center items-center  w-[15rem] h-[3rem] rounded-lg px-3 py-4 bg-[#FFFFFF] shadow-lg">
                Explore Easy Storage
              </button>
            </div>
          </div>
          <div className="wraper_section_right w-full h-full flex justify-center items-end hidden md:block">
           

            <Image
            
            src="/images/storagelisting/cartoon.png"
              alt="storagelisting"
              width={400}
              height={400}
              className="w-[55vw] md:w-[41rem] md:h-[20rem] mt-[100px]"
            />
          </div>
          <div className="wraper_section_right w-full flex justify-center items-center  md:hidden   ">
            <Image
              src="/images/storagelisting/halfcartoon.png"
              alt="storagelisting"
              width={320}
              height={220}
              className="w-[90vw] md:w-[41rem] h-[30vh] md:h-[20rem] mt-0 md:mt-[100px]"
            />
          </div>
        </div>
      </section>
      <section className="simplyfy_storage w-full h-auto py-6 md:hidden sm:block">
        <div className="flex flex-col py-2">
          <h1 className="font-extrabold  flex justify-center items-center leading-[35px]  text-[20px]  text-[#18191F] mr-16">
            Simplify Your Storage <br /> Experience With Easy Storage
          </h1>
         <div className="flex">
         <div className="body_left">
          <p
            className="text-[12px] leading-[16px] text-[#18191F] 
         ml-6 py-2"
          >
           <span className="whitespace-nowrap">Everything you need about finding the best, safe</span><br/>
            and affordable storage space near you
          </p>

          <div className="Storage_button flex justify-center items-center  w-[200px] h-[2rem] rounded-lg px-3 py-4 bg-[#FFFFFF] shadow-lg ml-6">
                Explore Easy Storage
              </div>
          </div>
          <div className="body_right flex justify-start w-full ">
          

            <Image
            src="/images/storagelisting/halfcartoonnew.png"
            width={300}
            height={300}
            alt="storagelisting"
            className="w-[100vw] h-[15vh]"
            />
          </div>
         </div>
        </div>
      </section>

      {/* <section id="listapp" className="liststorage ">
   
   <div className="liststorage-text">
     
       <h2>Find storage solution right on your han  d</h2>
       <p>Download the app to manage your projects, keep track of the progress and complete tasks without procastinating. Stay on track and complete on time!</p>
    <div>  
     <h4>get a app</h4>
      <div className="buttons flex">
           <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
             
             <img src="/images/googlepay.svg" alt="" />
           </a>
           <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
             <img src="/images/playstore.svg" alt="" />
           </a>
         </div></div>
   </div>
   <div className="liststorage-img">
     <img src="/images/home/Phone.png" alt=""/>
 </div>
   
 
 </section> */}
      <section className="course py-4 bg-[#F7F9FC]">
        <div className="course1 py-10 ">
          <h2 className="font-bold text-[20px] leading-[34px] md:leading-[56px] md:text-[34px] py-4">
            Giving you peace of mind
          </h2>
          <p className="text-[18px] leading-7 px-6 pb-16">
            Everything you need about finding the best, safe and affordable
            storage space near you.
          </p>
        </div>
        <div className="crow">
          <div className="course-col py-2">
          <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Shield+Done.svg"
              alt="shield"
              width={200}
              height={200}
              className="w-full h-auto"
              />
            <h3 className="font-bold md:font-semibold text-[20px] md:text-[25px] text-[#000000] mb-[30px]">
              Security & Insurance
            </h3>
            {/* <p>Convenient and Hassle-Free Pickup Service is at your doorstep.</p> */}
          </div>
          <div className="course-col py-2 "id="hassel">
            
            <Image
            src='./images/home/Location.svg'
            height={220}
            width={200}
            className="w-full h-auto"
            />
            <h3 className="font-bold md:font-semibold text-[20px] md:text-[25px] text-[#000000] mb-[30px]">
              Hassel free move-in
            </h3>
          
          </div>
       
          <div className="course-col py-2 ">
          <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/TicketStar.svg"
              alt="ticketstar"
              width={100}
              height={200}
              className=" h-auto"
            />
            <h3 className="font-bold md:font-semibold text-[20px] md:text-[25px] text-[#000000] mb-[30px]">
              Book it at the best price
            </h3>
            {/* <p>Your peace of mind is confirmed with our secure storage policy.                </p> */}
          </div>
        </div>
      </section>

      {/* <section className="container mx-auto px-4 py-4">
        <h2 className="text-[30px] font-semibold">
          Household Items Storage Tips
        </h2>
        <p className="text-[16px] font-normal text-gray-50] max-w-[800px]">
          Finding brokerage-free storage space to rent is a painful and
          stressful experience these days. But not when India's first P2P
          storage platform Xtended Space is at your rescue.{" "}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-[50px]">
          <div className="bg-white rounded-lg  flex flex-col justify-between">
           <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/b1.webp"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">Post Title 1</h2>
              <p className="text-gray-500 mb-4 text-[16px] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">John Doe</span>
              <span className="text-gray-700">April 27, 2024</span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/b1.webp"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">Post Title 2</h2>
              <p className="text-gray-500 mb-4 text-[16px] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Jane Smith</span>
              <span className="text-gray-700">April 26, 2024</span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/b1.webp"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">Post Title 3</h2>
              <p className="text-gray-500 mb-4 text-[16px] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Michael Johnson</span>
              <span className="text-gray-700">April 25, 2024</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className=" border font-bold py-2 px-4 w-[250px] rounded">
            View More
          </button>
        </div>
      </section> */}
      {/* <section className="container  mx-auto px-4 py-4">
        <h2 className="text-[30px] font-semibold">
          Household Items Storage Tips
        </h2>
        <p className="text-[16px] font-normal text-gray-50] max-w-[800px]">
          Finding brokerage-free storage space to rent is a painful and
          stressful experience these days. But not when India's first P2P
          storage platform Xtended Space is at your rescue.{" "}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-[50px]">
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/b1.webp"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">Post Title 1</h2>
              <p className="text-gray-500 mb-4 text-[16px] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">John Doe</span>
              <span className="text-gray-700">April 27, 2024</span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
           <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/b1.webp"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">Post Title 2</h2>
              <p className="text-gray-500 mb-4 text-[16px] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Jane Smith</span>
              <span className="text-gray-700">April 26, 2024</span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/b1.webp"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">Post Title 3</h2>
              <p className="text-gray-500 mb-4 text-[16px] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Michael Johnson</span>
              <span className="text-gray-700">April 25, 2024</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className=" border font-bold py-2 px-4 w-[250px] rounded">
            View More
          </button>
        </div>
      </section> */}
      {/* <section className="container mx-auto px-4 py-4">
        <h2 className="text-[30px] font-semibold">
          Household Items Storage Tips
        </h2>
        <p className="text-[16px] font-normal text-gray-50] max-w-[800px]">
          Finding brokerage-free storage space to rent is a painful and
          stressful experience these days. But not when India's first P2P
          storage platform Xtended Space is at your rescue.{" "}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-[50px]">
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/b1.webp"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">Post Title 1</h2>
              <p className="text-gray-500 mb-4 text-[16px] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">John Doe</span>
              <span className="text-gray-700">April 27, 2024</span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/b1.webp"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">Post Title 2</h2>
              <p className="text-gray-500 mb-4 text-[16px] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Jane Smith</span>
              <span className="text-gray-700">April 26, 2024</span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
           <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/b1.webp"
              width={400}
              height={400}
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">Post Title 3</h2>
              <p className="text-gray-500 mb-4 text-[16px] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Michael Johnson</span>
              <span className="text-gray-700">April 25, 2024</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className="  border font-bold py-2 px-4 w-[250px] rounded">
            View More
          </button>
        </div>
      </section> */}
      <section className="container  mx-auto px-4 py-8 px-2">
        <h2 className="text-[20px] md:text-[30px] font-semibold text-[#1B1C57]">
          Household Items Storage Tips
        </h2>
        <p className="text-[12px] md:text-[16px] font-normal text-[#374151] max-w-[800px] py-3">
          Finding brokerage-free storage space to rent is a painful and
          stressful experience these days. But not when India's first P2P
          storage platform Xtended Space is at your rescue.{" "}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-[30px]">
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="/images/blogs-doc/Xtended.webp"
              width={400}
              height={400}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-[16px] md:text-[20px] font-semibold mb-2 text-[#1B1C57] p-3 md:p-1">
              Storage Space Guidance with Xtended Space!  
              </h2>
              <p className="text-gray-500 mb-4 text-[12px] md:text-[16px] font-normal px-3">
              A storage solution is pivotal for making a hassle-free and systematic living place in India. 
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                Deepak Lodhi
              </span>
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                April 27, 2024
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src='/images/newblogs/Why Decluttering the house Takes Time and How to make it simple.webp'
              width={400}
              height={400}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-[16px] md:text-[20px] font-semibold mb-2 text-[#1B1C57] p-3 md:p-1">
              Why Decluttering the house Takes Time and How to make it simple?  
              </h2>
              <p className="text-gray-500 mb-4 text-[12px] md:text-[16px] font-normal px-3">
              Take the first step today with Xtended Space and enjoy the benefits of a decluttered living space. Make it appealing and inviting for family and friends. 
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                Hemant
              </span>
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                April 26, 2024
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="/images/newblogs/Choose the Correct Storage Service at Xtended Space.webp"
              width={400}
              height={400}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] p-3 md:p-1">
              Choose the Correct Storage Service at Xtended Space 
              </h2>
              <p className="text-gray-500 mb-4 text-[12px] md:text-[16px] font-normal px-3">
              If you’re a visual person, you may need to see how much space you’ll have. However, when you choose your storage space online, you don’t typically get that opportunity.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                Himanshu
              </span>
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                April 25, 2024
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className=" border font-normal py-2 px-4 w-[250px] rounded text-[13px] md:text-[18px] text-[#1B1C57]"onClick={navigatetoHousehold}>
            View More
          </button>
        </div>
      </section>
      <section className="container  mx-auto px-4 py-8 bg-[#F7F9FC] ">
        <h2 className="text-[20px] md:text-[30px] font-semibold text-[#1B1C57]">
        A Comprehensive Guide to Stress-Free Travel! 
        </h2>
        <p className="text-[12px] md:text-[16px] font-normal text-[#374151] max-w-[800px] py-3">
          Finding brokerage-free storage space to rent is a painful and
          stressful experience these days. But not when India's first P2P
          storage platform Xtended Space is at your rescue.{" "}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-[30px]">
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="/images/newblogs/A Comprehensive Guide to Stress-Free Travel!.webp"
              width={400}
              height={400}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-[16px] md:text-[20px] font-semibold mb-2 text-[#1B1C57] p-3 md:p-1">
              A Comprehensive Guide to Stress-Free Travel! 
              </h2>
              <p className="text-gray-500 mb-4 text-[12px] md:text-[16px] font-normal px-3">
              Traveling can be exciting, but the thought of packing can be overwhelming.  
              </p>
            </div>
            <div className="flex justify-between items-center pb-2 px-2">
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                Gautam
              </span>
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                April 27, 2024
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="/images/newblogs/How to Pack Boxes for Your Move Without Making These Mistakes!.webp"
              width={400}
              height={400}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-[16px] md:text-[20px] font-semibold mb-2 text-[#1B1C57] p-3 md:p-1">
              How to Pack Boxes for Your Move Without Making These Mistakes! 
              </h2>
              <p className="text-gray-500 mb-4 text-[12px] md:text-[16px] font-normal px-3">
              Moving to a new place is an exciting adventure, but the process of packing can be overwhelming. 
              </p>
            </div>
            <div className="flex justify-between items-center pb-2 px-2 ">
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                Aryan
              </span>
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                April 26, 2024
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="/images/newblogs/Packing and Moving Guides for a Hassle-Free Relocation in India!.webp"
              width={400}
              height={400}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] p-3 md:p-1">
              Packing and Moving Guides for a Hassle-Free Relocation in India! 
              </h2>
              <p className="text-gray-500 mb-4 text-[12px] md:text-[16px] font-normal px-3">
              Relocating to a new home or office can be a daunting task, but with the right guidance, you can make it a breeze. 
              </p>
            </div>
            <div className="flex justify-between items-center pb-2 px-2">
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                Avinash
              </span>
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                April 25, 2024
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className=" border font-normal py-2 px-4 w-[250px] rounded text-[13px] md:text-[18px] text-[#1B1C57]"onClick={navigatetoHousehold}>
            View More
          </button>
        </div>
      </section>
      <section className="container  mx-auto px-4 py-8">
        <h2 className="text-[20px] md:text-[30px] font-semibold text-[#1B1C57]">
        How to secure your goods 
        </h2>
        <p className="text-[12px] md:text-[16px] font-normal text-[#374151] max-w-[800px] py-3">
          Finding brokerage-free storage space to rent is a painful and
          stressful experience these days. But not when India's first P2P
          storage platform Xtended Space is at your rescue.{" "}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-[30px]">
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="/images/newblogs/Horeca Equipment Storage Maximize Space and Seasonal Flexibility.webp"
              width={400}
              height={400}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-[16px] md:text-[20px] font-semibold mb-2 text-[#1B1C57] p-3 md:p-1">
              Horeca Equipment Storage: Maximize Space and Seasonal Flexibility  
              </h2>
              <p className="text-gray-500 mb-4 text-[12px] md:text-[16px] font-normal px-3">
              Keep commonly used items towards the front: To minimize the time you must spend digging through your storage unit, always keep items used often towards the front of your unit. 
              </p>
            </div>
            <div className="flex justify-between items-center px-2 pb-2">
              <span className="text-[#374151] text-[12px] md:text-[14px]">
              Vivek
              </span>
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                April 27, 2024
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="/images/newblogs/Harshit Aggrawal Made Xtended Space storage service his First Choice!.webp"
              width={400}
              height={400}
              className="rounded-lg
              "
            />
            <div>
              <h2 className="text-[16px] md:text-[20px] font-semibold mb-2 text-[#1B1C57] p-3 md:p-1">
              Harshit Aggrawal Made Xtended Space storage service his First Choice! 
              </h2>
              <p className="text-gray-500 mb-4 text-[12px] md:text-[16px] font-normal px-3">
              Harshit Aggarwal’s journey is a testament to his dedication to his students and his innovative approach to teaching, with the support of Xtended Space logistics services. 
              </p>
            </div>
            <div className="flex justify-between items-center px-2 pb-2">
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                Jaspreet
              </span>
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                April 26, 2024
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg  flex flex-col justify-between">
            <Image
              src="/images/newblogs/What to Look for in Choosing the Right Storage Space.webp"
              width={400}
              height={400}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] p-3 md:p-1">
              What to Look for in Choosing the Right Storage Space?  
              </h2>
              <p className="text-gray-500 mb-4 text-[12px] md:text-[16px] font-normal px-3">
              Take the first step towards a clutter-free home by selecting a storage space that fits your requirements perfectly. 
              </p>
            </div>
            <div className="flex justify-between items-center px-2 pb-2">
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                Gopal
              </span>
              <span className="text-[#374151] text-[12px] md:text-[14px]">
                April 25, 2024
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className=" border font-normal py-2 px-4 w-[250px] rounded text-[13px] md:text-[18px] text-[#1B1C57]"onClick={navigatetoHousehold}>
            View More
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BlogBanner;
