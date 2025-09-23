import { Layout, Menu } from "antd";
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
} from "@ant-design/icons";
import { PartnerDashboardWrapper } from "./PartnerDashboard.style";
import OngoingJobs from "../OngoingJobs/OngoingJobs";
import TalentsHired from "../TalentsHired/TalentsHired";
import JobDetails from "../JobDetails/JobDetails";
import BenchPool from "../BenchPool/BenchPool";

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
  { key: 12, label: "Logout", icon: <LogoutOutlined /> },
];

const PartnerDashboard = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(e.key);
  };

  return (
    <PartnerDashboardWrapper>
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
              {/* <Route path="*" element={<Overview />} /> */}
              <Route path="/ongoing-jobs" element={<OngoingJobs />} />
              <Route path="/job-details" element={<JobDetails />} />
              <Route path="/talent-hired" element={<TalentsHired />} />
              <Route path="/bench-pool" element={<BenchPool />} />
              {/* <Route path="/talent-profiles" element={<TalentProfiles />} />
              <Route path="/job-requirments" element={<JobRequirments />} />
              <Route
                path="/job-requirments/new-job-post"
                element={<PostNewJob />}
              />
              <Route path="/approval-process" element={<ApprovalProcess />} /> */}
            </Routes>
          </Layout>
        </Layout>
      </Layout>
    </PartnerDashboardWrapper>
  );
};

export default PartnerDashboard;
