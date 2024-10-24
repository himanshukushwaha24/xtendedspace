import Responsive from "@/sharedComponent/slider12";
import { Button1 } from "@/sharedComponent/storagecommoncompo/button1";
import Household from "@/sharedComponent/storagecommoncompo/household";
import React from "react";

const Bookyourspaceexisting = () => {
  return (
    <React.Fragment>
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
            <div className="bookyourspace_heading w-[311px] h-[42px] font-semibold text-[38px] text-[#1B1C57] whitespace-nowrap pb-10">
              Book Your Space
            </div>
            <div className="bookyourspace_date flex w-full md:w-[621px] h-[81px] mt-5">
              <div className="w-[298px] h-[81px]">
                <div>
                  Start date
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
                <div className="">
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
            <div className="bookyourspace_address flex justify-between items-center w-full md:w-[609px] h-[auto] md:h-[100px]  ">
              <div className="w-[154px] h-[29px] font-medium text-[24px] leading-7 mt-3 mb-3 ">
                Your Address
              </div>
              <a
                href="#"
                className="font-inter font-medium text-lg leading-5 text-[#338CFF]"
              >
                Change
              </a>
            </div>
            <div className="default-sec w-[auto] md:w-[70%] h-[auto] my-2">
              <div className="default-heading font-inter font-medium text-[18px] leading-8 text-[#1B1C57]">
                Default
              </div>
              <div className="default-details w-[auto] h-auto  text-[#1B1C57] font-inter font-medium text-[18px] leading-8 ">
                A-119, Block A, Dayanand Colony, Lajpat Nagar, New Delhi Delhi
                110024
              </div>
            </div>
            <div className="summarysec w-full md:w-[609px] h-[70vh] rounded-[20px] bg-[#F7F9FC] py-2">
              <h2 className="w-[110px] h-[29px] font-inter font-medium text-2xl text-[#1B1C57] mt-2 mb-2  ">
                Summary
              </h2>
              <div className="leading-6">
                <div className="summary-detail justify-evenly w-full md:w-[550px] h-[150px]">
                  <div className=" flex w-full md:w-[552px] h-[24px] mb-2">
                    <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal whitespace-nowrap text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                      (1 Month) Total rental charges
                    </div>
                    <div className="w-[62px] h-[24px] font-inter font-medium text-[20px] leading-6 text-[#1B1C57]">
                      ₹2359
                    </div>
                  </div>
                  <div className=" flex w-full md:w-[552px] h-[24px] mb-2">
                    <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[20px] leading-6 text-[#1B1C57]">
                      Logistics & Tax
                    </div>
                    <div className="w-[62px] h-[24px] font-inter font-medium text-[20px] leading-6 text-[#1B1C57]">
                      ₹600
                    </div>
                  </div>
                  <div className=" flex w-full md:w-[552px] h-[24px] mb-2">
                    <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[20px] leading-6 text-[#1B1C57]">
                      Insurance
                    </div>
                    <div className="w-[62px] h-[24px] font-inter font-medium text-[20px] leading-6 text-[#1B1C57]">
                      ₹200
                    </div>
                  </div>
                  <div className=" flex w-full md:w-[552px] h-[24px]">
                    <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[20px] leading-6 text-[#1B1C57]">
                      Coupon Discount
                    </div>
                    <div className="w-[62px] h-[24px] font-inter font-medium text-[20px] leading-6 text-[#1B1C57]">
                      -₹100
                    </div>
                  </div>
                </div>
                <div className="summary_total flex justify-center items-center w-full md:w-[583px] h-[59px] rounded-xl bg-[#8DC63F]">
                  <div className="summary_total_inner flex justify-between w-[547px] h-[29px]">
                    <div className="w-[59px] h-[29px] font-inter font-[700px] text-[24px] leading-7 text-[#1B1C57]">
                      Total
                    </div>
                    <div className="w-[78px] h-[29px] font-inter font-[700px] text-[24px] leading-7 text-[#1B1C57]">
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
                  <div className="summaryterm-right w-full md:w-[auto ] h-[auto] font-inter font-normal text-base text-[#374151] px-1">
                    I acknowledge that all the details I provide are accurate to
                    the best of my knowledge & will be shared with the host. And
                    I also accept the
                    <span className="font-inter  font-semibold text-base text-[#338CFF]">
                      Term & Conditions.
                    </span>
                  </div>
                </div>
              </div>
              <div className="mobile_buttonopen mt-[60px] md:hidden">
                <Button1 />
              </div>

              <div className="applied_coupon   w-full md:w-[609px] h-auto ">
                <div className="applied_coupon_up w-full md:w-[609px] h-[auto] md:h-[80px] bg-white py-3 ">
                  <div className=" w-[180px]  font-inter font-medium text-2xl text-[#1B1C57] ">
                    Applied coupon
                  </div>
                </div>
                <div className="w-full md:w-full h-[auto] md:h-[full]  rounded-lg bg-[#F7F9FC]">
                  <div className="inner_coupon flex  justify-between items-center py-3 md:py-2">
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
            <div className="bookyourspace_offer w-full md:w-[auto] h-[216px]">
              <div className=" mt-4 mb-2">
                <div className="text_offer w-[72px] h-[24px] leading-7 font-inter font-medium text-2xl text-[#1B1C57]">
                  Offers
                </div>
              </div>
              <div className="offer_text-lower w-full md:w-full h-[200px]    ">
                <Responsive />
              </div>
            </div>
          </div>
        </div>
        <div className="bookyourspace_right  w-full md:w-[694px] mt-10 h-[1300px] bg-[#F7F9FC] hidden md:block">
          <Household />
          <Button1 />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Bookyourspaceexisting;
