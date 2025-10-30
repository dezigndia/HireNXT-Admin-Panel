import { Layout, Menu, Dropdown, Space, Avatar } from "antd";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// @ts-ignore
import Logo from "./../../../assets/logo.svg";
import {
  AuditOutlined,
  DashboardOutlined,
  FieldTimeOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { PartnerDashboardWrapper } from "./PartnerDashboard.style";
import PartnerOverview from "../PartnerOverview/PartnerOverview";
import OngoingJobs from "../OngoingJobs/OngoingJobs";
import TalentsHired from "../TalentsHired/TalentsHired";
import SubmitProfiles from "../SubmitProfiles/SubmitProfiles";
import BenchPool from "../BenchPool/BenchPool";
import TalentDetails from "../TalentDetails/TalentDetails";
import Profile from "../Profile/Profile";

const sideBarMenu = [
  { key: "/partner", label: "Dashboard", icon: <DashboardOutlined /> },
  {
    key: "/partner/ongoing-jobs",
    label: "Ongoing Jobs",
    icon: <SecurityScanOutlined />,
  },
  {
    key: "/partner/bench-pool",
    label: "Bench Pool",
    icon: <UserOutlined />,
  },
  {
    key: "/partner/talent-hired",
    label: "Talents Hired",
    icon: <AuditOutlined />,
  },
];

const sideBarMenu2 = [
  { key: 11, label: "Settings", icon: <SettingOutlined /> },
  { key: "/logout", label: "Logout", icon: <LogoutOutlined /> },
];

const PartnerDashboard = () => {
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
      navigate("/partner/profile");
    } else if (key === 'change-password') {
      navigate("/partner/change-password");
    }
  };

  return (
    <PartnerDashboardWrapper>
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
              <Route path="*" element={<PartnerOverview />} />
              <Route path="/ongoing-jobs" element={<OngoingJobs />} />
              <Route path="/bench-pool" element={<BenchPool />} />
              <Route path="/submit-profiles/:jobId" element={<SubmitProfiles />} />
              <Route path="/talent-hired" element={<TalentsHired />} />
              <Route path="/talent-details/:talentId" element={<TalentDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        </Layout>
      </Layout>
    </PartnerDashboardWrapper>
  );
};

export default PartnerDashboard;
