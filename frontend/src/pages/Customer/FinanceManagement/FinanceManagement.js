import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Tag,
  message,
  Dropdown,
  Modal,
  Descriptions,
} from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  EditOutlined,
  MoreOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import {
  FinanceContainer,
  MetricsCard,
  MetricsGrid,
  FiltersContainer,
  TableContainer,
  Flex,
} from "./FinanceManagement.style";

const { Option } = Select;

const FinanceManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Modal states
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [selectedPayable, setSelectedPayable] = useState(null);
  const [modifyReason, setModifyReason] = useState("");
  const [updatePayableModalVisible, setUpdatePayableModalVisible] = useState(false);
  const [selectedPayableStatus, setSelectedPayableStatus] = useState("");

  // Mock data for Customer Finance (Partner Payables from customer perspective)
  const [payables, setPayables] = useState([
    {
      id: 1,
      recordId: "PAY-2024-001",
      invoiceId: "INV-TCP-1234",
      talentId: "T001",
      talentName: "Rahul Kumar",
      partner: "TechCorp Solutions",
      jobId: "JOB-2024-101",
      month: "December",
      year: "2024",
      days: 22,
      hours: 176,
      amount: 120000,
      gst: 21600,
      totalAmount: 141600,
      status: "Submitted",
      submittedOn: "2024-12-28",
    },
    {
      id: 2,
      recordId: "PAY-2024-002",
      invoiceId: "INV-DPI-5678",
      talentId: "T002",
      talentName: "Priya Sharma",
      partner: "Digital Partners Inc",
      jobId: "JOB-2024-102",
      month: "December",
      year: "2024",
      days: 20,
      hours: 160,
      amount: 132000,
      gst: 23760,
      totalAmount: 155760,
      status: "Submitted",
      submittedOn: "2024-12-29",
    },
    {
      id: 3,
      recordId: "PAY-2024-003",
      invoiceId: "INV-INN-9012",
      talentId: "T003",
      talentName: "Amit Patel",
      partner: "Innovate Tech",
      jobId: "JOB-2024-103",
      month: "November",
      year: "2024",
      days: 22,
      hours: 176,
      amount: 112000,
      gst: 20160,
      totalAmount: 132160,
      status: "Approved",
      submittedOn: "2024-11-25",
      approvedOn: "2024-11-28",
    },
    {
      id: 4,
      recordId: "PAY-2024-004",
      invoiceId: "INV-TCP-5566",
      talentId: "T004",
      talentName: "Sneha Reddy",
      partner: "TechCorp Solutions",
      jobId: "JOB-2024-104",
      month: "November",
      year: "2024",
      days: 22,
      hours: 176,
      amount: 110000,
      gst: 19800,
      totalAmount: 129800,
      status: "Approved",
      submittedOn: "2024-11-26",
      approvedOn: "2024-11-29",
    },
    {
      id: 5,
      recordId: "PAY-2024-005",
      invoiceId: "INV-DPI-7788",
      talentId: "T005",
      talentName: "Vikram Singh",
      partner: "Digital Partners Inc",
      jobId: "JOB-2024-105",
      month: "October",
      year: "2024",
      days: 21,
      hours: 168,
      amount: 128000,
      gst: 23040,
      totalAmount: 151040,
      status: "Paid",
      submittedOn: "2024-10-28",
      approvedOn: "2024-10-30",
      paidOn: "2024-11-05",
    },
  ]);

  // Action handlers
  const handleViewPayable = (record) => {
    Modal.info({
      title: `Invoice Details - ${record.invoiceId}`,
      width: 600,
      content: (
        <Descriptions bordered column={1} size="small" style={{ marginTop: 16 }}>
          <Descriptions.Item label="Record ID">{record.recordId}</Descriptions.Item>
          <Descriptions.Item label="Invoice ID">{record.invoiceId}</Descriptions.Item>
          <Descriptions.Item label="Talent ID">{record.talentId}</Descriptions.Item>
          <Descriptions.Item label="Talent Name">{record.talentName}</Descriptions.Item>
          <Descriptions.Item label="Job ID">{record.jobId}</Descriptions.Item>
          <Descriptions.Item label="Month">
            {record.month} {record.year}
          </Descriptions.Item>
          <Descriptions.Item label="Days">{record.days}</Descriptions.Item>
          <Descriptions.Item label="Hours">{record.hours}</Descriptions.Item>
          <Descriptions.Item label="Amount">
            ₹ {record.amount.toLocaleString("en-IN")}
          </Descriptions.Item>
          <Descriptions.Item label="GST (18%)">
            ₹ {record.gst.toLocaleString("en-IN")}
          </Descriptions.Item>
          <Descriptions.Item label="Total Amount">
            <strong style={{ fontSize: 16, color: "#014c75" }}>
              ₹ {record.totalAmount.toLocaleString("en-IN")}
            </strong>
          </Descriptions.Item>
          <Descriptions.Item label="Submitted On">{record.submittedOn}</Descriptions.Item>
          {record.approvedOn && (
            <Descriptions.Item label="Approved On">{record.approvedOn}</Descriptions.Item>
          )}
          {record.paidOn && (
            <Descriptions.Item label="Paid On">{record.paidOn}</Descriptions.Item>
          )}
          <Descriptions.Item label="Status">
            <Tag
              color={
                record.status === "Paid"
                  ? "green"
                  : record.status === "Approved"
                  ? "blue"
                  : "orange"
              }
            >
              {record.status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      ),
    });
  };

  const handleDownloadInvoice = (record) => {
    message.info(`Downloading invoice ${record.invoiceId}...`);
  };

  const handleDownloadTimesheet = (record) => {
    message.info(`Downloading timesheet for ${record.talentName}...`);
  };

  const handleApprove = (record) => {
    Modal.confirm({
      title: "Approve Invoice",
      content: `Are you sure you want to approve invoice ${record.invoiceId} for ${record.talentName}?`,
      okText: "Approve",
      okButtonProps: { style: { background: "#00d9a9", borderColor: "#00d9a9" } },
      onOk: () => {
        const updated = payables.map((p) =>
          p.id === record.id
            ? { ...p, status: "Approved", approvedOn: new Date().toISOString().split("T")[0] }
            : p
        );
        setPayables(updated);
        
        // Clear selected record if it's the same as approved
        if (selectedPayable && selectedPayable.id === record.id) {
          setSelectedPayable(null);
        }
        
        message.success(`Invoice ${record.invoiceId} approved successfully`);
      },
    });
  };

  const handleAskToModify = (record) => {
    setSelectedPayable(record);
    setModifyReason("");
    setModifyModalVisible(true);
  };

  const handleSubmitModifyRequest = () => {
    if (!modifyReason.trim()) {
      message.warning("Please enter a reason for modification");
      return;
    }

    const updated = payables.map((p) =>
      p.id === selectedPayable.id
        ? { ...p, status: "Modification Requested", modificationReason: modifyReason }
        : p
    );
    setPayables(updated);
    message.success(`Modification request sent for invoice ${selectedPayable.invoiceId}`);
    setModifyModalVisible(false);
    setModifyReason("");
    setSelectedPayable(null);
  };

  const handleCancelModifyModal = () => {
    setModifyModalVisible(false);
    setModifyReason("");
    setSelectedPayable(null);
  };

  const handleUpdatePayable = (record) => {
    setSelectedPayable(record);
    setSelectedPayableStatus(record.status === "Paid" ? "Paid" : "Unpaid");
    setUpdatePayableModalVisible(true);
  };

  const handleSubmitUpdatePayable = () => {
    const updated = payables.map((p) =>
      p.id === selectedPayable.id
        ? { 
            ...p, 
            status: selectedPayableStatus,
            ...(selectedPayableStatus === "Paid" && !p.paidOn ? { paidOn: new Date().toISOString().split("T")[0] } : {})
          }
        : p
    );
    setPayables(updated);
    message.success(`Invoice ${selectedPayable.invoiceId} status updated to ${selectedPayableStatus}`);
    setUpdatePayableModalVisible(false);
    setSelectedPayable(null);
    setSelectedPayableStatus("");
  };

  const handleCancelUpdatePayable = () => {
    setUpdatePayableModalVisible(false);
    setSelectedPayable(null);
    setSelectedPayableStatus("");
  };

  // Filter data
  const getFilteredData = () => {
    let filtered = [...payables];

    if (searchText) {
      filtered = filtered.filter(
        (p) =>
          p.talentName.toLowerCase().includes(searchText.toLowerCase()) ||
          p.invoiceId.toLowerCase().includes(searchText.toLowerCase()) ||
          p.talentId.toLowerCase().includes(searchText.toLowerCase()) ||
          p.jobId.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterMonth) filtered = filtered.filter((p) => p.month === filterMonth);
    if (filterStatus) filtered = filtered.filter((p) => p.status === filterStatus);

    return filtered;
  };

  // Get unique values for filters
  const months = [...new Set(payables.map((p) => p.month))];
  const statuses = [...new Set(payables.map((p) => p.status))];

  // Calculate metrics
  const getMetrics = () => {
    const totalPaid = payables
      .filter((p) => p.status === "Paid")
      .reduce((sum, p) => sum + p.totalAmount, 0);
    const currentPayable = payables
      .filter((p) => p.status === "Submitted" || p.status === "Approved")
      .reduce((sum, p) => sum + p.totalAmount, 0);
    const pendingApproval = payables.filter((p) => p.status === "Submitted").length;
    const totalInvoices = payables.length;

    return { totalPaid, currentPayable, pendingApproval, totalInvoices };
  };

  const metrics = getMetrics();

  // Define action menu items based on status
  const getActionMenuItems = (record) => {
    const items = [
      {
        key: "view",
        label: "View Details",
        icon: <EyeOutlined />,
        onClick: () => handleViewPayable(record),
      },
      {
        key: "download-invoice",
        label: "Download Invoice",
        icon: <DownloadOutlined />,
        onClick: () => handleDownloadInvoice(record),
      },
      {
        key: "download-timesheet",
        label: "Download Timesheet",
        icon: <FileTextOutlined />,
        onClick: () => handleDownloadTimesheet(record),
      },
    ];

    if (record.status === "Submitted") {
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

    // Add Update Payable for Approved/Paid status
    if (record.status === "Approved" || record.status === "Paid") {
      items.push({
        key: "update-payable",
        label: "Update Payable",
        icon: <EditOutlined />,
        onClick: () => handleUpdatePayable(record),
      });
    }

    return items;
  };

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "invoiceId",
      key: "invoiceId",
      width: 140,
      fixed: /** @type {'left'} */ ("left"),
    },
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
      title: "Month",
      key: "month",
      width: 120,
      render: (_, record) => `${record.month} ${record.year}`,
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      width: 80,
      align: /** @type {'center'} */ ("center"),
    },
    {
      title: "Hours",
      dataIndex: "hours",
      key: "hours",
      width: 80,
      align: /** @type {'center'} */ ("center"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 120,
      render: (amount) => `₹ ${amount.toLocaleString("en-IN")}`,
    },
    {
      title: "GST",
      dataIndex: "gst",
      key: "gst",
      width: 100,
      render: (gst) => `₹ ${gst.toLocaleString("en-IN")}`,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 130,
      render: (amount) => (
        <strong style={{ color: "#014c75" }}>₹ {amount.toLocaleString("en-IN")}</strong>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status) => {
        const color =
          status === "Paid" ? "green" : status === "Approved" ? "blue" : "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Submitted On",
      dataIndex: "submittedOn",
      key: "submittedOn",
      width: 120,
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
          placeholder="Search by Talent Name, Invoice ID, or Job ID"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
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
        <Select
          placeholder="Select Status"
          value={filterStatus}
          onChange={setFilterStatus}
          style={{ width: 150 }}
          allowClear
        >
          {statuses.map((s) => (
            <Option key={s} value={s}>
              {s}
            </Option>
          ))}
        </Select>
      </Flex>
    </FiltersContainer>
  );

  return (
    <FinanceContainer>
      <h2 style={{ marginBottom: 24, color: "#014c75" }}>Finance Management</h2>

      {/* Metrics */}
      <MetricsGrid>
        <MetricsCard>
          <div className="metric-value">₹ {metrics.totalPaid.toLocaleString("en-IN")}</div>
          <div className="metric-label">Total Paid</div>
        </MetricsCard>
        <MetricsCard>
          <div className="metric-value">₹ {metrics.currentPayable.toLocaleString("en-IN")}</div>
          <div className="metric-label">Current Payable</div>
        </MetricsCard>
        <MetricsCard>
          <div className="metric-value">{metrics.pendingApproval}</div>
          <div className="metric-label">Pending Approval</div>
        </MetricsCard>
        <MetricsCard>
          <div className="metric-value">{metrics.totalInvoices}</div>
          <div className="metric-label">Total Invoices</div>
        </MetricsCard>
      </MetricsGrid>

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
            showTotal: (total) => `Total ${total} invoices`,
          }}
          scroll={{ x: 1600 }}
        />
      </TableContainer>

      {/* Ask to Modify Modal */}
      <Modal
        title={`Request Modification - ${selectedPayable?.invoiceId || ""}`}
        open={modifyModalVisible}
        onOk={handleSubmitModifyRequest}
        onCancel={handleCancelModifyModal}
        width={600}
        okText="Send Request"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
      >
        {selectedPayable && (
          <div>
            <div style={{ marginBottom: 16, padding: 12, background: "#f8f9fd", borderRadius: 6 }}>
              <div><strong>Invoice ID:</strong> {selectedPayable.invoiceId}</div>
              <div><strong>Talent Name:</strong> {selectedPayable.talentName}</div>
              <div><strong>Partner:</strong> {selectedPayable.partner}</div>
              <div><strong>Month:</strong> {selectedPayable.month} {selectedPayable.year}</div>
              <div><strong>Total Amount:</strong> ₹ {selectedPayable.totalAmount.toLocaleString("en-IN")}</div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, color: "#014c75", fontWeight: 500 }}>
                Reason for Modification *
              </label>
              <Input.TextArea
                rows={4}
                placeholder="Please specify what needs to be modified in the invoice..."
                value={modifyReason}
                onChange={(e) => setModifyReason(e.target.value)}
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Update Payable Modal */}
      <Modal
        title={`Update Payable Status - ${selectedPayable?.invoiceId || ""}`}
        open={updatePayableModalVisible}
        onOk={handleSubmitUpdatePayable}
        onCancel={handleCancelUpdatePayable}
        width={600}
        okText="Update Status"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
      >
        {selectedPayable && (
          <div>
            <div style={{ marginBottom: 16, padding: 12, background: "#f8f9fd", borderRadius: 6 }}>
              <div><strong>Invoice ID:</strong> {selectedPayable.invoiceId}</div>
              <div><strong>Talent Name:</strong> {selectedPayable.talentName}</div>
              <div><strong>Month:</strong> {selectedPayable.month} {selectedPayable.year}</div>
              <div><strong>Total Amount:</strong> ₹ {selectedPayable.totalAmount.toLocaleString("en-IN")}</div>
              <div><strong>Current Status:</strong> <Tag color={selectedPayable.status === "Paid" ? "green" : "blue"}>{selectedPayable.status}</Tag></div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, color: "#014c75", fontWeight: 500 }}>
                Update Status *
              </label>
              <Select
                value={selectedPayableStatus}
                onChange={setSelectedPayableStatus}
                style={{ width: "100%" }}
              >
                <Option value="Paid">Paid</Option>
                <Option value="Unpaid">Unpaid</Option>
              </Select>
            </div>
          </div>
        )}
      </Modal>
    </FinanceContainer>
  );
};

export default FinanceManagement;
