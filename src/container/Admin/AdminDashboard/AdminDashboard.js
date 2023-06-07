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
      <Header2 />
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Row>
            <Col lg={3} md={3} sm={12}>
              <Sidebar2 />
            </Col>
            <Col lg={9} md={9} sm={12}>
              <Outlet />
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AdminDashboard;
