import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  InputNumber,
  Select,
  Tag,
  message,
  Modal,
  Form,
  Switch,
} from "antd";
import {
  EditOutlined,
  SettingOutlined,
  PercentageOutlined,
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
  const [activeTab, setActiveTab] = useState("Markups");

  // Global configuration state
  const [globalConfig, setGlobalConfig] = useState({
    defaultClientMarkup: 10, // Default 10% markup for clients
    defaultPartnerDeduction: 5, // Default 5% deduction for partners
  });

  // Client-specific markups
  const [clientMarkups, setClientMarkups] = useState([
    {
      id: 1,
      clientId: "CL001",
      clientName: "Tech Innovations Inc",
      markupPercentage: 12,
      isActive: true,
      appliedFrom: "2024-01-01",
    },
    {
      id: 2,
      clientId: "CL002",
      clientName: "Digital Solutions Ltd",
      markupPercentage: 10,
      isActive: true,
      appliedFrom: "2024-01-15",
    },
    {
      id: 3,
      clientId: "CL003",
      clientName: "Global Tech Corp",
      markupPercentage: 15,
      isActive: true,
      appliedFrom: "2024-02-01",
    },
  ]);

  // Partner-specific deductions
  const [partnerDeductions, setPartnerDeductions] = useState([
    {
      id: 1,
      partnerId: "PT001",
      partnerName: "TechCorp Solutions",
      deductionPercentage: 5,
      isActive: true,
      appliedFrom: "2024-01-01",
    },
    {
      id: 2,
      partnerId: "PT002",
      partnerName: "Digital Partners Inc",
      deductionPercentage: 4,
      isActive: true,
      appliedFrom: "2024-01-15",
    },
    {
      id: 3,
      partnerId: "PT003",
      partnerName: "Innovate Tech",
      deductionPercentage: 6,
      isActive: true,
      appliedFrom: "2024-02-01",
    },
  ]);

  // Modal states
  const [globalConfigModalVisible, setGlobalConfigModalVisible] = useState(false);
  const [clientMarkupModalVisible, setClientMarkupModalVisible] = useState(false);
  const [partnerDeductionModalVisible, setPartnerDeductionModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [form] = Form.useForm();

  // Handle global config update
  const handleUpdateGlobalConfig = () => {
    form.validateFields().then((values) => {
      setGlobalConfig({
        defaultClientMarkup: values.defaultClientMarkup,
        defaultPartnerDeduction: values.defaultPartnerDeduction,
      });
      setGlobalConfigModalVisible(false);
      message.success("Global configuration updated successfully");
    });
  };

  // Handle client markup edit
  const handleEditClientMarkup = (record) => {
    setSelectedClient(record);
    form.setFieldsValue({
      markupPercentage: record.markupPercentage,
      isActive: record.isActive,
    });
    setClientMarkupModalVisible(true);
  };

  const handleUpdateClientMarkup = () => {
    form.validateFields().then((values) => {
      const updated = clientMarkups.map((c) =>
        c.id === selectedClient.id
          ? {
              ...c,
              markupPercentage: values.markupPercentage,
              isActive: values.isActive,
            }
          : c
      );
      setClientMarkups(updated);
      setClientMarkupModalVisible(false);
      setSelectedClient(null);
      form.resetFields();
      message.success(`Markup updated for ${selectedClient.clientName}`);
    });
  };

  // Handle partner deduction edit
  const handleEditPartnerDeduction = (record) => {
    setSelectedPartner(record);
    form.setFieldsValue({
      deductionPercentage: record.deductionPercentage,
      isActive: record.isActive,
    });
    setPartnerDeductionModalVisible(true);
  };

  const handleUpdatePartnerDeduction = () => {
    form.validateFields().then((values) => {
      const updated = partnerDeductions.map((p) =>
        p.id === selectedPartner.id
          ? {
              ...p,
              deductionPercentage: values.deductionPercentage,
              isActive: values.isActive,
            }
          : p
      );
      setPartnerDeductions(updated);
      setPartnerDeductionModalVisible(false);
      setSelectedPartner(null);
      form.resetFields();
      message.success(`Deduction updated for ${selectedPartner.partnerName}`);
    });
  };

  // Client markup columns
  const clientMarkupColumns = [
    {
      title: "Client ID",
      dataIndex: "clientId",
      key: "clientId",
      width: 120,
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      width: 200,
    },
    {
      title: "Markup Percentage",
      dataIndex: "markupPercentage",
      key: "markupPercentage",
      width: 150,
      render: (percentage) => (
        <Tag color="green" style={{ fontSize: 14, padding: "4px 12px" }}>
          {percentage}%
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 100,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Applied From",
      dataIndex: "appliedFrom",
      key: "appliedFrom",
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEditClientMarkup(record)}
        >
          Edit
        </Button>
      ),
    },
  ];

  // Partner deduction columns
  const partnerDeductionColumns = [
    {
      title: "Partner ID",
      dataIndex: "partnerId",
      key: "partnerId",
      width: 120,
    },
    {
      title: "Partner Name",
      dataIndex: "partnerName",
      key: "partnerName",
      width: 200,
    },
    {
      title: "Deduction Percentage",
      dataIndex: "deductionPercentage",
      key: "deductionPercentage",
      width: 180,
      render: (percentage) => (
        <Tag color="orange" style={{ fontSize: 14, padding: "4px 12px" }}>
          {percentage}%
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 100,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Applied From",
      dataIndex: "appliedFrom",
      key: "appliedFrom",
      width: 120,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEditPartnerDeduction(record)}
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
          className={`tab-button ${activeTab === "Markups" ? "active" : ""}`}
          onClick={() => setActiveTab("Markups")}
        >
          <PercentageOutlined /> Markups & Deductions
        </Button>
      </TabsContainer>

      {activeTab === "Markups" && (
        <div>
          {/* Global Configuration */}
          <ContentSection style={{ marginBottom: 24 }}>
            <SectionHeader>
              <h3>Global Configuration</h3>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  form.setFieldsValue(globalConfig);
                  setGlobalConfigModalVisible(true);
                }}
                style={{ background: "#00d9a9", borderColor: "#00d9a9" }}
              >
                Update Global Settings
              </Button>
            </SectionHeader>

            <ConfigCard>
              <ConfigRow>
                <span className="label">Default Client Markup</span>
                <span className="value">
                  <Tag color="green" style={{ fontSize: 16, padding: "6px 16px" }}>
                    {globalConfig.defaultClientMarkup}%
                  </Tag>
                  <span style={{ color: "#666", fontSize: 13 }}>
                    Applied to all clients without specific markup
                  </span>
                </span>
              </ConfigRow>
              <ConfigRow>
                <span className="label">Default Partner Deduction</span>
                <span className="value">
                  <Tag color="orange" style={{ fontSize: 16, padding: "6px 16px" }}>
                    {globalConfig.defaultPartnerDeduction}%
                  </Tag>
                  <span style={{ color: "#666", fontSize: 13 }}>
                    Applied to all partners without specific deduction
                  </span>
                </span>
              </ConfigRow>
            </ConfigCard>
          </ContentSection>

          {/* Client-Specific Markups */}
          <ContentSection style={{ marginBottom: 24 }}>
            <SectionHeader>
              <h3>Client-Specific Markups</h3>
            </SectionHeader>
            <p style={{ color: "#666", marginBottom: 16, fontSize: 14 }}>
              Configure custom markup percentages for specific clients. If no client-specific
              markup is set, the default global markup will be applied.
            </p>
            <TableContainer>
              <Table
                columns={clientMarkupColumns}
                dataSource={clientMarkups}
                rowKey="id"
                pagination={{
                  pageSize: 5,
                  showTotal: (total) => `Total ${total} clients`,
                }}
              />
            </TableContainer>
          </ContentSection>

          {/* Partner-Specific Deductions */}
          <ContentSection>
            <SectionHeader>
              <h3>Partner-Specific Deductions</h3>
            </SectionHeader>
            <p style={{ color: "#666", marginBottom: 16, fontSize: 14 }}>
              Configure custom deduction percentages for specific partners. If no partner-specific
              deduction is set, the default global deduction will be applied.
            </p>
            <TableContainer>
              <Table
                columns={partnerDeductionColumns}
                dataSource={partnerDeductions}
                rowKey="id"
                pagination={{
                  pageSize: 5,
                  showTotal: (total) => `Total ${total} partners`,
                }}
              />
            </TableContainer>
          </ContentSection>
        </div>
      )}

      {/* Global Configuration Modal */}
      <Modal
        title="Update Global Configuration"
        open={globalConfigModalVisible}
        onOk={handleUpdateGlobalConfig}
        onCancel={() => {
          setGlobalConfigModalVisible(false);
          form.resetFields();
        }}
        width={600}
        okText="Update"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="defaultClientMarkup"
            label="Default Client Markup (%)"
            rules={[
              { required: true, message: "Please enter default client markup" },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Markup must be between 0 and 100",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter markup percentage"
              min={0}
              max={100}
              precision={2}
              formatter={(value) => (value ? `${value}%` : "")}
              parser={(value) => (value ? value.replace("%", "") : "")}
            />
          </Form.Item>
          <Form.Item
            name="defaultPartnerDeduction"
            label="Default Partner Deduction (%)"
            rules={[
              { required: true, message: "Please enter default partner deduction" },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Deduction must be between 0 and 100",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter deduction percentage"
              min={0}
              max={100}
              precision={2}
              formatter={(value) => (value ? `${value}%` : "")}
              parser={(value) => (value ? value.replace("%", "") : "")}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Client Markup Modal */}
      <Modal
        title={`Edit Markup - ${selectedClient?.clientName || ""}`}
        open={clientMarkupModalVisible}
        onOk={handleUpdateClientMarkup}
        onCancel={() => {
          setClientMarkupModalVisible(false);
          setSelectedClient(null);
          form.resetFields();
        }}
        width={500}
        okText="Update"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
      >
        {selectedClient && (
          <div>
            <div
              style={{
                marginBottom: 16,
                padding: 12,
                background: "#f8f9fd",
                borderRadius: 6,
              }}
            >
              <div>
                <strong>Client ID:</strong> {selectedClient.clientId}
              </div>
              <div>
                <strong>Client Name:</strong> {selectedClient.clientName}
              </div>
            </div>
            <Form form={form} layout="vertical">
              <Form.Item
                name="markupPercentage"
                label="Markup Percentage (%)"
                rules={[
                  { required: true, message: "Please enter markup percentage" },
                  {
                    type: "number",
                    min: 0,
                    max: 100,
                    message: "Markup must be between 0 and 100",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Enter markup percentage"
                  min={0}
                  max={100}
                  precision={2}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                />
              </Form.Item>
              <Form.Item name="isActive" label="Status" valuePropName="checked">
                <Switch
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>

      {/* Partner Deduction Modal */}
      <Modal
        title={`Edit Deduction - ${selectedPartner?.partnerName || ""}`}
        open={partnerDeductionModalVisible}
        onOk={handleUpdatePartnerDeduction}
        onCancel={() => {
          setPartnerDeductionModalVisible(false);
          setSelectedPartner(null);
          form.resetFields();
        }}
        width={500}
        okText="Update"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
      >
        {selectedPartner && (
          <div>
            <div
              style={{
                marginBottom: 16,
                padding: 12,
                background: "#f8f9fd",
                borderRadius: 6,
              }}
            >
              <div>
                <strong>Partner ID:</strong> {selectedPartner.partnerId}
              </div>
              <div>
                <strong>Partner Name:</strong> {selectedPartner.partnerName}
              </div>
            </div>
            <Form form={form} layout="vertical">
              <Form.Item
                name="deductionPercentage"
                label="Deduction Percentage (%)"
                rules={[
                  { required: true, message: "Please enter deduction percentage" },
                  {
                    type: "number",
                    min: 0,
                    max: 100,
                    message: "Deduction must be between 0 and 100",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Enter deduction percentage"
                  min={0}
                  max={100}
                  precision={2}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                />
              </Form.Item>
              <Form.Item name="isActive" label="Status" valuePropName="checked">
                <Switch
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </SettingsContainer>
  );
};

export default Settings;
