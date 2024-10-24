import { redirectionUrl } from '@/util/constant';
import React from 'react'
import { useEffect } from 'react';

export default function Home() {
       
   useEffect(() => {
      if (typeof window !== 'undefined') {
        window.location.href = `${redirectionUrl}furniture-storage`;

       
      }
    }, []);
  
   return (
     <div>Loading...</div>
   )
 }
 