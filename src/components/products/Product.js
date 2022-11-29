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
import { render } from "@testing-library/react";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const Product = () => {
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();
  const cancelField = () => {
    form.resetFields();
  };

  useEffect(() => {
    GetProducts();
  }, []);

  const onFinishFailed = () => {
    toast.error("F a i l e d", ToastObjects);
  };

  //saving/editing////
  const onFinish = async (values) => {
    if (id) {
      setLoader(true);
      await api
        .put(`/products/${id}`, {
          name: values.name,
          price: values.price,
          imageUrl: values.imageUrl,
        })
        .then(() => {
          toast.success("Succesfully updated", ToastObjects);
        })
        .finally(() => {
          setLoader(false);
        });
      setId(null);
      cancelField();
      GetProducts();
    } else {
      setLoader(true);
      await api
        .post("/products", {
          name: values.name,
          price: values.price,
          imageUrl: values.imageUrl,
        })
        .then(() => {
          toast.success(" Succesfully created", ToastObjects);
        })
        .finally(() => {
          setLoader(false);
        });
      cancelField();
      GetProducts();
    }
  };
  ////////////////////

  const editProduct = (id) => {
    setId(id);
    let edited = product.find((x) => x.id === id);
    form.setFieldsValue({
      name: edited.name,
      price: edited.price,
      imageUrl:edited.imageUrl
    });
  };

  ///////getting products///////
  const GetProducts = async () => {
    await api
      .get("/products")
      .then((res) => {
        setProduct(res.data);
      })
      .finally(setLoader(false));
  };
  //////////


  ////deleting products/////////
  const deleteProduct = async (id) => {
    setLoader(true);
    await api
      .delete(`products/${id}`)
      .then((e) => {
        console.log("deleted");
      })
      .catch((e) => {
        notification.error(`impossible`, ToastObjects);
      })
      .finally(() => {
        setLoader(false);
      });
    GetProducts();
  };
  ///////////////////

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Photo",
      dataIndex: "imageUrl",
      key: "imageUrl",

      render(imageUrl) {
        return (
          <Space size="middle">
            <Image.PreviewGroup>
              <Image width={50} alt="No Image " src={`${imageUrl}`} />
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
            <Tooltip title={"Edit"}>
              <Button
                onClick={() => {
                  editProduct(id);
                }}
                type="primary"
                size="medium"
              >
                Edit
              </Button>
            </Tooltip>

            <Popconfirm
              placement="topRight"
              title={"Are you sure"}
              okText={"yes"}
              cancelText={"no"}
              onConfirm={() => deleteProduct(id)}
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
    <Row gutter={[10, 10]} className="blog-background pt-4 border">
      <Toast />
      <Col xs={24}>
        <div className="border animated fadeInDown p-3 mt-0 bg-white d-flex align-items-center">
          <UnorderedListOutlined />
          <span className="f-20 bold">Products</span>
        </div>
      </Col>
      <Col lg={12} xs={24}>
        <Card>
          <Table
            loading={loader}
            size="small"
            className="bg-white animated fadeInLeft"
            columns={columns}
            dataSource={product}
          />
        </Card>
      </Col>
      <Col lg={12} xs={24}>
        <Card title={"Add Product"} className={"animated fadeInRight"}>
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
                { type: "string", min: 5, message: "min 6 character required" },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                },
                {
                  type: "string",
                },
              ]}
            >
              <Input placeholder="price" />
            </Form.Item>
            <Form.Item
              name="imageUrl"
              rules={[
                {
                  required: true,
                },
                {
                  type: "string",
                },
              ]}
            >
              <Input placeholder="Image url" />
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
                  <Button size="medium" danger ghost onClick={cancelField}>
                    Cancel
                  </Button>
                </Form.Item>
              </Space>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Product;
