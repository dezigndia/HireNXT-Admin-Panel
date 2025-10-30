import { Card, Col, Row, Typography, List, Table, Space } from "antd";
import React from "react";
import { OverviewWrapper } from "./Overview.style";
import {
  TeamOutlined,
  UserAddOutlined,
  FileDoneOutlined,
  DollarCircleOutlined,
  RightOutlined,
  BankOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Overview = () => {
  const metricsData = [
    {
      value: "150",
      label: "Total Talents Hired",
      icon: <TeamOutlined />,
      iconBg: "#e6f7ff",
    },
    {
      value: "500",
      label: "Total Partners Joined",
      icon: <UserAddOutlined />,
      iconBg: "#f0f5ff",
    },
    {
      value: "100",
      label: "Total Customers Onboarded",
      icon: <BankOutlined />,
      iconBg: "#e6fffb",
    },
    {
      value: "750",
      label: "Total Profiles Submitted",
      icon: <FileDoneOutlined />,
      iconBg: "#fff7e6",
    },
    {
      value: "₹ 20 cr",
      label: "Total Estimated Revenue",
      icon: <DollarCircleOutlined />,
      iconBg: "#f6ffed",
    },
    {
      value: "₹ 10 cr",
      label: "Total Estimated Payout Amount",
      icon: <DollarCircleOutlined />,
      iconBg: "#fff1f0",
    },
    {
      value: "₹ 50 lac",
      label: "Average Revenue per Customer",
      icon: <DollarCircleOutlined />,
      iconBg: "#f9f0ff",
    },
    {
      value: "₹ 2 lac",
      label: "Average Cost per Talent",
      icon: <DollarCircleOutlined />,
      iconBg: "#e6f7ff",
    },
  ];

  const approvalsData = [
    {
      count: "100",
      description: "New Customer onboarded",
      icon: <BankOutlined />,
    },
    {
      count: "205",
      description: "New Partners onboarded",
      icon: <UserAddOutlined />,
    },
    {
      count: "178",
      description: "New Talent Profiles Created",
      icon: <TeamOutlined />,
    },
    {
      count: "52",
      description: "Profiles Submitted for Jobs",
      icon: <FileDoneOutlined />,
    },
  ];

  const topCustomersColumns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Space>
          <BankOutlined style={{ color: "#1890ff" }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: "Talents Hired",
      dataIndex: "talentsHired",
      key: "talentsHired",
    },
    {
      title: "Per Talent Average",
      dataIndex: "perTalentAverage",
      key: "perTalentAverage",
      render: (value) => (
        <span style={{ fontWeight: 500, color: "#014c75" }}>{value}</span>
      ),
    },
  ];

  const topCustomersData = [
    {
      key: "1",
      name: "Tata Elxsi Limited",
      talentsHired: 20,
      perTalentAverage: "₹ 2,00,000",
    },
    {
      key: "2",
      name: "Infosys Limited",
      talentsHired: 17,
      perTalentAverage: "₹ 1,85,000",
    },
    {
      key: "3",
      name: "HCL Tech Limited",
      talentsHired: 14,
      perTalentAverage: "₹ 1,60,200",
    },
    {
      key: "4",
      name: "Tech Mahindra Limited",
      talentsHired: 12,
      perTalentAverage: "₹ 1,50,000",
    },
    {
      key: "5",
      name: "Tata Consultancy Services",
      talentsHired: 10,
      perTalentAverage: "₹ 1,50,000",
    },
  ];

  return (
    <OverviewWrapper>
      <Typography.Title level={3} className="page-title">
        Dashboard
      </Typography.Title>

      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        {metricsData.map((item, key) => (
          <Col xs={24} sm={12} lg={6} key={key}>
            <Card
              style={{
                borderRadius: "8px",
                border: "1px solid #f0f0f0",
              }}
              styles={{ body: { padding: "20px" } }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <Title
                    level={2}
                    style={{
                      margin: 0,
                      marginBottom: "8px",
                      color: "#014c75",
                      fontSize: "32px",
                      fontWeight: 600,
                    }}
                  >
                    {item.value}
                  </Title>
                  <Text
                    style={{
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {item.label}
                  </Text>
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    color: "#1890ff",
                    background: item.iconBg,
                    width: "48px",
                    height: "48px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title="Approvals Pending"
            extra={
              <a
                href="#"
                style={{
                  color: "#00d9a9",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                View All <RightOutlined style={{ fontSize: "12px" }} />
              </a>
            }
            style={{
              borderRadius: "8px",
              border: "1px solid #f0f0f0",
              height: "100%",
            }}
            styles={{ body: { padding: "16px" } }}
          >
            <List
              itemLayout="horizontal"
              dataSource={approvalsData}
              renderItem={(item) => (
                <List.Item
                  style={{
                    padding: "16px 12px",
                    cursor: "pointer",
                    borderRadius: "6px",
                    transition: "all 0.3s",
                  }}
                  className="approval-item"
                  extra={<RightOutlined style={{ color: "#999" }} />}
                >
                  <List.Item.Meta
                    avatar={
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "8px",
                          background: "#f0f5ff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          color: "#1890ff",
                        }}
                      >
                        {item.icon}
                      </div>
                    }
                    title={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "#014c75",
                            marginRight: "12px",
                          }}
                        >
                          {item.count}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#666",
                            fontWeight: 400,
                          }}
                        >
                          {item.description}
                        </span>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title="Top Customers Hiring Talents"
            extra={
              <a
                href="#"
                style={{
                  color: "#00d9a9",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                View All <RightOutlined style={{ fontSize: "12px" }} />
              </a>
            }
            style={{
              borderRadius: "8px",
              border: "1px solid #f0f0f0",
              height: "100%",
            }}
            styles={{ body: { padding: "16px" } }}
          >
            <Table
              columns={topCustomersColumns}
              dataSource={topCustomersData}
              pagination={false}
              size="middle"
              style={{
                fontSize: "14px",
              }}
            />
          </Card>
        </Col>
      </Row>
    </OverviewWrapper>
  );
};

export default Overview;
