import HeaderMenu from "../../components/header/header.js";
import Footer from "../../components/footer";
import sticker from "../../../public/images/storagelisting/birthday.png";
import Image from "next/image";

export default function Index() {
  return (
    <>
    <HeaderMenu/>
      <div className="h-[70vh] w-full flex flex-col items-center justify-center text-center">
        <Image src={sticker} alt="image" height={50} width={50} priority/>
        <h1 className="font-bold text-3xl text-blue-900 mt-2">Thankyou!</h1>
        <h3>Your request will be approved within 24hrs</h3>
      </div>
      <Footer />
    </>

  )
}
