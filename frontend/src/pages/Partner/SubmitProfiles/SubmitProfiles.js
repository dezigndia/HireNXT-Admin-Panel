import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Table,
  Tag,
  Button,
  Tooltip,
  Modal,
  Input,
  Typography,
  Form,
  Upload,
  Row,
  Col,
  Select,
  Flex,
} from "antd";
import {
  ArrowLeftOutlined,
  FilePdfOutlined,
  DownloadOutlined,
  TeamOutlined,
  UserAddOutlined,
  DollarOutlined,
  CalendarOutlined,
  MessageOutlined,
  SearchOutlined,
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { SubmitProfilesWrapper } from "./SubmitProfiles.style";
import axios from "axios";
import { API_CONST } from "../../../const";

const { Title, Text } = Typography;
const { Option } = Select;

const mockBenchResources = [
  {
    id: "BR-001",
    name: "Sanjay Kumar",
    role: "Apigee Developer",
    topSkills: [
      { skill: "OpenAPISpec documentation", level: "Expert" },
      { skill: "API monitoring (Splunk, Datadog)", level: "Expert" },
    ],
    monthlyRate: "₹55,000",
    experience: "2.4 Year",
  },
  {
    id: "BR-002",
    name: "Gaurav Ambekar",
    role: "Apigee Developer",
    topSkills: [
      { skill: "OpenAPISpec documentation", level: "Expert" },
      { skill: "API monitoring (Splunk, Datadog)", level: "Expert" },
    ],
    monthlyRate: "₹55,000",
    experience: "2.4 Year",
  },
  {
    id: "BR-003",
    name: "Priya Sharma",
    role: "Full Stack Developer",
    topSkills: [
      { skill: "React.js", level: "Expert" },
      { skill: "Node.js", level: "Advanced" },
    ],
    monthlyRate: "₹65,000",
    experience: "3.5 Year",
  },
  {
    id: "BR-004",
    name: "Rahul Verma",
    role: "DevOps Engineer",
    topSkills: [
      { skill: "AWS", level: "Expert" },
      { skill: "Kubernetes", level: "Advanced" },
    ],
    monthlyRate: "₹70,000",
    experience: "4.0 Year",
  },
  {
    id: "BR-005",
    name: "Anjali Patel",
    role: "Python Developer",
    topSkills: [
      { skill: "Django", level: "Expert" },
      { skill: "FastAPI", level: "Advanced" },
    ],
    monthlyRate: "₹60,000",
    experience: "3.2 Year",
  },
];

const mockJobDetails = {
  "JOB-2024-001": {
    id: "JOB-2024-001",
    title: "Senior React Developer",
    type: "Full Time Contract",
    salary: "₹15-20 LPA",
    location: "Remote",
    openPositions: 3,
    salaryPerMonth: "₹1,50,000",
    projectDuration: "6 months",
    communication: "Excellent",
    primarySkills: [
      { skill: "React.js", level: "Expert" },
      { skill: "TypeScript", level: "Advanced" },
      { skill: "Redux", level: "Expert" },
      { skill: "Next.js", level: "Advanced" },
    ],
    description:
      "We are looking for an experienced Senior React Developer with 5 to 7 years of experience.",
    submittedProfiles: [
      {
        id: 1,
        name: "Akshay Joshi",
        role: "React Developer",
        skills: [
          { skill: "React", level: "Expert" },
          { skill: "TypeScript", level: "Advanced" },
        ],
        monthlyRate: "₹ 1,25,000",
        experience: "6.2 Year",
        noticePeriod: "30 Days",
        resumeUrl: "#",
        status: "submitted",
      },
      {
        id: 2,
        name: "Priya Sharma",
        role: "Senior React Developer",
        skills: [
          { skill: "React", level: "Expert" },
          { skill: "Redux", level: "Expert" },
        ],
        monthlyRate: "₹ 1,40,000",
        experience: "7.0 Year",
        noticePeriod: "45 Days",
        resumeUrl: "#",
        status: "submitted",
      },
    ],
  },
  "JOB-2024-002": {
    id: "JOB-2024-002",
    title: "Full Stack Java Developer",
    type: "Full Time Contract",
    salary: "₹12-18 LPA",
    location: "Bangalore",
    openPositions: 2,
    salaryPerMonth: "₹1,20,000",
    projectDuration: "12 months",
    communication: "Good",
    primarySkills: [
      { skill: "Java", level: "Expert" },
      { skill: "Spring Boot", level: "Advanced" },
      { skill: "Microservices", level: "Expert" },
      { skill: "Angular", level: "Advanced" },
    ],
    description:
      "Looking for a Full Stack Java Developer with 4 to 6 years of experience.",
    submittedProfiles: [
      {
        id: 3,
        name: "Rahul Kumar",
        role: "Java Developer",
        skills: [
          { skill: "Java", level: "Expert" },
          { skill: "Spring Boot", level: "Advanced" },
        ],
        monthlyRate: "₹ 95,000",
        experience: "4.5 Year",
        noticePeriod: "30 Days",
        resumeUrl: "#",
        status: "submitted",
      },
    ],
  },
  "JOB-2024-003": {
    id: "JOB-2024-003",
    title: "DevOps Engineer",
    type: "Full Time",
    salary: "₹10-15 LPA",
    location: "Hyderabad",
    openPositions: 1,
    salaryPerMonth: "₹1,10,000",
    projectDuration: "Permanent",
    communication: "Excellent",
    primarySkills: [
      { skill: "AWS", level: "Expert" },
      { skill: "Docker", level: "Advanced" },
      { skill: "Kubernetes", level: "Expert" },
      { skill: "Jenkins", level: "Advanced" },
    ],
    description:
      "Looking for an experienced DevOps Engineer with 3 to 5 years of experience.",
    submittedProfiles: [],
  },
  "JOB-2024-004": {
    id: "JOB-2024-004",
    title: "Python Backend Developer",
    type: "Full Time",
    salary: "₹8-12 LPA",
    location: "Pune",
    openPositions: 4,
    salaryPerMonth: "₹85,000",
    projectDuration: "9 months",
    communication: "Good",
    primarySkills: [
      { skill: "Python", level: "Expert" },
      { skill: "Django", level: "Advanced" },
      { skill: "FastAPI", level: "Expert" },
      { skill: "PostgreSQL", level: "Advanced" },
    ],
    description:
      "Looking for a Python Backend Developer with 2 to 4 years of experience.",
    submittedProfiles: [
      {
        id: 4,
        name: "Neha Gupta",
        role: "Python Developer",
        skills: [
          { skill: "Python", level: "Expert" },
          { skill: "Django", level: "Advanced" },
        ],
        monthlyRate: "₹ 70,000",
        experience: "3.0 Year",
        noticePeriod: "30 Days",
        resumeUrl: "#",
        status: "submitted",
      },
    ],
  },
  "JOB-2024-005": {
    id: "JOB-2024-005",
    title: "Mobile App Developer (React Native)",
    type: "Contract",
    salary: "₹12-16 LPA",
    location: "Remote",
    openPositions: 2,
    salaryPerMonth: "₹1,15,000",
    projectDuration: "8 months",
    communication: "Excellent",
    primarySkills: [
      { skill: "React Native", level: "Expert" },
      { skill: "JavaScript", level: "Advanced" },
      { skill: "TypeScript", level: "Expert" },
      { skill: "Redux", level: "Advanced" },
    ],
    description:
      "Looking for a Mobile App Developer with 3 to 5 years of experience in React Native.",
    submittedProfiles: [],
  },
};

const SubmitProfiles = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const jobData = mockJobDetails[jobId];
  const [profiles, setProfiles] = useState([]);
  const [benchModalVisible, setBenchModalVisible] = useState(false);
  const [addResourceModalVisible, setAddResourceModalVisible] = useState(false);
  const [selectedResources, setSelectedResources] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
  const [resume, setResume] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [pan, setPan] = useState(null);
  const [degree, setDegree] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (jobData) {
      setProfiles(jobData.submittedProfiles || []);
    }
  }, [jobId, jobData]);

  if (!jobData) {
    return (
      <SubmitProfilesWrapper>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Job not found</h2>
          <Button
            type="primary"
            onClick={() => navigate("/partner/ongoing-jobs")}
          >
            Back to Ongoing Jobs
          </Button>
        </div>
      </SubmitProfilesWrapper>
    );
  }

  const handleBenchPoolClick = () => {
    setBenchModalVisible(true);
  };

  const handleAddResourceClick = () => {
    setAddResourceModalVisible(true);
    setCurrentStep(0);
  };

  const handleBenchModalClose = () => {
    setBenchModalVisible(false);
    setSearchText("");
    setSelectedResources([]);
  };

  const handleAddResourceModalClose = () => {
    setAddResourceModalVisible(false);
    form.resetFields();
    setResume(null);
    setAadhar(null);
    setPan(null);
    setDegree(null);
    setCurrentStep(0);
  };

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(1);
    }).catch((error) => {
      console.log("Validation failed:", error);
    });
  };

  const handleBack = () => {
    setCurrentStep(0);
  };

  const handleResourceSelection = (record, selected) => {
    if (selected) {
      setSelectedResources([...selectedResources, record]);
    } else {
      setSelectedResources(selectedResources.filter((r) => r.id !== record.id));
    }
  };

  const handleSelectAll = (selected, selectedRows) => {
    if (selected) {
      setSelectedResources(selectedRows);
    } else {
      setSelectedResources([]);
    }
  };

  const handleRemoveSelected = (resourceId) => {
    setSelectedResources(selectedResources.filter((r) => r.id !== resourceId));
  };

  const handleAddResources = () => {
    console.log("Adding resources:", selectedResources);
    setBenchModalVisible(false);
    setSearchText("");
    setSelectedResources([]);
  };

  const handleSubmitNewResource = async (values) => {
    const data = new FormData();
    if (resume) data.append("resume", resume);
    if (aadhar) data.append("Aadhar", aadhar);
    if (pan) data.append("pan", pan);
    if (degree) data.append("degree", degree);
    if (values) data.append("data", JSON.stringify(values));

    try {
      const response = await axios.post(API_CONST.ADD_TALENT_PROFILE, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Resource added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    handleAddResourceModalClose();
  };

  const handleWithdrawProfile = (record) => {
    Modal.confirm({
      title: "Withdraw Profile",
      content: `Are you sure you want to withdraw ${record.name}'s profile from this job?`,
      okText: "Yes, Withdraw",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => {
        const updatedProfiles = profiles.filter((p) => p.id !== record.id);
        setProfiles(updatedProfiles);
        message.success(`${record.name}'s profile has been withdrawn successfully`);
      },
    });
  };

  const filteredBenchResources = mockBenchResources.filter(
    (resource) =>
      resource.name.toLowerCase().includes(searchText.toLowerCase()) ||
      resource.role.toLowerCase().includes(searchText.toLowerCase()) ||
      resource.topSkills.some((s) =>
        s.skill.toLowerCase().includes(searchText.toLowerCase())
      )
  );

  const rowSelection = {
    selectedRowKeys: selectedResources.map((r) => r.id),
    onSelect: handleResourceSelection,
    onSelectAll: handleSelectAll,
  };

  const benchColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 160,
      render: (text, record) => (
        <a
          href={`/partner/talent-details/${record.id}`}
          style={{ color: "#1890ff", fontWeight: 600, fontSize: "13px" }}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/partner/talent-details/${record.id}`);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 180,
      render: (text) => <Text style={{ color: "#595959", fontSize: "13px" }}>{text}</Text>,
    },
    {
      title: "Top Skills",
      dataIndex: "topSkills",
      key: "topSkills",
      width: 260,
      render: (skills) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {skills.map((skill, index) => (
            <Tag key={index} color="cyan" style={{ marginBottom: 4, fontSize: "12px" }}>
              {skill.skill} - {skill.level}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Monthly Rate",
      dataIndex: "monthlyRate",
      key: "monthlyRate",
      width: 130,
      render: (text) => (
        <Text strong style={{ color: "#00d9a9", fontSize: "13px" }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      width: 110,
      render: (text) => <Text style={{ fontSize: "13px" }}>{text}</Text>,
    },
  ];

  const columns = [
    {
      title: "Resume",
      dataIndex: "resumeUrl",
      key: "resume",
      width: 80,
      render: (url) => (
        <Tooltip title="View Resume">
          <FilePdfOutlined
            style={{ fontSize: 24, color: "#ff4d4f", cursor: "pointer" }}
            onClick={() => window.open(url, "_blank")}
          />
        </Tooltip>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name) => (
        <span style={{ color: "#014c75", fontWeight: 500 }}>{name}</span>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 180,
    },
    {
      title: "Top Skills",
      dataIndex: "skills",
      key: "skills",
      width: 300,
      render: (skills) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {skills.map((skill, index) => (
            <Tag key={index} color="cyan" style={{ margin: "2px 0" }}>
              {skill.skill} - {skill.level}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Monthly Rate",
      dataIndex: "monthlyRate",
      key: "monthlyRate",
      width: 120,
      render: (rate) => (
        <span style={{ fontWeight: 600, color: "#00d9a9" }}>{rate}</span>
      ),
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      width: 100,
    },
    {
      title: "Notice Period",
      dataIndex: "noticePeriod",
      key: "noticePeriod",
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      width: 180,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Tooltip title="Download Resume">
            <Button
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => window.open(record.resumeUrl, "_blank")}
            />
          </Tooltip>
          <Tooltip title="Withdraw Profile">
            <Button
              danger
              size="small"
              onClick={() => handleWithdrawProfile(record)}
            >
              Withdraw
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <SubmitProfilesWrapper>
      <div className="header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/partner/ongoing-jobs")}
          className="back-button"
        >
          Back to Ongoing Jobs
        </Button>
        <h2>Submit Profiles</h2>
      </div>

      <Card className="job-summary-card">
        <div className="job-header">
          <div className="job-id">Job id: {jobData.id}</div>
          <h2 className="job-title">{jobData.title}</h2>
          <div className="job-meta">
            <Tag color="blue">{jobData.type}</Tag>
            <Tag color="cyan">{jobData.location}</Tag>
            <Tag color="green">Open Position: {jobData.openPositions}</Tag>
          </div>
        </div>

        <div className="metrics-row">
          <div className="metric-box">
            <div className="metric-icon" style={{ background: "#e6fff9" }}>
              <DollarOutlined style={{ fontSize: 24, color: "#00d9a9" }} />
            </div>
            <div className="metric-info">
              <h3>{jobData.salaryPerMonth}</h3>
              <p>Salary/month</p>
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-icon" style={{ background: "#fff7e6" }}>
              <CalendarOutlined style={{ fontSize: 24, color: "#faad14" }} />
            </div>
            <div className="metric-info">
              <h3>{jobData.projectDuration}</h3>
              <p>Project Duration</p>
            </div>
          </div>
          <div className="metric-box">
            <div className="metric-icon" style={{ background: "#f6ffed" }}>
              <MessageOutlined style={{ fontSize: 24, color: "#52c41a" }} />
            </div>
            <div className="metric-info">
              <h3>{jobData.communication}</h3>
              <p>Communication</p>
            </div>
          </div>
        </div>

        <div className="primary-skills">
          <span className="skills-label">Primary Skills:</span>
          {jobData.primarySkills.map((skill, index) => (
            <Tag key={index} color="cyan" className="skill-tag">
              {skill.skill} - {skill.level}
            </Tag>
          ))}
        </div>
      </Card>

      <div className="profiles-section">
        <div className="profiles-header">
          <h3 className="section-title">
            Profiles Submitted ({profiles.length})
          </h3>
          <div className="action-buttons">
            <Button
              type="default"
              icon={<TeamOutlined />}
              size="large"
              className="bench-pool-btn"
              onClick={handleBenchPoolClick}
            >
              Add from Bench Pool
            </Button>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              size="large"
              className="add-resource-btn"
              onClick={handleAddResourceClick}
            >
              Add New Resource
            </Button>
          </div>
        </div>

        <Card className="profiles-table-card">
          <Table
            columns={columns}
            dataSource={profiles}
            rowKey="id"
            pagination={false}
            scroll={{ x: 1200 }}
            locale={{
              emptyText:
                "No profiles submitted yet. Click 'Add from Bench Pool' or 'Add New Resource' to submit profiles.",
            }}
          />
        </Card>
      </div>

      <Modal
        open={benchModalVisible}
        onCancel={handleBenchModalClose}
        footer={null}
        width={920}
        className="bench-pool-modal"
      >
        <Flex
          justify="center"
          vertical
          align="center"
          style={{ borderBottom: "1px solid #e8e8e8", marginBottom: "24px", paddingBottom: "16px" }}
        >
          <Text style={{ fontSize: "28px", fontWeight: 600, color: "#014c75" }}>
            Add Resource from my resources
          </Text>
        </Flex>
        <div className="modal-content">
          <div className="search-wrapper">
            <Input
              placeholder="Search by name, role, or skill"
              prefix={<SearchOutlined style={{ color: "#bfbfbf", fontSize: "16px" }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              size="large"
              className="modal-search"
              allowClear
              style={{
                borderRadius: "8px",
                border: "1px solid #d9d9d9",
                fontSize: "14px",
              }}
            />
          </div>

          <Table
            columns={benchColumns}
            dataSource={filteredBenchResources}
            rowKey="id"
            rowSelection={rowSelection}
            pagination={false}
            scroll={{ y: 320 }}
            className="bench-table"
            size="middle"
          />

          {selectedResources.length > 0 && (
            <div className="selected-section">
              <Text strong style={{ color: "#014c75", fontSize: "15px", marginBottom: "12px", display: "block" }}>
                Resources Selected: {selectedResources.length}
              </Text>
              <div className="selected-tags">
                {selectedResources.map((resource) => (
                  <Tag
                    key={resource.id}
                    closable
                    onClose={() => handleRemoveSelected(resource.id)}
                    className="selected-tag"
                    style={{
                      padding: "6px 12px",
                      fontSize: "13px",
                      borderRadius: "6px",
                      background: "#e6fff9",
                      border: "1px solid #00d9a9",
                      color: "#014c75",
                      marginBottom: "8px",
                    }}
                  >
                    {resource.name}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          <div className="modal-footer">
            <Button
              type="primary"
              size="large"
              onClick={handleAddResources}
              disabled={selectedResources.length === 0}
              className="add-resource-btn-modal"
            >
              Add Resource
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={addResourceModalVisible}
        onCancel={handleAddResourceModalClose}
        footer={null}
        width={900}
        className="add-resource-modal"
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto", padding: "24px" }}
      >
        <Flex
          justify="center"
          vertical
          align="center"
          style={{
            borderBottom: "1px solid #e8e8e8",
            marginBottom: "24px",
            paddingBottom: "16px",
          }}
        >
          <Text style={{ fontSize: "28px", fontWeight: 600, color: "#014c75" }}>
            Add Bench Resource {currentStep === 0 ? "(Step 1/2)" : "(Step 2/2)"}
          </Text>
        </Flex>
        <Form form={form} layout="vertical" onFinish={handleSubmitNewResource}>
          {/* Step 1: Basic Information */}
          {currentStep === 0 && (
            <>
          <Form.Item label="Upload Resume">
            <Upload
              beforeUpload={(file) => {
                setResume(file);
                return false;
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {resume && (
              <div style={{ marginTop: "10px" }}>
                {resume.name}{" "}
                <Button onClick={() => setResume(null)} size="small">
                  ✖
                </Button>
              </div>
            )}
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter the name!" }]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select a role!" }]}
              >
                <Select placeholder="Select Role">
                  <Option value="Software Engineer">Software Engineer</Option>
                  <Option value="Project Manager">Project Manager</Option>
                  <Option value="Full Stack Developer">
                    Full Stack Developer
                  </Option>
                  <Option value="DevOps Engineer">DevOps Engineer</Option>
                  <Option value="Python Developer">Python Developer</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Experience">
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item name="experienceYears" noStyle>
                      <Input placeholder="Years" type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="experienceMonths" noStyle>
                      <Input placeholder="Months" type="number" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item label="Technical Skills">
            <Form.List name="skills">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={16} style={{ marginBottom: 8 }}>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          name={[name, 'skill']}
                          rules={[{ required: true, message: 'Please enter skill name' }]}
                        >
                          <Input placeholder="Skill Name (e.g., React, Python)" />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          name={[name, 'level']}
                          rules={[{ required: true, message: 'Please select proficiency' }]}
                        >
                          <Select placeholder="Proficiency Level">
                            <Option value="Expert">Expert</Option>
                            <Option value="Advanced">Advanced</Option>
                            <Option value="Intermediate">Intermediate</Option>
                            <Option value="Beginner">Beginner</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          style={{ color: '#ff4d4f', fontSize: '18px', marginTop: '8px' }}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Skill
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Monthly Rate" name="rate">
                <Input placeholder="Enter Monthly Rate" prefix="₹" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Notice Period" name="notice">
                <Input placeholder="Enter Notice Period (e.g., 30 days)" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input placeholder="Enter email address" type="email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone" name="phone">
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Hourly Rate" name="hourlyRate">
                <Input placeholder="Enter Hourly Rate" prefix="₹" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Location" name="location">
                <Select placeholder="Select Location">
                  <Option value="Bangalore">Bangalore</Option>
                  <Option value="Mumbai">Mumbai</Option>
                  <Option value="Pune">Pune</Option>
                  <Option value="Hyderabad">Hyderabad</Option>
                  <Option value="Delhi">Delhi</Option>
                  <Option value="Chennai">Chennai</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Availability" name="availability">
                <Select placeholder="Select Availability">
                  <Option value="Immediately Available">Immediately Available</Option>
                  <Option value="Available in 2 weeks">Available in 2 weeks</Option>
                  <Option value="Available in 1 month">Available in 1 month</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          </>
          )}

          {/* Step 2: Optional Information */}
          {currentStep === 1 && (
            <>
          <Form.Item label="Professional Summary (Optional)" name="summary">
            <Input.TextArea 
              rows={4} 
              placeholder="Enter professional summary highlighting key skills, experience, and expertise..." 
            />
          </Form.Item>
          
          <Form.Item label="Project Experience (Optional)">
            <Form.List name="projects">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card
                      key={key}
                      size="small"
                      style={{ marginBottom: 16, background: '#fafafa' }}
                      extra={
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          style={{ color: '#ff4d4f', fontSize: '16px' }}
                        />
                      }
                    >
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'title']}
                            label="Project Title"
                            rules={[{ required: true, message: 'Please enter project title' }]}
                          >
                            <Input placeholder="e.g., E-commerce Platform Development" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'client']}
                            label="Client"
                          >
                            <Input placeholder="e.g., Fortune 500 Company" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'duration']}
                            label="Duration"
                          >
                            <Input placeholder="e.g., 6 months" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'role']}
                            label="Your Role"
                          >
                            <Input placeholder="e.g., Lead Developer" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'technologies']}
                            label="Technologies"
                          >
                            <Input placeholder="e.g., React, Node.js, MongoDB" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                        {...restField}
                        name={[name, 'description']}
                        label="Description"
                      >
                        <Input.TextArea
                          rows={3}
                          placeholder="Describe the project, your contributions, and achievements..."
                        />
                      </Form.Item>
                    </Card>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Project
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Upload Aadhar Card">
                <Upload
                  beforeUpload={(file) => {
                    setAadhar(file);
                    return false;
                  }}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Aadhar</Button>
                </Upload>
                {aadhar && (
                  <div style={{ marginTop: "10px" }}>
                    {aadhar.name}{" "}
                    <Button onClick={() => setAadhar(null)} size="small">
                      ✖
                    </Button>
                  </div>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Upload PAN Card">
                <Upload
                  beforeUpload={(file) => {
                    setPan(file);
                    return false;
                  }}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload PAN</Button>
                </Upload>
                {pan && (
                  <div style={{ marginTop: "10px" }}>
                    {pan.name}{" "}
                    <Button onClick={() => setPan(null)} size="small">
                      ✖
                    </Button>
                  </div>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Upload Degree Proof">
                <Upload
                  beforeUpload={(file) => {
                    setDegree(file);
                    return false;
                  }}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Degree</Button>
                </Upload>
                {degree && (
                  <div style={{ marginTop: "10px" }}>
                    {degree.name}{" "}
                    <Button onClick={() => setDegree(null)} size="small">
                      ✖
                    </Button>
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>
          </>
          )}

          {/* Action Buttons */}
          <Form.Item style={{ marginTop: "24px", marginBottom: 0 }}>
            <Flex justify="flex-end" gap={12}>
              <Button onClick={handleAddResourceModalClose}>Cancel</Button>
              {currentStep === 0 && (
                <Button type="primary" onClick={handleNext}>
                  Next
                </Button>
              )}
              {currentStep === 1 && (
                <>
                  <Button onClick={handleBack}>Back</Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ background: "#00d9a9", borderColor: "#00d9a9" }}
                  >
                    Submit
                  </Button>
                </>
              )}
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </SubmitProfilesWrapper>
  );
};

export default SubmitProfiles;
