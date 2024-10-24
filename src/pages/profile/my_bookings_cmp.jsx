import LocationImage from "../../../public/images/icon/Location-green.svg";
import Alert from "react-bootstrap/Alert";
import { MdErrorOutline } from "react-icons/md";
import temp_image from "../../../public/images/review/review2.webp";
import { GrStatusGood } from "react-icons/gr";
import Image from "next/image";
import NoData from "@/components/NoData";
import { useEffect, useState } from "react";
import { getEasyStorageBookingData } from "@/service/storageService";
import { getUserId } from "@/util/common";
import Link from "next/link";
import rupee_icon from "../../../public/images/icon/rupee_icon.png";
import prof_easy_storage from "../../../public/images/prof_easy_storage.png";
import { LuCalendarDays } from "react-icons/lu";

export default function Index({ bookingData, bookingRequestData }) {

  const [easyStorageData, setEasyStorageData] = useState([]);

  useEffect(() => {
    (async () => {
      const args = `?ApplicationUserId=${getUserId()}`
      const res = await getEasyStorageBookingData(args);
      console.log("res", res);

      if (res.success) {
        setEasyStorageData(res.success.data)
      }
    })()

  }, [])

  return (
    <>
      {bookingData == "" && !easyStorageData.length && <NoData />}
      {!!bookingData &&
        bookingData.map((item, index) => {
          return (
            <div className="flex flex-col mt-8" key={index}>
              <div className="flex justify-start max-w-[450px] min-h-[120px] rounded">
                <div className="w-[130px] h-full rounded">
                  <img
                    src={item?.propertyImages || ""}
                    alt="image"
                    layout="fill"
                    className="w-[100%] h-[100%] object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-y-1 py-2 px-2">
                  <h1 className="font-bold">{item?.address || ""}</h1>
                  <p className="mt-1 mb-1 flex items-center text-sm">
                    <Image
                      src={LocationImage}
                      alt="logo"
                      height={15}
                      width={15}
                      className="mr-2"
                      priority
                    />
                    {item?.city || ""}, {item?.district || ""}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {item?.startDate || ""}
                    <p className="ml-2 mr-2">-</p>
                    {item?.endDate || ""}
                  </div>
                </div>
              </div>

              {/* use conditions here to display or hide warning or info alerts */}
              <div className="flex flex-wrap">
                {item?.isRenewNow === false && (
                  <Alert
                    key="danger"
                    variant="danger"
                    className="mt-3 flex items-center h-[25px] text-red-500 text-[12px] border-0"
                  >
                    <MdErrorOutline size={15} /> {item?.message || ""}
                  </Alert>
                )}
              </div>
            </div>
          );
        })}
      {!!easyStorageData.length && <h3 className="font-bold">Easy Storage Bookings:-</h3>}
      {
        !!easyStorageData.length && easyStorageData.map((items, index) => {
          return (
            <>
              <div className="flex flex-col mt-8" key={index}>
                <div className="flex justify-start max-w-[450px] min-h-[120px] rounded">
                  <div className="w-[130px] h-full rounded">
                    <img
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/Group+1171275616.png"
                      alt="image"
                      layout="fill"
                      className="w-[100%] h-[100%] object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1 py-2 px-2">
                    <h1 className="font-bold">{items?.address || ""}</h1>
                    <p className="mt-1 mb-1 flex justify-between items-center text-sm">
                      <div className="">
                        <p className="font-bold text-xl">{items?.storageType || ""}
                          <span className="text-sm font-[400] pl-2">
                            ( {items?.minSqrFeet || ""} - {items?.maxSqrFeet || ""} Sq Ft.)
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <Image
                          src={LocationImage}
                          alt="logo"
                          height={15}
                          width={15}
                          className="mr-2"
                          priority
                        />
                        {items?.state || ""}
                      </div>
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center justify-center text-[15px]">
                        <Image height={20} width={20} src={rupee_icon} alt="rupee icon" priority className="mr-1" /> {items?.status || ""}</p>
                      <Link href={items?.paymentReceipt} download className="text-blue-500 underline">Download Receipt</Link>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="bg-blue-50 px-2 rounded-lg flex items-center justify-center"><LuCalendarDays className="mr-1" /> {items?.startDate || ""}</p>
                      <p className="ml-1 mr-1">-</p>
                      <p className="bg-blue-50 px-2 rounded-lg flex items-center justify-center"><LuCalendarDays className="mr-1" /> {items?.endDate || ""}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })
      }
    </>
  );
}
