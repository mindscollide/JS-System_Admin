import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  bankUserList: [],
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

    default:
      return { ...state };
  }
};

export default securityReducer;
