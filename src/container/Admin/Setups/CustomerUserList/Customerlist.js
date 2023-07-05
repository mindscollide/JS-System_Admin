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
import ViewCustomer from "../../AdminModal/View-CustomerUserList-Modal/ViewCustomer";
import { validateEmail } from "../../../../commen/functions/emailValidation";
import {
  getAllCorporateUserApi,
  bankCorporateAPI,
  searchUserCorporateApi,
  updateCorporateAPI,
  corporateNameByBankId, // API FOR SHOW DATA IN COMPANY DROPDOWN
} from "../../../../store/actions/System-Admin";
import { useNavigate } from "react-router-dom";

import {
  getAllCategoriesCorporate,
  getAllCorporateCompany,
} from "../../../../store/actions/Auth-Actions";

import Select from "react-select";
import moment from "moment";
import { Spin, Pagination } from "antd";
import "./Customerlist.css";
import { useEffect } from "react";

const Customerlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { systemReducer, auth } = useSelector((state) => state);
  console.log(systemReducer, "systemAdminsystemAdmin");

  const [totalRecords, setTotalRecord] = useState(0);

  //get bankID from local storage
  let CustomerUserListBankId =
    localStorage.getItem("bankID") != undefined &&
    localStorage.getItem("bankID") != null
      ? localStorage.getItem("bankID")
      : 1;

  let currentPageSize = localStorage.getItem("CustomerUserListSize")
    ? localStorage.getItem("CustomerUserListSize")
    : 50;
  let currentPage = localStorage.getItem("CustomerUserListPage")
    ? localStorage.getItem("CustomerUserListPage")
    : 1;

  // state for modal customer List View
  const [customerViewModal, setCustomerViewModal] = useState(false);

  // state for category dropdown
  const [selectAllCategory, setSelectAllCategory] = useState([]);
  const [selectAllCategoryValue, setSelectAllCategoryValue] = useState([]);

  // state for company select dropdown
  const [selectCompany, setSelectCompany] = useState([]);
  const [selectCompanyValue, setSelectCompanyValue] = useState();

  // state for get all bank corporate ID select dropdown
  const [selectBankCorporate, setSelectBankCorporate] = useState([]);
  const [selectBankCorporateValue, setSelectBankCorporateValue] = useState([]);

  // state for company dropdown by using corporateNameByBankId API
  const [companyDropdown, setCompanyDropdown] = useState([]);
  const [companyDropdownValue, setCompanyDropdownValue] = useState([]);

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

    corporateNames: {
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
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    corporates: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
    BankID: {
      value: CustomerUserListBankId ? CustomerUserListBankId : 1,
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

  // show data in company name dropdown
  useEffect(() => {
    let corporateBank = {
      BankID: parseInt(customerListFields.BankID.value),
    };
    dispatch(corporateNameByBankId(navigate, corporateBank));
  }, []);

  // for corporate company in select drop down we use bankCorporate
  useEffect(() => {
    if (Object.keys(systemReducer.corporateNameByBankId).length > 0) {
      let tem = [];
      systemReducer.corporateNameByBankId.map((data, index) => {
        console.log(data, "corporateNamecorporateName");
        tem.push({
          label: data.corporateName,
          value: data.corporateName,
        });
      });
      setCompanyDropdown(tem);
    }
  }, [systemReducer.corporateNameByBankId]);

  //ON CHANGE HANDLER FOR CORPORATE COMPANY DROPDOWN
  const selectBankCompanyOnchangeHandler = async (selectedCompany) => {
    console.log(selectedCompany, "selectedNatureselectedNature");
    setCompanyDropdownValue(selectedCompany);
    setCustomerListFields({
      ...customerListFields,
      corporateNames: {
        label: selectedCompany.label,
      },
    });
  };

  // state for View Customer List Modal
  const [modalViewCustomerList, setModalViewCustomerList] = useState({
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
    SelectCategory: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
    statusId: 0,
    companySelect: {
      value: 0,
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
    rfqTimer: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    natureClient: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    userID: 0,
  });
  console.log("modalViewCustomerList", modalViewCustomerList);

  // validation for first and lastname field on modal view
  const textFieldVlidationViewModal = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "FirstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setModalViewCustomerList({
          ...modalViewCustomerList,
          FirstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "FirstName" && value === "") {
      setModalViewCustomerList({
        ...modalViewCustomerList,
        FirstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "LastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setModalViewCustomerList({
          ...modalViewCustomerList,
          LastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "LastName" && value === "") {
      setModalViewCustomerList({
        ...modalViewCustomerList,
        LastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  // update onclick API in which data will update
  const updateCorporateUserOnClick = () => {
    let updateCorporateData = {
      FirstName: modalViewCustomerList.FirstName.value,
      LastName: modalViewCustomerList.LastName.value,
      CorporateID: modalViewCustomerList.companySelect.value,
      UserId: modalViewCustomerList.userID,
      UserStatusId: modalViewCustomerList.statusId,
    };
    console.log(updateCorporateData, "updateCorporateDatadwefwefwe");

    let corporateSearchData = {
      FirstName: "",
      LastName: "",
      Email: "",
      CompanyName: "",
      CategoryID: 0,
      PageNumber: 1,
      Length: 50,
    };
    dispatch(
      updateCorporateAPI(
        navigate,
        updateCorporateData,
        setCustomerViewModal,
        corporateSearchData
      )
    );
  };

  // onChange handle view customer modal in which we passing the props on modal
  const selectCategoryViewModalHandler = (selectedViewCategory) => {
    console.log("SelectModalCategory", selectedViewCategory);
    setModalViewCustomerList({
      ...modalViewCustomerList,
      SelectCategory: {
        value: selectedViewCategory.value,
        label: selectedViewCategory.label,
        errorMessage: "",
        errorStatus: false,
      },
    });
  };

  // dispatch getALLCategoryDropdown API and getAllCompanyCorporate
  useEffect(() => {
    let corporateBank = {
      BankID: customerListFields.BankID.value,
    };
    dispatch(corporateNameByBankId(navigate, corporateBank));

    dispatch(getAllCategoriesCorporate(navigate));
    dispatch(getAllCorporateCompany(navigate));
    let newData = {
      BankID: CustomerUserListBankId ? CustomerUserListBankId : 1,
      CorporateName: "",
      NatureOfBussinessId: 0,
      AssetTypeID: 0,
      CategoryId: 0,
      PageNumber: 1,
      Length: 3,
    };
    dispatch(bankCorporateAPI(navigate, newData));

    let corporateSearchData = {
      FirstName: "",
      LastName: "",
      Email: "",
      CompanyName: "",
      CategoryID: 0,
      PageNumber: 1,
      Length: 50,
    };
    dispatch(searchUserCorporateApi(navigate, corporateSearchData));
  }, []);

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
  console.log("searchCorporatesearchCorporate", rows);

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

  // for bank corporate bank id dropdown useEffect
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
      setSelectBankCorporate(tem);
    }
  }, [systemReducer.bankCorporates]);

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

  //On Change handler for Corporate Bank Dropdown
  const selectAllCorporateBankOnchangeHandler = async (selectBank) => {
    console.log(selectBank, "selectBankselectBank");
    setSelectBankCorporateValue(selectBank);
    setCustomerListFields({
      ...customerListFields,
      corporates: {
        // value: selectBank.value,
        label: selectBank.label,
      },
    });
  };

  // on change handler for company category
  const selectAllCorporateCategoryOnchangeHandler = (selectedCompany) => {
    console.log(selectedCompany, "selectedCompanyselectedCompany");
    setSelectCompanyValue(selectedCompany);
    let data = {
      value: selectedCompany.value,
      label: selectedCompany.label,
    };

    let coperateDataApi = auth.allCorporateCompany;
    try {
      if (
        Object.keys(coperateDataApi).length > 0 &&
        coperateDataApi !== undefined &&
        coperateDataApi !== null
      ) {
        coperateDataApi.map((corporateData, index) => {
          console.log(corporateData, "selectedCompanyselectedCompany");

          if (selectedCompany.label === corporateData.corporateName) {
            console.log(corporateData, "selectedCompanyselectedCompany");

            setModalViewCustomerList({
              ...modalViewCustomerList,
              companySelect: data,
              natureClient: {
                value: corporateData.natureofBusiness.name,
              },
              SelectCategory: {
                value: corporateData.corporateCategory.category,
              },
              rfqTimer: {
                value: corporateData.rfqTimers[0].rfqTimer,
              },
            });
          }
        });
      }
    } catch {
      console.log("error on selecting company Name");
    }
  };
  console.log(modalViewCustomerList, "selectedCompanyselectedCompany");

  // Hit on Search Btn
  const seacrhButtonHit = async () => {
    let corporateSearchData = {
      FirstName: customerListFields.FirstName.value,
      LastName: customerListFields.LastName.value,
      Email: customerListFields.Email.value,
      CompanyName: customerListFields.corporateNames.label,
      CategoryID: customerListFields.corporateCategoryID.value,
      PageNumber: currentPage !== null ? parseInt(currentPage) : 1,
      Length: currentPageSize !== null ? parseInt(currentPageSize) : 50,
    };
    await dispatch(searchUserCorporateApi(navigate, corporateSearchData));
  };

  //customer List Onchange for Pagination

  const CustomerListPagination = async (current, pageSize) => {
    let corporateSearchData = {
      FirstName: customerListFields.FirstName.value,
      LastName: customerListFields.LastName.value,
      Email: customerListFields.Email.value,
      CompanyName: customerListFields.corporateNames.label,
      CategoryID: customerListFields.corporateCategoryID.value,
      PageNumber: current !== null ? parseInt(current) : 1,
      Length: pageSize !== null ? parseInt(pageSize) : 50,
    };
    localStorage.setItem("CustomerUserListSize", pageSize);
    localStorage.setItem("CustomerUserListPage", current);
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
        console.log("Email verified");
      } else {
        console.log("Email Not Verified");
      }
    }
  };

  // reset value on reset Button Hit
  const resetBtnHandler = () => {
    setCustomerListFields({
      ...customerListFields,
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
        value: 0,
        errorMessage: "",
        errorStatus: false,
      },
      BankID: {
        value: CustomerUserListBankId ? CustomerUserListBankId : 1,
        errorMessage: "",
        errorStatus: false,
      },
    });
    setSelectAllCategoryValue([]);
    setCompanyDropdownValue([]);

    let corporateSearchData = {
      FirstName: "",
      LastName: "",
      Email: "",
      CompanyName: "",
      CategoryID: 0,
      PageNumber: 1,
      Length: 50,
    };
    dispatch(searchUserCorporateApi(navigate, corporateSearchData));
  };

  // Open View Customer Modal in which it take status and Category value in dropdown
  const openViewCustomerModal = async (record) => {
    let companyNew;
    console.log(record, "recordddedddd");

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
          firstName: record.firstName,
          Email: record.email,
          FirstName: {
            value: record.firstName,
            errorMessage: "",
            errorStatus: false,
          },
          LastName: {
            value: record.lastName,
            errorMessage: "",
            errorStatus: false,
          },
          companySelect: {
            value: companyNew.value,
            label: companyNew.label,
          },
          userID: record.userID,
          statusId: record.statusId,
        });
      }
    } catch {
      console.log("error on company Corporate select");
    }

    setCustomerViewModal(true);
  };

  //Table columns for customer List
  const columns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "150px",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        console.log(record, "recordrecord");
        return (
          <label
            className="Email_Coloumn"
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
      ellipsis: true,
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Last Name</label>,
      dataIndex: "lastName",
      key: "lastName",
      ellipsis: true,
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Company</label>,
      dataIndex: "company",
      key: "company",
      ellipsis: true,
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "statusId",
      key: "statusId",
      ellipsis: true,
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Creation Date Time</label>,
      dataIndex: "creationDate",
      key: "creationDate",
      align: "center",
      ellipsis: true,
      render: (_, record) => {
        return (
          <span className="w-100">
            {moment(`${record.creationDate} ${record.creationTime}`).format(
              "YYYY-MM-DD HH:MM:ss"
            )}{" "}
          </span>
        );
      },
    },
  ];

  return (
    <section className="SectionContainer">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="customer-List-label">Customer User List</span>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={12} md={12} sm={12}>
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
                  placeholder="Company"
                  name="corporateNames"
                  options={companyDropdown}
                  value={companyDropdownValue}
                  isSearchable={true}
                  onChange={selectBankCompanyOnchangeHandler}
                  className="select-customer-list-fontsize"
                />
              </Col>
              <Col lg={3} md={3} sm={12}>
                <Select
                  placeholder="Category"
                  name="corporateCategoryID"
                  options={selectAllCategory}
                  value={selectAllCategoryValue}
                  isSearchable={true}
                  onChange={selectAllCategoryOnchangeHandler}
                  className="select-customer-list-fontsize"
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col lg={12} md={12} sm={12} className="customer-list-col-fields">
                <Button
                  icon={<i className="icon-search icon-check-space"></i>}
                  className="Search-customerUserList-btn"
                  onClick={seacrhButtonHit}
                  text="Search"
                />
                <Button
                  icon={<i className="icon-refresh icon-check-space"></i>}
                  className="customerUserList-Reset-btn"
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
                    // scroll={{ x: 500, y: 200 }}
                    className="CustomerList-table"
                  />
                )}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={12} md={12} sm={12}>
                <Pagination
                  total={totalRecords}
                  onChange={CustomerListPagination}
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
      {customerViewModal ? (
        <>
          <ViewCustomer
            viewCustomerModal={customerViewModal}
            setViewCustomerModal={setCustomerViewModal}
            modalViewCustomerList={modalViewCustomerList}
            setModalViewCustomerList={setModalViewCustomerList}
            companyDropdownOnchange={selectAllCorporateCategoryOnchangeHandler}
            companySelectOption={selectCompany}
            onUpdateBtnClick={updateCorporateUserOnClick}
            NamesValidation={textFieldVlidationViewModal}
            // tableColumn={columns}
          />
        </>
      ) : null}
      {systemReducer.Loading ? <Loader /> : null}
    </section>
  );
};

export default Customerlist;
