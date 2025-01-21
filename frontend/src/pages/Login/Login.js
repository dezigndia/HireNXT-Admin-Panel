// @ts-nocheck
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Col,
  Row,
  Carousel,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
} from "antd";
import { LoginWrapper } from "./Login.style";
const { Title, Paragraph } = Typography;

const contentStyle = {
  margin: 0,
  height: "100vh",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (e) => {
    //e.preventDefault();

    // Perform input validation
    if (!email || !password) {
      setError('Username and password are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3443/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success (e.g., store authentication token)
        console.log('Login successful:', data);
        localStorage.setItem('authToken', data.token);
        // Redirect to home page after successful login
        navigate('/home');
      } else {
        // Handle error response (invalid credentials, etc.)
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      // Handle fetch error
      setError('Network error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  // };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <LoginWrapper>
      <Row>
        <Col span={12} md={12} sm={0}>
          <Carousel afterChange={onChange}>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
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
            <Title>Hi, Welcome back !!!</Title>
            <Paragraph>Continue where you left off</Paragraph>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
               />
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </LoginWrapper>
  );
};

export default Login;
