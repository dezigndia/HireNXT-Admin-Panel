import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  Select,
  Checkbox,
  Flex,
  Avatar,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { UserManagementWrapper } from "./UserManagement.style";
import MaskGroup from "./../../../assets/Mask-Group.svg";
const { Text, Link, Title } = Typography;
import React, { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Form, Select, Checkbox } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { API_CONST } from "../../../const";
const { Option } = Select;

const usersData = [
  {
    key: "1",
    name: "Akshay Kumar Malhotra",
    email: "akshay.malhotra@dezignindia.com",
    contact: "+91-9343535359",
    organization: "Dezigndia Technologies Pvt Ltd",
    designation: "Sr. Program Manager",
    createdOn: "12-Oct-24 | 11:30",
    modifiedOn: "12-Oct-24 | 14:30",
    type: "Customer",
  },
  {
    key: "2",
    name: "Neha Sharma",
    email: "neha.sharma@techhub.com",
    contact: "+91-9876543210",
    organization: "TechHub Solutions",
    designation: "Product Manager",
    createdOn: "15-Oct-24 | 10:00",
    modifiedOn: "15-Oct-24 | 12:45",
    type: "Admin",
  },
  {
    key: "3",
    name: "Rahul Verma",
    email: "rahul.verma@globaltrade.com",
    contact: "+91-9234567890",
    organization: "Global Trade Inc.",
    designation: "Business Analyst",
    createdOn: "10-Oct-24 | 09:20",
    modifiedOn: "10-Oct-24 | 11:15",
    type: "Partner",
  },
  {
    key: "4",
    name: "Sanjay Kapoor",
    email: "sanjay.kapoor@enterpriseltd.com",
    contact: "+91-9563412789",
    organization: "Enterprise Ltd",
    designation: "CTO",
    createdOn: "08-Oct-24 | 14:10",
    modifiedOn: "08-Oct-24 | 16:30",
    type: "Admin",
  },
  {
    key: "5",
    name: "Pooja Mehta",
    email: "pooja.mehta@retailmart.com",
    contact: "+91-9876123456",
    organization: "Retail Mart Pvt Ltd",
    designation: "Marketing Head",
    createdOn: "07-Oct-24 | 13:50",
    modifiedOn: "07-Oct-24 | 15:10",
    type: "Customer",
  },
  {
    key: "6",
    name: "Vikram Joshi",
    email: "vikram.joshi@solutionspro.com",
    contact: "+91-9988776655",
    organization: "SolutionsPro Pvt Ltd",
    designation: "Solutions Architect",
    createdOn: "05-Oct-24 | 10:45",
    modifiedOn: "05-Oct-24 | 12:00",
    type: "Partner",
  },
  {
    key: "7",
    name: "Priya Agarwal",
    email: "priya.agarwal@techinnovate.com",
    contact: "+91-9234876521",
    organization: "Tech Innovate Ltd",
    designation: "Software Engineer",
    createdOn: "02-Oct-24 | 11:30",
    modifiedOn: "02-Oct-24 | 13:00",
    type: "Customer",
  },
  {
    key: "8",
    name: "Ravi Shankar",
    email: "ravi.shankar@infotech.com",
    contact: "+91-9356123478",
    organization: "InfoTech Solutions",
    designation: "Data Scientist",
    createdOn: "01-Oct-24 | 15:20",
    modifiedOn: "01-Oct-24 | 17:30",
    type: "Admin",
  },
  {
    key: "9",
    name: "Anjali Das",
    email: "anjali.das@healthcareplus.com",
    contact: "+91-9213456789",
    organization: "Healthcare Plus",
    designation: "HR Manager",
    createdOn: "29-Sep-24 | 12:15",
    modifiedOn: "29-Sep-24 | 14:00",
    type: "Customer",
  },
  {
    key: "10",
    name: "Rajeev Nair",
    email: "rajeev.nair@financelink.com",
    contact: "+91-9001234567",
    organization: "Finance Link Pvt Ltd",
    designation: "Finance Consultant",
    createdOn: "27-Sep-24 | 16:00",
    modifiedOn: "27-Sep-24 | 18:30",
    type: "Partner",
  },
  {
    key: "11",
    name: "Sonia Kapoor",
    email: "sonia.kapoor@ecomm.com",
    contact: "+91-9807654321",
    organization: "E-Comm Ventures",
    designation: "Operations Head",
    createdOn: "25-Sep-24 | 10:00",
    modifiedOn: "25-Sep-24 | 12:30",
    type: "Admin",
  },
  {
    key: "12",
    name: "Harsh Gupta",
    email: "harsh.gupta@b2bconnect.com",
    contact: "+91-9214536789",
    organization: "B2B Connect Pvt Ltd",
    designation: "Account Manager",
    createdOn: "20-Sep-24 | 14:10",
    modifiedOn: "20-Sep-24 | 16:00",
    type: "Customer",
  },
  {
    key: "13",
    name: "Meera Iyer",
    email: "meera.iyer@techfusion.com",
    contact: "+91-9234561230",
    organization: "Tech Fusion Ltd",
    designation: "UI/UX Designer",
    createdOn: "18-Sep-24 | 09:30",
    modifiedOn: "18-Sep-24 | 11:45",
    type: "Customer",
  },
  {
    key: "14",
    name: "Amit Bansal",
    email: "amit.bansal@saasworld.com",
    contact: "+91-9334567891",
    organization: "SaaS World Pvt Ltd",
    designation: "CEO",
    createdOn: "15-Sep-24 | 10:15",
    modifiedOn: "15-Sep-24 | 12:00",
    type: "Admin",
  },
  {
    key: "15",
    name: "Kiran Rao",
    email: "kiran.rao@logisticsplus.com",
    contact: "+91-9445671234",
    organization: "Logistics Plus",
    designation: "Logistics Head",
    createdOn: "12-Sep-24 | 13:45",
    modifiedOn: "12-Sep-24 | 15:30",
    type: "Partner",
  },
];

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

  const adminColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email Id", dataIndex: "email", key: "email" },
    { title: "Contact No", dataIndex: "contact", key: "contact" },
    { title: "Role", dataIndex: "role", key: "role" },
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

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
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
    <UserManagementWrapper>
      <div style={{ padding: "20px" }}>
        <h2 className="title-header">User Management</h2>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <Button
            className={
              activeTab === "Customer" ? "tab-button active-tab" : "tab-button"
            }
            type={activeTab === "Customer" ? "primary" : "default"}
            onClick={() => setActiveTab("Customer")}
          >
            <Avatar
              size={50}
              className="icon-bg"
              style={{
                backgroundColor:
                  activeTab === "Customer" ? "#ffffff" : "#E4F6FF",
              }}
              src={<img src={MaskGroup} alt="avatar" />}
            />
            &nbsp;
            {usersData.filter((user) => user.type === "Customer").length}{" "}
            Customers
          </Button>
          <Button
            className={
              activeTab === "Partner" ? "tab-button active-tab" : "tab-button"
            }
            type={activeTab === "Partner" ? "primary" : "default"}
            onClick={() => setActiveTab("Partner")}
          >
            <Avatar
              size={50}
              className="icon-bg"
              style={{
                backgroundColor:
                  activeTab === "Partner" ? "#ffffff" : "#E4F6FF",
              }}
              src={<img src={MaskGroup} alt="avatar" />}
            />
            &nbsp;
            {usersData.filter((user) => user.type === "Partner").length}{" "}
            Partners
          </Button>
          <Button
            className={
              activeTab === "Admin" ? "tab-button active-tab" : "tab-button"
            }
            type={activeTab === "Admin" ? "primary" : "default"}
            onClick={() => setActiveTab("Admin")}
          >
            <Avatar
              size={50}
              className="icon-bg"
              style={{
                backgroundColor: activeTab === "Admin" ? "#ffffff" : "#E4F6FF",
              }}
              src={<img src={MaskGroup} alt="avatar" />}
            />
            &nbsp;
            {usersData.filter((user) => user.type === "Admin").length} Admin
          </Button>
        </div>
        <Flex align="start" justify="space-between">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search resources using Name"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
          />
          <Button
            style={{ backgroundColor: "#01D9A9" }}
            onClick={handleOpenModal}
          >
            Add New User
          </Button>
        </Flex>
        {selectedRole !== "Admin" ? (
          <>
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={filteredData}
              pagination={{ pageSize: 5 }}
            />
          </>
        ) : (
          <>
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={adminColumns}
              dataSource={filteredData}
              pagination={{ pageSize: 5 }}
            />
          </>
        )}

        {/* Add New User Modal */}
        <Modal
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
        >
          <Flex
            justify="center"
            vertical
            align="center"
            style={{ borderBottom: "1px solid #000", marginBottom: "1rem" }}
          >
            <Text style={{ fontSize: "30px", color: "#014c75" }}>
              Add New User
            </Text>
            <Text
              style={{
                fontSize: "14px",
                paddingBottom: "1rem",
              }}
            >
              Create New User like Customer, Partner or Admin
            </Text>
          </Flex>

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
              rules={[
                { required: true, message: "Please enter the full name!" },
              ]}
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
            {selectedRole !== "Admin" && (
              <Form.Item
                label="Designation"
                name="designation"
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button onClick={handleCloseModal}>Discard</Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </UserManagementWrapper>
  );
};

export default UserManagement;
