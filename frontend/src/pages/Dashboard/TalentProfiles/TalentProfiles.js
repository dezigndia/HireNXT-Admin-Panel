import React, { useState } from "react";
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
} from "antd";
import { UploadOutlined, SearchOutlined } from "@ant-design/icons";
import { UserManagementWrapper } from "../UserManagement/UserManagement.style";
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
  {
    title: "Partner Organization",
    dataIndex: "organization",
    key: "organization",
  },
  { title: "Designation", dataIndex: "designation", key: "designation" },
  { title: "Experience", dataIndex: "experience", key: "experience" },
  { title: "Cost (INR)", dataIndex: "cost", key: "cost" },
  { title: "Created on", dataIndex: "createdOn", key: "createdOn" },
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

  

  // const handleFileSubmit = async (e) => {
  //   console.log(resume);
  //   try {
  //     const response = await axios.post(API_CONST.FILE_UPLOAD, fileData, {
  //       headers: {
  //         'Content-Type': resume
  //       },
  //     });
  //     console.log('File uploaded successfully!');
  //     console.log(response.data);  
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   handleCloseModal();
  // };


  return (
    <UserManagementWrapper>
      <div style={{ padding: "20px" }}>
        <h2 className="title-header">Talent Profile</h2>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {["Active Resource", "Job Applied", "Talents Hired"].map((tab) => (
            <Button
              key={tab}
              className={
                activeTab === tab ? "tab-button active-tab" : "tab-button"
              }
              type={activeTab === tab ? "primary" : "default"}
              onClick={() => setActiveTab(tab)}
            >
              <Avatar
                size={50}
                className="icon-bg"
                style={{
                  backgroundColor: activeTab === tab ? "#ffffff" : "#E4F6FF",
                }}
                src={<img src={MaskGroup} alt="avatar" />}
              />
              &nbsp;{usersData.filter((user) => user.type === tab).length} {tab}
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
                <Button icon={<UploadOutlined />} >Click to Upload</Button>
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
                <Button icon={<UploadOutlined />} >Upload Aadhar</Button>
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
                <Button icon={<UploadOutlined />} >Upload PAN</Button>
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
                <Button icon={<UploadOutlined />} >Upload Degree</Button>
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
    </UserManagementWrapper>
  );
};

export default TalentProfiles;
