"use client";
import React, { useEffect, useState } from "react";
import { FaEye, FaFacebookF } from "react-icons/fa";
import Lottie from "lottie-react";
import { AiOutlineGoogle } from "react-icons/ai";
import login from "@/assest/login";
import { FaRegEyeSlash } from "react-icons/fa6";

import { Button, Checkbox, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("demo@gmail.com");
  const [password, setPassword] = useState("demoPassword");

  const router = useRouter();

  const onFinish = (values) => {
    if (
      values.email === "demo@gmail.com" &&
      values.password === "demoPassword"
    ) {
      router.push("/dashboard");
    } else {
      toast.error("Invalid Credentials !!");
    }
  };
  const onFinishFailed = (errorInfo) => {
    toast.error("something went wrong !!");
  };

  return (
    <div>
      <div className="bg-[#F1F5F6] h-screen  flex justify-center items-center mt-">
        <div className="w-full flex justify-center items-center p-5 lg:p-10">
          <div className="grid grid-cols-1 relative lg:grid-cols-2 lg:w-[60%] border border-slate-300 hover:border-violet-400 duration-500 hover:border shadow-md   items-center  mx-auto bg-white h-[350px rounded-md">
            <div>
              <div className="px-8 py-8 ">
                <h2 className="text-center mb-3 r w-full text-2xl text-slate-600 font-bold">
                  Login{" "}
                </h2>

                <div className="relative ">
                  <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <div className="flex flex-col gap-1 mb-">
                      <label htmlFor="email">Email</label>
                      <Form.Item
                        name="email"
                        className=""
                        initialValue={email}
                        style={{ height: "22px" }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter your email address",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email address",
                          },
                        ]}
                      >
                        <Input defaultValue={email} />
                      </Form.Item>
                    </div>

                    <div className="flex flex-col gap-1 ">
                      <label htmlFor="password">Password</label>
                      <Form.Item
                        name="password"
                        initialValue={password}
                        style={{ height: "15px" }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter your password",
                          },
                          {
                            min: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                        ]}
                      >
                        <Input.Password defaultValue={password} />
                      </Form.Item>
                    </div>

                 

                    <Form.Item>
                      <Button style={{marginTop: '10px'}} type="primary" htmlType="submit">
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                </div>

                <div className="absolute lg:block bottom-0 right-0">
                  <img
                    src="https://i.ibb.co/bmC91P9/Screenshot-62-removebg-preview.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="hidden lg:block  ">
              <Lottie className="" animationData={login} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
