import FormModal from "@/sharedComponent/modal/formModal";
import React, { useState, useEffect } from "react";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import { MdFlipToFront, MdFlipToBack, MdCheckCircle  } from "react-icons/md";
import {
  easyStorageModalAddress,
  getUserAddress,
  getCityNameByPincode,
  SaveBookingDetails,
  easyStoragestage1Res,
  p2pStorageStage1,
} from "@/service/storageService";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { IoLocationSharp } from "react-icons/io5";

import PayNowButton from "../../easy-storage/bookspace/PayNowButton";

import { getUserId } from "@/util/common";

import Easystorageaddress from "@/sharedComponent/storagecommoncompo/easystorageaddress";
import Easystoragenewaddress from "@/sharedComponent/storagecommoncompo/easystoragenewaddress";
import { servivePinCode } from "@/util/constant";


const ModalBody = ({ setModalShow, fetchUserAddress }) => {
  const [error, setError] = useState();
  const [multipleError, setMultipleError] = useState();
  const [nearbyCities, setNearbyCities] = useState();
  const [addressNearby, setAddressNearby] = useState();


  // const servivePinCode = ["110001","110002","110003","110005","110006","110007","110008","110009","110010","110011","110012","110013","110014","110015","110016","110017","110018","110019","110020","110021","110022","110023","110024","110025","110026","110027","110028","110029","110030","110031","110032","110033","110034","110035","110036","110037","110038","110039","110040","110041","110042","110043","110044","110045","110046","110047","110048","110049","110051","110052","110053","110054","110055","110056","110057","110058","110059","110060","110061","110062","110063","110064","110065","110066","110067","110068","110069","110070","110071","110072","110073","110074","110075","110076","110077","110078","110081","110082","110083","110084","110085","110086","110087","110088","110089","110091","110092","110093","110094","110095","110096","121001","121002","121003","121004","121005","121006","121007","121008","121009"];
  const [data, setData] = useState({
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    State: "",
    Pincode: "",
    IsDefault:""
  });

  // if (response.success) {
  //   setAddressNearby(response.success)
  //   addressNearby[0].District
  //   addressNearby[0].City

  // }

  const fetchNearbyCities = async () => {
    try {
      const args = `?pinCode=${data.Pincode}`;
      const response = await getCityNameByPincode(args)
      
      if (response.success) {
        setAddressNearby(response.success);
        setData((prevData) => ({
          ...prevData,
          City: response?.success?.city,
          State: response?.success?.state,}));
        
      } else {
        console.error("Failed to fetch nearby cities", response.error);
        setError(response.error?.error);
      }
    } catch (error) {
      console.error("Error fetching nearby cities", error);
    }
  };
  useEffect(() => {
    if (data.Pincode.length === 6) {
      if (servivePinCode.includes(data.Pincode)) {
        fetchNearbyCities();
      } else {
        setError("Sorry, Service not available");
      }
    }
  }, [data.Pincode]);

  const onChange = (e) => {
    setError();
    // const { name, value } = e.target; 
     const { name, value, checked } = e.target;

    // If the checkbox is checked, set IsDefault to true, otherwise false
    const isDefault = name === 'IsDefault' ? checked : data.IsDefault;
  
  
    setData((prevData) => ({
      ...prevData,
      [name]: value,
      IsDefault: isDefault,

    }));
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, data[item]);
    });
    formData.append("UserId", getUserId());
    const response = await easyStorageModalAddress(formData);
    if (response.success) {
      // alert("address updated successfully!");
      fetchUserAddress();

      setModalShow(false);
    } else {
      if (
        response?.error?.title === "One or more validation errors occurred."
      ) {
        setMultipleError(response?.error?.errors);
      }
      setError(response.error.errors.text || "An Error occured");
    }
  };
  return (
    <>
      <form class="mt-4" onSubmit={onsubmitHandler}>
        <div class="mb-4">
          <label class="block text-sm font-medium text-zinc-700">
            Enter your Address*
          </label>
          <input
            type="text"
            name="AddressLine1"
            placeholder="Address Line 1"
            required=""
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            name="AddressLine2"
            placeholder="Address Line 2"
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700">
            Pincode*
          </label>
          <input
            type="text"
            name="Pincode"
            placeholder="Enter Pincode"
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {error && <p className="text-red">{error}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700">
              City*
            </label>
              <input
                  type="text"
                  name="City"
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="City"
                  value={addressNearby?.city}
                  onChange={onChange}
                  required
                />
          </div>
          <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700">
            State*
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
            name="State"
            onChange={onChange}
            value={addressNearby && addressNearby?.state}
          />
   
        </div>
        </div>
       

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              name="IsDefault" 
              onChange={onChange}
            />
            <span className="ml-2 text-sm text-zinc-700">
              Set this address as default
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </form>
    </>
  );
};

