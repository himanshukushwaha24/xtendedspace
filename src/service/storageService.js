import { route } from "../service/route";
import { callAPI } from "./api";

const spaceListig = async (data, parameter) => {
  const response = await callAPI(
    route.spaceListig,
    route.spaceListig.endPoint + parameter,
    data
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getAllStorage = async (filterString) => {
  const response = await callAPI(
    route.getAllStorage,
    route.getAllStorage.endPoint + filterString
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getAllStorageById = async (filterString) => {
  const response = await callAPI(
    route.getAllStorageById,
    route.getAllStorageById.endPoint + filterString
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};
const getAllStorageByDate = async (filterString) => {
  const response = await callAPI(
    route.getAllStorageByDate,
    route.getAllStorageByDate.endPoint + filterString
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getAllStorageByAmount = async () => {
  const response = await callAPI(
    route.getAllStorageByAmount,
    route.getAllStorageByAmount.endPoint
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const easyStorage = async (args) => {
  const response = await callAPI(
    route.easyStorage,
    route.easyStorage.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const easyStoragestage1 = async (args, data) => {
  const response = await callAPI(
    route.easyStorageStage1,
    route.easyStorageStage1.endPoint + args,
    data
  );
 
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const easyStoragestage1Res = async (args) => {
  const response = await callAPI(
    route.easyStorageGetstage1,
    route.easyStorageGetstage1.endPoint + args
  );
  if (response?.status === 200) {
    return { success:response.data };
  } else {
    return { error: response?.data };
  }
};

const p2pStorageStage1 = async (args) => {
  const response = await callAPI(
    route.p2pStorageGetstage1,
    route.p2pStorageGetstage1.endPoint + args
  );
  if (response?.status === 200) {
    return { success:response.data };
  } else {
    return { error: response?.data };
  }
};

const easyStorageModalAddress = async (formData) => {

  const response = await callAPI(
    route.easyStorageModalAddress,
    route.easyStorageModalAddress.endPoint,
    formData
  );
  if (response?.status === 200) {
    return { success: response?.data };
  } else {
    return { error: response?.data };
  }
};

const getEasyStorageDate = async (args) => {
  const response = await callAPI(
    route.easyStorageEndDate,
    route.easyStorageEndDate.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getPaymentGateway = async (args) => {
  const response = await callAPI(
    route.paymentGateway,
    route.paymentGateway.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getPaymentGatewayBooking = async (args) => { 
  const response = await callAPI(
    route.bookingPaymentGateway,
    route.bookingPaymentGateway.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getPaymentGatewayBookingCheckout = async (args) => { 
  const response = await callAPI(
    route.bookingPaymentGatewayCheckout,
    route.bookingPaymentGatewayCheckout.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const GenerateQuotation = async (args) => {
  const response = await callAPI(
    route.GenerateQuotation,
    route.GenerateQuotation.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};
const getUserAddress = async (args) => {
  const response = await callAPI(
    route.getUserAddress,
    route.getUserAddress.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};
const getCityNearby = async (args) => {
  const response = await callAPI(
    route.getCityNearby,
    route.getCityNearby.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};
const offerLanding = async (args, formData) => {
  const response = await callAPI(
    route.offerLanding,
    route.offerLanding.endPoint + args,
    formData
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};
const authResendOtp = async (args, formData) => {
  const response = await callAPI(
    route.authResendOtp,
    route.authResendOtp.endPoint + args,
    formData
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const SaveB2BStorageTypeData = async (data) => {
  const response = await callAPI(
    route.SaveB2BStorageTypeData,
    route.SaveB2BStorageTypeData.endPoint,
    data
  );

  if (response.status === 200) {
    return { success: response.data };
  } else {
    return { error: response.data };
  }
};

const SaveDelhiLandingData = async (data) => {
  const response = await callAPI(
    route.SaveDelhiLandingData,
    route.SaveDelhiLandingData.endPoint,
    data
  );

  if (response.status === 200) {
    return { success: response.data };
  } else {
    return { error: response.data };
  }
};

const completeCheckout = async (args) => {
  const response = await callAPI(
    route.completeCheckout,
    route.completeCheckout.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const CalculationBookingAmount = async (args) => {
  const response = await callAPI(
    route.CalculationBookingAmount,
    route.CalculationBookingAmount.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};
const SaveBookingDetails = async (args, data) => {
  const response = await callAPI(
    route.SaveBookingDetails,
    route.SaveBookingDetails.endPoint + args,
    data
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const switchEasyStorage = async (args) => {
  const response = await callAPI(
    route.switchEasyStorage,
    route.switchEasyStorage.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const uploadImageAfterBook = async (data, args) => {
  const response = await callAPI(
    route.uploadImageAfterBook,
    route.uploadImageAfterBook.endPoint + args,
    data
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getProfileBank = async (args) => {
  const response = await callAPI(
    route.getProfileBank,
    route.getProfileBank.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const bookingcompleteCheckout = async (args) => {
  const response = await callAPI(
    route.bookingCompleteCheckout,
    route.bookingCompleteCheckout.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const easyStorageGenerateInvoice = async (args) => {
  const response = await callAPI(
    route.easyStorageGenerateInvoice,
    route.easyStorageGenerateInvoice.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getEasyStorageBookingData = async (args) => {
  const response = await callAPI(
    route.getEasyStorageBookigData,
    route.getEasyStorageBookigData.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getBookingDataByUserId = async (args) => {
  const response = await callAPI(
    route.getBookingDataByUserId,
    route.getBookingDataByUserId.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getBookingRequestDataByUserId = async (args) => {
  const response = await callAPI(
    route.getBookingRequestDataByUserId,
    route.getBookingRequestDataByUserId.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getListingCurrentUserListing = async (args) => {
  const response = await callAPI(
    route.getListingCurrentUserListing,
    route.getListingCurrentUserListing.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getPendingApprovalsRequestData = async (args) => {
  const response = await callAPI(
    route.getPendingApprovalsRequestData,
    route.getPendingApprovalsRequestData.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const postUpdateUserBillingDetails = async (data, args) => {
  const response = await callAPI(
    route.postUpdateUserBillingDetails,
    route.postUpdateUserBillingDetails.endPoint + args,
    data
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const postUpdateProfileDetails = async (data, args) => {
  const response = await callAPI(
    route.postUpdateProfileDetails,
    route.postUpdateProfileDetails.endPoint + args,
    data
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const postSendOtpForChangeNumber = async (data, args) => {
  const response = await callAPI(
    route.postSendOtpForChangeNumber,
    route.postSendOtpForChangeNumber.endPoint + args,
    data
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const postVerifyOtpForChangeNumber = async (args) => {
  const response = await callAPI(
    route.postVerifyOtpForChangeNumber,
    route.postVerifyOtpForChangeNumber.endPoint + args,
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const postSendOtpForChangeEmail = async (data, args) => {
  const response = await callAPI(
    route.postSendOtpForChangeEmail,
    route.postSendOtpForChangeEmail.endPoint + args,
    data
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const postVerifyOtpForChangeEmail = async (args) => {
  const response = await callAPI(
    route.postVerifyOtpForChangeEmail,
    route.postVerifyOtpForChangeEmail.endPoint + args,
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const postUploadProfilePicture = async (data, args) => {
  const response = await callAPI(
    route.postUploadProfilePicture,
    route.postUploadProfilePicture.endPoint + args,
    data
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getProfilePicture = async (args) => {
  const response = await callAPI(
    route.getProfilePicture,
    route.getProfilePicture.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const postApprovePropertyBookingRequestByHost = async (args) => {
  const response = await callAPI(
    route.postApprovePropertyBookingRequestByHost,
    route.postApprovePropertyBookingRequestByHost.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const postRejectedPropertyBookingRequestByHost = async (args) => {
  const response = await callAPI(
    route.postRejectedPropertyBookingRequestByHost,
    route.postRejectedPropertyBookingRequestByHost.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const getHostBookedPropertyDataByUserIdApplicationUserId = async (args) => {
  const response = await callAPI(
    route.getHostBookedPropertyDataByUserIdApplicationUserId,
    route.getHostBookedPropertyDataByUserIdApplicationUserId.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};


const SaveMultipleStorageInMumbai = async (data) => {
  const response = await callAPI(
    route.SaveMultipleStorageInMumbai,
    route.SaveMultipleStorageInMumbai.endPoint,
    data
  );

  if (response.status === 200) {
    return { success: response.data };
  } else {
    return { error: response.data };
  }
};

const SaveCityWiseLandingDetails = async (data) => {
  const response = await callAPI(
    route.SaveCityWiseLandingDetails,
    route.SaveCityWiseLandingDetails.endPoint,
    data
  );

  if (response.status === 200) {
    return { success: response.data };
  } else {
    return { error: response.data };
  }
};

const getCityNameByPincode = async (args) => {
  const response = await callAPI(
    route.getCityNameByPincode,
    route.getCityNameByPincode.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};
const SaveOutdoorMarketingDetails = async (data) => {
  const response = await callAPI(
    route.SaveOutdoorMarketingDetails,
    route.SaveOutdoorMarketingDetails.endPoint,
    data
  );

  if (response.status === 200) {
    return { success: response.data };
  } else {
    return { error: response.data };
  }
};

const GetUserNotification = async ( args) => {
  const response = await callAPI(
    route.GetUserNotification,
    route.GetUserNotification.endPoint + args
  );

  if (response.status === 200) {
    return { success: response.data };
  } else {
    return { error: response.data };
  }
};

const UnreadUserNotification = async ( args) => {
  const response = await callAPI(
    route.UnreadUserNotification,
    route.UnreadUserNotification.endPoint + args
  );

  if (response.status === 200) {
    return { success: response.data };
  } else {
    return { error: response.data };
  }
};

const UnreadAllUserNotification = async ( args) => {
  const response = await callAPI(
    route.UnreadAllUserNotification,
    route.UnreadAllUserNotification.endPoint + args
  );

  if (response.status === 200) {
    return { success: response.data };
  } else {
    return { error: response.data };
  }
};

export {
  bookingcompleteCheckout,
  getProfileBank,
  uploadImageAfterBook,
  switchEasyStorage,
  getPaymentGatewayBooking,
  spaceListig,
  getAllStorage,
  getAllStorageById,
  getAllStorageByDate,
  getAllStorageByAmount,
  easyStorage,
  easyStoragestage1,
  easyStorageModalAddress,
  getEasyStorageDate,
  getPaymentGateway,
  GenerateQuotation,
  getUserAddress,
  getCityNearby,
  offerLanding,
  authResendOtp,
  SaveB2BStorageTypeData,
  SaveDelhiLandingData,
  completeCheckout,
  CalculationBookingAmount,
  SaveBookingDetails,
  getBookingDataByUserId,
  getBookingRequestDataByUserId,
  getListingCurrentUserListing,
  getPendingApprovalsRequestData,
  postUpdateUserBillingDetails,
  postUpdateProfileDetails,
  postSendOtpForChangeNumber,
  postVerifyOtpForChangeNumber,
  postSendOtpForChangeEmail,
  postVerifyOtpForChangeEmail,
  postUploadProfilePicture,
  getProfilePicture,
  postApprovePropertyBookingRequestByHost,
  postRejectedPropertyBookingRequestByHost,
  getHostBookedPropertyDataByUserIdApplicationUserId,
  easyStoragestage1Res,
  SaveMultipleStorageInMumbai,
  SaveCityWiseLandingDetails,
  p2pStorageStage1,
  SaveOutdoorMarketingDetails,
  GetUserNotification,
  UnreadUserNotification,
  getCityNameByPincode,
  UnreadAllUserNotification,
  getPaymentGatewayBookingCheckout,
  easyStorageGenerateInvoice,
  getEasyStorageBookingData
};
