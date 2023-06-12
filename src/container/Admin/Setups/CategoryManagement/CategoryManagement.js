import React, { useState } from "react";
import "./CategoryManagement.css";
import { Col, Container, Row } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import { TextField, Button } from "../../../../components/elements";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Collapse, Divider } from "antd";
import { json } from "react-router-dom";

const Data = [
  {
    corporateID: "1",
    corporateName: "ENGRO",
    corporateUsers: [
      {
        userID: "10",
        corporateId: 1,
        firstName: "Saif Ul",
        lastName: "Isalm",
        email: "Jawad@hotmail.com",
      },
      {
        userID: "12",
        corporateId: "1",
        firstName: "Aun",
        lastName: "Naqvi",
        email: "aun.naqvi@hotmail.com",
      },
      {
        userID: "41",
        corporateId: "1",
        firstName: "AunKazmi",
        lastName: "AunKazmi",
        email: "aunnaqvi456@gmail.com",
      },
      {
        userID: "42",
        corporateId: "1",
        firstName: "AunRazaNaqvi",
        lastName: "AunRazaNaqvi",
        email: "aunnaqvi16@gmail.com",
      },
      {
        userID: "43",
        corporateId: "1",
        firstName: "AunKazmi",
        lastName: "AunKazmi",
        email: "aunnaqvi26@gmail.com",
      },
      {
        userID: "45",
        corporateId: "1",
        firstName: "AunRazarr",
        lastName: "AunRazarr",
        email: "aunnaqvi496@gmail.com",
      },
    ],
  },
  {
    corporateID: "2",
    corporateName: "Uniliver pvt",
    corporateUsers: [
      {
        userID: "100",
        corporateId: "2",
        firstName: "Saif Ul1",
        lastName: "Isalm",
        email: "Jawad@hotmail.com",
      },
      {
        userID: "120",
        corporateId: "2",
        firstName: "Aun2",
        lastName: "Naqvi",
        email: "aun.naqvi@hotmail.com",
      },
      {
        userID: "410",
        corporateId: "2",
        firstName: "AunKazmi3",
        lastName: "AunKazmi",
        email: "aunnaqvi456@gmail.com",
      },
      {
        userID: "420",
        corporateId: "2",
        firstName: "AunRazaNaqvi4",
        lastName: "AunRazaNaqvi",
        email: "aunnaqvi16@gmail.com",
      },
      {
        userID: "430",
        corporateId: "2",
        firstName: "AunKazmi5",
        lastName: "AunKazmi",
        email: "aunnaqvi26@gmail.com",
      },
      {
        userID: "450",
        corporateId: "2",
        firstName: "AunRazarr6",
        lastName: "AunRazarr",
        email: "aunnaqvi496@gmail.com",
      },
    ],
  },
  {
    corporateID: "3",
    corporateName: "Amreli Steels pvt",
    corporateUsers: [],
  },
  {
    corporateID: "4",
    corporateName: "Platinum Steels pvt ltd",
    corporateUsers: [],
  },
  {
    corporateID: "5",
    corporateName: "Platinum Steels pvt ltd",
    corporateUsers: [
      {
        userID: "1000",
        corporateId: "5",
        firstName: "Saif Ul",
        lastName: "Isalm",
        email: "Jawad@hotmail.com",
      },
      {
        userID: "1200",
        corporateId: "5",
        firstName: "Aun",
        lastName: "Naqvi",
        email: "aun.naqvi@hotmail.com",
      },
      {
        userID: "4100",
        corporateId: "5",
        firstName: "AunKazmi",
        lastName: "AunKazmi",
        email: "aunnaqvi456@gmail.com",
      },
      {
        userID: "4200",
        corporateId: "5",
        firstName: "AunRazaNaqvi",
        lastName: "AunRazaNaqvi",
        email: "aunnaqvi16@gmail.com",
      },
      {
        userID: "4300",
        corporateId: "5",
        firstName: "AunKazmi",
        lastName: "AunKazmi",
        email: "aunnaqvi26@gmail.com",
      },
      {
        userID: "4500",
        corporateId: "5",
        firstName: "AunRazarr",
        lastName: "AunRazarr",
        email: "aunnaqvi496@gmail.com",
      },
    ],
  },
  {
    corporateID: "6",
    corporateName: "Minds Collide pvt ltd",
    corporateUsers: [],
  },
  {
    corporateID: "7",
    corporateName: "Tresmark pvt ltd",
    corporateUsers: [],
  },
  {
    corporateID: "8",
    corporateName: "Tresmark pvt ltd",
    corporateUsers: [],
  },
  {
    corporateID: "9",
    corporateName: "PSO",
    corporateUsers: [],
  },
  {
    corporateID: "99",
    corporateName: "CALTEX",
    corporateUsers: [],
  },
  {
    corporateID: "90",
    corporateName: "BYCO",
    corporateUsers: [],
  },
];
const CategoryManagement = () => {
  //Accordian
  const { Panel } = Collapse;

  //For Adding a Category
  const [showaddcategory, setShowaddcategory] = useState(false);
  const [clickadd, setClickadd] = useState(false);
  const [editCategoryList, setEditCategoryList] = useState([]);
  const [addCategoryList, setAddCategoryList] = useState([]);
  const [instances, setInstances] = useState([]);

  const [corporates, setCorporates] = useState(Data);

  const [delteCateogry, setDeltecategory] = useState([]);

  //Sliders Function
  const SlideLeft = () => {
    var Slider = document.getElementById("Slider");
    Slider.scrollLeft = Slider.scrollLeft - 300;
  };

  const Slideright = () => {
    var Slider = document.getElementById("Slider");
    Slider.scrollLeft = Slider.scrollLeft + 300;
  };

  const OpenAddCategory = (recorde) => {
    if (addCategoryList.length > 0) {
      setAddCategoryList([...addCategoryList, recorde]);
    } else {
      setAddCategoryList([recorde]);
    }
  };

  const checkForAdd = (recorde) => {
    let newdata = addCategoryList.find((element) => element === recorde);
    console.log(newdata, "hhhhhhh");
    if (newdata != undefined) {
      return true;
    } else {
      return false;
    }
  };

  const handleDragEnd = (results) => {
    const { source, destination, type } = results;
    console.log("handleDragEnd", results);
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...corporates];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setCorporates(reorderedStores);
    } else {
      const itemSourceIndex = source.index;
      const itemDestinationIndex = destination.index;

      const storeSourceIndex = corporates.findIndex(
        (store) => store.corporateID === source.droppableId
      );
      console.log("handleDragEnd", storeSourceIndex);

      const storeDestinationIndex = corporates.findIndex(
        (store) => store.corporateID === destination.droppableId
      );
      console.log("handleDragEnd", storeDestinationIndex);
      console.log("handleDragEnd", corporates[storeSourceIndex]);

      const newSourceItems = [...corporates[storeSourceIndex].corporateUsers];
      console.log("handleDragEnd", newSourceItems);

      const newDestinationItems =
        source.droppableId !== destination.droppableId
          ? [...corporates[storeDestinationIndex].corporateUsers]
          : newSourceItems;

      console.log("handleDragEnd", newDestinationItems);

      const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
      newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);
      console.log("handleDragEnd", deletedItem);
      console.log("handleDragEnd", newDestinationItems);

      const newStores = [...corporates];
      console.log("handleDragEnd", newStores);

      newStores[storeSourceIndex] = {
        ...corporates[storeSourceIndex],
        corporateUsers: newSourceItems,
      };
      console.log("handleDragEnd", newStores);

      newStores[storeDestinationIndex] = {
        ...corporates[storeDestinationIndex],
        corporateUsers: newDestinationItems,
      };
      console.log("handleDragEnd", newStores);

      setCorporates(newStores);
    }
  };

  const CloseNewCategory = (recorde) => {
    let dataForSplice = [...addCategoryList];
    let newIndex = addCategoryList.indexOf(recorde);
    dataForSplice.splice(newIndex, 1);
    setAddCategoryList(dataForSplice);
  };

  const CloseUpdateCategory = (recorde) => {
    console.log("hhhhhhh", recorde);
    let dataForSplice = [...editCategoryList];
    let newIndex = editCategoryList.indexOf(recorde);
    dataForSplice.splice(newIndex, 1);
    setEditCategoryList(dataForSplice);
    console.log("hhhhhhh", newIndex);
  };

  const AfterClickAdd = () => {
    setClickadd(true);
    setShowaddcategory(false);
    console.log(" i am clicked");
  };

  const OpenEditCategory = (recorde) => {
    let dataForSplice = [...addCategoryList];
    let newIndex = addCategoryList.indexOf(recorde);
    dataForSplice.splice(newIndex, 1);
    setAddCategoryList(dataForSplice);
    if (editCategoryList.length > 0) {
      setEditCategoryList([...editCategoryList, recorde]);
    } else {
      setEditCategoryList([recorde]);
    }
  };
  console.log(editCategoryList, "hhhhhhh");

  const checkForEdit = (recorde) => {
    let newdata = editCategoryList.find((element) => element === recorde);
    console.log(newdata, "hhhhhhh");
    if (newdata != undefined) {
      return true;
    } else {
      return false;
    }
  };
  const addModal = (data, index) => {
    return (
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          // key={newInstanceId}
          className="add-cate-wrapper m-3"
        >
          <Row>
            <Col lg={12} md={12} sm={12}>
              <span className="Name_tag">
                Name <span className="red_steric">*</span>
              </span>
            </Col>
          </Row>

          <Row>
            <Col lg={12} md={12} sm={12} className="CreateMeetingInput">
              <TextField
                name="name"
                applyClass="form-control2"
                type="text"
                maxLength={100}
                labelClass="d-none"
                required={true}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={12} md={12} sm={12}>
              <span className="Name_tag">
                Spread <span className="red_steric">*</span>
              </span>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col lg={6} md={6} sm={12} xs={12}>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <span className="Name_tag">Bid</span>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <TextField
                    name="Bid"
                    applyClass="form-control2"
                    type="text"
                    maxLength={100}
                    labelClass="d-none"
                    required={true}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <span className="Name_tag">Offer</span>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <TextField
                    name="Offer"
                    applyClass="form-control2"
                    type="text"
                    maxLength={100}
                    labelClass="d-none"
                    required={true}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center gap-2"
            >
              <Button
                className="Add_button_category"
                text="Add"
                onClick={AfterClickAdd}
              />
              <Button
                className="Cancel_button_cateogry"
                text="Cancel"
                onClick={CloseNewCategory}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };
  const showCards = (data, index) => {
    return (
      <Droppable droppableId={data.corporateID} direction="horizontal">
        {(provided) => (
          <Row style={{ height: "80vh" }}>
            <Col
              lg={12}
              md={12}
              sm={12}
              className="mt-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.corporateUsers.length === 0 ? (
                <p>No Coparate in this Category.</p>
              ) : (
                data.corporateUsers.map((coprateData, coprateIndex) => {
                  return (
                    <Draggable
                      key={coprateData.userID}
                      draggableId={coprateData.userID}
                      index={coprateIndex}
                    >
                      {(provided) => (
                        <Col
                          lg={12}
                          md={12}
                          sm={12}
                          className="mt-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Collapse>
                            <Panel header={coprateData.firstName} key="1">
                              <p>{coprateData.email}</p>
                            </Panel>
                          </Collapse>
                        </Col>
                      )}
                    </Draggable>
                  );
                })
              )}
              {provided.placeholder}
            </Col>
          </Row>
        )}
      </Droppable>
    );
  };
  return (
    <Container className="Property-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* <!-- Body container Begin --> */}
        <Row className="container-fluid page-gutter overflow-hidden cat-management-container">
          {/* <!--row Page Heading Begin--> */}
          <Row className="row m-0 row-page-heading mb-3">
            <Col className="p-0" lg={12} sm={12} md={12}>
              <div className="d-flex">
                <div className="PageHeading">Category Management</div>
              </div>
            </Col>
          </Row>
          {/* <!--row Page Heading end--> */}

          {/* <!--row  Begin--> */}

          <Row className="cat-management-wrapper d-flex" id="catManagementItem">
            <Col lg={12} md={12} sm={12} className="Content_container">
              <Button
                icon={<i className="icon-arrow-left"></i>}
                className="leftarrow"
                onClick={SlideLeft}
              />
              <Droppable droppableId="ROOT" type="group" direction="horizontal">
                {/* <!-- cat-item --> */}
                {(outerProvided) => (
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="Scroller-x-resolution "
                    id="Slider"
                    ref={outerProvided.innerRef}
                    {...outerProvided.droppableProps}
                  >
                    {corporates.map((data, index) => {
                      return (
                        <>
                          {/* For Edit */}
                          {checkForEdit(data.corporateID) ? (
                            <Row>
                              <Col
                                lg={12}
                                md={12}
                                sm={12}
                                className="add-cate-wrapper m-3"
                              >
                                <Row>
                                  <Col lg={12} md={12} sm={12}>
                                    <span className="Name_tag">
                                      Name <span className="red_steric">*</span>
                                    </span>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    className="CreateMeetingInput"
                                  >
                                    <TextField
                                      name="name"
                                      applyClass="form-control2"
                                      type="text"
                                      maxLength={100}
                                      labelClass="d-none"
                                      required={true}
                                    />
                                  </Col>
                                </Row>

                                <Row className="mt-3">
                                  <Col lg={12} md={12} sm={12}>
                                    <span className="Name_tag">
                                      Spread{" "}
                                      <span className="red_steric">*</span>
                                    </span>
                                  </Col>
                                </Row>

                                <Row className="mt-2">
                                  <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                      <Col lg={12} md={12} sm={12}>
                                        <span className="Name_tag">Bid</span>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col lg={12} md={12} sm={12}>
                                        <TextField
                                          name="Bid"
                                          applyClass="form-control2"
                                          type="text"
                                          maxLength={100}
                                          labelClass="d-none"
                                          required={true}
                                        />
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col lg={6} md={6} sm={12} xs={12}>
                                    <Row>
                                      <Col lg={12} md={12} sm={12}>
                                        <span className="Name_tag">Offer</span>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col lg={12} md={12} sm={12}>
                                        <TextField
                                          name="Offer"
                                          applyClass="form-control2"
                                          type="text"
                                          maxLength={100}
                                          labelClass="d-none"
                                          required={true}
                                        />
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                                <Row className="mt-3">
                                  <Col
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    className="d-flex justify-content-center gap-2"
                                  >
                                    <Button
                                      className="Update_button_category"
                                      text="Update"
                                    />
                                    <Button
                                      className="Cancel_button_cateogry"
                                      text="Cancel"
                                      onClick={() =>
                                        CloseUpdateCategory(data.corporateID)
                                      }
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          ) : (
                            <Draggable
                              key={data.corporateID}
                              draggableId={data.corporateID}
                              index={index}
                            >
                              {(outerProvided) => (
                                <Col
                                  className="cat-management-item m-3"
                                  ref={outerProvided.innerRef}
                                  {...outerProvided.draggableProps}
                                  {...outerProvided.dragHandleProps}
                                >
                                  <Row className="item-inner">
                                    <Col className="cat-header">
                                      <Row className="mt-2">
                                        <Col
                                          className="cat-title"
                                          lg={6}
                                          sm={6}
                                          md={6}
                                        >
                                          {data.corporateName}
                                        </Col>
                                        <Col
                                          className="d-flex justify-content-end gap-1"
                                          lg={6}
                                          sm={6}
                                          md={6}
                                        >
                                          <span
                                            className="edit-cat d-inline-block"
                                            onClick={() =>
                                              OpenEditCategory(data.corporateID)
                                            }
                                          >
                                            <i className="icon-text-edit"></i>
                                          </span>
                                          <span
                                            className="add-cat d-inline-block"
                                            onClick={() =>
                                              OpenAddCategory(data.corporateID)
                                            }
                                          >
                                            <i className="icon-add-circle"></i>
                                          </span>
                                          <span className="delete-cat d-inline-block">
                                            <i className="icon-trash"></i>
                                          </span>
                                        </Col>
                                        <Row>
                                          <Col lg={12} md={12} sm={12}>
                                            <hr className="Line" />
                                          </Col>
                                        </Row>
                                      </Row>

                                      <Row className="mt-2">
                                        <Col
                                          lg={6}
                                          sm={6}
                                          md={6}
                                          className="d-flex justify-content-start"
                                        >
                                          <Row>
                                            <Col
                                              lg={12}
                                              md={12}
                                              sm={12}
                                              className="text-center"
                                            >
                                              <div className="title_bid">
                                                Bid
                                              </div>
                                              <div className="rate val-highlight1">
                                                10.5
                                              </div>
                                            </Col>
                                          </Row>
                                        </Col>

                                        <Col
                                          lg={6}
                                          sm={6}
                                          md={6}
                                          className="d-flex justify-content-end"
                                        >
                                          <Row>
                                            <Col
                                              lg={12}
                                              md={12}
                                              sm={12}
                                              className="text-center"
                                            >
                                              <div className="Title_offer">
                                                offer
                                              </div>
                                              <div className="rate val-highlight2">
                                                10.5
                                              </div>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Row className="cat-item-content">
                                      <Col
                                        className="customer"
                                        lg={12}
                                        sm={12}
                                        md={12}
                                      >
                                        {showCards(data)}
                                      </Col>
                                    </Row>
                                  </Row>
                                </Col>
                              )}
                            </Draggable>
                          )}

                          {checkForAdd(data.corporateID)
                            ? addModal(data, index)
                            : null}
                        </>
                      );
                    })}
                    {outerProvided.placeholder}
                  </Col>
                )}
              </Droppable>
              <Button
                icon={<i className="icon-arrow-right"></i>}
                className="righArrow"
                onClick={Slideright}
              />
            </Col>
          </Row>
        </Row>
      </DragDropContext>
    </Container>
  );
};

export default CategoryManagement;
