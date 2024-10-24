import React, { useEffect, useState } from "react";
import SpacePhoto from "./SpacePhoto";
import BankDetails from "./BankDetails";
import SpaceDetails from "./SpaceDetails";
import SpaceAddress from "./SpaceAddress";
import { localStorageManager } from "@/util/common";
import { useRouter } from "next/router";

const ListStorageForm = () => {
  const [currentItem, setCurrentItem] = useState("spaceDetails");
  const [PropertyId, setPropertyId] = useState(1468);
  const [userId, setUserId] = useState();
  const [completedSteps, setCompletedSteps] = useState({
    spaceDetails: false,
    spaceAddress: false,
    spacePhoto: false,
    bankDetails: false,
  });
  const router = useRouter();
  const [bankDetails, setBankDetails] = useState();

  const handleItemClick = (item) => {
    // Prevent clicking on the next step if the previous form is not completed
    if (
      (item === "spaceAddress" && !completedSteps.spaceDetails) ||
      (item === "spacephoto" && !completedSteps.spaceDetails) ||
      (item === "spacephoto" && !completedSteps.spaceAddress) ||
      (item === "bankdetails" && !completedSteps.spaceDetails) ||
      (item === "bankdetails" && !completedSteps.spaceAddress) ||
      (item === "bankdetails" && !completedSteps.spacePhoto)
    ) {
      return;
    }
    setCurrentItem(item);
  };

  useEffect(() => {
    const userData =
      localStorageManager.getValue("userDetails") &&
      JSON.parse(localStorageManager.getValue("userDetails"));
    setUserId(userData?.userId);
    if (!userData?.userId) {
      router.push('/login?callback=list-storage/storage-form'); // Navigate to the login page
    }
  }, [router]);

  const markStepComplete = (step) => {
    setCompletedSteps((prev) => ({ ...prev, [step]: true }));
  };
  return (
    <>
    <div className="flex justify-center items-center my-5">
  <ul className="flex items-center p-0 m-0">
    <li
      className={`flex items-center ${completedSteps.spaceDetails ? "text-lime-500" : "text-gray-300"}`}
      onClick={() => handleItemClick("spaceDetails")}
    >
      <div className={`rounded-full w-10 h-10 flex items-center justify-center ${completedSteps.spaceDetails ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-500"}`}>
        1
      </div>
      {/* <span className={`h-1 w-10 ${completedSteps.spaceAddress || completedSteps.spacePhoto || completedSteps.bankDetails ? "bg-lime-500" : "bg-gray-300"}`} /> */}
       <span className={`h-1 w-10 ${currentItem === "spaceAddress" || currentItem === "spacephoto" || currentItem === "bankdetails" ? "bg-lime-500" : (completedSteps.spaceDetails ? "bg-lime-500" : "bg-gray-300")}`} />
    </li>
    <li
      className={`flex items-center ${completedSteps.spaceAddress ? "text-lime-500" : "text-gray-300"}`}
      onClick={() => handleItemClick("spaceAddress")}
    >
      <div className={`rounded-full w-10 h-10 flex items-center justify-center ${completedSteps.spaceAddress ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-500"}`}>
        2
      </div>
      {/* <span className={`h-1 w-10 ${completedSteps.spacePhoto || completedSteps.bankDetails ? "bg-lime-500" : "bg-gray-300"}`} /> */}
      <span className={`h-1 w-10 ${currentItem === "spacephoto" || currentItem === "bankdetails" ? "bg-lime-500" : (completedSteps.spaceAddress ? "bg-lime-500" : "bg-gray-300")}`} />
       
    </li>
    <li
      className={`flex items-center ${completedSteps.spacePhoto ? "text-lime-500" : "text-gray-300"}`}
      onClick={() => handleItemClick("spacephoto")}
    >
      <div className={`rounded-full w-10 h-10 flex items-center justify-center ${completedSteps.spacePhoto ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-500"}`}>
        3
      </div>
      {/* <span className={`h-1 w-10 ${completedSteps.bankDetails ? "bg-lime-500" : "bg-gray-300"}`} /> */}
      <span className={`h-1 w-10 ${currentItem === "bankdetails" ? "bg-lime-500" : (completedSteps.spacePhoto ? "bg-lime-500" : "bg-gray-300")}`} />
        
    </li>
    <li
      className={`flex items-center ${completedSteps.bankDetails ? "text-lime-500" : "text-gray-300"}`}
      onClick={() => handleItemClick("bankdetails")}
    >
      <div className={`rounded-full w-10 h-10 flex items-center justify-center ${completedSteps.bankDetails ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-500"}`}>
        4
      </div>
    </li>
  </ul>
</div>

      {/* <div className="flex justify-center items-center my-5">
        <ul className="flex items-center p-0 m-0">
          <li
            className={`flex items-center ${currentItem === "spaceDetails" ? "text-lime-500" : (completedSteps.spaceDetails ? "text-lime-500" : "text-gray-300")}`}
            onClick={() => handleItemClick("spaceDetails")}
          >
            <div className={`rounded-full w-10 h-10 flex items-center justify-center ${currentItem === "spaceDetails" ? "bg-lime-500 text-white" : (completedSteps.spaceDetails ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-500")}`}>
              1
            </div>
            <span className={`h-1 w-10 ${currentItem === "spaceAddress" || currentItem === "spacephoto" || currentItem === "bankdetails" ? "bg-lime-500" : (completedSteps.spaceDetails ? "bg-lime-500" : "bg-gray-300")}`} />
          </li>
          <li
            className={`flex items-center ${currentItem === "spaceAddress" ? "text-lime-500" : (completedSteps.spaceAddress ? "text-lime-500" : "text-gray-300")}`}
            onClick={() => handleItemClick("spaceAddress")}
          >
            <div className={`rounded-full w-10 h-10 flex items-center justify-center ${currentItem === "spaceAddress" ? "bg-lime-500 text-white" : (completedSteps.spaceAddress ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-500")}`}>
              2
            </div>
            <span className={`h-1 w-10 ${currentItem === "spacephoto" || currentItem === "bankdetails" ? "bg-lime-500" : (completedSteps.spaceAddress ? "bg-lime-500" : "bg-gray-300")}`} />
          </li>
          <li
            className={`flex items-center ${currentItem === "spacephoto" ? "text-lime-500" : (completedSteps.spacePhoto ? "text-lime-500" : "text-gray-300")}`}
            onClick={() => handleItemClick("spacephoto")}
          >
            <div className={`rounded-full w-10 h-10 flex items-center justify-center ${currentItem === "spacephoto" ? "bg-lime-500 text-white" : (completedSteps.spacePhoto ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-500")}`}>
              3
            </div>
            <span className={`h-1 w-10 ${currentItem === "bankdetails" ? "bg-lime-500" : (completedSteps.spacePhoto ? "bg-lime-500" : "bg-gray-300")}`} />
          </li>
          <li
            className={`flex items-center ${currentItem === "bankdetails" ? "text-lime-500" : (completedSteps.bankDetails ? "text-lime-500" : "text-gray-300")}`}
            onClick={() => handleItemClick("bankdetails")}
          >
            <div className={`rounded-full w-10 h-10 flex items-center justify-center ${currentItem === "bankdetails" ? "bg-lime-500 text-white" : (completedSteps.bankDetails ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-500")}`}>
              4
            </div>
          </li>
        </ul>
      </div> */}
      {currentItem === "spaceDetails" && (
        <SpaceDetails
          setPropertyId={setPropertyId}
          setCurrentItem={(item) => { setCurrentItem(item); markStepComplete("spaceDetails"); }}
          userId={userId}
          setBankDetails={setBankDetails}
        />
      )}
      {currentItem === "spaceAddress" && PropertyId && (
        <SpaceAddress
          setCurrentItem={(item) => { setCurrentItem(item); markStepComplete("spaceAddress"); }}
          PropertyId={PropertyId}
          userId={userId}
        />
      )}
      {currentItem === "spacephoto" && PropertyId && (
        <SpacePhoto
          setCurrentItem={(item) => { setCurrentItem(item); markStepComplete("spacePhoto"); }}
          PropertyId={PropertyId}
          userId={userId}
        />
      )}
      {currentItem === "bankdetails" && PropertyId && (
        <BankDetails
          PropertyId={PropertyId}
          userId={userId}
          setCurrentItem={(item) => { setCurrentItem(item); markStepComplete("bankDetails"); }}
          bankdetails={bankDetails}
        />
      )}
    </>
  );
};

export default ListStorageForm;
