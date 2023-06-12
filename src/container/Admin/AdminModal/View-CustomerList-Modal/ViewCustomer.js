import React, { Fragment, useState, useRef, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  onUpdateBtnClick,
  NamesValidation,
  companySelectValue,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { systemReducer } = useSelector((state) => state);
  console.log(systemReducer, "systemAdminsystemAdmin");

  const FirstName = useRef(null);
  const LastName = useRef(null);
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
    setModalViewCustomerList({
      ...modalViewCustomerList,
      selectCategory: {
        value: "",
      },
      rfqTimer: {
        value: "",
      },
      natureClient: {
        value: "",
      },
    });
    setViewCustomerModal(false);
  };
  console.log(
    modalViewCustomerList,
    "modalViewCustomerListmodalViewCustomerList"
  );

  // for enable Name field
  const nameEnableHandler = () => {
    setEnableFirstName(false);
    setEnableLastName(false);
    setEnableSelectCompanyName(false);
    FirstName.current.focus();
    LastName.current.focus();
    corporateID.current.focus();
  };
  console.log(modalViewCustomerList, "hahhahhahah");
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
                          ref={FirstName}
                          placeholder="muhammad.ahmed"
                          // name="FirstName"
                          className={
                            enableFirstName
                              ? `${"disable-field-Name"}`
                              : `${"Textfield-Name"}`
                          }
                          value={modalViewCustomerList.FirstName}
                          // value={viewCustomer.firstName.value}
                          onChange={NamesValidation}
                          labelClass="d-none"
                        />
                      </Col>

                      <Col lg={6} md={6} sm={12}>
                        <TextField
                          disable={enableLastName ? true : false}
                          ref={LastName}
                          placeholder="muhammad.ahmed"
                          // name="LastName"
                          className={
                            enableLastName
                              ? `${"disable-field-Name"}`
                              : `${"Textfield-Name"}`
                          }
                          value={modalViewCustomerList.LastName}
                          onChange={NamesValidation}
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
                          className="select-company"
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
                        <TextField
                          // isDisabled={true}
                          disable={true}
                          name="selectCategory"
                          placeholder="Category"
                          labelClass="d-none"
                          className="disable-field-Name"
                          value={modalViewCustomerList.selectCategory.value}
                          // options={selectCategory}
                          // onChange={selectCategoryChangeHandler}
                        />
                      </Col>
                    </Row>
                    {/* <Row className="mt-3">
                      <Col lg={6} md={6} sm={12}>
                        <TextField
                          disable={true}
                          name="statusID"
                          labelClass="d-none"
                          placeholder="Status"
                          // value={modalViewCustomerList.statusID.value}
                        />
                      </Col>
                    </Row> */}
                  </Col>

                  <Col lg={5} md={5} sm={12}>
                    <CustomPaper className="Viewmodal-paper">
                      <Row>
                        <Col>
                          <span className="right-and-User-heading">
                            Other Details
                          </span>
                        </Col>
                        <Col lg={12} md={12} sm={12} className="mt-3">
                          <label className="timer-and-Nature-business-heading">
                            Rfq Timer
                          </label>
                          <TextField
                            labelClass="d-none"
                            disable={true}
                            value={modalViewCustomerList.rfqTimer.value}
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
                            value={modalViewCustomerList.natureClient.value}
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
                  onClick={onUpdateBtnClick}
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