import React, { Fragment, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import ViewCustomer from "../../../../container/Admin/AdminModal/View-CustomerList-Modal/ViewCustomer";
import { validateEmail } from "../../../../commen/functions/emailValidation";
import {
  getAllCorporateUserApi,
  searchUserCorporateApi,
} from "../../../../store/actions/System-Admin";
import { useNavigate } from "react-router-dom";

import {
  getAllCategoriesCorporate,
  getAllCorporateCompany,
} from "../../../../store/actions/Auth-Actions";

import Select from "react-select";
import { Spin } from "antd";
import "./Customerlist.css";
import { useEffect } from "react";

const Customerlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { systemReducer, auth } = useSelector((state) => state);
  console.log(systemReducer, "systemAdminsystemAdmin");
  // state for modal customer List View
  const [customerViewModal, setCustomerViewModal] = useState(false);

  // state for category dropdown
  const [selectAllCategory, setSelectAllCategory] = useState([]);
  const [selectAllCategoryValue, setSelectAllCategoryValue] = useState([]);

  // state for company select dropdown
  const [selectCompany, setSelectCompany] = useState([]);
  const [selectCompanyValue, setSelectCompanyValue] = useState([]);

  // state for table rows
  const [rows, setRows] = useState([]);

  //state for customer list fields
  const [customerListFields, setCustomerListFields] = useState({
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

    corporateID: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // state for View Customer List Modal
  const [modalViewCustomerList, setModalViewCustomerList] = useState({
    Email: "",
    FirstName: "",
    LastName: "",
    selectCategory: {
      value: 0,
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    companySelect: {
      value: 0,
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
    statusId: 0,
  });
  console.log("modalViewCustomerList", modalViewCustomerList);
  // onChange handle view customer modal in which we passing the props on modal
  const selectCategoryViewModalHandler = (selectedViewCategory) => {
    console.log("SelectModalCategory", selectedViewCategory);
    setModalViewCustomerList({
      ...modalViewCustomerList,
      selectCategory: {
        value: selectedViewCategory.value,
        label: selectedViewCategory.label,
        errorMessage: "",
        errorStatus: false,
      },
    });
  };

  // dispatch getALLCategoryDropdown API and getAllCompanyCorporate
  useEffect(() => {
    dispatch(getAllCategoriesCorporate(navigate));
    dispatch(getAllCorporateCompany(navigate));
  }, []);

  // dispatch API in useEffect for customer list table
  useEffect(() => {
    let newCorporateData = {
      CorporateID: 1,
    };
    dispatch(getAllCorporateUserApi(navigate, newCorporateData));
  }, []);

  //ON CHANGE HANDLER FOR CATEGORY DROPDOWN
  const selectAllCategoryOnchangeHandler = async (selectedCategory) => {
    console.log(selectedCategory, "selectedOptionselectedOption");
    setSelectAllCategoryValue(selectedCategory);
    setCustomerListFields({
      ...customerListFields,
      corporateCategoryID: {
        value: selectedCategory.value,
        label: selectedCategory.label,
      },
    });
  };

  // on change handler for company category
  const selectAllCorporateCategoryOnchangeHandler = async (selectedCompany) => {
    console.log(selectedCompany, "selectedCompanyselectedCompany");
    setSelectCompanyValue(selectedCompany);
    await setModalViewCustomerList({
      ...modalViewCustomerList,
      companySelect: {
        value: selectedCompany.value,
        label: selectedCompany.label,
      },
    });
    setCustomerListFields({
      ...customerListFields,
      corporateID: {
        value: selectedCompany.value,
        label: selectedCompany.label,
      },
    });
  };

  // Hit on Search Btn
  const seacrhButtonHit = async () => {
    let corporateSearchData = {
      FirstName: customerListFields.FirstName.value,
      LastName: customerListFields.LastName.value,
      Email: customerListFields.Email.value,
      CompanyName: customerListFields.companyName.value,
      CategoryID: 0,
    };
    await dispatch(searchUserCorporateApi(navigate, corporateSearchData));
  };

  // validation for customer List
  const customerListValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "FirstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setCustomerListFields({
          ...customerListFields,
          FirstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "FirstName" && value === "") {
      setCustomerListFields({
        ...customerListFields,
        FirstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "LastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setCustomerListFields({
          ...customerListFields,
          LastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LastName" && value === "") {
      setCustomerListFields({
        ...customerListFields,
        LastName: { value: "", errorMessage: "", errorStatus: false },
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
    setSelectAllCategoryValue([]);

    let corporateSearchData = {
      FirstName: "",
      LastName: "",
      Email: "",
      CompanyName: "",
      CategoryID: 0,
    };
    dispatch(searchUserCorporateApi(navigate, corporateSearchData));
  };

  //open view customer list modal
  const openViewModal = () => {
    setCustomerViewModal(true);
  };

  // Open View Customer Modal in which it take status and Category value in dropdown
  const openViewCustomerModal = async (record) => {
    let companyNew;
    console.log(record, "recordddedddd");

    // if (record !== null && record !== undefined) {
    //   setModalViewCustomerList(record);
    // }
    try {
      if (Object.keys(auth.allCorporateCompany).length > 0) {
        await auth.allCorporateCompany.map((data, index) => {
          console.log(data, record, "openViewCustomerModal");
          if (data.corporateName === record.company) {
            companyNew = {
              label: data.corporateName,
              value: data.corporateID,
            };
          }
        });
      }
    } catch {
      console.log("error on company Corporate select");
    }

    try {
      if (Object.keys(companyNew).length > 0) {
        console.log(companyNew, record, "openViewCustomerModal");
        await setModalViewCustomerList({
          ...modalViewCustomerList,
          Email: record.email,
          FirstName: record.firstName,
          LastName: record.lastName,
          companySelect: {
            value: companyNew.value,
            label: companyNew.label,
          },
          statusId: record.statusId,
        });
      }
    } catch {
      console.log("error on company Corporate select");
    }

    setCustomerViewModal(true);
  };

  //this useEffect Condition is for when user hit search btn if data isn't same
  // as in the table then table should be empty
  useEffect(() => {
    if (
      systemReducer.searchCorporate.length > 0 &&
      systemReducer.searchCorporate !== null &&
      systemReducer.searchCorporate !== undefined
    ) {
      setRows(systemReducer.searchCorporate);
    } else {
      setRows([]);
    }
  }, [systemReducer.searchCorporate]);

  //useEffect to render data in table from Api
  useEffect(() => {
    if (
      systemReducer.allCorporateUser.length > 0 &&
      systemReducer.allCorporateUser !== null &&
      systemReducer.allCorporateUser !== undefined
    ) {
      setRows(systemReducer.allCorporateUser);
    } else {
      setRows([]);
    }
  }, [systemReducer.allCorporateUser]);
  console.log("allcorporateee", rows);

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
      setSelectAllCategory(tem);
    }
  }, [auth.getAllCorporate]);

  // for corporate company select drop down
  useEffect(() => {
    if (Object.keys(auth.allCorporateCompany).length > 0) {
      let tem = [];
      auth.allCorporateCompany.map((data, index) => {
        console.log(data, "datadatadatadatassssss");
        tem.push({
          label: data.corporateName,
          value: data.corporateID,
        });
      });
      setSelectCompany(tem);
    }
  }, [auth.allCorporateCompany]);

  //Table columns for customer List
  const columns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "150px",
      render: (text, record) => {
        console.log(record, "recordrecord");
        return (
          <label
            className="table-columns"
            onClick={() => {
              openViewCustomerModal(record);
            }}
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
                  <Row className="mt-3">
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="First Name"
                        name="FirstName"
                        value={customerListFields.FirstName.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-customer-list-fontsize"
                      />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Last Name"
                        name="LastName"
                        value={customerListFields.LastName.value}
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
                    <Col lg={3} md={3} sm={12}>
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
                    <Col lg={3} md={3} sm={12}>
                      <Select
                        name="corporateCategoryID"
                        options={selectAllCategory}
                        value={selectAllCategoryValue}
                        isSearchable={true}
                        onChange={selectAllCategoryOnchangeHandler}
                        placeholder="Select"
                        className="select-customer-list-fontsize"
                      />
                    </Col>
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
                        onClick={seacrhButtonHit}
                        text="Search"
                      />
                      <Button
                        icon={<i className="icon-refresh icon-check-space"></i>}
                        className="Reset-btn"
                        onClick={resetBtnHandler}
                        text="Reset"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      {systemReducer.Spinner === true ? (
                        <span className="customer-list-user-spinner">
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
          </Col>
        </Row>
      </Container>

      {customerViewModal ? (
        <>
          <ViewCustomer
            viewCustomerModal={customerViewModal}
            setViewCustomerModal={setCustomerViewModal}
            selectCategoryChangeHandler={selectCategoryViewModalHandler}
            selectCategory={selectAllCategory}
            modalViewCustomerList={modalViewCustomerList}
            setModalViewCustomerList={setModalViewCustomerList}
            companyDropdownOnchange={selectAllCorporateCategoryOnchangeHandler}
            companySelectOption={selectCompany}
            companySelectValue={selectCompanyValue}
          />
        </>
      ) : null}
    </Fragment>
  );
};

export default Customerlist;
