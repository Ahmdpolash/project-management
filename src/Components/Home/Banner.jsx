import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiTask } from "react-icons/bi";

const Banner = () => {
  return (
    <div className="px-3 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-8 items-center h-[calc(100vh_-_60px)]">
        <div className="space-y-3 mt-6 ml-4 order-2 lg:order-1 lg:ml-10">
          <h1 className="text-2xl tracking-wide lg:w-[490px] leading-10 lg:text-6xl font-bold text-[#111]">
            Manage Your Project and Team With our
            <span className="text-[#705CF5]"> P.M Software</span>{" "}
          </h1>

          <p className="text-[#696666] my-2 font-medium">
            Welcome to <strong className="text-[#705CF5]">P.M Software</strong>,
            where productivity meets simplicity. Our intuitive Project
            management system empowers you to effortlessly organize your work
            and achieve more. Whether you're a developer, corporate
            professional, banker, or anyone seeking efficient Project handling,
            we've got you covered.
          </p>
          <Link href="/login">
            <button className="bg-[#4A35D0] border-2  border-[#4A35D0] hover:bg-transparent hover:text-black duration-300 flex gap-2 items-center text-white px-4 lg:px-6 py-2 lg:py-3 font-medium rounded-md mt-3">
              Let's Explore <BiTask className="text-[18px]" />
            </button>
          </Link>
        </div>

        <div className="ml-0 lg:ml-5 mt-10 lg:mt-0 order-1 lg:order-2">
          {/* <Image
            className="w-[370px] md:w-full h-[250px] lg:h-full mx-auto lg:mx-0 lg:w-[520px] rounded-lg"
            src={banner}
            alt=""
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
