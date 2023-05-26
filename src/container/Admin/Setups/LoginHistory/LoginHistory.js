import React, { Fragment, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";
import { validateEmail } from "../../../../commen/functions/emailValidation";
import Select from "react-select";
import "./LoginHistory.css";

const LoginHistory = () => {
  // state for LoginHistory fields
  const [loginHistoryField, setLoginHistoryField] = useState({
    Name: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    Contact: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  const customerListValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setLoginHistoryField({
          ...loginHistoryField,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setLoginHistoryField({
        ...loginHistoryField,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Contact" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setLoginHistoryField({
          ...loginHistoryField,
          Contact: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Contact" && value === "") {
      setLoginHistoryField({
        ...loginHistoryField,
        Contact: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setLoginHistoryField({
          ...loginHistoryField,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setLoginHistoryField({
        ...loginHistoryField,
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
    if (loginHistoryField.Email.value !== "") {
      if (validateEmail(loginHistoryField.Email.value)) {
        alert("Email verified");
      } else {
        alert("Email Not Verified");
      }
    }
  };

  // column for LoginHistory
  const columns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "150px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "name",
      key: "name",
      width: "150px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Company</label>,
      dataIndex: "company",
      key: "company",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Ip Address</label>,
      dataIndex: "ipaddress",
      key: "ipaddress",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Logged In Time</label>,
      dataIndex: "loginTime",
      key: "loginTime",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Logged Out Time</label>,
      dataIndex: "logoutTime",
      key: "logoutTime",
      width: "200px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Total Span</label>,
      dataIndex: "totalSpan",
      key: "totalSpan",
      width: "200px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Total Span</label>,
      dataIndex: "totalSpan",
      key: "totalSpan",
      width: "200px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Interface</label>,
      dataIndex: "interface",
      key: "interface",
      width: "200px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  // data for Columns loginHistory
  const customerData = [
    {
      key: "1",
      email: "muhammad.ahmed",
      name: "muhammad.ahmed",
      company: "Shield",
      ipaddress: "39.57.197.237",
      loginTime: "16/04/2023 0:34:00",
      logoutTime: "15/05/2023 03:20:45",
      totalSpan: "0 hrs 3 mins 13 secs (62 ms)",
      interface: "Web",
    },
    {
      key: "1",
      email: "muhammad.ahmed",
      name: "muhammad.ahmed",
      company: "Shield",
      ipaddress: "39.57.197.237",
      loginTime: "16/04/2023 0:34:00",
      logoutTime: "15/05/2023 03:20:45",
      totalSpan: "0 hrs 3 mins 13 secs (62 ms)",
      interface: "Web",
    },
  ];

  return (
    <Fragment>
      <Container className="LoginHistory-container">
        <Row>
          <Col>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="LoginHistory-label">
                  Customer Login History
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={11} md={11} sm={12}>
                <CustomPaper className="LoginHistory-paper">
                  <Row className="mt-3">
                    <Col lg={3} md={3} sm={12}>
                      <TextField
                        placeholder="Name"
                        name="Name"
                        value={loginHistoryField.Name.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="loginHistor-textField-fontsize"
                      />
                    </Col>
                    <Col lg={3} md={3} sm={12}>
                      <TextField
                        placeholder="Contact"
                        name="Contact"
                        value={loginHistoryField.Contact.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="loginHistor-textField-fontsize"
                      />
                    </Col>
                    <Col lg={3} md={3} sm={12}>
                      <TextField
                        placeholder="Email"
                        name="Email"
                        value={loginHistoryField.Email.value}
                        onBlur={handlerEmail}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="loginHistor-textField-fontsize"
                      />
                    </Col>

                    <Col lg={3} md={3} sm={12}>
                      <Select
                        placeholder="Category"
                        className="loginHistor-textField-fontsize"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="col-search-download-btn"
                    >
                      <Button
                        text="Search"
                        icon={<i className="icon-search"></i>}
                        className={"Search-HistoryLog-btn"}
                      />
                      <Button
                        text="Downlaod Excel"
                        icon={<i className="icon-download-excel"></i>}
                        className={"Download-Excel-btn"}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Table
                        column={columns}
                        rows={customerData}
                        pagination={false}
                        className="LoginHistory-table"
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

export default LoginHistory;
