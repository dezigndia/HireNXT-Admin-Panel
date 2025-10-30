import { Layout, Menu, Dropdown, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Logo from "./../../../assets/logo.svg";
import {
  DashboardOutlined,
  FileDoneOutlined,
  AuditOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  SearchOutlined,
  LockOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { CustomerDashboardWrapper } from "./CustomerDashboard.style";
import CustomerOverview from "../CustomerOverview/CustomerOverview";
import FindTalents from "../FindTalents/FindTalents";
import MyJobs from "../MyJobs/MyJobs";
import SubmittedProfiles from "../SubmittedProfiles/SubmittedProfiles";
import JobDetails from "../JobDetails/JobDetails";
import PostJob from "../PostJob/PostJob";
import HiredTalents from "../HiredTalents/HiredTalents";
import TalentDetails from "../TalentDetails/TalentDetails";

const sideBarMenu = [
  { key: "/customer", label: "Dashboard", icon: <DashboardOutlined /> },
  {
    key: "/customer/find-talents",
    label: "Find Talents",
    icon: <SearchOutlined />,
  },
  {
    key: "/customer/my-jobs",
    label: "My Jobs",
    icon: <FileDoneOutlined />,
  },
  {
    key: "/customer/submitted-profiles",
    label: "Submitted Profiles",
    icon: <AuditOutlined />,
  },
  {
    key: "/customer/hired-talents",
    label: "Hired Talents",
    icon: <UserOutlined />,
  },
];

const sideBarMenu2 = [
  { key: 11, label: "Settings", icon: <SettingOutlined /> },
  { key: "/logout", label: "Logout", icon: <LogoutOutlined /> },
];

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    
    if (!token || userRole !== "customer") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleClick = (e) => {
    if (e.key === "/logout") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");
      navigate("/", { replace: true });
    } else if (e.key === 11) {
      navigate("/customer/settings");
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
      navigate("/customer/profile");
    } else if (key === 'change-password') {
      navigate("/customer/change-password");
    }
  };

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/customer" || path === "/customer/") return "/customer";
    if (path.startsWith("/customer/find-talents")) return "/customer/find-talents";
    if (path.startsWith("/customer/post-job")) return "/customer/my-jobs";
    if (path.startsWith("/customer/my-jobs")) return "/customer/my-jobs";
    if (path.startsWith("/customer/submitted-profiles")) return "/customer/submitted-profiles";
    if (path.startsWith("/customer/hired-talents")) return "/customer/hired-talents";
    return "/customer";
  };

  return (
    <CustomerDashboardWrapper>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            background: "#191919",
          }}
        >
          <img src={Logo} alt="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{
              flex: 1,
              minWidth: 0,
              background: "#191919",
            }}
          />
          <Dropdown 
            menu={{ items: profileMenuItems, onClick: handleProfileMenuClick }}
            placement="bottomRight"
          >
            <Space style={{ cursor: 'pointer', color: 'white', marginRight: '20px' }}>
              <UserOutlined style={{ fontSize: '18px' }} />
              <DownOutlined style={{ fontSize: '12px' }} />
            </Space>
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
              selectedKeys={[getSelectedKey()]}
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
              <Route path="*" element={<CustomerOverview />} />
              <Route path="/find-talents" element={<FindTalents />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/my-jobs" element={<MyJobs />} />
              <Route path="/my-jobs/:jobId" element={<JobDetails />} />
              <Route path="/submitted-profiles" element={<SubmittedProfiles />} />
              <Route path="/hired-talents" element={<HiredTalents />} />
              <Route path="/talent-details/:talentId" element={<TalentDetails />} />
            </Routes>
          </Layout>
        </Layout>
      </Layout>
    </CustomerDashboardWrapper>
  );
};

export default CustomerDashboard;
