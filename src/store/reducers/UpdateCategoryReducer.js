import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  Spinner: false,
  UpdateCategory: [],
};

const UpdateCategoryMap = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPDATE_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        UpdateCategory: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default UpdateCategoryMap;
