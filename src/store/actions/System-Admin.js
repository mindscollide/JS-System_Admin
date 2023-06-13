import * as actions from "../action_types";
import axios from "axios";
import {
  getAllCorporateUserSysAdmin,
  searchCorporateUsersSysAdmin,
  updateCorporateApiSysAdmin,
  getAllBankCorporate,
} from "../../commen/apis/Api_config";
import { RefreshToken } from "./Auth-Actions";
import { systemAdminAPI } from "../../commen/apis/Api_ends_points";

// FOR GET ALL CORPORATE USER API
const getAllCorporateInit = () => {
  return {
    type: actions.GET_ALL_CORPORATE_USER_INIT,
  };
};

const getAllCorporateSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CORPORATE_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllCorporateFail = (message) => {
  return {
    type: actions.GET_ALL_CORPORATE_USER_FAIL,
    message: message,
  };
};

const getAllCorporateUserApi = (navigate, newCorporateData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return async (dispatch) => {
    dispatch(getAllCorporateInit());
    let form = new FormData();
    form.append("RequestMethod", getAllCorporateUserSysAdmin.RequestMethod);
    form.append("RequestData", JSON.stringify(newCorporateData));
    await axios({
      method: "post",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getAllCorporateUserApi(navigate, newCorporateData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateUsers_01".toLowerCase()
                )
            ) {
              dispatch(
                getAllCorporateSuccess(
                  response.data.responseResult.corporateUsers,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateUsers_02".toLowerCase()
                )
            ) {
              dispatch(getAllCorporateFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateUsers_03".toLowerCase()
                )
            ) {
              dispatch(getAllCorporateFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateUsers_04".toLowerCase()
                )
            ) {
              dispatch(
                getAllCorporateFail("Exception No Corporate Customer Found")
              );
            }
          } else {
            dispatch(getAllCorporateFail("Something went wrong"));
          }
        } else {
          dispatch(getAllCorporateFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getAllCorporateFail("Something went wrong"));
      });
  };
};

// FOR SEARCH CORPORATE USER API
const searchCorporateInit = () => {
  return {
    type: actions.SEARCH_CORPORATE_USER_INIT,
  };
};

const searchCorporateSuccess = (response, message) => {
  return {
    type: actions.SEARCH_CORPORATE_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const searchCorporateFail = (message) => {
  return {
    type: actions.SEARCH_CORPORATE_USER_FAIL,
    message: message,
  };
};

const searchUserCorporateApi = (navigate, corporateSearchData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(searchCorporateInit());
    let form = new FormData();
    form.append("RequestMethod", searchCorporateUsersSysAdmin.RequestMethod);
    form.append("RequestData", JSON.stringify(corporateSearchData));
    axios({
      method: "post",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(searchUserCorporateApi(navigate, corporateSearchData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchCorporateUsers_01".toLowerCase()
                )
            ) {
              dispatch(
                searchCorporateSuccess(
                  response.data.responseResult.corporateUsers,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchCorporateUsers_02".toLowerCase()
                )
            ) {
              dispatch(searchCorporateFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchCorporateUsers_03".toLowerCase()
                )
            ) {
              dispatch(searchCorporateFail("Not a valid role."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchCorporateUsers_04".toLowerCase()
                )
            ) {
              dispatch(
                searchCorporateFail("Exception No Corporate User Found")
              );
            }
          } else {
            dispatch(searchCorporateFail("Something went wrong"));
          }
        } else {
          dispatch(searchCorporateFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(searchCorporateFail("Something went wrong"));
      });
  };
};

// For Update Corporate User Api
const updateCorporateInit = () => {
  return {
    type: actions.UPDATE_CORPORATE_USER_INIT,
  };
};

const updateCorporateSuccess = (message) => {
  return {
    type: actions.UPDATE_CORPORATE_USER_SUCCESS,
    message: message,
  };
};

const updateCorporateFail = (message) => {
  return {
    type: actions.UPDATE_CORPORATE_USER_FAIL,
    message: message,
  };
};

const updateCorporateAPI = (
  navigate,
  updateCorporateData,
  setCustomerViewModal,
  corporateSearchData
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  // let data = {
  //   CorporateID: 1,
  // };

  return (dispatch) => {
    dispatch(updateCorporateInit());
    let form = new FormData();
    form.append("RequestMethod", updateCorporateApiSysAdmin.RequestMethod);
    form.append("RequestData", JSON.stringify(updateCorporateData));
    axios({
      method: "post",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(
            updateCorporateAPI(
              navigate,
              updateCorporateData,
              setCustomerViewModal,
              corporateSearchData
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateUser_01".toLowerCase()
                )
            ) {
              dispatch(updateCorporateSuccess("Record Updated"));
              await dispatch(
                searchUserCorporateApi(navigate, corporateSearchData)
              );
              setCustomerViewModal(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateUser_02".toLowerCase()
                )
            ) {
              dispatch(updateCorporateFail("No record updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateUser_03".toLowerCase()
                )
            ) {
              dispatch(updateCorporateFail("Not a valid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateUser_04".toLowerCase()
                )
            ) {
              dispatch(updateCorporateFail("Exception No Corporate Update"));
            }
          } else {
            dispatch(updateCorporateFail("Something went wrong"));
          }
        } else {
          dispatch(updateCorporateFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(updateCorporateFail("Something went wrong"));
      });
  };
};

//GET ALL BANK CORPORATE BY BANK ID
const getBankCorporateInit = () => {
  return {
    type: actions.GET_ALL_BANK_CORPORATE_INIT,
  };
};

const getBankCorporateSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_BANK_CORPORATE_SUCCESS,
    response: response,
    message: message,
  };
};

const getBankCorporateFail = (message) => {
  return {
    type: actions.GET_ALL_BANK_CORPORATE_FAIL,
    message: message,
  };
};

const bankCorporateAPI = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return async (dispatch) => {
    dispatch(getBankCorporateInit());
    let form = new FormData();
    form.append("RequestMethod", getAllBankCorporate.RequestMethod);
    form.append("RequestData", JSON.stringify());
    await axios({
      method: "post",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(bankCorporateAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporatesByBankID_01".toLowerCase()
                )
            ) {
              dispatch(
                getBankCorporateSuccess(
                  response.data.responseResult.corporates,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporatesByBankID_02".toLowerCase()
                )
            ) {
              dispatch(getBankCorporateFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporatesByBankID_03".toLowerCase()
                )
            ) {
              dispatch(getBankCorporateFail("Exception Something went wrong"));
            }
          } else {
            dispatch(getBankCorporateFail("Something went wrong"));
          }
        } else {
          dispatch(getBankCorporateFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getBankCorporateFail("Something went wrong"));
      });
  };
};
export {
  getAllCorporateUserApi,
  searchUserCorporateApi,
  updateCorporateAPI,
  bankCorporateAPI,
};
