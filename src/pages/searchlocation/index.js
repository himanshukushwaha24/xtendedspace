// /pages/index.js

import React from 'react';
import Link from 'next/link';
import citiesData from '@/components/citiesData'; // Adjust the path based on your project structure

const Index = ({ cities }) => {
  const addTypeMapping = {
    'packers-and-movers': 'Packers & Movers',
    'storage-space': 'Storage Space',
    'business-storage': 'Business Storage',
    'b2b-logistics': 'B2B Logistics',
    // Add more mappings as needed
  };

  return (
    <div>
      <div className="p-4 bg-background">
        <h2 className="text-xl font-bold text-[#1B1C57]">Search By Location</h2>
        <hr className="border-b border-border mb-4" />
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:ml-4 list-disc text-[10px] lg:text-[14px]">
          {cities.map((city) => (
            <li key={city.location}>
              <Link href={`/${city.addType}/${city.location.toLowerCase()}`}>
                <span className="hover:text-blue-500 capitalize ">
                  {addTypeMapping[city.addType] || city.addType} {city.location}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  // Convert the citiesData object into an array
  const cities = Object.values(citiesData);

  return {
    props: {
      cities,
    },
  };
};

export default Index;
