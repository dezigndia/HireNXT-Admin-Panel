import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Input,
  Avatar,
  Typography,
  Flex,
  Dropdown,
  Menu,
  Card,
} from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  PlusOutlined,
  UserAddOutlined,
  FileTextOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { UserManagementWrapper, MetricsContainer, TabsContainer } from "../UserManagement/UserManagement.style";
import MaskGroup from "../../../assets/Mask-Group.svg";
import axios from "axios";
import { API_CONST } from "../../../const";
const { Text } = Typography;

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
  status: index % 2 === 0 ? "Active" : "Inactive",
  backgroundVerified: index % 3 === 0 ? "Yes" : "No",
}));

const adminColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email Id", dataIndex: "email", key: "email" },
  { title: "Contact No", dataIndex: "contact", key: "contact" },
  { title: "Organization", dataIndex: "organization", key: "organization" },
  { title: "Rate", dataIndex: "rate", key: "rate" },
  { title: "Experience", dataIndex: "experience", key: "experience" },
  { title: "Created on", dataIndex: "createdOn", key: "createdOn" },
  { title: "Background Verified", dataIndex: "backgroundVerified", key: "backgroundVerified" },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="1">View Document</Menu.Item>
            <Menu.Item key="2">Edit</Menu.Item>
            <Menu.Item key="3">Mark Inactive</Menu.Item>
            <Menu.Item key="4">Delete</Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <MoreOutlined />
      </Dropdown>
    ),
  },
];

const TalentProfiles = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [searchText, setSearchText] = useState("");
  // Mock data for initial display
  const mockTalentData = [
    {
      key: "1",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@gmail.com",
      contact: "+91-9876543210",
      organization: "TechCorp Solutions",
      rate: "₹1,80,000",
      experience: "5 Years",
      createdOn: "15-Oct-24",
      status: "Active",
      backgroundVerified: "Yes",
    },
    {
      key: "2",
      name: "Priya Sharma",
      email: "priya.sharma@gmail.com",
      contact: "+91-9876543211",
      organization: "Digital Partners Inc",
      rate: "₹1,50,000",
      experience: "4 Years",
      createdOn: "18-Oct-24",
      status: "Active",
      backgroundVerified: "Yes",
    },
    {
      key: "3",
      name: "Amit Patel",
      email: "amit.patel@gmail.com",
      contact: "+91-9876543212",
      organization: "Innovate Tech",
      rate: "₹2,00,000",
      experience: "6 Years",
      createdOn: "20-Oct-24",
      status: "Inactive",
      backgroundVerified: "No",
    },
    {
      key: "4",
      name: "Sneha Reddy",
      email: "sneha.reddy@gmail.com",
      contact: "+91-9876543213",
      organization: "CodeCraft Ltd",
      rate: "₹1,70,000",
      experience: "5 Years",
      createdOn: "22-Oct-24",
      status: "Active",
      backgroundVerified: "Yes",
    },
    {
      key: "5",
      name: "Vikram Singh",
      email: "vikram.singh@gmail.com",
      contact: "+91-9876543214",
      organization: "WebWorks Pro",
      rate: "₹1,60,000",
      experience: "4 Years",
      createdOn: "25-Oct-24",
      status: "Inactive",
      backgroundVerified: "Yes",
    },
    {
      key: "6",
      name: "Anjali Gupta",
      email: "anjali.gupta@gmail.com",
      contact: "+91-9876543215",
      organization: "DataSystems Inc",
      rate: "₹1,90,000",
      experience: "7 Years",
      createdOn: "28-Oct-24",
      status: "Active",
      backgroundVerified: "No",
    },
  ];

  const [usersData, setUsersData] = useState(mockTalentData);

  const filteredData = usersData.filter((user) => user.status === activeTab);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(API_CONST.GET_TALENT_PROFILE, {
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

  const activeCount = usersData.filter((user) => user.status === "Active").length;
  const inactiveCount = usersData.filter((user) => user.status === "Inactive").length;
  const totalCount = usersData.length;

  return (
    <UserManagementWrapper>
      <h2 className="title-header">Talent Profile</h2>
      
      <MetricsContainer>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
              icon={<UserAddOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#e6f7ff" }}
            />
            <div className="metric-info">
              <h3>{totalCount}</h3>
              <p>Total Profiles</p>
            </div>
          </div>
        </Card>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
              icon={<FileTextOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#fff7e6" }}
            />
            <div className="metric-info">
              <h3>{activeCount}</h3>
              <p>Active Profiles</p>
            </div>
          </div>
        </Card>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
              icon={<TrophyOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#f6ffed" }}
            />
            <div className="metric-info">
              <h3>{inactiveCount}</h3>
              <p>Inactive Profiles</p>
            </div>
          </div>
        </Card>
      </MetricsContainer>

      <TabsContainer>
        {["Active", "Inactive"].map((tab) => (
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
          <Link to="/home/talent-profiles/add-new-profile">
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
              Add New Profile
            </Button>
          </Link>
        </Flex>
        <Table
          columns={adminColumns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
        />
    </UserManagementWrapper>
  );
};

export default TalentProfiles;
