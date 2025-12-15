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
import { MoreOutlined, SearchOutlined, PlusOutlined, UserOutlined, TeamOutlined, ShopOutlined, EditOutlined, DeleteOutlined, StopOutlined, ExclamationCircleOutlined, CheckCircleOutlined, LockOutlined } from "@ant-design/icons";
import { UserManagementWrapper, MetricsContainer, TabsContainer } from "./UserManagement.style";
import MaskGroup from "./../../../assets/Mask-Group.svg";
import { API_CONST } from "../../../const";
const { Text, Link, Title } = Typography;
const { Option } = Select;

const UserManagement = () => {
  const mockUserData = [
    {
      key: "1",
      name: "Ramesh Kumar",
      email: "ramesh.kumar@infosys.com",
      contact: "+91-9988776655",
      organization: "Infosys Limited",
      designation: "HR Manager",
      createdOn: "10-Oct-24",
      modifiedOn: "15-Oct-24",
      type: "Customer",
      status: "Active",
    },
    {
      key: "2",
      name: "Anita Desai",
      email: "anita.desai@wipro.com",
      contact: "+91-9988776656",
      organization: "Wipro Technologies",
      designation: "Talent Acquisition Lead",
      createdOn: "12-Oct-24",
      modifiedOn: "18-Oct-24",
      type: "Customer",
      status: "Active",
    },
    {
      key: "3",
      name: "Suresh Patel",
      email: "suresh.patel@tcs.com",
      contact: "+91-9988776657",
      organization: "TCS Ltd",
      designation: "Recruitment Head",
      createdOn: "14-Oct-24",
      modifiedOn: "20-Oct-24",
      type: "Customer",
      status: "Inactive",
    },
    {
      key: "4",
      name: "Vikram Singh",
      email: "vikram.singh@techcorp.com",
      contact: "+91-9988776658",
      organization: "TechCorp Solutions",
      designation: "CEO",
      createdOn: "08-Oct-24",
      modifiedOn: "16-Oct-24",
      type: "Partner",
      status: "Active",
    },
    {
      key: "5",
      name: "Priya Sharma",
      email: "priya.sharma@digitalpartners.com",
      contact: "+91-9988776659",
      organization: "Digital Partners Inc",
      designation: "Managing Director",
      createdOn: "11-Oct-24",
      modifiedOn: "19-Oct-24",
      type: "Partner",
      status: "Active",
    },
    {
      key: "6",
      name: "Amit Gupta",
      email: "amit.gupta@innovatetech.com",
      contact: "+91-9988776660",
      organization: "Innovate Tech",
      designation: "Director",
      createdOn: "13-Oct-24",
      modifiedOn: "21-Oct-24",
      type: "Partner",
      status: "Inactive",
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
      status: "Active",
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
      status: "Active",
    },
  ];

  const [usersData, setUsersData] = useState(mockUserData);
  const [activeTab, setActiveTab] = useState("Customer");
  const [statusTab, setStatusTab] = useState("Active");
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [passwordUser, setPasswordUser] = useState(null);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const handleEditUser = (record) => {
    setEditingUser(record);
    setIsEditMode(true);
    setSelectedRole(record.type);
    form.setFieldsValue({
      role: record.type,
      name: record.name,
      company: record.organization,
      designation: record.designation,
      email: record.email,
      contact: record.contact,
      adminRole: record.role,
    });
    setIsModalVisible(true);
  };

  const handleMarkInactive = (record) => {
    Modal.confirm({
      title: "Mark as Inactive",
      icon: <ExclamationCircleOutlined style={{ color: "#faad14" }} />,
      content: (
        <div>
          <p>Are you sure you want to mark this user as inactive?</p>
          <div style={{ marginTop: 12, padding: 12, background: "#f8f9fd", borderRadius: 6 }}>
            <p style={{ margin: 0, fontWeight: 500 }}>{record.name}</p>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>{record.organization || record.role}</p>
          </div>
        </div>
      ),
      okText: "Mark Inactive",
      okButtonProps: { style: { background: "#faad14", borderColor: "#faad14" } },
      cancelText: "Cancel",
      onOk: () => {
        setUsersData(usersData.map(user => 
          user.key === record.key ? { ...user, status: "Inactive" } : user
        ));
        message.success(`${record.name} has been marked as inactive`);
      },
    });
  };

  const handleMarkActive = (record) => {
    Modal.confirm({
      title: "Mark as Active",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      content: (
        <div>
          <p>Are you sure you want to mark this user as active?</p>
          <div style={{ marginTop: 12, padding: 12, background: "#f6ffed", borderRadius: 6 }}>
            <p style={{ margin: 0, fontWeight: 500 }}>{record.name}</p>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>{record.organization || record.role}</p>
          </div>
        </div>
      ),
      okText: "Mark Active",
      okButtonProps: { style: { background: "#52c41a", borderColor: "#52c41a" } },
      cancelText: "Cancel",
      onOk: () => {
        setUsersData(usersData.map(user => 
          user.key === record.key ? { ...user, status: "Active" } : user
        ));
        message.success(`${record.name} has been marked as active`);
      },
    });
  };

  const handleDeleteUser = (record) => {
    Modal.confirm({
      title: "Delete User",
      icon: <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />,
      content: (
        <div>
          <p>Are you sure you want to delete this user?</p>
          <p style={{ color: "#ff4d4f", fontSize: 13 }}>This action cannot be undone.</p>
          <div style={{ marginTop: 12, padding: 12, background: "#fff2f0", borderRadius: 6, border: "1px solid #ffccc7" }}>
            <p style={{ margin: 0, fontWeight: 500 }}>{record.name}</p>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>{record.email}</p>
          </div>
        </div>
      ),
      okText: "Delete",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      onOk: () => {
        setUsersData(usersData.filter(user => user.key !== record.key));
        message.success(`${record.name} has been deleted`);
      },
    });
  };

  const handleBulkStatusChange = () => {
    const newStatus = statusTab === "Active" ? "Inactive" : "Active";
    Modal.confirm({
      title: `Change Status to ${newStatus}`,
      icon: <ExclamationCircleOutlined style={{ color: newStatus === "Active" ? "#52c41a" : "#faad14" }} />,
      content: (
        <div>
          <p>Are you sure you want to change the status of {selectedRowKeys.length} selected user(s) to {newStatus}?</p>
        </div>
      ),
      okText: `Mark ${newStatus}`,
      okButtonProps: { style: { background: newStatus === "Active" ? "#52c41a" : "#faad14", borderColor: newStatus === "Active" ? "#52c41a" : "#faad14" } },
      cancelText: "Cancel",
      onOk: () => {
        setUsersData(usersData.map(user => 
          selectedRowKeys.includes(user.key) ? { ...user, status: newStatus } : user
        ));
        message.success(`${selectedRowKeys.length} user(s) have been marked as ${newStatus}`);
        setSelectedRowKeys([]);
      },
    });
  };

  const handleChangePassword = (record) => {
    setPasswordUser(record);
    passwordForm.resetFields();
    setIsPasswordModalVisible(true);
  };

  const handlePasswordSubmit = (values) => {
    message.success(`Password changed successfully for ${passwordUser.name}`);
    setIsPasswordModalVisible(false);
    setPasswordUser(null);
    passwordForm.resetFields();
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalVisible(false);
    setPasswordUser(null);
    passwordForm.resetFields();
  };

  const getActionMenuItems = (record) => {
    const items = [
      {
        key: "edit",
        label: "Edit",
        icon: <EditOutlined />,
        onClick: () => handleEditUser(record),
      },
      {
        key: "change-password",
        label: "Change Password",
        icon: <LockOutlined />,
        onClick: () => handleChangePassword(record),
      },
      { type: "divider", key: "divider-1" },
    ];
    
    if (record.status === "Active") {
      items.push({
        key: "inactive",
        label: "Mark Inactive",
        icon: <StopOutlined />,
        onClick: () => handleMarkInactive(record),
      });
    } else {
      items.push({
        key: "active",
        label: "Mark Active",
        icon: <CheckCircleOutlined />,
        onClick: () => handleMarkActive(record),
      });
    }
    
    items.push({
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDeleteUser(record),
    });
    
    return items;
  };

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
      render: (_, record) => (
        <Dropdown
          menu={{ items: getActionMenuItems(record) }}
          trigger={["click"]}
        >
          <MoreOutlined style={{ cursor: "pointer", fontSize: 18 }} />
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
      render: (_, record) => (
        <Dropdown
          menu={{ items: getActionMenuItems(record) }}
          trigger={["click"]}
        >
          <MoreOutlined style={{ cursor: "pointer", fontSize: 18 }} />
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
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
        const usersWithStatus = result.Response.map(user => ({
          ...user,
          status: user.status || "Active",
        }));
        setUsersData(usersWithStatus);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const filteredData = usersData
    .filter((user) => user.type === activeTab)
    .filter((user) => user.status === statusTab)
    .filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );

  const handleOpenModal = () => {
    setIsEditMode(false);
    setEditingUser(null);
    form.resetFields();
    setSelectedRole(null);
    setIsModalVisible(true);
  };
  
  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedRole(null);
    setEditingUser(null);
    setIsEditMode(false);
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys, selectedRows) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const handleSubmit = async (e) => {
    if (isEditMode && editingUser) {
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${today.toLocaleString('en-US', { month: 'short' })}-${today.getFullYear().toString().slice(-2)}`;
      
      const updatedUser = {
        ...editingUser,
        name: e.name,
        email: e.email,
        contact: e.contact,
        organization: e.company,
        designation: e.designation,
        role: e.adminRole || editingUser.role,
        modifiedOn: formattedDate,
      };
      
      setUsersData(usersData.map(user => 
        user.key === editingUser.key ? updatedUser : user
      ));
      message.success("User updated successfully!");
      handleCloseModal();
      return;
    }

    try {
      const userData = {
        ...e,
        status: "Active",
      };
      const response = await fetch(API_CONST.ADD_USER_MANAGEMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        message.success("User added successfully!");
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
  
  const activeCountForType = usersData.filter((user) => user.type === activeTab && user.status === "Active").length;
  const inactiveCountForType = usersData.filter((user) => user.type === activeTab && user.status === "Inactive").length;

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
            onClick={() => {
              setActiveTab(tab);
              setSelectedRowKeys([]);
            }}
          >
            {tab}
          </Button>
        ))}
      </TabsContainer>

      <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
        <Button
          type={statusTab === "Active" ? "link" : "text"}
          onClick={() => {
            setStatusTab("Active");
            setSelectedRowKeys([]);
          }}
          style={{ 
            padding: "4px 12px",
            height: "32px",
            fontSize: "13px",
            color: statusTab === "Active" ? "#00d9a9" : "#666",
            fontWeight: statusTab === "Active" ? 600 : 400,
            borderBottom: statusTab === "Active" ? "2px solid #00d9a9" : "2px solid transparent",
            borderRadius: 0,
          }}
        >
          Active ({activeCountForType})
        </Button>
        <Button
          type={statusTab === "Inactive" ? "link" : "text"}
          onClick={() => {
            setStatusTab("Inactive");
            setSelectedRowKeys([]);
          }}
          style={{ 
            padding: "4px 12px",
            height: "32px",
            fontSize: "13px",
            color: statusTab === "Inactive" ? "#00d9a9" : "#666",
            fontWeight: statusTab === "Inactive" ? 600 : 400,
            borderBottom: statusTab === "Inactive" ? "2px solid #00d9a9" : "2px solid transparent",
            borderRadius: 0,
          }}
        >
          Inactive ({inactiveCountForType})
        </Button>
      </div>

      <Flex align="start" justify="space-between" style={{ marginTop: "16px" }}>
        <Flex align="center" gap={16}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search resources using Name"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
          />
          {selectedRowKeys.length > 0 && (
            <Button
              type="primary"
              onClick={handleBulkStatusChange}
              style={{ 
                backgroundColor: statusTab === "Active" ? "#faad14" : "#52c41a",
                borderColor: statusTab === "Active" ? "#faad14" : "#52c41a",
                height: "40px",
                fontSize: "14px",
                fontWeight: 500,
                marginBottom: "20px",
              }}
            >
              {statusTab === "Active" ? `Mark Inactive (${selectedRowKeys.length})` : `Mark Active (${selectedRowKeys.length})`}
            </Button>
          )}
        </Flex>
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
      {activeTab !== "Admin" ? (
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
        />
      ) : (
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={adminColumns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
        />
      )}

        <Modal
          open={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={500}
        >
          <Flex
            justify="center"
            vertical
            align="center"
            style={{ borderBottom: "1px solid #e8e8e8", marginBottom: "1.5rem", paddingBottom: "1rem" }}
          >
            <Text style={{ fontSize: "24px", color: "#014c75", fontWeight: 600 }}>
              {isEditMode ? "Edit User" : "Add New User"}
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: "#666",
              }}
            >
              {isEditMode 
                ? `Update details for ${editingUser?.name}` 
                : "Create New User like Customer, Partner or Admin"}
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
                disabled={isEditMode}
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
                  { required: true, message: "Please enter the designation!" },
                ]}
              >
                <Input placeholder="Enter Designation" />
              </Form.Item>
            )}
            {selectedRole === "Admin" && (
              <Form.Item
                label="Admin Role"
                name="adminRole"
                rules={[
                  { required: true, message: "Please select admin role!" },
                ]}
              >
                <Select placeholder="Select Admin Role">
                  <Option value="Super Admin">Super Admin</Option>
                  <Option value="Admin">Admin</Option>
                </Select>
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
            {!isEditMode && (
              <>
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
              </>
            )}
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <Button type="primary" htmlType="submit" style={{ backgroundColor: "#00d9a9", borderColor: "#00d9a9" }}>
                  {isEditMode ? "Save Changes" : "Submit"}
                </Button>
                <Button onClick={handleCloseModal}>Cancel</Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          open={isPasswordModalVisible}
          onCancel={handleClosePasswordModal}
          footer={null}
          width={450}
        >
          <Flex
            justify="center"
            vertical
            align="center"
            style={{ borderBottom: "1px solid #e8e8e8", marginBottom: "1.5rem", paddingBottom: "1rem" }}
          >
            <LockOutlined style={{ fontSize: 32, color: "#1890ff", marginBottom: 8 }} />
            <Text style={{ fontSize: "20px", color: "#014c75", fontWeight: 600 }}>
              Change Password
            </Text>
            <Text style={{ fontSize: "14px", color: "#666" }}>
              {passwordUser?.name}
            </Text>
          </Flex>

          <Form form={passwordForm} layout="vertical" onFinish={handlePasswordSubmit}>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please enter the new password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password placeholder="Enter New Password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: "Please confirm the password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm New Password" />
            </Form.Item>
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <Button type="primary" htmlType="submit" style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}>
                  Change Password
                </Button>
                <Button onClick={handleClosePasswordModal}>Cancel</Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
    </UserManagementWrapper>
  );
};

export default UserManagement;
