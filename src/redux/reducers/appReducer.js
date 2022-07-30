import {  OPEN_MODEL } from "../constants"
const initialState = {
    model:false,
}
export default function app(state = initialState, action) {
    switch (action.type) {
       
      case OPEN_MODEL: {
        return  {
          ...state,
          model:action.payload,
        
        }
    }
        default:
          return state
      }
  }