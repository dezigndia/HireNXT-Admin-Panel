import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Avatar, Button, Tag, Tooltip } from "antd";
import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  DownloadOutlined,
  SafetyCertificateOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { TalentDetailsWrapper } from "./TalentDetails.style";

const mockTalentData = {
  1: {
    id: 1,
    name: "Akshay Joshi",
    role: "SAP HANA Developer",
    location: "Bangalore, India",
    experience: "5.2 years",
    email: "akshay.joshi@techpro.com",
    phone: "+91-9876543210",
    noticePeriod: "30 Days",
    hourlyRate: "₹ 3,125",
    monthlyRate: "₹ 75,000",
    marketRate: "₹ 85,000",
    availability: "Immediately Available",
    skills: [
      { skill: "SAP HANA", level: "Expert" },
      { skill: "SQL", level: "Advanced" },
      { skill: "Data Modeling", level: "Expert" },
      { skill: "ABAP", level: "Intermediate" },
      { skill: "SAP BW", level: "Advanced" },
    ],
    summary: "Highly skilled SAP HANA Developer with over 5 years of experience in database design, optimization, and implementation. Proven track record of delivering high-performance solutions for enterprise clients. Expertise in data modeling, SQL optimization, and SAP landscape architecture. Strong analytical skills with ability to translate business requirements into technical solutions.",
    projects: [
      {
        title: "Enterprise Data Migration",
        client: "Fortune 500 Company",
        duration: "8 months",
        role: "Lead Developer",
        description: "Led the migration of legacy database systems to SAP HANA, resulting in 40% improvement in query performance. Designed and implemented data models supporting real-time analytics for over 10TB of data.",
        technologies: ["SAP HANA", "SQL", "Data Modeling", "ETL"],
      },
      {
        title: "Real-time Analytics Platform",
        client: "Financial Services Corp",
        duration: "6 months",
        role: "Senior Developer",
        description: "Developed real-time analytics platform processing millions of transactions daily. Implemented advanced SQL queries and stored procedures for business intelligence reporting.",
        technologies: ["SAP HANA", "SQL", "SAP BW", "Business Intelligence"],
      },
    ],
  },
  2: {
    id: 2,
    name: "Priya Sharma",
    role: "React Developer",
    location: "Bangalore, India",
    experience: "3.5 years",
    email: "priya.sharma@webdev.com",
    phone: "+91-9876543211",
    noticePeriod: "15 Days",
    hourlyRate: "₹ 2,708",
    monthlyRate: "₹ 65,000",
    marketRate: "₹ 72,000",
    availability: "Available in 2 weeks",
    skills: [
      { skill: "React", level: "Expert" },
      { skill: "TypeScript", level: "Advanced" },
      { skill: "Redux", level: "Advanced" },
      { skill: "JavaScript", level: "Expert" },
      { skill: "CSS/SCSS", level: "Advanced" },
    ],
    summary: "Passionate React Developer with 3.5 years of experience building modern, responsive web applications. Strong expertise in React ecosystem including Redux, React Router, and modern hooks. Committed to writing clean, maintainable code and following best practices. Experience working in Agile environments with cross-functional teams.",
    projects: [
      {
        title: "E-commerce Platform Redesign",
        client: "Retail Giant",
        duration: "10 months",
        role: "Frontend Developer",
        description: "Rebuilt entire frontend of e-commerce platform using React and TypeScript. Improved page load times by 60% and increased conversion rates by 25%. Implemented responsive design supporting mobile, tablet, and desktop.",
        technologies: ["React", "TypeScript", "Redux", "SCSS"],
      },
      {
        title: "Admin Dashboard Application",
        client: "SaaS Startup",
        duration: "4 months",
        role: "Lead Frontend Developer",
        description: "Created comprehensive admin dashboard with real-time data visualization, user management, and reporting features. Implemented complex state management using Redux toolkit.",
        technologies: ["React", "Redux Toolkit", "Chart.js", "Ant Design"],
      },
    ],
  },
};

