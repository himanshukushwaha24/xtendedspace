import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Link from "next/link";
const My_Storage_Listings_cmp = dynamic(() => import("./my_storage_listing_cmp"));
const Listings_bookedspace_cmp = dynamic(() => import("./listings_bookedspace_cmp"));
const Listing_pending_apporoval_cmp = dynamic(() => import("./listing_pending_approvals_cmp"));

export default function Index({currentListingData, pendingApprovalsRequestData, hostBookedPropertyData}) {

    const option = {
        Booked_Space: false,
        Pending_Approvals: false,
        My_Storage_Listings: false
    }

    const [tab, setTab] = useState({
        My_Storage_Listings: true,
        Pending_Approvals: false,
        Booked_Space: false,
    })

    return (
        <React.Fragment>
            <div className="flex items-center justify-start gap-x-8 ml-12 ">
                <Link href="#" onClick={() => { setTab({ ...option, My_Storage_Listings: true }) }} className={`${tab.My_Storage_Listings ? `border-b-2 border-blue-500 text-blue-500` : null} py-2`}>My Storage Listings</Link>
                <Link href="#" onClick={() => { setTab({ ...option, Pending_Approvals: true }) }} className={`${tab.Pending_Approvals ? `border-b-2 border-blue-500 text-blue-500` : null} py-2`}>Pending Approvals</Link>
                <Link href="#" onClick={() => { setTab({ ...option, Booked_Space: true }) }} className={`${tab.Booked_Space ? `border-b-2 border-blue-500 text-blue-500` : null} py-2`}>Booked Space</Link>
            </div>
            {
                tab.My_Storage_Listings && <My_Storage_Listings_cmp currentListingData={currentListingData} />
            }
            {
                tab.Pending_Approvals && <Listing_pending_apporoval_cmp pendingApprovalsRequestData={pendingApprovalsRequestData} />
            }
            {
                tab.Booked_Space && <Listings_bookedspace_cmp hostBookedPropertyData={hostBookedPropertyData} />
            }
        </React.Fragment>
    )
}