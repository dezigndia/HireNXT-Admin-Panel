import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Typography, Input, Button, Alert } from "antd";
import { OverviewWrapper } from "./CustomerOverview.style";
import {
  SearchOutlined,
  FileTextOutlined,
  TeamOutlined,
  UserAddOutlined,
  RightOutlined,
  FolderOpenOutlined,
  VideoCameraOutlined,
  PhoneOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const CustomerOverview = () => {
  const navigate = useNavigate();
  const metricsData = [
    { count: 1, label: "Job Live", icon: <FolderOpenOutlined /> },
    { count: 2, label: "Interview Initiated", icon: <VideoCameraOutlined /> },
    { count: 0, label: "Application received", icon: <FileTextOutlined /> },
    { count: 0, label: "Talents hired", icon: <TeamOutlined /> },
  ];

  const quickActions = [
    {
      icon: <FileTextOutlined />,
      title: "Post jobs for free",
      description: "Post job briefs for your required roles and start receiving recommends & applications.",
      action: "Post a Job",
      onClick: () => navigate("/customer/post-job"),
    },
    {
      icon: <UserAddOutlined />,
      title: "Hire your first Talent",
      description: "Let's online your project — and start building your development team around its objectives.",
      action: "Initiate a Contract",
    },
    {
      icon: <PhoneOutlined />,
      title: "Free Consultation to hire resources",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its.",
      action: "Book a Meeting for FREE",
    },
  ];

  return (
    <OverviewWrapper>
      <Row align="middle" justify="space-between" style={{ marginBottom: "20px" }}>
        <Col>
          <Title level={2} className="page-title">Dashboard</Title>
        </Col>
      </Row>

      <Alert
        message="60% Your account Completed. Please complete your full account setup"
        type="info"
        closable
        style={{ marginBottom: "20px" }}
        className="account-alert"
      />

      <Row gutter={16} style={{ marginBottom: "30px" }}>
        {metricsData.map((item, index) => (
          <Col key={index} xs={12} sm={12} md={6} lg={6}>
            <Card className="metric-card">
              <div className="metric-content">
                <div className="metric-icon">{item.icon}</div>
                <div>
                  <Title level={2} className="metric-count">{item.count}</Title>
                  <Text className="metric-label">{item.label}</Text>
                </div>
                <RightOutlined className="arrow-icon" />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="hero-section">
        <Title level={3} className="hero-title">
          Explore world-class talents and pre-built tech teams from{" "}
          <span className="highlight">77800+ vetted talents</span>
        </Title>
        <Input
          size="large"
          placeholder="Search by skills or role e.g. Java, AWS, UI Designers etc."
          prefix={<SearchOutlined />}
          className="hero-search"
        />
      </div>

      <div className="quick-action-section">
        <Title level={4} className="section-title">Quick action</Title>
        <Row gutter={24}>
          {quickActions.map((action, index) => (
            <Col key={index} xs={24} sm={24} md={8}>
              <Card className="action-card">
                <div className="action-icon-wrapper">
                  {action.icon}
                </div>
                <Title level={5} className="action-title">{action.title}</Title>
                <Paragraph className="action-description">{action.description}</Paragraph>
                <Button 
                  type="link" 
                  className="action-link"
                  onClick={action.onClick}
                >
                  {action.action} <ArrowRightOutlined />
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className="about-section">
        <Title level={4} className="section-title">About HireNXT</Title>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Card className="about-card">
              <Title level={5}>Want us to help you with Talent Need?</Title>
              <Paragraph>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has 
                been the industry's standard dummy text ever since the 1500s, when an unknown printer took 
                a galley of type and scrambled it to make a type specimen book.
              </Paragraph>
              <Paragraph className="tour-text">
                Take a tour of HireNXT by looking at walkthrough of entire product.
              </Paragraph>
              <Button type="link" className="about-link">
                Book a Consultation for FREE <ArrowRightOutlined />
              </Button>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card className="about-card">
              <Title level={5}>Schedule a Product tour</Title>
              <Paragraph>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has 
                been the industry's standard dummy text ever since the 1500s, when an unknown printer took 
                a galley of type and scrambled it to make a type specimen book.
              </Paragraph>
              <Paragraph className="tour-text">
                Take a tour of HireNXT by looking at walkthrough of entire product.
              </Paragraph>
              <Button type="link" className="about-link">
                Book a Product tour <ArrowRightOutlined />
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </OverviewWrapper>
  );
};

export default CustomerOverview;
