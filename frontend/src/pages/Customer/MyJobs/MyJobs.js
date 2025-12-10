import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Tag, Row, Col, Dropdown, Modal, message } from "antd";
import {
  MoreOutlined,
  PlusOutlined,
  FileTextOutlined,
  UserOutlined,
  CheckCircleOutlined,
  EditOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
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
    status: "Active",
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
    status: "Active",
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
    status: "Inactive",
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
    status: "Active",
    postedDate: "Feb 15, 2024",
  },
];

const MyJobs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Active");
  const [jobs, setJobs] = useState(mockJobs);

  const filteredJobs = jobs.filter((job) => job.status === activeTab);

  const activeCount = jobs.filter((j) => j.status === "Active").length;
  const inactiveCount = jobs.filter((j) => j.status === "Inactive").length;
  const totalProfiles = jobs.reduce((sum, job) => sum + job.submittedProfiles, 0);
  const totalHired = jobs.reduce((sum, job) => sum + job.hired, 0);

  const handleEditJob = (jobId) => {
    navigate(`/customer/edit-job/${jobId}`);
  };

  const handleCloseJob = (job) => {
    Modal.confirm({
      title: "Close Job",
      icon: <ExclamationCircleOutlined style={{ color: "#faad14" }} />,
      content: (
        <div>
          <p>Are you sure you want to close this job?</p>
          <p style={{ fontWeight: 500, marginTop: 8 }}>
            Job: {job.title} (ID: {job.id})
          </p>
          <p style={{ color: "#666", fontSize: 13 }}>
            This will move the job to Inactive status and no more profiles can be submitted.
          </p>
        </div>
      ),
      okText: "Close Job",
      okButtonProps: { 
        danger: true,
        style: { background: "#ff4d4f", borderColor: "#ff4d4f" }
      },
      cancelText: "Cancel",
      onOk: () => {
        setJobs(jobs.map((j) =>
          j.id === job.id ? { ...j, status: "Inactive" } : j
        ));
        message.success(`Job "${job.title}" has been closed successfully`);
      },
    });
  };

  const handleViewJobDetails = (jobId) => {
    navigate(`/customer/my-jobs/${jobId}`);
  };

  const getActionMenuItems = (job) => {
    const items = [
      {
        key: "view",
        label: "View Job Details",
        icon: <FileTextOutlined />,
        onClick: () => handleViewJobDetails(job.id),
      },
      {
        key: "edit",
        label: "Edit Job",
        icon: <EditOutlined />,
        onClick: () => handleEditJob(job.id),
      },
    ];

    if (job.status === "Active") {
      items.push({
        key: "close",
        label: "Close Job",
        icon: <CloseCircleOutlined />,
        danger: true,
        onClick: () => handleCloseJob(job),
      });
    }

    return items;
  };

  return (
    <MyJobsWrapper>
      <div className="header">
        <h2>Job Briefs</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="post-job-btn"
          onClick={() => navigate("/customer/post-job")}
        >
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
                <h3 className="metric-value">{activeCount}</h3>
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

      <div className="tabs-section">
        <Button
          className={activeTab === "Active" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("Active")}
        >
          Active ({activeCount})
        </Button>
        <Button
          className={activeTab === "Inactive" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("Inactive")}
        >
          Inactive ({inactiveCount})
        </Button>
      </div>

      <div className="jobs-list">
        {filteredJobs.length === 0 ? (
          <Card className="empty-card">
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <FileTextOutlined style={{ fontSize: 48, color: "#d9d9d9", marginBottom: 16 }} />
              <p style={{ color: "#8c8c8c", margin: 0 }}>
                No {activeTab.toLowerCase()} jobs found
              </p>
            </div>
          </Card>
        ) : (
          filteredJobs.map((job) => (
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
                    menu={{ items: getActionMenuItems(job) }}
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
          ))
        )}
      </div>
    </MyJobsWrapper>
  );
};

export default MyJobs;
