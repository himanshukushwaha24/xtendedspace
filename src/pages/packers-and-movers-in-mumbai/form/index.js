import { SaveMumbai } from "@/service/homePageService";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { submitForm } from "@/util/common";
import { useSearchParams } from "next/navigation";
import Hubspot from "@/pages/hubspot";
import Image from "next/image";

const Form = () => {
  const [data, setData] = useState({
    Name: "",
    Mobile: "",
    Location: "",
    AddType: "Relocation",
  });
  const [hubspotFormSubmit, setHubspotFormSubmit] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const [errors, setErrors] = useState({
    nameError: "",
    mobileError: "",
    locationError: "",
  });
  // const [error, setError] = useState();
  const [multipleError, setMultipleError] = useState();
  const [displayText, setDisplayText] = useState("MUMBAI TO MUMBAI");
  const [scrollY, setScrollY] = useState(false);
  const [isBtnEnable, setBtnEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
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
    const interval = setInterval(() => {
      setDisplayText((prevText) =>
        prevText === "MUMBAI TO PAN INDIA"
          ? "MUMBAI TO MUMBAI"
          : "MUMBAI TO PAN INDIA"
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data.Name && data.Mobile && data.Location) {
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

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setMultipleError("");
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
        const response = await SaveMumbai(formData);
        submitForm(formData);
        if (response.success) {
          setHubspotFormSubmit(true);
          document.getElementById("myform").reset();
          router.push("/packers-and-movers-in-mumbai/thankyou");
        } else {
          if (
            response.error?.title === "One or more validation errors occurred."
          ) {
            setMultipleError(response.error.errors);
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
        // locationError: !data.Location ? 'Location is required.' : '',
        emailError: !validateEmail(data.Email)
          ? "Please enter a valid email address."
          : "",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Hubspot
        portalId="45810273"
        formId="374ac63e-892f-4ea1-b043-33e14a6a880e"
        hubspotFormSubmit={hubspotFormSubmit}
        data={data}
      />
      <section
        className="header"
        id="header"
        style={{
          backgroundImage:
            "url(/images/relocation-image/relocation-item-moving.webp)",
        }}
      >
        <div className={`navbar ${scrollY && "fixed"}`}>
          <img
            className="logo "
            src="/images/xtended-space-white-logo.png"
            alt="Xtended Space Logo"
          />
          <div className={`contact-info ${!scrollY ? "hidden" : "block"}`}>
            <a href="tel:+919911090800">
              <span className="icon">
                {/* <i className="ri-phone-fill">
                  </i> */}
                <Image
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/calliconr.webp"
                  alt="callicon"
                  width={100}
                  height={100}
                />
              </span>

              <span className="text"> +(91) 9911090800</span>
            </a>
          </div>
        </div>
        <div className="header-content">
          <div className="header-title">
            <h1>PACKERS AND MOVERS</h1>
            <div id="textContainer">
              <span>{displayText}</span>
            </div>
          </div>
        </div>
        <div className="header-form">
          <div className="form-container">
            <form id="myform" onSubmit={handleSubmit}>
              <div className="form-top">
                <div className="call-btn">
                  <a href="tel:+919911090800">
                    <span className="icon">
                      {/* <i className="ri-phone-fill"></i> */}
                      <Image
                        src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/calliconr.webp"
                        alt="callicon"
                        width={100}
                        height={100}
                      />
                    </span>
                    <span className="text"> +(91) 9911090800</span>
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
                // onInput="validateInput()"
                onChange={onChange}
              />
              <br />
              {errors.nameError && (
                <div className="error mb-2">{errors.nameError}</div>
              )}

              {multipleError && multipleError.Name && (
                <p className="text-base text-red-500">
                  {multipleError.Name[0]}
                </p>
              )}

              <div className="error mb-2" id="nameError"></div>
              <input
                type="number"
                id="mobile"
                placeholder="Mobile"
                name="Mobile"
                required
                maxLength={10} // Restricts input to 10 digits
                onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
                // onInput="validateMobile(this)"

                onChange={onChange}
              />
              <br />
              {errors.mobileError && (
                <div className="error mb-2  text-red-500">
                  {errors.mobileError}
                </div>
              )}

              {multipleError && multipleError.Mobile && (
                <p className="text-base text-red-500 ">
                  {multipleError.Mobile[0]}
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
                id="location"
                name="Location"
                required
                className="py-3"
                onChange={onChange}
              >
                <option value="" disabled selected>
                  Select your PickUp location
                </option>
                <option value="South Mumbai">South Mumbai</option>
                <option value="Western Suburbs">Western Suburbs</option>
                <option value="Eastern Suburbs">Eastern Suburbs</option>
                <option value="Central Mumbai">Central Mumbai</option>
                <option value="Thane">Thane</option>
                <option value="Navi Mumbai">Navi Mumbai</option>
              </select>
              <br />
              {multipleError && multipleError.Location && (
                <p className="text-base text-red-500">
                  {multipleError.Location[0]}
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
            <div className="header-image">
              <img
                src="images\relocation-image\household-item-shifting.webp"
                alt="storage items doorstep pickup"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\packer-and-movers-household-shifting.webp"
                alt="packing and moving services"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\Packers-movers-three-layer-packing.webp"
                alt=" Packers movers three layer packing"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\relocation-item-doorstep-pickup.webp"
                alt="relocation item doorstep pickup.webp"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\relocation-item-moving.webp"
                alt="relocation-item-moving"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\relocation-item-packaging.webp"
                alt="relocation itemp ackaging"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\relocation-item-packed.webp"
                alt="relocation item packed"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\relocation-item-store-warehouse.webp"
                alt="relocation item store warehouse"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\Storage-space-packing-goods.webp"
                alt="Storage space packing goods"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\relocation-item-moving.webp"
                alt="relocation item moving"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Form;
