import React, { Fragment, useState, useRef } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import "./ViewCustomer.css";
import Select from "react-select";

const ViewCustomer = ({
  viewCustomerModal,
  setViewCustomerModal,
  selectCategoryChangeHandler,
  selectCategory,
  modalViewCustomerList,
  companySelectOption,
  setModalViewCustomerList,
  companyDropdownOnchange,
  companySelectValue,
}) => {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const corporateID = useRef(null);

  // for enable viewCustomerFields state
  const [enableFirstName, setEnableFirstName] = useState(true);
  const [enableLastName, setEnableLastName] = useState(true);
  const [enableSelectCompanyName, setEnableSelectCompanyName] = useState(true);

  //state for view modal Customer List
  const [viewCustomer, setViewCustomer] = useState({
    Name: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    firstName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    lastName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    Category: {
      value: 0,
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    corporateID: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    selectShield: 0,
    fieldOneTwoThree: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });
  // for close modal handler
  const closeViewModal = () => {
    setViewCustomerModal(false);
  };
  console.log(
    modalViewCustomerList,
    "modalViewCustomerListmodalViewCustomerList"
  );
  // validation for customer List
  const customerViewModalValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "firstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setViewCustomer({
          ...viewCustomer,
          firstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "firstName" && value === "") {
      setViewCustomer({
        ...viewCustomer,
        firstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "lastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setViewCustomer({
          ...viewCustomer,
          lastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "lastName" && value === "") {
      setViewCustomer({
        ...viewCustomer,
        lastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "fieldOneTwoThree" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setViewCustomer({
          ...viewCustomer,
          fieldOneTwoThree: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "fieldOneTwoThree" && value === "") {
      setViewCustomer({
        ...viewCustomer,
        fieldOneTwoThree: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  // for enable Name field
  const nameEnableHandler = () => {
    setEnableFirstName(false);
    setEnableLastName(false);
    setEnableSelectCompanyName(false);
    firstName.current.focus();
    lastName.current.focus();
    corporateID.current.focus();
  };
  return (
    <Fragment>
      <Modal
        show={viewCustomerModal}
        setShow={setViewCustomerModal}
        className="modaldialog View-Customer-styles"
        modalHeaderClassName={"ViewCustomer-Modal-close-btn"}
        modalFooterClassName="view-Customer-Modal-footer"
        size="xl"
        onHide={closeViewModal}
        ModalBody={
          <Fragment>
            {viewCustomerModal ? (
              <Fragment>
                <Row className="mt-4">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-start"
                  >
                    <span className="Modal-Upload-Customer-Title">
                      Muhammad Ahmed{" "}
                      <span className="Active-member">Active</span>
                    </span>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col lg={7} md={7} sm={12}>
                    <Row>
                      <Col
                        lg={6}
                        md={6}
                        sm={12}
                        className="d-flex justify-content-start"
                      >
                        <span className="right-and-User-heading">
                          User Details
                        </span>
                      </Col>

                      <Col
                        lg={6}
                        md={6}
                        sm={12}
                        className="d-flex justify-content-end"
                      >
                        <i
                          className="icon-edit"
                          onClick={nameEnableHandler}
                        ></i>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={12} md={12} sm={12}>
                        <TextField
                          value={modalViewCustomerList.Email}
                          // placeholder="aunnaqvi123@gmail.com"
                          disable={true}
                          className="disable-field-Name"
                          labelClass="d-none"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={6} md={6} sm={12}>
                        <TextField
                          disable={enableFirstName ? true : false}
                          ref={firstName}
                          placeholder="muhammad.ahmed"
                          name="firstName"
                          className={
                            enableFirstName
                              ? `${"disable-field-Name"}`
                              : `${"Textfield-Name"}`
                          }
                          value={modalViewCustomerList.FirstName}
                          // value={viewCustomer.firstName.value}
                          onChange={customerViewModalValidation}
                          labelClass="d-none"
                        />
                      </Col>

                      <Col lg={6} md={6} sm={12}>
                        <TextField
                          disable={enableLastName ? true : false}
                          ref={lastName}
                          placeholder="muhammad.ahmed"
                          name="lastName"
                          className={
                            enableLastName
                              ? `${"disable-field-Name"}`
                              : `${"Textfield-Name"}`
                          }
                          value={modalViewCustomerList.LastName}
                          onChange={customerViewModalValidation}
                          labelClass="d-none"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={6} md={6} sm={12}>
                        <Select
                          isDisabled={enableSelectCompanyName ? true : false}
                          ref={corporateID}
                          name="corporateID"
                          onChange={companyDropdownOnchange}
                          options={companySelectOption}
                          value={{
                            value: modalViewCustomerList.companySelect.value,
                            label: modalViewCustomerList.companySelect.label,
                          }}
                          placeholder="Company Name"
                        />
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <Select
                          isDisabled={true}
                          name="selectShield"
                          placeholder="Category"
                          value={modalViewCustomerList.selectCategory}
                          options={selectCategory}
                          onChange={selectCategoryChangeHandler}
                        />
                      </Col>

                      {/* <Col lg={6} md={6} sm={12}>
                        <TextField
                          disable={enableOneTwoField ? true : false}
                          ref={fieldOneTwoThree}
                          placeholder="123"
                          name="fieldOneTwoThree"
                          className={
                            enableOneTwoField
                              ? `${"disable-field-Name"}`
                              : `${"Textfield-Name"}`
                          }
                          value={viewCustomer.fieldOneTwoThree.value}
                          onChange={customerViewModalValidation}
                          labelClass="d-none"
                        />
                      </Col> */}
                    </Row>
                    <Row className="mt-3">
                      <Col lg={6} md={6} sm={12}>
                        <Select isDisabled={true} placeholder="Status" />
                      </Col>
                    </Row>
                  </Col>

                  <Col lg={5} md={5} sm={12}>
                    <CustomPaper className="Viewmodal-paper">
                      <Row>
                        <Col>
                          <span className="right-and-User-heading">Rights</span>
                        </Col>
                        <Col lg={12} md={12} sm={12} className="mt-3">
                          <label className="timer-and-Nature-business-heading">
                            Timer
                          </label>
                          <TextField
                            labelClass="d-none"
                            disable={true}
                            className="disable-field-Name"
                            placeholder="5 minutes"
                          />
                        </Col>
                      </Row>

                      <Row className="mt-3 mb-2">
                        <label className="timer-and-Nature-business-heading">
                          Nature of busniess
                        </label>
                        <Col lg={12} md={12} sm={12}>
                          <TextField
                            disable={true}
                            className="disable-field-Name"
                            labelClass="d-none"
                            placeholder="Foods"
                          />
                        </Col>
                      </Row>
                    </CustomPaper>
                  </Col>
                </Row>
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center"
              >
                <Button
                  text="Update"
                  className="Customer-List-Update-btn"
                  icon={<i class="icon-refresh Upload-Customer-modal"></i>}
                />
                <Button
                  text="Discard"
                  className="Customer-List-Cancel-btn"
                  icon={<i class="icon-close Upload-Customer-modal"></i>}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default ViewCustomer;
