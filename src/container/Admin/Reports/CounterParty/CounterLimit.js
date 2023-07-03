import React, { Fragment, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CustomPaper,
  Table,
  Loader,
  CustomUpload,
} from "../../../../components/elements";
import { counterPartyUpload } from "../../../../store/actions/Upload-Action";
import {
  corporateNameByBankId,
  counterPartyLimitCorporate,
} from "../../../../store/actions/System-Admin";
import CounterModal from "../../AdminModal/CounterPartyModal/CounterModal";
import CounterPartyModal from "../../AdminModal/CounterPartyUplaodModal/CounterPartyModal";
import { Spin } from "antd";
import "./CounterLimit.css";
import { useEffect } from "react";

const CounterLimit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { systemReducer, uploadReducer } = useSelector((state) => state);
  console.log(systemReducer, "systemReducersystemReducer");

  // state for row in which table data set
  const [rows, setRows] = useState([]);

  // modal for countery party limit state
  const [counterPartyModal, setCounterPartyModal] = useState(false);

  // upload file modal for counter party
  const [counterUploadModal, setCounterUploadModal] = useState(false);

  // view Counter party modal
  const [viewCounterModal, setViewCounterModal] = useState({
    corporateName: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    avaliableLimit: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    instrumentName: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    weightage: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    instrumentAvaliableLimit: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
  });

  // api for view icon
  const onViewClick = () => {};

  //open counterParty modal on click
  const openCounterModal = (record) => {
    console.log(record, "recordrecordrecordrecordrecordrecord");
    let newCounterData = {
      CorporateID: JSON.parse(record.corporateID),
    };
    dispatch(
      counterPartyLimitCorporate(navigate, newCounterData, setCounterPartyModal)
    );
    // setCounterPartyModal(true);
  };

  // dispatch corporate Name by Bank ID
  useEffect(() => {
    let corporateBank = {
      BankID: 1,
    };
    dispatch(corporateNameByBankId(navigate, corporateBank));
  }, []);

  const handlerUploadCounterFile = (data) => {
    console.log(data, "handlerUploadCounterFilehandlerUploadCounterFile");
    const counterUploadFile = data.target.value;
    const counteruploadedFile = data.target.files[0];
    console.log("UploadFileUploadFile", counterUploadFile);
    console.log("uploadedFileuploadedFile", counteruploadedFile);
    var ext = counteruploadedFile.name.split(".").pop();
    if (ext === "xls" || ext === "xlsx") {
      dispatch(
        counterPartyUpload(navigate, counteruploadedFile, setCounterUploadModal)
      );
    } else {
      // alert("Invalid type");
      console.log("Invaid Type File");
    }
  };

  //New Api GetAllCorporateNameByBankID data Rendering
  useEffect(() => {
    if (
      systemReducer.corporateNameByBankId !== null &&
      systemReducer.corporateNameByBankId !== undefined &&
      systemReducer.corporateNameByBankId.length > 0
    ) {
      setRows(systemReducer.corporateNameByBankId);
    } else {
      setRows([]);
    }
  }, [systemReducer.corporateNameByBankId]);
  console.log("systemReducercorporateNameByBankId", rows);

  //open Upload Counter party modal
  const openUploadCounterParty = () => {
    setCounterUploadModal(true);
  };

  // column for Counter Limit
  const counterColumns = [
    {
      title: <label className="bottom-table-header">Company Name</label>,
      dataIndex: "corporateName",
      key: "corporateName",
      width: "180px",
      ellipsis: true,
      align: "left",
      render: (text) => (
        <label className="counterLimit-company-text">{text}</label>
      ),
    },
    {
      title: <label className="bottom-table-header">View</label>,
      dataIndex: "view",
      key: "view",
      align: "center",
      width: "180px",
      render: (text, record) => {
        console.log(record, "recordrecordrecord");
        return (
          <label
            className="icon-eye eyeicon-counter"
            onClick={() => openCounterModal(record)}
          >
            {text}
          </label>
        );
      },
    },
  ];

  return (
    <section className="SectionContainer">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="counterLimit-label">Counter Party Limit</span>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} className="d-flex justify-content-end">
          <CustomUpload change={handlerUploadCounterFile} />
          {/* <Button
              text="Upload Counter Party Limit"
              onClick={openUploadCounterParty}
              icon={<i className="icon-upload-cloud eyeicon-size"></i>}
              className="Upload-Excel-btn"
            /> */}
        </Col>
      </Row>

      <Row className="mt-3">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className="counterLimit-paper">
            <Row>
              <Col lg={12} md={12} sm={12}>
                {systemReducer.Spinner === true ? (
                  <span className="counter-Limit-user-spinner">
                    <Spin size="large" />
                  </span>
                ) : (
                  <Table
                    column={counterColumns}
                    rows={rows}
                    pagination={true}
                    scroll={{ x: 500, y: 200 }}
                    className="counterLimit-table"
                  />
                )}
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {counterPartyModal ? (
        <>
          <CounterModal
            modalCounter={counterPartyModal}
            setModalCounter={setCounterPartyModal}
          />
        </>
      ) : null}

      {counterUploadModal ? (
        <>
          <CounterPartyModal
            uploadCounterModal={counterUploadModal}
            setUploadCounterModal={setCounterUploadModal}
          />
        </>
      ) : null}
      {systemReducer.Loading || uploadReducer.Loading ? <Loader /> : null}
    </section>
  );
};

export default CounterLimit;
