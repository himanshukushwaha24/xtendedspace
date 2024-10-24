import LocationImage from "../../../public/images/icon/Location-green.svg";
import Alert from "react-bootstrap/Alert";
import { MdErrorOutline } from "react-icons/md";
import temp_image from "../../../public/images/review/review2.webp";
import { GrStatusGood } from "react-icons/gr";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import NoData from "@/components/NoData";

export default function Index({ currentListingData }) {
  return (
    <>
      {currentListingData == "" && <NoData />}
      <div className="grid lg:grid-cols-2 ">
        {!!currentListingData &&
          currentListingData.map((items, index) => {
            return (
              <div className="flex flex-col ml-12 mt-8" key={index}>
                <div className="flex justify-start max-w-[450px] h-[100px] rounded">
                  <div className="w-[130px] h-full rounded">
                    <img
                      src={items?.propertyImages[0]?.imageStoragePath || ""}
                      alt="image"
                      className="w-[100%] h-[100%] object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col py-2 px-2">
                    <h1 className="font-bold">{items?.address || ""}</h1>
                    <p className="mt-1 mb-1 flex items-center">
                      <Image
                        src={LocationImage}
                        alt="logo"
                        height={15}
                        width={15}
                        className="mr-2"
                        priority
                      />
                      {items?.city || ""}, {items?.state || ""}
                    </p>
                  </div>
                </div>

                {/* use conditions here to display or hide warning or info alerts */}
                {/* <div>
                    <Alert key="danger" variant="danger" className="mt-3 flex items-center h-[25px] text-red-500 text-[12px] border-0"><MdErrorOutline size={15} /> Your storage duration has been over.</Alert>
                </div> */}
              </div>
            );
          })}
      </div>
    </>
  );
}
