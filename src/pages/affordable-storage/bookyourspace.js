import Responsive from "@/sharedComponent/slider12";
import Button1 from "@/sharedComponent/storagecommoncompo/button1";
import React from "react";
import Household from "@/sharedComponent/storagecommoncompo/household";

// import Addresscomponent from "@/sharedComponent/storagecommoncompo/Addresscomponent";

const Bookyourspace = () => {
  return (
    <>
      <section className="Bookyourspace flex ml-3 mr-3  ">
        <div className="bookyourspace_left  w-full md:w-[794px] h-auto  bg-[#FFFFFF] pl-0 md:pl-[80px]">
          <div className="bookyourspace_link  w-full md:w-[131px] h-[32px] p-0 md:p-4 mb-3 ">
            <div className="flex">
              <a
                href="/"
                className="font-medium leading-8 text-[#1B1C57] text-sm"
              >
                Home
              </a>
              <img
                src="/images/icon/Double Alt Arrow Right.svg"
                alt="doublearrowicon1"
                className="w-5"
              />
              <a
                href=""
                className="font-medium leading-8 text-[#1B1C57] text-sm"
              >
                Booking
              </a>
            </div>
          </div>
          <div className="bookyourspace_wraper w-[auto] h-[auto] ">
            <div className="bookyourspace_heading w-[311px] h-[42px] font-semibold leading-5 text-[16px] md:text-[38px] text-[#1B1C57] whitespace-nowrap pb-10">
              Book Your Space
            </div>
            <div className="bookyourspace_date flex w-full md:w-[621px] h-[81px]  text-[14px] mt-5 gap-2">
              <div className="w-[298px] h-[81px]">
                <div>
                  Shifting Date
                  <span className="font-medium text-sm leading-8 text-[#C60909]">
                    *
                  </span>
                </div>
                <div className="flex w-full md:w-[290px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB]">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full md:w-[250px] outline-none"
                  ></input>
                </div>
              </div>
              <div className="w-[298px] h-[81px]">
                <div className="text-[14px] ">
                  End date
                  <span className="font-medium text-sm leading-8 text-[#C60909]">
                    *
                  </span>
                </div>
                <div className="flex w-full md:w-[290px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB]">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full md:w-[250px] outline-none"
                  ></input>
                </div>
              </div>
            </div>
            <div className="bookyourspace_address w-full md:w-[609px] h-[auto] md:h-[326px] ">
              <div className="w-[154px] h-[29px] font-medium text-[14px] md:text-[24px] leading-7 mt-3 mb-3 text-[#1B1C57]">
                Your Address 
              </div>
              <div className="enteryouraddress w-full md:w-[609px] h-[80px] ">
                <div className="w-[136px] h-[32px] font-medium text-[14px]  md:text-sm leading-8 md:leading-9">
                  Enter your Address
                  <span className="font-medium text-sm leading-8 text-[#C60909]">
                    *
                  </span>
                </div>
                <div className="enteryouraddressinputsec flex  w-full md:w-[609px] h-[44px] gap-2 flex-col md:flex-row mb-2 md:mb-0">
                  <input
                    type="text"
                    name="address1"
                    placeholder="Address Line 1"
                    className="flex  w-[390px] md:w-[298px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB] mb-2 md:mb-0"
                  ></input>
                  <input
                    type="text"
                    name="address2"
                    placeholder="Address Line 2"
                    className="flex w-[390px]  md:w-[298px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB] "
                  ></input>
                </div>
              </div> 
              {/* <div className="flex w-full h-[auto] mt-2 mb-3">
                <div className="citydissec w-full  md:w-[609px] h-[81px]">
                  <div className="citysec w-full md:w-[298px] h-auto text-[14px] leading-8     md:h-[81px] mt-5 md:mt-0">
                    City
                    <span className="font-medium text-sm leading-8 text-[#C60909]">
                      *
                    </span>
                    <div className="flex justify-between w-full md:w-[298px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB]">
                      <div>
                        <select name="city" className="w-[160px] md:w-[270px]">
                          <option value="">Select</option>
                          <option value="Noida">Noida</option>
                          <option value="Gurgaon">Gurgaon</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Ghaziabad">Ghaziabad</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dissec w-full md:w-[609px] h-[81px] mb-3">
                  <div className="citysec w-full md:w-[298px] h-[auto] md:h-[81px] text-[14px] mt-5 md:mt-0">
                    District
                    <span className="font-medium text-sm leading-8 text-[#C60909]">
                      *
                    </span>
                    <div className=" flex w-[200px] md:w-[298px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB]">
                      <div>
                        <select name="city" className="w-[160px] md:w-[270px]">
                          <option value="">Select</option>
                          <option value="Noida">Noida</option>
                          <option value="Gurgaon">Gurgaon</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Ghaziabad">Ghaziabad</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="flex">
                <div className="statepin  w-full md:w-[609px] h-[81px] mt-3">
                  <div className="citysec w-full md:w-[298px] h-[81px]">
                    State
                    <span className="font-medium text-sm leading-8 text-[#C60909]">
                      *
                    </span>
                    <div className=" flex w-[170px] md:w-[298px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB]">
                      <div>
                        <select name="city" className="w-[150px] md:w-[270px]">
                          <option value="">Select</option>
                          <option value="Noida">Noida</option>
                          <option value="Gurgaon">Gurgaon</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Ghaziabad">Ghaziabad</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pincode w-full md:w-[298px] h-[81px] mt-3">
                  Pincode
                  <span className="font-medium text-sm leading-8 text-[#C60909]">
                    *
                  </span>
                  <div className="flex w-[150px] md:w-[298px] h-[44px] rounded-lg p-[10px] border border-solid border-[#D1D5DB]">
                    <input
                      type="text"
                      name="pincode"
                      className="bookyourstorage w-[150px] md:w-full h-full outline-none"
                      placeholder="Enter Pincode"
                    />
                  </div>
                </div>
              </div> */}
              <div className="flex">
                <div className="statepin  w-full md:w-[609px] h-[81px] mt-3">
                  {/* <div className="citysec w-full md:w-[298px] h-[81px] text-[14px]">
                    State
                    <span className="font-medium text-sm leading-8 text-[#C60909]">
                      *
                    </span>
                    <div className=" flex w-[170px] md:w-[298px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB]">
                      <div>
                        <select name="city" className="w-[150px] md:w-[270px]">
                          <option value="">Select</option>
                          <option value="Noida">Noida</option>
                          <option value="Gurgaon">Gurgaon</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Ghaziabad">Ghaziabad</option>
                        </select>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="pincode w-full md:w-[298px] h-[81px]  text-[14px]   mt-3">
                  Pincode
                  <span className="font-medium text-sm leading-8 text-[#C60909]">
                    *
                  </span>
                  <div className="flex w-[150px] md:w-[298px] h-[44px] rounded-lg p-[10px] border border-solid border-[#D1D5DB]">
                    <input
                      type="text"
                      name="pincode"
                      className="bookyourstorage w-[150px] md:w-full h-full outline-none"
                      placeholder="Enter Pincode"
                    />
                  </div>
                </div>
                
              </div>
            </div>
           {/* <div className="flex">
           <div className="pincode w-full md:w-[298px] h-[81px] text-[14px] mt-3">
  Lift Available
  <span className="font-medium text-sm leading-8 text-[#C60909]">*</span>
  <div className="flex w-[150px] md:w-[298px] h-[44px] rounded-lg p-[10px] border border-solid border-[#D1D5DB]">
    <select>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </div>      
</div>

                <div className="pincode w-full md:w-[298px] h-[81px] text-[14px] mt-3">
                Floors
                  <span className="font-medium text-sm leading-8 text-[#C60909]">
                    *
                  </span>
                  <div className="flex w-[150px] md:w-[298px] h-[44px] rounded-lg p-[10px] border border-solid border-[#D1D5DB]">
                    <input
                      type="text"
                      name="pincode"
                      className="bookyourstorage w-[150px] md:w-full h-full outline-none"
                      placeholder="Enter Pincode"
                    />
                  </div>
                </div>
           </div> */}
            <div className="adharnumbersec w-full md:w-[298px] h-[101px] mt-3">
              <div className="adhar_heading  font-inter font-normal text-[14px] md:text-base leading-8">
                Adhaar Number
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
              </div>
              <div className="enteradhar md:w-full w-[298px] h-[44px] rounded-lg border border-solid border-[#D1D5DB] p-2.5">
                <input type="text" name="adhar" placeholder="Enter"></input>
              </div>
            </div>
            <div className="summarysec w-full md:w-[609px] h-[auto] md:h-[75vh] rounded-[20px] bg-[#F7F9FC]">
              <h2 className="w-[110px] h-[29px] font-inter font-medium text-[14px] md:text-2xl text-[#1B1C57] mt-2 mb-2  ">
                Summary
              </h2>
              <div className="leading-6"> 
              <div className="summary-detail justify-between w-full md:w-[550px] h-[150px]">
                <div className=" flex justify-between w-full md:w-[552px] h-[24px] leading-4 mb-2">
                  <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                    (1 Month) Total rental charges
                  </div>
                  <div className="w-[62px] h-[24px] font-inter font-medium text[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                    ₹2359
                  </div>
                </div>
                <div className=" flex justify-between w-full md:w-[552px] h-[24px] mb-2">
                  <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[12px] md:text-[20px] leading[14px]md:leading-6 text-[#1B1C57]">
                    Logistics & Tax
                  </div>
                  <div className="w-[62px] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-[14px] md:leading-6 text-[#1B1C57]">
                    ₹600
                  </div>
                </div>
                <div className=" flex justify-between w-full md:w-[552px] h-[24px] mb-2">
                  <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[12px] md:text-[20px] leading-[14px]  md:leading-6 text-[#1B1C57]">
                    Insurance
                  </div>
                  <div className="w-[62px] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-[14px] md:leading-6 text-[#1B1C57]">
                    ₹200
                  </div>
                </div>
                <div className=" flex justify-between w-full md:w-[552px] h-[24px]">
                  <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[12px] md:text-[20px] leading-[14px]  md:leading-6 text-[#1B1C57]">
                    Coupon Discount
                  </div>
                  <div className="w-[62px] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-[14px]  md:leading-6 text-[#1B1C57]">
                    -₹100
                  </div>
                </div>
                </div>
                <div className="summary_total flex justify-center items-center w-full md:w-[583px] h-[59px] rounded-xl bg-[#8DC63F]">
                  <div className="summary_total_inner flex justify-between w-[547px] h-[29px]">
                    <div className="w-[59px] h-[29px] font-inter font-[700px] text-[14px] md:text-[24px] leading-[16px] md:leading-7 text-[#1B1C57]">
                      Total
                    </div>
                    <div className="w-[78px] h-[29px] font-inter font-[700px] text-[14px] md:text-[24px]  leading-[16px] md:leading-7 text-[#1B1C57]">
                      ₹3059
                    </div>
                  </div>
                </div>
                <div className="summaryterm flex justify-center w-full md:w-[562px] h-[66px] mt-3">
                  <div className="summaryterm_left flex justify-center w-[24px] h-[24px] rounded-md bg-[#8DC63F]">
                    <input
                      type="checkbox"
                      id="tickmark"
                      name="tickmark"
                      value="tickmark"
                    />
                  </div>
                  <div className="summaryterm-right w-full md:w-[521px] h-[66px] font-inter font-normal text-[12px] md:text-base leading-4 text-[#374151] ">
                    I acknowledge that all the details I provide are accurate to
                    the best of my knowledge & will be shared with the host. And
                    I also accept the
                    <span className="font-inter  font-semibold text-[12px] leading-4 md:text-base text-[#338CFF]">
                      Term & Conditions.
                    </span>
                  </div>
                </div>
                
              </div>
              <div className="mobile_buttonopen mt-0 md:mt-[60px] md:hidden">
  <Button1 />
</div>

      <div className="applied_coupon   w-full md:w-[609px] h-auto ">
                  <div className="applied_coupon_up w-full md:w-[609px] h-[auto] md:h-[80px] bg-white py-3 ">
                    <div className=" w-[180px]  font-inter font-medium text-[12px] md:text-2xl text-[#1B1C57] leading-[14px]">
                      Applied coupon
                    </div>
                  </div>
                  <div className="w-full md:w-full h-[full] py-8 rounded-lg bg-[#F7F9FC] px-3">
                    <div className="inner_coupon flex  justify-between items-center">
                  <div className="flex items-center gap-2">
                  <img
                        src="/images/storagelisting/coupon 1.png"
                        alt="storagelisting"
                      />
                 
            
                      <div className=" ml-2 md: mb-2">
                    
                        <div className="Ext_new text-[#EC9700] font-medium text-sm">
                          EXTNEW
                        </div>
                        <div className="use_coupon text-[#6B7280] font-normal text-xs ">
                          Use Coupon code
                        </div>
                        <div className="get_cashback text-[#1B1C57] font-normal leading-4 text-xs">
                        Get cashback upto ₹100
                      </div>
                      </div>
                      </div>
                      <div className="coupon_right flex justify-right ">
                        <div className="applied_remove pr-3">
                          <div className="applied text-[#8DC63F] font-semibold leading-5 text-base">
                            Applied
                          </div>
                          <div className="remove text-[#6B7280] font-normal text-xs pt-2 cursor-pointer underline">
                            Remove
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            {/* <div className="bookyourspace_offer w-full md:w-[auto] h-[216px]">
              <div className=" mt-4 mb-2">
                <div className="text_offer w-[72px] h-[24px] leading-7 font-inter font-medium text-2xl text-[#1B1C57]">
                  Offers
                </div>
              </div>
              <div className="offer_text-lower w-full md:w-full h-[200px]    ">
                <Responsive />
              </div>
            </div> */}
          </div>
        </div>
        <div className="bookyourspace_right  w-full md:w-[694px] mt-10 h-[1300px] bg-[#F7F9FC] hidden md:block">
          <Household/>
       <Button1/>
        </div>
      </section>
      <section className="simplyfy_storage w-full md:w-[100vw] h-auto md:h-[495px] mt-5">
  <div className="wraper section flex flex-col md:flex-row">
    <div className="left-storage w-full md:w-[50%] gap-5 p-5 md:p-[100px]">
      <div className="stopara font-extrabold text-[20px] md:text-5xl leading-[32px] md:leading-[64px] text-[#18191F]">
        Simplify Your Storage Experience with Easy Storage
      </div>
      <div className="font-normal text-[12px] md:text-lg leading-[17px] md:leading-8 text-[#18191F] mt-4">
        Everything you need about finding the best, safe and affordable
        storage space near you.
      </div>
      <div className="Storage_button flex justify-center items-center w-full md:w-[18rem] h-[3rem] md:h-[3.5rem] rounded-lg px-3 py-3 bg-[#FFFFFF] text-[12px] leading-[10px] shadow-custom mt-4 md:mt-8">
  Explore Easy Storage
</div>
    </div>
    <div className="storage_right w-full md:w-[50%] h-auto hidden md:block">
      <img
        src="/images/storagelisting/cartoon.png"
        alt="storagelisting"
        className="w-full h-auto"
      />
    </div>
  </div>
</section>
<div className="special_formobile mt-4 md:hidden">
<Household/>
</div>

    </>
  );
};

export default Bookyourspace;
