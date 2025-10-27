import React, { useState, useEffect } from "react";
import { Table, Button, Input, Tag, Typography, Dropdown, Menu } from "antd";
import { MoreOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { MyJobsWrapper } from "./MyJobs.style";
import { API_CONST } from "../../../const";

const { Title } = Typography;
const { Search } = Input;

const MyJobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_CONST.GET_JOB_REQUIREMENTS, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setJobsData(result.Response || []);
      } catch (error) {
        console.log(error.message);
        setJobsData([
          {
            key: "1",
            id: "JOB001",
            role: "Senior React Developer",
            location: "Bangalore",
            engagement_type: "Full Time",
            requirement_count: 3,
            experience: "5-8 years",
            engagement_months: "12 months",
            start_date: "2024-11-15",
            budget: "₹15-20 LPA",
            created_on: "2024-10-20",
            status: "Active",
            profilesSubmitted: 12,
          },
          {
            key: "2",
            id: "JOB002",
            role: "DevOps Engineer",
            location: "Remote",
            engagement_type: "Contract",
            requirement_count: 2,
            experience: "3-5 years",
            engagement_months: "6 months",
            start_date: "2024-11-01",
            budget: "₹80-100k/month",
            created_on: "2024-10-18",
            status: "Active",
            profilesSubmitted: 8,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { title: "Job ID", dataIndex: "id", key: "id", width: 100 },
    { 
      title: "Job Title", 
      dataIndex: "role", 
      key: "role",
      width: 200,
    },
    { title: "Location", dataIndex: "location", key: "location", width: 120 },
    { 
      title: "Type", 
      dataIndex: "engagement_type", 
      key: "engagement_type",
      width: 120,
      render: (type) => (
        <Tag color={type === "Full Time" ? "green" : "orange"}>
          {type}
        </Tag>
      ),
    },
    { title: "Positions", dataIndex: "requirement_count", key: "requirement_count", width: 100 },
    { title: "Experience", dataIndex: "experience", key: "experience", width: 120 },
    { title: "Duration", dataIndex: "engagement_months", key: "engagement_months", width: 100 },
    { title: "Start Date", dataIndex: "start_date", key: "start_date", width: 120 },
    { title: "Budget", dataIndex: "budget", key: "budget", width: 150 },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      width: 100,
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "default"}>
          {status || "Active"}
        </Tag>
      ),
    },
    { title: "Profiles", dataIndex: "profilesSubmitted", key: "profilesSubmitted", width: 100 },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">View Details</Menu.Item>
              <Menu.Item key="2">Edit</Menu.Item>
              <Menu.Item key="3">View Profiles</Menu.Item>
              <Menu.Item key="4">Close Job</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <MoreOutlined style={{ cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  const filteredData = jobsData.filter((job) =>
    job.role?.toLowerCase().includes(searchText.toLowerCase()) ||
    job.id?.toLowerCase().includes(searchText.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <MyJobsWrapper>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <Title level={2} className="title-header">My Job Posts</Title>
          <Button type="primary" icon={<PlusOutlined />}>
            Post New Job
          </Button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <Search
            placeholder="Search by job title, ID, or location"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "100%", maxWidth: "400px" }}
            allowClear
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          loading={loading}
          scroll={{ x: 1500 }}
        />
      </div>
    </MyJobsWrapper>
  );
};

export default MyJobs;
