import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../Episodes/Episodes.scss';

const DropdownSelector = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        // <div className="episodesSelector__dropdown">
        //     <button className="dropdown-toggle season-toggle">{props.dropdownTitle}</button>
        // </div>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="mx-4 ">
            <DropdownToggle caret className="dropdown-toggle season-toggle">
                {props.dropdownTitle}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>Season 1</DropdownItem>
                <DropdownItem>Season 2</DropdownItem>
                <DropdownItem>Season 3</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default DropdownSelector;