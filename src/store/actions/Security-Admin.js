import * as actions from "../action_types";
import axios from "axios";
import {
  getBankUserApi,
  searchBankListApi,
  updateUserByUserIDApi,
} from "../../commen/apis/Api_config";
import { RefreshToken } from "./Auth-Actions";
import { securityAdminAPI } from "../../commen/apis/Api_ends_points";

const getBankUserInit = () => {
  return {
    type: actions.GET_ALL_BANK_USER_INIT,
  };
};

const getBankUserSucces = (response, message) => {
  return {
    type: actions.GET_ALL_BANK_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const getBankUserFail = (message) => {
  return {
    type: actions.GET_ALL_BANK_USER_FAIL,
    message: message,
  };
};

const getUserBank = (navigate, newBankList) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(getBankUserInit());
    let form = new FormData();
    form.append("RequestMethod", getBankUserApi.RequestMethod);
    form.append("RequestData", JSON.stringify(newBankList));
    axios({
      method: "post",
      url: securityAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getUserBank(navigate, newBankList));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetAllBankUsers_01".toLowerCase()
                )
            ) {
              dispatch(
                getBankUserSucces(
                  response.data.responseResult.bankUsers,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetAllBankUsers_02".toLowerCase()
                )
            ) {
              dispatch(getBankUserFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetAllBankUsers_03".toLowerCase()
                )
            ) {
              dispatch(getBankUserFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_GetAllBankUsers_04".toLowerCase()
                )
            ) {
              dispatch(
                getBankUserFail("Exception No Corporate Customer Found")
              );
            }
          } else {
            dispatch(getBankUserFail("Something went wrong"));
          }
        } else {
          dispatch(getBankUserFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getBankUserFail("Something went wrong"));
      });
  };
};

// FOR SEARCH BANK USER LIST API
const searchBankInit = () => {
  return {
    type: actions.SEARCH_BANK_USER_INIT,
  };
};

const searchBankSuccess = (response, message) => {
  return {
    type: actions.SEARCH_BANK_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const searchBankFail = (message) => {
  return {
    type: actions.SEARCH_BANK_USER_FAIL,
    message: message,
  };
};

const searchBankUserList = (navigate, bankUserSearch) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(searchBankInit());
    let form = new FormData();
    form.append("RequestMethod", searchBankListApi.RequestMethod);
    form.append("RequestData", JSON.stringify(bankUserSearch));
    axios({
      method: "post",
      url: securityAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(searchBankUserList(navigate, bankUserSearch));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SearchBankUsers_01".toLowerCase()
                )
            ) {
              dispatch(
                searchBankSuccess(
                  response.data.responseResult.bankUsers,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SearchBankUsers_02".toLowerCase()
                )
            ) {
              dispatch(searchBankFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SearchBankUsers_03".toLowerCase()
                )
            ) {
              dispatch(searchBankFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SearchBankUsers_04".toLowerCase()
                )
            ) {
              dispatch(searchBankFail("Exception No Record Found"));
            }
          } else {
            dispatch(searchBankFail("Something went wrong"));
          }
        } else {
          dispatch(searchBankFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(searchBankFail("Something went wrong"));
      });
  };
};

//FOR UPDATE USER ON BANK USER LIST PAGE
const updateByUserIdInit = () => {
  return {
    type: actions.UPDATE_USER_BY_USERID_INIT,
  };
};

const updateByUserIdSuccess = (response, message) => {
  return {
    type: actions.UPDATE_USER_BY_USERID_SUCCESS,
    response: response,
    message: message,
  };
};

const updateByUserIdFail = (message) => {
  return {
    type: actions.UPDATE_USER_BY_USERID_FAIL,
    message: message,
  };
};

const updateByUserIdBank = (
  navigate,
  newBankUserData,
  setBankModal,
  bankUserSearch,
  newBankList
) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(updateByUserIdInit());
    let form = new FormData();
    form.append("RequestMethod", updateUserByUserIDApi.RequestMethod);
    form.append("RequestData", JSON.stringify(newBankUserData));
    axios({
      method: "post",
      url: securityAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(
            updateByUserIdBank(
              navigate,
              newBankUserData,
              setBankModal,
              bankUserSearch
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_UpdateUserbyUserID_01".toLowerCase()
                )
            ) {
              dispatch(
                updateByUserIdSuccess(
                  response.data.responseResult.responseMessage,
                  "Record updated."
                )
              );
              dispatch(getUserBank(navigate, newBankList));
              await dispatch(searchBankUserList(navigate, bankUserSearch));
              setBankModal(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_UpdateUserbyUserID_02".toLowerCase()
                )
            ) {
              dispatch(updateByUserIdFail("No record updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_UpdateUserbyUserID_03".toLowerCase()
                )
            ) {
              dispatch(updateByUserIdFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_UpdateUserbyUserID_04".toLowerCase()
                )
            ) {
              dispatch(updateByUserIdFail("Exception No Record Found"));
            }
          } else {
            dispatch(updateByUserIdFail("Something went wrong"));
          }
        } else {
          dispatch(updateByUserIdFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(updateByUserIdFail("Something went wrong"));
      });
  };
};

export { getUserBank, searchBankUserList, updateByUserIdBank };
