import Link from "next/link";

// import SimpleSlider10 from "@/sharedComponent/slider9"
import SimpleSlider11 from "@/sharedComponent/slider10";
import ListStorageForm from "@/components/liststorageform";

import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import HeaderMenu from "@/components/header/header";
import { AMENTICS } from "@/util/constant";
// import { spaceListig } from "@/service/storageService";
export default function Home() {
  const { listStorage: { value } } = useSelector((state) => state);
  const formInputStyle =
    "w-full px-4 py-2 mt-2 bg-gray-100 rounded-md focus:outline-none focus:bg-white";
  const formLabelStyle = "block text-sm font-semibold text-gray-700";
  const formSelectStyle = "w-full px-4 py-2 mt-2 bg-gray-100 rounded-md focus:outline-none focus:bg-white";



  // const [spaceData, setSpaceData] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {

  //       const data = await spaceListig();

  
  //       setSpaceData(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  //   return () => {
  //   };
  // }, []);


  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%]">
      <HeaderMenu />

      <section className="lsform h-[auto] w-full md:px-4 md:pr-0 bg-slate-50  justify-evenly pt-5 flex-col md:flex-row flex">
        <div className="lsdefault max-w-full md:w-[70%]  h-[100%] pt-0  p-4  rounded-3xl bg-white overflow-hidden hidden md:block md:sticky top-[-70px] ">
          <h3 className="bg-blue-100 mb-2 p-3 mx-[-22px] text-sm md:text-xl font-semibold text-[#1B1C57] ">
            Preview
          </h3>
          <div className="bg-blue-50 flex items-center gap-2 p-2.5 my-2 rounded-full w-[150px]">
            <img src="/images/icon/ph_house-fill.svg" alt="" />
            <h3 className="text-[15px] font-bold text-[#1B1C57] m-0">{value['stage1.StorageType']}</h3>          </div>
          <div className=" w-full h-[auto] mb-[60px] flex-col md:flex-row  flex">
            <div className="max-w-full md:w-1/2 h-[auto] mb-[auto] ">
              <SimpleSlider11 imageData  = {value}/>
            </div>
            <div className="max-w-full md:w-1/2 h-[auto] gap-2 p-3 pt-0 flex-col mt-[50px] md:mt-0 flex justify-between">
              <h3 className="text-xl md:text-2xl font-semibold text-[#1B1C57]">
              Storage space in {!!value['stage2.Address'] && value['stage2.Address'] }
                {/* Storage space in Maninagar, Delhi */}
              </h3>
              <div className=" flex gap-2 py-2.5  rounded-full ">
                <img src="/images/icon/Location.svg" alt="" />
                <h3 className="text-[18px] font-normal text-[#1B1C57]">
                {!!value['stage2.State'] && value['stage2.State'] }
                </h3>
              </div>
              <div className="bg-[#F7F9FB]  rounded-2xl p-[10px] h-[60px]">
              <h3 className="text-[18px] font-semibold text-[#1B1C57]">
                  ₹{value['stage3.PerDayRentalAmount']} <span className="font-normal">/ Day</span>
                </h3>
                <p className="text-gray-700 text-[16px]">
                  Minimum {value['stage3.MinimumBookingDays']} Days booking Required
                </p>
              </div>
              <p className="text-gray-700 text-[16px]">
              {value['stage3.Description'] ||"Summary"}
              </p>
              {value['stage1.LengthInFeet'] || value['stage1.WidthInFeet'] || value['stage1.HeightInFeet'] ? (
  <div className="flex justify-between">
    <h4 className="text-[16px] font-semibold text-[#1B1C57]">
    Length: {!!value['stage1.LengthInFeet'] && value['stage1.LengthInFeet'] + "ft"}
    </h4>
    <h4 className="text-[16px] font-semibold text-[#1B1C57]">
    Width: {!!value['stage1.WidthInFeet'] && value['stage1.WidthInFeet'] + "ft"}
    </h4>
    <h4 className="text-[16px] font-semibold text-[#1B1C57]">
    {!!value['stage1.HeightInFeet'] && "Height:" + value['stage1.HeightInFeet'] + "ft"}
    </h4>
    
  </div>
  
) : (
  <h3 className="text-[20px] py-3 px-2 rounded-2xl font-semibold bg-slate-50 ">
    Space size
  </h3>
)}
              {/* <div className="flex justify-between">
                <h4 className="text-[16px] font-semibold text-[#1B1C57]">
                  Length: {!!value['stage1.LengthInFeet'] && value['stage1.LengthInFeet'] + "ft"}
                  
                </h4>
                <h4 className="text-[16px] font-semibold text-[#1B1C57]">
                  Width: {!!value['stage1.WidthInFeet'] && value['stage1.WidthInFeet'] + "ft"}
                </h4>
                <h4 className="text-[16px] font-semibold text-[#1B1C57]">
                   {!!value['stage1.HeightInFeet'] && "Height:" + value['stage1.HeightInFeet'] + "ft"}
                </h4>
              </div> */}
              <h3 className="text-[20px] py-3 px-2 rounded-2xl  font-semibold bg-slate-50 text-blue-400">
                {/* Sq.Ft:{!!value['stage1.LengthInFeet'] && ((Number(value['stage1.LengthInFeet'])) * (Number(value['stage1.WidthInFeet'])) )+ 'ft'} */}
                Sq.Ft: {value['stage1.LengthInFeet'] && value['stage1.WidthInFeet'] ? ((Number(value['stage1.LengthInFeet'])) * (Number(value['stage1.WidthInFeet']))) + ' ft' : '0 ft'}

              </h3>
            </div>
          </div>
          <section className="w-[100%] h-[400px] max-h-auto bg-[#F7F9FB] mt-10 max-w-auto ">
            <div className="">
              <h2 className="text-xl md:text-2xl py-3  p-3 md:text-left font-semibold text-[#1B1C57]">
                Amenities
              </h2>

              <div class="flex flex-wrap md:gap-[0px] justify-between  max-w-[90vw]  md:border-black rounded-3xl ">
              {
                !!value['stage1.Amenities'] && value['stage1.Amenities'].map((item)=>{
                  return(
                    <>
                <div class="h-[110px] w-full md:w-1/3 px-2 items-start gap-2  flex   ">
                  {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-[70px]" height="0.7em" width="0.7em" xmlns="http://www.w3.org/2000/svg">
<path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z">
</path>
</svg> */}
                  {/* <img
                    className="w-[2.5em] h-[2.5em]"
                    src="/images/icon/fire.svg"
                    alt=""
                  /> */}
                    <div
                    className=" text-[20px] md:text-[34px] text-[#1B1C57]">
                    {AMENTICS[item].icon}
                     
                    </div>

                  <div className="w-[300px] pl-[20px]">
                    <h2 class="text-[14px] md:text-[18px] font-semibold text-[#1B1C57]">
                    {AMENTICS[item].title}

                    </h2>
                    <p className="text-gray-600 text-[14px]">
                    {AMENTICS[item].desc}
                    </p>
                  </div>
                </div>
                </>
                  )
                })
              }
                {/* <div class="h-[110px] w-full md:w-1/3 px-2 items-start justify-between  flex  ">
                  <img
                    className="w-[2.5em] h-[2.5em]"
                    src="/images/icon/indoor.svg"
                    alt=""
                  />
                  <div className="w-[300px] pl-[20px]">
                    <h2 class="text-[14px] md:text-[18px] font-semibold text-[#1B1C57]">
                      Indoor Storage
                    </h2>
                    <p className="text-gray-600 text-[14px]">
                      Storage is indoor, and hence covered and secured
                    </p>
                  </div>
                </div>
               
                <div class="h-[110px] w-full md:w-1/3 px-2 items-start justify-between  flex   ">
                  <img
                    className="w-[2.5em] h-[2.5em]"
                    src="/images/icon/securities.svg"
                    alt=""
                  />

                  <div className="w-[300px] pl-[20px]">
                    <h2 class="text-[14px] md:text-[18px] font-semibold text-[#1B1C57]">
                      Security cameras on property Subtitle
                    </h2>
                    <p className="text-gray-600 text-[14px]">
                      Storage is indoor, and hence covered and secured
                    </p>
                  </div>
                </div>
                <div class="h-[110px] w-full md:w-1/3 px-2 items-start justify-between  flex   ">
                  <img
                    className="w-[2.5em] h-[2.5em]"
                    src="/images/icon/indoorcs.svg"
                    alt=""
                  />
                  <div className="w-[300px] pl-[20px]">
                    <h2 class="text-[14px] md:text-[18px] font-semibold text-[#1B1C57]">
                      Indoor covered storage Subtitle
                    </h2>
                    <p className="text-gray-600 text-[14px]">
                      Storage is indoor, and hence covered and secured
                    </p>
                  </div>
                </div>
                <div class="h-[110px] w-full md:w-1/3 px-2 items-start justify-between  flex   ">
                  <img
                    className="w-[2.5em] h-[2.5em]"
                    src="/images/icon/start.svg"
                    alt=""
                  />
                  <div className="w-[300px] pl-[20px]">
                    <h2 class="text-[14px] md:text-[18px] font-semibold text-[#1B1C57]">
                      Enhanced Clean
                    </h2>
                    <p className="text-gray-600 text-[14px]">
                      Moisture free and pest control is taken care by host
                    </p>
                  </div>
                </div>
                <div class="h-[110px] w-full md:w-1/3 px-2 items-start justify-between  flex   ">
                  <img
                    className="w-[2.5em] h-[2.5em]"
                    src="/images/icon/Calendar.svg"
                    alt=""
                  />
                  <div className="w-[300px] pl-[20px]">
                    <h2 class="text-[14px] md:text-[18px] font-semibold text-[#1B1C57]">
                      Flexible access
                    </h2>
                    <p className="text-gray-600 text-[14px]">
                      easily access your items every week
                    </p>
                  </div>
                </div>  */}
              </div>
            </div>
          </section>
        </div>
        <div className="listspaceform w-full md:w-[25%] h-[auto]  px-2">
          <div class="col-md-12">
            <div class="list-space-form bg-white p-2">
              <div class="row align-items-center my-4">
                <div class="col-md-10">
                  <h2 class="text-[25px] font-semibold text-[#1B1C57]">
                    List your space
                  </h2>
                </div>
                <div class=" text-end">
                  <a href="#" class="link f">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
              {/* <div class="public-switch ">
                <div class="public-switch-wrap flex border justify-between rounded p-2 items-center">
                  <div class="l-col">
                    <div class="icn-text flex  items-center">
                      <span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 6.55263C7.58518 7.10525 8.79066 8.61576 8.93111 10.2368C9.06238 11.752 10.0268 12.9832 11.5 12.9999C12.0662 13.0063 12.6388 12.5822 12.6373 11.995C12.6368 11.8135 12.6079 11.6278 12.5627 11.457C12.4998 11.2195 12.4942 10.9462 12.625 10.6666C13.0824 9.68861 13.982 9.42589 14.6949 8.89475C15.0111 8.65918 15.2995 8.41067 15.4266 8.2105C15.7777 7.65788 16.1289 6.55263 15.9533 6M13.291 19C13.0714 18.5862 12.764 17.5103 13.291 16.5172C13.9497 15.2759 16.1455 15.2759 16.1455 15.2759C17.837 15.2582 18.4469 14.4944 18.7334 13.8136M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12Z"
                            stroke="#1C274C"
                          />
                        </svg>
                      </span> 
                      <span class="fs-16 fw-7 text-color-4">Public</span>
                    </div>
                  </div>
                  <div class="r-col">
                    <label class="bootstrap-switch mb-0">
                      <input className="h-[auto]" type="checkbox" />
                     
                    </label>
                  </div>
                </div>
              </div> */}
              <div class="row d-flex justify-content-center">
                <div class="">
                  <div class="wizard">
                    <ListStorageForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
