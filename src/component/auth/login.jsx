import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { AuthContext, useAuth } from "../../shared/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    login(values.username, values.password);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Card title="Login" className="m-5" style={{ backgroundColor: "rgb(244 244 244)" }}>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;