import React from "react";
import {
  AuditOutlined,
  DashboardOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  FileDoneOutlined,
  LaptopOutlined,
  NotificationOutlined,
  ProjectOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { DashboardWrapper } from "./Dashboard.style";
import Logo from "./../../assets/logo.svg";

const { Header, Content, Sider } = Layout;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const sideBarMenu = [
  { key: 1, label: "Dashboard", icon: <DashboardOutlined /> },
  { key: 2, label: "Roles & Permissions", icon: <SecurityScanOutlined /> },
  { key: 3, label: "User Management", icon: <UserOutlined /> },
  { key: 4, label: "Talents Profiles", icon: <AuditOutlined /> },
  { key: 5, label: "Projects", icon: <ProjectOutlined /> },
  { key: 6, label: "Job Requirements", icon: <FileDoneOutlined /> },
  { key: 7, label: "Interviews", icon: <TeamOutlined /> },
  { key: 8, label: "Timesheets", icon: <FieldTimeOutlined /> },
  { key: 9, label: "Approval Process", icon: <FieldTimeOutlined /> },
  { key: 10, label: "Finance", icon: <DollarOutlined /> },
  { key: 11, label: "Settings", icon: <SettingOutlined /> },
];
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const Dashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <DashboardWrapper>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            // items={items1}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              background: "#272727",
            }}
            className="side-navbar"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={sideBarMenu}
            />
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </DashboardWrapper>
  );
};

export default Dashboard;
