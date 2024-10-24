import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const My_bookings_cmp = dynamic(() => import("./my_bookings_cmp"));
const Bookings_pending_request_cmp = dynamic(() =>
  import("./Bookings_pending_request_cmp")
);

export default function Index({ bookingData, bookingRequestData }) {
  // Tab functionality
  const option = {
    my_bookings: false,
    pending_requests: false,
  };

  const [tab, setTab] = useState({
    my_bookings: true,
    pending_requests: false,
  });

  return (
    <React.Fragment>
      {/* Tab Buttons */}
      <div className="flex items-center justify-start gap-x-8 ml-12">
        <Link
          href="#"
          onClick={() => {
            setTab({ ...option, my_bookings: true });
          }}
          className={`${
            tab.my_bookings ? `border-b-2 border-blue-500 text-blue-500` : null
          } py-2`}
        >
          My Bookings
        </Link>
        <Link
          href="#"
          onClick={() => {
            setTab({ ...option, pending_requests: true });
          }}
          className={`${
            tab.pending_requests
              ? `border-b-2 border-blue-500 text-blue-500`
              : null
          } py-2`}
        >
          Pending Requests
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 ml-12 py-3">
        {tab.my_bookings && <My_bookings_cmp bookingData={bookingData} />}
        {tab.pending_requests && (
          <Bookings_pending_request_cmp
            bookingRequestData={bookingRequestData}
          />
        )}
      </div>
    </React.Fragment>
  );
}
