import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import './Tao.scss'

const Tao = () => {
  const [add, setAdd] = useState([]);
  const [getInfoCategory, setInfoCategory] = useState([]);

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
        Swal.fire("Thành công", "Thêm thành công ", "success");
      }
    } catch (error) {
      Swal.fire("Thất bại", `Lỗi ${error}`, "error");
    }
  };

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  return (
    <>
      <h3 className="text-uppercase text-center">Tạo</h3>
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
                  <option key={idx} value={item.MA_CN}>
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
      <div className="save">
        <Button onClick={createItem} >Lưu lại</Button>
      </div>
    </>
  );
};

export default Tao;
