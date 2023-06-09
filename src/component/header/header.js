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

const Header = () => {
  const [name, setName] = useState("");
  const handleFind = () => {
    if (name != "") {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(`http://localhost:8080/KnnName/${name}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    } else {
      alert("vui lòng nhập tên bệnh nhân");
    }
  };
  return (
    <div className="header">
      <Row className="header-row">
        <Col className="btn-nav ">
          <img className="header-img" src={require("../assets/img/logo.png")} />
        </Col>
        <Col style={{ padding: "0px" }}>
          <div className="header-icon">
            <div className="input-block" id="search-block">
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
            </div>

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
                  <p className="sub-text">
                    User{" "}
                    <FontAwesomeIcon className="icon" icon={faChevronDown} />
                  </p>
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
