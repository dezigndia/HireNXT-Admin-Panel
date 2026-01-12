import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  InputNumber,
  Select,
  Tag,
  message,
  Modal,
  Form,
  Row,
  Col,
  Spin,
} from "antd";
import {
  EditOutlined,
  SettingOutlined,
  GlobalOutlined,
  TeamOutlined,
  UserOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  SettingsContainer,
  PageHeader,
  TabsContainer,
  ContentSection,
  SectionHeader,
  ConfigCard,
  ConfigRow,
  TableContainer,
} from "./Settings.style";

const { Option } = Select;

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Global");
  const [globalForm] = Form.useForm();
  const [clientForm] = Form.useForm();
  const [partnerForm] = Form.useForm();
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loadingRate, setLoadingRate] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [globalConfig, setGlobalConfig] = useState({
    clientMarkup: 15,
    partnerDeduction: 10,
    workingDays: 22,
    workingHours: 8,
    defaultCurrency: "USD",
  });

  const [clientConfigs, setClientConfigs] = useState([
    {
      id: 1,
      clientId: "CL001",
      clientName: "Tech Innovations Inc",
      location: "New York, USA",
      markup: 15,
      workingDays: 22,
      workingHours: 8,
      currency: "USD",
    },
    {
      id: 2,
      clientId: "CL002",
      clientName: "Digital Solutions Ltd",
      location: "London, UK",
      markup: 15,
      workingDays: 22,
      workingHours: 8,
      currency: "USD",
    },
    {
      id: 3,
      clientId: "CL003",
      clientName: "Global Tech Corp",
      location: "Bangalore, India",
      markup: 15,
      workingDays: 22,
      workingHours: 8,
      currency: "USD",
    },
  ]);

  const [partnerConfigs, setPartnerConfigs] = useState([
    {
      id: 1,
      partnerId: "PT001",
      partnerName: "TechCorp Solutions",
      location: "Bangalore, India",
      deduction: 10,
      workingDays: 22,
      workingHours: 8,
      currency: "USD",
    },
    {
      id: 2,
      partnerId: "PT002",
      partnerName: "Digital Partners Inc",
      location: "Pune, India",
      deduction: 10,
      workingDays: 22,
      workingHours: 8,
      currency: "USD",
    },
    {
      id: 3,
      partnerId: "PT003",
      partnerName: "Innovate Tech",
      location: "Chennai, India",
      deduction: 10,
      workingDays: 22,
      workingHours: 8,
      currency: "USD",
    },
  ]);

  const [globalConfigModalVisible, setGlobalConfigModalVisible] = useState(false);
  const [clientEditModalVisible, setClientEditModalVisible] = useState(false);
  const [partnerEditModalVisible, setPartnerEditModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const fetchExchangeRate = async () => {
    setLoadingRate(true);
    try {
      const response = await fetch('https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR');
      const data = await response.json();
      const rate = Math.round(data.rates.INR);
      setExchangeRate(rate);
      setLastUpdated(new Date().toLocaleString());
      message.success(`Exchange rate updated: 1 USD = ₹${rate}`);
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      message.error('Failed to fetch exchange rate. Please try again.');
    } finally {
      setLoadingRate(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const handleUpdateGlobalConfig = () => {
    globalForm.validateFields().then((values) => {
      setGlobalConfig(values);
      setGlobalConfigModalVisible(false);
      message.success("Global configuration updated successfully");
    });
  };

  const handleEditClient = (record) => {
    setSelectedClient(record);
    clientForm.setFieldsValue({
      markup: record.markup,
      workingDays: record.workingDays,
      workingHours: record.workingHours,
      currency: record.currency,
    });
    setClientEditModalVisible(true);
  };

  const handleUpdateClient = () => {
    clientForm.validateFields().then((values) => {
      const updated = clientConfigs.map((c) =>
        c.id === selectedClient.id
          ? { ...c, ...values }
          : c
      );
      setClientConfigs(updated);
      setClientEditModalVisible(false);
      setSelectedClient(null);
      clientForm.resetFields();
      message.success(`Configuration updated for ${selectedClient.clientName}`);
    });
  };

  const handleEditPartner = (record) => {
    setSelectedPartner(record);
    partnerForm.setFieldsValue({
      deduction: record.deduction,
      workingDays: record.workingDays,
      workingHours: record.workingHours,
      currency: record.currency,
    });
    setPartnerEditModalVisible(true);
  };

  const handleUpdatePartner = () => {
    partnerForm.validateFields().then((values) => {
      const updated = partnerConfigs.map((p) =>
        p.id === selectedPartner.id
          ? { ...p, ...values }
          : p
      );
      setPartnerConfigs(updated);
      setPartnerEditModalVisible(false);
      setSelectedPartner(null);
      partnerForm.resetFields();
      message.success(`Configuration updated for ${selectedPartner.partnerName}`);
    });
  };

  const clientColumns = [
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      width: 180,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 150,
    },
    {
      title: "Markup (%)",
      dataIndex: "markup",
      key: "markup",
      width: 100,
      render: (val) => (
        <Tag color="green" style={{ fontSize: 14, padding: "4px 12px" }}>
          {val}%
        </Tag>
      ),
    },
    {
      title: "Working Days",
      dataIndex: "workingDays",
      key: "workingDays",
      width: 120,
    },
    {
      title: "Working Hours",
      dataIndex: "workingHours",
      key: "workingHours",
      width: 120,
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      width: 100,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEditClient(record)}
        >
          Edit
        </Button>
      ),
    },
  ];

  const partnerColumns = [
    {
      title: "Partner Name",
      dataIndex: "partnerName",
      key: "partnerName",
      width: 180,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 150,
    },
    {
      title: "Deduction (%)",
      dataIndex: "deduction",
      key: "deduction",
      width: 120,
      render: (val) => (
        <Tag color="orange" style={{ fontSize: 14, padding: "4px 12px" }}>
          {val}%
        </Tag>
      ),
    },
    {
      title: "Working Days",
      dataIndex: "workingDays",
      key: "workingDays",
      width: 120,
    },
    {
      title: "Working Hours",
      dataIndex: "workingHours",
      key: "workingHours",
      width: 120,
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      width: 100,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEditPartner(record)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <SettingsContainer>
      <PageHeader>
        <h2>
          <SettingOutlined style={{ marginRight: 8 }} />
          Settings
        </h2>
        <p>Configure system-wide settings and pricing rules</p>
      </PageHeader>

      <TabsContainer>
        <Button
          className={`tab-button ${activeTab === "Global" ? "active" : ""}`}
          onClick={() => setActiveTab("Global")}
        >
          <GlobalOutlined /> Global Settings
        </Button>
        <Button
          className={`tab-button ${activeTab === "Client" ? "active" : ""}`}
          onClick={() => setActiveTab("Client")}
        >
          <UserOutlined /> Client Specific Configurations
        </Button>
        <Button
          className={`tab-button ${activeTab === "Partner" ? "active" : ""}`}
          onClick={() => setActiveTab("Partner")}
        >
          <TeamOutlined /> Partner Specific Configuration
        </Button>
      </TabsContainer>

      {activeTab === "Global" && (
        <div>
          <ContentSection style={{ marginBottom: 24 }}>
            <SectionHeader>
              <h3>Client Markup / Partner Deductions</h3>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  globalForm.setFieldsValue(globalConfig);
                  setGlobalConfigModalVisible(true);
                }}
                style={{ background: "#00d9a9", borderColor: "#00d9a9" }}
              >
                Update Global Settings
              </Button>
            </SectionHeader>

            <ConfigCard>
              <ConfigRow>
                <span className="label">Client Markup</span>
                <span className="value">
                  <Tag color="green" style={{ fontSize: 16, padding: "6px 16px" }}>
                    {globalConfig.clientMarkup}%
                  </Tag>
                  <span style={{ color: "#666", fontSize: 13 }}>
                    Applied to all clients without specific markup
                  </span>
                </span>
              </ConfigRow>
              <ConfigRow>
                <span className="label">Partner Deduction</span>
                <span className="value">
                  <Tag color="orange" style={{ fontSize: 16, padding: "6px 16px" }}>
                    {globalConfig.partnerDeduction}%
                  </Tag>
                  <span style={{ color: "#666", fontSize: 13 }}>
                    Applied to all partners without specific deduction
                  </span>
                </span>
              </ConfigRow>
            </ConfigCard>
          </ContentSection>

          <ContentSection style={{ marginBottom: 24 }}>
            <SectionHeader>
              <h3>Working Days and Hours</h3>
            </SectionHeader>

            <ConfigCard>
              <ConfigRow>
                <span className="label">Working Days per Month</span>
                <span className="value">
                  <Tag color="blue" style={{ fontSize: 16, padding: "6px 16px" }}>
                    {globalConfig.workingDays} days
                  </Tag>
                  <span style={{ color: "#666", fontSize: 13 }}>
                    Default working days for billing calculations
                  </span>
                </span>
              </ConfigRow>
              <ConfigRow>
                <span className="label">Working Hours per Day</span>
                <span className="value">
                  <Tag color="blue" style={{ fontSize: 16, padding: "6px 16px" }}>
                    {globalConfig.workingHours} hours
                  </Tag>
                  <span style={{ color: "#666", fontSize: 13 }}>
                    Default working hours for billing calculations
                  </span>
                </span>
              </ConfigRow>
            </ConfigCard>
          </ContentSection>

          <ContentSection>
            <SectionHeader>
              <h3>Default Currency & Exchange Rate</h3>
              <Button
                icon={<SyncOutlined spin={loadingRate} />}
                onClick={fetchExchangeRate}
                disabled={loadingRate}
              >
                Refresh Rate
              </Button>
            </SectionHeader>

            <ConfigCard>
              <ConfigRow>
                <span className="label">Default Currency</span>
                <span className="value">
                  <Tag color="purple" style={{ fontSize: 16, padding: "6px 16px" }}>
                    {globalConfig.defaultCurrency}
                  </Tag>
                  <span style={{ color: "#666", fontSize: 13 }}>
                    Primary currency for all transactions
                  </span>
                </span>
              </ConfigRow>
              <ConfigRow>
                <span className="label">USD to INR Exchange Rate</span>
                <span className="value">
                  {loadingRate ? (
                    <Spin size="small" />
                  ) : (
                    <Tag color="cyan" style={{ fontSize: 16, padding: "6px 16px" }}>
                      1 USD = ₹{exchangeRate || '---'}
                    </Tag>
                  )}
                  <span style={{ color: "#666", fontSize: 13 }}>
                    {lastUpdated ? `Last updated: ${lastUpdated}` : 'Fetching from Frankfurter API...'}
                  </span>
                </span>
              </ConfigRow>
            </ConfigCard>
          </ContentSection>
        </div>
      )}

      {activeTab === "Client" && (
        <ContentSection>
          <SectionHeader>
            <h3>Client Specific Configurations</h3>
          </SectionHeader>
          <p style={{ color: "#666", marginBottom: 16, fontSize: 14 }}>
            Configure custom settings for specific clients. Values default to global settings if not customized.
          </p>
          <TableContainer>
            <Table
              columns={clientColumns}
              dataSource={clientConfigs}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Total ${total} clients`,
              }}
            />
          </TableContainer>
        </ContentSection>
      )}

      {activeTab === "Partner" && (
        <ContentSection>
          <SectionHeader>
            <h3>Partner Specific Configuration</h3>
          </SectionHeader>
          <p style={{ color: "#666", marginBottom: 16, fontSize: 14 }}>
            Configure custom settings for specific partners. Values default to global settings if not customized.
          </p>
          <TableContainer>
            <Table
              columns={partnerColumns}
              dataSource={partnerConfigs}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Total ${total} partners`,
              }}
            />
          </TableContainer>
        </ContentSection>
      )}

      <Modal
        title="Update Global Configuration"
        open={globalConfigModalVisible}
        onOk={handleUpdateGlobalConfig}
        onCancel={() => {
          setGlobalConfigModalVisible(false);
          globalForm.resetFields();
        }}
        width={600}
        okText="Update"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
      >
        <Form form={globalForm} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="clientMarkup"
                label="Client Markup (%)"
                rules={[{ required: true, message: "Required" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="partnerDeduction"
                label="Partner Deduction (%)"
                rules={[{ required: true, message: "Required" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="workingDays"
                label="Working Days per Month"
                rules={[{ required: true, message: "Required" }]}
              >
                <InputNumber style={{ width: "100%" }} min={1} max={31} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="workingHours"
                label="Working Hours per Day"
                rules={[{ required: true, message: "Required" }]}
              >
                <InputNumber style={{ width: "100%" }} min={1} max={24} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="defaultCurrency"
            label="Default Currency"
            rules={[{ required: true, message: "Required" }]}
          >
            <Select placeholder="Select currency">
              <Option value="USD">USD - US Dollar</Option>
              <Option value="INR">INR - Indian Rupee</Option>
              <Option value="EUR">EUR - Euro</Option>
              <Option value="GBP">GBP - British Pound</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={`Edit Configuration - ${selectedClient?.clientName || ""}`}
        open={clientEditModalVisible}
        onOk={handleUpdateClient}
        onCancel={() => {
          setClientEditModalVisible(false);
          setSelectedClient(null);
          clientForm.resetFields();
        }}
        width={500}
        okText="Update"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
      >
        {selectedClient && (
          <div>
            <div style={{ marginBottom: 16, padding: 12, background: "#f8f9fd", borderRadius: 6 }}>
              <div><strong>Client:</strong> {selectedClient.clientName}</div>
              <div><strong>Location:</strong> {selectedClient.location}</div>
            </div>
            <Form form={clientForm} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="markup" label="Markup (%)">
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="currency" label="Currency">
                    <Select>
                      <Option value="USD">USD</Option>
                      <Option value="INR">INR</Option>
                      <Option value="EUR">EUR</Option>
                      <Option value="GBP">GBP</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="workingDays" label="Working Days">
                    <InputNumber style={{ width: "100%" }} min={1} max={31} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="workingHours" label="Working Hours">
                    <InputNumber style={{ width: "100%" }} min={1} max={24} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </Modal>

      <Modal
        title={`Edit Configuration - ${selectedPartner?.partnerName || ""}`}
        open={partnerEditModalVisible}
        onOk={handleUpdatePartner}
        onCancel={() => {
          setPartnerEditModalVisible(false);
          setSelectedPartner(null);
          partnerForm.resetFields();
        }}
        width={500}
        okText="Update"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
      >
        {selectedPartner && (
          <div>
            <div style={{ marginBottom: 16, padding: 12, background: "#f8f9fd", borderRadius: 6 }}>
              <div><strong>Partner:</strong> {selectedPartner.partnerName}</div>
              <div><strong>Location:</strong> {selectedPartner.location}</div>
            </div>
            <Form form={partnerForm} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="deduction" label="Deduction (%)">
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="currency" label="Currency">
                    <Select>
                      <Option value="USD">USD</Option>
                      <Option value="INR">INR</Option>
                      <Option value="EUR">EUR</Option>
                      <Option value="GBP">GBP</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="workingDays" label="Working Days">
                    <InputNumber style={{ width: "100%" }} min={1} max={31} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="workingHours" label="Working Hours">
                    <InputNumber style={{ width: "100%" }} min={1} max={24} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </Modal>
    </SettingsContainer>
  );
};

export default Settings;
