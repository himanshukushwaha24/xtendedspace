import { contact_us } from "@/service/homePageService";
import Link from "next/link";
import { useState } from "react";
import HeaderMenu from "@/components/header/header";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    source: "contact_us",
    city: "Agra",
  });
  const [error, setError] = useState();
  const [multipleError, setMultipleError] = useState({});

  function trimNumber(s) {
   while (s.substr(0,1) == '0' && s.length>1) { s = s.substr(1,9999); }
   return s;
 }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if(name === "phoneNumber" ){
      newValue = trimNumber(value);
      
      // setFormData({ ...formData, [name]: trimNumber(value) });

    }
    setFormData({ ...formData, [name]: value });
    setError();
    setMultipleError({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.name = formData.first_name + " " + formData.last_name;
    const response = await contact_us(formData);
    if (response.success) {
      // alert("we will get you soon!");
    } else {
      // setError(response.error)
      // setMultipleError(response.error);
      if(response?.error?.title === "One or more validation errors occurred."){
         setMultipleError(response.error.errors)
        }
    }
  };

  return (
    <>
      <HeaderMenu />

      <section className="contactbanner">
        <div className="contactcontent">
          <h1>We Value your response</h1>
          <p>If you need any assistance, our team will soon respond to you... </p>
        </div>
      </section>
      <section className="w-[auto] h-[auto] md:mx-[50px] ">
        <div class="max-w-[100vw]  md:h-[auto] bg-white gap-5 flex-col-reverse md:flex-row  flex justify-between">
          <div class=" md:w-[50vw] h-[auto]   p-[20px]  justify-between">
            <div className="w-[auto] h-[250px] ">
              <div className="flex gap-4 py-4">
                <Image
                  className="w-6"
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/bxs_phone-call.svg"
                  alt="phone"
                  width={24}
                  height={24}
                />
                <h3 className="text-[20px] ">9009000798 </h3>
              </div> 
              <div className="flex gap-4 py-4">
                <img
                  className="w-6"
                  src="/images/icon/ic_sharp-email.svg"
                  alt=""
                />
                <h3 className="text-[20px] ">Info@xtendedspace.com </h3>
              </div> 
              <div className="flex gap-4 py-4">
                <img className="w-6" src="/images/icon/Location.svg" alt="" />
                <h3 className="text-[20px] ">
                A-96, Sector -63 Noida-201301, A Block,  
Noida, Uttar Pradesh 
                </h3>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="#">
                <img
                  className=" p-2 rounded-[50%]"
                  src="/images/icon/twitter.svg"
                  alt=""
                />
              </a>
              <a href="#">
                <img
                  className=" p-2 rounded-[50%]"
                  src="/images/icon/instagram.svg"
                  alt=""
                />
              </a>
              <a href="#">
                <Image
                  className=" p-2 rounded-[50%]"
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/discord.svg"
                  alt="discord"
                  width={100}
                  height={100}
                />
              </a>
            </div>
          </div>

          <div class="md:w-[50vw]  h-[360px] relative ">
            <div class="card price-sec  md:w-full p-3 absolute z-10 top-[-100px] md:top-[-160px] mx-3    md:right-0 storage-price pb-0">
              {/* <div class=" "> */}
              <form action="#" onSubmit={handleSubmit} method="POST">
                <div class="grid grid-cols-2 gap-2 md:gap-4 md:px-10">
                  <div class="mb-4">
                    <label
                      className="block  text-[#1B1C57] text-sm font-normal"
                      for="first_name"
                      class="block mb-1"
                    >
                      First Name:
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="Enter your Name"
                      class="w-full p-2 border-b border-gray-300  focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label
                      className="block  text-[#1B1C57] text-sm font-normal"
                      for="last_name"
                      class="block mb-1"
                    >
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Enter LastName"
                      class="w-full p-2 border-b border-gray-300  focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label
                      className="block  text-[#1B1C57] text-sm font-normal"
                      for="email"
                      class="block mb-1"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your Email"
                      class="w-full p-2 border-b border-gray-300  focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                                            {multipleError?.Email && (
            <p className="text-sm text-red-500">{multipleError?.Email}</p>
          )}
                  </div>
                  <div class="mb-4">
                    <label
                      className="block  text-[#1B1C57] text-sm font-normal"
                      for="phone"
                      class="block mb-1"
                    >
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phoneNumber"
                      placeholder="+45465454614"
                      class="w-full p-2 border-b border-gray-300  focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                                                    {multipleError?.PhoneNumber && (
            <p className="text-sm text-red-500">{multipleError?.PhoneNumber}</p>
          )}
                  </div>
                  {/* <div class="mb-4">
               <label for="subject" class="block mb-1">Subject:</label>
               <select id="subject" name="subject" class="w-full p-2 border border-gray-300 rounded" required>
                  <option value="">Select Subject</option>
                  <option value="general_enquiry">General Enquiry</option>
               </select>
            </div> */}
                  <div class="mb-4 col-span-2">
                    <label class="block mb-1  text-[#1B1C57] text-xl font-bold">
                      Select Subject:
                    </label>
                    <div class=" justify-between flex ">
                      <label className="flex  text-[#1B1C57] text-sm font-normal  justify-start items-center ">
                        <input
                          className="w-5"
                          type="radio"
                          name="subject"
                          onChange={handleChange}
                          value="general"
                        /> 
                        General Enquiry
                      </label>
                      <label className="flex  text-[#1B1C57] text-sm font-normal  justify-start items-center ">
                        <input
                          className="w-5"
                          type="radio"
                          name="subject"
                          onChange={handleChange}
                          value="general"
                        /> 
                        General Enquiry
                      </label>
                      <label className="flex  text-[#1B1C57] text-sm font-normal  justify-start items-center ">
                        <input
                          className="w-5"
                          type="radio"
                          name="subject"
                          onChange={handleChange}
                          value="general"
                        /> 
                        General Enquiry
                      </label>
                    </div>
                    <div class=" justify-between flex ">
                      <label className="flex  text-[#1B1C57] text-sm font-normal  justify-start items-center ">
                        <input
                          className="w-5"
                          type="radio"
                          name="subject"
                          onChange={handleChange}
                          value="general"
                        /> 
                        General Enquiry
                      </label>
                      <label className="flex  text-[#1B1C57] text-sm font-normal  justify-start items-center ">
                        <input
                          className="w-5"
                          type="radio"
                          name="subject"
                          onChange={handleChange}
                          value="general"
                        /> 
                        General Enquiry
                      </label>
                      <label className="flex  text-[#1B1C57] text-sm font-normal  justify-start items-center ">
                        <input
                          className="w-5"
                          type="radio"
                          name="subject"
                          onChange={handleChange}
                          value="deepak"
                        /> 
                        General Enquiry
                      </label>
                    </div>
                  </div>
                  <div class="mb-4 col-span-2">
                    <label
                      className="block  text-[#1B1C57] text-sm font-normal"
                      for="message"
                      class="block mb-1"
                    >
                      Message:
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="1"
                      placeholder="Type your Message.."
                      class="w-full p-2 border-b border-gray-300 focus:outline-none "
                      required
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div class="text-center  mb-4">
                  <button
                    type="submit"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
