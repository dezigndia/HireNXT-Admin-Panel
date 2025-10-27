import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Tag, Row, Col, Dropdown, Menu, Segmented } from "antd";
import {
  MoreOutlined,
  PlusOutlined,
  FileTextOutlined,
  UserOutlined,
  CheckCircleOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { MyJobsWrapper } from "./MyJobs.style";

const mockJobs = [
  {
    id: "2930493",
    title: "SAP Hana Developer",
    type: "Full Time Contract",
    location: "Remote",
    experience: "5 to 6 years of Experience",
    submittedProfiles: 5,
    interviewing: 5,
    rejected: 2,
    hired: 1,
    status: "ongoing",
    postedDate: "Feb 10, 2024",
  },
  {
    id: "2930494",
    title: "React Frontend Developer",
    type: "Full Time Contract",
    location: "Bangalore",
    experience: "3 to 5 years of Experience",
    submittedProfiles: 8,
    interviewing: 4,
    rejected: 1,
    hired: 2,
    status: "ongoing",
    postedDate: "Feb 12, 2024",
  },
  {
    id: "2930495",
    title: "DevOps Engineer",
    type: "Contract",
    location: "Remote",
    experience: "4 to 7 years of Experience",
    submittedProfiles: 6,
    interviewing: 3,
    rejected: 2,
    hired: 0,
    status: "closed",
    postedDate: "Jan 28, 2024",
  },
  {
    id: "2930496",
    title: "Python Backend Developer",
    type: "Full Time",
    location: "Hyderabad",
    experience: "2 to 4 years of Experience",
    submittedProfiles: 10,
    interviewing: 6,
    rejected: 3,
    hired: 1,
    status: "ongoing",
    postedDate: "Feb 15, 2024",
  },
];

const MyJobs = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [jobs, setJobs] = useState(mockJobs);

  const filteredJobs = jobs.filter((job) => {
    if (filter === "all") return true;
    return job.status === filter;
  });

  const ongoingCount = jobs.filter((j) => j.status === "ongoing").length;
  const closedCount = jobs.filter((j) => j.status === "closed").length;
  const totalProfiles = jobs.reduce((sum, job) => sum + job.submittedProfiles, 0);
  const totalHired = jobs.reduce((sum, job) => sum + job.hired, 0);

  const handleMenuClick = (jobId, action) => {
    if (action === "edit") {
      console.log("Edit job:", jobId);
    } else if (action === "close") {
      console.log("Close job:", jobId);
      setJobs(jobs.map(job => 
        job.id === jobId ? { ...job, status: "closed" } : job
      ));
    }
  };

  const getActionMenu = (jobId) => (
    <Menu>
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleMenuClick(jobId, "edit")}
      >
        Edit Job
      </Menu.Item>
      <Menu.Item
        key="close"
        icon={<CloseCircleOutlined />}
        onClick={() => handleMenuClick(jobId, "close")}
      >
        Close Job
      </Menu.Item>
    </Menu>
  );

  return (
    <MyJobsWrapper>
      <div className="header">
        <h2>Job Briefs</h2>
        <Button type="primary" icon={<PlusOutlined />} className="post-job-btn">
          Post Job
        </Button>
      </div>

      <Row gutter={16} className="metrics-row">
        <Col xs={24} sm={8} md={8}>
          <Card className="metric-card" hoverable>
            <div className="metric-content">
              <div className="metric-icon" style={{ background: "#e6f7ff" }}>
                <FileTextOutlined style={{ color: "#1890ff", fontSize: 24 }} />
              </div>
              <div className="metric-info">
                <h3 className="metric-value">{ongoingCount}</h3>
                <p className="metric-label">Job Live</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8} md={8}>
          <Card className="metric-card" hoverable>
            <div className="metric-content">
              <div className="metric-icon" style={{ background: "#f0f5ff" }}>
                <UserOutlined style={{ color: "#597ef7", fontSize: 24 }} />
              </div>
              <div className="metric-info">
                <h3 className="metric-value">{totalProfiles}</h3>
                <p className="metric-label">Profile Received</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8} md={8}>
          <Card className="metric-card" hoverable>
            <div className="metric-content">
              <div className="metric-icon" style={{ background: "#f6ffed" }}>
                <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 24 }} />
              </div>
              <div className="metric-info">
                <h3 className="metric-value">{totalHired}</h3>
                <p className="metric-label">Talent Hired</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <div className="filter-section">
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[
            { label: "All Jobs", value: "all" },
            { label: `Ongoing Job (${ongoingCount})`, value: "ongoing" },
            { label: `Closed Job (${closedCount})`, value: "closed" },
          ]}
          className="job-filter"
        />
      </div>

      <div className="jobs-list">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="job-card" hoverable>
            <div className="job-header">
              <div className="job-title-section">
                <p className="job-id">Job id: {job.id}</p>
                <h3 
                  className="job-title" 
                  onClick={() => navigate(`/customer/my-jobs/${job.id}`)}
                >
                  {job.title}
                </h3>
                <p className="job-meta">
                  <Tag color="cyan">{job.type}</Tag>
                  <Tag color="blue">{job.location}</Tag>
                  <span className="experience">{job.experience}</span>
                </p>
              </div>
              <div className="job-actions">
                <span className="posted-date">Posted on {job.postedDate}</span>
                <Dropdown
                  overlay={getActionMenu(job.id)}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <MoreOutlined className="action-icon" />
                </Dropdown>
              </div>
            </div>

            <div className="job-stats">
              <div className="stat-item">
                <h4>{job.submittedProfiles}</h4>
                <p>Submitted</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <h4>{job.interviewing}</h4>
                <p>Interviewing</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item rejected">
                <h4>{job.rejected}</h4>
                <p>Rejected</p>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item hired">
                <h4>{job.hired}</h4>
                <p>Hired</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </MyJobsWrapper>
  );
};

export default MyJobs;
