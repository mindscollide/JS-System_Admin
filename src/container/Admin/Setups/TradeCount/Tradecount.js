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
import DatePicker from "react-multi-date-picker";
import "./Tradecount.css";

const TradeCount = () => {
  //start date state of multi datepicker
  const [startDateProps, setStartDateProps] = useState({
    value: new Date(),
    format: "MM-DD-YYYY",
    onChange: (date) => console.log(date.format()),
  });

  //end date state of multi datepicker
  const [endDateProps, setEndDateProps] = useState({
    value: new Date(),
    format: "MM-DD-YYYY",
    onChange: (date) => console.log(date.format()),
  });

  // state for LoginHistory fields
  const [userTradeCount, setUserTradeCount] = useState({
    transactionID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Name: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    companyName: {
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

    securityType: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    Position: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  const userTradeValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "transactionID" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          transactionID: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "transactionID" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        transactionID: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "companyName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          companyName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "companyName" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        companyName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Contact" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          Contact: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Contact" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        Contact: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setUserTradeCount({
          ...userTradeCount,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        Email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "securityType" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          securityType: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "securityType" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        securityType: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Position" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          Position: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Position" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        Position: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  //email validation handler
  const handlerEmail = () => {
    if (userTradeCount.Email.value !== "") {
      if (validateEmail(userTradeCount.Email.value)) {
        alert("Email verified");
      } else {
        alert("Email Not Verified");
      }
    }
  };

  // column for LoginHistory
  const tradeColumns = [
    {
      title: <label className="bottom-table-header">Transaction ID</label>,
      dataIndex: "transactionID",
      key: "transactionID",
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
      title: <label className="bottom-table-header">Company Name</label>,
      dataIndex: "company",
      key: "company",
      width: "150px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Category</label>,
      dataIndex: "category",
      key: "category",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "200px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Security Type</label>,
      dataIndex: "securityType",
      key: "securityType",
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Position</label>,
      dataIndex: "position",
      key: "position",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Amount</label>,
      dataIndex: "amount",
      key: "amount",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Rate quoted</label>,
      dataIndex: "rateQuoted",
      key: "rateQuoted",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Rate done</label>,
      dataIndex: "rateDone",
      key: "rateDone",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Trade Date</label>,
      dataIndex: "tradeDate",
      key: "tradeDate",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "status",
      key: "status",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  // data for Columns loginHistory
  const tradeData = [
    {
      key: "1",
      transactionID: "TB-3m-30 Apr 23",
      name: "Muhammad Ahmed",
      company: "Gulahmed",
      category: "Category 1",
      email: "muhammad.ahmed@gmail.com",
      securityType: "Tbill",
      position: "Buy",
      amount: "10,000",
      rateQuoted: "13.5",
      rateDone: "13.5",
      tradeDate: "19/04/2023",
      status: "Enable",
    },
    {
      key: "1",
      transactionID: "TB-3m-30 Apr 23",
      name: "Muhammad Ahmed",
      company: "Gulahmed",
      category: "Category 1",
      email: "muhammad.ahmed@gmail.com",
      securityType: "Tbill",
      position: "Buy",
      amount: "10,000",
      rateQuoted: "13.5",
      rateDone: "13.5",
      tradeDate: "19/04/2023",
      status: "Enable",
    },
  ];

  return (
    <Fragment>
      <Container className="tradeCount-container">
        <Row>
          <Col>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="tradeCount-label">Trade Count</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={11} md={11} sm={12}>
                <CustomPaper className="tradeCount-paper">
                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Transaction ID"
                        name="transactionID"
                        value={userTradeCount.transactionID.value}
                        onChange={userTradeValidation}
                        labelClass="d-none"
                        className="tradeCount-textField-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Name"
                        name="Name"
                        value={userTradeCount.Name.value}
                        onChange={userTradeValidation}
                        labelClass="d-none"
                        className="tradeCount-textField-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Company Name"
                        name="companyName"
                        value={userTradeCount.companyName.value}
                        onChange={userTradeValidation}
                        labelClass="d-none"
                        className="tradeCount-textField-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <Select
                        placeholder="Category"
                        name="Category"
                        // value={userTradeCount.Email.value}
                        // onBlur={handlerEmail}
                        // onChange={userTradeValidation}
                        className="tradeCount-textField-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Email"
                        name="Email"
                        value={userTradeCount.Email.value}
                        onBlur={handlerEmail}
                        onChange={userTradeValidation}
                        labelClass="d-none"
                        className="tradeCount-textField-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Security Type"
                        name="securityType"
                        value={userTradeCount.securityType.value}
                        onChange={userTradeValidation}
                        labelClass="d-none"
                        className="tradeCount-textField-fontsize"
                      />
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Position"
                        name="Position"
                        value={userTradeCount.Position.value}
                        onChange={userTradeValidation}
                        labelClass="d-none"
                        className="tradeCount-textField-fontsize"
                      />
                    </Col>

                    <Col
                      lg={6}
                      md={6}
                      sm={12}
                      className="Tradecount-Datepicker"
                    >
                      <DatePicker
                        {...startDateProps}
                        onPropsChange={setStartDateProps}
                        placeholder="Start date"
                        showOtherDays={true}
                        inputClass="Tradecount-Datepicker-left"
                      />
                      <label className="Tradecount-date-to">to</label>

                      <DatePicker
                        {...endDateProps}
                        onPropsChange={setEndDateProps}
                        placeholder="End Date"
                        showOtherDays={true}
                        inputClass="Tradecount-Datepicker-right"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="tradeCount-col-search-download-btn "
                    >
                      <Button
                        text="Search"
                        icon={<i className="icon-search"></i>}
                        className={"Search-tradeCount-btn"}
                      />
                      <Button
                        text="Downlaod Excel"
                        icon={<i className="icon-download-excel"></i>}
                        className={"tradeCount-Download-Excel-btn"}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col lg={12} md={12} sm={12}>
                      <Table
                        column={tradeColumns}
                        rows={tradeData}
                        pagination={false}
                        className="tradeCount-table"
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

export default TradeCount;
