import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footerdiv">
          <div className="space-y-2  ">
            <img
              src="/images/xtendedspace-logo1.png"
              alt="Xtended Space Logo"
              className="h-8"
            />
            <p className="">
              Xtended Space stores your belongings in a secure storage unit.
              Additionally, it provides you door-to-door logistics services.
            </p>
          </div>
          <div className="footersection ">
            <h3 className="">Location</h3>
            <ul className="space-y-1">
              <li>
                <a href="">Packers and Movers in Delhi</a>
              </li>
              <li>
                <a href="">Packers and Movers in Noida</a>
              </li>
              <li>
                <a href="">Packers and Movers in Faridabad</a>
              </li>
              <li>
                <a href="">Packers and Movers in Ghaziabad</a>
              </li>
              <li>
                <a href="">Packers and Movers in Gurugram</a>
              </li>
            </ul>
          </div>

          <div className="footersection ">
            <h3 className="">Contact Us</h3>
            <div className="space-y-1">
              <div className="contactdiv  space-x-2">
                <a href="https://www.google.com/maps/place/Xtended+Space/@28.6209975,77.3791788,17z/data=!4m6!3m5!1s0x390ce5583bece1bb:0x38f3840e6703fddc!8m2!3d28.620715!4d77.3794363!16s%2Fg%2F11s9dnx3jl?entry=ttu">
                  {/* <span><i className="ri-map-pin-fill"></i></span> */}
                  <span>
                    A-96 , 3rd Floor , Sector -63 Noida-201301, A Block, Sector
                    63, Noida, Uttar Pradesh 201307
                  </span>
                </a>
              </div>
              <div className="contactdiv  space-x-2">
                <a href="tel:+919911090800">
                  {/* <span><i className="ri-phone-fill"></i></span> */}
                  <span> +(91) 9911090800</span>
                </a>
              </div>
              <div className="contactdiv  space-x-2">
                <a href="mailto:info@xtendedspace.com">
                  {/* <span><i className="ri-mail-unread-line"></i></span> */}
                  <span>info@xtendedspace.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="footerlast text-center text-zinc-400 text-sm mt-8">
          Copyright © 2024 Xtended Space. All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
