"use client";

import { useState, useRef } from "react";
import { Select } from "antd";
import { spaceListig } from "@/service/storageService";
import { useDispatch, useSelector } from "react-redux";
import { setListStorage } from "@/app/globalRedux/Feature/ListStorage";

const formInputStyle =
  "w-full px-2 py-2 mt-0  border rounded-md focus:outline-none focus:bg-white";
const formLabelStyle = "block  text-[#1B1C57] text-sm font-normal mt-4 ";
const formSelectStyle =
  "w-full  px-2 py-2 mt-0 border rounded-md focus:outline-none focus:bg-white";
const options = [
  {
    label: "Fire Extinguisher",
    value: "FireExtinguisher",
  },
  {
    label: "Smoke Free",
    value: "SmokeFree",
  },
  {
    label: "Security Camera",
    value: "SecurityCamera",
  },
  {
    label: "Locked Area",
    value: "LockedArea",
  },
  {
    label: "Guarded Society",
    value: "GuardedSociety",
  },
  {
    label: "Moisture Free",
    value: "MoistureFree",
  },
  {
    label: "Pest Control",
    value: "PestControl",
  },
  {
    label: "Separate Access",
    value: "SeparateAccess",
  },
  {
    label: "Smoke Detector",
    value: "SmokeDetector",
  },
];

