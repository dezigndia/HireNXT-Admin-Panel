import React, { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Form, Select, Checkbox } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { API_CONST } from "../../../const";


const { Option } = Select;

const UserManagement = () => {
  
  const [usersData , setUsersData] = useState([{},]);
  const [activeTab, setActiveTab] = useState("Customer");
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // State to track selected role
  const [form] = Form.useForm();

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email Id", dataIndex: "email", key: "email" },
    { title: "Contact No", dataIndex: "contact", key: "contact" },
    { title: "Organization", dataIndex: "organization", key: "organization" },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    { title: "Created on", dataIndex: "createdOn", key: "createdOn" },
    { title: "Modified on", dataIndex: "modifiedOn", key: "modifiedOn" },
  ];

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(API_CONST.GET_USER_MANAGEMENT,{
           method: 'POST'
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setUsersData(result.Response);
      } catch (error) {
        console.log(error.message); // Store error message in state
      } 
    };
    fetchData();
  }, []); 

  const filteredData = usersData
    .filter((user) => user.type === activeTab)
    .filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
  

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedRole(null); // Reset role on modal close
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value); // Update the selected role
  };

  const handleSubmit = async (e) => {
    try {
      // Send form data to the backend
      const response = await fetch(API_CONST.ADD_USER_MANAGEMENT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(e),
      });

      // Check for successful response
      if (response.ok) {
        const data = await response.json();
        console.log('Form submitted successfully:', data);
        window.location.reload();
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
    handleCloseModal();
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Button
          type={activeTab === "Customer" ? "primary" : "default"}
          onClick={() => setActiveTab("Customer")}
        >
          {usersData.filter((user) => user.type === "Customer").length}{" "}
          Customers
        </Button>
        <Button
          type={activeTab === "Partner" ? "primary" : "default"}
          onClick={() => setActiveTab("Partner")}
        >
          {usersData.filter((user) => user.type === "Partner").length} Partners
        </Button>
        <Button
          type={activeTab === "Admin" ? "primary" : "default"}
          onClick={() => setActiveTab("Admin")}
        >
          {usersData.filter((user) => user.type === "Admin").length} Admin
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          onClick={handleOpenModal}
        >
          Add New User
        </Button>
      </div>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search resources using Name"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />

      {/* Add New User Modal */}
      <Modal
        title="Add New User"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Role of the User"
            name="role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select
              placeholder="Select the role type from the list"
              onChange={handleRoleChange}
            >
              <Option value="Customer">Customer</Option>
              <Option value="Partner">Partner</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter the full name!" }]}
          >
            <Input placeholder="Enter Full Name" />
          </Form.Item>
          {/* Conditionally Render Company Name */}
          {selectedRole !== "Admin" && (
            <Form.Item
              label="Company Name"
              name="company"
              rules={[
                { required: true, message: "Please enter the company name!" },
              ]}
            >
              <Input placeholder="Enter Company Name" />
            </Form.Item>
          )}
          <Form.Item
            label="Official Email Id"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter the official email id!",
              },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter Company Email Id" />
          </Form.Item>
          <Form.Item
            label="Official Contact Number"
            name="contact"
            rules={[
              { required: true, message: "Please enter the contact number!" },
            ]}
          >
            <Input placeholder="Enter Contact Number" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please set a password!" }]}
          >
            <Input.Password placeholder="Set New Password" />
          </Form.Item>
          <Form.Item name="forcePasswordChange" valuePropName="checked">
            <Checkbox>Force Password Change in First Login</Checkbox>
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={handleCloseModal}>Discard</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
