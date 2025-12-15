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
  Select,
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
  CheckCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { UserManagementWrapper, MetricsContainer, TabsContainer } from "../UserManagement/UserManagement.style";
import MaskGroup from "../../../assets/Mask-Group.svg";
import axios from "axios";
import { API_CONST } from "../../../const";
const { Text } = Typography;

const PARTNER_DEDUCTION_PERCENT = 10;
const CUSTOMER_MARKUP_PERCENT = 15;

const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

const calculateSettledCost = (partnerRate) => {
  return Math.round(partnerRate * (1 - PARTNER_DEDUCTION_PERCENT / 100));
};

const calculateClientRate = (partnerRate) => {
  return Math.round(partnerRate * (1 + CUSTOMER_MARKUP_PERCENT / 100));
};

const TalentProfiles = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Active");
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [locationFilter, setLocationFilter] = useState(null);
  const [roleFilter, setRoleFilter] = useState(null);
  const [experienceFilter, setExperienceFilter] = useState(null);
  const mockTalentData = [
    {
      key: "1",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@gmail.com",
      contact: "+91-9876543210",
      organization: "TechCorp Solutions",
      partnerRate: 180000,
      role: "Senior Developer",
      experience: "5 Years",
      location: "Bangalore",
      jobsApplied: 12,
      pastHired: 8,
      rejected: 2,
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
      partnerRate: 150000,
      role: "UI/UX Designer",
      experience: "4 Years",
      location: "Mumbai",
      jobsApplied: 8,
      pastHired: 5,
      rejected: 1,
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
      partnerRate: 200000,
      role: "Tech Lead",
      experience: "6 Years",
      location: "Pune",
      jobsApplied: 15,
      pastHired: 10,
      rejected: 3,
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
      partnerRate: 170000,
      role: "Full Stack Developer",
      experience: "5 Years",
      location: "Hyderabad",
      jobsApplied: 10,
      pastHired: 7,
      rejected: 2,
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
      partnerRate: 160000,
      role: "DevOps Engineer",
      experience: "4 Years",
      location: "Delhi",
      jobsApplied: 6,
      pastHired: 3,
      rejected: 2,
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
      partnerRate: 190000,
      role: "Data Analyst",
      experience: "7 Years",
      location: "Bangalore",
      jobsApplied: 9,
      pastHired: 6,
      rejected: 1,
      createdOn: "28-Oct-24",
      status: "Active",
      backgroundVerified: "No",
    },
  ];

  const [usersData, setUsersData] = useState(mockTalentData);

  const locationOptions = [...new Set(usersData.map(u => u.location).filter(Boolean))];
  const roleOptions = [...new Set(usersData.map(u => u.role).filter(Boolean))];
  const experienceOptions = [...new Set(usersData.map(u => u.experience).filter(Boolean))];

  const filteredData = usersData.filter((user) => {
    if (user.status !== activeTab) return false;
    if (locationFilter && user.location !== locationFilter) return false;
    if (roleFilter && user.role !== roleFilter) return false;
    if (experienceFilter && user.experience !== experienceFilter) return false;
    if (searchText && !user.name.toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  const parseRateString = (rateStr) => {
    if (typeof rateStr === 'number') return rateStr;
    if (!rateStr) return 0;
    return parseInt(rateStr.replace(/[₹,\s]/g, ''), 10) || 0;
  };

  const transformApiData = (apiData) => {
    return apiData.map(item => ({
      ...item,
      key: item.key || item.id || String(Math.random()),
      partnerRate: item.partnerRate || parseRateString(item.rate),
      marketRate: item.marketRate || Math.round((item.partnerRate || parseRateString(item.rate)) * 1.1),
    }));
  };

  useEffect(() => {
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
        const transformedData = transformApiData(result.Response);
        setUsersData(transformedData);
      } catch (error) {
        console.log(error.message);
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

  const handleMarkActive = (record) => {
    Modal.confirm({
      title: "Mark as Active",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      content: (
        <div>
          <p>Are you sure you want to mark this talent as active?</p>
          <div style={{ marginTop: 12, padding: 12, background: "#f6ffed", borderRadius: 6, border: "1px solid #b7eb8f" }}>
            <p style={{ margin: 0, fontWeight: 500 }}>{record.name}</p>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>{record.organization}</p>
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

  const handleBulkStatusChange = (newStatus) => {
    const selectedTalents = usersData.filter(user => selectedRowKeys.includes(user.key));
    const statusColor = newStatus === "Active" ? "#52c41a" : "#faad14";
    const bgColor = newStatus === "Active" ? "#f6ffed" : "#fff7e6";
    const borderColor = newStatus === "Active" ? "#b7eb8f" : "#ffe58f";
    
    Modal.confirm({
      title: `Mark ${selectedRowKeys.length} Talent(s) as ${newStatus}`,
      icon: newStatus === "Active" ? 
        <CheckCircleOutlined style={{ color: statusColor }} /> : 
        <StopOutlined style={{ color: statusColor }} />,
      content: (
        <div>
          <p>Are you sure you want to mark the following talents as {newStatus.toLowerCase()}?</p>
          <div style={{ marginTop: 12, padding: 12, background: bgColor, borderRadius: 6, border: `1px solid ${borderColor}`, maxHeight: 150, overflow: "auto" }}>
            {selectedTalents.map(talent => (
              <p key={talent.key} style={{ margin: "4px 0", fontSize: 13 }}>{talent.name}</p>
            ))}
          </div>
        </div>
      ),
      okText: `Mark ${newStatus}`,
      okButtonProps: { style: { background: statusColor, borderColor: statusColor } },
      cancelText: "Cancel",
      onOk: () => {
        setUsersData(usersData.map(user => 
          selectedRowKeys.includes(user.key) ? { ...user, status: newStatus } : user
        ));
        setSelectedRowKeys([]);
        message.success(`${selectedRowKeys.length} talent(s) marked as ${newStatus.toLowerCase()}`);
      },
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
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
    }] : [{
      key: "active",
      label: "Mark Active",
      icon: <CheckCircleOutlined />,
      onClick: () => handleMarkActive(record),
    }]),
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
      width: 140,
      fixed: "left",
      render: (text, record) => (
        <a 
          onClick={() => navigate(`/home/talent-profiles/details/${record.key}`)}
          style={{ color: "#014c75", fontWeight: 500, cursor: "pointer" }}
        >
          {text}
        </a>
      ),
    },
    { title: "Email Id", dataIndex: "email", key: "email", width: 180, ellipsis: true },
    { title: "Contact No", dataIndex: "contact", key: "contact", width: 150 },
    { title: "Organization", dataIndex: "organization", key: "organization", width: 140, ellipsis: true },
    { title: "Role", dataIndex: "role", key: "role", width: 150, ellipsis: true },
    { title: "Experience", dataIndex: "experience", key: "experience", width: 100 },
    { 
      title: "Partner Rate", 
      dataIndex: "partnerRate", 
      key: "partnerRate",
      width: 115,
      render: (value) => value ? (
        <span style={{ fontWeight: 600, color: "#014c75" }}>{formatCurrency(value)}</span>
      ) : "-",
    },
    { 
      title: "Settled Cost", 
      key: "settledCost",
      width: 115,
      render: (_, record) => record.partnerRate ? (
        <span style={{ fontWeight: 600, color: "#52c41a" }}>{formatCurrency(calculateSettledCost(record.partnerRate))}</span>
      ) : "-",
    },
    { 
      title: "Client Rate", 
      key: "clientRate",
      width: 110,
      render: (_, record) => record.partnerRate ? (
        <span style={{ fontWeight: 600, color: "#1890ff" }}>{formatCurrency(calculateClientRate(record.partnerRate))}</span>
      ) : "-",
    },
    { 
      title: "Jobs Applied", 
      dataIndex: "jobsApplied", 
      key: "jobsApplied", 
      width: 110, 
      align: "center",
      render: (value) => (
        <span style={{ background: "#e6f7ff", padding: "4px 10px", borderRadius: 4, fontWeight: 500, color: "#1890ff" }}>
          {value || 0}
        </span>
      ),
    },
    { 
      title: "Past Hired", 
      dataIndex: "pastHired", 
      key: "pastHired", 
      width: 100, 
      align: "center",
      render: (value) => (
        <span style={{ background: "#f6ffed", padding: "4px 10px", borderRadius: 4, fontWeight: 500, color: "#52c41a" }}>
          {value || 0}
        </span>
      ),
    },
    { 
      title: "Rejected", 
      dataIndex: "rejected", 
      key: "rejected", 
      width: 90, 
      align: "center",
      render: (value) => (
        <span style={{ background: "#fff2f0", padding: "4px 10px", borderRadius: 4, fontWeight: 500, color: "#ff4d4f" }}>
          {value || 0}
        </span>
      ),
    },
    { 
      title: "Rejection Rate", 
      key: "rejectionRate", 
      width: 120,
      align: "center",
      render: (_, record) => {
        if (!record.jobsApplied || record.jobsApplied === 0) return "-";
        const rate = ((record.rejected || 0) / record.jobsApplied * 100).toFixed(1);
        return (
          <span style={{ background: "#fff7e6", padding: "4px 10px", borderRadius: 4, fontWeight: 500, color: "#faad14" }}>
            {rate}%
          </span>
        );
      },
    },
    { title: "Created on", dataIndex: "createdOn", key: "createdOn", width: 100 },
    {
      title: "Action",
      key: "action",
      width: 70,
      fixed: "right",
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
            onClick={() => {
              setActiveTab(tab);
              setSelectedRowKeys([]);
            }}
          >
            {tab}
          </Button>
        ))}
      </TabsContainer>

        <Flex align="center" justify="space-between" style={{ marginBottom: 16 }} wrap="wrap" gap={12}>
          <Flex align="center" gap={12} wrap="wrap">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search by Name"
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Select
              placeholder="Location"
              allowClear
              style={{ width: 140 }}
              value={locationFilter}
              onChange={setLocationFilter}
              options={locationOptions.map(loc => ({ label: loc, value: loc }))}
            />
            <Select
              placeholder="Role"
              allowClear
              style={{ width: 160 }}
              value={roleFilter}
              onChange={setRoleFilter}
              options={roleOptions.map(role => ({ label: role, value: role }))}
            />
            <Select
              placeholder="Experience"
              allowClear
              style={{ width: 130 }}
              value={experienceFilter}
              onChange={setExperienceFilter}
              options={experienceOptions.map(exp => ({ label: exp, value: exp }))}
            />
            {selectedRowKeys.length > 0 && (
              <Button
                type="primary"
                icon={activeTab === "Active" ? <StopOutlined /> : <CheckCircleOutlined />}
                onClick={() => handleBulkStatusChange(activeTab === "Active" ? "Inactive" : "Active")}
                style={{ 
                  backgroundColor: activeTab === "Active" ? "#faad14" : "#52c41a",
                  borderColor: activeTab === "Active" ? "#faad14" : "#52c41a",
                  height: "32px",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Mark {activeTab === "Active" ? "Inactive" : "Active"} ({selectedRowKeys.length})
              </Button>
            )}
          </Flex>
          <Link to="/home/talent-profiles/add-new-profile">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ 
                backgroundColor: "#00d9a9",
                borderColor: "#00d9a9",
                height: "36px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Add New Profile
            </Button>
          </Link>
        </Flex>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 1800 }}
        />
    </UserManagementWrapper>
  );
};

export default TalentProfiles;
