import Link from "next/link";
import { useState } from "react";
import HeaderMenu from "@/components/header/header";
import { contact_us } from "@/service/homePageService";

export default function warehouse() {
  const [formData, setFormData] = useState({
    subject: "warehouse",
    source: "warehouse",
    city: "Emtpy",
  });
  const [error, setError] = useState();
  const [multipleError, setMultipleError] = useState();

  function trimNumber(s) {
    while (s.substr(0, 1) == "0" && s.length > 1) {
      s = s.substr(1, 9999);
    }
    return s;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "phoneNumber") {
      setFormData({ ...formData, [name]: trimNumber(value) });
    }
    setError(undefined);
    setMultipleError(undefined);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await contact_us(formData);
    if (response.success) {
      alert("we will get you soon!");
    } else {
      // setError(response.error)

      // setError(response.error);

      if (
        response?.error?.title === "One or more validation errors occurred."
      ) {
        setMultipleError(response?.error?.errors);

        setError(response.error);
      }
    }
  };
  
  return (
    <>
      <HeaderMenu />

      <section class="wbanner p-[auto] text-center w-full h-[90vh]  flex flex-col justify-center items-center">
        <h2 className="text-[24px] md:text-[48px] font-[800] text-black mb-4">
          End to End Warehouse Solutions
        </h2>
        <p className="text-[12px] md:text-[18px] font[400]">
          Through this website I can get the storage space with the type and
          specifications I want very easily
        </p>
        <div class=" w-full lg:w-[60vw] mx-auto p-4">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg text-center font-semibold mb-4">
              Get Your Free Quote
            </h3>
            <form onSubmit={handleSubmit}>
              <div class="flex flex-wrap text-left  mb-4">
                <div class="w-full md:w-1/2 px-2 mb-4">
                  <label
                    for="name"
                    class="block text-sm font-medium text-[rgba(27, 28, 87, 0.8)]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    id="name"
                    name="name"
                    class="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div class="w-full md:w-1/2 px-2 mb-4">
                  <label
                    for="phone"
                    class="block text-sm font-medium text-[rgba(27, 28, 87, 0.8)]"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter Your ph.no"
                    id="phone"
                    name="phoneNumber"
                    class="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                  {multipleError && multipleError.PhoneNumber && (
                    <p className="text-sm text-red-500">
                      {multipleError?.PhoneNumber[0]}
                    </p>
                  )}
                </div>
                <div class="w-full  md:w-1/2 px-2 mb-4">
                  <label
                    for="email"
                    class="block text-sm font-medium text-[rgba(27, 28, 87, 0.8)]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    id="email"
                    name="email"
                    class="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                    onChange={handleChange}
                  />
                  {multipleError && multipleError.Email && (
                    <p className="text-base text-red-500">
                      {multipleError.Email[0]}
                    </p>
                  )}
                </div>
                <div class="w-full  md:w-1/2 px-2 mb-4">
                  <label
                    for="message"
                    class="block text-sm font-medium text-[rgba(27, 28, 87, 0.8)]"
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Enter"
                    id="message"
                    rows="1"
                    name="message"
                    class="w-full mt-1 px-4 py-2 border rounded-md resize-none focus:outline-none focus:border-blue-500"
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div class="text-center mt-[-20px]">
                <button
                  type="submit"
                  class="px-[100px] py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <p className="text-[12px]">
          Swipe to explore <br />
          more about end to end warehouse
        </p>
      </section>
      <section id="third6" class="third6 my-4">
        <div class=" w-full md:w-1/2 gap-2">
          <h2 className="my-2 text-[21px] md:text-[32px] font-[600] text-[#1B1C57]">
            What is End To End Warehouse?
          </h2>
          <p className="my-2 text-[12px] md:text-[20px] font-[400] text-[#2a3137bb]">
            A warehouse is a large physical structures used to store:
          </p>
          <p className="my-6 text-[12px] md:text-[20px] font-[400] text-[#2a3137bb]">
            1. Raw Materials and
            <br />
            2.Finished Goods
          </p>
          <p className="my-2 text-[12px] md:text-[20px] font-[400] text-[#2a3137bb]">
            Warehouses are used by various entities like, Manufacturers,
            Importers, Exporters, Distributers, Wholesalers, etc.., to maintain
            inventory of the goods they transact in.
          </p>
          <div></div>
        </div>
        <div class="third6-img">
          <img src="/images/Warehouse.png" alt="" />
        </div>
      </section>
      <section class="service">
        <div class="service1 ">
          <h2 className="my-2 text-[21px] md:text-[32px] font-[600] text-[#1B1C57]">
            Advantages of End To End Warehouse
          </h2>
          <p className="my-2 text-[12px] md:text-[20px] font-[400] text-[#2a3137bb]">
            Everything you need about finding the best, safe and affordable
            storage space near you.
          </p>
        </div>
        <div class="servicerow">
          <div class="service-col w-[280px] md:w-[376px] h-[178px] md:h-[268px]">
            <img src="/images/icon/ShieldDone2.svg" alt="" />
            <h3 className="text-[19px] md:text-[28px] ">Extra security</h3>
            <p className="text-[10px] md:text-[16px] text-[#2a3137bb]">
              You can connect with potential tenants without having to share
              your phone number.
            </p>
          </div>
          <div class="service-col w-[280px] md:w-[376px] h-[178px] md:h-[268px]">
            <img src="/images/icon/Locationgreen.svg" alt="" />
            <h3 className="text-[19px] md:text-[28px] ">Strategic location</h3>
            <p className="text-[10px] md:text-[16px] text-[#2a3137bb]">
              located in the city center close to the shopping center.
            </p>
          </div>
          <div class="service-col w-[280px] md:w-[376px] h-[178px] md:h-[268px]">
            <img src="/images/icon/Ticket Stargreen.svg" alt="" />
            <h3 className="text-[19px] md:text-[28px] ">Best price</h3>
            <p className="text-[10px] md:text-[16px] text-[#2a3137bb]">
              Not sure what you should be charging for your property.
            </p>
          </div>
        </div>
      </section>
      <section class="container5">
        <div class="cont1 ht1">
          <h2 className="my-2 text-[21px] md:text-[32px] font-[600] text-[#1B1C57]">
            How it Works?
          </h2>
          <p className="my-2 text-[14px] md:text-[20px] font-[400] text-[#2a3137bb]">
            Xtended Space, the ultimate storage platform in Delhi NCR, store
            your belongings safely.
          </p>
        </div>
        <div class="cont2">
          <img src="/images/home/tripleconfusion.png" alt="" />
          <video controls>
            <source src="./images/xs-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      <section id="third4" class="third4">
        <div class="ht1 md:w-1/3 flex-col items-center md:items-start flex">
          <img className="w-[50px]" src="/images/home/Phoneicon.png" alt="" />

          <h2 className="my-2 text-[21px] md:text-[32px] font-[600] text-[#1B1C57]">
            Get in touch with us
          </h2>
          <p className=" my-2  text-[15px] md:text-[20px] font-[400] text-[#2a3137bb]">
            Leverage agile frameworks to provide a robust synopsis for strategy
            foster collaborative thinking to further the overall value.
          </p>
        </div>
        <div class="about-img">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    id="name"
                    name="name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="tel"
                    placeholder="Enter ph.no"
                    id="phone"
                    name="phoneNumber"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    id="email"
                    name="email"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
