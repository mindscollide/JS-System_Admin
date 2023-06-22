import React, { useEffect, useState } from "react";
import "./CategoryManagement.css";
import { Col, Container, Row } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import { TextField, Button, Loader } from "../../../../components/elements";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Collapse, Divider } from "antd";
import { Spin } from "antd";
import { json, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  UpdatecorporateMapping,
  getAllCorporatesCategory,
} from "../../../../store/actions/Auth-Actions";
import { useSelector } from "react-redux";
import { Addcategory } from "../../../../store/actions/AddCategoryActions";
import { UpdateCategoryMap } from "../../../../store/reducers";
import { UpdateMapCategory } from "../../../../store/actions/UpdateCategoryAction";

const CategoryManagement = () => {
  //Accordian
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [corporates, setCorporates] = useState([]);
  const { AddCategory, UpdateCategoryMap } = useSelector((state) => state);

  //For Adding a Category
  const [showaddcategory, setShowaddcategory] = useState(false);
  const [clickadd, setClickadd] = useState(false);
  const [editCategoryList, setEditCategoryList] = useState([]);
  const [addCategoryList, setAddCategoryList] = useState([]);
  const [adddata, setadddata] = useState({
    category: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    bidSpread: {
      value: null,
      errorMessage: "",
      errorStatus: false,
    },
    offerSpread: {
      value: null,
      errorMessage: "",
      errorStatus: false,
    },
    AssetTypeId: {
      value: 1,
      errorMessage: "",
      errorStatus: false,
    },

    BankID: 1,
  });
  const [categoryupdate, setCategoryUpdate] = useState({
    category: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    bidSpread: {
      value: null,
      errorMessage: "",
      errorStatus: false,
    },
    offerSpread: {
      value: null,
      errorMessage: "",
      errorStatus: false,
    },
    AssetTypeId: {
      value: 1,
      errorMessage: "",
      errorStatus: false,
    },
    categoryID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    BankID: 1,
  });
  const [delteCateogry, setDeltecategory] = useState([]);
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllCorporatesCategory(navigate));
  }, []);

  useEffect(() => {
    let corporatesData = auth.Corporates;
    if (Object.keys(corporatesData).length > 0) {
      setCorporates(corporatesData);
    }
  }, [auth.Corporates]);

  useEffect(() => {
    let corporatesData = UpdateCategoryMap.UpdateCategory;
    if (Object.keys(corporatesData).length > 0) {
      console.log("authauth12 UpdateCategoryMap", corporatesData);
      console.log("authauth12 UpdateCategoryMap", categoryupdate);
      let id = categoryupdate.categoryID.value;
      const categoryIndex = corporates.findIndex(
        (store) => store.categoryID === id.toString()
      );
      console.log("authauth12 UpdateCategoryMap", categoryIndex);

      const newSourceItems = [...corporates];
      const newSourceItem = newSourceItems[categoryIndex];
      console.log("authauth12 UpdateCategoryMap", newSourceItem);

      let data = {
        categoryName: categoryupdate.category.value,
        categoryID: categoryupdate.categoryID.value,
        offerSpread: parseInt(categoryupdate.offerSpread.value),
        bidSpread: parseInt(categoryupdate.bidSpread.value),
        corporates: newSourceItems[categoryIndex].corporates,
      };
      if (categoryIndex !== -1) {
        newSourceItems[categoryIndex] = data;
        setCorporates(newSourceItems);
      }
      setEditCategoryList([])
      setCategoryUpdate({
        category: {
          value: "",
          errorMessage: "",
          errorStatus: false,
        },
        bidSpread: {
          value: null,
          errorMessage: "",
          errorStatus: false,
        },
        offerSpread: {
          value: null,
          errorMessage: "",
          errorStatus: false,
        },
        AssetTypeId: {
          value: 1,
          errorMessage: "",
          errorStatus: false,
        },
        categoryID: {
          value: 0,
          errorMessage: "",
          errorStatus: false,
        },
        BankID: 1,
      })

    }
  }, [UpdateCategoryMap.UpdateCategory]);
  console.log("authauth12 UpdateCategoryMap corporates", corporates);

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
        (store) => store.categoryID === source.droppableId
      );
      console.log("handleDragEnd for sender ", storeSourceIndex);

      const storeDestinationIndex = corporates.findIndex(
        (store) => store.categoryID === destination.droppableId
      );

      console.log("handleDragEnd for reciver", storeDestinationIndex);
      console.log("handleDragEnd packege", results.draggableId);
      console.log("handleDragEnd", corporates[storeSourceIndex]);
      console.log("handleDragEnd", corporates[storeSourceIndex]);
      let data = {
        CategoryID: corporates[storeDestinationIndex].categoryID,
        CorporateId: results.draggableId,
      };
      dispatch(UpdatecorporateMapping(navigate, data));
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
    let bankId = localStorage.getItem("bankID");
    let Userid = localStorage.getItem("userID");
    setClickadd(true);
    setShowaddcategory(false);
    console.log(" i am clicked", adddata);

    let data = {
      Category: adddata.category.value,
      BidSpread: parseInt(adddata.bidSpread.value),
      OfferSpread: parseInt(adddata.offerSpread.value),
      AssetTypeId: 1,
      BankID: parseInt(bankId),
      UserId: parseInt(Userid),
    };
    dispatch(Addcategory(navigate, data));
    console.log(" i am clicked");
  };

  const OpenEditCategory = (recorde, data) => {
    console.log(data, "datadata");
    setCategoryUpdate({
      ...categoryupdate,
      offerSpread: {
        value: data.offerSpread,
      },
      category: {
        value: data.categoryName,
      },
      bidSpread: {
        value: data.bidSpread,
      },
      categoryID: {
        value: data.categoryID,
      },
    });
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
        {AddCategory.Spinner === true ? (
          <>
            <span className="customer-login-user-spinner m-3">
              <Spin size="large" />
            </span>
          </>
        ) : (
          <>
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
                    value={adddata.category.value}
                    onChange={CategoryManageState}
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
                        value={adddata.bidSpread.value}
                        onChange={CategoryManageState}
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
                        value={adddata.offerSpread.value}
                        onChange={CategoryManageState}
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
          </>
        )}
      </Row>
    );
  };
  const showCards = (data) => {
    console.log("showCardsshowCards", data);
    if (Object.keys(data).length > 0) {
      return (
        <Droppable droppableId={data.categoryID} direction="horizontal">
          {(provided) => (
            <Row style={{ height: "80vh" }}>
              {console.log("authauth1234 ClientsClients", data)}
              <Col
                lg={12}
                md={12}
                sm={12}
                className="mt-3"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{}}
              >
                <>
                  {Object.keys(data.corporates).length > 0 ? (
                    data.corporates.map((Clients, index) => {
                      return (
                        <Draggable
                          key={Clients.corporateID}
                          draggableId={Clients.corporateID}
                          index={index}
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
                                {console.log(
                                  "authauth1234 ClientsClients",
                                  Clients
                                )}
                                <Panel header={Clients.corporateName} key="1">
                                  {Object.keys(Clients.corporateUsers).length >
                                  0 ? (
                                    <>
                                      {Clients.corporateUsers.map(
                                        (corporaterUser, index) => {
                                          return <p>{corporaterUser.email}</p>;
                                        }
                                      )}
                                    </>
                                  ) : (
                                    <p>This corporate have no user</p>
                                  )}
                                </Panel>
                              </Collapse>
                              {provided.placeholder}
                            </Col>
                          )}
                        </Draggable>
                      );
                    })
                  ) : (
                    <>
                      <p>No Coparate in this Category.</p>
                    </>
                  )}
                </>
              </Col>
              {provided.placeholder}
            </Row>
          )}
        </Droppable>
      );
    }
  };

  const CategoryManageState = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setadddata({
          ...adddata,
          category: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "name" && value === "") {
      setadddata({
        ...adddata,
        category: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Bid" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setadddata({
          ...adddata,
          bidSpread: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Bid" && value === "") {
      setadddata({
        ...adddata,
        bidSpread: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "Offer" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setadddata({
          ...adddata,
          offerSpread: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Offer" && value === "") {
      setadddata({
        ...adddata,
        offerSpread: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  const HandleUpdateChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "nameUpdate" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setCategoryUpdate({
          ...categoryupdate,
          category: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "nameUpdate" && value === "") {
      setCategoryUpdate({
        ...categoryupdate,
        category: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Bidupdated" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setCategoryUpdate({
          ...categoryupdate,
          bidSpread: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Bidupdated" && value === "") {
      setCategoryUpdate({
        ...categoryupdate,
        bidSpread: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "Offerupdate" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setCategoryUpdate({
          ...categoryupdate,
          offerSpread: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Offerupdate" && value === "") {
      setCategoryUpdate({
        ...categoryupdate,
        offerSpread: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  const UpdateCategory = () => {
    let bankid = localStorage.getItem("bankID");
    let data = {
      Category: categoryupdate.category.value,
      BidSpread: parseInt(categoryupdate.bidSpread.value),
      OfferSpread: parseInt(categoryupdate.offerSpread.value),
      CategoryId: parseInt(categoryupdate.categoryID.value),
      BankID: parseInt(bankid),
      AssetTypeId: 1,
    };
    dispatch(UpdateMapCategory(navigate, data, setEditCategoryList));
  };
  return (
    <Container className="Property-container">
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
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable
                droppableId="ROOT"
                type="group"
                direction="horizontal"
                // direction="vertical"
              >
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
                      console.log("datadatadata", data);
                      return (
                        <>
                          {checkForEdit(data.categoryID) ? (
                            <Row>
                              {UpdateCategoryMap.Spinner === true ? (
                                <>
                                  <span className="customer-login-user-spinner m-3">
                                    <Spin size="large" />
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Col
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    className="add-cate-wrapper m-3"
                                  >
                                    <Row>
                                      <Col lg={12} md={12} sm={12}>
                                        <span className="Name_tag">
                                          Name
                                          <span className="red_steric">*</span>
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
                                          name="nameUpdate"
                                          applyClass="form-control2"
                                          type="text"
                                          maxLength={100}
                                          labelClass="d-none"
                                          required={true}
                                          value={categoryupdate.category.value}
                                          onChange={HandleUpdateChange}
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
                                            <span className="Name_tag">
                                              Bid
                                            </span>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col lg={12} md={12} sm={12}>
                                            <TextField
                                              name="Bidupdated"
                                              applyClass="form-control2"
                                              type="text"
                                              maxLength={100}
                                              labelClass="d-none"
                                              required={true}
                                              value={
                                                categoryupdate.bidSpread.value
                                              }
                                              onChange={HandleUpdateChange}
                                            />
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Col lg={6} md={6} sm={12} xs={12}>
                                        <Row>
                                          <Col lg={12} md={12} sm={12}>
                                            <span className="Name_tag">
                                              Offer
                                            </span>
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Col lg={12} md={12} sm={12}>
                                            <TextField
                                              name="Offerupdate"
                                              applyClass="form-control2"
                                              type="text"
                                              maxLength={100}
                                              labelClass="d-none"
                                              required={true}
                                              value={
                                                categoryupdate.offerSpread.value
                                              }
                                              onChange={HandleUpdateChange}
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
                                          onClick={UpdateCategory}
                                        />
                                        <Button
                                          className="Cancel_button_cateogry"
                                          text="Cancel"
                                          onClick={() =>
                                            CloseUpdateCategory(
                                              data.corporateID
                                            )
                                          }
                                        />
                                      </Col>
                                    </Row>
                                  </Col>
                                </>
                              )}
                            </Row>
                          ) : (
                            <Draggable
                              key={data.categoryID + data.corporateID}
                              draggableId={data.categoryID + data.corporateID}
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
                                          {data.categoryName}
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
                                              OpenEditCategory(
                                                data.categoryID,
                                                data
                                              )
                                            }
                                          >
                                            <i className="icon-text-edit"></i>
                                          </span>
                                          <span
                                            className="add-cat d-inline-block"
                                            onClick={() =>
                                              OpenAddCategory(data.categoryID)
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
                                                {data.bidSpread}
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
                                                {data.offerSpread}
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
                                      {outerProvided.placeholder}
                                    </Row>
                                  </Row>
                                  {/* {outerProvided.placeholder} */}
                                </Col>
                              )}
                            </Draggable>
                          )}

                          {checkForAdd(data.categoryID)
                            ? addModal(data, index)
                            : null}
                        </>
                      );
                    })}
                    {/* {outerProvided.placeholder} */}
                  </Col>
                )}
              </Droppable>
            </DragDropContext>

            <Button
              icon={<i className="icon-arrow-right"></i>}
              className="righArrow"
              onClick={Slideright}
            />
          </Col>
        </Row>
      </Row>

      {auth.Loading ? <Loader /> : null}
    </Container>
  );
};

export default CategoryManagement;
