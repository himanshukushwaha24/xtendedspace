import Link from "next/link";

import HeaderMenu from "@/components/header/header";

export default function Home() {
  return (
    <>
      <HeaderMenu />
      <section className="about flex-col md:flex-row flex p-4 ">
        <div className="aboutleft md:px-5 flex md:flex-col gap-2 md:gap-6 mb-4  w-[350px] h-[auto]">
          <h2 className="text-[14px] md:text-[24px] font-semibold   text-[#1B1C57]">
            User Policies
          </h2>
          <h3 className="text-[14px] md:text-[24px] text-gray-500  ">
            Company
          </h3>
          <h3 className="text-[14px] md:text-[24px] text-gray-500  ">
            Guidelines
          </h3>
        </div>
        <div className="aboutright w-full  lg:pr-[200px] ">
          <h1 className="text-[22px] md:text-[42px] font-semibold mb-6  text-[#1B1C57]">
            Terms & Conditions
          </h1>

          <h2 className="text-[16px] md:text-[24px] font-semibold mb-6  text-[#1B1C57]">
            User Policies
          </h2>
          {/* <h3 className="text-[16px] md:text-[24px] text-black mb-6 ">Connecting people with XTRA SPACE to those who need it on short and long-term rental</h3> */}
          <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
            Finding brokerage-free storage space to rent is a painful and
            stressful experience these days. But not when India's first P2P
            storage platform Xtended Space is at your rescue. Xtended Space is
            India's first P2P online storage platform connecting XTRA SPACE
            hosts with renters needing storage. Xtended Space is a thriving
            community for hosts and renters who want to meet each other without
            the broker's interference.
          </p>
          <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
            We are creating an environment where hassle-free storage is not just
            a concept but a reality to promote mental peace for renters and
            hosts. Xtended Space doesn't stick to the system that doesn't work.
            Instead, we work on improving every aspect of the storage
            experience. With a full set of storage essentials, Xtended Space
            aligns extra space hosts with renters on a flexible short-term
            basis. If you want to list XTRA SPACE for storage or rent the
            storage unit near you, count on Xtended Space. We have our App in
            the Play Store, which is free to download.
          </p>

          <h2 className="text-[16px] md:text-[24px] font-semibold my-4 text-[#1B1C57]">
            Company
          </h2>
          <p className="text-[10px] md:text-[16px] mb-6 text-gray-500">
            Finding brokerage-free storage space to rent is a painful and
            stressful experience these days. But not when India's first P2P
            storage platform Xtended Space is at your rescue. Xtended Space is
            India's first P2P online storage platform connecting XTRA SPACE
            hosts with renters needing storage. Xtended Space is a thriving
            community for hosts and renters who want to meet each other without
            the broker's interference.
          </p>
          <h2 className="text-[16px] md:text-[24px] font-semibold my-4 text-[#1B1C57]">
            Guidelines
          </h2>
          <li className="text-[10px] md:text-[16px]  text-gray-500">
            Finding brokerage-free storage space to rent is a painful and
            stressful experience these days.
          </li>
          <li className="text-[10px] md:text-[16px]  text-gray-500">
            But not when India's first P2P storage platform Xtended Space is at
            your rescue.
          </li>
          <li className="text-[10px] md:text-[16px]  text-gray-500">
            Xtended Space is India's first P2P online storage platform
            connecting XTRA SPACE hosts with renters needing storage.
          </li>
          <li className="text-[10px] md:text-[16px]  text-gray-500">
            Xtended Space is a thriving community for hosts and renters who want
            to meet each other without the broker's interference.
          </li>

          {/* <h3 className="text-[14px] md:text-[24px] text-[#1B1C57] font-semibold mt-[100px]"> Interested in joining our team? Contact us today!</h3> */}
        </div>
      </section>
    </>
  );
}
