import React, { useState } from "react";
import { Table, Dropdown, Button, Empty, Card, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { MoreOutlined, DollarOutlined, UserOutlined, LineChartOutlined, TrophyOutlined } from "@ant-design/icons";
import {
  HiredTalentsContainer,
  PageHeader,
  MetricsContainer,
  TabsContainer,
  TableContainer,
  EmptyState,
} from "./HiredTalents.style";

const HiredTalents = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Active Talents");

  const mockHiredTalents = [
    {
      id: 1,
      jobId: "JOB001",
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
      jobId: "JOB002",
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
      jobId: "JOB001",
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
      jobId: "JOB003",
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
    {
      id: 5,
      jobId: "JOB002",
      name: "Aditya Kumar",
      email: "aditya.k@techcorp.com",
      onboardingDate: "2024-09-01",
      contractDuration: "6 Months",
      lastWorkingDay: "2025-03-01",
      daysLeft: 125,
      monthlyRate: 155000,
      marketRate: 260000,
      status: "active",
    },
  ];

  const mockInactiveTalents = [
    {
      id: 6,
      jobId: "JOB001",
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
      id: 7,
      jobId: "JOB002",
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

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹ ${(amount / 100000).toFixed(2)} L`;
    }
    return `₹ ${amount.toLocaleString("en-IN")}`;
  };

  const metrics = {
    activeMonthlyBilling: mockHiredTalents.reduce((sum, t) => sum + t.monthlyRate, 0),
    avgPerTalent: mockHiredTalents.length > 0 
      ? Math.round(mockHiredTalents.reduce((sum, t) => sum + t.monthlyRate, 0) / mockHiredTalents.length) 
      : 0,
    totalCostSaved: mockHiredTalents.reduce((sum, t) => sum + (t.marketRate - t.monthlyRate), 0),
    totalBilled: mockHiredTalents.reduce((sum, t) => sum + t.monthlyRate, 0),
    totalMarketRate: mockHiredTalents.reduce((sum, t) => sum + t.marketRate, 0),
  };

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
      title: "Job Id",
      dataIndex: "jobId",
      key: "jobId",
      width: "8%",
      render: (jobId) => (
        <a 
          href="#" 
          style={{ color: "#1890ff", fontWeight: 500 }}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/customer/my-jobs/job-details/${jobId}`);
          }}
        >
          {jobId}
        </a>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "12%",
      render: (text, record) => (
        <a 
          href="#" 
          className="talent-name"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/customer/talent-details/${record.id}`);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "14%",
      render: (email) => <span className="email-text">{email}</span>,
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
      width: "10%",
      render: (rate) => (
        <span className="rate-text">₹ {rate.toLocaleString("en-IN")}</span>
      ),
    },
    {
      title: "Market Rate",
      dataIndex: "marketRate",
      key: "marketRate",
      width: "10%",
      render: (rate) => (
        <span className="rate-text">₹ {rate.toLocaleString("en-IN")}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "8%",
      align: "center",
      render: (_, record) => (
        <div className="action-buttons">
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
        <h2>Talents Hired</h2>
      </PageHeader>

      <MetricsContainer>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={56}
              icon={<DollarOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#e6fff9" }}
            />
            <div className="metric-info">
              <h3>{formatCurrency(metrics.activeMonthlyBilling)}</h3>
              <p>Active Monthly Billing</p>
            </div>
          </div>
        </Card>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={56}
              icon={<UserOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#f0f5ff" }}
            />
            <div className="metric-info">
              <h3>{formatCurrency(metrics.avgPerTalent)}</h3>
              <p>Avg per Talent</p>
            </div>
          </div>
        </Card>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={56}
              icon={<TrophyOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#fff7e6" }}
            />
            <div className="metric-info">
              <h3>{formatCurrency(metrics.totalCostSaved)}</h3>
              <p>Total Cost Saved</p>
            </div>
          </div>
        </Card>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={56}
              icon={<LineChartOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#f6ffed" }}
            />
            <div className="metric-info">
              <h3>{formatCurrency(metrics.totalBilled)} / {formatCurrency(metrics.totalMarketRate)}</h3>
              <p>Total Billed / Market Rate</p>
            </div>
          </div>
        </Card>
      </MetricsContainer>

      <TabsContainer>
        <Button
          className={activeTab === "Active Talents" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("Active Talents")}
        >
          Active ({mockHiredTalents.length})
        </Button>
        <Button
          className={activeTab === "Inactive Talents" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("Inactive Talents")}
        >
          Inactive ({mockInactiveTalents.length})
        </Button>
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
            scroll={{ x: 1300 }}
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
