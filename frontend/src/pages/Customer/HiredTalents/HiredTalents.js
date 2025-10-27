import React, { useState } from "react";
import { Table, Dropdown, Segmented, Empty } from "antd";
import { BellOutlined, MoreOutlined } from "@ant-design/icons";
import {
  HiredTalentsContainer,
  PageHeader,
  TabsContainer,
  TableContainer,
  EmptyState,
} from "./HiredTalents.style";

const HiredTalents = () => {
  const [activeTab, setActiveTab] = useState("Active Talents");

  const mockHiredTalents = [
    {
      id: 1,
      name: "Gaurav Ambekar",
      email: "aditya.k@designindia.com",
      onboardingDate: "2024-01-12",
      contractDuration: "1 Year",
      lastWorkingDay: "2025-01-12",
      daysLeft: 77,
      monthlyRate: 150000,
      marketRate: 250000,
      status: "active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@techsolutions.com",
      onboardingDate: "2023-06-15",
      contractDuration: "2 Years",
      lastWorkingDay: "2025-06-15",
      daysLeft: 230,
      monthlyRate: 180000,
      marketRate: 280000,
      status: "active",
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul.v@innovations.com",
      onboardingDate: "2024-03-20",
      contractDuration: "1 Year",
      lastWorkingDay: "2025-03-20",
      daysLeft: 144,
      monthlyRate: 165000,
      marketRate: 270000,
      status: "active",
    },
    {
      id: 4,
      name: "Sneha Patel",
      email: "sneha.p@devstudio.com",
      onboardingDate: "2024-02-10",
      contractDuration: "18 Months",
      lastWorkingDay: "2025-08-10",
      daysLeft: 286,
      monthlyRate: 140000,
      marketRate: 240000,
      status: "active",
    },
  ];

  const mockInactiveTalents = [
    {
      id: 5,
      name: "Amit Kumar",
      email: "amit.k@pastproject.com",
      onboardingDate: "2022-05-10",
      contractDuration: "1 Year",
      lastWorkingDay: "2023-05-10",
      daysLeft: -600,
      monthlyRate: 120000,
      marketRate: 220000,
      status: "inactive",
    },
    {
      id: 6,
      name: "Neha Singh",
      email: "neha.singh@oldclient.com",
      onboardingDate: "2021-08-15",
      contractDuration: "2 Years",
      lastWorkingDay: "2023-08-15",
      daysLeft: -503,
      monthlyRate: 135000,
      marketRate: 235000,
      status: "inactive",
    },
  ];

  const currentData =
    activeTab === "Active Talents" ? mockHiredTalents : mockInactiveTalents;

  const handleMenuClick = (action, record) => {
    console.log(`${action} for talent:`, record);
  };

  const getDaysLeftClass = (days) => {
    if (days < 0) return "inactive";
    if (days <= 30) return "critical";
    if (days <= 90) return "warning";
    return "safe";
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <a href="#" className="talent-name">
          {text}
        </a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Onboarding Date",
      dataIndex: "onboardingDate",
      key: "onboardingDate",
      render: (date) => new Date(date).toLocaleDateString("en-GB"),
    },
    {
      title: "Contract Duration",
      dataIndex: "contractDuration",
      key: "contractDuration",
    },
    {
      title: "Last Working Day",
      dataIndex: "lastWorkingDay",
      key: "lastWorkingDay",
      render: (date) => new Date(date).toLocaleDateString("en-GB"),
    },
    {
      title: "Days Left",
      dataIndex: "daysLeft",
      key: "daysLeft",
      render: (days) => (
        <span className={`days-left ${getDaysLeftClass(days)}`}>
          {days < 0 ? "Completed" : `${days} days`}
        </span>
      ),
    },
    {
      title: "Monthly Rate",
      dataIndex: "monthlyRate",
      key: "monthlyRate",
      render: (rate) => `₹${rate.toLocaleString("en-IN")}`,
    },
    {
      title: "Market Rate",
      dataIndex: "marketRate",
      key: "marketRate",
      render: (rate) => `₹${rate.toLocaleString("en-IN")}`,
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <div className="action-buttons">
          <button className="icon-button" title="Notifications">
            <BellOutlined />
          </button>
          <Dropdown menu={{ items: [
            {
              key: 'renew',
              label: 'Renew Contract',
              onClick: () => handleMenuClick("Renew Contract", record)
            },
            {
              key: 'issue',
              label: 'Raise Issue',
              onClick: () => handleMenuClick("Raise Issue", record)
            },
            {
              key: 'terminate',
              label: 'Initiate Termination',
              onClick: () => handleMenuClick("Initiate Termination", record),
              danger: true
            }
          ]}} trigger={["click"]}>
            <button className="icon-button">
              <MoreOutlined />
            </button>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <HiredTalentsContainer>
      <PageHeader>
        <h1>Talents Hired</h1>
      </PageHeader>

      <TabsContainer>
        <Segmented
          value={activeTab}
          onChange={setActiveTab}
          options={[
            { label: "Active Talents", value: "Active Talents" },
            { label: "Inactive Talents", value: "Inactive Talents" },
          ]}
        />
      </TabsContainer>

      <TableContainer>
        {currentData.length > 0 ? (
          <Table
            columns={columns}
            dataSource={currentData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total ${total} talents`,
            }}
          />
        ) : (
          <EmptyState>
            <Empty description={`No ${activeTab.toLowerCase()} found`} />
          </EmptyState>
        )}
      </TableContainer>
    </HiredTalentsContainer>
  );
};

export default HiredTalents;
