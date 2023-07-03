import * as actions from "../action_types";
import axios from "axios";
import {
  authenticationLogIn,
  authenticationSignUp,
  authenticationRoleList,
  authenticationRefreshToken,
  getCorporateCategory,
  userBankLoginHistory,
  bankSearchLoginHistory,
  getAllUserStatusERMAdmin,
  getAllCorporatesApiERM,
  getAllNatureAPI,
  getallCoporatesSystem,
  UpdateCorporateMapping,
  DeleteCategory,
  searchGetCompanyUserLoginHistory,
  searchGetBankUserLoginHistory,
} from "../../commen/apis/Api_config";
import {
  authenticationAPI,
  systemAdminAPI,
} from "../../commen/apis/Api_ends_points";
import { type } from "@testing-library/user-event/dist/type";
import { message } from "antd";

const logininit = () => {
  return {
    type: actions.LOG_IN_INIT,
  };
};

const loginsuccess = (response, message) => {
  return {
    type: actions.LOG_IN_SUCCESS,
    response: response,
    message: message,
  };
};

const loginfail = (message) => {
  return {
    type: actions.LOG_IN_FAIL,
    message: message,
  };
};

const signupInit = () => {
  return {
    type: actions.SIGN_UP_INIT,
  };
};

const signupSuccess = (response, message) => {
  return {
    type: actions.SIGN_UP_SUCCESS,
    response: response,
    message: message,
  };
};

const signupFail = (response, message) => {
  return {
    type: actions.SIGN_UP_FAIL,
    response: response,
    message: message,
  };
};

const signOut = (navigate, message) => {
  localStorage.clear();
  navigate("/");
  if (message !== "") {
    return {
      type: actions.SIGN_OUT,
      message: message,
    };
  } else {
    return {
      type: actions.SIGN_OUT,
    };
  }
};

const rolesInit = () => {
  return {
    type: actions.USER_ROLES_INIT,
  };
};

const rolesSuccess = (response, message) => {
  return {
    type: actions.USER_ROLES_SUCCESS,
    response: response,
    message: message,
  };
};

const rolesFail = (response, message) => {
  return {
    type: actions.USER_ROLES_FAIL,
    response: response,
    message: message,
  };
};

