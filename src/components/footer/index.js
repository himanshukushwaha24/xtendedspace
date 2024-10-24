import Link from "next/link";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";
export default function Home() {
  return (
    <>
      <footer class="bg-blue-500 text-white p-5 px-2 md:px-5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-wrap justify-between">
            <div class="w-full md:w-3/6 flex md:flex-col    mb-8 md:mb-0">
              <Link href="/">
                {" "}
                <img
                  src="/images/xtended-space-white-logo.png"
                  alt="Xtended Space Logo"
                  className="mb-4 w-[250px] md:mb-4"
                />
              </Link>
              <div className="">
              <p class="text-sm pl-4 md:pl-0 pr-0 md:pr-[220px]">
                Xtended Space stores your belongings in a secure storage unit.
                Additionally, it provides you door-to-door logistics services.
          
              </p>
               <div className="flex justify-evenly lg:justify-start lg:gap-4 mt-2 md:pl-0 pr-0 md:pr-[220px]">
                  <Link href="https://www.instagram.com/xtendedspace/" target="blank" class="">
                  <FaInstagramSquare className="text-[30px]" />
                  </Link>
                  <Link href="https://www.facebook.com/XtendedSpace" target="blank" class="">
                  <FaFacebookSquare className="text-[30px]" />
                  </Link>
                  <Link href="https://x.com/XtendedSpace" target="blank" class="">
                  <FaSquareXTwitter className="text-[30px]" />
                  </Link>
                  <Link href="https://www.youtube.com/@xtendedspace" target="blank" class="">
                  <IoLogoYoutube className="text-[30px]" />
                  </Link>
                    <Link href="https://www.linkedin.com/company/xtended-space/ " target="blank" class="">
                  <FaLinkedin className="text-[30px]" />
                  </Link>
                 
              </div>
              </div>
             
             
            </div>
            <div class="w-1/2 md:w-1/6 ">
              <h3 class="font-semibold mb-3">Storage</h3>
              <ul class="text-sm space-y-2">
                <li>
                  <Link href="/" target="blank" class="hover:text-zinc-300">
                    Business Inventory Storage
                  </Link>
                </li>
                <li>
                  <Link href="/" target="blank" class="hover:text-zinc-300">
                    Household Storage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/easy-storage"
                    target="blank"
                    class="hover:text-zinc-300"
                  >
                    Easy Storage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/affordable-storage"
                    target="blank"
                    class="hover:text-zinc-300"
                  >
                    Affordable Storage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/list-storage"
                    target="blank"
                    class="hover:text-zinc-300"
                  >
                    List Storage
                  </Link>
                </li>
              </ul>
            </div>
            <div class="w-1/2 md:w-1/6">
              <h3 class="font-semibold mb-3">Locations</h3>
              <ul class="text-sm space-y-2">
                <li>
                  <Link href="/" class="hover:text-zinc-300">
                    Delhi
                  </Link>
                </li>
                <li>
                  <Link href="/" class="hover:text-zinc-300">
                    Noida
                  </Link>
                </li>
                <li>
                  <Link href="/" class="hover:text-zinc-300">
                    Gurugram
                  </Link>
                </li>
                <li>
                  <Link href="/" class="hover:text-zinc-300">
                    Faridabad
                  </Link>
                </li>
                <li>
                  <Link href="/" class="hover:text-zinc-300">
                    Ghaziabad
                  </Link>
                </li>
              </ul>
            </div>
            <div class="w-full md:w-1/6 mt-8 md:mt-0">
              <h3 class="font-semibold mb-3">Contact</h3>
              <ul class="text-sm">
                <li>
                  A-96 , 3rd Floor , Sector -63 Noida-201301, A Block, Sector
                  63, Noida, Uttar Pradesh 201307
                </li>
                <li>
                  {" "}
                  <Link href="tel:+919009000798">
                    <span class="">
                      <i class="ri-phone-fill"></i>
                    </span>

                    <span class=""> +(91) 900 900 0798</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:info@XtendedSpace.com"
                    class="hover:text-zinc-300"
                  >
                    info@XtendedSpace.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
