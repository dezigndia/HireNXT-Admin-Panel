import { Layout, Menu, Dropdown, Space, Avatar } from "antd";
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
  ClockCircleOutlined,
  DollarOutlined,
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
import Account from "../../../components/Account/Account";
import CustomerTimesheet from "../Timesheet/Timesheet";
import FinanceManagement from "../FinanceManagement/FinanceManagement";

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
    label: "Talents Hired",
    icon: <UserOutlined />,
  },
  {
    key: "/customer/timesheet",
    label: "Timesheet",
    icon: <ClockCircleOutlined />,
  },
  {
    key: "/customer/finance",
    label: "Finance",
    icon: <DollarOutlined />,
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
      key: 'account',
      label: 'View Account',
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
    } else if (key === 'account') {
      navigate("/customer/account");
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
    if (path.startsWith("/customer/timesheet")) return "/customer/timesheet";
    if (path.startsWith("/customer/finance")) return "/customer/finance";
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
              <Route path="/timesheet" element={<CustomerTimesheet />} />
              <Route path="/finance" element={<FinanceManagement />} />
              <Route path="account" element={<Account role="customer" />} />
            </Routes>
          </Layout>
        </Layout>
      </Layout>
    </CustomerDashboardWrapper>
  );
};

export default CustomerDashboard;
