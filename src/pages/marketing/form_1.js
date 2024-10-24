import Image from "next/image";
import box_icon from "../../../public/images/icon/Box (1).svg";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Accordion from 'react-bootstrap/Accordion';
// import { getCityNearby } from "@/service/storageService";


export default function Index() {

    const [multipleError, setMultipleError] = useState();
    const [error, setError] = useState();

    const options = {
        few_item: false,
        rk_1: false,
        bhk_1: false,
        bhk_2: false,
        bhk_3: false,
        bhk_4: false
    };

    const [tab, setTab] = useState({
        few_item: false,
        rk_1: false,
        bhk_1: true,
        bhk_2: false,
        bhk_3: false,
        bhk_4: false
    });

    const [slide, setSlide] = useState(false);

    const [data, setData] = useState({
        Name: "",
        Phone: "",
        Email: "",
        AddressLine1: "",
        AddressLine2: "",
        City: "",
        District: "",
        State: "",
        Pincode: "",
        IsDefault: true
    });

    


    const onChange = (e) => {
        setError()
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onsubmitHandler = async (event) => {
        event.preventDefault();
        const allKeys = Object.keys(data);
        const formData = new FormData();
        allKeys.forEach((item) => {
            formData.append(item, data[item]);
        });


        // formData.append("UserId", getUserId());
        // const response = await easyStorageModalAddress(formData);
      
        // if (response.success) {
        //   document.getElementById("myform").reset();
        // //   fetchUserAddress()
        //   // alert("address updated successfully!");
        // } else {
        //   {
        //     if (
        //       response?.error?.title === "One or more validation errors occurred."
        //     ) {
        //       setMultipleError(response.error.errors);
        //     }
        //     setError(response.error);
        //   }
        // }
    };


    const emptyForm = () => {
        document.getElementById("myform").reset();
        setData({
            Name: "",
            Phone: "",
            Email: "",
            AddressLine1: "",
            AddressLine2: "",
            City: "",
            District: "",
            State: "",
            Pincode: "",
            IsDefault: true
        })
    }

    const [width, setWidth] = useState();
    useEffect(() => {
        window.addEventListener("resize", function () {
            setWidth(this.window.innerWidth);
        })
    }, [width]);

    const [addItemButton, setAddItemButton] = useState(true);
    const [showMobileMenu, setShowMobileMenu] = useState(false);


    return (
        <>
            <form onSubmit={((e) => { e.preventDefault(); onsubmitHandler })} id="myform" className="lg:absolute lg:top-[-140px] lg:w-[85%] min-h-[450px] bg-white shadow rounded-[24px] overflow-hidden">
                {!slide &&
                    (<div className={`${slide ? `opacity-0` : `opacity-100`} duration-500 ease-in-out`}>
                        <div className="bg-gray-50 p-4 rounded-t-[24px]">
                            <div className="capitalize font-bold mb-4">
                                <h1>let's add items to store</h1>
                            </div>
                            <div className="flex items-center justify-items-center justify-between flex-wrap">
                                <button onClick={() => { setTab({ ...options, few_item: true }); }} value="few_items" className={`${tab.few_item ? `bg-blue-600 text-white` : null} lg:w-[160px] py-1 rounded-[12px] h-[50px] text-[14px] shadow-sm font-bold w-[100px]`}><span>Few Items</span></button>
                                <button onClick={() => { setTab({ ...options, rk_1: true }); }} value="1RK" className={`${tab.rk_1 ? `bg-blue-600 text-white` : null} lg:w-[160px] py-1 rounded-[12px] h-[50px] text-[14px] shadow-sm font-bold w-[100px]`}><span>1RK</span></button>
                                <button
                                    onClick={() => { setTab({ ...options, bhk_1: true }); }} value="1BHK" className={`${tab.bhk_1 ? `bg-blue-600 text-white` : `bg-white`} relative lg:w-[160px] py-1 rounded-[12px] h-[50px] text-[14px] font-bold flex items-center shadow-sm justify-items-center flex-col bg-blue-600 w-[100px]`}>
                                    <span className="bg-yellow-300 rounded-[24px] absolute text-[8px] flex px-1 top-[-5px] font-bold text-black">Mostly Preferred</span>
                                    <span className={`${tab.bhk_1 && `text-white`} font-bold text-black pt-1`}>1BHK</span>
                                    <span className={`${tab.bhk_1 && `text-white`} text-[8px] text-black`}>500-700 Sq Ft.</span>
                                </button>
                                <button onClick={() => { setTab({ ...options, bhk_2: true }); }} value="2BHK" className={`${tab.bhk_2 ? `bg-blue-600 text-white` : null} lg:w-[160px] py-1 rounded-[12px] h-[50px] text-[14px] shadow-sm font-bold w-[100px]`}>
                                    <span>2BHK</span>
                                </button>
                                <button onClick={() => { setTab({ ...options, bhk_3: true }); }} value="3BHK" className={`${tab.bhk_3 ? `bg-blue-600 text-white` : null} lg:w-[160px] py-1 rounded-[12px] h-[50px] text-[14px] shadow-sm font-bold w-[100px]`}>
                                    <span>3BHK</span>
                                </button>
                                <button onClick={() => { setTab({ ...options, bhk_4: true }); }} value="4BHK" className={`${tab.bhk_4 ? `bg-blue-600 text-white` : null} lg:w-[160px] py-1 rounded-[12px] h-[50px] text-[14px] shadow-sm font-bold w-[100px]`}>
                                    <span>4BHK</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 place-items-center">
                            <div className="w-[65%] min-h-[200px] bg-gray-50 mt-4 mb-4 pt-2 pb-4 flex flex-col items-start justify-items-center justify-around rounded-lg">
                                <div className="ml-4">
                                    <h1>How much can be stored</h1>
                                </div>
                                <div className="ml-4">
                                    <span className="font-bold text-xl">1 BHK</span>
                                    <span className="text-[13px]"> (500 - 700 Sq Ft.)</span><br />
                                    <span className="text-muted text-[12px]">Type of items can stored here</span>
                                </div>
                                <div className="flex items-center justify-items-center ml-4">
                                    <span className="min-h-[15px] bg-white rounded-[24px] min-w-[25px] text-[14px] px-2 py-1 flex items-center justify-items-center mr-2"><Image src={box_icon} height={20} width={20} priority className="mr-1" /> 2 Large</span>
                                    <span className="min-h-[15px] bg-white rounded-[24px] min-w-[25px] text-[14px] px-2 py-1 flex items-center justify-items-center"><Image src={box_icon} height={16} width={16} priority className="mr-1" /> 3 Medium</span>
                                </div>
                                <div className="flex items-center justify-items-center ml-4">
                                    <span className="min-h-[15px] bg-white rounded-[24px] min-w-[25px] text-[14px] px-2 py-1 flex items-center justify-items-center mr-2"><Image src={box_icon} height={13} width={13} priority className="mr-1" /> 5 Small</span>
                                    <span className="min-h-[15px] bg-white rounded-[24px] min-w-[25px] text-[14px] px-2 py-1 flex items-center justify-items-center"><Image src={box_icon} height={10} width={10} priority className="mr-1" /> 5 Boxes (Approx.)</span>
                                </div>
                            </div>
                            {/* mobile form code here */}
                            {(width < 768) ? (<div className="w-full min-h-[100px] py-6 grid place-items-center">
                                {
                                    addItemButton && (<div className="px-6 w-full grid place-items-center">
                                        <button className="h-12 w-full bg-blue-600 rounded text-white" onClick={(() => { setAddItemButton(!addItemButton); setShowMobileMenu(true) })}>Add Items</button>
                                    </div>)
                                }
                                {
                                    showMobileMenu && (<div className="lg:w-full w-[300px] bg-white rounded-[24px] shadow-sm">
                                        {!addItemButton && (<div className="h-6 w-full">
                                            <button className="flex items-center justify-items-center" onClick={(() => { setAddItemButton(!addItemButton) })}> <MdOutlineKeyboardArrowLeft size={25} />Add Items</button>
                                        </div>)
                                        }

                                        {/* main content div */}
                                        {!addItemButton && (<div className="flex items-center justify-items-center flex-col min-h-[300px] px-2">
                                            <div className="w-full md:mb-1 mt-[35px] px-3">
                                                <button className="absolute rounded-[24px] h-[30px] border-gray-300 ml-3"><CiSearch size={20} /></button>
                                                <input type="text" onChange={onChange} className="w-full pl-[40px] bg-transparent rounded-[24px] h-[30px] border-1 border-gray-300 outline-none placeholder:text-[12px] text-[12px]" placeholder="Search & Add Items" />
                                            </div>

                                            {/* Use map loop here for dynamic collapsible system */}
                                            <div className="min-h-[50px] w-full mt-4">
                                                <Accordion defaultActiveKey="0">
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>Bedroom</Accordion.Header>
                                                        <Accordion.Body>
                                                            <div className="flex items-center justify-items-center justify-between">
                                                                <div>
                                                                    <h6>King size bed</h6>
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-cetner justify-items-center">
                                                                        <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item eventKey="1">
                                                        <Accordion.Header>Kitchen</Accordion.Header>
                                                        <Accordion.Body>
                                                            <div className="flex items-center justify-items-center justify-between">
                                                                <div>
                                                                    <h6>King size bed</h6>
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-cetner justify-items-center">
                                                                        <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item eventKey="2">
                                                        <Accordion.Header>Living Room</Accordion.Header>
                                                        <Accordion.Body>
                                                            <div className="flex items-center justify-items-center justify-between">
                                                                <div>
                                                                    <h6>King size bed</h6>
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-cetner justify-items-center">
                                                                        <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </div>

                                        </div>)}
                                    </div>)
                                }
                            </div>) : null}

                            <div className="relative w-full min-h-[200px] mr-[50px] hidden md:block">
                                <div className="w-full grid place-items-center">
                                    <div className="lg:w-full md:w-[70%] md:mb-1 mt-[35px]">
                                        <button className="absolute rounded-[24px] h-[30px] border-gray-300 ml-3"><CiSearch size={20} /></button>
                                        <input type="text" onChange={onChange} className="w-full pl-[50px] bg-transparent rounded-[24px] h-[30px] border-1 border-gray-300 outline-none placeholder:text-[12px] text-[12px]" placeholder="Search Items to store" />
                                    </div>
                                </div>

                                {/* check box container */}
                                <div className="grid md:grid-cols-3 place-items-center mt-3 md:mb-[35px]">
                                    {/* 1st row */}
                                    <div className="flex items-center justify-items-center flex-col gap-y-2">
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>

                                    </div>
                                    {/* 2nd row */}
                                    <div className="flex items-center justify-items-center flex-col gap-y-2">
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>

                                    </div>
                                    {/* 3rd row */}
                                    <div className="flex items-center justify-items-center flex-col gap-y-2">
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>
                                        <div className="flex items-cetner justify-items-center">
                                            <h6 className="text-[13px]">Bed</h6><button className="ml-4 flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white mr-2"><FiMinus /></button><p>{0}</p><button className="flex items-center justify-items-center p-[2px] bg-[#8DC63F] rounded text-white ml-2"><IoIosAdd /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }

                {/* form part 2 parent div element */}
                {slide &&
                    (<div style={slide ? { transform: "translateX(0px)" } : null} className={`${slide ? `duration-500` : null} lg:absolute top-0 lg:w-[100%] min-h-[100%] bg-white shadow rounded-[24px] transform translate-x-[1100px] duration-500 ease-in-out`}>
                        <div className="bg-gray-50 p-4 rounded-t-[24px]">
                            <div className="capitalize font-bold mb-4">
                                <h1>let's add your details</h1>
                            </div>

                            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 gap-x-4 place-items-center">
                                <div className="flex flex-col items-start justify-items-center">
                                    <h6 className="text-muted mb-2 text-[11px]">Name</h6>
                                    <input type="text" onChange={onChange} name="Name" value={data?.Name} className="outline-none border-1 border-gray-200 h-[35px] w-[270px] pl-[10px] rounded-[8px] text-[11px]" placeholder="Enter Name" />
                                </div>
                                <div className="flex flex-col items-start justify-items-center">
                                    <h6 className="text-muted mb-2 text-[11px]">Phone Number</h6>
                                    <div className="flex items-center justify-items-center justify-between">
                                        <select onChange={onChange} className="h-[35px] rounded-[8px] border-1 border-gray-200 mr-2 text-[11px]">
                                            <option value="">+91</option>
                                        </select>
                                        <input type="number" onChange={onChange} name="Phone" value={data?.Phone} className="outline-none border-1 border-gray-200 h-[35px] w-[270px] pl-[10px] rounded-[8px] text-[11px]" placeholder="Enter your ph no" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-start justify-items-center">
                                    <h6 className="text-muted mb-2 text-[11px]">Email ID</h6>
                                    <input type="email" onChange={onChange} name="Email" value={data?.Email} className="outline-none border-1 border-gray-200 h-[35px] w-[270px] pl-[10px] rounded-[8px] text-[11px]" placeholder="Enter Email" />
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* second form section-2 for address */}
                            <div className="min-h-[250px] w-[100%]">
                                <h2 className="pl-8 pt-6 mb-4 text-[15px]">Your Address</h2>
                                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 gap-x-4 place-items-center">
                                    <div className="flex flex-col items-start justify-items-center">
                                        <h6 className="text-muted mb-2 text-[11px]">Enter your address<span className="text-red-600">*</span></h6>
                                        <input type="text" onChange={onChange} name="AddressLine1" value={data?.AddressLine1} className="outline-none border-1 border-gray-200 h-[35px] w-[270px] pl-[10px] rounded-[8px] text-[11px]" placeholder="Address Line 1" />
                                    </div>
                                    <div className="flex flex-col items-start justify-items-center">
                                        <h6 className="text-muted mb-2 text-[11px]"></h6>
                                        <input type="text" onChange={onChange} name="AddressLine2" value={data?.AddressLine2} className="outline-none border-1 border-gray-200 h-[35px] w-[270px] pl-[10px] rounded-[8px] text-[11px]" placeholder="Address Line 2" />
                                    </div>
                                    <div className="flex flex-col items-start justify-items-center">
                                        <h6 className="text-muted mb-2 text-[11px]">City<span className="text-red-600">*</span></h6>
                                        <select onChange={onChange} name="City" value={data?.City} className="h-[35px] w-[270px] rounded-[8px] border-1 border-gray-200 mr-2 outline-none text-[11px]">
                                            <option value="">Select</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 gap-x-4 place-items-center mt-6">
                                    <div className="flex flex-col items-start justify-items-center">
                                        <h6 className="text-muted mb-2 text-[11px]">District<span className="text-red-600">*</span></h6>
                                        <input type="text" onChange={onChange} name="District" value={data?.District} className="outline-none border-1 border-gray-200 h-[35px] w-[270px] pl-[10px] rounded-[8px] text-[11px]" placeholder="District" />
                                    </div>
                                    <div className="flex flex-col items-start justify-items-center">
                                        <h6 className="text-muted mb-2 text-[11px]">State<span className="text-red-600">*</span></h6>
                                        <input type="text" onChange={onChange} name="State" value={data?.State} className="outline-none border-1 border-gray-200 h-[35px] w-[270px] pl-[10px] rounded-[8px] text-[11px]" placeholder="State" />
                                    </div>
                                    <div className="flex flex-col items-start justify-items-center">
                                        <h6 className="text-muted mb-2 text-[11px]">Pincode<span className="text-red-600">*</span></h6>
                                        <input type="number" onChange={onChange} name="Pincode" value={data?.Pincode} className="outline-none border-1 border-gray-200 h-[35px] w-[270px] pl-[10px] rounded-[8px] text-[11px]" placeholder="Pincode" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* second form next and submit buttons jsx */}
                        {slide &&
                            <div className="h-full w-full">
                                <div className=" items-center justify-items-center justify-center gap-x-4 hidden md:flex md:mb-[35px]">
                                    <button className="w-[250px] border-[1px] border-blue-500 h-[35px] text-blue-500 font-bold text-[13px] rounded-lg" onClick={() => (setSlide(!slide))}>Cancel</button>
                                    <button className="w-[250px] border-[1px] border-blue-500 h-[35px] text-white font-bold text-[13px] rounded-lg bg-blue-500">Next</button>
                                </div>
                            </div>
                        }
                    </div>)
                }

                {!slide && (<div className={`h-full w-full`}>
                    <div className={` items-center justify-items-center justify-center gap-x-4 hidden md:flex md:mb-[35px]`}>
                        <button className="w-[250px] border-[1px] border-blue-500 h-[35px] text-blue-500 font-bold text-[13px] rounded-lg" onClick={emptyForm}>Cancel</button>
                        <button className="w-[250px] border-[1px] border-blue-500 h-[35px] text-white font-bold text-[13px] rounded-lg bg-blue-500" onClick={() => (setSlide(!slide))}>Next</button>
                    </div>
                </div>)
                }
            </form>
        </>
    )
}


