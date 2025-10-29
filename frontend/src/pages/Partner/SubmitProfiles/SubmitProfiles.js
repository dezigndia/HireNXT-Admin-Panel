import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Table, Tag, Button, Dropdown, Menu, Tooltip } from "antd";
import {
  ArrowLeftOutlined,
  FilePdfOutlined,
  DownloadOutlined,
  PlusOutlined,
  TeamOutlined,
  UserAddOutlined,
  DollarOutlined,
  CalendarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { SubmitProfilesWrapper } from "./SubmitProfiles.style";

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
    description: "We are looking for an experienced Senior React Developer with 5 to 7 years of experience.",
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
    description: "Looking for a Full Stack Java Developer with 4 to 6 years of experience.",
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
    description: "Looking for an experienced DevOps Engineer with 3 to 5 years of experience.",
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
    description: "Looking for a Python Backend Developer with 2 to 4 years of experience.",
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
    description: "Looking for a Mobile App Developer with 3 to 5 years of experience in React Native.",
    submittedProfiles: [],
  },
};

const SubmitProfiles = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const jobData = mockJobDetails[jobId];
  const [profiles, setProfiles] = useState([]);

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
          <Button type="primary" onClick={() => navigate("/partner/ongoing-jobs")}>
            Back to Ongoing Jobs
          </Button>
        </div>
      </SubmitProfilesWrapper>
    );
  }

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
      width: 100,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Tooltip title="Download Resume">
            <Button
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => window.open(record.resumeUrl, "_blank")}
            />
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
            <span className="salary">{jobData.salary}</span>
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
              onClick={() => console.log("Add from Bench Pool")}
            >
              Add from Bench Pool
            </Button>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              size="large"
              className="add-resource-btn"
              onClick={() => console.log("Add New Resource")}
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
              emptyText: "No profiles submitted yet. Click 'Add from Bench Pool' or 'Add New Resource' to submit profiles.",
            }}
          />
        </Card>
      </div>
    </SubmitProfilesWrapper>
  );
};

export default SubmitProfiles;
