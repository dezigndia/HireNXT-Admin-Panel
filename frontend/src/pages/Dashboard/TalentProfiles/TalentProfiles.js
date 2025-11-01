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
  Card,
} from "antd";
import {
  UploadOutlined,
  SearchOutlined,
  MoreOutlined,
  PlusOutlined,
  UserAddOutlined,
  FileTextOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { UserManagementWrapper, MetricsContainer, TabsContainer } from "../UserManagement/UserManagement.style";
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

const TalentProfiles = () => {
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
  if (resume) data.append('resume', resume);
  if (Aadhar) data.append('Aadhar', Aadhar);
  if (pan) data.append('pan', pan);
  if (degree) data.append('degree', degree);
  if (values) data.append('data', JSON.stringify(values));

  try {
    const response = await axios.post(API_CONST.ADD_TALENT_PROFILE, data, {
      headers: {
        'Content-Type': "multipart/form-data"
      },
    });
    console.log('File uploaded successfully!');
    console.log(response.data);  
  } catch (error) {
    console.error(error);
  }

    handleCloseModal();
  };


  const activeResourceCount = usersData.filter((user) => user.type === "Active Resource").length;
  const jobAppliedCount = usersData.filter((user) => user.type === "Job Applied").length;
  const talentsHiredCount = usersData.filter((user) => user.type === "Talents Hired").length;

  return (
    <UserManagementWrapper>
      <h2 className="title-header">Talent Profile</h2>
      
      <MetricsContainer>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
              icon={<UserAddOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#e6f7ff" }}
            />
            <div className="metric-info">
              <h3>{activeResourceCount}</h3>
              <p>Active Resources</p>
            </div>
          </div>
        </Card>
        <Card className="metric-card">
          <div className="metric-content">
            <Avatar
              size={64}
              icon={<FileTextOutlined />}
              className="metric-icon"
              style={{ backgroundColor: "#fff7e6" }}
            />
            <div className="metric-info">
              <h3>{jobAppliedCount}</h3>
              <p>Job Applications</p>
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
              <h3>{talentsHiredCount}</h3>
              <p>Talents Hired</p>
            </div>
          </div>
        </Card>
      </MetricsContainer>

      <TabsContainer>
        {["Active Resource", "Job Applied", "Talents Hired"].map((tab) => (
          <Button
            key={tab}
            className={activeTab === tab ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </TabsContainer>
        <Flex align="start" justify="space-between">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search resources using Name"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: "20px", width: "300px" }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenModal}
            style={{ 
              backgroundColor: "#00d9a9",
              borderColor: "#00d9a9",
              height: "40px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Add New Profile
          </Button>
        </Flex>
        <Table
          columns={adminColumns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
        />

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
    </UserManagementWrapper>
  );
};

export default TalentProfiles;
