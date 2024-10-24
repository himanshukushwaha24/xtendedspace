import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { postUpdateUserBillingDetails } from "@/service/storageService";
import { getUserId } from "@/util/common";
import {
  easyStorageModalAddress,
  // getCityNearby,
  getCityNameByPincode,
} from "@/service/storageService";
import { servivePinCode } from "@/util/constant";

export default function Index({ data = {}, setData }) {

  const [multipleError, setMultipleError] = useState({});
  const [addressNearby, setAddressNearby] = useState();
  const [displayBankDetailsFields, setDisplayBankDetailsFields] =
    useState(false);
  const [displayUPIIDInput, setDisplayUPIIDInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [formResponseMSG, setFormResponseMSG] = useState("");
  const [callPincodeAPI, setCallPincodeAPI] = useState({
    call: false,
    value: ""
  });

  const [sendData, setSendData] = useState({
    PaymentType: "",
    upiid: data["bankAccountId"]?.["upiid"],
    bankName: data["bankAccountId"]?.["bankName"],
    accountNumber: data["bankAccountId"]?.["accountNumber"],
    accountName: data["bankAccountId"]?.["accountName"],
    ifscCode: data["bankAccountId"]?.["ifscCode"],
    bankAddress: data["bankAccountId"]?.["bankAddress"],
    address1: data["userAddress"]?.["address1"],
    address2: data["userAddress"]?.["address2"],
    pincode: data["userAddress"]?.["pincode"],
    city: data["userAddress"]?.["city"],
    state: data["userAddress"]?.["state"],
    AddressProofType: "",
    AddressProofImage: [],
    AddressId: data["userAddress"]?.["addressId"],
    bankAccountId: data["bankAccountId"]?.["bankAccountId"]
  });

  function onChange(e) {
    const { name, value, files } = e.target;
    if (files) {
      const fileArray = Array.from(files);
      setMultipleError({});
      setSendData({ ...sendData, [name]: fileArray });
    } else {
      if (name === "pincode" && value.length === 6) setCallPincodeAPI({ call: true, value: value });
      setMultipleError({});
      setSendData({ ...sendData, [name]: value });
    }
  }


 

  function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const allKeys = Object.keys(sendData);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, sendData[item]);

      // console.log('formData======', formData);
    });

    (async () => {
      // use USER ID 756 for For Testing.
      // It has dummy data.
      let args = `?ApplicationUserId=${getUserId()}`;
      // USE ID 756 FOR TESTING PURPOSE
      // let args = `?ApplicationUserId=756`;
      const response = await postUpdateUserBillingDetails(formData, args);
      if (response?.success) {
        setUpdated(true);
        setFormResponseMSG(response?.success?.data);
        setTimeout(() => {
          setUpdated(false);
          setFormResponseMSG("");
        }, 5000);
        
      }
      else {
        setMultipleError(response?.error?.text);
        setIsSubmitting(false);
        // console.log("billing api error msg ====== ", multipleError);
      }
    })();
  }

  function paymentMethodSelect(e) {
    const { value } = e.target;
    if (value === "UPIID") {
      setDisplayBankDetailsFields(false);
      setDisplayUPIIDInput(true);
    }
    if (value === "BankAccount") {
      setDisplayBankDetailsFields(true);
      setDisplayUPIIDInput(false);
    }
  }

  const fetchNearbyCities = async (value) => {
    try {
      const args = `?pinCode=${value || data["userAddress"]?.pincode}`;
      // old API for city, state, district names
      // const response = await getCityNearby(args);
      const response = await getCityNameByPincode(args);

      if (response?.success) {
        setAddressNearby(response?.success);
        setSendData({
          ...sendData, city: response?.success?.city, state: response?.success?.state
        });

       
      } else {
        console.error("Failed to fetch nearby cities", response.error);
        alert(response.error?.error);
      }
    } catch (error) {
      console.error("Error fetching nearby cities", error);
    }
  };

  useEffect(() => {
    callPincodeAPI.call && fetchNearbyCities(callPincodeAPI.value);
    setCallPincodeAPI({ call: false, value: null });
  }, [callPincodeAPI.call])

  useEffect(() => {
    console.error("data", data);
    if (data["userAddress"]?.pincode?.length === 6) {
      if (servivePinCode.includes(data["userAddress"]?.pincode)) {
        fetchNearbyCities();
      } else {
        alert("Sorry, Service not available");
      }
    }
  }, []);

  return (
    <>
      <form>
        <div className="flex items-center justify-between px-16 mb-3">
          <div>
            <h1 className="text-slate-500 font-bold text-xl">
              Billing Details
            </h1>
          </div>
          <div>
            {/* <p className="text-slate-500 text-sm">Last updated</p> */}
          </div>
        </div>

        <div className="flex items-center flex-wrap py-3 w-full bg-slate-100 mt-8">
          <p className="text-blue-500 ml-16 text-[13px]">Payment Details</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-x-2 w-full px-16 mt-3">
            <div className="flex flex-col w-full">
              <p className="text-[13px] mb-1">Payment Type</p>
              <select
                className="w-full h-[42px] outline-none rounded-lg pl-4 text-[15px]"
                onChange={(e) => { onChange(e); paymentMethodSelect(e) }}
                required
                name="PaymentType"
              >
                <option value="" selected disabled>
                  Select
                </option>
                <option value="UPIID">UPI ID</option>
                <option value="BankAccount">Bank Details</option>
              </select>
              {multipleError?.PaymentType && <p className="text-red-500 mt-2 mb-2 ml-2">{multipleError?.PaymentType}</p>}
            </div>
            {displayUPIIDInput && (
              <div className="flex flex-col w-full">
                <p className="text-[13px] mb-1">UPI ID</p>
                <input
                  type="text"
                  name="upiid"
                  className="w-full h-[42px] outline-none rounded-lg pl-4 text-[15px]"
                  placeholder="Enter UPI ID"
                  value={sendData?.upiid}
                  onChange={onChange}
                  required
                />
                {multipleError?.UPIID && <p className="text-red-500 mt-2 mb-2 ml-2">{multipleError?.UPIID}</p>}
              </div>
            )}
            {displayBankDetailsFields && (
              <>
                <div className="flex flex-col w-full">
                  <p className="text-[13px] mb-1">Bank Name</p>
                  <input
                    type="text"
                    name="bankName"
                    className="w-full h-[42px] outline-none rounded-lg pl-4 text-[15px]"
                    placeholder="Bank Name"
                    value={sendData?.bankName}
                    onChange={onChange}
                    required
                  />
                  {multipleError?.BankName && <p className="text-red-500 mt-2 mb-2 ml-2">{multipleError?.BankName}</p>}
                </div>
                <div className="flex flex-col w-full mt-3">
                  <p className="text-[13px] mb-1">Account Number</p>
                  <input
                    type="text"
                    name="accountNumber"
                    className="w-full h-[42px] outline-none rounded-lg pl-4 text-[15px]"
                    placeholder="Account Number"
                    value={sendData?.accountNumber}
                    onChange={onChange}
                    required
                  />
                  {multipleError?.AccountNumber && <p className="text-red-500 mt-2 mb-2 ml-2">{multipleError?.AccountNumber}</p>}
                </div>
                <div className="flex flex-col w-full mt-3">
                  <p className="text-[13px] mb-1">Account Holder Name</p>
                  <input
                    type="text"
                    name="accountName"
                    className="w-full h-[42px] outline-none rounded-lg pl-4 text-[15px]"
                    placeholder="Account Holder Name"
                    value={sendData?.accountName}
                    onChange={onChange}
                    required
                  />
                  {multipleError?.AccountName && <p className="text-red-500 mt-2 mb-2 ml-2">{multipleError?.AccountName}</p>}
                </div>
                <div className="flex flex-col w-full mt-3">
                  <p className="text-[13px] mb-1">IFSC Code</p>
                  <input
                    type="text"
                    name="ifscCode"
                    className="w-full h-[42px] outline-none rounded-lg pl-4 text-[15px]"
                    placeholder="IFSC Code"
                    value={sendData?.ifscCode}
                    onChange={onChange}
                    required
                  />
                  {multipleError?.IFSCCode && <p className="text-red-500 mt-2 mb-2 ml-2">{multipleError?.IFSCCode}</p>}
                </div>
                <div className="flex flex-col w-full mt-3">
                  <p className="text-[13px] mb-1">Bank Address</p>
                  <input
                    type="text"
                    name="bankAddress"
                    className="w-full h-[42px] outline-none rounded-lg pl-4 text-[15px]"
                    placeholder="Bank Address"
                    value={sendData?.bankAddress}
                    onChange={onChange}
                    required
                  />
                  {multipleError?.BankBranch && <p className="text-red-500 mt-2 mb-2 ml-2">{multipleError?.BankBranch}</p>}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center flex-wrap py-3 w-full bg-slate-100 mt-8">
          <p className="text-blue-500 ml-16 text-[13px]">Address Details</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-x-2 w-full px-16 mt-3">
            <div className="flex flex-col w-full">
              <p className="text-[13px] mb-1">Address line 1</p>
              <input
                type="text"
                name="address1"
                className="w-full h-[42px] outline-none rounded-lg pl-4 text-[15px]"
                placeholder="Address Line 1"
                value={sendData?.address1}
                onChange={onChange}
                required
              />
              {multipleError?.Address1 && <p className="text-red-500 mt-2 mb-2 ml-2">{multipleError?.Address1}</p>}
            </div>
            <div className="flex flex-col w-full">
              <p className="text-[13px] mb-1">Address line 2</p>
              <input
                type="text"
                name="address2"
                className="w-full h-[42px] outline-none rounded-lg pl-4 text-[15px]"
                placeholder="Address Line 2"
                value={sendData?.address2}
                onChange={onChange}
                required
              />
              {multipleError?.Address2 && <p className="text-red-500 mt-2 mb-2 ml-2">{multipleError?.Address2}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center justify-between gap-x-2 w-full px-16 mt-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 w-full">
              <div className="flex flex-col flex-wrap w-full">
                <p className="text-[13px] mb-1">Pincode</p>
                <input
                  type="text"
                  name="pincode"
                  className="w-full h-[42px] outline-none rounded-lg pl-4 text-[15px]"
                  placeholder="Pincode"
                  value={sendData?.pincode}
                  onChange={onChange}
                  required
                />
                {multipleError?.Pincode && <p className="text-red-500 mt-2 mb-2 ml-2">{multipleError?.Pincode}</p>}
              </div>
              <div className="flex flex-col flex-wrap w-full">
                <p className="text-[13px] mb-1">City</p>
                <input
                  type="text"
                  name="city"
                  className="w-full h-[42px] outline-none rounded-lg pl-4 text-[15px]"
                  placeholder="City"
                  value={sendData?.city}
                  onChange={onChange}
                  required
                />
                {multipleError?.City && <p className="text-red-500 mt-2 mb-2 ml-2">{multipleError?.City}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-2 w-full">
              <div className="flex flex-col flex-wrap w-full">
                <p className="text-[13px] mb-1">State</p>
                <input
                  type="text"
                  name="state"
                  className="w-full h-[42px] outline-none rounded-lg pl-4 text-[15px]"
                  placeholder="State"
                  value={sendData?.state}
                  onChange={onChange}
                  required
                />
                {multipleError?.State && <p className="text-red-500 mt-2 mb-2 ml-2">{multipleError?.State}</p>}
              </div>
            </div>

            <div className="flex lg:items-center text-start justify-start md:flex-col flex-wrap w-full mt-4">
              <p className="text-[13px] text-start w-full">Address Proof</p>
              <div className="flex items-start justify-center bg-white py-1 px-1 rounded-lg w-full">
                <div className="w-[50%]">
                  <Form.Select
                    name="AddressProofType"
                    className="outline-none border-none rounded-[0px] text-[15px]"
                    onChange={onChange}
                    required
                  >
                    <option value="" selected disabled>
                      Select
                    </option>
                    <option value="Electricity Bill">Electricity Bill</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Adhaar Card">Aadhar Card</option>
                  </Form.Select>
                </div>
                <div className="w-[50%]">
                  <Form.Control
                    type="file"
                    name="AddressProofImage"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    multiple
                    className="w-full h-[37px] outline-none border-none pl-4 text-[#8DC63F] bg-[#DAECC7] text-[15px]"
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start flex-wrap w-full mt-4">
              <p className="text-[13px] mb-1">PAN Card</p>
              <input
                type="text"
                className="w-full h-[42px] outline-none rounded-lg pl-4 text-[15px]"
                id="pandcard"
                style={{ backgroundColor: "#DAECC7", color: "#8DC63F" }}
                placeholder="Submitted"
                readOnly
              />
            </div>
          </div>
        </div>
        {updated && <p className={`text-green-500 text-xl mt-3 ml-16`}>{formResponseMSG}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="bg-blue-500 text-white text-center mt-12 mb-12 ml-16 px-16 py-2 rounded-lg text-[15px]"
        >
          Save
        </button>
      </form>
    </>
  );
}
