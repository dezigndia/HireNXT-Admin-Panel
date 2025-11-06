import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select } from "antd";
import { FormStepWrapper } from "./AddTalentProfile.style";

const { Option } = Select;

const BasicInformation = ({ initialData, onNext, isFirstStep }) => {
  const [form] = Form.useForm();

  const partnerOrganizations = [
    { id: "P001", name: "TechCorp Solutions" },
    { id: "P002", name: "Digital Partners Inc" },
    { id: "P003", name: "Innovate Tech" },
    { id: "P004", name: "CodeCraft Ltd" },
    { id: "P005", name: "WebWorks Pro" },
    { id: "P006", name: "DataSystems Inc" },
    { id: "P007", name: "Cloud Experts Pvt Ltd" },
    { id: "P008", name: "Software Solutions Inc" },
  ];

  const roles = [
    "React Developer",
    "Full Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "DevOps Engineer",
    "Data Engineer",
    "Mobile App Developer",
    "QA Automation Engineer",
    "UI/UX Developer",
    "Software Engineer",
    "Project Manager",
  ];

  const handleNext = () => {
    form
      .validateFields()
      .then((values) => {
        onNext(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <FormStepWrapper>
      <h2 className="form-title">Basic Information</h2>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Partner Organization"
              name="partnerOrganization"
              rules={[
                { required: true, message: "Please select a partner organization!" },
              ]}
            >
              <Select 
                placeholder="Select Partner Organization"
                showSearch
                optionFilterProp="children"
              >
                {partnerOrganizations.map((partner) => (
                  <Option key={partner.id} value={partner.name}>
                    {partner.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter the talent name!" },
              ]}
            >
              <Input placeholder="Enter Full Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select 
                placeholder="Select Role"
                showSearch
                optionFilterProp="children"
              >
                {roles.map((role) => (
                  <Option key={role} value={role}>
                    {role}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="Top Skills" 
              name="skills"
              rules={[
                { required: true, message: "Please enter skills!" },
              ]}
            >
              <Input placeholder="e.g., React, Node.js, TypeScript" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Experience">
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item 
                    name="experienceYears" 
                    noStyle
                    rules={[
                      { required: true, message: "Years required!" },
                    ]}
                  >
                    <Input placeholder="Years" type="number" min="0" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item 
                    name="experienceMonths" 
                    noStyle
                    rules={[
                      { required: true, message: "Months required!" },
                    ]}
                  >
                    <Input placeholder="Months" type="number" min="0" max="11" />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="Monthly Rate (₹)" 
              name="rate"
              rules={[
                { required: true, message: "Please enter monthly rate!" },
              ]}
            >
              <Input placeholder="e.g., 150000" type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              label="Notice Period" 
              name="notice"
              rules={[
                { required: true, message: "Please enter notice period!" },
              ]}
            >
              <Input placeholder="e.g., 30 days" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="Location" 
              name="location"
              rules={[
                { required: true, message: "Please enter location!" },
              ]}
            >
              <Input placeholder="e.g., Bangalore, Karnataka" />
            </Form.Item>
          </Col>
        </Row>

        <div className="button-group">
          <div></div>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </Form>
    </FormStepWrapper>
  );
};

export default BasicInformation;
