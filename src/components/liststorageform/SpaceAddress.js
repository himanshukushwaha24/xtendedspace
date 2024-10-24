import React, { useEffect, useState, useRef } from "react";
import { servivePinCode } from "@/util/constant";
import { spaceListig, getCityNearby } from "@/service/storageService";
import { useDispatch, useSelector } from "react-redux";
import { setListStorage } from "@/app/globalRedux/Feature/ListStorage";

const SpaceAddress = ({ PropertyId, setCurrentItem, userId }) => {
  const formInputStyle = "w-full px-2 py-2 mt-2 bg-gray-100 rounded-md border focus:outline-none focus:bg-white";
  const formLabelStyle = "block text-[#1B1C57] text-sm font-normal mt-4";
  const formSelectStyle = "w-full px-2 py-2 mt-0 border rounded-md focus:outline-none focus:bg-white";

  const [data, setData] = useState({ PropertyId, "stage2.PinCode": "" });
  const [error, setError] = useState(null);
  const [addressNearby, setAddressNearby] = useState([]);
  const [multipleError, setMultipleError] = useState({});
  const dispatch = useDispatch();
  const { listStorage: { value:reduxData } } = useSelector((state) => state);
  const formRef = useRef(null);
  const onChange = (e) => {
    const { name, value, type, files } = e.target;
    setError(null);
    setMultipleError({});

    if (type === "file") {
      setData({ ...data, [name]: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
    dispatch(setListStorage({ ...data,...reduxData, [name]: value }))
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    if(reduxData && reduxData['stage2.PinCode'] && servivePinCode?.includes(reduxData['stage2.PinCode'])){

    }
    else{
      setMultipleError({PinCode: "Service not available at this location."});
      setError()
      return
    }

    const formData = new FormData();
    Object.keys(reduxData).forEach((key) => {
      formData.append(key, reduxData[key]);
    });

    const parameter = `?ApplicationUserId=${userId}&stage=2`;
    const response = await spaceListig(formData, parameter);

    if (response.success) {
      dispatch(setListStorage({ ...data,...reduxData, ['stage3.PerDayRentalAmount']: response.success.data.stage2.originalAmount, ['stage3.annualEarningPotential']: response.success.data.stage2.annualEarningPotential  }))
      setCurrentItem("spacephoto");
    } else {
      setMultipleError(response.error.text);
      const firstErrorKey = Object.keys(response?.error?.text)[0];
      const firstErrorElement = formRef.current.querySelector(`[data-error=${firstErrorKey}]`);
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const fetchNearbyCities = async () => {
    try {
      const args = `?pinCode=${data["stage2.PinCode"]}`;
      const response = await getCityNearby(args);

      if (response.success) {
        setAddressNearby(response.success);

        dispatch(setListStorage({ ...data,...reduxData, "stage2.District": response.success[0].district,
        "stage2.City": response.success[0].city,
        "stage2.State": response.success[0].state,addressNearby: response.success}))
        setData((prevData) => ({
          ...prevData,
          "stage2.District": response.success[0].district,
          "stage2.City": response.success[0].city,
          "stage2.State": response.success[0].state,
        }));
      } else {
        setError(response.error?.error);
        
      }
    } catch (error) {
      setError("Error fetching nearby cities");
    }
  };

  useEffect(() => {
    if (data["stage2.PinCode"]?.length === 6) {
      if(servivePinCode.includes(data["stage2.PinCode"])){
        fetchNearbyCities();

      }
      else{
        setError("Service not available at this location.")
      }
    }
  }, [data["stage2.PinCode"]]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form ref={formRef}  onSubmit={onsubmitHandler}>
      <div className="tab-pane mx-2 z-2" role="tabpanel" id="step2">
        <h4 className="text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">Space Address</h4>
        <div className="row">
          <div className="col-md-12">
            <fieldset className="name-wrap">
              <label className={formLabelStyle}>
                Enter your Address <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={formInputStyle}
                name="stage2.Address"
                placeholder="Address Line 1"
                // required
                value={reduxData['stage2.Address']}
                onChange={onChange}
                data-error="Address"
              />
              {multipleError?.Address && (
                // <p className="text-sm text-red-500">{multipleError.Address}</p>
                <p className="text-sm text-red-500">{multipleError?.Address}</p>

              )}
            </fieldset>
          </div>
          <div className="col-md-12">
            <fieldset className="name-wrap">
              <input
                type="text"
                className={formInputStyle}
                name="stage2.Address2"
                placeholder="Landmark"
                // required
                onChange={onChange}
                value={reduxData['stage2.Address2']}
              />
              {multipleError?.Address2 && (
                <p className="text-sm text-red-500">{multipleError?.Address2}</p>
              )}
            </fieldset>
          </div>
        </div>
        <fieldset className="name-wrap">
          <label className={formLabelStyle}>
            Pincode <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={formInputStyle}
            name="stage2.PinCode"
            placeholder="Enter Pincode"
            required
            onChange={onChange}
            value={reduxData['stage2.PinCode']}
          />
          {error &&  <p className="text-sm text-red-500">{error}</p>}
          {multipleError?.PinCode && (
            <p className="text-sm text-red-500">{multipleError?.PinCode}</p>
          )}
        </fieldset>

        <div className="row">
          <div className="col-md-6">
            <div className="group-select">
              <label htmlFor="city" className={formLabelStyle}>
                City<span className="text-red-500">*</span>
              </label>
              <select
                id="city"
                name="stage2.City"
                className={formSelectStyle}
                onChange={onChange}
                defaultValue={reduxData["stage2.City"] || ""}
              >
                {/* <option value="" disabled>
                  Select
                </option> */}
                {reduxData['addressNearby']?.map(({ city }) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {multipleError?.City && (
                <p className="text-sm text-red-500">{multipleError?.City}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="group-select">
              <label htmlFor="district" className={formLabelStyle}>
                District<span className="text-red-500">*</span>
              </label>
              <input
                id="district"
                name="stage2.District"
                className={formSelectStyle}
                onChange={onChange}
                value={reduxData["stage2.District"] || ""}
              />
              {multipleError?.District && (
                <p className="text-sm text-red-500">{multipleError?.District}</p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="group-select">
              <label htmlFor="state" className={formLabelStyle}>
                State<span className="text-red-500">*</span>
              </label>
              <input
                id="state"
                name="stage2.State"
                className={formSelectStyle}
                onChange={onChange}
                value={reduxData["stage2.State"] || ""}
              />
              {multipleError?.State && (
                <p className="text-sm text-red-500">{multipleError?.State}</p>
              )}
            </div>
          </div>
        </div>
        {/* <div className="">
          <h4 className={formLabelStyle}>
            Address proof<span class="text-red-500">*</span>
          </h4>
          <div class="upload-section border-2 border-dashed border-gray-300 rounded-lg p-6 text-center font-normal text-base text-gray-600 cursor-pointer -webkit-text-size-adjust: 100%; -webkit-tap-highlight-color: transparent; cursor: pointer; text-align: center; box-sizing: border-box; margin: 0; padding: 0; outline: 0; vertical-align: baseline; -webkit-font-smoothing: antialiased; display: inline-block; font-style: normal; font-variant: normal; text-rendering: auto; line-height: 1; font-family: 'Font Awesome 5 Pro'; font-weight: 900; color: #1e80e8; font-size: 18px;">
            {data["stage2.AdressProofImage"] ? (
              <div className="relative">
                <img
                  src={URL?.createObjectURL(data["stage2.AdressProofImage"])}
                  className="preview-image w-['338px']"
                />
                <div className="">
                  <input
                    id="multiplefileuploadvideo"
                    onChange={onChange}
                    name="stage2.AdressProofImage"
                    type="file"
                    accept="image/png,image/jpg,image/jpeg,image/webp" 
                    multiple
                    className="opacity-0 absolute inset-0 cursor-pointer z-20"
                  />
                  <p className=" absolute inset-0 cursor-pointer text-right mr-1">
                    Edit
                  </p>
                </div>
              </div>
            ) : (
              <div class="file-upload-container relative">
                <label
                  for="multiplefileupload"
                  class="upload-button  text-blue-500 px-4 rounded cursor-pointer inline-block"
                >
                  <img
                    className="m-auto"
                    src="/images/icon/Upload Image Icon.svg"
                    alt=""
                  /> 
                  Upload Photos
                </label>
                <input
                  id="multiplefileupload"
                  type="file"
                  name="stage2.AdressProofImage"
                  accept="image/png,image/jpg,image/jpeg,image/webp" 
                  multiple
                  class="opacity-0 absolute inset-0 cursor-pointer"
                  onChange={onChange}
                />
                <span class="file-size-limit text-gray-500 text-sm block ">
                  Max size: 2MB
                </span>
              </div>
            )}
          </div>
          <p className="flex items-center text-[12px] text-gray-500">
            <span>
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
                ></path>
              </svg>
            </span>
            Electricity bill, Pan card, Driving license,Adhaar Card 
          </p>
        </div> */}
        <div
          className="mt-8 flex rounded items-center p-2"
          style={{ backgroundImage: "url('/images/Rectangle.png')" }}
        >
          <img
            src="/images/icon/address icon.svg"
            alt="Uploaded Address Proof"
            className="mr-4"
            onChange={onChange}
          />
          <p className="text-gray-500 text-[14px]  ">
             
            More than 15k people have uploaded address proof before
          </p>
        </div>

        <div class="wizard-footer my-5 w-[100%]">
            <ul class="d-flex justify-content-between w-full gap-2">
              <li className="w-1/2">
                <button
                  type="button"
                  class=" w-full default-btn prev-step btn btn-outline-primary p-2"
                  onClick={()=>{setCurrentItem("spaceDetails")}}
                >
                  Previous 
                </button>
              </li>
              <li className="w-1/2">
                <button
                  type="submit"
                  class=" w-full default-btn next-step btn !bg-blue-500 btn-full p-2"
                >
                  Next
                </button>


              </li>
            </ul>
            {error?.text &&
  <p className="text-sm text-red-500">
    {error?.text}
  </p>
}
          </div>
      </div>
    </form>
  );
};

export default SpaceAddress;
