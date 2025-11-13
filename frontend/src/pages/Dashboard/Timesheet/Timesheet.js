import React, { useState, useEffect } from "react";
import { Table, Dropdown, Button, Empty, Input, Select, Modal, message, Flex } from "antd";
import {
  MoreOutlined,
  SearchOutlined,
  UploadOutlined,
  CloudUploadOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  FilterOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import {
  TimesheetContainer,
  PageHeader,
  TopSection,
  TabsContainer,
  TableContainer,
  EmptyState,
  MetricsSection,
  MetricCard,
} from "./Timesheet.style";
import TimesheetDetailsModal from "./TimesheetDetailsModal";

const { Option } = Select;

const Timesheet = () => {
  const [activeTab, setActiveTab] = useState("Pending Upload");
  const [searchText, setSearchText] = useState("");
  const [filterPartner, setFilterPartner] = useState(null);
  const [filterYear, setFilterYear] = useState("2024");
  const [filterMonth, setFilterMonth] = useState(null);
  const [showPastTimesheets, setShowPastTimesheets] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [modalMode, setModalMode] = useState("edit");
  const [timesheets, setTimesheets] = useState([]);

  const getWorkingDaysForMonth = (monthStr) => {
    const monthMap = {
      "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
      "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
    };
    
    const [monthName, year] = monthStr.split(' ');
    const monthIndex = monthMap[monthName];
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    let weekends = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      const day = new Date(year, monthIndex, d).getDay();
      if (day === 0 || day === 6) weekends++;
    }
    
    return daysInMonth - weekends;
  };

  const getCurrentMonthDays = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const currentDay = now.getDate();
    
    const weekends = [];
    for (let d = 1; d <= currentDay; d++) {
      const day = new Date(year, month, d).getDay();
      if (day === 0 || day === 6) weekends.push(d);
    }
    
    return {
      totalDays: daysInMonth,
      elapsedDays: currentDay,
      workingDays: currentDay - weekends.length,
      weekends: weekends.length
    };
  };

  const monthData = getCurrentMonthDays();

  const initialTimesheets = [
    {
      id: 1,
      talentName: "Rajesh Kumar",
      role: "Senior Full Stack Developer",
      partnerOrg: "TechCorp Solutions",
      clientName: "Amazon Web Services",
      onboardingDate: "2024-01-15",
      monthlyRate: 150000,
      month: "December",
      year: "2024",
      actualWorkingDays: 22,
      leaveTaken: { count: 0, dates: [] },
      paidLeave: 0,
      workingDays: 22,
      billableHours: 22 * 8,
      calculatedAmount: 150000,
      status: "pending",
    },
    {
      id: 2,
      talentName: "Priya Sharma",
      role: "React Native Developer",
      partnerOrg: "Digital Partners Inc",
      clientName: "Google LLC",
      onboardingDate: "2023-08-20",
      monthlyRate: 165000,
      month: "December",
      year: "2024",
      actualWorkingDays: 22,
      leaveTaken: { count: 0, dates: [] },
      paidLeave: 0,
      workingDays: 22,
      billableHours: 22 * 8,
      calculatedAmount: 165000,
      status: "pending",
    },
    {
      id: 3,
      talentName: "Amit Patel",
      role: "Backend Developer",
      partnerOrg: "Innovate Tech",
      clientName: "Microsoft Corporation",
      onboardingDate: "2024-03-10",
      monthlyRate: 140000,
      month: "November",
      year: "2024",
      actualWorkingDays: 21,
      leaveTaken: { count: 1, dates: ["2024-11-15"] },
      paidLeave: 1,
      workingDays: 20,
      billableHours: 160,
      calculatedAmount: (140000 / 21) * 20,
      status: "submitted",
      submittedDate: "2024-11-30",
    },
    {
      id: 4,
      talentName: "Sneha Reddy",
      role: "Cloud Architect",
      partnerOrg: "CodeCraft Ltd",
      clientName: "Salesforce Inc",
      onboardingDate: "2024-02-01",
      monthlyRate: 170000,
      month: "November",
      year: "2024",
      actualWorkingDays: 21,
      leaveTaken: { count: 0, dates: [] },
      paidLeave: 0,
      workingDays: 21,
      billableHours: 168,
      calculatedAmount: 170000,
      status: "submitted",
      submittedDate: "2024-11-29",
    },
    {
      id: 5,
      talentName: "Vikram Singh",
      role: "DevOps Engineer",
      partnerOrg: "WebWorks Pro",
      clientName: "Oracle Systems",
      onboardingDate: "2024-09-15",
      monthlyRate: 130000,
      month: "October",
      year: "2024",
      actualWorkingDays: 23,
      leaveTaken: { count: 2, dates: ["2024-10-10", "2024-10-25"] },
      paidLeave: 2,
      workingDays: 21,
      billableHours: 168,
      calculatedAmount: (130000 / 23) * 21,
      status: "approved",
      approvedDate: "2024-11-05",
    },
    {
      id: 6,
      talentName: "Anjali Gupta",
      role: "UI/UX Designer",
      partnerOrg: "DataSystems Inc",
      clientName: "Adobe Inc",
      onboardingDate: "2024-04-20",
      monthlyRate: 145000,
      month: "October",
      year: "2024",
      actualWorkingDays: 23,
      leaveTaken: { count: 0, dates: [] },
      paidLeave: 0,
      workingDays: 23,
      billableHours: 184,
      calculatedAmount: 145000,
      status: "approved",
      approvedDate: "2024-11-03",
    },
  ];

  useEffect(() => {
    setTimesheets(initialTimesheets);
  }, []);

  const getFilteredData = () => {
    let filtered = timesheets;

    if (!showPastTimesheets) {
      if (activeTab === "Pending Upload") {
        filtered = filtered.filter(t => t.status === "pending" || t.status === "submitted");
      } else if (activeTab === "Approved") {
        filtered = filtered.filter(t => t.status === "approved");
      }
    } else {
      // View All History: Only show approved timesheets
      filtered = filtered.filter(t => t.status === "approved");
    }

    if (searchText) {
      filtered = filtered.filter(t =>
        t.talentName.toLowerCase().includes(searchText.toLowerCase()) ||
        t.clientName.toLowerCase().includes(searchText.toLowerCase()) ||
        t.role.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterPartner) {
      filtered = filtered.filter(t => t.partnerOrg === filterPartner);
    }

    if (filterYear) {
      filtered = filtered.filter(t => t.year === filterYear);
    }

    if (filterMonth) {
      filtered = filtered.filter(t => t.month === filterMonth);
    }

    return filtered;
  };

  const currentData = getFilteredData();

  const getMetrics = () => {
    const pending = timesheets.filter(t => t.status === "pending" || t.status === "submitted").length;
    const approved = timesheets.filter(t => t.status === "approved").length;
    const totalAmountPending = timesheets
      .filter(t => t.status === "pending" || t.status === "submitted")
      .reduce((sum, t) => sum + t.calculatedAmount, 0);
    const totalAmountApproved = timesheets
      .filter(t => t.status === "approved")
      .reduce((sum, t) => sum + t.calculatedAmount, 0);

    return { pending, approved, totalAmountPending, totalAmountApproved };
  };

  const metrics = getMetrics();

  const handleUploadClick = (record) => {
    setSelectedTalent(record);
    setModalMode("edit");
    setUploadModalVisible(true);
  };

  const handleUploadSubmit = ({ leaveDates, paidLeaveCount }) => {
    const clampedPaidLeave = Math.min(paidLeaveCount, leaveDates.length);
    const unpaidLeaveDays = leaveDates.length - clampedPaidLeave;
    const updatedWorkingDays = selectedTalent.actualWorkingDays - unpaidLeaveDays;
    const updatedBillableHours = updatedWorkingDays * 8;
    const updatedAmount = (selectedTalent.monthlyRate / selectedTalent.actualWorkingDays) * updatedWorkingDays;

    const updatedTimesheets = timesheets.map(t => {
      if (t.id === selectedTalent.id) {
        return {
          ...t,
          leaveTaken: { count: leaveDates.length, dates: leaveDates },
          paidLeave: clampedPaidLeave,
          workingDays: updatedWorkingDays,
          billableHours: updatedBillableHours,
          calculatedAmount: updatedAmount,
          status: "submitted",
          submittedDate: new Date().toISOString().split('T')[0]
        };
      }
      return t;
    });

    setTimesheets(updatedTimesheets);
    message.success(`Timesheet uploaded successfully for ${selectedTalent.talentName}`);
  };

  const handleShare = (record) => {
    Modal.confirm({
      title: "Share Timesheet",
      content: `Share ${record.talentName}'s timesheet with ${record.clientName}?`,
      okText: "Share",
      okButtonProps: { style: { background: "#00d9a9", borderColor: "#00d9a9" } },
      onOk: () => {
        message.success(`Timesheet shared with ${record.clientName}`);
      },
    });
  };

  const handleDownload = (record) => {
    message.info(`Downloading timesheet for ${record.talentName}...`);
  };

  const handleApprove = (record) => {
    Modal.confirm({
      title: "Approve Timesheet",
      content: `Approve timesheet for ${record.talentName} (${record.month})?`,
      okText: "Approve",
      okButtonProps: { style: { background: "#00d9a9", borderColor: "#00d9a9" } },
      onOk: () => {
        const updatedTimesheets = timesheets.map(t => 
          t.id === record.id ? { ...t, status: "approved", approvedDate: new Date().toISOString().split('T')[0] } : t
        );
        setTimesheets(updatedTimesheets);
        message.success(`Timesheet approved for ${record.talentName}`);
      },
    });
  };

  const handleModify = (record) => {
    setSelectedTalent(record);
    setModalMode("edit");
    setUploadModalVisible(true);
  };

  const handleView = (record) => {
    setSelectedTalent(record);
    setModalMode("view");
    setUploadModalVisible(true);
  };

  const handleReject = (record) => {
    Modal.confirm({
      title: "Reject Timesheet",
      content: (
        <div>
          <p>Reject timesheet for {record.talentName} ({record.month})?</p>
          <Input.TextArea
            id="reject-reason"
            placeholder="Enter reason for rejection"
            rows={3}
            style={{ marginTop: 12 }}
          />
        </div>
      ),
      okText: "Reject",
      okType: "danger",
      onOk: () => {
        const updatedTimesheets = timesheets.map(t => 
          t.id === record.id ? { ...t, status: "rejected" } : t
        );
        setTimesheets(updatedTimesheets);
        message.warning(`Timesheet rejected for ${record.talentName}`);
      },
    });
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Delete Timesheet",
      content: `Are you sure you want to delete timesheet for ${record.talentName} (${record.month})? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      onOk: () => {
        const updatedTimesheets = timesheets.filter(t => t.id !== record.id);
        setTimesheets(updatedTimesheets);
        message.success(`Timesheet deleted for ${record.talentName}`);
      },
    });
  };

  const getActionMenu = (record) => {
    // View All History: Only show View and Download actions
    if (showPastTimesheets) {
      return [
        {
          key: "view",
          label: "View",
          onClick: () => handleView(record),
        },
        {
          key: "download",
          label: "Download Timesheet",
          onClick: () => handleDownload(record),
        },
      ];
    }

    // Current view: Show full admin actions
    const adminItems = [
      {
        key: "modify",
        label: "Modify",
        onClick: () => handleModify(record),
      },
      {
        key: "reject",
        label: "Reject",
        onClick: () => handleReject(record),
        danger: true,
      },
      {
        key: "delete",
        label: "Delete",
        onClick: () => handleDelete(record),
        danger: true,
      },
    ];

    const baseItems = [
      {
        key: "download",
        label: "Download Timesheet",
        onClick: () => handleDownload(record),
      },
    ];

    if (record.status === "pending") {
      return [
        {
          key: "upload",
          label: "Upload Timesheet",
          onClick: () => handleUploadClick(record),
        },
        ...baseItems,
        ...adminItems,
      ];
    } else {
      return [
        {
          key: "share",
          label: "Share with Client",
          onClick: () => handleShare(record),
        },
        ...baseItems,
        ...adminItems,
      ];
    }
  };

  const columns = [
    {
      title: "Talent Name",
      dataIndex: "talentName",
      key: "talentName",
      width: "13%",
      render: (text) => <a href="#" className="talent-name">{text}</a>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "13%",
    },
    {
      title: "Partner",
      dataIndex: "partnerOrg",
      key: "partnerOrg",
      width: "12%",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      width: "11%",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      width: "9%",
      render: (text, record) => (
        <span className="date-text">
          {text}
          <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
            ({record.actualWorkingDays} days)
          </div>
        </span>
      ),
    },
    {
      title: "Leave Taken",
      key: "leaveTaken",
      width: "9%",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.leaveTaken.count} days</div>
          {record.leaveTaken.count > 0 && record.leaveTaken.dates.length > 0 && (
            <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
              {record.leaveTaken.dates.slice(0, 2).map(d => new Date(d).getDate()).join(', ')}
              {record.leaveTaken.dates.length > 2 && '...'}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Working Days",
      dataIndex: "workingDays",
      key: "workingDays",
      width: "9%",
      render: (days) => <span style={{ fontWeight: 500 }}>{days} days</span>,
    },
    {
      title: "Billable Hours",
      dataIndex: "billableHours",
      key: "billableHours",
      width: "9%",
      render: (hours) => <span style={{ fontWeight: 500 }}>{hours} hrs</span>,
    },
    {
      title: "Amount",
      dataIndex: "calculatedAmount",
      key: "calculatedAmount",
      width: "10%",
      render: (amount) => (
        <span className="amount-text">₹ {Math.round(amount).toLocaleString("en-IN")}</span>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: "7%",
      render: (_, record) => (
        <span className={`status-badge ${record.status}`}>
          {record.status === "pending" && "Pending"}
          {record.status === "submitted" && "Submitted"}
          {record.status === "approved" && "Approved"}
          {record.status === "rejected" && "Rejected"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
      render: (_, record) => (
        <Dropdown menu={{ items: getActionMenu(record) }} trigger={["click"]}>
          <button className="icon-button menu-btn">
            <MoreOutlined />
          </button>
        </Dropdown>
      ),
    },
  ];

  return (
    <TimesheetContainer>
      <PageHeader>
        <h1>Timesheet Management</h1>
        <p>Upload and manage timesheets for onboarded talents</p>
      </PageHeader>

      <MetricsSection>
        <MetricCard>
          <div className="metric-label">Pending Upload</div>
          <div className="metric-value">{metrics.pending}</div>
        </MetricCard>

        <MetricCard>
          <div className="metric-label">Approved</div>
          <div className="metric-value">{metrics.approved}</div>
        </MetricCard>

        <MetricCard>
          <div className="metric-label">Total Amount Pending</div>
          <div className="metric-value">
            ₹ {(metrics.totalAmountPending / 100000).toFixed(2)}L
          </div>
        </MetricCard>

        <MetricCard>
          <div className="metric-label">Total Amount Approved</div>
          <div className="metric-value">
            ₹ {(metrics.totalAmountApproved / 100000).toFixed(2)}L
          </div>
        </MetricCard>
      </MetricsSection>

      <TopSection>
        <Flex align="start" justify="space-between" style={{ marginBottom: 20 }}>
          <Flex gap="middle">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search by talent, client, or role"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
              allowClear
            />
            <Select
              placeholder={
                <span>
                  <FilterOutlined style={{ marginRight: 8 }} />
                  Year
                </span>
              }
              value={filterYear}
              onChange={setFilterYear}
              style={{ width: 120 }}
              allowClear
            >
              <Option value="2024">2024</Option>
              <Option value="2023">2023</Option>
              <Option value="2022">2022</Option>
            </Select>
            <Select
              placeholder={
                <span>
                  <FilterOutlined style={{ marginRight: 8 }} />
                  Month
                </span>
              }
              value={filterMonth}
              onChange={setFilterMonth}
              style={{ width: 150 }}
              allowClear
            >
              <Option value="January">January</Option>
              <Option value="February">February</Option>
              <Option value="March">March</Option>
              <Option value="April">April</Option>
              <Option value="May">May</Option>
              <Option value="June">June</Option>
              <Option value="July">July</Option>
              <Option value="August">August</Option>
              <Option value="September">September</Option>
              <Option value="October">October</Option>
              <Option value="November">November</Option>
              <Option value="December">December</Option>
            </Select>
            <Select
              placeholder={
                <span>
                  <FilterOutlined style={{ marginRight: 8 }} />
                  Partner
                </span>
              }
              value={filterPartner}
              onChange={setFilterPartner}
              style={{ width: 200 }}
              allowClear
            >
              <Option value="TechCorp Solutions">TechCorp Solutions</Option>
              <Option value="Digital Partners Inc">Digital Partners Inc</Option>
              <Option value="Innovate Tech">Innovate Tech</Option>
              <Option value="CodeCraft Ltd">CodeCraft Ltd</Option>
              <Option value="WebWorks Pro">WebWorks Pro</Option>
              <Option value="DataSystems Inc">DataSystems Inc</Option>
            </Select>
          </Flex>
          <Button
            icon={<HistoryOutlined />}
            onClick={() => setShowPastTimesheets(!showPastTimesheets)}
            style={{
              backgroundColor: showPastTimesheets ? "#00d9a9" : "#fff",
              color: showPastTimesheets ? "#fff" : "#014c75",
              borderColor: showPastTimesheets ? "#00d9a9" : "#d9d9d9",
              height: "32px",
              fontWeight: 500,
            }}
          >
            {showPastTimesheets ? "Current View" : "View All History"}
          </Button>
        </Flex>
      </TopSection>

      {!showPastTimesheets && (
        <TabsContainer>
          <Button
            className={`tab-button ${activeTab === "Pending Upload" ? "active" : ""}`}
            onClick={() => setActiveTab("Pending Upload")}
          >
            Pending Upload ({metrics.pending})
          </Button>
          <Button
            className={`tab-button ${activeTab === "Approved" ? "active" : ""}`}
            onClick={() => setActiveTab("Approved")}
          >
            Approved ({metrics.approved})
          </Button>
        </TabsContainer>
      )}

      <TableContainer>
        {currentData.length > 0 ? (
          <Table
            columns={columns}
            dataSource={currentData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total ${total} timesheets`,
            }}
          />
        ) : (
          <EmptyState>
            <Empty description={`No ${activeTab.toLowerCase()} timesheets found`} />
          </EmptyState>
        )}
      </TableContainer>

      <TimesheetDetailsModal
        visible={uploadModalVisible}
        timesheet={selectedTalent}
        mode={modalMode}
        onClose={() => {
          setUploadModalVisible(false);
          setSelectedTalent(null);
        }}
        onSubmit={handleUploadSubmit}
      />
    </TimesheetContainer>
  );
};

export default Timesheet;
