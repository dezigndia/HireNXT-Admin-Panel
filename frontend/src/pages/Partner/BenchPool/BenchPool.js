import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  Select,
  Checkbox,
  Avatar,
  Typography,
  Flex,
  Upload,
  Row,
  Col,
  Dropdown,
  Menu,
  Tabs,
} from "antd";
import {
  UploadOutlined,
  SearchOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { BenchPoolWrapper } from "./BenchPool.style";
import MaskGroup from "../../../assets/Mask-Group.svg";
import axios from "axios";
import { API_CONST } from "../../../const";
const { Text } = Typography;
const { Option } = Select;

const usersData = Array.from({ length: 25 }, (_, index) => ({
  key: index.toString(),
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  contact: `+91-90000000${index}`,
  organization: "Sample Organization",
  designation: "Software Engineer",
  experience: "3 years 2 months",
  cost: "₹1,50,000",
  createdOn: "12-Oct-24 | 11:30",
  modifiedOn: "12-Oct-24 | 14:30",
  type:
    index % 3 === 0
      ? "Active Resource"
      : index % 3 === 1
      ? "Job Applied"
      : "Talents Hired",
}));

const adminColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email Id", dataIndex: "email", key: "email" },
  { title: "Contact No", dataIndex: "contact", key: "contact" },
  { title: "Organization", dataIndex: "organization", key: "organization" },
  { title: "Rate", dataIndex: "rate", key: "rate" },
  { title: "Experience", dataIndex: "experience", key: "experience" },
  { title: "Created on", dataIndex: "createdOn", key: "createdOn" },
  { title: "Degree", dataIndex: "degree", key: "degree" },
  { title: "Pan", dataIndex: "pan", key: "pan" },
  { title: "Aadhar", dataIndex: "Aadhar", key: "Aadhar" },
  { title: "Action", key: "action", render: () => <Button>Edit</Button> },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="1">Edit</Menu.Item>
            <Menu.Item key="2">Delete</Menu.Item>
            <Menu.Item key="3">View Details</Menu.Item>
            <Menu.Item key="4">Reset Password</Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <MoreOutlined />
      </Dropdown>
    ),
  },
];

// Sample data
const activeProfiles = [
  {
    key: "1",
    name: "John Doe",
    onboardedDate: "2024-05-01",
    email: "john@example.com",
    duration: "6 months",
    monthlyRate: "$5000",
    marketRate: "$5500",
  },
  {
    key: "2",
    name: "Alice Johnson",
    onboardedDate: "2024-04-10",
    email: "alice.johnson@example.com",
    duration: "12 months",
    monthlyRate: "$6200",
    marketRate: "$6500",
  },
  {
    key: "3",
    name: "Bob Lee",
    onboardedDate: "2024-06-05",
    email: "bob.lee@example.com",
    duration: "3 months",
    monthlyRate: "$4700",
    marketRate: "$5000",
  },
];

const inactiveProfiles = [
  {
    key: "1",
    name: "Jane Smith",
    offboardedDate: "2024-03-15",
    email: "jane@example.com",
    lastDuration: "4 months",
    lastMonthlyRate: "$4800",
    reason: "Project Ended",
  },
  {
    key: "2",
    name: "Michael Brown",
    offboardedDate: "2024-02-28",
    email: "michael.brown@example.com",
    lastDuration: "8 months",
    lastMonthlyRate: "$5300",
    reason: "Resigned",
  },
  {
    key: "3",
    name: "Sara Lee",
    offboardedDate: "2024-01-20",
    email: "sara.lee@example.com",
    lastDuration: "5 months",
    lastMonthlyRate: "$5100",
    reason: "Contract Completed",
  },
];

const activeColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Onboarded Date", dataIndex: "onboardedDate", key: "onboardedDate" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Duration", dataIndex: "duration", key: "duration" },
  { title: "Monthly Rate", dataIndex: "monthlyRate", key: "monthlyRate" },
  { title: "Market Rate", dataIndex: "marketRate", key: "marketRate" },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Button type="primary" size="small">
        View
      </Button>
    ),
  },
];

const inactiveColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  {
    title: "Offboarded Date",
    dataIndex: "offboardedDate",
    key: "offboardedDate",
  },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Last Duration", dataIndex: "lastDuration", key: "lastDuration" },
  {
    title: "Last Monthly Rate",
    dataIndex: "lastMonthlyRate",
    key: "lastMonthlyRate",
  },
  { title: "Reason", dataIndex: "reason", key: "reason" },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Button type="default" size="small">
        Details
      </Button>
    ),
  },
];

