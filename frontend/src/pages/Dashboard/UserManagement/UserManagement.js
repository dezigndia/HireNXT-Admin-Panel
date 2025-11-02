import React, { useState, useEffect } from "react";
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
  message,
  Dropdown,
  Menu,
  Card,
} from "antd";
import { MoreOutlined, SearchOutlined, PlusOutlined, UserOutlined, TeamOutlined, ShopOutlined } from "@ant-design/icons";
import { UserManagementWrapper, MetricsContainer, TabsContainer } from "./UserManagement.style";
import MaskGroup from "./../../../assets/Mask-Group.svg";
import { API_CONST } from "../../../const";
const { Text, Link, Title } = Typography;
const { Option } = Select;

const UserManagement = () => {
  // Mock data for initial display
  const mockUserData = [
    {
      key: "1",
      name: "Infosys Limited",
      email: "contact@infosys.com",
      contact: "+91-9988776655",
      organization: "Infosys Limited",
      designation: "HR Manager",
      createdOn: "10-Oct-24",
      modifiedOn: "15-Oct-24",
      type: "Customer",
    },
    {
      key: "2",
      name: "Wipro Technologies",
      email: "hr@wipro.com",
      contact: "+91-9988776656",
      organization: "Wipro Technologies",
      designation: "Talent Acquisition Lead",
      createdOn: "12-Oct-24",
      modifiedOn: "18-Oct-24",
      type: "Customer",
    },
    {
      key: "3",
      name: "TCS Ltd",
      email: "recruitment@tcs.com",
      contact: "+91-9988776657",
      organization: "TCS Ltd",
      designation: "Recruitment Head",
      createdOn: "14-Oct-24",
      modifiedOn: "20-Oct-24",
      type: "Customer",
    },
    {
      key: "4",
      name: "TechCorp Solutions",
      email: "admin@techcorp.com",
      contact: "+91-9988776658",
      organization: "TechCorp Solutions",
      designation: "CEO",
      createdOn: "08-Oct-24",
      modifiedOn: "16-Oct-24",
      type: "Partner",
    },
    {
      key: "5",
      name: "Digital Partners Inc",
      email: "contact@digitalpartners.com",
      contact: "+91-9988776659",
      organization: "Digital Partners Inc",
      designation: "Managing Director",
      createdOn: "11-Oct-24",
      modifiedOn: "19-Oct-24",
      type: "Partner",
    },
    {
      key: "6",
      name: "Innovate Tech",
      email: "info@innovatetech.com",
      contact: "+91-9988776660",
      organization: "Innovate Tech",
      designation: "Director",
      createdOn: "13-Oct-24",
      modifiedOn: "21-Oct-24",
      type: "Partner",
    },
    {
      key: "7",
      name: "Admin User",
      email: "admin@hirenxt.com",
      contact: "+91-9988776661",
      role: "Super Admin",
      createdOn: "01-Oct-24",
      modifiedOn: "22-Oct-24",
      type: "Admin",
    },
    {
      key: "8",
      name: "John Doe",
      email: "john.doe@hirenxt.com",
      contact: "+91-9988776662",
      role: "Admin",
      createdOn: "05-Oct-24",
      modifiedOn: "23-Oct-24",
      type: "Admin",
    },
  ];

  const [usersData, setUsersData] = useState(mockUserData);
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
    { title: "Action", key: "action", render: () => <Button>Edit</Button> },
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
        // Keep mock data on error
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
        message.success("Processing complete!");
        window.location.reload();
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    handleCloseModal();
  };

  const totalUsers = usersData.length;
  const adminCount = usersData.filter((user) => user.type === "Admin").length;
  const customerCount = usersData.filter((user) => user.type === "Customer").length;
  const partnerCount = usersData.filter((user) => user.type === "Partner").length;

  return (
    <UserManagementWrapper>
      <h2 className="title-header">User Management</h2>
      
      <MetricsContainer>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
              icon={<TeamOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#e6f7ff" }}
            />
            <div className="metric-info">
              <h3>{totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>
        </Card>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
              icon={<UserOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#fff7e6" }}
            />
            <div className="metric-info">
              <h3>{adminCount}</h3>
              <p>Total Admins</p>
            </div>
          </div>
        </Card>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
              icon={<ShopOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#f6ffed" }}
            />
            <div className="metric-info">
              <h3>{customerCount}</h3>
              <p>Total Customers</p>
            </div>
          </div>
        </Card>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
              icon={<TeamOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#e6fff9" }}
            />
            <div className="metric-info">
              <h3>{partnerCount}</h3>
              <p>Total Partners</p>
            </div>
          </div>
        </Card>
      </MetricsContainer>

      <TabsContainer>
        {["Customer", "Partner", "Admin"].map((tab) => (
          <Button
            key={tab}
            className={activeTab === tab ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </TabsContainer>
        <Flex align="start" justify="space-between">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search resources using Name"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenModal}
            style={{ 
              backgroundColor: "#00d9a9",
              borderColor: "#00d9a9",
              height: "40px",
              fontSize: "14px",
              fontWeight: 500,
            }}
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
    </UserManagementWrapper>
  );
};

export default UserManagement;
