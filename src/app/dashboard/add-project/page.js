"use client";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

const AddProjectForm = () => {
  const handleSubmit = async (values) => {
    try {
      // Send POST request to API endpoint with form data
      const response = await axios.post(
        "https://6630e1d3c92f351c03db7082.mockapi.io/api/v1/projects",
        values
      );

      // Check if the request was successful
      if (response.status === 201) {
        message.success("Project added successfully");
        // Reset form fields after successful submission
        Form.resetFields();
      } else {
        message.error("Failed to add project");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      message.error("Failed to add project");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed to submit form:", errorInfo);
  };

  return (
    <Form
      name="addProjectForm"
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Project Name"
        name="project_name"
        rules={[{ required: true, message: "Please enter the project name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please enter the project description" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Start Date"
        name="start_date"
        rules={[
          { required: true, message: "Please select the project start date" },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Deadline"
        name="deadline"
        rules={[
          { required: true, message: "Please select the project deadline" },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Tasks"
        name="tasks"
        rules={[{ required: true, message: "Please enter the project tasks" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Assigned Members"
        name="assignedMembers"
        rules={[
          { required: true, message: "Please select the assigned members" },
        ]}
      >
        <Select mode="multiple" placeholder="Select members">
          <Option value="member1">Member 1</Option>
          <Option value="member2">Member 2</Option>
          <Option value="member3">Member 3</Option>
          {/* Add more options for members */}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProjectForm;
