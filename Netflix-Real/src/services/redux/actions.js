import { IS_INFO_POP_UP } from "./constrains"

export const showPopUpInfo = (isPopUp) => {
    return {
        type: IS_INFO_POP_UP,
        payload: {
            isPopUp: isPopUp
        }
    }
}
