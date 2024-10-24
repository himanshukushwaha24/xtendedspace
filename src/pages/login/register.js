import {
  authUserOtpVerify,
  emailPhoneOtpVerify,
  newUserRegister,
  registerAuthUserOtpVerify,
  registerResendOtp,
  resendEmailOtp,
} from "@/service/authService";
import Otpinput from "@/sharedComponent/otpVerify";
import SimpleSlider from "@/sharedComponent/slider15";
import { localStorageManager } from "@/util/common";
import { INDIA_STATE } from "@/util/constant";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRef } from "react";

// import { servivePinCode } from "@/util/constant";
import { getCityNearby } from '@/service/storageService';
import OTPCounter from "@/sharedComponent/otpCounter";
import EmailOtpinput from "@/sharedComponent/EmailOtpVerify";
export default function register({ phoneNumber }) {
  const [firstName, setFirstName] = useState("");
  const [data, setData] = useState({ country: "india", Pincode: "", phoneNumber: phoneNumber || ""  });
  const [error, setError] = useState();
  const [otpShow, setOtpShow] = useState(false);
  const [otpvalue, setOtpvalue] = useState();
  const [emailotpvalue, setemailOtpvalue] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [multipleError, setMultipleError] = useState();
  const [imageFiles, setimageFiles] = useState();
  const [addressNearby, setAddressNearby] = useState();
  const apiCallInitiated = useRef(false);
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  function capitalizeFirstChar(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleImageClick = () => {
    document.getElementById('fileInput').click();
  };


  const fetchNearbyCities = async () => {
    try {
      const args = `?pinCode=${data.Pincode}`;
      const response = await getCityNearby(args)

      if (response.success) {
        setAddressNearby(response.success);
        setData((prevData) => ({
          ...prevData,
          District: response.success[0].district,
          City: response.success[0].city,
          State: response.success[0].state,
        }));

      } else {
        console.error("Failed to fetch nearby cities", response.error);
        setError(response.error?.error);
      }
    } catch (error) {
      console.error("Error fetching nearby cities", error);
    }
  };
  useEffect(() => {
    if (data.Pincode?.length === 6) {
      if (data.Pincode) {
        fetchNearbyCities();
      } else {
        setError("Sorry, Service not available");
      }
    }
  }, [data.Pincode]);

  useEffect(() => {
    const storedData = localStorageManager.getValue('landing_page_data');
  
    if (storedData && !apiCallInitiated.current) {
      const parsedData = JSON.parse(storedData);
      setData((prevData) => ({
        ...prevData,
        phoneNumber: parsedData.Mobile // Ensure phoneNumber is set correctly
      }));
  
      const fetchData = async () => {
        setLoader(true);

        const formData = new FormData();
        formData.append("userType", "User");
        formData.append("PhoneNumber", parsedData.Mobile);
        formData.append("email", parsedData.Email);
        formData.append("firstname", parsedData.Name);
        formData.append("lastName", parsedData.Name);
  
        const response = await newUserRegister(formData);
        setLoader(false);

        if (response.success) {
          setError("");
          setOtpShow(true);
          localStorageManager.setValue("landing_page_data", "");
        }
      };
      apiCallInitiated.current = true;
      fetchData();
    }
  }, []); 
  if (loader) {
    return <div></div>;
  }
  const handleFileChange = (e) => {
    // Handle file selection here
    const file = e.target.files[0];
    setimageFiles(file);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError(undefined);
    setMultipleError({ ...multipleError, [capitalizeFirstChar(name)]: "" });

    if (name === "firstname") {
      setMultipleError({ ...multipleError, ["FirstName"]: "" });

    }

  };
  const onsubmitHandler = async (event) => {
    event.preventDefault();
 if (isSubmitting) return;
    setIsSubmitting(true);
    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, data[item]);
    });
    if (imageFiles) {
      formData.append("imageFiles", imageFiles);
    }

    const response = await newUserRegister(formData);
    
    if (response.success) {
      setOtpShow(true);
    } else {
      if (response?.error?.title === "Registration Failed" && response?.error?.text === "User is already registered") {
        setError("User is already registered");
      } else if (response?.error?.title === "One or more validation errors occurred.") {
        setMultipleError(response.error?.errors);
      } else {
        setError(response.error?.text || "An Error occurred");
      }
      setIsSubmitting(false);

    }
    // } else {
    //   if (
    //     response?.error?.title === "One or more validation errors occurred."
    //   ) {
    //     setMultipleError(response.error?.errors);
    //   }
    //   //  document.getElementById("myform").reset();
    //   setError(response.error.text || "An Error occured");
    // }
    // console.log("response", error);

  };




  const handleSubmitOtp = async (e) => {
    e.preventDefault();
  
   
    if (!otpvalue) {
      setError({ text: "Please enter otp" });
      return
    }
    let newOtpValue = '';
    const allKeys = Object.keys(otpvalue);
    allKeys.forEach((item) => {
      newOtpValue += otpvalue[item];
    });

    // let newemailOtpValue = '';
    // const allKeysEmail = Object.keys(emailotpvalue);
    // allKeysEmail.forEach((item) => {
    //   newemailOtpValue += emailotpvalue[item];
    // });

    const getArgs = `?Number=${data.phoneNumber}&Code=${newOtpValue}`;
   
    const formData = new FormData();
    // formData.append("Email", data.email);
    formData.append("Phone", data.phoneNumber);
    // formData.append("EmailOtp", newemailOtpValue);
    formData.append("MobileOtp", newOtpValue);
    formData.append("UserType", "User");

    const res = await registerAuthUserOtpVerify(getArgs);
    setOtpvalue();
    setemailOtpvalue(); //
   
    if (res.success) {
      localStorageManager.setValue(
        "userDetails",
        JSON.stringify(res.success.data)
      );
      setOtpShow(true);
      const { callback } = router.query;
      if (callback) router.push("/" + callback);
      else router.push("/");
   


      // setOtpShow(true)
    } else {
      setError(res.error);
    }
  
  };

  const resendOtp = async () => {
    const args = `?mobileNumber=${data.phoneNumber}&userType=User`

    const response = await registerResendOtp(args);
    setOtpvalue()
    if (response.success) {
      setError("");
      setOtpShow(true);
    } else {
      setError(response.error);
    }
  };

  const resendEmailOtpHandler = async () => {
    const args = `?Email=${data.email}&userType=User`

    const response = await resendEmailOtp(args);
    setOtpvalue()
    if (response.success) {
      setError("");
      setOtpShow(true);
    } else {
      setError(response.error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <SimpleSlider />
          </div>

          <div className="col-md-6">
            <div>
              <section class="bg-gray-50  mt-3">
                <div className="flex justify-center items-center pt-4 pb-4">
                  <a href="/">
                    <img
                      src="/images/logo/XtendedSpace.webp"
                      alt=""
                      className="w-[200px] h-auto"
                    />
                  </a>
                </div>

                <div class="flex flex-col items-center justify-center px-0 py-8 mx-auto  lg:py-0">
                  <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 class="text-2xl  text-[#1B1C57] font-semibold leading-tight tracking-tight  md:text-2xl  flex justify-center items-center">
                        Welcome To Xtended Space
                      </h1>
                      <p className="flex justify-center items-center font-normal text-base text-[#374151]">
                        Please Register your account to continue
                      </p>
                      {otpShow ? (
                        <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                              Enter OTP
                            </h1>
                            <form
                              class="space-y-4 md:space-y-6"
                              onSubmit={handleSubmitOtp}
                            >
                              <p className="mt-0">Mobile OTP</p>
                              <Otpinput

                                setOtpvalue={setOtpvalue}
                                otpvalue={otpvalue}
                              />
                              <div>
                                <OTPCounter onClick={resendOtp} />
                              </div>
                             
                              <button
                                type="submit"
                                class="w-full text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600"
                              >
                                Verify
                              </button>
                              {error && (
                                <p className="text-base text-danger">
                                  {error?.text}
                                </p>
                              )}
                            </form>
                          </div>
                        </div>
                      ) : (
                        <form
                          id="myform"
                          class="space-y-4 md:space-y-6"
                          onSubmit={onsubmitHandler}
                        >
                          <div className="flex gap-4  ">
                            <div className="labelFirstname w-1/2">
                              <label
                                htmlFor="firstname"
                                class="block mb-2 text-sm font-medium text-[#1B1C57] "
                              >
                                First Name
                                <span className="text-[#C60909]">*</span>
                              </label>
                              <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="First Name"
                                required=""
                                onChange={onChange}

                                // value={firstName}
                                // onChange={(e) =>{
                                //   setFirstName(e.target.value);
                                //   setError({...error, firstname:""});
                                // }}
                                className="bg-gray-50 border border-gary-300 text-gary-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                              />
                              {multipleError && multipleError.FirstName && (
                                <p className="text-sm text-red-500">
                                  {multipleError.FirstName[0]}
                                </p>
                              )}
                            </div>
                            <div className="labelLastname w-1/2">
                              <label
                                htmlFor="lastname"
                                class="block mb-2 text-sm font-medium text-[#1B1C57] "
                              >
                                Last Name
                                <span className="text-[#C60909]">*</span>
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                id="lastname"
                                className="bg-gray-50 border border-gary-300 text-gary-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                                placeholder="Last Name"
                                required=""
                                onChange={onChange}
                              />
                              {multipleError && multipleError.LastName && (
                                <p className="text-sm text-red-500">
                                  {multipleError.LastName[0]}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="phone"
                              class="block mb-2 text-sm font-medium text-[#1B1C57] "
                            >
                              Phone Number<span className="text-[#C60909]">*</span>
                            </label>

                            <input
                              type="number"
                              name="phoneNumber"
                              id="phone"
                              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                              placeholder="Enter your Phone Number"
                              required=""
                              onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
                              value={data.phoneNumber}
                              onChange={onChange}

                            />
                            {multipleError && multipleError.PhoneNumber && (
                              <p className="text-sm text-red-500">
                                {multipleError?.PhoneNumber[0]}
                              </p>
                            )}
                          </div>
                          {/* <div>
                          <label
                            htmlFor="phone"
                            class="block mb-2 text-sm font-small text-gray-900 "
                          >
                           Password
                          </label>
                         
                          <input
                            type="password"
                            name="password"
                            id="phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                            placeholder="Enter your Phone Number"
                            required=""
                            onChange = {onChange}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            class="block mb-2 text-sm font-small text-gray-900 "
                          >
                           Confirm Password
                          </label>
                         
                          <input
                            type="password"
                            name="confirmPassword"
                            id="phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                            placeholder="Enter your Phone Number"
                            required=""
                            onChange = {onChange}
                          />
                        </div> */}
                          <div className="RegiEmailId">
                            <label
                              for="emailid"
                              class="block mb-2 text-sm font-medium text-[#1B1C57] "
                            >
                              Email Id<span className="text-[#C60909]">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                              placeholder="Enter Your Email"
                              required=""
                              onChange={onChange}
                            />
                            {multipleError && multipleError.Email && (
                              <p className="text-base text-red-500">
                                {multipleError.Email[0]}
                              </p>
                            )}
                          </div>
                          {/* <div className="Adressline ">
                            <label
                              for="address"
                              class="block mb-2 text-sm font-medium text-[#1B1C57] "
                            >
                              
                            </label>
                            <input
                              type="address"
                              name="addressLine1"
                              id="address"
                              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                              placeholder="Address Line 1"
                              required=""
                              onChange={onChange}
                            />
                            <input
                              type="address"
                              name="addressLine2"
                              id="address"
                              class="bg-gray-50 border border-gray-300 mt-4 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                              placeholder="Address Line 2"
                              required=""
                              onChange={onChange}
                            />
                          </div>
                          <div className="flex gap-4">
                            <div className="labelPin">
                              <label
                                htmlFor="Pincode"
                                className="block mb-2 text-sm font-medium text-[#1B1C57]  "
                              >
                                Pincode
                               
                              </label>
                              <input
                                type="tel"
                                name="Pincode"
                                id="Pincode"
                                onChange={onChange}
                                className="outline-none register_login h-auto bg-gray-50 border border-gary-300 text-gary-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[150px] p-2.5   "
                                placeholder="Enter Your Pin No"
                                required=""

                              />
                        
                            </div>
                            <div className="labelcity">
                              <label
                                htmlFor="cityname"
                                class="block mb-2 text-sm font-medium text-[#1B1C57] "
                              >
                                City
                               
                              </label>
                              <select
                                className="bg-gray-50 border border-gary-300 text-gary-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[150px] p-2.5   "
                                name="city"
                                id="country"
                                onChange={onChange}
                              >

                                {addressNearby?.map(({ city }) => (
                                  <>
                                    <option value={city}>{city}</option>
                                  </>
                                ))}

                              </select>
                              {multipleError && multipleError.City && (
                                <p className="text-base text-red-500">
                                  {multipleError.City[0]}
                                </p>
                              )}
                         
                            </div>

                          </div>
                          <div className="flex gap-4">
                            <div className="labelDis">
                              <label
                                htmlFor="districtName"
                                class="block mb-2 text-sm font-medium text-[#1B1C57]  "
                              >
                                District
                               
                              </label>
                              <input
                                className="bg-gray-50 border border-gary-300 text-gary-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[150px] p-2.5   "
                                name="district"
                                id="country"
                                onChange={onChange}
                                value={addressNearby && addressNearby[0].district}

                              />
                              {multipleError && multipleError.District && (
                                <p className="text-base text-red-500">
                                  {multipleError.District[0]}
                                </p>
                              )}

                        
                            </div>
                            <div className="labelstate">
                              <label
                                htmlFor="state"
                                class="block mb-2 text-sm font-medium text-[#1B1C57] "
                              >
                                State
                                
                              </label>
                              <input
                                className="bg-gray-50 border border-gary-300 text-gary-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[150px] p-2.5   "
                                name="state"
                                id="country"
                                onChange={onChange}
                                value={addressNearby && addressNearby[0].state}
                              />

                              {multipleError && multipleError.State && (
                                <p className="text-base text-red-500">
                                  {multipleError && multipleError.State[0]}
                                </p>
                              )}
                            </div>

                          </div>
                          <div className="AdharRegi">
                            <label
                              for="AdharRegistration"
                              class="block mb-2 text-sm font-medium text-[#1B1C57] "
                            >
                              Aadhaar No 
                              <span className="text-gray-400">(Optional)</span>
                            </label>
                            <div className="flex items-center border rounded-md pr-2">
                              <input
                                type="tel"
                                name="adhaarNo"
                                id="aadhaar"
                                class="bg-white  outline-none border-none text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                                placeholder="Enter Your Aadhaar No"
                                required=""
                                onChange={onChange}
                              />
                              <img
                                src="/images/icon/Paperclip Rounded.svg"
                                alt="paperclip"
                                className="ml-2"
                                onClick={handleImageClick}

                              />
                              <input
                                type="file"
                                name="imageFiles"
                                id="fileInput"
                                style={{ display: 'none' }}
                                onChange={handleFileChange} />
                            </div>
                            {imageFiles && <p className="text-right break-words">{imageFiles.name}</p>}
                          </div>
                          <div>
                            <label
                              for="password"
                              class="block mb-2 mt-2 text-sm font-medium text-[#1B1C57] "
                            >
                              Password
                              <span className="text-[#C60909]">*</span>
                            </label>
                            <div className="flex  justify-between items-center border rounded-md">
                              <input
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                onChange={onChange}
                                id="password"
                                placeholder="Enter Your Password"
                                
                                class="bg-white  outline-none border-none text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                                required=""
                              />

                              <div onClick={togglePasswordVisibility} className="cursor-pointer flex justify-center">
                                <img
                                  src={passwordVisible ? '/images/icon/eyetracking.svg' : '/images/icon/Eye.svg'}
                                  alt=""
                                  className="text-[#1B1C57]"
                                /></div>
                            </div>
                            {multipleError && multipleError.Password && (
                              <p className="text-xs text-red-500">
                                {multipleError.Password[0]}
                              </p>
                            )}
                          </div>
                          <div>
                            <label
                              for="password"
                              class="block mb-2 mt-2 text-sm font-medium text-[#1B1C57] "
                            >
                              Confirm Password
                              <span className="text-[#C60909]">*</span>
                            </label>
                            <div className="flex justify-between items-center border rounded-md">
                              <input
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                name="confirmPassword"
                                id="password"
                                placeholder="Enter Your Password"
                                class="bg-white outline-none border-none text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                                required=""
                                onChange={onChange}
                              />

                              <div onClick={toggleConfirmPasswordVisibility} className="cursor-pointer flex justify-center">
                                <img
                                  src={confirmPasswordVisible ? '/images/icon/eyetracking.svg' : '/images/icon/Eye.svg'}
                                  alt=""
                                  className="text-[#1B1C57]  "
                                /></div>
                            </div>
                          </div> */}
                          {multipleError && multipleError.ConfirmPassword && (
                            <p className="text-xs text-red-500 ">
                              {multipleError.ConfirmPassword[0]}
                            </p>
                          )}
                          <div>
                            {/* <p className="text-[12px] text-[#374151]">
                              By continuing, you agree to
                              <a href="/terms-and-conditions" target="_blank">
                                <span className="text-blue-500 underline ml-1 mr-1">
                                  Terms & Conditions
                                </span>
                              </a>
                              and <br />
                              <a href="/privacy-policy" target="_blank">
                                <span className="text-blue-500 underline">
                                  Privacy Policy
                                </span>
                              </a>
                            </p> */}
                          </div>
                          <button
                            type="submit"
                    disabled={isSubmitting}

                            class="w-full text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600"
                          >
                            Register
                          </button>
                          {error && (
                            <p className="text-base text-danger">
                              {/* {error?.text} */}
                              {error}
                            </p>
                          )}
                          <p className="text-base text-danger">
                            {data?.text}
                          </p>
                          <div className="text-center">
                            <p class="text-sm font-[16px]  text-[#1B1C57] ">
                              Already have an account?
                              <Link
                                href="login"
                                className="text-[#8DC63F] font-semibold"
                              >
                                Login
                              </Link>
                            </p>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                  {/* <div className="flex whitespace-nowrap md:flex-wrap justify-start text-center items-start font-normal text-xs md:text-base gap-[10px] md:gap-[10px] mt-[10vh] md:mt-[10vh]">
                    <a href="/" className="whitespace-nowrap text-[#374151]">
                      Home
                    </a>
                    <a href="/faq" className="whitespace-nowrap text-[#374151]">
                      FAQ
                    </a>
                    <a
                      href="/cancellation-policy"
                      className="whitespace-nowrap text-[#374151]"
                    >
                      Cancellation Policy
                    </a>
                    <a
                      href="/terms-and-conditions"
                      className="whitespace-nowrap text-[#374151]"
                    >
                      Terms & Conditions
                    </a>
                    <a
                      href="/privacy-policy"
                      className="whitespace-nowrap text-[#374151] "
                    >
                      Privacy Policy
                    </a>
                  </div> */}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
