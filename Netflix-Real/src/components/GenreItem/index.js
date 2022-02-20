import React, { useState } from "react";

const GenreItem = (props) => {
    const [isCheck, setIsCheck] = useState(false);
    const langChecked = (item) => () => {
        setIsCheck(!isCheck)
        if (!isCheck) {
            props.checkedGenresClicked(item)
        }
        else props.notCheckedGenresClicked(item)
    }

    return (
        <li className="languageItem">
            <div className="ui-binary-input" onClick={langChecked(props.id)}>
                <input value={props.id} type="checkbox" className="allLanguages_ms" checked={isCheck} onChange={langChecked(props.id)}/>
                <label className={`${isCheck && 'checked'}`}>
                    <span className="language">{props.language}</span>
                </label>
            </div>
        </li>
    )
}
export default GenreItem;