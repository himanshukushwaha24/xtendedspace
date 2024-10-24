import Image from "next/image";
import { useEffect, useState } from "react";
import SimpleSlider4 from "@/sharedComponent/slider6";
import { easyStorage, easyStoragestage1 } from "@/service/storageService";
import { getUserId, localStorageManager } from "@/util/common";
import HeaderMenu from "@/components/header/header";
import Footer from "../../components/footer";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import Myform from "../../util/contactform";
import Head from "next/head";

export default function Home() {
  const [data, setData] = useState();
  //   {
  //   StorageType: "1 BHK",
  //   DurationInMonth: "1",
  //   IsLogisticsCharge: true,
  //   PerLakh: 1,
  //   CouponId: "",
  //   // CouponCode:0,
  //   IsInsuranceAmount: true,
  //   City: "Noida",
  //   Floor: "",
  //   StorageRequirement: "1 BHK"

  // }
  const [customCoupon, setCustomCoupon] = useState();
  const [userId, setUserId] = useState();
  const [preData, setPreData] = useState();
  const router = useRouter();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const EasyStorageId = searchParams.get("easyStorageId");
  const getCalculation = async () => {
    if (!data) {
      return;
    }
    let args = `?StorageType=${data?.StorageType}&DurationInMonth=${data?.DurationInMonth}&IsLogisticsCharge=${data?.IsLogisticsCharge}&StorageRequirement=${data?.StorageRequirement}`;
    args += `&IsInsuranceAmount=${!!data?.IsInsuranceAmount}`;
    if (data.PerLakh) {
      args += `&PerLakh=${data.PerLakh}`;
    }

    if (data?.CouponId) {
      args += `&CouponId=${data?.CouponId || customCoupon}`;
    }
    const response = await easyStorage(args);

    if (response.success) {
      setPreData(response.success);
    } else {
      if (response?.error) {
        removeCoupon();
        setData({ ...data, CouponId: 0 });
        // alert(response.error.text)
        setShowErrorMessage(true);
      }
    }
  };

  // function handleButtonClick(buttonId) {
  //   setData({ ...data, StorageType: buttonId });
  // }

  function handleButtonClick(buttonId) {
    if (buttonId === "More Than 4 BHK") {
      window.open(
        "https://web.xtendedspace.com/storage-services-delhi-ncr",
        "_blank"
      );
      setData({ ...data, StorageType: "1 BHK" }); // Reset to "1 BHK"
      localStorageManager.setValue(
        "easyStorageData",
        JSON.stringify({ ...data, StorageType: "1 BHK" })
      );
    } else {
      setData({ ...data, StorageType: buttonId, StorageRequirement: buttonId });
    }
  }

  useEffect(() => {
    const userData =
      localStorageManager.getValue("userDetails") &&
      JSON.parse(localStorageManager.getValue("userDetails"));
    setUserId(userData?.userId);
    if (!userData?.userId) {
      router.push("/login?callback=/easy-storage"); // Navigate to the login page
    }
  }, [router]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newFilter = {
      ...data,
      [name]: type === "checkbox" ? checked : value,
    };
    if (name === "IsInsuranceAmount") {
      if (checked) {
        newFilter = { ...newFilter, PerLakh: 1 };
      } else {
        newFilter = { ...newFilter, PerLakh: 0 };
      }
    }
    if (type === "checkbox") {
      setData({ ...data, [name]: checked });
    } else {
      setData({ ...data, [name]: value });
      if (name === "CouponId") {
      }
    }
    setData(newFilter);
  };
  const onSubmit = async (e) => {
    // if (!getUserId()) {
    //   // alert("Please login!");
    //   router.push('/login?callback=easy-storage'); // Navigate to the login page
    //   return;
    // }
    if (isSubmitting) return;
    setIsSubmitting(true);
    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.forEach((item) => {
      if (item !== "CouponId") formData.append(item, data[item]);
    });
    formData.append("ApplicationUserId", getUserId());
    if (preData.appliedCoupons) {
      formData.append("CouponId", preData.appliedCoupons.id);
    }
    formData.append("StorageRequirement", data?.StorageType);
    if (EasyStorageId) {
      formData.append("EasyStorageId", EasyStorageId);
    }
    const response = await easyStoragestage1("?Stage=1", formData);

    // if (response.success) {
    //   router.push(/easy-storage/bookspace?EasyStorageId=${response.success?.EasyStorageId.Id}&paymentId=${response.success?.payment.Id});
    // }

    if (response.success) {
      // router.push({
      //   pathname: "/easy-storage/bookspace",
      //   query: {
      //     EasyStorageId: response.success?.EasyStorageId.Id,
      //     paymentId: response.success?.payment.Id,
      //     // data: JSON.stringify(data),
      //     preData: JSON.stringify(preData)
      //   }
      // });
      const urlArr = response.success.url.split("/");
      router.push(`/easy-storage/bookspace/${urlArr[urlArr.length - 1]}`);
    }
    else {  setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const localData = localStorageManager.getValue("easyStorageData");
    const easyStorageData = localData && JSON.parse(localData);
    if (!easyStorageData) {
      setData({
        StorageType: "1 BHK",
        DurationInMonth: "1",
        IsLogisticsCharge: true,
        PerLakh: 1,
        CouponId: "",
        // CouponCode:0,
        IsInsuranceAmount: true,
        City: "Noida",
        Floor: "",
        StorageRequirement: "1 BHK",
      });
    } else {
      setData(easyStorageData);
    }
  }, []);

  useEffect(() => {
    if (data) {
      localStorageManager.setValue("easyStorageData", JSON.stringify(data));
      getCalculation();
      // getInsuranceCharges();
    }
  }, [data]);

  const removeCoupon = () => {
    setData({ ...data, CouponId: 0 });
    setCustomCoupon("");
  };

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="/images/logo/XtendedSpace.webp"
          type="image/x-icon"
        />
        <title>Household and Business Storage Solutions</title>
        <meta
          name="description"
          content="Xtended Space provides affordable household storage services with secure units and easy booking options across India."
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="warehouse storage services, warehouse for storage, storage places for rent, warehouse for storage, warehouse space to rent near me, storage places for rent, household storage services, storage for household items, storage warehouse rental, storage warehouse for rent, small warehouse space for rent"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/easy-storage"
        />
        <meta
          property="og:title"
          content="Secure Warehouse Storage & Rental Services"
        />
        <meta
          property="og:description"
          content="Xtended Space offers secure warehouse storage units for rent, providing safe storage for household and business items in Delhi NCR."
        />
        <meta
          property="og:image"
          content="/images/easy-storage-space-services.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="Small Warehouse Space for Rent"
        />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/easy-storage"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Reliable Storage Warehouse Rentals"
        />
        <meta
          name="twitter:description"
          content="Rent reliable storage warehouse space for household and business needs with Xtended Space, offering flexible and secure solutions."
        />
        <meta
          name="twitter:image"
          content="/images/easy-storage-space-services.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Affordable Household Storage Solutions"
        />
      </Head>

      <div className="max-w-[1550px] mx-[auto] w-[100%]">
        <HeaderMenu />

        <section className="esbanner">
          <div className="escontent">
            <h1 className="text-[24px] md:text-[40px] font-bold capitalize leading-[55px]">
              Xtended Space Storage Units Ease Your Storage.
            </h1>
            <p className="text-[14px] md:text-[24px] text-white  my-[10px]">
              Access secure and convenient storage space at your doorstep.
            </p>
          </div>
        </section>

        <section className="w-[auto] h-[auto]">
          <div class="max-w-[1240px] h-[auto] bg-white mx-auto  md:grid grid-cols-3">
            <div class=" col-span-2 flex flex-col md:flex-row items-center  bg-gray-10 p-[20px]  justify-between">
              <Image
                className="w-[300px] h-[300px]"
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Floor-Plan.webp"
                alt="floorplan"
                width={1200}
                height={1200}
              />
              <div className="ht1 md:px-6">
                <h3 className=" text-[16px] md:text-[24px]   font-semibold text-[#1B1C57]">
                  {/* 1 BHK  */}

                  {preData?.easyStorageType.propertySize}

                  <span className=" text-[12px] md:text-[18px] font-light">
                    ({preData?.easyStorageType.minimumSquareFeet}-
                    {preData?.easyStorageType.maximumSquareFeet} Sq Ft.)
                  </span>
                </h3>
                <p className="text-[14px] md:text-[16px] text-[#232323c9]">
                  Type of items that can be stored here
                </p>

                <div class="flex flex-wrap gap-[10px] md:gap-[15px] justify-evenly md:justify-start mt-4   max-w-[100vw]  rounded-3xl mx-auto">
                  <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px]  items-center justify-between  flex   border  rounded-2xl bg-white">
                    {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-[70px]" height="0.7em" width="0.7em" xmlns="http://www.w3.org/2000/svg">
 <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z">
 </path>
 </svg> */}
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
                        {preData?.easyStorageType.smallItem} Small
                      </h2>
                    </div>
                  </div>
                  <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center  justify-between  flex  border  rounded-2xl bg-white">
                    <Image
                      className="w-[35px] h-[35px]"
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Box%20(1).svg"
                      alt="box"
                      width={120}
                      height={120}
                    />
                    <div className="w-[auto]">
                      <h2 class="text-[14px] md:text-[18px] ">
                        {preData?.easyStorageType.mediumItem} Medium
                      </h2>
                    </div>
                  </div>
                  <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center justify-between  flex   border  rounded-2xl bg-white">
                    <Image
                      className="w-[35px] h-[35px]"
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Box%20(1).svg"
                      alt="box"
                      width={100}
                      height={100}
                    />

                    <div className="w-[auto]">
                      <h2 class="text-[14px] md:text-[18px] ">
                        {preData?.easyStorageType.largeItem} Large
                      </h2>
                    </div>
                  </div>
                  <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center justify-between  flex   border  rounded-2xl bg-white">
                    <Image
                      className="w-[35px] h-[35px]"
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Box%20(1).svg"
                      alt="box"
                      width={80}
                      height={80}
                    />
                    <div className="w-[auto]">
                      <h2 class="text-[14px] md:text-[18px] ">
                        {preData?.easyStorageType.box} Boxes(approx)
                      </h2>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-center  mt-30">
                  <a
                    class="link font-bold text-center text-blue-600 text-[16px] md:text-[18px] mt-[20px]"
                    href="/images/home/xtended price list.pdf"
                    target="blank"
                  >
                    See Pricing List
                  </a>

                  {/* <span><img src="/images/icon/Calculator3.svg" alt=""/></span>
                <a class="link text-center text-[10px] md:text-[14px] my-[20px]" href="#">Estimate your storage space with our area calculator.</a> */}
                </div>
              </div>
            </div>

            <div class="col-span-1  h-[auto] relative p-1 md:p-0">
              <div class="card price-sec md:absolute p-3 md:right-[5px]   z-10 md:bottom-[-60px] storage-price pb-0 shadow border-2 md:border-none">
                <div className="row ">
                  <div className="ht1 col-md-12">
                    <h2 className="text-[18px] md:text-[20px] text-[#1B1C57] font-semibold">
                      Select Storage Space
                    </h2>
                    <p className="text-[12px] md:text-[16px] text-gray-600">
                      Please select your Storage Requirements
                    </p>
                  </div>
                </div>
                <div class="flex flex-wrap gap-[5px] justify-evenly mt-2   max-w-[90vw]">
                  <div class="h-[50px] overflow-hidden w-[100px] items-center justify-center  flex  shadow-xl border  rounded-2xl my-1 ">
                    <div class="  text-sm  text-gray-700 bg-white">
                      <button
                        id="button-1"
                        onClick={() => handleButtonClick("Few")}
                        className={`h-[50px] w-[100px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                          data?.StorageType === "Few" &&
                          "bg-blue-400 !text-white"
                        }`}
                      >
                        <span>Few Items</span>
                      </button>
                    </div>
                  </div>
                  <div class="h-[50px] overflow-hidden w-[100px] items-center justify-center  flex  shadow-xl border  rounded-xl my-1 ">
                    <div class="  text-sm  text-gray-700 bg-white">
                      <button
                        id="button-2"
                        onClick={() => handleButtonClick("1 RK")}
                        className={`h-[50px] w-[100px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                          data?.StorageType === "1 RK" &&
                          "bg-blue-400 !text-white"
                        }`}
                      >
                        <span>1RK</span>
                      </button>
                    </div>
                  </div>
                  <div className="h-[50px] overflow-hidden w-[100px] items-center justify-center  flex  shadow-xl border  rounded-xl my-1 ">
                    <div className="  text-sm  text-gray-700 bg-white">
                      <button
                        id="button-3"
                        onClick={() => handleButtonClick("1 BHK")}
                        className={`h-[50px] w-[100px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                          data?.StorageType === "1 BHK" &&
                          "bg-blue-400 !text-white"
                        }`}
                      >
                        <span>1BHK</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className={`h-[50px] overflow-hidden w-[100px] items-center justify-center  flex  shadow-xl border  rounded-xl my-1`}
                  >
                    <div class="  text-sm   text-gray-700">
                      <button
                        id="button-4"
                        onClick={() => handleButtonClick("2 BHK")}
                        className={`h-[50px] w-[100px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                          data?.StorageType === "2 BHK" &&
                          "bg-blue-400 !text-white"
                        }`}
                      >
                        <span>2BHK</span>
                      </button>
                    </div>
                  </div>
                  <div class="h-[50px] overflow-hidden w-[100px] items-center justify-center  flex  shadow-xl border  rounded-xl my-1 ">
                    <div class="  text-sm  text-gray-700 bg-white">
                      <button
                        id="button-5"
                        onClick={() => handleButtonClick("3 BHK")}
                        className={`h-[50px] w-[100px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                          data?.StorageType === "3 BHK" &&
                          "bg-blue-400 !text-white"
                        }`}
                      >
                        <span>3BHK</span>
                      </button>
                    </div>
                  </div>
                  <div class="h-[50px] overflow-hidden w-[100px] items-center justify-center  flex  shadow-xl border  rounded-xl my-1 ">
                    <div class="  text-sm  text-gray-700 bg-white">
                      <button
                        id="button-6"
                        onClick={() => handleButtonClick("4 BHK")}
                        className={`h-[50px] w-[100px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                          data?.StorageType === "4 BHK" &&
                          "bg-blue-400 !text-white"
                        }`}
                      >
                        <span>4BHK</span>
                      </button>
                    </div>
                  </div>
                  <div class="h-[50px] overflow-hidden w-[200px] items-center justify-center  flex  shadow-xl border  rounded-xl my-1 ">
                    <div class="  text-sm  text-gray-700 bg-white">
                      <a href="/services/business-storage" target="">
                        <button
                          id="button-7"
                          onClick={() => handleButtonClick("1 BHK")}
                          className={`h-[50px] w-[200px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                            data?.StorageType === "More Than 4 BHK" &&
                            "bg-blue-400 !text-white"
                          }`}
                        >
                          <span>More Than 4BHK</span>
                          {/* </Link> */}
                        </button>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="relative inline-block my-2  bg-gray-100">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-2">

                    <FaRegClock />

                  </span>
                  <select
                    class="block  w-full bg-white border border-gray-300 hover:border-gray-500 px-9 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500 focus:ring"
                    name="DurationInMonth"
                    onChange={onChange}
                    value={data?.DurationInMonth}
                  >
                    <option value="1">1 Month</option>
                    <option value="2">2 Months</option>
                    <option value="3">3 Months</option>
                    <option value="4">4 Months</option>
                    <option value="5">5 Months</option>
                    <option value="6">6 Months</option>
                    <option value="7">7 Months</option>
                    <option value="8">8 Months</option>
                    <option value="9">9 Months</option>
                    <option value="10">10 Months</option>
                    <option value="11">11 Months</option>
                  </select>
                </div>
                <div class="white-box">
                  <p class="text[10px] md:text-[13px] text-center text-color-8 center text-sm text-gray-700 mt-2">
                    Minimum 1 Month booking Required
                  </p>

                  <div class="flex items-center justify-between m-2 mt-30">
                    <div class="col-md-5">
                      <p class="text-[14px] md:text-[18px]  text-black font-semibold">
                        ₹{preData?.monthlyDurationCharge} x 1 Month
                      </p>
                    </div>
                    <div class="col-md-7">
                      <p class="text-end fs-16 text-black fw-6 d-flex justify-content-end">
                        <span class="text-[10px] md:text-[13px] text-color-7 fw-4 pr-5  text-gray-700">
                          Inclusive of GST 18%
                        </span>
                        {/* ₹6,176 */}₹{preData?.monthlyDurationCharge}
                      </p>
                    </div>
                  </div>

                  {/* <div class="select-price mt-30">
                  <div class=" border rounded  p-2 flex items-center">
                    <div class="col">
                      <div class="form-group-2">
                        <div class="group-select">
                          <select
                            class="nice-select text-sm text-gray-700"
                            id="insurance"
                            tabindex="0"
                            name="PerLakh"
                            onChange={onChange}
                          >
                            <option value="1">1L</option>
                            <option value="2">2L</option>
                            <option value="3">3L</option>
                            <option value="4">4L</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="col text-end">
                      <p class="text-end fs-16 text-black fw-6">
                        <span class="text-[8px] md:text-[12px] text-color-7 fw-4  text-gray-700 pr-5">
                          Premium at 
                        </span> 
                        ₹2359
                      </p>
                    </div>
                  </div>
                </div> */}
                <div class="relative inline-block group bg-gray-100 w-full  my-2 rounded-lg">
  <span className="flex items-center gap-2 p-3 font-semibold text-gray-700 text-[16px]"><span className="text-[20px]"><IoIosInformationCircleOutline /></span>Insurance & Logistics</span>
  <div class="absolute hidden bg-gray-100  shadow-lg   z-10 group-hover:block w-full px-2 ">
  <div className="select_form flex  justify-between items-center w-full md:w-full h-[50px] border border-gray-300 bg-white rounded-xl mt-3 mb-3 mr-2 md:mr-0">
                    <div className="flex justify-between   items-center">
                      <div className="flex justify-center items-center">
                        <input
                          type="checkbox"
                          id=""
                          name="IsInsuranceAmount"
                          value="IsInsuranceAmount"
                          checked={data?.IsInsuranceAmount}
                          onChange={onChange}
                          className="w-4 text-center ml-3"
                        />
                        <div className="flex items-center font-semibold leading-5 text-[16px] text-gray-700 ml-3">
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
                  <div className="select_form flex justify-between items-center mr-2 md:mr-0 w-full md:w-[100%] h-[50px] border border-gray-300 rounded-xl bg-white">
                    <div className="select_money outline-none bg-transparent">
                      <label for="money"></label>

                      <select
                        name="PerLakh"
                        id="PerLakh"
                        value={data?.IsInsuranceAmount ? data?.PerLakh : 1}
                        disabled={!data?.IsInsuranceAmount}
                        onChange={onChange}
                        className="ml-2 text-gray-700 text-[16px]"
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
                        {preData?.insuranceAmount &&
                          `₹${preData.insuranceAmount}`}
                      </div>
                    </div>
                  </div>

                  <div class="logistic tf-amenities flex justify-between  items-center p-2 my-[20px] bg-white  w-full md:w-full h-[50px] border border-gray-300 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span class="check-box">
                        <label class="flex justify-center w-[auto] items-center">
                          <input
                            class="w-5"
                            type="checkbox"
                            name="IsLogisticsCharge"
                            onChange={onChange}
                            checked={data?.IsLogisticsCharge}
                          />
                          <span class="btn-checkbox "></span>
                          <span class="font-semibold text-gray-700 text-[16px] ml-3">
                            Opt for Logistics
                          </span>

                          <div class="relative group ml-5 d-inline-flex">
                            {/* <span class="text-zinc-500 dark:text-zinc-400 cursor-pointer">i</span> */}
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
                            <div class="tooltip absolute mt-0   mb-2 w-64 p-2 bg-lime-500 text-white text-xs rounded-md shadow-lg">
                              You can choose your own logistics
                            </div>
                          </div>
                        </label>
                      </span>

                     
                    </div>
                    <div class="price-logistic">
                        <p class="text-end fs-16 text-black fw-6">
                          ₹{preData?.logisticsCharge}
                        </p>
                      </div>
                  </div>
  </div>
