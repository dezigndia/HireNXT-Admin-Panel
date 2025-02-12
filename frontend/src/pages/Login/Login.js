/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Image,
  Flex,
} from "antd";
import { LoginWrapper } from "./Login.style";
import Logo from "./../../assets/logo.svg";
import lgSlider from "./../../assets/lg-slider-1.png";
const { Title, Paragraph, Link } = Typography;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (e) => {
    //e.preventDefault();

    // Perform input validation
    if (!email || !password) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3443/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success (e.g., store authentication token)
        console.log("Login successful:", data);
        localStorage.setItem("authToken", data.token);
        // Redirect to home page after successful login
        navigate("/home");
      } else {
        // Handle error response (invalid credentials, etc.)
        setError(data.message || "Login failed");
      }
    } catch (error) {
      // Handle fetch error
      setError("Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <LoginWrapper>
      <Row className="login-row">
        <Col span={12} md={12} sm={0} className="bg-login">
          <Flex align="center" vertical="center" className="bg-content">
            <Image width={200} preview={false} src={Logo} />
            <Paragraph className="bg-text-1">
              Hire Top 1% vetted Technology experts to scale your{" "}
            </Paragraph>
            <Paragraph className="bg-text-2">Next Big Thing!!!</Paragraph>
            <Image preview={false} src={lgSlider} />
            <Paragraph className="bg-text-3">Skills Coverage</Paragraph>
            <Paragraph className="bg-text-4">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </Paragraph>
          </Flex>
        </Col>
        <Col span={12} md={12} sm={24} className="login-form-container">
          <Form
            name="basic"
            layout="vertical"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              width: "100%",
            }}
            initialValues={{
              remember: true,
            }}
            //onSubmit={handleSubmit}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Title className="bg-text-1">Hi, Welcome back !</Title>
            <Paragraph>
              Start your journey to scale your Enterprise Now!!!
            </Paragraph>
            <Form.Item
              label="Email Id"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Enter Your Email id",
                },
              ]}
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
            <Paragraph className="bg-text-2">
              Don't have an account with us?{" "}
              <Link href="https://ant.design" target="_blank">
                Sign up here
              </Link>
            </Paragraph>
          </Form>
        </Col>
      </Row>
    </LoginWrapper>
  );
};

export default Login;
