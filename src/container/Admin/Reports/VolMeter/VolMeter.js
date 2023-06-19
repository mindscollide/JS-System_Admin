import React, { Fragment } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";
import "./VolMeter.css";

const VolMeter = () => {
  return (
    <Fragment>
      <section className="me-4">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <span className="volMeter-label">Volatility Meter</span>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <CustomPaper className="volMeter-paper">
              <Row className="mt-4">
                <Col lg={12} md={12} sm={12}>
                  <label className="volMeter-load-heading">
                    {" "}
                    % load to spread{" "}
                    <span className="volMeter-aesterick-color">*</span>
                  </label>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={3} md={3} sm={12} />
                <Col lg={6} md={6} sm={12}>
                  <Row className="vol-meter-fields">
                    <Col lg={2} md={2} sm={12}>
                      <span className="number-on-textfiels">1</span>
                      <TextField labelClass="d-none" />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <span className="number-on-textfiels">2</span>
                      <TextField labelClass="d-none" />
                    </Col>
                    <Col lg={2} md={2} sm={12}>
                      <span className="number-on-textfiels">3</span>
                      <TextField labelClass="d-none" />
                    </Col>
                  </Row>
                </Col>
                <Col lg={3} md={3} sm={12} />
              </Row>

              <Row className="mt-4 mb-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center"
                >
                  <Button
                    text="Upload"
                    icon={<i className="icon-refresh icon-update-refresh"></i>}
                    className="VolMeter-Update-btn"
                  />
                </Col>
              </Row>
            </CustomPaper>
          </Col>
        </Row>
      </section>
    </Fragment>
  );
};

export default VolMeter;
