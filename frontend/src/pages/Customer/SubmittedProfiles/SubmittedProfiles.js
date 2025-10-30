import React, { useState } from "react";
import { Table, Input, Tag, Typography, Dropdown, Menu, Select, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { MoreOutlined, SearchOutlined, FilePdfOutlined } from "@ant-design/icons";
import { SubmittedProfilesWrapper } from "./SubmittedProfiles.style";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const usersData = [
  { key: "0", profileId: "PRF001", name: "Akshay Joshi", email: "akshay.joshi@techpro.com", contact: "+91-9876543210", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "5.2 years", skills: "SAP HANA, SQL, Data Modeling", expectedSalary: "₹75k", submittedOn: "25-Oct-24", status: "Under Review" },
  { key: "1", profileId: "PRF002", name: "Priya Sharma", email: "priya.sharma@webdev.com", contact: "+91-9876543211", jobId: "2930494", jobTitle: "React Frontend Developer", experience: "3.5 years", skills: "React, TypeScript, Redux", expectedSalary: "₹65k", submittedOn: "26-Oct-24", status: "Shortlisted" },
  { key: "2", profileId: "PRF003", name: "Vineet Malhotra", email: "vineet.m@datatech.com", contact: "+91-9876543212", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "5.8 years", skills: "SAP HANA, Data Modeling, SAP BW", expectedSalary: "₹80k", submittedOn: "27-Oct-24", status: "Interview Scheduled" },
  { key: "3", profileId: "PRF004", name: "Rohit Mehta", email: "rohit.mehta@pythondev.com", contact: "+91-9876543213", jobId: "2930496", jobTitle: "Python Backend Developer", experience: "2.5 years", skills: "Python, Django, PostgreSQL", expectedSalary: "₹58k", submittedOn: "24-Oct-24", status: "Rejected" },
  { key: "4", profileId: "PRF005", name: "Karthik Reddy", email: "karthik.r@cloudops.com", contact: "+91-9876543214", jobId: "2930495", jobTitle: "DevOps Engineer", experience: "6.0 years", skills: "Docker, Kubernetes, AWS", expectedSalary: "₹95k", submittedOn: "23-Oct-24", status: "Under Review" },
  { key: "5", profileId: "PRF006", name: "Neha Gupta", email: "neha.gupta@backend.com", contact: "+91-9876543215", jobId: "2930496", jobTitle: "Python Backend Developer", experience: "3.0 years", skills: "Python, Django, FastAPI", expectedSalary: "₹60k", submittedOn: "22-Oct-24", status: "Shortlisted" },
  { key: "6", profileId: "PRF007", name: "Amit Singh", email: "amit.singh@reactdev.com", contact: "+91-9876543216", jobId: "2930494", jobTitle: "React Frontend Developer", experience: "4.0 years", skills: "React, Redux, Node.js", expectedSalary: "₹70k", submittedOn: "21-Oct-24", status: "Interview Scheduled" },
  { key: "7", profileId: "PRF008", name: "Rajesh Kumar", email: "rajesh.k@sap.com", contact: "+91-9876543217", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "5.0 years", skills: "SAP HANA, SQL, ABAP", expectedSalary: "₹70k", submittedOn: "20-Oct-24", status: "Under Review" },
  { key: "8", profileId: "PRF009", name: "Sneha Patel", email: "sneha.patel@devops.com", contact: "+91-9876543218", jobId: "2930495", jobTitle: "DevOps Engineer", experience: "5.5 years", skills: "Jenkins, Docker, AWS", expectedSalary: "₹90k", submittedOn: "19-Oct-24", status: "Shortlisted" },
  { key: "9", profileId: "PRF010", name: "Aditya Verma", email: "aditya.v@python.com", contact: "+91-9876543219", jobId: "2930496", jobTitle: "Python Backend Developer", experience: "2.8 years", skills: "Python, Flask, MongoDB", expectedSalary: "₹62k", submittedOn: "18-Oct-24", status: "Rejected" },
  { key: "10", profileId: "PRF011", name: "Meera Iyer", email: "meera.iyer@frontend.com", contact: "+91-9876543220", jobId: "2930494", jobTitle: "React Frontend Developer", experience: "3.2 years", skills: "React, JavaScript, CSS", expectedSalary: "₹60k", submittedOn: "17-Oct-24", status: "Under Review" },
  { key: "11", profileId: "PRF012", name: "Vikram Singh", email: "vikram.s@sap.tech", contact: "+91-9876543221", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "6.2 years", skills: "SAP HANA, Data Modeling", expectedSalary: "₹85k", submittedOn: "16-Oct-24", status: "Interview Scheduled" },
  { key: "12", profileId: "PRF013", name: "Pooja Nair", email: "pooja.nair@devops.io", contact: "+91-9876543222", jobId: "2930495", jobTitle: "DevOps Engineer", experience: "4.5 years", skills: "Kubernetes, Terraform, GCP", expectedSalary: "₹88k", submittedOn: "15-Oct-24", status: "Shortlisted" },
  { key: "13", profileId: "PRF014", name: "Arjun Desai", email: "arjun.desai@python.dev", contact: "+91-9876543223", jobId: "2930496", jobTitle: "Python Backend Developer", experience: "3.5 years", skills: "Python, Django, REST API", expectedSalary: "₹68k", submittedOn: "14-Oct-24", status: "Under Review" },
  { key: "14", profileId: "PRF015", name: "Divya Krishnan", email: "divya.k@react.dev", contact: "+91-9876543224", jobId: "2930494", jobTitle: "React Frontend Developer", experience: "4.5 years", skills: "React, Next.js, TypeScript", expectedSalary: "₹75k", submittedOn: "13-Oct-24", status: "Rejected" },
  { key: "15", profileId: "PRF016", name: "Suresh Babu", email: "suresh.b@sap.expert", contact: "+91-9876543225", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "7.0 years", skills: "SAP HANA, SQL, SAP ERP", expectedSalary: "₹95k", submittedOn: "12-Oct-24", status: "Interview Scheduled" },
  { key: "16", profileId: "PRF017", name: "Lakshmi Menon", email: "lakshmi.m@cloud.tech", contact: "+91-9876543226", jobId: "2930495", jobTitle: "DevOps Engineer", experience: "5.0 years", skills: "Docker, Ansible, CI/CD", expectedSalary: "₹85k", submittedOn: "11-Oct-24", status: "Under Review" },
  { key: "17", profileId: "PRF018", name: "Rahul Sharma", email: "rahul.sharma@backend.pro", contact: "+91-9876543227", jobId: "2930496", jobTitle: "Python Backend Developer", experience: "4.2 years", skills: "Python, FastAPI, PostgreSQL", expectedSalary: "₹72k", submittedOn: "10-Oct-24", status: "Shortlisted" },
  { key: "18", profileId: "PRF019", name: "Anjali Rao", email: "anjali.rao@ui.dev", contact: "+91-9876543228", jobId: "2930494", jobTitle: "React Frontend Developer", experience: "2.5 years", skills: "React, Redux, Material UI", expectedSalary: "₹55k", submittedOn: "09-Oct-24", status: "Under Review" },
  { key: "19", profileId: "PRF020", name: "Naveen Kumar", email: "naveen.k@sap.systems", contact: "+91-9876543229", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "5.5 years", skills: "SAP HANA, SQL, Business Intelligence", expectedSalary: "₹78k", submittedOn: "08-Oct-24", status: "Rejected" },
  { key: "20", profileId: "PRF021", name: "Deepa Thomas", email: "deepa.t@devops.cloud", contact: "+91-9876543230", jobId: "2930495", jobTitle: "DevOps Engineer", experience: "6.5 years", skills: "Kubernetes, Docker, Azure", expectedSalary: "₹98k", submittedOn: "07-Oct-24", status: "Interview Scheduled" },
  { key: "21", profileId: "PRF022", name: "Sandeep Pillai", email: "sandeep.p@python.expert", contact: "+91-9876543231", jobId: "2930496", jobTitle: "Python Backend Developer", experience: "3.8 years", skills: "Python, Django, Redis", expectedSalary: "₹65k", submittedOn: "06-Oct-24", status: "Shortlisted" },
  { key: "22", profileId: "PRF023", name: "Kavita Bhatt", email: "kavita.b@frontend.expert", contact: "+91-9876543232", jobId: "2930494", jobTitle: "React Frontend Developer", experience: "5.0 years", skills: "React, Node.js, GraphQL", expectedSalary: "₹80k", submittedOn: "05-Oct-24", status: "Under Review" },
  { key: "23", profileId: "PRF024", name: "Manoj Agarwal", email: "manoj.a@sap.consultant", contact: "+91-9876543233", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "8.0 years", skills: "SAP HANA, ABAP, Fiori", expectedSalary: "₹105k", submittedOn: "04-Oct-24", status: "Interview Scheduled" },
  { key: "24", profileId: "PRF025", name: "Reshma Joseph", email: "reshma.j@devops.masters", contact: "+91-9876543234", jobId: "2930495", jobTitle: "DevOps Engineer", experience: "4.8 years", skills: "Jenkins, Docker, Prometheus", expectedSalary: "₹82k", submittedOn: "03-Oct-24", status: "Rejected" },
];

const SubmittedProfiles = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [selectedJob, setSelectedJob] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const columns = [
    { title: "Profile ID", dataIndex: "profileId", key: "profileId", width: 120 },
    { 
      title: "Name", 
      dataIndex: "name", 
      key: "name", 
      width: 150,
      render: (text, record) => (
        <a 
          href="#" 
          style={{ color: "#1890ff", fontWeight: 500 }}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/customer/talent-details/${record.key}`);
          }}
        >
          {text}
        </a>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email", width: 200 },
    { title: "Contact", dataIndex: "contact", key: "contact", width: 150 },
    { title: "Job ID", dataIndex: "jobId", key: "jobId", width: 100 },
    { 
      title: "Job Title", 
      dataIndex: "jobTitle", 
      key: "jobTitle", 
      width: 200,
      render: (text, record) => (
        <a 
          href="#" 
          style={{ color: "#1890ff" }}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/customer/my-jobs/${record.jobId}`);
          }}
        >
          {text}
        </a>
      ),
    },
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
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: "View Profile",
                onClick: () => navigate(`/customer/talent-details/${record.key}`),
              },
              {
                key: "resume",
                label: "View Resume",
                icon: <FilePdfOutlined />,
              },
              {
                key: "interview",
                label: "Schedule Interview",
              },
              {
                key: "reject",
                label: "Reject",
                danger: true,
              },
            ],
          }}
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
            <Option value="2930493">2930493 - SAP Hana Developer</Option>
            <Option value="2930494">2930494 - React Developer</Option>
            <Option value="2930495">2930495 - DevOps Engineer</Option>
            <Option value="2930496">2930496 - Python Developer</Option>
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
