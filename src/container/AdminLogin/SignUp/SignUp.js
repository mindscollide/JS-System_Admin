import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row, InputGroup, Form } from "react-bootstrap";
import { Button, TextField } from "../../../components/elements";
import jsLogo from "../../../assets/images/js-logo.png";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
// import { validationEmail } from "../../../assets/common/functions/validations";
import { useNavigate } from "react-router-dom";
import { signUp, allUserRoles } from "../../../store/actions/Auth-Actions";
import "./SignUp.css";
const SignUp = () => {
  const { auth } = useSelector((state) => state);
  console.log(auth, "allUserRoles");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // roles states
  // const [roles, setRoles] = useState([]);
  // const [roleValue, setRoleValue] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  console.log(userRoles, "userRolesuserRolesuserRoles");

  const [transactionType, setTransactionType] = useState([]);
  const [regionType, setRegionType] = useState([]);
  const [roleType, setRoleType] = useState([]);
  const [signupCredentials, setSignupCredentials] = useState({
    emailAddress: {
      content: "",
      isError: true,
      isSuccess: false,
      errorMessage: "",
      isFail: false,
    },
    password: {
      content: "",
      isSuccess: false,
      isError: true,
      errorMessage: "",
      isFail: false,
    },
    completed: false,
  });

  // const [credentialsBio, setCredentialsBio] = useState({
  //   email: {
  //     content: "",
  //     isError: false,
  //     errorMessage: "",
  //     isSuccess: false,
  //   },
  //   userName: {
  //     content: "",
  //     isError: false,
  //     errorMessage: "",
  //     isSuccess: false,
  //   },
  //   firstName: {
  //     content: "",
  //     isError: false,
  //     errorMessage: "",
  //     isSuccess: false,
  //   },
  //   lastName: {
  //     content: "",
  //     isError: false,
  //     errorMessage: "",
  //     isSuccess: false,
  //   },
  //   personalNumber: {
  //     content: "",
  //     isError: false,
  //     errorMessage: "",
  //     isSuccess: false,
  //   },
  //   role: {
  //     content: "",
  //     isError: false,
  //     errorMessage: "",
  //     isSuccess: false,
  //   },
  // });

  const [credentialsBio, setCredentialsBio] = useState({
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    personalNumber: "",
    userRoles: [],
  });

  //goback btn handler
  const goBackBtn = () => {
    navigate("/");
  };

  const rolesChangeHandler = async (selectedOption) => {
    console.log(selectedOption, "SelectedOptionSelectedOption");
    setCredentialsBio({
      ...credentialsBio,
      userRoles: selectedOption.value,
    });
  };

  const transactionOption = [
    { label: "Transaction type1", value: 1 },
    {
      label: "Transaction type2",
      value: 2,
    },
  ];

  const regionOption = [
    { label: "Region1", value: 1 },
    {
      label: "Region2",
      value: 2,
    },
  ];

  const roleOption = [
    { label: "Role1", value: 1 },
    {
      label: "Role2",
      value: 2,
    },
  ];

  const CustomStyle = {
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "#002650" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      border: "none",
    }),
  };

  useEffect(() => {
    if (Object.keys(auth.UserRoleslist).length > 0) {
      let tem = [];
      auth.UserRoleslist.map((data, index) => {
        console.log(data, "datadatadatadata");
        tem.push({
          label: data.roleName,
          value: data.roleID,
        });
      });
      setUserRoles(tem);
    }
  }, [auth.UserRoleslist]);

  useEffect(() => {
    // on page refresh
    dispatch(allUserRoles());
  }, []);

  return (
    <Fragment>
      <Col sm={12} lg={12} md={12} className="signup">
        <Col lg={12} md={12} sm={12}>
          <img src={jsLogo} width="150px" />
        </Col>
        <Container>
          <Row className="">
            <Col sm={12} md={12} lg={12} className="signup-container">
              <Row>
                <Col sm={5} md={5} lg={5} className="sign-up-div flex-column">
                  <Row>
                    <Col sm={12} md={12} lg={12}>
                      <span className="Heading-js">JS Login Portal</span>
                      <span className="signup-heading">Signup Request</span>
                    </Col>
                    <Col sm={12} md={12} lg={12} className="mt-2">
                      <Row>
                        <Col sm={12} md={6} lg={6} className="pe-0">
                          <Form.Label
                            htmlFor="basic-url"
                            className="fields-label"
                          >
                            Email
                          </Form.Label>
                          <InputGroup className="mb-3">
                            <Form.Control
                              name="email"
                              // onChange={emailChangeHandler}
                              value={credentialsBio.email.content}
                              className="sign-up-field"
                              placeholder="Email ID"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                          </InputGroup>
                        </Col>
                        <Col sm={12} md={6} lg={6} className="pe-2">
                          <Form.Label
                            htmlFor="basic-url"
                            className="fields-label"
                          >
                            User Name
                          </Form.Label>
                          <InputGroup className="mb-3">
                            <Form.Control
                              name="userName"
                              value={credentialsBio.userName.content}
                              className="sign-up-field"
                              placeholder="User Name"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                    </Col>

                    <Col sm={12} md={12} lg={12}>
                      <Row>
                        <Col sm={12} md={6} lg={6} className="pe-0">
                          <Form.Label
                            htmlFor="basic-url"
                            className="fields-label"
                          >
                            First Name<span className="required-span">*</span>
                          </Form.Label>
                          <InputGroup className="mb-3">
                            <Form.Control
                              name="firstName"
                              value={credentialsBio.firstName.content}
                              className="sign-up-field"
                              placeholder="First Name"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                          </InputGroup>
                        </Col>
                        <Col sm={12} md={6} lg={6} className="pe-2">
                          <Form.Label
                            htmlFor="basic-url"
                            className="fields-label"
                          >
                            Last Name<span className="required-span">*</span>
                          </Form.Label>
                          <InputGroup className="mb-3">
                            <Form.Control
                              name="lastName"
                              value={credentialsBio.lastName.content}
                              className="sign-up-field"
                              placeholder="Last Name"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                    </Col>

                    <Col sm={12} md={12} lg={12} className="mt-2">
                      <Row>
                        <span className="fields-label">
                          Role
                          <span className="required-span">*</span>
                        </span>
                        <Col sm={12} md={12} lg={12}>
                          <Select
                            name="userRoles"
                            placeholder="Role"
                            options={userRoles}
                            // value={userRoleValue}
                            onChange={rolesChangeHandler}
                            // options={roleOption}
                            className="TransactionFilter"
                            styles={CustomStyle}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      className="goback-signup-btn-col mt-5"
                    >
                      <Button
                        text="Go Back"
                        className="Goback-Signup-btn"
                        onClick={goBackBtn}
                      />
                      <Button text="Signup" className="Proceed-btn" />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Fragment>
  );
};

export default SignUp;
