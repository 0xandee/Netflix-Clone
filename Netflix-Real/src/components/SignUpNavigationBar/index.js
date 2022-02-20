import React from 'react';
import './signUpNavigationBar.scss'

import { useHistory } from 'react-router-dom';
import { IconNetflix } from '../../assets/Icon';

const SignUpNavigationBar = () => {
    const history = useHistory()
    const logoClicked = () => {
        history.push('/signin')

    }
    return (
        <div id='signUpNavigationBar'>
            <div className={`registration__header`}>
                <div className={`registration__header__container`}>
                    <div onClick={logoClicked} >
                        <IconNetflix className={'registration__header__logo'} />
                    </div>

                </div>

            </div>
        </div>
    );

}


export default SignUpNavigationBar;
