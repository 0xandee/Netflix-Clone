import React, { useState } from "react";
import { Route, Router, Switch, useRouteMatch } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { IconAlertCircle, IconNetflix, IconUser } from "../../assets/Icon";
import CustomDropdown from "../../components/Dropdown";
import * as Icon from 'react-feather';

import './style.scss'
import { ChangePasswordProfile, GeneralProfile } from "../../components";



const AccountProfile = () => {
  let { path, url } = useRouteMatch();
  const routesprofile = [
    {
      path: `${url}`,
      exact: true,
      main: () => <GeneralProfile />
    },  
    {
      path: `${url}/change-password`,
      main: () => <ChangePasswordProfile />
    }
  ];

  const styles = ({
    activeStyle: {
      backgroundColor: '#e50914',
      borderRadius: '6px',
      pointerEvents: 'none',
      color: 'white',
    }
  })
  return (
    <div id='accountProfile'>
      <div className='profile'>
        <div className={`profile__header`}>
          <div className={`profile__header__container`}>
            <IconNetflix className={'profile__header__logo'} />
            <div>
              <CustomDropdown />
            </div>

          </div>
          <div className="profile__body">
            <div className="profile__body__container">
              <Row>
                <Col xs="3">
                  <Row>
                    <NavLink exact className="nav-item" to={`${url}`} activeStyle={styles.activeStyle}>
                      <IconUser className="icon" />
                      General
                    </NavLink>
                  </Row>
                  
                  <Row>
                    <NavLink className="nav-item" to={`${url}/change-password`} activeStyle={styles.activeStyle}>
                      <Icon.Lock className="icon" />
                      Change Password
                    </NavLink>
                  </Row>
                </Col>
                <Col xs="9">
                  <div style ={{marginLeft:'20px'}}>
                    <Switch>
                      {routesprofile.map((route, index) => (
                        // Render more <Route>s with the same paths as
                        // above, but different components this time.
                        <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          children={<route.main />}
                        />
                      ))}

                    </Switch>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

    </div>

  );

}

export default AccountProfile;