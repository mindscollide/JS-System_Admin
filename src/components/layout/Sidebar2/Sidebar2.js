import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Nav, Container, Navbar, NavDropdown } from "react-bootstrap";
import Chat from "../../../assets/images/Comment-Icon.png";
import {
  Gear,
  ChatLeft,
  People,
  Search,
  ArrowsAngleExpand,
  X,
  ChatDots,
  Send,
  Paperclip,
} from "react-bootstrap-icons";
import JohnCater from "../../../assets/images/profile3.png";
import { Button, TextField } from "../../../components/elements";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Users from "../../../assets/images/Assignees-Icon.png";
import Broadcast from "../../../assets/images/6.png";
import "./Sidebar2.css";

const Sidebar2 = () => {
  const { SubMenu } = Menu;
  const { Sider } = Layout;
  const navigate = useNavigate();
  let defaultOpenKey = localStorage.getItem("defaultOpenKey ");
  let defaultSelectedKey = localStorage.getItem("defaultSelectedKey");
  console.log("defaultOpenKey", defaultOpenKey);
  console.log("defaultSelectedKey", defaultSelectedKey);

  const navigateToProperty = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "3");
    navigate("/AdminDashboard/PropertyType");
  };

  const navigateToApproval = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "4");
    navigate("/AdminDashboard/ApprovalReason");
  };

  const navigateToRejection = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "5");
    navigate("/AdminDashboard/RejectionReason");
  };

  const navigateToReport = () => {
    localStorage.setItem("defaultOpenKey ", "sub2");
    localStorage.setItem("defaultSelectedKey", "10");
    navigate("/AdminDashboard/AssetBanking");
  };

  const navigateToLoginHistory = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "6");
    navigate("/AdminDashboard/loginHistory");
  };

  const navigateToUserLogin = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "7");
    navigate("/AdminDashboard/userLogin");
  };

  const navigateToTrade = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "8");
    navigate("/AdminDashboard/tradeCount");
  };

  const navigateToCustomerList = () => {
    localStorage.setItem("defaultOpenKey ", "sub1");
    localStorage.setItem("defaultSelectedKey", "9");
    navigate("/AdminDashboard/customerList");
  };

  const navigateToCounter = () => {
    localStorage.setItem("defaultOpenKey ", "sub2");
    localStorage.setItem("defaultSelectedKey", "11");
    navigate("/AdminDashboard/counterLimit");
  };

  const navigateToVolMeter = () => {
    localStorage.setItem("defaultOpenKey ", "sub2");
    localStorage.setItem("defaultSelectedKey", "12");
    navigate("/AdminDashboard/volMeter");
  };

  //this will change the route on page refresh
  // useEffect(() => {
  //   navigate("/AdminDashboard/PropertyType");
  // }, []);

  return (
    <Fragment>
      <Row className="sidebar-row">
        <Col sm={4} className="js-sidebar">
          <Layout>
            <Sider
              width={250}
              style={{
                background: "#000000",
              }}
            >
              <span className="menuMain">
                <Menu
                  theme="light"
                  defaultOpenKeys={[defaultOpenKey]}
                  defaultSelectedKeys={[defaultSelectedKey]}
                  mode="inline"
                  className="Menu-sidebar-class"
                >
                  <SubMenu
                    key="sub1"
                    icon={<i className="icon-settings menu-icons"></i>}
                    title="Setup"
                    className="submenu-sidebar-icons"
                  >
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="3"
                      onClick={navigateToProperty}
                    >
                      Property Type
                    </Menu.Item>
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="4"
                      onClick={navigateToApproval}
                    >
                      Approval Reason
                    </Menu.Item>
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="5"
                      onClick={navigateToRejection}
                    >
                      Rejection Reason
                    </Menu.Item>

                    <Menu.Item
                      className="menu-items-sidebar"
                      key="6"
                      onClick={navigateToLoginHistory}
                    >
                      Customer Login History
                    </Menu.Item>

                    <Menu.Item
                      className="menu-items-sidebar"
                      key="7"
                      onClick={navigateToUserLogin}
                    >
                      User Login History
                    </Menu.Item>

                    <Menu.Item
                      className="menu-items-sidebar"
                      key="8"
                      onClick={navigateToTrade}
                    >
                      Trade Count
                    </Menu.Item>

                    <Menu.Item
                      className="menu-items-sidebar"
                      key="9"
                      onClick={navigateToCustomerList}
                    >
                      Customer List
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    icon={<i className="icon-user menu-icons"></i>}
                    title="Reports"
                    className="submenu-sidebar-icons"
                  >
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="10"
                      onClick={navigateToReport}
                    >
                      Non-Banking Assets
                    </Menu.Item>

                    <Menu.Item
                      className="menu-items-sidebar"
                      key="11"
                      onClick={navigateToCounter}
                    >
                      Counter Party Limit
                    </Menu.Item>

                    <Menu.Item
                      className="menu-items-sidebar"
                      key="12"
                      onClick={navigateToVolMeter}
                    >
                      Vol Meter
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </span>
            </Sider>
          </Layout>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Sidebar2;
