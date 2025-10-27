import React from "react";
import { Form, Select, Button, Row, Col } from "antd";

const { Option } = Select;

const SkillRequired = ({ initialData, onNext, isFirstStep }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onNext(values);
  };

  const roleOptions = [
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

  const skillOptions = [
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

  const expertiseLevels = ["Expert", "Advanced", "Intermediate"];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialData}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select
              placeholder="Search Developer Role"
              showSearch
              filterOption={(input, option) =>
                (option?.children || "").toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {roleOptions.map((role) => (
                <Option key={role} value={role}>
                  {role}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="experienceRange"
            label="Relevant Experience Range"
            rules={[
              { required: true, message: "Please select experience range" },
            ]}
          >
            <Select placeholder="1-2 Years">
              {experienceRanges.map((range) => (
                <Option key={range} value={range}>
                  {range}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Primary Skills" required>
        <div className="skill-row">
          <Form.Item
            name={["primarySkills", 0, "skill"]}
            rules={[
              { required: true, message: "Please select primary skill 1" },
            ]}
            noStyle
          >
            <Select placeholder="Select primary skill : 1" showSearch>
              {skillOptions.map((skill) => (
                <Option key={skill} value={skill}>
                  {skill}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={["primarySkills", 0, "level"]}
            rules={[{ required: true, message: "Select level" }]}
            noStyle
          >
            <Select placeholder="Expert" className="expertise-select">
              {expertiseLevels.map((level) => (
                <Option key={level} value={level}>
                  {level}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="skill-row">
          <Form.Item name={["primarySkills", 1, "skill"]} noStyle>
            <Select placeholder="Select primary skill : 2" showSearch>
              {skillOptions.map((skill) => (
                <Option key={skill} value={skill}>
                  {skill}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={["primarySkills", 1, "level"]} noStyle>
            <Select placeholder="Expert" className="expertise-select">
              {expertiseLevels.map((level) => (
                <Option key={level} value={level}>
                  {level}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form.Item>

      <Form.Item
        name="secondarySkills"
        label="Secondary Skills"
        rules={[
          { required: true, message: "Please select at least one skill" },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Select secondary skills"
          showSearch
          allowClear
        >
          {skillOptions.map((skill) => (
            <Option key={skill} value={skill}>
              {skill}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <div className="form-actions">
        <Button type="primary" htmlType="submit" size="large">
          Save & Next
        </Button>
      </div>
    </Form>
  );
};

export default SkillRequired;
