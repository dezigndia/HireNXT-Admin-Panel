import React, { useState } from "react";
import { Table, Dropdown, Button, Empty, Segmented, Input, Select, Modal, message, Upload } from "antd";
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
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

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

  const allTimesheets = [
    {
      id: 1,
      talentName: "Rajesh Kumar",
      role: "Senior Full Stack Developer",
      partnerOrg: "TechCorp Solutions",
      clientName: "Amazon Web Services",
      onboardingDate: "2024-01-15",
      monthlyRate: 150000,
      dailyRate: 150000 / monthData.totalDays,
      workingDays: monthData.workingDays,
      billableHours: monthData.workingDays * 8,
      calculatedAmount: (150000 / monthData.totalDays) * monthData.workingDays,
      status: "pending",
      month: "December 2024",
    },
    {
      id: 2,
      talentName: "Priya Sharma",
      role: "React Native Developer",
      partnerOrg: "Digital Partners Inc",
      clientName: "Google LLC",
      onboardingDate: "2023-08-20",
      monthlyRate: 165000,
      dailyRate: 165000 / monthData.totalDays,
      workingDays: monthData.workingDays,
      billableHours: monthData.workingDays * 8,
      calculatedAmount: (165000 / monthData.totalDays) * monthData.workingDays,
      status: "pending",
      month: "December 2024",
    },
    {
      id: 3,
      talentName: "Amit Patel",
      role: "Backend Developer",
      partnerOrg: "Innovate Tech",
      clientName: "Microsoft Corporation",
      onboardingDate: "2024-03-10",
      monthlyRate: 140000,
      dailyRate: 140000 / monthData.totalDays,
      workingDays: 22,
      billableHours: 176,
      calculatedAmount: 140000,
      status: "submitted",
      month: "November 2024",
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
      dailyRate: 170000 / 30,
      workingDays: 22,
      billableHours: 176,
      calculatedAmount: 170000,
      status: "submitted",
      month: "November 2024",
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
      dailyRate: 130000 / 31,
      workingDays: 23,
      billableHours: 184,
      calculatedAmount: 130000,
      status: "approved",
      month: "October 2024",
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
      dailyRate: 145000 / 30,
      workingDays: 21,
      billableHours: 168,
      calculatedAmount: 145000,
      status: "approved",
      month: "October 2024",
      approvedDate: "2024-11-03",
    },
  ];

  const getFilteredData = () => {
    let filtered = allTimesheets;

    if (activeTab === "Pending Upload") {
      filtered = filtered.filter(t => t.status === "pending");
    } else if (activeTab === "Submitted") {
      filtered = filtered.filter(t => t.status === "submitted");
    } else if (activeTab === "Approved") {
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

    return filtered;
  };

  const currentData = getFilteredData();

  const getMetrics = () => {
    const pending = allTimesheets.filter(t => t.status === "pending").length;
    const submitted = allTimesheets.filter(t => t.status === "submitted").length;
    const approved = allTimesheets.filter(t => t.status === "approved").length;
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

    message.success(`Timesheet uploaded successfully for ${selectedTalent.talentName}`);
    setUploadModalVisible(false);
    setSelectedTalent(null);
    setUploadedFile(null);
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
      width: "15%",
      render: (text) => <a href="#" className="talent-name">{text}</a>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "15%",
    },
    {
      title: "Partner Organization",
      dataIndex: "partnerOrg",
      key: "partnerOrg",
      width: "14%",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      width: "13%",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      width: "10%",
      render: (text) => <span className="date-text">{text}</span>,
    },
    {
      title: "Working Days",
      dataIndex: "workingDays",
      key: "workingDays",
      width: "10%",
      render: (days) => <span style={{ fontWeight: 500 }}>{days} days</span>,
    },
    {
      title: "Billable Hours",
      dataIndex: "billableHours",
      key: "billableHours",
      width: "10%",
      render: (hours) => <span style={{ fontWeight: 500 }}>{hours} hrs</span>,
    },
    {
      title: "Amount",
      dataIndex: "calculatedAmount",
      key: "calculatedAmount",
      width: "11%",
      render: (amount) => (
        <span className="amount-text">₹ {Math.round(amount).toLocaleString("en-IN")}</span>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: "8%",
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
      width: "6%",
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
        <div className="left-section">
          <Input
            className="search-input"
            placeholder="Search by talent, client, or role..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          <Select
            className="filter-select"
            placeholder="Filter by Partner"
            value={filterPartner}
            onChange={setFilterPartner}
            allowClear
          >
            <Option value="TechCorp Solutions">TechCorp Solutions</Option>
            <Option value="Digital Partners Inc">Digital Partners Inc</Option>
            <Option value="Innovate Tech">Innovate Tech</Option>
            <Option value="CodeCraft Ltd">CodeCraft Ltd</Option>
            <Option value="WebWorks Pro">WebWorks Pro</Option>
            <Option value="DataSystems Inc">DataSystems Inc</Option>
          </Select>
        </div>
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
        }}
        onOk={handleUploadSubmit}
        okText="Submit Timesheet"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
        width={600}
      >
        <UploadModal>
          {selectedTalent && (
            <div>
              <div className="form-group">
                <label>Talent Details</label>
                <div style={{ padding: "12px 16px", background: "#f8f9fd", borderRadius: 6 }}>
                  <div><strong>Role:</strong> {selectedTalent.role}</div>
                  <div><strong>Client:</strong> {selectedTalent.clientName}</div>
                  <div><strong>Month:</strong> {selectedTalent.month}</div>
                  <div><strong>Working Days:</strong> {selectedTalent.workingDays} days</div>
                  <div><strong>Calculated Amount:</strong> ₹ {Math.round(selectedTalent.calculatedAmount).toLocaleString("en-IN")}</div>
                </div>
              </div>

              <div className="upload-section">
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
                <strong style={{ color: "#014c75" }}>Note:</strong> The uploaded timesheet will be validated against the calculated working days and billable hours before submission.
              </div>
            </div>
          )}
        </UploadModal>
      </Modal>
    </TimesheetContainer>
  );
};

export default Timesheet;
