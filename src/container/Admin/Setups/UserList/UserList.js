import React, { Fragment, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../../../commen/functions/emailValidation";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Spin } from "antd";
import "./UserList.css";
import { useEffect } from "react";

const Userlist = () => {
  //state for customer list fields
  const [userListFields, setUserListFields] = useState({
    FirstName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    LastName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    companyName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    corporateCategoryID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // validation for customer List
  const customerListValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "FirstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserListFields({
          ...userListFields,
          FirstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "FirstName" && value === "") {
      setUserListFields({
        ...userListFields,
        FirstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "LastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserListFields({
          ...userListFields,
          LastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LastName" && value === "") {
      setUserListFields({
        ...userListFields,
        LastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "companyName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserListFields({
          ...userListFields,
          companyName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "companyName" && value === "") {
      setUserListFields({
        ...userListFields,
        companyName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setUserListFields({
          ...userListFields,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setUserListFields({
        ...userListFields,
        Email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  //email validation handler
  const handlerEmail = () => {
    if (userListFields.Email.value !== "") {
      if (validateEmail(userListFields.Email.value)) {
        alert("Email verified");
      } else {
        alert("Email Not Verified");
      }
    }
  };

  // reset value on reset Button Hit
  const resetBtnHandler = () => {
    setUserListFields({
      ...userListFields,
      FirstName: {
        value: "",
      },
      LastName: {
        value: "",
      },
      companyName: {
        value: "",
      },
      Email: {
        value: "",
      },
    });
  };

  //Table columns for customer List
  const columns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "150px",
      render: (text) => <label className="User-table-columns">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">First Name</label>,
      dataIndex: "firstName",
      key: "firstName",
      width: "150px",
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Last Name</label>,
      dataIndex: "lastName",
      key: "lastName",
      width: "150px",
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Company</label>,
      dataIndex: "company",
      key: "company",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "statusId",
      key: "statusId",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Creation Date Time</label>,
      dataIndex: "creationDate",
      key: "creationDate",
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  return (
    <Fragment>
      <Container className="user-List-container">
        <Row>
          <Col>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="user-List-label">User List</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={11} md={11} sm={12}>
                <CustomPaper className="user-List-paper">
                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="First Name"
                        name="FirstName"
                        value={userListFields.FirstName.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-User-list-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Last Name"
                        name="LastName"
                        value={userListFields.LastName.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-User-list-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Company Name"
                        name="companyName"
                        value={userListFields.companyName.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-User-list-fontsize"
                      />
                    </Col>
                    <Col lg={3} md={3} sm={12}>
                      <TextField
                        placeholder="Email"
                        name="Email"
                        onBlur={handlerEmail}
                        value={userListFields.Email.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-User-list-fontsize"
                      />
                    </Col>
                    <Col lg={3} md={3} sm={12}>
                      <Select
                        name="corporateCategoryID"
                        placeholder="Select"
                        className="select-user-list-fontsize"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="user-list-col-fields"
                    >
                      <Button
                        icon={<i className="icon-search icon-check-space"></i>}
                        className="User-Search-btn"
                        text="Search"
                      />
                      <Button
                        icon={<i className="icon-refresh icon-check-space"></i>}
                        className="User-Reset-btn"
                        onClick={resetBtnHandler}
                        text="Reset"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Table
                        column={columns}
                        //   rows={rows}
                        pagination={false}
                        className="User-List-table"
                      />
                    </Col>
                  </Row>
                </CustomPaper>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Userlist;
