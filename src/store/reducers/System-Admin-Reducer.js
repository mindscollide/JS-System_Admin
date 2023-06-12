import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  allCorporateUser: [],
  searchCorporate: [],
  updateCorporateResponse: "",
};

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ALL_CORPORATE_USER_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.GET_ALL_CORPORATE_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        allCorporateUser: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATE_USER_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        allCorporateUser: [],
        ResponseMessage: action.message,
      };

    case actions.SEARCH_CORPORATE_USER_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.SEARCH_CORPORATE_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        searchCorporate: action.response,
        ResponseMessage: action.message,
      };

    case actions.SEARCH_CORPORATE_USER_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        searchCorporate: [],
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_USER_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_CORPORATE_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        updateCorporateResponse: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_USER_FAIL:
      return {
        ...state,
        Loading: false,
        updateCorporateResponse: "",
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default systemReducer;
