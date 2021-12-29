import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Footer } from "../../components";

const GenreItem = (props) => {
    const [isCheck, setIsCheck] = useState(false);
    const langChecked = (item) => () => {
        setIsCheck(!isCheck)
        if (!isCheck) {
            console.log("🚀 ~ file: index.js ~ line 10 ~ langChecked ~ isCheck", isCheck)
            props.checkedGenresClicked(item)
        }
        else props.notCheckedGenresClicked(item)
    }

    return (
        <li className="languageItem">
            <div className="ui-binary-input" onClick={langChecked(props.id)}>
                <input value={props.id} type="checkbox" className="allLanguages_ms" checked={isCheck} />
                <label className={`${isCheck && 'checked'}`}>
                    <span className="language">{props.language}</span>
                </label>
            </div>
        </li>
    )
}
export default GenreItem;