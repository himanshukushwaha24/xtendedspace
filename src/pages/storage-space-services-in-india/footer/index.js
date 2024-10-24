import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footerdiv">
          <div className="space-y-2">
            <img
              src="images/xtendedspace-logo1.png"
              alt="Xtended Space Logo"
              className="h-8"
            />
            <p className="text-center">
              Turn your XTRA SPACE you have into XTRA CASH with Xtended Space or
              store your items in safe storage units.
            </p>
          </div>
          <div className="footersection flex flex-col">
            <h3 className="font-semibold text-lg mb-2">Location</h3>
            <ul className="space-y-1">
              <li>
                <a href="#header">Storage Services in Pune</a>
              </li>
              <li>
                <a href="#header">Storage Services in Hyderabad</a>
              </li>
              <li>
                <a href="#header">Storage Services in Ahmedabad</a>
              </li>
              <li>
                <a href="#header">Storage Services in Bangalore</a>
              </li>
              <li>
                <a href="#header">Storage Services in Mumbai</a>
              </li>
              <li>
                <a href="#header">Storage Services in Delhi NCR</a>
              </li>
            </ul>
          </div>

          <div className="footersection flex flex-col">
            <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
            <div className="space-y-1">
              <div className="contactdiv flex items-center space-x-2">
                <a href="#">
                  {/* <span><i className="ri-map-pin-fill"></i></span> */}
                  <span>
                    A-96, 3rd Floor, Sector -63 Noida-201301, A Block, Sector
                    63, Noida, Uttar Pradesh 201307
                  </span>
                </a>
              </div>
              <div className="contactdiv flex items-center space-x-2">
                <a href="tel:+919009000798">
                  {/* <span><i className="ri-phone-fill"></i></span> */}
                  <span>+(91) 900 900 0798</span>
                </a>
              </div>
              <div className="contactdiv flex items-center space-x-2">
                <a href="mailto:info@xtendedspace.com">
                  {/* <span><i className="ri-mail-unread-line"></i></span> */}
                  <span>info@xtendedspace.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="footerlast text-center text-zinc-400 text-sm mt-8">
          Copyright © 2023 Xtended Space. All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
