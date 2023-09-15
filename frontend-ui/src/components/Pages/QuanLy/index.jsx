import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const QuanLy = () => {
  const [add, setAdd] = useState([]);
  const [edit, setEdit] = useState([]);
  const [idDelete, setIdDelete] = useState([]);
  const [getInfo, setGetInfo] = useState([]);
  const [getInfoCategory, setInfoCategory] = useState([]);


  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    setEdit(id);
    setShowEdit(true);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setIdDelete(id);
    setShowDelete(true);
  };

  const getItems = useCallback(async () => {
    try {
      const options = {
        method: "get",
        url: "http://localhost:8080/api/quanly",
      };
      const response = await axios(options);
      const items = response.data.data;
      if (response.data.message === "SUCCESS") {
        setGetInfo(items);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getCategory = useCallback(async () => {
    try {
      const options = {
        method: "get",
        url: "http://localhost:8080/api/tao",
      };
      const response = await axios(options);
      const items = response.data.data;
      if (response.data.message === "SUCCESS") {
        setInfoCategory(items);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createItem = async () => {
    try {
      const options = {
        method: "post",
        url: `http://localhost:8080/api/class`,
        data: add,
      };
      const response = await axios(options);
      if (response.data.message === "SUCCESS") {
        handleCloseAdd();
        Swal.fire("Thành công", "Thêm thành công ", "success");
        getItems();
      }
    } catch (error) {
      Swal.fire("Thất bại", `Lỗi ${error}`, "error");
    }
  };

  const updateItem = async (id) => {
    try {
      const options = {
        method: "put",
        url: `http://localhost:8080/api/class/${id}`,
        data: edit,
      };
      const response = await axios(options);
      if (response.data.message === "SUCCESS") {
        handleCloseEdit();
        Swal.fire("Thành công", "Sửa thành công ", "success");
        getItems();
      }
    } catch (error) {
      Swal.fire("Thất bại", `Lỗi ${error}`, "error");
    }
  };

  const deleteItem = async (id) => {
    try {
      console.log(id)
      const options = {
        method: "delete",
        url: `http://localhost:8080/api/quanly/${id}`,
      };
      const response = await axios(options);
      if (response.data.message === "SUCCESS") {
        handleCloseDelete();
        Swal.fire("Thành công", "Xóa thành công ", "success");
        getItems();
      }
    } catch (error) {
      Swal.fire("Thất bại", `Lỗi ${error}`, "error");
    }
  };

  useEffect(() => {
    getItems()
    getCategory()
  }, [getItems,getCategory]);

  return (
    <>
      <h3 className="text-uppercase text-center fw-bold my-3">Quản Lý</h3>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã lớp</th>
            <th>Mã CN</th>
            <th>Tên lớp</th>
            <th>Mã khoa</th>
            <th>Tên chuyên ngành</th>
            <th>Tên khoa</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {getInfo && getInfo.map((item,idx)=>(
          <tr key={idx}>
            <td>{idx+1}</td>
            <td>{item.MA_LOP}</td>
            <td>{item.MA_CN}</td>
            <td>{item.TEN_LOP}</td>
            <td>{item.MA_KHOA}</td>
            <td>{item.TEN_CN}</td>
            <td>{item.TEN_KHOA}</td>
            <td>
              <Button variant="primary m-1" onClick={handleShowAdd}>
                <FaPlusCircle />
              </Button>
              <Button variant="warning m-1" onClick={()=>handleShowEdit(item)}>
                <FaEdit />
              </Button>
              <Button variant="danger m-1" onClick={()=>handleShowDelete(item.MA_LOP)}>
                <FaTrash />
              </Button>
            </td>
          </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Mã lớp</Form.Label>
              <Form.Control
                type="text"
                name="MA_LOP"
                onChange={(e) =>
                  setAdd({ ...add, [e.target.name]: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <strong>Mã chuyên ngành</strong>
              </Form.Label>
              <Form.Select
                name="MA_CN"
                onChange={(e) =>
                  setAdd({ ...add, [e.target.name]: e.target.value })
                }
              >
                <option value="">Chọn chuyên ngành</option>
                {getInfoCategory &&
                  getInfoCategory.map((item, idx) => (
                <>
                  <option
                    key={idx}
                    value={item.MA_CN}
                  >
                    {item.TEN_CN} 
                  </option>
                </>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên lớp</Form.Label>
              <Form.Control
                type="text"
                name="TEN_LOP"
                onChange={(e) =>
                  setAdd({ ...add, [e.target.name]: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <strong>Mã khoa</strong>
              </Form.Label>
              <Form.Select
                name="MA_KHOA"
                onChange={(e) =>
                  setAdd({ ...add, [e.target.name]: e.target.value })
                }
              >
                <option value="">Chọn loại sản phẩm</option>
                {/* {major &&
                  major.map((item, idx) => ( */}
                <>
                  <option
                    // key={idx}
                    value="test"
                  >
                    {/* {item.TEN_CN} */} test
                  </option>
                </>
                {/* ))} */}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Hủy
          </Button>
          <Button variant="primary" onClick={createItem}>
            Lưu lại
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                name="HOTEN"
                value="test"
                placeholder="Halala"
                onChange={(e) =>
                  setEdit({ ...edit, [e.target.name]: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <strong>Loại sản phẩm</strong>
              </Form.Label>
              <Form.Select
                name="MA_SP"
                value="test"
                onChange={(e) =>
                  setEdit({ ...edit, [e.target.name]: e.target.value })
                }
              >
                <option value="">Chọn loại sản phẩm</option>
                {/* {major &&
                  major.map((item, idx) => ( */}
                <>
                  <option
                    // key={idx}
                    value="test"
                  >
                    {/* {item.TEN_CN} */} test
                  </option>
                </>
                {/* ))} */}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => updateItem(edit)}>
            Lưu lại
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn chắc chắn muốn xóa</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Hủy
          </Button>
          <Button variant="danger" onClick={() => deleteItem(idDelete)}>
            Xóa bỏ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QuanLy;
