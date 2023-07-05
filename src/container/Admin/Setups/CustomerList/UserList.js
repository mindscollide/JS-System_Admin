import React, { Fragment, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import CustomerListEditModal from "../../AdminModal/EditCustomerListModal/CustomerListEditModal";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  getAllCategoriesCorporate,
  getNatureBusiness,
} from "../../../../store/actions/Auth-Actions";
import { corporateNameByBankId } from "../../../../store/actions/System-Admin";
import { bankCorporateAPI } from "../../../../store/actions/System-Admin";
import { Spin, Pagination } from "antd";
import "./UserList.css";
import { useEffect } from "react";

const Userlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalRecords, setTotalRecord] = useState(0);

  const { systemReducer, auth } = useSelector((state) => state);
  // state for table rows
  const [rows, setRows] = useState([]);

  let currentPageSize = localStorage.getItem("CustomerListSize")
    ? localStorage.getItem("CustomerListSize")
    : 50;
  let currentPage = localStorage.getItem("CustomerListPage")
    ? localStorage.getItem("CustomerListPage")
    : 1;

  // for edit modal in customer list
  const [editCustomerListModal, setEditCustomerListModal] = useState(false);

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

  let customerListBankId = localStorage.getItem("bankID");

  // show data in bank dropdown
  useEffect(() => {
    let corporateBank = {
      BankID: parseInt(customerListBankId),
    };
    dispatch(corporateNameByBankId(navigate, corporateBank));
  }, []);

  // dispatch API in for bank Corporate
  useEffect(() => {
    let newData = {
      BankID: 1,
      CorporateName: "",
      NatureOfBussinessId: 0,
      AssetTypeID: 0,
      CategoryId: 0,
      PageNumber: 1,
      Length: 50,
    };
    dispatch(bankCorporateAPI(navigate, newData));
    dispatch(getAllCategoriesCorporate(navigate));
    dispatch(getNatureBusiness(navigate));
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
    if (Object.keys(systemReducer.corporateNameByBankId).length > 0) {
      let tem = [];
      systemReducer.corporateNameByBankId.map((data, index) => {
        console.log(data, "corporateNamecorporateName");
        tem.push({
          // value: data.corporateID,
          label: data.corporateName,
        });
      });
      setSelectCorporateCompany(tem);
    }
  }, [systemReducer.corporateNameByBankId]);

  //state for customer list fields
  const [userListFields, setUserListFields] = useState({
    corporates: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
    corporateNames: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
    natureofBusinesses: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    corporateCategoryID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
  });

  // this state is for edit customer list modal
  const [editCustomerList, setEditCustomerList] = useState({
    natureBusiness: {
      value: 0,
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    corporatesName: {
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    corporatesCategory: {
      value: 0,
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // open Edit User Modal
  const openEditCustomerModal = async (record) => {
    let newNature;
    console.log(record, "recordddedddd");

    try {
      if (Object.keys(auth.getAllNature).length > 0) {
        await auth.getAllNature.map((data, index) => {
          console.log(data, record, "openCustomerListModal");
          if (
            data.pK_NatureOfBusiness ===
            record.natureOFBussiness.natureOfBussinessID
          ) {
            console.log(data, "natureOfBussinessIDnatureOfBussinessID");
            setEditCustomerList({
              ...editCustomerList,
              natureBusiness: {
                value: data.pK_NatureOfBusiness,
                label: data.name,
                errorMessage: "",
                errorStatus: false,
              },
              corporatesName: {
                label: record.corporateName,
              },
              corporatesCategory: {
                value: record.corporateCategory.categoryID,
                label: record.corporateCategory.categoryName,
              },
            });
          }
        });
      }
    } catch {
      console.log("error on select nature");
    }

    setEditCustomerListModal(true);
  };
  console.log(editCustomerList, "editCustomerListeditCustomerList");

  // nature of business dropdown on change in edit user Modal
  const selectNatureOfBusinessEditDropdownChangeHandler = (selectNature) => {
    console.log(selectNature, "vlauelvalue");
    setEditCustomerList({
      ...editCustomerList,
      natureBusiness: {
        value: selectNature.value,
        label: selectNature.label,
        errorMessage: "",
        errorStatus: false,
      },
    });
  };

  //on search of customer User list Api
  const onHitSearchCustomerList = async () => {
    let newData = {
      BankID: parseInt(customerListBankId),
      CorporateName: userListFields.corporateNames.label,
      NatureOfBussinessId: userListFields.natureofBusinesses.value,
      AssetTypeID: 0,
      CategoryId: userListFields.corporateCategoryID.value,
      PageNumber: currentPage !== null ? parseInt(currentPage) : 1,
      Length: currentPageSize !== null ? parseInt(currentPageSize) : 50,
    };
    console.log("bankCorporateAPI", newData);
    await dispatch(bankCorporateAPI(navigate, newData));
  };

  // onChange Handler for pagination
  const CustomerPagination = async (current, pageSize) => {
    let newData = {
      BankID: parseInt(customerListBankId),
      CorporateName: userListFields.corporateNames.label,
      NatureOfBussinessId: userListFields.natureofBusinesses.value,
      AssetTypeID: 0,
      CategoryId: userListFields.corporateCategoryID.value,
      PageNumber: current != null ? parseInt(current) : 1,
      Length: pageSize != null ? parseInt(pageSize) : 50,
    };
    console.log("bankCorporateAPI", newData);
    localStorage.setItem("CustomerListSize", pageSize);
    localStorage.setItem("CustomerListPage", current);
    await dispatch(bankCorporateAPI(navigate, newData));
  };

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
  const selectBankCompanyOnchangeHandler = async (selectedCompany) => {
    console.log(selectedCompany, "selectedCompanyselectedCompany");
    setSelectCorporateCompanyValue(selectedCompany);
    setUserListFields({
      ...userListFields,
      corporateNames: {
        // value: selectedCompany.value,
        label: selectedCompany.label,
      },
    });
  };

  // reset value on reset Button Hit
  const resetBtnHandler = () => {
    setUserListFields({
      ...userListFields,
      corporateNames: {
        value: "",
        label: "",
        errorMessage: "",
        errorStatus: false,
      },
      natureofBusinesses: {
        value: 0,
        errorMessage: "",
        errorStatus: false,
      },
      corporateCategoryID: {
        value: 0,
        errorMessage: "",
        errorStatus: false,
      },
    });
    let newData = {
      BankID: 1,
      CorporateName: "",
      NatureOfBussinessId: 0,
      AssetTypeID: 0,
      CategoryId: 0,
      PageNumber: 1,
      Length: 50,
    };
    dispatch(bankCorporateAPI(navigate, newData));
    console.log("bankCorporateAPI", newData);
    setSelectCategoryValue([]);
    setSelectNatureBusinessValue([]);
    setSelectCorporateCompanyValue([]);
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
      width: "100px",
      align: "center",
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
      align: "center",
      width: "100px",
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
      render: (text, record) => {
        console.log(record, "recordrecord");
        return (
          <label
            className="UserList-Edit-column"
            onClick={() => openEditCustomerModal(record)}
          >
            <i className="icon-edit edit-user-icon-color" />
          </label>
        );
      },
    },
  ];

  return (
    <section className="SectionContainer">
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
                  name="corporateNames"
                  options={selectCorporateCompany}
                  isSearchable={true}
                  onChange={selectBankCompanyOnchangeHandler}
                  value={selectCorporateCompanyValue}
                  placeholder="Company"
                  className="select-user-list-fontsize"
                />
              </Col>

              <Col lg={4} md={4} sm={12}>
                <Select
                  name="corporateCategoryID"
                  options={selectCategory}
                  onChange={selectCategoryOnchangeHandler}
                  value={selectCategoryValue}
                  placeholder="Categories"
                  className="select-user-list-fontsize"
                />
              </Col>

              <Col lg={4} md={4} sm={12}>
                <Select
                  name="natureofBusinesses"
                  options={selectNatureBusiness}
                  onChange={selectNatureOnchangeHandler}
                  value={selectNatureBusinessValue}
                  placeholder="Nature Business"
                  className="select-user-list-fontsize"
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col lg={12} md={12} sm={12} className="user-list-col-fields">
                <Button
                  icon={<i className="icon-search icon-check-space"></i>}
                  className="User-Search-btn"
                  onClick={onHitSearchCustomerList}
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
                    // scroll={{ x: 500, y: 200 }}
                    className="User-List-table"
                  />
                )}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={12} md={12} sm={12}>
                <Pagination
                  total={totalRecords}
                  onChange={CustomerPagination}
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

      {editCustomerListModal ? (
        <Fragment>
          <CustomerListEditModal
            editCustomerModal={editCustomerListModal}
            setEditCustomerModal={setEditCustomerListModal}
            editCustomerList={editCustomerList}
            setEditCustomerList={setEditCustomerList}
            natureOfBusinessOnchange={
              selectNatureOfBusinessEditDropdownChangeHandler
            }
            natureOption={selectNatureBusiness}
            natureSelectValue={selectNatureBusinessValue}
          />
        </Fragment>
      ) : null}
    </section>
  );
};

export default Userlist;
