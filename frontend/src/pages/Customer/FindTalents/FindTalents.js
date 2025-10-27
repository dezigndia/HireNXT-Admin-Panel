import React, { useState } from "react";
import {
  Input,
  Select,
  Button,
  Card,
  Avatar,
  Tag,
  Modal,
  Row,
  Col,
  Space,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { FindTalentsWrapper } from "./FindTalents.style";

const { Option } = Select;

const mockTalents = [
  {
    id: 1,
    name: "John Arora",
    location: "Kolkata, India",
    experience: 5,
    role: "Full Stack Developer",
    hourlyRate: "₹ 1,50,000",
    skills: ["PHP", "NodeJs", "React", "HTML"],
    avatar: null,
  },
  {
    id: 2,
    name: "Rohit Malhotra",
    location: "Hyderabad, India",
    experience: 7,
    role: "Django Developer",
    hourlyRate: "₹ 2,50,000",
    skills: ["Python", "Java", "Angular", "HTML"],
    avatar: null,
  },
  {
    id: 3,
    name: "Tuhin Acharyaa Bose",
    location: "Kolkata, India",
    experience: 10,
    role: "MERN Stack Developer",
    hourlyRate: "₹ 3,50,000",
    skills: ["React", "NodeJs", "MongoDB", "HTML"],
    avatar: null,
  },
  {
    id: 4,
    name: "Himanshu Mishra Khandelwal",
    location: "Kolkata, India",
    experience: 3,
    role: "Front End Developer",
    hourlyRate: "₹ 1,20,000",
    skills: ["React", "HTML", "JavaScript", "CSS"],
    avatar: null,
  },
];

const FindTalents = () => {
  const [searchText, setSearchText] = useState("");
  const [primaryRole, setPrimaryRole] = useState(null);
  const [seniority, setSeniority] = useState(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filterValues, setFilterValues] = useState({
    secondaryTech: [],
    location: null,
    mode: null,
  });

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleViewDetails = (talent) => {
    console.log("View details:", talent);
  };

  const handleScheduleInterview = (talent) => {
    console.log("Schedule interview:", talent);
  };

  const showFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const handleFilterOk = () => {
    setIsFilterModalVisible(false);
  };

  const handleFilterCancel = () => {
    setIsFilterModalVisible(false);
  };

  const filteredTalents = mockTalents.filter((talent) => {
    if (searchText && !talent.name.toLowerCase().includes(searchText.toLowerCase())) {
      return false;
    }
    if (primaryRole && !talent.role.toLowerCase().includes(primaryRole.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <FindTalentsWrapper>
      <div className="header">
        <h2>Find Talents</h2>
        <p className="total-count">Total Talents ({mockTalents.length})</p>
      </div>

      <div className="filter-section">
        <Input
          placeholder="Search Talents by role"
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />

        <Select
          placeholder="Priority Role"
          style={{ width: 200 }}
          onChange={setPrimaryRole}
          allowClear
        >
          <Option value="full-stack">Full Stack Developer</Option>
          <Option value="frontend">Front End Developer</Option>
          <Option value="backend">Backend Developer</Option>
          <Option value="django">Django Developer</Option>
          <Option value="mern">MERN Stack Developer</Option>
        </Select>

        <Select
          placeholder="Seniority"
          style={{ width: 150 }}
          onChange={setSeniority}
          allowClear
        >
          <Option value="junior">Junior (0-2 years)</Option>
          <Option value="mid">Mid (3-5 years)</Option>
          <Option value="senior">Senior (6-10 years)</Option>
          <Option value="lead">Lead (10+ years)</Option>
        </Select>

        <Button
          icon={<FilterOutlined />}
          onClick={showFilterModal}
          className="all-filters-btn"
        >
          All Filters
        </Button>
      </div>

      <Row gutter={[16, 16]} className="talents-grid">
        {filteredTalents.map((talent) => (
          <Col xs={24} sm={12} md={8} lg={6} key={talent.id}>
            <Card className="talent-card" hoverable>
              <div className="talent-header">
                <Avatar size={48} className="talent-avatar">
                  {talent.name.charAt(0)}
                </Avatar>
                <div className="talent-info">
                  <h4 className="talent-name">{talent.name}</h4>
                  <p className="talent-location">
                    <EnvironmentOutlined /> {talent.location}
                  </p>
                </div>
              </div>

              <div className="talent-details">
                <p className="experience">Experience: {talent.experience} Years</p>
                <h3 className="role">{talent.role}</h3>
                <p className="rate-label">Hourly Rate</p>
                <h3 className="rate">{talent.hourlyRate}</h3>
              </div>

              <div className="skills-section">
                <p className="skills-label">Top Skills</p>
                <div className="skills-tags">
                  {talent.skills.map((skill, index) => (
                    <Tag key={index} color="cyan">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <Button
                  type="primary"
                  block
                  onClick={() => handleViewDetails(talent)}
                  className="view-details-btn"
                >
                  View Details
                </Button>
                <Button
                  block
                  onClick={() => handleScheduleInterview(talent)}
                  className="schedule-btn"
                >
                  Schedule Interview
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="All Filters"
        open={isFilterModalVisible}
        onOk={handleFilterOk}
        onCancel={handleFilterCancel}
        width={600}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <div>
            <label>Secondary Tech</label>
            <Select
              mode="multiple"
              placeholder="Select technologies"
              style={{ width: "100%", marginTop: 8 }}
              onChange={(values) =>
                setFilterValues({ ...filterValues, secondaryTech: values })
              }
            >
              <Option value="javascript">JavaScript</Option>
              <Option value="typescript">TypeScript</Option>
              <Option value="python">Python</Option>
              <Option value="java">Java</Option>
              <Option value="dotnet">.NET</Option>
              <Option value="go">Go</Option>
              <Option value="rust">Rust</Option>
            </Select>
          </div>

          <div>
            <label>Location</label>
            <Select
              placeholder="Select location"
              style={{ width: "100%", marginTop: 8 }}
              onChange={(value) =>
                setFilterValues({ ...filterValues, location: value })
              }
            >
              <Option value="bangalore">Bangalore</Option>
              <Option value="hyderabad">Hyderabad</Option>
              <Option value="kolkata">Kolkata</Option>
              <Option value="delhi">Delhi</Option>
              <Option value="mumbai">Mumbai</Option>
              <Option value="pune">Pune</Option>
            </Select>
          </div>

          <div>
            <label>Mode</label>
            <Select
              placeholder="Select work mode"
              style={{ width: "100%", marginTop: 8 }}
              onChange={(value) =>
                setFilterValues({ ...filterValues, mode: value })
              }
            >
              <Option value="remote">Remote</Option>
              <Option value="hybrid">Hybrid</Option>
              <Option value="in-office">In-Office</Option>
            </Select>
          </div>
        </Space>
      </Modal>
    </FindTalentsWrapper>
  );
};

export default FindTalents;
