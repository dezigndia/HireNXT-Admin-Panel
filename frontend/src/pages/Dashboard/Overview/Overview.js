import { Card, Col, Flex, Radio, Row, Typography } from "antd";
import React from "react";
import { OverviewWrapper } from "./Overview.style";
import { UpCircleTwoTone, UserAddOutlined } from "@ant-design/icons";
import { Column } from "@ant-design/plots";

const { Title, Text } = Typography;

const Overview = () => {
  const cardData = [
    { total: 1234, gain: "15.67%", title: "Total Talent hired" },
    { total: 432, gain: "8.45%", title: "Total Partner Joined" },
    { total: 2045, gain: "19.23%", title: "Total Customer Onboarded" },
    { total: 987, gain: "10.56%", title: "Total Interview Scheduled" },
    { total: 1789, gain: "7.89%", title: "Total Revenue Generated" },
    { total: 2345, gain: "13.42%", title: "Total Payout Amount" },
    { total: 1023, gain: "11.01%", title: "Average Rev per Customer" },
    { total: 1567, gain: "6.78%", title: "Overall Estimate Profit/Loss" },
  ];

  const chartData = [
    {
      name: "Income",
      month: "Jan.",
      averageRainfall: 18.9,
    },
    {
      name: "Income",
      month: "Feb.",
      averageRainfall: 28.8,
    },
    {
      name: "Income",
      month: "Mar.",
      averageRainfall: 39.3,
    },
    {
      name: "Income",
      month: "Apr.",
      averageRainfall: 81.4,
    },
    {
      name: "Income",
      month: "May",
      averageRainfall: 47,
    },
    {
      name: "Income",
      month: "Jun.",
      averageRainfall: 20.3,
    },
    {
      name: "Income",
      month: "Jul.",
      averageRainfall: 24,
    },
    {
      name: "Income",
      month: "Aug.",
      averageRainfall: 35.6,
    },
    {
      name: "Expense",
      month: "Jan.",
      averageRainfall: 12.4,
    },
    {
      name: "Expense",
      month: "Feb.",
      averageRainfall: 23.2,
    },
    {
      name: "Expense",
      month: "Mar.",
      averageRainfall: 34.5,
    },
    {
      name: "Expense",
      month: "Apr.",
      averageRainfall: 99.7,
    },
    {
      name: "Expense",
      month: "May",
      averageRainfall: 52.6,
    },
    {
      name: "Expense",
      month: "Jun.",
      averageRainfall: 35.5,
    },
    {
      name: "Expense",
      month: "Jul.",
      averageRainfall: 37.4,
    },
    {
      name: "Expense",
      month: "Aug.",
      averageRainfall: 42.4,
    },
  ];

  const config = {
    data: {
      value: chartData,
    },
    xField: "month",
    yField: "averageRainfall",
    colorField: "name",
    group: true,
    style: {
      inset: 5,
    },
  };
  return (
    <OverviewWrapper>
      <Row align={"middle"}>
        <Col span={12}>
          <Typography.Title>Performance Overview</Typography.Title>
        </Col>
        <Col span={12}>
          <Flex justify="end">
            <Radio.Group>
              <Radio.Button value="all_time">All time</Radio.Button>
              <Radio.Button value="year">This year</Radio.Button>
              <Radio.Button value="monthly">Monthly</Radio.Button>
              <Radio.Button value="weekly">Weekly</Radio.Button>
            </Radio.Group>
          </Flex>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {cardData &&
          cardData.map((item, key) => (
            <Col span={6} key={key}>
              <Card style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Title>{item.total}</Title>
                    <Text>
                      <UpCircleTwoTone />
                      {item.gain}
                      <Text type="secondary">from last year.</Text>
                    </Text>
                  </div>
                  <div className="card-icon">
                    <UserAddOutlined />
                  </div>
                </div>
                <Title level={5}>{item.title}</Title>
              </Card>
            </Col>
          ))}
      </Row>
      <Row gutter={16} style={{ marginTop: "1rem" }}>
        <Col span={12}>
          <Card style={{ width: "100%" }}>
            <Column {...config} />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ width: "100%" }}>
            <Flex align="center">
              <div className="card-icon">
                <UserAddOutlined />
              </div>{" "}
              <Title level={3}>100 New Customer</Title>
            </Flex>
            <Flex align="center">
              <div className="card-icon">
                <UserAddOutlined />
              </div>{" "}
              <Title level={3}>100 New Customer</Title>
            </Flex>
            <Flex align="center">
              <div className="card-icon">
                <UserAddOutlined />
              </div>{" "}
              <Title level={3}>100 New Customer</Title>
            </Flex>
            <Flex align="center">
              <div className="card-icon">
                <UserAddOutlined />
              </div>{" "}
              <Title level={3}>100 New Customer</Title>
            </Flex>
            <Flex align="center">
              <div className="card-icon">
                <UserAddOutlined />
              </div>{" "}
              <Title level={3}>100 New Customer</Title>
            </Flex>
          </Card>
        </Col>
      </Row>
    </OverviewWrapper>
  );
};

export default Overview;
