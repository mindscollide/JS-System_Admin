import React, { Fragment, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";
import ViewCustomer from "../../../../container/Admin/AdminModal/View-CustomerList-Modal/ViewCustomer";
import { validateEmail } from "../../../../commen/functions/emailValidation";
import Select from "react-select";
import "./Customerlist.css";

const Customerlist = () => {
  // state for modal customer List View
  const [customerViewModal, setCustomerViewModal] = useState(false);

  //state for customer list fields
  const [customerListFields, setCustomerListFields] = useState({
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

    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    selectCategory: 0,
  });

  // validation for customer List
  const customerListValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setCustomerListFields({
          ...customerListFields,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setCustomerListFields({
        ...customerListFields,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "companyName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setCustomerListFields({
          ...customerListFields,
          companyName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "companyName" && value === "") {
      setCustomerListFields({
        ...customerListFields,
        companyName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setCustomerListFields({
          ...customerListFields,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setCustomerListFields({
        ...customerListFields,
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
    if (customerListFields.Email.value !== "") {
      if (validateEmail(customerListFields.Email.value)) {
        alert("Email verified");
      } else {
        alert("Email Not Verified");
      }
    }
  };

  // reset value on reset Button Hit
  const resetBtnHandler = () => {
    setCustomerListFields({
      ...customerListFields,
      Name: {
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

  //open view customer list modal
  const openViewModal = () => {
    setCustomerViewModal(true);
  };

  //Table columns for customer List
  const columns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "150px",
      render: (text) => (
        <label className="table-columns" onClick={openViewModal}>
          {text}
        </label>
      ),
    },
    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "name",
      key: "name",
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
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: (
        <label className="bottom-table-header">Last Password Change</label>
      ),
      dataIndex: "passworChange",
      key: "passworChange",
      align: "center",
      width: "150px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Creation Date Time</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  const customerData = [
    {
      key: "1",
      email: "muhammad.ahmed",
      name: "muhammad.ahmed",
      company: "Shield",
      status: "",
      passworChange: "15/05/2023 03:20:45",
      creationDateTime: "13/05/2023 01:15:10",
    },
    {
      key: "1",
      email: "e_shahab@ppl.com.pk",
      name: "Shahab",
      company: "Pakistan Petroleum Limited",
      status: "",
      passworChange: "16/05/2023 10:18:13",
      creationDateTime: "13/05/2023 01:15:10",
    },
  ];
  return (
    <Fragment>
      <Container className="customer-List-container">
        <Row>
          <Col>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="customer-List-label">Customer List</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={11} md={11} sm={12}>
                <CustomPaper className="customer-List-paper">
                  {/* <Row>
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="customer-list-col-fields"
                    >
                      <TextField placeholder="Name" labelClass="d-none" />
                      <TextField
                        placeholder="Company Name"
                        labelClass="d-none"
                      />
                      <TextField placeholder="Email" labelClass="d-none" />
                      <Select
                        placeholder="Select"
                        className="select-Customer-List-field"
                      />
                    </Col>

                    <Col lg={3} md={3} sm={12}>
                      <Button text="Search" />
                      <Button text="Reset" />
                    </Col>
                  </Row> */}

                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Name"
                        name="Name"
                        value={customerListFields.Name.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-customer-list-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Company Name"
                        name="companyName"
                        value={customerListFields.companyName.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-customer-list-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Email"
                        name="Email"
                        onBlur={handlerEmail}
                        value={customerListFields.Email.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-customer-list-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <Select
                        placeholder="Select"
                        className="select-customer-list-fontsize"
                      />
                    </Col>

                    <Col
                      lg={3}
                      md={3}
                      sm={12}
                      className="customer-list-col-fields"
                    >
                      <Button
                        icon={<i className="icon-search icon-check-space"></i>}
                        className="Search-btn"
                        text="Search"
                      />
                      <Button
                        icon={<i className="icon-refresh icon-check-space"></i>}
                        className="Reset-btn"
                        onClick={resetBtnHandler}
                        text="Reset"
                      />
                    </Col>
                    <Col lg={1} md={1} sm={12} />
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <Table
                        column={columns}
                        rows={customerData}
                        pagination={false}
                        className="CustomerList-table"
                      />
                    </Col>
                  </Row>
                </CustomPaper>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {customerViewModal ? (
        <>
          <ViewCustomer
            viewCustomerModal={customerViewModal}
            setViewCustomerModal={setCustomerViewModal}
          />
        </>
      ) : null}
    </Fragment>
  );
};

export default Customerlist;
