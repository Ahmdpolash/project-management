"use client";
import { MdDelete } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { FcHighPriority } from "react-icons/fc";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Button, Modal, Table, Space, message,DatePicker, Form, Input } from "antd";
const Details = ({ params }) => {
  const [data, setData] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);

  let url = "https://6630e1d3c92f351c03db7082.mockapi.io/api/v1/projects";

  //fetch product from mock api
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

  //filter single product

  useEffect(() => {
    const filter = projects?.find((project) => project?.id == params?.id);

    setData(filter);
  }, [projects, params.id]);

  //add task on mock api

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(
        "https://6630e1d3c92f351c03db7082.mockapi.io/api/v1/projects",
        values
      );

      if (res.status === 201) {
        message.success("Project added successfully");
        router.push("/dashboard/projects");
        form.resetFields();
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-2">
        <h1 className="mb-2 text-[17px] ml-2 font-semibold">
          {" "}
          <span className="text-[#5082E8] font-bold text-[18px]"></span> All
          Tasks from {data?.project_name}
        </h1>

        <Button size="large" onClick={() => setModal2Open(true)} type="primary">
          Add Task
        </Button>
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
                  <p className="text-gray-600">{data?.description}</p>
                  <hr />
                  <p className="flex gap-2 items-center">
                    {" "}
                    <IoIosTimer />
                  </p>
                </div>
              </div>
            </div>
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

        {/* add taask modal */}

        <Modal
          title=""
          centered
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
        >
          <div className="py-3 mb-3 ">
            <h1 className="text-center text-xl lg:text-3xl font-semibold ">
              Add Task
            </h1>
          </div>

          <Form name="addProjectForm" onFinish={handleSubmit} className="  ">
            <div className="flex flex-col space-y-2 mb-2">
              <label htmlFor="project_name" className="text-[16px] font-medium">
                Task Name *
              </label>
              <Form.Item
                name="project_name"
                rules={[
                  { required: true, message: "Please enter the project name" },
                ]}
              >
                <Input style={{ height: "50px" }} />
              </Form.Item>
            </div>

            <div className="flex w-full flex-col space-y-2 mb-2">
              <label htmlFor="start_date" className="text-[16px]">
                Start Date
              </label>
              <Form.Item
                name="start_date"
                rules={[
                  {
                    required: true,
                    message: "Please select the project start date",
                  },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </div>

            <div className="flex flex-col space-y-2 mb-2">
              <label htmlFor="description" className="text-[16px] font-medium">
                Description *
              </label>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please enter the project description",
                  },
                ]}
              >
                <Input.TextArea style={{ height: "180px" }} />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                className="bg-violet-500"
                type="primary"
                htmlType="submit"
              >
                Update Project
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Details;
