"use client";
import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { BsCartCheck } from "react-icons/bs";
import Link from "next/link";
import Container from "./Container";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <div className="flex justify-between items-center">
        <div className="logo">
          <h1 className="font-bold text-2xl">
            <span className="text-3xl text-violet-500">P</span>roject{" "}
            <span className="text-3xl text-violet-500">M</span>anagement
          </h1>
        </div>

        <div className="flex items-center">
          <Link href="/login">
            {" "}
            <button className="lg:ml-4 text-[18px] bg-violet-500 px-6 py-[5px] rounded-md text-white">
              Login
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
