import { IS_INFO_POP_UP } from "./constrains";

var initState = {
        isPopUp : false,  
};

export const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case IS_INFO_POP_UP: {
            return {
                ...state,
                isPopUp: action.payload.isPopUp
            }
        }

        default:
            return state;
    }
}