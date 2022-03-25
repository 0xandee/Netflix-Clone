import React, { useState } from "react";
import './notification.scss'
import * as Icon from 'react-feather';
import { Link } from "react-router-dom";
const fakeDataNotification = [
    { numb: 3 },
    {
        items: [
            {
                id: 0, header: "Long long long long long long long longlong link", navLink: '/profile', body: 'long long long long long name', time: '1000 year ago'
            },
            {
                id: 2, header: "Long long long long long long link", navLink: '/profile', body: 'long long long long long name', time: '1000 year ago'
            },
            {
                id: 3, header: "Long long long long long long link", navLink: '/profile', body: 'long long long long long name', time: '1000 year ago'
            }
        ]
    }

];

const CustomNotification = () => {
    const [isOpen, setOpen] = useState(false);
    const avatar = 'https://assets.nflxext.com/us/email/gem/hero/inapp/top10_112x63.jpg'
    const numb= fakeDataNotification[0].numb
    const items =fakeDataNotification[1].items
    const toggleDropdown = () => {
        setOpen(!isOpen)
    };
    return (
        <div id='customNotification'>
            <div className='notification' onClick={toggleDropdown}>
                <div className={`button-style position-relative`}>
                    <div className="number-notification">{numb !== 0 && numb}</div>
                    <div >
                        <Icon.Bell className='icon-style' fill='white' size='16px' strokeWidth='4' color='white' />
                        <div className = {`notification-container`}>
                            {isOpen && <div className='callout-arrow' />}
                            <div className={`notification-content ${isOpen && 'open'} ${items.length > 2 && 'scroll'}`}>
                                {items.length !== 0 ? items.map(item => (
                                    <div className={`notification-item`}>

                                        <Link to={item.navLink} className='image-text-notification'>
                                            <div className='notification-type-new'></div>
                                            <div className='multi-landing-stack-space-holder'>
                                                <div className="multi-landing-stack-1"></div>
                                                <div className="multi-landing-stack-2"></div>
                                                <img className='title-card' size='112px' src={avatar} alt="" />
                                            </div>

                                            <div className='notification-text'>
                                                <div className='notification-header'>
                                                    {item.header}
                                                </div>
                                                <div className='notification-body'>
                                                    {item.body}
                                                </div>
                                                <div className='notification-time'>
                                                    {item.time}
                                                </div>
                                            </div>


                                        </Link>
                                    </div>
                                )) : <div className={`notification-item`}>
                                    <span>No recent notifications
                                    </span>
                                </div>}
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
};

export default CustomNotification;