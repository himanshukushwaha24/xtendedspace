import React, { useState, useEffect } from "react";
import {
  FaFireExtinguisher,
  FaSmokingBan,
  FaVideo,
  FaLock,
  FaShieldAlt,
  FaBug,
  FaKey,
} from "react-icons/fa";
import { FaDropletSlash } from "react-icons/fa6";
import MultipleItems from "@/sharedComponent/slider11";
import { getUserId, isMobile } from "@/util/common";
import HeaderMenu from "@/components/header/header";
import Footer from "../../components/footer";
import { useParams, useSearchParams } from "next/navigation";
import moment from "moment";
import { IoLocationSharp } from "react-icons/io5";
import { DatePicker } from "antd";
import { GiSmokingVolcano } from "react-icons/gi";
import {
  getAllStorageById,
  CalculationBookingAmount,
  SaveBookingDetails,
} from "@/service/storageService";
import CustomPaging from "@/sharedComponent/slider14";
import Link from "next/link";
import Coupon from "@/components/Coupon";
import { useRouter } from "next/router";
import Image from "next/image";

const storagespace = ({ data }) => {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const originalAmount = searchParams.get("originalAmount");
  const [showErrorMessage, setShowErrorMessage] = useState();
  // const [data, setData] = useState({});
  const [payload, setPayload] = useState({
    Day: 0,
    IsLogistics: false,
    Isinsuranceamount: true,
    PerLakh: 1,
    CouponId: "",
  });
  const [calculatedAmount, setCalculatedAmount] = useState();
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [response, setResponse] = useState({});
  const handleStartDateChange = (date, dateString) => {
    setStartDate(dateString);
    onChangeHandler({
      target: { type: "date", name: "StartDate", value: dateString },
    });
  };

  const handleEndDateChange = (date, dateString) => {
    onChangeHandler({
      target: { type: "date", name: "EndDate", value: dateString },
    });
  };

  let diffInDays = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!getUserId()) {
      // alert("Please login!");
      router.push(`/login?callback=storage-details?propertyId=${propertyId}`); // Navigate to the login page
      return;
    }
    if (!payload.StartDate || !payload.EndDate) {
      setShowErrorMessage({ message: "Start and End date is mandatory" });
      return;
    }

    const allKeys = Object.keys(payload);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, payload[item]);
    });
    formData.append("CurrentUserId", getUserId());
    formData.append("IsAffordableLogistics", payload.IsLogistics);
    formData.append("propertyId", propertyId);
    formData.append("originalAmount", originalAmount);
    const response = await SaveBookingDetails("?Stage=1", formData);
    if (response.success) {
      router.push({
        pathname: "/affordable-storage/booking-space",
        query: {
          preData: JSON.stringify(response.success),
        },
      });
    } else {
      setShowErrorMessage(response.error);
    }
  };
  useEffect(() => {
    const fetchData = async (propertyId) => {
      try {
        const response = await getAllStorageById(window.location.search);

        if (response.success) {
          const storageData = response.success.data[0];
          //setData(storageData);
          // getCalculation(storageData.propertyId);
        } else {
          console.error("Error fetching data:", response.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // fetchData();
  }, []);

  const onChangeHandler = async (e) => {
    const { name, value, type, checked } = e.target;
    setShowErrorMessage();
    let newFilter = {
      ...payload,
      [name]: type === "checkbox" ? checked : value,
    };
    if (name === "Isinsuranceamount") {
      if (checked) {
        newFilter = { ...newFilter, PerLakh: 1 };
      } else {
        newFilter = { ...newFilter, PerLakh: 0 };
      }
    }

    setPayload(newFilter);
  };

  const getcalculatedData = async (args) => {
    const response = await CalculationBookingAmount(args);
    if (response.success) {
      setCalculatedAmount(response.success);
      setResponse(response); // Adjust based on actual response structure
    } else {
      setShowErrorMessage(response.error);
      console.error("Error calculating amount:", response.error);
    }
  };

  useEffect(() => {
    const { StartDate, EndDate, Isinsuranceamount, PerLakh } = payload || {};
    let args = window.location.search;
    if (StartDate && EndDate) {
      const StartDateMoment = moment(StartDate, "DD/MM/YYYY"); // Specify format if necessary
      const EndDateMoment = moment(EndDate, "DD/MM/YYYY"); // Specify format if necessary

      // Calculate the difference in days
      diffInDays = EndDateMoment.diff(StartDateMoment, "days") + 1;
      if (diffInDays < 0) {
        // Ensure that the difference is not negative
        setShowErrorMessage({
          message: "End date cannot be before start date",
        });
        return;
      }

      args += `&Day=${diffInDays}`;
    }
    if (payload.IsLogistics) {
      args += `&IsLogistics=${true}`;
    }
    args += `&Isinsuranceamount=${payload?.Isinsuranceamount}`;
    if (payload.PerLakh) {
      args += `&PerLakh=${payload.PerLakh}`;
    }

    args += `&CouponId=${payload.CouponId ? payload.CouponId : ""}`;

    if (diffInDays > data?.minimumBookingDays - 1) {
      getcalculatedData(args);
    }
  }, [payload, data]);

  const amenities = {
    isFireExtinguisher: {
      title: "Fire Extinguisher",
      desc: "Warehouses at Xtended Space are well-equipped with fire extinguishers for immediate fire safety.",
      icon: <FaFireExtinguisher />,
    },
    isSmokeFree: {
      title: "Smoke Free",
      desc: "A designated area where smoking is prohibited, promoting a healthier environment with clean air for everyone to enjoy.",
      icon: <FaSmokingBan />,
    },
    hasSmokeDetector: {
      title: "Smoke Detectors",
      desc: "Installation of smoke detectors provides precautions for your items from fire safety.",
      icon: <GiSmokingVolcano />,
    },

    hasSecurityCamera: {
      title: "Security Camera",
      desc: "We have 24/7 security cameras to monitor and protect your items.",
      icon: <FaVideo />,
    },
    isLockedArea: {
      title: "Locked Free",
      desc: "Security is our priority. Each unit has secure locks that keep your items safe.",
      icon: <FaLock />,
    },
    hasGuardedSociety: {
      title: "Guarded Society",
      desc: "Our facilities have a guard facility that provides extra security.",
      icon: <FaShieldAlt />,
    },
    isMoistureFree: {
      title: "Moisture Free",
      desc: "Our storage space keeps your belongings moisture-free.",
      icon: <FaDropletSlash />,
    },
    isPestControl: {
      title: "Pest Control",
      desc: "Our pest-controlled warehouses ensure a clean and safe environment for your belongings.",
      icon: <FaBug />,
    },
    hasSeparateAccess: {
      title: "Separate Access",
      desc: "Enjoy the convenience and security of access to your storage unit.",
      icon: <FaKey />,
    },
  };
  const filterTrueAmenities = (data) => {
    const filteredAmenities = {};
    Object.keys(amenities).forEach((key) => {
      if (data[key]) {
        filteredAmenities[key] = amenities[key];
      }
    });
    return filteredAmenities;
  };
  const truncateDescription = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const trueAmenities = filterTrueAmenities(data);

  // if (!data || Object.keys(data).length === 0) {
  //   return <div>Loading...</div>;
  // }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%]">
      <HeaderMenu />

      <div className="section w-full h-auto  md:bg-[#F7F9FC]">
        <div class=" w-full mx-auto px-4 ">
          <div class="flex items-center gap-2 md:px-4">
            <div className="middle_seccalculatorstorage flex   w-full py-3 gap-3">
              <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-2 py-2 rounded-full">
                <img
                  src="/images/calculator/ph_house-fill.svg"
                  alt="household1"
                  className="w-full md:w-15"
                />
                <div className="text-sm whitespace-nowrap text-blue-600 mr-2">
                  {data.propertyType}
                </div>
              </div>
              {/* <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-2 py-2 rounded-full"> <img src="/images/calculator/fluent_desk.svg" alt="fluent_desk1 " className="w-full" />
                <div className="text-sm whitespace-nowrap text-blue-600">{data.propertyType}</div> </div> */}
            </div>
            {/* <span class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">Household Items</span>
        <span class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">Business Inventory</span> */}
          </div>
          <div class="flex flex-col lg:flex-row gap-4 md:px-[50px]  ">
            <div class="  lg:w-2/3">
              {/* <div class="relative">
        <img src="https://placehold.co/600x400" alt="Property Image" class="w-full rounded-lg mb-4"/>
        <div class="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">360°</div>
      </div>
      <div class="flex gap-2 mb-4">
        <img src="https://placehold.co/100x100" alt="Thumbnail" class="w-1/5 rounded-lg"/>
        <img src="https://placehold.co/100x100" alt="Thumbnail" class="w-1/5 rounded-lg"/>
        <img src="https://placehold.co/100x100" alt="Thumbnail" class="w-1/5 rounded-lg"/>
        <img src="https://placehold.co/100x100" alt="Thumbnail" class="w-1/5 rounded-lg"/>
        <img src="https://placehold.co/100x100" alt="Thumbnail" class="w-1/5 rounded-lg"/>
      </div> */}
              <div className="w-full h-[auto] py-2 md:p-4 mx-auto md:px-[50px] ">
                {data?.propertyImages && <CustomPaging data={data} />}
              </div>
              {/* {data.description && data.description.split(' ').length >= 3 ? ( */}
              <p className="text-zinc-600 mb-4 mt-[80px] md:mt-[150px] text-[16px]">
                {/* {truncateDescription(data.description, 15)} */}

                {`Affordable ${data.propertyType} Storage Space Near ${data.address2} in ${data.city}.`}
              </p>
              {/* ) : (
  <p className="text-zinc-600 mb-4 mt-[80px] md:mt-[150px] text-[16px]">
    {`A ${data.sqrFeet ?? 0} sq ft ${data.spaceType} storage in ${data.city}, ${data.state}. It rents for ₹${data.perDayRentalAmount ?? 0} per day and is ideal for ${data.propertyType.toLowerCase()}.`}
  </p>
)} */}

              <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-zinc-600 text-center bg-white py-4 rounded">
                <div className="border-r px-2 ">
                  <span class=" text-zinc-800 py-2 leading-loose ">
                    Property Size
                  </span>
                  <p className="text-blue-400 font-semibold text-[17px] ">
                    {/* 1BHK (300-400 sq ft) */}
                    {data?.propertyStorageType?.propertySize} (
                    {data?.propertyStorageType?.minimumSquareFeet} -
                    {data?.propertyStorageType?.maximumSquareFeet} sq.ft.)
                  </p>
                </div>
                <div className="border-r px-2">
                  <span className="text-zinc-800 py-2 leading-loose">
                    Entrance
                  </span>
                  {data.entranceWidthInFeet > 0 &&
                    data.entranceHeightInFeet > 0 && (
                      <p className="text-blue-400 font-semibold text-[17px]">
                        {data.entranceWidthInFeet}X{data.entranceHeightInFeet}
                        ft
                      </p>
                    )}
                </div>
                <div className="border-r px-2">
                  <span class=" text-zinc-800 py-2 leading-loose">
                    Property Type
                  </span>
                  <p className="text-blue-400 font-semibold text-[17px]">
                    {data.propertyType}
                  </p>
                </div>
                <div className="px-2">
                  <span class=" text-zinc-800 py-2 leading-loose">
                    Access Flexibility
                  </span>
                  <p className="text-blue-400 font-semibold text-[17px]">
                    {data.tenantVisitFrequency}
                  </p>
                </div>
              </div>
              <div class=" col-span-2 flex flex-col md:flex-row items-center bg-[#F7F9FC] rounded  bg-gray-10 p-[20px]  justify-between">
                <img
                  className="w-[300px] h-[300px]"
                  src="/images/product/Floor-Plan.png"
                  alt=""
                />
                <div className="ht1 md:px-6">
                  <div className="flex items-center  justify-center md:max-w-[70%]">
                    <h1 className="text-[#1B1C57] font-semibold text-2xl leading-7 ">
                      {data?.propertyStorageType?.propertySize}
                    </h1>
                    <h2 className="text-[#1B1C57] leading-5 text-xl font-normal ">
                      ( {data?.propertyStorageType?.minimumSquareFeet}-
                      {data?.propertyStorageType?.maximumSquareFeet} sq ft.)
                      {/* (500-700 sq ft.) */}
                    </h2>
                  </div>
                  <div className="md:max-w-[70%] flex  text-center justify-center">
                    <h3 className="text-[#626687] font-normal leading-6 text-xs">
                      Type of items that can be stored here
                    </h3>
                  </div>

                  <div class="flex flex-wrap gap-[10px] lg:gap-[15px] justify-evenly md:justify-start mt-4   max-w-[100%]   rounded-3xl mx-auto">
                    <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px]  items-center justify-between  flex    rounded-2xl bg-white">
                      <Image
                        className="w-[35px] h-[35px]"
                        src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Box%20(1).svg"
                        alt="box"
                        width={140}
                        height={140}
                      />

                      <div className="w-[auto]">
                        <h2 class="text-[14px] md:text-[18px] ">
                          {/* {preData?.easyStorageType.largeItem}  Large */}
                          {data?.propertyStorageType?.smallItem} Small
                        </h2>
                      </div>
                    </div>
                    <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center  justify-between  flex   rounded-2xl bg-white">
                      <Image
                        className="w-[30px] h-[30px]"
                        src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Box%20(1).svg"
                        alt="box"
                        width={120}
                        height={120}
                      />
                      <div className="w-[auto]">
                        <h2 class="text-[14px] md:text-[18px] ">
                          {data?.propertyStorageType?.mediumItem} Medium
                        </h2>
                      </div>
                    </div>
                    <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center justify-between  flex    rounded-2xl bg-white">
                      <Image
                        className="w-[25px] h-[25px]"
                        src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Box%20(1).svg"
                        alt="box"
                        width={100}
                        height={100}
                      />

                      <div className="w-[auto]">
                        <h2 class="text-[14px] md:text-[18px] ">
                          {data?.propertyStorageType?.largeItem} Large
                        </h2>
                      </div>
                    </div>
                    <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center justify-between  flex    rounded-2xl bg-white">
                      <Image
                        className="w-[20px] h-[20px]"
                        src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Box%20(1).svg"
                        alt="box"
                        width={80}
                        height={80}
                      />
                      <div className="w-[auto]">
                        <h2 class="text-[14px] md:text-[18px] ">
                          {data?.propertyStorageType?.box} Boxes(approx)
                        </h2>
                      </div>
                    </div>
                  </div>
                  {/* <div class="flex items-center justify-center  mt-30">
                    <a
                      class="link font-bold text-center text-blue-600 text-[16px] md:text-[18px] mt-[20px]"
                      href="/images/home/xtended price list.pdf"
                      target="blank"
                    >
                      See Pricing List
                    </a>


                  </div> */}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 ">
              <div className="storagespace-right-heading ">
                <div className="text-[#000000] font-medium text-xl text-wrap md:text-2xl">
                  Storage space in {data?.city}, {data?.state}
                </div>
                <div className="bottom_heading flex items-center  pt-3">
                  {/* <img
                      src="/images/icon/delhincrlocation.jpg"
                      alt="delhincrlocation1"
                    /> */}
                  <IoLocationSharp className="text-lime-500" />

                  <p className="text-[#374151] font-medium text-base ">
                    {data?.city}
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="storage_space_form  flex justify-center items-center   flex-col px-4  mt-8 w-full md:w-[100%] h-auto md:h-[90vh] bg-white rounded-2xl shadow-lg   ">
                    <div className="w-full md:w-[100%] h-[auto] text-start py-2 md:py-5 ">
                      <div class="topmostform flex flex-row md:flex-row gap-2 items-center text-center text-lg md:text-xl p-2">
                        {/* <div class="text-[#E29A9A] font-medium leading-7 md:mb-0">
                          <del>&#8377;{originalAmount}</del>
                        </div> */}
                        {originalAmount > data?.perDayRentalAmount && (
                          <div className="text-[#E29A9A] font-medium leading-7 md:mb-0">
                            <del>&#8377;{originalAmount}</del>
                          </div>
                        )}
                        <div class="text-[#374151] font-semibold leading-7 flex items-center">
                          <span>&#8377;{data?.perDayRentalAmount}</span>
                          <span>/Day</span>
                        </div>
                      </div>

                      <div className="datefrom_to flex w-full gap-2">
                        <div className="border rounded-md px-2 w-1/2">
                          <label
                            for="start"
                            className="text-xs font-semibold text-[#000000]"
                          >
                            From
                          </label>

                          <DatePicker
                            className="w-full border-none rounded-lg py-1"
                            onChange={handleStartDateChange}
                            format="DD/MM/YYYY"
                            disabledDate={(current) =>
                              current && current < moment().endOf("day")
                            }
                          />
                        </div>
                        <div className="border rounded-md px-2 w-1/2">
                          <label
                            for="start"
                            className="text-xs font-semibold text-[#000000]"
                          >
                            To
                          </label>

                          <DatePicker
                            className="w-full border-none rounded-lg py-1"
                            onChange={handleEndDateChange}
                            format="DD/MM/YYYY"
                            disabledDate={(current) =>
                              current && current < moment().endOf("day")
                            }
                          />
                        </div>
                      </div>
                      <div className="  flex  justify-center items-center font-normal  text-[#6B7280] mt-3 mb-3">
                        <div className="text-sm  ">
                          Minimum {data?.minimumBookingDays} Days Booking
                          Required
                        </div>
                      </div>
                      <div class="flex flex-row md:flex-row  gap-1 mx-[auto] justify-between md:w-[100%]">
                        <div class="flex items-center">
                          <span class="text-[#000000] font-normal text-sm md:text-base">
                            &#8377;{data?.perDayRentalAmount}
                          </span>
                          <span>&#215;</span>
                          <span class="text-[#000000] font-normal text-sm md:text-base md:mr-3">
                            {response?.success?.totalDay} Day
                          </span>
                        </div>
                        <div class="flex items-center gap-4 ">
                          <p class="text-[#6B7280] text-sm font-normal leading-5 mr-3 md:mr-0 m-0">
                            Inclusive of GST 18%
                          </p>

                          <div class="text-[#000000] font-normal text-sm md:text-base leading-7">
                            &#8377;
                            {data?.perDayRentalAmount &&
                            response?.success?.totalDay >=
                              data?.minimumBookingDays
                              ? data.perDayRentalAmount *
                                response.success.totalDay
                              : "0"}
                            {/* &#8377;{(data?.perDayRentalAmount * response?.success?.totalDay)} */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="select_form flex  justify-between items-center w-full md:w-[100%] h-[50px] border border-gray-300 rounded-xl mt-3 mb-3 mr-2 md:mr-0">
                      <div className="flex justify-between   items-center">
                        <div className="flex justify-center items-center">
                          <input
                            type="checkbox"
                            id=""
                            name="Isinsuranceamount"
                            value="Insurance"
                            checked={payload?.Isinsuranceamount}
                            onChange={onChangeHandler}
                            className="w-4 text-center ml-3"
                          />
                          <div className="flex items-center font-medium leading-5 text-lg ml-3">
                            Apply Insurance
                          </div>
                          <div class="relative group ml-5 d-inline-flex">
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.20829 6.37533H7.79163V4.95866H9.20829M9.20829 12.042H7.79163V7.79199H9.20829M8.49996 1.41699C7.56976 1.41699 6.64867 1.60021 5.78928 1.95618C4.9299 2.31215 4.14903 2.8339 3.49129 3.49165C2.1629 4.82004 1.41663 6.62171 1.41663 8.50033C1.41663 10.3789 2.1629 12.1806 3.49129 13.509C4.14903 14.1667 4.9299 14.6885 5.78928 15.0445C6.64867 15.4004 7.56976 15.5837 8.49996 15.5837C10.3786 15.5837 12.1802 14.8374 13.5086 13.509C14.837 12.1806 15.5833 10.3789 15.5833 8.50033C15.5833 7.57013 15.4001 6.64904 15.0441 5.78965C14.6881 4.93026 14.1664 4.1494 13.5086 3.49165C12.8509 2.8339 12.07 2.31215 11.2106 1.95618C10.3512 1.60021 9.43016 1.41699 8.49996 1.41699Z"
                                fill="#C1C1C1"
                              />
                            </svg>
                            <div class="tooltip absolute mt-0 z-1  mb-2 w-64 p-2 bg-lime-500 text-center text-white text-xs rounded-md shadow-lg">
                              Protect stored items against fire, theft and
                              burglary (Insurance)
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="logistic_money  ">
              <div className="mr-3 text-[#374151] font-medium leading-7 text-base">
                {!!calculatedAmount?.logisticsCharge && `₹${calculatedAmount?.logisticsCharge}`}
              </div>
            </div> */}
                    </div>
                    <div className="select_form flex justify-between items-center mr-2 md:mr-0 w-full md:w-[100%] h-[50px] border border-gray-300 rounded-xl">
                      <div className="select_money outline-none bg-transparent">
                        <label for="money"></label>

                        <select
                          name="PerLakh"
                          id="PerLakh"
                          value={
                            payload.Isinsuranceamount ? payload.PerLakh : 1
                          }
                          disabled={!payload.Isinsuranceamount}
                          onChange={onChangeHandler}
                          className="ml-2 text-[#1B1C57]"
                        >
                          <option value="1">1L</option>
                          <option value="2">2L</option>
                          <option value="3">3L</option>
                          <option value="4">4L</option>
                          <option value="5">5L</option>
                        </select>
                      </div>
                      <div className="flex justify-center items-center ">
                        <div className="premium_at text-[#6B7280] font-normal text-xs leading-5 mr-3">
                          Premium at
                        </div>
                        <div className="money_amount mr-3 font-medium text-base leading-7 text-[#374151]">
                          {calculatedAmount?.insuranceAmount &&
                            `₹${calculatedAmount.insuranceAmount}`}
                        </div>
                      </div>
                    </div>

                    <div className="select_form flex  justify-between items-center w-full md:w-[100%] h-[50px] border border-gray-300 rounded-xl mt-3 mb-3 mr-2 md:mr-0">
                      <div className="flex justify-between   items-center">
                        <div className="flex justify-center items-center">
                          <input
                            type="checkbox"
                            id="logistic1"
                            name="IsLogistics"
                            value="Logistics"
                            onChange={onChangeHandler}
                            className="w-4 text-center ml-3"
                          />
                          <div className="flex items-center font-medium leading-5 text-lg ml-3">
                            Opt for Logistics
                          </div>
                          <div class="relative group ml-5 d-inline-flex">
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.20829 6.37533H7.79163V4.95866H9.20829M9.20829 12.042H7.79163V7.79199H9.20829M8.49996 1.41699C7.56976 1.41699 6.64867 1.60021 5.78928 1.95618C4.9299 2.31215 4.14903 2.8339 3.49129 3.49165C2.1629 4.82004 1.41663 6.62171 1.41663 8.50033C1.41663 10.3789 2.1629 12.1806 3.49129 13.509C4.14903 14.1667 4.9299 14.6885 5.78928 15.0445C6.64867 15.4004 7.56976 15.5837 8.49996 15.5837C10.3786 15.5837 12.1802 14.8374 13.5086 13.509C14.837 12.1806 15.5833 10.3789 15.5833 8.50033C15.5833 7.57013 15.4001 6.64904 15.0441 5.78965C14.6881 4.93026 14.1664 4.1494 13.5086 3.49165C12.8509 2.8339 12.07 2.31215 11.2106 1.95618C10.3512 1.60021 9.43016 1.41699 8.49996 1.41699Z"
                                fill="#C1C1C1"
                              />
                            </svg>
                            <div class="tooltip absolute mt-[-80px] z-1   mb-2 w-64 p-2 bg-lime-500 text-center text-white text-xs rounded-md shadow-lg">
                              Choose for logistics in addition to
                              storage (Logistics)
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="logistic_money  ">
                        <div className="mr-3 text-[#374151] font-medium leading-7 text-base">
                          {!!calculatedAmount?.logisticsCharge &&
                            `₹${calculatedAmount?.logisticsCharge}`}
                        </div>
                      </div>
                    </div>

                    <Coupon
                      couponData={calculatedAmount?.allCoupons}
                      setPayload={setPayload}
                      payload={payload}
                      showErrorMessage={showErrorMessage}
                      setShowErrorMessage={setShowErrorMessage}
                    />

                    <div className="gst_sec flex justify-between items-center w-full md:w-[100%] h-auto  text-center   mt-3 mb-3 mr-2">
                      <div className="left_total text-[#000000] font-medium leading-7 text-2xl">
                        Total
                      </div>

                      <div className="inclusive_right flex justify-between items-center">
                        <div className="gst_right text-[#6B7280] font-normal text-sm mr-2 ">
                          Inclusive of GST 18%
                        </div>
                        <div className="gst_money text-[#374151] font-medium text-base leading-7 ">
                          ₹ {calculatedAmount?.totalAmount}
                        </div>
                      </div>
                    </div>
                    <div className="book_button">
                      <button
                        type="submit"
                        className="bg-[#338CFF] text-white shadow-md w-[300px] py-2 rounded-lg mt-2 mb-4"
                      >
                        Book
                      </button>
                    </div>
                    {/* {showErrorMessage.show && (
                  <div className="text-red-500 text-sm">{showErrorMessage.message}</div>
                )} */}
                    {showErrorMessage && (
                      <p className="text-red-500 text-center">
                        {showErrorMessage.text || showErrorMessage.message}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:ml-[100px] p-4 md:max-w-[900px]">
          <div className="flex items-center space-x-4">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Avatar%20Base.svg"
              alt="User Avatar"
              className="rounded-full"
              width={100}
              height={100}
            />
            <div>
              <h2 className="text-xl font-semibold">{data.hostFullName}</h2>
              <p>Joined {data.customerCreatedDate}</p>
              <p>{data.totalCustomerSpace} Spaces</p>
            </div>
          </div>
          <div className="mt-6 bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4 text-[20px] md:text-[30px]">
              Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(trueAmenities).map((key) => (
                <div key={key} className="flex items-start space-x-2">
                  <div className="w-10 h-10 text-xl">
                    {trueAmenities[key].icon}
                  </div>
                  <div>
                    <h4 className="capitalize text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
                      {trueAmenities[key].title}
                    </h4>
                    <p className="text-[16px]">{trueAmenities[key].desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* <button className="mt-4 text-blue-500">Show more &gt;</button> */}
          </div>
          <div className="virtualclass mt-6 p-6 rounded-lg shadow md:flex items-center">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Easy-Storage.webp"
              alt="VR Image"
              className="mr-4"
              width={200}
              height={200}
            />
            <div>
              <h3 className="text-xl font-semibold">
                Easy Storage Services at Xtended Space.
              </h3>
              <p className="text-zinc-500">
                Xtended Space simplifies your warehousing challenges with
                convenient storage solutions for household and business needs.
              </p>
              <Link
                href="/easy-storage"
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Easy Storage
              </Link>
            </div>
          </div>
        </div>

        <section className="otherplace mt-3 mb-3">
          {/* <MultipleItems /> */}
        </section>

        <div class="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md max-w-[1240px] mx-auto my-6 ">
          <h2 class="text-xl font-semibold mb-4 dark:text-white">
            Things to Know
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 class="font-semibold mb-2 dark:text-zinc-300">
                Property Rules
              </h3>
              <ul class="space-y-2 text-zinc-700 dark:text-zinc-400">
                <li>
                  <Image
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/clock%20(1).svg"
                    alt="clock"
                    class="inline mr-2 w-6 h-6"
                    width={24}
                    height={24}
                  />
                  Check-in: After 4:00 PM
                </li>
                <li>
                  <Image
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/clock%20(1).svg"
                    alt="clock"
                    class="inline mr-2 w-6 h-6"
                    width={24}
                    height={24}
                  />
                  Checkout: 10:00 AM
                </li>
                <li>
                  <Image
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Cart%20Vector%20(3).svg"
                    alt="baby"
                    class="inline mr-2 w-6 h-6"
                    width={24}
                    height={24}
                  />
                  Not suitable for infants (under 2 years)
                </li>
                <li>
                  <img
                    src="/images/icon/pets.svg"
                    alt="no pets"
                    class="inline mr-2 w-6 h-6"
                  />
                  No pets
                </li>
                <li>
                  <img
                    src="/images/icon/party (1).svg"
                    alt="no parties"
                    class="inline mr-2 w-6 h-6"
                  />
                  No parties or events
                </li>
              </ul>
            </div>
            <div>
              <h3 class="font-semibold mb-2 dark:text-zinc-300">Safety</h3>
              <ul class="space-y-2 text-zinc-700 dark:text-zinc-400">
                <li>
                  <img
                    src="/images/icon/wind (1).svg"
                    alt="alarm"
                    class="inline mr-2 w-6 h-6"
                  />
                  Carbon monoxide alarm
                </li>
                <li>
                  <img
                    src="/images/icon/smoke1.svg"
                    alt="alarm"
                    class="inline mr-2 w-6 h-6"
                  />
                  Smoke alarm
                </li>
                <li>
                  <Image
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/credit-card%20(1).svg"
                    alt="security deposit"
                    class="inline mr-2 w-6 h-6"
                    width={24}
                    height={24}
                  />
                  Security Deposit - If you damage the property, you may be
                  charged up to $500
                </li>
              </ul>
            </div>
            <div>
              <h3 class="font-semibold mb-2 dark:text-zinc-300">Insurance</h3>
              <ul class="space-y-2 text-zinc-700 dark:text-zinc-400">
                <li>
                  <a href="#" class="text-black">
                    Check the Insurance Policies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-blue-500 dark:text-blue-400 font-bold"
                  >
                    Insurance ›
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="simplyfy_storage flex flex-col md:flex-row items-center justify-between p-8 ">
          <div class="md:w-1/2 pl-2">
            <h1 class="text-[22px] md:text-[48px]   font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Simplify Your Storage Experience with Easy Storage
            </h1>
            <p class="text-zinc-700 text-[17px] md:text-[18px]  mb-6">
              Everything you need about finding the best, safe and affordable
              storage space near you.
            </p>
            <Link
              href="/easy-storage"
              class="flex justify-center items-center  w-[18rem] h-[3rem] px-3 py-4 bg-[#FFFFFF] shadow-custom rounded-lg"
            >
              Explore Easy Storage
            </Link>
          </div>
          <div class="md:w-1/2 flex justify-center">
            <img
              src="/images/list-storage/storage-solutionimg.png"
              alt="Storage Boxes"
              class="max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default storagespace;

export async function getServerSideProps(context) {
  const { propertyId, originalAmount } = context.query;
  const args = `?propertyId=${propertyId}&originalAmount=${originalAmount}`;


  const { req } = context;
  const host = req.headers["host"];

  const isProduction =
    host &&
    (host.includes("stage.xtendedspace.com") ||
      host.includes("localhost") ||
      host.includes("main.d2kyc"));
  let url = `${"https://xtendedspace-web-api.azurewebsites.net"}`;

  if (isProduction) {
    url = `${"https://xtendedspace-apinew.azurewebsites.net"}`;
  }

  const res = await fetch(`${url}/BookingList/GetListingDataById${args}
  `);
  const data = await res.json();
  return {
    props: {
      data: data.data[0],
    },
  };
}
