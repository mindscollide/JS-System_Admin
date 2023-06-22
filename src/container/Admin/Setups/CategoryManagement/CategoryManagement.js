import React, { useEffect, useRef, useState } from "react";
import "./CategoryManagement.css";
import { Col, Container, Row, Form } from "react-bootstrap";
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
  const { auth } = useSelector((state) => state);
  const [corporates, setCorporates] = useState([]);
  const { AddCategory, UpdateCategoryMap } = useSelector((state) => state);

  //for Auto focus
  const NameRef = useRef(null);

  useEffect(() => {
    if (NameRef.current) {
      NameRef.current.focus();
    }
  }, []);

  //For edit a Category
  const [editCategoryList, setEditCategoryList] = useState([]);
  const [errormessege, seterrormessege] = useState(false);
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

  //For Adding a Category
  const [addCategoryList, setAddCategoryList] = useState([]);
  const [addData, setadDdata] = useState({
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

  const [delteCateogry, setDeltecategory] = useState([]);

  // api call for get All category
  useEffect(() => {
    dispatch(getAllCorporatesCategory(navigate));
  }, []);

  // store data of corporates in loacal variable
  useEffect(() => {
    let corporatesData = auth.Corporates;
    if (Object.keys(corporatesData).length > 0) {
      setCorporates(corporatesData);
    }
  }, [auth.Corporates]);

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

  //  for drage card
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

  // for corporate data ui
  const showCards = (data) => {
    console.log("showCardsshowCards", data);
    if (Object.keys(data).length > 0) {
      return (
        <Droppable droppableId={data.categoryID}>
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
                          type="column"
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
            </Row>
          )}
        </Droppable>
      );
    }
  };

  // for edit
  // Update Corporate Function with spinnner
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
      setEditCategoryList([]);
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
      });
    }
  }, [UpdateCategoryMap.UpdateCategory]);

  const OpenEditCategory = (recorde, data) => {
    console.log(data, "datadata");
    setAddCategoryList([]);
    setadDdata({
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
    setCategoryUpdate({
      offerSpread: {
        value: data.offerSpread,
        errorMessage: "",
        errorStatus: false,
      },
      category: {
        value: data.categoryName,
        errorMessage: "",
        errorStatus: false,
      },
      bidSpread: {
        value: data.bidSpread,
        errorMessage: "",
        errorStatus: false,
      },
      categoryID: {
        value: data.categoryID,
        errorMessage: "",
        errorStatus: false,
      },
    });
    setEditCategoryList([recorde]);
  };

  const checkForEdit = (recorde) => {
    let newdata = editCategoryList.find((element) => element === recorde);
    console.log(newdata, "hhhhhhh");
    if (newdata != undefined) {
      return true;
    } else {
      return false;
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

  const CloseUpdateCategory = (recorde) => {
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
    });
    setEditCategoryList([]);
  };

  // for add category
  // Add Corporate Function with spinnner
  useEffect(() => {
    let corporatesData = AddCategory.addCategory;
    if (Object.keys(corporatesData).length > 0) {
      const newSourceItems = [...corporates];
      let data = {
        categoryName: addData.category.value,
        categoryID: corporatesData.categoryID,
        offerSpread: parseInt(addData.offerSpread.value),
        bidSpread: parseInt(addData.bidSpread.value),
        corporates: [],
      };
      newSourceItems.push(data);

      setCorporates(newSourceItems);
      setadDdata({
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
      setAddCategoryList([]);
    }
  }, [AddCategory.addCategory]);

  const OpenAddCategory = (recorde) => {
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
    });
    setEditCategoryList([]);
    setAddCategoryList([recorde]);
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

  const CategoryManageState = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setadDdata({
          ...addData,
          category: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "name" && value === "") {
      setadDdata({
        ...addData,
        category: {
          value: "",
          errorMessage: "Please Fill all the fields",
          errorStatus: false,
        },
      });
    }

    if (name === "Bid" && value !== "") {
      let valueCheck = value.replace(/^[0-9]+$/g, "");
      console.log("valuevalueemailvaluevalueemail", value);
      if (valueCheck !== "") {
        setadDdata({
          ...addData,
          bidSpread: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Bid" && value === "") {
      setadDdata({
        ...addData,
        bidSpread: {
          value: "",
          errorMessage: "Please Fill all the fields",
          errorStatus: true,
        },
      });
    }

    if (name === "Offer" && value !== "") {
      let valueCheck = value.replace(/^\d*$/g, "");
      console.log("valuevalueemailvaluevalueemail", value);
      if (valueCheck !== "") {
        setadDdata({
          ...addData,
          offerSpread: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Offer" && value === "") {
      setadDdata({
        ...addData,
        offerSpread: {
          value: "",
          errorMessage: "Please Fill all the fields",
          errorStatus: true,
        },
      });
    }
  };

  const AfterClickAdd = async (recorde) => {
    if (addData.category.value !== "") {
      seterrormessege(false);
      let bankId = localStorage.getItem("bankID");
      let Userid = localStorage.getItem("userID");
      console.log(" i am clicked", addData);

      let data = {
        Category: addData.category.value,
        BidSpread: parseInt(addData.bidSpread.value),
        OfferSpread: parseInt(addData.offerSpread.value),
        AssetTypeId: 1,
        BankID: parseInt(bankId),
        UserId: parseInt(Userid),
      };
      await dispatch(Addcategory(navigate, data));
    } else {
      seterrormessege(true);
    }
  };

  const CloseNewCategory = (recorde) => {
    setadDdata({
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
    setAddCategoryList([]);
  };

  const addModal = (data, index) => {
    return (
      <Row>
        {AddCategory.Spinner === true ? (
          <>
            <span className="customer-login-user-spinner">
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
                  <Form onSubmit={AfterClickAdd}>
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
                          ref={NameRef}
                          type="text"
                          autoFocus
                          maxLength={100}
                          labelClass="d-none"
                          value={addData.category.value}
                          onChange={CategoryManageState}
                        />
                      </Col>
                    </Row>
                    <p
                      className={
                        errormessege && addData.category.value === ""
                          ? "errorMessage"
                          : "errorMessage_hidden"
                      }
                    >
                      Please Fill all the credentials
                    </p>

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
                              value={addData.bidSpread.value}
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
                              value={addData.offerSpread.value}
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
                  </Form>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
    );
  };

  return (
    <section className="Property-container">
      <Row>
        <Col lg={11} sm={11} md={11} className="m-0">
          <span className="PageHeading">Category Management</span>
        </Col>
        <Col lg={1} md={1} sm={1}></Col>
      </Row>

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
                                      <p
                                        className={
                                          errormessege &&
                                          categoryupdate.category.value === ""
                                            ? "errorMessage"
                                            : "errorMessage_hidden"
                                        }
                                      >
                                        Please Fill all the credentials
                                      </p>
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
                                          CloseUpdateCategory(data.corporateID)
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
                            type="column"
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
                                            <div className="title_bid">Bid</div>
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

      {auth.Loading ? <Loader /> : null}
      {/* {AddCategory.Loading ? <Loader /> : null} */}
    </section>
  );
};

export default CategoryManagement;
