import Link from "next/link";
import { useState } from "react";
import SimpleSlider11 from "@/sharedComponent/slider10";
import ListStorageForm from "@/components/liststorageform";
import HeaderMenu from "@/components/header/header";
// import {spaceListig} from "@/service/storageService";
import { useSelector } from "react-redux";

export default function Home() {
  return (
    <>
      <section class="flat-title ">
        <div class="flat-titlec3">
          <div class="row">
            <div class="col-lg-12">
              <div class="title-inner style">
                <div class="title-group fs-14">
                  <a class="home fw-6" href="index.html">
                    Home
                  </a>

                  <a class="home fw-6" href="index.html">
                    List Storage
                  </a>

                  <span>List Storage Form</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lsform h-[auto] w-full bg-slate-50  justify-evenly pt-5 flex-col md:flex-row flex">
        <div className="lsdefault max-w-full md:w-[65%]  h-[100%] pt-0  p-4  rounded-3xl bg-white overflow-hidden hidden md:block  ">
          <h3 className="bg-blue-100 mb-2 p-3 mx-[-22px] text-sm md:text-xl font-semibold text-[#1B1C57] ">
            Preview
          </h3>
          <div className="bg-blue-50 flex justify-between p-2.5 my-2 rounded-full w-[150px]">
            <img src="/images/icon/ph_house-fill.svg" alt="" />
            <h3>Storage type</h3>
          </div>
          <div className=" w-full h-[auto] mb-4 flex-col md:flex-row  flex">
            <div className="max-w-full md:w-1/2 h-[auto] my-[auto] ">
              <SimpleSlider11 />
            </div>
            <div className="max-w-full md:w-1/2 h-[50vh] gap-2 p-3 flex-col mt-[50px] md:mt-0 flex justify-between">
              <h3 className="text-xl md:text-2xl font-semibold text-[#1B1C57]">
                Title
              </h3>
              <div className=" flex justify-between py-2.5  rounded-full w-[90px]">
                <img src="/images/icon/Location.svg" alt="" />
                <h3 className="text-[18px] font-normal text-[#1B1C57]">
                  Location
                </h3>
              </div>
              <div className="bg-[#F7F9FB]  rounded-2xl p-[10px] h-[60px]">
                <h3 className="text-[18px] font-semibold text-[#1B1C57]">
                  ₹ Rental Price <span className="font-normal"></span>
                </h3>
                <p className="text-gray-700 text-[16px]">Booking Days</p>
              </div>
              <p className="text-gray-700 text-[16px]">Summary</p>
              <div className="flex justify-between">
                <h4 className="text-[16px] font-semibold text-[#1B1C57]">
                  Space Size
                </h4>
              </div>
              {/* <h3 className="text-[20px] py-3 px-2 rounded-2xl  font-semibold bg-slate-50 text-blue-400">Sq.Ft: 168ft</h3> */}
            </div>
          </div>
          <section className="w-[auto] bg-[#F7F9FB] mt-10 ">
            <div className="">
              <h2 className="text-xl md:text-2xl py-3  p-3 md:text-left font-semibold text-[#1B1C57]">
                Amenities
              </h2>
            </div>
          </section>
        </div>
        <div className="listspaceform w-full md:w-[30%] h-[auto]  px-2">
          <div class="col-md-12">
            <div class="list-space-form bg-white p-2">
              <div class="row align-items-center ">
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
              <div class="public-switch ">
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
                      </span>{" "}
                      <span class="fs-16 fw-7 text-color-4">Public</span>
                    </div>
                  </div>
                  <div class="r-col">
                    <label class="bootstrap-switch mb-0">
                      <input className="h-[auto]" type="checkbox" />
                      {/* <span class="slider"></span> */}
                    </label>
                  </div>
                </div>
              </div>
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
    </>
  );
}
