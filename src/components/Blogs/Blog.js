import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  notification,
  Popconfirm,
} from "antd";
import { DropboxOutlined, SmileOutlined } from "@ant-design/icons";

const Blog = () => {
  const [loader, setLoader] = useState(false);
  const [blogName, setBlogName] = useState("");
  const [id, setId] = useState(null);
  const [url, setUrl] = useState("");
  const [lists, setLists] = useState([
    {
      name: "Name",
      image:
        "https://tse3.mm.bing.net/th?id=OIP.Vl9R9EBq9b3LuFdWHgQ8lAHaEU&pid=Api&P=0",
    },
  ]);



  const editBlog = (id) => {
    let arr = [...lists];
    let editedItem = arr.find(x => x.id === id);
    console.log(editedItem);
    editedItem["name"] = blogName;
    editedItem["image"] = url;
    setLists(arr);
    setId(null);
    console.log(id);
  };

  const saveBlogs = () => {
    let arr = [...lists];
    let obj = {};
    obj["name"] = blogName;
    obj["id"] = Math.round(Math.random() * 10000);
    obj["image"] = url;
    notification.open({
      closeIcon: <SmileOutlined style={{ fontSize: "20px", color: "green" }} />,
      message: "Blog added",
      description: "yeni",
    });
    arr.push(obj);
    setLists(arr);
    window.localStorage.setItem('lists', JSON.stringify(arr))
    setBlogName("");
    setUrl("");
  };

  const deleteBlog = (id, index) => {
    let edited = lists.splice(index, 1);
    setLists(edited);
  };

  return (
    <div className="blog-background pt-4 border">
      <div className="container ">
        <Row gutter={[12, 12]}>
          <Col lg={24}>
            <div className="border animated fadeInDown p-3 mt-0 bg-white d-flex align-items-center">
              <DropboxOutlined
                style={{ fontSize: "25px", color: "#08c", marginRight: "10px" }}
                theme="outlined"
              />
              <span className="layout-name f-20 bold">Blogs</span>
            </div>
          </Col>

          <Col lg={16} md={12} sm={24}>
            <div className="table-responsive border">
              <table className="table table-hover table-bordered table-background">
                <thead className="thread-dark">
                  <tr className="table">
                    <th>#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Photo</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {lists?.map((l, i) => (
                    <tr className="table" key={l.id}>
                      <td>{i + 1}</td>
                      <td>{l.name}</td>
                      <td className="w-25">
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "fill",
                          }}
                          className="img-rounded"
                          src={l.image}
                          alt=""
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => editBlog()}
                          className="btn btn-success mx-2"
                        >
                          Edit
                        </button>
                        <Popconfirm
                          title="Are you sure?"
                          onConfirm={() => deleteBlog()}
                          okText={"yes"}
                          cancelText={"no"}
                        >
                          <button className="btn btn-danger">Delete</button>
                        </Popconfirm>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
          <Col lg={8} md={18} sm={24} className="p-3">
            {/* <form onSubmit={handlerSubmit}> */}
            <div className="form-group mb-2">
              <label className="label">Add Blog</label>
              <input
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="form-group  mb-2">
              <label>Image url</label>
              <input
                type="text"
                className="form-control"
                placeholder="Image Url"
                value={url}
                onChange={(u) => setUrl(u.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => saveBlogs()}
              style={{ padding: "6px 50px" }}
              className="btn btn-primary"
            >
              Add
            </button>
            {/* </form> */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Blog;
