import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Card, Space } from "antd";
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
    <Card title="Đăng nhập" className="m-5" style={{ backgroundColor: "rgb(244 244 244)" }}>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Space direction="horizontal">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" danger onClick={() => navigate("/register")}>
              Đăng ký
            </Button>
          </Form.Item>
        </Space>

      </Form>
    </Card>
  );
}

export default Login;