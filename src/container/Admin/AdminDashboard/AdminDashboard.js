import React, { Fragment, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header2 from "../../../components/layout/Header2/Header2";
import PropertyType from "../../Admin/Setups/PropertyType/PropertyType";
import ApprovalReason from "../../Admin/Setups/ApprovalReason/ApprovalReason";
import RejectionReason from "../../Admin/Setups/RejectionReason/RejectionReason";
import Sidebar2 from "../../../components/layout/Sidebar2/Sidebar2";

const AdminDashboard = () => {
  return (
    <Fragment>
      <Header2 />
      <Sidebar2 />
      <Outlet />
    </Fragment>
  );
};

export default AdminDashboard;
