"use client";
import { MdDelete } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { FcHighPriority } from "react-icons/fc";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Button } from "antd";

const Details = ({ params }) => {
  const [data, setData] = useState([]);

  let url = "https://6630e1d3c92f351c03db7082.mockapi.io/api/v1/projects";

  const fetchProjects = async () => {
    const response = await fetch(url);

    return response.json();
  };
  const {
    data: projects,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  console.log(projects);

  useEffect(() => {
    const filter = projects?.find((project) => project?.id == params?.id);

    setData(filter);
  }, [projects, params.id]);

  console.log(data);

  return (
    <div>
      <div className="flex justify-between pb-2">
        <h1 className="mb-2 text-[17px] ml-2 font-semibold">
          {" "}
          <span className="text-[#5082E8] font-bold text-[18px]"></span> All
          Tasks
        </h1>

        <Button type="primary">Add Task</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="border-2  shadow-xl bg-[#D9E1F2]">
          <div className="bg-[#5082e8] border-2  border-[#396fdd] text-white text-[17px] w-full py-3 text-center font-semibold ">
            <h3>To Do ({data?.length})</h3>
          </div>

          <div>
            <div className="px-3 mt-2 mb-[5px]">
              <div className=" bg-white rounded-lg ">
                <div className="p-4 space-y-1 shadow-md">
                  <div className="flex justify-between">
                    <h1 className="font-bold">{data?.project_name}</h1>
                    <div className="flex gap-2">
                      <button>
                        <FaEdit className="text-[22px] text-[#5082e8]" />
                      </button>
                      <MdDelete className="text-red-500 text-[25px]" />
                    </div>
                  </div>
                  <p className="flex font-semibold items-center gap-2">
                    {" "}
                    <FcHighPriority />
                  </p>
                  <p className="text-gray-600"></p>
                  <hr />
                  <p className="flex gap-2 items-center">
                    {" "}
                    <IoIosTimer />
                  </p>
                </div>
              </div>
            </div>

            {/* modal */}
          </div>
        </div>

        <div className="border-2 bg-[#D9E1F2] h-screen shadow-xl">
          <div className="bg-[#5082e8] border-2  border-[#396fdd] text-white w-full text-[17px]  py-3 text-center font-semibold">
            <h3>In Progress</h3>
          </div>

          <div className=""></div>
        </div>
        <div className="border-2 bg-[#D9E1F2] h-screen shadow-xl">
          <div className="bg-[#5082e8] border-2  border-[#396fdd] text-white w-full text-[17px]  py-3 text-center font-semibold ">
            <h3>Completed</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
