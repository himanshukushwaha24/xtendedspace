import Link from 'next/link'
import React from 'react'
import CallIcon from "../../../public/images/assets-multiple-cities/call-icon.svg";
import Image from "next/image";

const callnow = () => {
  return (
    <div><div className="w-full lg:w-[250px] h-[100px] bg-white rounded  flex-col items-center lg:items-start justify-center flex px-4 ">
    <Link
      href="tel:919009000798"
      className="font-bold text-blue-500 text-2xl flex  gap-2"
    >
      <Image src={CallIcon} alt="icon" width={30} priority />
      9009000798
    </Link>
    <Link href="tel:919009000798" className="text-lime-500 font-bold text-lg">
      Call us Now
    </Link>
  </div>
  </div>
  )
}

export default callnow