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

  const navigateToProperty = () => {
    navigate("/AdminDashboard/PropertyType");
  };

  const navigateToApproval = () => {
    navigate("/AdminDashboard/ApprovalReason");
  };

  const navigateToRejection = () => {
    navigate("/AdminDashboard/RejectionReason");
  };

  const navigateToReport = () => {
    navigate("/AdminDashboard/AssetBanking");
  };

  //this will change the route on page refresh
  useEffect(() => {
    navigate("/AdminDashboard/PropertyType");
  }, []);

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
                  defaultOpenKeys={["sub1"]}
                  defaultSelectedKeys={["3"]}
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
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    icon={<i className="icon-user menu-icons"></i>}
                    title="Reports"
                    className="submenu-sidebar-icons"
                  >
                    <Menu.Item
                      className="menu-items-sidebar"
                      key="6"
                      onClick={navigateToReport}
                    >
                      Non-Banking Assets
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
