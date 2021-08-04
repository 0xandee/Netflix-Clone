import React from "react";

function IconCheckmark(props) {
    return (
        <svg className={props.className}   aria-hidden="true">
            <path fill="currentColor" d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z">
                </path></svg>
    );
}

export default IconCheckmark;