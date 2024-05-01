"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Modal, Table, Space, message } from "antd";
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

  if (isLoading) {
    return (
      <div className="h-[calc(100vh_-_110px)] text-2xl flex items-center justify-center">
        Loading...
      </div>
    );
  }

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

  const handleRedirect = (id) => {
    console.log(id);
    router.push(`/dashboard/${id}`);
  };

  // Function to handle project selection for viewing/editing
  const handleViewEdit = (projectId) => {
    // Set selected project in global state using Zustand
    setSelectedProject(projectId);
    // Navigate to project details page
    router.push(`/projects/${projectId}`);
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "id",
    },
    {
      title: "Author",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />}></Button>
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
      <h1 className="text-2xl py-3">All Projects</h1>
      <Table dataSource={projects} columns={columns} />
    </div>
  );
};

export default Project;
