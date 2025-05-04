import React from "react";
import {
  AuditOutlined,
  DashboardOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  FileDoneOutlined,
  LaptopOutlined,
  LogoutOutlined,
  NotificationOutlined,
  ProjectOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { DashboardWrapper } from "./Dashboard.style";
// @ts-ignore
import Logo from "./../../assets/logo.svg";
import { Route, Routes, useNavigate } from "react-router-dom";
import Overview from "./Overview/Overview";
import RolePermission from "./RolePermission/RolePermission";
import UserManagement from "./UserManagement/UserManagement";
import TalentProfiles from "./TalentProfiles/TalentProfiles";
import JobRequirments from "./JobRequirments/JobRequirments";
import PostNewJob from "./JobRequirments/PostNewJob";
import ApprovalProcess from "./ApprovalProcess/ApprovalProcess";

const { Header, Content, Sider } = Layout;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const sideBarMenu = [
  { key: "/home", label: "Dashboard", icon: <DashboardOutlined /> },
  {
    key: "/home/role-permission",
    label: "Roles & Permissions",
    icon: <SecurityScanOutlined />,
  },
  {
    key: "/home/user-management",
    label: "User Management",
    icon: <UserOutlined />,
  },
  {
    key: "/home/talent-profiles",
    label: "Talents Profiles",
    icon: <AuditOutlined />,
  },
  {
    key: "/home/job-requirments",
    label: "Job Requirements",
    icon: <FileDoneOutlined />,
  },
  {
    key: "/home/approval-process",
    label: "Approval Process",
    icon: <FieldTimeOutlined />,
  },
];

const sideBarMenu2 = [
  { key: 11, label: "Settings", icon: <SettingOutlined /> },
  { key: 12, label: "Logout", icon: <LogoutOutlined /> },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(e.key);
  };
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
                borderRight: 0,
              }}
              items={sideBarMenu}
              onClick={handleClick}
            />

            <Menu
              mode="inline"
              style={{
                borderRight: 0,
              }}
              items={sideBarMenu2}
              onClick={handleClick}
            />
          </Sider>
          <Layout
            style={{
              padding: "0 24px 24px",
              overflow: "scroll",
              height: "90vh",
            }}
          >
            <Routes>
              <Route path="/home" element={<Overview />} />
              <Route path="/role-permission" element={<RolePermission />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/talent-profiles" element={<TalentProfiles />} />
              <Route path="/job-requirments" element={<JobRequirments />} />
              <Route
                path="/job-requirments/new-job-post"
                element={<PostNewJob />}
              />
              <Route path="/approval-process" element={<ApprovalProcess />} />
            </Routes>
          </Layout>
        </Layout>
      </Layout>
    </DashboardWrapper>
  );
};

export default Dashboard;
