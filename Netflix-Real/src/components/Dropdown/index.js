import React, { useState } from "react";
import './customdropdown.scss'
import * as Icon from 'react-feather';
import { Link, NavLink, Route, useHistory } from "react-router-dom";
import { userLogout } from '../../services/redux/actions';
import { SignIn } from "../../views/index";
import { requestLogout } from "../../services/api/auth";


const CustomDropdown = () => {
  const [isOpen, setOpen] = useState(false);
  const userProfile = '/profile'
  const avatar = 'https://occ-0-325-3996.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYnnca7HCf0z4YHtIK5R8MIGCeMyodAsxBYSBmMkYHqjSw46VWWyNQirfwxT-CkbxPkp-G84Wu-iOMwGG-r9QAs.png?r=f71'
  const history = useHistory()


  const signOutClick =async (event) => {
    event.preventDefault();
    const response = await requestLogout(localStorage.getItem('access_token'))
    console.log("🚀 ~ file: index.js ~ line 64 ~ nextClicked ~ response", response)
    if (response.status >= 200 && response.status <= 299) {
        localStorage.clear();
        history.push('/signin')
    }
  }

  return (
    <div id='customdropdown'
    // onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
    >
      <div className='customdropdown' onClick={() => setOpen(!isOpen)}>
        <div className='customdropdown-header' >
          <img className="profile-icon" style={{ borderRadius: '4px' }} src={avatar} alt="" />
          <span className={`caret ${isOpen && 'open'}`} />
          <div className={`dropdown-body ${isOpen && 'open'}`} >
            <React.Fragment>
              <div className={`dropdown-content ${isOpen && 'open'}`}>
                <div className='callout-arrow' />
                
                <div className="dropdown-account-item">
                  <Link to={userProfile} className='profile-link'>
                    <span className='profile-name'>
                      Manage Profiles
                    </span>
                  </Link>
                </div>
                <div className='reponsive-link' />
                <div className="dropdown-account-item">
                  <Link to={userProfile} className='profile-link'>
                    <span className='profile-name account-link'>
                      Account
                    </span>
                  </Link>
                </div>
                <div className="dropdown-account-item">
                  <Link to={userProfile} className='profile-link'>
                    <span className='profile-name account-link'>
                      Help Center
                    </span>
                  </Link>
                </div>
                <div className="dropdown-account-item">
                  <div onClick={signOutClick} className='profile-link account-link'>
                    <span className='profile-name'>
                      Sign out
                    </span>
                  </div>
                </div>
              </div>

            </React.Fragment>
            {/* )} */}
          </div>
        </div>

      </div>
    </div>
  )
}
export default CustomDropdown;