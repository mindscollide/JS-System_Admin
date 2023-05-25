import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

import PropertyType from "../container/Admin/Setups/PropertyType/PropertyType";
import ApprovalReason from "../container/Admin/Setups/ApprovalReason/ApprovalReason";
import RejectionReason from "../container/Admin/Setups/RejectionReason/RejectionReason";
import AssetsBanking from "../container/Admin/Reports/Non-Banking-Assets/Assets-Banking";
import AdminDashboard from "../container/Admin/AdminDashboard/AdminDashboard";
import LoginHistory from "../container/Admin/Setups/LoginHistory/LoginHistory";
import UserLogin from "../container/Admin/Setups/UserLoginHistory/UserLogin";

import AdminLogin from "../container/AdminLogin/Login/AdminLogin";
import SignUpRequest from "../container/AdminLogin/SignUp-Request/SignupRequest";
import SignUp from "../container/AdminLogin/SignUp/SignUp";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route exact path="SignUp" element={<SignUp />} />
      <Route exact path="/" element={<AdminLogin />} />
      <Route exact path="SignUpRequest" element={<SignUpRequest />} />
      <Route exact path="/AdminDashboard/" element={<AdminDashboard />}>
        <Route path="" element={<PropertyType />} />
        <Route path="PropertyType" element={<PropertyType />} />
        <Route path="ApprovalReason" element={<ApprovalReason />} />
        <Route path="RejectionReason" element={<RejectionReason />} />
        <Route path="AssetBanking" element={<AssetsBanking />} />
        <Route path="loginHistory" element={<LoginHistory />} />
        <Route path="userLogin" element={<UserLogin />} />
      </Route>
    </>
  )
);
