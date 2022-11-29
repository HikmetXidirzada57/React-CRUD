import React from "react";
import { Layout, Menu, Popconfirm, Button, Popover, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';

const AdminHeader = () => {
  const { Header } = Layout;

  return (
    <div className="">
      <Header/>
      {/* <Menu
        theme="dark"
        direction="rtl"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item>
          <Popover
            placement="bottomLeft"
            title={"text"}
            content={"hello"}
            trigger="click"
          >
                <Avatar shape="square" size="Large" icon={<UserOutlined />} />
          </Popover>
        </Menu.Item>
        <Menu.Item>
          <Popconfirm
            placement="bottomLeft"
            title={"Are you sure for logout?"}
            onConfirm={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button>Log Out</Button>
          </Popconfirm>
        </Menu.Item>
      </Menu> */}
    </div>
  );
};

export default AdminHeader;
