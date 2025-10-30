import React, { useState } from "react";
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
} from "antd";
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  UserOutlined,
  FileTextOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { ApprovalProcessWrapper } from "./ApprovalProcess.style";

const { TextArea } = Input;

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
  const [activeTab, setActiveTab] = useState("partners");
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
      case "partners":
        return partnersData;
      case "talents":
        return talentsData;
      case "jobs":
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
    if (activeTab === "partners") {
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.contactPerson.toLowerCase().includes(searchLower) ||
        item.email.toLowerCase().includes(searchLower)
      );
    } else if (activeTab === "talents") {
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

    if (activeTab === "partners") {
      setPartnersData(updateData(partnersData, record.key));
      message.success(
        `${record.type} "${record.name}" has been approved and is now active!`
      );
    } else if (activeTab === "talents") {
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

    if (activeTab === "partners") {
      setPartnersData(updateData(partnersData));
    } else if (activeTab === "talents") {
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

    if (activeTab === "partners") {
      setPartnersData(updateData(partnersData, currentRejectRecord.key));
      message.error(
        `${currentRejectRecord.type} "${currentRejectRecord.name}" has been rejected`
      );
    } else if (activeTab === "talents") {
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

  // Columns for Partners/Customers
  const partnersColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <span style={{ fontWeight: 600, color: "#014c75" }}>{name}</span>
      ),
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
        <span className={`status-tag status-${status.toLowerCase()}`}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) =>
        record.status === "Pending" ? (
          <div className="action-buttons">
            <Button
              className="approve-btn"
              size="small"
              icon={<CheckCircleOutlined />}
              onClick={() => handleApprove(record)}
            >
              Approve
            </Button>
            <Button
              className="reject-btn"
              size="small"
              icon={<CloseCircleOutlined />}
              onClick={() => handleRejectClick(record)}
            >
              Reject
            </Button>
          </div>
        ) : (
          <Tag color={record.status === "Approved" ? "green" : "red"}>
            {record.status}
          </Tag>
        ),
    },
  ];

  // Columns for Talent Profiles
  const talentsColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <span style={{ fontWeight: 600, color: "#014c75" }}>{name}</span>
      ),
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
      render: (skills) => (
        <span style={{ fontSize: "13px", color: "#666" }}>{skills}</span>
      ),
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
      render: (rate) => (
        <span style={{ fontWeight: 600, color: "#00d9a9" }}>{rate}</span>
      ),
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
        <span className={`status-tag status-${status.toLowerCase()}`}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) =>
        record.status === "Pending" ? (
          <div className="action-buttons">
            <Button
              className="approve-btn"
              size="small"
              icon={<CheckCircleOutlined />}
              onClick={() => handleApprove(record)}
            >
              Approve
            </Button>
            <Button
              className="reject-btn"
              size="small"
              icon={<CloseCircleOutlined />}
              onClick={() => handleRejectClick(record)}
            >
              Reject
            </Button>
          </div>
        ) : (
          <Tag color={record.status === "Approved" ? "green" : "red"}>
            {record.status}
          </Tag>
        ),
    },
  ];

  // Columns for Job Posts
  const jobsColumns = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
      render: (title) => (
        <span style={{ fontWeight: 600, color: "#014c75" }}>{title}</span>
      ),
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
      render: (skills) => (
        <span style={{ fontSize: "13px", color: "#666" }}>{skills}</span>
      ),
    },
    {
      title: "Budget Range",
      dataIndex: "budget",
      key: "budget",
      render: (budget) => (
        <span style={{ fontWeight: 600, color: "#00d9a9" }}>{budget}</span>
      ),
    },
    {
      title: "Positions",
      dataIndex: "positions",
      key: "positions",
      align: "center",
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
        <span className={`status-tag status-${status.toLowerCase()}`}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) =>
        record.status === "Pending" ? (
          <div className="action-buttons">
            <Button
              className="approve-btn"
              size="small"
              icon={<CheckCircleOutlined />}
              onClick={() => handleApprove(record)}
            >
              Approve
            </Button>
            <Button
              className="reject-btn"
              size="small"
              icon={<CloseCircleOutlined />}
              onClick={() => handleRejectClick(record)}
            >
              Reject
            </Button>
          </div>
        ) : (
          <Tag color={record.status === "Approved" ? "green" : "red"}>
            {record.status}
          </Tag>
        ),
    },
  ];

  // Get columns based on active tab
  const getColumns = () => {
    switch (activeTab) {
      case "partners":
        return partnersColumns;
      case "talents":
        return talentsColumns;
      case "jobs":
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
    <ApprovalProcessWrapper>
      <div className="approval-container">
        <h2 className="page-title">Approval Process</h2>

        {/* Tabs Section */}
        <div className="tabs-section">
          <Button
            className={
              activeTab === "partners" ? "tab-button active" : "tab-button"
            }
            onClick={() => {
              setActiveTab("partners");
              setSelectedRowKeys([]);
              setSearchText("");
            }}
            icon={<BankOutlined />}
          >
            Partners/Customers
            <span className="tab-count">{pendingCounts.partners}</span>
          </Button>
          <Button
            className={
              activeTab === "talents" ? "tab-button active" : "tab-button"
            }
            onClick={() => {
              setActiveTab("talents");
              setSelectedRowKeys([]);
              setSearchText("");
            }}
            icon={<UserOutlined />}
          >
            Talent Profiles
            <span className="tab-count">{pendingCounts.talents}</span>
          </Button>
          <Button
            className={activeTab === "jobs" ? "tab-button active" : "tab-button"}
            onClick={() => {
              setActiveTab("jobs");
              setSelectedRowKeys([]);
              setSearchText("");
            }}
            icon={<FileTextOutlined />}
          >
            Job Posts
            <span className="tab-count">{pendingCounts.jobs}</span>
          </Button>
        </div>

        {/* Search and Actions Section */}
        <div className="actions-section">
          <div className="left-actions">
            <Input
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              placeholder={`Search ${
                activeTab === "partners"
                  ? "by name, contact person, or email"
                  : activeTab === "talents"
                  ? "by name, role, or skills"
                  : "by job title, company, or skills"
              }`}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input"
              size="large"
              style={{ width: 420 }}
            />
          </div>

          <div className="right-actions">
            {selectedRowKeys.length > 0 && (
              <Button
                className="bulk-action-btn"
                icon={<CheckCircleOutlined />}
                onClick={handleBulkApprove}
              >
                Bulk Approve
                <span className="selected-count">{selectedRowKeys.length}</span>
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        <Table
          rowSelection={rowSelection}
          columns={getColumns()}
          dataSource={filteredData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 1200 }}
        />

        {/* Reject with Comment Modal */}
        <Modal
          title={null}
          open={rejectModalVisible}
          onCancel={() => {
            setRejectModalVisible(false);
            form.resetFields();
            setCurrentRejectRecord(null);
          }}
          footer={null}
          width={500}
        >
          <div className="modal-title">Reject with Comment</div>
          <Form form={form} onFinish={handleRejectSubmit} className="reject-form">
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
            <div className="modal-footer">
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
            </div>
          </Form>
        </Modal>
      </div>
    </ApprovalProcessWrapper>
  );
};

export default ApprovalProcess;
