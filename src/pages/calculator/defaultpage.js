import Image from "next/image";
import React, { useState } from "react";

const DefaultPage = () => {
  const [isBedroomOpen, setisBedroomOpen] = useState(false);

  return (
    <>
      <div className="section w-full md:w-[100%] h-[100vh] flex flex-col md:flex-row">
        <div className="calc_left w-full md:w-[26%] min-h-full bg-[#f2f4f7] hidden md:block ">
          <div className="search_sec hidden md:flex justify-center items-center mt-3 mb-3">
            <label htmlFor="search"></label>
            <div className="flex justify-center items-center">
              <input
                type="search"
                id="site-search"
                name="search"
                placeholder="Search Items"
                className="bg-white rounded-full w-full md:w-11/12  py-1 px-5"
              />

              <img
                src="/images/Vector/Magnifer.svg"
                alt="search icon1"
                className="absolute ml-[-205px] w-5"
              />
            </div>
          </div>
          {/* {accordionItems.map((item) => (
            <div key={item.id} className="dropdown_sec mt-2">
              <div id={`accordionGroup${item.id}`} className="accordion">
                <div
                  id={`sect${item.id}`}
                  role="region"
                  aria-labelledby={`accordion${item.id}id`}
                  className={`accordion-panel ${
                    openAccordions.includes(item.id) ? "open" : ""
                  }`}
                >
                  <section className="border-sec p-4 border-b border-gray-200">
                    <div className="flex justify-between item-center">
                      <div className="_bedroom text-xs font-medium  tracking-wide">
                        {item.label}
                      </div>
                      {item.id === "bedroom" && (
                        <div className="flex flex-col items-center justify-between">
                          <div className="flex justify-between items-center">
                        <div></div>    <span className="text-xs font-medium  tracking-wide ">
                              King Size Bed
                            </span>
                            <button>-</button>
                            <input
                              type="number "
                              value={"0"}
                              readOnly
                              className="w-8 h-5 rounded-md"
                            />
                            <button>+</button>
                          </div>
                          <div>
                            <span className="text-xs font-medium  tracking-wide">
                              Lamp
                            </span>
                            <button>-</button>
                            <input
                              type="number "
                              value={"0"}
                              readOnly
                              className="w-8 h-5 rounded-md"
                            />
                            <button>+</button>
                          </div>
                          <div>
                            <span className="text-xs font-medium  tracking-wide">
                              Side table
                            </span>
                            <button>-</button>
                            <input
                              type="number "
                              value={"0"}
                              readOnly
                              className="w-8 h-5 rounded-md"
                            />
                            <button>+</button>
                          </div>
                          <div>
                            <span className="text-xs font-medium  tracking-wide">
                              Wardrobe
                            </span>
                            <button>-</button>
                            <input
                              type="number "
                              value={"0"}
                              readOnly
                              className="w-8 h-5 rounded-md"
                            />
                            <button>+</button>
                          </div>
                          <div>
                             
                            <span className="text-xs font-medium  tracking-wide">
                              Mirror
                            </span>
                            <button>-</button>
                            <input
                              type="number "
                              value={"0"}
                              readOnly
                              className="w-8 h-5 rounded-md"
                            />
                            <button>+</button>
                          </div>
                          <div>
                            <span className="text-xs font-medium  tracking-wide">
                              Chair
                            </span>
                            <button>-</button>
                            <input
                              type="number "
                              value={"0"}
                              readOnly
                              className="w-8 h-5 rounded-md"
                            />
                            <button>+</button>
                          </div>
                        </div>
                      )}
                      <svg
                        viewBox="0 0 16 27"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 inline-block cursor-pointer transform -rotate-90 "
                        onClick={() => toggleAccordion(item.id)}
                      >
                        <path
                          d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z"
                          fill="#878787"
                          className="cursor-pointer w-3"
                        ></path>
                      </svg>
                      
                    </div>
                    {openAccordions.includes(item.id) &&
                      item.id !== "bedroom" && <p>{item.label}</p>}
                      
                  </section>
                </div>
              </div>
            </div>
          ))} */}
          <div class="border-sec p-4 border-b border-gray-300 mt-3">
            <div class="Item_main">
              <button
                className="_bedroom flex items-center justify-between text-sm sm:text-base font-medium tracking-wide cursor-pointer"
                id="accordionBedroom"
                aria-expanded={isBedroomOpen}
                aria-controls="bedroom-content"
                onClick={() => setisBedroomOpen(!isBedroomOpen)}
              >
                <div class="flex items-center w-full space-x-64">
                  <div class="w-full">Bedroom</div>
                  <div class="ml-auto">
                    <svg
                      class="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer transform transition duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z" />
                    </svg>
                  </div>
                </div>
              </button>
              <div
                className={`flex flex-col justify-between items-center ${
                  isBedroomOpen ? "block" : "hidden"
                }`}
                id="bedroom-content"
              >
                <div className="flex flex-col justify-between items-center">
                  <div className="flex items-center w-full justify-between space-x-4 mt-2">
                    <div className="text-xs font-medium tracking-wide whitespace-nowrap">
                      King Size Bed
                    </div>
                    <div className="flex w-full md:w-[150px] justify-between items-center">
                      <button className="px-2 py-1 bg-gray-200 rounded-md">
                        -
                      </button>
                      <input
                        type="text"
                        className="w-10 h-6  bg-gray-200 text-center outline-none "
                      />
                      <button className="px-2 py-1 bg-gray-200 rounded-md">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center w-full justify-between space-x-4 mt-2">
                    <div className="text-xs font-medium tracking-wide whitespace-nowrap">
                      Lamp
                    </div>
                    <div className="flex w-full md:w-[150px] justify-between items-center">
                      <button className="px-2 py-1 bg-gray-200 rounded-md">
                        -
                      </button>
                      <input
                        type="text"
                        className="w-10 h-6 rounded-md bg-gray-200 text-center outline-none"
                      />
                      <button className="px-2 py-1 bg-gray-200 rounded-md">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-between space-x-4 mt-2">
                    <div className="text-xs font-medium tracking-wide whitespace-nowrap">
                      Side Table
                    </div>
                    <div className="flex w-full md:w-[150px] justify-between items-center">
                      <button className="px-2 py-1 bg-gray-200 rounded-md">
                        -
                      </button>
                      <input
                        type="text"
                        className="w-10 h-6 rounded-md bg-gray-200 text-center outline-none"
                      />
                      <button className="px-2 py-1 bg-gray-200 rounded-md">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-between space-x-4 mt-2">
                    <div className="text-xs font-medium tracking-wide whitespace-nowrap">
                      Wardrobe
                    </div>
                    <div className="flex w-full md:w-[150px] justify-between items-center">
                      <button className="px-2 py-1 bg-gray-200 rounded-md">
                        -
                      </button>
                      <input
                        type="text"
                        className="w-10 h-6 rounded-md bg-gray-200 text-center outline-none"
                      />
                      <button className="px-2 py-1 bg-gray-200 rounded-md">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-between space-x-4 mt-2">
                    <div className="text-xs font-medium tracking-wide whitespace-nowrap">
                      Mirror
                    </div>
                    <div className="flex w-full md:w-[150px] justify-between items-center">
                      <button className="px-2 py-1 bg-gray-200 rounded-md">
                        -
                      </button>
                      <input
                        type="text"
                        className="w-10 h-6 rounded-md bg-gray-200 text-center outline-none"
                      />
                      <button className="px-2 py-1 bg-gray-200 rounded-md">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-between space-x-4 mt-2">
                    <div className="text-xs font-medium tracking-wide whitespace-nowrap">
                      Chair
                    </div>
                    <div className="flex w-full md:w-[150px] justify-between items-center">
                      <button className="px-2 py-1 bg-gray-200 rounded-md">
                        -
                      </button>
                      <input
                        type="text"
                        className="w-10 h-6 rounded-md bg-gray-200 text-center outline-none"
                      />
                      <button className="px-2 py-1 bg-gray-200 rounded-md">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-sec p-4 border-b border-gray-300 mt-3">
            <div class="flex justify-between items-center">
              <div
                class="_bedroom text-sm sm:text-base font-medium tracking-wide cursor-pointer"
                id="accordionBedroom"
              >
                kitchen
              </div>
              <svg
                class="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer transform transition duration-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z" />
              </svg>
            </div>
            <div
              class="overflow-hidden transition-max-height duration-300"
              id="accordionContentBedroom"
            >
              <div class="px-3 py-1 text-sm sm:text-base"></div>
            </div>
          </div>
          <div class="border-sec p-4 border-b border-gray-300 mt-3">
            <div class="flex justify-between items-center">
              <div
                class="_bedroom text-sm sm:text-base font-medium tracking-wide cursor-pointer"
                id="accordionBedroom"
              >
                Living Room
              </div>
              <svg
                class="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer transform transition duration-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z" />
              </svg>
            </div>
            <div
              class="overflow-hidden transition-max-height duration-300"
              id="accordionContentBedroom"
            >
              <div class="px-3 py-1 text-sm sm:text-base"></div>
            </div>
          </div>
          <div class="border-sec p-4 border-b border-gray-300 mt-3">
            <div class="flex justify-between items-center">
              <div
                class="_bedroom text-sm sm:text-base font-medium tracking-wide cursor-pointer"
                id="accordionBedroom"
              >
                Others
              </div>
              <svg
                class="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer transform transition duration-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z" />
              </svg>
            </div>
            <div
              class="overflow-hidden transition-max-height duration-300"
              id="accordionContentBedroom"
            >
              <div class="px-3 py-1 text-sm sm:text-base"></div>
            </div>
          </div>

          <div class="border-sec p-4 border-b border-gray-300 mt-3">
            <button class="flex justify-between items-center">
              <div
                class="_bedroom text-sm sm:text-base font-medium tracking-wide cursor-pointer"
                id="accordionBedroom"
              >
                Space Dimensions
              </div>
              <svg
                class="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer transform transition duration-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z" />
              </svg>
            </button>
            <div
              class="overflow-hidden transition-max-height duration-300"
              id="accordionContentBedroom"
            >
              <div className="flex">
                 
                <div class="px-3 py-0.5">
                  <label
                    for="length"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Length:
                  </label>
                  <input
                    type="text"
                    name="length"
                    id="length"
                    class="w-full md:w-[90px] px-4 py-1 mt-1 text-sm border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div class="px-1 py-0.5">
                  <label
                    for="width"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Width:
                  </label>
                  <input
                    type="text"
                    name="width"
                    id="width"
                    class="w-full md:w-[90px] px-4 py-1 mt-1 text-sm border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div class="px-3 py-0.5">
                  <label
                    for="height"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Height:
                  </label>
                  <input
                    type="text"
                    name="height"
                    id="height"
                    class="w-full md:w-[90px] px-4 py-1 mt-1 text-sm border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div class="px-3 py-1 flex justify-center mt-1">
                <button class="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                  Add Space Dimension
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="calc_right  w-full md:w-[74%] h-[100%]">
          <div className="clacright_up flex-row justify-center  w-full md:w-[100%] md:h-[35%]">
            <div className="calc_heading_text w-[20%] h-10 ml-10 p-2">
              <a href="/" className="whitespace-nowrap ml-3 text-sm">
                Home
              </a>
              <a href="/" className="whitespace-nowrap ml-5 text-sm">
                Area Calculator
              </a>
            </div>
            <div className="calc_heading_text w-full flex justify-center items-center">
              <div className="text-center w-full text-lg md:text-3xl font-bold">
                Need Help in Calculating your <br className="" />
                storage Area Type?
              </div>
            </div>

            <div className="search_sec flex  md:hidden justify-center items-center mt-3 mb-3">
              <label htmlFor="search"></label>
              <div className="flex justify-center items-center">
                <input
                  type="search"
                  id="site-search"
                  name="search"
                  placeholder="Search Items"
                  className="bg-white rounded-full w-11/12 py-1 px-5"
                />

                <img
                  src="/images/Vector/Magnifer.svg"
                  alt="search icon1"
                  className="absolute ml-[-205px] w-5"
                />
              </div>
            </div>
          </div>
          <div className="clacright_mid flex flex-col md:flex-row justify-center items-center ml-3 mr-3 w-full md:w-[100%] h-auto md:h-[100%]">
            <div className="mid_block1 w-full md:w-[50%] h-auto md:h-[100%]">
              <div className="godown_image w-full md:w-[100%] h-auto md:h-[100%] bg-[#F7F9FC]">
                <img src="/images/Warehouse/Godown3D.svg" alt="warehouse1" />
                <div className=" w-full md:w-[90%] h-automd:h-[100%] flex justify-center items-center">
                  <div className="space_consuming  flex justify-center items-center text-lg  md:mr-0 mb-2 md:mb-5 md:mt-0 ml-2 md:ml-0 w-full md:w-[90%] h-[35px] bg-[#FFF6CC] rounded-md ">
                    0% Full
                  </div>
                </div>
              </div>
            </div>
            <div className="mid_block2  w-full md:w-[50%] h-auto md:h-[100%] bg-[#E6F0FF]  ">
              <div className="mid_block2_up w-full md:w-[100%] h-auto md:h-[100%] ml-3 p-3">
                <div className="Analysed_sec">
                  <div className="font-inter font-semibold text-lg ">
                    Analyzed Results
                  </div>
                  <div className="custom_fontcss">
                    <div className="Area_size font-inter mb-1 mt-1">
                      Est. Area size : <span className="text-blue-600">0</span>
                    </div>
                    <div className="Area_type font-inter">
                      Est. Area type : <span className="text-blue-600">0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mid_block2_down  ">
                <div className="flex justify-center items-center px-3 md:px-0">
                  <p className="font-inter font-normal text-xl  md:mt-2 mb-4 md:mb-2">
                    Upon analysis, we've identified that you possess delicate
                    items. To ensure their safety and longevity, we highly
                    recommend opting for Easy storage.
                  </p>
                </div>

                <div className="button_sec w-full md:w-[100%] flex items-center justify-evenly mb-2 ">
                  <button className="calc_affo flex text-white font-inter font-medium text-base gap-2 w-full md:w-[40%] h-auto mt-0 md:mt-0 py-4 px-3 bg-[#A0B0C0] rounded-xl">
                    Affordable Storage
                    <span>
                      <img
                        src="/images/icon/Info Circleicon.svg"
                        alt="infocircle1"
                      />
                    </span>
                  </button>

                  <button className="calc_easy flex text-white font-inter font-medium text-base gap-2 w-full md:w-[40%] h-auto mt- md:mt-0 py-4 px-3 bg-[#A0B0C0] rounded-xl">
                    Easy Storage
                    <span>
                      <img
                        src="/images/icon/Info Circleicon.svg"
                        alt="infocircle1"
                      />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="calc_iteam mr-3 ml-3 w-full md:w-[100%] h-[50px] flex items-center justify-between bg-gray-300 rounded-2xl font-inter font-semibold text-base leading-7 mb-3 mt-3 pl-3 pr-3 md:pl-5 md:pr-5">
            Total item
            <div className="flex flex-row justify-end items-center">0</div>
          </div>

          <div className="calc_bottom w-full md:w-[100%] h-[35%] ml-5 mr-5 ">
            <div className="or_sec  flex justify-center items-center w-full md:w-[100%] h-[1%] border-solid border-2 border-gray-500 ">
              <span className="bg-white p-1">Or</span>
            </div>
            <div className=" mt-8 mb-8 flex justify-start text-3xl font-medium text-center">
              Upload Images to Analysed
            </div>
            <div className=" flex justify-start items-center gap-5">
              <div class="box_lower1 flex justify-center w-full md:w-[20%] h-[10%] py-3 px-3 border-dashed border-2 bg-gray-100 leading-10">
                <label
                  for="file-upload"
                  class="w-15 flex justify-center items-center cursor-pointer"
                >
                  <input type="file" id="file-upload" class="hidden" />
                  <img
                    src="/images/icon/saveas icon.svg"
                    alt=""
                    class="w-full h-full"
                  />
                </label>
              </div>

              <div class="box_lower2 w-full md:w-[10%] h-[15%] border border-dashed bg-gray-100 flex justify-center mr-2">
                <label
                  for="image-upload"
                  class="w-20 h-20 flex justify-center items-center cursor-pointer"
                >
                  <input type="file" id="image-upload" class="hidden" />
                  <Image
                    src="/images/icon/Add More icon.svg"
                    alt="add more icon"
                    class="w-full h-full"
                    width={100}
                    height={100}
                  />
                </label>
              </div>
            </div>
            <button className="w-full  md:w-[255px] h-auto bg-[#338CFF] py-2 px-4 mt-3 text-white rounded-md">
              Analyse
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultPage;
