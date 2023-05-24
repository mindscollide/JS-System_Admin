import * as actions from "../action_types";

const initialState = {
  UserDetails: null,
  isLoggedIn: false,
  Loading: false,
  ResponseMessage: "",
  isSignUp: false,
  SessionExpeireResponseMessage: "",
  UserRoleslist: [],
  roles: null,
  Token: "",
  Refresh: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOG_IN_INIT:
      return { ...state, Loading: true };

    case actions.LOG_IN_SUCCESS:
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
        Loading: false,
        Token: action.response.token,
        Refresh: action.response.refreshToken,
      };

    case actions.LOG_IN_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
        Loading: false,
        Token: "",
        Refresh: "",
      };

    case actions.SIGN_UP_INIT:
      return { ...state, Loading: true };

    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        Loading: false,
        isLoggedIn: true,
        ResponseMessage: action.message,
      };

    case actions.SIGN_UP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.SIGN_OUT:
      localStorage.clear();
      return {
        ...state,
        UserDetails: null,
        isLoggedIn: false,
        Loading: false,
        Token: "",
        Refresh: "",
        SessionExpeireResponseMessage: action.message,
      };

      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.USER_ROLES_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.USER_ROLES_SUCCESS:
      return {
        ...state,
        Loading: false,
        UserRoleslist: action.response,
        ResponseMessage: action.message,
      };

    case actions.USER_ROLES_FAIL:
      return {
        ...state,
        Loading: false,
        UserRoleslist: [],
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default authReducer;
