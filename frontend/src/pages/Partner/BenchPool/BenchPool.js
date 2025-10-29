import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  Select,
  Avatar,
  Typography,
  Flex,
  Upload,
  Row,
  Col,
  Dropdown,
  Card,
  Tag,
  Space,
  message,
} from "antd";
import {
  UploadOutlined,
  SearchOutlined,
  MoreOutlined,
  FileTextOutlined,
  TeamOutlined,
  FileDoneOutlined,
  TrophyOutlined,
  DownloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { BenchPoolWrapper } from "./BenchPool.style";
import axios from "axios";
import { API_CONST } from "../../../const";

const { Text } = Typography;
const { Option } = Select;

// Dummy data for Bench Pool resources
const dummyBenchData = [
  {
    key: "1",
    name: "Rajesh Kumar",
    role: "Senior React Developer",
    topSkill: "React.js (Expert)",
    monthlyRate: "₹1,80,000",
    experience: "5 years 3 months",
    location: "Bangalore",
    jobsApplied: 12,
    pastHired: 8,
    totalBilled: "₹14,40,000",
    status: "Active",
    resume: "rajesh_resume.pdf",
  },
  {
    key: "2",
    name: "Priya Sharma",
    role: "Full Stack Developer",
    topSkill: "Node.js (Advanced)",
    monthlyRate: "₹1,50,000",
    experience: "4 years 6 months",
    location: "Mumbai",
    jobsApplied: 8,
    pastHired: 5,
    totalBilled: "₹7,50,000",
    status: "Active",
    resume: "priya_resume.pdf",
  },
  {
    key: "3",
    name: "Amit Patel",
    role: "Python Developer",
    topSkill: "Python (Expert)",
    monthlyRate: "₹1,60,000",
    experience: "6 years 1 month",
    location: "Pune",
    jobsApplied: 15,
    pastHired: 10,
    totalBilled: "₹16,00,000",
    status: "Active",
    resume: "amit_resume.pdf",
  },
  {
    key: "4",
    name: "Sneha Reddy",
    role: "DevOps Engineer",
    topSkill: "AWS (Advanced)",
    monthlyRate: "₹1,70,000",
    experience: "5 years 8 months",
    location: "Hyderabad",
    jobsApplied: 10,
    pastHired: 7,
    totalBilled: "₹11,90,000",
    status: "Inactive",
    resume: "sneha_resume.pdf",
  },
  {
    key: "5",
    name: "Vikram Singh",
    role: "UI/UX Designer",
    topSkill: "Figma (Expert)",
    monthlyRate: "₹1,20,000",
    experience: "3 years 4 months",
    location: "Delhi",
    jobsApplied: 6,
    pastHired: 3,
    totalBilled: "₹3,60,000",
    status: "Inactive",
    resume: "vikram_resume.pdf",
  },
];

const BenchPool = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [benchData, setBenchData] = useState(dummyBenchData);
  const [form] = Form.useForm();
  const [resume, setResume] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [pan, setPan] = useState(null);
  const [degree, setDegree] = useState(null);

  // Filter data based on active tab and search
  const filteredData = benchData.filter((resource) => {
    const matchesTab = resource.status === activeTab;
    const matchesSearch = 
      resource.name.toLowerCase().includes(searchText.toLowerCase()) ||
      resource.role.toLowerCase().includes(searchText.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Calculate metrics
  const activeResources = benchData.filter((r) => r.status === "Active").length;
  const totalJobsApplied = benchData.reduce((sum, r) => sum + r.jobsApplied, 0);
  const totalTalentsHired = benchData.reduce((sum, r) => sum + r.pastHired, 0);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setResume(null);
    setAadhar(null);
    setPan(null);
    setDegree(null);
  };

  const handleSubmit = async (values) => {
    const data = new FormData();
    if (resume) data.append("resume", resume);
    if (aadhar) data.append("Aadhar", aadhar);
    if (pan) data.append("pan", pan);
    if (degree) data.append("degree", degree);
    if (values) data.append("data", JSON.stringify(values));

    try {
      const response = await axios.post(API_CONST.ADD_TALENT_PROFILE, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Resource added successfully!");
      console.log(response.data);
      message.success("Resource added successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to add resource. Please try again.");
    }

    handleCloseModal();
  };

  const handleStatusChange = (status) => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select resources to change status");
      return;
    }

    const updatedData = benchData.map((item) => {
      if (selectedRowKeys.includes(item.key)) {
        return { ...item, status };
      }
      return item;
    });

    setBenchData(updatedData);
    setSelectedRowKeys([]);
    message.success(`Status changed to ${status} for selected resources`);
  };

  const actionMenu = (record) => ({
    items: [
      {
        key: "1",
        label: "View Details",
        icon: <FileTextOutlined />,
      },
      {
        key: "2",
        label: "Download Resume",
        icon: <DownloadOutlined />,
      },
      {
        key: "3",
        label: record.status === "Active" ? "Mark Inactive" : "Mark Active",
        onClick: () => {
          const updatedData = benchData.map((item) => {
            if (item.key === record.key) {
              return {
                ...item,
                status: item.status === "Active" ? "Inactive" : "Active",
              };
            }
            return item;
          });
          setBenchData(updatedData);
          message.success(`Status changed to ${record.status === "Active" ? "Inactive" : "Active"}`);
        },
      },
      {
        key: "4",
        label: "Edit",
      },
      {
        key: "5",
        label: "Delete",
        danger: true,
      },
    ],
  });

  const columns = [
    {
      title: "Resume",
      dataIndex: "resume",
      key: "resume",
      width: 90,
      align: "center",
      render: (resume) => (
        <FileTextOutlined
          style={{ fontSize: "22px", color: "#014c75", cursor: "pointer" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 160,
      render: (name) => <Text strong>{name}</Text>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 180,
    },
    {
      title: "Top Skill",
      dataIndex: "topSkill",
      key: "topSkill",
      width: 160,
      render: (skill) => (
        <Tag color="blue" style={{ fontSize: "13px" }}>
          {skill}
        </Tag>
      ),
    },
    {
      title: "Monthly Rate",
      dataIndex: "monthlyRate",
      key: "monthlyRate",
      width: 130,
      render: (rate) => (
        <Text strong style={{ color: "#00d9a9", fontSize: "14px" }}>
          {rate}
        </Text>
      ),
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      width: 140,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 120,
    },
    {
      title: "Jobs Applied",
      dataIndex: "jobsApplied",
      key: "jobsApplied",
      width: 120,
      align: "center",
      render: (count) => (
        <Tag color="cyan" style={{ fontSize: "13px", fontWeight: "600" }}>
          {count}
        </Tag>
      ),
    },
    {
      title: "Past Hired",
      dataIndex: "pastHired",
      key: "pastHired",
      width: 110,
      align: "center",
      render: (count) => (
        <Tag color="green" style={{ fontSize: "13px", fontWeight: "600" }}>
          {count}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Dropdown menu={actionMenu(record)} trigger={["click"]}>
          <MoreOutlined
            style={{ fontSize: "20px", cursor: "pointer", color: "#014c75" }}
          />
        </Dropdown>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <BenchPoolWrapper>
      <div className="bench-pool-container">
        <h2 className="page-title">Bench Pool</h2>

        {/* Metrics Section */}
        <div className="metrics-section">
          <Card className="metric-card">
            <div className="metric-content">
              <Avatar
                size={64}
                icon={<TeamOutlined />}
                className="metric-icon"
                style={{ backgroundColor: "#e6f7ff" }}
              />
              <div className="metric-info">
                <h3>{activeResources}</h3>
                <p>Active Resources</p>
              </div>
            </div>
          </Card>

          <Card className="metric-card">
            <div className="metric-content">
              <Avatar
                size={64}
                icon={<FileDoneOutlined />}
                className="metric-icon"
                style={{ backgroundColor: "#fff7e6" }}
              />
              <div className="metric-info">
                <h3>{totalJobsApplied}</h3>
                <p>Jobs Applied</p>
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
                <h3>{totalTalentsHired}</h3>
                <p>Talents Hired</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs Section */}
        <div className="tabs-section">
          <Button
            className={activeTab === "Active" ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab("Active")}
          >
            Active ({benchData.filter((r) => r.status === "Active").length})
          </Button>
          <Button
            className={activeTab === "Inactive" ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab("Inactive")}
          >
            Inactive ({benchData.filter((r) => r.status === "Inactive").length})
          </Button>
        </div>

        {/* Search and Actions Section */}
        <div className="actions-section">
          <div className="left-actions">
            <Input
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              placeholder="Search by name or role"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input"
              size="large"
              style={{ width: 320 }}
            />
            <Select
              placeholder={
                <span>
                  <FilterOutlined style={{ marginRight: 8 }} />
                  Filter by Location
                </span>
              }
              style={{ width: 220 }}
              className="filter-select"
              allowClear
              size="large"
            >
              <Option value="bangalore">Bangalore</Option>
              <Option value="mumbai">Mumbai</Option>
              <Option value="pune">Pune</Option>
              <Option value="hyderabad">Hyderabad</Option>
              <Option value="delhi">Delhi</Option>
            </Select>
          </div>

          <div className="right-actions">
            {selectedRowKeys.length > 0 && (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "active",
                      label: "Mark as Active",
                      onClick: () => handleStatusChange("Active"),
                    },
                    {
                      key: "inactive",
                      label: "Mark as Inactive",
                      onClick: () => handleStatusChange("Inactive"),
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <Button className="change-status-btn" size="large">
                  Change Status ({selectedRowKeys.length})
                </Button>
              </Dropdown>
            )}
            <Button className="add-resource-btn" onClick={handleOpenModal} size="large">
              + Add New Resource
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <Card className="table-card">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} resources`,
            }}
            scroll={{ x: 1500 }}
          />
        </Card>

        {/* Add New Resource Modal */}
        <Modal
          open={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={900}
          className="add-resource-modal"
        >
          <Flex
            justify="center"
            vertical
            align="center"
            style={{ borderBottom: "1px solid #e8e8e8", marginBottom: "24px", paddingBottom: "16px" }}
          >
            <Text style={{ fontSize: "28px", color: "#014c75", fontWeight: 600 }}>
              Add Bench Resource
            </Text>
          </Flex>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Upload Resume">
              <Upload
                beforeUpload={(file) => {
                  setResume(file);
                  return false;
                }}
                showUploadList={false}
                accept=".pdf,.doc,.docx"
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              {resume && (
                <div style={{ marginTop: "10px" }}>
                  <Text>{resume.name}</Text>{" "}
                  <Button size="small" onClick={() => setResume(null)}>
                    ✖
                  </Button>
                </div>
              )}
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter the name!" }]}
                >
                  <Input placeholder="Enter Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[{ required: true, message: "Please select a role!" }]}
                >
                  <Select placeholder="Select Role">
                    <Option value="Software Engineer">Software Engineer</Option>
                    <Option value="Senior React Developer">Senior React Developer</Option>
                    <Option value="Full Stack Developer">Full Stack Developer</Option>
                    <Option value="Python Developer">Python Developer</Option>
                    <Option value="DevOps Engineer">DevOps Engineer</Option>
                    <Option value="UI/UX Designer">UI/UX Designer</Option>
                    <Option value="Project Manager">Project Manager</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Top Skills" name="skills">
                  <Input placeholder="Enter skills separated by commas" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Experience">
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item name="experienceYears" noStyle>
                        <Input placeholder="Years" type="number" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="experienceMonths" noStyle>
                        <Input placeholder="Months" type="number" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Monthly Rate" name="rate">
                  <Input placeholder="Enter Monthly Rate" prefix="₹" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Notice Period" name="notice">
                  <Input placeholder="Enter Notice Period (e.g., 30 days)" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Location" name="location">
                  <Select placeholder="Select Location">
                    <Option value="Bangalore">Bangalore</Option>
                    <Option value="Mumbai">Mumbai</Option>
                    <Option value="Pune">Pune</Option>
                    <Option value="Hyderabad">Hyderabad</Option>
                    <Option value="Delhi">Delhi</Option>
                    <Option value="Chennai">Chennai</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Upload Aadhar Card">
                  <Upload
                    beforeUpload={(file) => {
                      setAadhar(file);
                      return false;
                    }}
                    showUploadList={false}
                    accept=".pdf,.jpg,.png"
                  >
                    <Button icon={<UploadOutlined />}>Upload Aadhar</Button>
                  </Upload>
                  {aadhar && (
                    <div style={{ marginTop: "10px" }}>
                      <Text>{aadhar.name}</Text>{" "}
                      <Button size="small" onClick={() => setAadhar(null)}>
                        ✖
                      </Button>
                    </div>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Upload PAN Card">
                  <Upload
                    beforeUpload={(file) => {
                      setPan(file);
                      return false;
                    }}
                    showUploadList={false}
                    accept=".pdf,.jpg,.png"
                  >
                    <Button icon={<UploadOutlined />}>Upload PAN</Button>
                  </Upload>
                  {pan && (
                    <div style={{ marginTop: "10px" }}>
                      <Text>{pan.name}</Text>{" "}
                      <Button size="small" onClick={() => setPan(null)}>
                        ✖
                      </Button>
                    </div>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Upload Degree Proof">
                  <Upload
                    beforeUpload={(file) => {
                      setDegree(file);
                      return false;
                    }}
                    showUploadList={false}
                    accept=".pdf,.jpg,.png"
                  >
                    <Button icon={<UploadOutlined />}>Upload Degree</Button>
                  </Upload>
                  {degree && (
                    <div style={{ marginTop: "10px" }}>
                      <Text>{degree.name}</Text>{" "}
                      <Button size="small" onClick={() => setDegree(null)}>
                        ✖
                      </Button>
                    </div>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item style={{ marginTop: "24px", marginBottom: 0 }}>
              <Space>
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </BenchPoolWrapper>
  );
};

export default BenchPool;
