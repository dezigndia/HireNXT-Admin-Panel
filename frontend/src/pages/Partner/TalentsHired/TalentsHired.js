import React, { useState } from "react";
import { Tabs, Table, Button } from "antd";

// Sample data
const activeProfiles = [
  {
    key: "1",
    name: "John Doe",
    onboardedDate: "2024-05-01",
    email: "john@example.com",
    duration: "6 months",
    monthlyRate: "$5000",
    marketRate: "$5500",
  },
  {
    key: "2",
    name: "Alice Johnson",
    onboardedDate: "2024-04-10",
    email: "alice.johnson@example.com",
    duration: "12 months",
    monthlyRate: "$6200",
    marketRate: "$6500",
  },
  {
    key: "3",
    name: "Bob Lee",
    onboardedDate: "2024-06-05",
    email: "bob.lee@example.com",
    duration: "3 months",
    monthlyRate: "$4700",
    marketRate: "$5000",
  },
];

const inactiveProfiles = [
  {
    key: "1",
    name: "Jane Smith",
    offboardedDate: "2024-03-15",
    email: "jane@example.com",
    lastDuration: "4 months",
    lastMonthlyRate: "$4800",
    reason: "Project Ended",
  },
  {
    key: "2",
    name: "Michael Brown",
    offboardedDate: "2024-02-28",
    email: "michael.brown@example.com",
    lastDuration: "8 months",
    lastMonthlyRate: "$5300",
    reason: "Resigned",
  },
  {
    key: "3",
    name: "Sara Lee",
    offboardedDate: "2024-01-20",
    email: "sara.lee@example.com",
    lastDuration: "5 months",
    lastMonthlyRate: "$5100",
    reason: "Contract Completed",
  },
];

const activeColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Onboarded Date", dataIndex: "onboardedDate", key: "onboardedDate" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Duration", dataIndex: "duration", key: "duration" },
  { title: "Monthly Rate", dataIndex: "monthlyRate", key: "monthlyRate" },
  { title: "Market Rate", dataIndex: "marketRate", key: "marketRate" },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Button type="primary" size="small">
        View
      </Button>
    ),
  },
];

const inactiveColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  {
    title: "Offboarded Date",
    dataIndex: "offboardedDate",
    key: "offboardedDate",
  },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Last Duration", dataIndex: "lastDuration", key: "lastDuration" },
  {
    title: "Last Monthly Rate",
    dataIndex: "lastMonthlyRate",
    key: "lastMonthlyRate",
  },
  { title: "Reason", dataIndex: "reason", key: "reason" },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Button type="default" size="small">
        Details
      </Button>
    ),
  },
];

function TalentsHired() {
  const [tab, setTab] = useState("1");

  return (
    <div>
      <Tabs activeKey={tab} onChange={setTab}>
        <Tabs.TabPane tab="Active Profiles" key="1">
          <Table
            columns={activeColumns}
            dataSource={activeProfiles}
            pagination={false}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Inactive Profiles" key="2">
          <Table
            columns={inactiveColumns}
            dataSource={inactiveProfiles}
            pagination={false}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default TalentsHired;
