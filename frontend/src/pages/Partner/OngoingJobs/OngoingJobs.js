import React, { useEffect, useState } from "react";
import {
  Input,
  Card,
  Row,
  Col,
  Empty,
  Typography,
  Badge,
  Tag,
  Divider,
  Space,
} from "antd";
import {
  DollarOutlined,
  CalendarOutlined,
  MessageOutlined,
  EnvironmentOutlined,
  UserOutlined,
  LaptopOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { API_CONST } from "../../../const";
import { OngoingJobsWrapper } from "./OngoingJobs.style";

const { Search } = Input;
const { Title, Text, Paragraph } = Typography;

const dummyJobs = [
  {
    id: "JOB-2024-001",
    title: "Senior React Developer",
    company: "TechCorp Solutions",
    companyType: "Product",
    location: "Remote",
    openPositions: 3,
    designation: "Senior React Developer",
    experience: "5-7 years",
    employmentType: "Full Time",
    salary: "₹15-20 LPA",
    skills: ["React", "TypeScript", "Node.js"],
    interested: 24,
    primarySkills: ["React.js", "TypeScript", "Redux", "Next.js"],
    goodToHaveSkills: ["GraphQL", "AWS", "Docker"],
    projectDuration: "6 months",
    communication: "Excellent",
    startDate: "15 Dec 2024",
    systemProvided: true,
    workTime: "9 AM - 6 PM IST",
    timeZone: "IST",
    descriptionPoints: [
      "Develop and maintain scalable web applications using React.js",
      "Collaborate with cross-functional teams to define and implement new features",
      "Write clean, maintainable, and testable code following best practices",
      "Participate in code reviews and mentor junior developers",
      "Optimize applications for maximum speed and scalability",
    ],
  },
  {
    id: "JOB-2024-002",
    title: "Full Stack Java Developer",
    company: "Enterprise Systems Inc",
    companyType: "Service",
    location: "Bangalore",
    openPositions: 2,
    designation: "Full Stack Java Developer",
    experience: "4-6 years",
    employmentType: "Contract",
    salary: "₹12-18 LPA",
    skills: ["Java", "Spring Boot", "Angular"],
    interested: 18,
    primarySkills: ["Java", "Spring Boot", "Microservices", "Angular"],
    goodToHaveSkills: ["Kubernetes", "Jenkins", "MySQL"],
    projectDuration: "12 months",
    communication: "Good",
    startDate: "1 Jan 2025",
    systemProvided: false,
    workTime: "10 AM - 7 PM IST",
    timeZone: "IST",
    descriptionPoints: [
      "Design and develop enterprise-level applications using Java and Spring Boot",
      "Build RESTful APIs and integrate with frontend applications",
      "Implement microservices architecture and containerization",
      "Work with databases and optimize query performance",
      "Ensure code quality through unit testing and integration testing",
    ],
  },
  {
    id: "JOB-2024-003",
    title: "DevOps Engineer",
    company: "CloudNative Labs",
    companyType: "Startup",
    location: "Hyderabad",
    openPositions: 1,
    designation: "DevOps Engineer",
    experience: "3-5 years",
    employmentType: "Full Time",
    salary: "₹10-15 LPA",
    skills: ["AWS", "Docker", "Kubernetes"],
    interested: 15,
    primarySkills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    goodToHaveSkills: ["Ansible", "Prometheus", "Grafana"],
    projectDuration: "Permanent",
    communication: "Excellent",
    startDate: "20 Dec 2024",
    systemProvided: true,
    workTime: "Flexible",
    timeZone: "IST",
    descriptionPoints: [
      "Manage cloud infrastructure on AWS and implement CI/CD pipelines",
      "Automate deployment processes using Docker and Kubernetes",
      "Monitor system performance and ensure high availability",
      "Implement security best practices and compliance requirements",
      "Collaborate with development teams to optimize application deployment",
    ],
  },
  {
    id: "JOB-2024-004",
    title: "Python Backend Developer",
    company: "DataDriven AI",
    companyType: "Product",
    location: "Pune",
    openPositions: 4,
    designation: "Python Backend Developer",
    experience: "2-4 years",
    employmentType: "Full Time",
    salary: "₹8-12 LPA",
    skills: ["Python", "Django", "PostgreSQL"],
    interested: 32,
    primarySkills: ["Python", "Django", "FastAPI", "PostgreSQL", "Redis"],
    goodToHaveSkills: ["Celery", "RabbitMQ", "MongoDB"],
    projectDuration: "9 months",
    communication: "Good",
    startDate: "10 Jan 2025",
    systemProvided: true,
    workTime: "9 AM - 6 PM IST",
    timeZone: "IST",
    descriptionPoints: [
      "Develop and maintain backend services using Python and Django",
      "Design and implement RESTful APIs for mobile and web applications",
      "Work with databases and optimize data models",
      "Implement caching strategies and background task processing",
      "Write comprehensive tests and documentation",
    ],
  },
  {
    id: "JOB-2024-005",
    title: "Mobile App Developer (React Native)",
    company: "MobileFirst Tech",
    companyType: "Startup",
    location: "Remote",
    openPositions: 2,
    designation: "Mobile App Developer",
    experience: "3-5 years",
    employmentType: "Contract",
    salary: "₹12-16 LPA",
    skills: ["React Native", "JavaScript", "iOS"],
    interested: 21,
    primarySkills: ["React Native", "JavaScript", "TypeScript", "Redux"],
    goodToHaveSkills: ["Swift", "Kotlin", "Firebase"],
    projectDuration: "8 months",
    communication: "Excellent",
    startDate: "5 Jan 2025",
    systemProvided: false,
    workTime: "10 AM - 7 PM IST",
    timeZone: "IST",
    descriptionPoints: [
      "Develop cross-platform mobile applications using React Native",
      "Integrate with native modules and third-party APIs",
      "Optimize app performance and user experience",
      "Implement push notifications and deep linking",
      "Collaborate with designers to implement pixel-perfect UIs",
    ],
  },
];

const OngoingJobs = () => {
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobsData, setUsersData] = useState(dummyJobs);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_CONST.GET_JOB_REQUIREMENTS, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        if (result.Response && result.Response.length > 0) {
          setUsersData(result.Response);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const filteredJobs = jobsData.filter(
    (job) =>
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.toLowerCase().includes(search.toLowerCase()) ||
      job.designation?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <OngoingJobsWrapper>
      <Row gutter={[0, 24]} style={{ margin: 0 }}>
        <Col span={24}>
          <div className="search-section">
            <Search
              placeholder="Search jobs by title, company, or designation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
              size="large"
              style={{ width: "100%" }}
            />
          </div>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="content-section">
        <Col xs={24} md={10} className="jobs-list-column">
          <div className="jobs-scroll-container">
            {filteredJobs.length === 0 ? (
              <Empty description="No jobs found." />
            ) : (
              filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  hoverable
                  onClick={() => setSelectedJob(job)}
                  className={`job-list-card ${selectedJob?.id === job.id ? 'selected' : ''}`}
                >
                  <Row gutter={8} className="info-row">
                    <Col span={8}>
                      <Text>
                        <UserOutlined />
                        {job.companyType}
                      </Text>
                    </Col>
                    <Col span={8}>
                      <Text>
                        <EnvironmentOutlined />
                        {job.location}
                      </Text>
                    </Col>
                    <Col span={8}>
                      <Text>
                        <LaptopOutlined />
                        {job.openPositions} Open
                      </Text>
                    </Col>
                  </Row>

                  <Row className="title-row">
                    <Col span={24}>
                      <Text strong>
                        {job.designation} ({job.experience} Exp)
                      </Text>
                    </Col>
                  </Row>

                  <Row className="employment-row">
                    <Col span={12}>
                      <Tag
                        color={
                          job.employmentType === "Full Time"
                            ? "green"
                            : "orange"
                        }
                      >
                        {job.employmentType}
                      </Tag>
                    </Col>
                    <Col span={12}>
                      <Badge
                        color="blue"
                        text={
                          <span>
                            <DollarOutlined /> {job.salary}
                          </span>
                        }
                      />
                    </Col>
                  </Row>

                  <Row className="skills-row">
                    <Col span={24}>
                      <Space wrap>
                        {job.skills?.map((skill) => (
                          <Tag key={skill} color="geekblue">
                            {skill}
                          </Tag>
                        ))}
                      </Space>
                    </Col>
                  </Row>
                </Card>
              ))
            )}
          </div>
        </Col>

        <Col xs={24} md={14} className="job-details-column">
          <Card className="details-card">
            {selectedJob ? (
              <>
                <Row gutter={16} className="job-id-row">
                  <Col span={6}>
                    <Text strong>
                      Job ID: <Tag color="blue">{selectedJob.id}</Tag>
                    </Text>
                  </Col>
                  <Col span={6}>
                    <Text>
                      <UserOutlined />
                      {selectedJob.interested} Interested
                    </Text>
                  </Col>
                  <Col span={6}>
                    <Text>
                      <EnvironmentOutlined />
                      {selectedJob.location}
                    </Text>
                  </Col>
                  <Col span={6}>
                    <Text>
                      <LaptopOutlined />
                      {selectedJob.openPositions} Open
                    </Text>
                  </Col>
                </Row>
                
                <Divider />
                
                <Row className="title-row">
                  <Col span={24}>
                    <Title level={4}>
                      {selectedJob.designation} ({selectedJob.experience} Exp)
                    </Title>
                  </Col>
                </Row>
                
                <Row gutter={16} className="badges-row">
                  <Col span={8}>
                    <Badge
                      color="green"
                      text={
                        <span>
                          <DollarOutlined /> {selectedJob.salary}
                        </span>
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <Badge
                      color="purple"
                      text={
                        <span>
                          <CalendarOutlined /> {selectedJob.projectDuration}
                        </span>
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <Badge
                      color="blue"
                      text={
                        <span>
                          <MessageOutlined /> {selectedJob.communication}
                        </span>
                      }
                    />
                  </Col>
                </Row>
                
                <Divider />
                
                <Row className="skills-section">
                  <Col span={24}>
                    <Text strong>Primary Skills: </Text>
                    <Space wrap>
                      {selectedJob.primarySkills?.map((skill) => (
                        <Tag key={skill} color="geekblue">
                          {skill}
                        </Tag>
                      ))}
                    </Space>
                  </Col>
                </Row>
                
                <Row className="skills-section">
                  <Col span={24}>
                    <Text strong>Good to have: </Text>
                    <Space wrap>
                      {selectedJob.goodToHaveSkills?.map((skill) => (
                        <Tag key={skill} color="cyan">
                          {skill}
                        </Tag>
                      ))}
                    </Space>
                  </Col>
                </Row>
                
                <Row gutter={16} className="info-grid">
                  <Col span={12}>
                    <Row>
                      <Col span={24}>
                        <Text>
                          <CalendarOutlined />
                          Start Date: {selectedJob.startDate}
                        </Text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 8 }}>
                      <Col span={24}>
                        <Text>
                          <LaptopOutlined />
                          System:{" "}
                          <Tag
                            color={selectedJob.systemProvided ? "green" : "red"}
                          >
                            {selectedJob.systemProvided
                              ? "Provided"
                              : "Not Provided"}
                          </Tag>
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span={24}>
                        <Text>
                          <ClockCircleOutlined />
                          Work Time: {selectedJob.workTime}
                        </Text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 8 }}>
                      <Col span={24}>
                        <Text>
                          <EnvironmentOutlined />
                          Time Zone: {selectedJob.timeZone}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                
                <Divider />
                
                <Row className="description-section">
                  <Col span={24}>
                    <Text strong>Job Description:</Text>
                    <ul>
                      {selectedJob.descriptionPoints?.map((point, idx) => (
                        <li key={idx}>
                          <Text>{point}</Text>
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </>
            ) : (
              <div className="empty-state">
                <Empty description="Select a job card to view details." />
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </OngoingJobsWrapper>
  );
};

export default OngoingJobs;
