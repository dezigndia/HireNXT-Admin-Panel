import React, { useState, useEffect } from "react";
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
    title: "SAP Hana Developer",
    type: "Full Time Contract",
    salary: "₹1,50,000 / Month (6 Months)",
    location: "Remote",
    openPositions: 2,
    salaryPerMonth: "1,50,000",
    projectDuration: "6 Months",
    communication: "Excellent",
    primarySkills: [
      { skill: "SAP HANA", level: "Expert" },
      { skill: "SQL", level: "Advanced" },
      { skill: "Data Modeling", level: "Expert" },
    ],
    description: "We are looking for an experienced SAP Hana Developer with 5 to 6 years of experience.",
    submittedProfiles: [
      {
        id: 1,
        name: "Akshay Joshi",
        role: "SAP HANA Developer",
        skills: [
          { skill: "SAP HANA", level: "Expert" },
          { skill: "SQL", level: "Advanced" },
        ],
        monthlyRate: "₹ 75,000",
        experience: "5.2 Year",
        noticePeriod: "30 Days",
        resumeUrl: "#",
        status: "submitted",
      },
      {
        id: 2,
        name: "Vineet Malhotra",
        role: "SAP HANA Developer",
        skills: [
          { skill: "SAP HANA", level: "Expert" },
          { skill: "Data Modeling", level: "Expert" },
        ],
        monthlyRate: "₹ 80,000",
        experience: "5.8 Year",
        noticePeriod: "45 Days",
        resumeUrl: "#",
        status: "submitted",
      },
      {
        id: 3,
        name: "Raj Kumar",
        role: "SAP HANA Developer",
        skills: [
          { skill: "SAP HANA", level: "Advanced" },
          { skill: "SQL", level: "Expert" },
        ],
        monthlyRate: "₹ 70,000",
        experience: "5.0 Year",
        noticePeriod: "30 Days",
        resumeUrl: "#",
        status: "interviewing",
      },
    ],
  },
  "2930494": {
    id: "2930494",
    title: "React Frontend Developer",
    type: "Full Time Contract",
    salary: "₹90,000 / Month (12 Months)",
    location: "Bangalore",
    openPositions: 1,
    salaryPerMonth: "90,000",
    projectDuration: "12 Months",
    communication: "Good",
    primarySkills: [
      { skill: "React", level: "Expert" },
      { skill: "TypeScript", level: "Advanced" },
      { skill: "Redux", level: "Expert" },
    ],
    description: "Looking for a skilled React developer with 3 to 5 years of experience.",
    submittedProfiles: [
      {
        id: 4,
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
      {
        id: 5,
        name: "Amit Singh",
        role: "React Developer",
        skills: [
          { skill: "React", level: "Expert" },
          { skill: "Redux", level: "Expert" },
        ],
        monthlyRate: "₹ 70,000",
        experience: "4.0 Year",
        noticePeriod: "30 Days",
        resumeUrl: "#",
        status: "interviewing",
      },
    ],
  },
  "2930495": {
    id: "2930495",
    title: "DevOps Engineer",
    type: "Contract",
    salary: "₹1,20,000 / Month (6 Months)",
    location: "Remote",
    openPositions: 1,
    salaryPerMonth: "1,20,000",
    projectDuration: "6 Months",
    communication: "Excellent",
    primarySkills: [
      { skill: "Docker", level: "Expert" },
      { skill: "Kubernetes", level: "Advanced" },
      { skill: "AWS", level: "Expert" },
    ],
    description: "Looking for an experienced DevOps Engineer with 4 to 7 years of experience.",
    submittedProfiles: [
      {
        id: 6,
        name: "Karthik Reddy",
        role: "DevOps Engineer",
        skills: [
          { skill: "Docker", level: "Expert" },
          { skill: "Kubernetes", level: "Advanced" },
        ],
        monthlyRate: "₹ 95,000",
        experience: "6.0 Year",
        noticePeriod: "60 Days",
        resumeUrl: "#",
        status: "submitted",
      },
    ],
  },
  "2930496": {
    id: "2930496",
    title: "Python Backend Developer",
    type: "Full Time",
    salary: "₹75,000 / Month (12 Months)",
    location: "Hyderabad",
    openPositions: 2,
    salaryPerMonth: "75,000",
    projectDuration: "12 Months",
    communication: "Good",
    primarySkills: [
      { skill: "Python", level: "Expert" },
      { skill: "Django", level: "Advanced" },
      { skill: "PostgreSQL", level: "Advanced" },
    ],
    description: "Looking for a Python Backend Developer with 2 to 4 years of experience.",
    submittedProfiles: [
      {
        id: 7,
        name: "Neha Gupta",
        role: "Python Developer",
        skills: [
          { skill: "Python", level: "Expert" },
          { skill: "Django", level: "Advanced" },
        ],
        monthlyRate: "₹ 60,000",
        experience: "3.0 Year",
        noticePeriod: "30 Days",
        resumeUrl: "#",
        status: "submitted",
      },
      {
        id: 8,
        name: "Rohit Mehta",
        role: "Python Developer",
        skills: [
          { skill: "Python", level: "Expert" },
          { skill: "PostgreSQL", level: "Advanced" },
        ],
        monthlyRate: "₹ 58,000",
        experience: "2.5 Year",
        noticePeriod: "15 Days",
        resumeUrl: "#",
        status: "interviewing",
      },
    ],
  },
};

const JobDetails = () => {
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
      render: (name, record) => (
        <a 
          href="#"
          style={{ color: "#1890ff", fontWeight: 500 }}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/customer/talent-details/${record.id}`);
          }}
        >
          {name}
        </a>
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
