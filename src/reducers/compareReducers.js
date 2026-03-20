import {
  COMPARE_ADD_ITEM,
  COMPARE_CLEAR_ITEMS,
  COMPARE_REMOVE_ITEM,
  COMPARE_SET_MODE,
} from "../constants/compareConstants";

const intialState = {
  compareMode: true,
  selectedItems: [],
};

export const compareReducer = (state = intialState, action) => {
  switch (action.type) {
    case COMPARE_SET_MODE:
      return {
        ...state,
        compareMode: action.payload,
      };

    case COMPARE_ADD_ITEM: {
      const item = action.payload;
      const exists = state.selectedItems.find((x) => x._id === item._id);

      if (exists) {
        return state;
      }
      return {
        ...state,
        selectedItems: [...state.selectedItems, item],
      };
    }
    case COMPARE_REMOVE_ITEM:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(
          (x) => x._id !== action.payload,
        ),
      };
    case COMPARE_CLEAR_ITEMS:
      return {
        ...state,
        selectedItems: [],
      };
    default:
      return state;
  }
};
