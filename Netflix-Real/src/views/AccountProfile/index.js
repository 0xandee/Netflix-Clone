import React from "react";
import { Route, Switch, useRouteMatch, useHistory } from "react-router";
import {  NavLink } from "react-router-dom";
import { Col, Row } from "reactstrap";
import {  IconNetflix, IconUser } from "../../assets/Icon";
import CustomDropdown from "../../components/Dropdown";
import * as Icon from 'react-feather';

import './style.scss'
import { ChangePasswordProfile, Footer, GeneralProfile } from "../../components";



const AccountProfile = () => {
  let {  url } = useRouteMatch();
  const history = useHistory();
  const routesprofile = [
    {
      path: `${url}`,
      exact: true,
      main: () => <GeneralProfile />
    },
    {
      path: `${url}/change-password`,
      exact: true,
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

  const logoClicked = () => {
    history.push('/home')
  }
  return (
    <div id='accountProfile'>
      <div className='profile'>
        <div className={`profile__header`}>
          <div className={`profile__header__container`}>
            <div onClick={logoClicked}>
              <IconNetflix className={'profile__header__logo'} />
            </div>
            <div>
              <CustomDropdown />
            </div>
          </div>
        </div>
        <div className="profile__body">
          <div className="profile__body__container">
            <Row>
              <Col lg='3' xs="12" >
                <Row>
                  <NavLink exact className="nav-item" to={`${url}`} activeStyle={styles.activeStyle}>
                    <IconUser className="icon" />
                    General
                  </NavLink>
                </Row>

                <Row className='mb-2'>
                  <NavLink className="nav-item" to={`${url}/change-password`} activeStyle={styles.activeStyle}>
                    <Icon.Lock className="icon" />
                    Change Password
                  </NavLink>
                </Row>
              </Col>
              <Col lg="9" xs='12' >
                <div style={{ marginLeft: '20px' }}>
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

        <div style={{ position: 'absolute', bottom: '0', backgroundColor: 'black' }}>
          <Footer />
        </div>
      </div>

    </div>

  );

}

export default AccountProfile;