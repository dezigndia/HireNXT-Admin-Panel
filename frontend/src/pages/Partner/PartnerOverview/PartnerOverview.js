import React from "react";
import { Card, Col, Row, Typography, Input, Button, Alert } from "antd";
import { OverviewWrapper } from "./PartnerOverview.style";
import {
  SearchOutlined,
  DollarOutlined,
  TeamOutlined,
  FileTextOutlined,
  UserAddOutlined,
  ArrowRightOutlined,
  UsergroupAddOutlined,
  RocketOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const PartnerOverview = () => {
  const metricsData = [
    { count: "₹0", label: "Total Earning", icon: <DollarOutlined /> },
    { count: 2, label: "Bench Resources", icon: <TeamOutlined /> },
    { count: 5, label: "Jobs Applied", icon: <FileTextOutlined /> },
    { count: 0, label: "Talents Hired", icon: <UserAddOutlined /> },
  ];

  const quickActions = [
    {
      icon: <UsergroupAddOutlined />,
      title: "Add your Bench pool",
      description: "Post job briefs for your required roles and start receiving recommends & applications.",
      action: "Post a Job",
      onClick: () => console.log("Add Bench Pool"),
    },
    {
      icon: <RocketOutlined />,
      title: "Deploy your Bench Resources",
      description: "Let's online your project — and start building your development team around its objectives.",
      action: "Initiate a Contract",
      onClick: () => console.log("Deploy Resources"),
    },
    {
      icon: <PhoneOutlined />,
      title: "Free Consultation to apply in Jobs",
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its.",
      action: "Book a Meeting for FREE",
      onClick: () => console.log("Free Consultation"),
    },
  ];

  return (
    <OverviewWrapper>
      <div className="overview-container">
        <Alert
          message="60% Your account Completed. Please complete your full account Setup."
          type="info"
          closable
          className="account-alert"
        />

        <Title level={2} className="page-title">Dashboard</Title>

        <Row gutter={[24, 24]} className="metrics-row">
          {metricsData.map((metric, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="metric-card" hoverable>
                <div className="metric-content">
                  <div className="metric-icon">{metric.icon}</div>
                  <div className="metric-info">
                    <Text className="metric-count">{metric.count}</Text>
                    <Text className="metric-label">{metric.label}</Text>
                  </div>
                  <ArrowRightOutlined className="arrow-icon" />
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="search-section">
          <div className="search-content">
            <Title level={3} className="search-title">
              Explore world-class <span className="highlight">Opportunities</span> and
            </Title>
            <Title level={3} className="search-title">
              <span className="highlight">Requirements</span> from Global Top Companies
            </Title>
            <Input
              size="large"
              placeholder="Search by skills or role e.g. Java, AWS, UI Designers etc."
              prefix={<SearchOutlined />}
              className="search-input"
            />
          </div>
        </div>

        <div className="quick-actions-section">
          <Title level={4} className="section-title">Quick action</Title>
          <Row gutter={[24, 24]}>
            {quickActions.map((action, index) => (
              <Col xs={24} md={8} key={index}>
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
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card className="about-card">
                <Title level={5} className="about-card-title">Want us to help you with Requirements?</Title>
                <Paragraph className="about-card-description">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Paragraph>
                <Paragraph className="about-card-description">
                  Take a tour of HireNXT by looking at walkthrough of entire product.
                </Paragraph>
                <Button type="link" className="about-link">
                  Book a Consultation for FREE <ArrowRightOutlined />
                </Button>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card className="about-card">
                <Title level={5} className="about-card-title">Schedule a Product tour</Title>
                <Paragraph className="about-card-description">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Paragraph>
                <Paragraph className="about-card-description">
                  Take a tour of HireNXT by looking at walkthrough of entire product.
                </Paragraph>
                <Button type="link" className="about-link">
                  Book a Product tour <ArrowRightOutlined />
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </OverviewWrapper>
  );
};

export default PartnerOverview;
