import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Modal,
  message,
} from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  PlusOutlined,
  UserAddOutlined,
  FileTextOutlined,
  TrophyOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { UserManagementWrapper, MetricsContainer, TabsContainer } from "../UserManagement/UserManagement.style";
import MaskGroup from "../../../assets/Mask-Group.svg";
import axios from "axios";
import { API_CONST } from "../../../const";
const { Text } = Typography;

const TalentProfiles = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Active");
  const [searchText, setSearchText] = useState("");
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

  const handleViewDocuments = (record) => {
    navigate(`/home/talent-profiles/documents/${record.key}`);
  };

  const handleEditTalent = (record) => {
    navigate(`/home/talent-profiles/add-new-profile?edit=${record.key}`);
  };

  const handleMarkInactive = (record) => {
    Modal.confirm({
      title: "Mark as Inactive",
      icon: <ExclamationCircleOutlined style={{ color: "#faad14" }} />,
      content: (
        <div>
          <p>Are you sure you want to mark this talent as inactive?</p>
          <div style={{ marginTop: 12, padding: 12, background: "#f8f9fd", borderRadius: 6 }}>
            <p style={{ margin: 0, fontWeight: 500 }}>{record.name}</p>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>{record.organization}</p>
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

  const handleDeleteTalent = (record) => {
    Modal.confirm({
      title: "Delete Talent Profile",
      icon: <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />,
      content: (
        <div>
          <p>Are you sure you want to delete this talent profile?</p>
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

  const getActionMenuItems = (record) => [
    {
      key: "view-docs",
      label: "View Documents",
      icon: <FileTextOutlined />,
      onClick: () => handleViewDocuments(record),
    },
    {
      key: "edit",
      label: "Edit",
      icon: <EditOutlined />,
      onClick: () => handleEditTalent(record),
    },
    { type: "divider" },
    ...(record.status === "Active" ? [{
      key: "inactive",
      label: "Mark Inactive",
      icon: <StopOutlined />,
      onClick: () => handleMarkInactive(record),
    }] : []),
    {
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDeleteTalent(record),
    },
  ];

  const columns = [
    { 
      title: "Name", 
      dataIndex: "name", 
      key: "name",
      render: (text, record) => (
        <a 
          onClick={() => navigate(`/home/talent-profiles/details/${record.key}`)}
          style={{ color: "#014c75", fontWeight: 500, cursor: "pointer" }}
        >
          {text}
        </a>
      ),
    },
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
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
        />
    </UserManagementWrapper>
  );
};

export default TalentProfiles;
