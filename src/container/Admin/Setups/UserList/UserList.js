import React, { Fragment, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../../../commen/functions/emailValidation";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  getAllCategoriesCorporate,
  getNatureBusiness,
  getAllCorporateCompany,
} from "../../../../store/actions/Auth-Actions";
import { bankCorporateAPI } from "../../../../store/actions/System-Admin";
import { Spin } from "antd";
import "./UserList.css";
import { useEffect } from "react";

const Userlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { systemReducer, auth } = useSelector((state) => state);
  // state for table rows
  const [rows, setRows] = useState([]);

  // state for category dropdown
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectCategoryValue, setSelectCategoryValue] = useState([]);

  // state for nature of business dropdown
  const [selectNatureBusiness, setSelectNatureBusiness] = useState([]);
  const [selectNatureBusinessValue, setSelectNatureBusinessValue] = useState(
    []
  );

  //state for get all corporate company
  const [selectCorporateCompany, setSelectCorporateCompany] = useState([]);
  const [selectCorporateCompanyValue, setSelectCorporateCompanyValue] =
    useState([]);

  //state for customer list fields
  const [userListFields, setUserListFields] = useState({
    corporates: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    natureofBusinesses: {
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

  // dispatch API in for bank Corporate
  useEffect(() => {
    let Data = {
      BankID: 1,
      CorporateName: "",
      NatureOfBussinessId: 0,
      AssetTypeID: 0,
      CategoryId: 0,
      PageNumber: 3,
      Length: 5,
    };
    dispatch(bankCorporateAPI(navigate, Data));
    dispatch(getAllCategoriesCorporate(navigate));
    dispatch(getNatureBusiness(navigate));
    dispatch(getAllCorporateCompany());
  }, []);

  // render data in table of bank Corporate API
  useEffect(() => {
    if (
      systemReducer.bankCorporates.length > 0 &&
      systemReducer.bankCorporates !== null &&
      systemReducer.bankCorporates !== undefined
    ) {
      setRows(systemReducer.bankCorporates);
    } else {
      setRows([]);
    }
  }, [systemReducer.bankCorporates]);
  console.log("bankCorporatessss", rows);

  // for category Corporate in select drop down
  useEffect(() => {
    if (Object.keys(auth.getAllCorporate).length > 0) {
      let tem = [];
      auth.getAllCorporate.map((data, index) => {
        console.log(data, "getAllCorporate");
        tem.push({
          label: data.category,
          value: data.corporateCategoryID,
        });
      });
      setSelectCategory(tem);
    }
  }, [auth.getAllCorporate]);

  // for nature of Business in select drop down
  useEffect(() => {
    if (Object.keys(auth.getAllNature).length > 0) {
      let tem = [];
      auth.getAllNature.map((data, index) => {
        console.log(data, "getAllCorporate");
        tem.push({
          label: data.name,
          value: data.pK_NatureOfBusiness,
        });
      });
      setSelectNatureBusiness(tem);
    }
  }, [auth.getAllNature]);

  // for corporate company in select drop down we use bankCorporate
  useEffect(() => {
    if (Object.keys(systemReducer.bankCorporates).length > 0) {
      let tem = [];
      systemReducer.bankCorporates.map((data, index) => {
        console.log(data, "datadatadatadatassssss");
        tem.push({
          // value: data.corporateID,
          label: data.corporateName,
        });
      });
      setSelectCorporateCompany(tem);
    }
  }, [systemReducer.bankCorporates]);

  //ON CHANGE HANDLER FOR CATEGORY DROPDOWN
  const selectCategoryOnchangeHandler = async (selectedCategory) => {
    console.log(selectedCategory, "selectedOptionselectedOption");
    setSelectCategoryValue(selectedCategory);
    setUserListFields({
      ...userListFields,
      corporateCategoryID: {
        value: selectedCategory.value,
        label: selectedCategory.label,
      },
    });
  };

  //ON CHANGE HANDLER FOR NATURE OF BUSINESS DROPDOWN
  const selectNatureOnchangeHandler = async (selectedNature) => {
    console.log(selectedNature, "selectedNatureselectedNature");
    setSelectNatureBusinessValue(selectedNature);
    setUserListFields({
      ...userListFields,
      natureofBusinesses: {
        value: selectedNature.value,
        label: selectedNature.label,
      },
    });
  };

  //ON CHANGE HANDLER FOR CORPORATE COMPANY DROPDOWN
  const selectCorporateCompanyOnchangeHandler = async (selectedCompany) => {
    console.log(selectedCompany, "selectedNatureselectedNature");
    setSelectCorporateCompanyValue(selectedCompany);
    setUserListFields({
      ...userListFields,
      corporates: {
        // value: selectedNature.value,
        label: selectedCompany.label,
      },
    });
  };

  // validation for customer List
  const customerListValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "corporateName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserListFields({
          ...userListFields,
          corporateName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "corporateName" && value === "") {
      setUserListFields({
        ...userListFields,
        corporateName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "LastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserListFields({
          ...userListFields,
          LastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LastName" && value === "") {
      setUserListFields({
        ...userListFields,
        LastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "companyName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserListFields({
          ...userListFields,
          companyName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "companyName" && value === "") {
      setUserListFields({
        ...userListFields,
        companyName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setUserListFields({
          ...userListFields,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setUserListFields({
        ...userListFields,
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
    if (userListFields.Email.value !== "") {
      if (validateEmail(userListFields.Email.value)) {
        alert("Email verified");
      } else {
        alert("Email Not Verified");
      }
    }
  };

  // reset value on reset Button Hit
  const resetBtnHandler = () => {
    setUserListFields({
      ...userListFields,
      corporateName: {
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
  };

  //Table columns for customer List
  const columns = [
    {
      title: <label className="bottom-table-header">Corporate Name</label>,
      dataIndex: "corporateName",
      key: "corporateName",
      width: "100px",
      align: "left",
      ellipsis: true,
      render: (text, record) => (
        <label className="issue-date-column">{text}</label>
      ),
    },
    {
      title: <label className="bottom-table-header">Category Name</label>,
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: (text, record) => {
        console.log(record, "categoryNamecategoryName");
        return (
          <label className="issue-date-column">
            {record.corporateCategory.categoryName}
          </label>
        );
      },
    },
    {
      title: <label className="bottom-table-header">Nature Of Bussiness</label>,
      dataIndex: "natureOfBussiness",
      key: "natureOfBussiness",
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (text, record) => {
        return (
          <label className="issue-date-column">
            {record.natureOFBussiness.natureOfBussiness}
          </label>
        );
      },
    },
    {
      title: <label className="bottom-table-header">Edit</label>,
      dataIndex: "edit",
      key: "edit",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => {
        return (
          <label
            className="UserList-Edit-column"
            // onClick={() => openUserListEditModal}
          >
            <i className="icon-edit edit-user-icon-color" />
          </label>
        );
      },
    },
  ];

  return (
    <Fragment>
      <section className="me-4">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <span className="user-List-label">Customer List</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <CustomPaper className="user-List-paper">
              <Row className="mt-3">
                <Col lg={4} md={4} sm={12}>
                  <Select
                    name="corporates"
                    options={selectCorporateCompany}
                    isSearchable={true}
                    onChange={selectCorporateCompanyOnchangeHandler}
                    value={selectCorporateCompanyValue}
                    placeholder="Select"
                    className="select-user-list-fontsize"
                  />
                </Col>
                {/* <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Last Name"
                        name="LastName"
                        value={userListFields.LastName.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-User-list-fontsize"
                      />
                    </Col> */}
                {/* <Col lg={2} md={2} sm={12}>
                      <TextField
                        placeholder="Email"
                        name="Email"
                        onBlur={handlerEmail}
                        value={userListFields.Email.value}
                        onChange={customerListValidation}
                        labelClass="d-none"
                        className="textfields-User-list-fontsize"
                      />
                    </Col> */}
                <Col lg={4} md={4} sm={12}>
                  <Select
                    name="natureofBusinesses"
                    options={selectNatureBusiness}
                    onChange={selectNatureOnchangeHandler}
                    value={selectNatureBusinessValue}
                    placeholder="Select"
                    className="select-user-list-fontsize"
                  />
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <Select
                    name="corporateCategoryID"
                    options={selectCategory}
                    onChange={selectCategoryOnchangeHandler}
                    value={selectCategoryValue}
                    placeholder="Select"
                    className="select-user-list-fontsize"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={12} md={12} sm={12} className="user-list-col-fields">
                  <Button
                    icon={<i className="icon-search icon-check-space"></i>}
                    className="User-Search-btn"
                    text="Search"
                  />
                  <Button
                    icon={<i className="icon-refresh icon-check-space"></i>}
                    className="User-Reset-btn"
                    onClick={resetBtnHandler}
                    text="Reset"
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={12} md={12} sm={12}>
                  {systemReducer.Spinner === true ? (
                    <span className="user-list-table-spinner">
                      <Spin size="large" />
                    </span>
                  ) : (
                    <Table
                      column={columns}
                      rows={rows}
                      pagination={false}
                      className="User-List-table"
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

export default Userlist;
