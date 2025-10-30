import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { ProfileWrapper } from "./Profile.style";

const Profile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleSubmit = (values) => {
    console.log("Profile update values:", values);
    message.success("Profile updated successfully!");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ProfileWrapper>
      <h1 className="profile-title">My Profile</h1>
      
      <div className="profile-tab">My Profile</div>

      <div className="form-section">
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
            <Button onClick={handleBack} className="back-button">
              Back
            </Button>
          </div>
        </Form>
      </div>
    </ProfileWrapper>
  );
};

export default Profile;
