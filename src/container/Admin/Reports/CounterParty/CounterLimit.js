import React, { Fragment, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";
import CounterModal from "../../AdminModal/CounterPartyModal/CounterModal";
import "./CounterLimit.css";

const CounterLimit = () => {
  // modal for countery party limit state
  const [counterPartyModal, setCounterPartyModal] = useState(false);

  //open counterParty modal on click
  const openCounterModal = () => {
    setCounterPartyModal(true);
  };

  // column for Counter Limit
  const counterColumns = [
    {
      title: <label className="bottom-table-header">Company Name</label>,
      dataIndex: "companyName",
      key: "companyName",
      align: "left",
      width: "450px",
      render: (text) => (
        <label className="counterLimit-company-text">{text}</label>
      ),
    },
    {
      title: <label className="bottom-table-header">View</label>,
      dataIndex: "view",
      key: "view",
      width: "100px",
      align: "center",
      render: (text) => (
        <label className="icon-eye eyeicon-counter" onClick={openCounterModal}>
          {text}
        </label>
      ),
    },
  ];

  // data for Counter Limit
  const counterData = [
    {
      key: "1",
      companyName: "Gulahmed",
    },
    {
      key: "1",
      companyName: "Engro Fertilizer",
    },
    {
      key: "1",
      companyName: "Engro Corporation",
    },
    {
      key: "1",
      companyName: "OGDC",
    },
    {
      key: "1",
      companyName: "Lucky Cemet",
    },
    {
      key: "1",
      companyName: "Lucky Tex",
    },
    {
      key: "1",
      companyName: "OGDC",
    },
    {
      key: "1",
      companyName: "Engro Corporation",
    },
    {
      key: "1",
      companyName: "Lucky Tex",
    },
  ];

  return (
    <Fragment>
      <Container className="counterLimit-container">
        <Row>
          <Col>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className="counterLimit-label">Counter Party Limit</span>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col lg={11} md={11} sm={12}>
                <CustomPaper className="counterLimit-paper">
                  <Row className="mt-2">
                    <Col
                      lg={12}
                      md={12}
                      sm={12}
                      className="d-flex justify-content-end"
                    >
                      <Button
                        text="Upload Excel"
                        icon={
                          <i className="icon-upload-cloud eyeicon-size"></i>
                        }
                        className="Upload-Excel-btn"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <Table
                        column={counterColumns}
                        rows={counterData}
                        pagination={false}
                        className="counterLimit-table"
                      />
                    </Col>
                  </Row>
                </CustomPaper>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {counterPartyModal ? (
        <>
          <CounterModal
            modalCounter={counterPartyModal}
            setModalCounter={setCounterPartyModal}
          />
        </>
      ) : null}
    </Fragment>
  );
};

export default CounterLimit;
