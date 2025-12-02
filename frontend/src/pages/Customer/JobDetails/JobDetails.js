import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Table, Tag, Button, Dropdown, Avatar, Tooltip, Modal, Input, message } from "antd";
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
  ExclamationCircleOutlined,
  StopOutlined,
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
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

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

  const handleScheduleInterview = (profile) => {
    Modal.confirm({
      title: "Schedule Interview",
      icon: <VideoCameraOutlined style={{ color: "#1890ff" }} />,
      content: (
        <div>
          <p>Are you sure you want to schedule an interview for this candidate?</p>
          <div style={{ 
            marginTop: 12, 
            padding: 12, 
            background: "#f8f9fd", 
            borderRadius: 6 
          }}>
            <p style={{ margin: 0, fontWeight: 500 }}>{profile.name}</p>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>{profile.role}</p>
          </div>
        </div>
      ),
      okText: "Schedule Interview",
      okButtonProps: { 
        style: { background: "#00d9a9", borderColor: "#00d9a9" }
      },
      cancelText: "Cancel",
      onOk: () => {
        setProfiles(
          profiles.map((p) =>
            p.id === profile.id 
              ? { ...p, previousStatus: p.status, status: "interviewing" } 
              : p
          )
        );
        message.success(`Interview scheduled for ${profile.name}`);
      },
    });
  };

  const handleCancelInterview = (profile) => {
    setSelectedProfile(profile);
    setCancelReason("");
    setCancelModalVisible(true);
  };

  const handleSubmitCancelInterview = () => {
    if (!cancelReason.trim()) {
      message.warning("Please provide a reason for cancelling the interview");
      return;
    }

    setProfiles(
      profiles.map((p) =>
        p.id === selectedProfile.id 
          ? { ...p, status: p.previousStatus || "submitted", previousStatus: undefined } 
          : p
      )
    );
    message.success(`Interview cancelled for ${selectedProfile.name}`);
    setCancelModalVisible(false);
    setSelectedProfile(null);
    setCancelReason("");
  };

  const handleAction = (profileId, action) => {
    if (action === "hired") {
      Modal.confirm({
        title: "Hire Candidate",
        icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        content: "Are you sure you want to hire this candidate?",
        okText: "Hire",
        okButtonProps: { style: { background: "#52c41a", borderColor: "#52c41a" } },
        onOk: () => {
          setProfiles(
            profiles.map((p) =>
              p.id === profileId ? { ...p, status: action } : p
            )
          );
          message.success("Candidate hired successfully");
        },
      });
    } else if (action === "rejected") {
      Modal.confirm({
        title: "Reject Candidate",
        icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
        content: "Are you sure you want to reject this candidate?",
        okText: "Reject",
        okButtonProps: { danger: true },
        onOk: () => {
          setProfiles(
            profiles.map((p) =>
              p.id === profileId ? { ...p, status: action } : p
            )
          );
          message.success("Candidate rejected");
        },
      });
    } else {
      setProfiles(
        profiles.map((profile) =>
          profile.id === profileId ? { ...profile, status: action } : profile
        )
      );
    }
  };

  const getActionMenuItems = (record) => {
    const items = [];

    if (record.status === "interviewing") {
      items.push({
        key: "cancel",
        label: "Cancel Interview",
        icon: <StopOutlined />,
        danger: true,
        onClick: () => handleCancelInterview(record),
      });
    }

    items.push(
      {
        key: "hire",
        label: "Hire",
        icon: <CheckCircleOutlined />,
        onClick: () => handleAction(record.id, "hired"),
      },
      {
        key: "reject",
        label: "Reject",
        icon: <CloseCircleOutlined />,
        danger: true,
        onClick: () => handleAction(record.id, "rejected"),
      }
    );

    return items;
  };

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
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        const config = {
          submitted: { color: "blue", text: "Submitted" },
          interviewing: { color: "orange", text: "Interviewing" },
          hired: { color: "green", text: "Hired" },
          rejected: { color: "red", text: "Rejected" },
        };
        const { color, text } = config[status] || { color: "default", text: status };
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Tooltip title={record.status === "interviewing" ? "Interview Scheduled" : "Schedule Interview"}>
            <Button
              type="primary"
              icon={<VideoCameraOutlined />}
              size="small"
              disabled={record.status === "interviewing" || record.status === "hired" || record.status === "rejected"}
              onClick={() => handleScheduleInterview(record)}
              style={
                record.status === "interviewing"
                  ? { background: "#d9d9d9", borderColor: "#d9d9d9" }
                  : {}
              }
            />
          </Tooltip>
          <Tooltip title="Download Resume">
            <Button
              icon={<DownloadOutlined />}
              size="small"
              onClick={() => window.open(record.resumeUrl, "_blank")}
            />
          </Tooltip>
          <Dropdown 
            menu={{ items: getActionMenuItems(record) }} 
            trigger={["click"]}
          >
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
            scroll={{ x: 1400 }}
          />
        </Card>
      </div>

      <Modal
        title="Cancel Interview"
        open={cancelModalVisible}
        onOk={handleSubmitCancelInterview}
        onCancel={() => {
          setCancelModalVisible(false);
          setSelectedProfile(null);
          setCancelReason("");
        }}
        okText="Cancel Interview"
        okButtonProps={{ danger: true }}
        cancelText="Go Back"
      >
        {selectedProfile && (
          <div>
            <div
              style={{
                marginBottom: 16,
                padding: 12,
                background: "#f8f9fd",
                borderRadius: 6,
              }}
            >
              <p style={{ margin: 0, fontWeight: 500 }}>{selectedProfile.name}</p>
              <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>
                {selectedProfile.role}
              </p>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  color: "#014c75",
                  fontWeight: 500,
                }}
              >
                Reason for Cancellation *
              </label>
              <Input.TextArea
                rows={4}
                placeholder="Please provide a reason for cancelling the interview..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </div>
          </div>
        )}
      </Modal>
    </JobDetailsWrapper>
  );
};

export default JobDetails;
