import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  Tag,
  Space,
  message,
  Dropdown,
  Avatar,
  Typography,
  Flex,
} from "antd";
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { UserManagementWrapper } from "../UserManagement/UserManagement.style";
import MaskGroup from "../../../assets/Mask-Group.svg";

const { TextArea } = Input;
const { Text } = Typography;

// Mock data for Partners/Customers
const mockPartnersCustomers = [
  {
    key: "1",
    name: "TechCorp Solutions",
    type: "Partner",
    contactPerson: "Rajesh Kumar",
    email: "rajesh@techcorp.com",
    phone: "+91-9876543210",
    location: "Bangalore",
    registeredOn: "15-Oct-24",
    status: "Pending",
  },
  {
    key: "2",
    name: "Infosys Limited",
    type: "Customer",
    contactPerson: "Priya Sharma",
    email: "priya@infosys.com",
    phone: "+91-9876543211",
    location: "Mumbai",
    registeredOn: "16-Oct-24",
    status: "Pending",
  },
  {
    key: "3",
    name: "Digital Partners Inc",
    type: "Partner",
    contactPerson: "Amit Patel",
    email: "amit@digitalpartners.com",
    phone: "+91-9876543212",
    location: "Pune",
    registeredOn: "17-Oct-24",
    status: "Pending",
  },
  {
    key: "4",
    name: "Wipro Technologies",
    type: "Customer",
    contactPerson: "Sneha Reddy",
    email: "sneha@wipro.com",
    phone: "+91-9876543213",
    location: "Hyderabad",
    registeredOn: "18-Oct-24",
    status: "Pending",
  },
];

// Mock data for Talent Profiles
const mockTalentProfiles = [
  {
    key: "1",
    name: "Vikram Singh",
    role: "Senior React Developer",
    skills: "React.js, Node.js, MongoDB",
    experience: "5 years 3 months",
    location: "Bangalore",
    monthlyRate: "₹1,80,000",
    partnerOrg: "TechCorp Solutions",
    submittedOn: "19-Oct-24",
    status: "Pending",
  },
  {
    key: "2",
    name: "Anjali Gupta",
    role: "Full Stack Developer",
    skills: "Angular, Java, MySQL",
    experience: "4 years 6 months",
    location: "Delhi",
    monthlyRate: "₹1,50,000",
    partnerOrg: "Digital Partners Inc",
    submittedOn: "20-Oct-24",
    status: "Pending",
  },
  {
    key: "3",
    name: "Karthik Menon",
    role: "DevOps Engineer",
    skills: "AWS, Docker, Kubernetes",
    experience: "6 years 1 month",
    location: "Chennai",
    monthlyRate: "₹2,00,000",
    partnerOrg: "TechCorp Solutions",
    submittedOn: "21-Oct-24",
    status: "Pending",
  },
  {
    key: "4",
    name: "Meera Shah",
    role: "UI/UX Designer",
    skills: "Figma, Adobe XD, Sketch",
    experience: "3 years 8 months",
    location: "Mumbai",
    monthlyRate: "₹1,20,000",
    partnerOrg: "Digital Partners Inc",
    submittedOn: "22-Oct-24",
    status: "Pending",
  },
];

// Mock data for Job Posts
const mockJobPosts = [
  {
    key: "1",
    jobTitle: "Senior React Developer",
    company: "Infosys Limited",
    location: "Bangalore",
    experience: "5+ years",
    skills: "React.js, Redux, TypeScript",
    budget: "₹1,80,000 - ₹2,20,000",
    positions: 3,
    postedOn: "23-Oct-24",
    status: "Pending",
  },
  {
    key: "2",
    jobTitle: "Java Backend Developer",
    company: "Wipro Technologies",
    location: "Hyderabad",
    experience: "4+ years",
    skills: "Java, Spring Boot, Microservices",
    budget: "₹1,50,000 - ₹1,90,000",
    positions: 2,
    postedOn: "24-Oct-24",
    status: "Pending",
  },
  {
    key: "3",
    jobTitle: "DevOps Engineer",
    company: "Infosys Limited",
    location: "Mumbai",
    experience: "6+ years",
    skills: "AWS, Jenkins, Terraform",
    budget: "₹2,00,000 - ₹2,50,000",
    positions: 1,
    postedOn: "25-Oct-24",
    status: "Pending",
  },
];

