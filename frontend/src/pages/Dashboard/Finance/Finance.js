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
  Form,
  InputNumber,
  Upload,
  Flex,
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
  SyncOutlined,
  LineChartOutlined,
  InboxOutlined,
  FilterOutlined,
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
const { Dragger } = Upload;

const Finance = () => {
  const [activeTab, setActiveTab] = useState("Client Billing");
  const [searchText, setSearchText] = useState("");
  const [filterPartner, setFilterPartner] = useState("");
  const [filterCustomer, setFilterCustomer] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPeriod, setFilterPeriod] = useState(""); // For Financial Insights
  
  // Create Invoice Modal state
  const [createInvoiceModalVisible, setCreateInvoiceModalVisible] = useState(false);
  const [selectedInvoiceRecord, setSelectedInvoiceRecord] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [uploadedInvoiceFile, setUploadedInvoiceFile] = useState(null);
  
  // Modify Fee Modal state
  const [modifyFeeModalVisible, setModifyFeeModalVisible] = useState(false);
  const [selectedFeeRecord, setSelectedFeeRecord] = useState(null);
  const [clientFeePercentage, setClientFeePercentage] = useState(10); // Default 10% markup
  const [partnerFeePercentage, setPartnerFeePercentage] = useState(5); // Default 5% deduction

  // Mock data for Client Billing (Receivables)
  const [receivables, setReceivables] = useState([
    {
      id: 1,
      talentId: "T001",
      talentName: "Rahul Kumar",
      role: "Full Stack Developer",
      partner: "TechCorp Solutions",
      customer: "Amazon Inc",
      jobId: "JOB-2024-101",
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
      talentId: "T002",
      talentName: "Priya Sharma",
      role: "React Native Developer",
      partner: "Digital Partners Inc",
      customer: "Google LLC",
      jobId: "JOB-2024-102",
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
      talentId: "T003",
      talentName: "Amit Patel",
      role: "Backend Developer",
      partner: "Innovate Tech",
      customer: "Microsoft Corporation",
      jobId: "JOB-2024-103",
      month: "November",
      year: "2024",
      workingDays: 22,
      billableHours: 176,
      amount: 140000,
      gst: 25200,
      totalAmount: 165200,
      timesheetStatus: "Approved",
      invoiceStatus: "Paid",
      dueDate: "2024-12-05",
    },
    {
      id: 4,
      talentId: "T004",
      talentName: "Sneha Reddy",
      role: "UI/UX Designer",
      partner: "CodeCraft Ltd",
      customer: "Adobe Systems",
      jobId: "JOB-2024-104",
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
      status: "Paid",
      submittedOn: "2024-11-28",
      approvedOn: "2024-12-02",
      paidOn: "2024-12-05",
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

  // Mock data for Invoice Reconciliation
  const [reconciliation, setReconciliation] = useState([
    {
      id: 1,
      talentId: "T001",
      talentName: "Rahul Kumar",
      partner: "TechCorp Solutions",
      recordId: "PAY-2024-001",
      partnerInvoiceId: "INV-TCP-1234",
      jobId: "JOB-2024-101",
      customer: "Amazon Inc",
      customerInvoiceId: "CLI-2024-101",
      receivableStatus: "Pending",
      payableStatus: "Submitted",
      month: "December",
      year: "2024",
      baseCost: 150000, // Talent base cost
      clientFeePercentage: 10, // Default client markup %
      partnerFeePercentage: 5, // Default partner deduction %
    },
    {
      id: 2,
      talentId: "T002",
      talentName: "Priya Sharma",
      partner: "Digital Partners Inc",
      recordId: "PAY-2024-002",
      partnerInvoiceId: "INV-DPI-5678",
      jobId: "JOB-2024-102",
      customer: "Google LLC",
      customerInvoiceId: "CLI-2024-102",
      receivableStatus: "Sent",
      payableStatus: "Submitted",
      month: "December",
      year: "2024",
      baseCost: 165000,
      clientFeePercentage: 10,
      partnerFeePercentage: 5,
    },
    {
      id: 3,
      talentId: "T003",
      talentName: "Amit Patel",
      partner: "Innovate Tech",
      recordId: "PAY-2024-003",
      partnerInvoiceId: "INV-INN-9012",
      jobId: "JOB-2024-103",
      customer: "Microsoft Corporation",
      customerInvoiceId: "CLI-2024-103",
      receivableStatus: "Paid",
      payableStatus: "Paid",
      month: "November",
      year: "2024",
      baseCost: 180000,
      clientFeePercentage: 10,
      partnerFeePercentage: 5,
    },
    {
      id: 4,
      talentId: "T004",
      talentName: "Sneha Reddy",
      partner: "CodeCraft Ltd",
      recordId: "PAY-2024-004",
      partnerInvoiceId: "INV-COD-3456",
      jobId: "JOB-2024-104",
      customer: "Adobe Systems",
      customerInvoiceId: "CLI-2024-104",
      receivableStatus: "Pending",
      payableStatus: "Submitted",
      month: "December",
      year: "2024",
      baseCost: 96000,
      clientFeePercentage: 10,
      partnerFeePercentage: 5,
    },
  ]);

  // Mock data for Revenue Analysis
  // Revenue calculation: Receivable is 10% above talent cost, Payable is 5% deduction from talent cost
  const [revenueAnalysis, setRevenueAnalysis] = useState([
    {
      id: 1,
      talentId: "T001",
      talentName: "Rahul Kumar",
      partner: "TechCorp Solutions",
      jobId: "JOB-2024-101",
      customer: "Amazon Inc",
      talentCost: 150000,
      amountReceivable: 165000, // 10% above talent cost
      gstIn: 29700, // 18% GST
      amountPayable: 142500, // 5% deduction from talent cost
      gstOut: 25650, // 18% GST
      revenue: 22500, // Difference between receivable and payable
      month: "December",
      year: "2024",
    },
    {
      id: 2,
      talentId: "T002",
      talentName: "Priya Sharma",
      partner: "Digital Partners Inc",
      jobId: "JOB-2024-102",
      customer: "Google LLC",
      talentCost: 165000,
      amountReceivable: 181500, // 10% above
      gstIn: 32670,
      amountPayable: 156750, // 5% deduction
      gstOut: 28215,
      revenue: 24750,
      month: "December",
      year: "2024",
    },
    {
      id: 3,
      talentId: "T003",
      talentName: "Amit Patel",
      partner: "Innovate Tech",
      jobId: "JOB-2024-103",
      customer: "Microsoft Corporation",
      talentCost: 140000,
      amountReceivable: 154000,
      gstIn: 27720,
      amountPayable: 133000,
      gstOut: 23940,
      revenue: 21000,
      month: "November",
      year: "2024",
    },
    {
      id: 4,
      talentId: "T004",
      talentName: "Sneha Reddy",
      partner: "CodeCraft Ltd",
      jobId: "JOB-2024-104",
      customer: "Adobe Systems",
      talentCost: 120000,
      amountReceivable: 132000,
      gstIn: 23760,
      amountPayable: 114000,
      gstOut: 20520,
      revenue: 18000,
      month: "December",
      year: "2024",
    },
  ]);

  // Get filtered data functions
  const getFilteredReceivables = () => {
    let filtered = [...receivables];

    if (searchText) {
      filtered = filtered.filter(
        (r) =>
          r.talentName.toLowerCase().includes(searchText.toLowerCase()) ||
          r.customer.toLowerCase().includes(searchText.toLowerCase()) ||
          r.partner.toLowerCase().includes(searchText.toLowerCase()) ||
          r.talentId.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterPartner) filtered = filtered.filter((r) => r.partner === filterPartner);
    if (filterCustomer) filtered = filtered.filter((r) => r.customer === filterCustomer);
    if (filterMonth) filtered = filtered.filter((r) => r.month === filterMonth);
    if (filterStatus) filtered = filtered.filter((r) => r.invoiceStatus === filterStatus);

    return filtered;
  };

  const getFilteredPayables = () => {
    let filtered = [...payables];

    if (searchText) {
      filtered = filtered.filter(
        (p) =>
          p.talentName.toLowerCase().includes(searchText.toLowerCase()) ||
          p.partner.toLowerCase().includes(searchText.toLowerCase()) ||
          p.invoiceId.toLowerCase().includes(searchText.toLowerCase()) ||
          p.talentId.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterPartner) filtered = filtered.filter((p) => p.partner === filterPartner);
    if (filterMonth) filtered = filtered.filter((p) => p.month === filterMonth);
    if (filterStatus) filtered = filtered.filter((p) => p.status === filterStatus);

    return filtered;
  };

  const getFilteredReconciliation = () => {
    let filtered = [...reconciliation];

    if (searchText) {
      filtered = filtered.filter(
        (r) =>
          r.talentName.toLowerCase().includes(searchText.toLowerCase()) ||
          r.partner.toLowerCase().includes(searchText.toLowerCase()) ||
          r.customer.toLowerCase().includes(searchText.toLowerCase()) ||
          r.talentId.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterPartner) filtered = filtered.filter((r) => r.partner === filterPartner);
    if (filterCustomer) filtered = filtered.filter((r) => r.customer === filterCustomer);
    if (filterMonth) filtered = filtered.filter((r) => r.month === filterMonth);
    if (filterStatus) {
      filtered = filtered.filter(
        (r) => r.receivableStatus === filterStatus || r.payableStatus === filterStatus
      );
    }

    return filtered;
  };

  const getFilteredRevenueAnalysis = () => {
    let filtered = [...revenueAnalysis];

    if (searchText) {
      filtered = filtered.filter(
        (r) =>
          r.talentName.toLowerCase().includes(searchText.toLowerCase()) ||
          r.partner.toLowerCase().includes(searchText.toLowerCase()) ||
          r.customer.toLowerCase().includes(searchText.toLowerCase()) ||
          r.talentId.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterPartner) filtered = filtered.filter((r) => r.partner === filterPartner);
    if (filterCustomer) filtered = filtered.filter((r) => r.customer === filterCustomer);
    if (filterMonth) filtered = filtered.filter((r) => r.month === filterMonth);

    return filtered;
  };

  // Calculate metrics
  const getReceivableMetrics = () => {
    const today = new Date();
    const totalAmount = receivables.reduce((sum, r) => sum + r.totalAmount, 0);
    const currentReceivable = receivables
      .filter((r) => r.invoiceStatus !== "Paid" && new Date(r.dueDate) >= today)
      .reduce((sum, r) => sum + r.totalAmount, 0);
    const overdueAmount = receivables
      .filter(
        (r) =>
          r.invoiceStatus === "Overdue" ||
          (r.invoiceStatus !== "Paid" && new Date(r.dueDate) < today)
      )
      .reduce((sum, r) => sum + r.totalAmount, 0);
    const totalInvoices = receivables.length;

    return { totalAmount, currentReceivable, overdueAmount, totalInvoices };
  };

  const getPayableMetrics = () => {
    const totalPaid = payables
      .filter((p) => p.status === "Paid")
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

  const getReconciliationMetrics = () => {
    const totalInvoicePaid = reconciliation.filter(
      (r) => r.receivableStatus === "Paid"
    ).length;
    const totalBillsPaid = reconciliation.filter((r) => r.payableStatus === "Paid").length;
    const receivablePending = reconciliation.filter(
      (r) => r.receivableStatus !== "Paid"
    ).length;
    const payablePending = reconciliation.filter((r) => r.payableStatus !== "Paid").length;

    return { totalInvoicePaid, totalBillsPaid, receivablePending, payablePending };
  };

  const getRevenueMetrics = () => {
    const totalRevenue = revenueAnalysis.reduce((sum, r) => sum + r.revenue, 0);
    const totalReceivable = revenueAnalysis.reduce((sum, r) => sum + r.amountReceivable, 0);
    const totalPayable = revenueAnalysis.reduce((sum, r) => sum + r.amountPayable, 0);
    const totalGSTIn = revenueAnalysis.reduce((sum, r) => sum + r.gstIn, 0);
    const totalGSTOut = revenueAnalysis.reduce((sum, r) => sum + r.gstOut, 0);

    return {
      totalRevenue,
      totalReceivable,
      totalPayable,
      totalGSTIn,
      totalGSTOut,
    };
  };

  // Action handlers for Client Billing
  const handleViewBreakup = (record) => {
    Modal.info({
      title: `Billing Breakup - ${record.talentName}`,
      width: 600,
      content: (
        <Descriptions bordered column={1} size="small" style={{ marginTop: 16 }}>
          <Descriptions.Item label="Talent ID">{record.talentId}</Descriptions.Item>
          <Descriptions.Item label="Talent">{record.talentName}</Descriptions.Item>
          <Descriptions.Item label="Role">{record.role}</Descriptions.Item>
          <Descriptions.Item label="Partner">{record.partner}</Descriptions.Item>
          <Descriptions.Item label="Customer">{record.customer}</Descriptions.Item>
          <Descriptions.Item label="Job ID">{record.jobId}</Descriptions.Item>
          <Descriptions.Item label="Month">
            {record.month} {record.year}
          </Descriptions.Item>
          <Descriptions.Item label="Working Days">{record.workingDays}</Descriptions.Item>
          <Descriptions.Item label="Billable Hours">{record.billableHours}</Descriptions.Item>
          <Descriptions.Item label="Base Amount">
            ₹ {record.amount.toLocaleString("en-IN")}
          </Descriptions.Item>
          <Descriptions.Item label="GST (18%)">
            ₹ {record.gst.toLocaleString("en-IN")}
          </Descriptions.Item>
          <Descriptions.Item label="Total Amount">
            <strong>₹ {record.totalAmount.toLocaleString("en-IN")}</strong>
          </Descriptions.Item>
          <Descriptions.Item label="Timesheet Status">
            <Tag color={record.timesheetStatus === "Approved" ? "green" : "orange"}>
              {record.timesheetStatus}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Invoice Status">
            <Tag
              color={
                record.invoiceStatus === "Paid"
                  ? "green"
                  : record.invoiceStatus === "Overdue"
                  ? "red"
                  : "orange"
              }
            >
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
    setSelectedInvoiceRecord(record);
    setCreateInvoiceModalVisible(true);
    // Generate default invoice number
    const invoiceNum = `INV-${record.talentId}-${record.month.substring(0, 3).toUpperCase()}${record.year}`;
    setInvoiceNumber(invoiceNum);
  };

  const handleCloseInvoiceModal = () => {
    setCreateInvoiceModalVisible(false);
    setSelectedInvoiceRecord(null);
    setInvoiceNumber("");
    setUploadedInvoiceFile(null);
  };

  const handleSubmitInvoice = () => {
    if (!uploadedInvoiceFile) {
      message.warning("Please upload an invoice file");
      return;
    }
    if (!invoiceNumber.trim()) {
      message.warning("Please enter an invoice number");
      return;
    }

    const updated = receivables.map((r) =>
      r.id === selectedInvoiceRecord.id ? { ...r, invoiceStatus: "Sent" } : r
    );
    setReceivables(updated);
    message.success(`Invoice ${invoiceNumber} created and sent to ${selectedInvoiceRecord.customer}`);
    handleCloseInvoiceModal();
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
          <Descriptions.Item label="Month">
            {record.month} {record.year}
          </Descriptions.Item>
          <Descriptions.Item label="Days">{record.days}</Descriptions.Item>
          <Descriptions.Item label="Hours">{record.hours}</Descriptions.Item>
          <Descriptions.Item label="Amount">
            ₹ {record.amount.toLocaleString("en-IN")}
          </Descriptions.Item>
          <Descriptions.Item label="GST">
            ₹ {record.gst.toLocaleString("en-IN")}
          </Descriptions.Item>
          <Descriptions.Item label="Total Amount">
            <strong>₹ {record.totalAmount.toLocaleString("en-IN")}</strong>
          </Descriptions.Item>
          <Descriptions.Item label="Submitted On">{record.submittedOn}</Descriptions.Item>
          {record.approvedOn && (
            <Descriptions.Item label="Approved On">{record.approvedOn}</Descriptions.Item>
          )}
          {record.paidOn && (
            <Descriptions.Item label="Paid On">{record.paidOn}</Descriptions.Item>
          )}
          <Descriptions.Item label="Status">
            <Tag color={record.status === "Paid" ? "green" : "orange"}>
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
            ? {
                ...p,
                status: "Paid",
                approvedOn: new Date().toISOString().split("T")[0],
                paidOn: new Date().toISOString().split("T")[0],
              }
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

  // Action handlers for Invoice Reconciliation
  const handleViewReconciliationBreakup = (record) => {
    Modal.info({
      title: `Reconciliation Details - ${record.talentName}`,
      width: 700,
      content: (
        <Descriptions bordered column={1} size="small" style={{ marginTop: 16 }}>
          <Descriptions.Item label="Talent ID">{record.talentId}</Descriptions.Item>
          <Descriptions.Item label="Talent Name">{record.talentName}</Descriptions.Item>
          <Descriptions.Item label="Partner">{record.partner}</Descriptions.Item>
          <Descriptions.Item label="Customer">{record.customer}</Descriptions.Item>
          <Descriptions.Item label="Job ID">{record.jobId}</Descriptions.Item>
          <Descriptions.Item label="Record ID">{record.recordId}</Descriptions.Item>
          <Descriptions.Item label="Partner Invoice ID">
            {record.partnerInvoiceId}
          </Descriptions.Item>
          <Descriptions.Item label="Customer Invoice ID">
            {record.customerInvoiceId}
          </Descriptions.Item>
          <Descriptions.Item label="Month">
            {record.month} {record.year}
          </Descriptions.Item>
          <Descriptions.Item label="Receivable Status">
            <Tag
              color={
                record.receivableStatus === "Paid"
                  ? "green"
                  : record.receivableStatus === "Sent"
                  ? "blue"
                  : "orange"
              }
            >
              {record.receivableStatus}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Payable Status">
            <Tag
              color={
                record.payableStatus === "Paid"
                  ? "green"
                  : record.payableStatus === "Submitted"
                  ? "orange"
                  : "default"
              }
            >
              {record.payableStatus}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      ),
    });
  };

  const handleModifyFee = (record) => {
    setSelectedFeeRecord(record);
    // Set default percentages from the record (will come from Admin Settings in future)
    setClientFeePercentage(record.clientFeePercentage || 10);
    setPartnerFeePercentage(record.partnerFeePercentage || 5);
    setModifyFeeModalVisible(true);
  };

  const handleCloseModifyFeeModal = () => {
    setModifyFeeModalVisible(false);
    setSelectedFeeRecord(null);
    setClientFeePercentage(10);
    setPartnerFeePercentage(5);
  };

  const handleSubmitModifyFee = () => {
    if (clientFeePercentage < 0 || partnerFeePercentage < 0) {
      message.warning("Fee percentages cannot be negative");
      return;
    }

    // Update the reconciliation record with new fee percentages
    const updated = reconciliation.map((r) =>
      r.id === selectedFeeRecord.id
        ? { 
            ...r, 
            clientFeePercentage, 
            partnerFeePercentage,
            feeModifiedOn: new Date().toISOString().split("T")[0] 
          }
        : r
    );
    setReconciliation(updated);
    
    const clientAmount = selectedFeeRecord.baseCost * (1 + clientFeePercentage / 100);
    const partnerAmount = selectedFeeRecord.baseCost * (1 - partnerFeePercentage / 100);
    const revenue = clientAmount - partnerAmount;
    
    message.success(
      `Fee modified for ${selectedFeeRecord.talentName}: Client ${clientFeePercentage}%, Partner ${partnerFeePercentage}% | Revenue: ₹${revenue.toLocaleString("en-IN")}`
    );
    handleCloseModifyFeeModal();
  };

  const handleUpdateReceivable = (record) => {
    Modal.confirm({
      title: "Update Receivable Status",
      content: `Mark receivable as paid for ${record.talentName}?`,
      okText: "Update",
      okButtonProps: { style: { background: "#00d9a9", borderColor: "#00d9a9" } },
      onOk: () => {
        const updated = reconciliation.map((r) =>
          r.id === record.id ? { ...r, receivableStatus: "Paid" } : r
        );
        setReconciliation(updated);
        message.success(`Receivable status updated for ${record.talentName}`);
      },
    });
  };

  const handleUpdatePayable = (record) => {
    Modal.confirm({
      title: "Update Payable Status",
      content: `Mark payable as paid for ${record.talentName}?`,
      okText: "Update",
      okButtonProps: { style: { background: "#00d9a9", borderColor: "#00d9a9" } },
      onOk: () => {
        const updated = reconciliation.map((r) =>
          r.id === record.id ? { ...r, payableStatus: "Paid" } : r
        );
        setReconciliation(updated);
        message.success(`Payable status updated for ${record.talentName}`);
      },
    });
  };

  // Action handlers for Revenue Analysis
  const handleViewTransaction = (record) => {
    Modal.info({
      title: `Transaction Details - ${record.talentName}`,
      width: 700,
      content: (
        <Descriptions bordered column={1} size="small" style={{ marginTop: 16 }}>
          <Descriptions.Item label="Talent ID">{record.talentId}</Descriptions.Item>
          <Descriptions.Item label="Talent Name">{record.talentName}</Descriptions.Item>
          <Descriptions.Item label="Partner">{record.partner}</Descriptions.Item>
          <Descriptions.Item label="Customer">{record.customer}</Descriptions.Item>
          <Descriptions.Item label="Job ID">{record.jobId}</Descriptions.Item>
          <Descriptions.Item label="Month">
            {record.month} {record.year}
          </Descriptions.Item>
          <Descriptions.Item label="Talent Cost (Base)">
            ₹ {record.talentCost.toLocaleString("en-IN")}
          </Descriptions.Item>
          <Descriptions.Item label="Amount Receivable (10% markup)">
            ₹ {record.amountReceivable.toLocaleString("en-IN")}
          </Descriptions.Item>
          <Descriptions.Item label="GST IN (18%)">
            ₹ {record.gstIn.toLocaleString("en-IN")}
          </Descriptions.Item>
          <Descriptions.Item label="Total Receivable">
            <strong>
              ₹ {(record.amountReceivable + record.gstIn).toLocaleString("en-IN")}
            </strong>
          </Descriptions.Item>
          <Descriptions.Item label="Amount Payable (5% deduction)">
            ₹ {record.amountPayable.toLocaleString("en-IN")}
          </Descriptions.Item>
          <Descriptions.Item label="GST OUT (18%)">
            ₹ {record.gstOut.toLocaleString("en-IN")}
          </Descriptions.Item>
          <Descriptions.Item label="Total Payable">
            <strong>
              ₹ {(record.amountPayable + record.gstOut).toLocaleString("en-IN")}
            </strong>
          </Descriptions.Item>
          <Descriptions.Item label="Net Revenue">
            <strong style={{ color: "#52c41a", fontSize: "16px" }}>
              ₹ {record.revenue.toLocaleString("en-IN")}
            </strong>
          </Descriptions.Item>
          <Descriptions.Item label="Profit Margin">
            {((record.revenue / record.amountReceivable) * 100).toFixed(2)}%
          </Descriptions.Item>
        </Descriptions>
      ),
    });
  };

  const handleModifyRecord = (record) => {
    message.info(`Modify record for ${record.talentName} - Implementation pending`);
  };

  // Columns for Client Billing
  const receivableColumns = [
    {
      title: "Talent ID",
      dataIndex: "talentId",
      key: "talentId",
      width: 90,
    },
    {
      title: "Talent Name",
      dataIndex: "talentName",
      key: "talentName",
      width: 140,
      ellipsis: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 130,
      ellipsis: true,
    },
    {
      title: "Partner",
      dataIndex: "partner",
      key: "partner",
      width: 130,
      ellipsis: true,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      width: 130,
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
      width: 90,
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
                key: "uploadInvoice",
                label: "Upload Invoice",
                icon: <SendOutlined />,
                onClick: () => handleCreateInvoice(record),
                disabled:
                  record.invoiceStatus === "Sent" || record.invoiceStatus === "Paid",
              },
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
      width: 130,
      ellipsis: true,
    },
    {
      title: "Partner",
      dataIndex: "partner",
      key: "partner",
      width: 130,
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
      width: 90,
      render: (status) => (
        <Tag
          color={
            status === "Paid"
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

  // Columns for Invoice Reconciliation
  const reconciliationColumns = [
    {
      title: "Talent ID",
      dataIndex: "talentId",
      key: "talentId",
      width: 90,
    },
    {
      title: "Talent Name",
      dataIndex: "talentName",
      key: "talentName",
      width: 130,
      ellipsis: true,
    },
    {
      title: "Partner",
      dataIndex: "partner",
      key: "partner",
      width: 130,
      ellipsis: true,
    },
    {
      title: "Record ID",
      dataIndex: "recordId",
      key: "recordId",
      width: 110,
      ellipsis: true,
    },
    {
      title: "Partner Invoice ID",
      dataIndex: "partnerInvoiceId",
      key: "partnerInvoiceId",
      width: 130,
      ellipsis: true,
    },
    {
      title: "Job ID",
      dataIndex: "jobId",
      key: "jobId",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      width: 130,
      ellipsis: true,
    },
    {
      title: "Customer Invoice ID",
      dataIndex: "customerInvoiceId",
      key: "customerInvoiceId",
      width: 130,
      ellipsis: true,
    },
    {
      title: "Receivable",
      dataIndex: "receivableStatus",
      key: "receivableStatus",
      width: 100,
      render: (status) => (
        <Tag
          color={status === "Paid" ? "green" : status === "Sent" ? "blue" : "orange"}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Payable",
      dataIndex: "payableStatus",
      key: "payableStatus",
      width: 100,
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
                key: "viewBreakup",
                label: "View Breakup",
                icon: <EyeOutlined />,
                onClick: () => handleViewReconciliationBreakup(record),
              },
              {
                key: "modifyFee",
                label: "Modify Fee",
                icon: <EditOutlined />,
                onClick: () => handleModifyFee(record),
              },
              {
                key: "updateReceivable",
                label: "Update Receivable",
                icon: <SyncOutlined />,
                onClick: () => handleUpdateReceivable(record),
                disabled: record.receivableStatus === "Paid",
              },
              {
                key: "updatePayable",
                label: "Update Payable",
                icon: <SyncOutlined />,
                onClick: () => handleUpdatePayable(record),
                disabled: record.payableStatus === "Paid",
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

  // Columns for Revenue Analysis
  const revenueAnalysisColumns = [
    {
      title: "Talent ID",
      dataIndex: "talentId",
      key: "talentId",
      width: 90,
    },
    {
      title: "Talent Name",
      dataIndex: "talentName",
      key: "talentName",
      width: 130,
      ellipsis: true,
    },
    {
      title: "Partner",
      dataIndex: "partner",
      key: "partner",
      width: 130,
      ellipsis: true,
    },
    {
      title: "Job ID",
      dataIndex: "jobId",
      key: "jobId",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      width: 130,
      ellipsis: true,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      width: 110,
      ellipsis: true,
      render: (revenue) => (
        <span style={{ fontWeight: 700, color: "#52c41a" }}>
          ₹ {revenue.toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      title: "Receivable",
      dataIndex: "amountReceivable",
      key: "amountReceivable",
      width: 110,
      ellipsis: true,
      render: (amount) => `₹ ${amount.toLocaleString("en-IN")}`,
    },
    {
      title: "GST IN",
      dataIndex: "gstIn",
      key: "gstIn",
      width: 90,
      ellipsis: true,
      render: (gst) => `₹ ${gst.toLocaleString("en-IN")}`,
    },
    {
      title: "Payable",
      dataIndex: "amountPayable",
      key: "amountPayable",
      width: 110,
      ellipsis: true,
      render: (amount) => `₹ ${amount.toLocaleString("en-IN")}`,
    },
    {
      title: "GST OUT",
      dataIndex: "gstOut",
      key: "gstOut",
      width: 90,
      ellipsis: true,
      render: (gst) => `₹ ${gst.toLocaleString("en-IN")}`,
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
                key: "viewTransaction",
                label: "View Transaction",
                icon: <LineChartOutlined />,
                onClick: () => handleViewTransaction(record),
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
            <div className="metric-value">
              ₹ {(metrics.totalAmount / 100000).toFixed(2)}L
            </div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Current Receivable</div>
            <div className="metric-value">
              ₹ {(metrics.currentReceivable / 100000).toFixed(2)}L
            </div>
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
            <div className="metric-value">
              ₹ {(metrics.totalPaid / 100000).toFixed(2)}L
            </div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Current Payable</div>
            <div className="metric-value">
              ₹ {(metrics.currentPayable / 100000).toFixed(2)}L
            </div>
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

    if (activeTab === "Invoice Reconciliation") {
      const metrics = getReconciliationMetrics();
      return (
        <MetricsSection>
          <MetricCard>
            <div className="metric-label">Total Invoice Paid</div>
            <div className="metric-value">{metrics.totalInvoicePaid}</div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Total Bills Paid</div>
            <div className="metric-value">{metrics.totalBillsPaid}</div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Receivable Invoice Pending</div>
            <div className="metric-value" style={{ color: "#ff4d4f" }}>
              {metrics.receivablePending}
            </div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Payable Pending</div>
            <div className="metric-value" style={{ color: "#ff4d4f" }}>
              {metrics.payablePending}
            </div>
          </MetricCard>
        </MetricsSection>
      );
    }

    if (activeTab === "Revenue Analysis") {
      const metrics = getReconciliationMetrics();
      return (
        <MetricsSection>
          <MetricCard>
            <div className="metric-label">Total Invoice Paid</div>
            <div className="metric-value">{metrics.totalInvoicePaid}</div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Total Bills Paid</div>
            <div className="metric-value">{metrics.totalBillsPaid}</div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Receivable Invoice Pending</div>
            <div className="metric-value" style={{ color: "#ff4d4f" }}>
              {metrics.receivablePending}
            </div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Payable Pending</div>
            <div className="metric-value" style={{ color: "#ff4d4f" }}>
              {metrics.payablePending}
            </div>
          </MetricCard>
        </MetricsSection>
      );
    }

    if (activeTab === "Financial Insights") {
      const receivableMetrics = getReceivableMetrics();
      const payableMetrics = getPayableMetrics();
      const revenueMetrics = getRevenueMetrics();
      const netCashFlow =
        receivableMetrics.totalAmount - payableMetrics.totalPaid;

      return (
        <MetricsSection>
          <MetricCard>
            <div className="metric-label">Total Receivable</div>
            <div className="metric-value">
              ₹ {(receivableMetrics.totalAmount / 100000).toFixed(2)}L
            </div>
          </MetricCard>
          <MetricCard>
            <div className="metric-label">Total Payable</div>
            <div className="metric-value">
              ₹{" "}
              {(payableMetrics.totalPaid / 100000 +
                payableMetrics.currentPayable / 100000).toFixed(2)}
              L
            </div>
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
            <div className="metric-label">Total Net Revenue</div>
            <div className="metric-value" style={{ color: "#52c41a" }}>
              ₹ {(revenueMetrics.totalRevenue / 100000).toFixed(2)}L
            </div>
          </MetricCard>
        </MetricsSection>
      );
    }

    return null;
  };

  // Render filters based on active tab
  const renderFilters = () => {
    // Financial Insights has different filters
    if (activeTab === "Financial Insights") {
      return (
        <Flex align="start" justify="space-between" style={{ marginBottom: "20px" }}>
          <Flex gap="middle">
            <Select
              placeholder={
                <span>
                  <FilterOutlined style={{ marginRight: 8 }} />
                  Filter by Period
                </span>
              }
              value={filterPeriod || undefined}
              onChange={setFilterPeriod}
              allowClear
              style={{ width: 180 }}
            >
              <Option value="Monthly">Monthly</Option>
              <Option value="Quarterly">Quarterly</Option>
              <Option value="Yearly">Yearly</Option>
            </Select>
            <Select
              placeholder={
                <span>
                  <FilterOutlined style={{ marginRight: 8 }} />
                  Filter by Year
                </span>
              }
              value={filterYear || undefined}
              onChange={setFilterYear}
              allowClear
              style={{ width: 150 }}
            >
              <Option value="2024">2024</Option>
              <Option value="2023">2023</Option>
              <Option value="2022">2022</Option>
            </Select>
          </Flex>
        </Flex>
      );
    }

    return (
      <Flex align="start" justify="space-between" style={{ marginBottom: "20px" }}>
        <Flex gap="middle">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by name, ID, customer, or partner..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          {activeTab !== "Revenue Analysis" && (
            <Select
              placeholder={
                <span>
                  <FilterOutlined style={{ marginRight: 8 }} />
                  Filter by Partner
                </span>
              }
              value={filterPartner || undefined}
              onChange={setFilterPartner}
              allowClear
              style={{ width: 220 }}
            >
              <Option value="TechCorp Solutions">TechCorp Solutions</Option>
              <Option value="Digital Partners Inc">Digital Partners Inc</Option>
              <Option value="Innovate Tech">Innovate Tech</Option>
              <Option value="CodeCraft Ltd">CodeCraft Ltd</Option>
            </Select>
          )}
          {(activeTab === "Client Billing" ||
            activeTab === "Invoice Reconciliation" ||
            activeTab === "Revenue Analysis") && (
            <Select
              placeholder={
                <span>
                  <FilterOutlined style={{ marginRight: 8 }} />
                  Filter by Customer
                </span>
              }
              value={filterCustomer || undefined}
              onChange={setFilterCustomer}
              allowClear
              style={{ width: 220 }}
            >
              <Option value="Amazon Inc">Amazon Inc</Option>
              <Option value="Google LLC">Google LLC</Option>
              <Option value="Microsoft Corporation">Microsoft Corporation</Option>
              <Option value="Adobe Systems">Adobe Systems</Option>
            </Select>
          )}
          <Select
            placeholder={
              <span>
                <FilterOutlined style={{ marginRight: 8 }} />
                Filter by Month
              </span>
            }
            value={filterMonth || undefined}
            onChange={setFilterMonth}
            allowClear
            style={{ width: 200 }}
          >
            <Option value="January">January</Option>
            <Option value="February">February</Option>
            <Option value="November">November</Option>
            <Option value="December">December</Option>
          </Select>
          <Select
            placeholder={
              <span>
                <FilterOutlined style={{ marginRight: 8 }} />
                Filter by Year
              </span>
            }
            value={filterYear || undefined}
            onChange={setFilterYear}
            allowClear
            style={{ width: 150 }}
          >
            <Option value="2024">2024</Option>
            <Option value="2023">2023</Option>
            <Option value="2022">2022</Option>
          </Select>
          {activeTab !== "Revenue Analysis" && (
            <Select
              placeholder={
                <span>
                  <FilterOutlined style={{ marginRight: 8 }} />
                  Filter by Status
                </span>
              }
              value={filterStatus || undefined}
              onChange={setFilterStatus}
              allowClear
              style={{ width: 180 }}
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
                  <Option value="Paid">Paid</Option>
                  <Option value="Rejected">Rejected</Option>
                </>
              )}
              {activeTab === "Invoice Reconciliation" && (
                <>
                  <Option value="Pending">Pending</Option>
                  <Option value="Sent">Sent</Option>
                  <Option value="Submitted">Submitted</Option>
                  <Option value="Paid">Paid</Option>
                </>
              )}
            </Select>
          )}
        </Flex>
      </Flex>
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
              scroll={{ x: 1600 }}
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

    if (activeTab === "Invoice Reconciliation") {
      const data = getFilteredReconciliation();
      return (
        <TableContainer>
          {data.length > 0 ? (
            <Table
              columns={reconciliationColumns}
              dataSource={data}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Total ${total} records`,
              }}
              scroll={{ x: 1400 }}
            />
          ) : (
            <EmptyState>
              <Empty description="No reconciliation records found" />
            </EmptyState>
          )}
        </TableContainer>
      );
    }

    if (activeTab === "Revenue Analysis") {
      const data = getFilteredRevenueAnalysis();
      return (
        <TableContainer>
          {data.length > 0 ? (
            <Table
              columns={revenueAnalysisColumns}
              dataSource={data}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Total ${total} records`,
              }}
              scroll={{ x: 1300 }}
            />
          ) : (
            <EmptyState>
              <Empty description="No revenue records found" />
            </EmptyState>
          )}
        </TableContainer>
      );
    }

    if (activeTab === "Financial Insights") {
      const receivableMetrics = getReceivableMetrics();
      const payableMetrics = getPayableMetrics();
      const reconciliationMetrics = getReconciliationMetrics();
      const revenueMetrics = getRevenueMetrics();

      return (
        <InsightsGrid>
          <InsightCard>
            <h3>Top Customers by Revenue</h3>
            <div className="insight-content">
              <div className="insight-row">
                <span className="label">Google LLC</span>
                <span className="value">₹ 3.89L</span>
              </div>
              <div className="insight-row">
                <span className="label">Amazon Inc</span>
                <span className="label">₹ 3.54L</span>
              </div>
              <div className="insight-row">
                <span className="label">Microsoft Corporation</span>
                <span className="value">₹ 3.30L</span>
              </div>
              <div className="insight-row">
                <span className="label">Adobe Systems</span>
                <span className="value">₹ 2.83L</span>
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
              <div className="insight-row">
                <span className="label">CodeCraft Ltd</span>
                <span className="value">₹ 2.27L</span>
              </div>
            </div>
          </InsightCard>

          <InsightCard>
            <h3>Revenue vs Costs</h3>
            <div className="insight-content">
              <div className="insight-row">
                <span className="label">Total Revenue Generated</span>
                <span className="value" style={{ color: "#52c41a" }}>
                  ₹ {(revenueMetrics.totalRevenue / 100000).toFixed(2)}L
                </span>
              </div>
              <div className="insight-row">
                <span className="label">Total Receivables</span>
                <span className="value">
                  ₹ {(revenueMetrics.totalReceivable / 100000).toFixed(2)}L
                </span>
              </div>
              <div className="insight-row">
                <span className="label">Total Payables</span>
                <span className="value">
                  ₹ {(revenueMetrics.totalPayable / 100000).toFixed(2)}L
                </span>
              </div>
              <div className="insight-row">
                <span className="label">Profit Margin</span>
                <span className="value" style={{ color: "#52c41a" }}>
                  {(
                    (revenueMetrics.totalRevenue /
                      revenueMetrics.totalReceivable) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </div>
            </div>
          </InsightCard>

          <InsightCard>
            <h3>Payment Status Summary</h3>
            <div className="insight-content">
              <div className="insight-row">
                <span className="label">Invoices Fully Paid</span>
                <span className="value" style={{ color: "#52c41a" }}>
                  {reconciliationMetrics.totalInvoicePaid}
                </span>
              </div>
              <div className="insight-row">
                <span className="label">Bills Fully Paid</span>
                <span className="value" style={{ color: "#52c41a" }}>
                  {reconciliationMetrics.totalBillsPaid}
                </span>
              </div>
              <div className="insight-row">
                <span className="label">Pending Receivables</span>
                <span className="value" style={{ color: "#ff4d4f" }}>
                  {reconciliationMetrics.receivablePending}
                </span>
              </div>
              <div className="insight-row">
                <span className="label">Pending Payables</span>
                <span className="value" style={{ color: "#ff4d4f" }}>
                  {reconciliationMetrics.payablePending}
                </span>
              </div>
            </div>
          </InsightCard>

          <InsightCard>
            <h3>GST Analysis</h3>
            <div className="insight-content">
              <div className="insight-row">
                <span className="label">Total GST IN (Collected)</span>
                <span className="value">
                  ₹ {(revenueMetrics.totalGSTIn / 100000).toFixed(2)}L
                </span>
              </div>
              <div className="insight-row">
                <span className="label">Total GST OUT (Paid)</span>
                <span className="value">
                  ₹ {(revenueMetrics.totalGSTOut / 100000).toFixed(2)}L
                </span>
              </div>
              <div className="insight-row">
                <span className="label">Net GST Liability</span>
                <span
                  className="value"
                  style={{
                    color:
                      revenueMetrics.totalGSTIn - revenueMetrics.totalGSTOut > 0
                        ? "#ff4d4f"
                        : "#52c41a",
                  }}
                >
                  ₹{" "}
                  {(
                    (revenueMetrics.totalGSTIn - revenueMetrics.totalGSTOut) /
                    100000
                  ).toFixed(2)}
                  L
                </span>
              </div>
              <div className="insight-row">
                <span className="label">GST Recovery Rate</span>
                <span className="value">
                  {(
                    (revenueMetrics.totalGSTOut / revenueMetrics.totalGSTIn) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </div>
            </div>
          </InsightCard>

          <InsightCard>
            <h3>Monthly Performance</h3>
            <div className="insight-content">
              <div className="insight-row">
                <span className="label">November 2024</span>
                <span className="value">₹ 1.65L</span>
              </div>
              <div className="insight-row">
                <span className="label">December 2024</span>
                <span className="value">₹ 5.14L</span>
              </div>
              <div className="insight-row">
                <span className="label">Growth (MoM)</span>
                <span className="value" style={{ color: "#52c41a" }}>
                  +211.5%
                </span>
              </div>
              <div className="insight-row">
                <span className="label">Average per Talent</span>
                <span className="value">₹ 1.70L</span>
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
        <p>Manage billing, payments, reconciliation, and financial operations</p>
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
          className={`tab-button ${
            activeTab === "Partner Payables" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Partner Payables")}
        >
          Partner Payables
        </Button>
        <Button
          className={`tab-button ${
            activeTab === "Invoice Reconciliation" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Invoice Reconciliation")}
        >
          Invoice Reconciliation
        </Button>
        <Button
          className={`tab-button ${
            activeTab === "Revenue Analysis" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Revenue Analysis")}
        >
          Revenue Analysis
        </Button>
        <Button
          className={`tab-button ${
            activeTab === "Financial Insights" ? "active" : ""
          }`}
          onClick={() => setActiveTab("Financial Insights")}
        >
          Financial Insights
        </Button>
      </TabsContainer>

      {renderFilters()}

      {renderTable()}

      {/* Create Invoice Modal */}
      <Modal
        title={`Create Invoice - ${selectedInvoiceRecord?.talentName || ''}`}
        open={createInvoiceModalVisible}
        onOk={handleSubmitInvoice}
        onCancel={handleCloseInvoiceModal}
        width={700}
        okText="Create & Send Invoice"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
      >
        {selectedInvoiceRecord && (
          <div style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: 8 }}>
            {/* Talent Details */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 8, color: "#014c75", fontWeight: 500 }}>
                Talent Details
              </label>
              <div style={{ padding: "12px 16px", background: "#f8f9fd", borderRadius: 6 }}>
                <div><strong>Talent ID:</strong> {selectedInvoiceRecord.talentId}</div>
                <div><strong>Role:</strong> {selectedInvoiceRecord.role}</div>
                <div><strong>Partner:</strong> {selectedInvoiceRecord.partner}</div>
                <div><strong>Customer:</strong> {selectedInvoiceRecord.customer}</div>
                <div><strong>Month:</strong> {selectedInvoiceRecord.month} {selectedInvoiceRecord.year}</div>
                <div><strong>Working Days:</strong> {selectedInvoiceRecord.workingDays} days</div>
                <div><strong>Billable Hours:</strong> {selectedInvoiceRecord.billableHours} hours</div>
              </div>
            </div>

            {/* Invoice Number */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 8, color: "#014c75", fontWeight: 500 }}>
                Invoice Number <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                placeholder="Enter invoice number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>

            {/* Amount Breakup */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 8, color: "#014c75", fontWeight: 500 }}>
                Amount Breakup
              </label>
              <div style={{ padding: 16, background: "#fff5e6", borderRadius: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span>Base Amount ({selectedInvoiceRecord.workingDays} days):</span>
                  <strong>₹ {selectedInvoiceRecord.amount.toLocaleString("en-IN")}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span>GST (18%):</span>
                  <strong>₹ {selectedInvoiceRecord.gst.toLocaleString("en-IN")}</strong>
                </div>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  paddingTop: 8, 
                  borderTop: "2px solid #014c75",
                  marginTop: 8 
                }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#014c75" }}>Total Amount:</span>
                  <strong style={{ fontSize: 16, color: "#00d9a9" }}>
                    ₹ {selectedInvoiceRecord.totalAmount.toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>
            </div>

            {/* Invoice Upload */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 8, color: "#014c75", fontWeight: 500 }}>
                Upload Invoice <span style={{ color: "red" }}>*</span>
              </label>
              <Dragger
                name="file"
                multiple={false}
                accept=".pdf,.doc,.docx"
                beforeUpload={(file) => {
                  const isPDF = file.type === "application/pdf" ||
                               file.type === "application/msword" ||
                               file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                  if (!isPDF) {
                    message.error("You can only upload PDF or Word documents!");
                    return Upload.LIST_IGNORE;
                  }
                  setUploadedInvoiceFile(file);
                  return false;
                }}
                onRemove={() => {
                  setUploadedInvoiceFile(null);
                }}
                fileList={uploadedInvoiceFile ? [uploadedInvoiceFile] : []}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: "#00d9a9" }} />
                </p>
                <p className="ant-upload-text">Click or drag invoice file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for PDF, DOC, or DOCX files. Upload the signed invoice document.
                </p>
              </Dragger>
            </div>
          </div>
        )}
      </Modal>

      {/* Modify Fee Modal */}
      <Modal
        title={`Modify Fee - ${selectedFeeRecord?.talentName || ''}`}
        open={modifyFeeModalVisible}
        onOk={handleSubmitModifyFee}
        onCancel={handleCloseModifyFeeModal}
        width={600}
        okText="Update Fee"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
      >
        {selectedFeeRecord && (() => {
          const baseCost = selectedFeeRecord.baseCost || 0;
          const clientAmount = baseCost * (1 + clientFeePercentage / 100);
          const partnerAmount = baseCost * (1 - partnerFeePercentage / 100);
          const revenue = clientAmount - partnerAmount;
          
          return (
            <div style={{ paddingRight: 8 }}>
              {/* Talent Details */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", marginBottom: 8, color: "#014c75", fontWeight: 500 }}>
                  Reconciliation Details
                </label>
                <div style={{ padding: "12px 16px", background: "#f8f9fd", borderRadius: 6 }}>
                  <div><strong>Talent ID:</strong> {selectedFeeRecord.talentId}</div>
                  <div><strong>Talent Name:</strong> {selectedFeeRecord.talentName}</div>
                  <div><strong>Partner:</strong> {selectedFeeRecord.partner}</div>
                  <div><strong>Customer:</strong> {selectedFeeRecord.customer}</div>
                  <div><strong>Job ID:</strong> {selectedFeeRecord.jobId}</div>
                  <div><strong>Month:</strong> {selectedFeeRecord.month} {selectedFeeRecord.year}</div>
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #d9d9d9" }}>
                    <strong>Talent Base Cost:</strong> ₹ {baseCost.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              {/* Fee Percentages */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", marginBottom: 8, color: "#014c75", fontWeight: 500 }}>
                  Fee Configuration
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, fontSize: 13 }}>
                      Client Fee (% Markup) <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputNumber
                      value={clientFeePercentage}
                      onChange={(value) => setClientFeePercentage(Number(value) || 0)}
                      min={0}
                      max={100}
                      style={{ width: "100%" }}
                      formatter={(value) => `${value}%`}
                      parser={(value) => Number(value.replace('%', ''))}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, fontSize: 13 }}>
                      Partner Fee (% Deduction) <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputNumber
                      value={partnerFeePercentage}
                      onChange={(value) => setPartnerFeePercentage(Number(value) || 0)}
                      min={0}
                      max={100}
                      style={{ width: "100%" }}
                      formatter={(value) => `${value}%`}
                      parser={(value) => Number(value.replace('%', ''))}
                    />
                  </div>
                </div>
              </div>

              {/* Calculated Amounts */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", marginBottom: 8, color: "#014c75", fontWeight: 500 }}>
                  Auto-Calculated Amounts
                </label>
                <div style={{ padding: 16, background: "#e6f7ff", borderRadius: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span>Client Amount (Base + {clientFeePercentage}%):</span>
                    <strong style={{ color: "#014c75" }}>₹ {clientAmount.toLocaleString("en-IN")}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span>Partner Amount (Base - {partnerFeePercentage}%):</span>
                    <strong style={{ color: "#014c75" }}>₹ {partnerAmount.toLocaleString("en-IN")}</strong>
                  </div>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    paddingTop: 8, 
                    borderTop: "2px solid #014c75",
                    marginTop: 8 
                  }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#014c75" }}>Revenue:</span>
                    <strong style={{ fontSize: 16, color: "#00d9a9" }}>
                      ₹ {revenue.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div style={{ padding: 12, background: "#fff5e6", borderRadius: 6, fontSize: 13 }}>
                <strong>Note:</strong> Fee percentages will be auto-populated from Admin Settings in the future. Client Fee is added to base cost (markup), Partner Fee is deducted from base cost.
              </div>
            </div>
          );
        })()}
      </Modal>
    </FinanceContainer>
  );
};

export default Finance;
