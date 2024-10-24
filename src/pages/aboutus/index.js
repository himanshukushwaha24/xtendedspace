import Link from "next/link";

import HeaderMenu from "@/components/header/header";

export default function Home() { 

   
   return (
      <>
        <HeaderMenu />
      <section className="about flex-col md:flex-row flex p-4 ">
         <div className="aboutleft md:px-5 flex md:flex-col gap-2 md:gap-6 mb-4  w-[350px] h-[auto]">
            <h2 className="text-[14px] md:text-[35px] font-semibold   text-[#1B1C57]">About US</h2>
            <h3 className="text-[14px] md:text-[24px] text-gray-500  ">Our Mission</h3>
            <h3 className="text-[14px] md:text-[24px] text-gray-500  ">Our Vision</h3>
         </div>
         <div className="aboutright w-full  lg:pr-[200px] ">
            <h2 className="text-[16px] md:text-[38px] font-semibold mb-6  text-[#1B1C57]">About Us</h2>
            <h3 className="text-[16px] md:text-[24px] text-black mb-6 ">Connecting people with XTRA SPACE to those who need it on short and long-term rental</h3>
            <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">If storing items in storage space at an expensive price gives you a headache. Relax, Xtended Space storage solutions support you in every possible way! Our budget-friendly service makes your storage journey convenient and flexible.   </p>
            <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">Whether you store household items or business inventory, we take care of everything from start to finish, ensuring your items are well-protected with top-quality triple-layer packaging, including insurance, and stored systematically. No more hassle – say hello to convenient storage with Xtended Space.  </p>
           
            <h2 className="text-[16px] md:text-[38px] font-semibold my-4 text-[#1B1C57]">Our Vission</h2>
            <h3 className="text-[14px] md:text-[24px] text-gray-500 mb-6 ">At Xtended Space, our vision is to provide storage services to PAN India. Your reliable storage partner caters you to tailored space solutions.</h3>
            <h2 className="text-[16px] md:text-[38px] font-semibold my-4 text-[#1B1C57]">Our Mission</h2>
            <h3 className="text-[14px] md:text-[24px] text-gray-500 mb-6 ">Our mission is to provide a smooth storage journey that fulfils your desired requirements and ensures you feel fully supported. </h3>
            
            <h3 className="text-[14px] md:text-[24px] text-[#1B1C57] font-semibold mt-[100px]"> Interested in joining our team? Contact us today!</h3>
         </div>

      </section>
      </>
      
   );
}