import {
  GET_MANAGER_DETAILS,
  LOGIN,
  SET_AUTHENTICATED,
  GET_FAVORITES,
  SET_HOTEL_BILLINGS,
} from '../actions/types/index';
//create auth reducer
const initialState = {
  token: '',
  userId: '',
  managerDetails: {},
  faveList: [],
  selectedHotelBill: {},
};
interface Action {
  type: string;
  token: string;
  payload: string;
}
export const authReducer = (
  state: typeof initialState = initialState,
  action: Action
) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.payload };
    case GET_MANAGER_DETAILS:
      return {
        ...state,
        managerDetails: action.payload,
      };
    case GET_FAVORITES:
      return {
        ...state,
        faveList: action.payload,
      };
    case SET_HOTEL_BILLINGS:
      return {
        ...state,
        selectedHotelBill: action.payload,
      };
    default:
      return state;
  }
};
