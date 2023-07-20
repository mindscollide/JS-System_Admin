import React, { Fragment, useState, useEffect, useRef } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Notification,
  Button,
  Table,
  Loader,
} from "../../../../components/elements";
import { validateEmail } from "../../../../commen/functions/emailValidation";
import { bankUserSeacrhGetLogin } from "../../../../store/actions/Auth-Actions";
import { bankUserDownloadReport } from "../../../../store/actions/Download-Report";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Spin, Pagination } from "antd";
import "./UserLogin.css";
import moment from "moment";
import DatePicker from "react-multi-date-picker";
import { useSelector, useDispatch } from "react-redux";

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalRecords, setTotalRecord] = useState(0);
  const { auth, downloadReducer } = useSelector((state) => state);

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  // state for set data from api in rows
  const [rows, setRows] = useState([]);

  //this the email Ref for copy paste handler
  const emailRef = useRef(null);

  // state for disable the previous date from end date by selecting date from start date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // select current date
  const minDate = new Date();

  let bankUserBankId = localStorage.getItem("bankID");

  let currentPageSize = localStorage.getItem("BankLoginHistorySize")
    ? localStorage.getItem("BankLoginHistorySize")
    : 50;
  let currentPage = localStorage.getItem("BankLoginHistoryPage")
    ? localStorage.getItem("BankLoginHistoryPage")
    : 1;

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
  console.log(userLoginHistory, "userLoginHistoryuserLoginHistory");

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
      Length: 50,
      BankID: parseInt(bankUserBankId),
    };
    dispatch(bankUserSeacrhGetLogin(navigate, newDataa));
  }, []);

  // this api is used for table data rendering
  useEffect(() => {
    if (
      auth.bankGetSearchLoginHistory.length > 0 &&
      auth.bankGetSearchLoginHistory !== null &&
      auth.bankGetSearchLoginHistory !== undefined &&
      auth.bankGetSearchLoginHistory !== ""
    ) {
      setRows(auth.bankGetSearchLoginHistory);
      setOpen({
        ...open,
        open: true,
        message: "Record Found",
      });
    } else {
      setRows([]);
      setOpen({
        ...open,
        open: true,
        message: "No Record Found",
      });
    }
  }, [auth.bankGetSearchLoginHistory]);

  //start date state of multi datepicker
  const changeDateStartHandler = (date) => {
    setStartDate(date);
    setEndDate(null);
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
    setEndDate(date);
    let newEndDate = moment(date).format("YYYY-MM-DD");
    setUserLoginHistory({
      ...userLoginHistory,
      endDate: {
        value: newEndDate,
      },
    });
    console.log(newEndDate, "changeDateEndHandler");
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

  // this is the paste handler for email in which extra space doesn't paste
  const emailHandlerPaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData("text/plain");
    const trimmedText = pastedText.trim();

    const input = emailRef.current;
    document.execCommand("insertText", false, trimmedText);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };

  // this is the copy handler in which copy doesn't allow to copy extra space
  const emailHandlerCopy = (event) => {
    event.preventDefault();
    const input = emailRef.current;
    input.select();
    document.execCommand("copy");
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
      PageNumber: currentPage !== null ? parseInt(currentPage) : 1,
      Length: currentPageSize !== null ? parseInt(currentPageSize) : 50,
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
    if (newReportData !== "") {
      setOpen({
        ...open,
        open: true,
        message: "Download Successfully",
      });
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Download Failed",
      });
    }
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
      Length: 50,
      BankID: parseInt(bankUserBankId),
    };
    dispatch(bankUserSeacrhGetLogin(navigate, newDataa));
  };

  // onChange Handler for pagination
  const BankLoginPagination = async (current, pageSize) => {
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
      PageNumber: current !== null ? parseInt(current) : 1,
      Length: pageSize !== null ? parseInt(pageSize) : 50,
      BankID: parseInt(bankUserBankId),
    };
    localStorage.setItem("BankLoginHistorySize", pageSize);
    localStorage.setItem("BankLoginHistoryPage", current);
    await dispatch(bankUserSeacrhGetLogin(navigate, seacrhBankData));
  };

  // column for LoginHistory
  const userColumns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      align: "center",
      width: "200px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">First Name</label>,
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Last Name</label>,
      dataIndex: "lastName",
      key: "lastName",
      width: "100px",
      ellipsis: true,
      align: "center",
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
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
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
      width: "180px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Interface</label>,
      dataIndex: "interface",
      key: "interface",
      width: "180px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  return (
    <section className="SectionClasscontainer">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="UserHistory-label"> Bank User Login History</span>
        </Col>
      </Row>
      <Row className="mt-2">
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
                  onPaste={emailHandlerPaste}
                  onCopy={emailHandlerCopy}
                  ref={emailRef}
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
                  selected={startDate}
                  highlightToday={true}
                  onOpenPickNewDate={false}
                  value={userLoginHistory.startDate.value}
                  placeholder="Start date"
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  showOtherDays={true}
                  onChange={(value) =>
                    changeDateStartHandler(value?.toDate?.().toString())
                  }
                  inputClass="userLoginHistory-Datepicker-left"
                />
                <label className="userLoginHistory-date-to">to</label>

                <DatePicker
                  selected={endDate}
                  highlightToday={true}
                  onOpenPickNewDate={false}
                  value={userLoginHistory.endDate.value}
                  placeholder="End Date"
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={
                    startDate ? moment(startDate).add(1, "days").toDate() : null
                  }
                  showOtherDays={true}
                  onChange={(value) =>
                    changeDateEndHandler(value?.toDate?.().toString())
                  }
                  inputClass="userLoginHistory-Datepicker-right"
                />
              </Col>

              <Col lg={9} md={9} sm={12} />
            </Row>
            <Row className="mt-3">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-2"
              >
                <Button
                  text="Search"
                  onClick={searchButtonHit}
                  icon={<i className="icon-search Icons-right"></i>}
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
                  icon={<i className="icon-download-excel Icons-right"></i>}
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
                    // scroll={{ x: 500, y: 200 }}
                    className="UserHistory-table"
                  />
                )}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={12} md={12} sm={12}>
                <Pagination
                  total={totalRecords}
                  onChange={BankLoginPagination}
                  current={currentPage !== null ? currentPage : 1}
                  showSizeChanger
                  pageSizeOptions={[30, 50, 100, 200]}
                  pageSize={currentPageSize !== null ? currentPageSize : 50}
                  className="PaginationStyle-CustomerLogin"
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {downloadReducer.Loading ? <Loader /> : null}
    </section>
  );
};

export default UserLogin;
