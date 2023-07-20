import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  updateUserByBank: "",
  searchGetBankUserList: [],
};

const securityReducer = (state = initialState, action) => {
  switch (action.type) {
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

    case actions.SEARCH_GET_BANK_USER_LIST_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.SEARCH_GET_BANK_USER_LIST_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        searchGetBankUserList: action.response,
        ResponseMessage: action.message,
      };

    case actions.SEARCH_GET_BANK_USER_LIST_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        searchGetBankUserList: [],
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default securityReducer;
