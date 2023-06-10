import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Card, Space } from "antd";
import { AuthContext, useAuth } from "../../shared/AuthProvider";
import { useNavigate } from "react-router-dom";

function Register() {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    register(values.username, values.password, values.confirmPassword, values.fullname);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  
    return (
      <Card title="Register" className="m-5" style={{ backgroundColor: "rgb(244 244 244)" }}>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu không khớp!");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Space direction="horizontal">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" danger onClick={() => navigate("/login")}>
              Login
            </Button>
          </Form.Item>
        </Space>
        </Form>
      </Card>
    );
  }
  

export default Register;