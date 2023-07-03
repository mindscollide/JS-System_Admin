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
import { bankUserSeacrhGetLogin } from "../../../../store/actions/Auth-Actions";
import { bankUserDownloadReport } from "../../../../store/actions/Download-Report";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import "./UserLogin.css";
import moment from "moment";
import DatePicker from "react-multi-date-picker";
import { useSelector, useDispatch } from "react-redux";

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, downloadReducer } = useSelector((state) => state);
  // state for set data from api in rows
  const [rows, setRows] = useState([]);
  let bankUserBankId = localStorage.getItem("bankID");

  // state for category dropdown
  const [selectCategoryBank, setSelectCategoryBank] = useState([]);
  const [selectCategoryBankValue, setSelectCategoryBankValue] = useState([]);

  // state for LoginHistory fields
  const [userLoginHistory, setUserLoginHistory] = useState({
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
    corporateCategoryID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    BankName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    startDate: {
      value: "",
    },

    endDate: {
      value: "",
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
  });

  // dispatch api for bankSearchGet
  useEffect(() => {
    let newDataa = {
      FirstName: "",
      LastName: "",
      BankName: "",
      Email: "",
      FromDate: "",
      ToDate: "",
      PageNumber: 1,
      Length: 3,
      BankID: parseInt(bankUserBankId),
    };
    dispatch(bankUserSeacrhGetLogin(navigate, newDataa));
  }, []);

  // this api is used for table data rendering
  useEffect(() => {
    if (
      auth.bankGetSearchLoginHistory.length > 0 &&
      auth.bankGetSearchLoginHistory !== null &&
      auth.bankGetSearchLoginHistory !== undefined
    ) {
      setRows(auth.bankGetSearchLoginHistory);
    } else {
      setRows([]);
    }
  }, [auth.bankGetSearchLoginHistory]);

  //start date state of multi datepicker
  const changeDateStartHandler = (date) => {
    let newDate = moment(date).format("YYYY-MM-DD");
    setUserLoginHistory({
      ...userLoginHistory,
      startDate: {
        value: newDate,
      },
    });
    console.log(newDate, "changeDateStartHandler");
  };

  //end date state of multi datepicker
  const changeDateEndHandler = (date) => {
    let newEndDate = moment(date).format("YYYY-MM-DD");
    setUserLoginHistory({
      ...userLoginHistory,
      endDate: {
        value: newEndDate,
      },
    });
  };

  const userLoginValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "FirstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserLoginHistory({
          ...userLoginHistory,
          FirstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "FirstName" && value === "") {
      setUserLoginHistory({
        ...userLoginHistory,
        FirstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "LastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserLoginHistory({
          ...userLoginHistory,
          LastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LastName" && value === "") {
      setUserLoginHistory({
        ...userLoginHistory,
        LastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "BankName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserLoginHistory({
          ...userLoginHistory,
          BankName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "BankName" && value === "") {
      setUserLoginHistory({
        ...userLoginHistory,
        BankName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setUserLoginHistory({
          ...userLoginHistory,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setUserLoginHistory({
        ...userLoginHistory,
        Email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  // api hit on seacrh btn
  const searchButtonHit = async () => {
    let seacrhBankData = {
      FirstName: userLoginHistory.FirstName.value,
      LastName: userLoginHistory.LastName.value,
      BankName: userLoginHistory.BankName.value,
      Email: userLoginHistory.Email.value,
      FromDate:
        userLoginHistory.startDate.value !== ""
          ? moment(userLoginHistory.startDate.value).format("YYYYMMDD")
          : "",
      ToDate:
        userLoginHistory.endDate.value !== ""
          ? moment(userLoginHistory.endDate.value).format("YYYYMMDD")
          : "",
      PageNumber: 1,
      Length: 3,
      BankID: parseInt(bankUserBankId),
    };
    await dispatch(bankUserSeacrhGetLogin(navigate, seacrhBankData));
  };

  // api hit on download report bank user
  const downloadExcelBankReport = () => {
    let newReportData = {
      FirstName: userLoginHistory.FirstName.value,
      LastName: userLoginHistory.LastName.value,
      Email: userLoginHistory.Email.value,
      BankName: userLoginHistory.BankName.value,
      FromDate:
        userLoginHistory.startDate.value !== ""
          ? moment(userLoginHistory.startDate.value).format("YYYYMMDD")
          : "",
      ToDate:
        userLoginHistory.endDate.value !== ""
          ? moment(userLoginHistory.endDate.value).format("YYYYMMDD")
          : "",
    };
    dispatch(bankUserDownloadReport(newReportData));
  };

  //ON CHANGE HANDLER FOR CATEGORY DROPDOWN
  const selectCategoryOnchangeHandler = async (selectedCategory) => {
    console.log(selectedCategory, "selectedOptionselectedOption");
    setSelectCategoryBankValue(selectedCategory);
    setUserLoginHistory({
      ...userLoginHistory,
      corporateCategoryID: {
        value: selectedCategory.value,
        label: selectedCategory.label,
      },
    });
  };

  //email validation handler
  const handlerEmail = () => {
    if (userLoginHistory.Email.value !== "") {
      if (validateEmail(userLoginHistory.Email.value)) {
        console.log("valid Email");
        // alert("Email verified");
      } else {
        console.log("InValid Email");
        // alert("Email Not Verified");
      }
    }
  };

  // reset handler
  const resetBankhandler = () => {
    setUserLoginHistory({
      ...userLoginHistory,
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
    let newDataa = {
      FirstName: "",
      LastName: "",
      BankName: "",
      Email: "",
      FromDate: "",
      ToDate: "",
      PageNumber: 1,
      Length: 3,
      BankID: parseInt(bankUserBankId),
    };
    dispatch(bankUserSeacrhGetLogin(navigate, newDataa));
  };

  // column for LoginHistory
  const userColumns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      align: "center",
      width: "250px",
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
      width: "150px",
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    // {
    //   title: <label className="bottom-table-header">Company</label>,
    //   dataIndex: "companyName",
    //   key: "companyName",
    //   width: "100px",
    //   align: "center",
    //   ellipsis: true,
    //   render: (text) => <label className="issue-date-column">{text}</label>,
    // },
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
    // {
    //   title: <label className="bottom-table-header">LogIn Date</label>,
    //   dataIndex: "loginDate",
    //   key: "loginDate",
    //   width: "150px",
    //   align: "center",
    //   ellipsis: true,
    //   render: (text) => <label className="issue-date-column">{text}</label>,
    // },
    // {
    //   title: <label className="bottom-table-header">Logged In Time</label>,
    //   dataIndex: "loginTime",
    //   key: "loginTime",
    //   align: "center",
    //   width: "150px",
    //   ellipsis: true,
    //   render: (text) => <label className="issue-date-column">{text}</label>,
    // },
    {
      title: <label className="bottom-table-header">LoggedIn Date</label>,
      dataIndex: "CombineLoginInTimeDate",
      key: "CombineLoginInTimeDate",
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
    // {
    //   title: <label className="bottom-table-header">LogOut Date</label>,
    //   dataIndex: "logOutDate",
    //   key: "logOutDate",
    //   width: "200px",
    //   align: "center",
    //   ellipsis: true,
    //   render: (text) => <label className="issue-date-column">{text}</label>,
    // },
    // {
    //   title: <label className="bottom-table-header">Logged Out Time</label>,
    //   dataIndex: "logOutTime",
    //   key: "logOutTime",
    //   width: "200px",
    //   align: "center",
    //   ellipsis: true,
    //   render: (text) => <label className="issue-date-column">{text}</label>,
    // },
    {
      title: <label className="bottom-table-header">LoggOut Date</label>,
      dataIndex: "CombineLoggedOutTimeDate",
      key: "CombineLoggedOutTimeDate",
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
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  return (
    <Fragment>
      <section className="me-4">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <span className="UserHistory-label"> Bank User Login History</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <CustomPaper className="UserHistory-paper">
              <Row className="mt-3">
                <Col lg={4} md={4} sm={12}>
                  <TextField
                    placeholder="First Name"
                    name="FirstName"
                    value={userLoginHistory.FirstName.value}
                    onChange={userLoginValidation}
                    labelClass="d-none"
                    className="UserHistory-textField-fontsize"
                  />
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <TextField
                    placeholder="Last Name"
                    name="LastName"
                    value={userLoginHistory.LastName.value}
                    onChange={userLoginValidation}
                    labelClass="d-none"
                    className="UserHistory-textField-fontsize"
                  />
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <TextField
                    placeholder="Email"
                    name="Email"
                    value={userLoginHistory.Email.value}
                    onBlur={handlerEmail}
                    onChange={userLoginValidation}
                    labelClass="d-none"
                    className="UserHistory-textField-fontsize"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  className="userLoginHistory-Datepicker"
                >
                  <DatePicker
                    value={userLoginHistory.startDate.value}
                    placeholder="Start date"
                    showOtherDays={true}
                    onChange={(value) =>
                      changeDateStartHandler(value?.toDate?.().toString())
                    }
                    inputClass="userLoginHistory-Datepicker-left"
                  />
                  <label className="userLoginHistory-date-to">to</label>

                  <DatePicker
                    value={userLoginHistory.endDate.value}
                    placeholder="End Date"
                    showOtherDays={true}
                    onChange={(value) =>
                      changeDateEndHandler(value?.toDate?.().toString())
                    }
                    inputClass="userLoginHistory-Datepicker-right"
                  />
                </Col>

                <Col lg={9} md={9} sm={12} />
              </Row>
              <Row className="mt-2">
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
                    className={"Search-BankUserHistory-btn"}
                  />
                  <Button
                    text="Reset"
                    icon={<i className="icon-refresh Icons-right"></i>}
                    onClick={resetBankhandler}
                    className={"Reset-btn-userBankLogin"}
                  />
                  <Button
                    text="Downlaod Excel"
                    onClick={downloadExcelBankReport}
                    icon={<i className="icon-download-excel"></i>}
                    className={"Download-Bank-Excel-btn"}
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
                      column={userColumns}
                      rows={rows}
                      pagination={false}
                      className="UserHistory-table"
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

export default UserLogin;
