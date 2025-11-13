import React, { useState } from "react";
import { Table, Button, Tag, Tooltip, Modal, Form, Input, message, Dropdown } from "antd";
import {
  DeleteOutlined,
  SendOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const InviteContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  margin-top: 24px;

  .invite-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24px;
    
    .invite-button {
      background: #014c75;
      border-color: #014c75;
      
      &:hover {
        background: #013a5c !important;
        border-color: #013a5c !important;
      }
    }
  }
`;

const InviteUsersTab = ({ role = "admin" }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Aditya Keshari",
      email: "aditya.k@designdia.com",
      mobile: "+918077837212",
      dateAdded: "6/01/2024",
      status: "Active",
    },
    {
      id: 2,
      name: "Aditya Keshari",
      email: "aditya.k@designdia.com",
      mobile: "+918077837212",
      dateAdded: "6/01/2024",
      status: "Active",
    },
    {
      id: 3,
      name: "Aditya Keshari",
      email: "aditya.k@designdia.com",
      mobile: "+918077837212",
      dateAdded: "6/01/2024",
      status: "Inactive",
    },
  ]);

  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleInviteUser = () => {
    setInviteModalVisible(true);
  };

  const handleSubmitInvite = (values) => {
    const newUser = {
      id: users.length + 1,
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      dateAdded: new Date().toLocaleDateString("en-GB"),
      status: "Inactive",
    };
    setUsers([...users, newUser]);
    message.success("User invited successfully!");
    setInviteModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Delete User",
      content: `Are you sure you want to delete ${record.name}?`,
      okText: "Delete",
      okType: "danger",
      onOk: () => {
        setUsers(users.filter((u) => u.id !== record.id));
        message.success("User deleted successfully!");
      },
    });
  };

  const handleResend = (record) => {
    message.success(`Invitation resent to ${record.email}`);
  };

  const getActionMenuItems = (record) => {
    const items = [
      {
        key: "edit",
        label: "Edit User",
      },
      {
        key: "view",
        label: "View Details",
      },
    ];
    return items;
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
      width: 250,
      render: (text) => <span style={{ color: "#014c75" }}>{text}</span>,
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile",
      key: "mobile",
      width: 150,
    },
    {
      title: "Date added",
      dataIndex: "dateAdded",
      key: "dateAdded",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: /** @type {'center'} */ ("center"),
      render: (_, record) => (
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", alignItems: "center" }}>
          {record.status === "Inactive" && (
            <Tooltip title="Resend Invitation">
              <SendOutlined
                style={{ color: "#00d9a9", fontSize: "16px", cursor: "pointer" }}
                onClick={() => handleResend(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="Delete User">
            <DeleteOutlined
              style={{ color: "#ff4d4f", fontSize: "16px", cursor: "pointer" }}
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
          <Dropdown
            menu={{
              items: getActionMenuItems(record),
              onClick: ({ key }) => {
                if (key === "edit") {
                  message.info("Edit user functionality coming soon");
                } else if (key === "view") {
                  message.info("View details functionality coming soon");
                }
              },
            }}
            trigger={["click"]}
          >
            <MoreOutlined
              style={{ fontSize: "18px", cursor: "pointer", color: "#595959" }}
            />
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <InviteContainer>
      <div className="invite-header">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="invite-button"
          onClick={handleInviteUser}
        >
          Invite Users
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showTotal: (total) => `Total ${total} users`,
        }}
      />

      <Modal
        title="Invite User"
        open={inviteModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setInviteModalVisible(false);
          form.resetFields();
        }}
        width={600}
        okText="Send Invitation"
        okButtonProps={{ style: { background: "#00d9a9", borderColor: "#00d9a9" } }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitInvite}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            label="User Name"
            name="name"
            rules={[{ required: true, message: "Please enter user name" }]}
          >
            <Input placeholder="Enter user name" />
          </Form.Item>

          <Form.Item
            label="Email ID"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            label="Mobile Number"
            name="mobile"
            rules={[{ required: true, message: "Please enter mobile number" }]}
          >
            <Input placeholder="Enter mobile number" />
          </Form.Item>
        </Form>
      </Modal>
    </InviteContainer>
  );
};

export default InviteUsersTab;
