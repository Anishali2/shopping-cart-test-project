import { LOGIN_USER, LOGOUT_USER, SET_CART } from "../constants"
const initialState = {
    isLoggedIn:false,
    user_details:{},
    cart:[],
}
export default function user(state = initialState, action) {
    switch (action.type) {
       
        case LOGIN_USER: {
          return  {
            ...state,
            isLoggedIn:true,
            user_details:action.payload,
        }
      }
      case SET_CART: {
        return  {
          ...state,
          cart:action.payload,}
    }
        default:
          return state
      }
  }