import { faCheck, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Table, Toast } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./account.css";
import axios from "axios";
import { DatePicker, Space, Button } from 'antd';
import moment from "moment";
import toast from 'react-hot-toast';

const { RangePicker } = DatePicker;
function Account() {
  //lưu kết quả chuẩn đoán
  const [result, setResult] = useState([]);
  const [result1, setResult1] = useState();
  const [result2, setResult2] = useState();
  const [resultAc1, setResultAc1] = useState();
  const [resultAc2, setResultAc2] = useState();
  
  const [item, setItem] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [values, setValues] = useState({
    name: "",
    age: "",
    gender: "",
    polyuria: "",
    polydipsia: "",
    wLoss: "",
    weakness: "",
    polyphagia: "",
    genital: "",
    visualBlurring: "",
    itching: "",
    irritability: "",
    delayedHealing: "",
    partial: "",
    muscleStiffness: "",
    alopecia: "",
    obesity: "",
  });

  //lưu trữ thông tin bệnh nhân điền
  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleCheck = () => {
    // var requestOptions = {
    //   method: "POST",
    //   body: JSON.stringify(values),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // fetch("http://localhost:8080/predict", requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     const res = result.response;
    //     setResult(res);
    //     setSubmit(true);
    //   })
    //   .catch((error) => console.log("error", error));

    //validate input
    if (
      values.name == "" ||
      values.age == "" ||
      values.alopecia == "" ||
      values.delayedHealing == "" ||
      values.gender == "" ||
      values.genital == "" ||
      values.itching == "" ||
      values.muscleStiffness == "" ||
      values.obesity == "" ||
      values.partial == "" ||
      values.polydipsia == "" ||
      values.polyphagia == "" ||
      values.polyuria == "" ||
      values.visualBlurring == "" ||
      values.wLoss == "" ||
      values.weakness == ""
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }


    axios
      .post(`api/predict`, values)
      .then((response) => {
        if(response.data.code == 200) {
          toast.success("Đã kiểm tra thành công");
          const res = response.data.data;
          setResult(res);
          setSubmit(true);
          console.log(res);
        }
        // const res = response.data;
        // console.log(response.data);
        // setResult(res.data);
        // setSubmit(true);
        // toast.success("Đã thêm thành công");
      }
      )
      .catch((error) => console.log("error", error));

  };

  const handleFind = (e) => {
    if (submit) setSubmit(false);
    let dataSubmit = {
      fromDateLong: Number(moment(fromDate).startOf("day").format("x")),
      toDateLong: Number(moment(toDate).endOf("day").format("x")),
    }
    axios
      .post(`api/GetPatient`, dataSubmit)
      .then((response) => setItem(response.data))
      .catch((error) => console.log("error", error));



  };


  useEffect(() => {
    // if (submit) setSubmit(false);
    // var requestOptions = {
    //   method: "GET",
    // };
    // fetch("http://localhost:8080/GetPatient", requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //     setItem(result);
    //   })
    //   .catch((error) => console.log("error", error));

    if (submit) setSubmit(false);
    axios
      .post(`api/GetPatient`, {})
      .then((response) => setItem(response.data))
      .catch((error) => console.log("error", error));


  }, [submit]);

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    setFromDate(dateString[0]);
    setToDate(dateString[1]);

  }

  return (
    <div className="wrapper">
      <div className="container-wrapper">
        <div className="account-about">
          <div className="about-name">Bác sĩ: Đàm Xuân Ninh </div>
          <div className="about-email">Số điện thoại: 0123456789</div>
        </div>
        <div className="account-infor-person">
          <span className="noti-heading">Thông tin người bệnh</span>
          <div className="account-items">
            {" "}
            <div className="noti-item">
              <div className="noti-name">Họ và tên</div>
              <input
                type="text"
                className="item-input"
                // value={value}
                name="name"
                // checked={values.gender === "Male"}
                onChange={handleRadioChange}
              />
            </div>
            <div className="noti-item">
              <div className="noti-name">Tuổi</div>

              <input
                type="text"
                className="item-input"
                // value={value}
                name="age"
                // checked={values.gender === "Male"}
                onChange={handleRadioChange}
              />
            </div>
            <div className="noti-item">
              <div className="noti-name">Giới tính</div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Male"
                  name="gender"
                  checked={values.gender === "Male"}
                  onChange={handleRadioChange}
                />
                Nam
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  name="gender"
                  value="Female"
                  checked={values.gender === "Female"}
                  onChange={handleRadioChange}
                />
                Nữ
              </label>
            </div>
          </div>
        </div>
        <div className="account-infor">
          <span className="noti-heading">Thông tin kiểm tra</span>
          <div className="account-items">
            {" "}
            <div className="noti-item">
              <div className="noti-name">Bạn có hay đi tiểu nhiều không</div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="polyuria"
                  checked={values.polyuria === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="polyuria"
                  checked={values.polyuria === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="noti-item">
              <div className="noti-name">
                Tình trạng khát nước có thường xuyên diễn ra hay không
              </div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="polydipsia"
                  checked={values.polydipsia === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="polydipsia"
                  checked={values.polydipsia === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="noti-item">
              <div className="noti-name">Bạn có hay bị sút cân không</div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="wLoss"
                  checked={values.wLoss === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="wLoss"
                  checked={values.wLoss === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="noti-item">
              <div className="noti-name">Bạn có đang mệt mỏi không</div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="weakness"
                  checked={values.weakness === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="weakness"
                  checked={values.weakness === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="noti-item">
              <div className="noti-name">
                Bạn có thường xuyên đói hay không?
              </div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="polyphagia"
                  checked={values.polyphagia === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="polyphagia"
                  checked={values.polyphagia === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="noti-item">
              <div className="noti-name">
                Bạn có mắc bệnh liên quan đến sinh dục hay không
              </div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="genital"
                  checked={values.genital === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="genital"
                  checked={values.genital === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="noti-item">
              <div className="noti-name">Bạn có bị mờ mắt hay không?</div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="visualBlurring"
                  checked={values.visualBlurring === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="visualBlurring"
                  checked={values.visualBlurring === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="noti-item">
              <div className="noti-name">
                Bạn có hay bị nổi mẩn do ngứa hay không
              </div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="itching"
                  checked={values.itching === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="itching"
                  checked={values.itching === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="noti-item">
              <div className="noti-name">Bạn có dễ bị cáu gắt hay không</div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="irritability"
                  checked={values.irritability === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="irritability"
                  checked={values.irritability === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="noti-item">
              <div className="noti-name">
                Vết thương của bạn có lâu lành hay không
              </div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="delayedHealing"
                  checked={values.delayedHealing === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="delayedHealing"
                  checked={values.delayedHealing === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="noti-item">
              <div className="noti-name">
                Bạn có một vài triệu chứng liệt nhẹ hay không
              </div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="partial"
                  checked={values.partial === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="partial"
                  checked={values.partial === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="noti-item">
              <div className="noti-name">Bạn có hay bị cứng cơ hay không</div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="muscleStiffness"
                  checked={values.muscleStiffness === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="muscleStiffness"
                  checked={values.muscleStiffness === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="noti-item">
              <div className="noti-name">Bạn có hay bị rụng tóc hay không</div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="alopecia"
                  checked={values.alopecia === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="alopecia"
                  checked={values.alopecia === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="noti-item">
              <div className="noti-name">Bạn có hay thừa cân hay không</div>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="Yes"
                  name="obesity"
                  checked={values.obesity === "Yes"}
                  onChange={handleRadioChange}
                />
                Có
              </label>
              <label>
                <input
                  type="radio"
                  className="noti-input"
                  value="No"
                  name="obesity"
                  checked={values.obesity === "No"}
                  onChange={handleRadioChange}
                />
                Không
              </label>
            </div>
            <div className="button">
              <Button variant="outline-primary" onClick={handleCheck}>
                Kiểm tra
              </Button>
            </div>
          </div>
        </div>
        <div className="noti-result">
          <div className="noti-result-name">Kết quả kiểm tra: </div>
          {/* <Space direction="vertical">
            <label>
              Kết quả dự đoán thứ nhất
              <input
                type="text"
                className="noti-input"
                defaultValue={"0"}
                value={result1}
              // placeholder="Kết quả được thông báo tại đây"
              />
            </label>
            <label>
              Phần trăm chính xác
              <input
                type="text"
                className="noti-input"
                defaultValue={"0"}
                value={resultAc1}
              // placeholder="Kết quả được thông báo tại đây"
              />
            </label>
          </Space>
          <Space direction="vertical">
            <label>
              Kết quả dự đoán thứ hai
              <input
                type="text"
                className="noti-input"
                defaultValue={"0"}
                value={result2}
              // placeholder="Kết quả được thông báo tại đây"
              />
            </label>
            <label>
              Phần trăm chính xác
              <input
                type="text"
                className="noti-input"
                defaultValue={"0"}
                value={resultAc2}
              // placeholder="Kết quả được thông báo tại đây"
              />
            </label>
          </Space> */}
          {result.length > 0 && result.map((item, index) => {
            return (
            <Space direction="vertical">
            <label>
              Kết quả dự đoán thứ {index+1}
              <input
                type="text"
                className="noti-input"
                defaultValue={"0"}
                value={item.prediction}
              // placeholder="Kết quả được thông báo tại đây"
              />
            </label>
            <label>
              Phương pháp
              <input
                type="text"
                className="noti-input"
                defaultValue={"0"}
                value={item.phuongphap}
              // placeholder="Kết quả được thông báo tại đây"
              />
            </label>
            <label>
              Phần trăm chính xác
              <input
                type="text"
                className="noti-input"
                defaultValue={"0"}
                value={item.accuracy}
              // placeholder="Kết quả được thông báo tại đây"
              />
            </label>
          </Space> )
          })}
          
        </div>
        <div className="heading-wrap">
          <span className="noti-heading">Lịch sử kiểm tra</span>
          <div >

            <Space direction="horizontal" size={12}>
              <RangePicker onChange={onChangeDate} />
              <Button type="primary" onClick={handleFind}>Tìm kiếm</Button>
            </Space>
          </div>
        </div>

        <div className="table-wrap">
          <Table className="table-custom">
            <thead className="table-heading">
              <tr className="table-line">
                <th className="table-col-heading">
                  <div className="table-col-item"> #</div>
                </th>
                <th className="table-col-heading">
                  <div className="table-col-item"> Tên</div>
                </th>
                <th className="table-col-heading">
                  <div className="table-col-item"> Tuổi</div>
                </th>
                <th className="table-col-heading">
                  <div className="table-col-item"> Giới tính</div>
                </th>
                <th className="table-col-heading">
                  <div className="table-col-item"> Kết quả</div>
                </th>
                <th className="table-col-heading">
                  <div className="table-col-item"> Thời gian</div>
                </th>
                <th className="table-col-heading">
                  <div className="table-col-item"> Thao tác</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {item.map((currentItem, index) => {
                return (
                  <tr className="table-line-item" key={index}>
                    <td className="table-col">
                      <div className="table-col-item"> {++index}</div>
                    </td>
                    <td className="table-col">
                      <div className="table-col-item"> {currentItem.name}</div>
                    </td>
                    <td className="table-col">
                      <div className="table-col-item"> {currentItem.age}</div>
                    </td>
                    <td className="table-col">
                      <div className="table-col-item">
                        {" "}
                        {currentItem.gender}
                      </div>
                    </td>
                    <td className="table-col">
                      <div className="table-col-item result">
                        {" "}
                        {currentItem.classDT}
                      </div>
                    </td>
                    <td className="table-col">
                      <div className="table-col-item"> {moment(currentItem.date).format('DD/MM/YYYY hh:mm')}</div>
                    </td>
                    <td className="table-col">
                      <Button variant="outline-primary">Xem chi tiết</Button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Account;
