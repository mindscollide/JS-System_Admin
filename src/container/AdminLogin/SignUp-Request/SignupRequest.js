import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row, InputGroup, Form } from "react-bootstrap";
import { Button, TextField } from "../../../components/elements";
import jsLogo from "../../../assets/images/js-logo.png";
import { useNavigate } from "react-router-dom";
// import { validateEmail } from "../../../../assets/common/functions/validations";
import "./SignupRequest.css";
const SignUpRequest = () => {
  const navigate = useNavigate();
  // state for request signup fields
  const [requestSignup, setRequestSignup] = useState({
    email: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    password: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
  });

  // const handeEmailvlidate = () => {
  //   if (requestSignup.email.content !== "") {
  //     if (validateEmail(requestSignup.email.content)) {
  //       //  need to dispatch email validate
  //     } else {
  //       setRequestSignup({
  //         ...requestSignup,
  //         email: {
  //           value: requestSignup.email.content,
  //           errorMessage: console.log("Enter valid email address"),
  //           errorStatus: true,
  //         },
  //       });
  //     }
  //   } else {
  //     // setEmailUnique(false);
  //     setRequestSignup({
  //       ...requestSignup,
  //       email: {
  //         value: "",
  //         errorMessage: console.log("Enter email address"),
  //         errorStatus: true,
  //       },
  //     });
  //   }
  // };

  // state for validation
  const setCredentialHandler = (e) => {
    if (e.target.name === "Password") {
      let numChars = e.target.value;
      let showText = "";
      for (let i = 0; i < numChars.length; i++) {
        showText += "•";
      }
      setRequestSignup({
        ...requestSignup,
        [e.target.name]: e.target.value,
        ["fakePassword"]: showText,
      });
    } else {
      setRequestSignup({
        ...requestSignup,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Proceed Handler
  const proceedDataHandler = (e) => {
    if (
      requestSignup.email.content !== "" &&
      requestSignup.password.content !== ""
    ) {
      navigate("/SignUp");
    } else {
      console.log("fields empty");
      alert("fields empty");
    }
  };

  return (
    <Fragment>
      <Col sm={12} lg={12} md={12} className="sign-up-request">
        <Col lg={12} md={12} sm={12}>
          <img src={jsLogo} width="150px" />
        </Col>
        <Container>
          <Row className="">
            <Col sm={12} md={12} lg={12} className="sign-up-request-container">
              <Row>
                <Col
                  sm={5}
                  md={5}
                  lg={5}
                  className="sign-up-request-div flex-column"
                >
                  <Row>
                    <Col sm={12} md={12} lg={12}>
                      <span className="Heading-js">JS Logins Portal</span>
                      <span className="signup-request-heading">
                        Signup Request
                      </span>
                    </Col>
                    <Col sm={12} md={12} lg={12} className="mt-2">
                      <InputGroup className="mb-3">
                        <InputGroup.Text
                          id="basic-addon1"
                          className="Icon-Field-class"
                        >
                          <i className="icon-user"></i>
                        </InputGroup.Text>
                        <Form.Control
                          name="email"
                          value={requestSignup.email.content}
                          // onChange={handeEmailvlidate}
                          className="sign-up-request-field"
                          placeholder="Email ID"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                    </Col>
                    <Col sm={12} md={12} lg={12} className="mb-3">
                      <InputGroup>
                        <InputGroup.Text
                          id="basic-addon1"
                          className="Icon-Field-class"
                        >
                          <i className="icon-lock"></i>
                        </InputGroup.Text>
                        <Form.Control
                          name="password"
                          value={requestSignup.password.content}
                          onChange={setCredentialHandler}
                          className="sign-up-request-field"
                          placeholder="Password"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup>
                      {/* <TextField
                        placeholder="User Password"
                        className="Text-field"
                      /> */}
                    </Col>
                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      className="signIn-Proceed-btn-col"
                    >
                      <Button text="Go Back" className="goBack-btn" />
                      <Button
                        text="Proceed"
                        className="Proceed-btn"
                        onClick={proceedDataHandler}
                      />
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

export default SignUpRequest;
