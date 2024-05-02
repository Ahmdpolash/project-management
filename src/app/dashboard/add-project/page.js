"use client";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddProjectForm = () => {
  const router = useRouter();

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

  const onFinishFailed = (errorInfo) => {
    toast.error(errorInfo.message);
  };

  return (
    <div>
      <div className="py-3 mb-3 ">
        <h1 className="text-center text-xl lg:text-3xl font-semibold ">
          Add New Project
        </h1>
      </div>
      <Form
        name="addProjectForm"
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        className="max-w-4xl border shadow-lg p-5 lg:p-8 rounded-md mx-auto"
      >
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
            <Input style={{ height: "50px" }} />
          </Form.Item>
        </div>

        {/* <div className="flex flex-col space-y-2 mb-2">
        <label htmlFor="tasks" className="text-[16px]">
          Tasks
        </label>
        <Form.Item
          name="tasks"
          rules={[
            { required: true, message: "Please enter the project tasks" },
          ]}
        >
          <Input.TextArea />
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
            <DatePicker className="w-full" />
          </Form.Item>
        </div>

        <div className="flex w-full flex-col space-y-2 mb-2 ">
          <label htmlFor="deadline" className="text-[16px]">
            Deadline
          </label>
          <Form.Item
            name="deadline"
            rules={[
              { required: true, message: "Please select the project deadline" },
            ]}
          >
            <DatePicker className="w-full" />
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
            { required: true, message: "Please select the assigned members" },
          ]}
        >
          <Select mode="multiple" placeholder="Select members">
            <Option value="member1">Member 1</Option>
            <Option value="member2">Member 2</Option>
            <Option value="member3">Member 3</Option>
          </Select>
        </Form.Item>
      </div> */}

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
          <Button className="bg-violet-500" type="primary" htmlType="submit">
            Add Project
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProjectForm;
