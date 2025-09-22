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
import { Link } from "react-router-dom";
import { API_CONST } from "../../../const";
import { Link } from "react-router-dom";

const { Search } = Input;
const { Title, Text, Paragraph } = Typography;

// Sample jobs data with new fields

const OngoingJobs = () => {
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobsData, setUsersData] = useState([]);
  useEffect(() => {
    // Function to fetch data from the backend
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
        setUsersData(result.Response);
      } catch (error) {
        console.log(error.message); // Store error message in state
      }
    };
    fetchData();
  }, []);

  const filteredJobs = jobsData.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: 0,
        width: "100%",
        minHeight: "100vh",
        background: "#fafcff",
      }}
    >
      {/* Search Bar */}
      <Row gutter={[0, 24]} style={{ margin: 0 }}>
        <Col span={24}>
          <div style={{ padding: "24px 16px 0 16px", width: "100%" }}>
            <Search
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
              size="large"
              style={{ width: "100%" }}
            />
          </div>
        </Col>
      </Row>

      {/* Jobs List and Details */}
      <Row
        gutter={[24, 24]}
        style={{
          margin: 0,
          width: "100%",
          padding: "24px 16px",
        }}
      >
        {/* Jobs List */}
        <Col
          xs={24}
          md={8}
          style={{
            width: "100%",
            maxWidth: "100%",
            marginBottom: 24,
          }}
        >
          <div style={{ maxHeight: "85vh", overflowY: "auto", width: "100%" }}>
            {filteredJobs.length === 0 ? (
              <Empty description="No jobs found." />
            ) : (
              filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  hoverable
                  onClick={() => setSelectedJob(job)}
                  style={{
                    marginBottom: 16,
                    borderColor:
                      selectedJob?.id === job.id ? "#1890ff" : "#f0f0f0",
                    background: selectedJob?.id === job.id ? "#e6f7ff" : "#fff",
                    transition: "background 0.2s, border 0.2s",
                    width: "100%",
                  }}
                  bodyStyle={{ padding: 16 }}
                >
                  {/* 1st row: 3 columns */}
                  <Row gutter={8}>
                    <Col span={8}>
                      <Text>
                        <UserOutlined style={{ marginRight: 4 }} />
                        {job.companyType}
                      </Text>
                    </Col>
                    <Col span={8}>
                      <Text>
                        <EnvironmentOutlined style={{ marginRight: 4 }} />
                        {job.location}
                      </Text>
                    </Col>
                    <Col span={8}>
                      <Text>
                        <LaptopOutlined style={{ marginRight: 4 }} />
                        {job.openPositions} Open
                      </Text>
                    </Col>
                  </Row>
                  {/* 2nd row: Designation & Experience */}
                  <Row style={{ marginTop: 8 }}>
                    <Col span={24}>
                      <Text strong>
                        {job.designation} ({job.experience} Exp)
                      </Text>
                    </Col>
                  </Row>
                  {/* 3rd row: Full Time/Contract & Salary */}
                  <Row style={{ marginTop: 8 }}>
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
                  {/* 4th row: Skills */}
                  <Row style={{ marginTop: 8 }}>
                    <Col span={24}>
                      <Space wrap>
                        {job.skills.map((skill) => (
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

        {/* Selected Job Details */}
        <Col
          xs={24}
          md={16}
          style={{
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <Card
            style={{
              minHeight: 200,
              width: "100%",
            }}
            bodyStyle={{ padding: 24 }}
          >
            {selectedJob ? (
              <>
                {/* /* 1st row: 4 columns + Submit Profile button */}
                <Row
                  gutter={16}
                  style={{ marginBottom: 12, alignItems: "center" }}
                >
                  <Col span={5}>
                    <Text strong>
                      Job ID: <Tag color="blue">{selectedJob.id}</Tag>
                    </Text>
                  </Col>
                  <Col span={5}>
                    <Text>
                      <UserOutlined style={{ marginRight: 4 }} />
                      {selectedJob.interested} Interested
                    </Text>
                  </Col>
                  <Col span={5}>
                    <Text>
                      <EnvironmentOutlined style={{ marginRight: 4 }} />
                      {selectedJob.location}
                    </Text>
                  </Col>
                  <Col span={4}>
                    <Text>
                      <LaptopOutlined style={{ marginRight: 4 }} />
                      {selectedJob.openPositions} Open
                    </Text>
                  </Col>
                  <Col span={5} style={{ textAlign: "right" }}>
                    <Link to="/partner/job-details">
                      <button
                        style={{
                          background: "#1890ff",
                          color: "#fff",
                          border: "none",
                          borderRadius: 4,
                          padding: "6px 16px",
                          cursor: "pointer",
                        }}
                      >
                        Submit Profile
                      </button>
                    </Link>
                  </Col>
                </Row>
                <Divider style={{ margin: "8px 0" }} />
                {/* 2nd row: Designation & Experience */}
                <Row style={{ marginBottom: 12 }}>
                  <Col span={24}>
                    <Title level={4} style={{ margin: 0 }}>
                      {selectedJob.designation} ({selectedJob.experience} Exp)
                    </Title>
                  </Col>
                </Row>
                {/* 3rd row: Compensation, Duration, Communication */}
                <Row gutter={16} style={{ marginBottom: 12 }}>
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
                <Divider style={{ margin: "8px 0" }} />
                {/* 4th row: Primary Skills */}
                <Row style={{ marginBottom: 12 }}>
                  <Col span={24}>
                    <Text strong>Primary Skills: </Text>
                    <Space wrap>
                      {selectedJob.primarySkills.map((skill) => (
                        <Tag key={skill} color="geekblue">
                          {skill}
                        </Tag>
                      ))}
                    </Space>
                  </Col>
                </Row>
                {/* 5th row: Good to have skills */}
                <Row style={{ marginBottom: 12 }}>
                  <Col span={24}>
                    <Text strong>Good to have: </Text>
                    <Space wrap>
                      {selectedJob.goodToHaveSkills.map((skill) => (
                        <Tag key={skill} color="cyan">
                          {skill}
                        </Tag>
                      ))}
                    </Space>
                  </Col>
                </Row>
                {/* 6th row: 2 columns, each with 2 rows */}
                <Row gutter={16} style={{ marginBottom: 12 }}>
                  <Col span={12}>
                    <Row>
                      <Col span={24}>
                        <Text>
                          <CalendarOutlined style={{ marginRight: 4 }} />
                          Start Date: {selectedJob.startDate}
                        </Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Text>
                          <LaptopOutlined style={{ marginRight: 4 }} />
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
                          <ClockCircleOutlined style={{ marginRight: 4 }} />
                          Work Time: {selectedJob.workTime}
                        </Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Text>
                          <EnvironmentOutlined style={{ marginRight: 4 }} />
                          Time Zone: {selectedJob.timeZone}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Divider style={{ margin: "8px 0" }} />
                {/* 7th row: Job Description in points */}
                <Row>
                  <Col span={24}>
                    <Text strong>Job Description:</Text>
                    <ul style={{ marginTop: 8 }}>
                      {selectedJob.descriptionPoints.map((point, idx) => (
                        <li key={idx}>
                          <Text>{point}</Text>
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </>
            ) : (
              <Empty description="Select a job card to view details." />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default OngoingJobs;
