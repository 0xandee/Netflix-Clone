import { SET_MOVIE_TYPES, IS_INFO_POP_UP } from "./constrains";

var initialState = {
        // isPopUp : false, 
        currentUser: {} ,
        movieTypes:[],
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_INFO_POP_UP: {
            return {
                ...state,
                isPopUp: action.payload.isPopUp
            }
        }
        case SET_MOVIE_TYPES: {
          return {
              ...state,
              movieTypes: action.payload.movieTypes
          }
      }

        default:
            return state;
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_USER':
        return {...state, currentUser: action.payload}
      default:
        return state;
    }
  }