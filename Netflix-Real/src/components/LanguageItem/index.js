import React, { useState } from "react";
import './languageItem.scss';
import { Link, NavLink } from "react-router-dom";
import { Footer } from "../../components";

const LanguageItem = (props) => {
    const [isCheck, setIsCheck] = useState(false);
    const langChecked = () => {
        setIsCheck(!isCheck)
    }

    return ( 
        <li className="languageItem">
            <div className="ui-binary-input" onClick={langChecked}>
                <input value={props.id} type="checkbox" className="allLanguages_ms" checked={isCheck} />
                <label className={`${isCheck ? 'checked' : ''}`}>
                    <span class="language">{props.language}</span>
                </label>
            </div>
        </li>
    )
}
export default LanguageItem;