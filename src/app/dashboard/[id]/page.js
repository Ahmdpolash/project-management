"use client";
import { MdDelete } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { FcHighPriority } from "react-icons/fc";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import moment from "moment";

import {
  Button,
  Modal,
  Table,
  Space,
  message,
  DatePicker,
  Form,
  Input,
  Select,
} from "antd";
import axios from "axios";
const Details = ({ params }) => {
  const [data, setData] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);

  const formattedStartDate = moment(data?.task?.start_date).format(
    "YYYY-MM-DD"
  );
  const formattedDeadline = moment(data?.task?.deadline).format("YYYY-MM-DD");

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
      const newTask = {
        task_name: values.task_name,
        start_date: values.start_date,
        deadline: values.deadline,
        assignedMembers: values.assignedMembers,
        description: values.description,
      };

      const updatedProject = {
        ...data,
        task: newTask,
      };

      const res = await axios.put(
        `https://6630e1d3c92f351c03db7082.mockapi.io/api/v1/projects/${params.id}`,
        updatedProject
      );

      if (res.status === 200) {
        message.success("Task added successfully");
        setModal2Open(false);
        refetch();
      }
    } catch (error) {
      console.error("Error adding task:", error);
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
                    <h1 className="font-bold">{data?.task?.task_name}</h1>

                    <div className="flex gap-2">
                      <button>
                        <FaEdit className="text-[22px] text-[#5082e8]" />
                      </button>
                      <MdDelete className="text-red-500 text-[25px]" />
                    </div>
                  </div>
                  <div>
                    <p>Start Date :{formattedStartDate}</p>
                    <p>Deadline :{formattedDeadline}</p>
                  </div>
                  <p className="flex font-semibold items-center gap-2">
                    {" "}
                    <FcHighPriority />
                  </p>
                  <p className="text-gray-600">{data?.task?.description}</p>
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
                name="task_name"
                rules={[
                  { required: true, message: "Please enter the project name" },
                ]}
              >
                <Input style={{ height: "40px" }} />
              </Form.Item>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 mb-2 lg:mb-0 w-full">
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
                  <DatePicker style={{ height: "40px" }} className="w-full" />
                </Form.Item>
              </div>

              <div className="flex w-full flex-col space-y-2 mb-2 ">
                <label htmlFor="deadline" className="text-[16px]">
                  Deadline
                </label>
                <Form.Item
                  name="deadline"
                  rules={[
                    {
                      required: true,
                      message: "Please select the project deadline",
                    },
                  ]}
                >
                  <DatePicker style={{ height: "40px" }} className="w-full" />
                </Form.Item>
              </div>
            </div>

            <div className="flex flex-col space-y-2 mb-2">
              <label htmlFor="assignedMembers" className="text-[16px]">
                Assigned Members
              </label>
              <Form.Item
                name="assignedMembers"
                rules={[
                  {
                    required: true,
                    message: "Please select the assigned members",
                  },
                ]}
              >
                <Select
                  style={{ height: "40px" }}
                  mode="multiple"
                  placeholder="Select members"
                >
                  <Option value="member1">Member 1</Option>
                  <Option value="member2">Member 2</Option>
                  <Option value="member3">Member 3</Option>
                </Select>
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
                <Input.TextArea style={{ height: "150px" }} />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                className="bg-violet-500"
                type="primary"
                htmlType="submit"
              >
                Add Task
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Details;
