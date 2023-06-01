import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";
import { validateEmail } from "../../../../commen/functions/emailValidation";
import { useDispatch, useSelector } from "react-redux";
import {
  customerCorporateLogin,
  getAllCategoriesCorporate,
} from "../../../../store/actions/Auth-Actions";
import { Spin } from "antd";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import "./LoginHistory.css";

const LoginHistory = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  console.log(auth, "aaaa");
  // state for row in which table data set
  const [rows, setRows] = useState([]);

  // state for category dropdown
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectCategoryValue, setSelectCategoryValue] = useState([]);

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

  // dispatch getALLCategoryDropdown API
  useEffect(() => {
    dispatch(getAllCategoriesCorporate());
  }, []);

  useEffect(() => {
    let newData = {
      CorporateID: 1,
    };
    dispatch(customerCorporateLogin(newData));
  }, []);

  // state for LoginHistory fields
  const [loginHistoryField, setLoginHistoryField] = useState({
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

    corporateCategoryID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  const customerListValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "FirstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setLoginHistoryField({
          ...loginHistoryField,
          FirstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "FirstName" && value === "") {
      setLoginHistoryField({
        ...loginHistoryField,
        FirstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "LastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setLoginHistoryField({
          ...loginHistoryField,
          LastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LastName" && value === "") {
      setLoginHistoryField({
        ...loginHistoryField,
        LastName: { value: "", errorMessage: "", errorStatus: false },
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

  //ON CHANGE HANDLER FOR CATEGORY DROPDOWN
  const selectCategoryOnchangeHandler = async (selectedCategory) => {
    console.log(selectedCategory, "selectedOptionselectedOption");
    setSelectCategoryValue(selectedCategory);
    setLoginHistoryField({
      ...loginHistoryField,
      corporateCategoryID: {
        value: selectedCategory.value,
        label: selectedCategory.label,
      },
    });
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
      title: <label className="bottom-table-header">First Name</label>,
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      width: "150px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Last Name</label>,
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      width: "150px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Company</label>,
      dataIndex: "companyName",
      key: "companyName",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Bank Name</label>,
      dataIndex: "bankName",
      key: "bankName",
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Ip Address</label>,
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">LogIn Date</label>,
      dataIndex: "loginDate",
      key: "loginDate",
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Logged In Time</label>,
      dataIndex: "loginTime",
      key: "loginTime",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">LogOut Date</label>,
      dataIndex: "logOutDate",
      key: "logOutDate",
      width: "200px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Logged Out Time</label>,
      dataIndex: "logOutTime",
      key: "logOutTime",
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
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Interface</label>,
      dataIndex: "interface",
      key: "interface",
      width: "200px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  //onSearchBtn Hit in which they check the data on table
  const searchButtonHit = () => {
    let Data = {
      email: loginHistoryField.Email.value,
      firstName: loginHistoryField.Name.value,
      lastName: loginHistoryField.Name.value,
    };
    dispatch(customerCorporateLogin(Data));
  };

  // render table inside table
  useEffect(() => {
    if (
      auth.userCorporateLogin !== null &&
      auth.userCorporateLogin !== undefined &&
      auth.userCorporateLogin.length > 0
    ) {
      setRows(auth.userCorporateLogin);
    } else {
      setRows([]);
    }
  }, [auth.userCorporateLogin]);

  console.log("roewwwww", rows);

  // for category Corporate in select drop down
  useEffect(() => {
    if (Object.keys(auth.getAllCorporate).length > 0) {
      let tem = [];
      auth.getAllCorporate.map((data, index) => {
        console.log(data, "datadatadatadatassssss");
        tem.push({
          label: data.category,
          value: data.corporateCategoryID,
        });
      });
      setSelectCategory(tem);
    }
  }, [auth.getAllCorporate]);

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
                        placeholder="FirstName"
                        name="FirstName"
                        value={loginHistoryField.FirstName.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="loginHistor-textField-fontsize"
                      />
                    </Col>

                    <Col lg={3} md={3} sm={12}>
                      <TextField
                        placeholder="LastName"
                        name="LastName"
                        value={loginHistoryField.LastName.value}
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
                  </Row>
                  <Row className="mt-3">
                    <Col lg={3} md={3} sm={12}>
                      <Select
                        name="corporateCategoryID"
                        options={selectCategory}
                        value={selectCategoryValue}
                        isSearchable={true}
                        onChange={selectCategoryOnchangeHandler}
                        placeholder="Category"
                        className="loginHistor-textField-fontsize"
                      />
                    </Col>
                    <Col
                      lg={8}
                      md={8}
                      sm={12}
                      className="LoginHistory-Datepicker"
                    >
                      <DatePicker
                        {...startDateProps}
                        onPropsChange={setStartDateProps}
                        placeholder="Start date"
                        showOtherDays={true}
                        inputClass="LoginHistory-Datepicker-left"
                      />
                      <label className="LoginHistory-date-to">to</label>

                      <DatePicker
                        {...endDateProps}
                        onPropsChange={setEndDateProps}
                        placeholder="End Date"
                        showOtherDays={true}
                        inputClass="LoginHistory-Datepicker-right"
                      />
                    </Col>
                    <Col lg={1} md={1} sm={12} />
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
                        onClick={searchButtonHit}
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
                      {auth.Spinner === true ? (
                        <span className="customer-login-user-spinner">
                          <Spin size="large" />
                        </span>
                      ) : (
                        <Table
                          column={columns}
                          rows={rows}
                          pagination={false}
                          className="LoginHistory-table"
                        />
                      )}
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
