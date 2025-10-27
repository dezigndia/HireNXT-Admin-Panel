import React, { useState } from "react";
import { Table, Input, Tag, Typography, Dropdown, Menu, Select } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { SubmittedProfilesWrapper } from "./SubmittedProfiles.style";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const usersData = Array.from({ length: 25 }, (_, index) => ({
  key: index.toString(),
  profileId: `PRF${String(index + 1).padStart(3, '0')}`,
  name: `Developer ${index + 1}`,
  email: `dev${index + 1}@example.com`,
  contact: `+91-90000000${index % 10}`,
  jobId: `JOB${String((index % 3) + 1).padStart(3, '0')}`,
  jobTitle: index % 3 === 0 ? "Senior React Developer" : index % 3 === 1 ? "DevOps Engineer" : "Full Stack Developer",
  experience: `${3 + (index % 5)} years`,
  skills: index % 3 === 0 ? "React, Node.js, AWS" : index % 3 === 1 ? "Docker, Kubernetes, CI/CD" : "Python, Django, PostgreSQL",
  expectedSalary: `₹${(index % 5 + 10) * 100}k`,
  submittedOn: "25-Oct-24",
  status: index % 4 === 0 ? "Under Review" : index % 4 === 1 ? "Shortlisted" : index % 4 === 2 ? "Interview Scheduled" : "Rejected",
}));

const SubmittedProfiles = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedJob, setSelectedJob] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const columns = [
    { title: "Profile ID", dataIndex: "profileId", key: "profileId", width: 120 },
    { title: "Name", dataIndex: "name", key: "name", width: 150 },
    { title: "Email", dataIndex: "email", key: "email", width: 200 },
    { title: "Contact", dataIndex: "contact", key: "contact", width: 150 },
    { title: "Job ID", dataIndex: "jobId", key: "jobId", width: 100 },
    { title: "Job Title", dataIndex: "jobTitle", key: "jobTitle", width: 200 },
    { title: "Experience", dataIndex: "experience", key: "experience", width: 120 },
    { title: "Skills", dataIndex: "skills", key: "skills", width: 250 },
    { title: "Expected Salary", dataIndex: "expectedSalary", key: "expectedSalary", width: 150 },
    { title: "Submitted On", dataIndex: "submittedOn", key: "submittedOn", width: 120 },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => {
        let color = "default";
        if (status === "Under Review") color = "blue";
        if (status === "Shortlisted") color = "green";
        if (status === "Interview Scheduled") color = "cyan";
        if (status === "Rejected") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: () => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">View Profile</Menu.Item>
              <Menu.Item key="2">Shortlist</Menu.Item>
              <Menu.Item key="3">Schedule Interview</Menu.Item>
              <Menu.Item key="4">Reject</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <MoreOutlined style={{ cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  const filteredData = usersData.filter((profile) => {
    const matchesSearch =
      profile.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      profile.profileId?.toLowerCase().includes(searchText.toLowerCase()) ||
      profile.jobTitle?.toLowerCase().includes(searchText.toLowerCase());

    const matchesJob = selectedJob === "all" || profile.jobId === selectedJob;
    const matchesStatus = selectedStatus === "all" || profile.status === selectedStatus;

    return matchesSearch && matchesJob && matchesStatus;
  });

  return (
    <SubmittedProfilesWrapper>
      <div style={{ padding: "20px" }}>
        <Title level={2} className="title-header">Submitted Profiles</Title>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          <Search
            placeholder="Search by name, profile ID, or job title"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "100%", maxWidth: "300px" }}
            allowClear
          />

          <Select
            placeholder="Filter by Job"
            value={selectedJob}
            onChange={setSelectedJob}
            style={{ width: 200 }}
          >
            <Option value="all">All Jobs</Option>
            <Option value="JOB001">JOB001 - React Developer</Option>
            <Option value="JOB002">JOB002 - DevOps Engineer</Option>
            <Option value="JOB003">JOB003 - Full Stack Developer</Option>
          </Select>

          <Select
            placeholder="Filter by Status"
            value={selectedStatus}
            onChange={setSelectedStatus}
            style={{ width: 200 }}
          >
            <Option value="all">All Status</Option>
            <Option value="Under Review">Under Review</Option>
            <Option value="Shortlisted">Shortlisted</Option>
            <Option value="Interview Scheduled">Interview Scheduled</Option>
            <Option value="Rejected">Rejected</Option>
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1800 }}
        />
      </div>
    </SubmittedProfilesWrapper>
  );
};

export default SubmittedProfiles;
