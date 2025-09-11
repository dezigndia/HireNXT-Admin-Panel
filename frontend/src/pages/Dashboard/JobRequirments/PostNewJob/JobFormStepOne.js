import React, { useEffect } from "react";
import { Row, Col, Select, Typography } from "antd";

const { Title } = Typography;

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Engineer",
];
const experienceRanges = [
  "1 to 5 years",
  "5 to 10 years",
  "10 to 15 years",
  "15+ years",
];
const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "MongoDB",
  "AWS",
  "Docker",
];
const expertiseLevels = ["Beginner", "Intermediate", "Expert"];

const JobFormStepOne = ({ formData, onChange, setIsValid }) => {
  const handlePrimarySkillChange = (index, key, value) => {
    const updated = [...formData.primarySkills];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };
    onChange("primarySkills", updated);
  };

  useEffect(() => {
    const isValid =
      formData.role &&
      formData.experienceRange &&
      formData.primarySkills[0]?.skill &&
      formData.primarySkills[0]?.level &&
      formData.primarySkills[1]?.skill &&
      formData.primarySkills[1]?.level &&
      formData.secondarySkills?.length > 0;

    setIsValid(isValid);
  }, [formData, setIsValid]);

  return (
    <>
      {/* First Row - Role & Experience */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <label>Role</label>
          <Select
            placeholder="Select Role"
            style={{ width: "100%" }}
            options={roles.map((r) => ({ label: r, value: r }))}
            onChange={(value) => onChange("role", value)}
            value={formData.role}
          />
        </Col>
        <Col span={6}>
          <label>Relevant Experience Range</label>
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

      {/* Second Row - Primary Skills with Levels */}
      <Title level={5} style={{ marginTop: 24 }}>
        Primary Skills
      </Title>
      <Row gutter={[16, 16]}>
        {[0, 1].map((index) => (
          <React.Fragment key={`primary-skill-${index}`}>
            <Col span={6}>
              <label>Primary Skill {index + 1}</label>
              <Select
                placeholder="Select Skill"
                style={{ width: "100%" }}
                options={skills.map((s) => ({ label: s, value: s }))}
                value={formData.primarySkills[index]?.skill}
                onChange={(value) =>
                  handlePrimarySkillChange(index, "skill", value)
                }
              />
            </Col>
            <Col span={6}>
              <label>Expertise Level</label>
              <Select
                placeholder="Select Level"
                style={{ width: "100%" }}
                options={expertiseLevels.map((l) => ({ label: l, value: l }))}
                value={formData.primarySkills[index]?.level}
                onChange={(value) =>
                  handlePrimarySkillChange(index, "level", value)
                }
              />
            </Col>
          </React.Fragment>
        ))}
      </Row>

      {/* Third Row - Secondary Skills */}
      <Title level={5} style={{ marginTop: 24 }}>
        Secondary Skills
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <label>Select Secondary Skills</label>
          <Select
            mode="multiple"
            placeholder="Select Secondary Skills"
            style={{ width: "100%" }}
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
