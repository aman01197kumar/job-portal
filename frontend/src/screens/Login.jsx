import React, { useState } from "react";
import { Tabs } from "antd";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
// import AdminLogin from "./AdminLogin"; // Ensure correct import path

const Login = ({ setLoggedBy }) => {
  const [activeTab, setActiveTab] = useState("1");

  const onChange = (key) => {
    console.log("Selected Tab:", key);
    setActiveTab(key);
  };

  const items = [
    {
      key: "1",
      label: "User Login",
      children: <UserLogin setLoggedBy={setLoggedBy} />,
    },
    {
      key: "2",
      label: "Admin Login",
      children: <AdminLogin setLoggedBy={setLoggedBy} />,
    },
  ];

  return (
    <Tabs
      activeKey={activeTab}
      onChange={onChange}
      items={items}
      indicator={{ size: (origin) => origin - 20 }}
      centered="true"
    />
  );
};

export default Login;
