// Banner.js
import React from 'react';
import Callnow from './callnow'; // Adjust the import path
import Form from '@/sharedComponent/landingcomponent/form'; // Adjust the import path
import Styles from "@/styles/mumbai_page.module.css";
const Banner = ({ title, description, addType, location }) => {
  return (
    <section>
      <div className={Styles.secondPageBG}>
        <div className="flex items-center justify-between lg:items-start lg:justify-around flex-wrap gap-y-[100px] lg:gap-y-6 lg:my-8 py-4 w-full h-[100%] lg:h-auto">
          <div className="ht1 flex flex-col items-center lg:items-start justify-center gap-y-3 w-full lg:w-auto">
            <h1 className="font-bold text-[24px] md:text-[48px] text-[rgb(27,28,87)] lg:w-[550px] text-wrap">
              {title} {/* Use the title prop */}
            </h1>
            <p className="text-[14px] md:text-[18px] text-wrap max-w-[500px]">
              {description} {/* Use the description prop */}
            </p>
            <div className="hidden lg:block">
              <Callnow />
            </div>
          </div>
          <div className="w-full lg:w-[450px]">
            <Form AddType={addType} Location={location} />
            <div className="block lg:hidden mt-[20px]">
              <Callnow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
