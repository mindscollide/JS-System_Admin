import * as actions from "../action_types";
import axios from "axios";
import {
  getAllCorporateUserSysAdmin,
  searchCorporateUsersSysAdmin,
  updateCorporateApiSysAdmin,
  getAllBankCorporate,
  getCorporateNameApi,
  getCounterPartyLmit,
  saveCounterPartyApi,
  VolatilityMeterAPI,
  addUpdateVolApi,
  updateCorporateIdApi,
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

const bankCorporateAPI = (navigate, newData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return async (dispatch) => {
    dispatch(getBankCorporateInit());
    let form = new FormData();
    form.append("RequestMethod", getAllBankCorporate.RequestMethod);
    form.append("RequestData", JSON.stringify(newData));
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
          dispatch(bankCorporateAPI(navigate, newData));
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

// get all corporate Name By Bank ID
const corporateBankIdInit = () => {
  return {
    type: actions.GET_ALL_CORPORATE_NAME_BY_BANK_INIT,
  };
};

const corporateBankIdSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CORPORATE_NAME_BY_BANK_SUCCESS,
    response: response,
    message: message,
  };
};

const corporateBankIdFail = (message) => {
  return {
    type: actions.GET_ALL_CORPORATE_NAME_BY_BANK_FAIL,
    message: message,
  };
};

const corporateNameByBankId = (navigate, corporateBank) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return async (dispatch) => {
    dispatch(corporateBankIdInit());
    let form = new FormData();
    form.append("RequestMethod", getCorporateNameApi.RequestMethod);
    form.append("RequestData", JSON.stringify(corporateBank));
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
          dispatch(corporateNameByBankId(navigate, corporateBank));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateNameByBankID_01".toLowerCase()
                )
            ) {
              dispatch(
                corporateBankIdSuccess(
                  response.data.responseResult.corporateNames,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateNameByBankID_02".toLowerCase()
                )
            ) {
              dispatch(corporateBankIdFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateNameByBankID_03".toLowerCase()
                )
            ) {
              dispatch(corporateBankIdFail("Exception Something went wrong"));
            }
          } else {
            dispatch(corporateBankIdFail("Something went wrong"));
          }
        } else {
          dispatch(corporateBankIdFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(corporateBankIdFail("Something went wrong"));
      });
  };
};

// GET COUNTER PARTY LIMIT API IN COUNTER PARTY PAGE
const counterPartyInit = () => {
  return {
    type: actions.GET_COUNTER_PARTY_LIMIT_INIT,
  };
};

const counterPartySuccess = (response, message) => {
  return {
    type: actions.GET_COUNTER_PARTY_LIMIT_SUCCESS,
    response: response,
    message: message,
  };
};

const counterPartyFail = (message) => {
  return {
    type: actions.GET_COUNTER_PARTY_LIMIT_FAIL,
    message: message,
  };
};

const counterPartyLimitCorporate = (
  navigate,
  newCounterData,
  setCounterPartyModal
) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return async (dispatch) => {
    dispatch(counterPartyInit());
    let form = new FormData();
    form.append("RequestMethod", getCounterPartyLmit.RequestMethod);
    form.append("RequestData", JSON.stringify(newCounterData));
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
          dispatch(counterPartyLimitCorporate(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCounterPartyLimitByCorporateID_01".toLowerCase()
                )
            ) {
              dispatch(
                counterPartySuccess(
                  response.data.responseResult.counterPartyLimit,
                  "Record Found"
                )
              );
              setCounterPartyModal(true);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCounterPartyLimitByCorporateID_02".toLowerCase()
                )
            ) {
              dispatch(counterPartyFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCounterPartyLimitByCorporateID_03".toLowerCase()
                )
            ) {
              dispatch(counterPartyFail("Invalid Corporate ID"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCounterPartyLimitByCorporateID_04".toLowerCase()
                )
            ) {
              dispatch(counterPartyFail("Not A Valid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCounterPartyLimitByCorporateID_05".toLowerCase()
                )
            ) {
              dispatch(counterPartyFail("Exception Something went wrong"));
            }
          } else {
            dispatch(counterPartyFail("Something went wrong"));
          }
        } else {
          dispatch(counterPartyFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(counterPartyFail("Something went wrong"));
      });
  };
};

