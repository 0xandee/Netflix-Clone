import React, { useState } from "react";
import './customdropdown.scss'
import * as Icon from 'react-feather';
import { Link } from "react-router-dom";


const data = [
  {
    id: 0, label: "Long long long long long long long name", navLink: '/profile',
    avatar: 'https://occ-0-325-3996.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYnnca7HCf0z4YHtIK5R8MIGCeMyodAsxBYSBmMkYHqjSw46VWWyNQirfwxT-CkbxPkp-G84Wu-iOMwGG-r9QAs.png?r=f71'
  },
  {
    id: 1, label: "Long long long long long name", navLink: '/home',
    avatar: 'https://occ-0-325-3996.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYnnca7HCf0z4YHtIK5R8MIGCeMyodAsxBYSBmMkYHqjSw46VWWyNQirfwxT-CkbxPkp-G84Wu-iOMwGG-r9QAs.png?r=f71'
  }
];

const CustomDropdown = () => {
  const [isOpen, setOpen] = useState(false);
  const userProfile = '/profile'
  const avatar = 'https://occ-0-325-3996.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYnnca7HCf0z4YHtIK5R8MIGCeMyodAsxBYSBmMkYHqjSw46VWWyNQirfwxT-CkbxPkp-G84Wu-iOMwGG-r9QAs.png?r=f71'
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);


  const onMouseLeave = () => {
    setOpen(false);

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
                {items.length !== 0 && items.map(item => (
                  <div className="dropdown-item" id={item.id}>
                    <Link to={item.navLink} className='profile-link'>
                      <img className="profile-icon" src={item.avatar} alt="" />
                      <span className='profile-name'>
                        {item.label}
                      </span>
                      <Icon.Lock size='16px' className='icon' />
                    </Link>
                  </div>
                ))}
                <div className="dropdown-item">
                  <Link to={userProfile} className='profile-link'>
                    <span className='profile-name'>
                      Manage Profiles
                    </span>
                  </Link>
                </div>

                <div className="dropdown-item">
                  <Link to={userProfile} className='profile-link'>
                    <span className='profile-name'>
                      Exit Profile
                    </span>
                  </Link>
                </div>
                <div className='reponsive-link' />
                <div className="dropdown-item">
                  <Link to={userProfile} className='profile-link'>
                    <span className='profile-name account-link'>
                      Account
                    </span>
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link to={userProfile} className='profile-link'>
                    <span className='profile-name account-link'>
                      Help Center
                    </span>
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link to='/signin' className='profile-link account-link'>
                    <span className='profile-name'>
                      Sign out
                    </span>
                  </Link>
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