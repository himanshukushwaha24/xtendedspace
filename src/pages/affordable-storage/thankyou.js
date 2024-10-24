import { bookingcompleteCheckout, switchEasyStorage, uploadImageAfterBook } from "@/service/storageService";
import { getUserId } from "@/util/common";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

const Thankyou = () => {
  const [amount, setAmount] = useState();
  const router = useRouter();
  const [images, setImages] = useState();
  const [currentImages, setCurrentImages] = useState([]);
  const [multipleError, setMultipleError] = useState('');
  const [download, setDownload] = useState(false);
  const [message, setMessage] = useState('');
  const [storagemessage, setStoragemessage] = useState('');


  const onChangeHandler = (e) => {
    const { name, value, type, files } = e.target;
    const updatedValue = [...currentImages, ...Array.from(files)];
    setCurrentImages([...currentImages, ...Array.from(files)])


  }

  const removeImage = (index) => {
    const updatedValue = currentImages.filter((_, i) => i !== index);
    setCurrentImages(updatedValue);
  }

  const uploadImage = async () => {

    if (currentImages.length === 0) {
      // alert("Please select images")
      setMessage("Please select images");
      return
    }

    if (currentImages.length > 5) {
      // alert("Maximum 5 images allowed")
      setMessage("Maximum 5 images allowed");
      return
    }
    const formData = new FormData();
    currentImages?.forEach((image) => {
      formData.append('stage3.PropertyImages', image);
    });

    const PropertyBookingRequestId = router.query.PropertyBookingRequestId;
    const parameter = `?CurrentUserId=${getUserId()}&PropertyRequestId=${PropertyBookingRequestId}`;
    const response = await uploadImageAfterBook(formData, parameter);
    if (response.success) {
      setCurrentImages([]);
      // alert("Booking request image saved successfully")
      setMessage("Booking request image saved successfully");
      setTimeout(() => {
        router.replace('/?back=false'); 
      }, 1000);

    } else {
      setMultipleError(response.error);
      setMessage(response.error);
    }
  }


  

  useEffect(() => {
setTimeout(async()=>{
  const amountParam = router.query.amount;

    setAmount(amountParam);

   
},200)
  
  }, [router.query])


  const switchEasyPayHandler = async () => {
    const razorpay_order_id = router.query.razorpayOrderId;
    const razorpay_payment_id = router.query.razorpayPaymentId;
    const razorpay_signature = router.query.razorpaySignature;
    const paymentId = router.query.PropertyBookingRequestId;



    const args = `?PropertyBookingRequestId=${paymentId}&razorpayOrderId=${razorpay_order_id}&razorpayPaymentId=${razorpay_payment_id}&razorpaySignature=${razorpay_signature}`;
    const response = await switchEasyStorage(args);
    if (response.success) {
      // alert("Thanks, we will connect you soon")
      setStoragemessage("Thanks, we will connect you soon");
    }
  }

  



  const downloadReceipt = async()=>{
    const razorpay_order_id = router.query.razorpayOrderId;
    const razorpay_payment_id = router.query.razorpayPaymentId;
    const razorpay_signature = router.query.razorpaySignature;

    setDownload(true)

    const args  = `?razorpayOrderId=${razorpay_order_id}&razorpayPaymentId=${razorpay_payment_id}&razorpaySignature=${razorpay_signature}`;
    const res = await bookingcompleteCheckout(args);
    setDownload(false);
    if(res.success){
      window.open(res.success.paymentReceipt, '_blank');
    }
    
  }
  const [timeLeft, setTimeLeft] = useState();
  const getInitialTime = () => {
    const savedTime = localStorage.getItem('timer');
    return savedTime ? parseInt(savedTime, 10) : 1800; // 1800 seconds = 30 minutes
  };
  useEffect(()=>{
    setTimeLeft(getInitialTime());
  },[])
  const CountDown = ({seconds}) => {
    // 20 minutes in seconds

    useEffect(() => {
      if (timeLeft <= 0) return;
  
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        localStorage.setItem('timer', timeLeft);
      }, 1000);
  
      return () => clearInterval(timerId); // Cleanup the interval on component unmount
    }, [timeLeft]);
    let minutes = Math.floor(seconds / 60);
    minutes = minutes<10 ? `0${minutes}` : minutes;
    let remainingSeconds = seconds % 60;
    remainingSeconds = remainingSeconds<10 ? `0${remainingSeconds}` : remainingSeconds;
  ;
    //return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
 
  
    return (<>

    <div className="timerthank text-center w-full md:w-[10%]  h-auto md:h-[50vh] ">
                  <div className="flex justify-center items-center text-center py-4 md:py-0">
                    <img src="/images/icon/stopwatch 1.svg" alt="stopwatch" />
                  </div>
                  <div className="main-timer leading-[45px] text-[#374151]">
                    <div className="timer-display flex justify-center gap-2 items-center">
                      <div className="timer-block ">
                        <span className="timer-block__num rounded-xl bg-[#FFCE00] p-[10px] font-inter font-medium text-[38px] leading-11 text-[#374151] ">
                        {String(minutes).charAt(0)}
                        </span>
                        <span className="rounded-xl bg-[#FFCE00] p-[10px] font-inter font-medium text-[38px] leading-11 text-[#374151] ml-3">
                          {String(minutes).charAt(1)}
                        </span>
                      </div>
                      <div className="timer-block">
                        <span className="timer-block__num js-timer-seconds rounded-xl  p-[10px] font-inter font-medium text-[38px] leading-11 text-[#374151] ">
                          :
                        </span>
                      </div>
                      <div className="timer-block">
                        <span className="timer-block__num js-timer-minutes rounded-xl bg-[#FFCE00] p-[10px] font-inter font-medium text-[38px] leading-11 text-[#374151] ">
                       { String(remainingSeconds).charAt(0)}
                        </span>
                        <span className="rounded-xl bg-[#FFCE00] p-[10px] font-inter font-medium text-[38px] leading-11 text-[#374151] ml-3">
                       { String(remainingSeconds).charAt(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span>minutes</span>

                  <div>
    
    
    </div>  
                </div>
    </>)
  };


  return (
    <React.Fragment>
      <section className="w-full h-auto ">
        <section
          className="thank_you w-full  h-[auto] flex flex-col justify-center items-center"
        >
          {/* <div className="thankyou_upper w-full  h-auto md:h-[20vh] ">
            <div className="thankyou_linktag p-3">
              <ul className="flex text-center items-center pl-3 ">
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


              </ul>
            </div>
          </div> */}
          <div className="w-full md:w-[80vw] h-auto md:h-[20vh] mb-5">
            <div
              className="thankyou_down flex justify-center items-end text-center w-[full] h-auto md:h-[50vh] "
            >
              <div
                className="thankyou_mid w-full h-auto flex flex-col justify-center items-center"
              >
                <div className="">
                  <div className="happy_birthday flex justify-center items-center text-center">
                    <img src="/images/storagelisting/birthday.png" alt="birthday" />
                  </div>
                  <div className="thankyou_message text-[#1B1C57] font-inter font-bold text-[34px] leading-[41px] py-2">Thankyou!</div>
                  <p className="font-inter font-normal text-sm md:text-[30px] leading-9 text-[#374151]  py-4 mb-0 md:mb-5">Your request has been sent to the host for the approval</p>
                </div>
                <div className="w-full md:w-auto flex justify-center items-center  h-[72px] bg-[#5eb3fe2e] rounded-xl px-2 md:px-[10px] py-3 md:py-[19px] mt-0 md:mt-[45px] ">
                  <h2 className=" font-inter font-medium text-[11.37px] md:text-[24px] leading-[30px] text-[#106BE0] ml-2 md:0 mr-2 md:0  ">
                    You will received a confirmation notification from host within 24
                    hrs
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[95vw] h-auto flex flex-col justify-center items-center border border-solid border-gray-300 rounded-xl ml-3 md:ml-0  mr-3 md:mr-0 ">
            <div className="flex justify-center items-center text-center">
              <div className="w-[full] h-auto  justify-center items-center text-center">
                <div className="font-inter font-semibold text-lg md:text-3xl text-[#1B1C57] p-2 md:p-4 mt-3">
                  Upload your items images
                </div>
                <div className="font-inter  font-semibold text-sm md:text-xl leading-4 md:leading-9 text-[#1B1C57] pb-2">
                  For the host to verify
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center text-center w-full h-auto gap-6 p-4">
              <div className="upload-section w-full md:w-[250px] border-2 border-dashed border-gray-300 rounded-lg p-6 text-center font-normal text-base text-gray-600 cursor-pointer ">
                <div className="file-upload-container relative">
                  <label
                    for="multiplefileupload"
                    className="upload-button  text-blue-500  rounded cursor-pointer inline-block"
                  >
                    <img
                      className="m-auto font-medium leading-5 text-xs"
                      src="/images/icon/Upload Image Icon.svg"
                      alt=""
                    />
                    Upload Images
                  </label>
                  <input
                    id="multiplefileupload"
                    name="stage3.PropertyImages"
                    type="file"
                    accept="image/png,image/jpg,image/jpeg,image/webp" 
                    multiple
                    className="opacity-0 absolute inset-0 cursor-pointer"
                    onChange={onChangeHandler}
                  />
                  <span className="file-size-limit text-gray-500 text-sm block ">
                    Max size: 2MB (max 5 Images)
                  </span>
                </div>
              </div>
              {/* <div className="upload-section w-full md:w-[150px] border-2  border-gray-300 rounded-lg p-6 text-center font-normal text-base text-gray-600 cursor-pointer ">
            <div className="file-upload-container relative">
              <label
                for="multiplefileupload"
                className="upload-button  text-blue-500  rounded cursor-pointer inline-block text-wrap text-[12px] leading-5"
              >
                <img
                  className="m-auto "
                  src="/images/icon/Add Circle.svg"
                  alt="AddImages"
                />
                Add up to 5 Images
              </label>
              <input
                id="multiplefileupload"
                name="stage3.PropertyImages"
                type="file"
                accept="image/png,image/jpg,image/jpeg,image/webp" 
                multiple
                className="opacity-0 absolute inset-0 cursor-pointer"
              />
            </div>
          </div> */}
            </div>


            <div className="flex">

              {
                currentImages && currentImages.map((item, index) => {
                  return (
                    <div className="relative mt-1 ml-1">
                      <img
                        src={URL?.createObjectURL(item)}
                        className="preview-image w-[100px] h-[50px]"
                      />
                          <p className=" absolute inset-0 cursor-pointer text-right mr-1" onClick={() => removeImage(index)}>
                <RxCrossCircled className="text-red-600 float-right text-[25px]" />
                </p>
                      {/* // <p className=" absolute inset-0 cursor-pointer text-right mr-1" onClick={() => removeImage(index)}>
                      //   Remove
                      // </p> */}

                    </div>
                  )
                })
              }

            </div>
            {multipleError && <p className="text-red-500 mt-4">{multipleError}</p>} 
            {message && <p className={`mt-4 ${message.includes("successfully") ? 'text-green-500' : 'text-red-500'}`}>
              {message}</p>}
            <div className="w-full h-auto flex justify-center items-center py-4">
              <button className="bottom_butt w-[200px]   text-center p-2  bg-[#338CFF] rounded -lg text-white" onClick={uploadImage}>
                Submit
              </button>
            </div>
          </div>

          <section className="thanktimer w-full  h-auto mt-4 mb-4 pt-3 pb-3 border border-gray-300 rounded-lg ">
            <div
              className=" w-full h-auto md:h-[100vh] flex flex-col lg:flex-row justify-center items-center text-center   rounded-2xl"
            >
              <div className="thankyou_left  flex justify-center items-center w-full lg:w-[50vw]  h-full md:h-[50vh] bg-[#F7F9FC]">
              <CountDown seconds={timeLeft}/>
              </div>
              <div className="thankyou_right w-full h-auto  bg-white">
                <div className="thankyou_short w-full h-auto  justify-start">
                  <div className="thankyou_quickly font-inter font-semibold text-sm text-left  md:text-3xl text-[#1B1C57] py-3 md:py-3 px-4">
                    Short on time but need to store it quickly?
                  </div>
                  <div className="simplythank   font-inter font-normal text-[#374151] text-sm md:text-2xl py-2 text-left px-4">
                    Simply pay additional charge to switch straight to Easy Storage.

                  </div>
                
                  <div className="flex justify-evenly paidstorageboth py-4 gap-2 md:gap-0 ">
                    <div className="paidstorageboth_left rounded-xl px-2 md:px-[25px]  py-[19px] gap-[10px] bg-[#F7F9FC]">
                      Paid Amount ₹{amount && amount/100+".00"}
                    </div>
                    {/* <div className="paidstorageboth_right rounded-xl px-[10px] py-[19px] gap-[10px] bg-[#F7F9FC]">
                      Easy Storage Price ₹6000
                    </div> */}
                  </div>
                  <button className="clickto_paybutton w-[80vw] md:w-[38vw] rounded-md md:rounded-xl px-1 md:px-[10px] py-2 md:py-[19px] gap-[6px] bg-[#8DC63F] mt-4" onClick={downloadReceipt} disabled={download}>
                    <div className="font-inter font-bold text-2xl leading-8 text-white">
                   { download?"downloading...": 'Download Receipt'}
                    </div>

                  </button>
                  <button className="clickto_paybutton w-[80vw] md:w-[38vw] rounded-md md:rounded-xl px-1 md:px-[10px] py-2 md:py-[19px] gap-[6px] bg-[#8DC63F] mt-4" onClick={switchEasyPayHandler}>
                    <div className="font-inter font-bold text-2xl leading-8 text-white">
                      Switch to Easy Storage
                    </div>
                    
                  </button>
                </div>
            {storagemessage && <p className="text-green-500 mt-4">{storagemessage}</p>}

              </div>
            </div>
          </section>
        </section>

      </section>
    </React.Fragment>
  );
};

export default Thankyou;
