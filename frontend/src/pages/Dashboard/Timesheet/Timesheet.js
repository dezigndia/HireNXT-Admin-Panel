import React, { useState, useEffect } from "react";
import { Table, Dropdown, Button, Empty, Segmented, Input, Select, Modal, message, Upload, Flex, InputNumber } from "antd";
import {
  MoreOutlined,
  SearchOutlined,
  UploadOutlined,
  CloudUploadOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  InboxOutlined,
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
  UploadModal,
  MetricsContainer,
  MetricCard,
} from "./Timesheet.style";

const { Option } = Select;
const { Dragger } = Upload;

const Timesheet = () => {
  const [activeTab, setActiveTab] = useState("Pending Upload");
  const [searchText, setSearchText] = useState("");
  const [filterPartner, setFilterPartner] = useState(null);
  const [filterYear, setFilterYear] = useState("2024");
  const [filterMonth, setFilterMonth] = useState(null);
  const [showPastTimesheets, setShowPastTimesheets] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [leaveDates, setLeaveDates] = useState([]);
  const [paidLeaveCount, setPaidLeaveCount] = useState(0);
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
        filtered = filtered.filter(t => t.status === "pending");
      } else if (activeTab === "Submitted") {
        filtered = filtered.filter(t => t.status === "submitted");
      } else if (activeTab === "Approved") {
        filtered = filtered.filter(t => t.status === "approved");
      }
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
    const pending = timesheets.filter(t => t.status === "pending").length;
    const submitted = timesheets.filter(t => t.status === "submitted").length;
    const approved = timesheets.filter(t => t.status === "approved").length;
    const totalAmount = currentData.reduce((sum, t) => sum + t.calculatedAmount, 0);

    return { pending, submitted, approved, totalAmount };
  };

  const metrics = getMetrics();

  const handleUploadClick = (record) => {
    setSelectedTalent(record);
    setUploadModalVisible(true);
    setUploadedFile(null);
  };

  const handleUploadSubmit = () => {
    if (!uploadedFile) {
      message.error("Please upload a timesheet file");
      return;
    }

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
    setUploadModalVisible(false);
    setSelectedTalent(null);
    setUploadedFile(null);
    setLeaveDates([]);
    setPaidLeaveCount(0);
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
        message.success(`Timesheet approved for ${record.talentName}`);
      },
    });
  };

  const getActionMenu = (record) => {
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
      ];
    } else if (record.status === "submitted") {
      return [
        {
          key: "approve",
          label: "Approve Timesheet",
          onClick: () => handleApprove(record),
        },
        {
          key: "share",
          label: "Share with Client",
          onClick: () => handleShare(record),
        },
        ...baseItems,
      ];
    } else {
      return [
        {
          key: "share",
          label: "Share with Client",
          onClick: () => handleShare(record),
        },
        ...baseItems,
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

      <MetricsContainer>
        <MetricCard>
          <div className="metric-header">
            <span className="metric-label">Pending Upload</span>
            <div className="metric-icon warning">
              <ClockCircleOutlined />
            </div>
          </div>
          <div className="metric-value">{metrics.pending}</div>
          <div className="metric-subtext">Timesheets awaiting upload</div>
        </MetricCard>

        <MetricCard>
          <div className="metric-header">
            <span className="metric-label">Submitted</span>
            <div className="metric-icon primary">
              <CloudUploadOutlined />
            </div>
          </div>
          <div className="metric-value">{metrics.submitted}</div>
          <div className="metric-subtext">Pending approval</div>
        </MetricCard>

        <MetricCard>
          <div className="metric-header">
            <span className="metric-label">Approved</span>
            <div className="metric-icon success">
              <CheckCircleOutlined />
            </div>
          </div>
          <div className="metric-value">{metrics.approved}</div>
          <div className="metric-subtext">Ready for billing</div>
        </MetricCard>

        <MetricCard>
          <div className="metric-header">
            <span className="metric-label">Total Amount</span>
            <div className="metric-icon secondary">
              <DollarOutlined />
            </div>
          </div>
          <div className="metric-value">₹ {Math.round(metrics.totalAmount / 100000)}L</div>
          <div className="metric-subtext">Current view total</div>
        </MetricCard>
      </MetricsContainer>

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

      <TabsContainer>
        <Segmented
          value={activeTab}
          onChange={setActiveTab}
          options={["Pending Upload", "Submitted", "Approved"]}
          block
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
              showTotal: (total) => `Total ${total} timesheets`,
            }}
          />
        ) : (
          <EmptyState>
            <Empty description={`No ${activeTab.toLowerCase()} timesheets found`} />
          </EmptyState>
        )}
      </TableContainer>

      <Modal
        title={`Upload Timesheet - ${selectedTalent?.talentName}`}
        open={uploadModalVisible}
        onCancel={() => {
          setUploadModalVisible(false);
          setSelectedTalent(null);
          setUploadedFile(null);
          setLeaveDates([]);
          setPaidLeaveCount(0);
        }}
        onOk={handleUploadSubmit}
        okText="Submit Timesheet"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
        width={700}
      >
        <UploadModal>
          {selectedTalent && (
            <div>
              <div className="form-group">
                <label>Talent Details</label>
                <div style={{ padding: "12px 16px", background: "#f8f9fd", borderRadius: 6 }}>
                  <div><strong>Role:</strong> {selectedTalent.role}</div>
                  <div><strong>Client:</strong> {selectedTalent.clientName}</div>
                  <div><strong>Month:</strong> {selectedTalent.month} {selectedTalent.year}</div>
                  <div><strong>Actual Working Days in Month:</strong> {selectedTalent.actualWorkingDays} days</div>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: 16 }}>
                <label style={{ display: "block", marginBottom: 8, color: "#014c75", fontWeight: 500 }}>
                  Leave Information
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, fontSize: 13 }}>
                      Leave Dates (e.g., 2024-12-15, 2024-12-20)
                    </label>
                    <Input.TextArea
                      placeholder="Enter leave dates separated by commas"
                      rows={3}
                      onChange={(e) => {
                        const dates = e.target.value.split(',').map(d => d.trim()).filter(d => d);
                        setLeaveDates(dates);
                      }}
                      style={{ width: "100%" }}
                    />
                    {leaveDates.length > 0 && (
                      <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
                        Total leave days: {leaveDates.length}
                      </div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, fontSize: 13 }}>
                      Paid Leave Count
                    </label>
                    <InputNumber
                      min={0}
                      max={leaveDates.length || 0}
                      value={paidLeaveCount}
                      onChange={(val) => {
                        const clampedValue = Math.min(val || 0, leaveDates.length);
                        setPaidLeaveCount(clampedValue);
                      }}
                      style={{ width: "100%" }}
                      placeholder="Enter paid leave count"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: 16 }}>
                <label style={{ display: "block", marginBottom: 8, color: "#014c75", fontWeight: 500 }}>
                  Calculated Working Days & Amount
                </label>
                <div style={{ padding: "12px 16px", background: "#f0f9ff", borderRadius: 6 }}>
                  <div><strong>Total Leave Days:</strong> {leaveDates.length} days</div>
                  <div><strong>Paid Leave Days:</strong> {paidLeaveCount} days</div>
                  <div><strong>Unpaid Leave Days:</strong> {leaveDates.length - paidLeaveCount} days</div>
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px dashed #ccc" }}>
                    <div><strong>Billable Working Days:</strong> {selectedTalent.actualWorkingDays - (leaveDates.length - paidLeaveCount)} days</div>
                    <div><strong>Billable Hours:</strong> {(selectedTalent.actualWorkingDays - (leaveDates.length - paidLeaveCount)) * 8} hrs</div>
                    <div style={{ color: "#00d9a9", fontSize: 16, marginTop: 4 }}><strong>Calculated Amount:</strong> ₹ {Math.round((selectedTalent.monthlyRate / selectedTalent.actualWorkingDays) * (selectedTalent.actualWorkingDays - (leaveDates.length - paidLeaveCount))).toLocaleString("en-IN")}</div>
                  </div>
                </div>
              </div>

              <div className="upload-section" style={{ marginTop: 16 }}>
                <label style={{ display: "block", marginBottom: 12, color: "#014c75", fontWeight: 500 }}>
                  Upload Timesheet File (Excel/CSV)
                </label>
                <Dragger
                  accept=".csv,.xlsx,.xls"
                  maxCount={1}
                  beforeUpload={(file) => {
                    setUploadedFile(file);
                    message.success(`${file.name} file selected successfully`);
                    return false;
                  }}
                  onRemove={() => {
                    setUploadedFile(null);
                  }}
                  fileList={uploadedFile ? [uploadedFile] : []}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ color: "#00d9a9", fontSize: 48 }} />
                  </p>
                  <p className="ant-upload-text" style={{ color: "#014c75", fontWeight: 500 }}>
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint" style={{ color: "#999" }}>
                    Supported formats: .csv, .xlsx, .xls
                  </p>
                </Dragger>
              </div>

              <div style={{ marginTop: 16, padding: 12, background: "#e7f6f2", borderRadius: 6, fontSize: 13 }}>
                <strong style={{ color: "#014c75" }}>Note:</strong> The working days and amount will be adjusted based on the leave information provided. The uploaded timesheet will be validated before submission.
              </div>
            </div>
          )}
        </UploadModal>
      </Modal>
    </TimesheetContainer>
  );
};

export default Timesheet;
