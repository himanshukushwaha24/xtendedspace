import React, { useState } from 'react';
import {SaveMultipleStorageInMumbai} from "@/service/storageService";
import { useSearchParams } from "next/navigation";
import { submitForm } from "@/util/common";
import Hubspot from "@/pages/hubspot";
import { useRouter } from "next/router";
const Form = ({ apiFunction }) => {
  // State to manage form input values
  const [data, setData] = useState({
    StorageType: '',
    Name: '',
    Mobile: '',
    Email: '',
    Location: "n/a",
  });

  // State to manage form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hubspotFormSubmit, setHubspotFormSubmit]  = useState(false)
  const [generalError, setGeneralError] = useState("");
  // State to manage errors
  const [errors, setErrors] = useState({
    nameError: '',
    mobileError: '',
    emailError: '',
    formError: '',
  });

  // Handle input changes
  const validateMobile = (mobile) => /^0?[0-9]{10}$/.test(mobile);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email validation regex
  const router = useRouter(); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Reset errors on input change
    setErrors(prevErrors => ({ ...prevErrors, [`${name.toLowerCase()}Error`]: '' }));

    if (name === 'Mobile' && !validateMobile(value)) {
      setErrors(prevErrors => ({ ...prevErrors, mobileError: 'Please enter a valid mobile number.' }));
    } 
    if (name === 'Email' && !validateEmail(value)) {
      setErrors(prevErrors => ({ ...prevErrors, emailError: 'Please enter a valid email address.' }));
    }
    setGeneralError("");
    setErrors("")
  };

  const searchParams = useSearchParams();
  const utm_source = searchParams.get("utm_source");
  const utm_medium = searchParams.get("utm_medium");
  const utm_campaign = searchParams.get("utm_campaign");
  const utm_content = searchParams.get("utm_content");
  const utm_term = searchParams.get("utm_term");
  const gclid = searchParams.get("gclid");
  const referrer = searchParams.get("referrer");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (data.Name && validateMobile(data.Mobile)) {
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));

      if (utm_source) {
        formData.append("UTM_Source", utm_source);
        formData.append("UTM_Medium", utm_medium);
        formData.append("UTM_Campaign", utm_campaign);
        formData.append("UTM_Content", utm_content);
        formData.append("UTM_Term", utm_term);
        formData.append("Gclid", gclid);
        formData.append("Referrer", referrer);
      }

      try {
        const response = await apiFunction(formData);
        submitForm(formData);
        if (response.success) {
          setHubspotFormSubmit(true)
          setTimeout(() => {
          if (response.success?.isExistingUser) {
            router.push('/login?callback=easy-storage');
          } else  {
            router.push('/signup?callback=easy-storage');
          }
        }, 250);
          
        } else {
          if (response.error?.title === "One or more validation errors occurred.") {
            setErrors(prevErrors => ({ 
              ...prevErrors, 
              formError: Array.isArray(response.error.errors) ? response.error.errors.join(', ') : response.error.errors.toString()
            }));
          }
          if (response?.error?.errors) {
            // Ensure generalError is a string
            if (Array.isArray(response.error.errors)) {
              setGeneralError(response.error.errors.join(', '));
            } else if (typeof response.error.errors === 'object') {
              setGeneralError(JSON.stringify(response.error.errors));
            } else {
              setGeneralError(String(response.error.errors));
            }
          }}
      } catch (error) {
        console.error("Error!", error.message);
      } finally {
        setIsSubmitting(false);
      }
    } 
    else {
      setErrors({
        nameError: !data.Name ? 'Name is required.' : '',
        formError: !data.StorageType ? 'Storage Type is required.' : '',
        mobileError: !validateMobile(data.Mobile) ? 'Please enter a valid mobile number.' : '',
        emailError: !validateEmail(data.Email) ? 'Please enter a valid email address.' : '',
      });
      setIsSubmitting(false);
    }
    
  };

  return (
    <>
     <Hubspot  portalId = "45810273" formId = "1bd2ed24-e84f-47b0-bf7c-f22352a2cfe5" hubspotFormSubmit = {hubspotFormSubmit} data = {data}/>
    <form
      className="absolute top-[-30px] lg:top-[-50px] min-h-[120px] py-2 px-4 w-[90%] lg:w-[80%] bg-white lg:bg-[#F7F9FC] flex items-center justify-around flex-wrap rounded-[14px] lg:gap-4 shadow-2xl"
      onSubmit={handleSubmit} // Set the onSubmit handler
    >
      <h2 className="block text-[#1B1C57] font-bold text-[26px] lg:hidden">
      Get Your Free Quote
      </h2>
      <div className="w-full lg:w-1/6 my-2">
        <span className="text-[14px] font-semibold pb-2 text-[#1B1C57] hidden lg:block">
          Storage type
        </span>
        <select
          name="StorageType"
          // required
          value={data?.StorageType}
          onChange={handleChange} // Handle change for storage type
          className="outline-none h-[40px] w-full rounded border text-[13px] pl-4"
        >
          <option value="" disabled>
            Select
          </option>
          <option value="Easy Storage">Easy Storage</option>
          <option value="Affordable Storage">Affordable Storage</option>
        </select>
        {errors.formError && <p className="text-red-500 text-[13px] ">{errors.formError}</p>}
      </div>
      <div className="flex flex-col items-start justify-center w-full lg:w-1/6 my-2">
        <span className="text-[14px] font-semibold pb-2 text-[#1B1C57] hidden lg:block">
          Name
        </span>
        <input
          type="text"
          name="Name"
          className="outline-none h-[40px] w-full rounded border pl-4 text-[13px]"
          placeholder="Name"
          value={data?.Name}
          onChange={handleChange} // Handle change for name
          // required
        />
          {errors.nameError && <p className="text-red-500 text-[13px] ">{errors.nameError}</p>} {/* Error message for Name */}
      </div>
      <div className="flex flex-col items-start justify-center w-full lg:w-1/5 my-2">
        <span className="text-[14px] font-semibold pb-2 text-[#1B1C57] hidden lg:block">
          Phone Number
        </span>
        <div className="flex items-center justify-center w-full">
          <select
            name="countryCode"
            className="outline-none h-[40px] rounded border text-[13px] mr-2"
            disabled
          >
            <option value="">+91</option>
          </select>
          <input
            type="number"
            name="Mobile"
            // required
            className="outline-none h-[40px] w-full rounded border pl-4 text-[13px]"
            placeholder="Enter your ph no"
            value={data?.Mobile}
            onChange={handleChange} // Handle change for Mobile
          />
        </div>
        {errors.mobileError && <p className="text-red-500 text-[13px]">{errors.mobileError}</p>} {/* Error message for Mobile */}
    
      </div>
      <div className="flex flex-col items-start justify-center w-full lg:w-1/6 my-2">
        <span className="text-[14px] font-semibold pb-2 text-[#1B1C57] hidden lg:block">
          Email
        </span>
        <input
          type="Email"
          name="Email"
          className="outline-none h-[40px] w-full rounded border pl-4 text-[13px]"
          placeholder="Email"
          value={data?.Email}
          onChange={handleChange} // Handle change for Email
          // required
        />
        {errors.emailError && <p className="text-red-500 text-[13px]">{errors.emailError}</p>} {/* Error message for Email */}
   
      </div>
      <div className="flex items-start justify-center w-full lg:w-1/6 my-2">
        <button
          type="submit"
          disabled={isSubmitting} // Disable button while submitting
          className="lg:mt-[25px] outline-none py-[9px] w-full px-2 rounded bg-blue-500 text-white text-[16px]"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'} {/* Show loading text */}
        </button>
      </div>
      <p className="text-base text-red-500 text-[13px] mb-2">
      {generalError}
    </p>
    
    </form>
    </>
  );
};

export default Form;
