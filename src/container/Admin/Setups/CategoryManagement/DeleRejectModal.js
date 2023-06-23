import React, { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
// import "./RejectionReasonModal.css";

const DeleteModal = ({
  deleteRejectModal,
  setDeleteRejectModal,
  delteCateogry,
}) => {
  console.log("delteCateogrydelteCateogry", delteCateogry);
  // for close modal handler
  const closeRejectionReasonModal = () => {
    setDeleteRejectModal(false);
  };

  return (
    <Fragment>
      <Modal
        show={deleteRejectModal}
        setShow={setDeleteRejectModal}
        modalHeaderClassName={"d-none"}
        size="lg"
        onHide={closeRejectionReasonModal}
        ModalBody={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span>Corporates Associated With Category</span>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                {delteCateogry !== undefined && delteCateogry !== null ? (
                  <>
                    <p>{delteCateogry?.categoryName}</p>
                    <p>{delteCateogry?.bidSpread}</p>
                    <p>{delteCateogry?.categoryID}</p>
                    <p>{delteCateogry?.offerSpread}</p>
                    {delteCateogry?.corporates.length > 0
                      ? delteCateogry?.corporates.map((data, index) => {
                          return <p>{data.corporateName}</p>;
                        })
                      : ""}
                    {/* <p>{delteCateogry?.corporates.map((data, index) => {
                        console.log("")
                    })}</p> */}
                    <p>{delteCateogry?.categoryName}</p>
                    {/* {delteCateogry.map((data, index) => {
                      console.log("datadatadatadatadatadata", data);

                      // return(

                      // )
                    })} */}
                  </>
                ) : null}
              </Col>
            </Row>
          </>
        }
        ModalFooter={<></>}
      />
    </Fragment>
  );
};

export default DeleteModal;
