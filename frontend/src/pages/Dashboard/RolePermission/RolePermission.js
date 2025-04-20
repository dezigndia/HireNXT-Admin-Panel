import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  Checkbox,
  Typography,
  message,
  Flex,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

// Sample Data
const rolesData = [
  {
    key: "1",
    roleName: "Admin",
    permissionSets: "Full Access",
    createdOn: "12-Oct-24",
    modifiedOn: "12-Oct-24",
  },
  {
    key: "2",
    roleName: "HR Manager",
    permissionSets: "View, Write",
    createdOn: "10-Oct-24",
    modifiedOn: "11-Oct-24",
  },
];

const permissionsData = [
  {
    key: "1",
    permissionName: "View Users",
    permissionSlug: "view_users",
    permissionDescription: "Allows viewing user data",
    createdOn: "12-Oct-24",
    modifiedOn: "12-Oct-24",
  },
  {
    key: "2",
    permissionName: "Edit Users",
    permissionSlug: "edit_users",
    permissionDescription: "Allows editing user data",
    createdOn: "11-Oct-24",
    modifiedOn: "12-Oct-24",
  },
];

const permissionGroups = [
  "Administrator Access",
  "Roles and Permissions",
  "User Management",
  "Talents Hired",
  "Talent Profile",
  "Talent Management",
  "Job Management",
  "Approval Management",
];

const RolePermission = () => {
  const [activeTab, setActiveTab] = useState("Roles");
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const [isPermissionModalVisible, setIsPermissionModalVisible] =
    useState(false);
  const [roleForm] = Form.useForm();
  const [permissionForm] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  const roleColumns = [
    { title: "Role Name", dataIndex: "roleName", key: "roleName" },
    {
      title: "Permission Sets",
      dataIndex: "permissionSets",
      key: "permissionSets",
    },
    { title: "Created on", dataIndex: "createdOn", key: "createdOn" },
    { title: "Modified on", dataIndex: "modifiedOn", key: "modifiedOn" },
    { title: "Action", key: "action", render: () => <Button>Edit</Button> },
  ];

  const permissionColumns = [
    {
      title: "Permission Name",
      dataIndex: "permissionName",
      key: "permissionName",
    },
    {
      title: "Permission Slug",
      dataIndex: "permissionSlug",
      key: "permissionSlug",
    },
    {
      title: "Permission Description",
      dataIndex: "permissionDescription",
      key: "permissionDescription",
    },
    { title: "Created on", dataIndex: "createdOn", key: "createdOn" },
    { title: "Modified on", dataIndex: "modifiedOn", key: "modifiedOn" },
  ];

  const handleOpenRoleModal = () => setIsRoleModalVisible(true);
  const handleCloseRoleModal = () => {
    setIsRoleModalVisible(false);
    roleForm.resetFields();
  };

  const handleOpenPermissionModal = () => setIsPermissionModalVisible(true);
  const handleClosePermissionModal = () => {
    setIsPermissionModalVisible(false);
    permissionForm.resetFields();
  };

  const handleRoleSubmit = (values) => {
    const allPermissions = Object.entries(values.permissionSets || {}).flatMap(
      ([group, perms]) => perms.map((p) => `${group}:${p}`)
    );

    console.log("✅ Submitted Role:", {
      roleName: values.roleName,
      permissions: allPermissions,
    });

    message.success("Role saved successfully");
    handleCloseRoleModal();
  };

  const handlePermissionSubmit = (values) => {
    console.log("📋 Submitted Permission:", values);
    message.success("Permission saved successfully");
    handleClosePermissionModal();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Roles and Permissions</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Button
          type={activeTab === "Roles" ? "primary" : "default"}
          onClick={() => setActiveTab("Roles")}
        >
          Roles
        </Button>
        <Button
          type={activeTab === "Permissions" ? "primary" : "default"}
          onClick={() => setActiveTab("Permissions")}
        >
          Permissions
        </Button>
      </div>

      {activeTab === "Roles" ? (
        <>
          <Flex align="start" justify="space-between">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search resources using Name"
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginBottom: "20px", width: "300px" }}
            />
            <Button
              type="primary"
              onClick={handleOpenRoleModal}
              style={{ marginBottom: "10px", backgroundColor: "#01D9A9" }}
            >
              Add New Role
            </Button>
          </Flex>

          <Table
            columns={roleColumns}
            dataSource={rolesData}
            pagination={{ pageSize: 5 }}
          />
        </>
      ) : (
        <>
          <Flex align="start" justify="space-between">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search resources using Name"
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginBottom: "20px", width: "300px" }}
            />
            <Button
              type="primary"
              onClick={handleOpenPermissionModal}
              style={{ marginBottom: "10px", backgroundColor: "#01D9A9" }}
            >
              Add New Permission
            </Button>
          </Flex>

          <Table
            columns={permissionColumns}
            dataSource={permissionsData}
            pagination={{ pageSize: 5 }}
          />
        </>
      )}

      {/* Add Role Modal */}
      <Modal
        title="Add New Role"
        open={isRoleModalVisible}
        onCancel={handleCloseRoleModal}
        footer={null}
      >
        <Form form={roleForm} layout="vertical" onFinish={handleRoleSubmit}>
          <Form.Item
            label="Role Name"
            name="roleName"
            rules={[{ required: true, message: "Please enter a role name!" }]}
          >
            <Input placeholder="Enter Role Name" />
          </Form.Item>
          <div style={{ marginBottom: "1rem" }}>
            <Title level={5}>Permission Sets</Title>
            <Text>Select the relevant permissions to enable the module</Text>
          </div>

          {permissionGroups.map((group) => (
            <Form.Item
              key={group}
              name={["permissionSets", group]}
              style={{
                marginBottom: 0,
                borderBottom: "1px solid #BFBFBF",
              }}
            >
              <div className="flex items-center justify-between">
                <label
                  className="text-sm font-medium"
                  style={{ color: "#014C75" }}
                >
                  {group}
                </label>
                <Checkbox.Group options={["view", "write"]} />
              </div>
            </Form.Item>
          ))}

          <Form.Item style={{ marginTop: "1rem" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              onClick={handleCloseRoleModal}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Permission Modal */}
      <Modal
        title="Add New Permission"
        open={isPermissionModalVisible}
        onCancel={handleClosePermissionModal}
        footer={null}
      >
        <Form
          form={permissionForm}
          layout="vertical"
          onFinish={handlePermissionSubmit}
        >
          <Form.Item
            label="Permission Name"
            name="permissionName"
            rules={[
              { required: true, message: "Please enter a permission name!" },
            ]}
          >
            <Input placeholder="Enter Permission Name" />
          </Form.Item>
          <Form.Item label="Permission Slug" name="permissionSlug">
            <Input placeholder="Auto-generated" disabled />
          </Form.Item>
          <Form.Item
            label="Permission Description"
            name="permissionDescription"
          >
            <Input.TextArea placeholder="Enter Permission Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              onClick={handleClosePermissionModal}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RolePermission;
