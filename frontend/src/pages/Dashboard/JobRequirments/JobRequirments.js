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
  Tag,
  Tooltip,
} from "antd";
import {
  MoreOutlined,
  SearchOutlined,
  ShoppingOutlined,
  SnippetsOutlined,
  WechatOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  FilePdfOutlined,
  DownloadOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { UserManagementWrapper, MetricsContainer, TabsContainer } from "./../UserManagement/UserManagement.style";
// import MaskGroup from "../Mask-Group.svg";
import { API_CONST } from "../../../const";
import { Link, useNavigate } from "react-router-dom";
const { Text, Title } = Typography;
const { Option } = Select;

const JobRequirments = () => {
  // Mock data for submitted profiles (for Profiles Submitted tab)


  const [usersData, setUsersData] = useState([{}]);
  const [submittedProfiles, setSubmittedProfiles] = useState([]);
  const [activeTab, setActiveTab] = useState("Active Jobs");
  const [searchText, setSearchText] = useState("");
  const [selectedJob, setSelectedJob] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // State to track selected role
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Active Jobs columns
  const activeJobsColumns = [
    { 
      title: "Job Id", 
      dataIndex: "id", 
      key: "id"
    },
    { title: "Job Requirement Title", dataIndex: "role", key: "role" },
    { title: "Location", dataIndex: "location", key: "location" },
    // { title: "Type", dataIndex: "engagement_type", key: "engagement_type" },
    // { title: "Positions", dataIndex: "requirement_count", key: "requirement_count" },
    // { title: "Experience", dataIndex: "experience", key: "experience" },
    // { title: "Duration", dataIndex: "engagement_months", key: "engagement_months" },
    // { title: "Start Date", dataIndex: "start_date", key: "start_date" },
    // { title: "Salary(INR)", dataIndex: "budget", key: "budget" },
    // { title: "Created On", dataIndex: "created_on", key: "created_on" },
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

        const rows = result?.Response?.rows || [];

      // ✅ Normalize tab types
      const transformedData = rows.map(item => ({
        ...item,
        type:
          item.type === "User to Review" ? "Active Jobs" :
          item.type === "Job to Review" ? "Profiles Submitted" :
          item.type === "Profile to Review" ? "Jobs Fulfilled" :
          item.type,
      }));
        setUsersData(transformedData) ;
      } catch (error) {
        console.log(error.message); // Store error message in state
        // Keep mock data on error
      }
    };
    fetchData();
  }, []);

  // Profiles Submitted columns (showing all submitted profiles)
  const profilesSubmittedColumns = [
    { title: "Profile ID", dataIndex: "profileId", key: "profileId", width: 120 },
    { 
      title: "Name", 
      dataIndex: "name", 
      key: "name", 
      width: 150,
      render: (text) => (
        <span style={{ color: "#1890ff", fontWeight: 500 }}>
          {text}
        </span>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email", width: 220 },
    { title: "Contact", dataIndex: "contact", key: "contact", width: 150 },
    { 
      title: "Job ID", 
      dataIndex: "jobId", 
      key: "jobId", 
      width: 100,
      render: (id) => (
        <a
          onClick={() => navigate(`/home/job-requirments/job-details/${id}`)}
          style={{ color: "#1890ff", cursor: "pointer", fontWeight: 500 }}
        >
          {id}
        </a>
      ),
    },
    { 
      title: "Job Title", 
      dataIndex: "jobTitle", 
      key: "jobTitle", 
      width: 200,
    },
    { title: "Experience", dataIndex: "experience", key: "experience", width: 120 },
    { 
      title: "Skills", 
      dataIndex: "skills", 
      key: "skills", 
      width: 350,
      render: (skills) => (
        <>
          {Array.isArray(skills) ? (
            skills.map((skillObj, index) => (
              <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
                {skillObj.skill} - {skillObj.level}
              </Tag>
            ))
          ) : (
            <span>{skills}</span>
          )}
        </>
      ),
    },
    { title: "Partner Organization", dataIndex: "partnerOrg", key: "partnerOrg", width: 180 },
    { title: "Expected Salary", dataIndex: "expectedSalary", key: "expectedSalary", width: 150 },
    { title: "Submitted On", dataIndex: "submittedOn", key: "submittedOn", width: 120 },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => {
        let color = "default";
        if (status === "Under Review") color = "blue";
        if (status === "Shortlisted") color = "green";
        if (status === "Interview Scheduled") color = "cyan";
        if (status === "Rejected") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: "View Profile",
              },
              {
                key: "resume",
                label: "View Resume",
                icon: <FilePdfOutlined />,
              },
              {
                key: "interview",
                label: "Schedule Interview",
              },
              {
                key: "reject",
                label: "Reject",
                danger: true,
              },
            ],
          }}
          trigger={["click"]}
        >
          <MoreOutlined style={{ cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  // Jobs Fulfilled columns
  const jobsFulfilledColumns = [
    { 
      title: "Job Id", 
      dataIndex: "id", 
      key: "id",
      render: (id) => (
        <a
          onClick={() => navigate(`/home/job-requirments/job-details/${id}`)}
          style={{ color: "#1890ff", cursor: "pointer", fontWeight: 500 }}
        >
          {id}
        </a>
      ),
    },
    { title: "Job Title", dataIndex: "role", key: "role" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Type", dataIndex: "engagement_type", key: "engagement_type" },
    { title: "Positions", dataIndex: "requirement_count", key: "requirement_count" },
    { 
      title: "Talents Hired", 
      dataIndex: "hired_count", 
      key: "hired_count",
      render: (count) => (
        <Tag color="green" icon={<CheckCircleOutlined />}>
          {count} Hired
        </Tag>
      ),
    },
    { title: "Budget", dataIndex: "budget", key: "budget" },
    { title: "Start Date", dataIndex: "start_date", key: "start_date" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Tooltip title="View Hired Talents">
          <Button 
            type="primary" 
            size="small"
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          >
            View Hired
          </Button>
        </Tooltip>
      ),
    },
  ];

  // Get columns based on active tab
  const getColumns = () => {
    if (activeTab === "Profiles Submitted") {
      return profilesSubmittedColumns;
    } else if (activeTab === "Jobs Fulfilled") {
      return jobsFulfilledColumns;
    }
    return activeJobsColumns;
  };


  // Filter data based on active tab
  const getFilteredData = () => {
    if (activeTab === "Profiles Submitted") {
      // Filter submitted profiles
      return submittedProfiles.filter((profile) => {
        const matchesSearch =
          profile.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          profile.profileId?.toLowerCase().includes(searchText.toLowerCase()) ||
          profile.jobTitle?.toLowerCase().includes(searchText.toLowerCase());

        // Treat undefined, null, and "all" as unfiltered state
        const matchesJob = !selectedJob || selectedJob === "all" || profile.jobId === selectedJob;
        const matchesStatus = !selectedStatus || selectedStatus === "all" || profile.status === selectedStatus;

        return matchesSearch && matchesJob && matchesStatus;
      });
    } else {
      // Filter jobs (Active Jobs and Jobs Fulfilled)
      return usersData
        .filter((user) => user.type === activeTab)
        .filter((user) =>
          user.name?.toLowerCase().includes(searchText.toLowerCase())
        );
    }
  };

  //const filteredData = getFilteredData();
  const filteredData = usersData;

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

  const activeJobsCount = usersData.length;
  const profilesSubmittedCount = submittedProfiles.length; // Count of all submitted profiles
  const jobsFulfilledCount = usersData.length;

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
        
        {activeTab === "Profiles Submitted" ? (
          <div style={{ marginBottom: "20px" }}>
            <Flex align="start" justify="space-between" style={{ marginBottom: "16px" }}>
              <Flex gap="middle">
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Search by name, profile ID, or job title"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: "300px" }}
                  allowClear
                />
                <Select
                  placeholder="Filter by Job"
                  value={selectedJob}
                  onChange={setSelectedJob}
                  style={{ width: 200 }}
                  allowClear
                >
                  <Option value="all">All Jobs</Option>
                  <Option value="JOB001">JOB001 - Senior React Developer</Option>
                  <Option value="JOB002">JOB002 - Full Stack Developer</Option>
                  <Option value="JOB003">JOB003 - Backend Developer</Option>
                </Select>
                <Select
                  placeholder="Filter by Status"
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  style={{ width: 200 }}
                  allowClear
                >
                  <Option value="all">All Status</Option>
                  <Option value="Under Review">Under Review</Option>
                  <Option value="Shortlisted">Shortlisted</Option>
                  <Option value="Interview Scheduled">Interview Scheduled</Option>
                  <Option value="Rejected">Rejected</Option>
                </Select>
              </Flex>
            </Flex>
          </div>
        ) : (
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
        )}
        <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
          columns={getColumns()}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
        />
        
    </UserManagementWrapper>
  );
};

export default JobRequirments;
