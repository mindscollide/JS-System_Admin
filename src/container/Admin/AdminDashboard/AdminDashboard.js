import React, { Fragment, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import Header2 from "../../../components/layout/Header2/Header2";
import PropertyType from "../../Admin/Setups/PropertyType/PropertyType";
import ApprovalReason from "../../Admin/Setups/ApprovalReason/ApprovalReason";
import RejectionReason from "../../Admin/Setups/RejectionReason/RejectionReason";
import Sidebar2 from "../../../components/layout/Sidebar2/Sidebar2";

const AdminDashboard = () => {
  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Header2 />
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Row>
            <Col
              sm={12}
              md={12}
              lg={12}
              style={{
                width: "100%",
              }}
              className="d-flex gap-4"
            >
              <Sidebar2 />
              <Outlet />
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AdminDashboard;