const SpaceDetails = ({
  setPropertyId,
  setCurrentItem,
  userId,
  setBankDetails,
}) => {
  const [multipleError, setMultipleError] = useState({});
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const {
    listStorage: { value: reduxData },
  } = useSelector((state) => state);
  const formRef = useRef(null);

  const onChange = (e) => {
    setError();
    setMultipleError({});
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    dispatch(setListStorage({ ...data, ...reduxData, [name]: value }));
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    const allKeys = Object.keys(reduxData);
    const formData = new FormData();
    allKeys.forEach((item) => {
      if (item === "stage1.Amenities") {
        reduxData[item]?.length && formData.append(item, reduxData[item]);
      } else {
        formData.append(item, reduxData[item]);
      }
    });

    const parameter = `?ApplicationUserId=${userId}&stage=1`;
    const response = await spaceListig(formData, parameter);
    if (response.success) {
      setPropertyId(response.success.data.propertyId);
      dispatch(
        setListStorage({
          ...reduxData,
          ["propertyId"]: response.success.data.propertyId,
        })
      );
      setBankDetails(response.success?.customerBankAccount);
      setCurrentItem("spaceAddress");
    } else {
      setMultipleError(response?.error?.text);
      const firstErrorKey = Object.keys(response?.error?.text)[0];
      const firstErrorElement = formRef.current.querySelector(
        `[data-error=${firstErrorKey}]`
      );
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  return (
    <>
      <form ref={formRef} onSubmit={onsubmitHandler}>
        <div class="tab-pane mx-2 z-2 " role="tabpanel" id="step1">
          <h4 class="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] mb-2 ">
            Space Details
          </h4>

          <div className="flex-col items-center justify-between my-2">
            <label htmlFor="storageType" className={formLabelStyle}>
              Property Type <span className="text-red-500">*</span>
            </label>
            <select
              id="storageType"
              className={formSelectStyle}
              name="stage1.PropertyType"
              onChange={onChange}
              defaultValue={reduxData["stage1.PropertyType"]}
              required=""
              data-error="PropertyType"
            >
              <option value="" disabled selected>
                Select
              </option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
            {multipleError?.PropertyType && (
              <p className="text-sm text-red-500">
                {multipleError.PropertyType}
              </p>
            )}
          </div>
          <div className="flex-col items-center justify-between my-2">
            <label htmlFor="storageType" className={formLabelStyle}>
              Storage Type <span className="text-red-500">*</span>
            </label>
            <select
              id="propertyType"
              className={formSelectStyle}
              name="stage1.StorageType"
              onChange={onChange}
              defaultValue={reduxData["stage1.StorageType"]}
              data-error="StorageType"
            >
              <option className="text-gray-500" value="" disabled selected>
                Select
              </option>
              <option value="Independent">Independent</option>
              <option value="Shared">Shared</option>
            </select>
            {multipleError?.StorageType && (
              <p className="text-sm text-red-500">
                {multipleError.StorageType}
              </p>
            )}
          </div>
          <div className="flex-col items-center justify-between my-2">
            <label htmlFor="storagePurpose" className={formLabelStyle}>
              What would you like to store? 
              <span className="text-red-500">*</span>
            </label>
            <select
              id="storagePurpose"
              className={formSelectStyle}
              name="stage1.Category"
              onChange={onChange}
              defaultValue={reduxData["stage1.Category"]}
              data-error="Category"
            >
              <option className="text-gray-500" value="" disabled selected>
                Select
              </option>
              <option value="HouseholdItems">Household Item</option>
              <option value="BusinessItems">Business Item</option>
              <option value="Both">Both</option>
              {/* <option value="None">None</option> */}
              {/* <option value="Others">Others</option> */}
            </select>
            {multipleError?.Category && (
              <p className="text-sm text-red-500">{multipleError?.Category}</p>
            )}
          </div>

          {/* Space Description */}
          <div className="group-select mb-6 ">
            <label htmlFor="spaceDescription" className={formLabelStyle}>
              What best describes your space?
              <span className="text-red-500">*</span>
            </label>
            <select
              id="spaceDescription"
              className={formSelectStyle}
              name="stage1.propertySpace"
              onChange={onChange}
              defaultValue={reduxData["stage1.propertySpace"]}
              data-error="propertySpace"
            >
              <option className="text-gray-500" value="" disabled selected>
                Select
              </option>
              <option value={"IsIndoor"}>Indoor</option>
              <option value={"IsCovered"}>Covered</option>
              {/* <option value={"IsUnCovered"}>UnCovered</option> */}
            </select>

            {multipleError?.propertySpace && (
              <p className="text-sm text-red-500">
                {multipleError?.propertySpace}
              </p>
            )}
          </div>

          {/* Amenities */}
          <div className="group-select mb-6">
            <label htmlFor="amenities" className={formLabelStyle}>
              Amenities of your space <span className="text-red-500">*</span>
            </label>
            <Select
              mode="multiple"
              className="w-full  mt-0 multipleSelect"
              placeholder="Select Amenities"
              name="stage1.Amenities"
              defaultValue={reduxData["stage1.Amenities"]}
              data-error="Amenities"
              onChange={(value) => {
                setMultipleError();
                setData({ ...data, "stage1.Amenities": [...value] });
                dispatch(
                  setListStorage({
                    ...data,
                    ...reduxData,
                    "stage1.Amenities": [...value],
                  })
                );
              }}
              options={options}
            />
            {/* {multipleError?.errors["stage1.Amenities"] &&  (
  <p className="text-sm text-red-500">
    {multipleError?.errors["stage1.Amenities"][0] }
  </p>
)} */}

            {multipleError?.Amenities && (
              <p className="text-sm text-red-500">{multipleError?.Amenities}</p>
            )}
          </div>

          {/* Access Frequency */}
          <div className="group-select mb-6">
            <label htmlFor="accessFrequency" className={formLabelStyle}>
              How frequently can renters access their items? 
              <span className="text-red-500">*</span>
            </label>
            <select
              id="accessFrequency"
              className={formSelectStyle}
              name="stage1.TenantVisitFrequency"
              defaultValue={reduxData["stage1.TenantVisitFrequency"]}
              onChange={onChange}
              data-error="TenantVisitFrequency"
            >
              <option className="text-gray-500" value="" disabled selected>
                Select
              </option>
              <option value="Daily">Daily</option>
              <option value="Onceaweek">Once a week</option>
              <option value="Monthly">Monthly</option>
              <option value="askBeforeCome">Ask Before Come</option>
            </select>

            {multipleError?.TenantVisitFrequency && (
              <p className="text-sm text-red-500">
                {multipleError?.TenantVisitFrequency}
              </p>
            )}
          </div>

          {/* Preferred Time */}
          <div className="group-select mb-6">
            <label htmlFor="preferredTime" className={formLabelStyle}>
              Which time suits best for you? 
              <span className="text-red-500">*</span>
            </label>
            <select
              id="preferredTime"
              className={formSelectStyle}
              name="stage1.TenantVisitTiming"
              onChange={onChange}
              defaultValue={reduxData["stage1.TenantVisitTiming"]}
              data-error="TenantVisitTiming"
            >
              <option className="text-gray-500" value="" disabled selected>
                Select
              </option>
              <option value="StandardTiming">
                Standard Timing (9 AM to 6 PM)
              </option>
              <option value="EveningTiming">
                Evening Timing (6 PM to 9 PM)
              </option>
              <option value="AnyTiming">Any Timing (24 X 7)</option>
            </select>
            {multipleError?.TenantVisitTiming && (
              <p className="text-sm text-red-500">
                {multipleError?.TenantVisitTiming}
              </p>
            )}
          </div>
          <div className="group-select mb-6">
            <label htmlFor="preferredTime" className={formLabelStyle}>
              Floor <span className="text-red-500">*</span>
            </label>
            <input
              type="Number"
              className={formInputStyle}
              name="stage1.Floor"
              placeholder="Enter Floor"
              required=""
              min="0"
              max="100"
              value={reduxData["stage1.Floor"]}
              onChange={onChange}
              data-error="Floor"
            />
            {multipleError?.Floor && (
              <p className="text-sm text-red-500">{multipleError?.Floor}</p>
            )}
          </div>
          <div className="group-select mb-6">
            <label htmlFor="preferredTime" className={formLabelStyle}>
              Is Lift Available? <span className="text-red-500">*</span>
            </label>
            <select
              id="preferredTime"
              className={formSelectStyle}
              name="stage1.IsLiftAvailable"
              onChange={onChange}
              defaultValue={reduxData["stage1.IsLiftAvailable"]}
              data-error="IsLiftAvailable"
            >
              <option className="text-gray-500" value="" disabled selected>
                Select
              </option>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
            {multipleError?.IsLiftAvailable && (
              <p className="text-sm text-red-500">
                {multipleError?.IsLiftAvailable}
              </p>
            )}
          </div>

          <h4 className="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] mb-2 mt-4">
            Space Dimensions
          </h4>

          <div class="row">
            <div class="col-6">
              <fieldset class="name-wrap">
                <label className={formLabelStyle}>
                  Length (ft) <span class="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className={formInputStyle}
                  name="stage1.LengthInFeet"
                  placeholder="Enter Length "
                  required=""
                  onChange={onChange}
                  value={reduxData["stage1.LengthInFeet"]}
                  data-error="LengthInFeet"
                />
                {multipleError?.LengthInFeet && (
                  <p className="text-sm text-red-500">
                    {multipleError?.LengthInFeet}
                  </p>
                )}
              </fieldset>
            </div>
            <div class="col-6">
              <fieldset class="name-wrap">
                <label className={formLabelStyle}>
                  Width (ft) <span class="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className={formInputStyle}
                  name="stage1.WidthInFeet"
                  placeholder="Enter Width"
                  required=""
                  onChange={onChange}
                  value={reduxData["stage1.WidthInFeet"]}
                />
                {multipleError?.WidthInFeet && (
                  <p className="text-sm text-red-500">
                    {multipleError?.WidthInFeet}
                  </p>
                )}
              </fieldset>
            </div>
            <div class="col-6">
              <fieldset class="name-wrap">
                <label className={formLabelStyle}>
                  Height (ft)
                  {/* <span class="text-danger">*</span> */}
                </label>
                <input
                  type="number"
                  className={formInputStyle}
                  name="stage1.HeightInFeet"
                  placeholder="Enter Height "
                  required=""
                  value={reduxData["stage1.HeightInFeet"]}
                  onChange={onChange}
                />
                {multipleError?.HeightInFeet && (
                  <p className="text-sm text-red-500">
                    {multipleError?.HeightInFeet}
                  </p>
                )}
              </fieldset>
            </div>
          </div>

          <h4 class="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] mb-2 mt-4">
            Space Entrance Dimensions
          </h4>
          <div class="row">
            <div class="col-6">
              <fieldset class="name-wrap">
                <label className={formLabelStyle}>
                  Width (ft)
                  {/* <span class="text-danger">*</span> */}
                </label>
                <input
                  type="number"
                  className={formInputStyle}
                  name="stage1.EntranceWidthInFeet"
                  placeholder="Enter Width "
                  required=""
                  value={reduxData["stage1.EntranceWidthInFeet"]}
                  onChange={onChange}
                  data-error="EntranceWidthInFeet"
                />
                {/* {multipleError?.WidthInFeet && (
                  <p className="text-sm text-red-500">
                    {multipleError?.WidthInFeet}
                  </p>
                )} */}
              </fieldset>
            </div>
            <div class="col-6">
              <fieldset class="name-wrap">
                <label className={formLabelStyle}>
                  Height (ft)
                  {/* <span class="text-danger">*</span> */}
                </label>
                <input
                  type="number"
                  className={formInputStyle}
                  name="stage1.EntranceHeightInFeet"
                  placeholder="Enter Height"
                  required=""
                  value={reduxData["stage1.EntranceHeightInFeet"]}
                  onChange={onChange}
                  data-error="EntranceHeightInFeet"
                />
                {multipleError?.EntranceHeightInFeet && (
                  <p className="text-sm text-red-500">
                    {multipleError?.EntranceHeightInFeet}
                  </p>
                )}
              </fieldset>
            </div>
          </div>

          <div class="wizard-footer my-5 w-[100%]">
            <ul class="d-flex justify-content-between w-full gap-2">
              <li className="w-1/2">
                {/* <button
                  type="button"
                  class=" w-full default-btn prev-step btn btn-outline-primary p-2"
                >
                  Cancel
                </button> */}
              </li>
              <li className="w-1/2">
                <button
                  type="submit"
                  class=" w-full default-btn next-step btn !bg-blue-500 btn-full p-2 text-white"
                >
                  Next
                </button>
              </li>
            </ul>
            {error?.text && (
              <p className="text-sm text-red-500">{error?.text}</p>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default SpaceDetails;
