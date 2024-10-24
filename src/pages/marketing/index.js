import Link from "next/link";
import { useState } from "react";
import Store from "@/sharedComponent/marketingform/store";
import SimpleSlider6 from "@/sharedComponent/slider7";
import Detailstore from "@/sharedComponent/marketingform/detailstore";
import HeaderMenu from "@/components/header/header";
import Footer from "../../components/footer";
import Image from "next/image";
import banner_link from "../../../public/images/home/marketingbanner.webp";
import house_hold from "../../../public/images/home/household.svg";
import business_inventory from "../../../public/images/home/BussinessInventory.svg";
import { FaArrowDownLong } from "react-icons/fa6";
import img from "../../../public/images/home/Storage-block-1.webp";
import img2 from "../../../public/images/home/Storage-block-2.webp";
import img3 from "../../../public/images/home/Storage-block-3.webp";
import pic1 from "../../../public/images/Diamond.png"
import house_hold_png from "../../../public/images/HouseholdItems.png";
import business_inventory_png from "../../../public/images/BussinessInventory.webp";
import Items from "./form_1";


export default function Home() {
  return (
    <>
      <HeaderMenu />

      <section className="relative grid place-items-center">
        <div className="absolute flex flex-col items-center justify-items-center">
          <h1 className="text-3xl text-white font-bold mb-2">Warehouse Solutions In Delhi NCR</h1>
          <p className="text-center text-white">Your trusted partner for Warehouse services and storage <br /> solutions in Delhi NCR, Noida, Ghaziabad, and <br /> Faridabad.</p>
        </div>
        <Image src={banner_link} alt="image" priority />
      </section>

      <section className="relative min-h-[700px] shadow p-4 grid place-items-center">
        <Items />
        <div className="lg:absolute text-center pt-[50px] mb-[100px] bottom-[140px]">
          <h1 className="capitalize text-3xl font-bold">we store memories and emotions</h1>
          <p className="">Everything you need about finding the best, safe and affordable storage <br /> space near you.</p>
        </div>

        <div className="lg:absolute bottom-[75px] w-full grid lg:grid-cols-2 grid-col-1 place-items-center justify-around">
          <div className="left flex items-center justify-items-center mb-6">
            <div className="left mr-4">
              <Image height={55} width={55} src={house_hold} alt="image" priority />
            </div>
            <div className="right">
              <h1 className="font-bold mb-2">Household items</h1>
              <p className="text-[11px]">Whether it's your childhood toys, memories <br /> from old house or anything close to you <br /> heart...</p>
            </div>
          </div>
          <div className="right flex items-center justify-items-center">
            <div className="left mr-4">
              <Image height={55} width={55} src={business_inventory} alt="image" priority />
            </div>
            <div className="right">
              <h1 className="font-bold mb-2">Business Inventory</h1>
              <p className="text-[11px]">Whether it's your first business, or side hustle <br /> We get you covered by our warehouse <br /> management service...</p>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-[600px] shadow mb-2 bg-[#f5f5f5]">
        <div className="text-center pt-[50px]">
          <Link href="#" className="text-blue-500 text-[11px] font-bold "><FaArrowDownLong className="inline mr-[20px]" />Keep scrolling down!</Link>
          <h1 className="font-bold mt-4 mb-2 text-xl">Giving you peace of mind</h1>
          <p className="text-[11px]">Everything you need about finding the best, safe and affordable storage <br /> space near you.</p>
        </div>

        <div className="w-full h-96 mt-[30px] flex items-center justify-items-center justify-around">
          <div className="card h-[350px] w-[300px] bg-[#fff] flex flex-col items-center justify-items-center justify-between text-center border-0">
            <div className="top h-1/2">
              <Image src={img} width={50} height={50} alt="img" priority />
            </div>
            <div className="bottom h-1/2">
              <h1 className="font-bold text-xl capitalize">Security & Insurance</h1>
              <p className="text-[11px] text-muted mt-4">paragraph here paragraph here paragraph here paragraph here paragraph here paragraph here.</p>
            </div>
          </div>

          <div className="card h-[350px] w-[300px] bg-[#fff] flex flex-col items-center justify-items-center justify-between text-center border-0">
            <div className="top h-1/2">
              <Image src={img2} width={50} height={50} alt="img" priority />
            </div>
            <div className="bottom h-1/2">
              <h1 className="font-bold text-xl capitalize">Hassel free move-in</h1>
              <p className="text-[11px] text-muted mt-4">paragraph here paragraph here paragraph here paragraph here paragraph here paragraph here.</p>
            </div>
          </div>

          <div className="card h-[350px] w-[300px] bg-[#fff] flex flex-col items-center justify-items-center justify-between text-center border-0">
            <div className="top h-1/2">
              <Image src={img3} width={50} height={50} alt="img" priority />
            </div>
            <div className="bottom h-1/2">
              <h1 className="font-bold text-xl capitalize">book it at the best price</h1>
              <p className="text-[11px] text-muted mt-4">paragraph here paragraph here paragraph here paragraph here paragraph here paragraph here.</p>
            </div>
          </div>
        </div>
      </section>


      <section>
        <div className="min-h-[600px] flex flex-col items-center justify-items-center">

          <div className="grid lg:grid-cols-2 sm:grid-col place-items-center mb-[30px] mt-[30px]">
            <div className="w-2/5"><Image height={200} width={200} src={pic1} priority /></div>
            <div className="w-3/5">
              <h1 className="font-bold capitalize text-2xl">what sets us apart</h1>
              <p className="text-[11px] mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga ipsam, optio quis soluta nisi accusantium voluptas voluptate quas quaerat deserunt ex? Explicabo id fugit voluptatem excepturi alias nemo hic. Ex.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 sm:grid-col place-items-center mb-[30px] mt-[30px]">
            <div className="w-3/5">
              <h1 className="font-bold capitalize text-2xl">warehouse service reach across delhi NCR</h1>
              <p className="text-[11px] mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga ipsam, optio quis soluta nisi accusantium voluptas voluptate quas quaerat deserunt ex? Explicabo id fugit voluptatem excepturi alias nemo hic. Ex.</p>
            </div>
            <div className="w-2/5"><Image height={200} width={200} src={pic1} priority /></div>
          </div>

          <div className="grid lg:grid-cols-2 sm:grid-col place-items-center  mb-[30px] mt-[30px]">
            <div className="w-2/5"><Image height={200} width={200} src={pic1} priority /></div>
            <div className="w-3/5">
              <h1 className="font-bold capitalize text-2xl">safe & systematic storage with xtended space</h1>
              <p className="text-[11px] mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga ipsam, optio quis soluta nisi accusantium voluptas voluptate quas quaerat deserunt ex? Explicabo id fugit voluptatem excepturi alias nemo hic. Ex.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 sm:grid-col place-items-center  mb-[30px] mt-[30px]">
            <div className="w-3/5">
              <h1 className="font-bold capitalize text-2xl">provice door to warehouse services</h1>
              <p className="text-[11px] mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga ipsam, optio quis soluta nisi accusantium voluptas voluptate quas quaerat deserunt ex? Explicabo id fugit voluptatem excepturi alias nemo hic. Ex.</p>
            </div>
            <div className="w-2/5"><Image height={200} width={200} src={pic1} priority /></div>
          </div>

        </div>
      </section>


      <section>
        <div className="min-h-[600px] flex flex-col items-center justify-items-center bg-[#f5f5f5] p-[50px]">
          <div className="w-[87%] mt-4">
            <h1 className="text-2xl capitalize font-bold">services we offer</h1>
            <p className="text-[11px] text-muted mt-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam quasi exercitationem dignissimos adipisci. Quia quis hic laboriosam porro magni animi commodi officia corporis voluptatum quo? Incidunt, earum. Amet, beatae temporibus?</p>
          </div>

          <div className="lg:w-[87%] w-full grid lg:grid-cols-2 grid-col-1 place-items-center mt-[60px]">
            <div className="relative mb-4"><h1 className="absolute bottom-6 left-4 text-white">House Hold Items</h1><Image width={400} src={house_hold_png} priority /></div>
            <div className="relative mb-4"><h1 className="absolute bottom-6 left-4 text-white">Business Inventory</h1><Image width={400} src={business_inventory_png} priority /></div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