//signIn API Function
const logIn = (navigate, UserData) => {
  console.log("logincredentials", UserData);
  var min = 10000;
  var max = 90000;
  var id = min + Math.random() * (max - min);
  let Data = {
    UserName: UserData.UserName,
    Password: UserData.Password,
    DeviceID: id.toString(),
    Device: "browser",
  };
  console.log("logincredentials", Data);
  return (dispatch) => {
    dispatch(logininit());
    let form = new FormData();
    form.append("RequestMethod", authenticationLogIn.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationAPI,
      data: form,
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_01"
            ) {
              dispatch(loginfail("Device does not exists"));
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_02"
            ) {
              dispatch(loginfail("Device ID does not exists"));
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_03"
            ) {
              if (response.data.responseResult.roleID === 4) {
                localStorage.setItem(
                  "userID",
                  response.data.responseResult.userID
                );
                localStorage.setItem(
                  "bankID",
                  response.data.responseResult.bankID
                );
                localStorage.setItem("defaultOpenKey ", "sub1");
                localStorage.setItem("defaultSelectedKey", "6");
                localStorage.setItem(
                  "firstName",
                  response.data.responseResult.firstName
                );
                localStorage.setItem(
                  "lastName",
                  response.data.responseResult.lastName
                );
                localStorage.setItem(
                  "userName",
                  response.data.responseResult.userName
                );
                localStorage.setItem(
                  "roleID",
                  response.data.responseResult.roleID
                );
                localStorage.setItem(
                  "token",
                  JSON.stringify(response.data.responseResult.token)
                );
                localStorage.setItem(
                  "refreshToken",
                  JSON.stringify(response.data.responseResult.refreshToken)
                );
                navigate("/AdminDashboard/loginHistory");
                dispatch(loginsuccess("Successfully Logged In"));
              } else if (response.data.responseResult.roleID === 4) {
                localStorage.setItem(
                  "userID",
                  response.data.responseResult.userID
                );
                localStorage.setItem(
                  "bankID",
                  response.data.responseResult.bankID
                );
                localStorage.setItem(
                  "firstName",
                  response.data.responseResult.firstName
                );
                localStorage.setItem(
                  "lastName",
                  response.data.responseResult.lastName
                );
                localStorage.setItem(
                  "userName",
                  response.data.responseResult.userName
                );
                localStorage.setItem(
                  "roleID",
                  response.data.responseResult.roleID
                );
                localStorage.setItem(
                  "token",
                  response.data.responseResult.token
                );
                localStorage.setItem(
                  "refreshToken",
                  response.data.responseResult.refreshToken
                );
                navigate("/AdminDashboard/loginHistory");
                dispatch(loginsuccess("Successfully Logged In"));
              } else {
                dispatch(
                  loginfail("This user is not authorise for this domain")
                );
              }
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_04"
            ) {
              dispatch(
                loginfail("Invalid Credentials. Please enter correct password")
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_05"
            ) {
              dispatch(
                loginfail(
                  "Your account has been Locked. Please contact Data Strategy - BST"
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_06"
            ) {
              dispatch(
                loginfail(
                  "Your account has been Disabled. Please contact Data Strategy - BST"
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_07"
            ) {
              dispatch(
                loginfail(
                  "Your account has been Closed. Please contact Data Strategy - BST"
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_08"
            ) {
              dispatch(
                loginfail(
                  "Account set to Dormant due to InActivity. Please contact Data Strategy - BST"
                )
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_09"
            ) {
              dispatch(loginfail("User could not be Verified"));
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_10"
            ) {
              dispatch(
                loginfail("Not a valid user. Please login with valid user")
              );
            } else if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_AuthManager_Login_011"
            ) {
              dispatch(loginfail("something went wrong"));
            }
          } else {
            dispatch(loginfail("something went wrong"));
            console.log("something went wrong");
          }
        } else {
          dispatch(loginfail("something went wrong"));
          console.log("something went wrong");
        }
      })
      .catch((response) => {
        dispatch(loginfail("something went wrong"));
      });
  };
};

// signUp API Function
const signUp = (navigate, UserData) => {
  let Data = {
    LoginID: UserData.LoginID,
    FirstName: UserData.FirstName,
    LastName: UserData.LastName,
    Email: UserData.Email,
    PersonalNumber: UserData.PersonalNumber,
    RoleID: UserData.RoleID,
  };

  return (dispatch) => {
    dispatch(signupInit());
    let form = new FormData();
    form.append("RequestMethod", authenticationSignUp.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_SignUpManager_SignUp_01"
            ) {
              dispatch(
                signupFail(
                  "Invalid Role for Signup. Please select a role from the given options"
                )
              );
            }
            if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_SignUpManager_SignUp_02"
            ) {
              dispatch(
                signupFail(
                  "Signup request for the Login ID is in pending state. Please use a different ID"
                )
              );
            }
            if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_SignUpManager_SignUp_03"
            ) {
              if (response.data.responseResult.roleID === 2) {
                localStorage.setItem(
                  "userID",
                  response.data.responseResult.userID
                );
                localStorage.setItem(
                  "firstName",
                  response.data.responseResult.firstName
                );
                localStorage.setItem(
                  "lastName",
                  response.data.responseResult.lastName
                );
                localStorage.setItem(
                  "userName",
                  response.data.responseResult.userName
                );
                localStorage.setItem(
                  "roleID",
                  response.data.responseResult.roleID
                );
                localStorage.setItem(
                  "token",
                  response.data.responseResult.token
                );
                localStorage.setItem(
                  "refreshToken",
                  response.data.responseResult.refreshToken
                );
                navigate("/");
                dispatch(signupSuccess("Successfully signup In"));
              } else if (response.data.responseResult.roleID === 4) {
                localStorage.setItem(
                  "userID",
                  response.data.responseResult.userID
                );
                localStorage.setItem(
                  "firstName",
                  response.data.responseResult.firstName
                );
                localStorage.setItem(
                  "lastName",
                  response.data.responseResult.lastName
                );
                localStorage.setItem(
                  "userName",
                  response.data.responseResult.userName
                );
                localStorage.setItem(
                  "roleID",
                  response.data.responseResult.roleID
                );
                localStorage.setItem(
                  "token",
                  response.data.responseResult.token
                );
                localStorage.setItem(
                  "refreshToken",
                  response.data.responseResult.refreshToken
                );
                navigate("/");
                dispatch(signupSuccess("Successfully Signup In"));
              } else {
                dispatch(
                  loginfail("This user is not authorise for this domain")
                );
              }
            }
            if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_SignUpManager_SignUp_04"
            ) {
              dispatch(
                signupFail(
                  "Unable to submit signup request. Please try after some time"
                )
              );
            }
            if (
              response.data.responseResult.responseMessage ===
              "ERM_AuthService_SignUpManager_SignUp_05"
            ) {
              dispatch(signupFail("Something went wrong"));
            }
          } else {
            dispatch(signupFail("Something went wrong"));
            console.log("Something went wrong in signup");
          }
        } else {
          dispatch(signupFail("Something went wrong"));
          console.log("Something went wrong in signup");
        }
      })

      .catch((response) => {
        dispatch(signupFail("Something went wrong"));
      });
  };
};

