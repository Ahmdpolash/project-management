"use client";
import { useState } from "react";
import { IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

export default function Page({ children }) {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="flex">
        <div>
          {/* mobile menu */}
          <div
            className={`${
              open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            } lg:hidden transition-all duration-500 border border-gray-200 shadow-lg backdrop-blur-sm transform h-full w-[350px] bg-white text-black absolute top-0 left-0`}
          >
            <button
              className="px-4 py-2 text-3xl font-semibold flex absolute right-0 mt-2"
              onClick={() => setOpen(false)}
            >
              <RxCross1 />
            </button>
          </div>

          {/* lg navbar */}
          <div className="w-[300px] relative bg-[#D9E1F2] h-full hidden lg:block p-8">
            <h2 className="text-center">Logo</h2>
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
                    placeholder="Search by task name..."
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
