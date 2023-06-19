import React, { Fragment, useState } from "react";
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

import { getUserBank } from "../../../../store/actions/Security-Admin";
import Select from "react-select";
import { Spin } from "antd";
import "./BankList.css";
import { useEffect } from "react";

const BankList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { systemReducer, auth, securityReducer } = useSelector(
    (state) => state
  );
  console.log(systemReducer, auth, securityReducer, "systemAdminsystemAdmin");

  // state for table rows
  const [rows, setRows] = useState([]);

  //state for user Roles
  const [selectRole, setSelectRole] = useState([]);
  const [selectRoleValue, setSelectRoleValue] = useState([]);

  // state for user Status
  const [selectStatus, setSelectStatus] = useState([]);
  const [selectStatusValue, setSelectStatusValue] = useState([]);

  //dispatch userrole list api
  useEffect(() => {
    dispatch(allUserRoles(navigate));
    dispatch(getStatusApi(navigate));
  }, []);

  //state for customer list fields
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

    ldapAccount: {
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
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    userStatus: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    BankId: {
      value: 1,
      errorMessage: "",
      errorStatus: false,
    },
  });

  // dispatch get all bank user list API
  useEffect(() => {
    let newBankList = {
      BankId: bankListFields.BankId.value,
    };
    dispatch(getUserBank(navigate, newBankList));
  }, []);

  //this use Effect is used to show bank user list data in table
  useEffect(() => {
    if (
      securityReducer.bankUserList !== null &&
      securityReducer.bankUserList !== undefined &&
      securityReducer.bankUserList.length > 0
    ) {
      setRows(securityReducer.bankUserList);
    } else {
      setRows([]);
    }
  }, [securityReducer.bankUserList]);

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

    if (name === "ldapAccount" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setBankListFields({
          ...bankListFields,
          ldapAccount: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "ldapAccount" && value === "") {
      setBankListFields({
        ...bankListFields,
        ldapAccount: {
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
      },

      LastName: {
        value: "",
      },

      ldapAccount: {
        value: "",
      },

      Email: {
        value: "",
      },
    });
    setSelectStatusValue([]);
    setSelectRoleValue([]);
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
      width: "150px",
      render: (text, record) => {
        console.log(record, "recordrecord");
        return <label className="table-columns">{text}</label>;
      },
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
      dataIndex: "lastname",
      key: "lastname",
      width: "150px",
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">LDAP Account</label>,
      dataIndex: "ldapAccount",
      key: "ldapAccount",
      width: "100px",
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
      dataIndex: "statusid",
      key: "statusid",
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
            <span className="customer-List-label">Bank User List</span>
          </Col>
        </Row>
        <Row className="mt-3">
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
                    labelClass="d-none"
                    className="textfields-customer-list-fontsize"
                  />
                </Col>
                <Col lg={3} md={3} sm={12}>
                  <TextField
                    placeholder="LDAP Account"
                    name="ldapAccount"
                    value={bankListFields.ldapAccount.value}
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
                <Col
                  lg={12}
                  md={12}
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
                    onClick={bankResetHandler}
                    className="Reset-btn"
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
                      className="CustomerList-table"
                    />
                  )}
                </Col>
              </Row>
            </CustomPaper>
          </Col>
        </Row>
      </section>
    </Fragment>
  );
};

export default BankList;
