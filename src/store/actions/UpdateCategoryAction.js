import * as actions from "../action_types";
import axios from "axios";
import {
  Addcateogry,
  UpdateCorporateCategory,
  getBankUserApi,
} from "../../commen/apis/Api_config";
import { RefreshToken, getAllCorporatesCategory } from "./Auth-Actions";
import { systemAdminAPI } from "../../commen/apis/Api_ends_points";

const updatecategoryinit = () => {
  return {
    type: actions.UPDATE_CATEGORY_INIT,
  };
};

const updatecategorysuccess = (response, message) => {
  return {
    type: actions.UPDATE_CATEGORY_SUCCESS,
    response: response,
    message: message,
  };
};

const updatecategoryfailed = (message) => {
  return {
    type: actions.UPDATE_CATEGORY_FAIL,
    message: message,
  };
};

const UpdateMapCategory = (navigate, data, setEditCategoryList) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(updatecategoryinit());
    let form = new FormData();
    form.append("RequestMethod", UpdateCorporateCategory.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
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
          dispatch(UpdateMapCategory(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategory_01".toLowerCase()
                )
            ) {
              dispatch(updatecategoryfailed("Category already exists."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategory_02".toLowerCase()
                )
            ) {
              dispatch(
                updatecategorysuccess(
                  response.data.responseResult,
                  "Category updated."
                )
              );
              //   setEditCategoryList([]);
              //   dispatch(getAllCorporatesCategory(navigate));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategory_03".toLowerCase()
                )
            ) {
              dispatch(updatecategoryfailed("Category not saved."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategory_04".toLowerCase()
                )
            ) {
              dispatch(updatecategoryfailed("Invalid role."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategory_05".toLowerCase()
                )
            ) {
              dispatch(updatecategoryfailed("Exception Something went wrong"));
            }
          } else {
            dispatch(updatecategoryfailed("Something went wrong"));
          }
        } else {
          dispatch(updatecategoryfailed("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(updatecategoryfailed("Something went wrong"));
      });
  };
};

export { UpdateMapCategory };
