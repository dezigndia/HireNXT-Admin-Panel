import React, { useState } from "react";
import { Table, Dropdown, Segmented, Empty } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import {
  TalentsHiredContainer,
  PageHeader,
  TabsContainer,
  TableContainer,
  EmptyState,
} from "./TalentsHired.style";

const TalentsHired = () => {
  const [activeTab, setActiveTab] = useState("Active Talents");

  const mockHiredTalents = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@techcorp.com",
      onboardingDate: "2024-01-15",
      contractDuration: "1 Year",
      lastWorkingDay: "2025-01-15",
      daysLeft: 80,
      monthlyRate: 150000,
      clientRate: 180000,
      commission: 30000,
      client: "TechCorp Solutions",
      status: "active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@innovations.com",
      onboardingDate: "2023-08-20",
      contractDuration: "2 Years",
      lastWorkingDay: "2025-08-20",
      daysLeft: 267,
      monthlyRate: 165000,
      clientRate: 200000,
      commission: 35000,
      client: "Innovations Inc",
      status: "active",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.patel@devstudio.com",
      onboardingDate: "2024-03-10",
      contractDuration: "18 Months",
      lastWorkingDay: "2025-09-10",
      daysLeft: 288,
      monthlyRate: 140000,
      clientRate: 175000,
      commission: 35000,
      client: "DevStudio Labs",
      status: "active",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.reddy@cloudservices.com",
      onboardingDate: "2024-02-01",
      contractDuration: "1 Year",
      lastWorkingDay: "2025-02-01",
      daysLeft: 97,
      monthlyRate: 170000,
      clientRate: 210000,
      commission: 40000,
      client: "Cloud Services Co",
      status: "active",
    },
  ];

  const mockInactiveTalents = [
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@pastclient.com",
      onboardingDate: "2022-06-15",
      contractDuration: "1 Year",
      lastWorkingDay: "2023-06-15",
      daysLeft: -565,
      monthlyRate: 130000,
      clientRate: 160000,
      commission: 30000,
      client: "Past Client Ltd",
      status: "inactive",
    },
    {
      id: 6,
      name: "Anjali Gupta",
      email: "anjali.gupta@oldproject.com",
      onboardingDate: "2021-10-10",
      contractDuration: "2 Years",
      lastWorkingDay: "2023-10-10",
      daysLeft: -448,
      monthlyRate: 145000,
      clientRate: 180000,
      commission: 35000,
      client: "Old Project Inc",
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
      width: "12%",
      render: (text) => <span className="talent-name">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "14%",
      render: (email) => <span className="email-text">{email}</span>,
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      width: "12%",
      render: (client) => <span className="client-text">{client}</span>,
    },
    {
      title: "Onboarding Date",
      dataIndex: "onboardingDate",
      key: "onboardingDate",
      width: "10%",
      render: (date) => (
        <span className="date-text">
          {new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      title: "Contract Duration",
      dataIndex: "contractDuration",
      key: "contractDuration",
      width: "10%",
      render: (duration) => <span className="duration-text">{duration}</span>,
    },
    {
      title: "Last Working Day",
      dataIndex: "lastWorkingDay",
      key: "lastWorkingDay",
      width: "10%",
      render: (date) => (
        <span className="date-text">
          {new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      title: "Days Left",
      dataIndex: "daysLeft",
      key: "daysLeft",
      width: "8%",
      align: "center",
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
      width: "9%",
      render: (rate) => (
        <span className="rate-text">₹ {rate.toLocaleString("en-IN")}</span>
      ),
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      width: "9%",
      render: (commission) => (
        <span className="commission-text">
          ₹ {commission.toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "6%",
      align: "center",
      render: (_, record) => (
        <div className="action-buttons">
          <Dropdown
            menu={{
              items: [
                {
                  key: "view",
                  label: "View Details",
                  onClick: () => handleMenuClick("View Details", record),
                },
                {
                  key: "renew",
                  label: "Renew Contract",
                  onClick: () => handleMenuClick("Renew Contract", record),
                },
                {
                  key: "issue",
                  label: "Raise Issue",
                  onClick: () => handleMenuClick("Raise Issue", record),
                },
                {
                  key: "terminate",
                  label: "Initiate Termination",
                  onClick: () =>
                    handleMenuClick("Initiate Termination", record),
                  danger: true,
                },
              ],
            }}
            trigger={["click"]}
          >
            <button className="icon-button menu-btn">
              <MoreOutlined />
            </button>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <TalentsHiredContainer>
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
              showSizeChanger: false,
              showTotal: (total) => `Total ${total} talents`,
            }}
            scroll={{ x: 1400 }}
          />
        ) : (
          <EmptyState>
            <Empty description={`No ${activeTab.toLowerCase()} found`} />
          </EmptyState>
        )}
      </TableContainer>
    </TalentsHiredContainer>
  );
};

export default TalentsHired;
