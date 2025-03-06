"use client";

import React, { } from "react";
import Link from "next/link";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";

import { RiSettings3Fill } from 'react-icons/ri';
import { MdAccountBalanceWallet, MdDashboard } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { BiSolidFileImport } from "react-icons/bi";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    menuItems: [
      {
        icon: <MdDashboard size={18} />,
        label: "Dashboard",
        route: "/",
      },
      {
        icon: <BiSolidFileImport size={18} />,
        label: "Income",
        route: "/income",
      },
      {
        icon: <MdAccountBalanceWallet size={18} />,
        label: "Expenses",
        route: "/expenses",
      },
      {
        icon: <ImStatsDots size={18} />,
        label: "Reports",
        route: "/reports",
      },

      // {
      //   icon: <RiSettings3Fill size={18} />,
      //   label: "Sign Up",
      //   route: "/auth/signup",
      // },
      // {
      //   icon: <RiSettings3Fill size={18} />,
      //   label: "Login",
      //   route: "/auth/signin",
      // },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 border-b py-5.5 lg:py-6.5">
          <Link href="/" className="text-2xl font-bold text-white">
            Engine Station
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <FaArrowLeft size={18} />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
