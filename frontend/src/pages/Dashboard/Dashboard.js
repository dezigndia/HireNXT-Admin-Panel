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
  LockOutlined,
  DownOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme, Dropdown, Space, Avatar } from "antd";
import { DashboardWrapper } from "./Dashboard.style";
// @ts-ignore
import Logo from "./../../assets/logo.svg";
import { Route, Routes, useNavigate } from "react-router-dom";
import Overview from "./Overview/Overview";
import RolePermission from "./RolePermission/RolePermission";
import UserManagement from "./UserManagement/UserManagement";
import TalentProfiles from "./TalentProfiles/TalentProfiles";
import AddTalentProfile from "./TalentProfiles/AddTalentProfile/AddTalentProfile";
import JobRequirments from "./JobRequirments/JobRequirments";
import PostNewJob from "./JobRequirments/PostNewJob";
import AdminJobDetails from "./JobRequirments/JobDetails";
import ApprovalProcess from "./ApprovalProcess/ApprovalProcess";
import TalentsHired from "./TalentsHired/TalentsHired";
import AddHiringRecord from "./TalentsHired/AddHiringRecord/AddHiringRecord";
import Timesheet from "./Timesheet/Timesheet";
import Finance from "./Finance/Finance";
import Profile from "./Profile/Profile";

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
    key: "/home/talents-hired",
    label: "Talents Hired",
    icon: <TeamOutlined />,
  },
  {
    key: "/home/timesheet",
    label: "Timesheet",
    icon: <FileTextOutlined />,
  },
  {
    key: "/home/approval-process",
    label: "Approval Process",
    icon: <FieldTimeOutlined />,
  },
  {
    key: "/home/finance",
    label: "Finance",
    icon: <DollarOutlined />,
  },
];

const sideBarMenu2 = [
  { key: 11, label: "Settings", icon: <SettingOutlined /> },
  { key: "/logout", label: "Logout", icon: <LogoutOutlined /> },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.key === "/logout") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");
      navigate("/", { replace: true });
    } else {
      navigate(e.key);
    }
  };

  const profileMenuItems = [
    {
      key: 'profile',
      label: 'View Profile',
      icon: <UserOutlined />,
    },
    {
      key: 'change-password',
      label: 'Change Password',
      icon: <LockOutlined />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
    },
  ];

  const handleProfileMenuClick = ({ key }) => {
    if (key === 'logout') {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");
      navigate("/", { replace: true });
    } else if (key === 'profile') {
      navigate("/home/profile");
    } else if (key === 'change-password') {
      navigate("/home/change-password");
    }
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
            background: "#191919",
            padding: "0 24px",
            justifyContent: "space-between",
          }}
        >
          <img src={Logo} alt="logo" />
          
          <Dropdown 
            menu={{ items: profileMenuItems, onClick: handleProfileMenuClick }}
            placement="bottomRight"
          >
            <Avatar
              style={{
                backgroundColor: "#00d9a9",
                cursor: "pointer",
              }}
              icon={<UserOutlined />}
            />
          </Dropdown>
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
              overflow: "auto",
              height: "90vh",
            }}
          >
            <Routes>
              <Route path="*" element={<Overview />} />
              <Route path="/role-permission" element={<RolePermission />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/talent-profiles" element={<TalentProfiles />} />
              <Route
                path="/talent-profiles/add-new-profile"
                element={<AddTalentProfile />}
              />
              <Route path="/job-requirments" element={<JobRequirments />} />
              <Route
                path="/job-requirments/new-job-post"
                element={<PostNewJob />}
              />
              <Route
                path="/job-requirments/job-details/:jobId"
                element={<AdminJobDetails />}
              />
              <Route path="/talents-hired" element={<TalentsHired />} />
              <Route
                path="/talents-hired/add-hiring-record"
                element={<AddHiringRecord />}
              />
              <Route path="/timesheet" element={<Timesheet />} />
              <Route path="/approval-process" element={<ApprovalProcess />} />
              <Route path="finance" element={<Finance />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        </Layout>
      </Layout>
    </DashboardWrapper>
  );
};

export default Dashboard;
