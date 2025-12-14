import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Avatar, Button, Tag } from "antd";
import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  DownloadOutlined,
  CheckCircleFilled,
  FileTextOutlined,
} from "@ant-design/icons";
import { TalentDetailsWrapper } from "./TalentDetails.style";

const mockTalentData = {
  1: {
    id: 1,
    name: "Rajesh Kumar",
    role: "SAP HANA Developer",
    location: "Bangalore, India",
    experience: "5 Years",
    email: "rajesh.kumar@gmail.com",
    phone: "+91-9876543210",
    noticePeriod: "30 Days",
    hourlyRate: "₹ 3,750",
    monthlyRate: "₹ 1,80,000",
    marketRate: "₹ 2,00,000",
    availability: "Immediately Available",
    organization: "TechCorp Solutions",
    skills: [
      { skill: "SAP HANA", level: "Expert" },
      { skill: "SQL", level: "Advanced" },
      { skill: "Data Modeling", level: "Expert" },
      { skill: "ABAP", level: "Intermediate" },
    ],
    summary: "Highly skilled SAP HANA Developer with over 5 years of experience in database design, optimization, and implementation. Proven track record of delivering high-performance solutions for enterprise clients.",
    projects: [
      {
        title: "Enterprise Data Migration",
        client: "Fortune 500 Company",
        duration: "8 months",
        role: "Lead Developer",
        description: "Led the migration of legacy database systems to SAP HANA, resulting in 40% improvement in query performance.",
        technologies: ["SAP HANA", "SQL", "Data Modeling", "ETL"],
      },
    ],
  },
  2: {
    id: 2,
    name: "Priya Sharma",
    role: "React Developer",
    location: "Mumbai, India",
    experience: "4 Years",
    email: "priya.sharma@gmail.com",
    phone: "+91-9876543211",
    noticePeriod: "15 Days",
    hourlyRate: "₹ 3,125",
    monthlyRate: "₹ 1,50,000",
    marketRate: "₹ 1,70,000",
    availability: "Available in 2 weeks",
    organization: "Digital Partners Inc",
    skills: [
      { skill: "React", level: "Expert" },
      { skill: "TypeScript", level: "Advanced" },
      { skill: "Redux", level: "Advanced" },
    ],
    summary: "Passionate React Developer with 4 years of experience building modern, responsive web applications. Strong expertise in React ecosystem.",
    projects: [
      {
        title: "E-commerce Platform",
        client: "Retail Giant",
        duration: "10 months",
        role: "Frontend Developer",
        description: "Rebuilt entire frontend of e-commerce platform using React and TypeScript.",
        technologies: ["React", "TypeScript", "Redux", "SCSS"],
      },
    ],
  },
  3: {
    id: 3,
    name: "Amit Patel",
    role: "DevOps Engineer",
    location: "Pune, India",
    experience: "6 Years",
    email: "amit.patel@gmail.com",
    phone: "+91-9876543212",
    noticePeriod: "30 Days",
    hourlyRate: "₹ 4,167",
    monthlyRate: "₹ 2,00,000",
    marketRate: "₹ 2,20,000",
    availability: "Immediately Available",
    organization: "Innovate Tech",
    skills: [
      { skill: "Docker", level: "Expert" },
      { skill: "Kubernetes", level: "Expert" },
      { skill: "AWS", level: "Advanced" },
    ],
    summary: "Experienced DevOps Engineer with 6 years of expertise in cloud infrastructure and CI/CD pipelines.",
    projects: [
      {
        title: "Cloud Migration",
        client: "Enterprise Corp",
        duration: "6 months",
        role: "DevOps Lead",
        description: "Migrated on-premise infrastructure to AWS cloud.",
        technologies: ["AWS", "Kubernetes", "Terraform"],
      },
    ],
  },
};

for (let i = 4; i <= 10; i++) {
  mockTalentData[i] = {
    id: i,
    name: `Developer ${i}`,
    role: i % 3 === 0 ? "Full Stack Developer" : i % 3 === 1 ? "Backend Developer" : "Frontend Developer",
    location: "Mumbai, India",
    experience: `${3 + (i % 5)} Years`,
    email: `developer${i}@tech.com`,
    phone: `+91-98765432${i % 10}`,
    noticePeriod: "30 Days",
    hourlyRate: `₹ ${((i % 5 + 10) * 100 * 4.17).toFixed(0)}`,
    monthlyRate: `₹ ${(i % 5 + 10) * 10},000`,
    marketRate: `₹ ${(i % 5 + 12) * 10},000`,
    availability: "Immediately Available",
    organization: "Sample Org",
    skills: [
      { skill: "JavaScript", level: "Expert" },
      { skill: "React", level: "Advanced" },
    ],
    summary: "Experienced developer with strong technical skills.",
    projects: [
      {
        title: "Web Application",
        client: "Tech Company",
        duration: "6 months",
        role: "Developer",
        description: "Developed and maintained web applications.",
        technologies: ["React", "Node.js"],
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
          onClick={() => navigate("/home/talent-profiles")}
          className="back-button"
        >
          Back to Talent Profiles
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
            <p className="organization">{talent.organization}</p>
            
            <div className="verification-badges">
              <Tag 
                icon={<CheckCircleFilled />} 
                color="success" 
                style={{ fontSize: "13px", padding: "4px 12px", borderRadius: "4px" }}
              >
                Background Verified
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
            <Button 
              type="primary" 
              icon={<FileTextOutlined />} 
              block
              onClick={() => navigate(`/home/talent-profiles/documents/${talentId}`)}
            >
              View Documents
            </Button>
            <Button icon={<DownloadOutlined />} block>
              Download Resume
            </Button>
          </div>
        </div>

        <div className="details-row">
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
