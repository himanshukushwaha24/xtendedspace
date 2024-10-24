import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/header/header"));
const Footer = dynamic(() => import("@/components/footer"));
import Image from "next/image";
import vectorLogo from "../../../public/images/icon/vectorIcon.png";
import { useRouter } from "next/router";
import { getUserId } from "@/util/common";
import {
  postApprovePropertyBookingRequestByHost,
  postRejectedPropertyBookingRequestByHost,
} from "@/service/storageService";

export default function ViewDetails() {
  const router = useRouter();
  const {
    id,
    city,
    customerName,
    endDate,
    startDate,
    propertyImages = [],
    district,
  } = router.query;
  const propertyImagesArray = Array.isArray(propertyImages)
    ? propertyImages
    : [propertyImages];
  const cols = propertyImagesArray?.length;

 

  function handleApproveListing(propertyBookingRequestId) {
    (async () => {
      let args = `?ApplicationUserId=${getUserId()}&propertyBookingRequestId=${propertyBookingRequestId}`;
      const response = await postApprovePropertyBookingRequestByHost(args);
      if (response?.success) {
        alert("Request Approved!");
      }
    })();
  }

  function handleDeclineListing(propertyBookingRequestId) {

    (async () => {
      let args = `?ApplicationUserId=${getUserId()}&propertyBookingRequestId=${propertyBookingRequestId}`;
      const response = await postRejectedPropertyBookingRequestByHost(args);
      if (response?.success) {
        alert("Request Declined!");
      }
    })();
  }

  return (
    <>
      <Header />
      <div className="grid place-items-center">
        <div className="flex flex-col items-center justify-center">
          <Image src={vectorLogo} alt="image" height={60} width={60} priority />
          <p className="font-bold text-xl mt-2">{customerName || "User"}</p>
        </div>

        <div className="w-[90%] min-h-[300px] border border-slate-[1px] rounded flex flex-col items-center mt-8 mb-12">
          <div className="w-[100%] min-h-[100px] bg-slate-100 flex items-center justify-between px-4 py-4">
            <div className="flex flex-col items-start justify-between">
              <div className="mt-2 mb-2">
                <p className="text-zinc-400">Storage place</p>
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <div className="">
                  <img
                    src={propertyImagesArray[0]}
                    alt="image"
                    height={80}
                    width={100}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col items-start justify-around">
                  <p className="text-sm font-bold">
                    Storage space in {city + " " + district}
                  </p>
                  <p className="text-sm flex items-center justify-center">
                    <img
                      src="/images/icon/Location-green.svg"
                      alt="icon"
                      width={15}
                      className="mr-2"
                    /> 
                    {city + ", " + district}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <p className="text-zinc-400">Booking for</p>
              <p className="flex items-center justify-center">
                {startDate + " - " + endDate}
              </p>
            </div>
          </div>
          <div className="h-[100%] w-[100%] flex flex-col justify-between">
            <div className="flex flex-col items-start px-4">
              <p className="mb-4 mt-2 text-zinc-400">Storage Images</p>
              <div
                className={`flex items-center justify-center flex-wrap lg:grid lg:grid-cols-${cols} place-items-center gap-x-4`}
              >
                {!!propertyImagesArray &&
                  propertyImagesArray.map((images, index) => {
                    return (
                      <img
                        key={index}
                        src={images}
                        alt="image"
                        height={150}
                        width={150}
                        className="object-contain"
                      />
                    );
                  })}
              </div>
            </div>
            <div className="grid place-items-center">
              <div className="flex items-center justify-center gap-x-4 text-center w-full py-4">
                <button
                  className="px-14 py-2 bg-[#8DC63F] text-white rounded-lg"
                  onClick={() => {
                    handleApproveListing(id);
                  }}
                >
                  Approve
                </button>
                <button
                  className="px-14 py-2 bg-none border-[1px] border-red-500 text-red-500 font-bold rounded-lg"
                  onClick={() => {
                    handleDeclineListing(id);
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