// REFRESH TOKEN
// FAIL
const refreshtokenFail = (response, message) => {
  return {
    type: actions.REFRESH_TOKEN_FAIL,
    response: response,
    message: message,
  };
};
// SUCCESS
const refreshtokenSuccess = (response, message) => {
  return {
    type: actions.REFRESH_TOKEN_SUCCESS,
    response: response,
    message: message,
  };
};
// API
const RefreshToken = (navigate) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  let RefreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  console.log("RefreshToken", Token, RefreshToken);
  let Data = {
    Token: Token,
    RefreshToken: RefreshToken,
  };
  console.log("RefreshToken", Data);
  return async (dispatch) => {
    let form = new FormData();
    form.append("RequestMethod", authenticationRefreshToken.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: authenticationAPI,
      data: form,
    })
      .then(async (response) => {
        console.log("RefreshToken", response);
        if (response.data.responseCode === 200) {
          await dispatch(
            refreshtokenSuccess(
              response.data.responseResult,
              "Refresh Token Update Successfully"
            )
          );
        } else {
          console.log("RefreshToken", response);
          let message2 = "Your Session has expired. Please login again";
          dispatch(signOut(navigate, message2));
          await dispatch(
            refreshtokenFail("Your Session has expired. Please login again.")
          );
        }
      })
      .catch((response) => {
        dispatch(
          refreshtokenFail("Your Session has expired. Please login again.")
        );
      });
  };
};

// signUp Api for userRole List
const allUserRoles = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(rolesInit());
    let form = new FormData();
    form.append("RequestMethod", authenticationRoleList.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
    })
      .then(async (response) => {
        console.log("UserRoleListUserRoleList", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(allUserRoles(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_RoleList_01".toLowerCase()
                )
            ) {
              console.log("UserRoleListUserRoleList", response);
              dispatch(
                rolesSuccess(response.data.responseResult.roles, "Record found")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_RoleList_02".toLowerCase()
                )
            ) {
              dispatch(rolesFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_RoleList_03".toLowerCase()
                )
            ) {
              dispatch(rolesFail("Exception No roles available"));
            }
          } else {
            dispatch(rolesFail("Something went wrong"));
            console.log("There's no User Role");
          }
        } else {
          dispatch(rolesFail("Something went wrong"));
          console.log("There's no User Role");
        }
      })
      .catch((response) => {
        dispatch(rolesFail("something went wrong"));
      });
  };
};

// GET ALL CORPORATE CATEGORIES
const getCategoriesInit = () => {
  return {
    type: actions.GET_ALL_CORPORATE_CATEGORIES_INIT,
  };
};

const getCategoriesSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CORPORATE_CATEGORIES_SUCCESS,
    response: response,
    message: message,
  };
};

const getCategoriesFail = (message) => {
  return {
    type: actions.GET_ALL_CORPORATE_CATEGORIES_FAIL,
    message: message,
  };
};

