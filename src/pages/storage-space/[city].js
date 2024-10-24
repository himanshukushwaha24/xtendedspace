// /pages/packers-and-movers/[city].js

import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import SimpleSlider from "@/sharedComponent/landingcomponent/simple_slider";
import Vedio from "@/sharedComponent/landingcomponent/video";
import Faqs from "@/sharedComponent/landingcomponent/faqs";
import Contact from "@/components/multicities/contact";
import User from "@/components/multicities/User";
import Banner from "@/components/multicities/Banner";
import citiesData from "@/components/storagespaceData";
import dynamic from "next/dynamic";
const Searchlocation = dynamic(() => import("../searchlocation"));

export async function getStaticPaths() {
  const paths = Object.keys(citiesData).map((city) => ({
    params: { city },
  }));

  return {
    paths,
    fallback: false, // can be true or 'blocking' if you want to generate pages on-demand
  };
}

export async function getStaticProps({ params }) {
  const { city } = params;

  const cityData = citiesData[city.toLowerCase()];

  if (!cityData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      city,
      cityData,
    },
  };
}

const CityPage = ({ city, cityData }) => {
    const { headData } = cityData;
//   const addType = "packers-and-movers";
//   const location = city.toLowerCase();
//   const title = `Packers and Movers in ${capitalize(location)}`;
//   const description = `Your search for Packers and Movers in ${capitalize(location)} is over now. Xtended Space has brought you the best packers and movers to handle your expensive and fragile items professionally.`;
const cities = Object.values(citiesData); 

  return (
    <>
          <Head>
        <link rel="shortcut icon" href="/images/logo/XtendedSpace.webp" type="image/x-icon" />
        <title>{headData.title}</title>
        <meta name="description" content={headData.description} />
        <meta name="author" content="Xtended Space" />
        <meta name="keywords" content={headData.keywords} />
        <link rel="canonical" href={headData.canonical} />
        <meta property="og:title" content={headData.title} />
        <meta property="og:description" content={headData.description} />
        <meta property="og:image" content={headData.og.image} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content={headData.og.image_alt} />
        <meta property="og:url" content={headData.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={headData.title} />
        <meta name="twitter:description" content={headData.description} />
        <meta name="twitter:image" content={headData.og.image} />
        <meta name="twitter:image:alt" content={headData.og.image_alt} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: headData.faq.map(item => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer
                }
              }))
            })
          }}
        />
      </Head>
     
      <div className="max-w-[1550px] mx-auto w-full">
        <HeaderMenu />
        <Banner
          title={cityData.title}
          description={cityData.description}
          addType={cityData.addType}
          location={cityData.location}
        />
        <section>
          <div className="h-auto py-6 md:py-12 flex flex-col items-center justify-items-center lg:px-10">
            <h2 className="uppercase text-2xl md:text-4xl font-bold text-[#1B1C57]">
              Our Services
            </h2>
            <div className="user-list mt-6 w-full">
              {cityData.userData.map((user, index) => (
                <User
                  key={index}
                  title={user.title}
                  content={user.content}
                  image={user.image}
                  buttonText={user.buttonText}
                  buttonLink={user.buttonLink}
                  reverse={user.reverse}
                  isSecond={user.isSecond}
                />
              ))}
            </div>
          </div>
        </section>
        <Contact />
        <SimpleSlider testimonials={cityData.testimonials} />
        <Vedio videoData={cityData.videoData} />
        <Faqs FAQData={cityData.FAQData} />
        <div className="">
  <Searchlocation cities={cities}/>
</div>
        <Footer />
      </div>
    </>
  );
};

// Helper function to capitalize the first letter
const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default CityPage;
