"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";

import { HamburgerMenuIcon, WhatsappIcon } from "@/public";
import Logo from "@/public/tgs-logo.svg";
import Image from "next/image";

const menuItems = [
  { title: "Who We Are", link: "/who-we-are" },
  { title: "Mission & Vision", link: "/our-vision-and-mission" },
  {
    title: "Our Services",
    link: "/our-services",
    submenus: [
      {
        title: "Production & Efficiency Development",
        link: "/our-services#production-efficiency-development",
      },
      {
        title: "Cost Reduction & Profit Improvement",
        link: "/our-services#cost-reduction-profit-maximization",
      },
      {
        title: "Skill & Motivation Training",
        link: "/our-services#skill-motivation-training",
      },
      {
        title: "Fabric & Material Control",
        link: "/our-services#fabric-material-control",
      },
      {
        title: "Factory System Setup & Restructuring",
        link: "/our-services#factory-system-setup-restructuring",
      },
      {
        title: "Compliance & HR KPI Development",
        link: "/our-services#hr-compliance-development",
      },
    ],
  },
  { title: "Our Team", link: "/our-team" },
  { title: "Gallery", link: "/gallery" },
  { title: "Download", link: "/download" },
];

export default function Navbar() {
  const { width } = useWindowSize();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    (() => setIsMounted(true))();
  }, []);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const isMobile = isMounted ? width < 990 : false;

  return (
    <div className="absolute lg:py-4 left-0 top-2 z-50 flex w-full items-center justify-center">
      <div className="grid grid-cols-12 w-[95%] max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="col-span-6 lg:col-span-8 flex items-center gap-10 pr-4">
          <Link href="/">
            <div className="flex items-end">
              <Image
                src={Logo}
                alt="tgs-logo"
                className="w-20 md:w-24 lg:w-28"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div
            className={`relative flex gap-4 justify-between w-full text-white md:text-sm lg:text-base ${
              isMobile ? "hidden" : "flex"
            }`}
          >
            {menuItems.map((menu) => (
              <div
                key={menu.title}
                className="relative "
                onMouseEnter={() => setOpenMenu(menu.title)}
                onMouseLeave={() => {
                  setOpenMenu(null);
                }}
              >
                <Link
                  href={menu.link}
                  className="hover:text-primary-400 group flex items-center"
                >
                  {menu.title}
                </Link>

                {menu.submenus && openMenu === menu.title && (
                  <div className="absolute left-0 top-7 w-90 rounded-md border border-white/10 bg-white/60 text-black backdrop-blur-sm shadow-lg group-hover:block">
                    {menu.submenus.map((submenu, index) => {
                      const isFirst = index === 0;
                      const isLast = index === menu.submenus.length - 1;
                      return (
                        <div
                          key={submenu.title}
                          className="relative"
                          onMouseEnter={() => setOpenSubMenu(submenu.title)}
                          onMouseLeave={() => setOpenSubMenu(null)}
                        >
                          <Link
                            href={submenu.link}
                            className={`hover:bg-white/30 block px-4 py-3 hover:text-black ${
                              isFirst ? "rounded-t-md" : ""
                            } ${isLast ? "rounded-b-md" : ""}`}
                          >
                            {submenu.title}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-6 md:col-span-4 flex items-center justify-end gap-2">
          <p className="text-sm text-white md:hidden">Eng</p>
          <div className="bg-green flex items-center gap-2 rounded-full p-1 md:px-4 md:py-2.5">
            <Image
              src={WhatsappIcon}
              alt="whatsapp"
              className="size-4 md:size-5"
            />
            <p className="hidden text-base text-white md:block">WhatsApp</p>
          </div>
          <p className="hidden text-white md:block">English</p>

          {/* Hamburger Icon */}
          <button
            onClick={toggleDrawer}
            className={isMobile ? "block" : "hidden"}
          >
            <Image src={HamburgerMenuIcon} alt="menu" className="size-8" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleDrawer}
              className="fixed inset-0 z-40 bg-black"
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                ease: "easeOut",
                duration: 0.3,
              }}
              className="backdrop-blur-xs fixed right-0 top-0 z-50 h-screen w-3/4 overflow-y-auto bg-blue/80 p-5 text-white shadow-xl"
            >
              <button
                onClick={toggleDrawer}
                className="absolute right-4 top-4 text-xl text-gray-300"
              >
                <X />
              </button>

              <div className="mt-10 flex flex-col gap-2">
                {menuItems.map((menu) => (
                  <div key={menu.title}>
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === menu.title ? null : menu.title)
                      }
                      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left hover:bg-white/10"
                    >
                      <Link href={menu.link}>{menu.title}</Link>
                    </button>

                    <AnimatePresence>
                      {menu.submenus && openMenu === menu.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-4 border-l border-white/20"
                        >
                          {menu?.submenus?.map((submenu) => (
                            <Link
                              href={submenu.link}
                              onClick={() => {
                                toggleDrawer();
                                setOpenMenu(null);
                              }}
                              key={submenu.title}
                              className="flex w-full items-start justify-between px-3 py-2 text-sm hover:bg-white/10"
                            >
                              {submenu.title}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
