import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
  Loader,
} from "../../../../components/elements";
import { validateEmail } from "../../../../commen/functions/emailValidation";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategoriesCorporate, //this api is for category
  userSearhGetLoginHistory, //this api is used for rendering and searching
} from "../../../../store/actions/Auth-Actions";
import { corporateNameByBankId } from "../../../../store/actions/System-Admin";
import { downloadCorporateLoginReports } from "../../../../store/actions/Download-Report";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import moment from "moment";
import DatePicker from "react-multi-date-picker";
import "./LoginHistory.css";

const LoginHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, systemReducer, downloadReducer } = useSelector(
    (state) => state
  );
  console.log(auth, "aaaa");
  // state for row in which table data set
  const [rows, setRows] = useState([]);

  // state for category dropdown
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectCategoryValue, setSelectCategoryValue] = useState([]);

  // state for company dropdown
  const [selectCompany, setSelectCompany] = useState([]);
  const [selectCompanyValue, setSelectCompanyValue] = useState([]);

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

    corporateNames: {
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    BankID: {
      value: 1,
      errorMessage: "",
      errorStatus: false,
    },

    CorporateID: {
      value: 1,
      errorMessage: "",
      errorStatus: false,
    },

    corporateCategoryID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    startDate: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    endDate: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  //start date state of multi datepicker
  const changeDateStartHandler = (date) => {
    let newDate = moment(date).format("YYYY-MM-DD");
    setLoginHistoryField({
      ...loginHistoryField,
      startDate: {
        value: newDate,
      },
    });
    console.log(newDate, "changeDateStartHandler");
  };

  //end date state of multi datepicker
  const changeDateEndHandler = (date) => {
    let newEndDate = moment(date).format("YYYY-MM-DD");
    setLoginHistoryField({
      ...loginHistoryField,
      endDate: {
        value: newEndDate,
      },
    });
  };

  useEffect(() => {
    let newData = {
      FirstName: "",
      LastName: "",
      CompanyName: "",
      Email: "",
      FromDate: "",
      ToDate: "",
      CategoryID: 0,
      PageNumber: 1,
      Length: 3,
      CorporateID: 1,
    };
    dispatch(userSearhGetLoginHistory(navigate, newData));
  }, []);

  // this api is used for table data rendering
  useEffect(() => {
    if (
      auth.corporateGetSearchLoginHistory.length > 0 &&
      auth.corporateGetSearchLoginHistory !== null &&
      auth.corporateGetSearchLoginHistory !== undefined
    ) {
      setRows(auth.corporateGetSearchLoginHistory);
    } else {
      setRows([]);
    }
  }, [auth.corporateGetSearchLoginHistory]);

  // dispatch getALLCategoryDropdown and corporateNameByBankId API
  useEffect(() => {
    dispatch(getAllCategoriesCorporate(navigate));
    let corporateBank = {
      BankID: loginHistoryField.BankID.value,
    };
    dispatch(corporateNameByBankId(navigate, corporateBank));
  }, []);
  console.log(loginHistoryField, "loginHistoryFieldloginHistoryField");

  // validations on textfields onChange handler
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

  //on change for select corporate name by ank ID drop down
  const corporateBankIdSelectOnchangeHandler = async (selectCorporateName) => {
    console.log(selectCorporateName, "selectCorporateNameselectCorporateName");
    setSelectCompanyValue(selectCorporateName);
    setLoginHistoryField({
      ...loginHistoryField,
      corporateNames: {
        label: selectCorporateName.label,
      },
    });
  };

  // reset button handler
  const loginResetHandler = () => {
    setLoginHistoryField({
      ...loginHistoryField,
      FirstName: {
        value: "",
      },

      LastName: {
        value: "",
      },

      Email: {
        value: "",
      },

      startDate: {
        value: "",
      },

      endDate: {
        value: "",
      },
    });
    setSelectCategoryValue([]);
    setSelectCompanyValue([]);
    let newData = {
      FirstName: "",
      LastName: "",
      CompanyName: "",
      Email: "",
      FromDate: "",
      ToDate: "",
      CategoryID: 0,
      PageNumber: 1,
      Length: 3,
      CorporateID: 1,
    };
    dispatch(userSearhGetLoginHistory(navigate, newData));
  };

  // for search button we also hit userSearhGetLoginHistory
  const onSearchButton = async () => {
    let newSearchData = {
      FirstName: loginHistoryField.FirstName.value,
      LastName: loginHistoryField.LastName.value,
      CompanyName: loginHistoryField.corporateNames.label,
      Email: loginHistoryField.Email.value,
      FromDate:
        loginHistoryField.startDate.value !== ""
          ? moment(loginHistoryField.startDate.value).format("YYYYMMDD")
          : "",
      ToDate:
        loginHistoryField.endDate.value !== ""
          ? moment(loginHistoryField.endDate.value).format("YYYYMMDD")
          : "",
      CategoryID: loginHistoryField.corporateCategoryID.value,
      PageNumber: 1,
      Length: 3,
      CorporateID: loginHistoryField.CorporateID.value,
    };
    await dispatch(userSearhGetLoginHistory(navigate, newSearchData));
  };

  //email validation handler
  const handlerEmail = (e) => {
    if (loginHistoryField.Email.value !== "") {
      if (validateEmail(loginHistoryField.Email.value)) {
        // alert("Email verified");
        console.log("Valid Email Format");
      } else {
        console.log("Not A Valid Email Format");
      }
    }
  };

  // onclick to download report of customer user login
  const downloadExcelReport = () => {
    let data = {
      FirstName: loginHistoryField.FirstName.value,
      LastName: loginHistoryField.LastName.value,
      CompanyName: loginHistoryField.corporateNames.label,
      Email: loginHistoryField.Email.value,
      FromDate:
        loginHistoryField.startDate.value !== ""
          ? moment(loginHistoryField.startDate.value).format("YYYYMMDD")
          : "",
      ToDate:
        loginHistoryField.endDate.value !== ""
          ? moment(loginHistoryField.endDate.value).format("YYYYMMDD")
          : "",
      CategoryID: 0,
    };
    dispatch(downloadCorporateLoginReports(data));
  };

  // column for LoginHistory
  const columns = [
    {
      title: <label>Email</label>,
      dataIndex: "email",
      key: "email",
      width: "200px",
      align: "center",
      render: (text) => <label className="email-table-cursor">{text}</label>,
    },
    {
      title: <label>First Name</label>,
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      width: "150px",
      render: (text) => <label>{text}</label>,
    },
    {
      title: <label>Last Name</label>,
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      width: "150px",
      render: (text) => <label>{text}</label>,
    },
    {
      title: <label>Company</label>,
      dataIndex: "companyName",
      key: "companyName",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => <label>{text}</label>,
    },

    {
      title: <label>Ip Address</label>,
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (text) => <label>{text}</label>,
    },
    {
      title: <label>Logged Date</label>,
      dataIndex: "CombineLoginTimeDate",
      key: "CombineLoginTimeDate",
      width: "200px",
      align: "center",
      ellipsis: true,
      render: (_, record) => {
        return (
          <span>
            {moment(`${record.loginDate} ${record.loginTime}`).format(
              "YYYY-MM-DD HH:MM:ss"
            )}{" "}
          </span>
        );
      },
    },

    {
      title: <label>LoggedOut Date</label>,
      dataIndex: "CombineLoginOutTimeDate",
      key: "CombineLoginOutTimeDate",
      width: "200px",
      align: "center",
      ellipsis: true,
      render: (_, record) => {
        return (
          <span>
            {moment(`${record.logOutDate} ${record.logOutTime}`).format(
              "YYYY-MM-DD HH:MM:ss"
            )}
          </span>
        );
      },
    },
    {
      title: <label>Total Span</label>,
      dataIndex: "totalSpan",
      key: "totalSpan",
      width: "200px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label>Interface</label>,
      dataIndex: "interface",
      key: "interface",
      width: "200px",
      align: "center",
      ellipsis: true,
      render: (text) => <label>{text}</label>,
    },
  ];

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

  // for corporate Name by bank Id dropdown
  useEffect(() => {
    if (Object.keys(systemReducer.corporateNameByBankId).length > 0) {
      let tem = [];
      systemReducer.corporateNameByBankId.map((data, index) => {
        console.log(data, "corporateNameBank");
        tem.push({
          label: data.corporateName,
          value: data.corporateName,
        });
      });
      setSelectCompany(tem);
    }
  }, [systemReducer.corporateNameByBankId]);

  return (
    <Fragment>
      <section className="me-4">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <span className="LoginHistory-label">
              Customer User Login History
            </span>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
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
                  {/* <TextField
                        placeholder="Company Name"
                        name="CompanyName"
                        value={loginHistoryField.CompanyName.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="loginHistor-textField-fontsize"
                      /> */}
                  <Select
                    name="corporateNames"
                    options={selectCompany}
                    value={selectCompanyValue}
                    isSearchable={true}
                    onChange={corporateBankIdSelectOnchangeHandler}
                    placeholder="Company"
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
                <Col lg={8} md={8} sm={12} className="LoginHistory-Datepicker">
                  <DatePicker
                    // {...startDateProps}
                    // onPropsChange={setStartDateProps}
                    value={loginHistoryField.startDate.value}
                    placeholder="Start date"
                    showOtherDays={true}
                    onChange={(value) =>
                      changeDateStartHandler(value?.toDate?.().toString())
                    }
                    inputClass="LoginHistory-Datepicker-left"
                  />
                  <label className="LoginHistory-date-to">to</label>

                  <DatePicker
                    // {...endDateProps}
                    // onPropsChange={setEndDateProps}
                    value={loginHistoryField.endDate.value}
                    placeholder="End Date"
                    showOtherDays={true}
                    onChange={(value) =>
                      changeDateEndHandler(value?.toDate?.().toString())
                    }
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
                    onClick={onSearchButton}
                    icon={<i className="icon-search Icons-right"></i>}
                    className={"Search-HistoryLogin-btn"}
                  />
                  <Button
                    text="Reset"
                    icon={<i className="icon-refresh Icons-right"></i>}
                    onClick={loginResetHandler}
                    className={"Reset-btn-login"}
                  />
                  <Button
                    text="Downlaod Excel"
                    onClick={downloadExcelReport}
                    icon={<i className="icon-download-excel Icons-right"></i>}
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
                      pagination={true}
                      // scroll={{ y: "500", x: "500" }}
                      className="LoginHistory-table"
                    />
                  )}
                </Col>
              </Row>
            </CustomPaper>
          </Col>
        </Row>
      </section>
      {downloadReducer.Loading ? <Loader /> : null}
    </Fragment>
  );
};

export default LoginHistory;
