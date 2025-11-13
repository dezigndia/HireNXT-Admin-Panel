import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import styled from "styled-components";

const FormSection = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  margin-top: 24px;

  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #014c75;
    margin-bottom: 24px;
  }

  .password-field {
    position: relative;
    
    .change-password-link {
      position: absolute;
      top: 0;
      right: 0;
      color: #00d9a9;
      cursor: pointer;
      font-size: 14px;
      z-index: 1;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .button-group {
    display: flex;
    gap: 12px;
    margin-top: 24px;
    
    .save-button {
      background: #00d9a9;
      border-color: #00d9a9;
      
      &:hover {
        background: #01c49b !important;
        border-color: #01c49b !important;
      }
    }
    
    .back-button {
      background: white;
      border-color: #d9d9d9;
      color: #595959;
      
      &:hover {
        border-color: #00d9a9 !important;
        color: #00d9a9 !important;
      }
    }
  }
`;

const MyProfileTab = ({ onBack }) => {
  const [form] = Form.useForm();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleSubmit = (values) => {
    console.log("Profile update values:", values);
    message.success("Profile updated successfully!");
  };

  return (
    <FormSection>
      <h2 className="section-title">Your details</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: "Aditya Keshari",
          companyName: "Designdia Technologies",
          mobile: "+91 8077837212",
          email: "aditya3@designdia.com",
          designation: "Operation manager",
          password: "••••••••",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <Form.Item
            label="Your Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: "Please enter company name" }]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <Form.Item
            label="Mobile Number"
            name="mobile"
            rules={[{ required: true, message: "Please enter mobile number" }]}
          >
            <Input placeholder="Enter mobile number" />
          </Form.Item>

          <Form.Item
            label="Company Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input placeholder="Enter company email" />
          </Form.Item>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <Form.Item
            label="Designation"
            name="designation"
            rules={[{ required: true, message: "Please enter designation" }]}
          >
            <Input placeholder="Enter designation" />
          </Form.Item>

          <div className="password-field">
            <span className="change-password-link" onClick={() => setShowChangePassword(!showChangePassword)}>
              Change Password
            </span>
            <Form.Item
              label="Password"
              name="password"
            >
              <Input.Password disabled={!showChangePassword} placeholder="Enter password" />
            </Form.Item>
          </div>
        </div>

        <div className="button-group">
          <Button type="primary" htmlType="submit" className="save-button">
            Save Changes
          </Button>
          {onBack && (
            <Button onClick={onBack} className="back-button">
              Back
            </Button>
          )}
        </div>
      </Form>
    </FormSection>
  );
};

export default MyProfileTab;
