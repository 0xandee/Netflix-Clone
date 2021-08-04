import React, { createRef, useEffect, useState } from "react";
import '../scss/customInput.scss'
import * as Icon from 'react-feather';
import { NavLink } from "react-router-dom";
const CustomInput = (props) => {
    const [isFocus, setIsFocus] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isReveal, setIsreveal] = useState(false)
    const textInput = createRef(null);
    const onFocus = () => setIsFocus(true)
    const onBlur = (event) => {
        const target = event.target;
        const value = target.value;
        if (value === '') {
            setIsError(true);
            setIsFocus(false)
        }
        else {
            setIsError(false);
        }
    }
    const btnRevealClicked = () => {
        if (!isReveal)
            textInput.current.type = 'text'
        else
            textInput.current.type = 'password'
        setIsreveal(!isReveal)
    }
    return (
        <div id='customInput'>
            <div className={`custom-input`}>
                <div className={`custom-input__form`}>
                    <div className={`custom-input__form__input ${isError && `error`}`} style={{...props.style}} >
                        <input type={props.type} ref={textInput} onFocus={onFocus} onBlur={onBlur}  style={props.textStyle}/>
                        <label className={`custom-input__form__input__placehoder-label ${isFocus && 'focus-input'}`}>{props.label}</label>
                        {isError && <label  className={`custom-input__form__input__error-label`}>{props.placeHolder}</label>}
                        {props.type ==='password' && <button className='' onClick={btnRevealClicked}>
                            {isReveal ?
                                <Icon.EyeOff color='#8c8c8c' />
                                :
                                <Icon.Eye color='#8c8c8c' />

                            }

                        </button>}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default CustomInput;