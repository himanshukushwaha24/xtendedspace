import React, { useState, useEffect, useCallback } from "react";
import { SaveRelocationSevices } from "@/service/homePageService";
import { useRouter } from "next/router";
import { submitForm } from "@/util/common";
import { useSearchParams } from "next/navigation";
import Hubspot from "@/pages/hubspot";
import Image from "next/image";
const Herosection = () => {
  const [hubspotFormSubmit, setHubspotFormSubmit] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const [data, setData] = useState({
    Name: "",
    Mobile: "",
    Location: "",
    AddType: "storage-space-services-in-india",
  });
  const [errors, setErrors] = useState({
    nameError: "",
    mobileError: "",
    locationError: "",
  });
  const [displayText, setDisplayText] = useState("HOUSEHOLD STORAGE");
  const [multipleError, setMultipleError] = useState();
  // const [error, setError] = useState();
  const [scrollY, setScrollY] = useState(false);
  const [isBtnEnable, setBtnEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onScroll = useCallback((event) => {
    setScrollY(window.pageYOffset > 180);
  }, []);
  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);

  useEffect(() => {
    if (
      data.Name &&
      data.Mobile &&
      data.Location &&
      validateEmail(data.Email)
    ) {
      if (
        (data.Mobile.charAt(0) === "0" && data.Mobile.length === 11) ||
        data.Mobile.length === 10
      ) {
        setBtnEnabled(true);
      } else {
        setBtnEnabled(false);
      }
    } else {
      setBtnEnabled(false);
    }
  }, [data]);

  const validateMobile = (mobile) => /^0?[0-9]{10}$/.test(mobile);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email validation regex

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((prevText) =>
        prevText === "HOUSEHOLD STORAGE"
          ? "BUSINESS STORAGE"
          : "HOUSEHOLD STORAGE"
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === "Mobile" && !validateMobile(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobileError: "Please enter a valid mobile number.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, mobileError: "" }));
    }
    if (name === "Email" && !validateEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, emailError: "" }));
    }
    setGeneralError("");
    setMultipleError("");
  };
  const searchParams = useSearchParams();
  const utm_source = searchParams.get("utm_source");
  const utm_medium = searchParams.get("utm_medium");
  const utm_campaign = searchParams.get("utm_campaign");
  const utm_content = searchParams.get("utm_content");
  const utm_term = searchParams.get("utm_term");
  const gclid = searchParams.get("gclid");
  const referrer = searchParams.get("referrer");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (data.Name && validateMobile(data.Mobile) && data.Location) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

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
        const response = await SaveRelocationSevices(formData);
        // console.log("response===", response);
        submitForm(formData);

        if (response.success) {
          setHubspotFormSubmit(true);
          setTimeout(() => {
            if (response.success?.isExistingUser) {
              router.push("/login?callback=easy-storage");
            } else {
              router.push("/signup?callback=easy-storage");
            }
          }, 250);
          document.getElementById("myform").reset();
          // router.push("/storage-space-services-in-india/thankyou");
        } else {
          if (
            response?.error?.title === "One or more validation errors occurred."
          ) {
            setMultipleError(response.error?.errors);
          }
          if (response?.error?.errors) {
            setGeneralError(response.error.errors);
          }
          setErrors((prevErrors) => ({
            ...prevErrors,
            formError: response.error.text || "An Error occurred",
          }));
        }
      } catch (error) {
        console.error("Error!", error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors({
        nameError: !data.Name ? "Name is required." : "",
        mobileError: !validateMobile(data.Mobile)
          ? "Please enter a valid mobile number."
          : "",
        locationError: !data.Location ? "Location is required." : "",
        emailError: !validateEmail(data.Email)
          ? "Please enter a valid email address."
          : "", // Email validation error
      });
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Hubspot
        portalId="45810273"
        formId="935a5261-7d86-45db-86e5-3b8beb2f8133"
        hubspotFormSubmit={hubspotFormSubmit}
        data={data}
        
      />

      <section
        className="header"
        id="header"
        style={{
          backgroundImage: "url(/images/india/storage=facility-services.webp)",
        }}
      >
        <div className={`navbar ${scrollY && "fixed"}`}>
          <img
            className="logo"
            src="/images/xtended-space-white-logo.png"
            alt="Xtended Space Logo"
          />

          <div className={`contact-info ${!scrollY ? "hidden" : "block"}`}>
            <a href="tel:+919009000798">
              <span className="icon">
                {/* <i className="ri-phone-fill"> </i> */}
                {/* <img src='/images/company-logo/download.jpg'alt='Whatsapp'/> */}
                <Image
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/calliconr.webp"
                  alt="whatsappImage"
                  className="flex justify-center w-full items-center h-[20px]"
                  width={80}
                  height={80}
                />
              </span>

              <span className="text"> +(91) 900 900 0798</span>
            </a>
          </div>
        </div>
        {/* <img src='/images/xtended-space-white-logo.png'alt='Xtended Space Logo'/> */}
        <div className="header-content">
          <div className="header-title">
            <h1>Secure Storage Solutions</h1>
            <div id="textContainer">
              <div id="textContainer">
                <span>{displayText}</span>
              </div>
            </div>
          </div>
        </div>
        <div id="storage-facility-service" className="header-form">
          <div className="form-container">
            <form id="myform" onSubmit={handleSubmit}>
              <div className="form-top">
                <div className="call-btn">
                  <a href="tel:+919009000798">
                    <span className="icon">
                      {/* <i className="ri-phone-fill"></i> */}
                      <Image
                        src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/calliconr.webp"
                        alt="whatsappImage"
                        className="flex justify-center w-full items-center h-[20px]"
                        width={80}
                        height={80}
                      />
                    </span>
                    <span className="text"> +(91) 900 900 0798</span>
                  </a>
                </div>
                <h4>
                  Get Your <span>Free Quote</span>
                </h4>
              </div>
              <input
                type="text"
                id="name"
                placeholder="Name"
                name="Name"
                required
                onChange={onChange}
              />
              {multipleError && multipleError.Name && (
                <p className="text-base text-red-500">
                  {multipleError.Name[0]}
                </p>
              )}
              <br />

              <div className="error mb-2" id="nameError"></div>

              <input
                type="number"
                id="mobile"
                placeholder="Mobile"
                name="Mobile"
                required
                maxLength={10} // Restricts input to 10 digits
                onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
                onChange={onChange}
              />
              <br />
              {errors.mobileError && (
                <div className="error mb-2  text-red-500">
                  {errors.mobileError}
                </div>
              )}

              {multipleError && multipleError.Mobile && (
                <p className="text-sm text-red-500">
                  {multipleError?.Mobile[0]}
                </p>
              )}

              <div className="error mb-2" id="mobileError"></div>
              <input
                type="text"
                id="Email"
                placeholder="Email"
                name="Email"
                required
                onChange={onChange}
              />
              <br />

              <span className="error mb-2 text-red-500">
                {errors.emailError}
              </span>

              {/* {multipleError && multipleError.Email && (
                  <p className="text-base text-red-500 mb-2">
                    {multipleError.Email[0]}
                  </p>
                )} */}
              <div className="error mb-2" id="EmailError"></div>

              <select
                id="location "
                name="Location"
                required
                className="py-3"
                onChange={onChange}
              >
                <option value="" disabled selected>
                  Select your PickUp location
                </option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Noida">Noida</option>
                <option value="Gurugram">Gurugram</option>
                <option value="Faridabad">Faridabad</option>
                <option value="Ghaziabad">Ghaziabad</option>
              </select>
              <br />
              {multipleError && multipleError.Location && (
                <p className="text-sm text-red-500">
                  {multipleError?.Location[0]}
                </p>
              )}
              {generalError && (
                <p className="text-base text-red-500 mb-2">{generalError}</p>
              )}
              <br />

              <button
                type="submit"
                disabled={!isBtnEnable || isSubmitting}
                className={
                  isBtnEnable
                    ? `font-bold text-[20px] bg-green-600 w-full h-auto py-10 rounded-lg animation-btn text-white`
                    : "disable-btn text-center w-full h-auto py-10 rounded-lg border-1px text-[20px] font-bold"
                }
              >
                Get 20% Extra Discount
              </button>
            </form>
          </div>
        </div>
        <div className="slidingservice">
          <div className="header-images">
            <div class="header-image">
              <img
                src="/images/india/storage-space-stored-items/business-inventory-items-shifting.webp"
                alt="Business inventory storage service in India"
              />
            </div>
            <div class="header-image">
              <img
                src="/images/india/storage-space-stored-items/household-items-packing-service.webp"
                alt="household items packing service in India"
              />
            </div>
            <div class="header-image">
              <img
                src="/images/india/storage-space-stored-items/household-shifting.webp"
                alt="household items shifting in storage units"
              />
            </div>
            <div class="header-image">
              <img
                src="/images/india/storage-space-stored-items/item-store-storage-facility.webp"
                alt="storage items doorstep pickup"
              />
            </div>
            <div class="header-image">
              <img
                src="/images/india/storage-space-stored-items/lobour-move-items.webp"
                alt="labour moving items door to storage units"
              />
            </div>
            <div class="header-image">
              <img
                src="/images/india/storage-space-stored-items/storage-unit-moving-items.webp"
                alt="Storage units Item stored image"
              />
            </div>
            <div class="header-image">
              <img
                src="/images/india/storage-space-stored-items/storage-unit-storage-in-india.webp"
                alt="home to storage unit in India"
              />
            </div>
            <div class="header-image">
              <img
                src="/images/india/storage-space-stored-items/storage-unit-moving-items.webp"
                alt="door to storage units moving items"
              />
            </div>
            <div class="header-image">
              <img
                src="/images/india/storage-space-stored-items/three-layer-packing-storage-items.webp"
                alt="three layer packing for safety"
              />
            </div>
            <div class="header-image">
              <img
                src="/images/india/storage-space-stored-items/storage-unit-stored-items-in-india.webp"
                alt="storage unit stored items in India"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Herosection;
