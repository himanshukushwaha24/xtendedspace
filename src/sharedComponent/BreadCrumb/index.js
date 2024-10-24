import Image from "next/image";
import Link from "next/link";
import React from "react";

const BreadCrumb = (props) => {
  const { currentElement, detailPage } = props;

  return (
    <div className="text-center font-normal text-[14px]  hidden md:flex">
      <a href="/">
        {" "}
        <span>Home</span>
      </a>
      <Image
        src="/images/blog/Double Alt Arrow Right.png"
        width={20}
        height={20}
      />

      <a href='/blogs'>
        <span>{currentElement.title}</span>
      </a>
      <Image
        src="/images/blog/Double Alt Arrow Right.png"
        width={20}
        height={20}
      />
      <span>{detailPage}</span>
    </div>
  );
};

export default BreadCrumb;
