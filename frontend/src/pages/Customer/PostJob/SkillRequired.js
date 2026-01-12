import React from "react";
import { Form, Select, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const SkillRequired = ({ initialData, onNext }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onNext(values);
  };

  const handleCancel = () => {
    Modal.confirm({
      title: "Cancel Job Posting",
      icon: <ExclamationCircleOutlined style={{ color: "#faad14" }} />,
      content: (
        <div>
          <p>Are you sure you want to cancel?</p>
          <p style={{ color: "#666", fontSize: 13 }}>
            All unsaved changes will be lost.
          </p>
        </div>
      ),
      okText: "Yes, Cancel",
      okButtonProps: { danger: true },
      cancelText: "Continue Editing",
      onOk: () => {
        navigate("/customer/my-jobs");
      },
    });
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


  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialData}
    >
      <div className="two-column-grid">
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
      </div>

      <Form.Item label="Primary Skills" required>
        <div className="three-skill-row-simple">
          <Form.Item
            name={["primarySkills", 0]}
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

          <Form.Item name={["primarySkills", 1]} noStyle>
            <Select placeholder="Select primary skill : 2" showSearch>
              {skillOptions.map((skill) => (
                <Option key={skill} value={skill}>
                  {skill}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name={["primarySkills", 2]} noStyle>
            <Select placeholder="Select primary skill : 3" showSearch>
              {skillOptions.map((skill) => (
                <Option key={skill} value={skill}>
                  {skill}
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
          mode="tags"
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

      <div className="form-actions" style={{ justifyContent: "space-between" }}>
        <Button type="primary" htmlType="submit">
          Save & Next
        </Button>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default SkillRequired;
