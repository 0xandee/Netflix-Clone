import React from 'react';
import '../Episodes/Episodes.scss';

const DropdownSelector = (props) => {
    return (
        <div className="episodesSelector__dropdown">
            <button className="dropdown-toggle season-toggle">{props.dropdownTitle}</button>
        </div>
    );
};

export default DropdownSelector;