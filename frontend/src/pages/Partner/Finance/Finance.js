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
  Flex,
  Upload,
} from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  EyeOutlined,
  DownloadOutlined,
  FilterOutlined,
  UploadOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import {
  FinanceContainer,
  PageHeader,
  MetricsSection,
  MetricCard,
  TableContainer,
  EmptyState,
} from "./Finance.style";

const { Dragger } = Upload;

const { Option } = Select;

const PartnerFinance = () => {
  const [searchText, setSearchText] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [createInvoiceModalVisible, setCreateInvoiceModalVisible] = useState(false);
  const [selectedInvoiceRecord, setSelectedInvoiceRecord] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [uploadedInvoiceFile, setUploadedInvoiceFile] = useState(null);

  // Mock data for Partner's Client Billing (no customer column)
  const [receivables, setReceivables] = useState([
    {
      id: 1,
      talentId: "T001",
      talentName: "Rahul Kumar",
      role: "Full Stack Developer",
      month: "December",
      year: "2024",
      workingDays: 22,
      billableHours: 176,
      amount: 150000,
      gst: 27000,
      totalAmount: 177000,
      timesheetStatus: "Approved",
      invoiceStatus: "Pending",
    },
    {
      id: 2,
      talentId: "T002",
      talentName: "Priya Sharma",
      role: "React Native Developer",
      month: "December",
      year: "2024",
      workingDays: 20,
      billableHours: 160,
      amount: 165000,
      gst: 29700,
      totalAmount: 194700,
      timesheetStatus: "Approved",
      invoiceStatus: "Sent",
    },
    {
      id: 3,
      talentId: "T003",
      talentName: "Amit Patel",
      role: "Backend Developer",
      month: "November",
      year: "2024",
      workingDays: 22,
      billableHours: 176,
      amount: 140000,
      gst: 25200,
      totalAmount: 165200,
      timesheetStatus: "Approved",
      invoiceStatus: "Paid",
    },
    {
      id: 4,
      talentId: "T004",
      talentName: "Sneha Reddy",
      role: "UI/UX Designer",
      month: "December",
      year: "2024",
      workingDays: 21,
      billableHours: 168,
      amount: 120000,
      gst: 21600,
      totalAmount: 141600,
      timesheetStatus: "Approved",
      invoiceStatus: "Pending",
    },
  ]);

  const getFilteredReceivables = () => {
    let filtered = [...receivables];

    if (searchText) {
      filtered = filtered.filter(
        (r) =>
          r.talentName.toLowerCase().includes(searchText.toLowerCase()) ||
          r.talentId.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterMonth) filtered = filtered.filter((r) => r.month === filterMonth);
    if (filterYear) filtered = filtered.filter((r) => r.year === filterYear);
    if (filterStatus) filtered = filtered.filter((r) => r.invoiceStatus === filterStatus);

    return filtered;
  };

  const getMetrics = () => {
    const totalAmount = receivables.reduce((sum, r) => sum + r.amount, 0);
    const pending = receivables.filter((r) => r.invoiceStatus === "Pending").reduce((sum, r) => sum + r.totalAmount, 0);
    const overdue = receivables.filter((r) => r.invoiceStatus === "Overdue").reduce((sum, r) => sum + r.totalAmount, 0);
    const totalInvoices = receivables.length;

    return { totalAmount, pending, overdue, totalInvoices };
  };

  const metrics = getMetrics();

  const handleViewBreakup = (record) => {
    Modal.info({
      title: `Invoice Breakup - ${record.talentName}`,
      width: 600,
      okButtonProps: { style: { background: "#00d9a9", borderColor: "#00d9a9" } },
      content: (
        <div style={{ marginTop: 16 }}>
          <div style={{ padding: "12px 16px", background: "#f8f9fd", borderRadius: 6, marginBottom: 16 }}>
            <div><strong>Talent ID:</strong> {record.talentId}</div>
            <div><strong>Talent Name:</strong> {record.talentName}</div>
            <div><strong>Role:</strong> {record.role}</div>
            <div><strong>Month:</strong> {record.month} {record.year}</div>
          </div>
          <div style={{ padding: 16, background: "#fff", borderRadius: 6, border: "1px solid #e8e8e8" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span>Working Days:</span>
              <strong>{record.workingDays} days</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span>Billable Hours:</span>
              <strong>{record.billableHours} hrs</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, paddingTop: 8, borderTop: "1px solid #f0f0f0" }}>
              <span>Base Amount:</span>
              <strong>₹ {record.amount.toLocaleString("en-IN")}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span>GST (18%):</span>
              <strong>₹ {record.gst.toLocaleString("en-IN")}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "2px solid #014c75" }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: "#014c75" }}>Total Amount:</span>
              <strong style={{ fontSize: 18, color: "#00d9a9" }}>₹ {record.totalAmount.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>
      ),
    });
  };

  const handleDownloadTimesheet = (record) => {
    message.info(`Downloading timesheet for ${record.talentName}...`);
  };

  const handleCreateInvoice = (record) => {
    setSelectedInvoiceRecord(record);
    setCreateInvoiceModalVisible(true);
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
    
    message.success(`Invoice ${invoiceNumber} created and sent successfully`);
    handleCloseInvoiceModal();
  };

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
      fixed: /** @type {'right'} */ ('right'),
      render: (_, record) => {
        const items = [];

        if (record.invoiceStatus === "Pending") {
          items.push({
            key: "uploadInvoice",
            label: "Upload Invoice",
            icon: <UploadOutlined />,
            onClick: () => handleCreateInvoice(record),
          });
        }

        items.push(
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
          }
        );

        return (
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
          >
            <MoreOutlined style={{ cursor: "pointer", fontSize: "18px" }} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <FinanceContainer>
      <PageHeader>
        <h1>Finance - Client Billing</h1>
        <p>View billing records and invoices for your talents</p>
      </PageHeader>

      <MetricsSection>
        <MetricCard>
          <div className="metric-label">Total Amount</div>
          <div className="metric-value">
            ₹ {(metrics.totalAmount / 100000).toFixed(2)}L
          </div>
        </MetricCard>
        <MetricCard>
          <div className="metric-label">Current Receivable</div>
          <div className="metric-value" style={{ color: "#ffa500" }}>
            ₹ {(metrics.pending / 100000).toFixed(2)}L
          </div>
        </MetricCard>
        <MetricCard>
          <div className="metric-label">Overdue Amount</div>
          <div className="metric-value" style={{ color: "#ff4d4f" }}>
            ₹ {(metrics.overdue / 100000).toFixed(2)}L
          </div>
        </MetricCard>
        <MetricCard>
          <div className="metric-label">Total Invoices</div>
          <div className="metric-value">{metrics.totalInvoices}</div>
        </MetricCard>
      </MetricsSection>

      <Flex align="start" justify="space-between" style={{ marginBottom: "20px" }}>
        <Flex gap="middle">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by name or ID..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
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
            <Option value="Pending">Pending</Option>
            <Option value="Sent">Sent</Option>
            <Option value="Paid">Paid</Option>
            <Option value="Overdue">Overdue</Option>
          </Select>
        </Flex>
      </Flex>

      <TableContainer>
        {getFilteredReceivables().length > 0 ? (
          <Table
            columns={receivableColumns}
            dataSource={getFilteredReceivables()}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total ${total} records`,
            }}
            scroll={{ x: 1400 }}
          />
        ) : (
          <EmptyState>
            <Empty description="No billing records found" />
          </EmptyState>
        )}
      </TableContainer>

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
                <div><strong>Talent Name:</strong> {selectedInvoiceRecord.talentName}</div>
                <div><strong>Role:</strong> {selectedInvoiceRecord.role}</div>
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
                  <span style={{ fontSize: 16, fontWeight: 600, color: "#014c75" }}>Total Amount:</span>
                  <strong style={{ fontSize: 18, color: "#00d9a9" }}>
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
    </FinanceContainer>
  );
};

export default PartnerFinance;
