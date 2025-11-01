import React, { useState } from "react";
import { Table, Dropdown, Button, Empty, Card, Avatar } from "antd";
import { MoreOutlined, DollarOutlined, TrophyOutlined, LineChartOutlined } from "@ant-design/icons";
import {
  TalentsHiredContainer,
  PageHeader,
  MetricsContainer,
  TabsContainer,
  TableContainer,
  EmptyState,
} from "./TalentsHired.style";

const TalentsHired = () => {
  const [activeTab, setActiveTab] = useState("Active Talents");

  // Single source of truth for all talents data
  const allTalents = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Senior Full Stack Developer",
      experience: "8 Years",
      onboardingDate: "2024-01-15",
      contractDuration: "1 Year",
      lastWorkingDay: "2025-01-15",
      daysLeft: 80,
      monthlyRate: 150000,
      totalBilled: 1200000,
      status: "active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "React Native Developer",
      experience: "6 Years",
      onboardingDate: "2023-08-20",
      contractDuration: "2 Years",
      lastWorkingDay: "2025-08-20",
      daysLeft: 267,
      monthlyRate: 165000,
      totalBilled: 2640000,
      status: "active",
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Backend Developer",
      experience: "5 Years",
      onboardingDate: "2024-03-10",
      contractDuration: "18 Months",
      lastWorkingDay: "2025-09-10",
      daysLeft: 288,
      monthlyRate: 140000,
      totalBilled: 1120000,
      status: "active",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Cloud Architect",
      experience: "10 Years",
      onboardingDate: "2024-02-01",
      contractDuration: "1 Year",
      lastWorkingDay: "2025-02-01",
      daysLeft: 97,
      monthlyRate: 170000,
      totalBilled: 1530000,
      status: "active",
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "DevOps Engineer",
      experience: "7 Years",
      onboardingDate: "2022-06-15",
      contractDuration: "1 Year",
      lastWorkingDay: "2023-06-15",
      daysLeft: -565,
      monthlyRate: 130000,
      totalBilled: 1560000,
      status: "inactive",
    },
    {
      id: 6,
      name: "Anjali Gupta",
      role: "UI/UX Designer",
      experience: "4 Years",
      onboardingDate: "2021-10-10",
      contractDuration: "2 Years",
      lastWorkingDay: "2023-10-10",
      daysLeft: -448,
      monthlyRate: 145000,
      totalBilled: 3480000,
      status: "inactive",
    },
  ];

  // Derive active and inactive talents from the single source
  const activeTalents = allTalents.filter((talent) => talent.status === "active");
  const inactiveTalents = allTalents.filter((talent) => talent.status === "inactive");

  const currentData =
    activeTab === "Active Talents" ? activeTalents : inactiveTalents;

  // Calculate metrics for active talents only
  const calculateMetrics = () => {
    // Use the derived activeTalents array
    
    const activeMonthlyBilling = activeTalents.reduce(
      (sum, talent) => sum + talent.monthlyRate,
      0
    );
    const totalBilled = activeTalents.reduce(
      (sum, talent) => sum + talent.totalBilled,
      0
    );
    const avgPerTalent =
      activeTalents.length > 0
        ? activeMonthlyBilling / activeTalents.length
        : 0;

    return {
      activeMonthlyBilling,
      totalBilled,
      avgPerTalent,
      activeTalentsCount: activeTalents.length,
    };
  };

  const metrics = calculateMetrics();

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${amount.toLocaleString("en-IN")}`;
    }
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "12%",
      render: (text, record) => (
        <a
          href="#"
          style={{ color: "#1890ff", fontWeight: 500 }}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/partner/talent-details/${record.id}`);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "14%",
      render: (text) => <span className="role-text">{text}</span>,
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      width: "10%",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Monthly Rate",
      dataIndex: "monthlyRate",
      key: "monthlyRate",
      width: "11%",
      render: (rate) => (
        <span className="rate-text">₹ {rate.toLocaleString("en-IN")}</span>
      ),
    },
    {
      title: "Total Billed",
      dataIndex: "totalBilled",
      key: "totalBilled",
      width: "11%",
      render: (amount) => (
        <span className="billed-text" style={{ fontWeight: 600, color: "#014c75" }}>
          ₹ {amount.toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      title: "Onboarding Date",
      dataIndex: "onboardingDate",
      key: "onboardingDate",
      width: "11%",
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
      width: "11%",
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
      width: "10%",
      align: "center",
      render: (days) => (
        <span className={`days-left ${getDaysLeftClass(days)}`}>
          {days < 0 ? "Completed" : `${days} days`}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "12%",
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

      <MetricsContainer>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
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
              size={64}
              icon={<TrophyOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#f6ffed" }}
            />
            <div className="metric-info">
              <h3>{formatCurrency(metrics.totalBilled)}</h3>
              <p>Total Billed</p>
            </div>
          </div>
        </Card>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
              icon={<LineChartOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#fff7e6" }}
            />
            <div className="metric-info">
              <h3>{formatCurrency(metrics.avgPerTalent)}</h3>
              <p>Avg per Talent</p>
            </div>
          </div>
        </Card>
      </MetricsContainer>

      <TabsContainer>
        <Button
          className={activeTab === "Active Talents" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("Active Talents")}
        >
          Active ({activeTalents.length})
        </Button>
        <Button
          className={activeTab === "Inactive Talents" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("Inactive Talents")}
        >
          Inactive ({inactiveTalents.length})
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
            scroll={{ x: 1500 }}
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
