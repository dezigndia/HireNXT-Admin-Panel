import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Logo from "./../../../assets/logo.svg";
import {
  DashboardOutlined,
  FileDoneOutlined,
  AuditOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CustomerDashboardWrapper } from "./CustomerDashboard.style";
import CustomerOverview from "../CustomerOverview/CustomerOverview";
import MyJobs from "../MyJobs/MyJobs";
import SubmittedProfiles from "../SubmittedProfiles/SubmittedProfiles";

const sideBarMenu = [
  { key: "/customer", label: "Dashboard", icon: <DashboardOutlined /> },
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
  { key: 12, label: "Logout", icon: <LogoutOutlined /> },
];

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.key === 12) {
      localStorage.removeItem("authToken");
      navigate("/");
    } else {
      navigate(e.key);
    }
  };

  return (
    <CustomerDashboardWrapper>
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
              <Route path="*" element={<CustomerOverview />} />
              <Route path="/my-jobs" element={<MyJobs />} />
              <Route path="/submitted-profiles" element={<SubmittedProfiles />} />
            </Routes>
          </Layout>
        </Layout>
      </Layout>
    </CustomerDashboardWrapper>
  );
};

export default CustomerDashboard;