const getAllCategoriesCorporate = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(getCategoriesInit());
    let form = new FormData();
    form.append("RequestMethod", getCorporateCategory.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("CorporateCategoryCorporateCategory", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getAllCategoriesCorporate(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllCorporateCategories_01".toLowerCase()
            ) {
              console.log(
                "UserRoleListUserRoleList",
                response.data.responseResult.corporateCategories
              );
              dispatch(
                getCategoriesSuccess(
                  response.data.responseResult.corporateCategories,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCorporateCategories_02".toLowerCase()
                )
            ) {
              dispatch(getCategoriesFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCorporateCategories_03".toLowerCase()
                )
            ) {
              dispatch(getCategoriesFail("Exception Something went wrong"));
            }
          } else {
            dispatch(getCategoriesFail("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(getCategoriesFail("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(getCategoriesFail("something went wrong"));
      });
  };
};

//Get Bank User Login History Api
const bankUserInit = () => {
  return {
    type: actions.GET_BANK_USER_LOGIN_INIT,
  };
};

const bankUserSuccess = (response, message) => {
  return {
    type: actions.GET_BANK_USER_LOGIN_SUCCESS,
    response: response,
    message: message,
  };
};

const bankUserFail = (message) => {
  return {
    type: actions.GET_BANK_USER_LOGIN_FAIL,
    message: message,
  };
};

const bankUserLogin = (navigate, newData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(bankUserInit());
    let form = new FormData();
    form.append("RequestMethod", userBankLoginHistory.RequestMethod);
    form.append("RequestData", JSON.stringify(newData));
    axios({
      method: "post",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(bankUserLogin(navigate, newData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetBankUsersLoginHistory_01".toLowerCase()
                )
            ) {
              dispatch(
                bankUserSuccess(
                  response.data.responseResult.corporateUserLoginHistory,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetBankUsersLoginHistory_02".toLowerCase()
                )
            ) {
              dispatch(bankUserFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetBankUsersLoginHistory_03".toLowerCase()
                )
            ) {
              dispatch(bankUserFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetBankUsersLoginHistory_04".toLowerCase()
                )
            ) {
              dispatch(bankUserFail("Exception No Corporate Customer Found"));
            }
          } else {
            dispatch(bankUserFail("Something went wrong"));
          }
        } else {
          dispatch(bankUserFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(bankUserFail("Something went wrong"));
      });
  };
};

// Search Bank User Login History
const searchBankInit = () => {
  return {
    type: actions.SEARCH_BANK_USER_LOGIN_INIT,
  };
};

const searchBankSuccess = (response, message) => {
  return {
    type: actions.SEARCH_BANK_USER_LOGIN_SUCCESS,
    response: response,
    message: message,
  };
};

const serachBankFail = (message) => {
  return {
    type: actions.SEARCH_BANK_USER_LOGIN_FAIL,
    message: message,
  };
};

const searchBankLogin = (navigate, seacrhBankData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(searchBankInit());
    let form = new FormData();
    form.append("RequestMethod", bankSearchLoginHistory.RequestMethod);
    form.append("RequestData", JSON.stringify(seacrhBankData));
    axios({
      method: "post",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(searchBankLogin(navigate, seacrhBankData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchBankUsersLoginHistory_01".toLowerCase()
                )
            ) {
              dispatch(
                searchBankSuccess(
                  response.data.responseResult.corporateUserLoginHistory,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchBankUsersLoginHistory_02".toLowerCase()
                )
            ) {
              dispatch(serachBankFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchBankUsersLoginHistory_03".toLowerCase()
                )
            ) {
              dispatch(serachBankFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchBankUsersLoginHistory_04".toLowerCase()
                )
            ) {
              dispatch(serachBankFail("Exception No Corporate Customer Found"));
            }
          } else {
            dispatch(serachBankFail("Something went wrong"));
          }
        } else {
          dispatch(serachBankFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(serachBankFail("Something went wrong"));
      });
  };
};

// get all User Status API in System Admin ERM
const getAllStatusInit = () => {
  return {
    type: actions.GET_ALL_USER_STATUS_API_INIT,
  };
};

const getAllStatusSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_USER_STATUS_API_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllStatusFail = (message) => {
  return {
    type: actions.GET_ALL_USER_STATUS_API_FAIL,
    message: message,
  };
};

const getStatusApi = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(getAllStatusInit());
    let form = new FormData();
    form.append("RequestMethod", getAllUserStatusERMAdmin.RequestMethod);
    form.append("RequestData", JSON.stringify());
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("UserRoleListUserRoleList", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getStatusApi(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllUserStatus_01".toLowerCase()
                )
            ) {
              console.log("UserRoleListUserRoleList", response);
              dispatch(
                getAllStatusSuccess(
                  response.data.responseResult.status,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllUserStatus_02".toLowerCase()
                )
            ) {
              dispatch(getAllStatusFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllUserStatus_03".toLowerCase()
                )
            ) {
              dispatch(getAllStatusFail("Exception No Status available"));
            }
          } else {
            dispatch(getAllStatusFail("Something went wrong"));
            console.log("There's no User Role");
          }
        } else {
          dispatch(getAllStatusFail("Something went wrong"));
          console.log("There's no User Role");
        }
      })
      .catch((response) => {
        dispatch(getAllStatusFail("something went wrong"));
      });
  };
};

