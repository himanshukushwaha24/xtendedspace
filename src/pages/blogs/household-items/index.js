import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";

import React from "react";
import Image from "next/image";
import BreadCrumb from "@/sharedComponent/BreadCrumb";
import Link from "next/link";

const HouseHold = () => {
  const post = [
    {
      title: "The Significance of Storage Services ",
      image: "/images/blogs-doc/Storage-service.webp",
      description:
        "Warehouses ensure the flow of goods from production to storage. And the same storage solution at Xtended Space is convenient, affordable, and secure.",
      author: "Himanshu Kataria",
      date: "April 27, 2024",
    },
    {
      title: "Protect Your Household Storage Items During Home Renovation ",
      image: "/images/blogs-doc/Household-storage.webp",
      description:
        "Xtended Space’s innovative and secure storage solutions offer peace of mind during home renovations.",
      author: "Avinash Bhosle",
      date: "April 26, 2024",
    },
    {
      title: "Things You Do Not Know about Storage Services",
      image: "/images/blogs-doc/Donotno.webp",
      description:
        "When choosing a storage facility, think about your needs and budget. You can compare prices, facilities, and security systems before deciding. Also, pick a facility in your surroundings.",
      author: "Arjun Ranatunga",
      date: "April 27, 2024",
    },
    {
      title: "Xtended Space Eases Your Storage Woes",
      image: "/images/blogs-doc/Ease your storage.webp",
      description:
        "You can rest easy knowing your belongings are in good hands, allowing you to focus on embracing the next chapter of your life with confidence and peace of mind.",
      author: "Wasim Akram",
      date: "April 28, 2024",
    },
    {
      title: "Stationary Storage Space in a Warehouse at Xtended Space!",
      image: "/images/blogs-doc/stationary.webp",
      description:
        "Experience the benefits of stationary storage at Xtended Space Warehouse Storage and take your business to new heights.",
      author: "Parhalad",
      date: "April 27, 2024",
    },
    {
      title: "Are you Looking for a Storage Space in Delhi?",
      image: "/images/blogs-doc/delhi.webp",
      description:
        "Delhi, with its ancient buildings and modern chaos, reminds us that space isn't just about having room for things. It's about finding balance and remembering what truly matters. And as the city grows and changes, the quest for storage space services will always be a part of life in Delhi.",
      author: "Nitin Mukherjee",
      date: "April 27, 2024",
    },
    {
      title: "Safe Warehousing Storage Space in Delhi!",
      image: "/images/blogs-doc/safewarehouse.webp",
      description:
        "In Delhi, there are storage spaces where you can keep your important things safe. These places are called storage spaces.",
      author: "Ankit Jalan",
      date: "April 26, 2024",
    },
    {
      title: "Where Your Business Inventory Finds the Perfect Home!",
      image: "/images/blogs-doc/inventory.webp",
      description:
        "Maintaining everything in its place in business could be typical.",
      author: "Manish Rana",
      date: "April 27, 2024",
    },
    {
      title: "Post Title 12",
      image: "/images/blogs-doc/correctStorage.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
      author: "Saurabh Mishra",
      date: "April 28, 2024",
    },
  ];
  return (
    <>
      <HeaderMenu />
     
      <div className="px-6">
        
        <section className="blogbanner w-full h-[20vh] md:h-[50vh] flex flex-col p-4 bg-[#F7F9FC] ">
      <div className="">
      <div className="text-black">
        <BreadCrumb className=''
        currentElement={{ title: "Blogs", path: "blogs" }}
        detailPage="Household Items Storage Tips "
      /> 
        </div> 
      </div>
         <div className="flex justify-center items-center">
         <div className="blogcontent w-[800px] flex flex-col justify-center items-center h-[150px] md:h-[180px] text-center">
            <h1 className="text-[16px] md:text-[36px] text-[#374151] font-semibold md:font-bold px-16 md:px-0">
              Household Items Storage
            </h1>
            <div className="flex justify-start items-start px-8 text-[#374151] text-[12px] md:text-[16px] pt-3">
              Choose the Correct Storage Service at Xtended Space If you’re a
              visual person, you may need to see how much space you’ll have.
              However, when you choose your storage space online, you don’t
              typically get that opportunity.
            </div>
          </div>
         </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 py-6 px-2">
          {console.log("Post data:", post)}
          {post.map((items, itemIndex) => (
            <div
              key={itemIndex}
              className=" p-2 bg-white  flex flex-col justify-between"
            >
              
              <Image
                src={items.image}
                width={300}
                height={200}
                alt={items.title}
                className="w-full h-auto object-cover mb-4 rounded-lg
                 "
              />
             <Link href='/blogs/other-items'>
             <h2 className="text-lg font-semibold mb-2 text-[16px] md:text-[20px] text-[#374151]">
                {items.title}
              </h2>
             </Link>
              <p className="text-sm mb-4 text-[#374151] text-[12px] md:text-[14px]">
                {items.description}
              </p>
              <div className="flex justify-between ">
                <span className="text-[#374151]  text-[12px] md:text-[14px]">
                  {items.author}
                </span>
                <span className="text-[#374151] text-[12px] md:text-[14px]">
                  {items.date}
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default HouseHold;
