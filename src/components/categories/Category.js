import React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import {
  Col,
  Card,
  Input,
  Row,
  Form,
  Table,
  Space,
  Button,
  Popconfirm,
  Tooltip,
  notification,
  Image,
} from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import Toast from "../elements/Toast";
import api from "../config/api";
import { useEffect } from "react";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const Category = () => {
  const [category, setCategory] = useState([]);
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    GetCategories();
  }, []);

  const cancelEdit = () => {
    form.resetFields();
  };
  const editCategory = (id) => {
    setId(id);
    let edited = category.find((c) => c.id === id);
    form.setFieldsValue({
      name: edited.name,
      icon:edited.icon
    });
  };

  const onFinishFailed = () => {
    toast.error("F a i l e d", ToastObjects);
  };

  //////saving/////////
  const onFinish = async (values) => {
    if (id) {
      setLoader(true);
      await api
        .put(`/categories/${id}`, { name: values.name, adress: values.adress ,icon:values.icon})
        .then(() => {
          toast.success(" Succesfully updated", ToastObjects);
        })
        .finally(() => {
          setLoader(false);
        });
      setId(null);
      GetCategories();
      cancelEdit();
    } else {
      setLoader(true);
      await api
        .post("/categories", { name: values.name, adress: values.adress ,icon:values.icon })
        .then(() => {
          toast.success(" Succesfully created", ToastObjects);
        })
        .finally(() => {
          setLoader(false);
        });
      GetCategories();
      cancelEdit();
    }
  };
  //////////////////
  ///////get/////
  const GetCategories = async () => {
    setLoader(true);
    await api
      .get("/categories")
      .then((res) => {
        setCategory(res.data);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  ///////


  /////delete//////
  const deleteCategory = async (id) => {
    setLoader(true);
    await api
      .delete(`categories/${id}`)
      .then((res) => {
        notification.success(`${res.data.name} deleted`, ToastObjects);
      })
      .catch(() => {
        notification.error("Couldn't delete", ToastObjects);
      })
      .finally(() => {
        setLoader(false);
      });
    GetCategories();
  };
  /////////
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon) => {
        return (
          <Space size="middle">
            <Image.PreviewGroup>
              <Image 
                width={50} 
                alt="nolink "
                src={`${icon}`}
              /> 
            </Image.PreviewGroup>
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id) => {
        return (
          <Space size="large">
            <Tooltip className="" title={"Edit"}>
              <Button
                onClick={() => editCategory(id)}
                type="primary"
                size="medium"
              >
                Edit
              </Button>
            </Tooltip>

            <Popconfirm
              placement="topLeft"
              title={"Are you sure"}
              okText={"yes"}
              cancelText={"no"}
              onConfirm={() => deleteCategory(id)}
            >
              <Button type="default" size="medium" danger ghost>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="container">
      <Row gutter={[10, 10]} className="blog-background pt-4 border">
        <Toast />
        <Col xs={24}>
          <div className="border animated fadeInDown p-3 mt-0 bg-white d-flex align-items-center">
            <UnorderedListOutlined />
            <span className="f-20 bold">Categories</span>
          </div>
        </Col>
        <Col lg={12} xs={24}>
          <Card>
            <Table
              loading={loader}
              size="small"
              className="bg-white animated fadeInLeft"
              columns={columns}
              dataSource={category}
              pagination={{ defaultPageSize: "10" }}
            />
          </Card>
        </Col>
        <Col lg={12} xs={24}>
          <Card title={"Add Category"} className={"animated fadeInRight"}>
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="name"
                rules={[
                  { required: true },
                  {
                    type: "string",
                    min: 5,
                    message: "min 5 character required",
                  },
                ]}
              >
                <Input className="mb-2" placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="icon"
                rules={[
                  { required: true },
                  {
                    type: "string",
                  },
                ]}
              >
                <Input className="mb-2" placeholder="Icon url" />
              </Form.Item>
              <div className="d-flex flex flex-between mt-3">
                <Space>
                  <Form.Item>
                    <Button
                      htmlType={"submit"}
                      size="medium"
                      type="primary"
                      className="mx-2"
                    >
                      Submit
                    </Button>
                    <Button size="medium" danger ghost onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </Form.Item>
                </Space>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Category;
