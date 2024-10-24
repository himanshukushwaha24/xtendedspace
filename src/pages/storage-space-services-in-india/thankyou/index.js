import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SaveRelocationSevices } from "@/service/homePageService";
import { localStorageManager } from "@/util/common";
import { useRouter } from 'next/router';
const Thankyou = () => {
  const [data, setData] = useState({
    Name: "",
    Mobile: "",
    Location: "",
    Email: "",
    AddType: "",
  });
  const router = useRouter();

  useEffect(() => {
    const storedata = localStorageManager.getValue('landing_page_data') && JSON.parse(localStorageManager.getValue('landing_page_data'));
    
    const storedData = {
      Name: storedata.Name,
      Mobile: storedata.Mobile,
      Location: storedata.Location,
      Email: storedata.Email,
      AddType: storedata.AddType,
    };

    // Set the data state
  

    const saveData = async (storedData) => {
      try {

        const formData = new FormData();
        Object.keys(storedData).forEach(key => formData.append(key, storedData[key]));
  
        const response = await SaveRelocationSevices(formData);
       
        if (response.success?.isExistingUser) {
          router.push('/login?callback=easy-storage'); 
        } else {
          
          router.push('/signup?callback=easy-storage'); 
        }
      } catch (error) {
        if (error.errors) {
          console.error('Validation errors:', error.errors);
        } else {
          console.error('Error calling SaveRelocationSevices API:', error);
        }
      }
    };

    if (storedData.Name && storedData.Mobile && storedData.Location && storedData.Email && storedData.AddType) {
      saveData(storedData);
    } 
    else {
      console.error('Missing data for API call:', storedData);
    }
    // saveData();
  }, []);

  return (
    <div className='packerWrapper'>
    <section className="thanks">
      <div className="thanks-img">
        <img src="/images/thank-you.webp" alt="Thank You" />
      </div>
      <h2>Thank you for registration!</h2>
      <p>We appreciate your booking. Your transport request has been received, and we will reach you soon.</p>
      <a className="thanks-btn" href="/storage-space-services-in-india/">Back home</a>

      
      <p>If you have any issues <span><a className="whatsapp" href="https://api.whatsapp.com/send?phone=919009000798&text=Hello">Contact Us</a></span></p>
    </section>
    </div>
  );
}

export default Thankyou;
