import React from 'react';
import { Carousel } from 'antd';
import img from "../../public/images/slider/XS may5.jpg";
import Image from "next/image";

const contentStyle = {

  background: '#364d79',
  position: "relative",
  height: "auto",
};
const App = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle} className='h-[200px] md:h-auto'><Image
     
            className=" h-[100%]"
            src={img}
            alt="image"
            priority></Image>
             <div className="w-full  p-4 md:p-8  md:text-left absolute md:relative bottom-0 bg-opacity-50 text-white">
            <h2 className="text-xl md:text-3xl font-bold mb-2">Store Household Items</h2>
            <p className="text-sm md:text-base mb-4">
              Whether it's your childhood toys, memories from an old house, or
              <br /> anything close to your heart...
            </p>
            <p className="text-xs md:text-sm">
              Copyright © 2023 Xtended Space. All Rights Reserved.
            </p>
          </div>
            </h3>
         
    </div>
    <div>
      <h3 style={contentStyle} className='h-[200px] md:h-auto'><Image
     
            className=" h-[100%]"
            src={img}
            alt="image"
            priority></Image>
             <div className="w-full  p-4 md:p-8  md:text-left absolute md:relative bottom-0 bg-opacity-50 text-white">
            <h2 className="text-xl md:text-3xl font-bold mb-2">Store Household Items</h2>
            <p className="text-sm md:text-base mb-4">
              Whether it's your childhood toys, memories from an old house, or
              <br /> anything close to your heart...
            </p>
            <p className="text-xs md:text-sm">
              Copyright © 2023 Xtended Space. All Rights Reserved.
            </p>
          </div>
            </h3>
         
    </div>
    <div>
      <h3 style={contentStyle} className='h-[200px] md:h-auto'><Image
     
            className=" h-[100%]"
            src={img}
            alt="image"
            priority></Image>
             <div className="w-full  p-4 md:p-8  md:text-left absolute md:relative bottom-0 bg-opacity-50 text-white">
            <h2 className="text-xl md:text-3xl font-bold mb-2">Store Household Items</h2>
            <p className="text-sm md:text-base mb-4">
              Whether it's your childhood toys, memories from an old house, or
              <br /> anything close to your heart...
            </p>
            <p className="text-xs md:text-sm">
              Copyright © 2023 Xtended Space. All Rights Reserved.
            </p>
          </div>
            </h3>
         
    </div>
    <div>
      <h3 style={contentStyle} className='h-[200px] md:h-auto'><Image
     
            className=" h-[100%]"
            src={img}
            alt="image"
            priority></Image>
             <div className="w-full  p-4 md:p-8  md:text-left absolute md:relative bottom-0 bg-opacity-50 text-white">
            <h2 className="text-xl md:text-3xl font-bold mb-2">Store Household Items</h2>
            <p className="text-sm md:text-base mb-4">
              Whether it's your childhood toys, memories from an old house, or
              <br /> anything close to your heart...
            </p>
            <p className="text-xs md:text-sm">
              Copyright © 2023 Xtended Space. All Rights Reserved.
            </p>
          </div>
            </h3>
         
    </div>
  
  </Carousel>
);
export default App;