</div>

                

                  <div className=" max-w-[400px] overflow-hidden">
                    <div class="coupon flex items-center justify-between bg-white rounded-lg px-3  w-full overflow-x-auto overflow-y-hidden">
                      <div className="flex justify-between w-[400px] h-[70px] bg-gray-100 p-2 mx-2  gap-2 rounded  items-center ">
                        <div class="w-[250px]">
                          <input
                            type="text"
                            value={
                              customCoupon ||
                              (isNaN(data?.CouponId) ? data?.CouponId : "")
                            }
                            // onChange={(e)=>{e.target.value && setCustomCoupon(e.target.value)
                            //   setShowErrorMessage(false);
                            //  }}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (!inputValue) {
                                setCustomCoupon(""); // Clear customCoupon state if input is empty
                              } else {
                                setCustomCoupon(inputValue);
                              }
                              setShowErrorMessage(false);
                            }}
                            placeholder="Enter the coupon Code"
                            className="p-1"
                          />
                        </div>
                        <div class="">
                          <button
                            class="text-sm font-semibold text-green-600"
                            onClick={() => {
                              customCoupon &&
                                setData({ ...data, CouponId: customCoupon }); // Ensure the correct coupon ID is set
                            }}
                          >
                            {data?.CouponId === customCoupon
                              ? "Applied"
                              : "Apply"}
                            {/* {preData?.allCoupons.some(coupon => coupon.id === data.CouponId && coupon.couponCode === customCoupon) ? "Applied" : "Apply"} */}
                          </button>
                          <button
                            class="text-sm font-semibold text-gray-600"
                            onClick={() => {
                              removeCoupon();
                              setData({ ...data, CouponId: 0 });
                            }}
                          >
                            Remove
                          </button>
                          {/* <button class="text-sm font-semibold text-green-600" onClick={()=>!!customCoupon && setData({...data,CouponId:customCoupon})}>{data?.CouponId === customCoupon ? "Applied":"Apply"}</button>
  <button class="text-sm font-semibold text-gray-600" onClick={()=>{removeCoupon;setData({...data,CouponId:0})}} >Remove</button> */}
                        </div>
                      </div>

                      {preData?.allCoupons.map((item) => (
                        <div
                          className="flex justify-between w-full  mx-2 bg-gray-100 p-2 rounded  items-center"
                          key={item.couponCode}
                        >
                          <div class="w-[190px] md:w-full mr-4">
                            <div class=" flex items-center  gap-2">
                              <Image
                                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/coupon1.svg"
                                alt="coupon"
                                width={30}
                                height={30}
                              />

                              <p class="text-lg font-semibold text-gray-800">
                                <span class="c-name text-yellow-300">
                                  {item.couponCode}
                                </span>
                              </p>
                              <p class="text-[8px] md:text-[10px] text-gray-600 w-[150px]">
                                Use Coupon code
                              </p>
                            </div>
                            <div class="mt-2">
                              <p class=" text-[8px] md:text-[12px] text-gray-700 lg:text-[16px]">
                                Get cashback upto{" "}
                                {item.amountType === "Percent"
                                  ? `${item.amount}%`
                                  : `₹${item.amount}`}
                              </p>
                            </div>
                          </div>
                          <div class="">
                            <button
                              class="text-sm font-semibold text-green-600"
                              onClick={() => {
                                setCustomCoupon("");
                                setData({ ...data, CouponId: item.id });
                              }}
                            >
                              {item.id === data?.CouponId ? "Applied" : "Apply"}
                            </button>
                            <button
                              class="text-sm font-semibold text-gray-600"
                              onClick={removeCoupon}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {showErrorMessage && (
                      <p className="success-message text-gray-500 font-semibold py-2 px-2">
                        Invalid Coupon Code!
                      </p>
                    )}
                    {/* </div> */}
                    {/* <input type="text" className="w-[150px] text-[10px] px-2" placeholder="Enter coupon code" /> */}

                    <div class="tprice flex justify-between items-center  m-2 p-2 ">
                      <div>
                        <h2 class="font-bold">Total </h2>
                      </div>
                      <div class="d-flex">
                        <p class="mr-15 text-[10px] md:text-[13px] pr-5 text-gray-700">
                          Inclusive of GST 18%
                        </p>
                        <h3 className="text-[20px] md:text-[16px] font-bold">
                          {/* ₹9,135 */}₹{preData?.totalAmount}
                        </h3>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={onSubmit}
                        disabled={isSubmitting}
                        className=" mb-3 text-[12px] md:text-[20px] bg-[#8DC63F] text-white py-2 px-5 border rounded-md"
                      >
                        Book With ₹{preData?.payTokenMoney} Token Money
                      </button>
                    </div>

                    {/* 
                <div class="flex items-center justify-center  mt-30">
                  <a
                    class="link font-bold text-center text-[10px] md:text-[14px] my-[20px]"
                    href="#"
                  >
                    See Pricing List
                  </a>

                  <span><img src="/images/icon/Calculator3.svg" alt=""/></span>
                <a class="link text-center text-[10px] md:text-[14px] my-[20px]" href="#">Estimate your storage space with our area calculator.</a>
                </div> */}
                  </div>
                </div>
                {/* <img
                  src="/static/media/laptop.45ddf500e572fb2f1d35.jpg"
                  alt=""
                /> */}
              </div>
            </div>
          </div>
        </section>

        <>
          <section className="w-[auto] h-[auto] mt-[20px]  md:mt-0   md:p-[100px] pb-0 ">
            <div className=" ">
              <div className="ht1">
                <h2 className="text-[20px] md:text-[32px] text-left text-[#1B1C57] capitalize  font-[600] pl-[20px] md:pl-0 py-4">
                  Advantages for you
                </h2>
              </div>
              <div class="flex flex-wrap gap-[10px] justify-between h-[auto] m-[auto]   max-w-[90vw]   md:border-black rounded-3xl">
                <div class="max-h-[250px] w-[90vw] md:w-[35vw] p-3  ">
                  {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-[70px]" height="0.7em" width="0.7em" xmlns="http://www.w3.org/2000/svg">
<path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z">
</path>
</svg> */}

                  <div className=" flex items-center">
                    <img
                      className="w-[24px] md:w-[40px] h-[24px] md:h-[40px]"
                      src="/images/icon/Sofa2.svg"
                      alt=""
                    />
                    <h2 class="text-[16px] md:text-[24px] font-semibold text-[#1B1C57]">
                      Large Items
                    </h2>
                  </div>
                  <p className="text-[#73788C] capitalize text-[12px] md:text-[18px] ">
                    Such as Double Mattress Bed, Seater Sofa, Dining Table,
                    Dressing Table, washing Machine, Double Door Fridge, etc.
                  </p>
                </div>
                <div class="max-h-[250px] w-[90vw] md:w-[35vw] p-3 ">
                  {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-[70px]" height="0.7em" width="0.7em" xmlns="http://www.w3.org/2000/svg">
<path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z">
</path>
</svg> */}

                  <div className=" flex items-center">
                    <Image
                      className="w-[24px] md:w-[40px] h-[24px] md:h-[40px]"
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Condicioner2.svg"
                      alt="conditioner"
                      width={96}
                      height={96}
                    />
                    <h2 class="text-[16px] md:text-[24px] font-semibold text-[#1B1C57] ">
                      Medium Items
                    </h2>
                  </div>
                  <p className="text-[#73788C] capitalize text-[12px] md:text-[18px]">
                    Dining Chairs, Side Table, Centre Table, Office Chair, Small
                    Cupboard, Foldable Mattress, Split AC.
                  </p>
                </div>
                <div class="max-h-[250px] w-[90vw] md:w-[35vw] p-3 ">
                  {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-[70px]" height="0.7em" width="0.7em" xmlns="http://www.w3.org/2000/svg">
<path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z">
</path>
</svg> */}

                  <div className=" flex items-center">
                    <Image
                      className="w-[24px] md:w-[40px] h-[24px] md:h-[40px]"
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Chair.svg"
                      alt="chair"
                      width={96}
                      height={96}
                    />
                    <h2 class="text-[16px] md:text-[24px] font-semibold text-[#1B1C57] color-blu">
                      Small Items
                    </h2>
                  </div>
                  <p className="text-[#73788C] capitalize text-[12px] md:text-[18px]">
                    Clothes Bags, Buckets, Plastic Chair, Stands, Small Shoe
                    Rack, Air Purifier.
                  </p>
                </div>
                <div class="max-h-[250px] w-[90vw] md:w-[35vw] p-3  ">
                  {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-[70px]" height="0.7em" width="0.7em" xmlns="http://www.w3.org/2000/svg">
<path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z">
</path>
</svg> */}

                  <div className=" flex items-center">
                    <Image
                      className="w-[24px] md:w-[40px] h-[24px] md:h-[40px]"
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Box.svg"
                      alt="box"
                      width={96}
                      height={96}
                    />
                    <h2 class="text-[16px] md:text-[24px] font-semibold text-[#1B1C57] color-blu">
                      Boxes
                    </h2>
                  </div>
                  <p className="text-[#73788C] capitalize text-[12px] md:text-[18px]">
                    Standard size (1.5ft x 1.75ft x 2ft).
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section id="easystorage" class="easystorage bg-[#F7F9FC]">
            <div class="easystorage-text">
              <h2>Door to Door Logistics Services </h2>
              <p>
                Enjoy Door-to-Door Logistics Services at Xtended Space, the
                ultimate P2P AI tech Storage Platform in Delhi NCR. Also,
                experience seamless storage solutions by storing your household
                items.
              </p>
            </div>
            <div class="easystorage-img">
              <Image
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/doorservice.webp"
                alt="image"
                width={500}
                height={500}
              />
            </div>
          </section>
          <section id="easystorage2" className="easystorage ">
            <div class="easystorage-img">
              {/* <!-- <div class="colordiv"></div> --> */}
              <Image
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/safeservice.webp"
                alt="safeservice"
                width={500}
                height={500}
              />
            </div>

            <div class="easystorage-text">
              <h2>Secure and Smart Space Storage with Xtended Space </h2>
              <p>
                Give your belongings a secure and safe space at affordable
                prices. Make your storage process smooth and hassle-free with
                Xtended Space. Experience now!{" "}
              </p>
            </div>
          </section>
          <section id="easystorage" class="easystorage bg-[#F7F9FC]">
            <div class="easystorage-text">
              <h2>Warehouse Service Reach Across Delhi NCR </h2>
              <p>
                Revolutionise your storage experience with the convenient
                warehousing service. We provide a combo of warehouse and
                transportation services across Delhi NCR at a click.{" "}
              </p>
            </div>
            <div id="dncr" class="easystorage-img">
              <Image
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/delhincr.webp"
                alt="delhincr"
                width={500}
                height={500}
              />
            </div>
          </section>
          <section className="w-[auto]  md:p-[100px] mt-2 ">
            <div className="bg-[#F7F9FC]">
              <div className="ht1">
                {" "}
                <h2 className="text-[20px] md:text-[32px] md:text-left font-semibold text-[#1B1C57] p-[20px] md:p-[40px]">
                  Amenities
                </h2>
              </div>

              <div class="flex flex-wrap md:gap-[40px] justify-evenly  max-w-[90vw]  md:border-black rounded-3xl mx-auto">
                <div class="h-[130px] w-[350px] items-center justify-between  flex   ">
                  {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-[70px]" height="0.7em" width="0.7em" xmlns="http://www.w3.org/2000/svg">
<path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z">
</path>
</svg> */}
                  <Image
                    className="w-[3em] h-[3em]"
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/fire.svg"
                    alt="fire"
                    width={30}
                    height={30}
                  />

                  <div className="w-[300px] pl-[20px]">
                    <h2 class="capitalize text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
                      Fire Control
                    </h2>
                    <p className="text-gray-700 text-[16px]">
                      {" "}
                      Advanced fire prevention measures
                    </p>
                  </div>
                </div>
                <div class="h-[130px] w-[350px] items-center justify-between  flex  ">
                  <Image
                    className="w-[3em] h-[3em]"
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/icons8-pest-control-64.webp"
                    alt="pestcontrol"
                    width={48}
                    height={48}
                  />
                  <div className="w-[300px] pl-[20px]">
                    <h2 class="capitalize text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
                      PEST- CONTROL
                    </h2>
                    <p className="text-gray-700 text-[16px]">
                      Ensures a pest-free environment.{" "}
                    </p>
                  </div>
                </div>
                <div class="h-[130px] w-[350px] items-center justify-between  flex   ">
                  <Image
                    className="w-[3em] h-[3em]"
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/icons8-wall-mount-camera-error-30.webp"
                    alt="mountcamera"
                    width={48}
                    height={48}
                  />

                  <div className="w-[300px] pl-[20px]">
                    <h2 class="capitalize text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
                      24 X 7 CCTV
                    </h2>
                    <p className="text-gray-700 text-[16px]">
                      Continuous surveillance for security.
                    </p>
                  </div>
                </div>
                <div class="h-[130px] w-[350px] items-center justify-between  flex   ">
                  <Image
                    className="w-[3em] h-[3em]"
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/icons8-travel-insurance-50.webp"
                    alt="insurance"
                    width={48}
                    height={48}
                  />
                  <div className="w-[300px] pl-[20px]">
                    <h2 class="capitalize text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
                      INSURANCE- PROOF
                    </h2>
                    <p className="text-gray-700 text-[16px]">
                      Protects your belongings.
                    </p>
                  </div>
                </div>
                <div class="h-[130px] w-[350px] items-center justify-between  flex   ">
                  <Image
                    className="w-[3em] h-[3em]"
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/icons8-door-to-door-delivery-64.webp"
                    alt="doortodoor"
                    width={48}
                    height={48}
                  />
                  <div className="w-[300px] pl-[20px]">
                    <h2 class="capitalize text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
                      DOORSTEP SERVICE
                    </h2>
                    <p className="text-gray-700 text-[16px]">
                      Comfortable pickup and delivery.{" "}
                    </p>
                  </div>
                </div>
                <div class="h-[130px] w-[350px] items-center justify-between  flex   ">
                  <Image
                    className="w-[3em] h-[3em]"
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/icons8-warehouse-50.webp"
                    alt="warehouse"
                    width={48}
                    height={48}
                  />
                  <div className="w-[300px] pl-[20px]">
                    <h2 class="capitalize text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
                      RCC-STRUCTURED WAREHOUSE
                    </h2>
                    <p className="text-gray-700 text-[16px]">
                      Concrete infrastructure promises ultimate safety.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="Blogs">
            <div className="self-center my-[50px] text-[18px] md:text-[34px] font-semibold text-[#1B1C57] text-center capitalize  max:max-w-full">
              What Our User Say About Us
            </div>
            <SimpleSlider4 />
          </div>
          {/* <div class="max-w-[1240px] bg-white mx-auto p-2 my-5 md:grid grid-cols-2"><div class="col-span-1 md:w-[80%]"><img src="/static/media/laptop.45ddf500e572fb2f1d35.jpg" alt=""/></div><div class=" col-span-1 flex  justify-center"><h1 class="text-[#00df9a] font-bold my-2">LEARN FROM EXPERTS</h1><p class="my-2 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima porro, possimus cum eligendi, doloremque aliquid numquam vitae error asperiores cupiditate, voluptas optio quaerat quo fugiat et suscipit dicta modi iusto sed facilis officia pariatur magni? Cumque ipsum voluptatum cum,</p><button class="w-[30%] bg-black text-white p-3 rounded">Get started</button></div></div> */}

          <Myform />

          <Footer />
        </>
      </div>
    </>
  );
}
