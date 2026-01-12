import React, { useEffect } from "react";
import { Row, Col, Select, Typography } from "antd";

const { Title } = Typography;

const roles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Data Scientist",
  "Mobile Developer",
  "QA Engineer",
  "SAP HANA Developer",
  "Python Developer",
  "React Developer",
  "Node.js Developer",
  "Java Developer",
];

const experienceRanges = [
  "0-1 Years",
  "1-2 Years",
  "2-3 Years",
  "3-5 Years",
  "5-7 Years",
  "7-10 Years",
  "10+ Years",
];

const skills = [
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "Java",
  "Spring Boot",
  "PHP",
  "JavaScript",
  "TypeScript",
  "HTML/CSS",
  "SAP HANA",
  "SQL",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "Git",
  "CI/CD",
  "Agile",
  "Scrum",
];

const JobFormStepOne = ({ formData, onChange, setIsValid }) => {
  useEffect(() => {
    const isValid =
      formData.role &&
      formData.experienceRange &&
      formData.primarySkills[0] &&
      formData.secondarySkills?.length > 0;

    setIsValid(isValid);
  }, [formData, setIsValid]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <label>Role *</label>
          <Select
            placeholder="Search Developer Role"
            style={{ width: "100%" }}
            showSearch
            filterOption={(input, option) =>
              (option?.label || "").toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            options={roles.map((r) => ({ label: r, value: r }))}
            onChange={(value) => onChange("role", value)}
            value={formData.role}
          />
        </Col>
        <Col span={12}>
          <label>Relevant Experience Range *</label>
          <Select
            placeholder="Select Experience Range"
            style={{ width: "100%" }}
            options={experienceRanges.map((exp) => ({
              label: exp,
              value: exp,
            }))}
            onChange={(value) => onChange("experienceRange", value)}
            value={formData.experienceRange}
          />
        </Col>
      </Row>

      <Title level={5} style={{ marginTop: 24, marginBottom: 12 }}>
        Primary Skills *
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Select
            placeholder="Select primary skill : 1"
            style={{ width: "100%" }}
            showSearch
            options={skills.map((s) => ({ label: s, value: s }))}
            value={formData.primarySkills[0]}
            onChange={(value) => {
              const updated = [...formData.primarySkills];
              updated[0] = value;
              onChange("primarySkills", updated);
            }}
          />
        </Col>
        <Col span={8}>
          <Select
            placeholder="Select primary skill : 2"
            style={{ width: "100%" }}
            showSearch
            options={skills.map((s) => ({ label: s, value: s }))}
            value={formData.primarySkills[1]}
            onChange={(value) => {
              const updated = [...formData.primarySkills];
              updated[1] = value;
              onChange("primarySkills", updated);
            }}
          />
        </Col>
        <Col span={8}>
          <Select
            placeholder="Select primary skill : 3"
            style={{ width: "100%" }}
            showSearch
            options={skills.map((s) => ({ label: s, value: s }))}
            value={formData.primarySkills[2]}
            onChange={(value) => {
              const updated = [...formData.primarySkills];
              updated[2] = value;
              onChange("primarySkills", updated);
            }}
          />
        </Col>
      </Row>

      <Title level={5} style={{ marginTop: 24, marginBottom: 12 }}>
        Secondary Skills *
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Select
            mode="multiple"
            placeholder="Select secondary skills"
            style={{ width: "100%", minHeight: 60 }}
            options={skills.map((s) => ({ label: s, value: s }))}
            value={formData.secondarySkills}
            onChange={(value) => onChange("secondarySkills", value)}
          />
        </Col>
      </Row>
    </>
  );
};

export default JobFormStepOne;
