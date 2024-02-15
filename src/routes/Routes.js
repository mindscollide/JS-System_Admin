import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";
import PropertyType from "../container/Admin/Setups/PropertyType/PropertyType";
import ApprovalReason from "../container/Admin/Setups/ApprovalReason/ApprovalReason";
import RejectionReason from "../container/Admin/Setups/RejectionReason/RejectionReason";
import AssetsBanking from "../container/Admin/Reports/Non-Banking-Assets/Assets-Banking";
import AdminDashboard from "../container/Admin/AdminDashboard/AdminDashboard";
import LoginHistory from "../container/Admin/Setups/CustomerUserLoginHistory/LoginHistory";
import UserLogin from "../container/Admin/Setups/BankUserLoginHistory/UserLogin";
import TradeCount from "../container/Admin/Setups/TradeCount/Tradecount";
import CounterLimit from "../container/Admin/Reports/CounterParty/CounterLimit";
import VolMeter from "../container/Admin/Reports/VolMeter/VolMeter";
import Customerlist from "../container/Admin/Setups/CustomerUserList/Customerlist";
import BankList from "../container/Admin/Setups/BankUserList/BankList";
import Userlist from "../container/Admin/Setups/CustomerList/UserList";

import AdminLogin from "../container/AdminLogin/Login/AdminLogin";
import SignUpRequest from "../container/AdminLogin/SignUp-Request/SignupRequest";
import SignUp from "../container/AdminLogin/SignUp/SignUp";
import CategoryManagement from "../container/Admin/Setups/CategoryManagement/CategoryManagement";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route exact path="SignUp" element={<SignUp />} />
      <Route exact path="/" element={<AdminLogin />} />
      {/* <Route element={<PrivateRoutes />}> */}
      <Route exact path="SignUpRequest" element={<SignUpRequest />} />
      <Route exact path="/AdminDashboard/" element={<AdminDashboard />}>
        <Route path="" element={<PropertyType />} />
        <Route path="PropertyType" element={<PropertyType />} />
        <Route path="ApprovalReason" element={<ApprovalReason />} />
        <Route path="RejectionReason" element={<RejectionReason />} />
        <Route path="AssetBanking" element={<AssetsBanking />} />
        <Route path="loginHistory" element={<LoginHistory />} />
        <Route path="userLogin" element={<UserLogin />} />
        <Route path="tradeCount" element={<TradeCount />} />
        <Route path="counterLimit" element={<CounterLimit />} />
        <Route path="volMeter" element={<VolMeter />} />
        <Route path="BankList" element={<BankList />} />
        <Route path="customerList" element={<Customerlist />} />
        <Route path="Userlist" element={<Userlist />} />
        <Route path="categorymanagement" element={<CategoryManagement />} />
      </Route>
      {/* </Route> */}
    </>
  )
);
