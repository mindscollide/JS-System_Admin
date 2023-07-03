import * as actions from "../action_types";
import axios from "axios";
import {
  updateUserByUserIDApi,
  searchGetBankUserList,
} from "../../commen/apis/Api_config";
import { RefreshToken } from "./Auth-Actions";
import { securityAdminAPI } from "../../commen/apis/Api_ends_points";

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
  newDataBank
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
          dispatch(updateByUserIdBank(navigate, newBankUserData, setBankModal));
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
              dispatch(bankListGetSearchApi(navigate, newDataBank));
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

// FOR SEARCH AND GET BANK USER LIST
const bankListSearchGetInit = () => {
  return {
    type: actions.SEARCH_GET_BANK_USER_LIST_INIT,
  };
};

const bankListSearchGetSuccess = (response, message) => {
  return {
    type: actions.SEARCH_GET_BANK_USER_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const bankListSearchGetFail = (message) => {
  return {
    type: actions.SEARCH_GET_BANK_USER_LIST_FAIL,
    message: message,
  };
};

const bankListGetSearchApi = (navigate, newDataBank, bankUserSearch) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(bankListSearchGetInit());
    let form = new FormData();
    form.append("RequestMethod", searchGetBankUserList.RequestMethod);
    form.append("RequestData", JSON.stringify(newDataBank, bankUserSearch));
    axios({
      method: "POST",
      url: securityAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("userloginuserlogin", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(bankListGetSearchApi(navigate, newDataBank, bankUserSearch));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SecurityAdmin_SecurityAdminManager_SearchBankUsers_01".toLowerCase()
            ) {
              console.log("userloginuserloginuserloginuserlogin", response);
              dispatch(
                bankListSearchGetSuccess(
                  response.data.responseResult.bankUsers,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SearchBankUsers_02".toLowerCase()
                )
            ) {
              dispatch(bankListSearchGetFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SearchBankUsers_03".toLowerCase()
                )
            ) {
              dispatch(bankListSearchGetFail("Invalid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SecurityAdmin_SecurityAdminManager_SearchBankUsers_04".toLowerCase()
                )
            ) {
              dispatch(bankListSearchGetFail("Exception Something went wrong"));
            }
          } else {
            dispatch(bankListSearchGetFail("Something went wrong"));
          }
        } else {
          dispatch(bankListSearchGetFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(bankListSearchGetFail("something went wrong"));
      });
  };
};

export { updateByUserIdBank, bankListGetSearchApi };
