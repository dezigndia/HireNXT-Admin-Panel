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
  SearchOutlined,
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
    salary: "₹1,80,000 / Month",
    salaryPerMonth: "1,80,000",
    skills: ["React", "TypeScript", "Node.js"],
    interested: 24,
    primarySkills: ["React.js", "TypeScript", "Redux", "Next.js"],
    goodToHaveSkills: ["GraphQL", "AWS", "Docker"],
    projectDuration: "6 Months",
    communication: "Excellent",
    startDate: "15 Dec 2024",
    systemProvided: true,
    workTime: "9 AM - 6 PM IST",
    timeZone: "IST",
    jobDescription: "We are seeking an experienced Senior React Developer to join our dynamic engineering team. The ideal candidate will lead the development of modern, scalable web applications using React.js and related technologies.\n\nRequired Experience:\n- 5-7 years of professional experience in front-end development\n- Strong expertise in React.js, including hooks, context API, and component lifecycle\n- Advanced proficiency in TypeScript for type-safe application development\n- Experience with state management libraries like Redux or MobX\n- Solid understanding of modern JavaScript (ES6+) and web standards\n- Hands-on experience with Next.js for server-side rendering\n- Proficiency in responsive design and cross-browser compatibility\n\nKey Responsibilities:\n- Design and develop scalable, high-performance web applications using React.js\n- Collaborate with UX/UI designers to implement pixel-perfect user interfaces\n- Write clean, maintainable, and well-documented code following industry best practices\n- Lead code reviews and provide constructive feedback to team members\n- Mentor junior developers and contribute to team knowledge sharing\n- Optimize application performance and ensure excellent user experience\n- Participate in architectural decisions and technical planning sessions\n- Stay updated with emerging technologies and industry trends\n\nQualifications:\n- Bachelor's degree in Computer Science or equivalent practical experience\n- Strong problem-solving skills and attention to detail\n- Excellent communication and teamwork abilities\n- Experience with agile development methodologies\n- Familiarity with Git version control and CI/CD pipelines"
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
    salary: "₹1,50,000 / Month",
    salaryPerMonth: "1,50,000",
    skills: ["Java", "Spring Boot", "Angular"],
    interested: 18,
    primarySkills: ["Java", "Spring Boot", "Microservices", "Angular"],
    goodToHaveSkills: ["Kubernetes", "Jenkins", "MySQL"],
    projectDuration: "12 Months",
    communication: "Good",
    startDate: "1 Jan 2025",
    systemProvided: false,
    workTime: "10 AM - 7 PM IST",
    timeZone: "IST",
    jobDescription: "Join our enterprise software team as a Full Stack Java Developer to build robust, scalable applications for Fortune 500 clients. You'll work on cutting-edge microservices architecture using Java Spring Boot and Angular.\n\nRequired Experience:\n- 4-6 years of full-stack development experience with Java technologies\n- Strong proficiency in Java 8+ and Spring Boot framework\n- Experience designing and implementing RESTful APIs\n- Solid understanding of microservices architecture and design patterns\n- Front-end development experience with Angular 12+\n- Working knowledge of SQL and NoSQL databases\n- Experience with containerization using Docker\n\nKey Responsibilities:\n- Design and develop enterprise-grade applications using Java Spring Boot\n- Build and maintain microservices for distributed systems\n- Create responsive front-end interfaces using Angular framework\n- Implement secure RESTful APIs and integrate third-party services\n- Write comprehensive unit tests and integration tests\n- Optimize database queries and application performance\n- Collaborate with DevOps team for deployment and monitoring\n- Participate in requirement analysis and technical documentation\n\nQualifications:\n- Bachelor's degree in Computer Science, Engineering, or related field\n- Strong analytical and problem-solving capabilities\n- Experience with agile/scrum methodologies\n- Knowledge of design patterns and software architecture principles\n- Excellent verbal and written communication skills"
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
    salary: "₹1,25,000 / Month",
    salaryPerMonth: "1,25,000",
    skills: ["AWS", "Docker", "Kubernetes"],
    interested: 15,
    primarySkills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    goodToHaveSkills: ["Ansible", "Prometheus", "Grafana"],
    projectDuration: "Permanent Role",
    communication: "Excellent",
    startDate: "20 Dec 2024",
    systemProvided: true,
    workTime: "Flexible",
    timeZone: "IST",
    jobDescription: "We're looking for a skilled DevOps Engineer to join our cloud infrastructure team. You'll be responsible for building and maintaining our AWS-based infrastructure, implementing CI/CD pipelines, and ensuring system reliability.\n\nRequired Experience:\n- 3-5 years of hands-on DevOps experience in production environments\n- Strong expertise in AWS cloud services (EC2, S3, RDS, Lambda, etc.)\n- Proficiency in containerization using Docker and orchestration with Kubernetes\n- Experience with Infrastructure as Code using Terraform or CloudFormation\n- Solid understanding of CI/CD pipelines using Jenkins or GitLab CI\n- Working knowledge of Linux system administration\n- Experience with monitoring and logging tools\n\nKey Responsibilities:\n- Design, implement, and manage scalable AWS cloud infrastructure\n- Build and maintain automated CI/CD pipelines for multiple applications\n- Manage Kubernetes clusters and containerized applications\n- Implement infrastructure as code using Terraform\n- Set up monitoring, alerting, and logging systems (Prometheus, Grafana, ELK)\n- Ensure high availability and disaster recovery procedures\n- Implement security best practices and compliance requirements\n- Collaborate with development teams to optimize deployment processes\n- Troubleshoot production issues and perform root cause analysis\n\nQualifications:\n- Bachelor's degree in Computer Science or related technical field\n- Strong scripting skills (Python, Bash, or similar)\n- Understanding of networking concepts and security principles\n- Experience with version control systems (Git)\n- Excellent problem-solving and communication skills"
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
    salary: "₹1,00,000 / Month",
    salaryPerMonth: "1,00,000",
    skills: ["Python", "Django", "PostgreSQL"],
    interested: 32,
    primarySkills: ["Python", "Django", "FastAPI", "PostgreSQL", "Redis"],
    goodToHaveSkills: ["Celery", "RabbitMQ", "MongoDB"],
    projectDuration: "9 Months",
    communication: "Good",
    startDate: "10 Jan 2025",
    systemProvided: true,
    workTime: "9 AM - 6 PM IST",
    timeZone: "IST",
    jobDescription: "Join our AI-driven product team as a Python Backend Developer. You'll build scalable backend services that power our machine learning applications and data processing pipelines.\n\nRequired Experience:\n- 2-4 years of backend development experience with Python\n- Strong proficiency in Django or Flask framework\n- Experience with FastAPI for building high-performance APIs\n- Solid understanding of RESTful API design principles\n- Working experience with PostgreSQL and database optimization\n- Knowledge of Redis for caching and session management\n- Familiarity with asynchronous task processing\n\nKey Responsibilities:\n- Develop and maintain robust backend services using Python and Django\n- Design and implement RESTful APIs for web and mobile applications\n- Work with data science team to integrate ML models into production\n- Optimize database queries and implement efficient data models\n- Implement caching strategies using Redis for improved performance\n- Build asynchronous task processing using Celery\n- Write comprehensive unit tests and API documentation\n- Ensure code quality through code reviews and best practices\n- Monitor application performance and troubleshoot production issues\n\nQualifications:\n- Bachelor's degree in Computer Science or related field\n- Strong understanding of data structures and algorithms\n- Experience with Git version control\n- Knowledge of software testing methodologies\n- Good communication and teamwork skills"
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
    salary: "₹1,40,000 / Month",
    salaryPerMonth: "1,40,000",
    skills: ["React Native", "JavaScript", "iOS"],
    interested: 21,
    primarySkills: ["React Native", "JavaScript", "TypeScript", "Redux"],
    goodToHaveSkills: ["Swift", "Kotlin", "Firebase"],
    projectDuration: "8 Months",
    communication: "Excellent",
    startDate: "5 Jan 2025",
    systemProvided: false,
    workTime: "10 AM - 7 PM IST",
    timeZone: "IST",
    jobDescription: "We're seeking an experienced React Native Developer to build innovative mobile applications for both iOS and Android platforms. You'll work on consumer-facing apps with millions of users.\n\nRequired Experience:\n- 3-5 years of mobile app development experience with React Native\n- Strong proficiency in JavaScript and TypeScript\n- Experience building and deploying apps to App Store and Play Store\n- Solid understanding of React Native architecture and native modules\n- Working knowledge of Redux or other state management solutions\n- Experience with RESTful APIs and third-party integrations\n- Familiarity with mobile app performance optimization\n\nKey Responsibilities:\n- Develop cross-platform mobile applications using React Native\n- Build reusable components and maintain code quality standards\n- Integrate with native modules when required (iOS/Android)\n- Implement push notifications, deep linking, and analytics\n- Optimize app performance and minimize bundle size\n- Write unit tests and ensure code coverage\n- Collaborate with designers to implement pixel-perfect UIs\n- Debug and fix issues across different devices and OS versions\n- Maintain app releases and handle App Store submissions\n\nQualifications:\n- Bachelor's degree in Computer Science or equivalent experience\n- Strong problem-solving and debugging skills\n- Experience with Git and agile development processes\n- Understanding of mobile app security best practices\n- Excellent attention to detail and user experience"
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
              <Input
                placeholder="Search jobs by title, company, or designation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                prefix={<SearchOutlined />}
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
                <Button onClick={clearAllFilters} type="link" size="large" className="clear-all-btn">
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
                <Row gutter={[16, 16]} className="job-header-row" align="middle">
                  <Col xs={24} sm={16}>
                    <Row gutter={[12, 8]} align="middle">
                      <Col xs={24} sm={24}>
                        <Space size={16} wrap>
                          <div>
                            <Text strong className="label">Job ID: </Text>
                            <Tag color="blue">{selectedJob.id}</Tag>
                          </div>
                          <Text className="info-text">
                            <UserOutlined style={{ marginRight: 4 }} />
                            {selectedJob.interested} Interested
                          </Text>
                          <Text className="info-text">
                            <EnvironmentOutlined style={{ marginRight: 4 }} />
                            {selectedJob.location}
                          </Text>
                          <Text className="info-text">
                            <LaptopOutlined style={{ marginRight: 4 }} />
                            {selectedJob.openPositions} Open
                          </Text>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} sm={8} className="submit-btn-col">
                    <Button
                      type="primary"
                      size="large"
                      icon={<SendOutlined />}
                      className="submit-profiles-btn"
                      onClick={() => navigate(`/partner/submit-profiles/${selectedJob.id}`)}
                      block
                    >
                      Submit Profiles
                    </Button>
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
                    <Text strong className="description-title">Job Description</Text>
                    <Paragraph className="description-text">
                      {selectedJob.jobDescription}
                    </Paragraph>
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
