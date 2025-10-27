import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { OverviewWrapper } from "./CustomerOverview.style";
import {
  UserAddOutlined,
  UpCircleTwoTone,
  FileDoneOutlined,
  AuditOutlined,
  DollarOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const CustomerOverview = () => {
  const cardData = [
    { total: 12, gain: "15.67%", title: "Total Job Posts", icon: <FileDoneOutlined /> },
    { total: 45, gain: "8.45%", title: "Profiles Submitted", icon: <AuditOutlined /> },
    { total: 8, gain: "19.23%", title: "Talents Hired", icon: <TeamOutlined /> },
    { total: 25, gain: "10.56%", title: "Interviews Scheduled", icon: <UserAddOutlined /> },
    { total: "₹18.9L", gain: "7.89%", title: "Total Spend", icon: <DollarOutlined /> },
    { total: 32, gain: "13.42%", title: "Active Requirements", icon: <FileDoneOutlined /> },
  ];


  return (
    <OverviewWrapper>
      <Row align={"middle"}>
        <Col>
          <Title className="page-title">Customer Dashboard</Title>
        </Col>
      </Row>

      <Row gutter={16}>
        {cardData.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card style={{ width: "100%", marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Title className="page-title">{item.total}</Title>
                  <Text>
                    <UpCircleTwoTone />
                    {item.gain}
                    <Text type="secondary"> from last month.</Text>
                  </Text>
                </div>
                <div className="card-icon">
                  {item.icon}
                </div>
              </div>
              <Title level={5}>{item.title}</Title>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Card title="Recent Activity" style={{ width: "100%" }}>
            <div style={{ padding: "20px", textAlign: "center" }}>
              <Text type="secondary">Your recent job postings and hiring activity will appear here</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </OverviewWrapper>
  );
};

export default CustomerOverview;