const EasyBookspace = () => {
  const [addressChangeModel, setAddressChangeModel] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressid] = useState();
  const [isPaymentEnable, setIsPaymentEnable] = useState(false);
  
    
  
  const [data, setData] = useState({});
  const [easyStorageData, seteasyStorageDate] = useState();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const [frontImageUploaded, setFrontImageUploaded] = useState(false);
  const [backImageUploaded, setBackImageUploaded] = useState(false);
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${day}/${month}/${year}`;
  };

  const handleFrontImageChange = (e) => {
    onChange(e);
    if (e.target.files.length > 0) {
      setFrontImageUploaded(true);
    }
  };

  const handleBackImageChange = (e) => {
    onChange(e);
    if (e.target.files.length > 0) {
      setBackImageUploaded(true);
    }
  };

  // const startDate = `${startDate}`
  const onChange = (e) => {
    const { name, value, type,files } = e.target;
    if(type==="file"){
      setData({...data,[name]:files[0]});
    }
    else{
      setData({...data,[name]:value});
    }
    
  
  
    }
 

  const fetchUserAddress = async () => {
    try {
      const userId = getUserId();
      const response = await getUserAddress(`?UserId=${userId}`);
      if (response.success) {
        setAddresses(response.success?.data);
      } else {
        console.error("Error fetching addresses:", response?.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  const router = useRouter();
  const [preData, setPreData] = useState({
 logisticsAmount: "",
insuranceAmount: "",
totalAmountWithCoupon: 0,
totalAmountWithoutCoupon: "",
grandTotal: "",
customerAdhaarNumber: "",
frontImage: "",
backImage: "",
payTokenMoney: "",
  });
  useEffect(() => {
    fetchUserAddress();

    if (router.query.preData) {
      setPreData(JSON.parse(router.query.preData));
    }
  }, [router.query]);
  const handleSubmit = async (e) => {
    const allKeys = Object.keys(data);
    const formData = new FormData();
  
    allKeys.forEach((item) => {
      formData.append(item, data[item]);
    });
    formData.append("CurrentUserId", getUserId()) 
    formData.append("UserAddressId", addressId) 
    formData.append("BookingId", preData.propertyBookingData.id)
    formData.append("PropertyId", preData.propertyBookingData.propertyId)
    formData.append("StartDate", preData.propertyBookingData.startDate)
 
    try {
     
      const response = await SaveBookingDetails("?Stage=2", formData);
      if (response.success) {
        setIsPaymentEnable(true);
        // Navigate to payment page or handle success scenario
      
      } else {
        // Handle error scenario
        console.error("Error saving booking details:", response.error);
      }
    } catch (error) {
      console.error("Error saving booking details:", error);
    }
  }

  useEffect(()=>{
    const {Floor, IsLiftAvailable, AdhaarNumber, AdhaarFrontImage, AdhaarBackImage } = data;
  if(Floor && (IsLiftAvailable || IsLiftAvailable === false) && addressId && AdhaarNumber && AdhaarFrontImage && AdhaarBackImage){
    handleSubmit();

  }
  else{
    setIsPaymentEnable(false);
  }
  

  },[data])

useEffect(()=>{
  const bookingIdArr = window.location.href.split("-");
  const bookingId = bookingIdArr[bookingIdArr.length-1];

  (async()=>{

      const response = await p2pStorageStage1(bookingId);

if (response.success) {

  setPreData(response.success);
}

  })()

},[])



  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%] ">
      <HeaderMenu />
      {/* <div>
        <h2>PreData:</h2>
        <pre>{JSON.stringify(preData, null, 2)}</pre>
        {
          preData.grandTotal
        }
      </div> */}
      <section className="Bookyourspace flex-col md:flex-row flex ml-3 mr-3  ">
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
                  Start Date
                  <span className="font-medium text-sm leading-8 text-[#C60909]">
                    *
                  </span>
                </div>
                <div className=" flex w-full md:w-[290px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB]">
                  <input
                    type="text"
                  
                    name="startDate"
                    className="w-full md:w-[250px] outline-none"
                    value={
                      preData.propertyBookingData?.startDate
                        ? formatDate(preData.propertyBookingData.startDate)
                        : ""
                    }
                 
                  />
                  {/* <DatePicker className="md:w-[290px] border border-solid border-[#D1D5DB] w-full  h-[44px] rounded-lg" onChange={(date, dateString)=>{getDate(dateString); setData({...data,"startDate":dateString })}}  format="DD/MM/YYYY" 
                 disabledDate={(current) => {
                  return current && current < moment().endOf('day');
                  return current && current < moment(customDate, "YYYY-MM-DD");
                }}
    /> */}
                </div>
              </div>
              <div className="w-[298px] h-[81px]">
                <div className="">
                  End Date
                  <span className="font-medium text-sm leading-8 text-[#C60909]">
                    *
                  </span>
                </div>
                <div className="flex w-full md:w-[290px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB]">
                  <input
                    type="text"
                    id="date"
                    name="endDate"
                    className="w-full md:w-[250px] outline-none text-[16px]"
                    value={
                      preData.propertyBookingData?.endDate
                        ? formatDate(preData.propertyBookingData.endDate)
                        : ""
                    }
                    disabled
                  ></input>
                </div>
              </div>
            </div>
            {/* <div class="flex items-center space-x-4 p-4 bg-white shadow rounded-lg"> */}

            <div class="flex-1 ">
              <label class="block  font-normal text-black mb-1 mt-2 ">
                Lift Available
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
              </label>
              <div class="flex space-x-2 ">
                <button
                  type="button"
                  className={`w-[290px] px-4 py-2 rounded ${
                    data?.IsLiftAvailable === true
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-200 text-zinc-800"
                  }`}
                  onClick={() => { setData({...data,["IsLiftAvailable"]:true})}}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`w-[290px] px-4 py-2 rounded ${
                    data?.IsLiftAvailable === false
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-200 text-zinc-800"
                  }`}
                  onClick={() => { setData({...data,["IsLiftAvailable"]:false})}}
                >
                  No
                </button>
                {/* <button class="bg-blue-500 w-[290px]  text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300" onChange={onChange} type="IsLiftAvailable">Yes</button>
                <button class="bg-zinc-200 w-[290px]  text-zinc-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-zinc-300" onChange={onChange} type="IsLiftAvailable">No</button> */}
              </div>
            </div>

            <div class="flex-1 ">
              <label class="block  font-normal text-black mb-1 mt-2">
                Floor 
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
              </label>
              <input
                type="tel"
                name="Floor"
                value={data.Floor}
                onChange={onChange}
                placeholder="Enter Floor"
                class="form-input w-full md:w-[586px] px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                min="0"
                max="20"
              />
            </div>
            <div className="flex-1">
      <label htmlFor="AdharRegistration" className="block mb-1 mt-2 text-sm font-normal text-black dark:text-white">
        Aadhaar No <span className="text-[#C60909]">*</span>
      </label>
      <div className="flex items-center border rounded-md pr-2 w-full md:w-[586px]">
        <input
          type="tel"
          name="AdhaarNumber"
          value={data.AdhaarNumber}
          id="aadhaar"
          className="bg-white outline-none border-none text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Your Aadhaar No"
          onChange={onChange}
        />
        <label className="ml-2 cursor-pointer">
          {frontImageUploaded ? (
            <MdCheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <MdFlipToFront className="w-6 h-6" />
          )}
          <input
            type="file"
            id="adhaarFrontImage"
            name="AdhaarFrontImage"
            accept="image/png,image/jpg,image/jpeg,image/webp" 

            className="opacity-0 inset-0 cursor-pointer z-20 hidden"
            onChange={handleFrontImageChange}
          />
        </label>
        <label className="ml-2 cursor-pointer">
          {backImageUploaded ? (
            <MdCheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <MdFlipToBack className="w-6 h-6" />
          )}
          <input
            type="file"
            id="adhaarBackImage"
            name="AdhaarBackImage"
            accept="image/png,image/jpg,image/jpeg,image/webp" 

            className="opacity-0 inset-0 cursor-pointer z-20 hidden"
            onChange={handleBackImageChange}
          />
        </label>
      </div>
      (Upload the Aadhar Images)
    </div>
            {/* <div className="flex-1 ">
              <label htmlFor="AdharRegistration" className="block mb-2 text-sm font-medium text-[#1B1C57] dark:text-white">
                Aadhaar No <span className=" text-[#C60909]">*</span>
              </label>
              <div className="flex items-center border rounded-md pr-2 w-full md:w-[586px]">
                <input
                  type="tel"
                  name="AdhaarNumber"
                  value={data.AdhaarNumber}
                  id="aadhaar"
                  className="bg-white outline-none border-none text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Your Aadhaar No"
                  onChange={onChange}
                />
                <label className="ml-2 cursor-pointer">
                
                  <MdFlipToFront className="w-6 h-6" />
                  <input
                    type="file"
                    id="adhaarFrontImage"
                    name="AdhaarFrontImage"
                    accept="image/png,image/jpg,image/jpeg,image/webp" 
                          // multiple
                          className="opacity-0  inset-0 cursor-pointer z-20 hidden"
                    onChange={onChange}
                  />
                  
                </label>
                <label className="ml-2 cursor-pointer">
               
                  <MdFlipToBack className="w-6 h-6" />
                  <input
                    type="file"
                    id="adhaarBackImage"
                    name="AdhaarBackImage"

                          className="opacity-0  inset-0 cursor-pointer z-20 hidden"
                    onChange={onChange}
                  />
                </label>
              </div>
            </div> */}

            {/* </div> */}
            {/* <div className="bookyourspace_address flex justify-between items-center w-full md:w-[609px] h-[auto] md:h-[100px]  "> */}
            {/* <div className="w-[154px] h-[29px] font-medium text-[24px] leading-7 mt-3 mb-3 ">
                Your Address
              </div> */}
            <div className="bookyourspace_address flex justify-between items-center w-full md:w-[609px] h-[auto] md:h-[auto] mt-8 mb-3  ">
              <div className="w-[auto] h-[29px] font-medium text-[24px] leading-7  ">
                Your Address
              </div>
              <a
                href="javascript:void(0)"
                className="font-inter font-medium text-lg leading-5 text-[#338CFF]"
                onClick={() => setAddressChangeModel(true)}
              >
                Add New
              </a>

             
            </div>
            {!addresses?.length && <Easystorageaddress fetchUserAddress={fetchUserAddress}/>}
            <Easystoragenewaddress
              addresses={addresses}
              setAddressid={setAddressid}
            />

            <div className="summarysec w-full md:w-[609px] h-[auto]  rounded-[20px] bg-[#F7F9FC] py-4 ">
              <h2 className="w-[110px]  font-inter font-medium text-2xl text-[#1B1C57] mt-2 mb-2  ">
                Summary
              </h2>
              <div className="leading-6">
                <div className="summary-detail justify-evenly w-full md:w-[550px] h-[auto] px-2">
                  <div className=" flex justify-between w-full md:w-[552px] h-[24px] mb-2">
                    <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal whitespace-nowrap text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                      ({preData && preData?.propertyBookingData?.rentalDays} Day) Total rental charges
                    </div>
                    <div className="w-[auto] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                      {/* ₹2359 */}₹{preData && preData.totalRentalCharge}
                    </div>
                  </div>
                  {preData && preData.logisticsAmount > 0 &&  (<>
                  <div className=" flex justify-between w-full md:w-[552px] h-[24px] mb-2">
                    <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                      Logistics & Tax
                    </div>
                    <div className="w-[auto] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                      ₹{preData && preData.logisticsAmount}
                    </div>
                  </div>
                  </>)}
                  {preData && preData.propertyBookingData?.insuranceAmount > 0 &&  (<>
                  <div className=" flex justify-between w-full md:w-[552px] h-[24px] mb-2">
                    <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                      Insurance
                    </div>
                    <div className="w-[auto] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                      ₹{preData && preData.propertyBookingData?.insuranceAmount}
                    </div>
                  </div>
                  </>)}

                   {preData && preData.couponDiscount > 0 &&  (<>

                  <div className=" flex justify-between w-full md:w-[552px] h-[24px]">
                 
                    <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                      Coupon Discount
                    </div>
                    <div className="w-[auto] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                      
                    ₹{preData.couponDiscount}
                    </div>
                  
                  </div>
                    </>)}
                </div>
                <div className="summary_total flex justify-center items-center w-full md:w-[583px] h-[59px] rounded-xl bg-[#8DC63F] px-2 mt-2">
                  <div className="summary_total_inner flex justify-between w-[547px] h-[29px]">
                    <div className="w-[59px] h-[29px] font-inter font-[700px] text-[14px] md:text-[24px] leading-7 text-white px-2">
                      Total
                    </div>
                    <div className="w-[auto] h-[29px] font-inter font-[700px] text-[14px] md:text-[24px] leading-7 text-white">
                      {/* ₹3059 */}₹{preData && preData.grandTotal}
                    </div>
                  </div>
                </div>
                {/* <div className="summaryterm flex justify-center w-full md:w-[562px] h-[66px] mt-3 px-2">
                  <div className="summaryterm_left flex justify-center w-[24px] h-[24px] rounded-md bg-[#8DC63F] px-2">
                    <input
                      type="checkbox"
                      id="tickmark"
                      name="tickmark"
                      value="tickmark"
                      defaultChecked="true"
                    />
                  </div>
                  <div className="summaryterm-right w-full md:w-[auto ] h-[auto] font-inter font-normal text-[12px] md:text-base text-[#374151] px-1">
                    I acknowldge that all the details I provide are accurate to
                    the best of my knowledge & will be shared with the host. And
                    I also accept the
                    <span className="font-inter  font-semibold text-base text-[#338CFF]">
                      Term & Conditions.
                    </span>
                  </div>
                </div> */}
              </div>

              <div className="mobile_buttonopen mt-[60px] md:hidden">
                <PayNowButton
                  paymentId={preData?.propertyBookingData?.id}
                  InfoId={preData?.propertyBookingData?.id}
                  isPaymentEnable={isPaymentEnable}
                  page="booking"
                  propertyId={preData?.propertyBookingData?.propertyId}
                  tokenMoney = {preData?.payTokenMoney}
                />
              </div>

              {/* <div className="applied_coupon   w-full md:w-[609px] h-auto ">
                <div className="applied_coupon_up w-full md:w-[609px] h-[auto] md:h-[80px] bg-white py-3 ">
                  <div className=" w-[180px]  font-inter font-medium text-2xl text-[#1B1C57] ">
                    Applied coupon
                  </div>
                </div>
                <div className="w-full md:w-full h-[auto] md:h-[full]  rounded-lg bg-[#F7F9FC] ">
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
              </div> */}
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
        <div className="bookyourspace_right  w-full md:w-[694px] my-10 h-[auto] bg-[#F7F9FC]">
          {/* <Household /> */}

          <div className="  w-full md:w-[450px] mx-[auto] flex-col flex items-center  bg-white justify-between md:px-4">
            <h3 className="font-bold block md:hidden p-[20px]">Booking For</h3>
         
         {/* {preData.propertyBookingData && preData.propertyBookingData.propertyImages ? ( */}
              <img
                className="w-[auto] h-[300px] rounded"
                src={preData?.propertyDetail?.propertyImages}
                alt="Property"
              />
            {/* ) : (
              <p>Loading property image...</p>
            )} */}
    
                 {/* {preData.propertyDetail.propertyImages}   */}

            <div className=" ">
            <div className="bg-[#FEF2DB] flex items-center gap-2 p-2.5 my-2 rounded-full w-[200px]">
            <img src="/images/icon/ph_house-fill.svg" alt="" />
            <h3 className="text-[15px] font-bold text-[#1B1C57] m-0">{preData?.propertyDetail?.propertyType}</h3>          </div>
              <h3 className=" text-[16px] md:text-[24px] text-left    font-semibold text-[#1B1C57]">
            
               
                  Storage space in {preData?.propertyDetail?.address},{preData?.propertyDetail?.city}
               
              </h3>
              <h2 className="text-[14px] md:text-[20px]  flex items-center py-2 gap-2   font-semibold text-[#1B1C57]">
              <IoLocationSharp className="text-lime-500" /> {preData?.propertyDetail?.state}
              </h2>
              <p className="text-left text-[14px] md:text-[16px] text-[#232323c9] py-2">
              {`Affordable ${preData?.propertyDetail?.propertyType} Storage Space Near ${preData?.propertyDetail?.address2} in ${preData?.propertyDetail?.city}.`}
              
              </p>

              {/* <div class="flex flex-wrap gap-[10px] md:gap-[15px] justify-evenly mt-2  max-w-[100vw]  rounded-3xl mx-auto">
                <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px]  items-center justify-between  flex  shadow-2xl border  rounded-2xl bg-white">
        
                  <img
                    className="w-[35px] h-[35px]"
                    src="/images/icon/Box (1).svg"
                    alt=""
                  />

                  <div className="w-[auto]">
                    <h2 className="text-[14px] md:text-[18px] ">
                      {preData.propertyDetail &&
                        preData.propertyDetail.propertyStorageType.smallItem} 
                      Small
                    </h2>
                  </div>
                </div>
                <div className="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center  justify-between  flex shadow-2xl border  rounded-2xl bg-white">
                  <img
                    className="w-[30px] h-[30px]"
                    src="/images/icon/Box (1).svg"
                    alt=""
                  />
                  <div className="w-[auto]">
                    <h2 className="text-[14px] md:text-[18px] ">
                      {preData.propertyDetail &&
                        preData.propertyDetail.propertyStorageType.mediumItem} 
                      Medium
                    </h2>
                  </div>
                </div>
                <div className="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center justify-between  flex  shadow-2xl border  rounded-2xl bg-white">
                  <img
                    className="w-[25px] h-[25px]"
                    src="/images/icon/Box (1).svg"
                    alt=""
                  />

                  <div className="w-[auto]">
                    <h2 className="text-[14px] md:text-[18px] ">
                      {preData.propertyDetail &&
                        preData.propertyDetail.propertyStorageType.largeItem} 
                      Large
                    </h2>
                  </div>
                </div>
                <div className="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center justify-between  flex  shadow-2xl border  rounded-2xl bg-white">
                  <img
                    className="w-[20px] h-[20px]"
                    src="/images/icon/Box (1).svg"
                    alt=""
                  />
                  <div className="w-[auto]">
                    <h2 className="text-[14px] md:text-[18px] ">
                      {preData.propertyDetail && preData.propertyDetail.propertyStorageType.box} 
                 
                      Boxes(approx)
                    </h2>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="flex justify-between  m-4 mb-0 px-2 w-full">
              <div className="flex  items-center gap-1 mt-3 mb-2 ">
                {/* <button className="text-white font-semibold bg-blue-600 leading-7 p-2 px-3 py-2 mr-5">Book Now</button> */}
                {/* {preData.propertyBookingData && preData.propertyBookingData.appliedCoupons && preData.propertyBookingData.appliedCoupons.amount !== 0 && ( */}
                <div className="flex justify-evenly items-center">
                    
                {preData && preData.couponDiscount > 0 && (
    <del className="text-red-500 font-extralight">
      ₹{preData.totalAmountWithoutCoupon}
    </del>
  )}
                </div>
                {/* )} */}
                <div className="text-lg font-medium ">
                  {/* &#8377; 325 <span>/Day</span> */}₹
                  {preData && preData.grandTotal}
                </div>
              </div>
              <div className="flex  items-center gap-1 mt-3 mb-2 ">
                {/* <button className="text-white font-semibold bg-blue-600 leading-7 p-2 px-3 py-2 mr-5">Book Now</button> */}
                <div className="flex justify-evenly items-center">
                  {/* Sq.Ft: {preData.easyStorageType.minimumSquareFeet}-{preData.easyStorageType.maximumSquareFeet} ft ({preData.easyStorageType.propertySize}  ) */}
                  Sq.Ft: 
                  {preData.propertyDetail &&
                    preData.propertyDetail.propertyStorageType.minimumSquareFeet}
                  -
                  {preData.propertyDetail &&
                    preData.propertyDetail.propertyStorageType.maximumSquareFeet} 
                  ft (
                  {preData.propertyDetail &&
                    preData.propertyDetail.propertyStorageType.propertySize}
                   )
                </div>
              </div>
            </div>
          </div>
          <div className="mobile_buttonopen  hidden md:block">
          <PayNowButton
                  paymentId={preData?.propertyBookingData?.id}
                  InfoId={preData?.propertyBookingData?.id}
                  isPaymentEnable={isPaymentEnable}
                  page="booking"
                  propertyId={preData?.propertyBookingData?.propertyId}
                  tokenMoney = {preData?.payTokenMoney}
                />
          </div>
        </div>
      </section>

      <FormModal
        modalShow={addressChangeModel}
        setModalShow={setAddressChangeModel}
        ModalBody={ModalBody}
        className="addressAdd"
        size={"md"}
        title="Address"
        fetchUserAddress={fetchUserAddress}
      />
      <Footer />
    </div>
  );
};

export default EasyBookspace;
