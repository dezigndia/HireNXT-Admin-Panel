import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Tag,
  message,
  Dropdown,
  Modal,
} from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  TimesheetContainer,
  MetricsCard,
  MetricsGrid,
  FiltersContainer,
  TabsContainer,
  TableContainer,
  Flex,
} from "./Timesheet.style";
import TimesheetDetailsModal from "../../Dashboard/Timesheet/TimesheetDetailsModal";

const { Option } = Select;

const CustomerTimesheet = () => {
  const [activeTab, setActiveTab] = useState("Pending Approval");
  const [searchText, setSearchText] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Modal states
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [modifyReason, setModifyReason] = useState("");

  // Mock data for Customer timesheets
  const [timesheets, setTimesheets] = useState([
    {
      id: 1,
      talentId: "T001",
      talentName: "Rahul Kumar",
      partner: "TechCorp Solutions",
      role: "Full Stack Developer",
      month: "December",
      year: "2024",
      actualWorkingDays: 22,
      workingDays: 20,
      billableHours: 160,
      monthlyRate: 150000,
      calculatedAmount: 136363,
      leaveTaken: { count: 2, dates: [5, 15] },
      paidLeave: 2,
      status: "submitted",
      submittedDate: "2024-12-28",
    },
    {
      id: 2,
      talentId: "T002",
      talentName: "Priya Sharma",
      partner: "Digital Partners Inc",
      role: "Frontend Developer",
      month: "December",
      year: "2024",
      actualWorkingDays: 22,
      workingDays: 22,
      billableHours: 176,
      monthlyRate: 140000,
      calculatedAmount: 140000,
      leaveTaken: { count: 0, dates: [] },
      paidLeave: 0,
      status: "submitted",
      submittedDate: "2024-12-29",
    },
    {
      id: 3,
      talentId: "T003",
      talentName: "Amit Patel",
      partner: "Innovate Tech",
      role: "Backend Developer",
      month: "November",
      year: "2024",
      actualWorkingDays: 22,
      workingDays: 21,
      billableHours: 168,
      monthlyRate: 125000,
      calculatedAmount: 119318,
      leaveTaken: { count: 1, dates: [10] },
      paidLeave: 1,
      status: "approved",
      submittedDate: "2024-11-28",
      approvedDate: "2024-11-30",
    },
    {
      id: 4,
      talentId: "T004",
      talentName: "Sneha Reddy",
      partner: "TechCorp Solutions",
      role: "UI/UX Designer",
      month: "November",
      year: "2024",
      actualWorkingDays: 22,
      workingDays: 22,
      billableHours: 176,
      monthlyRate: 110000,
      calculatedAmount: 110000,
      leaveTaken: { count: 0, dates: [] },
      paidLeave: 0,
      status: "approved",
      submittedDate: "2024-11-28",
      approvedDate: "2024-11-29",
    },
  ]);

  // Action handlers
  const handleView = (record) => {
    setSelectedTimesheet(record);
    setModalMode("view");
    setViewModalVisible(true);
  };

  const handleApprove = (record) => {
    Modal.confirm({
      title: "Approve Timesheet",
      content: `Are you sure you want to approve the timesheet for ${record.talentName} for ${record.month} ${record.year}?`,
      okText: "Approve",
      okButtonProps: { style: { background: "#00d9a9", borderColor: "#00d9a9" } },
      onOk: () => {
        const updated = timesheets.map((t) =>
          t.id === record.id
            ? { ...t, status: "approved", approvedDate: new Date().toISOString().split("T")[0] }
            : t
        );
        setTimesheets(updated);
        
        // Close view modal if it's the same record being approved
        if (selectedTimesheet && selectedTimesheet.id === record.id) {
          setViewModalVisible(false);
          setSelectedTimesheet(null);
        }
        
        message.success(`Timesheet for ${record.talentName} approved successfully`);
      },
    });
  };

  const handleAskToModify = (record) => {
    setSelectedTimesheet(record);
    setModifyReason("");
    setModifyModalVisible(true);
  };

  const handleSubmitModifyRequest = () => {
    if (!modifyReason.trim()) {
      message.warning("Please enter a reason for modification");
      return;
    }

    const updated = timesheets.map((t) =>
      t.id === selectedTimesheet.id
        ? { ...t, status: "modification_requested", modificationReason: modifyReason }
        : t
    );
    setTimesheets(updated);
    
    // Close view modal if it's open for the same record
    if (viewModalVisible && selectedTimesheet) {
      setViewModalVisible(false);
    }
    
    message.success(`Modification request sent to partner for ${selectedTimesheet.talentName}`);
    setModifyModalVisible(false);
    setModifyReason("");
    setSelectedTimesheet(null);
  };

  const handleCancelModifyModal = () => {
    setModifyModalVisible(false);
    setModifyReason("");
    setSelectedTimesheet(null);
  };

  const handleDownload = (record) => {
    message.info(`Downloading timesheet for ${record.talentName}...`);
  };

  const handleCloseViewModal = () => {
    setViewModalVisible(false);
    setSelectedTimesheet(null);
  };

  // Filter data based on active tab and filters
  const getFilteredData = () => {
    let filtered = [...timesheets];

    // Filter by active tab
    if (activeTab === "Pending Approval") {
      filtered = filtered.filter((t) => t.status === "submitted");
    } else if (activeTab === "Approved") {
      filtered = filtered.filter((t) => t.status === "approved");
    }

    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(
        (t) =>
          t.talentName.toLowerCase().includes(searchText.toLowerCase()) ||
          t.talentId.toLowerCase().includes(searchText.toLowerCase()) ||
          t.role.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply other filters
    if (filterMonth) filtered = filtered.filter((t) => t.month === filterMonth);
    if (filterStatus) filtered = filtered.filter((t) => t.status === filterStatus);

    return filtered;
  };

  // Get unique values for filters
  const months = [...new Set(timesheets.map((t) => t.month))];

  // Calculate metrics
  const getMetrics = () => {
    const pendingApproval = timesheets.filter((t) => t.status === "submitted").length;
    const approved = timesheets.filter((t) => t.status === "approved").length;
    const totalAmount = timesheets
      .filter((t) => t.status === "approved")
      .reduce((sum, t) => sum + t.calculatedAmount, 0);
    const totalTimesheets = timesheets.length;

    return { pendingApproval, approved, totalAmount, totalTimesheets };
  };

  const metrics = getMetrics();

  // Define action menu items based on status
  const getActionMenuItems = (record) => {
    const items = [
      {
        key: "view",
        label: "View Details",
        icon: <EyeOutlined />,
        onClick: () => handleView(record),
      },
      {
        key: "download",
        label: "Download",
        icon: <DownloadOutlined />,
        onClick: () => handleDownload(record),
      },
    ];

    if (record.status === "submitted") {
      items.unshift(
        {
          key: "approve",
          label: "Approve",
          icon: <CheckCircleOutlined />,
          onClick: () => handleApprove(record),
        },
        {
          key: "modify",
          label: "Ask to Modify",
          icon: <EditOutlined />,
          onClick: () => handleAskToModify(record),
        }
      );
    }

    return items;
  };

  const columns = [
    {
      title: "Talent ID",
      dataIndex: "talentId",
      key: "talentId",
      width: 100,
    },
    {
      title: "Talent Name",
      dataIndex: "talentName",
      key: "talentName",
      width: 150,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
    },
    {
      title: "Month",
      key: "month",
      width: 120,
      render: (_, record) => `${record.month} ${record.year}`,
    },
    {
      title: "Working Days",
      dataIndex: "workingDays",
      key: "workingDays",
      width: 120,
      align: /** @type {'center'} */ ("center"),
    },
    {
      title: "Billable Hours",
      dataIndex: "billableHours",
      key: "billableHours",
      width: 120,
      align: /** @type {'center'} */ ("center"),
    },
    {
      title: "Amount",
      dataIndex: "calculatedAmount",
      key: "calculatedAmount",
      width: 130,
      render: (amount) => `₹ ${amount.toLocaleString("en-IN")}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status) => {
        const config = {
          submitted: { color: "orange", text: "Pending Approval" },
          approved: { color: "green", text: "Approved" },
          modification_requested: { color: "blue", text: "Modification Requested" },
        };
        const { color, text } = config[status] || {};
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Submitted Date",
      dataIndex: "submittedDate",
      key: "submittedDate",
      width: 130,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      fixed: /** @type {'right'} */ ("right"),
      render: (_, record) => (
        <Dropdown
          menu={{ items: getActionMenuItems(record) }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const renderFilters = () => (
    <FiltersContainer>
      <Flex style={{ gap: "12px", flexWrap: "wrap" }}>
        <Input
          placeholder="Search by Talent Name, ID, or Role"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 280 }}
          allowClear
        />
        <Select
          placeholder="Select Month"
          value={filterMonth}
          onChange={setFilterMonth}
          style={{ width: 150 }}
          allowClear
        >
          {months.map((m) => (
            <Option key={m} value={m}>
              {m}
            </Option>
          ))}
        </Select>
      </Flex>
    </FiltersContainer>
  );

  return (
    <TimesheetContainer>
      <h2 style={{ marginBottom: 24, color: "#014c75" }}>Timesheet Management</h2>

      {/* Metrics */}
      <MetricsGrid>
        <MetricsCard>
          <div className="metric-value">{metrics.pendingApproval}</div>
          <div className="metric-label">Pending Approval</div>
        </MetricsCard>
        <MetricsCard>
          <div className="metric-value">{metrics.approved}</div>
          <div className="metric-label">Approved</div>
        </MetricsCard>
        <MetricsCard>
          <div className="metric-value">₹ {metrics.totalAmount.toLocaleString("en-IN")}</div>
          <div className="metric-label">Total Approved Amount</div>
        </MetricsCard>
        <MetricsCard>
          <div className="metric-value">{metrics.totalTimesheets}</div>
          <div className="metric-label">Total Timesheets</div>
        </MetricsCard>
      </MetricsGrid>

      {/* Tabs */}
      <TabsContainer>
        <Button
          className={`tab-button ${activeTab === "Pending Approval" ? "active" : ""}`}
          onClick={() => setActiveTab("Pending Approval")}
        >
          Pending Approval
        </Button>
        <Button
          className={`tab-button ${activeTab === "Approved" ? "active" : ""}`}
          onClick={() => setActiveTab("Approved")}
        >
          Approved
        </Button>
      </TabsContainer>

      {/* Filters */}
      {renderFilters()}

      {/* Table */}
      <TableContainer>
        <Table
          columns={columns}
          dataSource={getFilteredData()}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} timesheets`,
          }}
          scroll={{ x: 1400 }}
        />
      </TableContainer>

      {/* View Timesheet Modal - Customer can only view, not edit */}
      <TimesheetDetailsModal
        visible={viewModalVisible}
        onClose={handleCloseViewModal}
        timesheet={selectedTimesheet}
        mode="view"
        onSubmit={() => {}}
      />

      {/* Ask to Modify Modal */}
      <Modal
        title={`Request Modification - ${selectedTimesheet?.talentName || ""}`}
        open={modifyModalVisible}
        onOk={handleSubmitModifyRequest}
        onCancel={handleCancelModifyModal}
        width={600}
        okText="Send Request"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
      >
        {selectedTimesheet && (
          <div>
            <div style={{ marginBottom: 16, padding: 12, background: "#f8f9fd", borderRadius: 6 }}>
              <div><strong>Talent ID:</strong> {selectedTimesheet.talentId}</div>
              <div><strong>Talent Name:</strong> {selectedTimesheet.talentName}</div>
              <div><strong>Role:</strong> {selectedTimesheet.role}</div>
              <div><strong>Month:</strong> {selectedTimesheet.month} {selectedTimesheet.year}</div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, color: "#014c75", fontWeight: 500 }}>
                Reason for Modification *
              </label>
              <Input.TextArea
                rows={4}
                placeholder="Please specify what needs to be modified and why..."
                value={modifyReason}
                onChange={(e) => setModifyReason(e.target.value)}
              />
            </div>
          </div>
        )}
      </Modal>
    </TimesheetContainer>
  );
};

export default CustomerTimesheet;
