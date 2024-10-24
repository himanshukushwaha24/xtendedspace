import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import LocationImage from "../../../public/images/icon/Location-green.svg";
import { getUserId } from "@/util/common";
import {
  postApprovePropertyBookingRequestByHost,
  postRejectedPropertyBookingRequestByHost,
} from "@/service/storageService";
import NoData from "@/components/NoData";

export default function Index({ pendingApprovalsRequestData }) {
 
  const [showApproved, setShowApproved] = useState({
    shouldVisible: true,
    index: "",
  });
  const [showText, setShowText] = useState(false);

  function handleApproveListing(propertyBookingRequestId, index) {
    (async () => {
      let args = `?ApplicationUserId=${getUserId()}&propertyBookingRequestId=${propertyBookingRequestId}`;
      const response = await postApprovePropertyBookingRequestByHost(args);
      if (response?.success) {
        setShowText(true);
        setTimeout(() => {
          setShowText(false);
        }, 2000);
        setTimeout(() => {
          setShowApproved({ shouldVisible: false, index: index });
        }, 500);
      }
    })();
  }

  function handleDeclineListing(propertyBookingRequestId) {

    (async () => {
      let args = `?ApplicationUserId=756&propertyBookingRequestId=${propertyBookingRequestId}`;
      const response = await postRejectedPropertyBookingRequestByHost(args);
      if (response?.success) {
        alert("Request Declined!");
      }
    })();
  }

  return (
    <React.Fragment>
      {showText && (<p className={`text-green-500 ml-12 text-xl pt-6`}>Request Approved!</p>)}
      {pendingApprovalsRequestData == "" && <NoData />}
      <div className="grid lg:grid-cols-2">
        {!!pendingApprovalsRequestData &&
          pendingApprovalsRequestData.map((items, index) => {
            // Object to send in params for view-details.jsx page.
            const data = {
              id: items.id,
              customerName: items.customerName,
              endDate: items.endDate,
              startDate: items.startDate,
              propertyImages: items.propertyImage,
              city: items.city,
              district: items.district,
            };
            return (
              <div
                className={`flex flex-col ml-12 mt-8 mb-8 ${
                  showApproved.index === index &&
                  !showApproved.shouldVisible &&
                  `hidden`
                }`}
                key={index}
              >
                <div className="flex flex-col items-start justify-around flex-wrap border-[1px] rounded-lg border-[#ddd] min-h-[280px] max-w-[461px]">
                  <div className="flex items-center justify-between w-full px-4 py-3">
                    <div className="flex items-center justify-center gap-x-2">
                      <img
                        src="/images/icon/vectorIcon.png"
                        alt="Image"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <h1 className="font-bold">{items?.customerName || ""}</h1>
                    </div>
                    <div>
                      <Link
                        href={{
                          pathname: "/profile/view-details",
                          query: data,
                        }}
                        className="underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-slate-400">
                      <p className="ml-8">Booking for</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between pl-7 ml-1">
                        {items?.startDate || ""}
                        <p className="ml-2 mr-2">-</p>
                        {items?.endDate || ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-slate-400">
                      <p className="ml-8">Storage Place</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="ml-8 mr-2">
                        <img
                          src={items?.propertyImage[0]}
                          width={50}
                          height={50}
                          alt="image"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <div className="mb-1 mt-1 ml-1">
                          <h6 className="font-[500]">
                            Storage space in {items?.address1 || ""}
                          </h6>
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src={LocationImage}
                            height={15}
                            width={15}
                            alt="icon"
                            className="mr-1"
                            priority
                          />{" "}
                          {items?.city || ""}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:grid lg:grid-cols-2 place-items-center flex items-center justify-around text-center w-full pb-3 pt-3">
                    <button
                      className="px-14 py-2 bg-[#8DC63F] text-white rounded-lg"
                      onClick={() => {
                        handleApproveListing(
                          items?.propertyBookingRequestId,
                          index
                        );
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="px-14 py-2 bg-none border-[1px] border-red-500 text-red-500 font-bold rounded-lg"
                      onClick={() => {
                        handleDeclineListing(items?.propertyBookingRequestId);
                      }}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
}
