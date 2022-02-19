import React, { useEffect, useState } from "react";
import './footer.scss'
import * as Icon from 'react-feather';
import { NavLink } from "react-router-dom";

const languagesData = [
    {
        id: 1,
        label: 'English'

    },
  
];
// const linkFooterData = [
//     {
//         id: 1,
//         label: 'FAQ',
//         navLink: '/faq'
//     },
//     {
//         id: 2,
//         label: 'Help Center',
//         navLink: '/faq'
//     },
//     {
//         id: 3,
//         label: 'Terms of Use',
//         navLink: '/faq'
//     },
//     {
//         id: 4,
//         label: 'Privacy',
//         navLink: '/faq'
//     },
//     {
//         id: 5,
//         label: 'Cookies Preferences',
//         navLink: '/faq'
//     },
//     {
//         id: 6,
//         label: 'Corporate Information',
//         navLink: '/faq'
//     }
// ]

const linkFooterData = [
    {
        id: 1,
        label: 'Terms of Use',
        navLink: '/termsofuse'
    },
    {
        id: 2,
        label: 'Privacy',
        navLink: '/privacy'
    },
    {
        id: 3,
        label: 'Cookies Preferences',
        navLink: '/cookieprefer'
    },
    {
        id: 4,
        label: 'Corporate Information',
        navLink: '/corpinfo'
    }
]

const Footer = (props) => {
    const [languages, setLanguages] = useState(languagesData);
    const [linkFooters, setLinkFooters] = useState(linkFooterData);
    const [isOpen, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleDropdown = () => setOpen(!isOpen);

    const handleItemClick = (id)=> () => {
        selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
    }
    return (
        <div id='footer'>
            <div className={`footer`} style={props.style}>
                <div className={`footer__content`}>
                    <div className={`footer__content--top-site`}>
                        <NavLink to='/contactus'>
                            Questions? Contact us.
                        </NavLink>
                    </div>
                    <div className={`footer__content--links`}>
                        {linkFooters.map(item => (
                            <div className={`footer__content--links_item `}>
                                <NavLink id={item.id} to={item.navLink}>
                                    {item.label}
                                </NavLink>
                            </div>
                        ))}


                    </div>
                 
                </div>
            </div>
        </div>
    )
}
export default Footer;