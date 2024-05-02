"use client";
import Link from "next/link";
import { useState } from "react";
import { IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoProjectRoadmap } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { usePathname } from "next/navigation";
import user from "@/assest/user.png";
import Image from "next/image";

export default function Page({ children }) {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };
  const pathname = usePathname();
  return (
    <div>
      <div className="flex">
        <div>
          {/* mobile sidebar */}
          <div
            className={`${
              open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            } lg:hidden transition-all z-[99999999] duration-500 border border-gray-200 shadow-lg backdrop-blur-sm transform h-full w-[350px] bg-white text-black absolute top-0 left-0`}
          >
            <button
              className="px-4 py-2 text-3xl font-semibold flex absolute right-0 mt-2"
              onClick={() => setOpen(false)}
            >
              <RxCross1 />
            </button>
            <div>
              <div className="border-b-2 border-slate-300 p-4">
                <Image
                  className="rounded-full"
                  src={user}
                  height={70}
                  width={70}
                  alt="user"
                />
                {/* <h1 className="font-bold text-2xl text-center">
                  <span className="text-3xl text-violet-500">P.M</span>
                  <span className="text-3xl text-violet-500"> S</span>oftware
                </h1> */}
              </div>
              <ul className="mt-4 text-center font-medium">
                <li className="  bg-violet-200 cursor-pointer flex items-center gap-2 rounded w-full   px-5 py-2 mb-2">
                  <LuLayoutDashboard className="text-[22px]" />
                  <Link href="/dashboard/">Home</Link>
                </li>
                <li className="  bg-violet-200 cursor-pointer flex items-center gap-2 rounded w-full   px-5 py-2 mb-2">
                  <FaPlus className="text-[20px]" />
                  <Link href="/dashboard/add-project">Add Project</Link>
                </li>
                <li className="bg-violet-200 cursor-pointer flex items-center gap-2 px-4 py-2 mb-2 ">
                  <GoProjectRoadmap className="text-[22px]" />
                  <Link href="/dashboard/projects">All Projects</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* lg sidebar */}
          <div className="w-[300px] relative bg-[#fff] h-full hidden lg:block ">
            <div className="border-b-2 border-slate-300 p-4">
              <Image
                className="rounded-full mx-auto"
                src={user}
                height={90}
                width={90}
                alt="user"
              />

              <h1 className="text-center mx-auto text-2xl mt-2">
                Polash Ahmed
              </h1>

              {/* <h1 className="font-bold text-2xl text-center">
                <span className="text-3xl text-violet-500">P.M</span>
                <span className="text-3xl text-violet-500"> S</span>oftware
              </h1> */}
            </div>

            <div>
              <ul className="mt-4 text-center font-medium">
                <li
                  className={`${
                    pathname === "/dashboard" ? "bg-slate-200" : ""
                  }  cursor-pointer hover:bg-slate-100 duration-300 flex items-center gap-2  w-full   px-5 py-2 mb-2`}
                >
                  <LuLayoutDashboard className="text-[22px]" />
                  <Link href="/dashboard/">Dashboard</Link>
                </li>
                <li
                  className={`${
                    pathname === "/dashboard/add-project" ? "bg-slate-200" : ""
                  }  cursor-pointer hover:bg-slate-100 duration-300 flex items-center gap-2  w-full   px-5 py-2 mb-2`}
                >
                  <FaPlus className="text-[20px]" />
                  <Link href="/dashboard/add-project">Add Project</Link>
                </li>
                <li
                  className={`${
                    pathname === "/dashboard/projects" ? "bg-slate-200" : ""
                  }  cursor-pointer hover:bg-slate-100 duration-300 flex items-center gap-2  w-full   px-5 py-2 mb-2`}
                >
                  <GoProjectRoadmap className="text-[22px]" />
                  <Link href="/dashboard/projects">All Projects</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:border-l w-full min-h-screen py-4">
          <div>
            <div className="flex  gap-4 border-b px-10 pb-6 items-center">
              <div className="w-full ">
                <form className=" hidden lg:block relative">
                  {" "}
                  <input
                    className="border w-full rounded-sm py-2 px-2 "
                    type="text"
                    placeholder="Search by Project name..."
                  />
                  <IoIosSearch className="absolute top-2 right-2" />
                </form>
              </div>
              <div className="flex items-center">
                <IoMdMenu
                  className="text-2xl cursor-pointer lg:hidden ml-4"
                  onClick={toggleMenu}
                />
              </div>
            </div>

            <div className="px-6 pt-3">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
