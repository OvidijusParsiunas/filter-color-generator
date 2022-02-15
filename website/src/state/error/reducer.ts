import { ErrorAction, ErrorState } from './type';
import { ErrorActionTypes } from './consts';

const initialState: ErrorState = {
  isErrorDisplayed: false,
};

const defaultAction: ErrorAction = {
  type: ErrorActionTypes.DISPAY_ERROR,
};

export const ErrorReducer = (state: ErrorState = initialState, action: ErrorAction = defaultAction): ErrorState => {
  switch (action.type) {
    case ErrorActionTypes.DISPAY_ERROR: {
      return { ...state, isErrorDisplayed: true };
    }
    case ErrorActionTypes.HIDE_ERROR: {
      return { ...state, isErrorDisplayed: false };
    }
    default:
      return state;
  }
};
