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
  Button,
  Select,
  Drawer,
} from "antd";
import {
  DollarOutlined,
  CalendarOutlined,
  MessageOutlined,
  EnvironmentOutlined,
  UserOutlined,
  LaptopOutlined,
  ClockCircleOutlined,
  FilterOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { API_CONST } from "../../../const";
import { OngoingJobsWrapper } from "./OngoingJobs.style";

const { Search } = Input;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const dummyJobs = [
  {
    id: "JOB-2024-001",
    title: "Senior React Developer",
    company: "TechCorp Solutions",
    companyType: "Product",
    location: "Remote",
    industry: "IT Services",
    openPositions: 3,
    designation: "Senior React Developer",
    experience: "5-7 years",
    employmentType: "Full Time",
    contractType: "Contract",
    workingMode: "Remote",
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
    description: {
      overview: "We are seeking an experienced Senior React Developer to join our dynamic engineering team. The ideal candidate will lead the development of modern, scalable web applications using React.js and related technologies.",
      requiredExperience: [
        "5-7 years of professional experience in front-end development",
        "Strong expertise in React.js, including hooks, context API, and component lifecycle",
        "Advanced proficiency in TypeScript for type-safe application development",
        "Experience with state management libraries like Redux or MobX",
        "Solid understanding of modern JavaScript (ES6+) and web standards",
        "Hands-on experience with Next.js for server-side rendering",
        "Proficiency in responsive design and cross-browser compatibility"
      ],
      responsibilities: [
        "Design and develop scalable, high-performance web applications using React.js",
        "Collaborate with UX/UI designers to implement pixel-perfect user interfaces",
        "Write clean, maintainable, and well-documented code following industry best practices",
        "Lead code reviews and provide constructive feedback to team members",
        "Mentor junior developers and contribute to team knowledge sharing",
        "Optimize application performance and ensure excellent user experience",
        "Participate in architectural decisions and technical planning sessions",
        "Stay updated with emerging technologies and industry trends"
      ],
      qualifications: [
        "Bachelor's degree in Computer Science or equivalent practical experience",
        "Strong problem-solving skills and attention to detail",
        "Excellent communication and teamwork abilities",
        "Experience with agile development methodologies",
        "Familiarity with Git version control and CI/CD pipelines"
      ]
    }
  },
  {
    id: "JOB-2024-002",
    title: "Full Stack Java Developer",
    company: "Enterprise Systems Inc",
    companyType: "Service",
    location: "Bangalore",
    industry: "Enterprise Software",
    openPositions: 2,
    designation: "Full Stack Java Developer",
    experience: "4-6 years",
    employmentType: "Contract",
    contractType: "Contract",
    workingMode: "Hybrid",
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
    description: {
      overview: "Join our enterprise software team as a Full Stack Java Developer to build robust, scalable applications for Fortune 500 clients. You'll work on cutting-edge microservices architecture using Java Spring Boot and Angular.",
      requiredExperience: [
        "4-6 years of full-stack development experience with Java technologies",
        "Strong proficiency in Java 8+ and Spring Boot framework",
        "Experience designing and implementing RESTful APIs",
        "Solid understanding of microservices architecture and design patterns",
        "Front-end development experience with Angular 12+",
        "Working knowledge of SQL and NoSQL databases",
        "Experience with containerization using Docker"
      ],
      responsibilities: [
        "Design and develop enterprise-grade applications using Java Spring Boot",
        "Build and maintain microservices for distributed systems",
        "Create responsive front-end interfaces using Angular framework",
        "Implement secure RESTful APIs and integrate third-party services",
        "Write comprehensive unit tests and integration tests",
        "Optimize database queries and application performance",
        "Collaborate with DevOps team for deployment and monitoring",
        "Participate in requirement analysis and technical documentation"
      ],
      qualifications: [
        "Bachelor's degree in Computer Science, Engineering, or related field",
        "Strong analytical and problem-solving capabilities",
        "Experience with agile/scrum methodologies",
        "Knowledge of design patterns and software architecture principles",
        "Excellent verbal and written communication skills"
      ]
    }
  },
  {
    id: "JOB-2024-003",
    title: "DevOps Engineer",
    company: "CloudNative Labs",
    companyType: "Startup",
    location: "Hyderabad",
    industry: "Cloud Services",
    openPositions: 1,
    designation: "DevOps Engineer",
    experience: "3-5 years",
    employmentType: "Full Time",
    contractType: "Permanent",
    workingMode: "Office",
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
    description: {
      overview: "We're looking for a skilled DevOps Engineer to join our cloud infrastructure team. You'll be responsible for building and maintaining our AWS-based infrastructure, implementing CI/CD pipelines, and ensuring system reliability.",
      requiredExperience: [
        "3-5 years of hands-on DevOps experience in production environments",
        "Strong expertise in AWS cloud services (EC2, S3, RDS, Lambda, etc.)",
        "Proficiency in containerization using Docker and orchestration with Kubernetes",
        "Experience with Infrastructure as Code using Terraform or CloudFormation",
        "Solid understanding of CI/CD pipelines using Jenkins or GitLab CI",
        "Working knowledge of Linux system administration",
        "Experience with monitoring and logging tools"
      ],
      responsibilities: [
        "Design, implement, and manage scalable AWS cloud infrastructure",
        "Build and maintain automated CI/CD pipelines for multiple applications",
        "Manage Kubernetes clusters and containerized applications",
        "Implement infrastructure as code using Terraform",
        "Set up monitoring, alerting, and logging systems (Prometheus, Grafana, ELK)",
        "Ensure high availability and disaster recovery procedures",
        "Implement security best practices and compliance requirements",
        "Collaborate with development teams to optimize deployment processes",
        "Troubleshoot production issues and perform root cause analysis"
      ],
      qualifications: [
        "Bachelor's degree in Computer Science or related technical field",
        "Strong scripting skills (Python, Bash, or similar)",
        "Understanding of networking concepts and security principles",
        "Experience with version control systems (Git)",
        "Excellent problem-solving and communication skills"
      ]
    }
  },
  {
    id: "JOB-2024-004",
    title: "Python Backend Developer",
    company: "DataDriven AI",
    companyType: "Product",
    location: "Pune",
    industry: "Artificial Intelligence",
    openPositions: 4,
    designation: "Python Backend Developer",
    experience: "2-4 years",
    employmentType: "Full Time",
    contractType: "Contract",
    workingMode: "Remote",
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
    description: {
      overview: "Join our AI-driven product team as a Python Backend Developer. You'll build scalable backend services that power our machine learning applications and data processing pipelines.",
      requiredExperience: [
        "2-4 years of backend development experience with Python",
        "Strong proficiency in Django or Flask framework",
        "Experience with FastAPI for building high-performance APIs",
        "Solid understanding of RESTful API design principles",
        "Working experience with PostgreSQL and database optimization",
        "Knowledge of Redis for caching and session management",
        "Familiarity with asynchronous task processing"
      ],
      responsibilities: [
        "Develop and maintain robust backend services using Python and Django",
        "Design and implement RESTful APIs for web and mobile applications",
        "Work with data science team to integrate ML models into production",
        "Optimize database queries and implement efficient data models",
        "Implement caching strategies using Redis for improved performance",
        "Build asynchronous task processing using Celery",
        "Write comprehensive unit tests and API documentation",
        "Ensure code quality through code reviews and best practices",
        "Monitor application performance and troubleshoot production issues"
      ],
      qualifications: [
        "Bachelor's degree in Computer Science or related field",
        "Strong understanding of data structures and algorithms",
        "Experience with Git version control",
        "Knowledge of software testing methodologies",
        "Good communication and teamwork skills"
      ]
    }
  },
  {
    id: "JOB-2024-005",
    title: "Mobile App Developer (React Native)",
    company: "MobileFirst Tech",
    companyType: "Startup",
    location: "Remote",
    industry: "Mobile Technology",
    openPositions: 2,
    designation: "Mobile App Developer",
    experience: "3-5 years",
    employmentType: "Contract",
    contractType: "Contract",
    workingMode: "Remote",
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
    description: {
      overview: "We're seeking an experienced React Native Developer to build innovative mobile applications for both iOS and Android platforms. You'll work on consumer-facing apps with millions of users.",
      requiredExperience: [
        "3-5 years of mobile app development experience with React Native",
        "Strong proficiency in JavaScript and TypeScript",
        "Experience building and deploying apps to App Store and Play Store",
        "Solid understanding of React Native architecture and native modules",
        "Working knowledge of Redux or other state management solutions",
        "Experience with RESTful APIs and third-party integrations",
        "Familiarity with mobile app performance optimization"
      ],
      responsibilities: [
        "Develop cross-platform mobile applications using React Native",
        "Build reusable components and maintain code quality standards",
        "Integrate with native modules when required (iOS/Android)",
        "Implement push notifications, deep linking, and analytics",
        "Optimize app performance and minimize bundle size",
        "Write unit tests and ensure code coverage",
        "Collaborate with designers to implement pixel-perfect UIs",
        "Debug and fix issues across different devices and OS versions",
        "Maintain app releases and handle App Store submissions"
      ],
      qualifications: [
        "Bachelor's degree in Computer Science or equivalent experience",
        "Strong problem-solving and debugging skills",
        "Experience with Git and agile development processes",
        "Understanding of mobile app security best practices",
        "Excellent attention to detail and user experience"
      ]
    }
  },
];

const OngoingJobs = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobsData, setUsersData] = useState(dummyJobs);
  const [moreFiltersVisible, setMoreFiltersVisible] = useState(false);
  
  const [filters, setFilters] = useState({
    location: null,
    primarySkill: null,
    companyType: null,
    industry: null,
    experience: null,
    contractType: null,
    workingMode: null,
  });

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

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.toLowerCase().includes(search.toLowerCase()) ||
      job.designation?.toLowerCase().includes(search.toLowerCase());

    const matchesLocation = !filters.location || job.location === filters.location;
    const matchesCompanyType = !filters.companyType || job.companyType === filters.companyType;
    const matchesIndustry = !filters.industry || job.industry === filters.industry;
    const matchesExperience = !filters.experience || job.experience === filters.experience;
    const matchesContractType = !filters.contractType || job.contractType === filters.contractType;
    const matchesWorkingMode = !filters.workingMode || job.workingMode === filters.workingMode;
    const matchesPrimarySkill = !filters.primarySkill || 
      job.primarySkills?.some(skill => skill.toLowerCase().includes(filters.primarySkill.toLowerCase()));

    return matchesSearch && matchesLocation && matchesCompanyType && matchesIndustry && 
           matchesExperience && matchesContractType && matchesWorkingMode && matchesPrimarySkill;
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      location: null,
      primarySkill: null,
      companyType: null,
      industry: null,
      experience: null,
      contractType: null,
      workingMode: null,
    });
  };

  const locations = [...new Set(jobsData.map(job => job.location))];
  const companyTypes = [...new Set(jobsData.map(job => job.companyType))];
  const industries = [...new Set(jobsData.map(job => job.industry))];
  const experiences = [...new Set(jobsData.map(job => job.experience))];
  const contractTypes = [...new Set(jobsData.map(job => job.contractType))];
  const workingModes = [...new Set(jobsData.map(job => job.workingMode))];
  const allSkills = [...new Set(jobsData.flatMap(job => job.primarySkills || []))];

  const activeFilterCount = Object.values(filters).filter(v => v !== null).length;
  const moreFiltersCount = [filters.companyType, filters.industry, filters.experience, filters.contractType, filters.workingMode].filter(v => v !== null).length;

  return (
    <OngoingJobsWrapper>
      <Row gutter={[0, 24]} style={{ margin: 0 }}>
        <Col span={24}>
          <div className="search-section">
            <div className="search-filters-row">
              <Search
                placeholder="Search jobs by title, company, or designation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                allowClear
                size="large"
                className="search-input"
              />
              
              <Select
                placeholder="Location"
                allowClear
                value={filters.location}
                onChange={(value) => handleFilterChange('location', value)}
                className="primary-filter"
                size="large"
              >
                {locations.map(loc => (
                  <Option key={loc} value={loc}>{loc}</Option>
                ))}
              </Select>

              <Select
                placeholder="Primary Skill"
                allowClear
                showSearch
                value={filters.primarySkill}
                onChange={(value) => handleFilterChange('primarySkill', value)}
                className="primary-filter"
                size="large"
              >
                {allSkills.map(skill => (
                  <Option key={skill} value={skill}>{skill}</Option>
                ))}
              </Select>

              <Button
                icon={<FilterOutlined />}
                onClick={() => setMoreFiltersVisible(true)}
                size="large"
                className="more-filters-btn"
              >
                More Filters {moreFiltersCount > 0 && `(${moreFiltersCount})`}
              </Button>

              {activeFilterCount > 0 && (
                <Button onClick={clearAllFilters} type="link" size="large">
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Drawer
        title="More Filters"
        placement="right"
        onClose={() => setMoreFiltersVisible(false)}
        open={moreFiltersVisible}
        width={400}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>Company Type</Text>
            <Select
              placeholder="Select company type"
              allowClear
              value={filters.companyType}
              onChange={(value) => handleFilterChange('companyType', value)}
              style={{ width: '100%', marginTop: 8 }}
            >
              {companyTypes.map(type => (
                <Option key={type} value={type}>{type}</Option>
              ))}
            </Select>
          </div>

          <div>
            <Text strong>Industry</Text>
            <Select
              placeholder="Select industry"
              allowClear
              value={filters.industry}
              onChange={(value) => handleFilterChange('industry', value)}
              style={{ width: '100%', marginTop: 8 }}
            >
              {industries.map(ind => (
                <Option key={ind} value={ind}>{ind}</Option>
              ))}
            </Select>
          </div>

          <div>
            <Text strong>Experience</Text>
            <Select
              placeholder="Select experience"
              allowClear
              value={filters.experience}
              onChange={(value) => handleFilterChange('experience', value)}
              style={{ width: '100%', marginTop: 8 }}
            >
              {experiences.map(exp => (
                <Option key={exp} value={exp}>{exp}</Option>
              ))}
            </Select>
          </div>

          <div>
            <Text strong>Contract Type</Text>
            <Select
              placeholder="Select contract type"
              allowClear
              value={filters.contractType}
              onChange={(value) => handleFilterChange('contractType', value)}
              style={{ width: '100%', marginTop: 8 }}
            >
              {contractTypes.map(type => (
                <Option key={type} value={type}>{type}</Option>
              ))}
            </Select>
          </div>

          <div>
            <Text strong>Working Mode</Text>
            <Select
              placeholder="Select working mode"
              allowClear
              value={filters.workingMode}
              onChange={(value) => handleFilterChange('workingMode', value)}
              style={{ width: '100%', marginTop: 8 }}
            >
              {workingModes.map(mode => (
                <Option key={mode} value={mode}>{mode}</Option>
              ))}
            </Select>
          </div>
        </Space>
      </Drawer>

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
                      <span className="salary-highlight">
                        {job.salary}
                      </span>
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
                <Row justify="end" style={{ marginBottom: 16 }}>
                  <Col>
                    <Button
                      type="primary"
                      size="large"
                      icon={<SendOutlined />}
                      className="submit-profiles-btn"
                      onClick={() => navigate(`/partner/submit-profiles/${selectedJob.id}`)}
                    >
                      Submit Profiles
                    </Button>
                  </Col>
                </Row>

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
                    <Text strong className="salary-amount">
                      <DollarOutlined /> {selectedJob.salary}
                    </Text>
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
                    {selectedJob.description && (
                      <>
                        <div className="description-block">
                          <Text strong className="description-title">Overview</Text>
                          <Paragraph className="description-text">
                            {selectedJob.description.overview}
                          </Paragraph>
                        </div>

                        <div className="description-block">
                          <Text strong className="description-title">Required Experience</Text>
                          <ul className="description-list">
                            {selectedJob.description.requiredExperience?.map((item, idx) => (
                              <li key={idx}>
                                <Text>{item}</Text>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="description-block">
                          <Text strong className="description-title">Key Responsibilities</Text>
                          <ul className="description-list">
                            {selectedJob.description.responsibilities?.map((item, idx) => (
                              <li key={idx}>
                                <Text>{item}</Text>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="description-block">
                          <Text strong className="description-title">Qualifications</Text>
                          <ul className="description-list">
                            {selectedJob.description.qualifications?.map((item, idx) => (
                              <li key={idx}>
                                <Text>{item}</Text>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
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
