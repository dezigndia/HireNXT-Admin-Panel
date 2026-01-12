import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Table, Tag, Button, Tooltip } from "antd";
import {
  ArrowLeftOutlined,
  FilePdfOutlined,
  DownloadOutlined,
  DollarOutlined,
  CalendarOutlined,
  CommentOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { JobDetailsWrapper } from "./AdminJobDetails.style";

const mockJobData = {
  "JOB005": {
    id: "JOB005",
    role: "UI/UX Designer",
    type: "Contract",
    budget: "₹1,35,000",
    location: "Delhi",
    openPositions: 1,
    experience: "4+ years",
    engagement_months: "6 months",
    start_date: "20-Nov-24",
    created_on: "25-Oct-24",
    primarySkills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
    description: "We are looking for an experienced UI/UX Designer to create intuitive user interfaces.",
    hiredTalents: [
      {
        id: 1,
        name: "Priya Menon",
        role: "Senior UI/UX Designer",
        skills: [
          { skill: "Figma", level: "Expert" },
          { skill: "Adobe XD", level: "Expert" },
          { skill: "User Research", level: "Advanced" },
        ],
        experience: "5.0 Years",
        monthlyRate: "₹ 1,30,000",
        partnerOrg: "Digital Partners Inc",
        hiredOn: "10-Nov-24",
        startDate: "20-Nov-24",
        contractEnd: "20-May-25",
        status: "Active",
        resumeUrl: "#",
      },
    ],
  },
  "JOB006": {
    id: "JOB006",
    role: "QA Engineer",
    type: "Full Time",
    budget: "₹1,15,000",
    location: "Bangalore",
    openPositions: 3,
    experience: "3+ years",
    engagement_months: "12 months",
    start_date: "01-Dec-24",
    created_on: "28-Oct-24",
    primarySkills: ["Selenium", "TestNG", "API Testing", "JIRA"],
    description: "Looking for a QA Engineer with experience in automation testing.",
    hiredTalents: [
      {
        id: 2,
        name: "Rahul Sharma",
        role: "Senior QA Engineer",
        skills: [
          { skill: "Selenium", level: "Expert" },
          { skill: "TestNG", level: "Advanced" },
          { skill: "API Testing", level: "Advanced" },
        ],
        experience: "4.5 Years",
        monthlyRate: "₹ 1,10,000",
        partnerOrg: "TechCorp Solutions",
        hiredOn: "15-Nov-24",
        startDate: "01-Dec-24",
        contractEnd: "30-Nov-25",
        status: "Active",
        resumeUrl: "#",
      },
      {
        id: 3,
        name: "Anita Reddy",
        role: "QA Automation Engineer",
        skills: [
          { skill: "Selenium", level: "Advanced" },
          { skill: "Cypress", level: "Expert" },
          { skill: "JIRA", level: "Intermediate" },
        ],
        experience: "3.5 Years",
        monthlyRate: "₹ 1,05,000",
        partnerOrg: "Innovate Tech",
        hiredOn: "18-Nov-24",
        startDate: "01-Dec-24",
        contractEnd: "30-Nov-25",
        status: "Active",
        resumeUrl: "#",
      },
    ],
  },
};

const AdminJobHiredTalents = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const jobData = mockJobData[jobId];
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    if (jobData) {
      setTalents(jobData.hiredTalents || []);
    }
  }, [jobId, jobData]);

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
      width: 280,
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
      title: "Partner Org",
      dataIndex: "partnerOrg",
      key: "partnerOrg",
      width: 150,
    },
    {
      title: "Hired On",
      dataIndex: "hiredOn",
      key: "hiredOn",
      width: 110,
    },
    {
      title: "Contract End",
      dataIndex: "contractEnd",
      key: "contractEnd",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "default"} icon={<CheckCircleOutlined />}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Tooltip title="Download Resume">
          <Button
            icon={<DownloadOutlined />}
            size="small"
            onClick={() => window.open(record.resumeUrl, "_blank")}
          />
        </Tooltip>
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
          <h2>Hired Talents</h2>
        </div>
      </div>

      <Card className="job-summary-card">
        <div className="job-header">
          <div className="job-id">Job ID: {jobData.id}</div>
          <h2 className="job-title">{jobData.role}</h2>
          <div className="job-meta">
            <Tag color="blue">{jobData.type}</Tag>
            <Tag color="cyan" icon={<EnvironmentOutlined />}>{jobData.location}</Tag>
            <Tag color="green" icon={<TeamOutlined />}>Positions: {jobData.openPositions}</Tag>
            <Tag color="purple" icon={<CheckCircleOutlined />}>Hired: {talents.length}</Tag>
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

          <div className="metric-box">
            <div className="metric-icon" style={{ background: "#f9f0ff" }}>
              <CheckCircleOutlined style={{ fontSize: 24, color: "#722ed1" }} />
            </div>
            <div className="metric-info">
              <h3>{talents.length}</h3>
              <p>Talents Hired</p>
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
        <h3>Hired Talents ({talents.length})</h3>
        <Table
          columns={columns}
          dataSource={talents}
          rowKey="id"
          pagination={false}
          scroll={{ x: 1500 }}
        />
      </div>
    </JobDetailsWrapper>
  );
};

export default AdminJobHiredTalents;
