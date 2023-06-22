import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  addCategory: [],
};

const AddCategory = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        addCategory: action.response,
        ResponseMessage: action.message,
      };

    case actions.ADD_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default AddCategory;
