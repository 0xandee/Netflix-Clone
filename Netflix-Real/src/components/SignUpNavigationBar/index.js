import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './signUpNavigationBar.scss'

import { Link, NavLink } from 'react-router-dom';
import { IconNetflix } from '../../assets/Icon';

const SignUpNavigationBar = (props) => {
    return (
        <div className={`registration__header`}>
            <div className={`registration__header__container`}>
                <IconNetflix className={'registration__header__logo'} />
            </div>
            <Link >
                Sign Out
            </Link>
        </div>
    );

}


export default SignUpNavigationBar;
