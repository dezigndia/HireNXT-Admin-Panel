import React, { useState } from "react";
import { Tabs } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import styled from "styled-components";
import MyProfileTab from "./MyProfileTab";
import InviteUsersTab from "./InviteUsersTab";

const AccountWrapper = styled.div`
  padding: 24px 0;

  .page-title {
    font-size: 28px;
    font-weight: 600;
    color: #014c75;
    margin-bottom: 24px;
  }

  .ant-tabs-nav {
    margin-bottom: 0;
  }

  .ant-tabs-tab {
    padding: 12px 24px;
    font-size: 15px;
    
    &.ant-tabs-tab-active {
      .ant-tabs-tab-btn {
        color: #014c75;
        font-weight: 500;
      }
    }
  }

  .ant-tabs-ink-bar {
    background: #00d9a9;
    height: 3px;
  }
`;

const Account = ({ role = "admin" }) => {
  const [activeTab, setActiveTab] = useState("my-profile");

  const tabItems = [
    {
      key: "my-profile",
      label: (
        <span>
          <UserOutlined style={{ marginRight: 8 }} />
          My Profile
        </span>
      ),
      children: <MyProfileTab />,
    },
    {
      key: "invite-users",
      label: (
        <span>
          <TeamOutlined style={{ marginRight: 8 }} />
          Invite User
        </span>
      ),
      children: <InviteUsersTab role={role} />,
    },
  ];

  return (
    <AccountWrapper>
      <h1 className="page-title">Account</h1>
      
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
      />
    </AccountWrapper>
  );
};

export default Account;