const ApprovalProcess = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Partners/Customers");
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [currentRejectRecord, setCurrentRejectRecord] = useState(null);
  const [form] = Form.useForm();

  // State for each data type
  const [partnersData, setPartnersData] = useState(mockPartnersCustomers);
  const [talentsData, setTalentsData] = useState(mockTalentProfiles);
  const [jobsData, setJobsData] = useState(mockJobPosts);

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "Partners/Customers":
        return partnersData;
      case "Talent Profiles":
        return talentsData;
      case "Job Posts":
        return jobsData;
      default:
        return [];
    }
  };

  // Get pending counts for each tab
  const getPendingCounts = () => {
    return {
      partners: partnersData.filter((item) => item.status === "Pending").length,
      talents: talentsData.filter((item) => item.status === "Pending").length,
      jobs: jobsData.filter((item) => item.status === "Pending").length,
    };
  };

  const pendingCounts = getPendingCounts();

  // Filter data based on search
  const filteredData = getCurrentData().filter((item) => {
    const searchLower = searchText.toLowerCase();
    if (activeTab === "Partners/Customers") {
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.contactPerson.toLowerCase().includes(searchLower) ||
        item.email.toLowerCase().includes(searchLower)
      );
    } else if (activeTab === "Talent Profiles") {
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.role.toLowerCase().includes(searchLower) ||
        item.skills.toLowerCase().includes(searchLower)
      );
    } else {
      return (
        item.jobTitle.toLowerCase().includes(searchLower) ||
        item.company.toLowerCase().includes(searchLower) ||
        item.skills.toLowerCase().includes(searchLower)
      );
    }
  });

  // Handle single approve
  const handleApprove = (record) => {
    const updateData = (data, key) =>
      data.map((item) =>
        item.key === key ? { ...item, status: "Approved" } : item
      );

    if (activeTab === "Partners/Customers") {
      setPartnersData(updateData(partnersData, record.key));
      message.success(
        `${record.type} "${record.name}" has been approved and is now active!`
      );
    } else if (activeTab === "Talent Profiles") {
      setTalentsData(updateData(talentsData, record.key));
      message.success(
        `Talent profile "${record.name}" has been approved and is now active!`
      );
    } else {
      setJobsData(updateData(jobsData, record.key));
      message.success(
        `Job post "${record.jobTitle}" has been approved and is now active!`
      );
    }
  };

  // Handle bulk approve
  const handleBulkApprove = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select items to approve");
      return;
    }

    const updateData = (data) =>
      data.map((item) =>
        selectedRowKeys.includes(item.key)
          ? { ...item, status: "Approved" }
          : item
      );

    if (activeTab === "Partners/Customers") {
      setPartnersData(updateData(partnersData));
    } else if (activeTab === "Talent Profiles") {
      setTalentsData(updateData(talentsData));
    } else {
      setJobsData(updateData(jobsData));
    }

    message.success(`${selectedRowKeys.length} items approved successfully!`);
    setSelectedRowKeys([]);
  };

  // Handle reject with comment
  const handleRejectClick = (record) => {
    setCurrentRejectRecord(record);
    setRejectModalVisible(true);
  };

  const handleRejectSubmit = (values) => {
    const { comment } = values;

    const updateData = (data, key) =>
      data.map((item) =>
        item.key === key
          ? { ...item, status: "Rejected", rejectionComment: comment }
          : item
      );

    if (activeTab === "Partners/Customers") {
      setPartnersData(updateData(partnersData, currentRejectRecord.key));
      message.error(
        `${currentRejectRecord.type} "${currentRejectRecord.name}" has been rejected`
      );
    } else if (activeTab === "Talent Profiles") {
      setTalentsData(updateData(talentsData, currentRejectRecord.key));
      message.error(
        `Talent profile "${currentRejectRecord.name}" has been rejected`
      );
    } else {
      setJobsData(updateData(jobsData, currentRejectRecord.key));
      message.error(
        `Job post "${currentRejectRecord.jobTitle}" has been rejected`
      );
    }

    setRejectModalVisible(false);
    form.resetFields();
    setCurrentRejectRecord(null);
  };

  // Handle view actions
  const handleView = (record) => {
    if (activeTab === "Partners/Customers") {
      message.info(`Viewing ${record.type} profile: ${record.name}`);
      // Navigate to partner/customer profile page
    } else if (activeTab === "Talent Profiles") {
      // Navigate to talent details page
      navigate(`/home/talent-details/${record.key}`);
    } else {
      message.info(`Viewing job details: ${record.jobTitle}`);
      // Navigate to job details page
    }
  };

  // Create action menu for each row
  const getActionMenu = (record) => ({
    items: [
      {
        key: "view",
        label: "View Details",
        onClick: () => handleView(record),
      },
      ...(record.status === "Pending"
        ? [
            {
              key: "approve",
              label: "Approve",
              onClick: () => handleApprove(record),
            },
            {
              key: "reject",
              label: "Reject",
              onClick: () => handleRejectClick(record),
            },
          ]
        : []),
    ],
  });

  // Columns for Partners/Customers
  const partnersColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "Partner" ? "blue" : "green"}>{type}</Tag>
      ),
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Registered On",
      dataIndex: "registeredOn",
      key: "registeredOn",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Approved"
              ? "green"
              : status === "Rejected"
              ? "red"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown menu={getActionMenu(record)} trigger={["click"]}>
          <MoreOutlined style={{ cursor: "pointer", fontSize: "18px" }} />
        </Dropdown>
      ),
    },
  ];

  // Columns for Talent Profiles
  const talentsColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Monthly Rate",
      dataIndex: "monthlyRate",
      key: "monthlyRate",
    },
    {
      title: "Partner Org",
      dataIndex: "partnerOrg",
      key: "partnerOrg",
    },
    {
      title: "Submitted On",
      dataIndex: "submittedOn",
      key: "submittedOn",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Approved"
              ? "green"
              : status === "Rejected"
              ? "red"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown menu={getActionMenu(record)} trigger={["click"]}>
          <MoreOutlined style={{ cursor: "pointer", fontSize: "18px" }} />
        </Dropdown>
      ),
    },
  ];

  // Columns for Job Posts
  const jobsColumns = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
    },
    {
      title: "Budget Range",
      dataIndex: "budget",
      key: "budget",
    },
    {
      title: "Positions",
      dataIndex: "positions",
      key: "positions",
      render: (count) => <Tag color="blue">{count}</Tag>,
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
      key: "postedOn",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Approved"
              ? "green"
              : status === "Rejected"
              ? "red"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown menu={getActionMenu(record)} trigger={["click"]}>
          <MoreOutlined style={{ cursor: "pointer", fontSize: "18px" }} />
        </Dropdown>
      ),
    },
  ];

  // Get columns based on active tab
  const getColumns = () => {
    switch (activeTab) {
      case "Partners/Customers":
        return partnersColumns;
      case "Talent Profiles":
        return talentsColumns;
      case "Job Posts":
        return jobsColumns;
      default:
        return [];
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.status !== "Pending",
    }),
  };

  return (
    <UserManagementWrapper>
      <div style={{ padding: "20px" }}>
        <h2 className="title-header">Approval Process</h2>

        {/* Tabs Section */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {[
            { key: "Partners/Customers", count: pendingCounts.partners },
            { key: "Talent Profiles", count: pendingCounts.talents },
            { key: "Job Posts", count: pendingCounts.jobs },
          ].map((tab) => (
            <Button
              key={tab.key}
              className={
                activeTab === tab.key ? "tab-button active-tab" : "tab-button"
              }
              type={activeTab === tab.key ? "primary" : "default"}
              onClick={() => {
                setActiveTab(tab.key);
                setSelectedRowKeys([]);
                setSearchText("");
              }}
            >
              <Avatar
                size={50}
                className="icon-bg"
                style={{
                  backgroundColor: activeTab === tab.key ? "#ffffff" : "#E4F6FF",
                }}
                src={<img src={MaskGroup} alt="avatar" />}
              />
              &nbsp;{tab.count} {tab.key}
            </Button>
          ))}
        </div>

        {/* Search and Actions Section */}
        <Flex align="start" justify="space-between">
          <Input
            prefix={<SearchOutlined />}
            placeholder={`Search ${
              activeTab === "Partners/Customers"
                ? "by name, contact person, or email"
                : activeTab === "Talent Profiles"
                ? "by name, role, or skills"
                : "by job title, company, or skills"
            }`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
          />

          {selectedRowKeys.length > 0 && (
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={handleBulkApprove}
              style={{
                backgroundColor: "#52c41a",
                borderColor: "#52c41a",
              }}
            >
              Bulk Approve ({selectedRowKeys.length})
            </Button>
          )}
        </Flex>

        {/* Table */}
        <Table
          rowSelection={rowSelection}
          columns={getColumns()}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
        />

        {/* Reject with Comment Modal */}
        <Modal
          title="Reject with Comment"
          open={rejectModalVisible}
          onCancel={() => {
            setRejectModalVisible(false);
            form.resetFields();
            setCurrentRejectRecord(null);
          }}
          footer={null}
          width={500}
        >
          <Form
            form={form}
            onFinish={handleRejectSubmit}
            layout="vertical"
            style={{ marginTop: "20px" }}
          >
            <Form.Item
              label="Reason for Rejection"
              name="comment"
              rules={[
                {
                  required: true,
                  message: "Please provide a reason for rejection",
                },
                {
                  min: 10,
                  message: "Reason must be at least 10 characters long",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Enter detailed reason for rejection (minimum 10 characters)"
                maxLength={500}
                showCount
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
              <Space>
                <Button
                  onClick={() => {
                    setRejectModalVisible(false);
                    form.resetFields();
                    setCurrentRejectRecord(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  danger
                  icon={<CloseCircleOutlined />}
                >
                  Reject
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </UserManagementWrapper>
  );
};

export default ApprovalProcess;
