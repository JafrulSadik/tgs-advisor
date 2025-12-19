import Image from "next/image";

import {
  FacebookIcon,
  HomeIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  XIcon,
} from "@/public/icons";
import TgsAdvisorLogo from "@/public/tgs-logo.svg";

export default function Footer() {
  return (
    <div className="bg-navy">
      <div className="mx-auto max-w-6xl grid grid-cols-12 py-15 gap-5 md:gap-y-10 lg:gap-5 w-[80%] lg:w-[90%]">
        <div className="order-1 md:order-3 lg:order-1 col-span-12 md:col-span-6 lg:col-span-3">
          <Image src={TgsAdvisorLogo} alt="tgs-advisor-logo" />

          <div className="w-fit mb-2 text-white mt-4">
            <h3 className="font-semibold text-base md:text-lg uppercase">
              Follow Us
            </h3>
            <hr className="border-2 w-full text-yellow" />
          </div>

          <div className="flex gap-4 mt-4">
            <Image className="size-6" src={FacebookIcon} alt="facebook-icon" />
            <Image className="size-6" src={XIcon} alt="x-icon" />
            <Image className="size-6" src={LinkedinIcon} alt="linkedin-icon" />
            <Image
              className="size-6"
              src={InstagramIcon}
              alt="instagram-icon"
            />
          </div>
        </div>

        <div className="order-3 md:order-1 lg:order-2 text-white col-span-12 md:col-span-6 lg:col-span-2">
          <div className="w-fit mb-2">
            <h3 className="font-semibold text-base md:text-lg uppercase">
              Quick Links
            </h3>
            <hr className="border-2 w-full text-yellow" />
          </div>
          <ul className="space-y-2 text-sm md:text-base ">
            <li>Who We Are</li>
            <li>Vision & Mission</li>
            <li>Our Team</li>
            <li>Gallery</li>
            <li>Download</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="order-4 md:order-2 lg:order-3 col-span-12 md:col-span-6 lg:col-span-4 text-white">
          <div className="w-fit mb-2">
            <h3 className="font-semibold text-base md:text-lg uppercase">
              Services
            </h3>
            <hr className="border-2 w-full text-yellow" />
          </div>
          <ul className="space-y-2 text-sm md:text-base">
            <li className="flex gap-2 items-center">
              <span className="size-2 bg-white rounded-full" />{" "}
              <p>Production Efficiency Development</p>
            </li>
            <li className="flex gap-2 items-center">
              <span className="size-2 bg-white rounded-full" />{" "}
              <p>Cost Reduction & Profit Maximization</p>
            </li>
            <li className="flex gap-2 items-center">
              <span className="size-2 bg-white rounded-full" />{" "}
              <p>Skill & Motivation Training</p>
            </li>
            <li className="flex gap-2 items-center">
              <span className="size-2 bg-white rounded-full" />{" "}
              <p>Fabric & Material Optimization</p>
            </li>
            <li className="flex gap-2 items-center">
              <span className="size-2 bg-white rounded-full" />{" "}
              <p>Factory System Setup & Restructuring</p>
            </li>
            <li className="flex gap-2 items-center">
              <span className="size-2 bg-white rounded-full" />{" "}
              <p>Compliance & HR KPI Development</p>
            </li>
          </ul>
        </div>

        <div className="order-2 md:order-4 lg:order-4 col-span-12 md:col-span-6 lg:col-span-3 text-white">
          <div className="w-fit mb-2">
            <h3 className="font-semibold text-base md:text-lg uppercase">
              Address
            </h3>
            <hr className="border-2 w-full text-yellow" />
          </div>
          <ul className="space-y-2 mt-2 text-sm md:text-base">
            <li className="flex gap-2 items-center">
              <Image className="size-4" src={PhoneIcon} alt="phone-icon" />
              <p>+8801713-262940</p>
            </li>
            <li className="flex gap-2 items-center">
              <Image className="size-4" src={MailIcon} alt="email-icon" />
              <p>contact@tgsadvisor.com</p>
            </li>
            <li className="flex gap-2 items-center">
              <Image className="size-4" src={HomeIcon} alt="location-icon" />
              <p>House : 66 Road : 18 Sector : 11 Uttara, Dhaka, Bangladesh</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
