import React, { createRef, useState } from "react";
import './customInput.scss'
import * as Icon from 'react-feather';
const CustomInput = (props) => {
    const [isFocus, setIsFocus] = useState(false)
    const [isReveal, setIsreveal] = useState(false)
    const textInput = createRef(null);
    const onFocus = () => setIsFocus(true)
    const onBlur = (event) => {
        const target = event.target;
        const value = target.value;
        if (value === '') {
            setIsFocus(false)
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
                    <div className={`custom-input__form__input `} style={{ ...props.style }} >
                        <input
                            ref={textInput}
                            type={props.type}
                            value={props.value}
                            onChange={e => props.onChange(e.target.value)}
                            onFocus={onFocus} onBlur={onBlur}
                            style={props.textStyle}
                            autoComplete="new-password" />

                        <label className={`placehoder-label ${isFocus && 'focus-input'}`}>{props.label}</label>

                        {props.type === 'password' && <div className='mr-2 btn-eye' style={{ backgroundColor: 'transparent' }} onClick={btnRevealClicked}>
                            {isReveal ?
                                <Icon.EyeOff color='#8c8c8c' />
                                :
                                <Icon.Eye color='#8c8c8c' />

                            }
                        </div>}
                    </div>

                </div>
            </div>

        </div>
    )
}
export default CustomInput;