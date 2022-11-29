import React from "react";
import AdminHeader from "../elements/Header";
import LeftSide from "../elements/LeftSide";
import { Layout, Breadcrumb } from "antd";
import MyFooter from "../elements/Footer";


const { Content } = Layout;

const MyLayout = (props) => {


  return (
    <Layout className="site-layout">
      <AdminHeader />
      <Layout
      style={{
        minHeight:"100vh"
      }}
      >
        <LeftSide />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
          </Breadcrumb>

          {props.children}
        </Content>
      </Layout>
      {/* <MyFooter /> */}
    </Layout>
  );
};

export default MyLayout;
