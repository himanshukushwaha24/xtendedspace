import { spaceListig } from "@/service/storageService"; 
import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListStorage } from "@/app/globalRedux/Feature/ListStorage";
import { RxCrossCircled } from "react-icons/rx";
const formInputStyle =
  "w-full px-2 py-2 mt-2 bg-gray-100 border rounded-md focus:outline-none focus:bg-white";
const formLabelStyle = "block  text-[#1B1C57] text-sm font-normal mt-4 ";
const formSelectStyle =
  "w-full  px-2 py-2 mt-0 border rounded-md focus:outline-none focus:bg-white";
  
const SpacePhoto = ({ PropertyId, setCurrentItem, userId }) => {
  const [data, setData] = useState({ PropertyId });
  const [error, setError] = useState({});
  const [multipleError, setMultipleError] = useState({});
 const dispatch = useDispatch();
 const [currentImages, setCurrentImages] = useState([]);
 const [charCount, setCharCount] = useState(0);
 const [text, setText] = useState('');
 const formRef = useRef(null);
  const { listStorage: { value:reduxData } } = useSelector((state) => state);
  const [isFocused, setIsFocused] = useState(false);

  const onChange = (e) => {
 
    const { name, type, files } = e.target;
    setError({});
    setMultipleError({});
    if (name === "stage3.Description") {
      const newText = e.target.value;
      setText(newText);
      setCharCount(newText.length);
    }

    if (type === "file") {
      if (name === "stage3.PropertyImages") {
        let valid = true;
        const updatedValue = [...currentImages, ...Array.from(files)];
        const newErrors = {};
        if (updatedValue.length > 4) {
          // alert("Max 4 images allowed!");
          newErrors['PropertyImages'] = "Max 4 images allowed!";
          valid = false;
        }

        updatedValue.forEach(file => {
          if (file.size / (1024 * 1024) > 2) {
            // alert("Image size must be less than 2MB");
            newErrors['PropertyImages'] = "Image size must be less than 2MB";
            valid = false;
          }
        });

          if (!valid) {
          setError(newErrors);
          return;
        }

        setCurrentImages(updatedValue);
        dispatch(setListStorage({ ...reduxData, ...data, [name]: updatedValue }));
      } else {
        const file = files[0];
        if (file.size / (1024 * 1024) > 5) {
          setError({ 'PropertyVideo': "Video size must be less than 5MB" });
          return;
        }

        setData({ ...data, [name]: file });
        const videoUrl = URL?.createObjectURL(file);
        dispatch(setListStorage({ ...reduxData, ...data, videoUrl, [name]: file }));

      }
    } else {
      setData({ ...data, [name]: e.target.value });
      if (name === "stage3.PerDayRentalAmount") {
        const perDayRentalAmount = parseFloat(e.target.value) || 0;
        const annualEarningPotential = perDayRentalAmount * 365;
        dispatch(setListStorage({ 
          ...reduxData, 
          ...data, 
          [name]: perDayRentalAmount,
          'stage3.annualEarningPotential': annualEarningPotential 
        }));
      } else {
      dispatch(setListStorage({ ...reduxData, ...data, [name]: e.target.value }));
    }
  }
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    if(reduxData && reduxData['stage3.PropertyVideo'] && (reduxData['stage3.PropertyVideo'].size/(1024 * 1024)>5)){
      setMultipleError({'stage3.PropertyVideo':"Video size is too large"});
      return
    }
    const allKeys = Object.keys(reduxData);
    const formData = new FormData();
    reduxData['stage3.PropertyImages']?.forEach((image) => {
      formData.append('stage3.PropertyImages', image);
    });
    allKeys.forEach((item) => {
      formData.append(item, reduxData[item]);
    });

    const parameter = `?ApplicationUserId=${userId}&stage=3`;
    const response = await spaceListig(formData, parameter);
    if (response.success) {
      setCurrentItem("bankdetails");
    } else {
      setMultipleError(response.error.text);
      const firstErrorKey = Object.keys(response?.error?.text)[0];
      const firstErrorElement = formRef.current.querySelector(`[data-error=${firstErrorKey}]`);
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };


 const removeImage = (index)=>{
  const updatedValue = currentImages.filter((_, i) => i !== index);
  setCurrentImages(updatedValue);
  dispatch(setListStorage({ ...reduxData, ['stage3.PropertyImages']: updatedValue }))
 }

 const removeVideo = (key)=>{
  const { [key]: _, ...newState } = reduxData;
  dispatch(setListStorage(newState))
 }

 useEffect(()=>{
  if(reduxData['stage3.PropertyImages'])
    setCurrentImages(reduxData['stage3.PropertyImages']);
},[])
const handleFocus = () => {
  setIsFocused(true);
};

const handleBlur = () => {
  if (!reduxData['stage3.PerDayRentalAmount']) {
    setIsFocused(false);
  }
};

  return (
    <form ref={formRef}  onSubmit={onsubmitHandler}>
      <div class="tab-pane mx-2 z-2 active" role="tabpanel" id="step3">
        <h4 class="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] mt-3">
          Add Space Photos<span class="text-danger">*</span>
        </h4>
        <p className="text-[14px] text-gray-500 py-2">
          Renters prioritize photos when selecting a space to reserve.
        </p>

        <div class="upload-section border-2 border-dashed border-gray-300 rounded-lg p-6 text-center font-normal text-base text-gray-600 cursor-pointer -webkit-text-size-adjust: 100%; -webkit-tap-highlight-color: transparent; cursor: pointer; text-align: center; box-sizing: border-box; margin: 0; padding: 0; outline: 0; vertical-align: baseline; -webkit-font-smoothing: antialiased; display: inline-block; font-style: normal; font-variant: normal; text-rendering: auto; line-height: 1; font-family: 'Font Awesome 5 Pro'; font-weight: 900; color: #1e80e8; font-size: 18px;">
          {/* <p class="mb-8">Renters prioritize photos when selecting a space to reserve.</p> */}
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
                name="stage3.PropertyImages"
                type="file"
                // accept=".jpg,.gif,.png,.jpeg,.webp"
                multiple
                accept="image/png,image/jpg,image/jpeg,image/webp" 
                class="opacity-0 absolute inset-0 cursor-pointer"
                onChange={onChange}
                min={1}
                max={4}
                 data-error="PropertyImages"
                // max="4"
              />
              <span class="file-size-limit text-gray-500 text-sm block ">
                Max size: 2MB
              </span>
              {error?.PropertyImages && (
              <p className="text-sm text-red-500">{error.PropertyImages}</p>
            )}
            </div>
          
      
        </div>
    <div className="flex">

{
  reduxData['stage3.PropertyImages'] && reduxData['stage3.PropertyImages'].map((item, index)=>{
    return(
      <div className="relative mt-1 ml-1">
      <img
        src={URL?.createObjectURL(item)}
        className="preview-image w-[100px] h-[50px]"
      />
        <p className=" absolute inset-0 cursor-pointer text-right mr-1" onClick={()=>removeImage(index)}>
        <RxCrossCircled className="text-red-600 float-right text-[25px]" />
                </p>
    
    </div>
    )
  })
}
</div>
{multipleError?.PropertyImage && (
            <p className="text-sm text-red-500">{multipleError?.PropertyImage}</p>
          )}
          
        <h4 class="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] mt-3 ">
          Add Space Video<span class="text-danger"></span>
        </h4>
        <p className="text-[14px] text-gray-500 py-2">
          Renters prioritize photos when selecting a space to reserve.
        </p>
        <div class="upload-section border-2 border-dashed border-gray-300 rounded-lg  text-center font-normal text-base text-gray-600 cursor-pointer -webkit-text-size-adjust: 100%; -webkit-tap-highlight-color: transparent; cursor: pointer; text-align: center; box-sizing: border-box; margin: 0; padding: 0; outline: 0; vertical-align: baseline; -webkit-font-smoothing: antialiased; display: inline-block; font-style: normal; font-variant: normal; text-rendering: auto; line-height: 1; font-family: 'Font Awesome 5 Pro'; font-weight: 900; color: #1e80e8; font-size: 18px;">
        <div class="my-2 file-upload-container relative">
              <label
                for="multiplefileupload"
                class="upload-button  text-blue-500 px-4 rounded cursor-pointer inline-block"
              >
                <img
                  className="m-auto"
                  src="/images/icon/Upload Image Icon.svg"
                  alt=""
                /> 
                Upload videos
              </label>
              <div class="file-upload-contain">
                <input
                  id="multiplefileuploadvideo"
                  name="stage3.PropertyVideo"
                  onChange={onChange}
                  type="file"
                  accept=".mp4, .avi, .mov, .wmv, .mkv, .flv, .m4v, .webm, .mpeg, .mpg, .3gp"
                  multiple
                   data-error="PropertyVideo"
                  class="opacity-0 absolute inset-0 cursor-pointer"
                />
                               {multipleError?.text?.PropertyVideo && (
            <p className="text-sm text-red-500">{multipleError?.text?.PropertyVideo}</p>
          )}
                <span class="file-size-limit text-gray-500 text-sm block ">
                  Max size: 5MB
                </span>
                {error?.PropertyVideo && (
                <p className="text-sm text-red-500">{error.PropertyVideo}</p>
              )}
              </div>
            </div>
          
        
        </div>
        {reduxData["stage3.PropertyVideo"] && (
            <div className="relative pt-3">
              <video
                src={reduxData["stage3.PropertyVideo"] && reduxData['videoUrl']}
                className="preview-image w-['338px']"
              />
              <div className="">
               
                          {multipleError?.text?.PropertyImage && (
            <p className="text-sm text-red-500">{multipleError?.text?.PropertyImage}</p>
          )}
                <p className=" absolute inset-0 cursor-pointer text-right mr-1" onClick={()=>{removeVideo('stage3.PropertyVideo')}}>
                <RxCrossCircled className="text-red-600 float-right text-[25px]" />
                </p>
              </div>
            </div>
          )}
        <div class="row">
          <div class="col-md-12">
            <fieldset class="name-wrap">
              <label className={formLabelStyle}>
                Daily Rental Price <span class="text-danger">*</span>
              </label>
        <div className="w-full pl-1  mt-2  border rounded-md focus:outline-none bg-white flex justify-center items-center">
        <span className="px-1">₹</span>
              <input
            type="text"
            className="w-full px-2 py-2 rounded-md bg-gray-100  focus:outline-none "
            name="stage3.PerDayRentalAmount"
            placeholder={isFocused ? "" : `${reduxData['stage3.PerDayRentalAmount']} (Recommended)`}
            required
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={isFocused ? reduxData['stage3.PerDayRentalAmount'] : ""}
            data-error="PerDayRentalAmount"
          />
        </div>
              <label className="mt-1  text-green-600">
                Annual Earning Potential ₹ {reduxData['stage3.annualEarningPotential']}
              </label>
                                 {multipleError?.PerDayRentalAmount && (
            <p className="text-sm text-red-500">{multipleError?.PerDayRentalAmount}</p>
          )}
            </fieldset>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="bookingDays" className={formLabelStyle}>
                Minimum Number of Booking days
                <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={formInputStyle}
                name="stage3.MinimumBookingDays"
                placeholder="Enter days"
                // required
                onChange={onChange}
                value={reduxData['stage3.MinimumBookingDays']}
                 data-error="MinimumBookingDays"
              />
              {multipleError?.MinimumBookingDays && (
            <p className="text-sm text-red-500">{multipleError?.MinimumBookingDays}</p>
          )}

              {/* <select id="bookingDays" className={formSelectStyle} name='stage3.MinimumBookingDays' onChange={onChange}>
              <option value="" disabled selected>Select</option>
              <option value="2">2 Months</option>
              <option value="3">3 Months</option>
              <option value="4">4 Months</option>
            </select> */}
            </div>
          </div>
        </div>

        <fieldset class="message-wrap">
          <label className={formLabelStyle}>Describe your space</label>
          <textarea
            className="pl-15 border w-full rounded p-2"
            id="comment-message"
            name="stage3.Description"
            rows="4"
            tabindex="4"
            onChange={onChange}
            placeholder="Type a small summary"
            oninput="countCharacters()"
            value={reduxData['stage3.Description']}
             data-error="Description"
            maxLength="100"
          ></textarea>
          <div id="char-count" class="char-count text-right">
          {charCount}/100
          </div>
          {multipleError?.Description && (
            <p className="text-sm text-red-500">{multipleError?.Description}</p>
          )}
        </fieldset>
        
        {/* background: linear-gradient(277.45deg, rgba(243, 193, 14, 0.3) 1.14%, rgba(243, 193, 14, 0) 100%); */}

        {/* <div class="ar-version p-2 border border-solid border-gradient-to-br from-yellow-400 via-transparent to-transparent rounded-lg bg-cover" style={{ backgroundImage: "url(/images/banners/Design-banner.png)" }}>
          <div class="icon-text flex items-center justify-start">
            <div class="ic">
              <img src="/images/icon/space-photo.svg" alt="" /> 
            </div>
            <h2 class="fs-14 fw-5 text-[16px] font-semibold text-[#1B1C57] text-color-4 ml-2">
              Create AR version of your space?
            </h2>
          </div>
          <p class="mb-2 text-[14px] text-gray-500">
            Let people know how much they can store in your space using our
            Augmented Reality.
          </p>
          <a class="link text-info fw-6" href="#">
            Let’s start
          </a>
        </div> */}

        <div class="wizard-footer my-5 w-[100%]">
            <ul class="d-flex justify-content-between w-full gap-2">
              <li className="w-1/2">
                <button
                  type="button"
                  class=" w-full default-btn prev-step btn btn-outline-primary p-2"
                  onClick={()=>{setCurrentItem("spaceAddress")}}
                >
                  Previous
                </button>
              </li>
              <li className="w-1/2">
                <button
                  type="submit"
                  className="w-full default-btn next-step btn text-white !bg-blue-500 btn-full p-2"
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

export default SpacePhoto;
