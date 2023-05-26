import React, { Fragment, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import { Checkbox } from "antd";
import "./CounterModal.css";

const CounterModal = ({ ModalTitle, modalCounter, setModalCounter }) => {
  // state for CounterModal edit user
  const [counterModalField, setCounterModalField] = useState({
    companyName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    totalLimit: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // state for counterModal edit user on Instrument Allowed
  const [instrumentAllowField, setInstrumentAllowField] = useState({
    Tbills: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Pib: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Sukuk: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  // onchange handler for counterModal
  const counterValidationHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "companyName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setCounterModalField({
          ...counterModalField,
          companyName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "companyName" && value === "") {
      setCounterModalField({
        ...counterModalField,
        companyName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "totalLimit" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setCounterModalField({
          ...counterModalField,
          totalLimit: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "totalLimit" && value === "") {
      setCounterModalField({
        ...counterModalField,
        totalLimit: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  // onChange handler for Instrument Allowed fields validation
  const instrumentValidationHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "Tbills" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setInstrumentAllowField({
          ...instrumentAllowField,
          Tbills: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Tbills" && value === "") {
      setInstrumentAllowField({
        ...instrumentAllowField,
        Tbills: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Pib" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setInstrumentAllowField({
          ...instrumentAllowField,
          Pib: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Pib" && value === "") {
      setInstrumentAllowField({
        ...instrumentAllowField,
        Pib: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Sukuk" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setInstrumentAllowField({
          ...instrumentAllowField,
          Sukuk: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Sukuk" && value === "") {
      setInstrumentAllowField({
        ...instrumentAllowField,
        Sukuk: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  // for close modal handler
  const closeCounterModal = () => {
    setModalCounter(false);
  };
  return (
    <Fragment>
      <Modal
        show={modalCounter}
        setShow={setModalCounter}
        className="modaldialog modal-Counter-Party"
        modalHeaderClassName={"header-Counter-Party-close-btn"}
        modalFooterClassName="modal-Counter-Party-footer"
        size="lg"
        onHide={closeCounterModal}
        ModalBody={
          <Fragment>
            {modalCounter ? (
              <Fragment>
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-start"
                  >
                    <span className="edit-user-heading">Edit Detail</span>
                  </Col>
                </Row>

                <Row>
                  <Col lg={8} md={8} sm={12}>
                    <Row>
                      <Col lg={4} md={4} sm={12}>
                        <span className="labels-modal-Counter">
                          Company Name
                          <span className="Counter-aesterick-color">*</span>
                        </span>
                      </Col>
                      <Col lg={8} md={8} sm={12}>
                        <TextField
                          name="companyName"
                          disable={true}
                          value={counterModalField.companyName.value}
                          onChange={counterValidationHandler}
                          labelClass="d-none"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={4} md={4} sm={12}>
                        <span className="labels-modal-Counter">
                          Total Limit(PKR)
                          <span className="Counter-aesterick-color">*</span>
                        </span>
                      </Col>
                      <Col lg={8} md={8} sm={12}>
                        <TextField
                          labelClass="d-none"
                          name="totalLimit"
                          disable={true}
                          value={counterModalField.totalLimit.value}
                          onChange={counterValidationHandler}
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={4} md={4} sm={12}>
                        <span className="labels-modal-Counter">
                          Instrument allow
                          <span className="Counter-aesterick-color">*</span>
                        </span>
                      </Col>
                      <Col lg={8} md={8} sm={12}>
                        <Row>
                          <Col lg={4} md={4} sm={12} className="checkbox-col">
                            <Checkbox disabled />
                            <p className="checkbox-text">Tbills</p>
                          </Col>
                          <Col
                            lg={8}
                            md={8}
                            sm={12}
                            className="d-flex justify-content-center"
                          >
                            <TextField
                              labelClass="d-none"
                              name="Tbills"
                              disable={true}
                              onChange={instrumentValidationHandler}
                              value={instrumentAllowField.Tbills.value}
                              placeholder="Weightage"
                            />
                            <label className="percentage-icon ">%</label>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col lg={4} md={4} sm={12} className="checkbox-col">
                            <Checkbox disabled />
                            <p className="checkbox-text">PIB</p>
                          </Col>
                          <Col
                            lg={8}
                            md={8}
                            sm={12}
                            className="d-flex justify-content-center"
                          >
                            <TextField
                              name="Pib"
                              disable={true}
                              onChange={instrumentValidationHandler}
                              value={instrumentAllowField.Pib.value}
                              labelClass="d-none"
                              placeholder="Weightage"
                            />
                            <label className="percentage-icon ">%</label>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col lg={4} md={4} sm={12} className="checkbox-col">
                            <Checkbox disabled />
                            <p className="checkbox-text">SUKUK</p>
                          </Col>
                          <Col
                            lg={8}
                            md={8}
                            sm={12}
                            className="d-flex justify-content-center"
                          >
                            <TextField
                              name="Sukuk"
                              disable={true}
                              onChange={instrumentValidationHandler}
                              value={instrumentAllowField.Sukuk.value}
                              labelClass="d-none"
                              placeholder="Weightage"
                            />
                            <label className="percentage-icon ">%</label>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
            <Row className="mb-3">
              <Col lg={12} md={12} sm={12} className="modal-Counter-btn-col">
                <Button
                  text="Save Changes"
                  className="save-Changes"
                  //   icon={<i class="icon-arrow-right icon-right"></i>}
                />
                <Button
                  text="Cancel"
                  className="Cancel-btn"
                  //   icon={<i class="icon-close icon-right"></i>}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default CounterModal;
