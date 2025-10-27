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
      monthlyRate: 150000,
      marketRate: 250000,
      status: "active",
    },
    {
      id: 2,
      name: "Gaurav Ambekar",
      email: "aditya.k@designindia.com",
      onboardingDate: "2024-01-12",
      contractDuration: "14 Year",
      monthlyRate: 150000,
      marketRate: 250000,
      status: "active",
    },
    {
      id: 3,
      name: "Gaurav Ambekar",
      email: "aditya.k@designindia.com",
      onboardingDate: "2024-01-12",
      contractDuration: "2 Year",
      monthlyRate: 150000,
      marketRate: 250000,
      status: "active",
    },
    {
      id: 4,
      name: "Priya Sharma",
      email: "priya.sharma@techsolutions.com",
      onboardingDate: "2023-06-15",
      contractDuration: "2 Years",
      monthlyRate: 180000,
      marketRate: 280000,
      status: "active",
    },
    {
      id: 5,
      name: "Rahul Verma",
      email: "rahul.v@innovations.com",
      onboardingDate: "2024-03-20",
      contractDuration: "1 Year",
      monthlyRate: 165000,
      marketRate: 270000,
      status: "active",
    },
  ];

  const mockInactiveTalents = [
    {
      id: 6,
      name: "Amit Kumar",
      email: "amit.k@pastproject.com",
      onboardingDate: "2022-05-10",
      contractDuration: "1 Year",
      monthlyRate: 120000,
      marketRate: 220000,
      status: "inactive",
    },
    {
      id: 7,
      name: "Neha Singh",
      email: "neha.singh@oldclient.com",
      onboardingDate: "2021-08-15",
      contractDuration: "2 Years",
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "18%",
      render: (text) => (
        <a href="#" className="talent-name">
          {text}
        </a>
      ),
    },
    {
      title: "Onboarded Date",
      dataIndex: "onboardingDate",
      key: "onboardingDate",
      width: "15%",
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "22%",
      render: (email) => <span className="email-text">{email}</span>,
    },
    {
      title: "Duration",
      dataIndex: "contractDuration",
      key: "contractDuration",
      width: "12%",
      render: (duration) => <span className="duration-text">{duration}</span>,
    },
    {
      title: "Monthly Rate",
      dataIndex: "monthlyRate",
      key: "monthlyRate",
      width: "13%",
      render: (rate) => (
        <span className="rate-text">₹ {rate.toLocaleString("en-IN")}</span>
      ),
    },
    {
      title: "Market Rate",
      dataIndex: "marketRate",
      key: "marketRate",
      width: "13%",
      render: (rate) => (
        <span className="rate-text">₹ {rate.toLocaleString("en-IN")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "7%",
      align: "center",
      render: (_, record) => (
        <div className="action-buttons">
          <button
            className="icon-button notification-btn"
            title="Notifications"
          >
            <BellOutlined />
          </button>
          <Dropdown
            menu={{
              items: [
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
              showSizeChanger: false,
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
