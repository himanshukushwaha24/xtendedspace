
import { getAllStorage } from "@/service/storageService";
import Link from "next/link";
import React, { useEffect, useState, useRef, use } from "react";
import Form from 'react-bootstrap/Form';
import FormModal from "@/sharedComponent/modal/shortby";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { DatePicker } from "antd";
import moment from "moment";
import HeaderMenu from "@/components/header/header";
import Head from "next/head";
import Footer from "@/components/footer";
import { useDebounce, useGeoLocation } from "@/util/useHooks";
import { useRouter } from "next/router";
import Image from "next/image";
import banner_1 from "../../../public/images/home/liststorage-banner.jpg"
const homepage = () => {
  const [isOpen, setIsOpen] = useState(null);
  const [data, setdata] = useState([]);
  const initialFilterState = {
    propertyType: "",
    pricerange: "",
    StorageType: "",
    space_dimension: "",
    rating: "",
     FromDate: "",
    ToDate: "",
    // Add other filters if needed
  };
  const [filter, setFilter] = useState("");
  const [tripStart, setTripStart] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [rangeVal, setRangeVal] = useState(10);
  const distanceVal = useDebounce(rangeVal, 300);
  // To disable pricerange radio buttons on input focus (for desktop)
  const [isInputActive, setIsInputActive] = useState(true);
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState('');
  const [page, setPage] = useState(10);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      setCurrentUrl(url);
    }
  }, [router]);


  const handleToggle = (filterType) => {
    setIsOpen(isOpen === filterType ? null : filterType);
  };

  const getStorage = async (filterString) => {
    setLoading(true);
    const response = await getAllStorage(filterString);
    setLoading(false);
    if (response.success) {
      setdata(response.success);
    }
  };


  const cords = useGeoLocation();
  let currentFilter = `?pageNo=${0}&pageSize=${page}`;
  let newFilter = "";

  const latLongString = `&userLatitude=${cords?.latitude}&userLongitude=${cords?.longitude}`
  if (cords?.latitude) {
   //currentFilter += latLongString;
   //dont remove above line
   
    newFilter = latLongString;
  }
  const onChangeFilter = (e) => {
    const { name, value } = e.target;

  let formattedDate = "";
  if (name === "FromDate" || name === "ToDate") {
    if (value && value.isValid()) { // Check if value is a valid moment object
      formattedDate = value.format("DD/MM/YYYY");
    }
  } else {
    formattedDate = value;
  }

  if (name === "FromDate" || name === "ToDate") {
    setTripStart((prevTripStart) => ({ ...prevTripStart, [name]: formattedDate }));
    setFilter((prevFilter) => ({ ...prevFilter, [name]: formattedDate }));}    else if (name === 'space_dimension') {
      setTab({ ...tab, space_dimension: true });
      const dimentionArr = value?.split("-");
      setFilter({ ...filter, MinSqrFeet: dimentionArr[0], MaxSqrFeet: dimentionArr[1] });
    }
    else if (name === 'pricerange') {
      const dimentionArr = value?.split("-");
      setFilter({ ...filter, MinPrice: dimentionArr[0], MaxPrice: dimentionArr[1] });
    }
    else if(name === "distance"){

      setRangeVal(value);
    }
    else {
      setFilter({ ...filter, [name]: value });

    }

    if (name === 'rating') {
      setTab({ ...tab, rating: true });
    }

    // if (name === 'sortBy') {
    //   setTab({ ...tab, sortBy: "" });
    // }
  };

  useEffect(() => {
    if (filter) {
      Object.keys(filter).forEach((item) => {
        if (filter[item]) {
          currentFilter += `&${item}=${filter[item]}`;
        }
      });
    }
    getStorage(currentFilter);
  }, [filter, cords, page]);

  useEffect(() => {
    if (distanceVal) {
      //setFilter({ ...filter, ['distance']: distanceVal });
    }

  }, [distanceVal])




  const [tab, setTab] = useState({
    sort_by: false,
    prop_type: false,
    price_range: false,
    distance: false,
    storage: false,
    time_duration: false,
    space_dimension: false,
    rating: false
  });
  const options = {
    sort_by: false,
    prop_type: false,
    price_range: false,
    distance: false,
    storage: false,
    time_duration: false,
    space_dimension: false,
    rating: false
  }

  const [contentDiv, setContentDiv] = useState(false);
  const divRef = useRef(null);

  const handleSortByClick = () => {
    setModalShow(true);
  };


  const handleTabToggle = (tabName) => {
    setTab(prevState => ({ ...options, [tabName]: !prevState[tabName] }));
    setContentDiv(true);
  };

  const clearFilter = () => {
    setFilter("");
    setTripStart({});
    setInputValue("");
    document.querySelectorAll('input[type=radio]').forEach((radio) => {
      radio.checked = false;
      
    });
// document.querySelector('input[name="FromDate"]').value = '';
// document.querySelector('input[name="ToDate"]').value = '';
  };

  const handleScroll = () => {
    window.onscroll = function(ev) {
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight-100 && !loading ) {
        if(page <= data?.totalPage*data?.count)
          setPage((page)=>page+10);
      }
  };
  };



  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);


  return (
    <>
   <Head>
<link rel="shortcut icon" href="images/logo/XtendedSpace.png" type="image/x-icon" />
<title>Explore Storage Options Near You - Xtended Space</title>
<meta name="description" content="Find the ideal storage space near you with Xtended Space. Compare prices, space types, and more to secure the best deal!" />
<meta name="author" content="Xtended Space" />
<meta name="keywords" content="Storage space listings, Find storage near me, Affordable storage units, Rent storage space, Secure storage options, Storage space for rent, Compare storage prices, Filter storage options, Available storage units, Nearby storage solutions"/>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="https://www.xtendedspace.com/storagelisting"/>
<meta property="og:title" content="Discover Nearby Storage Units"/>
<meta property="og:description" content="Browse affordable storage listings on Xtended Space. Use filters to customize your search for the perfect storage unit."/>
<meta property="og:image" content="/images/storagelisting/affordable-storage-space-xs.avif"/>
<meta property="og:image:type" content="image/webp" />
<meta property="og:image:width" content="400" />
<meta property="og:image:height" content="300" />
<meta property="og:image:alt" content="Browse Storage Spaces - Xtended Space" />
<meta property="og:url" content="https://www.xtendedspace.com/storagelisting"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Xtended Space" />
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Find Storage Spaces - Xtended Space"/>
<meta name="twitter:description" content="Discover storage spaces tailored to your needs. Filter by size, price, and location for the best storage options around!"/>
<meta name="twitter:image" content="/images/storagelisting/affordable-storage-space-xs.avif"/>
<meta name="twitter:image:alt" content="Explore Storage Options Near You" />
</Head>

    <div className="max-w-[1550px] mx-[auto] w-[100%]">
      <FormModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        ModalBody={ModalBody}
        className="addressAdd"
        size={"mm"}
        title=""
        onChangeFilter={onChangeFilter}
      />
      <HeaderMenu />
      <div className="section w-full md:w-full h-auto md:h-auto">
        <div className="listing_bannersec w-full md:w-full min-h-10 h-auto">
          <div className="background_image flex flex-col md:flex-row items-start md:justify-evenly">
            {/* <img src="/images/home/liststorage-banner.jpg" alt="" /> */}
          
            <Image
          
            className=""
            src={banner_1}
            alt="image"
            priority
          />
            {/* <div className="wrapingup_down w-full md:w-40% pl-[20px] md:pl-[100px]">
              <div className="text-left w-full md:w-20% mt-0 md:mt-4 mb-0 md:mb-4">
                <div className="listing_heading_text w-full md:w-20% h-10 flex justify-start items-center">
                  <a
                    href="/"
                    className="font-medium leading-8 text-[#1B1C57] text-sm"
                  >
                    Home
                  </a>
                  <img
                    src="/images/icon/Double Alt Arrow Right.svg"
                    alt="doublearrowicon1"
                    className="w-5"
                  />
                  <a
                    href="/"
                    className="font-medium leading-8 text-[#1B1C57] text-xs md:text-sm whitespace-nowrap"
                  >
                    Affordable Storage
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-start px-0 md:px-[50px] py-0 md:py-[50px] md:mt-[50px]">
                <div className="passive_income font-bold text-base md:text-5xl text-center md:text-left whitespace-nowrap leading-relaxed text-[#1B1C57]">
                Provide Affordable Storage Space



                </div>
                <p className="text-[14px] md:text-[20px] w-[70%] md:w-[80%] py-2 ">Easily access cost-efficient storage services in your nearby locations. </p>
                <div className="style_span text-center md:text-left">
                  <span className="font-bold  md:text-5xl leading-normal text-[#338CFF]">
                    Xtended
                  </span>
                  <span className="font-bold  md:text-5xl leading-normal text-[#8DC63F] pl-2">
                    Space
                  </span>
                </div>
                <div className="become_host flex justify-start py-[25px] md:py-[50px] ">
                  <Link href="/list-storage" className="text-white bg-blue-500 py-2 px-3 md:px-5 rounded text-sm md:text-base">
                    Become a Host
                  </Link>
                </div>
              </div>
            </div> */}

            {/* <div className="storage_listing_right w-full md:w-40% md:h-65%">
              <div className="storage_listing_img">
                <img
            src="/images/storagelisting/Storage listing details HQ Less Gap.png"
            alt="storagelistingdetail1"
            className="md:mt-2.5"
          />
                <img src="/images/banners/about-us.png" alt="aboutus1" className="w-full"/>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="storage_middlesection md:flex md:mt-[50px]">
        <div className="block md:hidden sticky top-[61px] z-10">
          <div className="parent relative">
            <div className="slider">
            
              <button
                className="btns flex item-center justify-center  text-white"
                style={{ background: "#338CFF" }}
                onClick={clearFilter}
              >
                Clear Filter 
              </button>
              <button
                className="btns flex item-center justify-center text-white"
                style={{ background: "#8DC63F" }}
                onClick={handleSortByClick}
              >
                Sort by {tab.sort_by ? <FaChevronUp className="ml-4" /> : <FaChevronDown className="ml-4" />}
              </button>
              {/* <button className='btns flex item-center justify-center' style={{ background: "#8DC63F" }} onClick={() => setTab({ ...options, sort_by: false })}>Sort by {tab.sort_by ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button> */}
              <button className='btns flex item-center justify-center' onClick={() => handleTabToggle('prop_type')}>Property type {tab.prop_type ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
              <button className='btns flex item-center justify-center' onClick={() => handleTabToggle('price_range')}>Price range {tab.price_range ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
              <button className='btns flex item-center justify-center' onClick={() => handleTabToggle('distance')}>Distance {tab.distance ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
              <button className='btns flex item-center justify-center' onClick={() => handleTabToggle('storage')}>Storage type {tab.storage ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
              <button className='btns flex item-center justify-center' onClick={() => handleTabToggle('time_duration')}>Time duration {tab.time_duration ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
              <button className='btns flex item-center justify-center' onClick={() => handleTabToggle('space_dimension')}>Space dimension {tab.space_dimension ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button>
              {/* <button className='btns flex item-center justify-center' onClick={() => setTab({ ...options, rating: true })}>Rating {tab.rating ? <FaChevronUp className='ml-4' /> : <FaChevronDown className="ml-4" />}</button> */}
            </div>
            


            {/* mobile radios and selects */}
            {
              // contentDiv &&
              <div className={`content shadow `} ref={divRef}>
                {tab.sort_by && <div className="sort-by-popup"></div>}

                {tab.prop_type && <div className="property-type my-[10px]">
                  <Form>
                    {['radio'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3 flex flex-col">
                        <Form.Check
                          inline
                          label="Household Items"
                          name="propertyType"
                          type={type}
                          value="HouseHoldItems"
                          id={`inline-${type}-1 household`}
                          onChange={onChangeFilter}
                        />
                        <Form.Check
                          inline
                          label="Business Items"
                          name="propertyType"
                          type={type}
                          id={`inline-${type}-2`}
                          value="BusinessItems"
                          onChange={onChangeFilter}
                        />
                        <Form.Check
                          inline
                          label="Both"
                          name="propertyType"
                          type={type}
                          id={`inline-${type}-2`}
                          value="Both"
                          onChange={onChangeFilter}
                        />
                      </div>
                    ))}
                  </Form>
                </div>

                }
                {tab.price_range &&
                  <div className="price-range my-[10px]">
                    <Form>
                      {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3 flex justify-items-between">
                          <div className='grid place-items-start'>
                            <Form.Check
                              inline
                              label="1 - 1000"
                              name="pricerange"
                              type={type}
                              id={`inline-${type}-1`}
                              value="1-1000"
                              onChange={onChangeFilter}
                            />
                            <Form.Check
                              inline
                              label="5000 - 20000"
                              name="pricerange"
                              value="5000-20000"
                              type={type}
                              id={`inline-${type}-2`}
                              onChange={onChangeFilter}
                            />
                          </div>
                          <div className='grid place-items-start'>
                            <Form.Check
                              inline
                              label="1000 - 5000"
                              name="pricerange"
                              value="1000-5000"
                              type={type}
                              id={`inline-${type}-2`}
                              onChange={onChangeFilter}
                            />
                            <Form.Check
                              inline
                              label="20000 - 50000"
                              name="pricerange"
                              value="20000-50000"
                              type={type}
                              id={`inline-${type}-2`}
                              onChange={onChangeFilter}
                            />
                          </div>
                        </div>
                      ))}
                    </Form>

                    <form className='flex items-center gap-2'>
                      <input type="text" placeholder=" ₹ Min" name="MinPrice" onChange={onChangeFilter} className='h-[40px] w-[150px] outline-none border-2 rounded-lg' />
                      <input type="text" placeholder=" ₹ Max" name="MaxPrice" onChange={onChangeFilter} className='h-[40px] w-[150px] outline-none border-2 rounded-lg' />
                      {/* <button type="submit"><span className='bg-blue-500 h-[40px] w-[50px] rounded-lg'><FaArrowRightLong className='text-white w-[40px]' /></span></button> */}
                    </form>
                  </div>
                }
                {tab.storage &&
                  <div className="storage-type my-[10px]">
                    <Form>
                      {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3 flex flex-col">
                          <Form.Check
                            inline
                            label={<label htmlFor={`inline-${type}-1`}>Independent</label>}
                            name="StorageType"
                            value="Independent"
                            type={type}
                            id={`inline-${type}-1`}
                            onChange={onChangeFilter}
                          />
                          <Form.Check
                            inline
                            label={<label htmlFor={`inline-${type}-2`}>Shared</label>}
                            name="StorageType"
                            value="Shared"
                            type={type}
                            id={`inline-${type}-2`}
                            onChange={onChangeFilter}
                          />
                        </div>
                      ))}
                    </Form>
                  </div>
                }

                {tab.time_duration &&
                  <div className="time-duration flex gap-2 my-[10px]">
                   <DatePicker  format="DD/MM/YYYY" name="FromDate" onChange={(date) => onChangeFilter({ target: { name: "FromDate", value: date } })} placeholder='From ' className='h-[40px] px-2 w-1/2 outline-none border-2 rounded-lg' />
                <DatePicker  format="DD/MM/YYYY" name="ToDate" onChange={(date) => onChangeFilter({ target: { name: "ToDate", value: date } })} placeholder='To' className='h-[40px] px-2 w-1/2 outline-none border-2 rounded-lg' />
              </div>
                }
                {
                  tab.distance &&
                  <div className="distance my-[10px]">
                    <p>(in Km)</p>
                    <input
                      type="range"
                      id="volume"
                      name="distance"
                      min="0"
                      max="1000"
                      onChange={onChangeFilter}
                      value={distanceVal}
                      className="rangeinkm"
                    />
                    <div className=" flex justify-center items-center text-center p-3 border border-gray-200 w-full md:w-[105px] h-auto">
                      {/* <label className="mb-0" for="volume">3 Km</label> */}
                      <label className="mb-0" for="volume">{distanceVal} Km</label>
                    </div>
                  </div>
                }
                {
                  tab.space_dimension &&
                  <div className="space-dimension my-[10px]">
                    <Form>
                      {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3 flex flex-col">
                          <Form.Check
                            inline
                            label="0-300 sq ft. (Few)"
                            name="space_dimension"
                            value="0-300"
                            type={type}
                            id={`inline-${type}-1`}
                            onChange={onChangeFilter}
                          // checked={filter?.space_dimension === "0-300"}
                          />
                          <Form.Check
                            inline
                            label="300-600 sq ft. (1BHK)"
                            name="space_dimension"
                            value="300-600"
                            type={type}
                            id={`inline-${type}-1`}
                            onChange={onChangeFilter}
                          // checked={filter?.space_dimension === "300-600"}
                          />
                          <Form.Check
                            inline
                            label="600-1000 sq ft. (2BHK)"
                            name="space_dimension"
                            value="600-1000"
                            type={type}
                            id={`inline-${type}-2`}
                            onChange={onChangeFilter}
                          // checked={filter?.space_dimension === "600-1000"}
                          />
                          <Form.Check
                            inline
                            label="900-1500 sq ft. (3BHK)"
                            name="space_dimension"
                            value="900-1500"
                            type={type}
                            id={`inline-${type}-2`}
                            onChange={onChangeFilter}
                          // checked={filter?.space_dimension === "900-1500"}
                          />
                          <Form.Check
                            inline
                            label="1200-2000 sq ft. (4BHK)"
                            name="space_dimension"
                            value="1200-2000"
                            type={type}
                            id={`inline-${type}-2`}
                            onChange={onChangeFilter}
                          // checked={filter?.space_dimension === "1200-2000"}

                          />
                          <Form.Check
                            inline
                            label="Other"
                            name="space_dimension"
                            value="2001-100000"
                            type={type}
                            id={`inline-${type}-2`}
                            onChange={onChangeFilter}
                          // checked={filter?.space_dimension === "Other"}
                          />
                        </div>
                      ))}
                    </Form>
                  </div>
                }

          
              </div>
            }
            
          </div>

        </div>

        <div className="wraper_left overflow-x-auto  md:flex-col w-full md:w-1/4  bg-gray-50 hidden md:block  h-[100%]">
          <div className="Filter_accordian flex md:flex-col justify-center ">
            <div className="bg-white flex justify-between">
              <span className=" bg-white justify-start text-xs md:text-2xl  mb-2 mt-0 md:mt-2 text-[#110229] font-medium pl-8 hidden md:block">
                Filters
              </span>
              {!!filter && <div

                className="bg-white text-blue-500 border font-bold py-2 px-4 text-center rounded cursor-pointer w-1/2"
                onClick={clearFilter}
              >
                Clear Filter
              </div>}
            </div>


            <div className="">
              <h3 id="accordion-flush-heading-1" className="">
                <button
                  type="image"
                  className="flex items-center justify-between w-[7rem] md:w-full py-4 px-4 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-white"
                  data-accordion-target="#accordion-flush-body-1"
                  aria-expanded={isOpen === "Property type" ? "true" : "false"}
                  aria-controls="accordion-flush-body-1"
                  onClick={() => handleToggle("Property type")}
                >
                  <span className="bg whitespace-nowrap text-xs md:text-base">
                    Property type
                  </span>
                  <div className="flex justify-center items-center">
                    <img
                      src="/images/storagelisting/chevron-left.svg"
                      alt="upward arrow1"
                      className={`h-4 w-4 md:h-6 md:w-6 ${isOpen === "Property type" ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                </button>
              </h3>
              <div
                id="accordion-flush-body-1"
                className={`py-0 md:py-2 ml-0 md:ml-3 px-2 flex flex-col justify-center text-center border-b border-gray-200 dark:border-gray-700 ${isOpen !== "Property type" && "hidden"
                  }`}
                aria-labelledby="accordion-flush-heading-1"
              >
                <div className="flex justify-start py-1 items-center text-center flex-nowrap gap-2 md:text-sm  ">
                  <input
                    type="radio"
                    id="household"
                    name="propertyType"
                    value="HouseHoldItems"
                    className="w-4"
                    onChange={onChangeFilter}
                  />
                  <label className="mb-0 font-normal text-sm md:text-base leading-4 whitespace-nowrap">
                    Household Items
                  </label>
                </div>
                <div className="flex justify-start py-1 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    id="business"
                    name="propertyType"
                    value="BusinessItems"
                    className="w-4"
                    onChange={onChangeFilter}
                  />
                  <label className="mb-0 font-normal text-sm md:text-base leading-4 whitespace-nowrap">
                    Business Items
                  </label>
                </div>
                <div className="flex justify-start py-1 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    // id="both"
                    name="propertyType"
                    value="Both"
                    className="w-4"
                    onChange={onChangeFilter}
                  />
                  <label className="mb-0 font-normal text-sm md:text-base leading-4 whitespace-nowrap">
                    Both
                  </label>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h3 id="accordion-flush-heading-2" className="">
                  <button
                    type="button"
                    className="flex items-center justify-between w-[7rem] md:w-full py-4 px-4 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-white"
                    data-accordion-target="#accordion-flush-body-1"
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-controls="accordion-flush-body-1"
                    onClick={() => handleToggle("Price Range")}
                  >
                    <span className="bg whitespace-nowrap text-xs md:text-base">
                      Price Range
                    </span>
                    <div className="flex justify-center items-center">
                      <img
                        src="/images/storagelisting/chevron-left.svg"
                        alt="upward arrow1"
                        className={`h-4 w-4 md:h-6 md:w-6 ${isOpen === "Price Range" ? "rotate-180" : ""
                          }`}
                      />
                    </div>
                  </button>
                </h3>
                <div
                  id="accordion-flush-body-1"
                  className={`py-2 ml-3 flex flex-col justify-center text-center border-b border-gray-200 dark:border-gray-700 px-2 ${isOpen !== "Price Range" && "hidden"
                    }`}
                  aria-labelledby="accordion-flush-heading-1"
                >
                  <div className=" flex md:flex-col justify-between  text-center ">
                    <div className="flex justify-start py-1 items-center gap-2 text-sm">
                      <input
                        type="radio"
                        id="pricerange"
                        name="pricerange"
                        value="1-1000"
                        className="w-4 "
                        onChange={onChangeFilter}
                        // disabled={isInputActive}
                      />
                      <label className="mb-0" for="business">
                        &#8377;1&nbsp;-&nbsp;&#8377;1000
                      </label>
                    </div>
                    <div className="flex justify-start py-1 items-center gap-2 text-sm">
                      <input
                        type="radio"
                        id="pricerange"
                        name="pricerange"
                        value="1000-5000"
                        className="w-4 "
                        onChange={onChangeFilter}
                        // disabled={isInputActive}
                      />
                      <label className="mb-0" for="business">
                        &#8377;1000&nbsp;-&nbsp;&#8377;5000
                      </label>
                    </div>
                  </div>
                  <div className="flex md:flex-col justify-between  text-center">
                    <div className="flex justify-start py-1 items-center gap-2 text-sm">
                      <input
                        type="radio"
                        id="pricerange"
                        name="pricerange"
                        value="5000-20000"
                        className="w-4 "
                        onChange={onChangeFilter}
                        // disabled={isInputActive}
                      />
                      <label className="mb-0" for="business">
                        &#8377;5000&nbsp;-&nbsp;&#8377;20000
                      </label>
                    </div>
                    <div className="flex justify-start py-1 items-center gap-2 text-sm">
                      <input
                        type="radio"
                        id="pricerange"
                        name="pricerange"
                        value="20000-50000"
                        className="w-4 "
                        onChange={onChangeFilter}
                        // disabled={isInputActive}
                      />
                      <label className="mb-0" for="business">
                        &#8377;20000&nbsp;-&nbsp;&#8377;50000
                      </label>
                    </div>
                  </div>
                  <div className=" rupee_input flex justify-start py-1 items-center gap-2">
                    <input
                      type="text"
                      id="rupeemin"
                      name="MinPrice"
                      placeholder="&#8377;Min"
                      className=" w-1/3 p-2"
                      onChange={onChangeFilter}
                      onFocus={() => { setIsInputActive(true); setFilter({ ...filter, MinPrice: null, MaxPrice: null }) }}
                      onBlur={() => { setIsInputActive(false) }}
                    ></input>

                    <input
                      type="text"
                      id="rupeemin"
                      name="MaxPrice"
                      placeholder="&#8377;Max"
                      className="w-1/3 p-2"
                      onChange={onChangeFilter}
                      onFocus={() => { setIsInputActive(true) }}
                      onBlur={() => { setIsInputActive(false) }}
                    ></input>

                    <div className="arrow_right">
                      <img
                        src="/images/icon/Arrow Right.svg"
                        alt="arrow_right"
                        className="p-2 rounded-lg bg-blue-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 id="accordion-flush-heading-2">
              <button
                type="button"
                className="flex items-center justify-between w-[7rem] md:w-full py-4  px-4 font-medium text-left border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-white"
                data-accordion-target="#accordion-flush-body-1"
                aria-expanded={isOpen === "Storage type" ? "true" : "false"}
                aria-controls="accordion-flush-body-1"
                onClick={() => handleToggle("Storage type")}
              >
                <span className="whitespace-nowrap  text-xs md:text-base">
                  Storage type
                </span>
                <div className="flex justify-center items-center">
                  <img
                    src="/images/storagelisting/chevron-left.svg"
                    alt="upward arrow1"
                    onClick={() => handleToggle("Storage type")}
                    className={`h-4 w-4 md:h-6 md:w-6 ${isOpen === "Storage type" ? "rotate-180" : ""}`}
                  />
                </div>
              </button>
            </h3>
            <div
              id="accordion-flush-body-1"
              className={`py-2 ml-3 flex flex-col justify-center text-center border-b border-gray-200 dark:border-gray-700 px-2 ${isOpen !== "Storage type" && "hidden"
                }`}
              aria-labelledby="accordion-flush-heading-1"
            >
              <div className="flex justify-start py-1 items-center gap-2 text-sm">
                <input
                  type="radio"
                  id="Independent"
                  name="StorageType"
                  value="Independent"
                  className="w-4 "
                  onChange={onChangeFilter}
                />
                <label className="mb-0" for="business">Independent </label>
              </div>
              <div className="flex justify-start py-1 items-center gap-2 text-sm">
                <input
                  type="radio"
                  id="Shared"
                  name="StorageType"
                  value="Shared"
                  className="w-4 "
                  onChange={onChangeFilter}
                />
                <label className="mb-0" for="business">Shared</label>
              </div>
            </div>
          </div>
          <h3 id="accordion-flush-heading-6 ">
            <button
              type="button"
              className="flex items-center justify-between py-4  w-[7rem] md:w-full px-4 font-medium text-left border-b border-gray-200 text-gray-900 dark:text-white"
              data-accordion-target="#accordion-flush-body-1"
              aria-expanded={isOpen === "Time Duration" ? "true" : "false"}
              aria-controls="accordion-flush-body-1"
              onClick={() => handleToggle("Time Duration")}
            >
              <span className="bg whitespace-nowrap text-xs md:text-base">
                Time Duration
              </span>
              <div className="flex justify-center items-center">
                <img
                  src="/images/storagelisting/chevron-left.svg"
                  alt="upward arrow1"
                  onClick={() => handleToggle("Time Duration")}
                  className={`h-4 w-4 md:h-6 md:w-6 ${isOpen === "Time Duration" ? "rotate-180" : ""
                    }`}
                />
              </div>
            </button>
          </h3>

          <div
            id="accordion-flush-body-1"
            className={`p-2  flex flex-col justify-center text-center border border-none px-2  ${isOpen !== "Time Duration" && "hidden"
              }`}
            aria-labelledby="accordion-flush-heading-1"
          >
            <div className="broder-none">
              <div className="time-duration flex gap-2 border-none">
                <DatePicker  format="DD/MM/YYYY" name="FromDate" onChange={(date) => onChangeFilter({ target: { name: "FromDate", value: date } })} placeholder='From ' className='h-[40px] px-2 w-1/2 outline-none border-2 rounded-lg' />
                <DatePicker  format="DD/MM/YYYY" name="ToDate" onChange={(date) => onChangeFilter({ target: { name: "ToDate", value: date } })} placeholder='To' className='h-[40px] px-2 w-1/2 outline-none border-2 rounded-lg' />
              </div>
             
            </div>
          </div>
          <h3 id="accordion-flush-heading-6">
            <button
              type="button"
              className="flex items-center justify-between py-4  w-[7rem] md:w-full px-4 font-medium text-left border-b border-gray-200 text-gray-900 dark:text-white"
              data-accordion-target="#accordion-flush-body-6"
              aria-expanded={isOpen === "Distance in km" ? "true" : "false"}
              aria-controls="accordion-flush-body-6"
              onClick={() => handleToggle("Distance in km")}
            >
              <div className="text-center whitespace-nowrap">
                <span className="bg mt-3 text-xs md:text-base ">
                  Distance <span className="text-xs md:text-base">in km</span>
                </span>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src="/images/storagelisting/chevron-left.svg"
                  alt="upward arrow1"
                  onClick={() => handleToggle("Distance in km")}
                  className={`h-4 w-4 md:h-6 md:w-6 ${isOpen === "Distance in km" ? "rotate-180" : ""
                    }`}
                />
              </div>
            </button>
          </h3>

          <div
            id="accordion-flush-body-6"
            className={`py-2 ml-3 flex flex-col justify-center text-center border-b border-gray-200 dark:border-gray-700 px-2 ${isOpen !== "Distance in km" && "hidden"
              }`}
            aria-labelledby="accordion-flush-heading-6"
          >
            <input
              type="range"
              id="volume"
              name="distance"
              min="0"
              max="1000"
              onChange={onChangeFilter}
              value={distanceVal}
              className="rangeinkm"
            />
            <div className=" flex justify-center items-center text-center p-3 border border-gray-200 w-full md:w-[105px] h-auto">
              {/* <label className="mb-0" for="volume">3 Km</label> */}
              <label className="mb-0" for="volume">{distanceVal} Km</label>
            </div>
          </div>
          <div class="border-sec  border-b border-gray-300">
            <h3 id="accordion-flush-heading-6">
              <button
                type="button"
                className="flex items-center justify-between py-4 w-[7rem] md:w-full px-4 font-medium text-left border-b border-gray-200 text-gray-900 dark:text-white"
                data-accordion-target="#accordion-flush-body-1"
                aria-expanded={isOpen === "Space Dimensions" ? "true" : "false"}
                aria-controls="accordion-flush-body-1"
                onClick={() => handleToggle("Space Dimensions")}
              >
                <span className="bg whitespace-nowrap text-xs md:text-base pb-2 md:pb-0 ">
                  Space Dimensions
                </span>
                <div className="flex justify-center items-center mb-3">
                  <img
                    src="/images/storagelisting/chevron-left.svg"
                    alt="upward arrow1"
                    onClick={() => handleToggle("Space Dimensions")}
                    className={`h-4 w-4 md:h-6 md:w-6 ${isOpen === "Space Dimensions" ? "rotate-180" : ""
                      }`}
                  />
                </div>
              </button>
            </h3>
            <div
              class="overflow-hidden transition-max-height duration-300"
              id="accordionContentBedroom"
            >
              <form>
                <div className=" ">
                  <div
                    class={`px-2 py-1.5 ${isOpen === "Space Dimensions" ? "" : "hidden"
                      }`}
                  >
                    <div className="px-2">
                      <div className="flex justify-start py-1 items-center gap-2 text-sm flex-col md:flex-row">
                        <input
                          type="radio"
                          name="space_dimension"
                          value="0-300"
                          onChange={onChangeFilter}
                          className="w-full md:w-4"
                        />
                        <label className="mb-0" htmlFor="space_dimension text-xs">0-300 sq ft. (Few)</label>
                      </div>
                      <div className="flex justify-start py-1 items-center gap-2 text-sm flex-col md:flex-row">
                        <input
                          type="radio"
                          name="space_dimension"
                          value="300-600"
                          onChange={onChangeFilter}
                          className="w-full md:w-4"
                        />
                        <label className="mb-0" htmlFor="space_dimension text-xs">300-600 sq ft. (1BHK)</label>
                      </div>
                      <div className="flex justify-start py-1 items-center gap-2 text-sm flex-col md:flex-row">
                        <input
                          type="radio"
                          name="space_dimension"
                          value="600-1000"
                          onChange={onChangeFilter}
                          className="w-full md:w-4"
                        />
                        <label className="mb-0" htmlFor="space_dimension text-xs">600-1000 sq ft. (2BHK)</label>
                      </div>
                      <div className="flex justify-start py-1 items-center gap-2 text-sm flex-col md:flex-row">
                        <input
                          type="radio"
                          name="space_dimension"
                          value="900-1500"
                          onChange={onChangeFilter}
                          className="w-full md:w-4"
                        />
                        <label className="mb-0" htmlFor="space_dimension text-xs">900-1500 sq ft. (3BHK)</label>
                      </div>
                      <div className="flex justify-start py-1 items-center gap-2 text-sm flex-col md:flex-row">
                        <input
                          type="radio"
                          name="space_dimension"
                          value="1200-2000"
                          onChange={onChangeFilter}
                          className="w-full md:w-4"
                        />
                        <label className="mb-0" htmlFor="space_dimension text-xs">1200-2000 sq ft. (4BHK)</label>
                      </div>
                      <div className="flex justify-start py-1 items-center gap-2 text-sm flex-col md:flex-row">
                        <input
                          type="radio"
                          name="space_dimension"
                          value="2001-100000"
                          onChange={onChangeFilter}
                          className="w-full md:w-4"
                        />
                        <label className="mb-0" htmlFor="space_dimension text-xs">Other</label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <h3 id="accordion-flush-heading-6 ">
            {/* <button
              type="button"
              className="flex items-center justify-between py-4 w-[7rem] md:w-full px-4 font-medium text-left border-b border-gray-200 text-gray-900 dark:text-white"
              data-accordion-target="#accordion-flush-body-1"
              aria-expanded={isOpen === "Rating" ? "true" : "false"}
              aria-controls="accordion-flush-body-1"
              onClick={() => handleToggle("Rating")}
            >
              <span className="bg whitespace-nowrap text-xs md:text-base ml-2 md:ml-0">
                Rating
              </span>
              <div className="flex justify-center items-center">
                <img
                  src="/images/storagelisting/chevron-left.svg"
                  alt="upward arrow1"
                  onClick={() => handleToggle("Rating")}
                  className={`h-4 w-4 md:h-6 md:w-6 ${isOpen === "Rating" ? "rotate-180" : ""
                    }`}
                />
              </div>
            </button> */}
          </h3>
          <div className="flex flex-col justify-center ml-3">
            <div
              id="accordion-flush-body-1"
              className={`py-2 ml-3 flex flex-col justify-center text-center border-b border-gray-200 dark:border-gray-700 ${isOpen === "Rating" ? "" : "hidden"
                }`}
              aria-labelledby="accordion-flush-heading-1"
            >
              <h3 id="accordion-flush-heading-6">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-2 px-4 font-medium text-left  dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-white"
                  data-accordion-target="#accordion-flush-body-1"
                  aria-expanded={isOpen === "Sort By" ? "true" : "false"}
                  aria-controls="accordion-flush-body-1"
                  onClick={() => handleToggle("Sort by")}
                >
                  {/* <span className="bg mt-2">Ratings</span> */}
                  {/* <div className="flex justify-center items-center">
                  <img
                    src="/images/storagelisting/chevron-left.svg"
                    alt="upward arrow1"
                    onClick={() => handleToggle("Rating")}
                  />
                </div> */}
                </button>
              </h3>
              <div className=" w-full flex md:flex-col justify-center text-wrap  text-center px-2   whitespace-nowrap">
                <div className="flex justify-start py-1 items-center gap-2 text-sm flex-col md:flex-row">
                  <input
                    type="radio"
                    id="5business"
                    name="5business"
                    value="5business"
                    onChange={onChangeFilter}
                    className="w-full md:w-4"
                  />
                  <label className="mb-0" htmlFor="business text-xs">5 Stars</label>
                </div>
                <div className="flex justify-start py-1 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    id="3"
                    name="3"
                    value="3"
                    onChange={onChangeFilter}
                    className="w-4 "
                  />
                  <label className="mb-0" for="business text-xs">4 Stars</label>
                </div>
              </div>
              <div className="w-full flex md:flex-col justify-center text-wrap  text-center px-2   whitespace-nowrap">
                <div className="flex justify-start py-1 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    id="3stars"
                    name="3stars"
                    value="3stars"
                    onChange={onChangeFilter}
                    className="w-4 "
                  />
                  <label className="mb-0" for="business text-xs">3 Stars</label>
                </div>
                <div className="flex justify-start py-1 items-center gap-2 text-sm">
                  <input
                    type="radio"
                    id="2stars"
                    name="2stars"
                    value="2stars"
                    onChange={onChangeFilter}
                    className="w-4 "
                  />
                  <label className="mb-0" for="business text-xs">2 Stars</label>
                </div>
              </div>
              <div className="flex justify-start py-1 items-center gap-2 px-2 text-sm">
                <input
                  type="radio"
                  id="1stars"
                  name="1stars"
                  value="1stars"
                  onChange={onChangeFilter}
                  className="w-4 "
                />
                <label className="mb-0" for="business text-xs">1 Stars</label>
              </div>
            </div>
          </div>
          <h3 id="accordion-flush-heading-6 ">
            <button
              type="button"
              className="flex items-center justify-between py-4 w-[7rem] md:w-full px-4 font-medium text-left border-b border-gray-200 text-gray-900 dark:text-white"
              data-accordion-target="#accordion-flush-body-1"
              aria-expanded={isOpen === "Sort By" ? "true" : "false"}
              aria-controls="accordion-flush-body-1"
              onClick={() => handleToggle("Sort By")}
            >
              <span className="bg whitespace-nowrap text-xs md:text-base">
                Sort By
              </span>
              <div className="flex justify-center items-center">
                <img
                  src="/images/storagelisting/chevron-left.svg"
                  alt="upward arrow1"
                  onClick={() => handleToggle("Sort By")}
                  className={`h-4 w-4 md:h-6 md:w-6 ${isOpen === "Sort By" ? "rotate-180" : ""
                    }`}
                />
              </div>
            </button>
          </h3>
          <div
            className={`py-2 ml-3 flex flex-col justify-center text-center border-b border-gray-200 dark:border-gray-700 ${isOpen === "Sort By" ? "" : "hidden"
              }`}
            aria-labelledby="accordion-flush-heading-1"
          >
            <div className="w-full flex md:flex-col justify-center text-wrap px-2 text-center whitespace-nowrap">
              <div className="flex justify-start py-1 items-center gap-2 text-sm">
                <input
                  type="radio"
                  id="high-to-low"
                  name="sortBy"
                  value="Pricing(High to low)"
                  onChange={onChangeFilter}
                  className="w-4"
                />
                {/* use code in onclick for check uncheck functionality  */}
                {/* setCheckedStatusSortBy(!checkedStatusSortBy); onClickAvailability(e) */}
                <label className="mb-0" for="business text-xs whitespace-nowrap text-center flex-wrap">
                  Pricing (high to low)
                </label>
              </div>
              <div className="flex justify-start py-1 items-center gap-2 text-xs md:text-sm">
                <input
                  type="radio"
                  id="low-to-high"
                  name="sortBy"
                  value="Pricing(Low to high)"
                  onChange={onChangeFilter}
                  className="w-4"
                />
                <label className="mb-0" for="business text-xs whitespace-nowrap flex-wrap text-center">
                  Pricing (Low to High)
                </label>
              </div>


            </div>

            <div className="flex md:flex-row justify-start py-1 items-center gap-2 px-2 text-sm">
              <input
                type="radio"
                id="recent"
                name="sortBy"
                value="Recent"
                onChange={onChangeFilter}
                className="w-4 "
              />
              <div className="md:flex md:flex-col justify-center text-wrap text-center whitespace-nowrap">
                <label className="mb-0" for="business text-xs whitespace-nowrap flex-wrap text-center">
                  Recent
                </label>
              </div>
            </div>

            <div className="flex justify-start py-1 items-center gap-2 px-2 text-sm">
              <input
                type="radio"
                id="discount-high-to-low"
                name="sortBy"
                value="Discount(High to low)"
                onChange={onChangeFilter}
                className="w-4 "
              />
              <label className="mb-0" for="business text-xs whitespace-nowrap flex-wrap text-center">
                Discount (High to Low)
              </label>
            </div>

            <div className="flex justify-start py-1 items-center gap-2 px-2 text-sm text-center">
              <input
                type="radio"
                id="discount-low-to-high"
                name="sortBy"
                value="Discount(Low to high)"
                onChange={onChangeFilter}
                className="w-4 "
              />
              <label className="mb-0" for="business text-xs whitespace-nowrap flex-wrap">
                Discount ( Low to High)
              </label> 
            </div>
          </div>
        </div>




        <div className="wraper_right w-full md:w-3/4 h-[auto] flex flex-wrap">
          <div className="gap-4 m-0 mt-4 grid grid-cols-1 md:grid-cols-3 mx-auto">
            {data?.data?.map((item, index) => {
              const url = item.url.split("https://xtendedspace.com/affordable-storage");
              return (
                <>
                 {/* <Link href={{ pathname: "/storage-details", query: { propertyId: item.id, originalAmount: item.originalAmount }, }}> */}
                 <Link 
  // href={{ 
  //   pathname: "/storage-details", 
  //   query: { propertyId: item.id, originalAmount: item.originalAmount }
  // }} 
 // 144-sq-ft-near-sector-63-in-noida-MB-PropertyId-1604
  href={`/affordable-storage/${url[1]}`}
//  as={`/affordable-storage/${item.spaceType}/${item.squareFeet}-sq-ft-near-${item.addressLine2.replace(/\s+/g, '-')}-in-${item.city.replace(/\s+/g, '-')}` +
//       `?propertyId=${item.id}&originalAmount=${item.originalAmount}`
//       }
>
                    <div class="max-w-xs bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden py-2">
                      <div class="relative">
                        {item?.propertyImage && <img src={`https://${(currentUrl?.includes("stage.xtendedspace.com") || currentUrl?.includes("localhost") || currentUrl?.includes("main.d2kyc")) ? 'xtendedspacedev' : 'xtendedspace'}.blob.core.windows.net/public/${item.propertyImage}`} alt="Room Image" class="w-full h-48 object-cover" />}
                        {/* <div class="absolute top-2 right-2 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-full p-1 text-sm">4 ⭐</div>
      <div class="absolute top-2 right-2 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-full p-1 text-sm">4 ⭐</div> */}
                        {item?.status === "Booked" && (
                          <div class="absolute inset-0 flex items-center justify-center bg-zinc-800 bg-opacity-50 text-white text-xl font-bold">
                            <MdOutlineDoNotDisturbAlt className="text-4" /> Sold out
                          </div>
                        )}
                      </div>
                      <div class="p-2">
                        <div class="flex gap-2 mb-2">
                          <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full">
                            <img src="/images/calculator/ph_house-fill.svg" alt="household1" className="w-full md:w-15 " />
                            <div className="text-sm whitespace-nowrap text-blue-600 mr-2">{item?.propertyType}</div>
                          </div>
                          {/* <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Household Items</span>
        <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Business Inventory</span> */}
                        </div>
                        {/* <p class="text-zinc-700 dark:text-zinc-300 text-sm mb-2">{item.description}</p> */}
                        {/* {item.description ? (
                        <p className="text-zinc-700 dark:text-zinc-300 text-sm mb-2">
                          {truncateDescription(item.description, 15)}
                        </p>
                      ) : ( */}
                        <p className="text-zinc-700 dark:text-zinc-300 text-sm mb-2">
                          {`Affordable ${item.propertyType} Storage Space Near ${item.addressLine2} in ${item?.city?.trim()}.`}
                          {/* Property Type: {item.propertyType}, City: {item.city}, Size: {item.lengthInFeet}*{item.widthInFeet} sqft, Price: ₹{item.rentalAmountPerDay}/Day */}
                        </p>
                        {/* )} */}
                        <div className="flex mb-2 mt-2">
                          <img src="/images/icon/delhincrlocation.jpg" alt="Delhi1" className="w-6 h-6" />
                          <span className="leading-5 font-medium">{item?.city}</span>
                        </div>
                        <div className="flex gap-1 mb-2 mt-2">
                          <img src="/images/calculator/distance_vector.svg" alt="distance1" className="9" />
                          <span className="leading-7 font-medium">
                            {(item.lengthInFeet * item?.widthInFeet)} sq.ft
                          </span>
                        </div>

                        <div class="flex items-center justify-between">
                          <a 
                            className="text-white font-semibold bg-[#338CFF] rounded-md leading-7 p-2 px-2 py-2.5 mr-5 cursor-pointer">
                            Book Now
                          </a>
                          {/* <button class="bg-blue-500 text-white text-sm font-semibold py-2.5 px-4 rounded-lg">Book Now</button> */}
                          {/* <div class="text-right">
                          <span class="line-through  dark:text-zinc-400 text-sm text-red-500 px-1">₹{item.originalAmount}</span>
                          <span class=" text-lg text-black font-bold">₹{item.rentalAmountPerDay}</span>
                          <span class="text-zinc-500 dark:text-zinc-400 text-sm">/Day</span>
                        </div> */}
                          <div className="text-right">
                            {item.originalAmount >= item.rentalAmountPerDay && (
                              <span className="line-through dark:text-zinc-400 text-sm text-red-500 px-1">₹{item.originalAmount}</span>
                            )}
                            <span className="text-lg text-black font-bold">₹{item.rentalAmountPerDay}</span>
                            <span className="text-zinc-500 dark:text-zinc-400 text-sm">/Day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                </>
              );
            })}

          </div>

        </div>
      </div>

      {/* <button class="fixed bottom-4 right-4 border-blue-700 text-white p-3 rounded-full shadow-lg">
              <Link href="#" class="text-blue-500 hover:text-blue-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
              </Link>
              </button> */}

              {loading && <p className="loaderWrapper w-full flex m-1"><span className="m-auto">Loading...</span></p>}

      <Footer />
    
    </div>
    </>
   
  );
};
const ModalBody = ({ setModalShow, onChangeFilter }) => {

  const [data, setdata] = useState([]);
  const [filter, setFilter] = useState();

  const getStorage = async (filterString) => {
    const response = await getAllStorage(filterString);

    if (response.success) {
      setdata(response.success);
    }
  };
  let currentFilter = "";
  // const onChangeFilter = (e) => {
  //   const { name, value } = e.target;
  //   setFilter({ ...filter, [name]: value });


  // };
  useEffect(() => {
    if (filter) {
      Object.keys(filter).forEach((item) => {
        if (filter[item]) {
          currentFilter += `&${item}=${filter[item]}`;
        }
      });
    }
    getStorage(currentFilter);
  }, [filter]);
  useEffect(() => {
    if (filter) {
      let newFilter = "";
      if (filter.spaceType) {
        newFilter += `&spaceType=${filter.spaceType}`;
      }
      // Add other filters if needed

      getStorage(newFilter);
    } else {
      getStorage("");
    }
  }, [filter]);

  return (
    <>
      <div className="flex flex-col items-start justify-center ">
        {/* <Image src={tickmark} alt="Tick Mark" priority className="w-24 h-24 mb-4" /> */}
        <div
        // className={`py-2 ml-3 flex flex-col justify-center text-center border-b border-gray-200 dark:border-gray-700 ${isOpen === "Sort By" ? "" : "hidden"
        //   }`}
        // aria-labelledby="accordion-flush-heading-1"
        >
          {/* <div className="w-full flex md:flex-col justify-center text-wrap  text-center   whitespace-nowrap"> */}
          <div className="flex justify-start items-center gap-2 text-sm">
            <input
              type="radio"
              id="high-to-low"
              name="sortBy"
              value="Pricing(High to low)"
              onClick={onChangeFilter}
              className="w-4 "
            />
            <label className="mb-0" for="business text-xs whitespace-nowrap text-center flex-wrap">
              Pricing (high to low)
            </label>
          </div>
          <div className="flex justify-start items-center gap-2 text-sm">
            <input
              type="radio"
              id="low-to-high"
              name="sortBy"
              value="Pricing(Low to high)"
              onClick={onChangeFilter}
              className="w-4 "
            />
            <label className="mb-0" for="business text-xs whitespace-nowrap flex-wrap text-center">
              Pricing (Low to High)
            </label>
          </div>
          {/* </div> */}

          <div className="flex md:flex-row justify-start items-center gap-2 text-sm">
            <input
              type="radio"
              id="recent"
              name="sortBy"
              value="Recent"
              onClick={onChangeFilter}
              className="w-4 "
            />
            <div className="md:flex md:flex-col justify-center text-wrap text-center whitespace-nowrap">
              <label className="mb-0" for="business text-xs whitespace-nowrap flex-wrap text-center">
                Recent
              </label>
            </div>
          </div>

          <div className="flex justify-start items-center gap-2 text-sm">
            <input
              type="radio"
              id="discount-high-to-low"
              name="sortBy"
              value="Discount(High to low)"
              onClick={onChangeFilter}
              className="w-4 "
            />
            <label className="mb-0" for="business text-xs whitespace-nowrap flex-wrap text-center">
              Discount (High to Low)
            </label>
          </div>

          <div className="flex justify-start items-center gap-2 text-sm text-center">
            <input
              type="radio"
              id="discount-low-to-high"
              name="sortBy"
              value="Discount(Low to high)"
              onClick={onChangeFilter}
              className="w-4 "
            />
            <label className="mb-0" for="business text-xs whitespace-nowrap flex-wrap">
              Discount ( Low to High)
            </label> 
          </div>
        </div>
        {/* <div className="flex w-full gap-2">
          <div

            className="bg-white text-blue-500 border font-bold py-2 px-4 text-center rounded cursor-pointer w-1/2"
          >
            Clear Filter
          </div>
          <div

            className="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded cursor-pointer w-1/2"
          >
            Apply
          </div>
        </div> */}
      </div>

    </>
  )
}

export default homepage;