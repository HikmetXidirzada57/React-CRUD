import React, { useState } from "react";
import { Layout, Menu, Select } from "antd";
import {
  MenuUnfoldOutlined,
  AndroidOutlined,
  CodeSandboxOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const LeftSide = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{
          height: "100%",
          width: "200",
          borderRight: 0,
        }}
      >
        <Menu.SubMenu title="Admin">
          <Menu.Item key="1">
          <AndroidOutlined style={{margin:"10px"}}/>
            <Link to={`/`}>
              <span className="mt-3">Ana səhifə</span>
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item>
          <Link to="/products">
          <MenuUnfoldOutlined />
            <span>Products</span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/categories">
          <CodeSandboxOutlined />
            <span>Categories</span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/blogs">
          <CodeSandboxOutlined />
            <span>Blogs</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default LeftSide;
