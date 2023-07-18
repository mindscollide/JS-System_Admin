import React, { Fragment, useState, useRef } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
  Loader,
} from "../../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../../../commen/functions/emailValidation";
import { useNavigate } from "react-router-dom";
import {
  allUserRoles,
  getStatusApi,
} from "../../../../store/actions/Auth-Actions";

import {
  getUserBank,
  searchBankUserList,
  updateByUserIdBank,
  bankListGetSearchApi, // THIS API FOR RENDERING AND SEARCHING
} from "../../../../store/actions/Security-Admin";
import BankUserListModal from "../../AdminModal/Bank-User-list-Modal/BankUserListModal";
import Select from "react-select";
import { Spin, Pagination } from "antd";
import "./BankList.css";
import { useEffect } from "react";

const BankList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, securityReducer } = useSelector((state) => state);
  console.log(auth, securityReducer, "systemAdminsystemAdmin");
  let bankUserBankId =
    localStorage.getItem("bankID") != undefined &&
    localStorage.getItem("bankID") != null
      ? localStorage.getItem("bankID")
      : 1;

  let currentPageSize = localStorage.getItem("BankListSize")
    ? localStorage.getItem("BankListSize")
    : 50;
  let currentPage = localStorage.getItem("BankListPage")
    ? localStorage.getItem("BankListPage")
    : 1;

  //this the email Ref for copy paste handler
  const emailRef = useRef(null);

  // state for table rows
  const [rows, setRows] = useState([]);
  const [totalRecords, setTotalRecord] = useState(0);

  //state for user Roles
  const [selectRole, setSelectRole] = useState([]);
  const [selectRoleValue, setSelectRoleValue] = useState([]);

  // state for user Status
  const [selectStatus, setSelectStatus] = useState([]);
  const [selectStatusValue, setSelectStatusValue] = useState([]);

  //state for bank view status
  const [selectViewModalStatus, setSelectViewModalStatus] = useState([]);
  const [selectViewModalStatusValue, setSelectViewModalStatusValue] = useState(
    []
  );

  // state for view bank modal
  const [bankModal, setBankModal] = useState(false);

  //dispatch userrole list api
  useEffect(() => {
    dispatch(allUserRoles(navigate));
    dispatch(getStatusApi(navigate));
    let newDataBank = {
      FirstName: "",
      LastName: "",
      RoleID: 0,
      StatusID: 0,
      LDAPAccount: "",
      Email: "",
      PageNumber: 1,
      Length: 50,
    };
    localStorage.setItem("BankListSize", 50);
    localStorage.setItem("BankListPage", 1);
    dispatch(bankListGetSearchApi(navigate, newDataBank));
  }, []);

  // this api is used for table data rendering
  useEffect(() => {
    if (
      securityReducer.searchGetBankUserList.length > 0 &&
      securityReducer.searchGetBankUserList !== null &&
      securityReducer.searchGetBankUserList !== undefined
    ) {
      setRows(securityReducer.searchGetBankUserList);
    } else {
      setRows([]);
    }
  }, [securityReducer.searchGetBankUserList]);

  //state for bank list fields
  const [bankListFields, setBankListFields] = useState({
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

    LDAPAccount: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    userRoles: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    userStatus: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    BankId: {
      value: bankUserBankId ? bankUserBankId : 1,
      errorMessage: "",
      errorStatus: false,
    },
  });

  // state for BanKList View Modal
  const [bankViewField, setBankViewField] = useState({
    firstName: "",
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

    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    userRoleID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    userID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    userStatus: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    LDAPAccount: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });
  console.log(bankViewField, "bankViewFieldbankViewFieldbankViewField");
  // validation for bank view Modal
  const bankViewValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "FirstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setBankViewField({
          ...bankViewField,
          FirstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "FirstName" && value === "") {
      setBankViewField({
        ...bankViewField,
        FirstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "LastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setBankViewField({
          ...bankViewField,
          LastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LastName" && value === "") {
      setBankViewField({
        ...bankViewField,
        LastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setBankViewField({
          ...bankViewField,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setBankViewField({
        ...bankViewField,
        Email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  //userStatus on select dropdown
  //onChange for modaledit userStatus state passing props in modal on bottom
  const SelectStatusBankViewModalHandler = (selectStatus) => {
    console.log(selectStatus, "check");
    setBankViewField({
      ...bankViewField,
      userStatus: {
        value: selectStatus.value,
        label: selectStatus.label,
        errorMessage: "",
        errorStatus: false,
      },
    });
  };

  // func to open viewBankModal
  const openViewModal = async (record) => {
    console.log(record, "recordrecord");
    try {
      if (Object.keys(record).length > 0) {
        console.log(record, "openViewCustomerModal");
        await setBankViewField({
          ...bankViewField,
          firstName: record.firstName,
          userID: {
            value: record.userID,
            errorMessage: "",
            errorStatus: false,
          },
          Email: {
            value: record.email,
            errorMessage: "",
            errorStatus: false,
          },
          FirstName: {
            value: record.firstName,
            errorMessage: "",
            errorStatus: false,
          },
          LastName: {
            value: record.lastname,
            errorMessage: "",
            errorStatus: false,
          },
          userStatus: {
            value: record.userStatusID,
            errorMessage: "",
            errorStatus: false,
          },
          userRoleID: {
            value: record.userRoleID,
            errorMessage: "",
            errorStatus: false,
          },
          LDAPAccount: {
            value: record.ldapAccount,
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
      setBankModal(true);
    } catch {
      console.log("error on TextFields");
    }
  };

  // on search Button hit in bank user list
  const onSearchHit = async () => {
    let bankUserSearch = {
      FirstName: bankListFields.FirstName.value,
      LastName: bankListFields.LastName.value,
      RoleID: bankListFields.userRoles.value,
      StatusID: bankListFields.userStatus.value,
      LDAPAccount: bankListFields.LDAPAccount.value,
      Email: bankListFields.Email.value,
      PageNumber: currentPage !== null ? parseInt(currentPage) : 1,
      Length: currentPageSize !== null ? parseInt(currentPageSize) : 50,
    };
    await dispatch(bankListGetSearchApi(navigate, bankUserSearch));
  };

  // onchange of bankList Pagination Handler
  const BankListPagination = async (current, pageSize) => {
    let bankUserSearch = {
      FirstName: bankListFields.FirstName.value,
      LastName: bankListFields.LastName.value,
      RoleID: bankListFields.userRoles.value,
      StatusID: bankListFields.userStatus.value,
      LDAPAccount: bankListFields.LDAPAccount.value,
      Email: bankListFields.Email.value,
      PageNumber: current !== null ? parseInt(current) : 1,
      Length: pageSize !== null ? parseInt(pageSize) : 50,
    };
    localStorage.setItem("BankListSize", pageSize);
    localStorage.setItem("BankListPage", current);
    await dispatch(bankListGetSearchApi(navigate, bankUserSearch));
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

  //on update button click in bank view modal
  const updateUserByBankIdOnClick = () => {
    let newBankUserData = {
      user: {
        FirstName: bankViewField.FirstName.value,
        Lastname: bankViewField.LastName.value,
        UserRoleID: bankViewField.userRoleID.value,
        Email: bankViewField.Email.value,
        UserID: bankViewField.userID.value,
      },
    };

    let bankUserSearch = {
      FirstName: "",
      LastName: "",
      RoleID: 0,
      StatusID: 0,
      LDAPAccount: "",
      Email: "",
      PageNumber: 1,
      Length: 50,
    };
    dispatch(
      updateByUserIdBank(
        navigate,
        newBankUserData,
        setBankModal,
        bankUserSearch
        // newBankList
      )
    );
  };

  // validation for customer List
  const bankListValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "FirstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setBankListFields({
          ...bankListFields,
          FirstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "FirstName" && value === "") {
      setBankListFields({
        ...bankListFields,
        FirstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "LastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setBankListFields({
          ...bankListFields,
          LastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LastName" && value === "") {
      setBankListFields({
        ...bankListFields,
        LastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "LDAPAccount" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setBankListFields({
          ...bankListFields,
          LDAPAccount: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LDAPAccount" && value === "") {
      setBankListFields({
        ...bankListFields,
        LDAPAccount: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setBankListFields({
          ...bankListFields,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setBankListFields({
        ...bankListFields,
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
    if (bankListFields.Email.value !== "") {
      if (validateEmail(bankListFields.Email.value)) {
        // alert("Email verified");
        console.log("valid email");
      } else {
        // alert("Email Not Verified");
        console.log("Invalid Email");
      }
    }
  };

  //reset handler
  const bankResetHandler = () => {
    setBankListFields({
      ...bankListFields,
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

      LDAPAccount: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },

      Email: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },

      userRoles: {
        value: 0,
        errorMessage: "",
        errorStatus: false,
      },

      userStatus: {
        value: 0,
        errorMessage: "",
        errorStatus: false,
      },

      BankId: {
        value: bankUserBankId ? bankUserBankId : 1,
        errorMessage: "",
        errorStatus: false,
      },
    });
    setSelectStatusValue([]);
    setSelectRoleValue([]);
    let newDataBank = {
      FirstName: "",
      LastName: "",
      RoleID: 0,
      StatusID: 0,
      LDAPAccount: "",
      Email: "",
      PageNumber: 1,
      Length: 50,
    };
    localStorage.setItem("BankListSize", 50);
    localStorage.setItem("BankListPage", 1);
    dispatch(bankListGetSearchApi(navigate, newDataBank));
  };

  //on change handler for user select role
  const selectRoleOnchangeHandler = async (selectedUserRole) => {
    console.log(selectedUserRole, "selectedUserRole");
    setSelectRoleValue(selectedUserRole);
    setBankListFields({
      ...bankListFields,
      userRoles: {
        value: selectedUserRole.value,
        label: selectedUserRole.label,
      },
    });
  };

  //on change handler for user select status
  const selectUserStatusOnchangeHandler = async (selectStatus) => {
    console.log(selectStatus, "selectStatusselectStatus");
    setSelectStatusValue(selectStatus);
    setBankListFields({
      ...bankListFields,
      userStatus: {
        value: selectStatus.value,
        label: selectStatus.label,
      },
    });
  };

  // to render data in dropdown for role list
  useEffect(() => {
    if (Object.keys(auth.UserRoleslist).length > 0) {
      let tem = [];
      auth.UserRoleslist.map((data, index) => {
        console.log(data, "datadatadatadatassssss");
        tem.push({
          label: data.roleName,
          value: data.roleID,
        });
      });
      setSelectRole(tem);
    }
  }, [auth.UserRoleslist]);

  // to render data in dropdown for user status
  useEffect(() => {
    if (Object.keys(auth.allUserStatus).length > 0) {
      let tem = [];
      auth.allUserStatus.map((data, index) => {
        console.log(data, "datadatadatadatassssss");
        tem.push({
          label: data.statusName,
          value: data.statusID,
        });
      });
      setSelectStatus(tem);
    }
  }, [auth.allUserStatus]);

  //Table columns for customer List
  const columns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "200px",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        console.log(record, "recordrecord");
        return (
          <label
            className="table-columns-Banklist"
            onClick={() => openViewModal(record)}
          >
            {text}
          </label>
        );
      },
    },
    {
      title: <label className="bottom-table-header">First Name</label>,
      dataIndex: "firstName",
      key: "firstName",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Last Name</label>,
      dataIndex: "lastname",
      key: "lastname",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">LDAP Account</label>,
      dataIndex: "ldapAccount",
      key: "ldapAccount",
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Role</label>,
      dataIndex: "userRoleID",
      key: "userRoleID",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "userStatusID",
      key: "userStatusID",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  return (
    <section className="SectionContainer">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="customer-List-label">Bank User List</span>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className="customer-List-paper">
            <Row className="mt-3">
              <Col lg={3} md={3} sm={12}>
                <TextField
                  placeholder="First Name"
                  name="FirstName"
                  value={bankListFields.FirstName.value}
                  onChange={bankListValidation}
                  labelClass="d-none"
                  className="textfields-customer-list-fontsize"
                />
              </Col>
              <Col lg={3} md={3} sm={12}>
                <TextField
                  placeholder="Last Name"
                  name="LastName"
                  value={bankListFields.LastName.value}
                  onChange={bankListValidation}
                  labelClass="d-none"
                  className="textfields-customer-list-fontsize"
                />
              </Col>
              <Col lg={3} md={3} sm={12}>
                <TextField
                  placeholder="Email"
                  name="Email"
                  value={bankListFields.Email.value}
                  onChange={bankListValidation}
                  onBlur={handlerEmail}
                  onPaste={emailHandlerPaste}
                  onCopy={emailHandlerCopy}
                  ref={emailRef}
                  labelClass="d-none"
                  className="textfields-customer-list-fontsize"
                />
              </Col>
              <Col lg={3} md={3} sm={12}>
                <TextField
                  placeholder="LDAP Account"
                  name="LDAPAccount"
                  value={bankListFields.LDAPAccount.value}
                  onChange={bankListValidation}
                  labelClass="d-none"
                  className="textfields-customer-list-fontsize"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={3} md={3} sm={12}>
                <Select
                  placeholder="Role"
                  name="userRoles"
                  onChange={selectRoleOnchangeHandler}
                  options={selectRole}
                  value={selectRoleValue}
                  isSearchable={true}
                  className="select-customer-list-fontsize"
                />
              </Col>
              <Col lg={3} md={3} sm={12}>
                <Select
                  name="userStatus"
                  isSearchable={true}
                  options={selectStatus}
                  value={selectStatusValue}
                  onChange={selectUserStatusOnchangeHandler}
                  placeholder="Status"
                  className="select-customer-list-fontsize"
                />
              </Col>
              <Col lg={6} md={6} sm={12} />
            </Row>

            <Row className="mt-3">
              <Col lg={12} md={12} sm={12} className="customer-list-col-fields">
                <Button
                  icon={<i className="icon-search icon-check-space"></i>}
                  className="Search-btn-BankList"
                  onClick={onSearchHit}
                  text="Search"
                />
                <Button
                  icon={<i className="icon-refresh icon-check-space"></i>}
                  onClick={bankResetHandler}
                  className="Banklist-Reset-btn"
                  text="Reset"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                {securityReducer.Spinner === true ? (
                  <span className="customer-login-user-spinner">
                    <Spin size="large" />
                  </span>
                ) : (
                  <Table
                    column={columns}
                    rows={rows}
                    pagination={false}
                    // scroll={{
                    //   y: 240,
                    // }}
                    // scroll={{ x: 500, y: 200 }}
                    className="BankUserList-table"
                  />
                )}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={12} md={12} sm={12}>
                <Pagination
                  total={totalRecords}
                  onChange={BankListPagination}
                  current={currentPage !== null ? currentPage : 1}
                  showSizeChanger
                  pageSizeOptions={[50, 100, 200]}
                  pageSize={currentPageSize !== null ? currentPageSize : 50}
                  className="PaginationStyle-CustomerLogin"
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {bankModal ? (
        <Fragment>
          <BankUserListModal
            viewBankModal={bankModal}
            setViewBankModal={setBankModal}
            bankViewField={bankViewField}
            setBankViewField={setBankViewField}
            bankValidation={bankViewValidation}
            onChangeStatusSelect={SelectStatusBankViewModalHandler}
            statusRoleOption={selectStatus}
            updateUserByBankIdOnClick={updateUserByBankIdOnClick}
          />
        </Fragment>
      ) : null}
      {securityReducer.Loading || auth.Loading ? <Loader /> : null}
    </section>
  );
};

export default BankList;
