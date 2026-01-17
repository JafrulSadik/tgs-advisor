import Image from "next/image";

import { AboutType } from "@/app/types/about";
import { ServiceType } from "@/app/types/service";
import {
  FacebookIcon,
  HomeIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
} from "@/public/icons";
import TgsAdvisorLogo from "@/public/tgs-logo.svg";
import Link from "next/link";
import { TbBrandYoutubeFilled } from "react-icons/tb";

const footerLinks = [
  { title: "Who We Are", href: "/who-we-are" },
  { title: "Vision & Mission", href: "/our-vision-and-mission" },
  { title: "Our Team", href: "/our-team" },
  { title: "Gallery", href: "/gallery" },
  { title: "Download", href: "/download" },
  { title: "Contact Us", href: "/contact-us" },
];

type FooterProps = {
  about: AboutType;
  services: ServiceType[];
};

export default function Footer({ about, services }: FooterProps) {
  return (
    <div className="bg-navy">
      <div className="mx-auto max-w-6xl grid grid-cols-12 py-15 gap-5 md:gap-y-10 lg:gap-5 w-[80%] lg:w-[90%]">
        <div className="order-1 md:order-3 lg:order-1 col-span-12 md:col-span-6 lg:col-span-3">
          <Link href="/">
            <Image src={TgsAdvisorLogo} alt="tgs-advisor-logo" />
          </Link>

          <div className="w-fit mb-2 text-white mt-4">
            <h3 className="font-semibold text-base md:text-lg uppercase">
              Follow Us
            </h3>
            <hr className="border-2 w-full text-yellow" />
          </div>
          {/* https://www.facebook.com/share/1aNqAgFpQV? */}
          <div className="flex gap-4 mt-3 items-center">
            <Link
              href={about.facebook || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="size-6"
                src={FacebookIcon}
                alt="facebook-icon"
              />
            </Link>
            <Link
              href={about.youtube || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TbBrandYoutubeFilled className="size-7 text-[#ffffff]" />
            </Link>

            <Link
              href={about.linkedin || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="size-6"
                src={LinkedinIcon}
                alt="linkedin-icon"
              />
            </Link>

            <Link
              href={about.facebook || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="size-6"
                src={InstagramIcon}
                alt="instagram-icon"
              />
            </Link>
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
            {footerLinks.map((link, i) => (
              <li key={i}>
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
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
            {services.map((service, i) => (
              <li key={i} className="flex gap-2 items-center">
                <Link
                  href={`/our-services#${service.slug}`}
                  className="flex gap-2 items-center"
                >
                  <span className="size-2 bg-white rounded-full" />{" "}
                  <p>{service.title}</p>
                </Link>
              </li>
            ))}
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
            <li className="flex gap-2 items-start">
              <Image
                className="size-4 mt-0.5 lg:mt-1"
                src={PhoneIcon}
                alt="phone-icon"
              />
              <Link href={`tel:${about.phone}`}>{about.phone}</Link>
            </li>
            <li className="flex gap-2 items-start">
              <Image
                className="size-4 mt-0.5 lg:mt-1"
                src={MailIcon}
                alt="email-icon"
              />
              <Link href={`mailto:${about.email}`}>{about.email}</Link>
            </li>
            <li className="flex gap-2 items-start">
              <Image
                className="size-4 mt-0.5 lg:mt-1"
                src={HomeIcon}
                alt="location-icon"
              />
              <p>{about.address}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