// FOR SAVE COUNTER PARTY LIMIT
const saveCounterInit = () => {
  return {
    type: actions.SAVE_COUNTER_PARTY_INIT,
  };
};

const saveCounterSuccess = (response, message) => {
  return {
    type: actions.SAVE_COUNTER_PARTY_SUCCESS,
    response: response,
    message: message,
  };
};

const saveCounterFail = (message) => {
  return {
    type: actions.SAVE_COUNTER_PARTY_FAIL,
    message: message,
  };
};

const saveCounterParty = (navigate, Data, setUploadCounterModal) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return async (dispatch) => {
    dispatch(saveCounterInit());
    let form = new FormData();
    form.append("RequestMethod", saveCounterPartyApi.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
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
          dispatch(saveCounterParty(navigate, Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SavecounterPartyLimit_01".toLowerCase()
                )
            ) {
              dispatch(
                saveCounterSuccess(
                  response.data.responseResult.responseMessage,
                  "Record Found"
                )
              );
              setUploadCounterModal(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SavecounterPartyLimit_02".toLowerCase()
                )
            ) {
              dispatch(saveCounterFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SavecounterPartyLimit_03".toLowerCase()
                )
            ) {
              dispatch(saveCounterFail("Invalid Corporate ID"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SavecounterPartyLimit_04".toLowerCase()
                )
            ) {
              dispatch(saveCounterFail("Not A Valid Role"));
            }
          } else {
            dispatch(saveCounterFail("Something went wrong"));
          }
        } else {
          dispatch(saveCounterFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(saveCounterFail("Something went wrong"));
      });
  };
};

// api for get Volatility meter in Vol Meter Page
const volMeterInit = () => {
  return {
    type: actions.GET_VOL_METER_BANK_ID_INIT,
  };
};

const volMeterSuccess = (response, message) => {
  return {
    type: actions.GET_VOL_METER_BANK_ID_SUCCESS,
    response: response,
    message: message,
  };
};

const volMeterFail = (message) => {
  return {
    type: actions.GET_VOL_METER_BANK_ID_FAIL,
    message: message,
  };
};

const getVolMeter = (navigate, newVolMeter) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return async (dispatch) => {
    dispatch(volMeterInit());
    let form = new FormData();
    form.append("RequestMethod", VolatilityMeterAPI.RequestMethod);
    form.append("RequestData", JSON.stringify(newVolMeter));
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
          dispatch(getVolMeter(navigate, newVolMeter));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetVolMetersByBankID_01".toLowerCase()
                )
            ) {
              dispatch(
                volMeterSuccess(
                  response.data.responseResult.volMeters,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetVolMetersByBankID_02".toLowerCase()
                )
            ) {
              dispatch(
                volMeterSuccess(
                  response.data.responseResult.volMeters,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetVolMetersByBankID_03".toLowerCase()
                )
            ) {
              dispatch(volMeterFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetVolMetersByBankID_04".toLowerCase()
                )
            ) {
              dispatch(volMeterFail("Not A Valid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetVolMetersByBankID_05".toLowerCase()
                )
            ) {
              dispatch(volMeterFail("Exception No Recond Found"));
            }
          } else {
            dispatch(volMeterFail("Something went wrong"));
          }
        } else {
          dispatch(volMeterFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(volMeterFail("Something went wrong"));
      });
  };
};

// api for Add Update Vol Meter in vol meter page
const updateVolInit = () => {
  return {
    type: actions.ADD_UPDATE_VOL_METER_INIT,
  };
};

