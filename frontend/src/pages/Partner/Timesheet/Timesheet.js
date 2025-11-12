import React, { useState, useEffect } from "react";
import { Table, Dropdown, Button, Empty, Input, Select, Modal, message, Flex, Tag, Tooltip } from "antd";
import {
  MoreOutlined,
  SearchOutlined,
  UploadOutlined,
  CloudUploadOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  TimesheetContainer,
  PageHeader,
  TabsContainer,
  TableContainer,
  EmptyState,
  MetricsContainer,
  MetricCard,
} from "./Timesheet.style";
import TimesheetDetailsModal from "../../Dashboard/Timesheet/TimesheetDetailsModal";

const { Option } = Select;

const PartnerTimesheet = () => {
  const [activeTab, setActiveTab] = useState("Pending Upload");
  const [searchText, setSearchText] = useState("");
  const [filterYear, setFilterYear] = useState("2024");
  const [filterMonth, setFilterMonth] = useState(null);
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

  const initialTimesheets = [
    {
      id: 1,
      talentName: "Rajesh Kumar",
      role: "Senior Full Stack Developer",
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
      clientName: "Google LLC",
      onboardingDate: "2023-08-20",
      monthlyRate: 165000,
      month: "December",
      year: "2024",
      actualWorkingDays: 22,
      leaveTaken: { count: 2, dates: [5, 12] },
      paidLeave: 1,
      workingDays: 21,
      billableHours: 21 * 8,
      calculatedAmount: 157500,
      status: "submitted",
      submittedDate: "2024-12-20",
    },
    {
      id: 3,
      talentName: "Amit Patel",
      role: "Backend Developer",
      clientName: "Microsoft Corporation",
      onboardingDate: "2024-03-10",
      monthlyRate: 180000,
      month: "November",
      year: "2024",
      actualWorkingDays: 22,
      leaveTaken: { count: 1, dates: [15] },
      paidLeave: 1,
      workingDays: 22,
      billableHours: 22 * 8,
      calculatedAmount: 180000,
      status: "approved",
      approvedDate: "2024-12-01",
    },
  ];

  useEffect(() => {
    setTimesheets(initialTimesheets);
  }, []);

  const getFilteredData = () => {
    let filtered = [...timesheets];

    // Filter by tab
    if (activeTab === "Pending Upload") {
      filtered = filtered.filter(t => t.status === "pending" || t.status === "submitted");
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
    const approved = timesheets.filter(t => t.status === "approved").length;
    const totalAmount = currentData.reduce((sum, t) => sum + t.calculatedAmount, 0);

    return { pending, approved, totalAmount };
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
    
    setUploadModalVisible(false);
    setSelectedTalent(null);
  };

  const handleDownload = (record) => {
    message.info(`Downloading timesheet for ${record.talentName}...`);
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

  const columns = [
    {
      title: "Talent Name",
      dataIndex: "talentName",
      key: "talentName",
      width: 160,
      ellipsis: true,
      render: (name) => <span className="talent-name">{name}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      width: 150,
      render: (text, record) => {
        const workingDays = record.actualWorkingDays || getWorkingDaysForMonth(`${record.month} ${record.year}`);
        return `${text} ${record.year} (${workingDays} days)`;
      },
    },
    {
      title: "Leave Taken",
      dataIndex: "leaveTaken",
      key: "leaveTaken",
      width: 100,
      render: (leaveTaken) => (
        leaveTaken && leaveTaken.count > 0 ? (
          <Tooltip title={`Dates: ${leaveTaken.dates.join(', ')}`}>
            <span style={{ cursor: 'pointer' }}>{leaveTaken.count}</span>
          </Tooltip>
        ) : (
          <span>0</span>
        )
      ),
    },
    {
      title: "Working Days",
      dataIndex: "workingDays",
      key: "workingDays",
      width: 110,
    },
    {
      title: "Billable Hours",
      dataIndex: "billableHours",
      key: "billableHours",
      width: 110,
    },
    {
      title: "Amount",
      dataIndex: "calculatedAmount",
      key: "calculatedAmount",
      width: 120,
      render: (amount) => (
        <span style={{ fontWeight: 600, color: "#014c75" }}>
          ₹ {amount.toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => {
        const statusColors = {
          pending: "orange",
          submitted: "blue",
          approved: "green",
        };
        const statusLabels = {
          pending: "Pending",
          submitted: "Submitted",
          approved: "Approved",
        };
        return <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      fixed: /** @type {'right'} */ ('right'),
      render: (_, record) => {
        const items = [];

        // Upload action - only for pending status
        if (record.status === "pending") {
          items.push({
            key: "upload",
            label: "Upload",
            icon: <UploadOutlined />,
            onClick: () => handleUploadClick(record),
          });
        }

        // Modify action - only for submitted status
        if (record.status === "submitted") {
          items.push({
            key: "modify",
            label: "Modify",
            icon: <EditOutlined />,
            onClick: () => handleModify(record),
          });
        }

        // View action - for all statuses
        items.push({
          key: "view",
          label: "View",
          icon: <EyeOutlined />,
          onClick: () => handleView(record),
        });

        // Download action - for submitted and approved
        if (record.status === "submitted" || record.status === "approved") {
          items.push({
            key: "download",
            label: "Download",
            icon: <DownloadOutlined />,
            onClick: () => handleDownload(record),
          });
        }

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
    <TimesheetContainer>
      <PageHeader>
        <h1>Timesheet Management</h1>
        <p>Upload and manage timesheets for your talents</p>
      </PageHeader>

      <MetricsContainer>
        <MetricCard>
          <div className="metric-header">
            <span className="metric-label">Pending Upload</span>
            <div className="metric-icon warning">
              <CloudUploadOutlined />
            </div>
          </div>
          <div className="metric-value">{metrics.pending}</div>
          <div className="metric-subtext">Timesheets</div>
        </MetricCard>

        <MetricCard>
          <div className="metric-header">
            <span className="metric-label">Approved</span>
            <div className="metric-icon success">
              <CheckCircleOutlined />
            </div>
          </div>
          <div className="metric-value">{metrics.approved}</div>
          <div className="metric-subtext">Timesheets</div>
        </MetricCard>

        <MetricCard>
          <div className="metric-header">
            <span className="metric-label">Total Amount</span>
            <div className="metric-icon primary">
              <DollarOutlined />
            </div>
          </div>
          <div className="metric-value">₹ {(metrics.totalAmount / 100000).toFixed(2)}L</div>
          <div className="metric-subtext">Current View</div>
        </MetricCard>
      </MetricsContainer>

      <TabsContainer>
        <Button
          className={`tab-button ${activeTab === "Pending Upload" ? "active" : ""}`}
          icon={<CloudUploadOutlined />}
          onClick={() => setActiveTab("Pending Upload")}
        >
          Pending Upload
        </Button>
        <Button
          className={`tab-button ${activeTab === "Approved" ? "active" : ""}`}
          icon={<FileDoneOutlined />}
          onClick={() => setActiveTab("Approved")}
        >
          Approved
        </Button>
      </TabsContainer>

      <Flex align="start" justify="space-between" style={{ marginBottom: "20px" }}>
        <Flex gap="middle">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by name or role"
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
            style={{ width: 200 }}
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
                Filter by Year
              </span>
            }
            value={filterYear || undefined}
            onChange={setFilterYear}
            style={{ width: 150 }}
            allowClear
          >
            <Option value="2024">2024</Option>
            <Option value="2023">2023</Option>
            <Option value="2022">2022</Option>
          </Select>
        </Flex>
      </Flex>

      <TableContainer>
        {currentData.length > 0 ? (
          <Table
            columns={columns}
            dataSource={currentData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Total ${total} records`,
            }}
            scroll={{ x: 1400 }}
          />
        ) : (
          <EmptyState>
            <Empty description="No timesheets found" />
          </EmptyState>
        )}
      </TableContainer>

      {uploadModalVisible && selectedTalent && (
        <TimesheetDetailsModal
          visible={uploadModalVisible}
          onClose={() => {
            setUploadModalVisible(false);
            setSelectedTalent(null);
          }}
          timesheet={selectedTalent}
          mode={modalMode}
          onSubmit={handleUploadSubmit}
        />
      )}
    </TimesheetContainer>
  );
};

export default PartnerTimesheet;
