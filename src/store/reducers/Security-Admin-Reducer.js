import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  bankUserList: [],
  searchBankUsers: [],
  updateUserByBank: "",
};

const securityReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_BANK_USER_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.GET_ALL_BANK_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        bankUserList: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_BANK_USER_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        bankUserList: [],
        ResponseMessage: action.message,
      };

    case actions.SEARCH_BANK_USER_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.SEARCH_BANK_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        searchBankUsers: action.response,
        ResponseMessage: action.message,
      };

    case actions.SEARCH_BANK_USER_FAIL:
      return {
        ...state,
        Loading: false,
        searchBankUsers: [],
        ResponseMessage: action.message,
      };

    case actions.UPDATE_USER_BY_USERID_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_USER_BY_USERID_SUCCESS:
      return {
        ...state,
        Loading: false,
        updateUserByBank: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_USER_BY_USERID_FAIL:
      return {
        ...state,
        Loading: false,
        updateUserByBank: "",
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default securityReducer;