// For Get All Corporate Api
const categoryCompanyInit = () => {
  return {
    type: actions.GET_ALL_CORPORATES_COMPANY_INIT,
  };
};

const categoryCompanySuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CORPORATES_COMPANY_SUCCESS,
    response: response,
    message: message,
  };
};

const categoryCompanyFail = (message) => {
  return {
    type: actions.GET_ALL_CORPORATES_COMPANY_FAIL,
    message: message,
  };
};

const getAllCorporateCompany = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(categoryCompanyInit());
    let form = new FormData();
    form.append("RequestMethod", getAllCorporatesApiERM.RequestMethod);
    form.append("RequestData", JSON.stringify());
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("CorporateCategoryCorporateCategory", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getAllCorporateCompany(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllCorporates_01".toLowerCase()
            ) {
              console.log("UserRoleListUserRoleList", response);
              dispatch(
                categoryCompanySuccess(
                  response.data.responseResult.corporates,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCorporates_02".toLowerCase()
                )
            ) {
              dispatch(categoryCompanyFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCorporates_03".toLowerCase()
                )
            ) {
              dispatch(categoryCompanyFail("Exception Something went wrong"));
            }
          } else {
            dispatch(categoryCompanyFail("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(categoryCompanyFail("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(categoryCompanyFail("something went wrong"));
      });
  };
};

// FOR Get all nature of business api
const natureBusinessInit = () => {
  return {
    type: actions.GET_ALL_NATURE_BUSINESS_INIT,
  };
};

const natureBusinessSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_NATURE_BUSINESS_SUCCESS,
    response: response,
    message: message,
  };
};

const natureBusinessFail = (message) => {
  return {
    type: actions.GET_ALL_NATURE_BUSINESS_FAIL,
    message: message,
  };
};

const getNatureBusiness = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(natureBusinessInit());
    let form = new FormData();
    form.append("RequestMethod", getAllNatureAPI.RequestMethod);
    form.append("RequestData", JSON.stringify());
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("getAllNaturegetAllNaturegetAllNature", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getNatureBusiness(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllNatureOfBussiness_01".toLowerCase()
            ) {
              console.log(
                "UserRoleListUserRoleList",
                response.data.responseResult.natureofBusinesses
              );
              dispatch(
                natureBusinessSuccess(
                  response.data.responseResult.natureofBusinesses,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllNatureOfBussiness_02".toLowerCase()
                )
            ) {
              dispatch(natureBusinessFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllNatureOfBussiness_03".toLowerCase()
                )
            ) {
              dispatch(natureBusinessFail("Exception Something went wrong"));
            }
          } else {
            dispatch(natureBusinessFail("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(natureBusinessFail("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(natureBusinessFail("something went wrong"));
      });
  };
};

const getallcoporatesinit = () => {
  return {
    type: actions.GET_ALL_CORPORATES_INIT,
  };
};

const getallcorporatessuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CORPORATES_SUCCESS,
    response: response,
    message: message,
  };
};

const getallcorporatesfailed = (message) => {
  return {
    type: actions.GET_ALL_CORPORATES_FAIL,
    message: message,
  };
};

