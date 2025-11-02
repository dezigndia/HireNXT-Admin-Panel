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
  Card,
} from "antd";
import {
  MoreOutlined,
  SearchOutlined,
  ShoppingOutlined,
  SnippetsOutlined,
  WechatOutlined,
  PlusOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { UserManagementWrapper, MetricsContainer, TabsContainer } from "./../UserManagement/UserManagement.style";
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
  // Mock data for initial display
  const mockJobData = [
    {
      key: "1",
      id: "JOB001",
      role: "Senior React Developer",
      location: "Bangalore",
      engagement_type: "Full Time",
      requirement_count: 3,
      experience: "5+ years",
      engagement_months: "12 months",
      start_date: "01-Nov-24",
      budget: "₹1,80,000 - ₹2,20,000",
      created_on: "15-Oct-24",
      type: "Active Jobs",
      name: "Senior React Developer",
    },
    {
      key: "2",
      id: "JOB002",
      role: "Full Stack Developer",
      location: "Mumbai",
      engagement_type: "Contract",
      requirement_count: 2,
      experience: "4+ years",
      engagement_months: "6 months",
      start_date: "05-Nov-24",
      budget: "₹1,50,000 - ₹1,90,000",
      created_on: "18-Oct-24",
      type: "Active Jobs",
      name: "Full Stack Developer",
    },
    {
      key: "3",
      id: "JOB003",
      role: "Backend Developer",
      location: "Hyderabad",
      engagement_type: "Full Time",
      requirement_count: 4,
      experience: "6+ years",
      engagement_months: "12 months",
      start_date: "10-Nov-24",
      budget: "₹2,00,000 - ₹2,50,000",
      created_on: "20-Oct-24",
      type: "Profiles Submitted",
      name: "Backend Developer",
    },
    {
      key: "4",
      id: "JOB004",
      role: "DevOps Engineer",
      location: "Pune",
      engagement_type: "Full Time",
      requirement_count: 2,
      experience: "5+ years",
      engagement_months: "12 months",
      start_date: "15-Nov-24",
      budget: "₹1,70,000 - ₹2,10,000",
      created_on: "22-Oct-24",
      type: "Profiles Submitted",
      name: "DevOps Engineer",
    },
    {
      key: "5",
      id: "JOB005",
      role: "UI/UX Designer",
      location: "Delhi",
      engagement_type: "Contract",
      requirement_count: 1,
      experience: "4+ years",
      engagement_months: "6 months",
      start_date: "20-Nov-24",
      budget: "₹1,20,000 - ₹1,50,000",
      created_on: "25-Oct-24",
      type: "Jobs Fulfilled",
      name: "UI/UX Designer",
    },
    {
      key: "6",
      id: "JOB006",
      role: "QA Engineer",
      location: "Bangalore",
      engagement_type: "Full Time",
      requirement_count: 3,
      experience: "3+ years",
      engagement_months: "12 months",
      start_date: "01-Dec-24",
      budget: "₹1,00,000 - ₹1,30,000",
      created_on: "28-Oct-24",
      type: "Jobs Fulfilled",
      name: "QA Engineer",
    },
  ];

  const [usersData, setUsersData] = useState(mockJobData);
  const [activeTab, setActiveTab] = useState("Active Jobs");
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // State to track selected role
  const [form] = Form.useForm();

  const columns = [
    { title: "Job Id", dataIndex: "id", key: "id" },
    { title: "Job Requirement Title", dataIndex: "role", key: "role" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Type", dataIndex: "engagement_type", key: "engagement_type" },
    { title: "Positions", dataIndex: "requirement_count", key: "requirement_count" },
    { title: "Experience", dataIndex: "createdOn", key: "createdOn" },
    { title: "Duration", dataIndex: "engagement_months", key: "engagement_months" },
    { title: "Start Date", dataIndex: "start_date", key: "start_date" },
    { title: "Salary(INR)", dataIndex: "budget", key: "budget" },
    { title: "Created On", dataIndex: "created_on", key: "created_on" },
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
        const response = await fetch(API_CONST.GET_JOB_REQUIREMENTS, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        
        // Transform legacy type values to new tab labels for consistency
        const transformedData = (result.Response || []).map(item => ({
          ...item,
          type: item.type === "User to Review" ? "Active Jobs" :
                item.type === "Job to Review" ? "Profiles Submitted" :
                item.type === "Profile to Review" ? "Jobs Fulfilled" :
                item.type
        }));
        
        setUsersData(transformedData);
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

  const activeJobsCount = usersData.filter((user) => user.type === "Active Jobs").length;
  const profilesSubmittedCount = usersData.filter((user) => user.type === "Profiles Submitted").length;
  const jobsFulfilledCount = usersData.filter((user) => user.type === "Jobs Fulfilled").length;

  return (
    <UserManagementWrapper>
      <h2 className="title-header">Job Requirements</h2>
      
      <MetricsContainer>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
              icon={<ShoppingOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#e6f7ff" }}
            />
            <div className="metric-info">
              <h3>{activeJobsCount}</h3>
              <p>Active Jobs</p>
            </div>
          </div>
        </Card>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
              icon={<WechatOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#fff7e6" }}
            />
            <div className="metric-info">
              <h3>{profilesSubmittedCount}</h3>
              <p>Profiles Submitted</p>
            </div>
          </div>
        </Card>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
              icon={<CheckCircleOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#f6ffed" }}
            />
            <div className="metric-info">
              <h3>{jobsFulfilledCount}</h3>
              <p>Jobs Fulfilled</p>
            </div>
          </div>
        </Card>
      </MetricsContainer>

      <TabsContainer>
        {["Active Jobs", "Profiles Submitted", "Jobs Fulfilled"].map((tab) => (
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
          <Link to="/home/job-requirments/new-job-post">
            <Button 
              type="primary"
              icon={<PlusOutlined />}
              style={{ 
                backgroundColor: "#00d9a9",
                borderColor: "#00d9a9",
                height: "40px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Add New Job
            </Button>
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
              columns={columns}
              dataSource={filteredData}
              pagination={{ pageSize: 5 }}
            />
          </>
        )}
    </UserManagementWrapper>
  );
};

export default JobRequirments;
