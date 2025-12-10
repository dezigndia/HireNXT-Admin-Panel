import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Tag, Button, Divider, Space, Row, Col } from "antd";
import {
  ArrowLeftOutlined,
  DollarOutlined,
  CalendarOutlined,
  CommentOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { ViewJobDetailsWrapper } from "./ViewJobDetails.style";

const mockJobDetails = {
  "2930493": {
    id: "2930493",
    title: "SAP Hana Developer",
    type: "Full Time Contract",
    companyType: "Product",
    location: "Remote",
    industry: "IT Services",
    openPositions: 2,
    experience: "5-6 years",
    employmentType: "Full Time",
    contractType: "Contract",
    workingMode: "Remote",
    salary: "₹1,50,000 / Month (6 Months)",
    salaryPerMonth: "1,50,000",
    primarySkills: ["SAP HANA", "SQL", "Data Modeling", "ABAP"],
    goodToHaveSkills: ["SAP BW", "SAP S/4HANA", "Python"],
    projectDuration: "6 Months",
    communication: "Excellent",
    startDate: "15 Dec 2024",
    systemProvided: true,
    workTime: "9 AM - 6 PM IST",
    timeZone: "IST",
    description: "We are looking for an experienced SAP Hana Developer with 5 to 6 years of experience.",
    jobDescription: `We are seeking an experienced SAP Hana Developer to join our dynamic team. The ideal candidate will lead the development of modern, scalable SAP solutions.

Required Experience:
- 5-6 years of professional experience in SAP HANA development
- Strong expertise in SAP HANA, including data modeling and SQL scripting
- Advanced proficiency in ABAP for custom development
- Experience with SAP integration technologies
- Solid understanding of database optimization and performance tuning

Key Responsibilities:
- Design and develop scalable, high-performance SAP HANA solutions
- Collaborate with business analysts to implement data models
- Write clean, maintainable, and well-documented code
- Lead code reviews and provide constructive feedback to team members
- Mentor junior developers and contribute to team knowledge sharing
- Optimize application performance and ensure excellent user experience
- Participate in architectural decisions and technical planning sessions

Qualifications:
- Bachelor's degree in Computer Science or equivalent practical experience
- Strong problem-solving skills and attention to detail
- Excellent communication and teamwork abilities
- Experience with agile development methodologies`,
  },
  "2930494": {
    id: "2930494",
    title: "React Frontend Developer",
    type: "Full Time Contract",
    companyType: "Service",
    location: "Bangalore",
    industry: "Enterprise Software",
    openPositions: 1,
    experience: "3-5 years",
    employmentType: "Full Time",
    contractType: "Contract",
    workingMode: "Hybrid",
    salary: "₹90,000 / Month (12 Months)",
    salaryPerMonth: "90,000",
    primarySkills: ["React", "TypeScript", "Redux", "Next.js"],
    goodToHaveSkills: ["GraphQL", "AWS", "Docker"],
    projectDuration: "12 Months",
    communication: "Good",
    startDate: "1 Jan 2025",
    systemProvided: false,
    workTime: "10 AM - 7 PM IST",
    timeZone: "IST",
    description: "Looking for a skilled React developer with 3 to 5 years of experience.",
    jobDescription: `Looking for a skilled React developer to join our enterprise software team. You'll work on cutting-edge web applications for Fortune 500 clients.

Required Experience:
- 3-5 years of professional experience in front-end development
- Strong expertise in React.js, including hooks, context API, and component lifecycle
- Advanced proficiency in TypeScript for type-safe application development
- Experience with state management libraries like Redux

Key Responsibilities:
- Design and develop scalable, high-performance web applications using React.js
- Collaborate with UX/UI designers to implement pixel-perfect user interfaces
- Write clean, maintainable, and well-documented code
- Lead code reviews and provide constructive feedback to team members
- Optimize application performance and ensure excellent user experience

Qualifications:
- Bachelor's degree in Computer Science or equivalent practical experience
- Strong problem-solving skills and attention to detail
- Excellent communication and teamwork abilities`,
  },
  "2930495": {
    id: "2930495",
    title: "DevOps Engineer",
    type: "Contract",
    companyType: "Startup",
    location: "Remote",
    industry: "Cloud Services",
    openPositions: 1,
    experience: "4-7 years",
    employmentType: "Contract",
    contractType: "Contract",
    workingMode: "Remote",
    salary: "₹1,20,000 / Month (6 Months)",
    salaryPerMonth: "1,20,000",
    primarySkills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    goodToHaveSkills: ["Ansible", "Prometheus", "Grafana"],
    projectDuration: "6 Months",
    communication: "Excellent",
    startDate: "20 Dec 2024",
    systemProvided: true,
    workTime: "Flexible",
    timeZone: "IST",
    description: "Looking for an experienced DevOps Engineer with 4 to 7 years of experience.",
    jobDescription: `We're looking for a skilled DevOps Engineer to join our cloud infrastructure team. You'll be responsible for building and maintaining our AWS-based infrastructure.

Required Experience:
- 4-7 years of hands-on DevOps experience in production environments
- Strong expertise in AWS cloud services (EC2, S3, RDS, Lambda, etc.)
- Proficiency in containerization using Docker and orchestration with Kubernetes
- Experience with Infrastructure as Code using Terraform

Key Responsibilities:
- Design, implement, and manage scalable AWS cloud infrastructure
- Build and maintain automated CI/CD pipelines
- Manage Kubernetes clusters and containerized applications
- Set up monitoring, alerting, and logging systems

Qualifications:
- Bachelor's degree in Computer Science or related technical field
- Strong scripting skills (Python, Bash, or similar)
- Understanding of networking concepts and security principles`,
  },
  "2930496": {
    id: "2930496",
    title: "Python Backend Developer",
    type: "Full Time",
    companyType: "Product",
    location: "Hyderabad",
    industry: "Artificial Intelligence",
    openPositions: 2,
    experience: "2-4 years",
    employmentType: "Full Time",
    contractType: "Contract",
    workingMode: "Office",
    salary: "₹75,000 / Month (12 Months)",
    salaryPerMonth: "75,000",
    primarySkills: ["Python", "Django", "FastAPI", "PostgreSQL", "Redis"],
    goodToHaveSkills: ["Celery", "RabbitMQ", "MongoDB"],
    projectDuration: "12 Months",
    communication: "Good",
    startDate: "10 Jan 2025",
    systemProvided: true,
    workTime: "9 AM - 6 PM IST",
    timeZone: "IST",
    description: "Looking for a Python Backend Developer with 2 to 4 years of experience.",
    jobDescription: `Join our AI-driven product team as a Python Backend Developer. You'll build scalable backend services that power our machine learning applications.

Required Experience:
- 2-4 years of backend development experience with Python
- Strong proficiency in Django or Flask framework
- Experience with FastAPI for building high-performance APIs
- Working experience with PostgreSQL and database optimization

Key Responsibilities:
- Develop and maintain robust backend services using Python and Django
- Design and implement RESTful APIs for web and mobile applications
- Work with data science team to integrate ML models into production
- Optimize database queries and implement efficient data models

Qualifications:
- Bachelor's degree in Computer Science or related field
- Strong understanding of data structures and algorithms
- Experience with Git version control`,
  },
};

const ViewJobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const jobData = mockJobDetails[jobId];

  if (!jobData) {
    return (
      <ViewJobDetailsWrapper>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Job not found</h2>
          <Button type="primary" onClick={() => navigate("/customer/my-jobs")}>
            Back to My Jobs
          </Button>
        </div>
      </ViewJobDetailsWrapper>
    );
  }

  return (
    <ViewJobDetailsWrapper>
      <div className="header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(`/customer/my-jobs/${jobId}`)}
          className="back-button"
        >
          Back to Ongoing Jobs
        </Button>
        <h2>Job Details</h2>
      </div>

      <Card className="job-details-card">
        <div className="job-header-section">
          <div className="job-title-row">
            <div className="job-id">Job ID: {jobData.id}</div>
            <h1 className="job-title">{jobData.title}</h1>
            <div className="company-info">
              <Tag color="blue">{jobData.companyType}</Tag>
              <Tag color="cyan">{jobData.industry}</Tag>
            </div>
          </div>
        </div>

        <Divider />

        <div className="job-info-grid">
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12} md={8}>
              <div className="info-item">
                <EnvironmentOutlined className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Location</span>
                  <span className="info-value">{jobData.location}</span>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div className="info-item">
                <TeamOutlined className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Open Positions</span>
                  <span className="info-value">{jobData.openPositions}</span>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div className="info-item">
                <ClockCircleOutlined className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Experience</span>
                  <span className="info-value">{jobData.experience}</span>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div className="info-item">
                <LaptopOutlined className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Working Mode</span>
                  <span className="info-value">{jobData.workingMode}</span>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div className="info-item">
                <CalendarOutlined className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Start Date</span>
                  <span className="info-value">{jobData.startDate}</span>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <div className="info-item">
                <ClockCircleOutlined className="info-icon" />
                <div className="info-content">
                  <span className="info-label">Work Time</span>
                  <span className="info-value">{jobData.workTime}</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <Divider />

        <div className="metrics-section">
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={8}>
              <div className="metric-box">
                <div className="metric-icon" style={{ background: "#e6f7ff" }}>
                  <DollarOutlined style={{ fontSize: 24, color: "#1890ff" }} />
                </div>
                <div className="metric-info">
                  <h3>₹ {jobData.salaryPerMonth}</h3>
                  <p>Salary / Month</p>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="metric-box">
                <div className="metric-icon" style={{ background: "#fff7e6" }}>
                  <CalendarOutlined style={{ fontSize: 24, color: "#faad14" }} />
                </div>
                <div className="metric-info">
                  <h3>{jobData.projectDuration}</h3>
                  <p>Project Duration</p>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="metric-box">
                <div className="metric-icon" style={{ background: "#f6ffed" }}>
                  <CommentOutlined style={{ fontSize: 24, color: "#52c41a" }} />
                </div>
                <div className="metric-info">
                  <h3>{jobData.communication}</h3>
                  <p>Communication</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <Divider />

        <div className="skills-section">
          <div className="skills-group">
            <h4>Primary Skills</h4>
            <Space wrap>
              {jobData.primarySkills.map((skill, index) => (
                <Tag key={index} color="geekblue" className="skill-tag">
                  {skill}
                </Tag>
              ))}
            </Space>
          </div>
          <div className="skills-group">
            <h4>Good to Have Skills</h4>
            <Space wrap>
              {jobData.goodToHaveSkills.map((skill, index) => (
                <Tag key={index} color="green" className="skill-tag">
                  {skill}
                </Tag>
              ))}
            </Space>
          </div>
        </div>

        <Divider />

        <div className="additional-info">
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={8}>
              <div className="info-box">
                <span className="label">Employment Type</span>
                <Tag color="blue">{jobData.employmentType}</Tag>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="info-box">
                <span className="label">Contract Type</span>
                <Tag color="orange">{jobData.contractType}</Tag>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="info-box">
                <span className="label">System Provided</span>
                <Tag color={jobData.systemProvided ? "green" : "red"}>
                  {jobData.systemProvided ? "Yes" : "No"}
                </Tag>
              </div>
            </Col>
          </Row>
        </div>

        <Divider />

        <div className="description-section">
          <h4>Job Description</h4>
          <div className="description-content">
            {jobData.jobDescription.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Card>
    </ViewJobDetailsWrapper>
  );
};

export default ViewJobDetails;