const BenchPool = () => {
  const [tab, setTab] = useState("1");
  const [activeTab, setActiveTab] = useState("Active Resource");
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [resume, setResume] = useState(null);
  const [Aadhar, setAadhar] = useState(null);
  const [pan, setPan] = useState(null);
  const [degree, setDegree] = useState(null);
  const [usersData, setUsersData] = useState([{}]);

  const filteredData = usersData.filter((user) => user.type === activeTab);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setResume(null);
    setAadhar(null);
    setPan(null);
    setDegree(null);
  };

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(API_CONST.GET_TALENT_PROFILE, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setUsersData(result.Response);
      } catch (error) {
        console.log(error.message); // Store error message in state
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    const data = new FormData();
    if (resume) data.append("resume", resume);
    if (Aadhar) data.append("Aadhar", Aadhar);
    if (pan) data.append("pan", pan);
    if (degree) data.append("degree", degree);
    if (values) data.append("data", JSON.stringify(values));

    try {
      const response = await axios.post(API_CONST.ADD_TALENT_PROFILE, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    handleCloseModal();
  };

  return (
    <BenchPoolWrapper>
      <div style={{ padding: "20px" }}>
        <h2 className="title-header">Bench Pool</h2>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {["Active Resource", "Job Applied", "Talents Hired"].map((tab) => (
            <Button
              key={tab}
              className={activeTab === tab ? "tab-button" : "tab-button"}
              type={activeTab === tab ? "default" : "default"}
              onClick={() => setActiveTab(tab)}
            >
              <Avatar
                size={50}
                className="icon-bg"
                style={{
                  backgroundColor: activeTab === tab ? "#E4F6FF" : "#E4F6FF",
                }}
                src={<img src={MaskGroup} alt="avatar" />}
              />
              &nbsp;{usersData.filter((user) => user.type === tab).length}{" "}
              <span style={{ fontSize: "16px", fontWeight: "normal" }}>
                {tab}
              </span>
            </Button>
          ))}
        </div>
        <Flex align="start" justify="space-between">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search resources using Name"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
          />
          <Button
            style={{ backgroundColor: "#01D9A9" }}
            onClick={handleOpenModal}
          >
            Add New Profile
          </Button>
        </Flex>
        <Tabs activeKey={tab} onChange={setTab}>
          <Tabs.TabPane tab="Active Profiles" key="1">
            <Table
              columns={activeColumns}
              dataSource={activeProfiles}
              pagination={false}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Inactive Profiles" key="2">
            <Table
              columns={inactiveColumns}
              dataSource={inactiveProfiles}
              pagination={false}
            />
          </Tabs.TabPane>
        </Tabs>

        <Modal
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={900}
        >
          <Flex
            justify="center"
            vertical
            align="center"
            style={{ borderBottom: "1px solid #000", marginBottom: "1rem" }}
          >
            <Text style={{ fontSize: "30px", color: "#014c75" }}>
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
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              {resume && (
                <div style={{ marginTop: "10px" }}>
                  {resume.name}{" "}
                  <Button onClick={() => setResume(null)}>✖</Button>
                </div>
              )}
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter the name!" },
                  ]}
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
                        <Input placeholder="Years" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="experienceMonths" noStyle>
                        <Input placeholder="Months" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Monthly Rate" name="rate">
                  <Input placeholder="Enter Monthly Rate" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Notice Period" name="notice">
                  <Input placeholder="Enter Notice Period" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Partner Organization" name="organization">
                  <Input placeholder="Enter Partner Organization" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Location" name="location">
                  <Input placeholder="Enter Location" />
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
                  >
                    <Button icon={<UploadOutlined />}>Upload Aadhar</Button>
                  </Upload>
                  {resume && (
                    <div style={{ marginTop: "10px" }}>
                      {resume.name}{" "}
                      <Button onClick={() => setAadhar(null)}>✖</Button>
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
                  >
                    <Button icon={<UploadOutlined />}>Upload PAN</Button>
                  </Upload>
                  {resume && (
                    <div style={{ marginTop: "10px" }}>
                      {resume.name}{" "}
                      <Button onClick={() => setPan(null)}>✖</Button>
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
                  >
                    <Button icon={<UploadOutlined />}>Upload Degree</Button>
                  </Upload>
                  {resume && (
                    <div style={{ marginTop: "10px" }}>
                      {resume.name}{" "}
                      <Button onClick={() => setDegree(null)}>✖</Button>
                    </div>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </BenchPoolWrapper>
  );
};

export default BenchPool;
