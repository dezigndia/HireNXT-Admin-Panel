import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Table, Tag, Button, Dropdown, Menu, Avatar, Tooltip } from "antd";
import {
  ArrowLeftOutlined,
  FilePdfOutlined,
  VideoCameraOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  DollarOutlined,
  CalendarOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { JobDetailsWrapper } from "./JobDetails.style";

const mockJobDetails = {
  "2930493": {
    id: "2930493",
    title: "Apigee Developer with 3 to 4 years of Experience",
    type: "Full-Time Contract",
    salary: "1,00,000 / Month (6 Months)",
    location: "Bangalore, India",
    openPositions: 2,
    salaryPerMonth: "1,80,000",
    projectDuration: "6 Months",
    communication: "(En)Excellent",
    primarySkills: [
      { skill: "OpenAPISpec documentation", level: "Expert" },
      { skill: "API monitoring (Splunk, Datadog)", level: "Expert" },
    ],
    description: "We are looking for an experienced Apigee Developer to join our team. The ideal candidate should have strong expertise in API development, management, and monitoring.",
    submittedProfiles: [
      {
        id: 1,
        name: "Akshay Joshi",
        role: "Apigee Developer",
        skills: [
          { skill: "OpenAPISpec documentation", level: "Expert" },
          { skill: "API monitoring (Splunk, Datadog)", level: "Expert" },
        ],
        monthlyRate: "₹ 75,000",
        experience: "2.4 Year",
        noticePeriod: "30 Days",
        resumeUrl: "#",
        status: "submitted",
      },
      {
        id: 2,
        name: "Vineet Malhotra",
        role: "Apigee Developer",
        skills: [
          { skill: "OpenAPISpec documentation", level: "Expert" },
          { skill: "API monitoring (Splunk, Datadog)", level: "Expert" },
        ],
        monthlyRate: "₹ 75,000",
        experience: "2.4 Year",
        noticePeriod: "30 Days",
        resumeUrl: "#",
        status: "submitted",
      },
    ],
  },
  "2930494": {
    id: "2930494",
    title: "React Frontend Developer",
    type: "Full-Time Contract",
    salary: "80,000 / Month",
    location: "Bangalore",
    openPositions: 1,
    salaryPerMonth: "80,000",
    projectDuration: "12 Months",
    communication: "Excellent",
    primarySkills: [
      { skill: "React", level: "Expert" },
      { skill: "TypeScript", level: "Advanced" },
      { skill: "Redux", level: "Expert" },
    ],
    description: "Looking for a skilled React developer with strong TypeScript knowledge.",
    submittedProfiles: [
      {
        id: 3,
        name: "Priya Sharma",
        role: "React Developer",
        skills: [
          { skill: "React", level: "Expert" },
          { skill: "TypeScript", level: "Advanced" },
        ],
        monthlyRate: "₹ 65,000",
        experience: "3.5 Year",
        noticePeriod: "15 Days",
        resumeUrl: "#",
        status: "submitted",
      },
    ],
  },
};

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState(
    mockJobDetails[jobId]?.submittedProfiles || []
  );

  const jobData = mockJobDetails[jobId];

  if (!jobData) {
    return (
      <JobDetailsWrapper>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Job not found</h2>
          <Button type="primary" onClick={() => navigate("/customer/my-jobs")}>
            Back to My Jobs
          </Button>
        </div>
      </JobDetailsWrapper>
    );
  }

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
      render: (name) => (
        <span style={{ color: "#1890ff", fontWeight: 500, cursor: "pointer" }}>
          {name}
        </span>
      ),
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
          onClick={() => navigate("/customer/my-jobs")}
          className="back-button"
        >
          Back to Jobs
        </Button>
        <h2>Ongoing Jobs</h2>
      </div>

      <Card className="job-summary-card">
        <div className="job-header">
          <div className="job-id">Job id:{jobData.id}</div>
          <h2 className="job-title">{jobData.title}</h2>
          <div className="job-meta">
            <Tag color="blue">{jobData.type}</Tag>
            <span className="salary">{jobData.salary}</span>
            <Tag color="cyan">{jobData.location}</Tag>
            <Tag color="green">Open Position: {jobData.openPositions}</Tag>
          </div>
        </div>

        <div className="metrics-row">
          <div className="metric-box">
            <div className="metric-icon" style={{ background: "#e6f7ff" }}>
              <DollarOutlined style={{ fontSize: 24, color: "#1890ff" }} />
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
              <CommentOutlined style={{ fontSize: 24, color: "#52c41a" }} />
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
        <h3 className="section-title">
          Profiles Submitted ({profiles.length})
        </h3>
        <Card className="profiles-table-card">
          <Table
            columns={columns}
            dataSource={profiles}
            rowKey="id"
            pagination={false}
            scroll={{ x: 1200 }}
          />
        </Card>
      </div>
    </JobDetailsWrapper>
  );
};

export default JobDetails;