const updateVolSuccess = (response, message) => {
  return {
    type: actions.ADD_UPDATE_VOL_METER_SUCCESS,
    response: response,
    message: message,
  };
};

const updateVolFail = (message) => {
  return {
    type: actions.ADD_UPDATE_VOL_METER_FAIL,
    message: message,
  };
};

const addUpdateVolMeterApi = (navigate, addData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return async (dispatch) => {
    dispatch(updateVolInit());
    let form = new FormData();
    form.append("RequestMethod", addUpdateVolApi.RequestMethod);
    form.append("RequestData", JSON.stringify(addData));
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
          dispatch(addUpdateVolMeterApi(navigate, addData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_01".toLowerCase()
                )
            ) {
              dispatch(
                updateVolSuccess(
                  response.data.responseResult.responseMessage,
                  "Record Saved"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_02".toLowerCase()
                )
            ) {
              dispatch(updateVolFail("No Record Saved"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_03".toLowerCase()
                )
            ) {
              dispatch(updateVolSuccess("Record Saved"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_04".toLowerCase()
                )
            ) {
              dispatch(updateVolFail("No Record Saved"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_05".toLowerCase()
                )
            ) {
              dispatch(updateVolFail("No Record Saved"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_06".toLowerCase()
                )
            ) {
              dispatch(updateVolFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_07".toLowerCase()
                )
            ) {
              dispatch(updateVolFail("Exception Not Saved"));
            }
          } else {
            dispatch(updateVolFail("Something went wrong"));
          }
        } else {
          dispatch(updateVolFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(updateVolFail("Something went wrong"));
      });
  };
};

// APi for updateCorporateApi in Customer List Page
const updateCorporateByIdInit = () => {
  return {
    type: actions.UPDATE_CORPORATE_BY_CORPORATE_INIT,
  };
};

const updateCorporateByIdSuccess = (response, message) => {
  return {
    type: actions.UPDATE_CORPORATE_BY_CORPORATE_SUCCESS,
    response: response,
    message: message,
  };
};

const updateCorporateByIdFail = (message) => {
  return {
    type: actions.UPDATE_CORPORATE_BY_CORPORATE_FAIL,
    message: message,
  };
};

const updateCorporateByApi = (
  navigate,
  newUpdateButton,
  setEditCustomerListModal,
  newData,
  newDataaa
) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return async (dispatch) => {
    dispatch(updateCorporateByIdInit());
    let form = new FormData();
    form.append("RequestMethod", updateCorporateIdApi.RequestMethod);
    form.append("RequestData", JSON.stringify(newUpdateButton));
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
          dispatch(
            updateCorporateByApi(
              navigate,
              newUpdateButton,
              setEditCustomerListModal,
              newData,
              newDataaa
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateByCorporateID_01".toLowerCase()
                )
            ) {
              dispatch(
                updateCorporateByIdSuccess(
                  response.data.responseResult.responseMessage,
                  "Record Updated"
                )
              );
              await dispatch(bankCorporateAPI(navigate, newData, newDataaa));
              setEditCustomerListModal(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateByCorporateID_02".toLowerCase()
                )
            ) {
              dispatch(updateCorporateByIdFail("No Record Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateByCorporateID_03".toLowerCase()
                )
            ) {
              dispatch(updateCorporateByIdFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateByCorporateID_04".toLowerCase()
                )
            ) {
              dispatch(updateCorporateByIdFail("Exception Not Update"));
            }
          } else {
            dispatch(updateCorporateByIdFail("Something went wrong"));
          }
        } else {
          dispatch(updateCorporateByIdFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(updateCorporateByIdFail("Something went wrong"));
      });
  };
};

export {
  getAllCorporateUserApi,
  searchUserCorporateApi,
  updateCorporateAPI,
  bankCorporateAPI,
  corporateNameByBankId,
  counterPartyLimitCorporate,
  saveCounterParty,
  getVolMeter,
  addUpdateVolMeterApi,
  updateCorporateByApi,
};
