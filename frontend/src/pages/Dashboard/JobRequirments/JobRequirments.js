import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Form,
  Select,
  Flex,
  Avatar,
  Typography,
  Dropdown,
  Menu,
} from "antd";
import {
  MoreOutlined,
  SearchOutlined,
  ShoppingOutlined,
  SnippetsOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { UserManagementWrapper } from "./../UserManagement/UserManagement.style";
// import MaskGroup from "../Mask-Group.svg";
import { API_CONST } from "../../../const";
import { Link } from "react-router-dom";
const { Text, Title } = Typography;
const { Option } = Select;

const usersData = Array.from({ length: 25 }, (_, index) => ({
  key: index.toString(),
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  contact: `+91-90000000${index}`,
  organization: "Sample Organization",
  designation: "Software Engineer",
  experience: "3 years 2 months",
  cost: "₹1,50,000",
  createdOn: "12-Oct-24 | 11:30",
  modifiedOn: "12-Oct-24 | 14:30",
  type:
    index % 3 === 0
      ? "User to Review"
      : index % 3 === 1
      ? "Job to Review"
      : "Profile to Review",
}));

const JobRequirments = () => {
  const [usersData, setUsersData] = useState([{}]);
  const [activeTab, setActiveTab] = useState("User to Review");
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
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Edit</Menu.Item>
              <Menu.Item key="2">Delete</Menu.Item>
              <Menu.Item key="3">View Details</Menu.Item>
              <Menu.Item key="4">Reset Password</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <MoreOutlined />
        </Dropdown>
      ),
    },
  ];

  const adminColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email Id", dataIndex: "email", key: "email" },
    { title: "Contact No", dataIndex: "contact", key: "contact" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Created on", dataIndex: "createdOn", key: "createdOn" },
    { title: "Modified on", dataIndex: "modifiedOn", key: "modifiedOn" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Edit</Menu.Item>
              <Menu.Item key="2">Delete</Menu.Item>
              <Menu.Item key="3">View Details</Menu.Item>
              <Menu.Item key="4">Reset Password</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <MoreOutlined />
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(API_CONST.GET_USER_MANAGEMENT, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e),
      });

      // Check for successful response
      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);
        window.location.reload();
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    handleCloseModal();
  };

  return (
    <UserManagementWrapper>
      <div style={{ padding: "20px" }}>
        <h2 className="title-header">Job Requirements</h2>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <Button
            className={
              activeTab === "Active Jobs"
                ? "tab-button active-tab"
                : "tab-button"
            }
            type={activeTab === "Active Jobs" ? "primary" : "default"}
            onClick={() => setActiveTab("Active Jobs")}
          >
            <Avatar
              size={50}
              className="icon-bg"
              style={{
                backgroundColor:
                  activeTab === "Active Jobs" ? "#ffffff" : "#E4F6FF",
              }}
              icon={<ShoppingOutlined style={{ color: "#014C75" }} />}
            />
            &nbsp;
            {
              usersData.filter((user) => user.type === "Active Jobs").length
            }{" "}
            Active Jobs
          </Button>
          <Button
            className={
              activeTab === "Profiles Submitted"
                ? "tab-button active-tab"
                : "tab-button"
            }
            type={activeTab === "Profiles Submitted" ? "primary" : "default"}
            onClick={() => setActiveTab("Profiles Submitted")}
          >
            <Avatar
              size={50}
              className="icon-bg"
              style={{
                backgroundColor:
                  activeTab === "Profiles Submitted" ? "#ffffff" : "#E4F6FF",
              }}
              icon={<WechatOutlined style={{ color: "#014C75" }} />}
            />
            &nbsp;
            {
              usersData.filter((user) => user.type === "Profiles Submitted")
                .length
            }{" "}
            Profile Submitted
          </Button>
          <Button
            className={
              activeTab === "Jobs Fulfilled"
                ? "tab-button active-tab"
                : "tab-button"
            }
            type={activeTab === "Jobs Fulfilled" ? "primary" : "default"}
            onClick={() => setActiveTab("Jobs Fulfilled")}
          >
            <Avatar
              size={50}
              className="icon-bg"
              style={{
                backgroundColor:
                  activeTab === "Jobs Fulfilled" ? "#ffffff" : "#E4F6FF",
              }}
              icon={<SnippetsOutlined style={{ color: "#014C75" }} />}
            />
            &nbsp;
            {
              usersData.filter((user) => user.type === "Jobs Fulfilled").length
            }{" "}
            Jobs Fulfilled
          </Button>
        </div>
        <Flex align="start" justify="space-between">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search resources using Name"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
          />
          <Link to="/home/job-requirments/new-job-post">
            <Button style={{ backgroundColor: "#01D9A9" }}>Add New Job</Button>
          </Link>
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
      </div>
    </UserManagementWrapper>
  );
};

export default JobRequirments;
