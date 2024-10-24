import {
  getPaymentGateway,
  GenerateQuotation,
  completeCheckout,
  getPaymentGatewayBooking,
  getPaymentGatewayBookingCheckout,
} from "@/service/storageService";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTokenAmount, getUserId } from "@/util/common";

const PayNowButton = ({
  paymentId,
  InfoId,
  isPaymentEnable,
  easyStorageId,
  page,
  propertyId,
  tokenMoney = 0,
}) => {
  const [downloadQuat, setDownloadQuot] = useState(false);
  const [paynowBtn, setPaynowBtn] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  //router.push("/list-storage/thankyou?razorpayOrderId=order_Oa2SuQRCiCtvTE&razorpayPaymentId=pay_Oa2TcvwF1HYDiw&razorpaySignature=d8e23bbb7db58333710260024274c638a6a2cc1cc3e092afbd08ce18e4163791&PropertyBookingRequestId=834&amount=100");

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const handleDownloadQuotation = async () => {
    if (!isPaymentEnable) {
      setError("Please fill all the required fields");
      return;
    }

    setError("");
    const args = `?InfoId=${InfoId}`;
    setDownloadQuot(true);
    const response = await GenerateQuotation(args);
    setDownloadQuot(false);
    if (response.success) {
      document.getElementById(
        "downloadPdf"
      ).href = `${response.success}`;
      setTimeout(() => {
        document.getElementById("downloadPdf").click();
      }, 1000);
    } else {
      setError(
        "Failed to generate quotation. Please fill all the required fields."
      );
      // setTimeout(() => setError(""), 2000);
    }
  };

  const paymentData = async (paymentId) => {
    let response = "";
    if (page === "booking") {

      const args = `?propertyBookingRequestId=${paymentId}&ApplicationUserId=${getUserId()}`;
      response = await getPaymentGatewayBooking(args);
    } else {
      const args = `?PaymentId=${paymentId}`;
      response = await getPaymentGateway(args);
    }

    if (response.success) {
      return response.success;
    }
  };
  const payNow = async () => {
    if (!isPaymentEnable) {
      setError("Please fill all the required fields");
      return;
    }
    setPaynowBtn(true);
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    const gatewayDetils = await paymentData(paymentId);

    // Make API call to the serverless API
    setPaynowBtn(false);
    var options = {
      key: gatewayDetils.key, // Enter the Key ID generated from the Dashboard
      name: "Xtended space",
      currency: gatewayDetils.currency,
      amount: gatewayDetils.amount,
      order_id: gatewayDetils.order_id,
      description: "Thankyou for your test donation",
      image: "https://www.xtendedspace.com/images/logo/XtendedSpace.webp",
      handler: async function (response) {
        const args = `?razorpayOrderId=${response.razorpay_order_id}&razorpayPaymentId=${response.razorpay_payment_id}&razorpaySignature=${response.razorpay_signature}`;
        if (page === "booking") {
          const res = await getPaymentGatewayBookingCheckout(args);
          if (res.success) {
           window.location.href = `/affordable-storage/thankyou${args}&PropertyBookingRequestId=${paymentId}&amount=${gatewayDetils?.amount}`;

          }

        
        }
        else{
          const res = await completeCheckout(args);
          if (res.success) {
            // console.log("redirecring...");
            window.location.href = `/easy-storage/thankyou${args}`;
          }
        }
      
      },
      prefill: {
        name: gatewayDetils.customerName,
        email: gatewayDetils.customerEmail,
        contact: gatewayDetils.phoneNumber,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const handlePreviousClick = () => {
    if (page === "booking") {
      //router.push(`/storage-details?propertyId=${propertyId}`);
      router.back()
          // residential-property/121-sq-ft-near-sector-63-in-noida-MN-PropertyId-1606          
    } else {
      router.push(`/easy-storage?easyStorageId=${InfoId}`);
    }
  };

  useEffect(() => {
    if (isPaymentEnable) {
      setError("");
    }
  }, [isPaymentEnable]);
  return (
    <>
      <div className="w-full">
        <div className="bottom_buttonsec flex   justify-center items-center w-full md:w-[450px] h-[48px] mx-[auto] gap-2">
          <div
            className={`cancel_buton flex justify-center items-center h-[48px] rounded-lg text-[#338CFF] border border-solid border-[#D1D5DB] bg-white cursor-pointer ${
              page === "booking" ? "w-full" : "md:w-[251px]"
            }`}
            onClick={handlePreviousClick}
          >
             
            Previous
          </div>
          {/* <div className="casncel_buton  flex justify-center items-center w-full md:w-[251px] h-[48px] rounded-lg   text-white border border-solid border-[#D1D5DB] bg-[#338CFF]">
                book now
              </div> */}
          {page !== "booking" && (
            <div className="bottom_buttonsec flex justify-center items-center  w-full md:w-[251px] h-[48px] rounded-lg  text-[#338CFF] border border-solid border-[#D1D5DB] bg-white cursor-pointer ">
              <button
                class=" flex font-bold justify-center items-center text-white  w-full md:w-[450px] text-center rounded-lg h-[100%] bg-blue-500 px-1   mx-[auto]"
                onClick={handleDownloadQuotation}
                disabled={downloadQuat}
              >
                {downloadQuat ? "Downloading..." : "Download Quotation"}
              </button>
            </div>
          )}
          <a className="hidden" id="downloadPdf" href="" target="_blank">
            Download
          </a>
        </div>
        {error && (
          <div className="error-message text-red-500 text-center mt-2">
            {error}
          </div>
        )}

        <button
          className="clickto_paybutton flex   justify-center items-center w-full md:w-[450px] h-[60px] mx-[auto] rounded-lg my-2 bg-[#8DC63F]"
          onClick={payNow}
          disabled={paynowBtn}
        >
          <div className="font-inter font-bold text-[20px] md:text-[22px] leading-tight text-white">
            Pay ₹{tokenMoney ? tokenMoney : 1000}
            <div className="font-inter font-normal text-[14px] md:text-[16px] leading-tight text-white ">
              Book with Token Money 
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default PayNowButton;
