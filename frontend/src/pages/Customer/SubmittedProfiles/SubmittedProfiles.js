import React, { useState } from "react";
import { Table, Input, Tag, Dropdown, Select, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { 
  MoreOutlined, 
  SearchOutlined, 
  FilePdfOutlined,
  VideoCameraOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { SubmittedProfilesWrapper } from "./SubmittedProfiles.style";

const { Search } = Input;
const { Option } = Select;

const initialUsersData = [
  { key: "0", profileId: "PRF001", name: "Akshay Joshi", email: "akshay.joshi@techpro.com", contact: "+91-9876543210", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "5.2 years", skills: "SAP HANA, SQL, Data Modeling", expectedSalary: "₹75k", submittedOn: "25-Oct-24", status: "Under Review" },
  { key: "1", profileId: "PRF002", name: "Priya Sharma", email: "priya.sharma@webdev.com", contact: "+91-9876543211", jobId: "2930494", jobTitle: "React Frontend Developer", experience: "3.5 years", skills: "React, TypeScript, Redux", expectedSalary: "₹65k", submittedOn: "26-Oct-24", status: "Under Review" },
  { key: "2", profileId: "PRF003", name: "Vineet Malhotra", email: "vineet.m@datatech.com", contact: "+91-9876543212", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "5.8 years", skills: "SAP HANA, Data Modeling, SAP BW", expectedSalary: "₹80k", submittedOn: "27-Oct-24", status: "Interview Scheduled" },
  { key: "3", profileId: "PRF004", name: "Rohit Mehta", email: "rohit.mehta@pythondev.com", contact: "+91-9876543213", jobId: "2930496", jobTitle: "Python Backend Developer", experience: "2.5 years", skills: "Python, Django, PostgreSQL", expectedSalary: "₹58k", submittedOn: "24-Oct-24", status: "Rejected" },
  { key: "4", profileId: "PRF005", name: "Karthik Reddy", email: "karthik.r@cloudops.com", contact: "+91-9876543214", jobId: "2930495", jobTitle: "DevOps Engineer", experience: "6.0 years", skills: "Docker, Kubernetes, AWS", expectedSalary: "₹95k", submittedOn: "23-Oct-24", status: "Under Review" },
  { key: "5", profileId: "PRF006", name: "Neha Gupta", email: "neha.gupta@backend.com", contact: "+91-9876543215", jobId: "2930496", jobTitle: "Python Backend Developer", experience: "3.0 years", skills: "Python, Django, FastAPI", expectedSalary: "₹60k", submittedOn: "22-Oct-24", status: "Interview Scheduled" },
  { key: "6", profileId: "PRF007", name: "Amit Singh", email: "amit.singh@reactdev.com", contact: "+91-9876543216", jobId: "2930494", jobTitle: "React Frontend Developer", experience: "4.0 years", skills: "React, Redux, Node.js", expectedSalary: "₹70k", submittedOn: "21-Oct-24", status: "Interview Scheduled" },
  { key: "7", profileId: "PRF008", name: "Rajesh Kumar", email: "rajesh.k@sap.com", contact: "+91-9876543217", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "5.0 years", skills: "SAP HANA, SQL, ABAP", expectedSalary: "₹70k", submittedOn: "20-Oct-24", status: "Under Review" },
  { key: "8", profileId: "PRF009", name: "Sneha Patel", email: "sneha.patel@devops.com", contact: "+91-9876543218", jobId: "2930495", jobTitle: "DevOps Engineer", experience: "5.5 years", skills: "Jenkins, Docker, AWS", expectedSalary: "₹90k", submittedOn: "19-Oct-24", status: "Hired" },
  { key: "9", profileId: "PRF010", name: "Aditya Verma", email: "aditya.v@python.com", contact: "+91-9876543219", jobId: "2930496", jobTitle: "Python Backend Developer", experience: "2.8 years", skills: "Python, Flask, MongoDB", expectedSalary: "₹62k", submittedOn: "18-Oct-24", status: "Rejected" },
  { key: "10", profileId: "PRF011", name: "Meera Iyer", email: "meera.iyer@frontend.com", contact: "+91-9876543220", jobId: "2930494", jobTitle: "React Frontend Developer", experience: "3.2 years", skills: "React, JavaScript, CSS", expectedSalary: "₹60k", submittedOn: "17-Oct-24", status: "Under Review" },
  { key: "11", profileId: "PRF012", name: "Vikram Singh", email: "vikram.s@sap.tech", contact: "+91-9876543221", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "6.2 years", skills: "SAP HANA, Data Modeling", expectedSalary: "₹85k", submittedOn: "16-Oct-24", status: "Interview Scheduled" },
  { key: "12", profileId: "PRF013", name: "Pooja Nair", email: "pooja.nair@devops.io", contact: "+91-9876543222", jobId: "2930495", jobTitle: "DevOps Engineer", experience: "4.5 years", skills: "Kubernetes, Terraform, GCP", expectedSalary: "₹88k", submittedOn: "15-Oct-24", status: "Hired" },
  { key: "13", profileId: "PRF014", name: "Arjun Desai", email: "arjun.desai@python.dev", contact: "+91-9876543223", jobId: "2930496", jobTitle: "Python Backend Developer", experience: "3.5 years", skills: "Python, Django, REST API", expectedSalary: "₹68k", submittedOn: "14-Oct-24", status: "Under Review" },
  { key: "14", profileId: "PRF015", name: "Divya Krishnan", email: "divya.k@react.dev", contact: "+91-9876543224", jobId: "2930494", jobTitle: "React Frontend Developer", experience: "4.5 years", skills: "React, Next.js, TypeScript", expectedSalary: "₹75k", submittedOn: "13-Oct-24", status: "Rejected" },
  { key: "15", profileId: "PRF016", name: "Suresh Babu", email: "suresh.b@sap.expert", contact: "+91-9876543225", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "7.0 years", skills: "SAP HANA, SQL, SAP ERP", expectedSalary: "₹95k", submittedOn: "12-Oct-24", status: "Interview Scheduled" },
  { key: "16", profileId: "PRF017", name: "Lakshmi Menon", email: "lakshmi.m@cloud.tech", contact: "+91-9876543226", jobId: "2930495", jobTitle: "DevOps Engineer", experience: "5.0 years", skills: "Docker, Ansible, CI/CD", expectedSalary: "₹85k", submittedOn: "11-Oct-24", status: "Under Review" },
  { key: "17", profileId: "PRF018", name: "Rahul Sharma", email: "rahul.sharma@backend.pro", contact: "+91-9876543227", jobId: "2930496", jobTitle: "Python Backend Developer", experience: "4.2 years", skills: "Python, FastAPI, PostgreSQL", expectedSalary: "₹72k", submittedOn: "10-Oct-24", status: "Hired" },
  { key: "18", profileId: "PRF019", name: "Anjali Rao", email: "anjali.rao@ui.dev", contact: "+91-9876543228", jobId: "2930494", jobTitle: "React Frontend Developer", experience: "2.5 years", skills: "React, Redux, Material UI", expectedSalary: "₹55k", submittedOn: "09-Oct-24", status: "Under Review" },
  { key: "19", profileId: "PRF020", name: "Naveen Kumar", email: "naveen.k@sap.systems", contact: "+91-9876543229", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "5.5 years", skills: "SAP HANA, SQL, Business Intelligence", expectedSalary: "₹78k", submittedOn: "08-Oct-24", status: "Rejected" },
  { key: "20", profileId: "PRF021", name: "Deepa Thomas", email: "deepa.t@devops.cloud", contact: "+91-9876543230", jobId: "2930495", jobTitle: "DevOps Engineer", experience: "6.5 years", skills: "Kubernetes, Docker, Azure", expectedSalary: "₹98k", submittedOn: "07-Oct-24", status: "Interview Scheduled" },
  { key: "21", profileId: "PRF022", name: "Sandeep Pillai", email: "sandeep.p@python.expert", contact: "+91-9876543231", jobId: "2930496", jobTitle: "Python Backend Developer", experience: "3.8 years", skills: "Python, Django, Redis", expectedSalary: "₹65k", submittedOn: "06-Oct-24", status: "Under Review" },
  { key: "22", profileId: "PRF023", name: "Kavita Bhatt", email: "kavita.b@frontend.expert", contact: "+91-9876543232", jobId: "2930494", jobTitle: "React Frontend Developer", experience: "5.0 years", skills: "React, Node.js, GraphQL", expectedSalary: "₹80k", submittedOn: "05-Oct-24", status: "Under Review" },
  { key: "23", profileId: "PRF024", name: "Manoj Agarwal", email: "manoj.a@sap.consultant", contact: "+91-9876543233", jobId: "2930493", jobTitle: "SAP Hana Developer", experience: "8.0 years", skills: "SAP HANA, ABAP, Fiori", expectedSalary: "₹105k", submittedOn: "04-Oct-24", status: "Interview Scheduled" },
  { key: "24", profileId: "PRF025", name: "Reshma Joseph", email: "reshma.j@devops.masters", contact: "+91-9876543234", jobId: "2930495", jobTitle: "DevOps Engineer", experience: "4.8 years", skills: "Jenkins, Docker, Prometheus", expectedSalary: "₹82k", submittedOn: "03-Oct-24", status: "Rejected" },
];

const SubmittedProfiles = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [selectedJob, setSelectedJob] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [profiles, setProfiles] = useState(initialUsersData);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const handleScheduleInterview = (record) => {
    Modal.confirm({
      title: "Schedule Interview",
      icon: <VideoCameraOutlined style={{ color: "#1890ff" }} />,
      content: (
        <div>
          <p>Are you sure you want to schedule an interview for this candidate?</p>
          <div style={{ 
            marginTop: 12, 
            padding: 12, 
            background: "#f8f9fd", 
            borderRadius: 6 
          }}>
            <p style={{ margin: 0, fontWeight: 500 }}>{record.name}</p>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>{record.jobTitle}</p>
          </div>
        </div>
      ),
      okText: "Schedule Interview",
      okButtonProps: { 
        style: { background: "#00d9a9", borderColor: "#00d9a9" }
      },
      cancelText: "Cancel",
      onOk: () => {
        setProfiles(
          profiles.map((p) =>
            p.key === record.key 
              ? { ...p, previousStatus: p.status, status: "Interview Scheduled" } 
              : p
          )
        );
        message.success(`Interview scheduled for ${record.name}`);
      },
    });
  };

  const handleCancelInterview = (record) => {
    setSelectedProfile(record);
    setCancelReason("");
    setCancelModalVisible(true);
  };

  const handleSubmitCancelInterview = () => {
    if (!cancelReason.trim()) {
      message.warning("Please provide a reason for cancelling the interview");
      return;
    }

    setProfiles(
      profiles.map((p) =>
        p.key === selectedProfile.key 
          ? { ...p, status: p.previousStatus || "Under Review", previousStatus: undefined } 
          : p
      )
    );
    message.success(`Interview cancelled for ${selectedProfile.name}`);
    setCancelModalVisible(false);
    setSelectedProfile(null);
    setCancelReason("");
  };

  const handleHire = (record) => {
    Modal.confirm({
      title: "Hire Candidate",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      content: (
        <div>
          <p>Are you sure you want to hire this candidate?</p>
          <div style={{ 
            marginTop: 12, 
            padding: 12, 
            background: "#f6ffed", 
            borderRadius: 6,
            border: "1px solid #b7eb8f"
          }}>
            <p style={{ margin: 0, fontWeight: 500 }}>{record.name}</p>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>{record.jobTitle}</p>
            <p style={{ margin: "4px 0 0", color: "#52c41a", fontSize: 13 }}>Expected: {record.expectedSalary}/month</p>
          </div>
        </div>
      ),
      okText: "Hire",
      okButtonProps: { style: { background: "#52c41a", borderColor: "#52c41a" } },
      cancelText: "Cancel",
      onOk: () => {
        setProfiles(
          profiles.map((p) =>
            p.key === record.key ? { ...p, status: "Hired" } : p
          )
        );
        message.success(`${record.name} has been hired successfully`);
      },
    });
  };

  const handleReject = (record) => {
    Modal.confirm({
      title: "Reject Candidate",
      icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
      content: (
        <div>
          <p>Are you sure you want to reject this candidate?</p>
          <div style={{ 
            marginTop: 12, 
            padding: 12, 
            background: "#fff2f0", 
            borderRadius: 6,
            border: "1px solid #ffccc7"
          }}>
            <p style={{ margin: 0, fontWeight: 500 }}>{record.name}</p>
            <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>{record.jobTitle}</p>
          </div>
        </div>
      ),
      okText: "Reject",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      onOk: () => {
        setProfiles(
          profiles.map((p) =>
            p.key === record.key ? { ...p, status: "Rejected" } : p
          )
        );
        message.success(`${record.name} has been rejected`);
      },
    });
  };

  const handleViewResume = (record) => {
    message.info(`Opening resume for ${record.name}...`);
  };

  const getActionMenuItems = (record) => {
    const items = [];

    items.push({
      key: "resume",
      label: "View Resume",
      icon: <FilePdfOutlined />,
      onClick: () => handleViewResume(record),
    });

    if (record.status === "Under Review") {
      items.push(
        { type: "divider" },
        {
          key: "interview",
          label: "Schedule Interview",
          icon: <VideoCameraOutlined />,
          onClick: () => handleScheduleInterview(record),
        },
        {
          key: "hire",
          label: "Hire",
          icon: <CheckCircleOutlined />,
          onClick: () => handleHire(record),
        },
        {
          key: "reject",
          label: "Reject",
          icon: <CloseCircleOutlined />,
          danger: true,
          onClick: () => handleReject(record),
        }
      );
    } else if (record.status === "Interview Scheduled") {
      items.push(
        { type: "divider" },
        {
          key: "cancel",
          label: "Cancel Interview",
          icon: <StopOutlined />,
          danger: true,
          onClick: () => handleCancelInterview(record),
        },
        {
          key: "hire",
          label: "Hire",
          icon: <CheckCircleOutlined />,
          onClick: () => handleHire(record),
        },
        {
          key: "reject",
          label: "Reject",
          icon: <CloseCircleOutlined />,
          danger: true,
          onClick: () => handleReject(record),
        }
      );
    }

    return items;
  };

  const columns = [
    { 
      title: "Name", 
      dataIndex: "name", 
      key: "name", 
      width: 150,
      fixed: "left",
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
        if (status === "Interview Scheduled") color = "orange";
        if (status === "Hired") color = "green";
        if (status === "Rejected") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      fixed: "right",
      render: (_, record) => (
        <Dropdown
          menu={{ items: getActionMenuItems(record) }}
          trigger={["click"]}
        >
          <MoreOutlined style={{ cursor: "pointer", fontSize: 18 }} />
        </Dropdown>
      ),
    },
  ];

  const filteredData = profiles.filter((profile) => {
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
      <h2>Submitted Profiles</h2>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
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
          <Option value="Interview Scheduled">Interview Scheduled</Option>
          <Option value="Hired">Hired</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1600 }}
      />

      <Modal
        title="Cancel Interview"
        open={cancelModalVisible}
        onOk={handleSubmitCancelInterview}
        onCancel={() => {
          setCancelModalVisible(false);
          setSelectedProfile(null);
          setCancelReason("");
        }}
        okText="Cancel Interview"
        okButtonProps={{ danger: true }}
        cancelText="Go Back"
      >
        {selectedProfile && (
          <div>
            <div
              style={{
                marginBottom: 16,
                padding: 12,
                background: "#f8f9fd",
                borderRadius: 6,
              }}
            >
              <p style={{ margin: 0, fontWeight: 500 }}>{selectedProfile.name}</p>
              <p style={{ margin: "4px 0 0", color: "#666", fontSize: 13 }}>
                {selectedProfile.jobTitle}
              </p>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  color: "#014c75",
                  fontWeight: 500,
                }}
              >
                Reason for Cancellation *
              </label>
              <Input.TextArea
                rows={4}
                placeholder="Please provide a reason for cancelling the interview..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </div>
          </div>
        )}
      </Modal>
    </SubmittedProfilesWrapper>
  );
};

export default SubmittedProfiles;
