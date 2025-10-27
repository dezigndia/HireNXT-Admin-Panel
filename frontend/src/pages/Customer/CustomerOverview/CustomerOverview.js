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
import { Chart } from "@antv/g2";

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

  const chartData = [
    { name: "Posted", month: "Jan.", averageValue: 3 },
    { name: "Posted", month: "Feb.", averageValue: 5 },
    { name: "Posted", month: "Mar.", averageValue: 7 },
    { name: "Posted", month: "Apr.", averageValue: 4 },
    { name: "Posted", month: "May", averageValue: 6 },
    { name: "Posted", month: "Jun.", averageValue: 8 },
    { name: "Hired", month: "Jan.", averageValue: 1 },
    { name: "Hired", month: "Feb.", averageValue: 2 },
    { name: "Hired", month: "Mar.", averageValue: 3 },
    { name: "Hired", month: "Apr.", averageValue: 2 },
    { name: "Hired", month: "May", averageValue: 4 },
    { name: "Hired", month: "Jun.", averageValue: 5 },
  ];

  const config = {
    data: {
      value: chartData,
    },
    xField: "month",
    yField: "averageValue",
    colorField: "name",
    group: true,
    style: {
      inset: 5,
    },
  };

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
          <Card title="Job Posts & Hiring Trends" style={{ width: "100%" }}>
            <div style={{ height: 300 }}>
              <Chart {...config} />
            </div>
          </Card>
        </Col>
      </Row>
    </OverviewWrapper>
  );
};

export default CustomerOverview;
