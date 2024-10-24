import dynamic from "next/dynamic";
const HeaderMenu = dynamic(() => import("@/components/header/header"));
const Footer = dynamic(() => import("@/components/footer"));
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TbCalendarStats } from "react-icons/tb";
import { FaRegBuilding } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { RiFileListLine } from "react-icons/ri";
const EditProfile = dynamic(() => import("./edit_profile"));
const Billing_details = dynamic(() => import("./billing_details"));
const Bookings = dynamic(() => import("./bookings"));
const Listings = dynamic(() => import("./listings"));
const BillingDetails = dynamic(() => import("./billing_details"));
import { IoIosCamera } from "react-icons/io";
import {
  getProfileBank,
  getBookingDataByUserId,
  getBookingRequestDataByUserId,
  getListingCurrentUserListing,
  getPendingApprovalsRequestData,
  postUpdateUserBillingDetails,
  postUploadProfilePicture,
  getProfilePicture,
  getHostBookedPropertyDataByUserIdApplicationUserId,
} from "@/service/storageService";
import { getUserId, localStorageManager } from "@/util/common";
import { useRouter } from "next/router";
import LogoutModal from "@/sharedComponent/modal/LogoutModal";

export default function Index() {

  let args = "";
  // USE ID 756 FOR TESTING.
  // args = `?ApplicationUserId=756`;

  useEffect(() => {
    const user = localStorageManager.getValue("userDetails") || "";
    const jwt = localStorageManager.getValue("jwt") || "";

    if (!user || user === "" || user === null || user === undefined) {
      window.location.href = "/";
    }
    if (!jwt || jwt === "" || jwt === null || jwt === undefined) {
      window.location.href = "/";
    }
  }, []);

  const [userdata, setUserData] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({});
  const [bookingData, setBookingData] = useState([]);
  const [bookingRequestData, setBookingRequestData] = useState([]);
  const [currentListingData, setCurrentListingData] = useState([]);
  const [pendingApprovalsRequestData, setPendingApprovalsRequestData] =
    useState([]);
  const [profilePicture, setProfilePicture] = useState();
  const [hostBookedPropertyData, setHostBookedPropertyData] = useState([]);

  useEffect(() => {
    const userData = localStorageManager.getValue("userDetails") || "";
    userData && setUserData(JSON.parse(userData));
  }, []);

  // For logout
  const logout = () => {
    setShowPopup(true);
    // localStorageManager.setValue("userDetails", "");
  };

  function handleProfilePhotoChange(e) {
    e.preventDefault();
    let photoInput = document.getElementById("ImageFiles");
    photoInput.click();
  }

  function photoOnChange(e) {
    const formData = new FormData();
    const { name, files } = e.target;
    if (files) {
      formData.append(name, files[0]);
    }

    (async () => {
      args = `?ApplicationUserId=${getUserId()}`
      const uploadProfilePicResp = await postUploadProfilePicture(
        formData,
        args
      );
      
      if (uploadProfilePicResp?.success) {
        if (
          uploadProfilePicResp?.success?.message ===
          "Image uploaded successfully"
        ) {
          // alert("Profile updated successfully!");
          setProfilePicture(uploadProfilePicResp?.success?.profileImage);
        }
      }
      if (uploadProfilePicResp?.error) {
        alert("An error occured!");
      }
    })();
  }

  useEffect(() => {
    args = `?ApplicationUserId=${getUserId()}`;
    // args = `?ApplicationUserId=756`;
    (async () => {
      const profile_Details_Response = await getProfileBank(args);
      if (profile_Details_Response?.success) {
        setData(profile_Details_Response?.success?.data);
      }

      const post_Update_User_Billing_Details_response =
        await postUpdateUserBillingDetails();
      if (post_Update_User_Billing_Details_response?.success) {
        setUpdateUserBillingDetails(
          post_Update_User_Billing_Details_response?.success?.data
        );
      }
    })();

    (async () => {
      const getProfilePictureResp = await getProfilePicture(args);
      if (getProfilePictureResp?.success) {
        setProfilePicture(
          getProfilePictureResp?.success?.data?.profilePictureStoragePath
        );
      }

      const bookingDataByIdResponse_response = await getBookingDataByUserId(
        args
      );
      if (bookingDataByIdResponse_response?.success) {
        setBookingData(bookingDataByIdResponse_response?.success?.data);
      }

      const getBookingRequestDataByUserId_response =
        await getBookingRequestDataByUserId(args);
      if (getBookingRequestDataByUserId_response?.success) {
        setBookingRequestData(
          getBookingRequestDataByUserId_response?.success?.data
        );
      
      }

      const getListingCurrentUserListing_response =
        await getListingCurrentUserListing(args);
      if (getListingCurrentUserListing_response?.success) {
        setCurrentListingData(
          getListingCurrentUserListing_response?.success?.data
        );
       
      }

      const getPendingApprovalsRequestData_response =
        await getPendingApprovalsRequestData(args);
      if (getPendingApprovalsRequestData_response?.success) {
        setPendingApprovalsRequestData(
          getPendingApprovalsRequestData_response?.success?.data
        );
      }
    })();

    (async () => {
      const getHostBookedPropertyDataByUserIdApplicationUserId_response =
        await getHostBookedPropertyDataByUserIdApplicationUserId(args);
      if (
        getHostBookedPropertyDataByUserIdApplicationUserId_response?.success
      ) {
        setHostBookedPropertyData(
          getHostBookedPropertyDataByUserIdApplicationUserId_response?.success
            ?.data
        );
      }
    })();
  }, []);

  const options = {
    edit_profile: false,
    bookings: false,
    listings: false,
    billing_details: false,
    logout: false,
  };

  const [tab, setTab] = useState({
    edit_profile: true,
    bookings: false,
    listings: false,
    billing_details: false,
    logout: false,
  });

  const router = useRouter();
  // useEffect(() => {
  //   if (router.pathname === "/profile") {
  //     setTab({ ...options, edit_profile: true });
  //   }
  //   if (router.pathname === "/profile/bookings") {
  //     setTab({ ...options, bookings: true });
  //   }
  //   if (router.pathname === "/profile/listings") {
  //     setTab({ ...options, listings: true });
  //   }
  //   if (router.pathname === "/profile/billing-details") {
  //     setTab({ ...options, billing_details: true });
  //   }
  // }, [router.pathname]);

  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%]" >
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        name="ImageFiles"
        onChange={(e) => {
          photoOnChange(e);
        }}
        id="ImageFiles"
        className="hidden"
      />
      <HeaderMenu />
      <main className="min-h-[100vh] ">
        <div className="lg:flex">
          {/* Drawer left */}
          <div className="min-h-[auto] lg:min-h-[500px] flex flex-col-reverse lg:flex-col w-full lg:w-[300px]">
            <center>
              {/* Profile */}
              <div className="flex items-center justify-center bg-blue-400 h-[140px] w-[140px] rounded-full -z-10 mt-6">
                <div className="relative flex items-center justify-center h-[130px] w-[130px] bg-white rounded-full z-10">
                  <img
                    className="rounded-full h-full w-full object-cover"
                    src={profilePicture && profilePicture}
                    alt="profile pic"
                  />
                  <Link
                    href="#"
                    onClick={(e) => {
                      handleProfilePhotoChange(e);
                    }}
                  >
                    <IoIosCamera
                      size={30}
                      className="absolute bottom-[10px] right-[-4px] text-white bg-blue-500 rounded-full p-1"
                    />
                  </Link>
                </div>
              </div>
            </center>

            <div className="flex flex-col items-center">
              <div className="w-[100vw] lg:w-full flex lg:flex-col text-start mt-12 gap-y-2 overflow-x-auto whitespace-nowrap lg:whitespace-normal hide-scrollbar ">
                <Link
                  href="#"
                  onClick={() => {
                    setTab({ ...options, edit_profile: true });
                  }}
                  className={`flex items-center w-full py-2 px-12 rounded-lg gap-x-2 text-slate-500 ${
                    tab.edit_profile && `bg-blue-100 text-black`
                  }`}
                >
                  <MdPersonOutline /> <p>Edit Profile</p>
                </Link>
                <Link
                  href="#"
                  onClick={() => {
                    setTab({ ...options, bookings: true });
                  }}
                  className={`flex items-center w-full py-2 px-12 rounded-lg gap-x-2 text-slate-500 ${
                    tab.bookings && `bg-blue-100 text-black`
                  }`}
                >
                  <TbCalendarStats /> <p>Bookings</p>
                </Link>
                <Link
                  href="#"
                  onClick={() => {
                    setTab({ ...options, listings: true });
                  }}
                  className={`flex items-center w-full py-2 px-12 rounded-lg gap-x-2 text-slate-500 ${
                    tab.listings && `bg-blue-100 text-black`
                  }`}
                >
                  <FaRegBuilding /> <p>Listings</p>
                </Link>
                <Link
                  href="#"
                  onClick={() => {
                    setTab({ ...options, billing_details: true });
                  }}
                  className={`flex items-center w-full py-2 px-12 rounded-lg gap-x-2 text-slate-500 ${
                    tab.billing_details && `bg-blue-100 text-black`
                  }`}
                >
                  <RiFileListLine /> <p>Billing Details</p>
                </Link>
                <LogoutModal showPopup={showPopup} setShowPopup={setShowPopup} setUserData={setUserData} />
                <Link
                  href="#"
                  onClick={() => {
                    setTab({ ...options, logout: true });
                    logout();
                  }}
                  // onClick={() => {handleLogout()}}
                  className={`flex items-center w-full py-2 px-12 rounded-lg gap-x-2 text-slate-500 ${
                    tab.logout && `bg-blue-100 text-black`
                  }`}
                >
                  <FiLogOut />
                  <p>Logout</p>
                </Link>
              </div>
            </div>
          </div>
          {/* Display */}
          <div className="min-h-[500px] w-full border-l-2 border-slate-100">
            {/* user details container */}
            <div className="w-full h-36 flex items-center justify-center text-center lg:justify-between">
              <div className="font-bold text-2xl ml-8">
                <h1>{`${data?.firstName || "User"} ${
                  data?.lastName || "Name"
                }`}</h1>
                <p className="text-slate-500 text-[13px]">
                  Joined {data?.joiningDate}
                </p>
              </div>
              <div className="">
                {/* <div className="flex flex-col items-center justify-center bg-slate-100 rounded-lg px-4 py-2 mr-8">
                  <h1 className="text-2xl font-bold">600</h1>
                  <p className="text-slate-500 text-sm">Total Earnings</p>
                </div> */}
              </div>
            </div>
            {tab.edit_profile && <EditProfile data={data} setData={setData} />}
            {tab.billing_details && (
              <Billing_details data={data} setData={setData} />
            )}
            {tab.bookings && (
              <Bookings
                bookingData={bookingData}
                bookingRequestData={bookingRequestData}
              />
            )}
            {tab.listings && (
              <Listings
                currentListingData={currentListingData}
                pendingApprovalsRequestData={pendingApprovalsRequestData}
                hostBookedPropertyData={hostBookedPropertyData}
              />
            )}
            {false && <BillingDetails />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