const getAllCorporatesCategory = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let data = {};
  return (dispatch) => {
    dispatch(categoryCompanyInit());
    let form = new FormData();
    form.append("RequestMethod", getallCoporatesSystem.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("CorporateCategoryCorporateCategory", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getAllCorporatesCategory(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetAllCorporateDetails_01".toLowerCase()
            ) {
              dispatch(
                getallcorporatessuccess(
                  response.data.responseResult.corporateCategories,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateDetails_02".toLowerCase()
                )
            ) {
              dispatch(getallcorporatesfailed("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateDetails_03".toLowerCase()
                )
            ) {
              dispatch(getallcorporatesfailed("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateDetails_04".toLowerCase()
                )
            ) {
              dispatch(
                getallcorporatesfailed("Exception Something went wrong")
              );
            }
          } else {
            dispatch(getallcorporatesfailed("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(getallcorporatesfailed("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(getallcorporatesfailed("something went wrong"));
      });
  };
};

const updatecorporateinit = () => {
  return {
    type: actions.UPDATE_CORPORATE_MAPPING_INIT,
  };
};

const updatecorporatesuccess = (response, message) => {
  return {
    type: actions.UPDATE_CORPORATE_MAPPING_SUCCESS,
    response: response,
    message: message,
  };
};

const updatecorporatefailed = (message) => {
  return {
    type: actions.UPDATE_CORPORATE_MAPPING_FAIL,
    message: message,
  };
};

const UpdatecorporateMapping = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(categoryCompanyInit());
    let form = new FormData();
    form.append("RequestMethod", UpdateCorporateMapping.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("CorporateCategoryCorporateCategory", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(UpdatecorporateMapping(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateCorporateCategoryMapping_01".toLowerCase()
            ) {
              await dispatch(getAllCorporatesCategory(navigate));
              dispatch(
                updatecorporatesuccess(
                  response.data.responseResult.corporateCategory,
                  "Record Updated"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategoryMapping_02".toLowerCase()
                )
            ) {
              dispatch(updatecorporatefailed("No Record Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategoryMapping_03".toLowerCase()
                )
            ) {
              dispatch(updatecorporatefailed("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategoryMapping_04".toLowerCase()
                )
            ) {
              dispatch(updatecorporatefailed("Exception Something went wrong"));
            }
          } else {
            dispatch(updatecorporatefailed("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(updatecorporatefailed("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(updatecorporatefailed("something went wrong"));
      });
  };
};

const deletecorporatecategoryinit = () => {
  return {
    type: actions.DELETE_CATEGORY_INIT,
  };
};

const deletecorporatecategorysuccess = (response, message) => {
  return {
    type: actions.DELETE_CATEGORY_SUCCESS,
    response: response,
    message: message,
  };
};

const deletecorporatecategoryfailed = (message) => {
  return {
    type: actions.DELETE_CATEGORY_FAILED,
    message: message,
  };
};

const DeleteCorporateCategoryAPI = (navigate, data, setDeleteRejectModal) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return async (dispatch) => {
    dispatch(deletecorporatecategoryinit());
    let form = new FormData();
    form.append("RequestMethod", DeleteCategory.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "POST",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("CorporateCategoryCorporateCategory", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(DeleteCorporateCategoryAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_DeleteCorporateCategory_01".toLowerCase()
            ) {
              setDeleteRejectModal(true);
              dispatch(
                deletecorporatecategorysuccess(
                  response.data.responseResult.corporateCategory,
                  "Category Cannot be delete It is mapped with a corporate"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCorporateCategory_02".toLowerCase()
                )
            ) {
              dispatch(
                deletecorporatecategorysuccess(
                  response.data.responseResult.corporateCategory,
                  "Category Deleted"
                )
              );
              dispatch(getAllCorporatesCategory(navigate));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCorporateCategory_03".toLowerCase()
                )
            ) {
              dispatch(deletecorporatecategoryfailed("Category not Deleted"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCorporateCategory_04".toLowerCase()
                )
            ) {
              dispatch(deletecorporatecategoryfailed("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCorporateCategory_05".toLowerCase()
                )
            ) {
              dispatch(
                deletecorporatecategoryfailed("Exception Something went wrong ")
              );
            }
          } else {
            dispatch(deletecorporatecategoryfailed("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(deletecorporatecategoryfailed("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(deletecorporatecategoryfailed("something went wrong"));
      });
  };
};

// FOR USER LOGIN HISTORY SEARCH AND GET API
const userLoginInit = () => {
  return {
    type: actions.SEARCH_GET_COMPANY_USER_LOGIN_INIT,
  };
};

const userLoginSuccess = (response, message) => {
  return {
    type: actions.SEARCH_GET_COMPANY_USER_LOGIN_SUCCESS,
    response: response,
    message: message,
  };
};

const userLoginFail = (message) => {
  return {
    type: actions.SEARCH_GET_COMPANY_USER_LOGIN_FAIL,
    message: message,
  };
};

const userSearhGetLoginHistory = (navigate, newData, newSearchData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(userLoginInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchGetCompanyUserLoginHistory.RequestMethod
    );
    form.append("RequestData", JSON.stringify(newData, newSearchData));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("userloginuserlogin", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(userSearhGetLoginHistory(navigate, newData, newSearchData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_SearchCompanyUsersLoginHistory_01".toLowerCase()
            ) {
              console.log("userloginuserloginuserloginuserlogin", response);
              dispatch(
                userLoginSuccess(
                  response.data.responseResult.corporateUserLoginHistory,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchCompanyUsersLoginHistory_02".toLowerCase()
                )
            ) {
              dispatch(userLoginFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchCompanyUsersLoginHistory_03".toLowerCase()
                )
            ) {
              dispatch(userLoginFail("Invalid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchCompanyUsersLoginHistory_04".toLowerCase()
                )
            ) {
              dispatch(userLoginFail("Exception Something went wrong"));
            }
          } else {
            dispatch(userLoginFail("Something went wrong"));
          }
        } else {
          dispatch(userLoginFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(userLoginFail("something went wrong"));
      });
  };
};

//FOR BANK USER LOGIN HISTORY SEARCH AND GET API
const bankUserLoginInit = () => {
  return {
    type: actions.SEARCH_GET_BANK_USER_LOGIN_INIT,
  };
};

const bankUserLoginSuccess = (response, message) => {
  return {
    type: actions.SEARCH_GET_BANK_USER_LOGIN_SUCCESS,
    response: response,
    message: message,
  };
};

const bankUserLoginFail = (message) => {
  return {
    type: actions.SEARCH_GET_BANK_USER_LOGIN_FAIL,
    message: message,
  };
};

const bankUserSeacrhGetLogin = (navigate, newData, seacrhBankData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(bankUserLoginInit());
    let form = new FormData();
    form.append("RequestMethod", searchGetBankUserLoginHistory.RequestMethod);
    form.append("RequestData", JSON.stringify(newData, seacrhBankData));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("userloginuserlogin", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(bankUserSeacrhGetLogin(navigate, newData, seacrhBankData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_SearchBankUsersLoginHistory_01".toLowerCase()
            ) {
              console.log("userloginuserloginuserloginuserlogin", response);
              dispatch(
                bankUserLoginSuccess(
                  response.data.responseResult.bankUserLoginHistory,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchBankUsersLoginHistory_02".toLowerCase()
                )
            ) {
              dispatch(bankUserLoginFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchBankUsersLoginHistory_03".toLowerCase()
                )
            ) {
              dispatch(bankUserLoginFail("Invalid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchBankUsersLoginHistory_04".toLowerCase()
                )
            ) {
              dispatch(bankUserLoginFail("Exception Something went wrong"));
            }
          } else {
            dispatch(bankUserLoginFail("Something went wrong"));
          }
        } else {
          dispatch(bankUserLoginFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(bankUserLoginFail("something went wrong"));
      });
  };
};

export {
  logIn,
  signUp,
  signOut,
  RefreshToken,
  allUserRoles,
  getAllCategoriesCorporate,
  bankUserLogin,
  searchBankLogin,
  getStatusApi,
  getAllCorporateCompany,
  getNatureBusiness,
  getAllCorporatesCategory,
  UpdatecorporateMapping,
  DeleteCorporateCategoryAPI,
  userSearhGetLoginHistory,
  bankUserSeacrhGetLogin,
};
