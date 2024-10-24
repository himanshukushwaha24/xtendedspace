import { easyStorage, getProfileBank } from "./storageService";

const route = {
  login: {
    endPoint: "user/signin ",
    verb: "post",
    isAuthRequired: false,
  },
  newUserRegister: {
    endPoint: "/Auth/NewUserRegister",
    verb: "post",
    isAuthRequired: false,
  },
  newUserRegisterOtpVerify: {
    endPoint: "/Auth/NewUserRegisterOtpVerify",
    verb: "post",
    isAuthRequired: false,
  },
  loginWithmobile: {
    endPoint: "/Auth/Login",
    verb: "post",
    isAuthRequired: false,
  },
  loginWithPassword: {
    endPoint: "/Auth/LoginWithPWD",
    verb: "post",
    isAuthRequired: false,
  },
  brokerRegisterOtpVerify: {
    endPoint: "/Auth/NewBrokerRegisterOtpVerify",
    verb: "post",
    isAuthRequired: false,
  },
  brokerlogin: {
    endPoint: "/Auth/LoginWithPWD",
    verb: "post",
    isAuthRequired: false,
  },
  brokersignUP: {
    endPoint: "/Auth/NewBrokerRegister",
    verb: "post",
    isAuthRequired: false,
  },
  getApiToken: {
    endPoint: "/Login/LoginWithKeys",
    verb: "post",
    isAuthRequired: false,
  },

  NewBrokerRegister: {
    endPoint: "/Auth/NewBrokerRegister",
    verb: "post",
    isAuthRequired: false,
  },
  PrivacyPolicies: {
    endPoint: "/Auth/PrivacyPolicies",
    verb: "get",
    isAuthRequired: false,
  },

  TermAndCondition: {
    endPoint: "/Auth/TermAndCondition",
    verb: "get",
    isAuthRequired: false,
  },
  AboutUs: {
    endPoint: "/Auth/AboutUs",
    verb: "get",
    isAuthRequired: false,
  },
  ContactUs: {
    endPoint: "/Auth/ContactUs",
    verb: "post",
    isAuthRequired: false,
  },
  EditProfile: {
    endPoint: "/Profile/EditProfile",
    verb: "post",
    isAuthRequired: false,
  },
  Logout: {
    endPoint: "/Profile/LogOut",
    verb: "post",
    isAuthRequired: false,
  },
  authLogin: {
    endPoint: "/Auth/UserLogin",
    verb: "post",
    isAuthRequired: false,
  },
  authOtpVerify: {
    endPoint: "/Auth/OtpVerify",
    verb: "get",
  },
  registerAuthOtpVerify: {
    endPoint: "/Auth/NewUserRegisterOtpVerify",
    verb: "post",
  },
  resetPassword: {
    endPoint: "/Auth/ResetPassword",
    verb: "post",
  },
  contact_us: {
    endPoint: "/Auth/ContactUs",
    verb: "post",
  },
  spaceListig: {
    endPoint: "/Listing/AddUserListingData_New",
    verb: "post",
  },
  getAllStorage: {
    endPoint: "/BookingList/GetListingData",
    verb: "get",
  },
  getAllStorageById: {
    endPoint: "/BookingList/GetListingDataById",
    verb: "get",
  },

  getAllStorageByDate: {
    endPoint: "/BookingList/GetListingDataByDate",
    verb: "get",
  },

  getAllStorageByAmount: {
    endPoint: "/BookingList/CalculateEasyStorageAmount",
    verb: "post",
  },
  easyStorage: {
    endPoint: "/EasyStorage/CalculateEasyStorageAmount",
    verb: "get",
  },
  easyStorageStage1: {
    endPoint: "/EasyStorage/SaveEasyStorageData",
    verb: "post",
  },
  easyStorageModalAddress: {
    endPoint: "/Profile/AddUserAddress",
    verb: "post",
  },
  easyStorageEndDate: {
    endPoint: "/EasyStorage/CalculateEasyStorageEndDate",
    verb: "post",
  },
  paymentGateway: {
    endPoint: "/EasyStorage/StartCheckout",
    verb: "post",
  },

  GenerateQuotation: {
    endPoint: "/EasyStorage/GenerateQuotationPDF",
    verb: "post",
  },
  getUserAddress: {
    endPoint: "/Profile/GetUserAddress",
    verb: "get",
    isAuthRequired: false,
  },
  getCityNearby: {
    endPoint: "/Profile/GetCityNearby",
    verb: "get",
    isAuthRequired: false,
  },
  offerLanding: {
    endPoint: "/Landing/SaveLanding2Details",
    verb: "post",
    isAuthRequired: false,
  },
  // ResendLoginOtp:{
  //   endPoint:"/Landing/SaveLanding2Details",
  //   verb:'post',
  //   isAuthRequired: false,

  // },
  authResendOtp: {
    endPoint: "/Landing/ResendLandingDetailsOtp",
    verb: "post",
    isAuthRequired: false,
  },
  SaveMumbai: {
    endPoint: "/Landing/SaveMumbaiLandingData",
    verb: "post",
    isAuthRequired: false,
  },

  SaveB2BStorageTypeData: {
    endPoint: "/Landing/SaveB2BStorageTypeData",
    verb: "post",
    isAuthRequired: false,
  },

  SaveDelhiLandingData: {
    endPoint: "/Landing/SaveDelhiLandingData",
    verb: "post",
    isAuthRequired: false,
  },
  resendAuthOtp: {
    endPoint: "/Auth/ResendLoginOtp",
    verb: "post",
    isAuthRequired: false,
  },

  SaveRelocationSevices: {
    endPoint: "/Landing/SaveRelocationSevices",
    verb: "post",
    isAuthRequired: false,
  },
  emailPhoneOtpVerify: {
    endPoint: "/Auth/VerifyEmailOrPhoneOtp",
    verb: "post",
    isAuthRequired: false,
  },
  completeCheckout: {
    endPoint: "/EasyStorage/CompleteCheckout",
    verb: "post",
    isAuthRequired: false,
  },
  resendEmailOtp: {
    endPoint: "/Auth/ResendEmailOtp",
    verb: "post",
    isAuthRequired: false,
  },
  CalculationBookingAmount: {
    endPoint: "/BookingList/CalculationBookingAmount",
    verb: "get",
  },
  SaveBookingDetails: {
    endPoint: "/BookingList/SaveBookingDetails",
    verb: "post",
  },
  bookingPaymentGateway: {
    endPoint: "/BookingList/StartBookingCheckOut",
    verb: "post",
  },
  bookingPaymentGatewayCheckout: {
    endPoint: "/BookingList/CompleteBookingCheckout",
    verb: "post",
  },
  switchEasyStorage: {
    endPoint: "/BookingList/SaveP2PToEasyStorageData",
    verb: "post",
  },
  uploadImageAfterBook: {
    endPoint: "/BookingList/SaveBookingDetailsImage",
    verb: "post",
  },
  getProfileBank: {
    endPoint: "/Auth/GetUserProfileDetails",
    verb: "get",
  },
  bookingCompleteCheckout: {
    endPoint: "/BookingList/GetBookingPaymentInvoice",
    verb: "post",
  },
  getBookingDataByUserId: {
    endPoint: "/BookingList/GetBookingDataByUserId",
    verb: "get",
  },
  getBookingRequestDataByUserId: {
    endPoint: "/BookingList/GetBookingRequestDataByUserId",
    verb: "get",
  },
  getListingCurrentUserListing: {
    endPoint: "/Listing/CurrentUserListing",
    verb: "get",
  },
  getPendingApprovalsRequestData: {
    endPoint: "/Listing/GetPendingApprovalsRequestData",
    verb: "get",
  },
  postUpdateUserBillingDetails : {
    endPoint: "/Auth/UpdateUserBillingDetails",
    verb: "post",
  },
  postUpdateProfileDetails : {
    endPoint: "/Auth/UpdateProfileDetails",
    verb: "post",
  },
  postSendOtpForChangeNumber : {
    endPoint: "/Auth/SendOtpForChangeNumber",
    verb: "post",
  },
  postVerifyOtpForChangeNumber : {
    endPoint: "/Auth/VerifyOtpForChangeNumber",
    verb: "post",
  },
  postSendOtpForChangeEmail : {
    endPoint: "/Auth/SendOtpForChangeEmail",
    verb: "post",
  },
  postVerifyOtpForChangeEmail : {
    endPoint: "/Auth/VerifyOtpForChangeEmail",
    verb: "post",
  },
  postUploadProfilePicture : {
    endPoint: "/Auth/UploadProfilePicture",
    verb: "post",
  },
  getProfilePicture : {
    endPoint: "/Auth/GetProfilePicture",
    verb: "get",
  },
  postApprovePropertyBookingRequestByHost : {
    endPoint: "/Listing/ApprovePropertyBookingRequestByHost",
    verb: "post",
  },
  postRejectedPropertyBookingRequestByHost : {
    endPoint: "/Listing/RejectedPropertyBookingRequestByHost",
    verb: "post",
  },
  getHostBookedPropertyDataByUserIdApplicationUserId : {
    endPoint: "/Listing/GetHostBookedPropertyDataByUserId",
    verb: "get",
  },
  easyStorageGetstage1 : {
    endPoint: "/EasyStorage/GetEasyStorageResponseDataByEasyStorageId?EasyStorageId=",
    verb: "get",
  },
  SaveMultipleStorageInMumbai : {
    endPoint: "/Landing/SaveMultipleStorageInMumbai",
    verb: "post",
  },

  SaveCityWiseLandingDetails : {
    endPoint: "/Landing/SaveCityWiseLandingDetails",
    verb: "post",
  },
  p2pStorageGetstage1 : {
    endPoint: "/BookingList/GetPropertyResponseDataByBookingId?BookingId=",
    verb: "get",
  },
  getCityNameByPincode : {
    endPoint: "/Profile/GetCityNameByPincode",
    verb: "get",
  },

  SaveOutdoorMarketingDetails : {
    endPoint: "/Landing/SaveOutdoorMarketingDetails",
    verb: "post",
  },
  GetUserNotification : {
    endPoint: "/Profile/GetUserNotification",
    verb: "get"
  },
  UnreadUserNotification : {
    endPoint: "/Profile/UnreadUserNotification",
    verb: "post"
  },
  UnreadAllUserNotification : {
    endPoint: "/Profile/UnreadAllUserNotification",
    verb: "post"
  },
  easyStorageGenerateInvoice : {
    endPoint: "/EasyStorage/GeneratePaymentInvoice",
    verb: "get"
  },
  getEasyStorageBookigData : {
    endPoint: "/EasyStorage/GetBookedEasyStorageDetailsByUserId",
    verb: "get"
  },
};


export { route };
