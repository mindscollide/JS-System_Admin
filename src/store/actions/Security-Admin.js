import * as actions from "../action_types";
import axios from "axios";
import { getBankUserApi } from "../../commen/apis/Api_config";
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

export { getUserBank };
