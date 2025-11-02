import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Table, Tag, Button, Dropdown, Menu, Tooltip, Modal, Form, Input, Select, InputNumber } from "antd";
import {
  ArrowLeftOutlined,
  FilePdfOutlined,
  DownloadOutlined,
  MoreOutlined,
  DollarOutlined,
  CalendarOutlined,
  CommentOutlined,
  EditOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { JobDetailsWrapper } from "./AdminJobDetails.style";

const { Option } = Select;
const { TextArea } = Input;

// Mock data for Admin Job Details
const mockAdminJobDetails = {
  "JOB001": {
    id: "JOB001",
    role: "Senior React Developer",
    type: "Full Time",
    budget: "₹2,00,000",
    location: "Bangalore",
    openPositions: 3,
    experience: "5+ years",
    engagement_months: "12 months",
    start_date: "01-Nov-24",
    created_on: "15-Oct-24",
    primarySkills: ["React.js", "Redux", "TypeScript"],
    description: "We are looking for an experienced React Developer with 5+ years of experience.",
    submittedProfiles: [
      {
        id: 1,
        name: "Akshay Joshi",
        role: "React Developer",
        skills: [
          { skill: "React.js", level: "Expert" },
          { skill: "Redux", level: "Advanced" },
          { skill: "TypeScript", level: "Advanced" },
        ],
        experience: "5.2 Years",
        monthlyRate: "₹ 1,75,000",
        partnerOrg: "TechCorp Solutions",
        submittedOn: "18-Oct-24",
        noticePeriod: "30 Days",
        status: "submitted",
        resumeUrl: "#",
      },
      {
        id: 2,
        name: "Priya Sharma",
        role: "Senior React Developer",
        skills: [
          { skill: "React.js", level: "Expert" },
          { skill: "TypeScript", level: "Expert" },
          { skill: "Next.js", level: "Advanced" },
        ],
        experience: "6.0 Years",
        monthlyRate: "₹ 1,90,000",
        partnerOrg: "Digital Partners Inc",
        submittedOn: "19-Oct-24",
        noticePeriod: "15 Days",
        status: "interviewing",
        resumeUrl: "#",
      },
    ],
  },
  "JOB002": {
    id: "JOB002",
    role: "Full Stack Developer",
    type: "Contract",
    budget: "₹1,70,000",
    location: "Mumbai",
    openPositions: 2,
    experience: "4+ years",
    engagement_months: "6 months",
    start_date: "05-Nov-24",
    created_on: "18-Oct-24",
    primarySkills: ["Node.js", "React", "MongoDB"],
    description: "Looking for a Full Stack Developer with 4+ years of experience.",
    submittedProfiles: [
      {
        id: 3,
        name: "Rajesh Kumar",
        role: "Full Stack Developer",
        skills: [
          { skill: "Node.js", level: "Expert" },
          { skill: "React", level: "Advanced" },
          { skill: "PostgreSQL", level: "Advanced" },
        ],
        experience: "4.5 Years",
        monthlyRate: "₹ 1,60,000",
        partnerOrg: "Innovate Tech",
        submittedOn: "20-Oct-24",
        noticePeriod: "45 Days",
        status: "submitted",
        resumeUrl: "#",
      },
    ],
  },
  "JOB003": {
    id: "JOB003",
    role: "Backend Developer",
    type: "Full Time",
    budget: "₹2,25,000",
    location: "Hyderabad",
    openPositions: 4,
    experience: "6+ years",
    engagement_months: "12 months",
    start_date: "10-Nov-24",
    created_on: "20-Oct-24",
    primarySkills: ["Java", "Spring Boot", "Microservices"],
    description: "We are looking for an experienced Backend Developer.",
    submittedProfiles: [
      {
        id: 4,
        name: "Vineet Malhotra",
        role: "Backend Developer",
        skills: [
          { skill: "Java", level: "Expert" },
          { skill: "Spring Boot", level: "Expert" },
          { skill: "MySQL", level: "Advanced" },
        ],
        experience: "6.5 Years",
        monthlyRate: "₹ 2,10,000",
        partnerOrg: "TechCorp Solutions",
        submittedOn: "21-Oct-24",
        noticePeriod: "60 Days",
        status: "interviewing",
        resumeUrl: "#",
      },
      {
        id: 5,
        name: "Amit Patel",
        role: "Senior Backend Developer",
        skills: [
          { skill: "Java", level: "Expert" },
          { skill: "Microservices", level: "Expert" },
          { skill: "AWS", level: "Advanced" },
        ],
        experience: "7.0 Years",
        monthlyRate: "₹ 2,20,000",
        partnerOrg: "Digital Partners Inc",
        submittedOn: "22-Oct-24",
        noticePeriod: "30 Days",
        status: "submitted",
        resumeUrl: "#",
      },
    ],
  },
};

const AdminJobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const jobData = mockAdminJobDetails[jobId];
  const [profiles, setProfiles] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (jobData) {
      setProfiles(jobData.submittedProfiles || []);
      form.setFieldsValue({
        role: jobData.role,
        type: jobData.type,
        budget: parseInt(jobData.budget.replace(/[₹,]/g, '')),
        location: jobData.location,
        openPositions: jobData.openPositions,
        experience: jobData.experience,
        engagement_months: jobData.engagement_months,
        start_date: jobData.start_date,
        description: jobData.description,
      });
    }
  }, [jobId, jobData, form]);

  if (!jobData) {
    return (
      <JobDetailsWrapper>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Job not found</h2>
          <Button type="primary" onClick={() => navigate("/home/job-requirments")}>
            Back to Job Requirements
          </Button>
        </div>
      </JobDetailsWrapper>
    );
  }

  const handleEditJob = () => {
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = (values) => {
    console.log("Updated job details:", values);
    // Here you would typically make an API call to update the job
    setIsEditModalVisible(false);
  };

  const handleAction = (profileId, action) => {
    console.log(`Action: ${action} for profile ID: ${profileId}`);
    setProfiles(
      profiles.map((profile) =>
        profile.id === profileId ? { ...profile, status: action } : profile
      )
    );
  };

  const getActionMenu = (record) => (
    <Menu>
      <Menu.Item
        key="interview"
        icon={<VideoCameraOutlined />}
        onClick={() => handleAction(record.id, "interviewing")}
      >
        Schedule Interview
      </Menu.Item>
      <Menu.Item
        key="hire"
        icon={<CheckCircleOutlined />}
        onClick={() => handleAction(record.id, "hired")}
      >
        Hire
      </Menu.Item>
      <Menu.Item
        key="reject"
        icon={<CloseCircleOutlined />}
        danger
        onClick={() => handleAction(record.id, "rejected")}
      >
        Reject
      </Menu.Item>
    </Menu>
  );

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
      render: (name) => <span style={{ fontWeight: 500, color: "#1890ff" }}>{name}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
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
      render: (rate) => <span style={{ fontWeight: 500 }}>{rate}</span>,
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
      width: 150,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Tooltip title="Schedule Interview">
            <Button
              type="primary"
              icon={<VideoCameraOutlined />}
              size="small"
              onClick={() => handleAction(record.id, "interviewing")}
            />
          </Tooltip>
          <Tooltip title="Download Resume">
            <Button
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => window.open(record.resumeUrl, "_blank")}
            />
          </Tooltip>
          <Dropdown overlay={getActionMenu(record)} trigger={["click"]}>
            <Button icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <JobDetailsWrapper>
      <div className="header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/home/job-requirments")}
          className="back-button"
        >
          Back to Job Requirements
        </Button>
        <div className="title-row">
          <h2>Job Details</h2>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEditJob}
            style={{
              backgroundColor: "#00d9a9",
              borderColor: "#00d9a9",
              height: "40px",
            }}
          >
            Edit Job
          </Button>
        </div>
      </div>

      <Card className="job-summary-card">
        <div className="job-header">
          <div className="job-id">Job ID: {jobData.id}</div>
          <h2 className="job-title">{jobData.role}</h2>
          <div className="job-meta">
            <Tag color="blue">{jobData.type}</Tag>
            <Tag color="cyan" icon={<EnvironmentOutlined />}>{jobData.location}</Tag>
            <Tag color="green" icon={<TeamOutlined />}>Open Positions: {jobData.openPositions}</Tag>
          </div>
        </div>

        <div className="metrics-row">
          <div className="metric-box">
            <div className="metric-icon" style={{ background: "#e6f7ff" }}>
              <DollarOutlined style={{ fontSize: 24, color: "#1890ff" }} />
            </div>
            <div className="metric-info">
              <h3>{jobData.budget}</h3>
              <p>Monthly Budget</p>
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-icon" style={{ background: "#fff7e6" }}>
              <CalendarOutlined style={{ fontSize: 24, color: "#fa8c16" }} />
            </div>
            <div className="metric-info">
              <h3>{jobData.engagement_months}</h3>
              <p>Project Duration</p>
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-icon" style={{ background: "#f6ffed" }}>
              <CommentOutlined style={{ fontSize: 24, color: "#52c41a" }} />
            </div>
            <div className="metric-info">
              <h3>{jobData.experience}</h3>
              <p>Required Experience</p>
            </div>
          </div>
        </div>

        <div className="primary-skills">
          <span className="skills-label">Primary Skills:</span>
          {jobData.primarySkills.map((skill, index) => (
            <Tag key={index} color="blue">
              {skill}
            </Tag>
          ))}
        </div>

        <div className="job-description">
          <h4>Job Description</h4>
          <p>{jobData.description}</p>
        </div>
      </Card>

      <div className="profiles-table-card">
        <h3>Submitted Profiles ({profiles.length})</h3>
        <Table
          columns={columns}
          dataSource={profiles}
          rowKey="id"
          pagination={false}
          scroll={{ x: 1400 }}
        />
      </div>

      {/* Edit Job Modal */}
      <Modal
        title="Edit Job Details"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveEdit}
        >
          <Form.Item
            label="Job Role"
            name="role"
            rules={[{ required: true, message: "Please enter job role" }]}
          >
            <Input placeholder="Enter job role" />
          </Form.Item>

          <Form.Item
            label="Engagement Type"
            name="type"
            rules={[{ required: true, message: "Please select engagement type" }]}
          >
            <Select placeholder="Select engagement type">
              <Option value="Full Time">Full Time</Option>
              <Option value="Contract">Contract</Option>
              <Option value="Part Time">Part Time</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Monthly Budget (₹)"
            name="budget"
            rules={[{ required: true, message: "Please enter budget" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/₹\s?|(,*)/g, '')}
              placeholder="Enter monthly budget"
            />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter location" }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>

          <Form.Item
            label="Open Positions"
            name="openPositions"
            rules={[{ required: true, message: "Please enter number of positions" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} placeholder="Enter number of positions" />
          </Form.Item>

          <Form.Item
            label="Experience Required"
            name="experience"
            rules={[{ required: true, message: "Please enter experience required" }]}
          >
            <Input placeholder="e.g. 5+ years" />
          </Form.Item>

          <Form.Item
            label="Project Duration"
            name="engagement_months"
            rules={[{ required: true, message: "Please enter project duration" }]}
          >
            <Input placeholder="e.g. 12 months" />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="start_date"
            rules={[{ required: true, message: "Please enter start date" }]}
          >
            <Input placeholder="e.g. 01-Nov-24" />
          </Form.Item>

          <Form.Item
            label="Job Description"
            name="description"
            rules={[{ required: true, message: "Please enter job description" }]}
          >
            <TextArea rows={4} placeholder="Enter job description" />
          </Form.Item>

          <Form.Item>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <Button onClick={() => setIsEditModalVisible(false)}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#00d9a9",
                  borderColor: "#00d9a9",
                }}
              >
                Save Changes
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </JobDetailsWrapper>
  );
};

export default AdminJobDetails;