for (let i = 3; i <= 25; i++) {
  mockTalentData[i] = {
    id: i,
    name: `Developer ${i}`,
    role: i % 3 === 0 ? "Full Stack Developer" : i % 3 === 1 ? "Backend Developer" : "Frontend Developer",
    location: "Mumbai, India",
    experience: `${3 + (i % 5)} years`,
    email: `developer${i}@tech.com`,
    phone: `+91-98765432${i % 10}`,
    noticePeriod: "30 Days",
    hourlyRate: `₹ ${((i % 5 + 10) * 100 * 4.17).toFixed(0)}`,
    monthlyRate: `₹ ${(i % 5 + 10) * 100}00`,
    marketRate: `₹ ${(i % 5 + 12) * 100}00`,
    availability: "Immediately Available",
    skills: [
      { skill: "JavaScript", level: "Expert" },
      { skill: "React", level: "Advanced" },
      { skill: "Node.js", level: "Intermediate" },
    ],
    summary: "Experienced developer with strong technical skills and proven track record in delivering high-quality solutions.",
    projects: [
      {
        title: "Web Application Development",
        client: "Tech Company",
        duration: "6 months",
        role: "Developer",
        description: "Developed and maintained web applications using modern frameworks and best practices.",
        technologies: ["React", "Node.js", "MongoDB"],
      },
    ],
  };
}

const TalentDetails = () => {
  const { talentId } = useParams();
  const navigate = useNavigate();
  const talent = mockTalentData[talentId];

  if (!talent) {
    return (
      <TalentDetailsWrapper>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Talent not found</h2>
          <Button type="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </TalentDetailsWrapper>
    );
  }

  return (
    <TalentDetailsWrapper>
      <div className="header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="back-button"
        >
          Back
        </Button>
        <h2>Talent Profile</h2>
      </div>

      <Card className="profile-card">
        <div className="profile-header">
          <div className="avatar-section">
            <Avatar size={100} className="talent-avatar">
              {talent.name.charAt(0)}
            </Avatar>
          </div>
          
          <div className="info-section">
            <h1>{talent.name}</h1>
            <p className="role">{talent.role}</p>
            
            <div className="verification-badges">
              <Tag 
                icon={<CheckCircleFilled />} 
                color="success" 
                style={{ fontSize: "13px", padding: "4px 12px", borderRadius: "4px" }}
              >
                Aadhar Card Verified
              </Tag>
              <Tag 
                icon={<CheckCircleFilled />} 
                color="success" 
                style={{ fontSize: "13px", padding: "4px 12px", borderRadius: "4px" }}
              >
                PAN Card Verified
              </Tag>
            </div>
            
            <div className="meta-info">
              <div className="info-item">
                <EnvironmentOutlined />
                <span>{talent.location}</span>
              </div>
              <div className="info-item">
                <ClockCircleOutlined />
                <span>{talent.experience} Experience</span>
              </div>
              <div className="info-item">
                <CalendarOutlined />
                <span>{talent.noticePeriod} Notice</span>
              </div>
            </div>
          </div>

          <div className="action-section">
            <Button icon={<DownloadOutlined />} block>
              Download Resume
            </Button>
          </div>
        </div>

        <div className="details-row">
          <div className="detail-item">
            <h4>Email Address</h4>
            <p>{talent.email}</p>
          </div>
          <div className="detail-item">
            <h4>Phone Number</h4>
            <p>{talent.phone}</p>
          </div>
          <div className="detail-item">
            <h4>Hourly Rate</h4>
            <p className="highlight">{talent.hourlyRate}</p>
          </div>
          <div className="detail-item">
            <h4>Monthly Rate</h4>
            <p className="highlight">{talent.monthlyRate}</p>
          </div>
          <div className="detail-item">
            <h4>Market Rate</h4>
            <p>{talent.marketRate}</p>
          </div>
          <div className="detail-item">
            <h4>Availability</h4>
            <p>{talent.availability}</p>
          </div>
        </div>
      </Card>

      <Card className="summary-card">
        <h3>Professional Summary</h3>
        <p>{talent.summary}</p>
      </Card>

      <Card className="skills-card">
        <h3>Technical Skills</h3>
        <div className="skills-grid">
          {talent.skills.map((skill, index) => (
            <Tag key={index} color="cyan" style={{ fontSize: 14, padding: "6px 12px" }}>
              {skill.skill} - {skill.level}
            </Tag>
          ))}
        </div>
      </Card>

      <Card className="projects-card">
        <h3>Project Experience</h3>
        {talent.projects.map((project, index) => (
          <div key={index} className="project-item">
            <h4>{project.title}</h4>
            <div className="project-meta">
              <span>
                <TeamOutlined /> {project.client}
              </span>
              <span>
                <CalendarOutlined /> {project.duration}
              </span>
              <span>
                <DollarOutlined /> {project.role}
              </span>
            </div>
            <p>{project.description}</p>
            <div className="tech-stack">
              {project.technologies.map((tech, idx) => (
                <Tag key={idx} color="blue">
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </TalentDetailsWrapper>
  );
};

export default TalentDetails;
