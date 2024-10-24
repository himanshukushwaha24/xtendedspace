import { useState } from "react";
import { contact_us } from "@/service/homePageService";
import { BiSolidPhoneCall } from "react-icons/bi";

export default function Index() {
    const [formData, setFormData] = useState({
        subject: "Emtpy",
        source: "Emtpy",
        city: "Emtpy",
        message: "Empty"

      });
      const [error, setError] = useState();
      const [showSuccessMessage, setShowSuccessMessage] = useState(false);
      const [multipleError, setMultipleError] = useState();
      const [isSubmitting, setIsSubmitting] = useState(false);
      function trimNumber(s) {
        while (s.substr(0, 1) == "0" && s.length > 1) {
          s = s.substr(1, 9999);
        }
        return s;
      }
      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phoneNumber") {
          setFormData({ ...formData, [name]: trimNumber(value) });
        } else {
          setFormData({ ...formData, [name]: value });
        }
        setError();
        setMultipleError();
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        const response = await contact_us(formData);
        if (response.success) {
          // alert("we will get you soon!");
          setShowSuccessMessage(true);
    
          document.getElementById("myform").reset();
          ;
        } else {
          // setError(response.error);
    
          if (
            response?.error?.title === "One or more validation errors occurred."
          ) {
            setMultipleError(response?.error?.errors);
    
            setError(response.error);
          }
          setIsSubmitting(false);
        }
      };
    

    return (
        <>
              <section id="third" class="third px-8">
        
        <div class="ht1 md:w-1/2 flex-col mx-[auto] items-center md:items-start flex gap-[30px]">
         
          <h2 className="my-2 text-[22px] md:text-[34px] font-bold text-[#1B1C57]">
          Connect With Us
          </h2>
          <p className=" my-2  text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
          Xtended Space offers top-notch warehousing facilities and manages your logistics from start to finish. <br />  <a href="tel:+919009000798">
                            <span class=""><i class="ri-phone-fill"></i></span>
                            <span class="flex items-center md:py-[30px] justify-center md:justify-start gap-2"><BiSolidPhoneCall /> +(91) 900 900 0798</span>
                        </a>
          </p>
        </div>
       
        
        <div class="about-img mx-[auto]">
          <div className="container">
         
            <form id="myform" onSubmit={handleSubmit}  >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    Name<span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter"
                    name="name"
                    // required
                    onChange={handleChange}
                  />
                  {multipleError && multipleError.Name && (
                    <p className="text-sm text-red-500">
                      {multipleError?.Name[0]}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    Phone<span class="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter"
                    name="phoneNumber"
                    // required
                    onChange={handleChange}
                  />
                  {multipleError && multipleError.PhoneNumber && (
                    <p className="text-sm text-red-500">
                      {multipleError?.PhoneNumber[0]}
                    </p>
                  )}
                </div>
              
              </div>
              <div className="form-row">
              <div className="form-group">
                  <label htmlFor="email">
                    Email<span class="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter"
                    name="email"
                    // required
                    onChange={handleChange}
                  />
                  {multipleError && multipleError.Email && (
                    <p className="text-base text-red-500">
                      {multipleError.Email[0]}
                    </p>
                  )}
                </div>
               
              </div>
              
              <div className="form-row">
                <button type="submit" disabled={isSubmitting}>Submit</button>
              </div>
              <div>
                {showSuccessMessage && (
                  <p className="success-message text-green-500 font-semibold py-2 px-2">Thank you for contacting us! Our Team will contact you soon!!</p>
                )}</div>
            
            </form>
          </div>
        </div>
     
      </section>
        </>
    )
}


