import React from "react";
import { Card, Typography, Row, Col, Tag, Button, Table, Space } from "antd";
import {
  FilePdfOutlined,
  MoreOutlined,
  CalendarOutlined,
  MessageOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { JobDetailsWrapper } from "./JobDetails.style";

const jobDetails = {
  id: "J12345",
  title: "Frontend Developer",
  experience: "3-5 years",
  type: "Full Time",
  salary: "₹80,000 - ₹1,00,000",
  location: "Bangalore",
  positions: 2,
  projectSalary: "₹90,000/mo",
  duration: "6 months",
  communication: "English",
  primarySkills: ["React", "JavaScript", "Redux", "HTML", "CSS"],
};

const profiles = [
  {
    key: 1,
    resume: "resume1.pdf",
    name: "Amit Sharma",
    role: "Frontend Developer",
    topSkills: ["React", "Redux", "JavaScript"],
    monthlyRate: "₹85,000",
    experience: "4 years",
    noticePeriod: "15 days",
  },
  {
    key: 2,
    resume: "resume2.pdf",
    name: "Priya Singh",
    role: "Frontend Developer",
    topSkills: ["HTML", "CSS", "JavaScript"],
    monthlyRate: "₹80,000",
    experience: "3 years",
    noticePeriod: "30 days",
  },
];

const columns = [
  {
    title: (
      <Space>
        <FilePdfOutlined />
        Resume
      </Space>
    ),
    dataIndex: "resume",
    key: "resume",
    render: (text) => (
      <Space>
        <FilePdfOutlined style={{ color: "red" }} />
        <Typography.Text>{text}</Typography.Text>
      </Space>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Top Skills",
    dataIndex: "topSkills",
    key: "topSkills",
    render: (skills) => (
      <Space>
        {skills.map((skill) => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </Space>
    ),
  },
  {
    title: "Monthly Rate",
    dataIndex: "monthlyRate",
    key: "monthlyRate",
  },
  {
    title: "Experience",
    dataIndex: "experience",
    key: "experience",
  },
  {
    title: "Notice Period",
    dataIndex: "noticePeriod",
    key: "noticePeriod",
  },
  {
    title: "Action",
    key: "action",
    render: () => <Button icon={<MoreOutlined />} type="text" />,
  },
];

const JobDetails = () => {
  return (
    <JobDetailsWrapper>
      <h2 className="title-header">Job Details</h2>
      <Card className="detail-card">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Text type="secondary">Job ID</Typography.Text>
            <div>{jobDetails.id}</div>
          </Col>
          <Col span={12}>
            <Typography.Text type="secondary">Job Title</Typography.Text>
            <div>{jobDetails.title}</div>
          </Col>
          <Col span={12}>
            <Typography.Text type="secondary">Experience</Typography.Text>
            <div>{jobDetails.experience}</div>
          </Col>
          <Col span={6}>
            <Typography.Text type="secondary">Job Type</Typography.Text>
            <div>{jobDetails.type}</div>
          </Col>
          <Col span={6}>
            <Typography.Text type="secondary">Salary</Typography.Text>
            <div>{jobDetails.salary}</div>
          </Col>
          <Col span={6}>
            <Typography.Text type="secondary">Location</Typography.Text>
            <div>{jobDetails.location}</div>
          </Col>
          <Col span={6}>
            <Typography.Text type="secondary">Positions Open</Typography.Text>
            <div>{jobDetails.positions}</div>
          </Col>
          <Col span={24}>
            <Space style={{ marginTop: 16 }}>
              <Tag icon={<SolutionOutlined />} color="blue">
                Project Salary: {jobDetails.projectSalary}
              </Tag>
              <Tag icon={<CalendarOutlined />} color="purple">
                Duration: {jobDetails.duration}
              </Tag>
              <Tag icon={<MessageOutlined />} color="green">
                Communication: {jobDetails.communication}
              </Tag>
            </Space>
          </Col>
          <Col span={24} style={{ marginTop: 16 }}>
            <Typography.Text type="secondary">Primary Skills</Typography.Text>
            <Space style={{ marginTop: 8 }}>
              {jobDetails.primarySkills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </Space>
          </Col>
        </Row>
      </Card>

      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Typography.Title level={4}>Profile Submitted</Typography.Title>
        </Col>
        <Col>
          <Button type="default">Add from Bench Pool</Button>
          <Button type="primary">Add Resources</Button>
        </Col>
      </Row>

      <Card>
        <Table columns={columns} dataSource={profiles} pagination={false} />
      </Card>
    </JobDetailsWrapper>
  );
};

export default JobDetails;
