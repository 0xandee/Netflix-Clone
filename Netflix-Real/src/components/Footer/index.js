import React from "react";
import './footer.scss'

import { NavLink } from "react-router-dom";


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
    const linkFooters = linkFooterData;

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
                            <div key={item.id} className={`footer__content--links_item `}>
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