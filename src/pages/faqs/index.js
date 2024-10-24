import { useEffect } from "react";
import HeaderMenu from "@/components/header/header";

export default function Home() {
  useEffect(() => {
    document.querySelectorAll(".accordion-header").forEach((button) => {
      button.addEventListener("click", () => {
        const accordionContent = button.nextElementSibling;

        button.classList.toggle("active");

        if (button.classList.contains("active")) {
          accordionContent.style.maxHeight =
            accordionContent.scrollHeight + "px";
        } else {
          accordionContent.style.maxHeight = 0;
        }

        // Close other open accordion items
        document
          .querySelectorAll(".accordion-header")
          .forEach((otherButton) => {
            if (otherButton !== button) {
              otherButton.classList.remove("active");
              otherButton.nextElementSibling.style.maxHeight = 0;
            }
          });
      });
    });
  }, []); // Empty dependency array to run the effect only once after mount

  return (
    <>
      <HeaderMenu />
      <section className="about flex-col md:flex-row flex p-4">
        <div className="aboutleft md:px-5 flex md:flex-col gap-2 md:gap-6 mb-4 w-[350px] h-[auto]">
          <h2 className="text-[14px] md:text-[24px] font-semibold text-[#1B1C57]">General FAQ’s</h2>
          <h3 className="text-[14px] md:text-[24px] text-gray-500">Insurance FAQs</h3>
          <h3 className="text-[14px] md:text-[24px] text-gray-500">Guidelines</h3>
        </div>
        <div className="aboutright w-full ">
          <h1 className="text-[22px] md:text-[42px] font-semibold mb-6 text-[#1B1C57]">General FAQ’s</h1>

          <section id="faq" data-bgimage="url(images/icon 5.svg) fixed no-repeat">
            <div className="container">


              <div className="separator">
                <span><i className="fa fa-square"></i></span>
              </div>
              <div className="spacer-single"></div>
              <div className="row align-items-center fff">
                <div className="col-lg-12 mb-sm-30 text-center wow fadeInRight">
                  <div className="accordion-container">
                    <div className="accordion-item">
                      <button className="accordion-header">
                      What is Xtended Space?
                        <span className="icon">+</span>
                      </button>
                      <div className="accordion-content">
                        <p className="">
                        It is a storage service platform using AI technology in Delhi, NCR, and Mumbai that provides affordable and accessible storage space solutions at your doorstep with a click.    </p>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button className="accordion-header">
                      Why should I use Xtended Space?
                        <span className="icon">+</span>
                      </button>
                      <div className="accordion-content">
                        <p className="">
                        It is a reliable and flexible storage partner that makes your storage experience unforgettable while storing household items or business inventories.   </p>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button className="accordion-header">
                      What makes Xtended Space unique in the competitive industry?
                        <span className="icon">+</span>
                      </button>
                      <div className="accordion-content">
                        <p className="">
                        It provides you with AI technology P2P and B2B storage at your doorstep at affordable prices in nearby locations. You can easily access your items and get them back whenever you want.    

</p>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button className="accordion-header">
                      What are the operational hours of Xtended Space?
                        <span className="icon">+</span>
                      </button>
                      <div className="accordion-content">
                        <p className="">
                        There are no fixed operational hours. As per client needs, our operational team works.    </p>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button className="accordion-header">
                      Which cities are you currently operating in?
                        <span className="icon">+</span>
                      </button>
                      <div className="accordion-content">
                        <p className="">
                        We operate in six cities: Delhi, Noida, Gurugram, Ghaziabad, Faridabad and Mumbai. However, our PAN India plan is to provide services by the end of this year.    </p>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button className="accordion-header">
                      How do I get my stuff back? 
                        <span className="icon">+</span>
                      </button>
                      <div className="accordion-content">
                        <p className="">
                        You can share the delivery date and time through call and email. We will deliver your valuables at your doorstep. You can also come to pick up your goods.   </p>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button className="accordion-header">
                      What type of items can a renter store at Xtended Space storage facilities?
                        <span className="icon">+</span>
                      </button>
                      <div className="accordion-content">
                        <p className="">
                        The renter can store furniture, office documentation, artistic pieces, raw materials and manufactured items. We do not store perishable and flammable items in warehouses.    </p>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button className="accordion-header">
                      How do I make money as a host on Xtended Space?   
                        <span className="icon">+</span>
                      </button>
                      <div className="accordion-content">
                        <p className="">
                        You can list your unoccupied area on the Xtended Space website on a host page by filling in details about the space and amenities availability. Our skilled team guides you to proceed further regarding earning money.    </p>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button className="accordion-header">
                      When will I receive Xtra Cash on Xtended Space? 
                        <span className="icon">+</span>
                      </button>
                      <div className="accordion-content">
                        <p className="">
                        After the storage agreement as a host with another client, you will earn Xtra Income through the platform of Xtended Space.   </p>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button className="accordion-header">
                       When can I visit your warehouse?  
                        <span className="icon">+</span>
                      </button>
                      <div className="accordion-content">
                        <p className="">
                        The clients have easy access to the Xtended Space warehouse. Clients need to schedule time with the team before visiting the warehouse.     </p>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button className="accordion-header">
                      Do you provide moving and packing services in NCR?   
                        <span className="icon">+</span>
                      </button>
                      <div className="accordion-content">
                        <p className="">
                        The Xtended Space team provides moving and packing services nationwide based on the client’s requirements.       </p>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button className="accordion-header">
                      What types of documents do I need to provide to rent space?  
                        <span className="icon">+</span>
                      </button>
                      <div className="accordion-content">
                        <p className="">
                        You need to provide two recent colour photographs and one ID proof.   </p>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <button className="accordion-header">
                      How do I update or change my account or other information on your platform?     
                        <span className="icon">+</span>
                      </button>
                      <div className="accordion-content">
                        <p className="">
                        You can visit the website and update your information and personal details.  </p>
                      </div>
                    </div>
                  
                
                    {/* Add other accordion items here */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}