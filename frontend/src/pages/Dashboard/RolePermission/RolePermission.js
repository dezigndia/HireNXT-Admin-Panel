import React, { useState } from "react";
import { Table, Button, Input, Modal, Form, Select, Checkbox } from "antd";

const { Option } = Select;

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

const RolePermission = () => {
  const [activeTab, setActiveTab] = useState("Roles");
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const [isPermissionModalVisible, setIsPermissionModalVisible] =
    useState(false);
  const [form] = Form.useForm();

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
  const handleCloseRoleModal = () => setIsRoleModalVisible(false);
  const handleOpenPermissionModal = () => setIsPermissionModalVisible(true);
  const handleClosePermissionModal = () => setIsPermissionModalVisible(false);

  const handleRoleSubmit = (values) => {
    console.log("New Role Data:", values);
    handleCloseRoleModal();
  };

  const handlePermissionSubmit = (values) => {
    console.log("New Permission Data:", values);
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
          <Button
            type="primary"
            onClick={handleOpenRoleModal}
            style={{ marginBottom: "10px" }}
          >
            Add New Role
          </Button>
          <Table
            columns={roleColumns}
            dataSource={rolesData}
            pagination={{ pageSize: 5 }}
          />
        </>
      ) : (
        <>
          <Button
            type="primary"
            onClick={handleOpenPermissionModal}
            style={{ marginBottom: "10px" }}
          >
            Add New Permission
          </Button>
          <Table
            columns={permissionColumns}
            dataSource={permissionsData}
            pagination={{ pageSize: 5 }}
          />
        </>
      )}

      <Modal
        title="Add New Role"
        visible={isRoleModalVisible}
        onCancel={handleCloseRoleModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleRoleSubmit}>
          <Form.Item
            label="Role Name"
            name="roleName"
            rules={[{ required: true, message: "Please enter a role name!" }]}
          >
            <Input placeholder="Enter Role Name" />
          </Form.Item>
          <Form.Item label="Permission Sets" name="permissionSets">
            <Checkbox.Group>
              <Checkbox value="selectAll">Select All</Checkbox>
              <Checkbox value="view">View</Checkbox>
              <Checkbox value="write">Write</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item>
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

      <Modal
        title="Add New Permission"
        visible={isPermissionModalVisible}
        onCancel={handleClosePermissionModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handlePermissionSubmit}>
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
            <Input placeholder="auto-generated" disabled />
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
