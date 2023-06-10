import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./header.css";
import { useAuth } from "../../shared/AuthProvider";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const Header = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  // const handleFind = () => {
  //   if (name != "") {
  //     var requestOptions = {
  //       method: "GET",
  //       redirect: "follow",
  //     };

  //     fetch(`http://localhost:8080/KnnName/${name}`, requestOptions)
  //       .then((response) => response.text())
  //       .then((result) => console.log(result))
  //       .catch((error) => console.log("error", error));
  //   } else {
  //     alert("vui lòng nhập tên bệnh nhân");
  //   }
  // };
  const logoutfunction = () => {
    logout();
    window.location.reload();
  };

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={logoutfunction}>
          Đăng xuất
        </a>
      ),
    }
  ];
  return (
    <div className="header">
      <Row className="header-row">
        <Col className="btn-nav ">
          <img className="header-img" src={require("../assets/img/logo.png")} />
        </Col>
        <Col style={{ padding: "0px" }}>
          <div className="header-icon">
            {/* <div className="input-block" id="search-block">
              <input
                className="search"
                placeholder="Tìm kiếm"
                id="input-search"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <FontAwesomeIcon
                className="icon-search"
                icon={faMagnifyingGlass}
                id="search"
                onClick={handleFind}
              />
            </div> */}

            <div className="menu">
              <FontAwesomeIcon
                className="icon icon-notification"
                icon={faBell}
              />
              <div></div>
            </div>

            <div className="block-admin">
              <img
                className="avatar-logo"
              //   src={require("../../assets/avatar.jpg")}
              />
              <div className="admin">
                <p className="admin-name">{localStorage.getItem("username")}</p>
                <div className="dropdown">
                  <div className="sub-text">
                    {user != null ?
                    <Dropdown menu={{ items }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                        { user.fullname}
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown> : <></>}
                     {/* <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                    <div>{user != null ? user.fullname : ""}</div>
                  </Dropdown> */}

                    {/* {user != null ? <FontAwesomeIcon className="icon" icon={faChevronDown} /> : <></>} */}
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Header;
