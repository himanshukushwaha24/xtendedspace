import LogoutModal from "@/sharedComponent/modal/LogoutModal";
import { localStorageManager } from "@/util/common";
import Image from "next/image";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const SearchBar = () => {
  return (
    <>
      {/* <Navbar.Brand><div className="search-bar flex items-center w-[150px] border rounded p-2 bg-white h-full  d-sm-flex">
        <img className='w-[15px]' src="/images/home/searchlocation.png" alt="" />
        <input type="text" placeholder="Search" className="w-[120px] text-[16px]  py-0 border-none outline-none pl-1" />
      </div></Navbar.Brand> */}
    </>
  );
};

function HeaderMenu() {
  // const [profilePicture, setProfilePicture] = useState("");
  const [userdata, setUserData] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileTitle, setProfileTitle] = useState("");

  useEffect(() => {
    const userData = localStorageManager.getValue("userDetails") || "";
    //console.log("userData && setUserData(JSON.parse(userData));", userData, !!userData, userData !==undefined )
    userData && userData !==undefined && setUserData(JSON.parse(userData));
  }, []);

  useEffect(() => {
    const updateProfileTitle = () => {
      setIsMobile(window.innerWidth < 768 ? true : false);
      const title =
        window.innerWidth < 768
          ? "My Profile"
          : userdata && (
            <div className="w-7 h-7 p-[1px] rounded-full inline-block mx-2 text-center bg-[#ddd]">
              <img
                src={userdata?.profileImage || ""}
                alt="image"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          );
      setProfileTitle(title);
    };

    updateProfileTitle();
    window.addEventListener("resize", updateProfileTitle);

    return () => {
      window.removeEventListener("resize", updateProfileTitle);
    };
  }, [userdata]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div
        className={`w-full max-w-[1550px] mx-auto ${isScrolled ? "fixed" : "relative"
          } top-0 z-[9999999]`}
      >
        <Navbar
          collapseOnSelect
          expand="lg"
          className="bg-white w-full top-0 z-[9999999] px-2 md:px-5"
        >
          <Navbar.Brand href="/">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/XtendedSpace.webp"
              alt="logo"
              className="w-[95px] md:w-[150px]"
              width={360}
              height={360}
            />
          </Navbar.Brand>
          {!isMobile || userdata ? (
            <SearchBar />
          ) : (
            <Navbar className="bg-blue-500 px-[10px] rounded-lg flex items-center text-white d-flex d-sm-none">
              <a href="/login">
                <Image
                  className="w-[16px]"
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/login-user.svg"
                  alt="login"
                  width={64}
                  height={64}
                />
              </a>
            </Navbar>
          )}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <NavDropdown title="Storage" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/easy-storage">
                  Easy Storage
                </NavDropdown.Item>
                <NavDropdown.Item href="/affordable-storage">
                  Affordable Storage
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Services" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/services/packers-and-movers">
                  Packers And Movers
                </NavDropdown.Item>
                <NavDropdown.Item href="/services/business-storage">
                  Business Storage
                </NavDropdown.Item>
                <NavDropdown.Item href="/services/b2b-logistics">
                  B2B Logistics
                </NavDropdown.Item>
                <NavDropdown.Item href="/alltimelogistic">
                Track Shipment
                </NavDropdown.Item>
              </NavDropdown>

              {/* <Nav.Link href="/alltimelogistic">Track Shipment</Nav.Link> */}
              {userdata && (
                <NavDropdown
                  title={profileTitle}
                  className="md:border rounded mr-[100px]"
                  id="collapsible-nav-dropdown"
                >
                  <NavDropdown.Item
                    className="flex items-center justify-start gap-2"
                    href="/profile"
                  >
                    <Image
                      className="w-[16px]"
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/editproico.svg"
                      alt="proico"
                      width={64}
                      height={64}
                    />
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item className='flex items-center justify-stsrt gap-2' href="/notification"><img className='w-[16px]' src="/images/icon/notification.svg" alt="" />
                    Notification
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item className='flex items-center justify-stsrt gap-2' href="/user/listing/listing"><img className='w-[16px]' src="/images/icon/listingicon.svg" alt="" /> Listing </NavDropdown.Item> */}
                  {/* <NavDropdown.Divider /> */}
                  {/* <NavDropdown.Item className='flex items-center justify-stsrt gap-2' href="/user/booking/booking">
                  <img className='w-[16px]' src="/images/icon/bookingicon.svg" alt="" />
                  Booking
                </NavDropdown.Item> */}
                  <NavDropdown.Item
                    className="flex items-center justify-start gap-2"
                    onClick={logout}
                  >
                    <Image
                      className="w-[16px]"
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/logouticon.svg"
                      alt="logout"
                      width={64}
                      height={64}
                    />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
          {!userdata && (
            <Nav.Link
              className="bg-blue-500 w-[100px] px-[20px] rounded-lg flex items-center text-white d-none d-sm-flex py-2"
              href="/login"
            >
              <Image
                className="w-[16px]"
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/login.svg"
                alt="login"
                width={64}
                height={64}
              />
              Login
            </Nav.Link>
          )}
        </Navbar>
        <LogoutModal
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          setUserData={setUserData}
        />
      </div>
    </>
  );
}

export default HeaderMenu;
