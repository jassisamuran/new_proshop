// src/actions/compareActions.js
import {
  COMPARE_ADD_ITEM,
  COMPARE_CLEAR_ITEMS,
  COMPARE_REMOVE_ITEM,
  COMPARE_SET_MODE,
} from "../constants/compareConstants";

export const setCompareMode = (value) => (dispatch) => {
  dispatch({
    type: COMPARE_SET_MODE,
    payload: value,
  });
};

export const toggleCompareItem = (product) => (dispatch, getState) => {
  const {
    compare: { selectedItems },
  } = getState();

  const exists = selectedItems.find((item) => item._id === product._id);

  if (exists) {
    dispatch({
      type: COMPARE_REMOVE_ITEM,
      payload: product._id,
    });
    return;
  }

  if (selectedItems.length >= 4) {
    alert("You can select maximum 4 items.");
    return;
  }

  dispatch({
    type: COMPARE_ADD_ITEM,
    payload: product,
  });
};

export const clearCompareItems = () => (dispatch) => {
  dispatch({ type: COMPARE_CLEAR_ITEMS });
};
