import * as actions from "../action_types";
import axios from "axios";
import {
  authenticationLogIn,
  authenticationSignUp,
  authenticationRoleList,
  authenticationRefreshToken,
  customerCorporateHistory,
  getCorporateCategory,
  userBankLoginHistory,
  companySearchLoginHistory,
  bankSearchLoginHistory,
  getAllUserStatusERMAdmin,
  getAllCorporatesApiERM,
} from "../../commen/apis/Api_config";
import { authenticationAPI } from "../../commen/apis/Api_ends_points";

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
                localStorage.setItem("defaultOpenKey ", "sub1");
                localStorage.setItem("defaultSelectedKey", "3");
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
                navigate("/AdminDashboard/PropertyType");
                dispatch(loginsuccess("Successfully Logged In"));
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
                navigate("/AdminDashboard/PropertyType");
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
const allUserRoles = () => {
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
        if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_RoleManager_RoleList_01".toLowerCase()
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
                  "ERM_AuthService_RoleManager_RoleList_02".toLowerCase()
                )
            ) {
              dispatch(rolesFail("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_RoleManager_RoleList_03".toLowerCase()
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

// corporate customer login history
const corporateLoginInit = () => {
  return {
    type: actions.GET_CORPORATE_USER_LOGIN_INIT,
  };
};

const corporateLoginSuccess = (response, message) => {
  return {
    type: actions.GET_CORPORATE_USER_LOGIN_SUCCESS,
    response: response,
    message: message,
  };
};

const corporateLoginFail = (response, message) => {
  return {
    type: actions.GET_CORPORATE_USER_LOGIN_FAIL,
    response: response,
    message: message,
  };
};

const customerCorporateLogin = (navigate, newData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(corporateLoginInit());
    let form = new FormData();
    form.append("RequestMethod", customerCorporateHistory.RequestMethod);
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
          dispatch(customerCorporateLogin(navigate, newData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetCorporateUsersLoginHistory_01".toLowerCase()
                )
            ) {
              dispatch(
                corporateLoginSuccess(
                  response.data.responseResult.corporateUserLoginHistory,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetCorporateUsersLoginHistory_02".toLowerCase()
                )
            ) {
              dispatch(corporateLoginFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetCorporateUsersLoginHistory_03".toLowerCase()
                )
            ) {
              dispatch(corporateLoginFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetCorporateUsersLoginHistory_04".toLowerCase()
                )
            ) {
              dispatch(
                corporateLoginFail("Exception No Corporate Customer Found")
              );
            }
          } else {
            dispatch(corporateLoginFail("Something went wrong"));
          }
        } else {
          dispatch(corporateLoginFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(corporateLoginFail("Something went wrong"));
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

//Search Company User Login Hisory
const searchCompanyInit = () => {
  return {
    type: actions.SEARCH_COMPANY_USER_LOGIN_INIT,
  };
};

const searchCompanySuccess = (response, message) => {
  return {
    type: actions.SEARCH_COMPANY_USER_LOGIN_SUCCESS,
    response: response,
    message: message,
  };
};

const serachCompanyFail = (message) => {
  return {
    type: actions.SEARCH_COMPANY_USER_LOGIN_FAIL,
    message: message,
  };
};

const searchCompanyLogin = (navigate, searchCompanyData) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(searchCompanyInit());
    let form = new FormData();
    form.append("RequestMethod", companySearchLoginHistory.RequestMethod);
    form.append("RequestData", JSON.stringify(searchCompanyData));
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
          dispatch(searchCompanyLogin(navigate, searchCompanyData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchCompanyUsersLoginHistory_01".toLowerCase()
                )
            ) {
              dispatch(
                searchCompanySuccess(
                  response.data.responseResult.corporateUserLoginHistory,
                  "Record Found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchCompanyUsersLoginHistory_02".toLowerCase()
                )
            ) {
              dispatch(serachCompanyFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchCompanyUsersLoginHistory_03".toLowerCase()
                )
            ) {
              dispatch(serachCompanyFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_SearchCompanyUsersLoginHistory_04".toLowerCase()
                )
            ) {
              dispatch(
                serachCompanyFail("Exception No Corporate Customer Found")
              );
            }
          } else {
            dispatch(serachCompanyFail("Something went wrong"));
          }
        } else {
          dispatch(serachCompanyFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(serachCompanyFail("Something went wrong"));
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

export {
  logIn,
  signUp,
  signOut,
  RefreshToken,
  allUserRoles,
  customerCorporateLogin,
  getAllCategoriesCorporate,
  bankUserLogin,
  searchCompanyLogin,
  searchBankLogin,
  getStatusApi,
  getAllCorporateCompany,
};
