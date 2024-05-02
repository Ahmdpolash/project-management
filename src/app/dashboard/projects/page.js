"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Modal, Table, Space, message, Form, Input } from "antd";
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";

const Project = () => {
  const router = useRouter();
  const [modal2Open, setModal2Open] = useState(false);
  const [singleProject, setSingleProject] = useState(null);

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

  //loading
  if (isLoading) {
    return (
      <div className="h-[calc(100vh_-_110px)] text-2xl flex items-center justify-center">
        Loading...
      </div>
    );
  }

  //delete product from mock api ==
  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await axios.delete(`${url}/${_id}`);
          console.log(result);

          toast.success("Project deleted successfully");
          refetch(); // Refetch the projects after successful deletion
        } catch (error) {
          console.error("Error deleting project:", error);
          toast.error("Failed to delete project");
        }
      }
    });
  };

  //redirect to singe project page
  const handleRedirect = (id) => {
    console.log(id);
    router.push(`/dashboard/${id}`);
  };

  // edit project
  const handleSubmit = async (values) => {
    try {
      const projectId = singleProject?.id;

      if (projectId) {
        const res = await axios.put(
          `https://6630e1d3c92f351c03db7082.mockapi.io/api/v1/projects/${projectId}`,
          values
        );

        if (res.status === 200) {
          message.success("Project updated successfully");
          setModal2Open(false);
          refetch();
        }
      }
    } catch (error) {
      toast.error("Failed to update project");
    }
  };

  //get default value
  const handleEdit = async (id) => {
    const result = await axios.get(
      `https://6630e1d3c92f351c03db7082.mockapi.io/api/v1/projects/${id}`
    );

    setSingleProject(result.data);
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "id",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "id",
      align: "center",
    },

    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleEdit(record.id)}
            icon={<EditOutlined onClick={() => setModal2Open(true)} />}
          ></Button>
          <Button
            onClick={() => handleRedirect(record.id)}
            icon={<EyeOutlined />}
          ></Button>
          <Button
            onClick={() => handleDelete(record.id)}
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl py-3 text-center">All Projects</h1>

      {/* table */}
      <Table className="text-center" dataSource={projects} columns={columns} />

      {/* modal */}
      <Modal
        title=""
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <div className="py-3 mb-3 ">
          <h1 className="text-center text-xl lg:text-3xl font-semibold ">
            Edit Project
          </h1>
        </div>
        <Form name="addProjectForm" onFinish={handleSubmit} className="  ">
          <div className="flex flex-col space-y-2 mb-2">
            <label htmlFor="project_name" className="text-[16px] font-medium">
              Project Name *
            </label>
            <Form.Item
              name="project_name"
              rules={[
                { required: true, message: "Please enter the project name" },
              ]}
            >
              <Input
                defaultValue={singleProject?.project_name}
                style={{ height: "50px" }}
              />
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
              <Input.TextArea
                defaultValue={singleProject?.description}
                style={{ height: "180px" }}
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button className="bg-violet-500" type="primary" htmlType="submit">
              Add Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Project;
