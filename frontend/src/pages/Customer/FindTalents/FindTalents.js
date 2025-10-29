import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    monthlyRate: "₹ 1,50,000",
    skills: ["PHP", "NodeJs", "React", "HTML"],
    avatar: null,
  },
  {
    id: 2,
    name: "Rohit Malhotra",
    location: "Hyderabad, India",
    experience: 7,
    role: "Django Developer",
    monthlyRate: "₹ 2,50,000",
    skills: ["Python", "Java", "Angular", "HTML"],
    avatar: null,
  },
  {
    id: 3,
    name: "Tuhin Acharyaa Bose",
    location: "Kolkata, India",
    experience: 10,
    role: "MERN Stack Developer",
    monthlyRate: "₹ 3,50,000",
    skills: ["React", "NodeJs", "MongoDB", "HTML"],
    avatar: null,
  },
  {
    id: 4,
    name: "Himanshu Mishra Khandelwal",
    location: "Kolkata, India",
    experience: 3,
    role: "Front End Developer",
    monthlyRate: "₹ 1,20,000",
    skills: ["React", "HTML", "JavaScript", "CSS"],
    avatar: null,
  },
  {
    id: 5,
    name: "Priya Sharma",
    location: "Bangalore, India",
    experience: 6,
    role: "Full Stack Developer",
    monthlyRate: "₹ 1,80,000",
    skills: ["NodeJs", "React", "MongoDB", "Express"],
    avatar: null,
  },
  {
    id: 6,
    name: "Amit Kumar",
    location: "Delhi, India",
    experience: 8,
    role: "Backend Developer",
    monthlyRate: "₹ 2,00,000",
    skills: ["Java", "Spring", "MySQL", "AWS"],
    avatar: null,
  },
  {
    id: 7,
    name: "Sneha Patel",
    location: "Mumbai, India",
    experience: 4,
    role: "UI/UX Developer",
    monthlyRate: "₹ 1,40,000",
    skills: ["Figma", "React", "CSS", "JavaScript"],
    avatar: null,
  },
  {
    id: 8,
    name: "Rahul Verma",
    location: "Pune, India",
    experience: 9,
    role: "DevOps Engineer",
    monthlyRate: "₹ 2,80,000",
    skills: ["Docker", "Kubernetes", "Jenkins", "AWS"],
    avatar: null,
  },
];

const FindTalents = () => {
  const navigate = useNavigate();
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
    navigate(`/customer/talent-details/${talent.id}`);
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
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      const matchesName = talent.name.toLowerCase().includes(searchLower);
      const matchesRole = talent.role.toLowerCase().includes(searchLower);
      if (!matchesName && !matchesRole) {
        return false;
      }
    }

    if (primaryRole && !talent.role.toLowerCase().includes(primaryRole.toLowerCase())) {
      return false;
    }

    if (seniority) {
      const exp = talent.experience;
      if (seniority === "junior" && (exp < 0 || exp > 2)) return false;
      if (seniority === "mid" && (exp < 3 || exp > 5)) return false;
      if (seniority === "senior" && (exp < 6 || exp > 10)) return false;
      if (seniority === "lead" && exp < 10) return false;
    }

    if (filterValues.secondaryTech && filterValues.secondaryTech.length > 0) {
      const hasMatchingTech = filterValues.secondaryTech.some((tech) =>
        talent.skills.some((skill) => skill.toLowerCase().includes(tech.toLowerCase()))
      );
      if (!hasMatchingTech) return false;
    }

    if (filterValues.location) {
      if (!talent.location.toLowerCase().includes(filterValues.location.toLowerCase())) {
        return false;
      }
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
          <Option value="full stack">Full Stack Developer</Option>
          <Option value="front end">Front End Developer</Option>
          <Option value="backend">Backend Developer</Option>
          <Option value="django">Django Developer</Option>
          <Option value="mern">MERN Stack Developer</Option>
          <Option value="devops">DevOps Engineer</Option>
          <Option value="ui/ux">UI/UX Developer</Option>
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
                <p className="rate-label">Monthly Rate</p>
                <h3 className="rate">{talent.monthlyRate}</h3>
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
              value={filterValues.secondaryTech}
              onChange={(values) =>
                setFilterValues({ ...filterValues, secondaryTech: values })
              }
            >
              <Option value="react">React</Option>
              <Option value="nodejs">NodeJs</Option>
              <Option value="python">Python</Option>
              <Option value="java">Java</Option>
              <Option value="angular">Angular</Option>
              <Option value="php">PHP</Option>
              <Option value="mongodb">MongoDB</Option>
              <Option value="html">HTML</Option>
              <Option value="css">CSS</Option>
              <Option value="javascript">JavaScript</Option>
              <Option value="docker">Docker</Option>
              <Option value="kubernetes">Kubernetes</Option>
              <Option value="aws">AWS</Option>
              <Option value="spring">Spring</Option>
              <Option value="mysql">MySQL</Option>
            </Select>
          </div>

          <div>
            <label>Location</label>
            <Select
              placeholder="Select location"
              style={{ width: "100%", marginTop: 8 }}
              value={filterValues.location}
              onChange={(value) =>
                setFilterValues({ ...filterValues, location: value })
              }
              allowClear
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
              value={filterValues.mode}
              onChange={(value) =>
                setFilterValues({ ...filterValues, mode: value })
              }
              allowClear
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
