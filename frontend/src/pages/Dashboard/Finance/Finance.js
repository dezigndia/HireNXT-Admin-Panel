import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Tag,
  Dropdown,
  Modal,
  message,
  Empty,
  Descriptions,
} from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  DollarOutlined,
  FileTextOutlined,
  DownloadOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  FinanceContainer,
  PageHeader,
  MetricsSection,
  MetricCard,
  TopSection,
  FiltersRow,
  TabsContainer,
  TableContainer,
  EmptyState,
  InsightsGrid,
  InsightCard,
} from "./Finance.style";

const { Option } = Select;

const Finance = () => {
  const [activeTab, setActiveTab] = useState("Client Billing");
  const [searchText, setSearchText] = useState("");
  const [filterPartner, setFilterPartner] = useState("");
  const [filterCustomer, setFilterCustomer] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Mock data for Client Billing (Receivables)
  const [receivables, setReceivables] = useState([
    {
      id: 1,
      talentName: "Rahul Kumar",
      role: "Full Stack Developer",
      partner: "TechCorp Solutions",
      customer: "Amazon Inc",
      month: "December",
      year: "2024",
      workingDays: 22,
      billableHours: 176,
      amount: 150000,
      gst: 27000,
      totalAmount: 177000,
      timesheetStatus: "Approved",
      invoiceStatus: "Pending",
      dueDate: "2025-01-05",
    },
    {
      id: 2,
      talentName: "Priya Sharma",
      role: "React Native Developer",
      partner: "Digital Partners Inc",
      customer: "Google LLC",
      month: "December",
      year: "2024",
      workingDays: 20,
      billableHours: 160,
      amount: 165000,
      gst: 29700,
      totalAmount: 194700,
      timesheetStatus: "Approved",
      invoiceStatus: "Sent",
      dueDate: "2025-01-03",
    },
    {
      id: 3,
      talentName: "Amit Patel",
      role: "Backend Developer",
      partner: "Innovate Tech",
      customer: "Microsoft Corporation",
      month: "November",
      year: "2024",
      workingDays: 22,
      billableHours: 176,
      amount: 140000,
      gst: 25200,
      totalAmount: 165200,
      timesheetStatus: "Approved",
      invoiceStatus: "Overdue",
      dueDate: "2024-12-05",
    },
    {
      id: 4,
      talentName: "Sneha Reddy",
      role: "UI/UX Designer",
      partner: "CodeCraft Ltd",
      customer: "Adobe Systems",
      month: "December",
      year: "2024",
      workingDays: 21,
      billableHours: 168,
      amount: 120000,
      gst: 21600,
      totalAmount: 141600,
      timesheetStatus: "Approved",
      invoiceStatus: "Pending",
      dueDate: "2025-01-07",
    },
  ]);

  // Mock data for Partner Payables
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
      submittedOn: "2024-11-28",
      approvedOn: "2024-12-02",
    },
    {
      id: 4,
      recordId: "PAY-2024-004",
      invoiceId: "INV-COD-3456",
      talentId: "T004",
      talentName: "Sneha Reddy",
      partner: "CodeCraft Ltd",
      jobId: "JOB-2024-104",
      month: "December",
      year: "2024",
      days: 21,
      hours: 168,
      amount: 96000,
      gst: 17280,
      totalAmount: 113280,
      status: "Submitted",
      submittedOn: "2024-12-27",
    },
  ]);

  // Mock data for Invoice History
  const [invoiceHistory, setInvoiceHistory] = useState([
    {
      id: 1,
      invoiceNumber: "INV-CLI-2024-001",
      type: "Client Invoice",
      talentName: "Rahul Kumar",
      party: "Amazon Inc",
      month: "November",
      year: "2024",
      amount: 150000,
      gst: 27000,
      totalAmount: 177000,
      issuedDate: "2024-12-01",
      dueDate: "2024-12-15",
      paidDate: "2024-12-12",
      status: "Paid",
    },
    {
      id: 2,
      invoiceNumber: "INV-CLI-2024-002",
      type: "Client Invoice",
      talentName: "Priya Sharma",
      party: "Google LLC",
      month: "November",
      year: "2024",
      amount: 165000,
      gst: 29700,
      totalAmount: 194700,
      issuedDate: "2024-12-01",
      dueDate: "2024-12-15",
      paidDate: "2024-12-14",
      status: "Paid",
    },
    {
      id: 3,
      invoiceNumber: "INV-PAR-2024-001",
      type: "Partner Invoice",
      talentName: "Amit Patel",
      party: "Innovate Tech",
      month: "November",
      year: "2024",
      amount: 112000,
      gst: 20160,
      totalAmount: 132160,
      issuedDate: "2024-12-02",
      dueDate: "2024-12-16",
      paidDate: "2024-12-15",
      status: "Paid",
    },
  ]);

  // Get filtered data based on search and filters
  const getFilteredReceivables = () => {
    let filtered = [...receivables];

    if (searchText) {
      filtered = filtered.filter(
        (r) =>
          r.talentName.toLowerCase().includes(searchText.toLowerCase()) ||
          r.customer.toLowerCase().includes(searchText.toLowerCase()) ||
          r.partner.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterPartner) {
      filtered = filtered.filter((r) => r.partner === filterPartner);
    }

    if (filterCustomer) {
      filtered = filtered.filter((r) => r.customer === filterCustomer);
    }

    if (filterMonth) {
      filtered = filtered.filter((r) => r.month === filterMonth);
    }

    if (filterStatus) {
      filtered = filtered.filter((r) => r.invoiceStatus === filterStatus);
    }

    return filtered;
  };

  const getFilteredPayables = () => {
    let filtered = [...payables];

    if (searchText) {
      filtered = filtered.filter(
        (p) =>
          p.talentName.toLowerCase().includes(searchText.toLowerCase()) ||
          p.partner.toLowerCase().includes(searchText.toLowerCase()) ||
          p.invoiceId.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterPartner) {
      filtered = filtered.filter((p) => p.partner === filterPartner);
    }

    if (filterMonth) {
      filtered = filtered.filter((p) => p.month === filterMonth);
    }

    if (filterStatus) {
      filtered = filtered.filter((p) => p.status === filterStatus);
    }

    return filtered;
  };

  const getFilteredInvoiceHistory = () => {
    let filtered = [...invoiceHistory];

    if (searchText) {
      filtered = filtered.filter(
        (i) =>
          i.invoiceNumber.toLowerCase().includes(searchText.toLowerCase()) ||
          i.talentName.toLowerCase().includes(searchText.toLowerCase()) ||
          i.party.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterMonth) {
      filtered = filtered.filter((i) => i.month === filterMonth);
    }

    if (filterStatus) {
      filtered = filtered.filter((i) => i.status === filterStatus);
    }

    return filtered;
  };

  // Calculate metrics for Client Billing
  const getReceivableMetrics = () => {
    const today = new Date();
    const totalAmount = receivables.reduce((sum, r) => sum + r.totalAmount, 0);
    const currentReceivable = receivables
      .filter((r) => r.invoiceStatus !== "Paid" && new Date(r.dueDate) >= today)
      .reduce((sum, r) => sum + r.totalAmount, 0);
    const overdueAmount = receivables
      .filter((r) => r.invoiceStatus === "Overdue" || (r.invoiceStatus !== "Paid" && new Date(r.dueDate) < today))
      .reduce((sum, r) => sum + r.totalAmount, 0);
    const totalInvoices = receivables.length;

    return { totalAmount, currentReceivable, overdueAmount, totalInvoices };
  };

  // Calculate metrics for Partner Payables
  const getPayableMetrics = () => {
    const totalPaid = payables
      .filter((p) => p.status === "Approved" || p.status === "Paid")
      .reduce((sum, p) => sum + p.totalAmount, 0);
    const currentPayable = payables
      .filter((p) => p.status === "Submitted")
      .reduce((sum, p) => sum + p.totalAmount, 0);
    const overduePayable = payables
      .filter((p) => p.status === "Overdue")
      .reduce((sum, p) => sum + p.totalAmount, 0);
    const totalInvoices = payables.length;

    return { totalPaid, currentPayable, overduePayable, totalInvoices };
  };

  // Action handlers for Client Billing
  const handleViewBreakup = (record) => {
    Modal.info({
      title: `Billing Breakup - ${record.talentName}`,
      width: 600,
      content: (
        <Descriptions bordered column={1} size="small" style={{ marginTop: 16 }}>
          <Descriptions.Item label="Talent">{record.talentName}</Descriptions.Item>
          <Descriptions.Item label="Role">{record.role}</Descriptions.Item>
          <Descriptions.Item label="Partner">{record.partner}</Descriptions.Item>
          <Descriptions.Item label="Customer">{record.customer}</Descriptions.Item>
          <Descriptions.Item label="Month">{record.month} {record.year}</Descriptions.Item>
          <Descriptions.Item label="Working Days">{record.workingDays}</Descriptions.Item>
          <Descriptions.Item label="Billable Hours">{record.billableHours}</Descriptions.Item>
          <Descriptions.Item label="Base Amount">₹ {record.amount.toLocaleString("en-IN")}</Descriptions.Item>
          <Descriptions.Item label="GST (18%)">₹ {record.gst.toLocaleString("en-IN")}</Descriptions.Item>
          <Descriptions.Item label="Total Amount"><strong>₹ {record.totalAmount.toLocaleString("en-IN")}</strong></Descriptions.Item>
          <Descriptions.Item label="Timesheet Status">
            <Tag color={record.timesheetStatus === "Approved" ? "green" : "orange"}>
              {record.timesheetStatus}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Invoice Status">
            <Tag color={record.invoiceStatus === "Paid" ? "green" : record.invoiceStatus === "Overdue" ? "red" : "orange"}>
              {record.invoiceStatus}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      ),
    });
  };

  const handleDownloadTimesheet = (record) => {
    message.info(`Downloading timesheet for ${record.talentName}...`);
  };

  const handleCreateInvoice = (record) => {
    Modal.confirm({
      title: "Create Invoice",
      content: `Create and send invoice to ${record.customer} for ${record.talentName} (${record.month} ${record.year})?`,
      okText: "Create & Send",
      okButtonProps: { style: { background: "#00d9a9", borderColor: "#00d9a9" } },
      onOk: () => {
        const updated = receivables.map((r) =>
          r.id === record.id ? { ...r, invoiceStatus: "Sent" } : r
        );
        setReceivables(updated);
        message.success(`Invoice created and sent to ${record.customer}`);
      },
    });
  };

  // Action handlers for Partner Payables
  const handleViewPayable = (record) => {
    Modal.info({
      title: `Payable Details - ${record.invoiceId}`,
      width: 600,
      content: (
        <Descriptions bordered column={1} size="small" style={{ marginTop: 16 }}>
          <Descriptions.Item label="Record ID">{record.recordId}</Descriptions.Item>
          <Descriptions.Item label="Invoice ID">{record.invoiceId}</Descriptions.Item>
          <Descriptions.Item label="Talent ID">{record.talentId}</Descriptions.Item>
          <Descriptions.Item label="Talent Name">{record.talentName}</Descriptions.Item>
          <Descriptions.Item label="Partner">{record.partner}</Descriptions.Item>
          <Descriptions.Item label="Job ID">{record.jobId}</Descriptions.Item>
          <Descriptions.Item label="Month">{record.month} {record.year}</Descriptions.Item>
          <Descriptions.Item label="Days">{record.days}</Descriptions.Item>
          <Descriptions.Item label="Hours">{record.hours}</Descriptions.Item>
          <Descriptions.Item label="Amount">₹ {record.amount.toLocaleString("en-IN")}</Descriptions.Item>
          <Descriptions.Item label="GST">₹ {record.gst.toLocaleString("en-IN")}</Descriptions.Item>
          <Descriptions.Item label="Total Amount"><strong>₹ {record.totalAmount.toLocaleString("en-IN")}</strong></Descriptions.Item>
          <Descriptions.Item label="Submitted On">{record.submittedOn}</Descriptions.Item>
          {record.approvedOn && (
            <Descriptions.Item label="Approved On">{record.approvedOn}</Descriptions.Item>
          )}
          <Descriptions.Item label="Status">
            <Tag color={record.status === "Approved" ? "green" : "orange"}>
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

  const handleDownloadTimesheetPayable = (record) => {
    message.info(`Downloading timesheet for ${record.talentName}...`);
  };

  const handleApprovePayable = (record) => {
    Modal.confirm({
      title: "Approve Payable",
      content: `Approve payment for ${record.partner} - ${record.invoiceId}?`,
      okText: "Approve",
      okButtonProps: { style: { background: "#00d9a9", borderColor: "#00d9a9" } },
      onOk: () => {
        const updated = payables.map((p) =>
          p.id === record.id
            ? { ...p, status: "Approved", approvedOn: new Date().toISOString().split("T")[0] }
            : p
        );
        setPayables(updated);
        message.success(`Payment approved for ${record.partner}`);
      },
    });
  };

  const handleModifyPayable = (record) => {
    message.info(`Modify feature for ${record.invoiceId} - Implementation pending`);
  };

  const handleRejectPayable = (record) => {
    Modal.confirm({
      title: "Reject Payable",
      content: `Reject payment for ${record.partner} - ${record.invoiceId}?`,
      okText: "Reject",
      okType: "danger",
      onOk: () => {
        const updated = payables.map((p) =>
          p.id === record.id ? { ...p, status: "Rejected" } : p
        );
        setPayables(updated);
        message.warning(`Payment rejected for ${record.partner}`);
      },
    });
  };

  // Columns for Client Billing
  const receivableColumns = [
    {
      title: "Talent Name",
      dataIndex: "talentName",
      key: "talentName",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 140,
      ellipsis: true,
    },
    {
      title: "Partner",
      dataIndex: "partner",
      key: "partner",
      width: 140,
      ellipsis: true,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      width: 140,
      ellipsis: true,
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      width: 90,
      render: (text, record) => `${text.substring(0, 3)} '${record.year.toString().substring(2)}`,
    },
    {
      title: "Days",
      dataIndex: "workingDays",
      key: "workingDays",
      width: 60,
    },
    {
      title: "Hrs",
      dataIndex: "billableHours",
      key: "billableHours",
      width: 60,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 110,
      ellipsis: true,
      render: (amount) => `₹ ${amount.toLocaleString("en-IN")}`,
    },
    {
      title: "GST (18%)",
      dataIndex: "gst",
      key: "gst",
      width: 100,
      ellipsis: true,
      render: (gst) => `₹ ${gst.toLocaleString("en-IN")}`,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 120,
      ellipsis: true,
      render: (total) => (
        <span style={{ fontWeight: 600, color: "#014c75" }}>
          ₹ {total.toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      title: "Timesheet",
      dataIndex: "timesheetStatus",
      key: "timesheetStatus",
      width: 100,
      render: (status) => (
        <Tag color={status === "Approved" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Invoice",
      dataIndex: "invoiceStatus",
      key: "invoiceStatus",
      width: 100,
      render: (status) => (
        <Tag
          color={
            status === "Paid" ? "green" : status === "Overdue" ? "red" : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "viewBreakup",
                label: "View Breakup",
                icon: <EyeOutlined />,
                onClick: () => handleViewBreakup(record),
              },
              {
                key: "downloadTimesheet",
                label: "Download Timesheet",
                icon: <DownloadOutlined />,
                onClick: () => handleDownloadTimesheet(record),
              },
              {
                key: "createInvoice",
                label: "Create Invoice",
                icon: <SendOutlined />,
                onClick: () => handleCreateInvoice(record),
                disabled: record.invoiceStatus === "Sent" || record.invoiceStatus === "Paid",
              },
            ],
          }}
          trigger={["click"]}
        >
          <MoreOutlined style={{ cursor: "pointer", fontSize: "18px" }} />
        </Dropdown>
      ),
    },
  ];

  // Columns for Partner Payables
  const payableColumns = [
    {
      title: "Record ID",
      dataIndex: "recordId",
      key: "recordId",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Invoice ID",
      dataIndex: "invoiceId",
      key: "invoiceId",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Talent ID",
      dataIndex: "talentId",
      key: "talentId",
      width: 80,
    },
    {
      title: "Talent Name",
      dataIndex: "talentName",
      key: "talentName",
      width: 140,
      ellipsis: true,
    },
    {
      title: "Partner",
      dataIndex: "partner",
      key: "partner",
      width: 140,
      ellipsis: true,
    },
    {
      title: "Job ID",
      dataIndex: "jobId",
      key: "jobId",
      width: 110,
      ellipsis: true,
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      width: 60,
    },
    {
      title: "Hrs",
      dataIndex: "hours",
      key: "hours",
      width: 60,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 110,
      ellipsis: true,
      render: (amount) => `₹ ${amount.toLocaleString("en-IN")}`,
    },
    {
      title: "GST",
      dataIndex: "gst",
      key: "gst",
      width: 90,
      ellipsis: true,
      render: (gst) => `₹ ${gst.toLocaleString("en-IN")}`,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 120,
      ellipsis: true,
      render: (total) => (
        <span style={{ fontWeight: 600, color: "#014c75" }}>
          ₹ {total.toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <Tag
          color={
            status === "Approved"
              ? "green"
              : status === "Rejected"
              ? "red"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: "View",
                icon: <EyeOutlined />,
                onClick: () => handleViewPayable(record),
              },
              {
                key: "downloadInvoice",
                label: "Download Invoice",
                icon: <DownloadOutlined />,
                onClick: () => handleDownloadInvoice(record),
              },
              {
                key: "downloadTimesheet",
                label: "Download Timesheet",
                icon: <FileTextOutlined />,
                onClick: () => handleDownloadTimesheetPayable(record),
              },
              {
                key: "approve",
                label: "Approve",
                icon: <CheckOutlined />,
                onClick: () => handleApprovePayable(record),
                disabled: record.status !== "Submitted",
              },
              {
                key: "modify",
                label: "Modify",
                icon: <EditOutlined />,
                onClick: () => handleModifyPayable(record),
              },
              {
                key: "reject",
                label: "Reject",
                icon: <CloseOutlined />,
                onClick: () => handleRejectPayable(record),
                disabled: record.status !== "Submitted",
              },
            ],
          }}
          trigger={["click"]}
        >
          <MoreOutlined style={{ cursor: "pointer", fontSize: "18px" }} />
        </Dropdown>
      ),
    },
  ];

  // Columns for Invoice History
  const invoiceHistoryColumns = [
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 130,
      render: (type) => (
        <Tag color={type === "Client Invoice" ? "blue" : "purple"}>{type}</Tag>
      ),
    },
    {
      title: "Talent",
      dataIndex: "talentName",
      key: "talentName",
      width: 140,
      ellipsis: true,
    },
    {
      title: "Party",
      dataIndex: "party",
      key: "party",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      width: 90,
      render: (text, record) => `${text.substring(0, 3)} '${record.year.toString().substring(2)}`,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 110,
      ellipsis: true,
      render: (amount) => `₹ ${amount.toLocaleString("en-IN")}`,
    },
    {
      title: "GST",
      dataIndex: "gst",
      key: "gst",
      width: 90,
      ellipsis: true,
      render: (gst) => `₹ ${gst.toLocaleString("en-IN")}`,
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 120,
      ellipsis: true,
      render: (total) => (
        <span style={{ fontWeight: 600, color: "#014c75" }}>
          ₹ {total.toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      title: "Issued",
      dataIndex: "issuedDate",
      key: "issuedDate",
      width: 100,
    },
    {
      title: "Paid",
      dataIndex: "paidDate",
      key: "paidDate",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 90,
      render: (status) => (
        <Tag color={status === "Paid" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: "View",
                icon: <EyeOutlined />,
                onClick: () => message.info(`Viewing ${record.invoiceNumber}`),
              },
              {
                key: "download",
                label: "Download",
                icon: <DownloadOutlined />,
                onClick: () => message.info(`Downloading ${record.invoiceNumber}`),
              },
            ],
          }}
          trigger={["click"]}
        >
          <MoreOutlined style={{ cursor: "pointer", fontSize: "18px" }} />
        </Dropdown>
      ),
    },
  ];

  // Render metrics based on active tab
  const renderMetrics = () => {
    if (activeTab === "Client Billing") {
      const metrics = getReceivableMetrics();
      return (
        <MetricsSection>
          <MetricCard>
            <div className="metric-label">Total Amount</div>
            <div className="metric-value">₹ {(metrics.totalAmount / 100000).toFixed(2)}L</div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Current Receivable</div>
            <div className="metric-value">₹ {(metrics.currentReceivable / 100000).toFixed(2)}L</div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Overdue Amount</div>
            <div className="metric-value" style={{ color: "#ff4d4f" }}>
              ₹ {(metrics.overdueAmount / 100000).toFixed(2)}L
            </div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Total Invoices</div>
            <div className="metric-value">{metrics.totalInvoices}</div>
          </MetricCard>
        </MetricsSection>
      );
    }

    if (activeTab === "Partner Payables") {
      const metrics = getPayableMetrics();
      return (
        <MetricsSection>
          <MetricCard>
            <div className="metric-label">Total Paid</div>
            <div className="metric-value">₹ {(metrics.totalPaid / 100000).toFixed(2)}L</div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Current Payable</div>
            <div className="metric-value">₹ {(metrics.currentPayable / 100000).toFixed(2)}L</div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Overdue Payable</div>
            <div className="metric-value" style={{ color: "#ff4d4f" }}>
              ₹ {(metrics.overduePayable / 100000).toFixed(2)}L
            </div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Total Invoices</div>
            <div className="metric-value">{metrics.totalInvoices}</div>
          </MetricCard>
        </MetricsSection>
      );
    }

    if (activeTab === "Invoice History") {
      const totalRevenue = invoiceHistory
        .filter((i) => i.status === "Paid")
        .reduce((sum, i) => sum + i.totalAmount, 0);
      const totalGST = invoiceHistory
        .filter((i) => i.status === "Paid")
        .reduce((sum, i) => sum + i.gst, 0);
      return (
        <MetricsSection>
          <MetricCard>
            <div className="metric-label">Total Revenue</div>
            <div className="metric-value">₹ {(totalRevenue / 100000).toFixed(2)}L</div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Total GST Collected</div>
            <div className="metric-value">₹ {(totalGST / 100000).toFixed(2)}L</div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Total Invoices</div>
            <div className="metric-value">{invoiceHistory.length}</div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Paid Invoices</div>
            <div className="metric-value">
              {invoiceHistory.filter((i) => i.status === "Paid").length}
            </div>
          </MetricCard>
        </MetricsSection>
      );
    }

    if (activeTab === "Financial Insights") {
      const totalReceivable = receivables.reduce((sum, r) => sum + r.totalAmount, 0);
      const totalPayable = payables.reduce((sum, p) => sum + p.totalAmount, 0);
      const netCashFlow = totalReceivable - totalPayable;
      const gstLiability = receivables.reduce((sum, r) => sum + r.gst, 0);

      return (
        <MetricsSection>
          <MetricCard>
            <div className="metric-label">Total Receivable</div>
            <div className="metric-value">₹ {(totalReceivable / 100000).toFixed(2)}L</div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Total Payable</div>
            <div className="metric-value">₹ {(totalPayable / 100000).toFixed(2)}L</div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Net Cash Flow</div>
            <div
              className="metric-value"
              style={{ color: netCashFlow >= 0 ? "#52c41a" : "#ff4d4f" }}
            >
              ₹ {(netCashFlow / 100000).toFixed(2)}L
            </div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">GST Liability</div>
            <div className="metric-value">₹ {(gstLiability / 100000).toFixed(2)}L</div>
          </MetricCard>
        </MetricsSection>
      );
    }

    return null;
  };

  // Render filters based on active tab
  const renderFilters = () => {
    if (activeTab === "Financial Insights") {
      return null;
    }

    return (
      <TopSection>
        <FiltersRow>
          <Input
            placeholder="Search by name, customer, or partner..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          {activeTab !== "Invoice History" && (
            <Select
              placeholder="Filter by Partner"
              value={filterPartner}
              onChange={setFilterPartner}
              allowClear
              style={{ minWidth: 180 }}
            >
              <Option value="TechCorp Solutions">TechCorp Solutions</Option>
              <Option value="Digital Partners Inc">Digital Partners Inc</Option>
              <Option value="Innovate Tech">Innovate Tech</Option>
              <Option value="CodeCraft Ltd">CodeCraft Ltd</Option>
            </Select>
          )}
          {activeTab === "Client Billing" && (
            <Select
              placeholder="Filter by Customer"
              value={filterCustomer}
              onChange={setFilterCustomer}
              allowClear
              style={{ minWidth: 180 }}
            >
              <Option value="Amazon Inc">Amazon Inc</Option>
              <Option value="Google LLC">Google LLC</Option>
              <Option value="Microsoft Corporation">Microsoft Corporation</Option>
              <Option value="Adobe Systems">Adobe Systems</Option>
            </Select>
          )}
          <Select
            placeholder="Filter by Month"
            value={filterMonth}
            onChange={setFilterMonth}
            allowClear
            style={{ minWidth: 150 }}
          >
            <Option value="January">January</Option>
            <Option value="February">February</Option>
            <Option value="March">March</Option>
            <Option value="November">November</Option>
            <Option value="December">December</Option>
          </Select>
          <Select
            placeholder="Filter by Status"
            value={filterStatus}
            onChange={setFilterStatus}
            allowClear
            style={{ minWidth: 150 }}
          >
            {activeTab === "Client Billing" && (
              <>
                <Option value="Pending">Pending</Option>
                <Option value="Sent">Sent</Option>
                <Option value="Paid">Paid</Option>
                <Option value="Overdue">Overdue</Option>
              </>
            )}
            {activeTab === "Partner Payables" && (
              <>
                <Option value="Submitted">Submitted</Option>
                <Option value="Approved">Approved</Option>
                <Option value="Rejected">Rejected</Option>
              </>
            )}
            {activeTab === "Invoice History" && (
              <>
                <Option value="Paid">Paid</Option>
                <Option value="Pending">Pending</Option>
              </>
            )}
          </Select>
        </FiltersRow>
      </TopSection>
    );
  };

  // Render table based on active tab
  const renderTable = () => {
    if (activeTab === "Client Billing") {
      const data = getFilteredReceivables();
      return (
        <TableContainer>
          {data.length > 0 ? (
            <Table
              columns={receivableColumns}
              dataSource={data}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Total ${total} records`,
              }}
              scroll={{ x: 1500 }}
            />
          ) : (
            <EmptyState>
              <Empty description="No billing records found" />
            </EmptyState>
          )}
        </TableContainer>
      );
    }

    if (activeTab === "Partner Payables") {
      const data = getFilteredPayables();
      return (
        <TableContainer>
          {data.length > 0 ? (
            <Table
              columns={payableColumns}
              dataSource={data}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Total ${total} records`,
              }}
              scroll={{ x: 1500 }}
            />
          ) : (
            <EmptyState>
              <Empty description="No payable records found" />
            </EmptyState>
          )}
        </TableContainer>
      );
    }

    if (activeTab === "Invoice History") {
      const data = getFilteredInvoiceHistory();
      return (
        <TableContainer>
          {data.length > 0 ? (
            <Table
              columns={invoiceHistoryColumns}
              dataSource={data}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Total ${total} invoices`,
              }}
              scroll={{ x: 1400 }}
            />
          ) : (
            <EmptyState>
              <Empty description="No invoice history found" />
            </EmptyState>
          )}
        </TableContainer>
      );
    }

    if (activeTab === "Financial Insights") {
      return (
        <InsightsGrid>
          <InsightCard>
            <h3>Top Customers by Revenue</h3>
            <div className="insight-content">
              <div className="insight-row">
                <span className="label">Amazon Inc</span>
                <span className="value">₹ 3.54L</span>
              </div>
              <div className="insight-row">
                <span className="label">Google LLC</span>
                <span className="value">₹ 3.89L</span>
              </div>
              <div className="insight-row">
                <span className="label">Microsoft Corporation</span>
                <span className="value">₹ 3.30L</span>
              </div>
            </div>
          </InsightCard>

          <InsightCard>
            <h3>Top Partners by Volume</h3>
            <div className="insight-content">
              <div className="insight-row">
                <span className="label">Digital Partners Inc</span>
                <span className="value">₹ 3.11L</span>
              </div>
              <div className="insight-row">
                <span className="label">TechCorp Solutions</span>
                <span className="value">₹ 2.83L</span>
              </div>
              <div className="insight-row">
                <span className="label">Innovate Tech</span>
                <span className="value">₹ 2.64L</span>
              </div>
            </div>
          </InsightCard>

          <InsightCard>
            <h3>Monthly Trends</h3>
            <div className="insight-content">
              <div className="insight-row">
                <span className="label">November 2024</span>
                <span className="value">₹ 5.04L</span>
              </div>
              <div className="insight-row">
                <span className="label">December 2024</span>
                <span className="value">₹ 6.77L</span>
              </div>
              <div className="insight-row">
                <span className="label">Growth</span>
                <span className="value" style={{ color: "#52c41a" }}>
                  +34.3%
                </span>
              </div>
            </div>
          </InsightCard>

          <InsightCard>
            <h3>Aging Analysis</h3>
            <div className="insight-content">
              <div className="insight-row">
                <span className="label">0-30 Days</span>
                <span className="value">₹ 3.72L</span>
              </div>
              <div className="insight-row">
                <span className="label">31-60 Days</span>
                <span className="value">₹ 0.00L</span>
              </div>
              <div className="insight-row">
                <span className="label">60+ Days (Overdue)</span>
                <span className="value" style={{ color: "#ff4d4f" }}>
                  ₹ 1.65L
                </span>
              </div>
            </div>
          </InsightCard>
        </InsightsGrid>
      );
    }

    return null;
  };

  return (
    <FinanceContainer>
      <PageHeader>
        <h1>Finance Management</h1>
        <p>Manage billing, payments, and financial operations</p>
      </PageHeader>

      {renderMetrics()}

      <TabsContainer>
        <Button
          className={`tab-button ${activeTab === "Client Billing" ? "active" : ""}`}
          onClick={() => setActiveTab("Client Billing")}
        >
          Client Billing
        </Button>
        <Button
          className={`tab-button ${activeTab === "Partner Payables" ? "active" : ""}`}
          onClick={() => setActiveTab("Partner Payables")}
        >
          Partner Payables
        </Button>
        <Button
          className={`tab-button ${activeTab === "Invoice History" ? "active" : ""}`}
          onClick={() => setActiveTab("Invoice History")}
        >
          Invoice History
        </Button>
        <Button
          className={`tab-button ${activeTab === "Financial Insights" ? "active" : ""}`}
          onClick={() => setActiveTab("Financial Insights")}
        >
          Financial Insights
        </Button>
      </TabsContainer>

      {renderFilters()}

      {renderTable()}
    </FinanceContainer>
  );
};

export default Finance;
